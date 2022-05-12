export const fragmentShader = `
varying vec2 UV;

uniform sampler2D TexturePrev;
uniform sampler2D TextureCurrent;
uniform sampler2D NoiseMap;
uniform float u_useTexLerp;
uniform float u_time;

void main() {
  // vec3 noise = texture2D(NoiseMap, UV ) .rgb;
  // vec2 uv = UV * noise.rg;
  vec3 mapped1 = texture2D(TexturePrev, UV ).rgb;
  vec3 mapped2 = texture2D(TextureCurrent, UV ).rgb;
  vec3 color = mix(mapped1, mapped2, u_useTexLerp);
  // color.r = color.r * noise.r;
  // color *= noise;
  gl_FragColor = vec4(color, 1.0); 
}`;
