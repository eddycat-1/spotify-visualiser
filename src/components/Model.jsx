import React from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useRef } from "react";

export const Model = ({ audioData, analyser }) => {
  const ref = useRef();
  const { scene } = useGLTF("little_chiken/scene.gltf");

  // Update the scale every frame
  useFrame(() => {
    if (audioData && analyser) {
      analyser.getByteFrequencyData(audioData);
      // Use dataArray for visualization
      // Example: Adjust cube scale based on the first element of dataArray
      const scale = 1 + audioData[0] / 128;
      ref.current.scale.set(scale, scale, scale);
    } else {
      ref.current.scale.set(1, 1, 1);
    }
  });

  return <primitive ref={ref} object={scene} dispose={null} />;
};
