import { existsSync } from "fs";
import TravelImage from "@/components/TravelImage";
import { join } from "path";

const publicFileExists = (imagePath: string) => existsSync(join(process.cwd(), "public", imagePath.replace(/^\//, "")));

// 카자흐스탄 상품 머리: 흰 바탕 + 알마티 공항 코드. eyebrow는 예전 페이지 호환용으로만 받는다.
export default function KazakhstanHero({
  title,
  description,
  imagePath,
  meta,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  imagePath: string;
  meta?: string[];
}) {
  // 상품별 사진이 아직 없으면 카자흐스탄 대표 사진을 쓴다.
  const fallbackImage = "/images/kazakhstan/kazakhstan-main-hero.png";
  const resolvedImage = publicFileExists(imagePath) ? imagePath : fallbackImage;
  const hasImage = publicFileExists(resolvedImage);

  return (
    <section className="border-b border-line bg-white text-ink">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-16">
        <div>
          <p className="code text-6xl text-navy" aria-hidden="true">ALA</p>
          <h1 className="display mt-4 max-w-4xl text-[2.25rem] sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-700 sm:text-lg">{description}</p>
          {meta ? (
            <ul className="mt-7 flex flex-wrap gap-2">
              {meta.map((item) => (
                <li key={item} className="rounded-full border-2 border-line px-3.5 py-1 text-sm font-medium text-ink">
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-md bg-slate-100">
          {hasImage ? (
            <TravelImage
              src={resolvedImage}
              alt={title}
              fill
              preload
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 100vw"
              fallbackTitle="카자흐스탄 프리미엄 자연 여행"
              fallbackDescription="산, 캐년, 호수, 사막을 연결하는 전용차량 프라이빗 투어"
              fallbackClassName="bg-slate-100"
            />
          ) : (
            <div className="px-6 text-center">
              <p className="display text-2xl text-ink">카자흐스탄 프리미엄 자연 여행</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">산, 캐년, 호수, 사막을 연결하는 전용차량 프라이빗 투어</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
