import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles/shared.css';
import './styles/midnight.css';
import './styles/entrance.css';
import './styles/shop-theme.css';
import './styles/stockroom.css';
import './styles/hero-fixes.css';
import './styles/owner.css';
import './styles/toolkit.css';
import './styles/learning.css';
import './styles/gallery.css';
import './styles/audit.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
