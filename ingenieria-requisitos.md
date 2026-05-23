# Ingeniería de Requisitos — ContractAI

**Asignatura:** Ingeniería de Requisitos
**Docente:** Gloria Amparo Lora Patiño
**Entrega:** 9 de mayo de 2026
**Proyecto:** ContractAI — Plataforma web para generar y analizar contratos legales en español

---

## 1. Descripción del proyecto

**ContractAI** es una aplicación web orientada a freelancers, emprendedores y PYMEs hispanohablantes que necesitan generar, analizar y firmar contratos legales sin contratar un abogado para cada documento.

La plataforma permite:
- Generar contratos a partir de plantillas inteligentes (servicios, NDA, empleo, sociedad, arrendamiento, compraventa, términos y condiciones, política de privacidad).
- Analizar el riesgo de cualquier contrato existente y obtener un puntaje de 0 a 100 con cláusulas problemáticas resaltadas.
- Personalizar contratos con asistencia de IA (Groq + LLaMA 3.3 70B).
- Firmar digitalmente y guardar firmas reutilizables.
- Compartir contratos vía enlace seguro.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · Groq AI · localStorage.

---

## 2. Paso a paso de la Ingeniería de Requisitos aplicada

Para identificar y documentar los requisitos del proyecto se siguió este proceso:

### Paso 1 — Identificación de actores
Se definieron los roles que interactúan con el sistema:
- **Freelancer / emprendedor** → genera contratos para sus clientes.
- **PYME** → analiza contratos antes de firmarlos.
- **Cliente final** → firma contratos compartidos por enlace.
- **Usuario registrado** → administra su biblioteca de contratos y firmas.

### Paso 2 — Elicitación (recolección de necesidades)
Mediante observación del problema (tiempo y costo de generar contratos legales) se redactaron las **Historias de Usuario (HU)** desde la perspectiva de cada rol, siguiendo el formato:
> *Como [rol], quiero [acción], para [beneficio].*

### Paso 3 — Análisis y derivación de requisitos funcionales
Cada HU se descompuso en una o más capacidades concretas que el sistema debe ofrecer. Estas se documentan como **Requisitos Funcionales (RF)**:
> *RF-NNN: El sistema debe [verbo] [objeto].*

### Paso 4 — Definición de atributos de calidad
Se identificaron los atributos no funcionales esperados (rendimiento, disponibilidad, usabilidad, seguridad, compatibilidad). Estos se documentan como **Requisitos No Funcionales (RNF)** con métricas verificables:
> *RNF-NNN: El sistema debe [atributo medible].*

### Paso 5 — Identificación de reglas de negocio
Se identificaron condiciones, restricciones y políticas que el sistema debe respetar siempre, aunque no sean funcionalidades visibles. Se documentan como **Reglas de Negocio (RN)**:
> *RN-NNN: SI [condición] ENTONCES [acción / restricción].*

### Paso 6 — Trazabilidad
Se construyó la matriz de trazabilidad que conecta cada HU con los RF que la implementan, los RNF que aseguran su calidad y las RN que la restringen.

---

## 3. Glosario de tipos de requisito

| Sigla | Nombre completo | Para qué sirve | Formato |
|-------|----------------|----------------|---------|
| **HU** | Historia de Usuario | Describe lo que un **usuario real** necesita y por qué | `Como [rol], quiero [acción], para [beneficio]` |
| **RF** | Requisito Funcional | Describe lo que el **sistema debe hacer** | `RF-NNN: El sistema debe [verbo] [cosa]` |
| **RNF** | Requisito No Funcional | Describe **qué tan bien** debe hacerlo (calidad medible) | `RNF-NNN: El sistema debe [atributo medible]` |
| **RN** | Regla de Negocio | Describe una **restricción o condición** del negocio | `RN-NNN: SI [condición] ENTONCES [acción]` |

---

## 4. Historias de Usuario

