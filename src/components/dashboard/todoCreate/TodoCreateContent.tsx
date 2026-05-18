'use client';

import { useMemo, useState } from 'react';
import Button from '@/components/common/Button/Button';
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
import { formatDueDate } from '@/lib/utils/date';
import type { TodoCreateProps } from './TodoCreate';
import styles from './TodoCreateModal.module.css';

export default function TodoCreateContent({
  columns,
  assignees,
  initialColumnId,
  isCreating = false,
  onClose,
  onCreate,
}: TodoCreateProps) {
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
        // 담당자가 없으면 undefined로 넘겨서 훅에서 처리하도록 함
        assigneeUserId: selectedAssignee?.id ?? assignees[0]?.id,

        title: title.trim(),
        description: description.trim(),

        // dueDate가 있을 때만 포함 (빈 문자열 보내지 않음)
        ...(dueDate ? { dueDate: formatDueDate(dueDate) } : {}),

        tags: tags.map((tag) => tag.label),
      },
      imageFile,
    );
  };

  return (
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
                  color={TODO_ASSIGNEE_COLORS[selectedAssigneeIndex % TODO_ASSIGNEE_COLORS.length]}
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
              <TodoDropdownAvatar color={TODO_ASSIGNEE_COLORS[index % TODO_ASSIGNEE_COLORS.length]}>
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
  );
}
