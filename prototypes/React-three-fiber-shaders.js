// Full example: https://codesandbox.io/s/react-three-fiber-custom-geometry-with-fragment-shader-material-vxswf?file=/src/index.js

import React, { useRef, useMemo } from "react";
import ReactDOM from "react-dom";
import { Canvas, useFrame } from "react-three-fiber";
import "./styles.css";
import * as THREE from "three";

const cubeVertices = [
  [-1, -1, 1],
  [1, -1, 1],
  [-1, 1, 1],
  [1, 1, 1],
  [-1, -1, -1],
  [1, -1, -1],
  [-1, 1, -1],
  [1, 1, -1],
];

const cubeFaces = [
  [0, 3, 2],
  [0, 1, 3],
  [1, 7, 3],
  [1, 5, 7],
  [5, 6, 7],
  [5, 4, 6],
  [4, 2, 6],
  [4, 0, 2],
  [2, 7, 6],
  [2, 3, 7],
  [4, 1, 0],
  [4, 5, 1],
];

const fragmentShader = `
  varying vec3 Normal;
  varying vec3 Position;

  uniform vec3 Ka;
  uniform vec3 Kd;
  uniform vec3 Ks;
  uniform vec4 LightPosition;
  uniform vec3 LightIntensity;
  uniform float Shininess;

  vec3 phong() {
    vec3 n = normalize(Normal);
    vec3 s = normalize(vec3(LightPosition) - Position);
    vec3 v = normalize(vec3(-Position));
    vec3 r = reflect(-s, n);

    vec3 ambient = Ka;
    vec3 diffuse = Kd * max(dot(s, n), 0.0);
    vec3 specular = Ks * pow(max(dot(r, v), 0.0), Shininess);

    return LightIntensity * (ambient + diffuse + specular);
  }

  void main() {
    vec3 blue = vec3(0.0, 0.0, 1.0);
    gl_FragColor = vec4(blue*phong(), 1.0);
}`;

const vertexShader = `
  varying vec3 Normal;
  varying vec3 Position;

  void main() {
    Normal = normalize(normalMatrix * normal);
    Position = vec3(modelViewMatrix * vec4(position, 1.0));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

function Thing() {
  const ref = useRef();
  useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01));

  const data = useMemo(
    () => ({
      uniforms: {
        Ka: { value: new THREE.Vector3(1, 1, 1) },
        Kd: { value: new THREE.Vector3(1, 1, 1) },
        Ks: { value: new THREE.Vector3(1, 1, 1) },
        LightIntensity: { value: new THREE.Vector4(0.5, 0.5, 0.5, 1.0) },
        LightPosition: { value: new THREE.Vector4(0.0, 2000.0, 0.0, 1.0) },
        Shininess: { value: 200.0 },
      },
      fragmentShader,
      vertexShader,
    }),
    []
  );

  const vertices = useMemo(
    () => cubeVertices.map((v) => new THREE.Vector3(...v)),
    []
  );
  const faces = useMemo(() => cubeFaces.map((f) => new THREE.Face3(...f)), []);

  return (
    <mesh ref={ref}>
      <geometry
        attach="geometry"
        vertices={vertices}
        faces={faces}
        onUpdate={(self) => self.computeFaceNormals()}
      />
      <shaderMaterial attach="material" {...data} />
    </mesh>
  );
}

ReactDOM.render(
  <Canvas>
    <Thing />
  </Canvas>,
  document.getElementById("root")
);
