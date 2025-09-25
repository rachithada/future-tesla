import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";

import car from "../assets/car.mp4";
import chargerVideo from "../assets/charger.webm";
import electricityVideo from "../assets/electricity.webm";

function Model({ scale, mouse }) {
  const { scene } = useGLTF("/models/tesla_prior.glb");
  const ref = useRef();

  scene.traverse((child) => {
    if (child.isMesh) {
      console.log("Mesh:", child.name);
    }
  });

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += (mouse.x * 0.5 - ref.current.rotation.y) * 0.05;
    }
  });

  return <primitive ref={ref} object={scene} scale={scale} />;
}

export default function Landing() {
  const [settings, setSettings] = useState({
    cameraPos: [0, 2, 7],
    modelScale: 150,
    fov: 50,
  });

  const [currentVideo, setCurrentVideo] = useState(car);

  const [mouse, setMouse] = useState({ x: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      setMouse({ x });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;

      if (width < 640) {
        setSettings({
          cameraPos: [0, 1.5, 5],
          modelScale: 80,
          fov: 60,
        });
      } else if (width < 1024) {
        setSettings({
          cameraPos: [0, 2, 6],
          modelScale: 120,
          fov: 55,
        });
      } else {
        setSettings({
          cameraPos: [0, 2, 7],
          modelScale: 150,
          fov: 50,
        });
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const textRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current.children,
        { x: 0, y: -50, opacity: 0, scale: 0.95 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          delay: 1,
          duration: 1.2,
          ease: "power4.out",
          stagger: 0.2,
        }
      );
    }, textRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="h-screen w-screen overflow-hidden">
        <div
          ref={textRef}
          className="h-screen w-1/3 absolute z-50 left-3 text-gray-300"
        >
          <h1 className="font-semibold text-xl absolute top-7 Orbitron">
            THE FUTURE IS SUSTAINABLE ENERGY
          </h1>
          <p className="font-roboto font-bold text-sm absolute top-14 w-2/3">
            We're Building A World Powered By Solar Energy, Running On Batteries
            And Transported By Electric Vehicles
          </p>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-50 flex items-center space-x-8 text-gray-300">
          <div className="text-center">
            <div className="text-2xl font-bold font-orbitron">100k+</div>
            <div className="text-sm font-roboto mt-1">Employees</div>
          </div>
          <div className="h-16 w-px bg-gray-400"></div>
          <div className="text-center">
            <div className="text-2xl font-bold font-orbitron">20.4 Mmt</div>
            <div className="text-sm font-roboto mt-1">CO2e Avoided in 2023</div>
          </div>
        </div>

        <div className="h-screen w-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black absolute overflow-hidden">
          <Canvas camera={{ position: settings.cameraPos, fov: settings.fov }}>
            <ambientLight intensity={1} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <Suspense fallback={null}>
              <Model scale={settings.modelScale} mouse={mouse} />
            </Suspense>
          </Canvas>
        </div>
      </div>

      {/* Second Page */}
      <div className="relative w-full h-screen">
        {/* Background Video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          src={currentVideo}
          autoPlay
          loop
          muted
        />

        {/* Hover Sections */}
        {/* Second Page */}
        <div className="relative w-full h-screen overflow-hidden">
          {/* Background Videos */}
          <div className="absolute top-0 left-0 w-full h-full">
            <video
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
                currentVideo === "car" ? "opacity-100" : "opacity-0"
              }`}
              src={car}
              autoPlay
              loop
              muted
            />
            <video
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
                currentVideo === "charger" ? "opacity-100" : "opacity-0"
              }`}
              src={chargerVideo}
              autoPlay
              loop
              muted
            />
            <video
              className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-700 ${
                currentVideo === "electricity" ? "opacity-100" : "opacity-0"
              }`}
              src={electricityVideo}
              autoPlay
              loop
              muted
            />
          </div>

          {/* Hover Sections */}
          <div className="absolute top-0 left-0 w-full h-full flex z-10 text-white font-bold text-2xl">
            <div
              className="flex-1 border-r border-white flex items-center justify-center cursor-pointer group relative"
              onMouseEnter={() => setCurrentVideo("car")}
            >
              <span className="z-20">VEHICLES</span>
              {/* Blur overlay */}
              <div className="absolute inset-0 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition duration-500"></div>
            </div>
            <div
              className="flex-1 border-r border-white flex items-center justify-center cursor-pointer group relative"
              onMouseEnter={() => setCurrentVideo("charger")}
            >
              <span className="z-20">CHARGING</span>
              <div className="absolute inset-0 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition duration-500"></div>
            </div>
            <div
              className="flex-1 flex items-center justify-center cursor-pointer group relative"
              onMouseEnter={() => setCurrentVideo("electricity")}
            >
              <span className="z-20">POWER</span>
              <div className="absolute inset-0 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition duration-500"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
