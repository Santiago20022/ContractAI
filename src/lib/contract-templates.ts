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

I. Que EL CLIENTE está interesado en contratar los servicios profesionales de EL PRESTADOR, quien cuenta con la experiencia, conocimientos y medios necesarios para llevar a cabo dichos servicios.

II. Que EL PRESTADOR ha evaluado los requerimientos de EL CLIENTE y se encuentra en condiciones de prestar los servicios solicitados en los términos aquí establecidos.

Por lo anterior, ambas partes acuerdan celebrar el presente CONTRATO DE PRESTACIÓN DE SERVICIOS, que se regirá por las siguientes:

                             CLÁUSULAS

PRIMERA.- OBJETO DEL CONTRATO
${data.description || "EL PRESTADOR se compromete a realizar los servicios profesionales acordados, aplicando sus conocimientos y experiencia para lograr los objetivos establecidos por EL CLIENTE."}

El alcance detallado de los servicios, los entregables específicos y los criterios de aceptación quedarán definidos en el Anexo Técnico que forma parte integral del presente contrato. Cualquier servicio no comprendido en dicho alcance constituirá un cambio de alcance sujeto a la cláusula correspondiente.

SEGUNDA.- DURACIÓN
El presente contrato tendrá una duración de ${data.duration || "[DURACIÓN ACORDADA]"}, comenzando a partir de la fecha de firma del presente documento. Podrá ser prorrogado por períodos iguales de mutuo acuerdo entre las partes, siempre que la solicitud de prórroga se comunique con un mínimo de quince (15) días de antelación al vencimiento.

TERCERA.- HONORARIOS Y FORMA DE PAGO
Como contraprestación por los servicios prestados, EL CLIENTE abonará a EL PRESTADOR la cantidad de ${data.amount || "[CANTIDAD ACORDADA]"}.

El pago se realizará de la siguiente forma:
• 50% al inicio del proyecto, como anticipo no reembolsable en caso de desistimiento imputable a EL CLIENTE.
• 50% a la entrega y aceptación formal de los entregables finales.

Los pagos se realizarán mediante transferencia bancaria a la cuenta indicada por EL PRESTADOR. En caso de mora, se aplicará un interés mensual equivalente a la tasa de interés de referencia vigente más dos (2) puntos porcentuales, sin necesidad de requerimiento previo.

EL PRESTADOR emitirá la factura correspondiente con cinco (5) días hábiles de antelación a la fecha de pago. EL CLIENTE tendrá un plazo de tres (3) días hábiles para manifestar cualquier objeción fundada; de lo contrario, se entenderá que la factura es conforme.

CUARTA.- GARANTÍA DE CALIDAD
EL PRESTADOR garantiza que los servicios serán prestados con diligencia profesional y que los entregables se ajustarán a las especificaciones acordadas. En caso de que EL CLIENTE identifique defectos o incumplimientos dentro de los quince (15) días siguientes a la entrega, EL PRESTADOR se compromete a subsanarlos sin costo adicional dentro de un plazo razonable. Esta garantía no cubre modificaciones solicitadas por EL CLIENTE con posterioridad a la aceptación, ni defectos derivados de información incorrecta o incompleta proporcionada por EL CLIENTE.

QUINTA.- PROCEDIMIENTO PARA CAMBIOS DE ALCANCE
Cualquier modificación al alcance definido en la cláusula primera deberá tramitarse mediante una "Solicitud de Cambio" por escrito. EL PRESTADOR evaluará el impacto en plazo y costo dentro de cinco (5) días hábiles de recibida la solicitud. El cambio solo será ejecutado una vez que ambas partes hayan suscrito el correspondiente addendum al contrato. Ningún cambio verbal será vinculante.

