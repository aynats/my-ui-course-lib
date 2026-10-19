import type { ReactNode } from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { vars } from './theme.css';

export type ThemeTokens = Partial<{
  [K in keyof typeof vars]: string;
}>;

type ThemeProviderProps = {
  tokens?: ThemeTokens;
  children: ReactNode;
};

// Привели тип vars[token] от string к непосредственно названиям vars
function typedEntries<T extends object>(object: T) {
  return Object.entries(object) as [keyof T, T[keyof T]][];
}

export const ThemeProvider = ({ tokens = {}, children }: ThemeProviderProps) => {
  const style = assignInlineVars(
    Object.fromEntries(
      typedEntries(tokens).map(([token, value]) => [
        vars[token],
        value,
      ]),
    ),
  );
  // В assignInlineVars возвращается совместимый с реактом тип, поэтому не указываем каст cssprops
  return <div style={style}>{children}</div>;
};

