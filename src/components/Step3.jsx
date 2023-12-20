import React from "react";
import { ModelViewer } from "./ModelViewer";
import Button from "react-bootstrap/Button";

export const Step3 = ({ onNext, setModel }) => {
  return (
    <>
      <h1>Upload your own Model</h1>
      <p>
        or create one at <a href="https://monstermash.zone">Monster Zone</a>
      </p>
      <ModelViewer setModel={setModel} />
      <Button onClick={onNext}>Next</Button>
    </>
  );
};
