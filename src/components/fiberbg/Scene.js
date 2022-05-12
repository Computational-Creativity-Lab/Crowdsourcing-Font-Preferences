import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { fragmentShader } from "./Frag";
import { vertexShader } from "./Vert";
import { KEYWORDS } from "../../utils/settings";
import gsap from "gsap";

function Scene(props) {
  var textureUrls = [];
  var textures = {};
  for (let i = 0; i < KEYWORDS.length; i++) {
    textureUrls.push("/textures/" + KEYWORDS[i] + ".png");
    textures[KEYWORDS[i]] = undefined;
  }
  const [map0, map1, map2, map3, map4, map5, map6, map7, map8, map9] =
    useTexture(textureUrls);
  const loadedMaps = [
    map0,
    map1,
    map2,
    map3,
    map4,
    map5,
    map6,
    map7,
    map8,
    map9,
  ];
  for (let i = 0; i < KEYWORDS.length; i++) {
    textures[KEYWORDS[i]] = loadedMaps[i];
  }

  const [currentMap, setCurrentMap] = useState(textures[props.keyword]);

  const ref = useRef();
  // useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01));

  const data = useMemo(
    () => ({
      uniforms: {
        TexturePrev: { value: currentMap },
        TextureCurrent: { value: currentMap },
        u_useTexLerp: { value: 0 },
      },
      fragmentShader,
      vertexShader,
    }),
    []
  );

  useEffect(() => {
    console.log("Shader prop:", props);
    data.uniforms.TexturePrev.value = currentMap;
    data.uniforms.TextureCurrent.value = textures[props.keyword];
    setCurrentMap(textures[props.keyword]);

    data.uniforms.TextureCurrent.value;
    const tl = gsap.timeline({
      onComplete: function () {},
    });
    data.uniforms.u_useTexLerp.value = 0.0;
    tl.to(data.uniforms.u_useTexLerp, {
      value: 1.0,
      duration: 2,
      ease: "sine.out",
    });
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
