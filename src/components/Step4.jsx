import React, { useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "./Model";
import { OrbitControls } from "@react-three/drei";
import Button from "react-bootstrap/Button";

export const Step4 = ({ onNext, trackId, token, spotifyApi, model }) => {
  const [audio, setAudio] = useState(null);
  const audioContext = useRef(
    new (window.AudioContext || window.webkitAudioContext)()
  ).current;
  const analyser = useRef(null);
  const dataArray = useRef(null);
  const [showScene, setShowScene] = useState(false);

  const initThreeJs = () => {
    setShowScene(true);
  };
  const loadTrack = () => {
    if (trackId && token) {
      spotifyApi.getTrack(trackId).then((response) => {
        if (response.preview_url) {
          audioContext.resume();
          const audioOptions = new Audio(response.preview_url);
          audioOptions.crossOrigin = "anonymous"; // Important for CORS
          audioOptions.src = response.preview_url;
          setAudio(audioOptions);
        } else {
          console.log("No preview url");
        }
      });
    } else {
      console.log("no token or track ID");
    }
  };

  const playTrack = () => {
    if (audio) {
      audio
        .play()
        .then(() => {
          const source = audioContext.createMediaElementSource(audio);
          analyser.current = audioContext.createAnalyser();
          source.connect(analyser.current);
          analyser.current.connect(audioContext.destination);
          dataArray.current = new Uint8Array(
            analyser.current.frequencyBinCount
          );

          initThreeJs();
        })
        .catch(() => {
          console.log("Audio not playing");
        });
    } else {
      console.log("audio not loaded");
    }
  };

  return (
    <>
      <Button onClick={loadTrack}>Load Track</Button>
      <Button onClick={playTrack}>Play Track</Button>
      {showScene && (
        <Canvas>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} />
          <Model
            audioData={dataArray?.current}
            analyser={analyser?.current}
            url={model}
          />
          <OrbitControls />
        </Canvas>
      )}
      <Button onClick={onNext}>Next</Button>
    </>
  );
};
