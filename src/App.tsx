import { Button } from './components/Button/Button';
import './styles/variables.css';
import '@fontsource/inter/600.css';
import './App.css';

import { DatePicker } from './components/DatePicker/DatePicker';
import './styles/DatePicker.variables.css';

function App() {
  const variants = ['fill', 'outline', 'text'] as const;
  const sizes = ['S', 'M', 'L'] as const;

  return (
    <>
      <div className="button-wrapper">
        {variants.map((variant) => (
          <div className="button-row" key={variant}>
            <div className="row-title">{variant}</div>
            {sizes.map((size) => (
              <div className="button-item" key={size}>
                <Button variant={variant} size={size}>Кнопка</Button>
                <Button variant={variant} size={size} disabled>Кнопка</Button>
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