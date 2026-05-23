# Análisis de la Encuesta de Usuarios — ContractAI

**Asignatura:** Ingeniería de Requisitos
**Docente:** Gloria Amparo Lora Patiño
**Proyecto:** ContractAI
**Documento:** Identificación de patrones y derivación de requisitos a partir de evidencia de campo

---

## 1. Metodología

Se realizó una encuesta a **39 personas** entre el 11 y el 18 de abril de 2026, mediante formulario en línea. La encuesta combinó:

- **Preguntas demográficas** (rol laboral)
- **Preguntas de escala Likert (1–5)** sobre la percepción de problemas con las herramientas actuales
- **Preguntas abiertas** sobre prácticas, anécdotas y deseos respecto a software de contratos

El propósito fue **validar las hipótesis del proyecto ContractAI** y descubrir necesidades reales de los usuarios potenciales antes de finalizar el alcance del sistema.

---

## 2. Perfil de la muestra

| Rol laboral | N.º de respuestas |
|-------------|------|
| Freelancer / trabajos independientes | 13 |
| Dueño de negocio / emprendimiento | 12 |
| Empleado en oficina / empresa | 9 |
| Jefe o líder de equipo | 5 |
| **Total** | **39** |

> El 64% de la muestra son **freelancers o emprendedores**, que coincide con el público objetivo declarado de ContractAI.

---

## 3. Análisis cuantitativo (Likert)

Se promedió el grado de acuerdo (1 = en desacuerdo, 5 = totalmente de acuerdo) para cada afirmación.

| Afirmación | Promedio (aprox.) | Conclusión |
|------------|---------|------------|
| Los programas actuales son **muy difíciles de usar** | **4.2 / 5** | Confirma fricción de UX |
| Sería bueno **detectar "letra pequeña" / trampas** | **4.8 / 5** | Validación fuerte del análisis de riesgos |
| Es importante tener **todo organizado en un solo lugar** | **4.7 / 5** | Necesidad clara de un dashboard centralizado |
| Las herramientas actuales son **muy caras** | **4.1 / 5** | Hueco de mercado para SaaS asequible |
| Prefieren un sistema que **pregunte cosas sencillas y cree el documento** | **4.8 / 5** | Validación del wizard guiado |

**Conclusión cuantitativa**: las cinco hipótesis sobre las que se construye ContractAI están **fuertemente respaldadas por la evidencia**, con promedios superiores a 4 / 5 en todos los casos.

---

## 4. Patrones cualitativos — "Dolores" identificados

### 4.1 D1 — Desorganización crónica de los documentos

> "Tengo todo en el drive pero a veces ni me acuerdo qué tengo ahí"
> "Tengo un desorden en el computador con archivos llamados final_1, final_2"
> "Estoy guardando capturas de pantalla de los correos"
> "Los tengo en notas del celular más que nada"

📊 **Frecuencia**: presente en 22 / 39 respuestas (≈ 56%)

### 4.2 D2 — Lenguaje legal incomprensible

> "Word más que nada, pero me pierdo con tanto texto"
> "Que sea como un chat que te diga qué poner para no embarrarla con las palabras de abogados"
> "Me tocó buscar cada palabra en Google porque no entendía nada"
> "Que te explique con peras y manzanas qué significa cada párrafo legal"

📊 **Frecuencia**: presente en 15 / 39 respuestas

### 4.3 D3 — Cláusulas peligrosas no detectadas a tiempo

> "A un amigo le pasó con una moto, firmó algo y le cobraron más de lo que era"
> "En mi primer trabajo firmé algo y ahora no puedo entrar a otra empresa que haga lo mismo por un año"
> "Acepté un trabajo de redes sociales y no puse cuántas fotos eran, terminé haciendo el triple"
> "El contrato decía que el cliente era dueño de las fotos para siempre, perdí mis derechos de autor"

📊 **Frecuencia**: presente en **39 / 39** respuestas — 100% conoce un caso

### 4.4 D4 — Olvido de fechas, vencimientos y compromisos

> "Tengo un cuaderno con las fechas pero a veces se me pasa mirar"
> "Se nos pasó renovar el contrato de aseo y nos dejaron el local sucio"
> "Que me avise por WhatsApp cuando ya sea el día de cobrar para que no se me pase"

📊 **Frecuencia**: 12 / 39 menciones específicas

### 4.5 D5 — Soluciones actuales fragmentadas y manuales

> "Solo el bloc de notas jaja"
> "Word y firmas de internet"
> "Casi siempre el Word pero es aburrido"
> "Le pido ayuda a un abogado o a alguien que sepa más"

📊 **Frecuencia**: 100% — nadie usa una solución integral

### 4.6 D6 — Precio actual prohibitivo

