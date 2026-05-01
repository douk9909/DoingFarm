import Modal from '@/components/common/modal/Modal';
import Input from '@/components/common/input';
import { useState } from 'react';
import { columnApi } from '@/lib/api/column';
import Button from '@/components/common/button/Button';
import styles from './AddColumnModal.module.css';
import Image from 'next/image';
import characterImg from '@/assets/character/carrot1.svg';

interface AddColumnModalProps {
  onClose: () => void;
  dashboardId: number;
}

export default function AddColumnModal({ onClose, dashboardId }: AddColumnModalProps) {
  const [title, setTitle] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState('');

  const isDisabled = title === '';

  const addColumn = async () => {
    setIsPending(true);
    try {
      await columnApi.create({ title, dashboardId });
      onClose();
    } catch {
      setError('컬럼 생성에 실패했습니다. 다시 시도해주세요.');
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
