
import { style } from '@vanilla-extract/css';
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

// Размеры
export const sizeS = style({
    height: vars.buttonSmallHeight,
    minWidth: vars.buttonSmallMinWidth,
    padding: `0 ${vars.buttonSmallPaddingX}`,
    fontSize: vars.buttonSmallFontSize,
    lineHeight: vars.buttonSmallLineHeight,
});

export const sizeM = style({
    height: vars.buttonMediumHeight,
    minWidth: vars.buttonMediumMinWidth,
    padding: `0 ${vars.buttonMediumPaddingX}`,
    fontSize: vars.buttonMediumFontSize,
    lineHeight: vars.buttonMediumLineHeight,
});

export const sizeL = style({
    height: vars.buttonLargeHeight,
    minWidth: vars.buttonLargeMinWidth,
    padding: `0 ${vars.buttonLargePaddingX}`,
    fontSize: vars.buttonLargeFontSize,
    lineHeight: vars.buttonLargeLineHeight,
});

// FILL
export const variantFill = style({
    backgroundColor: vars.buttonFillBg,
    color: vars.buttonFillTextColor,

    ':hover': {
        backgroundColor: vars.buttonFillBgHover,
    },

    ':active': {
        backgroundColor: vars.buttonFillBgActive,
    },

    ':disabled': {
        backgroundColor: vars.buttonFillBgDisabled,
        color: vars.buttonFillTextColor,
        cursor: 'not-allowed',
    },
});

// OUTLINE
export const variantOutline = style({
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
});

// TEXT
export const variantText = style({
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
});
