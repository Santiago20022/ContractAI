# Casos de Uso y Escenarios — ContractAI

**Asignatura:** Ingeniería de Requisitos
**Docente:** Gloria Amparo Lora Patiño
**Entrega:** 16 de mayo de 2026
**Proyecto:** ContractAI — Plataforma web para generar y analizar contratos legales en español

---

## 1. Introducción

Los **Casos de Uso (CU)** describen las interacciones concretas entre los actores y el sistema para alcanzar un objetivo específico. Son la evolución natural de las **Historias de Usuario**: mientras la HU expresa la necesidad, el CU describe paso a paso cómo se satisface esa necesidad dentro del sistema.

Cada Caso de Uso incluye:
- **Actor(es)**: quién interactúa con el sistema
- **Precondiciones**: lo que debe ser cierto antes de iniciar
- **Flujo principal**: la secuencia paso a paso del camino feliz
- **Flujos alternativos / excepciones**: variaciones o errores
- **Postcondición**: el resultado final tras ejecutar el caso de uso
- **Escenario**: una instancia concreta del caso de uso con datos reales

---

## 2. Actores del sistema

| Actor | Descripción |
|-------|-------------|
| **Visitante** | Persona que aún no se ha registrado. Solo puede ver páginas públicas, registrarse, iniciar sesión y abrir contratos compartidos. |
| **Usuario autenticado** | Persona registrada que puede generar, analizar, modificar, firmar, compartir y descargar contratos. |
| **Desarrollador externo** | Cliente que consume la API REST pública de ContractAI desde otra aplicación, autenticándose con una API key. |
| **Sistema IA (Groq)** | Servicio externo de inteligencia artificial que genera, modifica y analiza contratos. |

---

## 3. Diagrama general de Casos de Uso

```
                        ┌────────────────────────┐
                        │      ContractAI        │
                        ├────────────────────────┤
                        │ CU-01 Registrar        │
   ┌────────────┐       │ CU-02 Iniciar sesión   │       ┌────────────────┐
   │ Visitante  │──────▶│ CU-03 Recuperar pass   │       │ Sistema IA     │
   └────────────┘       │ CU-10 Ver compartido   │       │ (Groq LLM)     │
                        ├────────────────────────┤       └────────────────┘
   ┌────────────┐       │ CU-04 Generar contrato │◀──────────┐
   │  Usuario   │──────▶│ CU-05 Analizar         │◀──────────┤
   │ autenticado│       │ CU-06 Modificar        │◀──────────┘
   └────────────┘       │ CU-07 Firmar           │
                        │ CU-08 Guardar firma    │
                        │ CU-09 Compartir        │
                        │ CU-11 Descargar PDF    │
                        │ CU-12 Eliminar         │
                        │ CU-13 Ver dashboard    │
                        ├────────────────────────┤
   ┌────────────┐       │ CU-14 Usar API REST    │
   │Desarrollador│─────▶│                        │
   └────────────┘       └────────────────────────┘
```

---

## 4. Casos de Uso detallados

A continuación, se documentan los **7 Casos de Uso principales** del sistema. La ficha completa de los demás se incluye en el Anexo (sección 5).

---

### CU-01 — Registrar usuario

| Campo | Descripción |
|-------|-------------|
| **ID** | CU-01 |
| **Nombre** | Registrar nuevo usuario |
| **Actor principal** | Visitante |
| **HU asociada** | HU-04 |
| **Precondición** | El visitante no tiene una cuenta activa con el correo que pretende registrar. |
| **Postcondición** | Se crea una cuenta nueva, el usuario queda autenticado y es redirigido al dashboard. |

**Flujo principal:**
1. El visitante accede a la página `/register`.
2. El sistema muestra el formulario con los campos: nombre, correo electrónico, contraseña y confirmación.
3. El visitante completa los campos y envía el formulario.
4. El sistema valida que los campos no estén vacíos, que el correo tenga formato válido y que las dos contraseñas coincidan.
5. El sistema verifica que el correo no esté ya registrado en `localStorage`.
6. El sistema hashea la contraseña y crea el registro del usuario.
7. El sistema marca al usuario como autenticado y redirige a `/dashboard`.

