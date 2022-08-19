
import { useEffect, useRef } from 'react';
import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
} from 'three'
import shaders from './glsl';
import * as THREE from 'three'
import { WebGL } from '@src/utils'

import './Skill.module.less'
const uniforms = {
  time: { value: 1.0 }
};
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

    const width = canvasWrap.current.offsetWidth
    const height = canvasWrap.current.offsetHeight
    if (canvasIns.current) {
      if (WebGL.isWebGLAvailable()) {
        glRender.current = new WebGLRenderer({
          antialias: true,
          canvas: canvasIns.current,

          alpha: true
        });

        const clock = new THREE.Clock();

        glRender.current.setPixelRatio(window.devicePixelRatio)
        glRender.current.setSize(width, height)

        camera.current = new PerspectiveCamera(
          40,
          width / height,
          1,
          1000
        )

        camera.current.position.set(0, 0, 4);
        camera.current.lookAt(scene.current.position);

        const material = new THREE.ShaderMaterial({

          uniforms,
          vertexShader: shaders.vertex.default,
          fragmentShader: shaders.fragment.default,
          transparent: true,

        });
        const geometry = new THREE.BoxGeometry(0.75, 0.75, 0.75);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.x = -0.5
        scene.current.add(mesh);

        const renderCvs = () => {
          if (camera.current) {
            glRender.current?.render(scene.current, camera.current)
          }
        }

        const rendera = () => {
          renderCvs()
          const delta = clock.getDelta();
          mesh.rotation.y += delta * 0.1
          mesh.rotation.x += delta * 0.1
          uniforms.time.value += delta * 5;
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
