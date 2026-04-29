'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import Modal from '@/components/common/modal/Modal';
import Button from '@/components/common/button/Button';
import type { CardTag } from '@/components/common/card/Card';
import ArrowDownIcon from '@/assets/icons/ArrowDownIcon';
import ImageIcon from '@/assets/icons/ImageIcon';
import styles from './TodoCreateModal.module.css';

export interface CreatedTodoCard {
  title: string;
  tags: CardTag[];
  dueDate: string;
  assignee: {
    nickname: string;
    profileImage: string | null;
  };
  src: string;
}

interface TodoCreateModalProps {
  columns: Array<{
    id: number;
    title: string;
  }>;
  assignees: Array<{
    id: number;
    nickname: string;
  }>;
  initialColumnId: number;
  onClose: () => void;
  onCreate: (columnId: number, card: CreatedTodoCard) => void;
}

const TAG_COLORS = [
  'var(--color-profile-green)',
  'var(--color-profile-violet)',
  'var(--color-profile-cyan)',
  'var(--color-profile-rose)',
  'var(--color-profile-cobalt)',
  'var(--color-profile-yellow)',
  'var(--color-profile-orange)',
];

const ASSIGNEE_COLORS = [
  'var(--color-profile-green)',
  'var(--color-profile-cobalt)',
  'var(--color-profile-orange)',
  'var(--color-profile-cyan)',
  'var(--color-profile-violet)',
];

const getRandomTagColor = () => TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)];

