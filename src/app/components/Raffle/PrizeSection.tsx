import React from "react";
import { motion } from "motion/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";

const prizes = [
  {
    id: 1,
    title: "Auto Deportivo de Lujo",
    description: "El premio mayor. Velocidad, estilo y confort en un solo vehículo.",
    image: "https://images.unsplash.com/photo-1716341930202-af49146d9a1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzcG9ydHMlMjBjYXIlMjByZWR8ZW58MXx8fHwxNzcwOTIwNDQyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    accent: "bg-red-500",
  },
  {
    id: 2,
    title: "Smartphone de Última Generación",
    description: "Tecnología de punta en tus manos. Cámara profesional y rendimiento extremo.",
    image: "https://images.unsplash.com/photo-1727093493807-f11b48fa31a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzbWFydHBob25lJTIwc2xlZWt8ZW58MXx8fHwxNzcwOTk0NTU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    accent: "bg-blue-500",
  },
  {
    id: 3,
    title: "$10.000 en Efectivo",
    description: "Libertad financiera instantánea. Úsalo para lo que quieras.",
    image: "https://images.unsplash.com/photo-1744819773373-e9e1cc11e826?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFjayUyMG9mJTIwbW9uZXklMjBjYXNofGVufDF8fHx8MTc3MTAwODk2N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    accent: "bg-green-500",
  },
  {
    id: 4,
    title: "Viaje para 2 a Europa",
    description: "Una semana en París y Roma. Vuelos y alojamiento incluidos.",
    image: "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?w=1080&q=80",
    accent: "bg-amber-500",
  },
  {
    id: 5,
    title: "Notebook Gamer Pro",
    description: "RTX 4080, 32GB RAM. Para jugar y trabajar al máximo.",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=1080&q=80",
    accent: "bg-violet-500",
  },
  {
    id: 6,
    title: "TV 65\" 4K + Soundbar",
    description: "Cine en casa. Pantalla OLED y sonido envolvente.",
    image: "https://images.unsplash.com/photo-1593359677879-4e9422a6b42e?w=1080&q=80",
    accent: "bg-rose-500",
  },
];

export const PrizeSection = () => {
  return (
    <section className="py-12 bg-stone-50">
      <div className="container mx-auto px-4 md:px-14">
        <h2 className="text-3xl font-bold text-center mb-8 text-stone-800">
          Premios Increíbles
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 sm:-ml-4">
            {prizes.map((prize, index) => (
              <CarouselItem key={prize.id} className="pl-2 sm:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow duration-300"
                >
                  <div className="relative h-48 overflow-hidden group">
                    <img
                      src={prize.image}
                      alt={prize.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className={`absolute top-0 right-0 m-4 px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wide shadow-sm ${prize.accent}`}>
                      Premio #{prize.id}
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-stone-800 mb-2">
                      {prize.title}
                    </h3>
                    <p className="text-stone-500 flex-1 leading-relaxed text-sm">{prize.description}</p>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0 md:-left-12 border-stone-200 bg-white hover:bg-stone-50" />
          <CarouselNext className="right-0 md:-right-12 border-stone-200 bg-white hover:bg-stone-50" />
        </Carousel>
      </div>
    </section>
  );
};
