"use client";
import React, { useState } from "react";
import clsx from "clsx";

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-t border-white/10">
      <button
        className="w-full text-left py-6 flex items-center gap-6 group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={clsx(
            "w-6 shrink-0 text-center text-2xl font-light text-white transition-transform duration-500 ease-out",
            !isOpen && "group-hover:rotate-90"
          )}
        >
          {isOpen ? "−" : "+"}
        </span>
        <span className="text-[16px] xl:text-[18px] text-white transition-colors font-normal">
          {question}
        </span>
      </button>
      <div
        className={clsx(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div
          className="pl-12 text-[14px] xl:text-[16px] leading-snug text-white font-normal pr-10"
          dangerouslySetInnerHTML={{ __html: answer }}
        />
      </div>
    </div>
  );
};

const FAQCategory = ({ category, faqs }: { category: string, faqs: { question: string, answer: string }[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-t border-white/15">
      <button
        className="w-full text-left py-6 flex items-center gap-6 group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={clsx(
            "w-6 shrink-0 text-center text-2xl font-light text-white transition-transform duration-500 ease-out",
            !isOpen && "group-hover:rotate-90"
          )}
        >
          {isOpen ? "−" : "+"}
        </span>
        <span className="text-[18px] xl:text-[20px] text-white font-normal">
          {category}
        </span>
      </button>
      <div
        className={clsx(
          "overflow-hidden transition-all duration-500",
          isOpen ? "max-h-[2000px] pb-8 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="pl-12 flex flex-col">
          {faqs.map((faq, idx) => (
            <FAQItem key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default function FAQ() {
  const faqData = [
    {
      category: "THE SYSTEM",
      faqs: [
        {
          question: "What is the Leonaara Build System?",
          answer: "Plans tell a builder what to build. The <em>Leonaara Build System</em> delivers the complete picture: construction documents, a curated design package, a certified builder, a fixed price, on-site inspections, and verified performance targets, before a single shovel hits the ground."
        },
        {
          question: "What models are available?",
          answer: "The Leonaara 1 (960 sq ft, 1 sleeping loft) and the Leonaara 1+ (1,200 sq ft, up to 2 bedrooms + 1 sleeping loft). Both are permanent residential homes built on a foundation, to code, on the same high-performance panel system."
        },
        {
          question: "What's a Leonaara-Certified Builder?",
          answer: "In a conventional build, your builder interprets plans on site. A <em>Leonaara-Certified Builder</em> follows a system they've been trained on: complete build-ready documentation, a defined price, no improvisation. Leonaara checks in at key milestones for quality assurance."
        },
        {
          question: "Is there a warranty?",
          answer: "Every Leonaara home is covered by the GCR new home warranty program, mandatory for new residential construction in Québec."
        }
      ]
    },
    {
      category: "MATERIALS & PERFORMANCE",
      faqs: [
        {
          question: "Why use bio-sourced materials?",
          answer: "Wood fiber and hemp insulation regulate moisture naturally, deliver superior thermal lag, and build a tighter envelope than synthetic alternatives. And they're carbon-negative. Better for the home, better for the planet. No foam, no polystyrene."
        },
        {
          question: "How airtight are Leonaara homes?",
          answer: "Our first construction achieved 0.25 ACH at 50 Pa. That represents airtightness 10 to 20 times better than conventional construction, and twice as efficient as the strictest minimum requirements of the Passive House standard."
        },
        {
          question: "What is thermal lag of our homes?",
          answer: "Approximately 9.7h through the walls, 17.2h through the roof. A conventional home delivers 4h and 6h. The longer the lag, the more stable your interior temperature, and the less your systems have to work."
        },
        {
          question: "What windows does Leonaara use?",
          answer: "NZP <em>PassivCanada</em> triple-glazed, rated at 0.64 W/(m²K). That's nearly 4x more efficient than conventional double-glazed."
        },
        {
          question: "What is Leonaara's carbon footprint of the building shell?",
          answer: "It's negative. Where a conventional building shell averages +45 kg CO₂/m², Leonaara panels average -42 kg CO₂/m². The building shell is a carbon sink."
        }
      ]
    },
    {
      category: "PROCESS",
      faqs: [
        {
          question: "How does it work?",
          answer: "Choose your model and design package. You acquire the <em>Leonaara Build System</em>, including: complete plans, specifications, a certified builder, and a defined construction price. A design meeting finalizes your selections, and your builder brings it to life on your land."
        },
        {
          question: "How long does it take?",
          answer: "Typically up to 4-5 months of construction once the building permit is issued. Since permit timelines vary by municipality, we provide a personalized timeline once your project begins."
        },
        {
          question: "Does Leonaara build year-round?",
          answer: "Yes. Panels are manufactured indoors regardless of season. On-site assembly is possible in winter, though timelines may shift depending on weather conditions."
        },
        {
          question: "Can I customize my home?",
          answer: "You choose from pre-developed design packages, curated palettes of cladding, finishes, lighting, and hardware. Options can be swapped within the system. It's not open-ended customization, but every option has been thought through."
        }
      ]
    },
    {
      category: "LAND & PERMITS",
      faqs: [
        {
          question: "Do I need land?",
          answer: "Not necessarily. We have buildable lots available through developer partnerships across Québec, and can help evaluate your own terrain."
        },
        {
          question: "What about permits?",
          answer: "Our specification package gives your builder everything needed for the permit application. The technical work has already been done."
        }
      ]
    },
    {
      category: "PRICING & FINANCING",
      faqs: [
        {
          question: "How is pricing structured?",
          answer: "The price includes the <em>Leonaara Build System</em> fee and all construction and materials: exterior finishes, high-performance windows, architectural millwork, mechanical systems. No hidden line items. See the full breakdown on the System & Pricing page."
        },
        {
          question: "Why is the price defined upfront?",
          answer: "The system is fully developed before your project starts. Materials are specified, details are documented, and your builder knows exactly what they're building, which means far fewer surprises along the way."
        },
        {
          question: "What's not included?",
          answer: "Foundation, excavation, well, and septic system. These vary by terrain and site conditions. We provide estimates for each so you have the full picture before you commit."
        },
        {
          question: "Can I get financing?",
          answer: "Yes. A Leonaara home is financed like a conventional new build through your mortgage provider. The defined-price contract and complete specification book make the process straightforward for lenders."
        }
      ]
    },
    {
      category: "ADDITIONAL DETAILS",
      faqs: [
        {
          question: "Where does Leonaara build?",
          answer: "Greater Montréal, Estrie, Montérégie, Lanaudière, and Laurentides. Contact us for anything outside these regions… we're always expanding our builder network and geographic reach."
        },
        {
          question: "Can I visit one?",
          answer: "Yes. <em>Leonaara Camp</em> is our finished prototype at Beside LAO in Racine, QC, in the Eastern Townships. Book a stay or schedule a walkthrough with us."
        }
      ]
    }
  ];

  return (
    <section className="w-full bg-black text-white py-12 md:py-24 xl:py-32">
      <div className="container mx-auto px-6 max-w-4xl">
        <header className="mb-12 md:mb-20 xl:mb-32">
          <h2 className="text-[14px] xl:text-[16px] leading-[1.25] font-sans font-normal uppercase text-white">
            FAQ
          </h2>
        </header>

        <div className="flex flex-col border-b border-white/15">
          {faqData.map((category, idx) => (
            <FAQCategory key={idx} category={category.category} faqs={category.faqs} />
          ))}
        </div>
      </div>
    </section>
  );
}
