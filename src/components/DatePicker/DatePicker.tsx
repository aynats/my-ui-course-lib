import React, {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import styles from './DatePicker.module.css';

export type DatePickerSize = 'S' | 'M' | 'L';

export interface DatePickerProps {
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;

  minDate?: Date;
  maxDate?: Date;
  disabledDates?: Date[];

  size?: DatePickerSize;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;

  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;

  clearable?: boolean;
  showToday?: boolean;

  locale?: string;
  firstDayOfWeek?: 0 | 1;

  name?: string;
  id?: string;
  className?: string;
}

const MONTHS = 12;
const DAYS_IN_WEEK = 7;

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const startOfDay = (date: Date) => {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
};

const isBefore = (a: Date, b: Date) =>
  startOfDay(a).getTime() < startOfDay(b).getTime();

const isAfter = (a: Date, b: Date) =>
  startOfDay(a).getTime() > startOfDay(b).getTime();

const formatDate = (date: Date | null, locale: string) => {
  if (!date) return '';

  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

const parseDate = (value: string): Date | null => {
  const match = value.match(/^(\d{2})[./-](\d{2})[./-](\d{4})$/);

  if (!match) return null;

  const [, day, month, year] = match;

  const date = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
  );

  // Prevent dates such as 31.02.2026 from becoming
  // another valid date through Date's automatic normalization.
  if (
    date.getFullYear() !== Number(year) ||
    date.getMonth() !== Number(month) - 1 ||
    date.getDate() !== Number(day)
  ) {
    return null;
  }

  return date;
};

const getCalendarDays = (month: Date, firstDayOfWeek: number) => {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();

  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);

  const offset =
    (firstDay.getDay() - firstDayOfWeek + DAYS_IN_WEEK) %
    DAYS_IN_WEEK;

  const daysInMonth = lastDay.getDate();

  const days: Date[] = [];

  for (let i = 0; i < offset; i += 1) {
    days.push(
      new Date(year, monthIndex, i - offset + 1),
    );
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    days.push(new Date(year, monthIndex, day));
  }

  while (days.length < 42) {
    const nextDay = days.length - offset - daysInMonth + 1;

    days.push(
      new Date(year, monthIndex + 1, nextDay),
    );
  }

  return days;
};

