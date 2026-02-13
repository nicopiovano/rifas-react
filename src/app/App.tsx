import React, { useState } from "react";
import { PrizeSection } from "./components/Raffle/PrizeSection";
import { NumberGrid } from "./components/Raffle/NumberGrid";
import { CartBar } from "./components/Raffle/CartBar";
import { CheckoutModal, CheckoutFormData } from "./components/Raffle/CheckoutModal";
import { Toaster, toast } from "sonner";
import { Ticket } from "lucide-react";
import { formatCurrency } from "./utils/formatCurrency";

const PRICE_PER_TICKET = 1000;

export default function App() {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleNumber = (num: number) => {
    setSelectedNumbers((prev) => {
      if (prev.includes(num)) {
        return prev.filter((n) => n !== num);
      } else {
        return [...prev, num];
      }
    });
  };

  const handleCheckout = () => {
    setIsModalOpen(true);
  };

  const handleConfirmPurchase = (data: CheckoutFormData) => {
    // Here you would typically send data to a backend
    console.log("Purchase confirmed:", {
      numbers: selectedNumbers,
      customer: data,
      total: selectedNumbers.length * PRICE_PER_TICKET
    });

    setIsModalOpen(false);
    setSelectedNumbers([]);

    toast.success("¡Compra realizada con éxito!", {
      description: "Te hemos enviado los detalles a tu contacto.",
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 pb-24">
      <Toaster position="top-center" richColors theme="light" />

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-stone-200 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 p-2 rounded-xl">
              <Ticket className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight text-stone-800">Gran Rifa 2026</h1>
              <p className="text-stone-500 text-xs font-medium">¡Gana premios increíbles!</p>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-stone-600">Sorteo: 31 de Diciembre</p>
            <p className="text-xs text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full inline-block">Valor: {formatCurrency(PRICE_PER_TICKET)}</p>
          </div>
        </div>
      </header>

      <main>
        {/* Prizes */}
        <PrizeSection />

        {/* Numbers Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 sticky top-24">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-stone-800">
                  <span className="bg-emerald-100 text-emerald-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  Instrucciones
                </h3>
                <ul className="space-y-4 text-stone-600 text-sm">
                  <li className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                    <p>Explora los premios disponibles en la parte superior.</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                    <p>Selecciona tus números de la suerte en la cuadrícula.</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                    <p>Haz clic en "Comprar" para reservar tus números.</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                    <p>Completa tus datos y participa en el sorteo.</p>
                  </li>
                </ul>

                <div className="mt-8 p-4 bg-orange-50 rounded-xl border border-orange-100 text-orange-800 text-sm">
                  <strong>Nota:</strong> Los números se reservan por 15 minutos al iniciar el proceso de compra.
                </div>
              </div>
            </div>

            <div className="lg:w-2/3">
              <NumberGrid
                selectedNumbers={selectedNumbers}
                onToggleNumber={toggleNumber}
              />
            </div>
          </div>
        </section>
      </main>

      <CartBar
        selectedCount={selectedNumbers.length}
        pricePerTicket={PRICE_PER_TICKET}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedNumbers={selectedNumbers}
        total={selectedNumbers.length * PRICE_PER_TICKET}
        onConfirm={handleConfirmPurchase}
      />
    </div>
  );
}