SEXTA.- OBLIGACIONES DEL PRESTADOR
EL PRESTADOR se compromete a:
a) Ejecutar los servicios objeto de este contrato con la máxima diligencia y profesionalidad, cumpliendo las normas técnicas aplicables.
b) Mantener informado a EL CLIENTE sobre el progreso de los trabajos mediante informes periódicos o reuniones de seguimiento acordadas.
c) Cumplir con los plazos acordados, comunicando con la mayor antelación posible cualquier circunstancia que pudiera afectarlos.
d) Guardar estricta confidencialidad sobre toda información relacionada con EL CLIENTE, sus negocios y sus clientes.
e) No subcontratar los servicios sin autorización previa y por escrito de EL CLIENTE.
f) Contar con los seguros de responsabilidad civil profesional que sean aplicables a la naturaleza de los servicios.

SÉPTIMA.- OBLIGACIONES DEL CLIENTE
EL CLIENTE se compromete a:
a) Proporcionar toda la información, accesos y materiales necesarios para la correcta ejecución de los servicios en los plazos acordados.
b) Realizar los pagos en los términos establecidos en la cláusula tercera.
c) Comunicar de forma clara, oportuna y por escrito cualquier cambio en los requisitos, siguiendo el procedimiento de cambios de alcance.
d) Designar un responsable del proyecto con capacidad de decisión para la interlocución con EL PRESTADOR.
e) Revisar y aprobar los entregables dentro de los plazos acordados. La ausencia de respuesta dentro de los diez (10) días hábiles siguientes a la entrega se considerará aprobación tácita.

OCTAVA.- PROPIEDAD INTELECTUAL
Los derechos de propiedad intelectual sobre los entregables desarrollados específicamente para EL CLIENTE en virtud de este contrato serán cedidos a EL CLIENTE de forma no exclusiva, una vez recibido el pago total acordado. Hasta ese momento, EL PRESTADOR conserva todos los derechos.

EL PRESTADOR retiene en todo caso la titularidad sobre:
a) Metodologías, herramientas, frameworks y conocimiento preexistente utilizado en la ejecución.
b) Módulos o componentes de uso genérico no desarrollados específicamente para este contrato.

EL PRESTADOR podrá referenciar los trabajos realizados en su portfolio y material comercial, salvo que EL CLIENTE solicite expresamente lo contrario mediante comunicación escrita.

NOVENA.- CONFIDENCIALIDAD
Ambas partes se comprometen a mantener estricta confidencialidad sobre toda la información no pública intercambiada durante la vigencia del presente contrato y durante los dos (2) años posteriores a su terminación. Esta obligación se extiende a datos, documentos, métodos, procedimientos, estrategias comerciales y know-how. No se considerará confidencial la información que sea de dominio público, que ya obrara en poder de la parte receptora antes de la firma, o cuya divulgación sea ordenada por autoridad competente.

DÉCIMA.- RESOLUCIÓN DEL CONTRATO
Cualquiera de las partes podrá resolver el presente contrato mediante notificación escrita con un preaviso mínimo de quince (15) días naturales. En caso de resolución anticipada:
a) Por causa imputable a EL CLIENTE: EL CLIENTE deberá abonar los servicios efectivamente prestados hasta la fecha de resolución, más una indemnización equivalente al 20% del importe pendiente de ejecutar.
b) Por causa imputable a EL PRESTADOR: EL PRESTADOR reembolsará la parte proporcional de los honorarios ya cobrados por servicios no prestados.

Cualquier parte podrá resolver el contrato de forma inmediata y sin penalización en caso de incumplimiento material de la otra parte que no sea subsanado dentro de los diez (10) días siguientes a la notificación escrita del incumplimiento.

DECIMOPRIMERA.- MODIFICACIONES
Cualquier modificación del presente contrato, distinta a los cambios de alcance regulados en la cláusula quinta, deberá realizarse por escrito y ser firmada por ambas partes. Ninguna comunicación verbal o por medios informales tendrá efecto modificatorio.

