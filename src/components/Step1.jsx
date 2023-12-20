import React from "react";
import Button from "react-bootstrap/Button";

export const Step1 = ({ onNext }) => {
  const authenticateSpotify = () => {
    const redirectUri = "http://localhost:3000/callback";
    const clientId = "07ebd4718cc64005af80ddf6f4a361fd";
    const scope = encodeURIComponent("streaming user-read-email");
    window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}`;
  };

  return (
    <div className="header">
      <Button onClick={authenticateSpotify}>Connect to Spotify</Button>
      <Button onClick={onNext}>Next</Button>
    </div>
  );
};
