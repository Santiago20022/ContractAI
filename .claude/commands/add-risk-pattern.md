# /add-risk-pattern — Añadir nuevo patrón de riesgo al analizador

Añade un nuevo patrón de detección de riesgos al analizador de contratos de ContractAI.

## Contexto del proyecto

Los patrones de riesgo viven en `src/lib/contract-templates.ts` en el array `riskPatterns`.

Estructura de cada patrón:
```ts
{
  pattern: /regex/gi,          // RegExp para detectar en el texto del contrato
  title: "Título del riesgo",  // Nombre corto mostrado en la UI
  risk: "high" | "medium" | "low" | "info",
  description: "Descripción del problema detectado.",
  suggestion: "Qué debe hacer el usuario para mitigarlo.",
}
```

**Cálculo del score**: `100 - (highRisk×20 + mediumRisk×10 + lowRisk×5)`

Niveles de riesgo actuales (9 patrones existentes):
- `high`: penalización elevada, cesión total de derechos, exclusividad sin límite, responsabilidad ilimitada
- `medium`: plazo de pago extenso, confidencialidad unidireccional, modificaciones unilaterales
- `low`: transferencia de propiedad intelectual
- `info`: jurisdicción especificada

## Lo que debes hacer

El usuario quiere añadir el patrón: **$ARGUMENTS**

### Pasos:

1. **Lee** `src/lib/contract-templates.ts` para ver los patrones existentes y no crear duplicados.

2. **Diseña el nuevo patrón**:
   - El `pattern` debe ser un RegExp con flag `gi` (global, case-insensitive)
   - Prueba mentalmente el regex contra frases comunes en contratos en español
   - El `title` debe ser claro y conciso (≤ 5 palabras)
   - `description` explica qué implica legalmente
   - `suggestion` da un consejo accionable concreto
   - Asigna el nivel `risk` apropiado según el impacto legal

3. **Añade el patrón** al array `riskPatterns` en `src/lib/contract-templates.ts`, en el lugar apropiado según su nivel de riesgo (los `high` primero, luego `medium`, `low`, `info`).

4. **Verifica** que el nuevo patrón no rompe la función `analyzeContract()` — la lógica de matching y extracción de cláusulas es genérica y no requiere cambios.

5. Muestra al usuario un ejemplo de texto de contrato que activaría el nuevo patrón.