DECIMOSEGUNDA.- RESOLUCIÓN DE DISPUTAS
Las partes se comprometen a resolver cualquier controversia derivada de este contrato mediante el siguiente procedimiento escalonado:
1. Negociación directa: las partes designarán representantes con poder de decisión que se reunirán dentro de los diez (10) días siguientes a la notificación de la controversia.
2. Mediación: si no se alcanza acuerdo en quince (15) días, cualquier parte podrá solicitar mediación ante un centro de mediación reconocido.
3. Arbitraje o jurisdicción ordinaria: si la mediación fracasa, las partes se someterán a lo dispuesto en la cláusula de jurisdicción.

${data.additionalClauses ? `DECIMOTERCERA.- CLÁUSULAS ADICIONALES\n${data.additionalClauses}\n\n` : ""}DECIMOTERCER${data.additionalClauses ? "A (CONT.)" : "A"}.- LEGISLACIÓN APLICABLE Y JURISDICCIÓN
El presente contrato se regirá e interpretará de acuerdo con la legislación vigente en el lugar de firma. Para cualquier controversia no resuelta conforme al procedimiento establecido, las partes se someten a los Juzgados y Tribunales de ${data.city || "[Ciudad]"}, renunciando a cualquier otro fuero que pudiera corresponderles.

Y en prueba de conformidad, firman el presente contrato por duplicado y a un solo efecto.


_____________________________              _____________________________
        EL PRESTADOR                              EL CLIENTE
    ${data.partyA || "[Firma]"}                         ${data.partyB || "[Firma]"}


DNI/NIF/RFC: _______________              DNI/NIF/RFC: _______________
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

I. Que LAS PARTES desean explorar una posible relación comercial o de colaboración que requerirá el intercambio de información confidencial y sensible.

II. Que LAS PARTES tienen un interés legítimo en proteger dicha información y establecer con claridad los términos, obligaciones y remedios aplicables a su intercambio.

Por lo anterior, LAS PARTES acuerdan celebrar el presente ACUERDO DE CONFIDENCIALIDAD conforme a las siguientes:

                             CLÁUSULAS

PRIMERA.- DEFINICIÓN DE INFORMACIÓN CONFIDENCIAL
Se considerará "Información Confidencial" toda información, dato o material que LA PARTE DIVULGADORA comparta con LA PARTE RECEPTORA, directa o indirectamente, en cualquier formato (oral, escrito, gráfico, digital, magnético u otro), que incluye pero no se limita a:
${data.description || `• Información técnica: diseños, planos, prototipos, especificaciones, código fuente, algoritmos, arquitecturas de sistemas y documentación técnica.
• Información comercial y financiera: estados financieros, proyecciones, precios, márgenes, estrategias de mercado, planes de expansión y modelos de negocio.
• Información de clientes y proveedores: bases de datos, contratos, condiciones comerciales e historial de transacciones.
• Propiedad intelectual: patentes (solicitadas o no), marcas, secretos industriales, know-how y metodologías propietarias.
• Información de personal: datos de empleados, estructuras organizacionales, políticas de compensación y planes de recursos humanos.
• Cualquier información expresamente designada como "confidencial" o "reservada", independientemente del soporte en que conste.`}

Para evitar dudas, también se considerará Información Confidencial toda aquella que, por su naturaleza o por las circunstancias de su divulgación, una persona razonable entendería que debe ser tratada como confidencial, aunque no esté expresamente marcada como tal.

