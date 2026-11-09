import type { CalendarLocale } from './locale';

import { useEffect, useId, useRef, useState, } from 'react';

import type { KeyboardEvent } from 'react';

import { Button } from '../Button/Button';

import {
  addDays,
  addMonths,
  getDateKey,
  getMonthWeeks,
  isDayDisabled,
  isSameDay,
  startOfDay,
  startOfMonth,
} from './calendar.utils';

import {
  createCalendarFormatters, formatMonthTitle, getWeekdayLabels, localeConfig,
} from './locale';

import * as styles from './Calendar.css';
import { CalendarIcon } from '../CalendarIcon/CalendarIcon';

export type CalendarProps = {
  value: Date | null;
  onValueChange: (value: Date) => void;

  locale?: CalendarLocale;

  minDate?: Date;
  maxDate?: Date;
  isDateDisabled?: (date: Date) => boolean;

  defaultMonth?: Date;

  className?: string;
};

export const Calendar = ({
  value,
  onValueChange,
  locale = 'ru-RU',
  minDate,
  maxDate,
  isDateDisabled,
  defaultMonth,
  className,
}: CalendarProps) => {
  const titleId = useId();

  const config = localeConfig[locale];
  const formatters = createCalendarFormatters(locale);
  const weekdays = getWeekdayLabels(locale);

  const [month, setMonth] = useState(() =>
    startOfMonth(defaultMonth ?? value ?? new Date()),
  );

  const [focusedDate, setFocusedDate] = useState(() =>
    startOfDay(value ?? defaultMonth ?? new Date()),
  );

  const dayRefs = useRef(
    new Map<string, HTMLButtonElement>(),
  );

  const shouldMoveFocus = useRef(false);

  const today = startOfDay(new Date());
  const weeks = getMonthWeeks(month, config.weekStartsOn);

  const restrictions = {
    minDate,
    maxDate,
    isDateDisabled,
  };

  const focusedDateIsVisible =
    focusedDate.getFullYear() === month.getFullYear() &&
    focusedDate.getMonth() === month.getMonth();

  const valueIsVisible =
    value !== null &&
    value.getFullYear() === month.getFullYear() &&
    value.getMonth() === month.getMonth();

  // Один день участвует в обычной Tab-навигации.
  const tabStopDate = focusedDateIsVisible
    ? focusedDate
    : valueIsVisible
      ? value!
      : month;

  useEffect(() => {
    if (!shouldMoveFocus.current) {
      return;
    }

    dayRefs.current
      .get(getDateKey(focusedDate))
      ?.focus();

    shouldMoveFocus.current = false;
  }, [focusedDate, month]);

  const selectDate = (date: Date) => {
    if (isDayDisabled(date, restrictions)) {
      return;
    }

    onValueChange(startOfDay(date));
  };

  const moveFocus = (date: Date) => {
    shouldMoveFocus.current = true;

    setFocusedDate(date);
    setMonth(startOfMonth(date));
  };

  const showPreviousMonth = () => {
    setMonth((currentMonth) => addMonths(currentMonth, -1));
  };

  const showNextMonth = () => {
    setMonth((currentMonth) => addMonths(currentMonth, 1));
  };

  const goToToday = () => {
    setMonth(startOfMonth(today));
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
          config.direction === 'rtl' ? 1 : -1,
        );
        break;

      case 'ArrowRight':
        targetDate = addDays(
          date,
          config.direction === 'rtl' ? -1 : 1,
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
          (date.getDay() - config.weekStartsOn + 7) % 7;

        targetDate = addDays(date, -offset);
        break;
      }

      case 'End': {
        const offset =
          (date.getDay() - config.weekStartsOn + 7) % 7;

        targetDate = addDays(date, 6 - offset);
        break;
      }

      case 'PageUp':
      case 'PageDown': {
        const offset = event.key === 'PageUp' ? -1 : 1;
        const targetMonth = addMonths(date, offset);

        const lastDay = new Date(
          targetMonth.getFullYear(),
          targetMonth.getMonth() + 1,
          0,
        ).getDate();

        targetDate = new Date(
          targetMonth.getFullYear(),
          targetMonth.getMonth(),
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
    config.direction === 'rtl' && styles.mirroredIcon,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section
      className={[styles.calendar, className]
        .filter(Boolean)
        .join(' ')}
      dir={config.direction}
      lang={locale}
      aria-label={config.messages.calendar}
    >
      <div className={styles.header}>
        <button
          type="button"
          className={styles.navigationButton}
          aria-label={config.messages.previousMonth}
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
          {formatMonthTitle(month, locale)}
        </h2>

        <button
          type="button"
          className={styles.navigationButton}
          aria-label={config.messages.nextMonth}
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

              const weekend: boolean =
                config.weekendDays.some(
                  (day) => day === date.getDay(),
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
            : config.messages.noDateSelected}
        </span>

        <Button
          variant="outline"
          size="S"
          density="compact"
          startIcon={<CalendarIcon />}
          onClick={goToToday}
        >
          {config.messages.today}
        </Button>
      </div>
    </section>
  );
};