import { createContext, useContext, type ReactNode } from 'react';
import { assignInlineVars } from '@vanilla-extract/dynamic';
import { vars } from './theme.css';

export type Theme = 'light' | 'dark';

export type ThemeTokens = Partial<{
  [K in keyof typeof vars]: string;
}>;

type ThemeProviderProps = {
  theme?: Theme;
  tokens?: ThemeTokens;
  children: ReactNode;
};

export const ThemeContext = createContext<Theme>('light');

export const useTheme = () => useContext(ThemeContext);

// Привели тип vars[token] от string к непосредственно названиям vars
function typedEntries<T extends object>(object: T) {
  return Object.entries(object) as [keyof T, T[keyof T]][];
}

export const ThemeProvider = ({ theme, tokens = {}, children }: ThemeProviderProps) => {
  const parentTheme = useTheme();
  const resolvedTheme = theme ?? parentTheme;

  const style = assignInlineVars(
    Object.fromEntries(
      typedEntries(tokens).map(([token, value]) => [
        vars[token],
        value,
      ]),
    ),
  );
  // В assignInlineVars возвращается совместимый с реактом тип, поэтому не указываем каст cssprops
  return (
    <ThemeContext.Provider value={resolvedTheme}>
      <div
        data-theme={theme}
        style={style}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

