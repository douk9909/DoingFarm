'use client';

import { useRef } from 'react';
import DatePicker from 'react-datepicker';
import styles from './TodoDateField.module.css';

interface TodoDateFieldProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
}

export default function TodoDateField({ value, onChange }: TodoDateFieldProps) {
  // DatePicker 인스턴스를 직접 제어하기 위한 ref
  const datePickerRef = useRef<DatePicker>(null);

  return (
    // label로 감싸면 클릭 이벤트가 재발생해서 캘린더가 다시 열릴 수 있음 → div로 변경
    <div className={styles.field}>
      <span className={styles.label}>마감일</span>

      <span className={styles.dateField}>
        <DatePicker
          ref={datePickerRef}
          selected={value}
          onChange={(date: Date | null) => {
            // 선택된 날짜를 상위로 전달
            onChange(date);

            // DatePicker는 showTimeSelect 사용 시 자동으로 닫히지 않음
            // → ref를 통해 직접 닫아줌
            setTimeout(() => {
              datePickerRef.current?.setOpen(false);
            }, 0);
          }}
          showTimeSelect
          timeIntervals={30}
          dateFormat="yyyy. MM. dd HH:mm"
          minDate={new Date()}
          placeholderText="날짜를 선택해주세요"
          className={styles.dateInput}
          wrapperClassName={styles.datePickerWrapper}
          calendarClassName={styles.todoCalendar}
          popperClassName={styles.todoDatePickerPopper}
          shouldCloseOnSelect
        />
      </span>
    </div>
  );
}