import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Model } from "./Model";
import { OrbitControls } from "@react-three/drei";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";

export const ModelViewer = ({ setModel }) => {
  const [modelUrl, setModelUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setModelUrl(url);
    }
  };

  return (
    <div className="header">
      <InputGroup>
        <Form.Control
          onChange={handleFileChange}
          placeholder="Upload a Model"
          accept=".glb,.gltf"
          aria-label="Model Input"
          aria-describedby="Model Input"
        />
      </InputGroup>

      {modelUrl && (
        <Canvas style={{ height: "100%" }}>
          <OrbitControls />
          <ambientLight intensity={0.5} />
          <directionalLight position={[0, 10, 5]} intensity={1} />
          <Model url={modelUrl} />
        </Canvas>
      )}
      <Button onClick={setModel(modelUrl)}>Set this Model</Button>
    </div>
  );
};
