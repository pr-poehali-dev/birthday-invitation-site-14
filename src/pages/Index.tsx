import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import InviteSection from "@/components/InviteSection";
import TimeSection from "@/components/TimeSection";
import PlaceSection from "@/components/PlaceSection";

export default function Index() {
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

  return (
    <div className="relative min-h-screen" style={{ background: "hsl(260 20% 5%)" }}>
      <HeroSection />
      <InviteSection visible={visible.invite} />
      <TimeSection visible={visible.time} />
      <PlaceSection visible={visible.place} />
    </div>
  );
}
