import { Analytics } from "@vercel/analytics/react";
import JSConfetti from "js-confetti";
import { useState } from "react";
import { NavermapsProvider } from "react-naver-maps";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Main from "./components/Main";
import Modal from "./components/Modal";

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
