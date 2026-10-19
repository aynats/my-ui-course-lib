import React from 'react';
import { Button } from './components/Button/Button';
import './styles/variables.css';
import './App.css';

import { DatePicker } from './components/DatePicker/DatePicker';
import './styles/DatePicker.variables.css';

import { themeClass } from './theme/theme.css';
import { ThemeContext } from './theme/ThemeContext';

function App() {
  const variants = ['fill', 'outline', 'text'] as const;
  const sizes = ['S', 'M', 'L'] as const;

  const testButtonRef = React.useRef<HTMLButtonElement>(null);
  const testInputRefButton = React.useRef<HTMLInputElement>(null);
  return (
    <div className={themeClass}>
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
                <Button variant={variant} size={size}>Кнопка</Button>
                <Button variant={variant} size={size} disabled>Кнопка</Button>
                <Button variant={variant} size={size} as='a' href='/'>Ссылка</Button>
              </div>
            ))}
          </div>
        ))}
        <ThemeContext
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
        </ThemeContext>

        <ThemeContext
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

        </ThemeContext>
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
    </div>
  );
}

export default App;