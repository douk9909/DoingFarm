'use client';

import DatePicker from 'react-datepicker';
import styles from './TodoDateField.module.css';

interface TodoDateFieldProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
}

export default function TodoDateField({ value, onChange }: TodoDateFieldProps) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>마감일</span>
      <span className={styles.dateField}>
        <DatePicker
          selected={value}
          onChange={onChange}
          showTimeSelect
          timeIntervals={30}
          dateFormat="yyyy. MM. dd HH:mm"
          minDate={new Date()}
          placeholderText="2024. 07. 31 14:30"
          className={styles.dateInput}
          wrapperClassName={styles.datePickerWrapper}
          calendarClassName={styles.todoCalendar}
          popperClassName={styles.todoDatePickerPopper}
        />
      </span>
    </label>
  );
}
