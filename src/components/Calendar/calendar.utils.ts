export function startOfDay(date: Date): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
}

export function startOfMonth(date: Date): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    1,
  );
}

export function isSameDay(
  first: Date | null,
  second: Date | null,
): boolean {
  if (!first || !second) {
    return false;
  }

  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

export function addDays(date: Date, amount: number): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + amount,
  );
}

export function addMonths(date: Date, amount: number): Date {
  return new Date(
    date.getFullYear(),
    date.getMonth() + amount,
    1,
  );
}

export function getDateKey(date: Date): string {
  return [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate(),
  ].join('-');
}

type DateRestrictions = {
  minDate?: Date;
  maxDate?: Date;
  isDateDisabled?: (date: Date) => boolean;
};

export function isDayDisabled(
  date: Date,
  {
    minDate,
    maxDate,
    isDateDisabled,
  }: DateRestrictions,
): boolean {
  const day = startOfDay(date);
  const timestamp = day.getTime();

  if (
    minDate &&
    timestamp < startOfDay(minDate).getTime()
  ) {
    return true;
  }

  if (
    maxDate &&
    timestamp > startOfDay(maxDate).getTime()
  ) {
    return true;
  }

  return isDateDisabled?.(day) ?? false;
}

export type CalendarCell = Date | null;

export function getMonthWeeks(
  month: Date,
  weekStartsOn: number,
): CalendarCell[][] {
  const year = month.getFullYear();
  const monthIndex = month.getMonth();

  const firstDay = new Date(year, monthIndex, 1);

  const daysInMonth = new Date(
    year,
    monthIndex + 1,
    0,
  ).getDate();

  const leadingEmptyCount =
    (firstDay.getDay() - weekStartsOn + 7) % 7;

  const cellCount =
    Math.ceil((leadingEmptyCount + daysInMonth) / 7) * 7;

  const cells: CalendarCell[] = Array.from(
    { length: cellCount },
    (_, index) => {
      const day = index - leadingEmptyCount + 1;

      if (day < 1 || day > daysInMonth) {
        return null;
      }

      return new Date(year, monthIndex, day);
    },
  );

  const weeks: CalendarCell[][] = [];

  for (let index = 0; index < cells.length; index += 7) {
    weeks.push(cells.slice(index, index + 7));
  }

  return weeks;
}