import ReactDOM from 'react-dom/client';
import { App } from './components/routes/App';
import "./components/style/App.css"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <App />
);
