import { BedDouble, MapPin, Utensils } from "lucide-react";
import type { SapaDay } from "@/lib/mock/sapaPackage";

export default function SapaItinerary({ days }: { days: SapaDay[] }) {
  return (
    <ol className="divide-y divide-slate-200 border-y border-slate-200">
      {days.map((day) => (
        <li key={day.day} className="grid gap-4 py-7 sm:grid-cols-[88px_1fr] sm:gap-6">
          <p className="text-lg font-bold text-[#176753]">Day {day.day}</p>
          <div className="min-w-0">
            <h3 className="break-keep text-xl font-bold text-[#172b27]">{day.title}</h3>
            <p className="mt-2 flex items-start gap-2 text-sm font-medium text-[#176753]"><MapPin size={16} className="mt-0.5 shrink-0" aria-hidden="true" />{day.location}</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">{day.description}</p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
              {day.stops.map((stop) => <li key={stop} className="flex gap-3"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#176753]" />{stop}</li>)}
            </ul>
            <div className="mt-5 space-y-2 text-xs leading-6 text-slate-500">
              <p className="flex gap-2"><Utensils size={15} className="mt-1 shrink-0" aria-hidden="true" />{day.meals}</p>
              <p className="flex gap-2"><BedDouble size={15} className="mt-1 shrink-0" aria-hidden="true" />{day.accommodation}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