| Rango de precio dispuesto a pagar (COP/mes) | Respuestas |
|---------------------------------------------|------------|
| Gratis o < 10.000 | 6 |
| 10.000 – 20.000 | 12 |
| 20.000 – 35.000 | 7 |
| 35.000 – 50.000 | 4 |
| Como Netflix (~22.000) | 2 |
| No sabe / no responde | 8 |

> **Sweet spot**: alrededor de **15.000 – 25.000 COP/mes** (≈ USD 4 – 6)

---

## 5. Patrones de funcionalidades pedidas

Las respuestas a "¿qué cosa nueva le pondría?" se agruparon en **temas**:

| Tema | Ocurrencias | Ejemplos textuales |
|------|-------------|--------------------|
| **Recordatorios y alertas** | 8 | "que me avise por WhatsApp", "alertas por correo muy puntuales", "se sincronice con Outlook" |
| **Lenguaje accesible** | 7 | "que te explique con peras y manzanas", "como un chat que te diga qué poner", "traducción de términos legales" |
| **Plantillas listas** | 5 | "modelos de contratos sencillos para los que no sabemos", "que sugiera cláusulas según lo que necesites" |
| **Análisis de seguridad** | 5 | "calificación de qué tan seguro es", "que diga las partes peligrosas", "botón de pánico para abogado real" |
| **Movilidad** | 4 | "se pueda firmar desde el celular", "una app que funcione bien", "sin descargar nada raro" |
| **Búsqueda interna** | 3 | "buscador de palabras clave dentro de los documentos" |
| **Métricas sociales** | 2 | "contador de revisiones", "saber cuánta gente ha firmado contratos parecidos" |
| **Offline** | 2 | "que funcione sin internet y guarde los cambios cuando vuelva la señal" |
| **Integraciones bancarias** | 1 | "se conecte con el banco para ver si ya pagaron" |

---

## 6. Traducción de patrones a Requisitos

A partir de los dolores y deseos identificados, se derivan los siguientes requisitos. Cada patrón se traduce literalmente en una acción que **el sistema debería permitir**.

### Requisitos derivados de los DOLORES

| Patrón observado | Requisito derivado | Tipo | ID propuesto |
|------------------|--------------------|------|--------------|
| **D1** — Desorganización de documentos | El sistema debe **almacenar todos los contratos del usuario en un único panel centralizado** con búsqueda y filtros. | RF | RF-007 ✅ |
| **D2** — Lenguaje legal incomprensible | El sistema debe **explicar las cláusulas de un contrato en lenguaje sencillo**, accesible para usuarios no expertos. | RF | RF-014 ✅ |
| **D3** — Cláusulas peligrosas no detectadas | El sistema debe **identificar y resaltar cláusulas de riesgo** con su nivel y sugerencia de mejora. | RF | RF-005, RF-006 ✅ |
| **D4** — Olvido de fechas | El sistema debe **notificar al usuario cuando un contrato esté próximo a vencer** o cuando llegue una fecha de pago / hito. | RF | **RF-15 (NUEVO)** |
| **D5** — Soluciones fragmentadas | El sistema debe **integrar generación, análisis, firma, almacenamiento y compartición** en un único flujo. | RF | Cubierto transversalmente ✅ |
| **D6** — Precio inaccesible | El sistema debe **ofrecer un plan gratuito** y un plan de pago bajo (≤ 25.000 COP / mes equivalente). | RNF | **RNF-10 (NUEVO)** |

### Requisitos derivados de los DESEOS

| Deseo del usuario | Requisito derivado | Tipo | ID propuesto |
|-------------------|--------------------|------|--------------|
| Recordatorios por WhatsApp / email | El sistema debe **enviar notificaciones por correo electrónico** cuando un contrato esté próximo a vencer. | RF | **RF-16 (NUEVO)** |
| Chat para resolver dudas legales | El sistema debe **permitir hacer preguntas sobre el contrato a un asistente IA**, en lenguaje natural. | RF | RF-014 ✅ |
| Plantillas listas para principiantes | El sistema debe **ofrecer 8 tipos de contrato preconfigurados** que se completan mediante un wizard. | RF | RF-003, RF-004 ✅ |
| Calificación de seguridad | El sistema debe **mostrar un puntaje de riesgo de 0 a 100** por cada contrato analizado. | RF | RF-005 ✅ |
| Firma desde el celular | El sistema debe **funcionar en dispositivos móviles** y permitir **firma táctil**. | RNF / RF | RNF-003 ✅ + RF-008 ✅ |
| Sincronización con calendario externo | El sistema debe **permitir exportar fechas de vencimiento** a Google Calendar / Outlook. | RF | **RF-17 (NUEVO)** |
| Buscador de palabras clave | El sistema debe **permitir buscar texto dentro de los contratos guardados**. | RF | **RF-18 (NUEVO)** |
| Funcionar sin internet | El sistema debe **permitir consultar contratos guardados sin conexión** a internet. | RNF | RNF-007 ✅ |
| Modelos sugeridos según contexto | El sistema debe **recomendar el tipo de contrato adecuado** según una breve descripción del usuario. | RF | **RF-19 (NUEVO)** |
| Botón de pánico para abogado real | El sistema debe **derivar al usuario a un abogado humano** cuando el riesgo detectado sea alto. | RF | **RF-20 (NUEVO)** |

