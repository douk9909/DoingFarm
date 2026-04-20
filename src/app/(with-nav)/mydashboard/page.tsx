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
        <Modal
          open={isModalOpen}
          title="모달"
          footer={
            <>
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                취소
              </Button>
              <Button onClick={() => setIsModalOpen(false)}>생성</Button>
            </>
          }
          onClose={() => setIsModalOpen(false)}
        >
          <p className={styles.modalText}>
          </p>
        </Modal>
      ) : null}
    </section>
  );
}