| ID | Historia |
|----|----------|
| **HU-01** | Como **freelancer**, quiero generar un contrato de prestación de servicios a partir de una plantilla, para formalizar mis acuerdos con clientes sin pagar un abogado. |
| **HU-02** | Como **PYME**, quiero analizar el riesgo de un contrato antes de firmarlo, para detectar cláusulas peligrosas o desfavorables. |
| **HU-03** | Como **usuario registrado**, quiero guardar mis contratos en la plataforma, para consultarlos, editarlos y reutilizarlos en el futuro. |
| **HU-04** | Como **usuario nuevo**, quiero registrarme con correo y contraseña, para que mis contratos queden privados y vinculados a mi cuenta. |
| **HU-05** | Como **usuario**, quiero firmar digitalmente un contrato dibujando mi firma, para dejar constancia de mi aceptación sin imprimir el documento. |
| **HU-06** | Como **usuario**, quiero guardar firmas en una biblioteca personal, para reutilizarlas en futuros contratos sin volver a dibujarlas. |
| **HU-07** | Como **usuario**, quiero compartir un contrato mediante un enlace, para que la otra parte lo revise y firme desde su navegador. |
| **HU-08** | Como **usuario**, quiero ver un dashboard con mis estadísticas, para conocer cuántos contratos tengo, su estado y su riesgo promedio. |
| **HU-09** | Como **usuario**, quiero modificar un contrato existente con una instrucción en lenguaje natural, para ajustarlo sin reescribirlo desde cero. |
| **HU-10** | Como **usuario**, quiero descargar un contrato en PDF, para imprimirlo o enviarlo por correo formal. |

---

## 5. Requisitos Funcionales

| ID | Requisito |
|----|-----------|
| **RF-001** | El sistema debe permitir registrar nuevos usuarios con nombre, correo electrónico y contraseña. |
| **RF-002** | El sistema debe autenticar a los usuarios mediante correo y contraseña, manteniendo una sesión activa. |
| **RF-003** | El sistema debe permitir generar contratos a partir de 8 plantillas predefinidas: servicios, NDA, empleo, sociedad, arrendamiento, compraventa, términos y condiciones, y política de privacidad. |
| **RF-004** | El sistema debe permitir personalizar los datos del contrato (partes, objeto, valor, duración, ciudad, fecha) mediante un formulario por pasos. |
| **RF-005** | El sistema debe analizar el texto de un contrato y calcular un puntaje de riesgo numérico de 0 a 100. |
| **RF-006** | El sistema debe identificar y mostrar las cláusulas de riesgo encontradas, indicando nivel (alto, medio, bajo, informativo), título, descripción, cita textual y sugerencia. |
| **RF-007** | El sistema debe permitir guardar, editar y eliminar contratos asociados al usuario autenticado. |
| **RF-008** | El sistema debe permitir al usuario dibujar una firma digital y agregarla al contrato. |
| **RF-009** | El sistema debe permitir guardar firmas en una biblioteca personal reutilizable y eliminarlas. |
| **RF-010** | El sistema debe generar un enlace único para compartir un contrato con terceros en modo lectura. |
| **RF-011** | El sistema debe permitir descargar cualquier contrato en formato PDF. |
| **RF-012** | El sistema debe mostrar un dashboard con el total de contratos, riesgo promedio y los últimos contratos creados. |
| **RF-013** | El sistema debe permitir modificar un contrato existente enviando una instrucción en lenguaje natural a la IA. |
| **RF-014** | El sistema debe permitir consultar al asistente IA preguntas sobre un contrato cargado. |

---

## 6. Requisitos No Funcionales

| ID | Requisito |
|----|-----------|
| **RNF-001** | El sistema debe responder a cualquier acción del usuario en menos de 2 segundos bajo condiciones normales de operación. |
| **RNF-002** | El sistema debe estar disponible al menos el 99% del tiempo medido mensualmente. |
| **RNF-003** | El sistema debe ser responsivo y funcionar correctamente en pantallas desde 320px (móvil) hasta 1920px (escritorio). |
| **RNF-004** | El sistema debe almacenar las contraseñas de usuario de forma hasheada, nunca en texto plano. |
| **RNF-005** | El sistema debe ser compatible con las versiones más recientes de Chrome, Firefox, Safari y Edge. |
| **RNF-006** | El sistema debe presentar la interfaz en español con lenguaje claro, sin requerir conocimientos técnicos legales. |
| **RNF-007** | El sistema debe permitir consultar contratos guardados sin conexión a internet. |
| **RNF-008** | El sistema debe generar contratos con un mínimo de 900 palabras y al menos 10 cláusulas numeradas. |
| **RNF-009** | El sistema debe transmitir el contenido de los contratos generados por IA mediante streaming, mostrando el texto progresivamente. |

