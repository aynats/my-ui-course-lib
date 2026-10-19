
import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../theme/theme.css';

export const button = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.buttonGap,
  boxSizing: 'border-box',
  border: '1px solid transparent',
  borderRadius: vars.buttonBorderRadius,
  fontFamily: vars.buttonFontFamily,
  fontWeight: vars.buttonFontWeight,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  textDecoration: 'none',

  ':focus-visible': {
    outline: `2px solid ${vars.outlineColor}`,
    outlineOffset: '4px',
  },
});

export const sizeVariants = styleVariants({
  S: {
    height: vars.buttonSmallHeight,
    minWidth: vars.buttonSmallMinWidth,
    padding: `${vars.buttonSmallPaddingY} ${vars.buttonSmallPaddingX}`,
    fontSize: vars.buttonSmallFontSize,
    lineHeight: vars.buttonSmallLineHeight,
  },
  M: {
    height: vars.buttonMediumHeight,
    minWidth: vars.buttonMediumMinWidth,
    padding: `${vars.buttonMediumPaddingY} ${vars.buttonMediumPaddingX}`,
    fontSize: vars.buttonMediumFontSize,
    lineHeight: vars.buttonMediumLineHeight,
  },
  L: {
    height: vars.buttonLargeHeight,
    minWidth: vars.buttonLargeMinWidth,
    padding: `${vars.buttonLargePaddingY} ${vars.buttonLargePaddingX}`,
    fontSize: vars.buttonLargeFontSize,
    lineHeight: vars.buttonLargeLineHeight,
  }
});

export const variantVariants = styleVariants({
  fill: {
    backgroundColor: vars.buttonFillBg,
    color: vars.buttonFillTextColor,

    selectors: {
      '&:hover:not(:disabled)': {
        backgroundColor: vars.buttonFillBgHover,
      },
      '&:active:not(:disabled)': {
        backgroundColor: vars.buttonFillBgActive,
      },
    },

    ':disabled': {
      backgroundColor: vars.buttonFillBgDisabled,
      color: vars.buttonFillTextColor,
      cursor: 'not-allowed',
    },
  },

  outline: {
    backgroundColor: 'transparent',
    borderColor: vars.buttonOutlineBorderColor,
    color: vars.buttonOutlineTextColor,

    selectors: {
      '&:hover:not(:disabled)': {
        backgroundColor: vars.buttonOutlineBgHover,
      },
      '&:active:not(:disabled)': {
        backgroundColor: vars.buttonOutlineBgActive,
      },
    },

    ':disabled': {
      borderColor: vars.buttonOutlineBorderDisabled,
      color: vars.buttonOutlineTextColorDisabled,
      cursor: 'not-allowed',
    },
  },

  text: {
    backgroundColor: 'transparent',
    color: vars.buttonTextTextColor,

    selectors: {
      '&:hover:not(:disabled)': {
        backgroundColor: vars.buttonTextBgHover,
      },
      '&:active:not(:disabled)': {
        backgroundColor: vars.buttonTextBgActive,
      },
    },

    ':disabled': {
      color: vars.buttonTextTextColorDisabled,
      cursor: 'not-allowed',
    },
  },
});