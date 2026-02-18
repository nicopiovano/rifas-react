import React from "react";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { formatCurrency } from "../../utils/formatCurrency";

interface CartBarProps {
  selectedCount: number;
  pricePerTicket: number;
  onCheckout: () => void;
}

export const CartBar: React.FC<CartBarProps> = ({
  selectedCount,
  pricePerTicket,
  onCheckout,
}) => {
  const total = selectedCount * pricePerTicket;

  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 p-4 z-50 pointer-events-none flex justify-center"
        >
          <div className="bg-foreground text-background shadow-xl shadow-black/10 rounded-2xl p-4 w-full max-w-2xl flex items-center justify-between pointer-events-auto ring-1 ring-border/40 backdrop-blur-md bg-opacity-95">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-500 p-3 rounded-xl relative shadow-lg shadow-emerald-900/20">
                <ShoppingCart className="w-6 h-6 text-white" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-foreground/40">
                  {selectedCount}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-background/70">Total a pagar</span>
                <span className="text-xl font-bold">{formatCurrency(total)}</span>
              </div>
            </div>

            <button
              onClick={onCheckout}
              className="bg-background text-foreground hover:bg-accent active:bg-accent/80 px-6 py-3 rounded-xl font-bold text-lg transition-colors flex items-center gap-2 shadow-sm"
            >
              Comprar
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
