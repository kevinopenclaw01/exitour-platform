import { existsSync } from "fs";
import Image from "next/image";
import { join } from "path";
import type { GuamVehicleImage } from "@/lib/mock/guamTransfer";

const publicFileExists = (imagePath: string) => {
  const normalizedPath = imagePath.replace(/^\//, "");
  return existsSync(join(process.cwd(), "public", normalizedPath));
};

export function GuamTransferGuideSection({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-black text-slate-950">{title}</h2>
      <p className="mt-4 text-sm leading-7 text-slate-600">{body}</p>
    </section>
  );
}

export function GuamVehicleImageGrid({
  title,
  description,
  vehicles,
}: {
  title: string;
  description: string;
  vehicles: GuamVehicleImage[];
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-black text-slate-950">{title}</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {vehicles.map((vehicle) => {
          const hasImage = publicFileExists(vehicle.imagePath);

          return (
            <article key={vehicle.id} className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
              <div className="relative flex aspect-[4/3] items-center justify-center bg-slate-200">
                {hasImage ? (
                  <Image src={vehicle.imagePath} alt={vehicle.alt} fill className="object-cover" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
                ) : (
                  <div className="px-4 text-center">
                    <p className="text-sm font-black text-slate-700">대표 이미지 / 동급 차량 예시</p>
                    <p className="mt-2 break-all text-xs leading-5 text-slate-500">{vehicle.imagePath}</p>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-black text-slate-950">{vehicle.title}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-600">{vehicle.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
