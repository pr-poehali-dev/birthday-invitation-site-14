import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

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

interface TimeSectionProps {
  visible: boolean;
}

export default function TimeSection({ visible }: TimeSectionProps) {
  const countdown = useCountdown(new Date("2026-05-03T14:00:00"));

  return (
    <section
      className={`section-time relative z-10 py-20 px-6 transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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
  );
}
