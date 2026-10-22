"use client";

import { useState } from "react";
import DestinationGrid from "@/components/travel/DestinationGrid";
import { travelCategories, type TravelCategoryId } from "@/lib/travel/catalog";

export default function DestinationExplorer() {
  const [category, setCategory] = useState<TravelCategoryId>("packages");
  return (
    <>
      <fieldset className="mb-8 grid max-w-xl grid-cols-2 gap-2">
        <legend className="sr-only">여행 방식 선택</legend>
        {travelCategories.map((item) => (
          <label key={item.id} className="flex min-h-12 cursor-pointer items-center justify-center rounded-md border-2 border-line bg-white p-3 text-center text-sm font-bold text-ink has-[:checked]:border-navy has-[:checked]:bg-navy has-[:checked]:text-white has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-navy">
            <input type="radio" name="travel-category" value={item.id} checked={category === item.id} onChange={() => setCategory(item.id)} className="sr-only" aria-controls="destination-options" />
            {item.name}
          </label>
        ))}
      </fieldset>
      <div id="destination-options">
        <p className="sr-only" role="status">{travelCategories.find((item) => item.id === category)?.name} 여행지</p>
        <DestinationGrid category={category} />
      </div>
    </>
  );
}