---

## 7. Reglas de Negocio

| ID | Regla |
|----|-------|
| **RN-001** | SI el usuario no ha iniciado sesión ENTONCES no puede generar, guardar ni acceder a sus contratos. |
| **RN-002** | SI el puntaje de riesgo de un contrato es mayor a 70 ENTONCES el sistema debe alertar visualmente al usuario antes de guardar. |
| **RN-003** | SI el usuario intenta eliminar un contrato firmado ENTONCES el sistema debe solicitar confirmación explícita. |
| **RN-004** | SI el usuario intenta eliminar una firma guardada ENTONCES el sistema debe pedir confirmación antes de borrarla. |
| **RN-005** | SI un contrato es compartido mediante enlace ENTONCES cualquier persona con el enlace puede verlo en modo lectura, sin poder editarlo. |
| **RN-006** | SI un correo electrónico ya está registrado ENTONCES el sistema debe rechazar el nuevo registro y notificar el conflicto. |
| **RN-007** | SI el análisis de riesgo detecta cláusulas peligrosas ENTONCES estas deben mostrarse resaltadas con su nivel de riesgo y sugerencia de mejora. |
| **RN-008** | SI el contenido del contrato a analizar supera los 50.000 caracteres ENTONCES el sistema debe rechazar el análisis e informar el límite. |
| **RN-009** | SI la API de IA no está disponible ENTONCES el sistema debe usar las plantillas locales como respaldo y notificar al usuario. |
| **RN-010** | SI un usuario desea recuperar su contraseña ENTONCES debe solicitarlo por correo y recibir un enlace temporal único. |

---

## 8. Matriz de Trazabilidad

Conexión entre Historias de Usuario, Requisitos Funcionales, No Funcionales y Reglas de Negocio:

| HU | RF asociados | RNF aplicables | RN aplicables |
|----|-------------|----------------|---------------|
| HU-01 | RF-003, RF-004 | RNF-001, RNF-008, RNF-009 | RN-001, RN-009 |
| HU-02 | RF-005, RF-006 | RNF-001, RNF-006 | RN-002, RN-007, RN-008 |
| HU-03 | RF-007 | RNF-004, RNF-007 | RN-001, RN-003 |
| HU-04 | RF-001, RF-002 | RNF-004 | RN-006, RN-010 |
| HU-05 | RF-008 | RNF-001, RNF-003 | RN-003 |
| HU-06 | RF-009 | RNF-007 | RN-004 |
| HU-07 | RF-010 | RNF-002, RNF-005 | RN-005 |
| HU-08 | RF-012 | RNF-001, RNF-003 | RN-001 |
| HU-09 | RF-013 | RNF-001, RNF-009 | RN-001, RN-009 |
| HU-10 | RF-011 | RNF-005 | — |

---

## 9. Conclusiones

La Ingeniería de Requisitos aplicada a ContractAI permitió:

1. **Clarificar el alcance** del MVP separando lo imprescindible (generación, análisis, autenticación, firma) de lo opcional (chat IA, biblioteca de firmas, dashboard).
2. **Identificar restricciones técnicas** desde el inicio, como el almacenamiento local en `localStorage` (RNF-007) y el uso de IA externa con fallback local (RN-009).
3. **Definir métricas verificables** en los RNF (tiempos de respuesta, tamaños mínimos, compatibilidad) que permitirán probar el sistema objetivamente.
4. **Anticipar reglas de negocio críticas** como el límite de 50.000 caracteres en el análisis (RN-008) o el bloqueo de funcionalidades sin sesión (RN-001), evitando rediseños posteriores.

Esta documentación es la base sobre la que se construirán los **Casos de Uso, Diagramas de Actividad y Diccionario de Datos** en las próximas asesorías (16 y 23 de mayo).
