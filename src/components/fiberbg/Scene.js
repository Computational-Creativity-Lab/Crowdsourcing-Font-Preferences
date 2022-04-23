import { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useTexture } from "@react-three/drei";

function Scene(props) {
  console.log(props);
  const colorMap = useTexture("/textures/" + props.keyword + ".png");
  if (window) {
    return (
      <mesh>
        <planeBufferGeometry
          attach="geometry"
          args={[window.innerWidth / 100, window.innerHeight / 100]}
        />
        <meshBasicMaterial
          attach="material"
          map={colorMap}
          toneMapped={false}
        />
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