SEGUNDA.- OBLIGACIONES DE CONFIDENCIALIDAD
LA PARTE RECEPTORA se compromete a:
a) Mantener la Información Confidencial en estricta reserva, aplicando medidas de seguridad razonables y al menos equivalentes a las que utiliza para proteger su propia información confidencial de similar importancia.
b) No divulgar, publicar, transferir ni poner a disposición de terceros la Información Confidencial sin autorización previa y por escrito de LA PARTE DIVULGADORA.
c) Utilizar la Información Confidencial exclusivamente para los fines descritos en el presente acuerdo y en ningún caso en beneficio propio o de terceros fuera de dicho propósito.
d) Limitar el acceso a la Información Confidencial a sus empleados, directivos o asesores que tengan necesidad de conocerla para los fines acordados y que estén sujetos a obligaciones de confidencialidad al menos equivalentes a las de este acuerdo.
e) Notificar de forma inmediata a LA PARTE DIVULGADORA cualquier divulgación no autorizada o brecha de seguridad que afecte a la Información Confidencial, tomando las medidas correctivas necesarias.
f) No reproducir, copiar ni duplicar la Información Confidencial más allá de lo estrictamente necesario para los fines de este acuerdo.

TERCERA.- EXCEPCIONES
Las obligaciones de confidencialidad no se aplicarán a la información que LA PARTE RECEPTORA pueda demostrar fehacientemente que:
a) Era de dominio público en el momento de su divulgación o que posteriormente pasó a serlo sin incumplimiento del presente acuerdo por parte de LA PARTE RECEPTORA.
b) Estaba ya en posesión legítima de LA PARTE RECEPTORA con anterioridad a la fecha de firma de este acuerdo, acreditada mediante documentos con fecha cierta.
c) Fue recibida de un tercero que, a su vez, no estaba sujeto a obligación de confidencialidad alguna respecto de dicha información.
d) Fue desarrollada de forma independiente por LA PARTE RECEPTORA sin uso ni referencia a la Información Confidencial, acreditado mediante documentación interna fechada.
e) Debe ser divulgada por imperativo legal, orden judicial o requerimiento de autoridad regulatoria competente, en cuyo caso LA PARTE RECEPTORA notificará a LA PARTE DIVULGADORA con la mayor antelación posible para que pueda adoptar las medidas legales oportunas, y solo revelará la cantidad mínima de información necesaria.

CUARTA.- DURACIÓN
Este acuerdo tendrá una duración de ${data.duration || "dos (2) años"} a partir de la fecha de su firma. Las obligaciones de confidencialidad establecidas en la cláusula segunda sobrevivirán a la terminación o vencimiento del presente acuerdo por un período adicional de tres (3) años, independientemente de la causa de terminación.

QUINTA.- DEVOLUCIÓN Y DESTRUCCIÓN DE INFORMACIÓN
A la terminación o vencimiento de este acuerdo, o en cualquier momento a requerimiento escrito de LA PARTE DIVULGADORA, LA PARTE RECEPTORA deberá, a su elección:
a) Devolver a LA PARTE DIVULGADORA toda la Información Confidencial recibida, incluyendo cualquier copia, resumen, análisis, nota o documento derivado, en el plazo de cinco (5) días hábiles.
b) Destruir de forma segura e irreversible dicha información y certificar por escrito dicha destrucción a LA PARTE DIVULGADORA.

Lo anterior no afectará a las copias de seguridad que LA PARTE RECEPTORA esté obligada a conservar por razones legales o regulatorias, las cuales seguirán sujetas a las obligaciones de confidencialidad del presente acuerdo.

SEXTA.- PROPIEDAD DE LA INFORMACIÓN
Toda la Información Confidencial seguirá siendo propiedad exclusiva de LA PARTE DIVULGADORA. El presente acuerdo no otorga a LA PARTE RECEPTORA ningún derecho de propiedad, licencia, franquicia ni ningún otro derecho sobre la Información Confidencial o sobre la propiedad intelectual de LA PARTE DIVULGADORA. La divulgación de Información Confidencial no implica ninguna representación, garantía ni compromiso de celebrar contrato alguno entre LAS PARTES.

