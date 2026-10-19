import type { ReactNode, CSSProperties } from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { vars } from './theme.css';

export type ThemeTokens = Partial<{
  [K in keyof typeof vars]: string;
}>;

type ThemeContextProps = {
  tokens?: ThemeTokens;
  children: ReactNode;
};

export const ThemeProvider = ({
  tokens = {},
  children,
}: ThemeContextProps) => {
  const style = assignInlineVars(
    Object.fromEntries(
      Object.entries(tokens).map(([key, value]) => [
        vars[key as keyof typeof vars],
        value,
      ]),
    ),
  );

  return (
    <div style={style as CSSProperties}>
      {children}
    </div>
  );
};
