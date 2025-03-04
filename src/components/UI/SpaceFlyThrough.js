import React, { useRef } from "react";
import {  useFrame } from "@react-three/fiber";
// import * as THREE from "three";
import { StyledCanvas } from "./SpaceFlyThrough.styled.js";

const Stars = () => {
  const group = useRef();
  const stars = new Array(500).fill().map(() => ({
    position: [
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      Math.random() * -50,
    ],
    velocity: Math.random() * 0.05 + 0.02,
  }));

  useFrame(() => {
    group.current.children.forEach((star, index) => {
      star.position.z += stars[index].velocity;
      if (star.position.z > 0) star.position.z = -50;
    });
  });

  return (
    <group ref={group}>
      {stars.map((star, index) => (
        <mesh key={index} position={star.position}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="white" />
        </mesh>
      ))}
    </group>
  );
};

const SpaceFlyThrough = () => {
  return (
    <StyledCanvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <color attach="background" args={["black"]} />
      <Stars />
    </StyledCanvas>
  );
};

export default SpaceFlyThrough;
