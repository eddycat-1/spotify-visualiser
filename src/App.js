import React, { useState, useEffect, useRef } from "react";

import SpotifyWebApi from "spotify-web-api-js";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import { Step1 } from "./components/Step1";
import { Step2 } from "./components/Step2";
import { Step3 } from "./components/Step3";
import { Step4 } from "./components/Step4";

const spotifyApi = new SpotifyWebApi();

function App() {
  const [trackId, setTrackId] = useState(null);
  const [token, setToken] = useState("");

  const [scale, setScale] = useState(1);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");
    if (token) {
      spotifyApi.setAccessToken(token);
      setToken(token);
    }
  }, []);

  const [model, setModel] = useState();

  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  switch (currentStep) {
    case 1:
      return <Step1 onNext={nextStep} />;
    case 2:
      return (
        <Step2
          onNext={nextStep}
          spotifyApi={spotifyApi}
          setTrackId={setTrackId}
          trackId={trackId}
        />
      );
    case 3:
      return <Step3 onNext={nextStep} setModel={setModel} />;
    case 4:
      return (
        <Step4
          onNext={nextStep}
          trackId={trackId}
          token={token}
          spotifyApi={spotifyApi}
          model={model}
        />
      );

    default:
      return <div>Unknown step</div>;
  }
}

export default App;
