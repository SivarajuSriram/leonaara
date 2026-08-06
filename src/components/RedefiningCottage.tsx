import React from "react";

export default function RedefiningCottage() {
  return (
    <section className="py-24 lg:py-48 bg-white text-black">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-medium tracking-tight mb-16 lg:mb-24 text-center max-w-3xl mx-auto leading-tight">
          Redefining the <span className="italic font-serif">cottage.</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="p-8 border border-gray-200 rounded-sm hover:border-black transition-colors duration-300">
            <div className="text-6xl font-light mb-4">90%</div>
            <h3 className="text-lg font-medium mb-2 uppercase tracking-wide text-xs">Less Waste</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Our prefabrication process drastically reduces material waste compared to traditional on-site construction.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-8 border border-gray-200 rounded-sm hover:border-black transition-colors duration-300">
            <div className="text-6xl font-light mb-4">60<span className="text-3xl">x</span></div>
            <h3 className="text-lg font-medium mb-2 uppercase tracking-wide text-xs">More Efficient</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              High-performance thermal envelopes mean you spend a fraction on heating and cooling year-round.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-8 border border-gray-200 rounded-sm hover:border-black transition-colors duration-300">
            <div className="text-6xl font-light mb-4">12</div>
            <h3 className="text-lg font-medium mb-2 uppercase tracking-wide text-xs">Weeks to build</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              From finalizing the design to dropping the modules on-site, our streamlined process saves you months.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-8 border border-gray-200 rounded-sm hover:border-black transition-colors duration-300">
            <div className="text-6xl font-light mb-4">100%</div>
            <h3 className="text-lg font-medium mb-2 uppercase tracking-wide text-xs">Bio-sourced</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              We rely on natural materials like hemp block and wood fiber, ensuring zero off-gassing and a healthy home.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