const getInitial = (nickname: string) => nickname.trim().charAt(0);

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
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<CardTag[]>([]);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const imagePreviewUrlRef = useRef('');
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
  const trimmedTagInput = tagInput.trim();

  useEffect(() => {
    return () => {
      if (imagePreviewUrlRef.current) {
        URL.revokeObjectURL(imagePreviewUrlRef.current);
      }
    };
  }, []);

  // 필수값이 모두 들어왔을 때만 생성 버튼 활성화
  const isSubmitDisabled =
    title.trim().length === 0 ||
    description.trim().length === 0 ||
    assigneeId.length === 0 ||
    tags.length === 0 ||
    !dueDate ||
    !imageFile;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 파일은 한 개만 카드 미리보기로 사용
    const file = event.target.files?.[0] ?? null;
    const nextPreviewUrl = file ? URL.createObjectURL(file) : '';

    if (imagePreviewUrlRef.current) {
      URL.revokeObjectURL(imagePreviewUrlRef.current);
    }

    imagePreviewUrlRef.current = nextPreviewUrl;
    setImageFile(file);
    setImagePreviewUrl(nextPreviewUrl);
  };

  const handleRemoveImage = () => {
    if (imagePreviewUrlRef.current) {
      URL.revokeObjectURL(imagePreviewUrlRef.current);
    }

    imagePreviewUrlRef.current = '';
    setImageFile(null);
    setImagePreviewUrl('');
  };

  const handleAddTag = (label: string) => {
    const nextLabel = label.trim();

    if (nextLabel.length === 0) {
      return;
    }

    setTags((prevTags) => {
      if (prevTags.some((tag) => tag.label === nextLabel)) {
        return prevTags;
      }

      return [...prevTags, { label: nextLabel, color: getRandomTagColor() }];
    });
    setTagInput('');
  };

  const handleTagKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAddTag(tagInput);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitDisabled || !dueDate || !imageFile || !selectedAssignee) {
      return;
    }

    onCreate(columnId, {
      title: title.trim(),
      tags,
      dueDate: dueDate.toISOString(),
      assignee: {
        nickname: selectedAssignee.nickname,
        profileImage: null,
      },
      src: URL.createObjectURL(imageFile),
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
        <label className={styles.field}>
          <span className={styles.requiredLabel}>제목</span>
          <input
            className={styles.textInput}
            value={title}
            placeholder="제목을 입력해주세요"
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>

        <label className={styles.field}>
          <span className={styles.requiredLabel}>설명</span>
          <textarea
            className={styles.textarea}
            value={description}
            placeholder="설명을 입력해주세요"
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>

        <div className={styles.selectRow}>
          <div className={styles.field}>
            <span className={styles.label}>컬럼</span>
            <div className={styles.dropdown}>
              <button
                type="button"
                className={styles.dropdownButton}
                aria-expanded={isColumnOpen}
                onClick={() => {
                  setIsColumnOpen((isOpen) => !isOpen);
                  setIsAssigneeOpen(false);
                }}
              >
                <span>{selectedColumn?.title ?? '컬럼 선택'}</span>
                <ArrowDownIcon
                  size={16}
                  color="var(--color-gray-600)"
                  className={isColumnOpen ? styles.arrowOpen : undefined}
                />
              </button>

              {isColumnOpen ? (
                <div className={styles.dropdownMenu}>
                  {columns.map((column) => (
                    <button
                      key={column.id}
                      type="button"
                      className={styles.dropdownOption}
                      onClick={() => {
                        setColumnId(column.id);
                        setIsColumnOpen(false);
                      }}
                    >
                      {column.title}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className={styles.field}>
            <span className={styles.label}>담당자</span>
            <div className={styles.dropdown}>
              <button
                type="button"
                className={styles.dropdownButton}
                aria-expanded={isAssigneeOpen}
                onClick={() => {
                  setIsAssigneeOpen((isOpen) => !isOpen);
                  setIsColumnOpen(false);
                }}
              >
                <span className={styles.selectedAssignee}>
                  {selectedAssignee ? (
                    <>
                      <span
                        className={styles.avatar}
                        style={{
                          backgroundColor:
                            ASSIGNEE_COLORS[
                              assignees.findIndex((assignee) => assignee.id === selectedAssignee.id) %
                                ASSIGNEE_COLORS.length
                            ],
                        }}
                      >
                        {getInitial(selectedAssignee.nickname)}
                      </span>
                      {selectedAssignee.nickname}
                    </>
                  ) : (
                    '담당자 선택'
                  )}
                </span>
                <ArrowDownIcon
                  size={16}
                  color="var(--color-gray-600)"
                  className={isAssigneeOpen ? styles.arrowOpen : undefined}
                />
              </button>

              {isAssigneeOpen ? (
                <div className={`${styles.dropdownMenu} ${styles.assigneeMenu}`}>
                  {assignees.map((assignee, index) => (
                    <button
                      key={assignee.id}
                      type="button"
                      className={styles.dropdownOption}
                      onClick={() => {
                        setAssigneeId(String(assignee.id));
                        setIsAssigneeOpen(false);
                      }}
                    >
                      <span
                        className={styles.avatar}
                        style={{ backgroundColor: ASSIGNEE_COLORS[index % ASSIGNEE_COLORS.length] }}
                      >
                        {getInitial(assignee.nickname)}
                      </span>
                      {assignee.nickname}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <label className={styles.field}>
          <span className={styles.label}>마감일</span>
          <span className={styles.dateField}>
            <DatePicker
              selected={dueDate}
              onChange={(date: Date | null) => setDueDate(date)}
              showTimeSelect
              timeIntervals={30}
              dateFormat="yyyy. MM. dd HH:mm"
              minDate={new Date()}
              placeholderText="2024. 07. 31 14:30"
              className={styles.dateInput}
              wrapperClassName={styles.datePickerWrapper}
            />
          </span>
        </label>

        <div className={styles.field}>
          <span className={styles.label}>태그</span>
          <input
            className={styles.textInput}
            value={tagInput}
            placeholder="태그를 입력해주세요"
            onChange={(event) => setTagInput(event.target.value)}
            onKeyDown={handleTagKeyDown}
          />

          {(trimmedTagInput || tags.length > 0) && (
            <div className={styles.tagPanel}>
              {trimmedTagInput ? <span className={styles.tagHint}>옵션 선택 또는 생성</span> : null}
              <div className={styles.tagList}>
                {trimmedTagInput ? (
                  <button
                    type="button"
                    className={styles.tagChip}
                    style={{ backgroundColor: 'var(--color-profile-cobalt)' }}
                    onClick={() => handleAddTag(tagInput)}
                  >
                    생성&nbsp;&nbsp; {trimmedTagInput}
                  </button>
                ) : null}
                {tags.map((tag) => (
                  <span key={tag.label} className={styles.tagChip} style={{ backgroundColor: tag.color }}>
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={styles.field}>
          <span className={styles.label}>이미지</span>
          {imagePreviewUrl ? (
            <div className={styles.imagePreview}>
              <img src={imagePreviewUrl} alt="" />
              <button
                type="button"
                className={styles.removeImageButton}
                aria-label="이미지 삭제"
                onClick={handleRemoveImage}
              >
                ×
              </button>
            </div>
          ) : (
            <label className={styles.imageUpload}>
              <input
                type="file"
                accept="image/*"
                className={styles.fileInput}
                onChange={handleImageChange}
              />
              <ImageIcon size={24} color="var(--color-gray-600)" />
              <span>+ image upload</span>
            </label>
          )}
        </div>

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
