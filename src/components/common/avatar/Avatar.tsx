import styles from './Avatar.module.css';

interface AvatarProps {
  src?: string;
  alt?: string;
}

export default function Avatar({ src, alt = 'profile' }: AvatarProps) {
  return (
    <div className={styles.avatar}>
      {src ? <img src={src} alt={alt} className={styles.image} /> : <span>P</span>}
    </div>
  );
}