SÉPTIMA.- REMEDIOS POR INCUMPLIMIENTO
LAS PARTES reconocen que el incumplimiento de las obligaciones de confidencialidad puede causar daños irreparables a LA PARTE DIVULGADORA, que no podrían ser adecuadamente compensados mediante una indemnización económica. Por ello, en caso de incumplimiento o amenaza de incumplimiento, LA PARTE DIVULGADORA tendrá derecho a:
a) Solicitar medidas cautelares urgentes, incluyendo órdenes de cesación o medidas de no divulgación, ante los tribunales competentes sin necesidad de prestar fianza adicional.
b) Exigir el cumplimiento específico de las obligaciones pactadas.
c) Reclamar indemnización por los daños y perjuicios efectivamente causados, incluyendo daño emergente, lucro cesante y daño reputacional, sin perjuicio de las acciones anteriores.

El ejercicio de cualquiera de estos remedios no excluirá el ejercicio de los demás.

${data.additionalClauses ? `OCTAVA.- CLÁUSULAS ADICIONALES\n${data.additionalClauses}\n\n` : ""}OCTAVA${data.additionalClauses ? " (CONT.)" : ""}.- LEGISLACIÓN APLICABLE Y JURISDICCIÓN
El presente acuerdo se regirá e interpretará conforme a la legislación vigente en ${data.city || "[Ciudad]"}. Para cualquier controversia derivada del presente acuerdo que no pueda resolverse amigablemente, LAS PARTES se someten a la jurisdicción exclusiva de los Juzgados y Tribunales de ${data.city || "[Ciudad]"}, con renuncia a cualquier otro fuero.

Y en prueba de conformidad, firman el presente acuerdo por duplicado y a un solo efecto.


_____________________________              _____________________________
    LA PARTE DIVULGADORA                      LA PARTE RECEPTORA
    ${data.partyA || "[Firma]"}                         ${data.partyB || "[Firma]"}


DNI/NIF/RFC: _______________              DNI/NIF/RFC: _______________
`.trim(),

  employment: (data) => `
═══════════════════════════════════════════════════════════════
                    CONTRATO DE TRABAJO
═══════════════════════════════════════════════════════════════

En ${data.city || "[Ciudad]"}, a ${data.date || formatDate()}

                              REUNIDOS

De una parte, ${data.partyA || "[NOMBRE DE LA EMPRESA]"}, con domicilio en [DIRECCIÓN], y RFC/NIF [RFC], representada por [REPRESENTANTE], en adelante "LA EMPRESA".

De otra parte, ${data.partyB || "[NOMBRE DEL TRABAJADOR]"}, con documento de identidad [DNI/CURP/CC] número [NÚMERO] y domicilio en [DIRECCIÓN], en adelante "EL TRABAJADOR".

                              MANIFIESTAN

I. Que LA EMPRESA es una entidad legalmente constituida que requiere los servicios del perfil profesional que reúne EL TRABAJADOR.

II. Que EL TRABAJADOR declara tener la capacidad, formación y habilitaciones necesarias para desempeñar el puesto al que es contratado, y acepta las condiciones aquí establecidas libremente y sin coacción.

Por lo anterior, ambas partes acuerdan celebrar el presente CONTRATO DE TRABAJO conforme a las siguientes:

                             CLÁUSULAS

PRIMERA.- OBJETO Y FUNCIONES
${data.description || "EL TRABAJADOR prestará sus servicios profesionales en el puesto de [PUESTO / CARGO], realizando las funciones propias de dicha categoría profesional descritas en el Anexo de Funciones adjunto."}

LA EMPRESA podrá encomendar a EL TRABAJADOR otras funciones relacionadas con su categoría profesional, previa comunicación razonada y sin que ello suponga una modificación sustancial de las condiciones de trabajo.

SEGUNDA.- DURACIÓN Y PERÍODO DE PRUEBA
El presente contrato tendrá una duración ${data.duration || "indefinida"}, comenzando a surtir efectos desde la fecha de su firma.

