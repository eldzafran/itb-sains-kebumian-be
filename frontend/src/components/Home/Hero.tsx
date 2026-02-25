"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [engineReady, setEngineReady] = useState(false);
  const canvasRef = useRef(null);

  const slides = [
    {
      title: "Program Studi",
      subtitle: "Sains Kebumian",
      header: "Sains Atmosfer",
      description: "Studi mendalam tentang atmosfer, cuaca, dan perubahan iklim",
      topics: ["Meteorologi", "Klimatologi", "Kualitas Udara"],
    },
    {
      title: "Akademik",
      subtitle: "Sains Kebumian",
      header: "Interaksi Sistem Bumi",
      description: "Studi mendalam tentang sifat-sifat fisik laut",
      topics: ["Meteorologi", "Klimatologi", "Kualitas Udara"],
    },
    {
      title: "Akademik 2",
      subtitle: "Sains Kebumian",
      header: "Membangun Masa Depan",
      description: "Membangun masa depan berkelanjutan",
      topics: ["Geologi", "Geofisika", "Oseanografi"],
    },
  ];

  /* ===== INIT PARTICLES ===== */
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine);
    }).then(() => setEngineReady(true));
  }, []);

  /* ===== THREE.JS ===== */
  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(0, 0, 4);

    scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.2));

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(10, 10, 10);
    scene.add(dirLight);

    const pivot = new THREE.Group();
    scene.add(pivot);

    let model;

    new GLTFLoader().load("/World2.glb", (gltf) => {
      model = gltf.scene;

      model.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: child.material.color || new THREE.Color("#ffffff"),
            metalness: 0.25,
            roughness: 0.55,
            emissive: new THREE.Color("#0a2a6f"),
            emissiveIntensity: 0.15,
          });
        }
      });

      model.scale.set(0.9, 0.9, 0.9);

      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());
      model.position.sub(center);

      pivot.add(model);
    });

    const resize = () => {
      const { width, height } = canvasRef.current.parentElement.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      requestAnimationFrame(animate);
      if (model) pivot.rotation.y += 0.003;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-[#020618] via-[#162456] to-[#121A2F] overflow-hidden">
          {/* style=
      {{
        background: "linear-gradient(180deg, #0B1226 0%, #121A2F 50%, #172758 100%)",
      }} */}
      {engineReady && (
        <Particles
          id="hero-particles"
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ width: "100%", height: "100%" }}
          options={{
            fullScreen: { enable: false },
            particles: {
              number: { value: 120, density: { enable: true, area: 800 } },
              color: { value: "#ffffff" },
              size: { value: { min: 1, max: 2 } },
              opacity: { value: 0.8 },
              move: { enable: true, speed: 0.4 },
            },
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
              },
              modes: {
                repulse: {
                  distance: 80,
                  duration: 0.4,
                },
              },
            },
          }}
        />
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">{slides[current].title}</h1>

        <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">{slides[current].subtitle}</h2>

        <div className="flex justify-center my-11">
          <div className="relative w-[380px] h-[380px] md:w-[400px] md:h-[400px]">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
          </div>
        </div>

        {/* SLIDER */}
        <div className="flex justify-center items-center gap-8 mb-4">
          <button onClick={() => setCurrent(current === 0 ? slides.length - 1 : current - 1)} className="p-3 rounded-full border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 transition">
            <ChevronLeft />
          </button>

          <div>
            <h3 className="text-2xl font-semibold text-white mb-1">{slides[current].header}</h3>
            <p className="text-slate-400 text-sm">{slides[current].description}</p>
          </div>

          <button onClick={() => setCurrent(current === slides.length - 1 ? 0 : current + 1)} className="p-3 rounded-full border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 transition">
            <ChevronRight />
          </button>
        </div>

        <div className="flex justify-center gap-3 flex-wrap mb-8">
          {slides[current].topics.map((topic, i) => (
            <span key={i} className="px-4 py-2 rounded-full border border-slate-600 text-slate-300 text-sm">
              {topic}
            </span>
          ))}
        </div>

        

        <button className="bg-gradient-to-r from-cyan-400 to-blue-500 px-8 py-3 rounded-full font-semibold text-white">Pelajari Lebih Lanjut</button>
      </div>
    </section>
  );
}
