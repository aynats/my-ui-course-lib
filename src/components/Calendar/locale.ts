import { createContext, useContext } from 'react';

export type Locale = {
	locale: string;
	dir: 'ltr' | 'rtl';

	firstDayOfWeek: number;
	weekend: number[];

	messages: {
		calendar: {
			today: string;
			prevMonth: string;
			nextMonth: string;
		};
	};
};

export const ruRU: Locale = {
	locale: 'ru-RU',
	dir: 'ltr',
	firstDayOfWeek: 1,
	weekend: [6, 0],

	messages: {
		calendar: {
			today: 'Сегодня',
			prevMonth: 'Предыдущий месяц',
			nextMonth: 'Следующий месяц',
		},
	},
};

export const enUS: Locale = {
	locale: 'en-US',
	dir: 'ltr',
	firstDayOfWeek: 0,
	weekend: [6, 0],

	messages: {
		calendar: {
			today: 'Today',
			prevMonth: 'Previous month',
			nextMonth: 'Next month',
		},
	},
};

export const arEG: Locale = {
	locale: 'ar-EG',
	dir: 'rtl',
	firstDayOfWeek: 6,
	weekend: [5, 6],

	messages: {
		calendar: {
			today: 'اليوم',
			prevMonth: 'الشهر السابق',
			nextMonth: 'الشهر التالي',
		},
	},
};

export const LocaleContext = createContext<Locale>(ruRU);

export const useLocale = () => useContext(LocaleContext);

export function createCalendarFormatters(locale: string) {
	const options: Intl.DateTimeFormatOptions = {
		calendar: 'gregory',
		numberingSystem: locale === 'ar-EG' ? 'arab' : 'latn',
	};

	const footerFormatter = new Intl.DateTimeFormat(locale, {
		...options,
		day: 'numeric',
		month: locale === 'en-US' ? 'short' : 'long',
		year: 'numeric',
	});

	const footer = {
		format(date: Date): string {
			if (locale !== 'ru-RU') {
				return footerFormatter.format(date);
			}

			return footerFormatter
				.formatToParts(date)
				.map((part) => {
					if (part.type === 'literal') {
						return part.value.replace(/\s*г\.\s*$/u, '');
					}

					return part.value;
				})
				.join('')
				.trim();
		},
	};

	return {
		month: new Intl.DateTimeFormat(locale, {
			...options,
			month: 'long',
		}),

		year: new Intl.DateTimeFormat(locale, {
			...options,
			year: 'numeric',
		}),

		weekday: new Intl.DateTimeFormat(locale, {
			...options,
			weekday: locale === 'ar-EG' ? 'narrow' : 'short',
		}),

		fullWeekday: new Intl.DateTimeFormat(locale, {
			...options,
			weekday: 'long',
		}),

		day: new Intl.DateTimeFormat(locale, {
			...options,
			day: 'numeric',
		}),

		footer,
		
		fullDate: new Intl.DateTimeFormat(locale, {
			...options,
			weekday: 'long',
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		}),
	};
}

type CalendarFormatters =
	ReturnType<typeof createCalendarFormatters>;

export function formatMonthTitle(
	date: Date,
	locale: string,
	formatters = createCalendarFormatters(locale),
): string {
	const month = formatters.month.format(date);

	const capitalizedMonth =
		month.charAt(0).toLocaleUpperCase(locale) +
		month.slice(1);

	const year = formatters.year
		.formatToParts(date)
		.filter((part) => part.type === 'year')
		.map((part) => part.value)
		.join('');

	return `${capitalizedMonth} ${year}`;
}

export function getWeekdayLabels(
	locale: Locale,
	formatters: CalendarFormatters =
		createCalendarFormatters(locale.locale),
) {
	return Array.from({ length: 7 }, (_, index) => {
		const weekdayIndex =
			(locale.firstDayOfWeek + index) % 7;

		const date = new Date(2024, 0, 7 + weekdayIndex);

		return {
			key: weekdayIndex,
			short: formatters.weekday.format(date),
			full: formatters.fullWeekday.format(date),
		};
	});
}