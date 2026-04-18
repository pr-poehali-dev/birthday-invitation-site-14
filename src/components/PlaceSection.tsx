import Icon from "@/components/ui/icon";

interface PlaceSectionProps {
  visible: boolean;
}

export default function PlaceSection({ visible }: PlaceSectionProps) {
  return (
    <>
      <section
        className={`section-place relative z-10 py-20 px-6 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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
    </>
  );
}
