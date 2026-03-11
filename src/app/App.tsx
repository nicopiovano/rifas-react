import React, { useState } from "react";
import { PrizeSection } from "./components/Raffle/PrizeSection";
import { NumberGrid } from "./components/Raffle/NumberGrid";
import { CartBar } from "./components/Raffle/CartBar";
import { CheckoutModal, CheckoutFormData } from "./components/Raffle/CheckoutModal";
import { Toaster, toast } from "sonner";
import { Moon, Sun, Ticket } from "lucide-react";
import { formatCurrency } from "./utils/formatCurrency";

const PRICE_PER_TICKET = 1000;

function getIsDark() {
  return document.documentElement.classList.contains("dark");
}

export default function App() {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(() => getIsDark());

  const toggleTheme = () => {
    const next = !getIsDark();
    const root = document.documentElement;
    root.classList.toggle("dark", next);
    root.style.colorScheme = next ? "dark" : "light";
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setIsDark(next);
  };

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
    <div className="min-h-screen bg-background text-foreground font-sans pb-24">
      <Toaster position="top-center" richColors theme={isDark ? "dark" : "light"} />

      {/* Header */}
      <header className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/15 p-2 rounded-xl">
              <Ticket className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold leading-tight">Gran Rifa 2026</h1>
              <p className="text-muted-foreground text-xs font-medium">¡Gana premios increíbles!</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-muted-foreground">Sorteo: 31 de Diciembre</p>
              <p className="text-xs text-emerald-600 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full inline-block">
                Valor: {formatCurrency(PRICE_PER_TICKET)}
              </p>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-border bg-card/60 hover:bg-card transition-colors"
              aria-label={isDark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
              title={isDark ? "Tema claro" : "Tema oscuro"}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
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
              <div className="bg-card p-6 rounded-2xl shadow-sm border border-border sticky top-24">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <span className="bg-emerald-500/15 text-emerald-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                  Instrucciones
                </h3>
                <ul className="space-y-4 text-muted-foreground text-sm">
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

                <div className="mt-8 p-4 bg-orange-500/10 rounded-xl border border-orange-500/20 text-orange-700 dark:text-orange-300 text-sm">
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

      {/* Firma / stack */}
      <div className="pointer-events-none fixed inset-x-0 bottom-3 z-50 flex justify-center px-4">
        <div className="pointer-events-auto max-w-xl rounded-2xl border border-stone-200 bg-white/80 px-3 py-2 text-xs text-stone-800 shadow-sm backdrop-blur">
          <span className="font-medium">Desarrollado con</span>
          <span className="mx-2 text-stone-600">
            React · Tailwind · Motion · AI
          </span>
          <a
            href="https://nico-piovano-porfolio.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:opacity-80"
          >
            <span className="font-medium">by Nico Piovano</span>
          </a>
        </div>
      </div>
    </div>
  );
}
