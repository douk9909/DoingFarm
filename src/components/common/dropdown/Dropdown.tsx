import styles from './Dropdown.module.css';

interface DropdownProps {
  items: string[];
}

export default function Dropdown({ items }: DropdownProps) {
  return (
    <ul className={styles.dropdown}>
      {items.map((item) => (
        <li key={item} className={styles.item}>
          {item}
        </li>
      ))}
    </ul>
  );
}
