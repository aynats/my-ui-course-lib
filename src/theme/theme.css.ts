
import { createTheme } from '@vanilla-extract/css';

export const [themeClass, vars] = createTheme({
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
  buttonSmallPaddingX: '16px',
  buttonSmallPaddingY: '0px',
  buttonSmallFontSize: '14px',
  buttonSmallLineHeight: '20px',

  buttonMediumHeight: '44px',
  buttonMediumMinWidth: '140px',
  buttonMediumPaddingX: '20px',
  buttonMediumPaddingY: '0px',
  buttonMediumFontSize: '16px',
  buttonMediumLineHeight: '24px',

  buttonLargeHeight: '52px',
  buttonLargeMinWidth: '150px',
  buttonLargePaddingX: '24px',
  buttonLargePaddingY: '0px',
  buttonLargeFontSize: '18px',
  buttonLargeLineHeight: '28px',
});
