export const vertexShader = `
  varying vec3 Normal;
  varying vec3 Position;
  varying vec2 UV;

  void main() {
    UV = uv;
    Normal = normalize(normalMatrix * normal);
    Position = vec3(modelViewMatrix * vec4(position, 1.0));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
