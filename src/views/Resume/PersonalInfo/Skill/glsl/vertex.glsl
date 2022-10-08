uniform float uTime;
uniform float uSize;

attribute vec3 aRandomness;
attribute float aScale;

varying vec3 vColor;
varying vec2 vUv;

void main() {
    /**
     * Position
     */
	vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Rotate
	float angle = atan(modelPosition.x, modelPosition.z);
	float distanceToCenter = length(modelPosition.xz);
	float angleOffset = (1.0 / distanceToCenter) * 10.0 + uTime * 0.2;
	angle += angleOffset;
	modelPosition.x = cos(angle) * distanceToCenter;
	modelPosition.z = sin(angle) * distanceToCenter;

    // Randomness
	modelPosition.xyz += aRandomness;

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