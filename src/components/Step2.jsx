import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

export const Step2 = ({ spotifyApi, trackId, setTrackId, onNext }) => {
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <div className="header">
      <InputGroup>
        <Form.Control
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for Track"
          aria-label="TrackName"
          aria-describedby="TrackName"
        />
      </InputGroup>

      <Button onClick={searchTrack}>Search</Button>
      {trackId && <p>Track ID: {trackId}</p>}
      <Button onClick={onNext}>Next</Button>
    </div>
  );
};
