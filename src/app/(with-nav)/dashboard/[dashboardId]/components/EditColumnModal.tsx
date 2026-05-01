import Modal from '@/components/common/modal/Modal';
import Input from '@/components/common/input';
import { useState } from 'react';
import { columnApi } from '@/lib/api/column';
import Button from '@/components/common/button/Button';
import styles from './EditColumnModal.module.css';
import Image from 'next/image';
import characterImg from '@/assets/character/carrot1.svg';

interface EditColumnModalProps {
  onClose: () => void;
  columnId: number;
  currentTitle: string;
}

export default function EditColumnModal({ onClose, columnId, currentTitle }: EditColumnModalProps) {
  const [title, setTitle] = useState(currentTitle);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState('');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const isDisabled = title.trim() === '';

  const changeTitle = async () => {
    setIsPending(true);
    try {
      await columnApi.update(columnId, { title });
      onClose();
    } catch {
      setError('이름을 변경하는데 실패했습니다.');
    } finally {
      setIsPending(false);
    }
  };

  const deleteColumn = async () => {
    setIsPending(true);
    try {
      await columnApi.delete(columnId);
      onClose();
    } catch {
      setError('컬럼 삭제에 실패했습니다');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Modal contentClassName={styles.editColumnModal} title="컬럼 관리" onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          changeTitle();
        }}
      >
        <Image
          src={characterImg}
          alt="캐릭터 이미지"
          width={60}
          height={72}
          className={styles.characterImage}
        />
        <Input.Text
          value={title}
          type="text"
          label="이름"
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError('');
          }}
          status={error ? 'error' : 'default'}
          errorMsg={error}
        />
        <div className={styles.buttonWrapper}>
          <Button
            type="button"
            onClick={deleteColumn}
            className={`${styles.button} ${styles.delete}`}
            disabled={isPending}
          >
            삭제
          </Button>
          <Button disabled={isDisabled || isPending} type="submit" className={styles.button}>
            변경
          </Button>
        </div>
      </form>
    </Modal>
  );
}
