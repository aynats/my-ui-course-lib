export type CalendarLocale = 'ru-RU' | 'en-US' | 'ar-EG';

type LocaleConfig = {
	direction: 'ltr' | 'rtl';
	weekStartsOn: number;
	weekendDays: readonly number[];
	weekdayFormat: 'short' | 'narrow';
	numberingSystem: 'latn' | 'arab';

	messages: {
		today: string;
		previousMonth: string;
		nextMonth: string;
		calendar: string;
		noDateSelected: string;
	};
};

export const localeConfig = {
	'ru-RU': {
		direction: 'ltr',
		weekStartsOn: 1,
		weekendDays: [0, 6],
		weekdayFormat: 'short',
		numberingSystem: 'latn',

		messages: {
			today: 'Сегодня',
			previousMonth: 'Предыдущий месяц',
			nextMonth: 'Следующий месяц',
			calendar: 'Календарь',
			noDateSelected: 'Дата не выбрана',
		},
	},

	'en-US': {
		direction: 'ltr',
		weekStartsOn: 0,
		weekendDays: [0, 6],
		weekdayFormat: 'short',
		numberingSystem: 'latn',

		messages: {
			today: 'Today',
			previousMonth: 'Previous month',
			nextMonth: 'Next month',
			calendar: 'Calendar',
			noDateSelected: 'No date selected',
		},
	},

	'ar-EG': {
		direction: 'rtl',
		weekStartsOn: 6,
		weekendDays: [5, 6],
		weekdayFormat: 'narrow',
		numberingSystem: 'arab',

		messages: {
			today: 'اليوم',
			previousMonth: 'الشهر السابق',
			nextMonth: 'الشهر التالي',
			calendar: 'التقويم',
			noDateSelected: 'لم يتم اختيار تاريخ',
		},
	},
} satisfies Record<CalendarLocale, LocaleConfig>;

export function createCalendarFormatters(locale: CalendarLocale) {
	const config = localeConfig[locale];

	const options = {
		calendar: 'gregory',
		numberingSystem: config.numberingSystem,
	};

	const month = new Intl.DateTimeFormat(locale, {
		...options,
		month: 'long',
	});

	const year = new Intl.DateTimeFormat(locale, {
		...options,
		year: 'numeric',
	});

	const weekday = new Intl.DateTimeFormat(locale, {
		...options,
		weekday: config.weekdayFormat,
	});

	const fullWeekday = new Intl.DateTimeFormat(locale, {
		...options,
		weekday: 'long',
	});

	const day = new Intl.DateTimeFormat(locale, {
		...options,
		day: 'numeric',
	});
	
	const footerMonthFormat = locale === 'en-US' ? 'short' : 'long';

	const footerFormatter = new Intl.DateTimeFormat(locale, {
		...options,
		day: 'numeric',
		month: footerMonthFormat,
		year: 'numeric',
	});

	const footer = {
		format: (date: Date) => {
			return footerFormatter
				.formatToParts(date)
				.filter((part) => {
					return !(part.type === 'literal' && part.value.includes('г'));
				})
				.map((part) => part.value)
				.join('')
				.trim();
		},
	};

	const fullDate = new Intl.DateTimeFormat(locale, {
		...options,
		weekday: 'long',
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});

	return {
		month,
		year,
		weekday,
		fullWeekday,
		day,
		footer,
		fullDate,
	};
}

export function formatMonthTitle(
	date: Date,
	locale: CalendarLocale,
): string {
	const formatters = createCalendarFormatters(locale);

	const month = formatters.month.format(date);
	const capitalizedMonth =
		month.charAt(0).toLocaleUpperCase(locale) + month.slice(1);

	const year = formatters.year
		.formatToParts(date)
		.filter((part) => part.type === 'year')
		.map((part) => part.value)
		.join('');

	return `${capitalizedMonth} ${year}`;
}

export function getWeekdayLabels(locale: CalendarLocale) {
	const config = localeConfig[locale];
	const formatters = createCalendarFormatters(locale);

	return Array.from({ length: 7 }, (_, index) => {
		const weekdayIndex =
			(config.weekStartsOn + index) % 7;

		const date = new Date(2024, 0, 7 + weekdayIndex);

		return {
			key: weekdayIndex,
			short: formatters.weekday.format(date),
			full: formatters.fullWeekday.format(date),
		};
	});
}