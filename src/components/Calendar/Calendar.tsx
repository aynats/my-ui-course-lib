import { useEffect, useId, useRef, useState, useMemo, } from 'react';
import type { KeyboardEvent } from 'react';
import {
  addDays, addMonths, getDateKey, getMonthWeeks, isDayDisabled,
  isSameDay, startOfDay, startOfMonth,
} from './calendar.utils';

import {
  createCalendarFormatters, formatMonthTitle, getWeekdayLabels, useLocale,
} from './locale';

import * as styles from './Calendar.css';

import { Button } from '../Button/Button';
import { CalendarIcon } from '../CalendarIcon/CalendarIcon';
import type { CalendarProps } from './Calendar.types';

function isSameMonth(first: Date, second: Date): boolean {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth()
  );
}

export const Calendar = ({
  value,
  onValueChange,
  month: controlledMonth,
  onMonthChange,
  minDate,
  maxDate,
  isDateDisabled,
  autoFocus = false,
  className,
}: CalendarProps) => {
  const locale = useLocale();
  const { messages } = locale;

  const titleId = useId();

  const formatters = useMemo(
    () => createCalendarFormatters(locale.locale),
    [locale.locale],
  );
  const weekdays = getWeekdayLabels(locale, formatters);

  const [internalMonth, setInternalMonth] = useState(() =>
    startOfMonth(value ?? new Date()),
  );

  const month = startOfMonth(
    controlledMonth ?? internalMonth,
  );


  const [focusedDate, setFocusedDate] = useState(() => {
    const initialMonth = startOfMonth(
      controlledMonth ?? value ?? new Date(),
    );

    const initialDay = value ?? new Date();

    return isSameMonth(initialDay, initialMonth)
      ? startOfDay(initialDay)
      : initialMonth;
  });

  const dayRefs = useRef(
    new Map<string, HTMLButtonElement>(),
  );

  const pendingFocus = useRef<Date | null>(
    autoFocus ? focusedDate : null,
  );

  const today = startOfDay(new Date());
  const weeks = getMonthWeeks(month, locale.firstDayOfWeek);

  const restrictions = {
    minDate,
    maxDate,
    isDateDisabled,
  };

  const visibleValue =
    value && isSameMonth(value, month)
      ? value
      : null;

  const tabStopDate = isSameMonth(focusedDate, month)
    ? focusedDate
    : visibleValue ?? month;

  useEffect(() => {
    const target = pendingFocus.current;

    if (!target) {
      return;
    }

    const node = dayRefs.current.get(getDateKey(target));

    if (!node) {
      return;
    }

    pendingFocus.current = null;
    node.focus();
  });

  const changeMonth = (date: Date) => {
    const nextMonth = startOfMonth(date);

    if (isSameMonth(nextMonth, month)) {
      return;
    }

    if (controlledMonth === undefined) {
      setInternalMonth(nextMonth);
    }

    onMonthChange?.(nextMonth);
  };

  const selectDate = (date: Date) => {
    if (isDayDisabled(date, restrictions)) {
      return;
    }

    onValueChange(startOfDay(date));
  };

  const moveFocus = (date: Date) => {
    pendingFocus.current = date;

    setFocusedDate(date);
    changeMonth(date);
  };

  const showPreviousMonth = () => {
    pendingFocus.current = null;
    changeMonth(addMonths(month, -1));
  };

  const showNextMonth = () => {
    pendingFocus.current = null;
    changeMonth(addMonths(month, 1));
  };

  const goToToday = () => {
    pendingFocus.current = null;

    changeMonth(today);
    setFocusedDate(today);
    selectDate(today);
  };

  const handleDayKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    date: Date,
  ) => {
    let targetDate: Date;

    switch (event.key) {
      case 'ArrowLeft':
        targetDate = addDays(
          date,
          locale.dir === 'rtl' ? 1 : -1,
        );
        break;

      case 'ArrowRight':
        targetDate = addDays(
          date,
          locale.dir === 'rtl' ? -1 : 1,
        );
        break;

      case 'ArrowUp':
        targetDate = addDays(date, -7);
        break;

      case 'ArrowDown':
        targetDate = addDays(date, 7);
        break;

      case 'Home': {
        const offset =
          (date.getDay() - locale.firstDayOfWeek + 7) % 7;

        targetDate = addDays(date, -offset);
        break;
      }

      case 'End': {
        const offset =
          (date.getDay() - locale.firstDayOfWeek + 7) % 7;

        targetDate = addDays(date, 6 - offset);
        break;
      }

      case 'PageUp':
      case 'PageDown': {
        const offset =
          event.key === 'PageUp' ? -1 : 1;

        const nextMonth = addMonths(date, offset);

        const lastDay = new Date(
          nextMonth.getFullYear(),
          nextMonth.getMonth() + 1,
          0,
        ).getDate();

        targetDate = new Date(
          nextMonth.getFullYear(),
          nextMonth.getMonth(),
          Math.min(date.getDate(), lastDay),
        );
        break;
      }

      default:
        return;
    }

    event.preventDefault();
    moveFocus(targetDate);
  };

  const iconClassName = [
    styles.navigationIcon,
    locale.dir === 'rtl' && styles.mirroredIcon,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section
      className={[styles.calendar, className]
        .filter(Boolean)
        .join(' ')}
      dir={locale.dir}
      lang={locale.locale}
    >
      <div className={styles.header}>
        <button
          type="button"
          className={styles.navigationButton}
          aria-label={messages.calendar.prevMonth}
          onClick={showPreviousMonth}
        >
          <svg
            className={iconClassName}
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M10 3 5 8l5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <h2
          id={titleId}
          className={styles.title}
          aria-live="polite"
          aria-atomic="true"
        >
          {formatMonthTitle(month, locale.locale, formatters)}
        </h2>

        <button
          type="button"
          className={styles.navigationButton}
          aria-label={messages.calendar.nextMonth}
          onClick={showNextMonth}
        >
          <svg
            className={iconClassName}
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="m6 3 5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <div
        role="grid"
        aria-labelledby={titleId}
        className={styles.grid}
      >
        <div role="row" className={styles.week}>
          {weekdays.map((weekday) => (
            <div
              key={weekday.key}
              role="columnheader"
              aria-label={weekday.full}
              className={styles.weekday}
            >
              {weekday.short}
            </div>
          ))}
        </div>

        {weeks.map((week, weekIndex) => (
          <div
            key={weekIndex}
            role="row"
            className={styles.week}
          >
            {week.map((date, dayIndex) => {
              if (!date) {
                return (
                  <div
                    key={`empty-${dayIndex}`}
                    role="gridcell"
                    className={styles.cell}
                  />
                );
              }

              const key = getDateKey(date);
              const selected = isSameDay(date, value);
              const current = isSameDay(date, today);
              const disabled = isDayDisabled(
                date,
                restrictions,
              );

              const weekend = locale.weekend.includes(
                date.getDay(),
              );

              return (
                <div
                  key={key}
                  role="gridcell"
                  aria-selected={selected}
                  className={styles.cell}
                >
                  <button
                    ref={(node) => {
                      if (node) {
                        dayRefs.current.set(key, node);
                      } else {
                        dayRefs.current.delete(key);
                      }
                    }}
                    type="button"
                    className={styles.day}
                    tabIndex={
                      isSameDay(date, tabStopDate) ? 0 : -1
                    }
                    aria-label={
                      formatters.fullDate.format(date)
                    }
                    aria-current={
                      current ? 'date' : undefined
                    }
                    aria-disabled={disabled}
                    data-selected={selected}
                    data-weekend={weekend}
                    onFocus={() => setFocusedDate(date)}
                    onClick={() => selectDate(date)}
                    onKeyDown={(event) =>
                      handleDayKeyDown(event, date)
                    }
                  >
                    {formatters.day.format(date)}

                    {current && (
                      <span
                        className={styles.todayDot}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <span className={styles.selectedDate}>
          {value
            ? formatters.footer.format(value)
            : null}
        </span>

        <Button
          variant="outline"
          size="S"
          density="compact"
          startIcon={<CalendarIcon />}
          onClick={goToToday}
        >
          {messages.calendar.today}
        </Button>
      </div>
    </section>
  );
};