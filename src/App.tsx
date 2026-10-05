import { Button } from './components/Button/Button';
import './styles/variables.css';
import '@fontsource/inter/600.css';
import './App.css';

function App() {
  const variants = ['fill', 'outline', 'text'] as const;
  const sizes = ['S', 'M', 'L'] as const;

  return (
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
  );
}

export default App;