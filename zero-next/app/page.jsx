'use client';

import { useEffect } from 'react';

export default function WhyZeroPage() {
  useEffect(() => {
    // Dynamically load the main 3D experience module
    const script = document.createElement('script');
    script.type = 'module';
    script.crossOrigin = 'anonymous';
    script.src = '/assets/main-B9-HtP-f.js';
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <>
      <link rel="stylesheet" crossOrigin="anonymous" href="/assets/main-yeWZtezw.css" />
      <style dangerouslySetInnerHTML={{ __html: `
        html, body {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
          background-color: rgb(28, 72, 57);
          touch-action: none;
        }
        #bg-gradient {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-color: rgb(28, 72, 57);
          background-image: radial-gradient(
            ellipse 126.7vw 143.4vh at 50% 130%,
            rgb(212, 246, 235) 15.855%,
            rgb(179, 222, 209) 26.169%,
            rgb(145, 199, 183) 36.483%,
            rgb(112, 175, 156) 46.797%,
            rgb(78, 151, 130) 57.111%,
            rgb(53, 111, 94) 78.555%,
            rgb(28, 72, 57) 100%
          );
        }
        #pre-canvas-99 {
          position: fixed;
          left: 2.0833vw;
          bottom: 3.7037vh;
          bottom: 3.7037svh;
          z-index: 0;
          pointer-events: none;
          user-select: none;
          font: 700 16.667vh/1 'Supply Sans', monospace;
          font-size: 16.667svh;
          color: #ffffff;
        }
        @media (max-width: 767px) {
          #pre-canvas-99 {
            left: 4.1667vw;
            font-size: 10.185vh;
            font-size: 10.185svh;
          }
        }
        canvas {
          display: block;
          width: 100%;
          height: 100%;
          overflow: hidden;
          background-color: transparent;
        }
        #webgl {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          pointer-events: auto;
          touch-action: none;
        }
        #ui-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          pointer-events: none;
        }
      `}} />

      <div id="bg-gradient" aria-hidden="true"></div>
      <div id="pre-canvas-99" aria-hidden="true">99</div>
      <canvas
        id="webgl"
        role="img"
        aria-label="ZERO interactive 3D experience"
      ></canvas>
      <div id="ui-container" role="region" aria-label="Interface controls"></div>
    </>
  );
}
