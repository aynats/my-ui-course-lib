import { style } from '@vanilla-extract/css';
import { vars } from '../../theme/theme.css';

export const calendar = style({
	boxSizing: 'border-box',
	width: vars.calendarWidth,
	padding: vars.calendarPadding,

	border: `${vars.calendarBorderWidth} solid ${vars.calendarBorderColor}`,
	borderRadius: vars.calendarBorderRadius,

	backgroundColor: vars.calendarBg,
	color: vars.calendarTextColor,
	fontFamily: vars.calendarFontFamily,
});

export const header = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	marginBlockEnd: vars.calendarSectionGap,
});

export const title = style({
	margin: 0,
	fontSize: vars.calendarTitleFontSize,
	fontWeight: vars.calendarTitleFontWeight,
	textAlign: 'center',
});

export const navigationButton = style({
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexShrink: 0,

	width: vars.calendarNavigationSize,
	height: vars.calendarNavigationSize,

	padding: 0,
	border: `${vars.calendarBorderWidth} solid ${vars.calendarTextColor}`,
	borderRadius: vars.calendarNavigationBorderRadius,

	backgroundColor: vars.calendarBg,
	color: vars.calendarTextColor,
	cursor: 'pointer',

	':hover': {
		backgroundColor: vars.calendarDayHoverBg,
	},

	':active': {
		backgroundColor: vars.calendarDayActiveBg,
	},

	':focus-visible': {
		outline: `${vars.calendarFocusWidth} solid ${vars.calendarFocusColor}`,
		outlineOffset: vars.calendarFocusOffset,
	},
});

export const navigationIcon = style({
	display: 'block',
	width: vars.calendarNavigationIconSize,
	height: vars.calendarNavigationIconSize,
});

export const mirroredIcon = style({
	transform: 'scaleX(-1)',
});

export const grid = style({
	display: 'flex',
	flexDirection: 'column',
	gap: vars.calendarWeekGap,
});

export const week = style({
	display: 'grid',
	gridTemplateColumns: 'repeat(7, minmax(0, 1fr))',
});

export const weekday = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',

	height: vars.calendarWeekdayHeight,
	fontSize: vars.calendarWeekdayFontSize,
	fontWeight: vars.calendarWeekdayFontWeight,
	color: vars.calendarMutedTextColor,
});

export const cell = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
});

export const day = style({
	position: 'relative',
	boxSizing: 'border-box',

	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',

	width: vars.calendarDaySize,
	height: vars.calendarDaySize,
	padding: 0,

	border: 'none',
	borderRadius: vars.calendarDayBorderRadius,

	backgroundColor: 'transparent',
	color: vars.calendarTextColor,

	fontFamily: 'inherit',
	fontSize: vars.calendarDayFontSize,
	fontWeight: vars.calendarDayFontWeight,

	cursor: 'pointer',

	selectors: {
		'&[data-weekend="true"]': {
			color: vars.calendarWeekendTextColor,
		},

		'&:hover:not([aria-disabled="true"]):not([data-selected="true"])': {
			backgroundColor: vars.calendarDayHoverBg,
		},

		'&:active:not([aria-disabled="true"]):not([data-selected="true"])': {
			backgroundColor: vars.calendarDayActiveBg,
		},

		'&[data-selected="true"]': {
			backgroundColor: vars.calendarSelectedBg,
			color: vars.calendarSelectedTextColor,
			fontWeight: vars.calendarSelectedDayFontWeight,
		},

		'&[aria-disabled="true"]': {
			color: vars.calendarDisabledTextColor,
			cursor: 'not-allowed',
		},
	},

	':focus-visible': {
		outline: `${vars.calendarFocusWidth} solid ${vars.calendarFocusColor}`,
		outlineOffset: vars.calendarFocusOffset,
	},
});

export const todayDot = style({
	position: 'absolute',
	insetBlockEnd: vars.calendarTodayDotOffset,

	width: vars.calendarTodayDotSize,
	height: vars.calendarTodayDotSize,
	borderRadius: '50%',

	backgroundColor: 'currentColor',
});

export const footer = style({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',

	marginBlockStart: vars.calendarSectionGap,
	paddingBlockStart: vars.calendarFooterPaddingBlock,

	borderBlockStart:
		`${vars.calendarBorderWidth} solid ${vars.calendarBorderColor}`,
});

export const selectedDate = style({
	fontSize: vars.calendarFooterFontSize,
	fontWeight: vars.calendarFooterFontWeight,
	color: vars.calendarMutedTextColor,
});