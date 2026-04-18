import { useEffect, useRef, useState } from "react";
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

function useCountdown(targetDate: Date) {
  const calc = () => {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="glass-card rounded-2xl w-16 h-16 md:w-20 md:h-20 flex items-center justify-center animate-glow-pulse">
        <span
          style={{
            fontFamily: "'Cormorant', serif",
            fontSize: "clamp(1.4rem, 3vw, 2rem)",
            fontWeight: 700,
            color: "hsl(270 70% 80%)",
          }}
        >
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span
        className="text-xs uppercase tracking-widest"
        style={{ color: "hsl(270 20% 50%)" }}
      >
        {label}
      </span>
    </div>
  );
}

export default function Index() {
  const heroRef = useRef<HTMLDivElement>(null);
  const countdown = useCountdown(new Date("2026-05-03T14:00:00"));
  const [visible, setVisible] = useState({
    invite: false,
    place: false,
    time: false,
  });

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const sections = [
      { id: "invite", ref: ".section-invite" },
      { id: "place", ref: ".section-place" },
      { id: "time", ref: ".section-time" },
    ];
    sections.forEach(({ id, ref }) => {
      const el = document.querySelector(ref);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting)
            setVisible((v) => ({ ...v, [id]: true }));
        },
        { threshold: 0.15 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

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
    <div className="relative min-h-screen" style={{ background: "hsl(260 20% 5%)" }}>
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

      {/* ─── HERO ─── */}
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

      {/* ─── INVITE ─── */}
      <section
        className={`section-invite relative z-10 py-24 px-6 transition-all duration-1000 ${
          visible.invite ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, hsl(270 70% 50%), hsl(300 60% 60%))",
              }}
            >
              <Icon name="Sparkles" size={20} style={{ color: "white" }} />
            </div>
          </div>

          <h2
            style={{
              fontFamily: "'Cormorant', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 600,
              color: "hsl(280 20% 92%)",
              marginBottom: "1.5rem",
              lineHeight: 1.15,
            }}
          >
            Приглашение на моё
            <br />
            <span className="shimmer-text" style={{ fontStyle: "italic" }}>
              23-е день рождения
            </span>
          </h2>

          <p
            style={{
              fontFamily: "'Golos Text', sans-serif",
              fontSize: "1.1rem",
              color: "hsl(270 15% 60%)",
              lineHeight: 1.8,
              letterSpacing: "0.02em",
            }}
          >
            Этот день я хочу провести в хорошей компании —<br />
            среди тех, кто важен для меня. И ты среди них.
          </p>

          <div className="flex items-center gap-4 mt-10 justify-center">
            <div
              style={{
                width: 80,
                height: 1,
                background: "linear-gradient(to right, transparent, hsl(270 50% 40%))",
              }}
            />
            <span style={{ color: "hsl(270 60% 65%)", fontSize: "1.2rem" }}>✦</span>
            <div
              style={{
                width: 80,
                height: 1,
                background: "linear-gradient(to left, transparent, hsl(270 50% 40%))",
              }}
            />
          </div>
        </div>
      </section>

      {/* ─── TIME ─── */}
      <section
        className={`section-time relative z-10 py-20 px-6 transition-all duration-1000 ${
          visible.time ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div
          className="absolute left-1/2 top-0 -translate-x-1/2 w-[400px] h-[300px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, hsla(270,80%,55%,0.12) 0%, transparent 70%)",
            filter: "blur(30px)",
          }}
        />

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div style={{ width: 30, height: 1, background: "hsl(270 50% 40%)" }} />
              <span
                className="text-xs uppercase tracking-[0.3em]"
                style={{ color: "hsl(270 50% 55%)" }}
              >
                когда
              </span>
              <div style={{ width: 30, height: 1, background: "hsl(270 50% 40%)" }} />
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant', serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 600,
                color: "hsl(280 20% 92%)",
              }}
            >
              3 мая
            </h2>
            <p
              style={{
                fontFamily: "'Golos Text', sans-serif",
                fontSize: "1.15rem",
                color: "hsl(270 15% 65%)",
                marginTop: "0.5rem",
              }}
            >
              14:00 — 19:00
            </p>
          </div>

          {/* Countdown */}
          <div className="glass-card rounded-3xl p-8 text-center mb-8">
            <p
              className="mb-6 text-sm uppercase tracking-widest"
              style={{ color: "hsl(270 30% 55%)" }}
            >
              до праздника осталось
            </p>
            <div className="flex gap-4 md:gap-6 justify-center flex-wrap">
              <CountdownBox value={countdown.days} label="дней" />
              <CountdownBox value={countdown.hours} label="часов" />
              <CountdownBox value={countdown.minutes} label="минут" />
              <CountdownBox value={countdown.seconds} label="секунд" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: "Calendar", label: "Дата", value: "3 мая 2026" },
              { icon: "Clock", label: "Время", value: "14:00 – 19:00" },
            ].map(({ icon, label, value }) => (
              <div
                key={label}
                className="glass-card rounded-2xl p-5 flex gap-4 items-center"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{
                    background: "hsla(270, 70%, 50%, 0.2)",
                    border: "1px solid hsla(270, 70%, 60%, 0.3)",
                  }}
                >
                  <Icon
                    name={icon as "Calendar" | "Clock"}
                    size={18}
                    style={{ color: "hsl(270 70% 75%)" }}
                  />
                </div>
                <div>
                  <p
                    className="text-xs uppercase tracking-wider"
                    style={{ color: "hsl(270 20% 50%)" }}
                  >
                    {label}
                  </p>
                  <p style={{ color: "hsl(280 15% 88%)", fontWeight: 500 }}>{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PLACE ─── */}
      <section
        className={`section-place relative z-10 py-20 px-6 transition-all duration-1000 ${
          visible.place ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div style={{ width: 30, height: 1, background: "hsl(270 50% 40%)" }} />
              <span
                className="text-xs uppercase tracking-[0.3em]"
                style={{ color: "hsl(270 50% 55%)" }}
              >
                где
              </span>
              <div style={{ width: 30, height: 1, background: "hsl(270 50% 40%)" }} />
            </div>
            <h2
              style={{
                fontFamily: "'Cormorant', serif",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 600,
                color: "hsl(280 20% 92%)",
              }}
            >
              Место встречи
            </h2>
          </div>

          <div className="glass-card rounded-3xl overflow-hidden mb-6 animate-glow-pulse">
            <div
              className="relative h-52 md:h-64 overflow-hidden"
              style={{ background: "hsl(260 20% 8%)" }}
            >
              <iframe
                src="https://yandex.ru/map-widget/v1/?ll=37.6173&z=15&text=%D0%BF%D0%B0%D1%80%D0%BA+%D0%B8%D0%BC.+%D0%A2%D0%B8%D1%89%D0%B5%D0%BD%D0%BA%D0%BE&mode=search"
                width="100%"
                height="100%"
                style={{
                  border: "none",
                  filter: "brightness(0.7) saturate(0.5) hue-rotate(240deg)",
                }}
                allowFullScreen
                title="Карта"
              />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center animate-float shadow-2xl"
                  style={{
                    background:
                      "linear-gradient(135deg, hsl(270 70% 55%), hsl(300 60% 60%))",
                    boxShadow: "0 0 30px hsla(270, 70%, 60%, 0.6)",
                  }}
                >
                  <Icon name="MapPin" size={22} style={{ color: "white" }} />
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 mt-1"
                  style={{
                    background:
                      "linear-gradient(135deg, hsla(270,70%,50%,0.3), hsla(300,60%,50%,0.2))",
                    border: "1px solid hsla(270, 70%, 55%, 0.3)",
                  }}
                >
                  <Icon name="Trees" size={20} style={{ color: "hsl(270 70% 75%)" }} />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: "'Cormorant', serif",
                      fontSize: "1.5rem",
                      fontWeight: 600,
                      color: "hsl(280 20% 92%)",
                      lineHeight: 1.2,
                    }}
                  >
                    Парк им. Тищенко
                  </h3>
                  <p
                    style={{
                      color: "hsl(270 15% 60%)",
                      marginTop: "0.25rem",
                      fontSize: "0.95rem",
                    }}
                  >
                    Мангальная зона с домиком
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: "Flame", text: "Мангал" },
              { icon: "Home", text: "Домик" },
              { icon: "TreePine", text: "Парк" },
            ].map(({ icon, text }) => (
              <div
                key={text}
                className="glass-card rounded-2xl p-4 flex flex-col items-center gap-2 text-center"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "hsla(270, 70%, 50%, 0.15)" }}
                >
                  <Icon
                    name={icon as "Flame" | "Home" | "TreePine"}
                    size={16}
                    style={{ color: "hsl(270 70% 75%)" }}
                  />
                </div>
                <span
                  className="text-sm font-medium"
                  style={{ color: "hsl(280 15% 75%)" }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 py-16 px-6 text-center">
        <div
          className="w-[300px] h-[200px] mx-auto mb-[-100px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, hsla(270,80%,55%,0.15) 0%, transparent 70%)",
            filter: "blur(20px)",
          }}
        />
        <div className="flex items-center gap-4 justify-center mb-6">
          <div
            style={{
              width: 60,
              height: 1,
              background: "linear-gradient(to right, transparent, hsl(270 50% 40%))",
            }}
          />
          <span style={{ color: "hsl(270 60% 65%)", fontSize: "1.5rem" }}>✦</span>
          <div
            style={{
              width: 60,
              height: 1,
              background: "linear-gradient(to left, transparent, hsl(270 50% 40%))",
            }}
          />
        </div>
        <p
          style={{
            fontFamily: "'Cormorant', serif",
            fontSize: "1.8rem",
            fontWeight: 300,
            fontStyle: "italic",
            color: "hsl(280 15% 70%)",
          }}
        >
          Буду рад тебя видеть
        </p>
        <p
          className="mt-3 text-sm"
          style={{ color: "hsl(270 15% 40%)", letterSpacing: "0.05em" }}
        >
          3 мая · 14:00 · Парк им. Тищенко
        </p>
      </footer>
    </div>
  );
}
