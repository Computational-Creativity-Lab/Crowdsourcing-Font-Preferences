export const fragmentShader = `
#define PI 3.14159265359

varying vec2 UV;
uniform vec2 u_resolution;

uniform sampler2D TexturePrev;
uniform sampler2D TextureCurrent;
uniform sampler2D NoiseMap;
uniform float u_useTexLerp;
uniform float u_time;

vec2 rotate2D(vec2 _st, float _angle){
  _st -= 0.5;
  _st =  mat2(cos(_angle),-sin(_angle), sin(_angle),cos(_angle)) * _st;
  _st += 0.5;
  return _st;
}

float random (vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

void main() {
  vec3 noise = texture2D(NoiseMap, UV ) .rgb;
  vec3 mapped1 = texture2D(TexturePrev, UV ).rgb;
  vec3 mapped2 = texture2D(TextureCurrent, UV ).rgb;
  vec3 color = mix(mapped1, mapped2, u_useTexLerp);

  vec2 sp = gl_FragCoord.xy / u_resolution.xy - vec2(0.5, 0.5);
  vec3 cols = texture2D(TextureCurrent, UV).rgb;
  vec2 p = (0.8 * 0.8 *sp) * 12.0;
  vec2 i = p;
  float c = 1.0;

  float intensity = 1.0;

  for(int n = 0; n < 3; n++){
    float t = u_time * (1.0 - (3.0 / float(n + 7)));
    i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
    c += 11.0/length(vec2(p.x / (sin(i.x+t)/intensity),p.y / (cos(i.y+t)/intensity)));
  }

  c = 1.8 - sqrt(c);
  c = clamp(c, 0.3, 0.8);

  vec3 distortColor = vec3(c*c*cols.r, c*c*cols.g, c*c*cols.b);

  // wave
  vec2 st = sp;
  
  for (int n = 1; n < 3; n ++){
      float i = float(n);
      st += vec2(0.7/i * sin(i*st.y + u_time + 0.5 * i), 0.8/i * sin(st.x + u_time + 0.2 * i) + 2.0 * 1.0);
      
  }
  st = rotate2D(st, PI * (cos(u_time)) * 0.825 / 10.0);
  
  vec3 wave = vec3( 0.5 * sin(color.r + u_time + st.x), 0.5 * sin(color.g + u_time + st.y), cos(color.b + u_time + st.x + st.y) * 0.5);
  vec3 finalColor = mix(color, wave, 0.05);

  vec3 rotatedCols = texture2D(TextureCurrent, rotate2D(UV,  PI * cos(u_time) * 0.825 / 10.0)).rgb;
  vec3 rotatedCols1 = texture2D(TextureCurrent, rotate2D(UV,  PI * cos(u_time * 1.5) * 0.825 / 15.0)).rgb;
  finalColor = mix(cols, finalColor, 0.5);
  finalColor = mix(finalColor, rotatedCols, 0.5);
  finalColor = mix(finalColor, rotatedCols1, 0.3);
  finalColor = mix(finalColor, distortColor, 0.2);
  // finalColor *= rotatedCols;
  finalColor *= vec3(1.15, 1.15, 1.15);

  gl_FragColor = vec4(finalColor, 1.0); 

  // gl_FragColor = vec4(color, 1.0); 
}`;
