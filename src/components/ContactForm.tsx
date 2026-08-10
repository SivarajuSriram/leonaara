"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  usePhoneInput,
  defaultCountries,
  parseCountry,
  FlagImage,
  type CountryIso2,
} from "react-international-phone";

const inputClass =
  "w-full h-12 rounded-[4px] border border-black/20 bg-white px-4 text-[14px] text-black outline-none transition-colors focus:border-black placeholder:text-black/40";

const countryList = defaultCountries.map(parseCountry);

function PhoneField() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { inputValue, country, setCountry, handlePhoneValueChange, inputRef } = usePhoneInput({
    defaultCountry: "in",
    disableDialCodeAndPrefix: true,
  });

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const filteredCountries = countryList.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={wrapperRef} className="relative">
      <div className="flex h-12 w-full items-stretch rounded-[4px] border border-black/20 bg-white transition-colors focus-within:border-black">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Select country code"
          className="flex items-center gap-2 border-r border-black/20 px-3 text-[14px] text-black"
        >
          <FlagImage iso2={country.iso2} size={20} />
          <span className="text-black/70">+{country.dialCode}</span>
          <span className="text-[22px] leading-none text-black">▾</span>
        </button>

        <input
          ref={inputRef}
          required
          type="tel"
          placeholder="Phone number*"
          value={inputValue}
          onChange={handlePhoneValueChange}
          className="h-full min-w-0 flex-1 rounded-r-[4px] bg-transparent px-4 text-[14px] text-black outline-none placeholder:text-black/40"
        />
      </div>

      {open && (
        <div className="absolute left-0 top-[calc(100%+6px)] z-20 w-72 overflow-hidden rounded-[4px] border border-black/10 bg-white shadow-lg">
          <div className="border-b border-black/10 p-2">
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country"
              className="h-9 w-full rounded-[4px] border border-black/20 bg-white px-3 text-[13px] text-black outline-none focus:border-black"
            />
          </div>
          <ul className="max-h-56 overflow-y-auto py-1">
            {filteredCountries.map((c) => (
              <li key={c.iso2}>
                <button
                  type="button"
                  onClick={() => {
                    setCountry(c.iso2 as CountryIso2, { focusOnInput: true });
                    setOpen(false);
                    setSearch("");
                  }}
                  className="flex w-full items-center gap-3 px-3 py-2 text-left text-[13px] text-black md:hover:bg-black/5"
                >
                  <FlagImage iso2={c.iso2} size={18} />
                  <span className="flex-1 truncate">{c.name}</span>
                  <span className="text-black/40">+{c.dialCode}</span>
                </button>
              </li>
            ))}
            {filteredCountries.length === 0 && (
              <li className="px-3 py-2 text-[13px] text-black/40">No countries found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="interested" className="relative w-full bg-white py-16 text-black md:py-20 xl:py-24">
      <div className="mx-auto w-full max-w-[1920px] px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 xl:gap-24">
          <div className="flex flex-col gap-8">
            <p className="m-0 text-[28px] font-normal leading-none tracking-[-0.04em] md:text-[36px] xl:text-[48px]">
              <span>We’d love to hear from you.</span>
              <br />
              Let&apos;s chat.
            </p>
            <div className="flex flex-col gap-4">
              <p className="m-0 max-w-md text-[14px] leading-[1.42]">
                Fill in the form below to share your interest with us. We will contact you with next steps to follow.
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden rounded-[4px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/2024/02/NM_01-9.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:mt-16 xl:mt-20">
            <input required placeholder="Name*" className={inputClass} />
            <input required type="email" placeholder="Email*" className={inputClass} />
            <PhoneField />
            <textarea placeholder="Message" rows={4} className={`${inputClass} h-auto resize-none py-3`} />

            <label className="flex items-start gap-2 text-[13px]">
              <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-brand-red" />
              I authorize Leonaara and its representatives to Call, SMS, Email, or WhatsApp me about its services and offers. This consent overrides any registration for DND / NDNC.
            </label>

            <button
              type="submit"
              className="mt-2 h-12 w-full rounded-[4px] bg-black text-[15px] font-medium uppercase text-white transition-colors md:hover:bg-brand-red md:w-fit md:px-10"
            >
              {submitted ? "Thank you!" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