**Flujos alternativos:**
- **4a.** Si algún campo es inválido, el sistema muestra el mensaje correspondiente sin enviar el formulario.
- **5a.** Si el correo ya existe, el sistema muestra "Ya existe una cuenta con este correo" (regla **RN-006**).

**Escenario concreto:**
> Santiago, freelancer, accede a `contractai.app/register`. Llena el formulario con `Santiago García`, `santiago@email.com`, contraseña `123Santi!`. El sistema valida los campos, comprueba que el correo no existe, hashea la contraseña, crea la cuenta y redirige a `/dashboard`. Santiago ve el mensaje "¡Hola, Santiago!" en el dashboard.

---

### CU-04 — Generar contrato con IA

| Campo | Descripción |
|-------|-------------|
| **ID** | CU-04 |
| **Nombre** | Generar contrato con IA |
| **Actor principal** | Usuario autenticado |
| **Actor secundario** | Sistema IA (Groq) |
| **HU asociada** | HU-01 |
| **Precondición** | El usuario tiene sesión activa. |
| **Postcondición** | Se crea un nuevo contrato asociado al usuario, en estado `completed`, visible en su dashboard. |

**Flujo principal:**
1. El usuario hace clic en "Nuevo contrato" desde el header global.
2. El sistema muestra el wizard en 3 pasos.
3. **Paso 1**: el usuario selecciona el tipo de contrato (servicios, NDA, empleo, sociedad, arriendo, compraventa, términos, privacidad).
4. **Paso 2**: el sistema muestra el formulario con campos específicos del tipo elegido (Parte A, Parte B, objeto, valor, duración, ciudad, fecha, cláusulas adicionales).
5. El usuario completa los datos y hace clic en "Generar".
6. **Paso 3**: el sistema envía un POST a `/api/generate` con los datos.
7. La IA recibe el prompt y empieza a transmitir el contrato como stream de texto.
8. El sistema muestra el contrato palabra a palabra en pantalla mientras se genera.
9. Al finalizar el stream, el sistema guarda el contrato en `localStorage` con estado `completed`.
10. El usuario puede copiar, descargar PDF, modificar o firmar el contrato.

**Flujos alternativos:**
- **7a.** Si la API de IA falla o no hay clave configurada, el sistema usa la plantilla local equivalente como fallback (regla **RN-009**).
- **5a.** Si algún campo obligatorio está vacío, el sistema impide avanzar al paso 3.

**Escenario concreto:**
> Santiago, ya autenticado, quiere un NDA con un cliente. Selecciona "NDA (Confidencialidad)", llena Parte A: "Santiago García", Parte B: "ACME S.A.", objeto: "información del proyecto X", valor: "$0", duración: "2 años", ciudad: "Bogotá". Hace clic en "Generar". El sistema muestra el NDA generándose en tiempo real con cláusulas como "CLÁUSULA PRIMERA: PARTES…". A los 12 segundos termina y aparece guardado en "Mis Contratos".

---

### CU-05 — Analizar riesgo de contrato

| Campo | Descripción |
|-------|-------------|
| **ID** | CU-05 |
| **Nombre** | Analizar riesgo de un contrato |
| **Actor principal** | Usuario autenticado |
| **Actor secundario** | Sistema IA (Groq) |
| **HU asociada** | HU-02 |
| **Precondición** | El usuario tiene sesión activa y dispone del texto del contrato a analizar. |
| **Postcondición** | El sistema muestra un puntaje de riesgo de 0 a 100, un resumen ejecutivo y la lista de cláusulas problemáticas con sugerencias. |