Se establece un período de prueba de [PERÍODO — ej: 90 días], durante el cual cualquiera de las partes podrá resolver el contrato sin expresión de causa y sin derecho a indemnización, salvo los salarios devengados. Superado dicho período, el trabajador adquirirá la condición de empleado con todos los derechos y obligaciones que correspondan conforme a la normativa laboral aplicable.

TERCERA.- JORNADA LABORAL Y LUGAR DE TRABAJO
La jornada ordinaria de trabajo será de [HORAS] horas semanales, distribuidas de [DÍA] a [DÍA], en horario de [HORA ENTRADA] a [HORA SALIDA], con un descanso de [DURACIÓN] para el almuerzo.

El trabajo se prestará de forma [presencial / remota / híbrida] en [DIRECCIÓN DEL CENTRO DE TRABAJO / modalidad acordada]. Cualquier cambio en la modalidad o el lugar de trabajo requerirá acuerdo mutuo por escrito.

Las horas extraordinarias deberán ser autorizadas previamente por LA EMPRESA y serán compensadas conforme a la legislación laboral vigente o mediante descanso equivalente a acordar entre las partes.

CUARTA.- RETRIBUCIÓN
EL TRABAJADOR percibirá una retribución bruta [anual/mensual] de ${data.amount || "[CANTIDAD]"}, pagadera en [12/14] mensualidades, mediante transferencia bancaria dentro de los primeros [5] días hábiles de cada mes.

Esta retribución incluye:
• Salario base: [IMPORTE]
• Complementos: [DETALLE, si aplica]
• Beneficios adicionales: [DETALLE, si aplica]

La retribución será revisada anualmente conforme al índice de precios al consumo (IPC) o al desempeño, según la política salarial de LA EMPRESA vigente en cada momento.

QUINTA.- BENEFICIOS LABORALES
EL TRABAJADOR tendrá derecho a los siguientes beneficios:
a) Vacaciones: [15 / 20 / 30] días hábiles de vacaciones anuales retribuidas, o la parte proporcional en el año de incorporación o cese. Las fechas de disfrute serán acordadas entre las partes con al menos treinta (30) días de antelación.
b) Días de descanso: los días festivos oficiales del lugar de trabajo y los descansos semanales establecidos por ley.
c) Permisos retribuidos: conforme a la legislación laboral aplicable (enfermedad, maternidad/paternidad, fallecimiento de familiar, etc.).
d) Seguridad social: LA EMPRESA dará de alta a EL TRABAJADOR en el régimen de seguridad social que corresponda y realizará las cotizaciones que exija la normativa vigente.
e) [Beneficios adicionales: seguro médico / bono de transporte / formación / otros, si aplican]

SEXTA.- OBLIGACIONES DEL TRABAJADOR
EL TRABAJADOR se compromete a:
a) Cumplir con las obligaciones de su puesto de trabajo con diligencia, buena fe y lealtad hacia LA EMPRESA.
b) Observar y promover las medidas de seguridad, salud e higiene establecidas por LA EMPRESA y por la normativa vigente.
c) Guardar estricta confidencialidad sobre la información de LA EMPRESA, sus clientes, estrategias y operaciones, tanto durante la vigencia del contrato como durante los dos (2) años posteriores a su terminación.
d) No realizar actividades que supongan competencia desleal o conflicto de intereses con LA EMPRESA, ni utilizar recursos de la empresa para fines personales o ajenos a sus funciones.
e) Comunicar de forma inmediata cualquier situación que pudiera afectar al desempeño de sus funciones o suponer un conflicto de interés.
f) Devolver a LA EMPRESA, al cese de la relación laboral, todos los equipos, documentos, credenciales de acceso y demás bienes que le hubieran sido entregados.

