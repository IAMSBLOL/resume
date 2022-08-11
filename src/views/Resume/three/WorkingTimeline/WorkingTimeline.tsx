import { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  TubeGeometry,

  Object3D,
  Mesh,
  PlaneBufferGeometry,
  MeshBasicMaterial,
  DoubleSide,
  RepeatWrapping,
  CubicBezierCurve3,
  Vector3
  //   MathUtils
} from 'three'
import * as Curves from 'three/examples/jsm/curves/CurveExtras.js';
import { WebGL } from '@src/utils'
import Timeline from './Timeline'
import './WorkingTimeline.module.less'

gsap.registerPlugin(ScrollTrigger);

let width = window.innerWidth;
let height = window.innerHeight;

const splines = {
  GrannyKnot: new Curves.GrannyKnot(),
  VivianiCurve: new Curves.VivianiCurve(100),
  KnotCurve: new Curves.KnotCurve(),
  TrefoilKnot: new Curves.TrefoilKnot(),
  TorusKnot: new Curves.TorusKnot(20),
  CinquefoilKnot: new Curves.CinquefoilKnot(20),
  arc: new CubicBezierCurve3(
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 200),
    new Vector3(0, 0, 0),
    new Vector3(0, 0, 200)
  )
};

const params = {
  splines: splines.arc,
  tubularSegments: 32,
  radius: 4,
  radiusSegments: 32
};

const tubeGeometry = new TubeGeometry(
  params.splines,
  params.tubularSegments,
  params.radius,
  params.radiusSegments,
  true // closed
);
const texture = new TextureLoader().load('/space.jpg')
texture.wrapS = RepeatWrapping;
texture.wrapT = RepeatWrapping;
texture.repeat.set(3, 3);
const tubeMaterial = new MeshBasicMaterial({
  wireframe: false,
  transparent: true,
  opacity: 0.5,
  side: DoubleSide,
  map: texture

});

const parent = new Object3D();

let scrollTrigger:any = null

const scrollTotal = 10000;

const wrap = (iterationDelta: number, scrollTo: number) => {
  //   iteration += iterationDelta;
  scrollTrigger.scroll(scrollTo);
  scrollTrigger.update();
};

const tube = new Mesh(tubeGeometry, tubeMaterial);

parent.add(tube);

const images = [
  'https://source.unsplash.com/TIGDsyy0TK4/500x500',
  'https://source.unsplash.com/TdDtTu2rv4s/500x500',
  'https://source.unsplash.com/eudGUrDdBB0/500x500',
  'https://source.unsplash.com/eJH4f1rlG7g/500x500',
  'https://source.unsplash.com/24RUrLSW1HI/500x500',
  'https://source.unsplash.com/h5yMpgOI5nI/500x500',
  'https://source.unsplash.com/2TYrR2IB72s/500x500',
  'https://source.unsplash.com/1cWZgnBhZRs/500x500',
  'https://source.unsplash.com/9aOswReDKPo/500x500',
  'https://source.unsplash.com/Nl7eLS8E2Ss/500x500',
  'https://source.unsplash.com/3HhXWJzG5Ko/500x500',
  'https://source.unsplash.com/fczCr7MdE7U/500x500',
  'https://source.unsplash.com/uI900SItAyY/500x500',
  'https://source.unsplash.com/0AynZdszfz0/500x500'
];

// const materials = [];
const num = images.length;

const geometry = new PlaneBufferGeometry(4, 4, 2, 3);

// let iteration = 0;

const WorkingTimeline = (): JSX.Element => {
  const canvasIns = useRef<HTMLCanvasElement | null>(null)
  const glRender = useRef<THREE.WebGLRenderer | null>(null)
  const camera = useRef<THREE.PerspectiveCamera>(new PerspectiveCamera(
    90,
    width / height,
    0.01,
    10000
  ))

  const scene = useRef<THREE.Scene>(new Scene())

  useLayoutEffect(() => {
    scrollTrigger = ScrollTrigger.create({
      start: 0,
      end: `+=${scrollTotal}`,
      horizontal: false,
      pin: '.scroll',

      onUpdate: (self) => {
        const SCROLL = self.scroll();
        if (SCROLL > self.end - 1000) {
          // Go forwards in time
          wrap(1, 1);
        } else if (SCROLL < 1 && self.direction < 0) {
          // Go backwards in time
          wrap(-1, self.end - 1000);
        }
      }
    });
  }, [])

  useEffect(() => {
    if (canvasIns.current) {
      if (WebGL.isWebGLAvailable()) {
        glRender.current = new WebGLRenderer({
          antialias: true,
          canvas: canvasIns.current,

          alpha: true
        });
        camera.current.position.z = 2;
        glRender.current.setPixelRatio(window.devicePixelRatio)
        glRender.current.setSize(width, height)
        camera.current.updateProjectionMatrix();

        scene.current.background = new TextureLoader().load('/wallhaven-y8lqo7.jpg')
        scene.current.add(parent)
        const textureLoader = new TextureLoader()
        for (let i = 0; i < num; i++) {
          const imageTexture = textureLoader.load(images[i]);

          const material = new MeshBasicMaterial({
            map: imageTexture,
            side: DoubleSide
          });

          // get positions in the tube
          const point = (1 / num) * i;
          const mesh = new Mesh(geometry, material);

          const pos = tube.geometry.parameters.path.getPointAt(point);
          const pos2 = tube.geometry.parameters.path.getPointAt(point + 0.01);
          mesh.position.copy(pos);
          mesh.lookAt(pos2);

          scene.current.add(mesh);
        }
        const renderCvs = () => {
          if (tube.material.map) {
            // console.log(tube.material.map.offset.y)
            tube.material.map.offset.x += 0.0001;
            tube.material.map.offset.y += 0.0001;
          }
          glRender.current?.render(scene.current, camera.current)
        }
        const rendera = () => {
          renderCvs()

          requestAnimationFrame(rendera)
        }
        rendera()
      }
    }
  }, [])

  useEffect(() => {
    const scrollPosition = (scrollAmount: number) => {
      // https://codepen.io/Lighty/pen/GRqxvZV
      const pos = tube.geometry.parameters.path.getPointAt(scrollAmount);
      const pos2 = tube.geometry.parameters.path.getPointAt(scrollAmount + 0.001);
      camera.current.position.copy(pos);
      camera.current.lookAt(pos2);
      camera.current.updateProjectionMatrix();
    };
    scrollPosition(0);

    window.addEventListener('resize', () => {
      // update sizes
      width = window.innerWidth;
      height = window.innerHeight;
      // update camera
      camera.current.aspect = width / height;
      camera.current.updateProjectionMatrix();

      // update renderer
      glRender.current?.setSize(width, height);
      glRender.current?.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    window.addEventListener('scroll', () => {
      const scroll_y = window.scrollY / scrollTotal;
      scrollPosition(scroll_y);
      console.log(scroll_y)
    });
  }, [])
  return (
    <div styleName='WorkingTimeline' className='scroll'>
      <canvas ref={canvasIns} className='canvas' />
      <div className='fucking_info_wrap'>
        <Timeline />
      </div>
    </div>
  )
}

export default WorkingTimeline
