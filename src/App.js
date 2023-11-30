import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import SpotifyWebApi from "spotify-web-api-js";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Model } from "./components/Model";

const spotifyApi = new SpotifyWebApi();

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [trackId, setTrackId] = useState(null);
  const [token, setToken] = useState("");
  const [audio, setAudio] = useState(null);
  const audioContext = useRef(
    new (window.AudioContext || window.webkitAudioContext)()
  ).current;
  const analyser = useRef(null);
  const dataArray = useRef(null);
  const [scale, setScale] = useState(1);
  const [showScene, setShowScene] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.substring(1);
    const params = new URLSearchParams(hash);
    const token = params.get("access_token");
    if (token) {
      spotifyApi.setAccessToken(token);
      setToken(token);
    }
  }, []);

  const authenticateSpotify = () => {
    const redirectUri = "http://localhost:3000/callback";
    const clientId = "07ebd4718cc64005af80ddf6f4a361fd";
    const scope = encodeURIComponent("streaming user-read-email");
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}`;
  };

  const searchTrack = () => {
    if (!searchQuery) return;

    spotifyApi
      .searchTracks(searchQuery, { limit: 1 })
      .then((data) => {
        if (data.tracks && data.tracks.items.length > 0) {
          setTrackId(data.tracks.items[0].id);
        } else {
          setTrackId("No results found");
        }
      })
      .catch((error) => console.error("Error:", error));
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

          initThreeJS();
        })
        .catch(() => {
          console.log("Audio not playing");
        });
    } else {
      console.log("audio not loaded");
    }
  };

  const initThreeJS = () => {
    setShowScene(true);
  };

  return (
    <div>
      <button onClick={authenticateSpotify}>Connect to Spotify</button>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Enter track name"
      />
      <button onClick={searchTrack}>Search</button>
      {trackId && <p>Track ID: {trackId}</p>}
      <button onClick={loadTrack}>Load Track</button>
      <button onClick={playTrack}>Play Track</button>

      {showScene && (
        <div style={{ width: "100%", height: "100vh" }}>
          <Canvas>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} />
            <Model
              audioData={dataArray?.current}
              analyser={analyser?.current}
            />
            <OrbitControls />
          </Canvas>
        </div>
      )}
    </div>
  );
}

export default App;
