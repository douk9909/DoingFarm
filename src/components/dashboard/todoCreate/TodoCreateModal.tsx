'use client';

import { useMemo, useState } from 'react';
import Modal from '@/components/common/modal/Modal';
import Button from '@/components/common/button/Button';
import { Input } from '@/components/common/input';
import TodoDateField from '@/components/dashboard/todoForm/TodoDateField';
import TodoFormDropdown, {
  TodoDropdownAvatar,
} from '@/components/dashboard/todoForm/TodoFormDropdown';
import TodoImageField from '@/components/dashboard/todoForm/TodoImageField';
import TodoTagField from '@/components/dashboard/todoForm/TodoTagField';
import { useTodoImagePreview } from '@/hooks/ui/useTodoImagePreview';
import { useTodoTags } from '@/hooks/ui/useTodoTags';
import { TODO_ASSIGNEE_COLORS, getTodoAssigneeInitial } from '@/lib/constants/todo';
import type { TodoAssigneeOption, TodoColumnOption, TodoFormCard } from '@/types/todo';
import styles from './TodoCreateModal.module.css';

export type CreatedTodoCard = TodoFormCard;

interface TodoCreateModalProps {
  columns: TodoColumnOption[];
  assignees: TodoAssigneeOption[];
  initialColumnId: number;
  onClose: () => void;
  onCreate: (columnId: number, card: CreatedTodoCard) => void;
}

export default function TodoCreateModal({
  columns,
  assignees,
  initialColumnId,
  onClose,
  onCreate,
}: TodoCreateModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [columnId, setColumnId] = useState(initialColumnId);
  const [assigneeId, setAssigneeId] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const { tagInput, tags, setTagInput, addTag } = useTodoTags();
  const { imageFile, imagePreviewUrl, updateImage, removeImage } = useTodoImagePreview();
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const [isAssigneeOpen, setIsAssigneeOpen] = useState(false);

  const selectedColumn = useMemo(
    () => columns.find((column) => column.id === columnId),
    [columnId, columns],
  );
  const selectedAssignee = useMemo(
    () => assignees.find((assignee) => String(assignee.id) === assigneeId),
    [assigneeId, assignees],
  );
  const selectedAssigneeIndex = selectedAssignee
    ? assignees.findIndex((assignee) => assignee.id === selectedAssignee.id)
    : -1;

  // 필수값이 모두 들어왔을 때만 생성 버튼 활성화
  const isSubmitDisabled =
    title.trim().length === 0 ||
    description.trim().length === 0 ||
    assigneeId.length === 0 ||
    tags.length === 0 ||
    !dueDate ||
    !imageFile ||
    !imagePreviewUrl;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitDisabled || !dueDate || !imagePreviewUrl || !selectedAssignee) {
      return;
    }

    // 카드 렌더링에 필요한 값만 정리해서 상위로 전달
    onCreate(columnId, {
      title: title.trim(),
      tags,
      dueDate: dueDate.toISOString(),
      assignee: {
        nickname: selectedAssignee.nickname,
        profileImage: null,
      },
      src: imagePreviewUrl,
    });
  };

  return (
    <Modal
      title="할 일 생성"
      onClose={onClose}
      closeLabel="할 일 생성 모달 닫기"
      contentClassName={styles.todoModal}
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input.Text
          label="제목*"
          value={title}
          placeholder="제목을 입력해주세요"
          className={styles.formInput}
          onChange={(event) => setTitle(event.target.value)}
        />

        <Input.TextArea
          label="설명*"
          value={description}
          placeholder="설명을 입력해주세요"
          rows={4}
          className={styles.formTextarea}
          onChange={(event) => setDescription(event.target.value)}
        />

        <div className={styles.selectRow}>
          <TodoFormDropdown
            label="컬럼"
            isOpen={isColumnOpen}
            options={columns}
            placeholder="컬럼 선택"
            selectedContent={selectedColumn?.title}
            getOptionKey={(column) => column.id}
            isOptionSelected={(column) => column.id === columnId}
            onToggle={() => {
              setIsColumnOpen((isOpen) => !isOpen);
              setIsAssigneeOpen(false);
            }}
            onSelect={(column) => {
              setColumnId(column.id);
              setIsColumnOpen(false);
            }}
            renderOption={(column) => column.title}
          />

          <TodoFormDropdown
            label="담당자"
            isOpen={isAssigneeOpen}
            options={assignees}
            placeholder="담당자 선택"
            selectedContent={
              selectedAssignee ? (
                <>
                  <TodoDropdownAvatar
                    color={
                      TODO_ASSIGNEE_COLORS[
                        selectedAssigneeIndex % TODO_ASSIGNEE_COLORS.length
                      ]
                    }
                  >
                    {getTodoAssigneeInitial(selectedAssignee.nickname)}
                  </TodoDropdownAvatar>
                  {selectedAssignee.nickname}
                </>
              ) : undefined
            }
            getOptionKey={(assignee) => assignee.id}
            isOptionSelected={(assignee) => String(assignee.id) === assigneeId}
            onToggle={() => {
              setIsAssigneeOpen((isOpen) => !isOpen);
              setIsColumnOpen(false);
            }}
            onSelect={(assignee) => {
              setAssigneeId(String(assignee.id));
              setIsAssigneeOpen(false);
            }}
            renderOption={(assignee, index) => (
              <>
                <TodoDropdownAvatar
                  color={TODO_ASSIGNEE_COLORS[index % TODO_ASSIGNEE_COLORS.length]}
                >
                  {getTodoAssigneeInitial(assignee.nickname)}
                </TodoDropdownAvatar>
                {assignee.nickname}
              </>
            )}
          />
        </div>

        <TodoDateField value={dueDate} onChange={setDueDate} />

        <TodoTagField value={tagInput} tags={tags} onChange={setTagInput} onAddTag={addTag} />

        <TodoImageField
          imagePreviewUrl={imagePreviewUrl}
          onChangeImage={updateImage}
          onRemoveImage={removeImage}
        />

        <div className={styles.actions}>
          <Button
            type="button"
            variant="secondary"
            size="lg"
            fullWidth
            className={styles.cancelButton}
            onClick={onClose}
          >
            취소
          </Button>
          <Button
            type="submit"
            size="lg"
            fullWidth
            disabled={isSubmitDisabled}
            className={styles.submitButton}
          >
            생성
          </Button>
        </div>
      </form>
    </Modal>
  );
}
