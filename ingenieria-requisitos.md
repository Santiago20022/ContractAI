# Ingeniería de Requisitos — ContractAI

**Descripción del sistema:** Aplicación web para generar, analizar y gestionar contratos legales en español, orientada a freelancers y PYMEs hispanohablantes.

---

## Historias de Usuario

| ID | Historia |
|----|----------|
| HU-01 | Como **freelancer**, quiero generar un contrato de servicios, para formalizar mis acuerdos con clientes. |
| HU-02 | Como **PYME**, quiero analizar el riesgo de un contrato, para detectar cláusulas peligrosas antes de firmarlo. |
| HU-03 | Como **usuario registrado**, quiero guardar mis contratos, para consultarlos y reutilizarlos en el futuro. |
| HU-04 | Como **usuario**, quiero registrarme e iniciar sesión, para que mis contratos sean privados y solo míos. |
| HU-05 | Como **usuario**, quiero firmar digitalmente un contrato, para dejar constancia de mi aceptación. |
| HU-06 | Como **usuario**, quiero compartir un contrato mediante un enlace, para que la otra parte lo revise. |
| HU-07 | Como **usuario**, quiero ver un dashboard con mis estadísticas, para conocer cuántos contratos he generado y su estado. |

---

## Requisitos Funcionales

| ID | Requisito |
|----|-----------|
| RF-001 | El sistema debe permitir registrar usuarios con nombre, correo y contraseña. |
| RF-002 | El sistema debe autenticar usuarios mediante correo y contraseña. |
| RF-003 | El sistema debe generar contratos a partir de plantillas predefinidas (servicios, NDA, empleo, sociedad, arriendo, compraventa, términos, privacidad). |
| RF-004 | El sistema debe permitir al usuario personalizar los datos del contrato mediante un formulario paso a paso. |
| RF-005 | El sistema debe analizar el texto de un contrato y calcular un puntaje de riesgo de 0 a 100. |
| RF-006 | El sistema debe identificar y mostrar cláusulas de riesgo detectadas en el contrato. |
| RF-007 | El sistema debe permitir guardar, editar y eliminar contratos. |
| RF-008 | El sistema debe permitir al usuario agregar una firma dibujada al contrato. |
| RF-009 | El sistema debe permitir guardar firmas en una biblioteca personal reutilizable. |
| RF-010 | El sistema debe generar un enlace para compartir un contrato con terceros. |
| RF-011 | El sistema debe mostrar un dashboard con el total de contratos, promedio de riesgo y contratos recientes. |

---

## Requisitos No Funcionales

| ID | Requisito |
|----|-----------|
| RNF-001 | El sistema debe responder a las acciones del usuario en menos de 2 segundos. |
| RNF-002 | El sistema debe funcionar completamente desde el navegador, sin requerir instalación. |
| RNF-003 | El sistema debe ser responsivo y adaptarse a dispositivos móviles y escritorio. |
| RNF-004 | El sistema debe proteger los datos del usuario almacenándolos localmente con credenciales hasheadas. |
| RNF-005 | El sistema debe estar disponible sin conexión a internet para consultar contratos ya guardados. |
| RNF-006 | El sistema debe ser compatible con los navegadores modernos (Chrome, Firefox, Safari, Edge). |
| RNF-007 | El sistema debe presentar una interfaz en español, clara y accesible para usuarios sin conocimientos legales avanzados. |

---

## Reglas de Negocio

| ID | Regla |
|----|-------|
| RN-001 | SI el usuario no ha iniciado sesión ENTONCES no puede generar ni guardar contratos. |
| RN-002 | SI el puntaje de riesgo de un contrato es mayor a 70 ENTONCES el sistema debe alertar al usuario antes de guardar. |
| RN-003 | SI el usuario intenta eliminar un contrato firmado ENTONCES el sistema debe solicitar confirmación explícita. |
| RN-004 | SI el usuario intenta eliminar una firma guardada ENTONCES el sistema debe pedir confirmación antes de borrarla. |
| RN-005 | SI el contrato es compartido mediante enlace ENTONCES cualquier persona con el enlace puede verlo en modo lectura, sin poder editarlo. |
| RN-006 | SI dos usuarios se registran con el mismo correo ENTONCES el sistema debe rechazar el registro y notificar el error. |
| RN-007 | SI el análisis de riesgo detecta cláusulas peligrosas ENTONCES deben mostrarse resaltadas con su descripción. |

---

## Relación entre artefactos

```
HU-01 → RF-003, RF-004 → RNF-001, RNF-002 → RN-001
HU-02 → RF-005, RF-006 → RNF-007          → RN-002, RN-007
HU-03 → RF-007          → RNF-004          → RN-003
HU-05 → RF-008, RF-009  → RNF-001          → RN-004
HU-06 → RF-010          → RNF-002          → RN-005
```
