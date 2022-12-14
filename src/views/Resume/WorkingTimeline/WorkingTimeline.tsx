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
import { useDispatch } from 'react-redux'
import { setTextShow } from '@src/controller/reducer/globalSlice'
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

// let scrollTrigger:any = null

// const scrollTotal = 10000;

// const wrap = (iterationDelta: number, scrollTo: number) => {
//   //   iteration += iterationDelta;
//   scrollTrigger.scroll(scrollTo);
//   scrollTrigger.update();
// };

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

type Props = {
  height:number,

}

const WorkingTimeline = (props: Props): JSX.Element => {
  const { height: scrollTotal } = props

  const dispatch = useDispatch()
  const canvasIns = useRef<HTMLCanvasElement | null>(null)
  const glRender = useRef<THREE.WebGLRenderer | null>(null)
  const yes = useRef(false)
  const camera = useRef<THREE.PerspectiveCamera>(new PerspectiveCamera(
    90,
    width / height,
    0.01,
    1000
  ))

  const scene = useRef<THREE.Scene>(new Scene())

  const sroller = useRef<any>(null)

  const currentY = useRef(0)

  useLayoutEffect(() => {
    if (scrollTotal === 0) {
      return
    }
    if (sroller.current) {
      return
    }
    sroller.current = ScrollTrigger.create({
      start: 0,
      end: `+=${scrollTotal}`,
      horizontal: false,
      pin: '.scroll',

      // onUpdate: (self) => {
      //   const SCROLL = self.scroll();
      //   if (SCROLL > self.end - 1) {
      //     // Go forwards in time

      //     wrap(1, 1);
      //   } else if (SCROLL < 1 && self.direction < 0) {
      //     // Go backwards in time
      //     wrap(-1, self.end - 1);
      //   }
      // },
      snap: 1 / 2,
      onSnapComplete: (self) => {
        const scrollTop = self.scroll()
        console.log(self, 'self')
        if (scrollTop >= scrollTotal / 2) {
          if (!yes.current) {
            console.log('yesyes')
            dispatch(setTextShow({ show: true }))
            yes.current = true
          }
        }
      }
    });
  }, [dispatch, scrollTotal])

  const scrollPosition = useCallback(
    (scrollAmount: number) => {
      // https:// codepen.io/Lighty/pen/GRqxvZV
      console.log(scrollAmount, 'scrollAmount')

      const pos = tube.geometry.parameters.path.getPointAt(scrollAmount);
      const pos2 = tube.geometry.parameters.path.getPointAt(scrollAmount + 0.00001);
      // console.log(pos, 'pos')
      // console.log(pos2, 'pos2')
      currentY.current = scrollAmount
      camera.current.position.copy(pos);
      camera.current.lookAt(pos2);
      camera.current.updateProjectionMatrix();
    }, []
  )

  useEffect(
    () => {
      if (sroller.current) {
        // console.log(scrollTotal, 'scrollTotal')
        // scrollPosition(0);
        sroller.current.init({
          start: 0,
          end: `+=${scrollTotal}`,
          horizontal: false,
          pin: '.scroll',
          snap: 1 / 2,
          onSnapComplete: (self:any) => {
            const scrollTop = self.scroll()
            console.log(self, 'self')
            if (scrollTop >= scrollTotal / 2) {
              if (!yes.current) {
                console.log('yesyes')
                dispatch(setTextShow({ show: true }))
                yes.current = true
              }
            }
          }
        })
      }
    }, [scrollTotal, dispatch, scrollPosition]
  )

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

  // const jumpToPosition = useCallback(
  //   (scrollAmount: number) => {
  //     const nested = gsap.timeline();
  //     const obj = {
  //       x: currentY.current

  //     }

  //     nested.to(
  //       obj, {
  //         x: scrollAmount,

  //         duration: 1,
  //         onUpdate: () => {
  //           const pos = tube.geometry.parameters.path.getPointAt(obj.x);
  //           const pos2 = tube.geometry.parameters.path.getPointAt(obj.x + 0.0000001);
  //           camera.current.position.copy(pos);
  //           camera.current.lookAt(pos2);
  //           camera.current.updateProjectionMatrix();
  //         }
  //       }
  //     )
  //     currentY.current = scrollAmount
  //     wrap(1, Math.floor(scrollAmount * scrollTotal * 3 / 2))
  //   }, [scrollTotal]
  // )

  // useEffect(
  //   () => {
  //     console.log(jumpPos, 'jumpPos')
  //     if (scrollTrigger) {
  //       if (jumpPos === 0) {
  //         jumpToPosition(0.001)
  //         return
  //       }
  //       jumpToPosition(jumpPos)
  //     }
  //   }, [jumpPos, jumpToPosition]
  // )

  useEffect(() => {
    if (scrollTotal === 0) {
      return
    }
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
    });
  }, [scrollPosition, scrollTotal])
  return (
    <div styleName='WorkingTimeline' className='scroll'>
      <canvas ref={canvasIns} className='canvas' />

    </div>
  )
}

export default WorkingTimeline
