"use client";

import React from "react";
import { 
  SiGoogle, 
  SiAmazon, 
  SiMicrosoft, 
  SiWipro, 
  SiInfosys, 
  SiAccenture, 
  SiCognizant, 
  SiTata,
  SiZomato,
  SiSwiggy,
  SiPaytm,
  SiRazorpay
} from "react-icons/si";
import { GiMedicinePills, GiDna2, GiMicroscope } from "react-icons/gi";

const brands = [
  { name: "Google", icon: SiGoogle, color: "#4285F4" },
  { name: "Amazon", icon: SiAmazon, color: "#FF9900" },
  { name: "TCS", icon: SiTata, color: "#1B3E92" },
  { name: "Wipro", icon: SiWipro, color: "#000000" },
  { name: "Infosys", icon: SiInfosys, color: "#007CC3" },
  { name: "Cognizant", icon: SiCognizant, color: "#0033A0" },
  { name: "Accenture", icon: SiAccenture, color: "#A100FF" },
  { name: "Microsoft", icon: SiMicrosoft, color: "#00A4EF" },
  { name: "Aurobindo", icon: GiMedicinePills, color: "#0066B3" },
  { name: "Hetero", icon: GiDna2, color: "#E31E24" },
  { name: "Laurus Labs", icon: GiMicroscope, color: "#009640" },
  { name: "Zomato", icon: SiZomato, color: "#CB202D" },
  { name: "Swiggy", icon: SiSwiggy, color: "#FC8019" },
  { name: "Paytm", icon: SiPaytm, color: "#00BAF2" },
  { name: "Razorpay", icon: SiRazorpay, color: "#002D5E" },
];

export const BrandScroller = () => {
  return (
    <div className="group flex overflow-hidden py-12 [--gap:3rem] [gap:var(--gap)] flex-row max-w-full [--duration:50s] [mask-image:linear-gradient(to_right,_rgba(0,_0,_0,_0),rgba(0,_0,_0,_1)_10%,rgba(0,_0,_0,_1)_90%,rgba(0,_0,_0,_0))]">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <div
            className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row"
            key={i}
          >
            {brands.map((brand) => (
              <div key={brand.name} className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition-all">
                <brand.icon size={28} style={{ color: brand.color }} />
                <p className="text-lg font-black text-slate-700 whitespace-nowrap">{brand.name}</p>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export const BrandScrollerReverse = () => {
  return (
    <div className="group flex overflow-hidden py-4 [--gap:3rem] [gap:var(--gap)] flex-row max-w-full [--duration:50s] [mask-image:linear-gradient(to_right,_rgba(0,_0,_0,_0),rgba(0,_0,_0,_1)_10%,rgba(0,_0,_0,_1)_90%,rgba(0,_0,_0,_0))]">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <div
            className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee-reverse flex-row"
            key={i}
          >
            {brands.slice().reverse().map((brand) => (
              <div key={brand.name} className="flex items-center gap-4 px-6 py-3 rounded-2xl bg-white shadow-sm border border-slate-100 hover:shadow-md transition-all">
                <brand.icon size={28} style={{ color: brand.color }} />
                <p className="text-lg font-black text-slate-700 whitespace-nowrap">{brand.name}</p>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};
