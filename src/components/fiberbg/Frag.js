export const fragmentShader = `
varying vec3 Normal;
varying vec3 Position;
varying vec2 UV;

uniform sampler2D TexturePrev;
uniform sampler2D TextureCurrent;
uniform float u_useTexLerp;

void main() {
  vec3 mapped1 = texture2D(TexturePrev, UV ).rgb;
  vec3 mapped2 = texture2D(TextureCurrent, UV ).rgb;
  vec3 color = mix(mapped1, mapped2, u_useTexLerp);
  gl_FragColor = vec4(color, 1); 
}`;
