'use client';

import { useState } from 'react';
import Button from '@/components/common/button/Button';
import Modal from '@/components/common/modal/Modal';
import styles from './page.module.css';

export default function MyDashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>디자인 확인용</h1>
        <p className={styles.description}>
        </p>

        <div className={styles.buttonRow}>
          <Button>버튼 확인</Button>
          <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
            모달 확인
          </Button>
        </div>
      </div>

      {isModalOpen ? (
        <Modal title="새 대시보드 생성">
          <p className={styles.modalText}>
          </p>

          <div className={styles.modalActions}>
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              취소
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>생성</Button>
          </div>
        </Modal>
      ) : null}
    </section>
  );
}
