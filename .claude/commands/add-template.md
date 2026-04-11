# /add-template — Añadir nuevo tipo de contrato

Añade un nuevo template de contrato al sistema ContractAI.

## Contexto del proyecto

Los templates viven en `src/lib/contract-templates.ts`. El objeto `contractTemplates` es un `Record<string, (data: ContractData) => string>`. Cada template recibe un `ContractData`:

```ts
type ContractData = {
  partyA: string;   // Parte A (prestador/vendedor/empresa)
  partyB: string;   // Parte B (cliente/comprador/trabajador)
  description: string;
  amount: string;
  duration: string;
  additionalClauses: string;
  city?: string;
  date?: string;
};
```

Hay 8 tipos existentes: `services`, `nda`, `employment`, `partnership`, `rental`, `sale`, `terms`, `privacy`.

## Lo que debes hacer

El usuario quiere añadir el tipo de contrato: **$ARGUMENTS**

### Pasos:

1. **Lee** `src/lib/contract-templates.ts` para entender la estructura exacta de un template.

2. **Crea el template** siguiendo estas reglas:
   - Encabezado con `═══` y título en MAYÚSCULAS
   - Sección REUNIDOS con partyA y partyB
   - CLÁUSULAS numeradas (PRIMERA, SEGUNDA, etc.)
   - Usar `data.city || "[Ciudad]"` y `data.date || formatDate()`
   - Cláusulas adicionales opcionales con `${data.additionalClauses ? ...}`
   - Bloque de firmas al final con `data.partyA` y `data.partyB`
   - Finalizar con `.trim()`
   - Todo en español legal formal

3. **Añade la entrada** al objeto `contractTemplates` en `src/lib/contract-templates.ts`.

4. **Añade el tipo** a la lista `contractTypes` en `src/app/generate/page.tsx`:
   ```ts
   {
     id: "nuevo-id",
     title: "Nombre del contrato",
     description: "Descripción corta",
     icon: <IconoAdecuado className="w-6 h-6" />,
   }
   ```
   Elige un icono apropiado de lucide-react. Importa el icono si no está importado.

5. **Añade la traducción** del tipo en los objetos `contractTypeNames` de:
   - `src/app/dashboard/page.tsx`
   - `src/app/dashboard/contracts/page.tsx`
   - `src/app/dashboard/contracts/[id]/page.tsx`

6. Confirma que el nuevo template aparece correctamente en el wizard de `/generate`.
