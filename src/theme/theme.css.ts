
import { createGlobalTheme } from '@vanilla-extract/css';

const lightTokens = {
  buttonBorderRadius: '10px',
  buttonGap: '8px',
  buttonFontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  buttonFontWeight: '600',
  outlineColor: '#2563EB',

  buttonFillBg: '#17171B',
  buttonFillBgHover: '#2D2D33',
  buttonFillBgActive: '#050506',
  buttonFillBgDisabled: 'rgba(23, 23, 27, 0.4)',
  buttonFillTextColor: '#FFFFFF',

  buttonOutlineBorderColor: '#17171B',
  buttonOutlineTextColor: '#17171B',
  buttonOutlineBgHover: '#F4F4F5',
  buttonOutlineBgActive: '#E7E7EA',
  buttonOutlineBorderDisabled: 'rgba(23, 23, 27, 0.4)',
  buttonOutlineTextColorDisabled: 'rgba(23, 23, 27, 0.4)',

  buttonTextTextColor: '#17171B',
  buttonTextBgHover: '#F4F4F5',
  buttonTextBgActive: '#E7E7EA',
  buttonTextTextColorDisabled: 'rgba(23, 23, 27, 0.4)',

  buttonSmallHeight: '36px',
  buttonSmallMinWidth: '140px',
  buttonSmallPaddingInline: '16px',
  buttonSmallPaddingBlock: '0px',
  buttonSmallFontSize: '14px',
  buttonSmallLineHeight: '20px',

  buttonMediumHeight: '44px',
  buttonMediumMinWidth: '140px',
  buttonMediumPaddingInline: '20px',
  buttonMediumPaddingBlock: '0px',
  buttonMediumFontSize: '16px',
  buttonMediumLineHeight: '24px',

  buttonLargeHeight: '52px',
  buttonLargeMinWidth: '150px',
  buttonLargePaddingInline: '24px',
  buttonLargePaddingBlock: '0px',
  buttonLargeFontSize: '18px',
  buttonLargeLineHeight: '28px',

  buttonCompactPaddingInlineStart: '12px',
  buttonCompactPaddingInlineEnd: '16px',

  calendarWidth: '286px',
  calendarPadding: '16px',
  calendarBorderWidth: '1px',
  calendarBorderRadius: '12px',
  calendarBorderColor: '#E4E4E7',
  calendarBg: '#FFFFFF',

  calendarFontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",

  calendarTextColor: '#18181B',
  calendarMutedTextColor: '#A1A1AA',
  calendarWeekendTextColor: '#A1A1AA',
  calendarDisabledTextColor: '#D4D4D8',

  calendarTitleFontSize: '15px',
  calendarTitleFontWeight: '600',

  calendarWeekdayFontSize: '11px',
  calendarWeekdayFontWeight: '500',

  calendarDayFontSize: '14px',
  calendarDayFontWeight: '400',
  calendarSelectedDayFontWeight: '600',

  calendarFooterFontSize: '13px',
  calendarFooterFontWeight: '400',

  calendarSectionGap: '12px',

  calendarWeekGap: '4px',

  calendarWeekdayHeight: '28px',

  calendarDaySize: '36px',
  calendarDayBorderRadius: '8px',

  calendarDayHoverBg: '#F4F4F5',
  calendarDayActiveBg: '#E4E4E7',
  calendarSelectedBg: '#18181B',
  calendarSelectedTextColor: '#FFFFFF',

  calendarFocusColor: '#18181B',
  calendarFocusWidth: '2px',
  calendarFocusOffset: '2px',

  calendarTodayDotSize: '4px',
  calendarTodayDotOffset: '3px',

  calendarNavigationSize: '36px',
  calendarNavigationBorderRadius: '8px',
  calendarNavigationIconSize: '12px',

  calendarFooterPaddingBlock: '16px',
};


export const vars = createGlobalTheme(
  ':root, [data-theme="light"]',
  lightTokens,
);

const darkTokens = {
  ...lightTokens,

  buttonFillBg: '#FAFAFA',
  buttonFillBgHover: '#E4E4E7',
  buttonFillBgActive: '#D4D4D8',
  buttonFillBgDisabled: '#52525B',
  buttonFillTextColor: '#18181B',

  buttonOutlineBorderColor: '#A1A1AA',
  buttonOutlineTextColor: '#FAFAFA',
  buttonOutlineBgHover: '#27272A',
  buttonOutlineBgActive: '#3F3F46',
  buttonOutlineBorderDisabled: '#52525B',
  buttonOutlineTextColorDisabled: '#71717A',

  buttonTextTextColor: '#FAFAFA',
  buttonTextBgHover: '#27272A',
  buttonTextBgActive: '#3F3F46',
  buttonTextTextColorDisabled: '#71717A',

  outlineColor: '#A78BFA',

  calendarBg: '#18181B',
  calendarBorderColor: '#3F3F46',

  calendarTextColor: '#FAFAFA',
  calendarMutedTextColor: '#A1A1AA',
  calendarWeekendTextColor: '#A1A1AA',
  calendarDisabledTextColor: '#52525B',

  calendarDayHoverBg: '#27272A',
  calendarDayActiveBg: '#3F3F46',

  calendarSelectedBg: '#FAFAFA',
  calendarSelectedTextColor: '#18181B',

  calendarFocusColor: '#FAFAFA',
} satisfies typeof lightTokens;

createGlobalTheme(
  '[data-theme="dark"]',
  vars,
  darkTokens,
);