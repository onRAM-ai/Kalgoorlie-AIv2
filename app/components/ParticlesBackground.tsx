'use client';
import { useCallback, useEffect, useState } from "react";
import Particles from "react-particles";
import type { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesBackground() {
  const [canvasSupported, setCanvasSupported] = useState(true);

  useEffect(() => {
    // Check for canvas support
    const canvas = document.createElement('canvas');
    setCanvasSupported(!!canvas.getContext);
  }, []);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  if (!canvasSupported) {
    return (
      <div 
        className="absolute inset-0 -z-10 opacity-20"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
          backgroundSize: '50px 50px'
        }}
      />
    );
  }

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fps_limit: 60,
        fullScreen: {
          enable: false,
          zIndex: -1
        },
        particles: {
          number: {
            value: 40,
            density: {
              enable: true,
              value_area: 1000
            }
          },
          color: {
            value: "#ffffff"
          },
          opacity: {
            value: 0.3,
            random: {
              enable: true,
              minimumValue: 0.2
            },
            animation: {
              enable: true,
              speed: 0.3,
              minimumValue: 0.2,
              sync: false
            }
          },
          size: {
            value: 1.5,
            random: {
              enable: true,
              minimumValue: 0.5
            }
          },
          move: {
            enable: true,
            speed: 0.8,
            direction: "none",
            random: false,
            straight: false,
            outModes: {
              default: "bounce"
            },
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200
            }
          },
          links: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.2,
            width: 0.5,
            triangles: {
              enable: false
            }
          },
        },
        interactivity: {
          detectsOn: "canvas",
          events: {
            onHover: {
              enable: true,
              mode: ["repulse", "connect"]
            },
            resize: {
              enable: true,
              delay: 0,
              sync: true
            }
          },
          modes: {
            repulse: {
              distance: 150,
              duration: 0.4,
              speed: 1
            },
            connect: {
              distance: 150,
              radius: 120,
              links: {
                opacity: 0.3
              }
            }
          }
        },
        detectRetina: true,
        background: {
          color: "transparent"
        }
      }}
      className="absolute inset-0"
    />
  );
}