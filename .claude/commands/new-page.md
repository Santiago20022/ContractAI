# /new-page — Crear una nueva página en ContractAI

Crea una nueva página siguiendo los patrones arquitectónicos del proyecto.

## Patrones establecidos en ContractAI

### Páginas públicas (sin auth)
- Usan `Navbar` + `Footer` de `@/components/shared`
- Fondo `bg-slate-50` o gradiente
- Animaciones con Framer Motion (`motion.div` con `initial/animate`)
- Ejemplo: `src/app/page.tsx`, `src/app/generate/page.tsx`

### Páginas del dashboard (requieren auth)
- Usan `DashboardLayout` de `@/components/shared/DashboardLayout`
- Guard de autenticación con `useAuth()` + `useEffect` redirect a `/login`
- Tipado de estado con interfaces TypeScript
- Ejemplo: `src/app/dashboard/page.tsx`

### Componentes UI disponibles
- `Button` — variants: `primary` | `secondary` | `ghost`, sizes: `sm` | `md` | `lg`
- `Card` — prop `hover` para efecto hover
- `Input` — con label integrado
- `Textarea` — con rows configurable
- Todos en `@/components/ui`

### Animación estándar de entrada
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
```

### Colores del tema
- Primary: `indigo-500` / `indigo-600`
- Secondary: `purple-500`
- Accent: `emerald-500` / `green-500`
- Texto: `slate-900` (títulos), `slate-600` (cuerpo), `slate-400` (muted)
- Fondos: `slate-50` (página), `white` (cards)

## Lo que debes hacer

Crear la página: **$ARGUMENTS**

### Pasos:

1. Determina si la página es pública o requiere autenticación.

2. Crea el archivo en la ruta correcta bajo `src/app/`:
   - Página simple: `src/app/[ruta]/page.tsx`
   - Con subrutas: crear directorio

3. Si requiere auth, añade el guard estándar:
```tsx
useEffect(() => {
  if (!isLoading && !user) router.push("/login");
}, [user, isLoading, router]);
if (isLoading) return <div className="min-h-screen flex items-center justify-center">
  <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
</div>;
if (!user) return null;
```

4. Añade la ruta al navegador si corresponde (`src/components/shared/DashboardLayout.tsx` array `navigation`).

5. Usa `"use client"` al inicio si la página tiene interactividad (casi siempre).

6. Sigue el sistema de colores y tipografía del proyecto.
