import React, { useState } from 'react';
import { Button } from './components/Button/Button';
import './styles/variables.css';
import './App.css';

import { DatePicker } from './components/DatePicker/DatePicker';
import './styles/DatePicker.variables.css';

import { ThemeProvider } from './theme/ThemeProvider';
import type { Theme } from './theme/ThemeProvider';
import { CalendarIcon } from './components/CalendarIcon/CalendarIcon';
import { Calendar } from './components/Calendar/Calendar';

import {
  arEG,
  enUS,
  LocaleContext,
  ruRU,
} from './components/Calendar/locale';
import { startOfDay, startOfMonth } from './components/Calendar/calendar.utils';

const locales = {
  'ru-RU': ruRU,
  'en-US': enUS,
  'ar-EG': arEG,
};

type LocaleKey = keyof typeof locales;

function App() {
  const variants = ['fill', 'outline', 'text'] as const;
  const sizes = ['S', 'M', 'L'] as const;

  const testButtonRef = React.useRef<HTMLButtonElement>(null);
  const testInputRefButton = React.useRef<HTMLInputElement>(null);

  const [date, setDate] = useState<Date | null>(() => startOfDay(new Date()),);

  const [month, setMonth] = useState(() => startOfMonth(date ?? new Date()),);

  const [localeKey, setLocaleKey] = useState<LocaleKey>('ru-RU');

  const [theme, setTheme] = useState<Theme>('light');

  const locale = locales[localeKey];


  return (
    <ThemeProvider theme={theme}>
      <div className="ref-example">
        <input type="text" ref={testInputRefButton} className="ref-input" name="input" />
        <Button ref={testButtonRef} onClick={() => {
          testInputRefButton.current?.focus();
          console.log(testInputRefButton.current);
        }}>
          Хочу на инпут!
        </Button >
      </div>

      <div className="button-wrapper">
        {variants.map((variant) => (
          <div className="button-row" key={variant}>
            <div className="row-title">{variant}</div>
            {sizes.map((size) => (
              <div className="button-item" key={size}>
                <Button variant={variant} size={size} density='compact' startIcon={< CalendarIcon />}>Кнопка с Icon</Button>
                <Button variant={variant} size={size}>Кнопка</Button>
                <Button variant={variant} size={size} disabled>Кнопка</Button>
                <Button variant={variant} size={size} as='a' href='/'>Ссылка</Button>
              </div>
            ))}
          </div>
        ))}

        <ThemeProvider
          tokens={{
            buttonFillBg: '#7C3AED',
            buttonFillBgHover: '#6D28D9',
            buttonFillBgActive: '#5B21B6',
            buttonBorderRadius: '20px',

            buttonLargeMinWidth: '700px',
            buttonOutlineTextColor: '#5B21B6',
          }}
        >
          <div className="button-row">
            <Button>Тематическая кнопка</Button>
            <Button variant={'outline'} size={'L'}>Кнопка</Button>
          </div>
        </ThemeProvider>

        <ThemeProvider
          tokens={{
            buttonFillBg: '#047857',
            buttonFillBgHover: '#065F46',
            buttonFillBgActive: '#064E3B',
            buttonFillBgDisabled: 'rgba(4, 120, 87, 0.4)',
            buttonFillTextColor: '#FFFFFF',


            buttonOutlineBorderColor: '#047857',
            buttonOutlineTextColor: '#047857',
            buttonOutlineBgHover: '#D1FAE5',
            buttonOutlineBgActive: '#A7F3D0',
            buttonOutlineBorderDisabled: 'rgba(4, 120, 87, 0.4)',
            buttonOutlineTextColorDisabled: 'rgba(4, 120, 87, 0.4)',

            buttonTextTextColor: '#047857',
            buttonTextBgHover: '#D1FAE5',
            buttonTextBgActive: '#A7F3D0',
            buttonTextTextColorDisabled: 'rgba(4, 120, 87, 0.4)',

            buttonBorderRadius: '8px',
            outlineColor: '#10B981',
          }}
        >
          <div className="button-row">
            <Button>Изумрудная тема</Button>
            <Button variant="outline" size="L">
              Outline
            </Button>
            <Button variant="text" size="L">
              Text
            </Button>
          </div>

        </ThemeProvider>
      </div>

      <div className='calendar-wrapper'>
        <h2>Calendar</h2>
        <label className='calendar-type-select'>
          Язык

          <select
            value={localeKey}
            onChange={(event) =>
              setLocaleKey(
                event.target.value as LocaleKey,
              )
            }
          >
            <option value="ru-RU">Русский</option>
            <option value="en-US">English</option>
            <option value="ar-EG">العربية</option>
          </select>
        </label>

        <label className='calendar-type-select'>
          Тема

          <select
            value={theme}
            onChange={(event) =>
              setTheme(event.target.value as Theme)
            }
          >
            <option value="light">Светлая</option>
            <option value="dark">Тёмная</option>
          </select>
        </label>

        <LocaleContext.Provider value={locale}>
          <div dir={locale.dir}>
            <Calendar
              value={date}
              onValueChange={setDate}
              month={month}
              onMonthChange={setMonth}
            />
          </div>
        </LocaleContext.Provider>

      </div>

      <div className="datepicker-wrapper">
        <h2>DatePicker</h2>

        <div className="datepicker-row">
          <DatePicker
            label="Default"
            placeholder="DD.MM.YYYY"
          />

          <DatePicker
            label="With value"
            defaultValue={new Date()}
          />

          <DatePicker
            label="Disabled"
            disabled
          />
        </div>

        <div className="datepicker-row">
          <DatePicker
            label="Error"
            error="Please select a valid date"
          />

          <DatePicker
            label="Required"
            required
          />

          <DatePicker
            label="Read only"
            readOnly
            defaultValue={new Date()}
          />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;