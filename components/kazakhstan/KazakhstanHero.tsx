import { existsSync } from "fs";
import Image from "next/image";
import { join } from "path";

const publicFileExists = (imagePath: string) => existsSync(join(process.cwd(), "public", imagePath.replace(/^\//, "")));

export default function KazakhstanHero({
  eyebrow,
  title,
  description,
  imagePath,
  meta,
}: {
  eyebrow: string;
  title: string;
  description: string;
  imagePath: string;
  meta?: string[];
}) {
  const hasImage = publicFileExists(imagePath);

  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
        <div>
          <p className="text-sm font-black text-cyan-700">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-600">{description}</p>
          {meta ? (
            <div className="mt-6 flex flex-wrap gap-2">
              {meta.map((item) => (
                <span key={item} className="rounded-md bg-slate-100 px-3 py-1.5 text-sm font-black text-slate-700">
                  {item}
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg bg-slate-200 shadow-sm">
          {hasImage ? (
            <Image src={imagePath} alt={title} fill className="object-cover" sizes="(min-width: 1024px) 45vw, 100vw" />
          ) : (
            <div className="px-6 text-center">
              <p className="text-lg font-black text-slate-800">카자흐스탄 프리미엄 자연 여행</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">산, 캐년, 호수, 사막을 연결하는 전용차량 프라이빗 투어</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