**Flujo principal:**
1. El usuario accede a `/analyze` desde el sidebar.
2. El sistema muestra un editor donde el usuario pega o escribe el texto del contrato.
3. El usuario hace clic en "Analizar".
4. El sistema valida que el texto tenga entre 1 y 50.000 caracteres (regla **RN-008**).
5. El sistema envía el texto a `/api/analyze`.
6. La IA devuelve un objeto JSON con: `riskScore`, `summary`, `contractSummary` (partes, objeto, duración, monto), y `risks[]` (lista de cláusulas con nivel high/medium/low/info).
7. El sistema muestra el puntaje destacado, el resumen del contrato y las cláusulas problemáticas resaltadas con su sugerencia.
8. Si el puntaje es ≥ 70, el sistema marca el contrato como "Seguro"; si es menor, lo marca como "Riesgo alto" (regla **RN-002**).

**Flujos alternativos:**
- **4a.** Si el texto está vacío, el sistema muestra "El contenido no puede estar vacío" y aborta.
- **4b.** Si supera los 50.000 caracteres, el sistema muestra "El contrato excede el límite de caracteres".
- **6a.** Si la IA falla, el sistema usa el motor local de detección por regex (9 patrones) como respaldo.

**Escenario concreto:**
> Santiago tiene un borrador de contrato que le envió un cliente. Pega el texto en el analizador. El sistema detecta que el contrato tiene una penalización del 200% por cancelación, una cesión de derechos sin compensación y jurisdicción en Singapur. Devuelve `riskScore: 20`, marca las 3 cláusulas como `high` y sugiere renegociar cada una. Santiago ve el reporte y decide pedir cambios al cliente antes de firmar.

---

### CU-06 — Modificar contrato con IA

| Campo | Descripción |
|-------|-------------|
| **ID** | CU-06 |
| **Nombre** | Modificar un contrato existente con instrucciones en lenguaje natural |
| **Actor principal** | Usuario autenticado |
| **Actor secundario** | Sistema IA (Groq) |
| **HU asociada** | HU-09 |
| **Precondición** | El usuario tiene un contrato generado previamente. |
| **Postcondición** | El contrato queda actualizado con la modificación solicitada, sin alterar el resto de cláusulas. |

**Flujo principal:**
1. El usuario abre un contrato ya generado y ve el panel "Modificar".
2. El usuario escribe una instrucción en lenguaje natural (ej: "Agrega una cláusula de no competencia de 2 años").
3. El sistema envía el contrato actual + la instrucción a `/api/modify`.
4. La IA, con temperatura 0.2, devuelve el contrato completo con la modificación aplicada.
5. El sistema reemplaza el contenido del contrato en pantalla en streaming.
6. Cuando termina el stream, el sistema actualiza el contrato en `localStorage` (no crea uno nuevo).
7. El sistema muestra el toast "✓ Contrato actualizado".

**Flujos alternativos:**
- **2a.** Si la instrucción es vaga (ej: "hola"), la IA está entrenada para devolver el contrato sin cambios y el sistema mantiene el original.
- **4a.** Si la IA falla, el sistema mantiene el contrato anterior y muestra un mensaje de error.

**Escenario concreto:**
> Santiago revisa su contrato de servicios y nota que falta una cláusula de no competencia. Escribe en el panel "Modificar": "Agrega una cláusula de no competencia de 2 años en territorio nacional". El sistema preserva las 9 cláusulas existentes y añade una **CLÁUSULA DÉCIMA: NO COMPETENCIA** con redacción legal formal. El contrato actualizado queda guardado.

---

### CU-07 — Firmar contrato digitalmente

| Campo | Descripción |
|-------|-------------|
| **ID** | CU-07 |
| **Nombre** | Firmar contrato digitalmente |
| **Actor principal** | Usuario autenticado |
| **HU asociada** | HU-05, HU-06 |
| **Precondición** | El usuario tiene un contrato en estado `completed` y desea firmarlo como Parte A o Parte B. |
| **Postcondición** | El contrato pasa a estado `signed` (si firman las dos partes) o conserva `completed` con una firma registrada (si solo firma una). |

**Flujo principal:**
1. El usuario abre el contrato y entra en la sección "Firma electrónica".
2. El sistema muestra dos paneles: "Parte A" y "Parte B".
3. El usuario hace clic en "Firmar como Parte X".
4. El sistema abre un modal con tres opciones: **Escribir** (firma con texto), **Dibujar** (lienzo libre) o **Guardadas** (biblioteca).
5. El usuario ingresa su nombre y produce la firma.
6. El sistema captura la firma como imagen JPEG sobre fondo blanco.
7. El sistema guarda la firma en el contrato (`signatures[]`) con `role`, `name`, `signatureImage`, `signedAt`.
8. Si ambas partes han firmado, el sistema actualiza el estado del contrato a `signed`.

