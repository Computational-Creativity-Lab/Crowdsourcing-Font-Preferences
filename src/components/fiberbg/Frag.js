export const fragmentShader = `
varying vec3 Normal;
varying vec3 Position;
varying vec2 UV;

uniform sampler2D TexturePrev;
uniform sampler2D TextureCurrent;

void main() {
  vec3 color = texture2D(TextureCurrent, UV).rgb;
  gl_FragColor = vec4(color, 1.0);
}`;
