// import Shader from "./Shader";
import { Canvas } from "@react-three/fiber";
import dynamic from "next/dynamic";

// Dynamic import is used to prevent a payload when the website start that will include threejs r3f etc..
// WARNING ! errors might get obfuscated by using dynamic import.
// If something goes wrong go back to a static import to show the error.
// https://github.com/pmndrs/react-three-next/issues/49
const Shader = dynamic(() => import("./Shader"), {
  ssr: false,
});

export default function BackgroundShader() {
  return (
    <Canvas>
      <Shader />
    </Canvas>
  );
}
