import { cn } from '@/lib/utils/cn';

import styles from './Skeleton.module.css';

interface SkeletonProps {
  className?: string;
  variant?: 'rect' | 'circle';
}

export default function Skeleton({ className, variant = 'rect' }: SkeletonProps) {
  return <div className={cn(styles.base, variant === 'circle' && styles.circle, className)} />;
}