**Flujos alternativos:**
- **5a.** Si el usuario marca "Guardar firma para futuros contratos", el sistema añade la firma a la biblioteca personal del usuario.
- **3a.** Si el usuario quiere remover una firma ya hecha, el sistema pide confirmación (regla **RN-003**).

**Escenario concreto:**
> Santiago abre el NDA generado y hace clic en "Firmar como Parte A". Elige "Dibujar", escribe su nombre y dibuja la firma con el mouse. Marca "Guardar para futuros contratos" con etiqueta "Firma habitual". El sistema guarda la firma, la asocia al contrato y la añade a la biblioteca. La Parte B aún aparece como "Pendiente de firma".

---

### CU-09 — Compartir contrato por enlace

| Campo | Descripción |
|-------|-------------|
| **ID** | CU-09 |
| **Nombre** | Compartir contrato por enlace |
| **Actor principal** | Usuario autenticado |
| **Actor secundario** | Visitante destinatario |
| **HU asociada** | HU-07 |
| **Precondición** | El usuario tiene un contrato guardado. |
| **Postcondición** | Se genera una URL única con el contrato codificado, copiada al portapapeles. |

**Flujo principal:**
1. El usuario abre el menú de acciones de un contrato y selecciona "Compartir link".
2. El sistema codifica el contrato (título, partes, contenido, tipo) en un token comprimido con gzip y codificado en base64-url-safe.
3. El sistema construye la URL `https://contractai.app/share?c=<token>`.
4. El sistema copia la URL al portapapeles.
5. El sistema muestra un toast "Enlace de compartir copiado".
6. El usuario envía la URL al destinatario por su canal preferido.

**Flujos alternativos:**
- **2a.** Si el navegador no soporta `CompressionStream`, el sistema usa codificación base64 plano como fallback.
- **5a.** Si el usuario no tiene permisos del portapapeles, el sistema muestra la URL en un cuadro modal para copiarla manualmente.

**Escenario concreto:**
> Santiago necesita que su cliente revise el contrato. En "Mis Contratos", abre el menú del NDA y selecciona "Compartir link". El sistema copia `contractai.app/share?c=z8Fk2H...` al portapapeles y muestra el toast. Santiago pega la URL en WhatsApp. Su cliente abre el enlace y ve el contrato en modo solo lectura.

---

### CU-11 — Descargar contrato en PDF

| Campo | Descripción |
|-------|-------------|
| **ID** | CU-11 |
| **Nombre** | Descargar contrato en formato PDF |
| **Actor principal** | Usuario autenticado |
| **HU asociada** | HU-10 |
| **Precondición** | El usuario tiene un contrato guardado. |
| **Postcondición** | Se descarga un archivo `.pdf` con el contrato formateado profesionalmente y, si existen, las firmas embebidas. |

**Flujo principal:**
1. El usuario abre la vista de detalle del contrato y hace clic en "Descargar PDF".
2. El sistema importa dinámicamente la librería `@react-pdf/renderer`.
3. El sistema lee las firmas guardadas (`signatureA`, `signatureB`) si existen.
4. El sistema construye el documento PDF con: portada, datos de las partes, cláusulas estilizadas, sección de firmas con imagen embebida y nombre.
5. El sistema convierte el documento a Blob y dispara la descarga con el nombre del contrato.
6. El navegador guarda el archivo en la carpeta de descargas del usuario.

**Flujos alternativos:**
- **3a.** Si solo Parte A firmó, el sistema deja el espacio de Parte B con líneas en blanco.
- **2a.** Si la importación falla, el sistema muestra un mensaje "Error al generar el PDF".

