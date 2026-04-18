import Icon from "@/components/ui/icon";

interface InviteSectionProps {
  visible: boolean;
}

export default function InviteSection({ visible }: InviteSectionProps) {
  return (
    <section
      className={`section-invite relative z-10 py-24 px-6 transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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
  );
}
