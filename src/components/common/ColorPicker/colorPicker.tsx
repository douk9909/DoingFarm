import { DASHBOARD_COLORS } from '@/lib/constants/color';

import { cn } from '@/lib/utils/cn';
import CheckIcon from '@/assets/icons/CheckIcon';
import styles from './colorPicker.module.css';

interface ColorPickerProps {
  selectedColor: string;
  onSelect: (color: string) => void;
}

export default function ColorPicker({ selectedColor, onSelect }: ColorPickerProps) {
  return (
    <div className={styles.colorList}>
      {DASHBOARD_COLORS.map((color) => (
        <button
          key={color}
          type="button"
          style={{ backgroundColor: color }}
          className={cn(styles.colorButton, selectedColor === color && styles.selected)}
          onClick={() => onSelect(color)}
        >
          {selectedColor === color && <CheckIcon />}
        </button>
      ))}
    </div>
  );
}
