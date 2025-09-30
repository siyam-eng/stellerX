import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from "@tsparticles/engine";
// import { loadAll } from "@tsparticles/all"; // if you are going to use `loadAll`, install the "@tsparticles/all" package too.
// import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.
// import { loadBasic } from "@tsparticles/basic"; // if you are going to use `loadBasic`, install the "@tsparticles/basic" package too.

const ParticlesComponent = () => {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "#0d0929",
        },
      },
      fpsLimit: 120,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: false, // Disable hover interaction
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
        },
      },
      particles: {
        color: {
          value: ["#ffffff", "#fffacd", "#f0f8ff", "#ffd700", "#e6e6fa"],
        },
        links: {
          enable: false, // Remove connecting lines for star effect
        },
        move: {
          direction: MoveDirection.none,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          random: true, // Make movement more random like twinkling stars
          speed: 0.5, // Slower movement for gentle drift
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800, // Smaller area for higher density
          },
          value: 250, // Increased particle count
        },
        position: {
          x: { value: 50 }, // Center horizontally (50% of screen width)
          y: { value: 50 }, // Center vertically (50% of screen height)
        },
        spawn: {
          area: {
            x: 80, // Spawn area width (percentage of screen)
            y: 80, // Spawn area height (percentage of screen)
          },
        },
        opacity: {
          value: { min: 0.1, max: 1 }, // Variable opacity for twinkling
          animation: {
            enable: true,
            speed: 2,
            minimumValue: 0.1,
            sync: false, // Asynchronous twinkling
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 0.5, max: 2.5 }, // Smaller, more dot-like sizes
          animation: {
            enable: true,
            speed: 3,
            minimumValue: 0.5,
            sync: false, // Asynchronous size changes for twinkling effect
          },
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (init) {
    return (
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={options}
      />
    );
  }

  return <></>;
};
export default ParticlesComponent;
