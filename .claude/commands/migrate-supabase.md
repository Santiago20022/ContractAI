# /migrate-supabase — Migrar ContractAI de localStorage a Supabase

Planifica o ejecuta la migración del sistema de autenticación y almacenamiento de ContractAI desde localStorage a Supabase.

## Estado actual del proyecto

- **Auth**: `src/lib/auth.ts` — localStorage con hash débil
- **Storage**: `src/lib/contracts-storage.ts` — localStorage con CRUD manual
- **Context**: `src/context/AuthContext.tsx` — React Context sobre auth.ts
- **Stack**: Next.js 16 App Router, TypeScript, React 19

## Uso

- `/migrate-supabase plan` — Muestra el plan detallado sin tocar código
- `/migrate-supabase auth` — Migra solo la autenticación
- `/migrate-supabase storage` — Migra solo el almacenamiento de contratos
- `/migrate-supabase full` — Migración completa

## Plan de migración

### Paso 1: Setup Supabase
```bash
npm install @supabase/supabase-js
```
Crear `src/lib/supabase.ts`:
```ts
import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```
Variables en `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### Paso 2: Schema SQL para Supabase
```sql
-- Tabla de contratos (los usuarios los maneja Supabase Auth)
create table contracts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  type text not null,
  content text not null,
  status text check (status in ('draft','completed','analyzed')) default 'completed',
  risk_score integer,
  created_at timestamptz default now()
);

-- RLS: cada usuario solo ve sus contratos
alter table contracts enable row level security;
create policy "Users see own contracts" on contracts
  for all using (auth.uid() = user_id);
```

### Paso 3: Migrar auth.ts
- Reemplazar `register()` → `supabase.auth.signUp()`
- Reemplazar `login()` → `supabase.auth.signInWithPassword()`
- Reemplazar `logout()` → `supabase.auth.signOut()`
- Reemplazar `getCurrentUser()` → `supabase.auth.getUser()`
- Mantener la misma interfaz `User` para no romper `AuthContext`

### Paso 4: Migrar contracts-storage.ts
- Reemplazar `getAllContracts()` → `supabase.from('contracts').select()`
- Hacer todas las funciones `async`
- Actualizar todos los `await` en las páginas que usan estas funciones

### Paso 5: Actualizar AuthContext.tsx
- Usar `supabase.auth.onAuthStateChange()` para el estado reactivo
- Eliminar `isLoading` manual — Supabase maneja el estado inicial

## Al implementar:

1. Lee los archivos actuales antes de modificar
2. Crea los nuevos archivos Supabase primero, sin borrar los originales
3. Actualiza las páginas una a una
4. Añade `.env.local` al `.gitignore` si no está
5. No hardcodees credenciales
