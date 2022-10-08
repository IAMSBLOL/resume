
import { useEffect, useRef } from 'react';
import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
} from 'three'
import galaxyVertexShader from './glsl/vertex.glsl'
import galaxyFragmentShader from './glsl/fragment.glsl'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as THREE from 'three'
import { WebGL } from '@src/utils'

import './Skill.module.less'
// const uniforms = {
//   time: { value: 1.0 },
//   uTime: { value: 0 },
// };

const parameters:any = {}
parameters.count = 200000
parameters.size = 0.0001
parameters.radius = 3
parameters.branches = 6
parameters.spin = 1
parameters.randomness = 0.5
parameters.randomnessPower = 5
parameters.insideColor = '#ff6030'
parameters.outsideColor = '#1b3984'

const Skill = (): JSX.Element => {
  const canvasIns = useRef<HTMLCanvasElement | null>(null)
  const glRender = useRef<THREE.WebGLRenderer | null>(null)
  const camera = useRef<THREE.PerspectiveCamera|null>(null)
  const scene = useRef<THREE.Scene>(new Scene())
  const canvasWrap = useRef<HTMLDivElement | null >(null)

  useEffect(() => {
    if (!canvasWrap.current) {
      return
    }
    const dir = new THREE.Vector3(
      0.2 * 2 - 1,
      0.3 * 2 - 1,
      0.6 * 2 - 1
    ).normalize()
    console.log(dir, 'dir')

    const width = canvasWrap.current.offsetWidth
    const height = canvasWrap.current.offsetHeight
    if (canvasIns.current) {
      if (WebGL.isWebGLAvailable()) {
        glRender.current = new WebGLRenderer({
          antialias: true,
          canvas: canvasIns.current,

          alpha: true,

        });

        const clock = new THREE.Clock();

        glRender.current.setPixelRatio(window.devicePixelRatio)
        glRender.current.setSize(width, height)

        camera.current = new PerspectiveCamera(
          75,
          width / height,
          0.1,
          100
        )

        camera.current.position.set(3, 3, 3);
        camera.current.lookAt(scene.current.position);

        // const material = new THREE.ShaderMaterial({

        //   uniforms,
        //   vertexShader: shaders.vertex,
        //   fragmentShader: shaders.fragment,
        //   transparent: true,

        // });
        // const geometry = new THREE.PlaneGeometry(2, 2, 32, 32);
        // console.log(geometry.attributes)
        // const points = new THREE.Mesh(geometry, material);
        // const mesh = new THREE.Mesh(geometry, material);
        // mesh.position.x = 0
        // const controls = new OrbitControls(camera.current, canvasIns.current)
        // controls.enableDamping = true
        const geometry = new THREE.BufferGeometry()
        const scales = new Float32Array(parameters.count * 1)
        const positions = new Float32Array(parameters.count * 3)
        const colors = new Float32Array(parameters.count * 3)
        const randomness = new Float32Array(parameters.count * 3)
        const insideColor = new THREE.Color(parameters.insideColor)
        const outsideColor = new THREE.Color(parameters.outsideColor)

        for (let i = 0; i < parameters.count; i++) {
          const i3 = i * 3

          // Position
          const radius = Math.random() * parameters.radius

          const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2

          const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius
          const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius / 2
          const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius

          positions[i3] = Math.sin(branchAngle) * radius
          positions[i3 + 1] = 0
          positions[i3 + 2] = Math.cos(branchAngle) * radius

          randomness[i3] = randomX
          randomness[i3 + 1] = randomY
          randomness[i3 + 2] = randomZ

          // Color
          const mixedColor = insideColor.clone()
          mixedColor.lerp(outsideColor, radius / parameters.radius)

          colors[i3] = mixedColor.r
          colors[i3 + 1] = mixedColor.g
          colors[i3 + 2] = mixedColor.b

          // Scale
          scales[i] = Math.random()
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3))
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
        geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
        /**
         * Material
         */
        const material = new THREE.ShaderMaterial({
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          vertexColors: true,

          uniforms:
          {
            uTime: { value: 0 },
            uSize: { value: 10 * glRender.current.getPixelRatio() }
          },
          vertexShader: galaxyVertexShader,
          fragmentShader: galaxyFragmentShader
        })

        /**
         * Points
         */
        const points = new THREE.Points(geometry, material)
        scene.current.add(points);

        const renderCvs = () => {
          if (camera.current) {
            glRender.current?.render(scene.current, camera.current)
          }
        }

        const rendera = () => {
          renderCvs()
          const elapsedTime = clock.getElapsedTime()
          // mesh.rotation.y += delta * 0.1
          // controls.update()

          material.uniforms.uTime.value = elapsedTime
          requestAnimationFrame(rendera)
        }

        rendera()
      }
    }
  }, [])

  function onWindowResize () {
    if (!camera.current) {
      return
    }
    if (!canvasWrap.current) {
      return
    }
    if (!canvasIns.current) {
      return
    }
    const width = canvasWrap.current.offsetWidth
    const height = canvasWrap.current.offsetHeight
    camera.current.aspect = width / height;
    camera.current.updateProjectionMatrix();

    glRender.current?.setSize(width, height);
    glRender.current?.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    canvasIns.current.style.display = 'block'
  }
  useEffect(
    () => {
      onWindowResize();

      window.addEventListener('resize', onWindowResize);

      return () => {
        window.removeEventListener('resize', onWindowResize);
      }
    }, []
  )
  return (
    <div styleName='Skill' ref={canvasWrap}>
      <canvas ref={canvasIns} className='canvas' />
    </div>
  )
}

export default Skill
