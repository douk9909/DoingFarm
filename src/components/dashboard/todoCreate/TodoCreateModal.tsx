'use client';

import { useState } from 'react';
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

const getRandomTagColor = () => TAG_COLORS[Math.floor(Math.random() * TAG_COLORS.length)];

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
  const [tag, setTag] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // 필수 입력값이 모두 채워졌을 때만 생성 버튼 활성화
  const isSubmitDisabled =
    title.trim().length === 0 ||
    description.trim().length === 0 ||
    assigneeId.length === 0 ||
    tag.trim().length === 0 ||
    !dueDate ||
    !imageFile;

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // file input은 multiple 없이 사용해서 이미지 1개만 선택
    const file = event.target.files?.[0] ?? null;
    setImageFile(file);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitDisabled || !dueDate || !imageFile) {
      return;
    }

    const selectedAssignee = assignees.find((assignee) => String(assignee.id) === assigneeId);

    if (!selectedAssignee) {
      return;
    }

    // API 연결 전까지 카드에 필요한 값만 만들어 상위 컴포넌트로 전달
    onCreate(columnId, {
      title: title.trim(),
      tags: [{ label: tag.trim(), color: getRandomTagColor() }],
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
          <label className={styles.field}>
            <span className={styles.label}>컬럼</span>
            <span className={styles.selectWrapper}>
              <select
                className={styles.select}
                value={columnId}
                onChange={(event) => setColumnId(Number(event.target.value))}
              >
                {columns.map((column) => (
                  <option key={column.id} value={column.id}>
                    {column.title}
                  </option>
                ))}
              </select>
              <ArrowDownIcon size={16} color="var(--color-gray-600)" />
            </span>
          </label>

          <label className={styles.field}>
            <span className={styles.label}>담당자</span>
            <span className={styles.selectWrapper}>
              <select
                className={styles.select}
                value={assigneeId}
                onChange={(event) => setAssigneeId(event.target.value)}
              >
                <option value="">담당자 선택</option>
                {assignees.map((assignee) => (
                  <option key={assignee.id} value={assignee.id}>
                    {assignee.nickname}
                  </option>
                ))}
              </select>
              <ArrowDownIcon size={16} color="var(--color-gray-600)" />
            </span>
          </label>
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

        <label className={styles.field}>
          <span className={styles.label}>태그</span>
          <input
            className={styles.textInput}
            value={tag}
            placeholder="태그를 입력해주세요"
            onChange={(event) => setTag(event.target.value)}
          />
        </label>

        <div className={styles.field}>
          <span className={styles.label}>이미지</span>
          <label className={styles.imageUpload}>
            <input
              type="file"
              accept="image/*"
              className={styles.fileInput}
              onChange={handleImageChange}
            />
            <ImageIcon size={24} color="var(--color-gray-600)" />
            <span>{imageFile ? imageFile.name : '+ image upload'}</span>
          </label>
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
