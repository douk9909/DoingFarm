import Modal from '@/components/common/Modal/Modal';
import Input from '@/components/common/Input';
import { useState } from 'react';
import { columnApi } from '@/lib/api/column';
import Button from '@/components/common/Button/Button';
import styles from './AddColumnModal.module.css';
import Image from 'next/image';
import characterImg from '@/assets/character/carrot1.svg';
import { useColumnRefetch } from '../ColumnRefetchContext';

interface AddColumnModalProps {
  onClose: () => void;
  dashboardId: number;
  existingTitles: string[];
}

export default function AddColumnModal({
  onClose,
  dashboardId,
  existingTitles,
}: AddColumnModalProps) {
  const [title, setTitle] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState('');

  const isDisabled = title.trim() === '';

  const refetch = useColumnRefetch();

  const addColumn = async () => {
    if (existingTitles.includes(title.trim())) {
      setError('중복된 컬럼명입니다.');
      return;
    }

    setIsPending(true);
    try {
      await columnApi.create({ title, dashboardId });
      refetch();
      onClose();
    } catch {
      setError('컬럼 생성에 실패했습니다.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Modal contentClassName={styles.addColumnModal} title="새 컬럼 생성" onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addColumn();
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
          placeholder="컬럼 이름"
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError('');
          }}
          status={error ? 'error' : 'default'}
          errorMsg={error}
        />
        <div className={styles.buttonWrapper}>
          <Button type="button" onClick={onClose} className={styles.button} variant="secondary">
            취소
          </Button>
          <Button disabled={isDisabled || isPending} type="submit" className={styles.button}>
            생성
          </Button>
        </div>
      </form>
    </Modal>
  );
}
