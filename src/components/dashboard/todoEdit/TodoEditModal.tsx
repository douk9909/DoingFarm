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
import { TODO_ASSIGNEE_COLORS, getTodoAssigneeInitial } from '@/lib/constants/todo';
import { getHashColor } from '@/lib/utils/color';
import type { CardTag } from '@/components/common/card/Card';
import type { UpdateCardRequest } from '@/lib/api/card';
import type { Card } from '@/types/card';
import type { TodoAssigneeOption, TodoColumnOption } from '@/types/todo';
import styles from '@/components/dashboard/todoCreate/TodoCreateModal.module.css';

interface TodoEditModalProps {
  card: Card;
  columns: TodoColumnOption[];
  assignees: TodoAssigneeOption[];
  isEditing?: boolean;
  onClose: () => void;
  onEdit: (cardId: number, card: UpdateCardRequest, imageFile?: File | null) => Promise<void>;
}

const parseDueDate = (dueDate: string) => {
  if (!dueDate) return null;

  const date = new Date(dueDate);
  return Number.isNaN(date.getTime()) ? null : date;
};

// dueDate를 API 요구 형식으로 변환
const formatDueDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const getInitialTags = (tags: string[]) =>
  tags.map((tag) => ({
    label: tag,
    color: getHashColor(tag),
  }));

export default function TodoEditModal({
  card,
  columns,
  assignees,
  isEditing = false,
  onClose,
  onEdit,
}: TodoEditModalProps) {
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [columnId, setColumnId] = useState(card.columnId);
  const [assigneeId, setAssigneeId] = useState(card.assignee.id);
  const [dueDate, setDueDate] = useState<Date | null>(parseDueDate(card.dueDate));
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<CardTag[]>(getInitialTags(card.tags));
  const [originImageUrl, setOriginImageUrl] = useState(card.imageUrl ?? '');
  const [isColumnOpen, setIsColumnOpen] = useState(false);
  const [isAssigneeOpen, setIsAssigneeOpen] = useState(false);

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

  const currentDueDate = dueDate ? formatDueDate(dueDate) : '';
  const currentTags = tags.map((tag) => tag.label);
  const previewImageUrl = imagePreviewUrl || originImageUrl;

  // 기존 카드 값과 하나라도 달라졌을 때만 완료 버튼 활성화
  const isChanged =
    title.trim() !== card.title ||
    description.trim() !== card.description ||
    columnId !== card.columnId ||
    assigneeId !== card.assignee.id ||
    currentDueDate !== card.dueDate ||
    currentTags.join(',') !== card.tags.join(',') ||
    imageFile !== null ||
    originImageUrl !== (card.imageUrl ?? '');

  const isSubmitDisabled =
    isEditing || !isChanged || title.trim().length === 0 || description.trim().length === 0;

  const handleAddTag = () => {
    const nextTag = tagInput.trim();

    if (!nextTag || tags.some((tag) => tag.label === nextTag)) {
      return;
    }

    setTags((prevTags) => [
      ...prevTags,
      {
        label: nextTag,
        color: getHashColor(nextTag),
      },
    ]);
    setTagInput('');
  };

  const handleRemoveTag = (targetTag: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag.label !== targetTag));
  };

  const handleRemoveImage = () => {
    setOriginImageUrl('');
    removeImage();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitDisabled) {
      return;
    }

    // 카드 수정에 필요한 값만 정리해서 상위로 전달
    await onEdit(
      card.id,
      {
        columnId,
        assigneeUserId: assigneeId,
        title: title.trim(),
        description: description.trim(),
        ...(currentDueDate ? { dueDate: currentDueDate } : {}),
        tags: currentTags,
        ...(originImageUrl ? { imageUrl: originImageUrl } : {}),
      },
      imageFile,
    );
  };

  return (
    <Modal
      title="할 일 수정"
      onClose={onClose}
      closeLabel="할 일 수정 모달 닫기"
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
          onAddTag={handleAddTag}
          onRemoveTag={handleRemoveTag}
        />

        <TodoImageField
          imagePreviewUrl={previewImageUrl}
          onChangeImage={updateImage}
          onRemoveImage={handleRemoveImage}
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
            {isEditing ? '수정 중...' : '완료'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}