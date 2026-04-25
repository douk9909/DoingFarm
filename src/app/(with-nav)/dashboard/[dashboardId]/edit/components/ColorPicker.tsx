import styles from '../edit.module.css';

const COLORS = [
  'var(--color-profile-rose)',
  'var(--color-profile-orange)',
  'var(--color-profile-yellow)',
  'var(--color-profile-green)',
  'var(--color-profile-cobalt)',
  'var(--color-profile-violet)',
];

export default function ColorPicker() {
  return (
    <div className={styles.colorList}>
      {COLORS.map((color) => (
        <button
          key={color}
          type="button"
          style={{ backgroundColor: color }}
          className={styles.pickColor}
        ></button>
      ))}
    </div>
  );
}
