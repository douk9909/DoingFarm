'use client';

import Image from 'next/image';
import Button from '@/components/common/button/Button';
import { useDashboardCreateModal } from '@/components/dashboard/create/DashboardCreateModalProvider';
import plusIcon from '@/assets/icon/ic_plus3.svg';
import type { DashboardEmptySection } from '../_content/dashboardContent';
import styles from '../page.module.css';

interface EmptyDashboardPanelProps {
  section: DashboardEmptySection;
}

export default function EmptyDashboardPanel({ section }: EmptyDashboardPanelProps) {
  const { openDashboardCreateModal } = useDashboardCreateModal();

  return (
    <div className={styles.panel}>
      <div className={styles.emptyState}>
        <Image
          src={section.image}
          alt={section.imageAlt}
          width={110}
          height={74}
          className={styles.stateImage}
          priority={section.priority}
        />

        <p className={styles.message}>{section.message}</p>

        {section.actionLabel ? (
          <Button size="sm" className={styles.createButton} onClick={openDashboardCreateModal}>
            {section.actionLabel}
            <Image
              src={plusIcon}
              alt=""
              width={12}
              height={12}
              className={styles.createButtonPlus}
            />
          </Button>
        ) : null}
      </div>
    </div>
  );
}
