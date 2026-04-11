# /fix-contract — Depurar o mejorar un contrato generado

Revisa y mejora el contenido de un template de contrato específico en ContractAI.

## Contexto

Los templates están en `src/lib/contract-templates.ts` en el objeto `contractTemplates`.

Tipos disponibles: `services`, `nda`, `employment`, `partnership`, `rental`, `sale`, `terms`, `privacy`.

## Uso

`/fix-contract <tipo>` — Revisa y mejora el template del tipo indicado
`/fix-contract <tipo> <problema>` — Corrige un problema específico

## Lo que debes hacer

Tipo de contrato a revisar: **$ARGUMENTS**

### Checklist de revisión para cada template:

**Estructura legal:**
- [ ] ¿Tiene encabezado con nombre del contrato?
- [ ] ¿Incluye lugar y fecha?
- [ ] ¿Identifica correctamente a las partes?
- [ ] ¿Las cláusulas están numeradas correctamente en español?
- [ ] ¿Tiene cláusula de jurisdicción/ley aplicable?
- [ ] ¿Tiene bloque de firmas con espacio para DNI/NIF?

**Completitud:**
- [ ] ¿Usa todos los campos de `ContractData` relevantes para este tipo?
- [ ] ¿Las cláusulas adicionales opcionales están bien integradas?
- [ ] ¿El fallback con `|| "[PLACEHOLDER]"` es descriptivo?

**Calidad del texto:**
- [ ] ¿El lenguaje es formal y legal pero comprensible?
- [ ] ¿Las obligaciones de ambas partes están equilibradas?
- [ ] ¿Falta alguna cláusula estándar para este tipo de contrato?

**Técnico:**
- [ ] ¿Termina con `.trim()`?
- [ ] ¿La numeración de cláusulas es consistente (incluye cláusulas adicionales)?

Lee el template completo, identifica los problemas, e implementa las mejoras.