**Escenario concreto:**
> Santiago, después de que él y su cliente firmaron el NDA, hace clic en "Descargar PDF". El sistema genera un documento de 3 páginas con tipografía Times-Roman, encabezado dorado, las cláusulas justificadas, y al final ambas firmas dibujadas con sus nombres y fechas. El archivo `NDA_-_ACME_S.A..pdf` queda en su carpeta de descargas.

---

## 5. Anexo — Casos de Uso secundarios

A continuación se enumeran los casos de uso restantes con su flujo principal resumido. La estructura completa puede ampliarse a futuro.

### CU-02 — Iniciar sesión
**Actor:** Visitante registrado.
**Flujo:** Accede a `/login` → ingresa correo y contraseña → el sistema valida el hash → si coincide, se establece la sesión y redirige a `/dashboard`. Si no, muestra "Credenciales inválidas".

### CU-03 — Recuperar contraseña
**Actor:** Visitante.
**Flujo:** Accede a `/forgot-password` → ingresa el correo → el sistema genera un token temporal y envía un email con `Resend` → el usuario abre el link → ingresa contraseña nueva → el sistema valida el token y actualiza el hash.

### CU-08 — Guardar firma reutilizable
**Actor:** Usuario autenticado.
**Flujo:** Al firmar un contrato, marca "Guardar para futuros contratos" → el sistema almacena la firma con etiqueta en la biblioteca personal del usuario.

### CU-10 — Ver contrato compartido
**Actor:** Visitante con enlace.
**Flujo:** Abre `/share?c=<token>` → el sistema decodifica el token → muestra el contrato en modo solo lectura, con opción a descargar PDF. Si el token está corrupto, muestra "Enlace no válido".

### CU-12 — Eliminar contrato
**Actor:** Usuario autenticado.
**Flujo:** Abre el menú de un contrato → "Eliminar" → el sistema pide confirmación en un modal → al confirmar, borra el contrato de `localStorage`.

### CU-13 — Consultar dashboard de estadísticas
**Actor:** Usuario autenticado.
**Flujo:** Accede a `/dashboard` → el sistema calcula totales (contratos creados, firmados, riesgo promedio) y los presenta junto con los últimos 5 contratos.

### CU-14 — Usar la API REST pública
**Actor:** Desarrollador externo.
**Flujo:** Envía un POST a `/api/v1/generate` con header `X-API-Key: contractai_<userId>` → el sistema valida la key → procesa la solicitud → devuelve el contrato generado en JSON.

---

## 6. Trazabilidad — HU → CU

| Historia de Usuario | Caso(s) de Uso |
|---------------------|----------------|
| HU-01 (generar contrato) | CU-04 |
| HU-02 (analizar riesgo) | CU-05 |
| HU-03 (guardar contratos) | CU-04, CU-12 |
| HU-04 (registrarse) | CU-01, CU-02, CU-03 |
| HU-05 (firmar digitalmente) | CU-07 |
| HU-06 (biblioteca de firmas) | CU-07, CU-08 |
| HU-07 (compartir por enlace) | CU-09, CU-10 |
| HU-08 (dashboard) | CU-13 |
| HU-09 (modificar con IA) | CU-06 |
| HU-10 (descargar PDF) | CU-11 |

---

## 7. Conclusiones

La definición de los Casos de Uso permitió:

1. **Concretar las Historias de Usuario** convirtiéndolas en flujos paso a paso ejecutables y testables.
2. **Identificar todos los actores** del sistema, incluyendo el actor secundario "Sistema IA" (servicio externo de Groq), que es crítico en CU-04, CU-05 y CU-06.
3. **Detectar flujos alternativos y excepciones** que no eran obvios desde las HU, como el fallback a plantillas locales cuando la IA no está disponible (CU-04, CU-05) o la validación de instrucciones vagas en el modify (CU-06).
4. **Reforzar la trazabilidad** entre artefactos: cada CU está vinculado a sus HU, RF, RNF y RN del documento de Ingeniería de Requisitos.

Estos Casos de Uso son la base sobre la cual se construirán los **Diagramas de Actividad y de Canal**, así como el **Diccionario de Datos**, en la asesoría del 23 de mayo.
