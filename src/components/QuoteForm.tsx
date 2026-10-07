"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { telHref, whatsappHref } from "@/lib/contact";
import {
  AlertIcon,
  ArrowRightIcon,
  CheckIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "./ui/Icons";

/**
 * Aanvraagflow in vier stappen:
 *   1. Werkzaamheden  2. Locatie  3. Urgentie  4. Contactgegevens
 *
 * Opzet:
 *  - Stap 1 vraagt alleen een tik: geen formulier in beeld bij binnenkomst.
 *  - Locatie komt vroeg: de bezoeker ziet meteen dat hij in het werkgebied
 *    valt, en de aanvraag kwalificeert zichzelf.
 *  - Urgentie is bij déze niche de sleutelvraag. Kiest iemand "Nu — er is een
 *    storing", dan raden we zichtbaar aan om te bellen in plaats van hem door
 *    de rest van het formulier te duwen. Het is een AANBEVELING, geen
 *    blokkade: wie om 22:00 op de bank zit mag gewoon doorgaan.
 *  - Contactgegevens komen pas in stap 4, als iemand al geïnvesteerd heeft.
 *  - Alles blijft in één scherm; geen routing, geen formulierbibliotheek.
 *
 * Alle vraagteksten en keuzes staan in siteConfig.quote.
 *
 * PRODUCTIE: de inzending gaat naar /api/quote. Zie src/app/api/quote/route.ts
 * voor de plek waar je e-mail, een webhook, een CRM of een afsprakentool
 * koppelt.
 */

type FormState = {
  work: string[];
  postcode: string;
  place: string;
  property: string;
  urgency: string;
  urgencyId: string;
  name: string;
  phone: string;
  email: string;
  message: string;
};

const EMPTY: FormState = {
  work: [],
  postcode: "",
  place: "",
  property: "",
  urgency: "",
  urgencyId: "",
  name: "",
  phone: "",
  email: "",
  message: "",
};

export function QuoteForm() {
  const { quote, serviceArea, business, demoMode, demoLabels } = siteConfig;
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const panelRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  const stepCount = quote.stepLabels.length;

  /** Heeft iemand in stap 1 een storing aangevinkt? Dan hoort hij te bellen. */
  const faultLabels = quote.workOptions.filter((o) => o.isFault).map((o) => o.label);
  const pickedFault = form.work.some((label) => faultLabels.includes(label));

  /** Heeft iemand in stap 3 "nu / storing" gekozen? */
  const urgentOption = quote.urgencyOptions.find((o) => o.isUrgent);
  const pickedUrgent = form.urgencyId === urgentOption?.id;

  const canContinue =
    (step === 0 && form.work.length > 0) ||
    (step === 1 && form.postcode.trim() !== "" && form.place.trim() !== "") ||
    (step === 2 && form.urgencyId !== "");

  /**
   * Bij een stapwissel verandert de hoogte van het formulier. Zonder dit staat
   * iemand op mobiel ineens halverwege de volgende vraag te kijken.
   */
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step, status]);

  function toggleWork(label: string) {
    setForm((f) => ({
      ...f,
      work: f.work.includes(label)
        ? f.work.filter((w) => w !== label)
        : [...f.work, label],
    }));
  }

  /**
   * De urgentiestap springt automatisch door — behalve bij een storing. Dan
   * blijft de bezoeker staan en krijgt hij eerst het beladvies te zien.
   */
  function pickUrgency(option: (typeof quote.urgencyOptions)[number]) {
    setForm((f) => ({ ...f, urgency: option.label, urgencyId: option.id }));
    if (option.isUrgent) return;
    setTimeout(() => setStep((s) => Math.min(s + 1, stepCount - 1)), 180);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div
        ref={panelRef}
        className="scroll-mt-28 border border-line bg-paper p-6 text-center text-ink sm:p-7 md:p-12"
      >
        <span className="mx-auto flex h-14 w-14 items-center justify-center bg-accent text-accent-ink">
          <CheckIcon className="h-7 w-7" />
        </span>
        <h3 className="mt-5 text-[1.5rem]">{quote.successTitle}</h3>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
          {quote.successBody}
        </p>
        <div className="mx-auto mt-7 flex max-w-sm flex-col gap-2.5 sm:flex-row">
          <a href={telHref} className="btn btn-call flex-1">
            <PhoneIcon className="h-[1.1rem] w-[1.1rem]" />
            {business.phone.display}
          </a>
          <a
            href={whatsappHref("quote")}
            target="_blank"
            rel="noopener"
            className="btn btn-outline flex-1"
          >
            <WhatsAppIcon className="h-[1.15rem] w-[1.15rem] text-whatsapp" />
            WhatsApp
          </a>
        </div>
        {demoMode && (
          <p className="mt-6 text-[0.88rem] text-muted">
            {demoLabels.quoteSuccessNotice}
          </p>
        )}
      </div>
    );
  }

  return (
    <div ref={panelRef} className="scroll-mt-28 border border-line bg-paper text-ink">
      {/* Voortgang: laat zien dat het kort is */}
      <div className="border-b border-line px-5 pt-5 pb-4 md:px-8">
        <div className="flex items-center justify-between gap-3">
          <p className="label-mono text-[0.68rem] text-ink">
            <span className="tnum">
              Stap {step + 1}/{stepCount}
            </span>
            <span className="ml-2.5 text-muted">{quote.stepLabels[step]}</span>
          </p>
          <p className="label-mono shrink-0 text-[0.68rem] text-muted">
            {quote.estimatedTime}
          </p>
        </div>
        <div className="mt-2.5 flex gap-1" aria-hidden="true">
          {quote.stepLabels.map((label, i) => (
            <span
              key={label}
              className={`h-1 flex-1 transition-colors ${
                i <= step ? "bg-accent" : "bg-shell-dark"
              }`}
            />
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-5 md:p-8">
        {/* ── Stap 1: werkzaamheden ──────────────────────────────────── */}
        {step === 0 && (
          <fieldset>
            <legend className="font-display text-[1.25rem] font-bold tracking-tight md:text-[1.4rem]">
              {quote.steps.work.question}
            </legend>
            <p className="mt-1.5 text-[0.95rem] text-muted">{quote.steps.work.help}</p>

            <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
              {quote.workOptions.map((option) => {
                const active = form.work.includes(option.label);
                return (
                  <label
                    key={option.id}
                    className={`flex cursor-pointer items-center gap-3 border p-4 text-[0.95rem] font-medium transition-colors ${
                      active
                        ? "border-brand bg-shell text-ink"
                        : "border-line hover:border-line-strong"
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={active}
                      onChange={() => toggleWork(option.label)}
                    />
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center border ${
                        active ? "border-brand bg-brand text-white" : "border-line-strong"
                      }`}
                      aria-hidden="true"
                    >
                      {active && <CheckIcon className="h-3.5 w-3.5" />}
                    </span>
                    {option.label}
                  </label>
                );
              })}
            </div>

            {/* Storing aangevinkt? Dan hier al de hint dat bellen sneller is. */}
            {pickedFault && (
              <div className="mt-5 flex flex-col gap-3 border-l-[3px] border-accent bg-shell px-4 py-3.5 sm:flex-row sm:items-center">
                <p className="text-[0.9rem] leading-relaxed text-ink sm:flex-1">
                  <AlertIcon className="mr-1.5 -mt-0.5 inline h-4 w-4 text-accent-dark" />
                  Bij een storing gaat bellen sneller dan dit formulier.
                </p>
                <a
                  href={telHref}
                  className="btn btn-call !min-h-11 !px-4 !text-[0.92rem] sm:shrink-0"
                >
                  <PhoneIcon className="h-[1.05rem] w-[1.05rem]" />
                  {business.phone.display}
                </a>
              </div>
            )}
          </fieldset>
        )}

        {/* ── Stap 2: locatie ────────────────────────────────────────── */}
        {step === 1 && (
          <fieldset>
            <legend className="font-display text-[1.25rem] font-bold tracking-tight md:text-[1.4rem]">
              {quote.steps.location.question}
            </legend>
            <p className="mt-1.5 text-[0.95rem] text-muted">
              {quote.steps.location.help}
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field
                label="Postcode"
                name="postcode"
                autoComplete="postal-code"
                placeholder="3812 PM"
                required
                value={form.postcode}
                onChange={(v) => setForm((f) => ({ ...f, postcode: v }))}
              />
              <div className="flex min-w-0 flex-col">
                <label htmlFor="place" className="text-[0.88rem] font-semibold text-ink">
                  Plaats
                </label>
                <input
                  id="place"
                  name="place"
                  list="service-area-places"
                  required
                  autoComplete="address-level2"
                  value={form.place}
                  onChange={(e) => setForm((f) => ({ ...f, place: e.target.value }))}
                  className="mt-1.5 min-h-12 w-full border border-line bg-shell px-3.5 text-base outline-none focus:border-brand"
                />
                <datalist id="service-area-places">
                  {serviceArea.places.map((place) => (
                    <option key={place} value={place} />
                  ))}
                </datalist>
              </div>
            </div>

            {/* Optionele kwalificatie — mag leeg blijven */}
            <div className="mt-5 flex min-w-0 flex-col">
              <label htmlFor="property" className="text-[0.88rem] font-semibold text-ink">
                {quote.propertyLabel}{" "}
                <span className="font-normal text-muted">(optioneel)</span>
              </label>
              <select
                id="property"
                name="property"
                value={form.property}
                onChange={(e) => setForm((f) => ({ ...f, property: e.target.value }))}
                className="mt-1.5 min-h-12 w-full border border-line bg-shell px-3 text-base outline-none focus:border-brand"
              >
                <option value="">Weet ik niet / maakt niet uit</option>
                {quote.propertyOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <p className="mt-4 text-[0.88rem] text-muted">
              We werken in {serviceArea.regionLong}, binnen ongeveer{" "}
              {serviceArea.radiusKm} km.
            </p>
          </fieldset>
        )}

        {/* ── Stap 3: urgentie ───────────────────────────────────────── */}
        {step === 2 && (
          <fieldset>
            <legend className="font-display text-[1.25rem] font-bold tracking-tight md:text-[1.4rem]">
              {quote.steps.urgency.question}
            </legend>
            <p className="mt-1.5 text-[0.95rem] text-muted">
              {quote.steps.urgency.help}
            </p>

            <div className="mt-5 grid gap-2.5">
              {quote.urgencyOptions.map((option) => {
                const active = form.urgencyId === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => pickUrgency(option)}
                    aria-pressed={active}
                    className={`flex items-center justify-between gap-3 border p-4 text-left transition-colors ${
                      active
                        ? "border-brand bg-shell"
                        : "border-line hover:border-line-strong"
                    }`}
                  >
                    <span>
                      <span className="block text-[0.95rem] font-medium text-ink">
                        {option.label}
                      </span>
                      <span className="mt-0.5 block text-[0.85rem] text-muted">
                        {option.help}
                      </span>
                    </span>
                    <ArrowRightIcon className="h-4 w-4 shrink-0 text-muted" />
                  </button>
                );
              })}
            </div>

            {/*
              Storing gekozen: zichtbaar aanraden om te bellen. Bewust géén
              blokkade — de knop om door te gaan staat er gewoon onder.
            */}
            {pickedUrgent && (
              <div className="mt-5 border border-accent bg-shell p-5">
                <p className="flex items-center gap-2 font-display text-[1.08rem] font-bold text-ink">
                  <AlertIcon className="h-[1.15rem] w-[1.15rem] text-accent-dark" />
                  {quote.urgentCallout.title}
                </p>
                <p className="mt-2 text-[0.93rem] leading-relaxed text-muted">
                  {quote.urgentCallout.body}
                </p>
                <a href={telHref} className="btn btn-call mt-4 w-full sm:w-auto">
                  <PhoneIcon className="h-[1.1rem] w-[1.1rem]" />
                  Bel {business.phone.display}
                </a>
                <p className="mt-2.5 text-[0.82rem] text-muted">
                  {business.hoursSummary}
                </p>
              </div>
            )}
          </fieldset>
        )}

        {/* ── Stap 4: contactgegevens ────────────────────────────────── */}
        {step === 3 && (
          <fieldset>
            <legend className="font-display text-[1.25rem] font-bold tracking-tight md:text-[1.4rem]">
              {quote.steps.contact.question}
            </legend>
            <p className="mt-1.5 text-[0.95rem] text-muted">
              {quote.steps.contact.help}
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field
                label="Naam"
                name="name"
                autoComplete="name"
                required
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              />
              <Field
                label="Telefoonnummer"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                required
                value={form.phone}
                onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
              />
              <Field
                label="E-mailadres"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                className="sm:col-span-2"
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
              />

              <div className="flex min-w-0 flex-col sm:col-span-2">
                <label htmlFor="message" className="text-[0.88rem] font-semibold text-ink">
                  Toelichting{" "}
                  <span className="font-normal text-muted">(optioneel)</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Bijvoorbeeld: meterkast uit 1985, 6 groepen, één aardlekschakelaar. Graag ook een aparte groep voor de inductiekookplaat."
                  className="mt-1.5 w-full resize-y border border-line bg-shell p-3.5 text-base outline-none focus:border-brand"
                />
              </div>
            </div>

            <p className="mt-4 text-[0.88rem] text-muted">
              {quote.photoHint}{" "}
              <a
                href={whatsappHref("quote")}
                target="_blank"
                rel="noopener"
                className="font-semibold text-accent-dark underline"
              >
                {quote.photoHintLink}
              </a>
              .
            </p>

            {status === "error" && (
              <p className="mt-4 border-l-[3px] border-accent bg-shell px-4 py-3 text-[0.9rem] text-ink">
                Het versturen lukte niet. Probeer het opnieuw, of bel ons op{" "}
                <a href={telHref} className="font-semibold underline">
                  {business.phone.display}
                </a>
                .
              </p>
            )}
          </fieldset>
        )}

        {/* ── Navigatie ──────────────────────────────────────────────── */}
        <div className="mt-7 flex flex-col-reverse gap-2.5 sm:flex-row sm:items-center">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="btn btn-outline sm:w-auto"
            >
              {quote.backLabel}
            </button>
          )}

          {step < stepCount - 1 ? (
            <button
              type="button"
              disabled={!canContinue}
              onClick={() => setStep((s) => s + 1)}
              className="btn btn-primary flex-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {/* Bij een storing is doorgaan de tweede keus, dus ook die tekst */}
              {pickedUrgent ? quote.urgentCallout.continueLabel : quote.nextLabel}
              <ArrowRightIcon />
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === "sending"}
              className="btn btn-primary flex-1 disabled:opacity-60"
            >
              {status === "sending" ? quote.sendingLabel : quote.submitLabel}
              <ArrowRightIcon />
            </button>
          )}
        </div>

        <p className="mt-4 text-center text-[0.8rem] leading-relaxed text-muted">
          {quote.privacyNote}
        </p>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  className = "",
  ...rest
}: {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  className?: string;
} & Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "name" | "value" | "type" | "onChange" | "className"
>) {
  return (
    <div className={`flex min-w-0 flex-col ${className}`}>
      <label htmlFor={name} className="text-[0.88rem] font-semibold text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        /* text-base (16px) voorkomt dat iOS automatisch inzoomt op het veld */
        className="mt-1.5 min-h-12 w-full border border-line bg-shell px-3.5 text-base outline-none focus:border-brand"
        {...rest}
      />
    </div>
  );
}
