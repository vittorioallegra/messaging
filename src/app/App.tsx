import { Component, ErrorInfo } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import { i18n } from './config';
import { Path } from './enums';
import './index.css';
import { Home } from './pages';

export class App extends Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('React error:', error, errorInfo);
  }

  render() {
    return (
      <I18nextProvider i18n={i18n}>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to={Path.HOME} />} />
            <Route path={Path.HOME} element={<Home />} />
          </Routes>
        </Router>
      </I18nextProvider>
    );
  }
}