---

## 7. Cobertura actual de ContractAI vs evidencia

| Necesidad detectada | Cubierta hoy en ContractAI | Cómo |
|---------------------|---------------------------|------|
| Generación de contratos guiada | ✅ Sí | Wizard de 3 pasos en `/generate` |
| Análisis de riesgo y cláusulas peligrosas | ✅ Sí | `/analyze` con score 0–100 + IA Groq |
| Lenguaje sencillo y asistente IA | ✅ Sí | Chat-IA en `/dashboard/contracts/[id]` |
| Almacenamiento centralizado | ✅ Sí | Dashboard + "Mis Contratos" |
| Firma digital (incluido móvil) | ✅ Sí | `SignatureCanvas`, biblioteca de firmas |
| Compartir vía enlace | ✅ Sí | `/share?c=<token>` |
| Descarga PDF profesional | ✅ Sí | `ContractPDF` con firmas embebidas |
| Plantillas listas | ✅ Sí | 8 tipos predefinidos |
| Funciona sin conexión (lectura) | ✅ Parcial | localStorage permite leer offline |
| **Notificaciones de vencimiento** | ❌ No | Requiere RF-16 (email scheduler) |
| **Búsqueda de palabras dentro de los contratos** | ❌ No | Requiere RF-18 |
| **Sincronización con Google/Outlook Calendar** | ❌ No | Requiere RF-17 |
| **Plan gratuito explícito + tarifa baja** | ❌ No | Hoy todo es gratis pero no hay branding de "plan" |
| **Recomendación inteligente del tipo de contrato** | ❌ No | Requiere RF-19 |
| **Derivación a abogado humano** | ❌ No | Requiere RF-20 |

---

## 8. Conclusiones

1. La encuesta **valida fuertemente las hipótesis** sobre las que se construyó ContractAI: el 100% de los encuestados conoce un caso real de problemas con contratos, el 4.8/5 confirma la importancia de detectar "letra pequeña", y el 4.8/5 valida el formato wizard.

2. ContractAI **ya cubre los dolores principales** identificados (D1, D2, D3, D5), con funcionalidades como el wizard guiado, el análisis de riesgo IA, el chat para resolver dudas y el almacenamiento centralizado.

3. Quedan **5 vacíos identificados** por la evidencia que no están implementados aún:
   - Notificaciones por email/WhatsApp de vencimientos (D4 → RF-16)
   - Búsqueda de palabras clave dentro de contratos (RF-18)
   - Sincronización con Google Calendar / Outlook (RF-17)
   - Plan gratuito explícito + tarifa baja documentada (D6 → RNF-10)
   - Recomendación inteligente de tipo de contrato (RF-19)
   - Derivación a abogado humano para casos críticos (RF-20)

4. El **sweet spot de precio** identificado (15.000 – 25.000 COP/mes) debe orientar la futura estrategia de monetización: posicionar ContractAI **por debajo del costo de una hora de abogado**, justificando el valor con la prevención de pérdidas reales como las relatadas en la encuesta.

5. Los hallazgos cualitativos refuerzan que ContractAI **no compite contra Word**, sino contra el **caos actual**: notas en el celular, plantillas prestadas, capturas de WhatsApp y carpetas físicas. La propuesta de valor es **convertir el caos en flujo profesional**.

---

## 9. Próximos pasos

A partir de este análisis se propone:

1. Priorizar la implementación de **RF-16** (notificaciones de vencimiento por email) para el siguiente sprint, dado que es el deseo más repetido (8 menciones) y aborda un dolor universal.
2. Añadir **RF-18** (búsqueda dentro de los contratos) en el segundo sprint, ya que el almacenamiento crece rápido y la encuesta evidencia el problema de "perder los archivos".
3. Documentar formalmente el **plan gratuito** y un plan Pro (≈ 20.000 COP / mes) en la página principal, alineado con la disposición a pagar identificada.
4. Mantener el alcance actual de ContractAI como **MVP estable**, ya que cubre los 4 dolores más profundos identificados (D1, D2, D3, D5).

Estos requisitos se integrarán en la próxima revisión del documento `ingenieria-requisitos.md` y se reflejarán en los Casos de Uso correspondientes.
