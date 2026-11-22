import type { Preview } from '@storybook/react-vite';

import { ThemeProvider } from '../src/theme/ThemeProvider';

import {
  arEG,
  enUS,
  LocaleContext,
  ruRU,
} from '../src/components/Calendar/locale';

const locales = {
  'ru-RU': ruRU,
  'en-US': enUS,
  'ar-EG': arEG,
};

function getLocale(value: unknown) {
  switch (value) {
    case 'en-US':
      return locales['en-US'];

    case 'ar-EG':
      return locales['ar-EG'];

    default:
      return locales['ru-RU'];
  }
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Тема компонентов',

      toolbar: {
        title: 'Тема',
        icon: 'circlehollow',
        dynamicTitle: true,

        items: [
          { value: 'light', title: 'Светлая' },
          { value: 'dark', title: 'Тёмная' },
        ],
      },
    },

    locale: {
      description: 'Язык и направление компонентов',

      toolbar: {
        title: 'Язык',
        icon: 'globe',
        dynamicTitle: true,

        items: [
          { value: 'ru-RU', title: 'Русский' },
          { value: 'en-US', title: 'English' },
          { value: 'ar-EG', title: 'العربية' },
        ],
      },
    },
  },

  initialGlobals: {
    theme: 'light',
    locale: 'ru-RU',
  },

  parameters: {
    layout: 'centered',

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: 'todo',
    },
  },

  decorators: [
    (Story, context) => {
      const theme =
        context.globals.theme === 'dark'
          ? 'dark'
          : 'light';

      const locale = getLocale(context.globals.locale);

      return (
        <ThemeProvider theme={theme}>
          <LocaleContext.Provider value={locale}>
            <div dir={locale.dir} lang={locale.locale}>
              <Story />
            </div>
          </LocaleContext.Provider>
        </ThemeProvider>
      );
    },
  ],
};

export default preview;