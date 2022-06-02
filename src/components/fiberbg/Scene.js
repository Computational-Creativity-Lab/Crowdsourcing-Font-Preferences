import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { fragmentShader } from "./Frag";
import { vertexShader } from "./Vert";
import { KEYWORDS, WAVE_INTENSITY } from "../../utils/settings";
import gsap from "gsap";

function Scene(props) {
  // determine what textures to load depending on the user's device resolution 
  var textureUrls = [];
  var textures = {};
  var baseUrl = window.innerWidth <= 480 ? "/textures/mobile/" : "textures/";
  for (let i = 0; i < KEYWORDS.length; i++) {
    textureUrls.push(baseUrl + KEYWORDS[i] + ".png");
    textures[KEYWORDS[i]] = undefined;
  }

  // we need to do it like thise since useTexture is a hook from drei 
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

  // not currently used in production but can be fun to experiment with 
  const noiseMap = useTexture("/textures/Noise.png");

  // the main state we keep track of, which allows us to switch textures and lerp between
  // previous and current textures
  const [currentMap, setCurrentMap] = useState(textures[props.keyword]);

  // these are done in the way fiber likes
  const ref = useRef();
  useFrame((state) => (data.uniforms.u_time.value = state.clock.elapsedTime));

  const data = useMemo(
    () => ({
      uniforms: {
        TexturePrev: { value: currentMap },
        TextureCurrent: { value: currentMap },
        NoiseMap: { value: noiseMap },
        u_useTexLerp: { value: 0.0 },
        u_time: { value: 0.0 },
        u_resolution: {
          value: { x: window.innerWidth, y: window.innerHeight },
        },
        u_wave_intensity: { value: props.waveIntensity },
      },
      fragmentShader,
      vertexShader,
    }),
    []
  );

  // we wish to update the current texture and start lerp whenever the keyword changes
  useEffect(() => {
    console.log("Shader prop:", props);
    data.uniforms.TexturePrev.value = currentMap;
    data.uniforms.TextureCurrent.value = textures[props.keyword];
    setCurrentMap(textures[props.keyword]);

    data.uniforms.TextureCurrent.value;
    const tl = gsap.timeline({
      onComplete: function () {
        console.log("Finished lerp");
      },
    });
    data.uniforms.u_useTexLerp.value = 0.0;
    tl.to(data.uniforms.u_useTexLerp, {
      value: 1.0,
      duration: 2,
      ease: "sine.out",
    });
  }, [props.keyword]);

  // this is used to prototype and tweak the wave intensity, not used in production
  useEffect(() => {
    data.uniforms.u_wave_intensity.value = props.waveIntensity;
  }, [props.waveIntensity]);

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
      <Canvas className={"top-0 absolute w-screen h-screen z-[-1]"}>
        <Suspense fallback={null}>
          <Scene
            keyword={props.keyword}
            waveIntensity={
              props.waveIntensity ? props.waveIntensity : WAVE_INTENSITY
            }
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
