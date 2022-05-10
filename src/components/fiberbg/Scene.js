import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { fragmentShader } from "./Frag";
import { vertexShader } from "./Vert";
import { KEYWORDS } from "../../utils/settings";

function Scene(props) {
  var textureUrls = [];
  for (let i = 0; i < KEYWORDS.length; i++) {
    textureUrls.push("/textures/" + KEYWORDS[i] + ".png");
  }
  const [map0, map1, map2, map3, map4, map5, map6, map7, map8, map9] =
    useTexture(textureUrls);
  const initialMap = useTexture("/textures/" + props.keyword + ".png");
  const [prevMap, setPrevMap] = useState(initialMap);
  const [currentMap, setCurrentMap] = useState(initialMap);

  const ref = useRef();
  // useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01));

  const data = useMemo(
    () => ({
      uniforms: {
        Ka: { value: new THREE.Vector3(1, 1, 1) },
        Kd: { value: new THREE.Vector3(1, 1, 1) },
        Ks: { value: new THREE.Vector3(1, 1, 1) },
        LightIntensity: { value: new THREE.Vector4(0.5, 0.5, 0.5, 1.0) },
        LightPosition: { value: new THREE.Vector4(0.0, 2000.0, 0.0, 1.0) },
        Shininess: { value: 200.0 },
        TexturePrev: { value: prevMap },
        TextureCurrent: { value: currentMap },
      },
      fragmentShader,
      vertexShader,
    }),
    []
  );

  useEffect(() => {
    console.log("Shader prop:", props);
    setPrevMap(currentMap);
    // data.uniforms.TextureCurrent.value = useTexture(
    //   "/textures/" + props.keyword + ".png"
    // );
  }, [props.keyword]);

  if (window) {
    return (
      <mesh ref={ref}>
        <planeBufferGeometry
          attach="geometry"
          args={[window.innerWidth / 100, window.innerHeight / 100]}
        />
        <shaderMaterial attach="material" {...data} />
      </mesh>
    );
  }
  return <></>;
}

export default function FiberScene(props) {
  return (
    <div className={"top-0 absolute w-screen h-screen z-[-1]"}>
      <Canvas>
        <Suspense fallback={null}>
          <Scene keyword={props.keyword} />
        </Suspense>
      </Canvas>
    </div>
  );
}
