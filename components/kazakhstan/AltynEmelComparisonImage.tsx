"use client";

import Image from "next/image";
import { useState } from "react";

const comparisonImagePath = "/images/kazakhstan/altyn-emel-private-vs-join-comparison.png";
const comparisonSummary =
  "프라이빗 투어는 우리 팀만 단독으로 매일 출발 가능한 일정이며, 영어 또는 한국어 가이드를 선택할 수 있습니다. 조인 투어는 매주 화요일·토요일 출발하며, 다른 여행자들과 함께 영어 가이드 기준으로 진행됩니다.";

export default function AltynEmelComparisonImage() {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mx-auto max-w-4xl">
        {hasImageError ? (
          <div className="flex min-h-64 items-center justify-center rounded-lg bg-slate-100 px-5 text-center">
            <div>
              <p className="text-base font-black text-slate-950">알틴에멜 투어 비교 이미지</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">이미지를 불러오지 못했습니다. 프라이빗 투어와 조인 투어의 차이는 아래 요약을 확인해 주세요.</p>
            </div>
          </div>
        ) : (
          <Image
            src={comparisonImagePath}
            alt="알틴에멜 프라이빗 투어와 조인 투어 비교"
            width={880}
            height={1200}
            className="h-auto w-full rounded-lg border border-slate-100 object-contain"
            sizes="(min-width: 1024px) 896px, 100vw"
            onError={() => setHasImageError(true)}
          />
        )}
        <p className="mt-4 text-sm leading-7 text-slate-600">{comparisonSummary}</p>
      </div>
    </section>
  );
}
