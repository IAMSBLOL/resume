uniform float uTime;
uniform float uSize;

attribute vec3 aRandomness;
attribute float aScale;

varying vec3 vColor;
varying vec2 vUv;

vec3 random3(vec3 p) {
	p = vec3(dot(p, vec3(127.1, 311.7, 74.7)), dot(p, vec3(269.5, 183.3, 246.1)), dot(p, vec3(113.5, 271.9, 124.6)));

	return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

void main() {
    /**
     * Position
     */
	vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Rotate
	float angle = atan(modelPosition.x, modelPosition.z);
	float distanceToCenter = length(modelPosition.xz);
	float angleOffset = (1.0 / distanceToCenter) * 10.0 + uTime * 0.1;
	angle += angleOffset;
	modelPosition.x = cos(angle) * distanceToCenter;
	modelPosition.z = sin(angle) * distanceToCenter;

    // Randomness
	vec2 xz = random3(aRandomness).xz;
	modelPosition.xz += xz/3.0;
	modelPosition.y += random3(aRandomness).y / 12.0;

	vec4 viewPosition = viewMatrix * modelPosition;
	vec4 projectedPosition = projectionMatrix * viewPosition;
	gl_Position = projectedPosition;

    /**
     * Size
     */
	gl_PointSize = uSize * aScale;
	gl_PointSize *= (1.0 / -viewPosition.z);

    /**
     * Color
     */
	vColor = color;
	vUv = uv;
}