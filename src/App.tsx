import { Button } from './components/Button/Button';
import './styles/variables.css';
import './App.css';

import { DatePicker } from './components/DatePicker/DatePicker';
import './styles/DatePicker.variables.css';
import React from 'react';

function App() {
  const variants = ['fill', 'outline', 'text'] as const;
  const sizes = ['S', 'M', 'L'] as const;

  const testButtonRef = React.useRef<HTMLButtonElement>(null);
  const testInputRefButton = React.useRef<HTMLInputElement>(null);
  return (
    <>
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
    </>
  );
}

export default App;