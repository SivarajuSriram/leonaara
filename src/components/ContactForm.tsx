"use client";
import React, { useState } from "react";

const selectClass =
  "w-full h-12 rounded-[4px] border border-black/20 bg-white px-4 text-[14px] text-black outline-none transition-colors focus:border-black appearance-none";
const inputClass =
  "w-full h-12 rounded-[4px] border border-black/20 bg-white px-4 text-[14px] text-black outline-none transition-colors focus:border-black placeholder:text-black/40";

export default function ContactForm() {
  const [buyerType, setBuyerType] = useState<"Owner" | "Developer">("Owner");
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
            <h2 className="m-0 text-[28px] font-normal leading-none tracking-[-0.04em] md:text-[36px] xl:text-[48px]">
              Interested in a Base home?
              <br />
              Let&apos;s chat.
            </h2>
            <div className="flex flex-col gap-4">
              <p className="m-0 text-[12px] uppercase leading-[1.5] text-[#828282] xl:text-[14px]">Start here</p>
              <p className="m-0 max-w-md text-[14px] leading-[1.42]">
                Fill in the form below to share your interest with us. We will contact you with next steps to follow.
              </p>
            </div>
            <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden rounded-[4px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  buyerType === "Owner"
                    ? "/media/2024/02/NM_01-9.jpg"
                    : "/media/2024/03/NM_01-7.jpg"
                }
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <p className="m-0 mb-3 text-[12px] uppercase text-[#828282]">Buyer&apos;s Type</p>
              <div className="flex gap-3">
                {(["Owner", "Developer"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setBuyerType(type)}
                    className={`h-11 flex-1 rounded-[4px] border text-[14px] uppercase transition-colors ${
                      buyerType === type
                        ? "border-black bg-black text-white"
                        : "border-black/20 text-black hover:border-black"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {buyerType === "Owner" ? (
              <>
                <select required defaultValue="" className={selectClass}>
                  <option value="" disabled>
                    Interest
                  </option>
                  <option>I&apos;m interested in owning a Base</option>
                  <option>I just want to learn more</option>
                </select>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <select required defaultValue="" className={selectClass}>
                    <option value="" disabled>
                      Model of interest
                    </option>
                    <option>BASE I</option>
                    <option>BASE I+</option>
                  </select>
                  <select required defaultValue="" className={selectClass}>
                    <option value="" disabled>
                      Do you already own land?
                    </option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <select required defaultValue="" className={selectClass}>
                  <option value="" disabled>
                    Interest
                  </option>
                  <option>Model purchase</option>
                  <option>Work with Base</option>
                </select>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <input required placeholder="First Name*" className={inputClass} />
                  <input required placeholder="Last Name*" className={inputClass} />
                  <input required type="email" placeholder="Email*" className={inputClass} />
                  <input required placeholder="City*" className={inputClass} />
                  <input required placeholder="Company*" className={inputClass} />
                  <input required placeholder="Project Location*" className={inputClass} />
                  <input required placeholder="Project Size*" className={inputClass} />
                  <select required defaultValue="" className={selectClass}>
                    <option value="" disabled>
                      Do you already own land?
                    </option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>
                <textarea placeholder="Message" rows={4} className={`${inputClass} h-auto resize-none py-3`} />
              </>
            )}

            <label className="flex items-center gap-2 text-[13px]">
              <input type="checkbox" className="h-4 w-4 accent-brand-red" />
              I want to subscribe to the newsletter
            </label>

            <button
              type="submit"
              className="mt-2 h-12 w-full rounded-[4px] bg-black text-[15px] font-medium uppercase text-white transition-colors hover:bg-brand-red md:w-fit md:px-10"
            >
              {submitted ? "Thank you!" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
