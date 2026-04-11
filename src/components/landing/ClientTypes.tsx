import {
  Briefcase,
  Code2,
  Globe,
  LayoutDashboard,
  Megaphone,
  Palette,
  Rocket,
  Users,
} from "lucide-react";

const clients = [
  { label: "Freelancers", icon: Palette },
  { label: "Startups", icon: Rocket },
  { label: "Agencias", icon: LayoutDashboard },
  { label: "Desarrolladores", icon: Code2 },
  { label: "Consultoras", icon: Briefcase },
  { label: "Diseñadores", icon: Palette },
  { label: "Coaches", icon: Megaphone },
  { label: "SaaS", icon: Globe },
  { label: "Equipos remotos", icon: Users },
];

export function ClientTypes() {
  const doubled = [...clients, ...clients];

  return (
    <section className="py-10 border-y border-slate-100 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5">
        <p className="text-center text-sm font-medium text-slate-400 uppercase tracking-widest">
          Usado por profesionales de toda Latinoamérica
        </p>
      </div>

      {/* Marquee track */}
      <div className="relative flex">
        <div className="flex animate-marquee whitespace-nowrap">
          {doubled.map((client, i) => {
            const Icon = client.icon;
            return (
              <div
                key={i}
                className="flex items-center gap-2 mx-6 text-slate-500"
              >
                <Icon className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                <span className="text-sm font-medium">{client.label}</span>
                <span className="ml-6 text-slate-200">·</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
