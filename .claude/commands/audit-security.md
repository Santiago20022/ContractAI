# /audit-security — Auditoría de seguridad de ContractAI

Realiza una auditoría de seguridad completa del proyecto ContractAI e implementa las mejoras solicitadas.

## Problemas de seguridad conocidos en este proyecto

### CRÍTICO
1. **Hash de contraseñas débil** (`src/lib/auth.ts:19-27`)
   - La función `simpleHash()` usa operaciones bitwise — trivialmente reversible
   - Las contraseñas están en localStorage, expuestas a XSS

2. **localStorage como base de datos** (`src/lib/auth.ts`, `src/lib/contracts-storage.ts`)
   - Datos accesibles por cualquier JS en la página
   - Sin expiración de sesión
   - Perdidos al limpiar el navegador

### ALTO
3. **Sin validación/sanitización de inputs** (`src/app/generate/page.tsx`, `src/app/analyze/page.tsx`)
   - Los campos de formulario no tienen sanitización
   - El contenido de contratos se renderiza con `<pre>` — mitigado, pero verificar

4. **Carga de archivos sin validación de tamaño real** (`src/app/analyze/page.tsx:53-72`)
   - Se acepta `.doc/.docx` sin poder leerlos (solo `.txt`)
   - Sin validación del tamaño máximo anunciado (10MB)

### MEDIO
5. **Sin protección CSRF** — no aplica (no hay backend), pero al migrar sí aplica
6. **Sin rate limiting** en login (`src/app/login/page.tsx`)

## Lo que debes hacer

Si el usuario ejecuta `/audit-security` sin argumentos: **muestra el reporte completo** de los problemas arriba con su ubicación exacta (archivo:línea) y propón las correcciones.

Si el usuario ejecuta `/audit-security fix <número>`: **implementa la corrección** del problema indicado.

### Correcciones disponibles:

**fix 1** — Mejorar validación de inputs en el wizard de generación:
- Añadir sanitización básica (trim, limitar longitud) en `src/app/generate/page.tsx`
- Validar que los campos requeridos no estén vacíos antes de generar

**fix 2** — Mejorar validación de carga de archivos en `src/app/analyze/page.tsx`:
- Verificar tamaño real del archivo antes de leerlo
- Mostrar error claro si es `.doc/.docx` (no soportado)
- Limitar tamaño a 10MB real

**fix 3** — Añadir expiración de sesión en `src/lib/auth.ts`:
- Guardar `expiresAt` en el objeto de sesión (24h por defecto)
- Validar en `getCurrentUser()` que la sesión no haya expirado
- Actualizar `AuthContext.tsx` para manejar sesión expirada

**fix 4** — Mejorar `simpleHash` para dificultar ataques de diccionario:
- Añadir salt basado en el email antes del hash
- Nota: esto NO es producción-ready, pero mejora el MVP

Lee los archivos relevantes antes de implementar cualquier corrección.