export const DatePicker = ({
  value,
  defaultValue = null,
  onChange,

  minDate,
  maxDate,
  disabledDates = [],

  size = 'M',
  disabled = false,
  readOnly = false,
  required = false,

  label,
  placeholder = 'DD.MM.YYYY',
  error,
  helperText,

  clearable = true,
  showToday = true,

  locale = 'en-GB',
  firstDayOfWeek = 1,

  name,
  id,
  className = '',
}: DatePickerProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const calendarId = `${inputId}-calendar`;

  const isControlled = value !== undefined;

  const [internalValue, setInternalValue] =
    useState<Date | null>(defaultValue);

  const selectedDate = isControlled ? value ?? null : internalValue;

  const [inputValue, setInputValue] = useState(
    formatDate(selectedDate, locale),
  );

  const [isOpen, setIsOpen] = useState(false);

  const [visibleMonth, setVisibleMonth] = useState(
    selectedDate ?? new Date(),
  );

  const [focusedDate, setFocusedDate] = useState(
    selectedDate ?? new Date(),
  );

  const [inputError, setInputError] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(formatDate(selectedDate, locale));

    if (selectedDate) {
      setVisibleMonth(selectedDate);
      setFocusedDate(selectedDate);
    }
  }, [selectedDate, locale]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (
        rootRef.current &&
        !rootRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener(
        'pointerdown',
        handlePointerDown,
      );
    };
  }, []);

  const isDateDisabled = (date: Date) => {
    if (disabled) return true;

    if (minDate && isBefore(date, minDate)) {
      return true;
    }

    if (maxDate && isAfter(date, maxDate)) {
      return true;
    }

    return disabledDates.some((disabledDate) =>
      isSameDay(date, disabledDate),
    );
  };

  const commitChange = (date: Date | null) => {
    if (date && isDateDisabled(date)) {
      return;
    }

    if (!isControlled) {
      setInternalValue(date);
    }

    setInputValue(formatDate(date, locale));
    setInputError(false);
    onChange?.(date);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const nextValue = event.target.value;

    setInputValue(nextValue);
    setInputError(false);

    if (!nextValue) {
      commitChange(null);
      return;
    }

    const parsed = parseDate(nextValue);

    if (parsed) {
      if (isDateDisabled(parsed)) {
        setInputError(true);
        return;
      }

      commitChange(parsed);
    }
  };

  const handleInputBlur = () => {
    // Required + empty
    if (!inputValue.trim()) {
      setInputError(required);
      return;
    }

    const parsed = parseDate(inputValue);

    // Invalid or unavailable date
    if (!parsed || isDateDisabled(parsed)) {
      setInputError(true);

      setInputValue(
        formatDate(selectedDate, locale),
      );

      return;
    }

    setInputError(false);
  };

  const validationError =
    error ||
    (inputError && required && !inputValue.trim()
      ? 'Please select a date'
      : inputError
        ? 'Please enter a valid date'
        : undefined);

  const handleDayClick = (date: Date) => {
    if (isDateDisabled(date)) return;

    commitChange(date);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const changeMonth = (offset: number) => {
    setVisibleMonth(
      new Date(
        visibleMonth.getFullYear(),
        visibleMonth.getMonth() + offset,
        1,
      ),
    );
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (disabled || readOnly) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();

      setIsOpen(true);
      return;
    }

    if (event.key === 'Escape') {
      setIsOpen(false);
      return;
    }

    if (!isOpen) return;

    let nextDate: Date | null = null;

    switch (event.key) {
      case 'ArrowLeft':
        nextDate = new Date(focusedDate);
        nextDate.setDate(nextDate.getDate() - 1);
        break;

      case 'ArrowRight':
        nextDate = new Date(focusedDate);
        nextDate.setDate(nextDate.getDate() + 1);
        break;

      case 'ArrowUp':
        nextDate = new Date(focusedDate);
        nextDate.setDate(nextDate.getDate() - 7);
        break;

      case 'ArrowDown':
        nextDate = new Date(focusedDate);
        nextDate.setDate(nextDate.getDate() + 7);
        break;

      case 'Enter':
        event.preventDefault();
        handleDayClick(focusedDate);
        return;

      default:
        return;
    }

    event.preventDefault();

    if (nextDate) {
      setFocusedDate(nextDate);
      setVisibleMonth(nextDate);
    }
  };

  const days = useMemo(
    () => getCalendarDays(visibleMonth, firstDayOfWeek),
    [visibleMonth, firstDayOfWeek],
  );

  const monthLabel = new Intl.DateTimeFormat(locale, {
    month: 'long',
    year: 'numeric',
  }).format(visibleMonth);

  const weekdayLabels = useMemo(() => {
    const baseDate = new Date(2024, 0, 1);

    return Array.from({ length: DAYS_IN_WEEK }, (_, index) => {
      const date = new Date(baseDate);

      date.setDate(
        baseDate.getDate() +
        ((firstDayOfWeek + index) % DAYS_IN_WEEK),
      );

      return new Intl.DateTimeFormat(locale, {
        weekday: 'short',
      }).format(date);
    });
  }, [locale, firstDayOfWeek]);

  const describedBy = [
    error ? `${inputId}-error` : '',
    helperText ? `${inputId}-helper` : '',
  ]
    .filter(Boolean)
    .join(' ') || undefined;

  return (
    <div
      ref={rootRef}
      className={`${styles.wrapper} ${className}`}
    >
      {label && (
        <label
          htmlFor={inputId}
          className={styles.label}
        >
          {label}
          {required && (
            <span aria-hidden="true"> *</span>
          )}
        </label>
      )}

      <div
        className={[
          styles.control,
          styles[`size-${size}`],
          isOpen ? styles.focused : '',
          validationError ? styles.error : '',
          disabled ? styles.disabled : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        <input
          ref={inputRef}
          id={inputId}
          name={name}
          type="text"
          value={inputValue}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          autoComplete="off"
          inputMode="numeric"
          aria-invalid={error || inputError ? true : undefined}
          aria-describedby={describedBy}
          aria-expanded={isOpen}
          aria-controls={isOpen ? calendarId : undefined}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onFocus={() => {
            if (!readOnly && !disabled) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          className={styles.input}
        />

        {clearable && selectedDate && !disabled && !readOnly && (
          <button
            type="button"
            className={styles.clearButton}
            aria-label="Clear date"
            onClick={() => {
              commitChange(null);
              inputRef.current?.focus();
            }}
          >
            ×
          </button>
        )}

        <button
          type="button"
          className={styles.calendarButton}
          disabled={disabled || readOnly}
          aria-label="Open calendar"
          aria-expanded={isOpen}
          onClick={() => {
            if (!disabled && !readOnly) {
              setIsOpen((current) => !current);
              inputRef.current?.focus();
            }
          }}
        >
          <span aria-hidden="true">▦</span>
        </button>
      </div>

      {validationError && (
        <div
          id={`${inputId}-error`}
          className={styles.errorText}
        >
          {validationError}
        </div>
      )}
      {!error && helperText && (
        <div
          id={`${inputId}-helper`}
          className={styles.helperText}
        >
          {helperText}
        </div>
      )}

      {isOpen && !disabled && !readOnly && (
        <div
          id={calendarId}
          className={styles.calendar}
          role="dialog"
          aria-label="Choose date"
        >
          <div className={styles.calendarHeader}>
            <button
              type="button"
              className={styles.navigationButton}
              aria-label="Previous month"
              onClick={() => changeMonth(-1)}
            >
              ‹
            </button>

            <div
              className={styles.monthLabel}
              aria-live="polite"
            >
              {monthLabel}
            </div>

            <button
              type="button"
              className={styles.navigationButton}
              aria-label="Next month"
              onClick={() => changeMonth(1)}
            >
              ›
            </button>
          </div>

          <div className={styles.weekdays}>
            {weekdayLabels.map((day) => (
              <div
                key={day}
                className={styles.weekday}
              >
                {day}
              </div>
            ))}
          </div>

          <div className={styles.days}>
            {days.map((date) => {
              const outsideMonth =
                date.getMonth() !== visibleMonth.getMonth();

              const dateDisabled =
                isDateDisabled(date);

              const selected =
                selectedDate &&
                isSameDay(date, selectedDate);

              const focused =
                isSameDay(date, focusedDate);

              const today = isSameDay(
                date,
                new Date(),
              );

              return (
                <button
                  type="button"
                  key={date.toISOString()}
                  disabled={dateDisabled}
                  className={[
                    styles.day,
                    outsideMonth
                      ? styles.outsideMonth
                      : '',
                    selected ? styles.selected : '',
                    focused ? styles.focusedDay : '',
                    today ? styles.today : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                  aria-current={
                    today ? 'date' : undefined
                  }
                  aria-selected={
                    selected || undefined
                  }
                  onClick={() =>
                    handleDayClick(date)
                  }
                  onFocus={() =>
                    setFocusedDate(date)
                  }
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          {showToday && (
            <button
              type="button"
              className={styles.todayButton}
              onClick={() => {
                const today = new Date();

                if (!isDateDisabled(today)) {
                  handleDayClick(today);
                }
              }}
              disabled={isDateDisabled(new Date())}
            >
              Today
            </button>
          )}
        </div>
      )}
    </div>
  );
};

