import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Ticket } from "lucide-react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "motion/react";
import { formatCurrency } from "../../utils/formatCurrency";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedNumbers: number[];
  total: number;
  onConfirm: (data: CheckoutFormData) => void;
}

export interface CheckoutFormData {
  fullName: string;
  contactNumber: string;
  socialHandle: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  selectedNumbers,
  total,
  onConfirm,
}) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CheckoutFormData>();

  // Reset form when modal opens/closes
  React.useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = (data: CheckoutFormData) => {
    onConfirm(data);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              />
            </Dialog.Overlay>
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="fixed top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[90vw] md:w-[32rem] max-w-[95vw] h-[88vh] max-h-[900px] bg-white rounded-3xl shadow-2xl p-0 z-50 focus:outline-none flex flex-col overflow-hidden"
              >
                <div className="flex-none px-5 py-3 border-b border-stone-100 flex items-center justify-between bg-stone-50/50">
                  <Dialog.Title className="text-lg font-bold text-stone-800">
                    Finalizar compra
                  </Dialog.Title>
                  <Dialog.Close asChild>
                    <button className="text-stone-400 hover:text-stone-600 transition-colors p-2 rounded-full hover:bg-stone-100">
                      <X size={20} />
                    </button>
                  </Dialog.Close>
                </div>

                <div className="flex-1 min-h-0 p-5 md:p-6 space-y-6 overflow-hidden flex flex-col">
                  {/* 1. Resumen del pedido */}
                  <section className="flex-none bg-stone-50 rounded-xl border border-stone-200 p-4">
                    <h3 className="flex items-center gap-2 text-stone-800 font-semibold text-sm mb-3">
                      <Ticket className="w-4 h-4 text-emerald-600" />
                      Resumen del pedido
                    </h3>
                    <dl className="space-y-2 text-sm text-stone-700">
                      <div className="flex justify-between">
                        {/* <dt className="text-stone-600">Cantidad de números</dt> */}
                        {/* <dd className="font-semibold text-stone-800">{</dd> */}
                      </div>
                      <div className="flex flex-wrap gap-2 items-center">
                        <dt className="text-stone-600 shrink-0 w-full text-sm">Números ({selectedNumbers.length})</dt>
                        <dd className="flex flex-wrap gap-2">
                          {(selectedNumbers.length <= 12 ? selectedNumbers : selectedNumbers.slice(0, 10)).map((num) => (
                            <span
                              key={num}
                              className="inline-flex items-center justify-center min-w-[2rem] h-8 px-2 rounded-xl font-bold text-sm bg-emerald-500 text-white shadow-md shadow-emerald-200 ring-2 ring-emerald-200"
                            >
                              {num}
                            </span>
                          ))}
                          {selectedNumbers.length > 12 && (
                            <span className="inline-flex items-center justify-center h-8 px-2 rounded-xl font-semibold text-xs text-stone-600 bg-stone-100">
                              +{selectedNumbers.length - 10} más
                            </span>
                          )}
                        </dd>
                      </div>
                    </dl>
                    <div className="mt-3 pt-3 border-t border-stone-200 flex justify-between items-center">
                      <span className="font-semibold text-stone-800 text-sm">Total a pagar</span>
                      <span className="text-xl font-bold text-emerald-600">{formatCurrency(total)}</span>
                    </div>
                  </section>

                  {/* 2. Datos del usuario */}
                  <section className="flex-1 min-h-0 flex flex-col">
                    <h3 className="text-stone-800 font-semibold text-sm mb-3 flex-none">Datos del usuario</h3>
                    <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-3 flex-1 min-h-0 flex flex-col">
                      <div>
                        <label className="block text-xs font-medium text-stone-700 mb-1">Nombre y apellido</label>
                        <input
                          {...register("fullName", { required: "Este campo es requerido" })}
                          className="w-full px-3 py-2.5 text-sm rounded-lg border border-stone-200 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                          placeholder="Juan Pérez"
                        />
                        {errors.fullName && <p className="text-red-500 text-xs mt-0.5">{errors.fullName.message}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-stone-700 mb-1">Teléfono</label>
                          <input
                            {...register("contactNumber", { required: "Este campo es requerido" })}
                            type="tel"
                            className="w-full px-3 py-2.5 text-sm rounded-lg border border-stone-200 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                            placeholder="11 1234-5678"
                          />
                          {errors.contactNumber && <p className="text-red-500 text-xs mt-0.5">{errors.contactNumber.message}</p>}
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-stone-700 mb-1">Red social</label>
                          <input
                            {...register("socialHandle", { required: "Este campo es requerido" })}
                            className="w-full px-3 py-2.5 text-sm rounded-lg border border-stone-200 bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                            placeholder="@usuario"
                          />
                          {errors.socialHandle && <p className="text-red-500 text-xs mt-0.5">{errors.socialHandle.message}</p>}
                        </div>
                      </div>
                    </form>
                  </section>
                </div>

                <div className="flex-none px-5 py-3 border-t border-stone-100 bg-white flex gap-2 justify-end">
                  <button
                    type="submit"
                    form="checkout-form"
                    className="px-6 py-2.5 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors"
                  >
                    Confirmar compra
                  </button>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};
