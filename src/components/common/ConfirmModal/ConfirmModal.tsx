'use client';

import Modal from '@/components/common/modal/Modal';
import Button from '@/components/common/button/Button';
import styles from './ConfirmModal.module.css';
import { cn } from '@/lib/utils/cn';
import Image from 'next/image';
import characterImg from '@/assets/character/carrot1.svg';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = '확인',
  cancelText = '취소',
  isLoading,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <Modal>
      <Image
        src={characterImg}
        alt="캐릭터 이미지"
        width={60}
        height={72}
        className={styles.characterImage}
      />
      <div className={styles.modalProfileWrapper}>
        <h2 className={styles.modalTitle}>{title}</h2>
        <p className={styles.modalText}>{message}</p>
        <div className={styles.modalButtonWrapper}>
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
            className={cn(styles.modalButton, styles.modalCancelButton)}
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className={cn(styles.modalButton, styles.modalDeleteButton)}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
