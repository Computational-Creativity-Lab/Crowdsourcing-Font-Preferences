import { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";

function Scene() {
  const colorMap = useLoader(TextureLoader, "/textures/Casual.png");
  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight />
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial />
      </mesh>
      <mesh>
        <planeBufferGeometry attach="geometry" args={[4, 4]} />
        <meshBasicMaterial
          attach="material"
          map={colorMap}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}

export default function FiberScene() {
  return (
    <div className={"top-0 absolute w-screen h-screen z-[-1]"}>
      <Canvas>
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
