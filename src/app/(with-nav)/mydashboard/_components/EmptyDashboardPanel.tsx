import Image, { type StaticImageData } from 'next/image';
import Button from '@/components/common/button/Button';
import plusIcon from '@/assets/icon/ic_plus3.svg';
import styles from '../page.module.css';

interface EmptyDashboardPanelProps {
  message: string;
  image: StaticImageData;
  imageAlt: string;
  actionLabel?: string;
  priority?: boolean;
}

export default function EmptyDashboardPanel({
  message,
  image,
  imageAlt,
  actionLabel,
  priority = false,
}: EmptyDashboardPanelProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.emptyState}>
        <Image
          src={image}
          alt={imageAlt}
          width={110}
          height={74}
          className={styles.stateImage}
          priority={priority}
        />

        <p className={styles.message}>{message}</p>

        {actionLabel ? (
          <Button size="sm" className={styles.createButton}>
            {actionLabel}
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
