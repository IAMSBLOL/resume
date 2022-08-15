import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
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
  // PlaneBufferGeometry,
  MeshBasicMaterial,
  FrontSide,
  // DoubleSide,
  RepeatWrapping,
  CubicBezierCurve3,
  Vector3,
  CatmullRomCurve3
  //   MathUtils
} from 'three'
import * as Curves from 'three/examples/jsm/curves/CurveExtras.js';
import { WebGL } from '@src/utils'
import Timeline from './Timeline'
import './WorkingTimeline.module.less'

gsap.registerPlugin(ScrollTrigger);

let width = window.innerWidth;
let height = window.innerHeight;

const sampleClosedSpline = new CatmullRomCurve3([
  new Vector3(0, 0, -140),
  new Vector3(140, 0, 0),
  new Vector3(0, 0, 140),
  new Vector3(-140, 0, 0),

], true, 'catmullrom')

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
  ),
  sampleClosedSpline
};

const params = {
  splines: splines.sampleClosedSpline,
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
texture.repeat.set(6, 3);
const tubeMaterial = new MeshBasicMaterial({
  wireframe: false,
  transparent: true,
  opacity: 0.4,
  side: FrontSide,
  map: texture,
  // alphaTest: 0.2

});

const parent = new Object3D();

let scrollTrigger:any = null

const scrollTotal = 1000;

const wrap = (iterationDelta: number, scrollTo: number) => {
  //   iteration += iterationDelta;
  scrollTrigger.scroll(scrollTo);
  scrollTrigger.update();
};

const tube = new Mesh(tubeGeometry, tubeMaterial);

tubeGeometry.scale(1, 1, -1)

parent.add(tube);

// const images = [
//   'https://source.unsplash.com/TIGDsyy0TK4/500x500',
//   'https://source.unsplash.com/TdDtTu2rv4s/500x500',
//   'https://source.unsplash.com/eudGUrDdBB0/500x500',

// ];

// const materials = [];
// const num = images.length;

// const geometry = new PlaneBufferGeometry(4, 4, 2, 3);

// let iteration = 0;

const WorkingTimeline = (): JSX.Element => {
  const canvasIns = useRef<HTMLCanvasElement | null>(null)
  const glRender = useRef<THREE.WebGLRenderer | null>(null)
  const camera = useRef<THREE.PerspectiveCamera>(new PerspectiveCamera(
    90,
    width / height,
    0.01,
    1000
  ))

  const scene = useRef<THREE.Scene>(new Scene())

  const currentY = useRef(0)

  useLayoutEffect(() => {
    scrollTrigger = ScrollTrigger.create({
      start: 0,
      end: `+=${scrollTotal}`,
      horizontal: false,
      pin: '.scroll',

      onUpdate: (self) => {
        const SCROLL = self.scroll();
        if (SCROLL > self.end - 1) {
          // Go forwards in time
          wrap(1, 1);
        } else if (SCROLL < 1 && self.direction < 0) {
          // Go backwards in time
          wrap(-1, self.end - 1);
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

        glRender.current.setPixelRatio(window.devicePixelRatio)
        glRender.current.setSize(width, height)

        scene.current.background = new TextureLoader().load('/bg815.png')
        scene.current.add(parent)
        // const textureLoader = new TextureLoader()
        // for (let i = 0; i < num; i++) {
        //   const imageTexture = textureLoader.load(images[i]);

        //   const material = new MeshBasicMaterial({
        //     map: imageTexture,
        //     side: DoubleSide,
        //     opacity: 0.3,
        //     transparent: true
        //   });

        //   // get positions in the tube
        //   const point = (1 / num) * i;
        //   const mesh = new Mesh(geometry, material);

        //   const pos = tube.geometry.parameters.path.getPointAt(point);
        //   const pos2 = tube.geometry.parameters.path.getPointAt(point + 0.01);
        //   mesh.position.copy(pos);
        //   mesh.lookAt(pos2);

        //   scene.current.add(mesh);
        // }

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

  const scrollPosition = useCallback(
    (scrollAmount: number) => {
      // https:// codepen.io/Lighty/pen/GRqxvZV

      const pos = tube.geometry.parameters.path.getPointAt(scrollAmount);
      const pos2 = tube.geometry.parameters.path.getPointAt(scrollAmount + 0.001);
      // console.log(pos, 'pos')
      // console.log(pos2, 'pos2')
      currentY.current = scrollAmount
      camera.current.position.copy(pos);
      camera.current.lookAt(pos2);
      camera.current.updateProjectionMatrix();
    }, []
  )

  const jumpToPosition = useCallback(
    (scrollAmount: number) => {
      const nested = gsap.timeline();
      const obj = {
        x: currentY.current

      }

      nested.to(
        obj, {
          x: scrollAmount,

          duration: 1,
          onUpdate: () => {
            const pos = tube.geometry.parameters.path.getPointAt(obj.x - 0.005);
            const pos2 = tube.geometry.parameters.path.getPointAt(obj.x + 0.02);
            camera.current.position.copy(pos);
            camera.current.lookAt(pos2);
            camera.current.updateProjectionMatrix();
          }
        }
      )
      currentY.current = scrollAmount
    }, []
  )

  useEffect(() => {
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
  }, [scrollPosition])
  return (
    <div styleName='WorkingTimeline' className='scroll'>
      <canvas ref={canvasIns} className='canvas' />
      <div className='fucking_info_wrap'>
        <Timeline scrollPosition={jumpToPosition}/>
      </div>
    </div>
  )
}

export default WorkingTimeline