SÉPTIMA.- OBLIGACIONES DE LA EMPRESA
LA EMPRESA se compromete a:
a) Abonar la retribución acordada en los plazos y forma establecidos.
b) Garantizar un entorno de trabajo seguro, respetuoso y libre de acoso o discriminación.
c) Proporcionar a EL TRABAJADOR los medios y herramientas necesarios para el desempeño de sus funciones.
d) Cumplir con todas las obligaciones laborales y de seguridad social establecidas por la legislación vigente.
e) Facilitar la formación continua necesaria para el adecuado desempeño del puesto.

OCTAVA.- PROPIEDAD INTELECTUAL
Todo trabajo, desarrollo, creación o invención que EL TRABAJADOR realice en el ejercicio de sus funciones o con recursos de LA EMPRESA durante la vigencia de este contrato será considerado obra por encargo y pertenecerá en exclusiva a LA EMPRESA. EL TRABAJADOR cede a LA EMPRESA todos los derechos de explotación sobre dichas creaciones, sin derecho a remuneración adicional salvo pacto expreso en contrario.

NOVENA.- PROCESO DE TERMINACIÓN DEL CONTRATO
La relación laboral podrá extinguirse por las causas y con los efectos previstos en la legislación laboral aplicable. En caso de:
a) Terminación por decisión de LA EMPRESA sin causa justificada: LA EMPRESA deberá notificar con un preaviso de [30] días o abonar la parte proporcional de dicho preaviso, más la indemnización que corresponda conforme a ley.
b) Renuncia voluntaria de EL TRABAJADOR: EL TRABAJADOR deberá notificar con un preaviso de [15] días, salvo acuerdo en contrario. El incumplimiento del preaviso facultará a LA EMPRESA a descontar los días no preavisados del finiquito.
c) Terminación por causa disciplinaria: LA EMPRESA seguirá el procedimiento establecido en la normativa laboral, garantizando el derecho de defensa de EL TRABAJADOR.

Al cese de la relación laboral, LA EMPRESA entregará a EL TRABAJADOR, en el plazo que exija la ley, el finiquito correspondiente y los documentos necesarios para ejercer sus derechos de seguridad social.

DÉCIMA.- CONFIDENCIALIDAD POST-EMPLEO
EL TRABAJADOR se obliga, durante el plazo de dos (2) años a partir de la extinción del contrato, a:
a) No divulgar ni utilizar en beneficio propio o de terceros información confidencial de LA EMPRESA adquirida durante la relación laboral.
b) No solicitar ni contratar a los empleados de LA EMPRESA, ni inducirlos a abandonar la empresa.
c) [En caso de pacto de no competencia post-contractual, deberá pactarse expresamente con compensación económica adecuada conforme a la legislación aplicable.]

DECIMOPRIMERA.- PROTECCIÓN DE DATOS
LA EMPRESA tratará los datos personales de EL TRABAJADOR conforme a la normativa vigente en materia de protección de datos y únicamente para la gestión de la relación laboral. EL TRABAJADOR será informado de sus derechos de acceso, rectificación, supresión y oposición conforme a dicha normativa.

${data.additionalClauses ? `DECIMOSEGUNDA.- CLÁUSULAS ADICIONALES\n${data.additionalClauses}\n\n` : ""}DECIMOSEGUND${data.additionalClauses ? "A (CONT.)" : "A"}.- LEGISLACIÓN APLICABLE Y JURISDICCIÓN
El presente contrato se regirá por la legislación laboral vigente en ${data.city || "[Ciudad]"} y las demás normas aplicables. Para cualquier controversia, las partes se someten a los tribunales laborales de ${data.city || "[Ciudad]"}, sin perjuicio del derecho de EL TRABAJADOR a acudir a las instancias administrativas laborales competentes.

Y en prueba de conformidad, firman el presente contrato por duplicado y a un solo efecto.


_____________________________              _____________________________
        LA EMPRESA                            EL TRABAJADOR
    ${data.partyA || "[Firma]"}                         ${data.partyB || "[Firma]"}


Cargo/Representante: _________       DNI/CURP/CC: ________________
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
