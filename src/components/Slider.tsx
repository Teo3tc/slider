import { useEffect, useRef } from "react";
import Slide from "./Slide";

const lerp = (a: number, b: number, t: number) => {
  return (1 - t) * a + t * b;
};

export default function Slider({ slides }) {
  const refWrapper = useRef<HTMLInputElement>(null);
  const scroll = {
    oneSlide: 0,
    current: 0,
    target: 0,
    previous: 0,
    max: 0,
    amt: 0.05,
    currentSlide: 0,
  };
  const mouse = {
    start: 0,
    isDown: false,
    move: 0,
    end: 0,
    left: false,
    right: false,
  };

  useEffect(() => {
    if (!refWrapper.current) return;
    refWrapper.current.style.setProperty("--nrbSlide", slides.length + 1);
    scroll.max =
      refWrapper.current.getBoundingClientRect().width * slides.length + 1;
    scroll.oneSlide = refWrapper.current.getBoundingClientRect().width;

    raf();
  });
  const raf = () => {
    if (!refWrapper.current) return;
    scroll.previous = lerp(scroll.previous, scroll.current, scroll.amt);

    refWrapper.current.style.transform = `
    translateX(${scroll.previous}px) 
    `;
    requestAnimationFrame(raf);
  };
  const plus = () => {
    scroll.currentSlide === slides.length
      ? (scroll.currentSlide = 0)
      : scroll.currentSlide++;

    scroll.current = -scroll.oneSlide * scroll.currentSlide;
    console.log(scroll.currentSlide);
  };
  const minus = () => {
    scroll.currentSlide === 0
      ? (scroll.currentSlide = slides.length)
      : scroll.currentSlide--;
    scroll.current = -scroll.oneSlide * scroll.currentSlide;
  };
  const mouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    mouse.start = e.clientX;
    mouse.isDown = true;
  };
  const mouseMove = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!mouse.isDown) return;

    if (e.pageX < mouse.start) {
      mouse.left = true;
      mouse.right = false;
      mouse.move = e.clientX - mouse.start;
      scroll.current += mouse.move * 0.1;
    } else if (e.pageX > mouse.start) {
      mouse.left = false;
      mouse.right = true;
      scroll.current -= mouse.move * 0.1;
    }
  };
  const mouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    mouse.isDown = false;
    if (mouse.left) {
      plus();
    }
    if (mouse.right) {
      minus();
    }
    mouse.left = false;
    mouse.right = false;
  };

  return (
    <div className="slider">
      <button onClick={minus}>P</button>

      <div className="slider__container">
        <div
          ref={refWrapper}
          onMouseDown={mouseDown}
          onMouseMove={mouseMove}
          onMouseUp={mouseUp}
          className="slider__wrapper"
        >
          {slides ? (
            slides.map((slide) => <Slide key={slide.id} {...slide} />)
          ) : (
            <div>no data for the slide</div>
          )}
          <Slide {...slides[0]} />
        </div>
      </div>
      <button onClick={plus}>N</button>
    </div>
  );
}
