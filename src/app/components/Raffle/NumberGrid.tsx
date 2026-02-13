import React, { useMemo } from "react";
import { motion } from "motion/react";

interface NumberGridProps {
  selectedNumbers: number[];
  onToggleNumber: (number: number) => void;
}

export const NumberGrid: React.FC<NumberGridProps> = ({
  selectedNumbers,
  onToggleNumber,
}) => {
  // Create array from 1 to 1000
  const numbers = useMemo(() => Array.from({ length: 500 }, (_, i) => i + 1), []);

  return (
    <div className="flex-1 bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden flex flex-col h-[600px]">
      <div className="p-4 bg-stone-50 border-b border-stone-100">
        <h3 className="text-lg font-semibold text-stone-700">Elige tus números de la suerte</h3>
        <p className="text-sm text-stone-500">Selecciona uno o más números para participar.</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-3">
          {numbers.map((num) => {
            const isSelected = selectedNumbers.includes(num);
            return (
              <motion.button
                key={num}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onToggleNumber(num)}
                className={`
                  relative aspect-square rounded-xl flex items-center justify-center font-bold text-sm sm:text-base transition-all duration-200
                  ${isSelected
                    ? "bg-emerald-500 text-white shadow-md shadow-emerald-200 ring-2 ring-emerald-200"
                    : "bg-stone-50 text-stone-600 hover:bg-emerald-50 hover:text-emerald-600 border border-stone-100"
                  }
                `}
                aria-pressed={isSelected}
                aria-label={`Seleccionar número ${num}`}
              >
                {num}
                {isSelected && (
                  <motion.div
                    layoutId="outline"
                    className="absolute inset-0 rounded-xl ring-2 ring-emerald-400 ring-offset-2"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
