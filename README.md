# 🎫 Gran Rifa (React)

Aplicación **100% frontend** para rifas: carrusel de premios, grilla de números (1–1000) para elegir, carrito flotante y modal de checkout con formulario de datos. Desarrollada con **React**, **Vite**, **Motion**, **Tailwind CSS** y **Radix UI**.

---

## 🛠 Stack

| Tecnología | Uso |
|------------|-----|
| **React** | UI y estado local |
| **Vite** | Dev server + build |
| **Motion** | Animaciones (grid, premios, modal, carrito) |
| **Tailwind CSS** | Estilos |
| **Radix UI (Dialog)** | Modal de checkout accesible |
| **react-hook-form** | Formulario del checkout (nombre, teléfono, red social) |
| **Embla Carousel** | Carrusel de premios |
| **lucide-react** | Iconos (Ticket, carrito, etc.) |
| **sonner** | Toasts (éxito al confirmar compra) |

---

## 📋 Requisitos

- **Node.js** 18+ (recomendado 20+)
- **npm**

---

## 🚀 Cómo levantar el proyecto

### 1) Instalar dependencias

```bash
npm install
```

### 2) Modo desarrollo

```bash
npm run dev
```

Vite te imprime la URL (por defecto suele ser `http://localhost:5173`).

### 3) Build para producción

```bash
npm run build
```

### 4) Preview del build

```bash
npm run preview
```

---

## 🧭 Qué hace la app

- **Header**: título, fecha del sorteo y valor del número (formato AR: $1.000).
- **Premios**: carrusel con 6 premios (auto, smartphone, efectivo, viaje, notebook, TV). Flechas para navegar; en desktop se ven 2–3 por vista.
- **Grilla de números**: 1 a 1000; click para seleccionar/deseleccionar. Números elegidos en verde; hover suave.
- **Carrito flotante**: cantidad de números y total (formato $X.XXX). Botón para abrir el modal de checkout.
- **Modal de checkout**: resumen (números en pills verdes, total), formulario (nombre, teléfono, red social) y confirmación. Al confirmar, toast de éxito (sin backend; solo demo).

---

## 📁 Estructura principal

```txt
src/
  app/
    App.tsx                 # Estado (números elegidos, modal), layout
    components/
      Raffle/               # Lógica de la rifa
        PrizeSection.tsx     # Carrusel de premios
        NumberGrid.tsx       # Grilla 1–1000
        CartBar.tsx         # Barra flotante del carrito
        CheckoutModal.tsx   # Modal + formulario
      ui/                   # Componentes reutilizables (carousel, button, etc.)
    utils/
      formatCurrency.js     # Formato AR: $1.000, $2.000
  main.tsx
  styles/
```

---

## 📜 Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo (Vite) |
| `npm run build` | Build para producción |
| `npm run preview` | Preview del build |

---

## 💡 Notas

- No hay backend: el checkout solo muestra un toast y limpia el estado (demo).
- El helper `formatCurrency` formatea montos al estilo Argentina (punto como separador de miles).
- El favicon es un ticket (SVG); los números en el modal replican el estilo verde de la grilla.
