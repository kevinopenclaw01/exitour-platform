"use client";

import { useMemo, useState } from "react";
import type { Destination } from "@/lib/data";
import { hasQuotePrefill, type QuotePrefillInput } from "@/lib/quote/prefill";

type QuoteFormProps = {
  destinations: Destination[];
  hotelGrades: string[];
  serviceOptions: string[];
  prefill?: QuotePrefillInput;
};

type FormStatus = {
  type: "idle" | "success" | "error";
  message: string;
};

const fieldClass =
  "rounded-md border border-slate-300 px-3 py-3 font-medium text-slate-700 outline-none focus:border-cyan-500";

const parseBudget = (value: FormDataEntryValue | null) => {
  if (typeof value !== "string") {
    return undefined;
  }

  const digits = value.replace(/[^\d]/g, "");
  return digits ? Number(digits) : undefined;
};

export default function QuoteForm({ destinations, hotelGrades, serviceOptions, prefill }: QuoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<FormStatus>({ type: "idle", message: "" });
  const hasPrefill = hasQuotePrefill(prefill);
  const prefillDestination = prefill?.destination;
  const prefillService = prefill?.service;

  const destinationOptions = useMemo(
    () => destinations.map((destination) => `${destination.country} - ${destination.name}`),
    [destinations],
  );

  const destinationValue = useMemo(() => {
    if (!prefillDestination) {
      return "";
    }

    return destinationOptions.find((option) => option.toLowerCase().includes(prefillDestination.toLowerCase())) ?? prefillDestination;
  }, [destinationOptions, prefillDestination]);

  const serviceValue = useMemo(() => {
    if (!prefillService) {
      return "";
    }

    return serviceOptions.find((option) => option.toLowerCase() === prefillService.toLowerCase()) ?? prefillService;
  }, [prefillService, serviceOptions]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus({ type: "idle", message: "" });
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const requestedServices = formData
      .getAll("requested_services")
      .filter((service): service is string => typeof service === "string");
    const destinationText = formData.get("destination_text");
    const editedService = formData.get("prefill_service");
    const quotePrefill = hasPrefill
      ? {
          productId: formData.get("prefill_product_id"),
          product: formData.get("prefill_product"),
          destination: destinationText,
          service: typeof editedService === "string" && editedService.trim() ? editedService : serviceValue,
          sourcePath: formData.get("prefill_source_path"),
        }
      : undefined;

    const payload = {
      destination_text: destinationText,
      start_date: formData.get("start_date"),
      end_date: formData.get("end_date"),
      adults: formData.get("adults"),
      children: formData.get("children"),
      infants: formData.get("infants"),
      hotel_grade: formData.get("hotel_grade"),
      requested_services: requestedServices,
      budget_krw: parseBudget(formData.get("budget_krw")),
      customer_name: formData.get("customer_name"),
      phone: formData.get("phone"),
      kakao_id: formData.get("kakao_id"),
      email: formData.get("email"),
      message: formData.get("message"),
      quote_prefill: quotePrefill,
      privacy_agreed: formData.get("privacy_agreed") === "on",
    };

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = (await response.json()) as { ok: boolean; message: string };

      if (!response.ok || !result.ok) {
        setStatus({ type: "error", message: result.message || "입력값을 확인해 주세요." });
        return;
      }

      event.currentTarget.reset();
      setStatus({ type: "success", message: result.message });
    } catch {
      setStatus({ type: "error", message: "입력값을 확인해 주세요." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-10 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      {hasPrefill ? (
        <section className="mb-6 rounded-lg border border-cyan-200 bg-cyan-50 p-4">
          <p className="text-sm font-black text-cyan-900">자동 입력된 상담 정보</p>
          <div className="mt-3 grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-bold text-slate-800">
              상품명
              <input name="prefill_product" type="text" defaultValue={prefill?.product ?? ""} className={fieldClass} />
            </label>
            <label className="flex flex-col gap-2 text-sm font-bold text-slate-800">
              문의 유형
              <input name="prefill_service" type="text" defaultValue={prefill?.service ?? ""} className={fieldClass} />
            </label>
          </div>
          <input name="prefill_product_id" type="hidden" value={prefill?.productId ?? ""} readOnly />
          <input name="prefill_source_path" type="hidden" value={prefill?.sourcePath ?? ""} readOnly />
          {prefill?.sourcePath ? <p className="mt-3 text-xs font-semibold text-cyan-900">유입 페이지: {prefill.sourcePath}</p> : null}
        </section>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm font-bold text-slate-800">
          여행지
          <select name="destination_text" required className={fieldClass} defaultValue={destinationValue}>
            <option value="" disabled>
              선택해주세요
            </option>
            {destinationValue && !destinationOptions.includes(destinationValue) ? (
              <option value={destinationValue}>{destinationValue}</option>
            ) : null}
            {destinationOptions.map((destination) => (
              <option key={destination} value={destination}>
                {destination}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm font-bold text-slate-800">
          호텔 등급
          <select name="hotel_grade" className={fieldClass} defaultValue="상관없음">
            {hotelGrades.map((grade) => (
              <option key={grade} value={grade}>
                {grade}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-2 text-sm font-bold text-slate-800">
          출발일
          <input name="start_date" type="date" required className={fieldClass} />
        </label>
        <label className="flex flex-col gap-2 text-sm font-bold text-slate-800">
          귀국일
          <input name="end_date" type="date" required className={fieldClass} />
        </label>
        <label className="flex flex-col gap-2 text-sm font-bold text-slate-800">
          성인 수
          <input name="adults" type="number" min="1" required placeholder="예: 2" className={fieldClass} />
        </label>
        <label className="flex flex-col gap-2 text-sm font-bold text-slate-800">
          아동 수
          <input name="children" type="number" min="0" placeholder="예: 1" className={fieldClass} />
        </label>
        <label className="flex flex-col gap-2 text-sm font-bold text-slate-800">
          유아 수
          <input name="infants" type="number" min="0" placeholder="예: 0" className={fieldClass} />
        </label>
        <label className="flex flex-col gap-2 text-sm font-bold text-slate-800">
          예산
          <input name="budget_krw" type="text" placeholder="예: 1인 150만원 또는 총 500만원" className={fieldClass} />
        </label>
        <label className="flex flex-col gap-2 text-sm font-bold text-slate-800">
          이름
          <input name="customer_name" type="text" required placeholder="홍길동" className={fieldClass} />
        </label>
        <label className="flex flex-col gap-2 text-sm font-bold text-slate-800">
          연락처
          <input name="phone" type="tel" placeholder="010-0000-0000" className={fieldClass} />
        </label>
        <label className="flex flex-col gap-2 text-sm font-bold text-slate-800">
          카카오톡 ID
          <input name="kakao_id" type="text" placeholder="상담 가능한 카카오톡 ID" className={fieldClass} />
        </label>
        <label className="flex flex-col gap-2 text-sm font-bold text-slate-800">
          이메일
          <input name="email" type="email" placeholder="name@example.com" className={fieldClass} />
        </label>
      </div>

      <fieldset className="mt-6">
        <legend className="text-sm font-bold text-slate-800">필요한 서비스</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {serviceOptions.map((service) => (
            <label
              key={service}
              className="flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-700"
            >
              <input
                name="requested_services"
                value={service}
                type="checkbox"
                defaultChecked={serviceValue === service}
                className="h-4 w-4 accent-cyan-600"
              />
              {service}
            </label>
          ))}
          {serviceValue && !serviceOptions.includes(serviceValue) ? (
            <label className="flex items-center gap-2 rounded-md border border-cyan-200 bg-cyan-50 px-3 py-3 text-sm font-semibold text-slate-700">
              <input name="requested_services" value={serviceValue} type="checkbox" defaultChecked className="h-4 w-4 accent-cyan-600" />
              {serviceValue}
            </label>
          ) : null}
        </div>
      </fieldset>

      <label className="mt-6 flex flex-col gap-2 text-sm font-bold text-slate-800">
        문의 내용
        <textarea
          name="message"
          rows={6}
          placeholder="원하는 일정, 피하고 싶은 일정, 선호 호텔, 기념일 여부 등을 적어주세요."
          className={fieldClass}
        />
      </label>

      <label className="mt-6 flex items-start gap-3 rounded-md bg-slate-50 p-4 text-sm font-semibold leading-6 text-slate-700">
        <input name="privacy_agreed" type="checkbox" required className="mt-1 h-4 w-4 accent-cyan-600" />
        개인정보 수집 및 상담 목적 이용에 동의합니다.
      </label>

      {status.type !== "idle" ? (
        <div
          role="status"
          className={`mt-6 rounded-md px-4 py-3 text-sm font-bold ${
            status.type === "success" ? "bg-cyan-50 text-cyan-900" : "bg-red-50 text-red-700"
          }`}
        >
          {status.message}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-6 w-full rounded-md bg-slate-950 px-5 py-4 text-sm font-black text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {isSubmitting ? "접수 중입니다..." : "상담 요청 접수하기"}
      </button>
    </form>
  );
}
