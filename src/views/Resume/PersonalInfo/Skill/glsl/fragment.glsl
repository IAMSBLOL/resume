uniform float time;

varying vec2 vUv;

void main(void) {


    gl_FragColor = vec4(vUv,  time ,1);

}