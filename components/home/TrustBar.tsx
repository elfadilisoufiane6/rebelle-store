"use client";

import { motion } from "framer-motion";
import { Truck, Shield, Star, HeadphonesIcon } from "lucide-react";
import { TRUST_ITEMS } from "@/lib/constants";

const iconMap = {
  truck: Truck,
  shield: Shield,
  star: Star,
  headphones: HeadphonesIcon,
};

export default function TrustBar() {
  return (
    <section id="livraison" className="bg-[#FAF6F2] border-y border-[#F0E9E1] py-8 lg:py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {TRUST_ITEMS.map((item, index) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-3 group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 w-10 h-10 rounded-full bg-white border border-[#E8D5C4] flex items-center justify-center shadow-soft group-hover:border-[#810B38] group-hover:shadow-burgundy transition-all duration-300"
                >
                  <Icon size={16} className="text-[#810B38]" />
                </motion.div>
                <div className="text-center sm:text-left">
                  <p className="font-montserrat font-500 text-xs text-charcoal group-hover:text-[#810B38] transition-colors duration-300">
                    {item.title}
                  </p>
                  <p className="font-montserrat text-xs text-charcoal/50 mt-0.5">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
