uniform float time;

varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main(void) {
    // float test = mod(vUv.y * 10.0 + time, 1.0);
    // float test1 = step(0.5, test);
    vec2 testv = floor((vUv) * 100.0);
    float test1 = random(testv + time);
    gl_FragColor = vec4(test1, test1, 0.3, 1);
}