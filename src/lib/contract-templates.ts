// Professional contract templates - No API key needed

export type ContractData = {
  partyA: string;
  partyB: string;
  description: string;
  amount: string;
  duration: string;
  additionalClauses: string;
  city?: string;
  date?: string;
};

const formatDate = () => {
  const date = new Date();
  return date.toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const contractTemplates: Record<string, (data: ContractData) => string> = {
  services: (data) => `
═══════════════════════════════════════════════════════════════
                    CONTRATO DE PRESTACIÓN DE SERVICIOS
═══════════════════════════════════════════════════════════════

En ${data.city || "[Ciudad]"}, a ${data.date || formatDate()}

                              REUNIDOS

De una parte, ${data.partyA || "[NOMBRE DEL PRESTADOR]"}, en adelante "EL PRESTADOR".

De otra parte, ${data.partyB || "[NOMBRE DEL CLIENTE]"}, en adelante "EL CLIENTE".

Ambas partes se reconocen mutuamente la capacidad legal necesaria para la firma del presente contrato, y

                              EXPONEN

Que EL CLIENTE está interesado en contratar los servicios profesionales de EL PRESTADOR, quien cuenta con la experiencia y conocimientos necesarios para llevar a cabo dichos servicios.

Por lo anterior, ambas partes acuerdan celebrar el presente CONTRATO DE PRESTACIÓN DE SERVICIOS, que se regirá por las siguientes:

                             CLÁUSULAS

PRIMERA.- OBJETO DEL CONTRATO
${data.description || "EL PRESTADOR se compromete a realizar los servicios profesionales acordados, aplicando sus conocimientos y experiencia para lograr los objetivos establecidos por EL CLIENTE."}

SEGUNDA.- DURACIÓN
El presente contrato tendrá una duración de ${data.duration || "[DURACIÓN ACORDADA]"}, comenzando a partir de la fecha de firma del presente documento. Podrá ser prorrogado de mutuo acuerdo entre las partes.

TERCERA.- HONORARIOS Y FORMA DE PAGO
Como contraprestación por los servicios prestados, EL CLIENTE abonará a EL PRESTADOR la cantidad de ${data.amount || "[CANTIDAD ACORDADA]"}.

El pago se realizará de la siguiente forma:
• 50% al inicio del proyecto
• 50% a la entrega final

CUARTA.- OBLIGACIONES DEL PRESTADOR
EL PRESTADOR se compromete a:
a) Ejecutar los servicios objeto de este contrato con la máxima diligencia y profesionalidad.
b) Mantener informado a EL CLIENTE sobre el progreso de los trabajos.
c) Cumplir con los plazos acordados.
d) Guardar estricta confidencialidad sobre toda información relacionada con EL CLIENTE.
e) No subcontratar los servicios sin autorización previa y por escrito de EL CLIENTE.

QUINTA.- OBLIGACIONES DEL CLIENTE
EL CLIENTE se compromete a:
a) Proporcionar toda la información y materiales necesarios para la correcta ejecución de los servicios.
b) Realizar los pagos en los plazos acordados.
c) Comunicar de forma clara y oportuna cualquier cambio en los requisitos.
d) Facilitar el acceso a los recursos necesarios para el desarrollo del trabajo.

SEXTA.- CONFIDENCIALIDAD
Ambas partes se comprometen a mantener estricta confidencialidad sobre toda la información intercambiada durante la vigencia del presente contrato y después de su terminación. Esta obligación se extiende a todos los datos, documentos, métodos, procedimientos y know-how.

SÉPTIMA.- PROPIEDAD INTELECTUAL
Los derechos de propiedad intelectual sobre los trabajos realizados serán cedidos a EL CLIENTE una vez completado el pago total acordado. EL PRESTADOR podrá utilizar los trabajos como referencia en su portfolio, salvo que EL CLIENTE solicite expresamente lo contrario.

OCTAVA.- RESOLUCIÓN
Cualquiera de las partes podrá resolver el presente contrato mediante notificación escrita con un preaviso mínimo de quince (15) días. En caso de resolución anticipada, EL CLIENTE deberá abonar los servicios efectivamente prestados hasta la fecha de resolución.

NOVENA.- MODIFICACIONES
Cualquier modificación del presente contrato deberá realizarse por escrito y ser firmada por ambas partes.

${data.additionalClauses ? `DÉCIMA.- CLÁUSULAS ADICIONALES\n${data.additionalClauses}\n\n` : ""}DÉCIMA${data.additionalClauses ? " PRIMERA" : ""}.- LEGISLACIÓN APLICABLE Y JURISDICCIÓN
El presente contrato se regirá e interpretará de acuerdo con la legislación española. Para cualquier controversia derivada del mismo, las partes se someten a los Juzgados y Tribunales de ${data.city || "[Ciudad]"}, renunciando a cualquier otro fuero que pudiera corresponderles.

Y en prueba de conformidad, firman el presente contrato por duplicado y a un solo efecto.


_____________________________              _____________________________
        EL PRESTADOR                              EL CLIENTE
    ${data.partyA || "[Firma]"}                         ${data.partyB || "[Firma]"}


DNI/NIF: _________________              DNI/NIF: _________________
`.trim(),

  nda: (data) => `
═══════════════════════════════════════════════════════════════
            ACUERDO DE CONFIDENCIALIDAD (NDA)
═══════════════════════════════════════════════════════════════

En ${data.city || "[Ciudad]"}, a ${data.date || formatDate()}

                              REUNIDOS

De una parte, ${data.partyA || "[PARTE DIVULGADORA]"}, en adelante "LA PARTE DIVULGADORA".

De otra parte, ${data.partyB || "[PARTE RECEPTORA]"}, en adelante "LA PARTE RECEPTORA".

Ambas partes, conjuntamente denominadas "LAS PARTES", reconociéndose mutuamente capacidad legal suficiente para la firma del presente acuerdo,

                              EXPONEN

I. Que LAS PARTES desean explorar una posible relación comercial o de colaboración que requerirá el intercambio de información confidencial.

II. Que LAS PARTES desean proteger dicha información confidencial y establecer los términos bajo los cuales será compartida.

Por lo anterior, LAS PARTES acuerdan celebrar el presente ACUERDO DE CONFIDENCIALIDAD conforme a las siguientes:

                             CLÁUSULAS

PRIMERA.- DEFINICIÓN DE INFORMACIÓN CONFIDENCIAL
Se considerará "Información Confidencial" toda información, ya sea oral, escrita, gráfica, electrónica o de cualquier otro tipo, que incluye pero no se limita a:
${data.description || `• Información técnica, comercial, financiera o estratégica
• Datos de clientes, proveedores y socios comerciales
• Planes de negocio, marketing y desarrollo
• Software, código fuente, algoritmos y especificaciones técnicas
• Know-how, procesos, metodologías y procedimientos
• Cualquier otra información designada como confidencial`}

SEGUNDA.- OBLIGACIONES DE CONFIDENCIALIDAD
LA PARTE RECEPTORA se compromete a:
a) Mantener la Información Confidencial en estricta reserva.
b) No divulgar la Información Confidencial a terceros sin autorización previa y por escrito.
c) Utilizar la Información Confidencial únicamente para los fines acordados.
d) Proteger la Información Confidencial con el mismo grado de cuidado que utiliza para proteger su propia información confidencial.
e) Limitar el acceso a la Información Confidencial a aquellos empleados o colaboradores que necesiten conocerla.

TERCERA.- EXCEPCIONES
No se considerará Información Confidencial aquella que:
a) Sea de dominio público en el momento de su divulgación.
b) Se convierta en información pública sin incumplimiento de este acuerdo.
c) Estuviera en posesión legítima de LA PARTE RECEPTORA antes de su divulgación.
d) Sea desarrollada independientemente por LA PARTE RECEPTORA.
e) Deba ser divulgada por mandato legal o judicial.

CUARTA.- DURACIÓN
Este acuerdo tendrá una duración de ${data.duration || "dos (2) años"} a partir de la fecha de su firma. Las obligaciones de confidencialidad sobrevivirán a la terminación del acuerdo por un período adicional de tres (3) años.

QUINTA.- DEVOLUCIÓN DE INFORMACIÓN
A la terminación de este acuerdo o a solicitud de LA PARTE DIVULGADORA, LA PARTE RECEPTORA deberá devolver o destruir toda la Información Confidencial recibida, incluyendo copias y documentos derivados.

SEXTA.- PROPIEDAD DE LA INFORMACIÓN
Toda la Información Confidencial seguirá siendo propiedad exclusiva de LA PARTE DIVULGADORA. Este acuerdo no otorga a LA PARTE RECEPTORA ningún derecho sobre dicha información.

SÉPTIMA.- REMEDIOS
En caso de incumplimiento, LA PARTE DIVULGADORA tendrá derecho a solicitar medidas cautelares y/o indemnización por daños y perjuicios.

${data.additionalClauses ? `OCTAVA.- CLÁUSULAS ADICIONALES\n${data.additionalClauses}\n\n` : ""}OCTAVA${data.additionalClauses ? " (CONT.)" : ""}.- JURISDICCIÓN
Para cualquier controversia, LAS PARTES se someten a los Juzgados y Tribunales de ${data.city || "[Ciudad]"}.

Y en prueba de conformidad, firman el presente acuerdo por duplicado.


_____________________________              _____________________________
    LA PARTE DIVULGADORA                      LA PARTE RECEPTORA
    ${data.partyA || "[Firma]"}                         ${data.partyB || "[Firma]"}
`.trim(),

  employment: (data) => `
═══════════════════════════════════════════════════════════════
                    CONTRATO DE TRABAJO
═══════════════════════════════════════════════════════════════

En ${data.city || "[Ciudad]"}, a ${data.date || formatDate()}

                              REUNIDOS

De una parte, ${data.partyA || "[NOMBRE DE LA EMPRESA]"}, con domicilio en [DIRECCIÓN], y CIF [CIF], representada por [REPRESENTANTE], en adelante "LA EMPRESA".

De otra parte, ${data.partyB || "[NOMBRE DEL TRABAJADOR]"}, con DNI [DNI] y domicilio en [DIRECCIÓN], en adelante "EL TRABAJADOR".

                              MANIFIESTAN

Que LA EMPRESA desea contratar los servicios laborales de EL TRABAJADOR, quien acepta prestar sus servicios bajo las condiciones que se establecen en el presente contrato.

                             CLÁUSULAS

PRIMERA.- OBJETO
${data.description || "EL TRABAJADOR prestará sus servicios profesionales en el puesto de [PUESTO], realizando las funciones propias de dicha categoría profesional."}

SEGUNDA.- DURACIÓN
El presente contrato tendrá una duración ${data.duration || "indefinida"}, comenzando a surtir efectos desde la fecha de su firma.

Se establece un período de prueba de [PERÍODO], durante el cual cualquiera de las partes podrá resolver el contrato sin necesidad de preaviso.

TERCERA.- JORNADA LABORAL
La jornada de trabajo será de [HORAS] horas semanales, distribuidas de [DÍA] a [DÍA], en horario de [HORARIO].

CUARTA.- RETRIBUCIÓN
EL TRABAJADOR percibirá una retribución bruta anual de ${data.amount || "[CANTIDAD]"}, distribuida en [12/14] pagas.

QUINTA.- VACACIONES
EL TRABAJADOR tendrá derecho a [30] días naturales de vacaciones anuales retribuidas, o la parte proporcional en caso de no completar el año.

SEXTA.- OBLIGACIONES DEL TRABAJADOR
EL TRABAJADOR se compromete a:
a) Cumplir con las obligaciones de su puesto de trabajo con diligencia y buena fe.
b) Observar las medidas de seguridad e higiene establecidas.
c) Guardar confidencialidad sobre la información de LA EMPRESA.
d) No realizar competencia desleal.

SÉPTIMA.- PROTECCIÓN DE DATOS
LA EMPRESA tratará los datos personales de EL TRABAJADOR conforme a la normativa vigente en materia de protección de datos.

${data.additionalClauses ? `OCTAVA.- CLÁUSULAS ADICIONALES\n${data.additionalClauses}\n\n` : ""}OCTAVA${data.additionalClauses ? " (CONT.)" : ""}.- LEGISLACIÓN APLICABLE
El presente contrato se regirá por el Estatuto de los Trabajadores y demás normativa laboral aplicable.

Y en prueba de conformidad, firman el presente contrato por duplicado.


_____________________________              _____________________________
        LA EMPRESA                            EL TRABAJADOR
    ${data.partyA || "[Firma]"}                         ${data.partyB || "[Firma]"}
`.trim(),

  partnership: (data) => `
═══════════════════════════════════════════════════════════════
                    CONTRATO DE SOCIOS
═══════════════════════════════════════════════════════════════

En ${data.city || "[Ciudad]"}, a ${data.date || formatDate()}

                              REUNIDOS

${data.partyA || "[SOCIO 1]"}, en adelante "SOCIO A".
${data.partyB || "[SOCIO 2]"}, en adelante "SOCIO B".

Conjuntamente denominados "LOS SOCIOS".

                              EXPONEN

Que LOS SOCIOS desean constituir una sociedad para ${data.description || "desarrollar conjuntamente un proyecto empresarial"}.

                             CLÁUSULAS

PRIMERA.- OBJETO SOCIAL
${data.description || "La sociedad tendrá por objeto [DESCRIPCIÓN DEL NEGOCIO]."}

SEGUNDA.- CAPITAL Y PARTICIPACIONES
El capital social será de ${data.amount || "[CANTIDAD]"}, distribuido de la siguiente manera:
• SOCIO A: [XX]%
• SOCIO B: [XX]%

TERCERA.- DURACIÓN
La sociedad tendrá una duración ${data.duration || "indefinida"}.

CUARTA.- ADMINISTRACIÓN
La administración será [solidaria/mancomunada]. Las decisiones estratégicas requerirán acuerdo unánime de LOS SOCIOS.

QUINTA.- REPARTO DE BENEFICIOS
Los beneficios se repartirán proporcionalmente a la participación de cada socio.

SEXTA.- DEDICACIÓN
Cada socio se compromete a dedicar [HORAS] horas semanales al proyecto.

SÉPTIMA.- NO COMPETENCIA
LOS SOCIOS se comprometen a no participar en negocios competidores durante la vigencia de este contrato.

OCTAVA.- RESOLUCIÓN DE CONFLICTOS
Los conflictos se resolverán mediante mediación. Si no hay acuerdo, se acudirá a arbitraje.

${data.additionalClauses ? `NOVENA.- CLÁUSULAS ADICIONALES\n${data.additionalClauses}\n\n` : ""}

_____________________________              _____________________________
        SOCIO A                                  SOCIO B
    ${data.partyA || "[Firma]"}                         ${data.partyB || "[Firma]"}
`.trim(),

  rental: (data) => `
═══════════════════════════════════════════════════════════════
                CONTRATO DE ARRENDAMIENTO
═══════════════════════════════════════════════════════════════

En ${data.city || "[Ciudad]"}, a ${data.date || formatDate()}

                              REUNIDOS

De una parte, ${data.partyA || "[ARRENDADOR]"}, en adelante "EL ARRENDADOR".

De otra parte, ${data.partyB || "[ARRENDATARIO]"}, en adelante "EL ARRENDATARIO".

                             CLÁUSULAS

PRIMERA.- OBJETO
EL ARRENDADOR cede en arrendamiento a EL ARRENDATARIO el inmueble situado en:
${data.description || "[DIRECCIÓN COMPLETA DEL INMUEBLE]"}

SEGUNDA.- DURACIÓN
El arrendamiento tendrá una duración de ${data.duration || "[DURACIÓN]"}, desde [FECHA INICIO] hasta [FECHA FIN].

TERCERA.- RENTA
La renta mensual será de ${data.amount || "[CANTIDAD]"}, pagadera dentro de los primeros cinco días de cada mes.

CUARTA.- FIANZA
EL ARRENDATARIO deposita la cantidad de [FIANZA] en concepto de fianza.

QUINTA.- USO
El inmueble se destinará exclusivamente a vivienda habitual.

SEXTA.- GASTOS
• Comunidad: [ARRENDADOR/ARRENDATARIO]
• Suministros: EL ARRENDATARIO
• IBI: EL ARRENDADOR

SÉPTIMA.- CONSERVACIÓN
EL ARRENDATARIO mantendrá el inmueble en buen estado.

${data.additionalClauses ? `OCTAVA.- CLÁUSULAS ADICIONALES\n${data.additionalClauses}\n\n` : ""}

_____________________________              _____________________________
      EL ARRENDADOR                          EL ARRENDATARIO
    ${data.partyA || "[Firma]"}                         ${data.partyB || "[Firma]"}
`.trim(),

  sale: (data) => `
═══════════════════════════════════════════════════════════════
                CONTRATO DE COMPRAVENTA
═══════════════════════════════════════════════════════════════

En ${data.city || "[Ciudad]"}, a ${data.date || formatDate()}

                              REUNIDOS

De una parte, ${data.partyA || "[VENDEDOR]"}, en adelante "EL VENDEDOR".

De otra parte, ${data.partyB || "[COMPRADOR]"}, en adelante "EL COMPRADOR".

                             CLÁUSULAS

PRIMERA.- OBJETO
EL VENDEDOR vende a EL COMPRADOR, que acepta y adquiere:
${data.description || "[DESCRIPCIÓN DETALLADA DEL BIEN]"}

SEGUNDA.- PRECIO
El precio de la compraventa es de ${data.amount || "[CANTIDAD]"}.

TERCERA.- FORMA DE PAGO
[Describir forma de pago: contado, plazos, etc.]

CUARTA.- ENTREGA
La entrega se realizará ${data.duration || "en el momento de la firma del presente contrato"}.

QUINTA.- GARANTÍA
EL VENDEDOR garantiza que el bien está libre de cargas y gravámenes.

${data.additionalClauses ? `SEXTA.- CLÁUSULAS ADICIONALES\n${data.additionalClauses}\n\n` : ""}

_____________________________              _____________________________
        EL VENDEDOR                            EL COMPRADOR
    ${data.partyA || "[Firma]"}                         ${data.partyB || "[Firma]"}
`.trim(),

  terms: (data) => `
═══════════════════════════════════════════════════════════════
                TÉRMINOS Y CONDICIONES DE USO
═══════════════════════════════════════════════════════════════

Última actualización: ${data.date || formatDate()}

Bienvenido a ${data.partyA || "[NOMBRE DEL SITIO WEB/APP]"}

${data.description || "Estos términos y condiciones regulan el uso de nuestros servicios."}

1. ACEPTACIÓN DE LOS TÉRMINOS
Al acceder y utilizar este sitio web, usted acepta estos términos y condiciones en su totalidad.

2. DESCRIPCIÓN DEL SERVICIO
${data.partyA || "[NOMBRE]"} proporciona [DESCRIPCIÓN DEL SERVICIO].

3. REGISTRO Y CUENTA
• Debe proporcionar información veraz y actualizada.
• Es responsable de mantener la confidencialidad de su cuenta.
• Debe tener al menos 18 años para registrarse.

4. USO ACEPTABLE
Usted se compromete a NO:
• Usar el servicio para fines ilegales.
• Transmitir contenido dañino o malicioso.
• Intentar acceder a sistemas no autorizados.
• Violar derechos de propiedad intelectual.

5. PROPIEDAD INTELECTUAL
Todo el contenido de ${data.partyA || "[NOMBRE]"} está protegido por derechos de autor.

6. LIMITACIÓN DE RESPONSABILIDAD
El servicio se proporciona "tal cual". No garantizamos disponibilidad ininterrumpida.

7. PRIVACIDAD
El tratamiento de datos personales se rige por nuestra Política de Privacidad.

8. MODIFICACIONES
Nos reservamos el derecho de modificar estos términos en cualquier momento.

9. CONTACTO
Para cualquier consulta: ${data.partyB || "[EMAIL DE CONTACTO]"}

${data.additionalClauses ? `10. CONDICIONES ADICIONALES\n${data.additionalClauses}` : ""}
`.trim(),

  privacy: (data) => `
═══════════════════════════════════════════════════════════════
                    POLÍTICA DE PRIVACIDAD
═══════════════════════════════════════════════════════════════

Última actualización: ${data.date || formatDate()}

${data.partyA || "[NOMBRE DE LA EMPRESA]"} ("nosotros", "nuestro") se compromete a proteger su privacidad.

1. INFORMACIÓN QUE RECOPILAMOS
${data.description || `• Datos de identificación (nombre, email, teléfono)
• Datos de navegación (IP, cookies, dispositivo)
• Datos de transacciones`}

2. CÓMO USAMOS SU INFORMACIÓN
Utilizamos sus datos para:
• Proporcionar nuestros servicios
• Mejorar la experiencia del usuario
• Enviar comunicaciones relevantes
• Cumplir obligaciones legales

3. BASE LEGAL
Procesamos sus datos basándonos en:
• Su consentimiento
• Ejecución de contrato
• Interés legítimo
• Obligación legal

4. COMPARTIR INFORMACIÓN
No vendemos sus datos. Podemos compartirlos con:
• Proveedores de servicios
• Autoridades (cuando sea requerido por ley)

5. SUS DERECHOS (RGPD)
Usted tiene derecho a:
• Acceder a sus datos
• Rectificar datos incorrectos
• Solicitar la eliminación
• Oponerse al procesamiento
• Portabilidad de datos

6. RETENCIÓN DE DATOS
Conservamos sus datos durante ${data.duration || "[PERÍODO]"} o según obligaciones legales.

7. SEGURIDAD
Implementamos medidas técnicas y organizativas para proteger sus datos.

8. COOKIES
Utilizamos cookies. Puede gestionar sus preferencias en la configuración de su navegador.

9. CONTACTO
Delegado de Protección de Datos: ${data.partyB || "[EMAIL DPO]"}

${data.additionalClauses ? `10. INFORMACIÓN ADICIONAL\n${data.additionalClauses}` : ""}
`.trim(),
};

export function generateContract(type: string, data: ContractData): string {
  const template = contractTemplates[type];
  if (!template) {
    return contractTemplates.services(data);
  }
  return template(data);
}

// Analysis templates for contract review
export const riskPatterns = [
  {
    pattern: /penalización|penalidad|multa.*(\d{2,}%|\d{4,})/gi,
    title: "Penalización elevada detectada",
    risk: "high" as const,
    description: "Se detectó una cláusula de penalización que podría ser excesiva.",
    suggestion: "Considera negociar una penalización más razonable (10-15%) o escalonada.",
  },
  {
    pattern: /cede.*todos.*derechos|cesión.*total.*irrevocable/gi,
    title: "Cesión total de derechos",
    risk: "high" as const,
    description: "El contrato transfiere todos los derechos sin límites.",
    suggestion: "Limita la cesión al proyecto específico o negocia una licencia de uso.",
  },
  {
    pattern: /exclusividad.*indefinid|no.*competencia.*sin.*límite/gi,
    title: "Exclusividad sin límite temporal",
    risk: "high" as const,
    description: "La cláusula de exclusividad no tiene fecha de fin.",
    suggestion: "Establece un período máximo de exclusividad (6-12 meses).",
  },
  {
    pattern: /pago.*(\d{2,}\s*días|60.*días|90.*días)/gi,
    title: "Plazo de pago extenso",
    risk: "medium" as const,
    description: "El plazo de pago es superior al estándar del mercado.",
    suggestion: "Negocia pago a 30 días o establece pagos parciales.",
  },
  {
    pattern: /confidencialidad.*unilateral|solo.*prestador.*confidencial/gi,
    title: "Confidencialidad unidireccional",
    risk: "medium" as const,
    description: "Solo una parte está obligada a mantener confidencialidad.",
    suggestion: "Añade una cláusula de confidencialidad bidireccional.",
  },
  {
    pattern: /modificar.*unilateralmente|cambios.*sin.*notificación/gi,
    title: "Modificaciones unilaterales",
    risk: "medium" as const,
    description: "Una parte puede modificar el contrato sin consentimiento.",
    suggestion: "Requiere que cualquier modificación sea acordada por ambas partes.",
  },
  {
    pattern: /responsabilidad.*ilimitada|indemnizar.*sin.*límite/gi,
    title: "Responsabilidad ilimitada",
    risk: "high" as const,
    description: "No hay límite en la responsabilidad que asumes.",
    suggestion: "Establece un límite de responsabilidad (ej: valor del contrato).",
  },
  {
    pattern: /jurisdicción|tribunales|juzgados/gi,
    title: "Jurisdicción especificada",
    risk: "info" as const,
    description: "El contrato especifica la jurisdicción aplicable.",
    suggestion: "Verifica que la jurisdicción te sea conveniente.",
  },
  {
    pattern: /propiedad.*intelectual.*cliente|derechos.*autor.*transferidos/gi,
    title: "Transferencia de propiedad intelectual",
    risk: "low" as const,
    description: "Se transfieren derechos de propiedad intelectual.",
    suggestion: "Asegúrate de que la transferencia es justa y después del pago completo.",
  },
];

export function analyzeContract(content: string) {
  const results: Array<{
    id: number;
    title: string;
    description: string;
    clause: string;
    risk: "high" | "medium" | "low" | "info";
    suggestion: string;
  }> = [];

  let id = 1;
  for (const pattern of riskPatterns) {
    const matches = content.match(pattern.pattern);
    if (matches) {
      // Find the sentence containing the match
      const sentences = content.split(/[.!?]+/);
      const matchingSentence = sentences.find((s) =>
        pattern.pattern.test(s)
      );

      results.push({
        id: id++,
        title: pattern.title,
        description: pattern.description,
        clause: matchingSentence?.trim() || matches[0],
        risk: pattern.risk,
        suggestion: pattern.suggestion,
      });
    }
  }

  // If no specific issues found, add a general positive note
  if (results.length === 0) {
    results.push({
      id: 1,
      title: "Contrato revisado",
      description: "No se detectaron cláusulas de alto riesgo en el análisis automático.",
      clause: "El documento ha sido analizado completamente.",
      risk: "info",
      suggestion: "Aunque el análisis automático no detectó problemas, siempre es recomendable una revisión legal profesional para contratos importantes.",
    });
  }

  // Calculate risk score
  const highRisk = results.filter((r) => r.risk === "high").length;
  const mediumRisk = results.filter((r) => r.risk === "medium").length;
  const lowRisk = results.filter((r) => r.risk === "low").length;

  const score = Math.max(0, Math.min(100, 100 - highRisk * 20 - mediumRisk * 10 - lowRisk * 5));

  return { results, score };
}
