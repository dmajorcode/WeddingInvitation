import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import Modal from './components/Modal';
import { useState } from 'react';
import { NavermapsProvider } from 'react-naver-maps';
import JSConfetti from 'js-confetti';
import { Analytics } from '@vercel/analytics/react';

export const jsConfetti = new JSConfetti();

function App() {
  const ncpClientId = import.meta.env.VITE_APP_NAVERMAPS_CLIENT_ID;
  const [component, setComponent] = useState<React.ReactNode>(null);

  return (
    <NavermapsProvider ncpClientId={ncpClientId}>
      <BrowserRouter>
        <Modal component={component} setComponent={setComponent} />
        <Main setComponent={setComponent} />
        <Analytics />
      </BrowserRouter>
    </NavermapsProvider>
  );
}

export default App;
