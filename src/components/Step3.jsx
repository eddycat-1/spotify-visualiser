import React from "react";
import { ModelViewer } from "./ModelViewer";
import Button from "react-bootstrap/Button";

export const Step3 = ({ onNext, setModel }) => {
  return (
    <>
      <ModelViewer setModel={setModel} />
      <Button onClick={onNext}>Next</Button>
    </>
  );
};
