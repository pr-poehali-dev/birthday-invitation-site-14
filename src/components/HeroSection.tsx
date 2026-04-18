import { useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const BG_IMAGE =
  "https://cdn.poehali.dev/projects/013969f6-5afd-4e97-846e-bc066c7476fe/files/f528e43e-ef38-4066-bd39-681ff3598360.jpg";

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  left: Math.random() * 100,
  delay: Math.random() * 12,
  duration: Math.random() * 10 + 12,
  color:
    i % 3 === 0
      ? "hsla(270,80%,70%,0.7)"
      : i % 3 === 1
      ? "hsla(45,90%,70%,0.6)"
      : "hsla(300,60%,75%,0.5)",
}));

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      hero.style.backgroundPosition = `calc(50% + ${x}px) calc(50% + ${y}px)`;
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <>
      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.left}%`,
              bottom: "-10px",
              background: p.color,
              animationDuration: `${p.duration}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <section
        ref={heroRef}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url(${BG_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-position 0.1s ease-out",
        }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, hsla(260,30%,3%,0.55) 0%, hsla(260,30%,5%,0.75) 70%, hsl(260,20%,5%) 100%)",
          }}
        />

        {/* Purple orb */}
        <div
          className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] animate-orb-pulse pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, hsla(270,80%,60%,0.25) 0%, hsla(270,60%,40%,0.1) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl mx-auto">
          <div
            className="flex items-center gap-4 mb-8 animate-fade-in"
            style={{ animationDelay: "0.2s", opacity: 0 }}
          >
            <div
              style={{
                width: 60,
                height: 1,
                background: "linear-gradient(to right, transparent, hsl(270 70% 65%))",
              }}
            />
            <span
              className="text-xs uppercase tracking-[0.3em]"
              style={{ color: "hsl(270 60% 70%)" }}
            >
              ✦ персональное приглашение ✦
            </span>
            <div
              style={{
                width: 60,
                height: 1,
                background: "linear-gradient(to left, transparent, hsl(270 70% 65%))",
              }}
            />
          </div>

          <h1
            className="shimmer-text animate-fade-up"
            style={{
              fontFamily: "'Cormorant', serif",
              fontSize: "clamp(3rem, 8vw, 7rem)",
              fontWeight: 600,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              animationDelay: "0.4s",
              opacity: 0,
            }}
          >
            23
            <span style={{ fontStyle: "italic", fontWeight: 300 }}>й</span>
          </h1>

          <h2
            className="animate-fade-up"
            style={{
              fontFamily: "'Cormorant', serif",
              fontSize: "clamp(1.5rem, 4vw, 3rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "hsl(280 20% 85%)",
              letterSpacing: "0.04em",
              animationDelay: "0.6s",
              opacity: 0,
              marginBottom: "1.5rem",
            }}
          >
            день рождения
          </h2>

          <p
            className="animate-fade-up"
            style={{
              fontFamily: "'Golos Text', sans-serif",
              fontSize: "clamp(1rem, 2vw, 1.25rem)",
              color: "hsl(280 15% 70%)",
              letterSpacing: "0.05em",
              animationDelay: "0.8s",
              opacity: 0,
              marginBottom: "3rem",
            }}
          >
            Буду рад тебя видеть
          </p>

          <div
            className="animate-float animate-fade-in"
            style={{ animationDelay: "1.2s", color: "hsl(270 60% 65%)", opacity: 0 }}
          >
            <Icon name="ChevronDown" size={28} />
          </div>
        </div>

        <div
          className="absolute bottom-8 left-8 text-2xl animate-sparkle"
          style={{ animationDelay: "0s", color: "hsl(280 20% 75%)" }}
        >
          ✦
        </div>
        <div
          className="absolute bottom-16 right-12 text-lg animate-sparkle"
          style={{ animationDelay: "0.7s", color: "hsl(270 70% 70%)" }}
        >
          ✦
        </div>
        <div
          className="absolute top-24 right-16 text-sm animate-sparkle"
          style={{ animationDelay: "1.4s", color: "hsl(45 90% 70%)" }}
        >
          ✦
        </div>
      </section>
    </>
  );
}
