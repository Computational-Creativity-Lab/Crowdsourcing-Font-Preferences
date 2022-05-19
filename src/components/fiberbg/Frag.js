export const fragmentShader = `
varying vec2 UV;
uniform vec2 u_resolution;

uniform sampler2D TexturePrev;
uniform sampler2D TextureCurrent;
uniform sampler2D NoiseMap;
uniform float u_useTexLerp;
uniform float u_time;

void main() {
  // vec3 noise = texture2D(NoiseMap, UV ) .rgb;
  vec3 mapped1 = texture2D(TexturePrev, UV ).rgb;
  vec3 mapped2 = texture2D(TextureCurrent, UV ).rgb;
  vec3 color = mix(mapped1, mapped2, u_useTexLerp);
  // color.r = color.r * noise.r;
  // color *= noise;


  // sampler2D canvasSource = TextureCurrent; // has problems
  vec2 sp = gl_FragCoord.xy / u_resolution.xy - vec2(0.5, 0.5);
  vec3 cols = texture2D(TextureCurrent, UV).rgb;
  float col = texture2D(TextureCurrent, UV).r;
  vec2 p = (0.8 * 0.8 *sp) * 12.0 - vec2(0.0);
  vec2 i = p;
  float c = 1.0;

  float inten = 1.5;

  for(int n = 0; n < 3; n++){
    float t = u_time * (1.0 - (3.0 / float(n + 7)));
    i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
    c += 11.0/length(vec2(p.x / (sin(i.x+t)/inten),p.y / (cos(i.y+t)/inten)));
  }

  c = 1.8 - sqrt(c);
  c = clamp(c, 0.1, 0.8);

  vec3 distortColor = vec3(c*c*cols.r, c*c*cols.g, c*c*cols.b);
  vec3 finalColor = mix(color, distortColor, 0.3);

  //vec4(vec3(c*c*col) * vec3(0.5, 0.5, 0.5) , 1.0);// * vec4(0.8, 0.5, 0.9, 1.0);
  gl_FragColor = vec4(finalColor, 1.0); 

  // gl_FragColor = vec4(color, 1.0); 

}`;
