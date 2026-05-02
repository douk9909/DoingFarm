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
import type { CreateTodoRequest, TodoAssigneeOption, TodoColumnOption } from '@/types/todo';
import styles from './TodoCreateModal.module.css';

interface TodoCreateModalProps {
  columns: TodoColumnOption[];
  assignees: TodoAssigneeOption[];
  initialColumnId: number;
  isCreating?: boolean;
  onClose: () => void;
  onCreate: (columnId: number, card: CreateTodoRequest, imageFile?: File | null) => Promise<void>;
}

// dueDate를 API 요구 형식으로 변환
const formatDueDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export default function TodoCreateModal({
  columns,
  assignees,
  initialColumnId,
  isCreating = false,
  onClose,
  onCreate,
}: TodoCreateModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [columnId, setColumnId] = useState(initialColumnId);
  const [assigneeId, setAssigneeId] = useState<number | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const [isAssigneeOpen, setIsAssigneeOpen] = useState(false);

  const { tagInput, tags, setTagInput, addTag, removeTag } = useTodoTags();
  const { imageFile, imagePreviewUrl, updateImage, removeImage } = useTodoImagePreview();

  const selectedColumn = useMemo(
    () => columns.find((column) => column.id === columnId),
    [columnId, columns],
  );

  const selectedAssignee = useMemo(
    () => assignees.find((assignee) => assignee.id === assigneeId),
    [assigneeId, assignees],
  );

  const selectedAssigneeIndex = selectedAssignee
    ? assignees.findIndex((assignee) => assignee.id === selectedAssignee.id)
    : -1;

  // 제목과 설명이 모두 들어왔을 때만 생성 버튼 활성화
  const isSubmitDisabled =
    isCreating || title.trim().length === 0 || description.trim().length === 0;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitDisabled) {
      return;
    }

    // 카드 생성에 필요한 값만 정리해서 상위로 전달
    await onCreate(
      columnId,
      {
        assigneeUserId: selectedAssignee?.id ?? assignees[0]?.id ?? 0,
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate ? formatDueDate(dueDate) : '',
        tags: tags.map((tag) => tag.label),
      },
      imageFile,
    );
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
          required
          label={
            <>
              제목<span className={styles.requiredMark}> *</span>
            </>
          }
          value={title}
          placeholder="제목을 입력해주세요"
          className={styles.formInput}
          onChange={(event) => setTitle(event.target.value)}
        />

        <Input.TextArea
          required
          label={
            <>
              설명<span className={styles.requiredMark}> *</span>
            </>
          }
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
            onClose={() => setIsColumnOpen(false)}
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
                      TODO_ASSIGNEE_COLORS[selectedAssigneeIndex % TODO_ASSIGNEE_COLORS.length]
                    }
                  >
                    {getTodoAssigneeInitial(selectedAssignee.nickname)}
                  </TodoDropdownAvatar>
                  {selectedAssignee.nickname}
                </>
              ) : undefined
            }
            getOptionKey={(assignee) => assignee.id}
            isOptionSelected={(assignee) => assignee.id === assigneeId}
            onToggle={() => {
              setIsAssigneeOpen((isOpen) => !isOpen);
              setIsColumnOpen(false);
            }}
            onClose={() => setIsAssigneeOpen(false)}
            onSelect={(assignee) => {
              setAssigneeId(assignee.id);
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

        <TodoTagField
          value={tagInput}
          tags={tags}
          onChange={setTagInput}
          onAddTag={addTag}
          onRemoveTag={removeTag}
        />

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
            {isCreating ? '생성 중...' : '생성'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}