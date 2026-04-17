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
                ACUERDO DE SOCIOS Y FUNDADORES
═══════════════════════════════════════════════════════════════

En ${data.city || "la ciudad acordada"}, a ${data.date || formatDate()}

                              REUNIDOS

De una parte, ${data.partyA || "Socio Fundador A"}, mayor de edad, con plena capacidad legal, en adelante "SOCIO A" o "EL FUNDADOR A".

De otra parte, ${data.partyB || "Socio Fundador B"}, mayor de edad, con plena capacidad legal, en adelante "SOCIO B" o "EL FUNDADOR B".

Conjuntamente denominados "LOS SOCIOS" o "LOS FUNDADORES".

                              EXPONEN

I. Que LOS SOCIOS comparten la visión de construir un proyecto empresarial sostenible y desean formalizar su relación mediante el presente acuerdo, que establece con claridad sus derechos, obligaciones y mecanismos de gobierno.

II. Que LOS SOCIOS han decidido unir sus capacidades, conocimientos y recursos para ${data.description || "desarrollar y operar conjuntamente un proyecto empresarial con vocación de crecimiento"}.

III. Que LOS SOCIOS actúan de buena fe y convienen que este acuerdo prevalecerá sobre cualquier entendimiento verbal previo.

Por lo anterior, LOS SOCIOS acuerdan celebrar el presente ACUERDO DE SOCIOS Y FUNDADORES, que se regirá por las siguientes:

                             CLÁUSULAS

PRIMERA.- OBJETO Y PROPÓSITO DEL NEGOCIO
El objeto del presente acuerdo es regular la relación entre LOS SOCIOS en el marco del siguiente proyecto empresarial:

${data.description || "Desarrollo, comercialización y operación del proyecto empresarial acordado entre las partes, incluyendo todas las actividades necesarias para su puesta en marcha, escalamiento y sostenibilidad."}

Cualquier expansión del objeto hacia nuevas líneas de negocio o mercados requerirá acuerdo unánime y escrito de LOS SOCIOS.

SEGUNDA.- PARTICIPACIONES Y VALORACIÓN INICIAL
La participación de cada socio en el proyecto es la siguiente:

• ${data.partyA || "SOCIO A"}: 50% de participación
• ${data.partyB || "SOCIO B"}: 50% de participación

La valoración inicial acordada del proyecto para los efectos del presente acuerdo es de ${data.amount || "la cantidad que LOS SOCIOS acuerden por escrito"}.

Cualquier emisión de nuevas participaciones o incorporación de nuevos socios requerirá aprobación unánime y se realizará conforme al procedimiento establecido en la cláusula de dilución.

TERCERA.- DURACIÓN
El presente acuerdo tendrá una duración ${data.duration || "indefinida"}, y estará vigente mientras cualquiera de LOS SOCIOS mantenga participación en el proyecto. El acuerdo podrá modificarse por consenso escrito de todas las partes.

CUARTA.- VESTING Y MADURACIÓN DE PARTICIPACIONES
Con el fin de proteger el proyecto y alinear los incentivos a largo plazo, las participaciones de LOS SOCIOS estarán sujetas a un esquema de maduración (vesting) de cuatro (4) años con un período de carencia (cliff) de doce (12) meses, en los siguientes términos:

a) Durante los primeros doce (12) meses, ningún socio tendrá participaciones maduras. Si un socio abandona el proyecto antes de cumplir el cliff, no conservará participaciones.
b) Al cumplirse los doce (12) meses, el 25% de las participaciones de cada socio quedarán maduras de forma inmediata.
c) El 75% restante madurarán linealmente durante los siguientes treinta y seis (36) meses (aproximadamente 2.08% mensual).
d) Las participaciones maduras no estarán sujetas a recompra obligatoria, salvo lo dispuesto en la cláusula de salida.

QUINTA.- ROLES, RESPONSABILIDADES Y DEDICACIÓN
LOS SOCIOS asumirán los siguientes roles iniciales, que podrán modificarse por acuerdo mutuo:

• ${data.partyA || "SOCIO A"}: Responsable de [área: operaciones/producto/tecnología/comercial].
• ${data.partyB || "SOCIO B"}: Responsable de [área: operaciones/producto/tecnología/comercial].

Cada socio se compromete a dedicar al proyecto un mínimo del tiempo y energía necesarios para el cumplimiento de sus responsabilidades. La dedicación mínima equivalente a tiempo completo será obligatoria salvo acuerdo expreso en contrario.

SEXTA.- GOBIERNO Y TOMA DE DECISIONES
Las decisiones del proyecto se clasificarán en:

a) Decisiones operativas: aquellas necesarias para el funcionamiento diario del negocio dentro del área de responsabilidad de cada socio, que cada uno podrá tomar de forma autónoma hasta un límite de gasto de [definir importe].

b) Decisiones ordinarias: aquellas que superen el límite operativo pero no sean estratégicas, que requerirán acuerdo de mayoría simple de los socios.

c) Decisiones estratégicas (unanimidad requerida):
• Emisión de nuevas participaciones o incorporación de nuevos socios.
• Modificación del objeto social o del presente acuerdo.
• Contratación de deuda financiera superior a [importe].
• Venta total o parcial del negocio o de activos esenciales.
• Nombramiento o destitución del CEO o representante legal.
• Distribución de dividendos o reinversión de beneficios.
• Apertura de filiales, sucursales o nuevas jurisdicciones.

SÉPTIMA.- APORTACIONES DE CAPITAL Y FINANCIACIÓN
Las aportaciones iniciales de capital de cada socio serán las siguientes:

• ${data.partyA || "SOCIO A"}: [Monto en efectivo / activos / trabajo valorado en]
• ${data.partyB || "SOCIO B"}: [Monto en efectivo / activos / trabajo valorado en]

Las necesidades adicionales de financiación podrán cubrirse mediante:
a) Aportaciones adicionales proporcionales de LOS SOCIOS, con derecho preferente para mantener su participación.
b) Financiación externa (deuda o capital), bajo acuerdo unánime.
c) Si un socio no puede o no desea aportar en una ronda adicional, su participación podrá diluirse conforme al acuerdo correspondiente.

OCTAVA.- RETRIBUCIÓN DE LOS SOCIOS
LOS SOCIOS podrán acordar una retribución o salario en concepto de dedicación al proyecto una vez que el negocio genere ingresos suficientes para sostenerlo. Dicha retribución será acordada por unanimidad y revisada anualmente.

Mientras no se acuerde retribución, los gastos personales directamente incurridos en el desarrollo del negocio serán reembolsados previa presentación de justificante y aprobación del otro socio.

NOVENA.- REPARTO DE BENEFICIOS Y DIVIDENDOS
Los beneficios netos del negocio se repartirán entre LOS SOCIOS de forma proporcional a sus participaciones, previa decisión unánime sobre el porcentaje a distribuir y la cantidad a reinvertir en el crecimiento del negocio.

Los dividendos no podrán repartirse si suponen comprometer la liquidez operativa necesaria para los próximos seis (6) meses de operación.

DÉCIMA.- PROPIEDAD INTELECTUAL
Toda la propiedad intelectual desarrollada por LOS SOCIOS en el marco del proyecto pertenecerá conjuntamente al negocio y no a los socios a título individual. LOS SOCIOS ceden al proyecto todos los derechos sobre los desarrollos, creaciones y know-how generados durante su participación activa.

Si un socio abandona el proyecto, no podrá llevarse ni utilizar la propiedad intelectual desarrollada durante su participación, más allá de lo que acuerden las partes al momento de la salida.

DECIMOPRIMERA.- CONFIDENCIALIDAD Y NO COMPETENCIA
Durante la vigencia del presente acuerdo y por un período de dos (2) años desde la salida de cualquier socio:

a) Cada socio mantendrá estricta confidencialidad sobre la información estratégica, financiera, técnica y comercial del proyecto.
b) Ningún socio participará directa o indirectamente en negocios que compitan directamente con el objeto del proyecto sin autorización escrita del otro socio.
c) Ningún socio captará empleados, clientes o proveedores estratégicos del proyecto para su propio beneficio o de terceros.

DECIMOSEGUNDA.- DERECHOS DE PREFERENCIA Y TRANSFERENCIA DE PARTICIPACIONES
Ningún socio podrá transferir su participación o parte de ella a terceros sin cumplir el siguiente procedimiento:

a) Derecho de Primera Oferta: el socio que desee vender deberá notificar al otro socio las condiciones de la venta propuesta. El otro socio tendrá un plazo de quince (15) días hábiles para igualar la oferta.
b) Derecho de Acompañamiento (Tag-Along): si un socio vende a un tercero, el otro socio tendrá derecho a vender su participación en las mismas condiciones.
c) Derecho de Arrastre (Drag-Along): si un socio recibe una oferta de adquisición del 100% del negocio, podrá obligar al otro socio a vender en las mismas condiciones si la mayoría de las participaciones así lo aprueba.

DECIMOTERCERA.- SALIDA DE UN SOCIO
En caso de que un socio decida abandonar el proyecto voluntariamente, sea separado por causa grave, fallezca o quede incapacitado:

a) Las participaciones no maduras conforme al esquema de vesting quedarán en el proyecto y no serán conservadas por el socio saliente.
b) Las participaciones maduras podrán ser adquiridas por el socio restante o por el proyecto al precio justo de mercado, a determinar por un auditor independiente si las partes no llegan a acuerdo en quince (15) días.
c) Se considerará causa grave de separación: incumplimiento reiterado de las obligaciones del presente acuerdo, apropiación indebida de fondos del proyecto, y conducta que perjudique gravemente la reputación del negocio.

DECIMOCUARTA.- RESOLUCIÓN DE CONFLICTOS ENTRE SOCIOS
LOS SOCIOS se comprometen a resolver cualquier conflicto mediante el siguiente procedimiento:

1. Negociación directa entre los socios durante quince (15) días.
2. Mediación ante un centro de mediación reconocido, durante treinta (30) días adicionales.
3. Árbitro independiente acordado por ambas partes, cuya decisión será vinculante.

${data.additionalClauses ? `DECIMOQUINTA.- CLÁUSULAS ADICIONALES\n${data.additionalClauses}\n\n` : ""}DECIMOQU${data.additionalClauses ? "INTA (CONT.)" : "INTA"}.- LEGISLACIÓN APLICABLE Y JURISDICCIÓN
El presente acuerdo se regirá por la legislación vigente en ${data.city || "la ciudad de firma"}. Para cualquier controversia, las partes se someten a los tribunales de ${data.city || "la ciudad de firma"}.

Y en prueba de conformidad con lo aquí establecido, LOS SOCIOS firman el presente acuerdo por duplicado y a un solo efecto.


_____________________________              _____________________________
          SOCIO A                                  SOCIO B
    ${data.partyA || "_______________"}                    ${data.partyB || "_______________"}


DNI/NIF/RFC: _______________              DNI/NIF/RFC: _______________
`.trim(),

  rental: (data) => `
═══════════════════════════════════════════════════════════════
                CONTRATO DE ARRENDAMIENTO
═══════════════════════════════════════════════════════════════

En ${data.city || "la ciudad de ubicación del inmueble"}, a ${data.date || formatDate()}

                              REUNIDOS

De una parte, ${data.partyA || "el propietario del inmueble"}, mayor de edad, con plena capacidad legal para contratar, en adelante "EL ARRENDADOR".

De otra parte, ${data.partyB || "el arrendatario"}, mayor de edad, con plena capacidad legal para contratar, en adelante "EL ARRENDATARIO".

Ambas partes se reconocen mutuamente la capacidad legal necesaria para la celebración del presente contrato, y

                              EXPONEN

I. Que EL ARRENDADOR es titular del inmueble objeto del presente contrato y tiene plena capacidad para darlo en arrendamiento, libre de cargas que impidan o limiten dicho uso.

II. Que EL ARRENDATARIO está interesado en tomar en arrendamiento dicho inmueble en las condiciones que a continuación se estipulan, habiendo visitado e inspeccionado el inmueble y encontrándolo en condiciones adecuadas para el uso previsto.

Por lo anterior, ambas partes acuerdan celebrar el presente CONTRATO DE ARRENDAMIENTO, que se regirá por las siguientes:

                             CLÁUSULAS

PRIMERA.- OBJETO DEL ARRENDAMIENTO
EL ARRENDADOR cede en arrendamiento a EL ARRENDATARIO, que acepta, el inmueble con las siguientes características:

${data.description || "Inmueble ubicado en la dirección acordada entre las partes, con las características, dimensiones y estado descritos en el Anexo de Inventario que forma parte integral del presente contrato."}

El arrendamiento incluye los elementos, mobiliario y equipamiento descritos en el Inventario anexo, firmado por ambas partes en la fecha de entrega del inmueble.

SEGUNDA.- DESTINO Y USO DEL INMUEBLE
EL ARRENDATARIO se compromete a destinar el inmueble exclusivamente al uso acordado: vivienda habitual / uso comercial / uso mixto (según lo estipulado). Queda expresamente prohibido:
a) Subarrendar total o parcialmente el inmueble sin consentimiento escrito previo de EL ARRENDADOR.
b) Realizar actividades ilegales, molestas o que puedan deteriorar el inmueble o alterar la convivencia del edificio.
c) Modificar la estructura o instalaciones del inmueble sin autorización escrita de EL ARRENDADOR.
d) Instalar rótulos, antenas u otros elementos visibles desde el exterior sin autorización previa.

TERCERA.- DURACIÓN DEL ARRENDAMIENTO
El presente contrato tendrá una duración de ${data.duration || "un (1) año"}, comenzando el día de la entrega efectiva del inmueble.

A la finalización del plazo pactado, el contrato podrá prorrogarse por períodos anuales de mutuo acuerdo, salvo que cualquiera de las partes notifique su voluntad de no renovar con al menos treinta (30) días de antelación al vencimiento del período en curso.

CUARTA.- RENTA MENSUAL Y FORMA DE PAGO
La renta mensual acordada es de ${data.amount || "la cantidad pactada entre las partes"}, pagadera dentro de los primeros cinco (5) días hábiles de cada mes.

El pago se realizará mediante:
• Transferencia bancaria a la cuenta que indique EL ARRENDADOR, o
• El medio de pago que ambas partes acuerden por escrito.

EL ARRENDADOR entregará recibo o confirmación de cada pago recibido. En caso de mora superior a cinco (5) días, se aplicará un recargo del 2% mensual sobre la renta pendiente, sin necesidad de requerimiento previo.

QUINTA.- ACTUALIZACIÓN DE LA RENTA
La renta podrá ser actualizada anualmente conforme a la variación del Índice de Precios al Consumidor (IPC) o índice equivalente publicado por el organismo oficial del país, aplicable al período transcurrido desde el inicio del contrato o desde la última actualización.

La actualización se notificará por escrito con al menos treinta (30) días de antelación a su aplicación.

SEXTA.- DEPÓSITO DE GARANTÍA
En el acto de la firma del presente contrato, EL ARRENDATARIO entrega a EL ARRENDADOR la cantidad equivalente a una (1) mensualidad de renta en concepto de depósito de garantía.

Este depósito tiene carácter de garantía por los posibles daños que EL ARRENDATARIO pudiera causar al inmueble, más allá del desgaste normal por uso. No podrá imputarse al pago de la última mensualidad de renta.

EL ARRENDADOR deberá devolver el depósito íntegro dentro de los quince (15) días siguientes a la entrega del inmueble, salvo que existan daños que justifiquen retenciones parciales o totales, debidamente documentadas.

SÉPTIMA.- DISTRIBUCIÓN DE GASTOS
Los gastos del inmueble se distribuyen de la siguiente manera:
a) A cargo de EL ARRENDADOR: impuesto predial / IBI / contribución urbana, cuotas de comunidad de propietarios, seguros del inmueble y reparaciones estructurales o de instalaciones generales por deterioro normal.
b) A cargo de EL ARRENDATARIO: consumos de agua, luz, gas, internet y demás servicios contratados a su nombre, reparaciones menores por uso y daños causados por el ARRENDATARIO o sus convivientes.

OCTAVA.- CONSERVACIÓN Y MANTENIMIENTO
EL ARRENDATARIO se compromete a:
a) Mantener el inmueble en buen estado de conservación e higiene durante toda la vigencia del contrato.
b) Comunicar de forma inmediata a EL ARRENDADOR cualquier avería, daño o defecto que requiera reparación urgente para evitar daños mayores.
c) No realizar obras, reformas ni modificaciones sin autorización escrita de EL ARRENDADOR. Las mejoras autorizadas quedarán en beneficio del inmueble sin derecho a compensación, salvo pacto expreso en contrario.
d) Responder de los daños causados al inmueble por negligencia, uso inadecuado o falta de comunicación oportuna de averías.

NOVENA.- SEGURO
EL ARRENDATARIO se compromete a contratar y mantener vigente durante toda la vigencia del contrato un seguro de contenido que cubra los bienes muebles de su propiedad dentro del inmueble, y un seguro de responsabilidad civil por los daños que pudiera causar a EL ARRENDADOR o a terceros. EL ARRENDADOR, por su parte, mantendrá el seguro del continente (estructura del inmueble).

DÉCIMA.- VISITAS DE INSPECCIÓN
EL ARRENDADOR podrá visitar el inmueble para comprobar su estado de conservación, previa notificación con al menos cuarenta y ocho (48) horas de antelación, salvo en situaciones de emergencia que requieran acceso inmediato. Las visitas se realizarán en horarios razonables y con respeto a la privacidad de EL ARRENDATARIO.

DECIMOPRIMERA.- RESOLUCIÓN ANTICIPADA
EL ARRENDATARIO podrá resolver el contrato anticipadamente notificando a EL ARRENDADOR con al menos treinta (30) días de antelación. En caso de resolución anticipada sin preaviso suficiente, EL ARRENDATARIO deberá abonar el equivalente a los días de preaviso no cumplidos.

EL ARRENDADOR solo podrá resolver el contrato anticipadamente en los supuestos legalmente establecidos: impago de renta, subarriendo no autorizado, daños graves al inmueble o actividades ilegales.

DECIMOSEGUNDA.- DEVOLUCIÓN DEL INMUEBLE
A la finalización del contrato, EL ARRENDATARIO deberá:
a) Entregar el inmueble en las mismas condiciones en que fue recibido, salvo el desgaste normal por uso.
b) Dejar todas las llaves, tarjetas de acceso y mandos entregados al inicio del contrato.
c) Retirar todos sus bienes muebles y enseres personales.
d) Participar en la inspección final del inmueble junto a EL ARRENDADOR para verificar el estado y hacer el levantamiento de inventario final.

${data.additionalClauses ? `DECIMOTERCERA.- CLÁUSULAS ADICIONALES\n${data.additionalClauses}\n\n` : ""}DECIMOTERC${data.additionalClauses ? "ERA (CONT.)" : "ERA"}.- LEGISLACIÓN APLICABLE Y JURISDICCIÓN
El presente contrato se regirá por la legislación de arrendamientos urbanos vigente en ${data.city || "la ciudad de ubicación del inmueble"} y por la normativa civil aplicable. Para cualquier controversia, las partes se someten a los Juzgados y Tribunales de ${data.city || "la ciudad de ubicación del inmueble"}.

Y en prueba de conformidad, firman el presente contrato por duplicado y a un solo efecto.


_____________________________              _____________________________
       EL ARRENDADOR                          EL ARRENDATARIO
    ${data.partyA || "_______________"}                    ${data.partyB || "_______________"}


DNI/NIF/RFC: _______________              DNI/NIF/RFC: _______________
`.trim(),

  sale: (data) => `
═══════════════════════════════════════════════════════════════
                CONTRATO DE COMPRAVENTA
═══════════════════════════════════════════════════════════════

En ${data.city || "la ciudad acordada"}, a ${data.date || formatDate()}

                              REUNIDOS

De una parte, ${data.partyA || "el vendedor"}, con plena capacidad legal para disponer del bien objeto de este contrato, en adelante "EL VENDEDOR".

De otra parte, ${data.partyB || "el comprador"}, con plena capacidad legal para adquirir, en adelante "EL COMPRADOR".

Ambas partes se reconocen mutuamente la capacidad legal necesaria para celebrar el presente contrato, y

                              EXPONEN

I. Que EL VENDEDOR es propietario legítimo del bien descrito en la cláusula primera, con plena facultad para su venta y transmisión.

II. Que EL COMPRADOR ha examinado e inspeccionado el bien y manifiesta conocer su estado y características, declarando su conformidad con la compra en las condiciones aquí establecidas.

Por lo anterior, ambas partes acuerdan celebrar el presente CONTRATO DE COMPRAVENTA, que se regirá por las siguientes:

                             CLÁUSULAS

PRIMERA.- OBJETO DE LA COMPRAVENTA
EL VENDEDOR vende, cede y transfiere a EL COMPRADOR, que acepta y adquiere, la plena propiedad del siguiente bien:

${data.description || "Bien o activo cuyas características, estado y especificaciones han sido comunicadas y aceptadas por EL COMPRADOR, conforme al Anexo Descriptivo que forma parte integral del presente contrato."}

EL VENDEDOR declara que el bien descrito es de su exclusiva propiedad, no está afecto a cargas, gravámenes, arrendamientos ni compromisos con terceros que puedan obstaculizar la transmisión plena de la propiedad, salvo los que expresamente se indiquen en el Anexo correspondiente.

SEGUNDA.- PRECIO
El precio total acordado de la compraventa es de ${data.amount || "la cantidad pactada entre las partes y aceptada por ambas"}.

Dicho precio ha sido fijado libremente por las partes, quienes declaran que es la justa contraprestación por el bien objeto de este contrato.

TERCERA.- FORMA DE PAGO
El precio se abonará de la siguiente manera:
a) Anticipo: el [XX]% del precio total, equivalente a [IMPORTE], en el momento de la firma del presente contrato, cuya recepción EL VENDEDOR expresamente acusa.
b) Saldo: el [XX]% restante, equivalente a [IMPORTE], a la entrega efectiva del bien o en la fecha acordada.

El pago se realizará mediante transferencia bancaria, efectivo o el medio acordado por las partes. En caso de pago a plazos, el impago de cualquier cuota vencerá automáticamente el resto de las cuotas, siendo exigible la totalidad del precio pendiente de forma inmediata.

CUARTA.- ENTREGA Y TRANSMISIÓN DE LA PROPIEDAD
La entrega del bien se realizará ${data.duration || "en la fecha y lugar acordados por las partes"}, momento en el cual se transmitirá la propiedad a EL COMPRADOR, condicionado al pago íntegro del precio acordado.

Hasta la entrega del bien, el riesgo de pérdida o deterioro será de EL VENDEDOR. A partir de la entrega, EL COMPRADOR asume todos los riesgos asociados a la posesión y uso del bien.

QUINTA.- GARANTÍAS DEL VENDEDOR
EL VENDEDOR garantiza expresamente que:
a) Es el único y legítimo propietario del bien vendido.
b) El bien está libre de cargas, gravámenes, hipotecas, prendas, embargos, arrendamientos u obligaciones que puedan afectar a la libre disposición del comprador.
c) No existe ningún litigio, reclamación o procedimiento judicial o administrativo pendiente que afecte al bien.
d) El bien cumple con la descripción realizada y no presenta defectos ocultos que EL VENDEDOR conozca y no haya revelado.

El incumplimiento de cualquiera de estas garantías facultará a EL COMPRADOR para resolver el contrato y exigir la devolución del precio pagado más una indemnización por los daños y perjuicios causados.

SEXTA.- SANEAMIENTO POR EVICCIÓN Y VICIOS OCULTOS
EL VENDEDOR responde del saneamiento por evicción (privación total o parcial del bien por sentencia firme) y por los vicios o defectos ocultos que existieran en el bien al tiempo de la venta y que sean suficientemente graves para hacerlo impropio para el uso al que se destina o que disminuyan su valor de tal modo que el COMPRADOR no lo hubiera adquirido o hubiera dado menos precio de haberlos conocido.

La acción de saneamiento por vicios ocultos prescribirá conforme a la legislación aplicable en la jurisdicción correspondiente.

SÉPTIMA.- INSPECCIÓN Y PERÍODO DE REVISIÓN
EL COMPRADOR tendrá un plazo de diez (10) días hábiles desde la entrega del bien para notificar por escrito cualquier defecto o incumplimiento de las especificaciones acordadas. Transcurrido dicho plazo sin notificación, se entenderá que EL COMPRADOR acepta el bien en las condiciones en que fue recibido, sin perjuicio de las garantías legales por vicios ocultos.

OCTAVA.- DOCUMENTOS Y TRANSFERENCIA DE TITULARIDAD
EL VENDEDOR se compromete a entregar a EL COMPRADOR, junto con el bien, todos los documentos necesarios para acreditar la titularidad y facilitar su registro o uso, incluyendo: títulos de propiedad, manuales, garantías, certificados de conformidad y cualquier otro documento pertinente.

NOVENA.- GASTOS E IMPUESTOS
Los gastos e impuestos derivados de la formalización y transmisión del bien se distribuirán de la siguiente manera, salvo que la legislación aplicable establezca otra cosa:
a) Impuestos sobre la transmisión (IVA, ITP o equivalente): a cargo de quien corresponda según la normativa fiscal aplicable.
b) Notaría y registro (si aplica): por partes iguales entre ambas partes, salvo acuerdo en contrario.
c) Gastos de envío o transporte del bien: a cargo de EL COMPRADOR, salvo pacto expreso en contrario.

DÉCIMA.- RESERVA DE DOMINIO
En caso de pago aplazado, EL VENDEDOR conserva la propiedad del bien hasta el pago íntegro del precio. Hasta ese momento, EL COMPRADOR no podrá vender, gravar, ceder ni disponer del bien sin el consentimiento escrito de EL VENDEDOR.

DECIMOPRIMERA.- RESOLUCIÓN DEL CONTRATO
Cualquiera de las partes podrá resolver el presente contrato en caso de incumplimiento material de la otra, previo requerimiento escrito y plazo de subsanación de diez (10) días. En caso de resolución por incumplimiento de EL COMPRADOR, EL VENDEDOR podrá retener el anticipo abonado como indemnización por daños, sin perjuicio de acciones adicionales. En caso de resolución por incumplimiento de EL VENDEDOR, deberá devolver el doble del anticipo recibido.

DECIMOSEGUNDA.- RESOLUCIÓN DE DISPUTAS
Las disputas derivadas del presente contrato se resolverán mediante negociación directa en primer lugar. Si no se alcanza acuerdo en quince (15) días, cualquier parte podrá acudir a mediación. De no resolverse por mediación, las partes se someterán a los tribunales competentes de ${data.city || "la ciudad acordada"}.

${data.additionalClauses ? `DECIMOTERCERA.- CLÁUSULAS ADICIONALES\n${data.additionalClauses}\n\n` : ""}DECIMOTERC${data.additionalClauses ? "ERA (CONT.)" : "ERA"}.- LEGISLACIÓN APLICABLE
El presente contrato se regirá e interpretará de acuerdo con la legislación vigente en ${data.city || "el lugar de celebración del contrato"}.

Y en prueba de conformidad, firman el presente contrato por duplicado y a un solo efecto.


_____________________________              _____________________________
        EL VENDEDOR                            EL COMPRADOR
    ${data.partyA || "_______________"}                    ${data.partyB || "_______________"}


DNI/NIF/RFC: _______________              DNI/NIF/RFC: _______________
`.trim(),

  terms: (data) => `
═══════════════════════════════════════════════════════════════
            TÉRMINOS Y CONDICIONES DE USO
═══════════════════════════════════════════════════════════════

Fecha de última actualización: ${data.date || formatDate()}
Empresa / Plataforma: ${data.partyA || "el titular del servicio"}
Contacto: ${data.partyB || "contacto@ejemplo.com"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

AVISO IMPORTANTE: Por favor, lea detenidamente estos Términos y Condiciones antes de utilizar nuestros servicios. El acceso o uso del servicio implica la aceptación plena y sin reservas de los presentes Términos.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. IDENTIFICACIÓN DEL TITULAR Y DESCRIPCIÓN DEL SERVICIO

${data.partyA || "El titular del servicio"} (en adelante "LA EMPRESA" o "nosotros"), debidamente constituida y con domicilio en ${data.city || "la ciudad de operación"}, pone a disposición del usuario el siguiente servicio:

${data.description || "Plataforma digital que ofrece servicios al usuario a través de internet, conforme a las características técnicas y funcionales descritas en el sitio web o aplicación correspondiente."}

La EMPRESA se reserva el derecho de modificar, ampliar, reducir o discontinuar cualquier funcionalidad del servicio, notificándolo previamente con un plazo razonable cuando dicha modificación sea sustancial.

2. ACEPTACIÓN DE LOS TÉRMINOS Y CONDICIONES

Al acceder, registrarse o utilizar el servicio, el usuario declara:
a) Haber leído y comprendido íntegramente los presentes Términos y Condiciones.
b) Tener capacidad legal para contratar (ser mayor de edad o contar con autorización de su representante legal).
c) Aceptar de forma libre, voluntaria e informada todos los términos aquí establecidos.
d) Que la información proporcionada al registrarse es veraz, completa y actualizada.

Si el usuario no acepta estos Términos en su totalidad, deberá abstenerse de acceder o utilizar el servicio.

3. REGISTRO DE CUENTA Y CREDENCIALES

Para acceder a ciertas funcionalidades del servicio, el usuario deberá crear una cuenta personal. En este proceso, el usuario se compromete a:
a) Proporcionar información exacta, completa y actualizada en el formulario de registro.
b) Mantener la confidencialidad de su contraseña y credenciales de acceso, siendo el único responsable de toda actividad realizada bajo su cuenta.
c) Notificar inmediatamente a LA EMPRESA cualquier uso no autorizado de su cuenta o vulneración de seguridad detectada.
d) No compartir, ceder ni transferir su cuenta a terceros.
e) Actualizar su información de perfil cuando sea necesario para mantenerla vigente.

LA EMPRESA se reserva el derecho de suspender o cancelar cuentas que incumplan estas condiciones, que hayan sido creadas de forma fraudulenta, o que estén siendo utilizadas de manera contraria a los presentes Términos.

4. USO ACEPTABLE DEL SERVICIO

El usuario podrá utilizar el servicio únicamente con fines lícitos y conforme a los presentes Términos. Queda expresamente prohibido:

a) Utilizar el servicio para fines ilegales, fraudulentos o que violen derechos de terceros.
b) Publicar, transmitir o distribuir contenido que sea difamatorio, obsceno, amenazante, discriminatorio, que incite al odio o que viole derechos de propiedad intelectual.
c) Realizar ingeniería inversa, descompilar, desensamblar o intentar obtener el código fuente del software subyacente.
d) Utilizar robots, scrapers, spiders u otras herramientas automatizadas para acceder o extraer datos del servicio sin autorización expresa.
e) Sobrecargar, atacar, interferir o interrumpir los servidores, redes o infraestructuras asociadas al servicio (incluyendo ataques DDoS).
f) Acceder o intentar acceder a áreas restringidas, cuentas de otros usuarios o sistemas internos de LA EMPRESA.
g) Suplantar la identidad de personas físicas o jurídicas, o declarar falsamente su vinculación con alguna persona o entidad.
h) Revender, sublicenciar o comercializar el acceso al servicio sin autorización expresa de LA EMPRESA.

El incumplimiento de estas prohibiciones podrá dar lugar a la suspensión inmediata de la cuenta y al ejercicio de las acciones legales correspondientes.

5. TARIFAS, PAGOS Y FACTURACIÓN

${data.amount ? `El acceso al servicio tiene un costo de ${data.amount}. Las condiciones de pago, facturación y renovación aplicables son las siguientes:` : "Las condiciones económicas del servicio, cuando apliquen, serán las publicadas en el sitio web al momento de la contratación."}

a) Los precios publicados incluyen los impuestos aplicables, salvo indicación expresa en contrario.
b) Los pagos realizados no son reembolsables, salvo en los supuestos expresamente previstos en la Política de Reembolsos de LA EMPRESA o por imperativo legal.
c) Las suscripciones de pago se renovarán automáticamente al final de cada período, salvo que el usuario cancele antes de la fecha de renovación.
d) LA EMPRESA podrá modificar sus tarifas, notificando al usuario con al menos treinta (30) días de antelación. Si el usuario no acepta el nuevo precio, podrá cancelar su suscripción antes de la renovación.
e) El impago de las cuotas aplicables dará derecho a LA EMPRESA a suspender o cancelar el acceso al servicio.

6. PROPIEDAD INTELECTUAL

Todo el contenido del servicio —incluyendo pero no limitado a: software, código fuente, bases de datos, diseños gráficos, interfaces, textos, imágenes, logotipos, marcas comerciales y nombres comerciales— es propiedad exclusiva de ${data.partyA || "LA EMPRESA"} o de sus licenciantes, y está protegido por las leyes de propiedad intelectual e industrial aplicables.

El usuario recibe una licencia de uso personal, limitada, no exclusiva, intransferible y revocable para acceder y utilizar el servicio, exclusivamente conforme a los presentes Términos. Esta licencia no incluye el derecho a:
a) Reproducir, distribuir, modificar o crear obras derivadas del contenido del servicio.
b) Utilizar el contenido o las marcas de LA EMPRESA con fines comerciales.
c) Eliminar o alterar cualquier aviso de propiedad intelectual.

El contenido generado por el usuario en la plataforma (si aplica) seguirá siendo de su propiedad, pero el usuario concede a LA EMPRESA una licencia mundial, no exclusiva, gratuita y sublicenciable para utilizarlo con el fin de prestar el servicio.

7. PRIVACIDAD Y PROTECCIÓN DE DATOS

El tratamiento de los datos personales del usuario se rige por la Política de Privacidad de LA EMPRESA, que forma parte integral de los presentes Términos. Al usar el servicio, el usuario consiente el tratamiento de sus datos conforme a dicha política.

LA EMPRESA se compromete a cumplir con la legislación aplicable en materia de protección de datos personales vigente en las jurisdicciones en que opera el servicio.

8. LIMITACIÓN DE RESPONSABILIDAD

En la máxima extensión permitida por la ley aplicable, LA EMPRESA no será responsable de:
a) Daños indirectos, incidentales, especiales, consecuentes o punitivos derivados del uso o la imposibilidad de usar el servicio.
b) Pérdida de datos, lucro cesante, pérdida de reputación o negocio, aunque LA EMPRESA hubiera sido advertida de la posibilidad de dichos daños.
c) Interrupciones del servicio debidas a causas de fuerza mayor, fallos de terceros proveedores de infraestructura, o mantenimiento programado.
d) Inexactitudes, errores u omisiones en el contenido del servicio no generado directamente por LA EMPRESA.

La responsabilidad total de LA EMPRESA frente al usuario por cualquier causa y con independencia de la naturaleza de la acción no excederá el importe total abonado por el usuario en los doce (12) meses anteriores al hecho que originó la reclamación, o la cantidad de cien dólares (USD 100) si el servicio es gratuito.

9. EXCLUSIÓN DE GARANTÍAS

El servicio se presta "tal cual" y "según disponibilidad". LA EMPRESA no garantiza que el servicio sea ininterrumpido, libre de errores, seguro frente a ataques externos, ni que satisfaga las expectativas específicas del usuario. LA EMPRESA hará sus mejores esfuerzos razonables para mantener la disponibilidad y funcionalidad del servicio, pero no asume responsabilidad frente a interrupciones o degradaciones temporales.

10. ENLACES A TERCEROS

El servicio puede contener enlaces a sitios web o servicios de terceros que no son controlados por LA EMPRESA. La inclusión de estos enlaces no implica respaldo ni responsabilidad de LA EMPRESA respecto del contenido, políticas o prácticas de dichos terceros. El usuario accede a dichos sitios bajo su propia responsabilidad.

11. DURACIÓN Y TERMINACIÓN

Los presentes Términos están vigentes mientras el usuario utilice el servicio. LA EMPRESA podrá suspender o cancelar el acceso del usuario en caso de incumplimiento de los presentes Términos, sin necesidad de aviso previo cuando la gravedad de la infracción así lo justifique.

El usuario podrá cancelar su cuenta en cualquier momento a través de la configuración del servicio o contactando a LA EMPRESA. La cancelación no dará derecho a reembolso de importes ya abonados, salvo lo previsto en la Política de Reembolsos.

12. MODIFICACIONES DE LOS TÉRMINOS

LA EMPRESA se reserva el derecho de modificar los presentes Términos en cualquier momento. Las modificaciones sustanciales serán notificadas al usuario con al menos treinta (30) días de antelación por correo electrónico o mediante aviso destacado en el servicio. El uso continuado del servicio tras la fecha de entrada en vigor de las modificaciones constituye la aceptación de los nuevos Términos.

13. FUERZA MAYOR

LA EMPRESA no será responsable de los retrasos o incumplimientos derivados de causas fuera de su control razonable, incluyendo catástrofes naturales, pandemias, conflictos armados, huelgas de terceros, fallos generalizados de internet o cortes de suministro eléctrico.

14. NULIDAD PARCIAL

Si alguna disposición de los presentes Términos fuera declarada nula, inválida o inaplicable por resolución judicial o administrativa, el resto de disposiciones permanecerá en plena vigencia y eficacia.

15. LEY APLICABLE Y JURISDICCIÓN

Los presentes Términos y Condiciones se rigen por las leyes de ${data.city || "la jurisdicción donde opera LA EMPRESA"}. Para cualquier controversia derivada de los mismos, las partes se someten a los tribunales competentes de ${data.city || "dicha jurisdicción"}, sin perjuicio de los derechos irrenunciables que la legislación de consumo aplicable pueda reconocer al usuario.

16. CONTACTO

Para cualquier consulta, reclamación o ejercicio de derechos relacionados con el servicio o con los presentes Términos:

Empresa: ${data.partyA || "el titular del servicio"}
Email de contacto: ${data.partyB || "contacto@empresa.com"}
Dirección: ${data.city || "la dirección de la empresa"}

${data.additionalClauses ? `17. CONDICIONES ADICIONALES\n\n${data.additionalClauses}` : ""}
`.trim(),

  privacy: (data) => `
═══════════════════════════════════════════════════════════════
                    POLÍTICA DE PRIVACIDAD
═══════════════════════════════════════════════════════════════

Fecha de última actualización: ${data.date || formatDate()}
Responsable del tratamiento: ${data.partyA || "el titular del servicio"}
Contacto / DPO: ${data.partyB || "privacidad@empresa.com"}
Jurisdicción: ${data.city || "la jurisdicción de operación del servicio"}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

En cumplimiento de la normativa vigente en materia de protección de datos personales (incluyendo, según corresponda, el Reglamento General de Protección de Datos de la UE —RGPD—, la Ley Federal de Protección de Datos Personales en Posesión de Particulares de México, la Ley 1581 de 2012 de Colombia, la Ley 25.326 de Argentina y demás normativas aplicables en LATAM), ${data.partyA || "el responsable del tratamiento"} informa a los usuarios sobre el tratamiento de sus datos personales.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. RESPONSABLE DEL TRATAMIENTO

${data.partyA || "El titular del servicio"}, con domicilio en ${data.city || "la ciudad de operación"}, es el responsable del tratamiento de los datos personales recopilados a través del servicio:

${data.description || "Plataforma digital y servicios asociados ofrecidos a través del sitio web o aplicación del responsable del tratamiento."}

Para cualquier consulta sobre privacidad o ejercicio de derechos, puede contactarnos en: ${data.partyB || "privacidad@empresa.com"}

2. DATOS PERSONALES QUE RECOPILAMOS

Recopilamos los siguientes tipos de datos personales, según la naturaleza de la interacción:

a) Datos de identificación y contacto: nombre completo, dirección de correo electrónico, número de teléfono, fecha de nacimiento (cuando aplique) y documento de identidad.
b) Datos de cuenta: nombre de usuario, contraseña cifrada, preferencias y configuración de la cuenta.
c) Datos de uso y navegación: dirección IP, tipo de navegador, sistema operativo, páginas visitadas, duración de la sesión, clics y patrones de comportamiento en el servicio.
d) Datos de transacciones: historial de compras, facturas, información de pago (procesada por proveedores de pago certificados PCI-DSS; no almacenamos datos completos de tarjetas).
e) Datos de comunicaciones: mensajes enviados a través de formularios de contacto, soporte técnico o cualquier otra vía de comunicación con nosotros.
f) Datos de ubicación: ciudad o región (derivados de la IP), y geolocalización precisa solo si el usuario otorga permiso explícito.
g) Cookies y tecnologías similares: según lo descrito en nuestra sección de Cookies.

No recopilamos datos sensibles (origen racial o étnico, opiniones políticas, creencias religiosas, datos de salud, orientación sexual, datos genéticos o biométricos) salvo que sea estrictamente necesario para la prestación del servicio y contemos con su consentimiento explícito.

3. FINALIDADES Y BASE LEGAL DEL TRATAMIENTO

Tratamos sus datos personales para las siguientes finalidades y con las bases legales indicadas:

a) Prestación del servicio contratado (base legal: ejecución del contrato): gestión de su cuenta, proceso de pagos, entrega de los servicios o productos adquiridos, y atención al cliente.
b) Comunicaciones de servicio (base legal: ejecución del contrato / interés legítimo): notificaciones sobre su cuenta, cambios en el servicio, avisos de seguridad y comunicaciones operativas necesarias.
c) Mejora del servicio (base legal: interés legítimo): análisis del comportamiento de uso para identificar errores, mejorar la experiencia de usuario y desarrollar nuevas funcionalidades.
d) Marketing y comunicaciones comerciales (base legal: consentimiento): envío de información sobre novedades, ofertas y contenido relevante, solo si usted ha dado su consentimiento expreso. Puede revocar este consentimiento en cualquier momento.
e) Cumplimiento de obligaciones legales (base legal: obligación legal): conservación de datos requerida por normativa fiscal, laboral o de prevención del blanqueo de capitales.
f) Prevención del fraude y seguridad (base legal: interés legítimo): detección y prevención de actividades fraudulentas, uso abusivo del servicio y amenazas de seguridad.

4. CONSERVACIÓN DE LOS DATOS

Conservamos sus datos personales durante el tiempo necesario para las finalidades para las que fueron recopilados, con los siguientes criterios:
• Datos de cuenta: mientras la cuenta esté activa y ${data.duration || "hasta tres (3) años después de su cancelación"}.
• Datos de facturación y transacciones: el período exigido por la normativa fiscal aplicable (generalmente 5-10 años).
• Datos de navegación y análisis: hasta 26 meses desde su recopilación.
• Datos de comunicaciones: hasta 3 años desde la última interacción.

Una vez cumplidos los plazos, los datos serán eliminados o anonimizados de forma segura.

5. DESTINATARIOS Y TRANSFERENCIAS DE DATOS

No vendemos ni cedemos sus datos personales a terceros para sus propios fines. Podemos compartir sus datos en los siguientes supuestos:

a) Proveedores de servicios tecnológicos (encargados del tratamiento): servicios de hosting, bases de datos en la nube, herramientas de análisis, proveedores de pago y plataformas de correo electrónico, que actúan bajo instrucciones nuestras y con garantías adecuadas de protección.
b) Obligación legal: cuando seamos requeridos por autoridades judiciales, administrativas o regulatorias mediante resolución legal válida.
c) Operaciones corporativas: en caso de fusión, adquisición o venta de activos, sus datos podrán ser transferidos al nuevo responsable, que quedará sujeto a esta Política.

En caso de transferencias internacionales de datos fuera del Espacio Económico Europeo o de la jurisdicción local, garantizamos que se realizan con las salvaguardas adecuadas (cláusulas contractuales tipo, decisiones de adecuación o mecanismos equivalentes).

6. SUS DERECHOS EN MATERIA DE PROTECCIÓN DE DATOS

Dependiendo de la legislación aplicable en su país, usted tiene los siguientes derechos respecto a sus datos personales:

a) Derecho de acceso: conocer qué datos personales tratamos sobre usted y obtener una copia de los mismos.
b) Derecho de rectificación: solicitar la corrección de datos inexactos o incompletos.
c) Derecho de supresión ("derecho al olvido"): solicitar la eliminación de sus datos cuando ya no sean necesarios para la finalidad para la que fueron recopilados.
d) Derecho de oposición: oponerse al tratamiento de sus datos, especialmente para fines de marketing directo o basados en interés legítimo.
e) Derecho a la limitación del tratamiento: solicitar que restrinjamos el uso de sus datos en determinadas circunstancias.
f) Derecho a la portabilidad: recibir sus datos en un formato estructurado, de uso común y legible por máquina.
g) Derecho a retirar el consentimiento: cuando el tratamiento se base en su consentimiento, puede revocarlo en cualquier momento sin que ello afecte a la licitud del tratamiento anterior.

Para ejercer cualquiera de estos derechos, envíe una solicitud a: ${data.partyB || "privacidad@empresa.com"}, identificándose debidamente. Responderemos en el plazo legal aplicable (generalmente 30 días).

Si considera que sus derechos no han sido atendidos, tiene derecho a presentar una reclamación ante la autoridad de protección de datos competente en su país.

7. SEGURIDAD DE LOS DATOS

Implementamos medidas técnicas y organizativas apropiadas para proteger sus datos personales frente al acceso no autorizado, alteración, divulgación o destrucción, incluyendo:
• Cifrado de datos en tránsito (TLS/SSL) y en reposo.
• Control de acceso basado en roles y principio de mínimo privilegio.
• Monitoreo continuo de la seguridad y gestión de vulnerabilidades.
• Procedimientos de respuesta a incidentes de seguridad.
• Capacitación periódica del personal en protección de datos.

En caso de una brecha de seguridad que afecte a sus datos, le notificaremos conforme a los plazos y requisitos establecidos por la normativa aplicable.

8. COOKIES Y TECNOLOGÍAS DE SEGUIMIENTO

Utilizamos cookies y tecnologías similares para mejorar la funcionalidad del servicio, analizar el uso y personalizar la experiencia. Las categorías de cookies que utilizamos son:

a) Cookies estrictamente necesarias: imprescindibles para el funcionamiento del servicio (sesión, seguridad). No requieren su consentimiento.
b) Cookies de preferencias: recuerdan sus configuraciones y preferencias. Requieren su consentimiento.
c) Cookies analíticas: nos permiten entender cómo se utiliza el servicio para mejorarlo. Requieren su consentimiento.
d) Cookies de marketing: utilizadas para mostrarle contenido relevante. Requieren su consentimiento explícito.

Puede gestionar sus preferencias de cookies a través del panel de configuración de cookies del servicio o de la configuración de su navegador. Tenga en cuenta que deshabilitar ciertas cookies puede afectar al funcionamiento del servicio.

9. MENORES DE EDAD

El servicio no está dirigido a menores de 14 años (o la edad mínima que establezca la legislación local aplicable). No recopilamos conscientemente datos personales de menores sin el consentimiento verificable de sus padres o tutores legales. Si detectamos que hemos recopilado datos de un menor sin el consentimiento requerido, procederemos a eliminarlos de forma inmediata.

10. CAMBIOS EN LA POLÍTICA DE PRIVACIDAD

Podemos actualizar esta Política de Privacidad periódicamente para reflejar cambios legales, técnicos o en nuestras prácticas de tratamiento. Le notificaremos los cambios sustanciales con al menos treinta (30) días de antelación por correo electrónico o mediante aviso destacado en el servicio. Le recomendamos revisar esta Política periódicamente.

11. CONTACTO Y DELEGADO DE PROTECCIÓN DE DATOS

Para cualquier consulta, solicitud de ejercicio de derechos o reclamación relacionada con el tratamiento de sus datos personales, puede contactarnos en:

Responsable: ${data.partyA || "el titular del servicio"}
Email: ${data.partyB || "privacidad@empresa.com"}
Dirección: ${data.city || "la dirección física de la empresa"}

${data.additionalClauses ? `12. INFORMACIÓN ADICIONAL\n\n${data.additionalClauses}` : ""}
`.trim(),

  consulting: (data) => `
═══════════════════════════════════════════════════════════════
               CONTRATO DE CONSULTORÍA
═══════════════════════════════════════════════════════════════

En ${data.city || "la ciudad acordada"}, a ${data.date || formatDate()}

                              REUNIDOS

De una parte, ${data.partyA || "el consultor"}, profesional con amplia experiencia en su campo, en adelante "EL CONSULTOR".

De otra parte, ${data.partyB || "la empresa cliente"}, debidamente constituida, en adelante "LA EMPRESA".

Ambas partes se reconocen mutuamente la capacidad legal necesaria para la firma del presente contrato, y

                              EXPONEN

I. Que LA EMPRESA requiere servicios de consultoría especializada para abordar retos estratégicos específicos de su organización.

II. Que EL CONSULTOR cuenta con la experiencia, conocimientos, metodología y criterio independiente necesarios para prestar dichos servicios con el nivel de calidad requerido.

III. Que ambas partes han negociado libremente las condiciones del presente contrato y acuerdan celebrarlo como partes independientes, sin que exista relación laboral ni de exclusividad salvo pacto expreso en contrario.

Por lo anterior, ambas partes acuerdan celebrar el presente CONTRATO DE CONSULTORÍA, que se regirá por las siguientes:

                             CLÁUSULAS

PRIMERA.- OBJETO DE LA CONSULTORÍA
EL CONSULTOR prestará a LA EMPRESA los siguientes servicios de consultoría especializada:

${data.description || "Análisis estratégico, diagnóstico organizacional, identificación de oportunidades de mejora y elaboración de recomendaciones accionables para los retos específicos identificados por LA EMPRESA. El alcance detallado, los entregables específicos y los criterios de éxito quedarán formalizados en el Plan de Trabajo que forma parte integral del presente contrato."}

EL CONSULTOR actuará como experto independiente, sin sujeción a las instrucciones de gestión diaria de LA EMPRESA, aunque colaborará estrechamente con los equipos designados por esta para el desarrollo de los trabajos.

SEGUNDA.- DURACIÓN Y FASES DEL PROYECTO
La consultoría tendrá una duración de ${data.duration || "el período necesario para completar el alcance acordado"}, organizada en las siguientes fases:

• Fase 1 — Diagnóstico y análisis: comprensión profunda de la situación actual, recopilación de datos e identificación de problemas y oportunidades.
• Fase 2 — Desarrollo de propuestas: elaboración de recomendaciones estratégicas, modelos alternativos y plan de implementación.
• Fase 3 — Presentación y validación: exposición de conclusiones a los stakeholders y ajuste de recomendaciones según feedback.
• Fase 4 — Soporte a la implementación (si aplica): acompañamiento durante la ejecución de las recomendaciones acordadas.

Cualquier extensión del plazo requerirá acuerdo escrito entre las partes.

TERCERA.- HONORARIOS Y FORMA DE PAGO
LA EMPRESA abonará a EL CONSULTOR los siguientes honorarios por los servicios prestados: ${data.amount || "la cantidad acordada entre las partes, pagadera conforme al calendario de pagos acordado"}.

Estructura de pagos:
a) 30% a la firma del presente contrato, como anticipo de inicio de trabajos.
b) 40% a la entrega del informe de diagnóstico y recomendaciones (Fase 2).
c) 30% restante a la entrega del informe final y cierre del proyecto.

Los honorarios son fijos y no se verán afectados por el número de horas invertidas, salvo que las partes acuerden por escrito la facturación por tiempo y materiales (time & materials) para fases específicas.

El pago deberá realizarse dentro de los quince (15) días siguientes a la recepción de cada factura. En caso de mora, se aplicará un interés del 1.5% mensual sobre el importe vencido.

CUARTA.- GASTOS REEMBOLSABLES
Los gastos de viaje, alojamiento, materiales especializados y otros costos directamente incurridos para la prestación de los servicios serán reembolsados por LA EMPRESA, previa presentación de justificantes y dentro de un presupuesto máximo acordado previamente. Los gastos que superen dicho presupuesto requerirán autorización previa de LA EMPRESA.

QUINTA.- INDEPENDENCIA Y METODOLOGÍA
EL CONSULTOR prestará sus servicios como profesional independiente, aplicando su propio criterio metodológico y profesional. LA EMPRESA reconoce que EL CONSULTOR es un proveedor externo y no un empleado, por lo que:
a) EL CONSULTOR no tendrá exclusividad y podrá prestar servicios a otras organizaciones que no compitan directamente con LA EMPRESA.
b) EL CONSULTOR gestionará su propio tiempo de forma autónoma, con el fin de cumplir los entregables acordados.
c) EL CONSULTOR será responsable del cumplimiento de sus obligaciones fiscales y de seguridad social propias.

SEXTA.- CONFIDENCIALIDAD
EL CONSULTOR se compromete a mantener estricta confidencialidad sobre toda la información estratégica, financiera, comercial, técnica y organizacional de LA EMPRESA a la que tenga acceso durante la prestación de los servicios, durante la vigencia del contrato y por un período de tres (3) años posteriores a su terminación.

Esta obligación se extiende a los integrantes del equipo de EL CONSULTOR que participen en el proyecto, quienes deberán suscribir compromisos individuales de confidencialidad.

LA EMPRESA, por su parte, mantendrá confidencialidad sobre las metodologías propietarias y know-how de EL CONSULTOR que pudiera conocer durante el desarrollo de los trabajos.

SÉPTIMA.- PROPIEDAD INTELECTUAL DE LOS ENTREGABLES
Los informes, análisis, presentaciones, modelos y demás entregables desarrollados específicamente para este proyecto y pagados íntegramente por LA EMPRESA pertenecerán a LA EMPRESA para su uso interno.

EL CONSULTOR retiene la titularidad sobre:
a) Sus metodologías, marcos de análisis, herramientas y know-how preexistente.
b) Los elementos de uso genérico incorporados a los entregables.
c) El derecho a utilizar el conocimiento y la experiencia adquirida en el proyecto para trabajos futuros, sin revelar información confidencial de LA EMPRESA.

EL CONSULTOR podrá referenciar el hecho de haber trabajado con LA EMPRESA como referencia de cliente, salvo solicitud expresa en contrario.

OCTAVA.- OBLIGACIONES DE LA EMPRESA
LA EMPRESA se compromete a:
a) Designar un interlocutor con autoridad y disponibilidad suficiente para facilitar el trabajo de EL CONSULTOR.
b) Proporcionar acceso a la información, datos, sistemas y personas necesarias para el desarrollo del proyecto en los plazos acordados.
c) Tomar decisiones en los plazos necesarios para no bloquear el avance del proyecto.
d) Garantizar un entorno de trabajo adecuado y respetuoso para EL CONSULTOR y su equipo.

NOVENA.- LIMITACIÓN DE RESPONSABILIDAD
Las recomendaciones de EL CONSULTOR son de carácter asesor e informativo. LA EMPRESA es libre de implementarlas o no, siendo la única responsable de las decisiones de negocio que adopte. EL CONSULTOR no será responsable de los resultados de negocio derivados de la implementación o no implementación de sus recomendaciones.

La responsabilidad total de EL CONSULTOR frente a LA EMPRESA, por cualquier causa, no excederá el total de los honorarios efectivamente cobrados en el marco del presente contrato.

DÉCIMA.- RESOLUCIÓN ANTICIPADA
Cualquiera de las partes podrá resolver el contrato con un preaviso de quince (15) días. En caso de resolución anticipada:
a) Por decisión de LA EMPRESA: se abonarán los honorarios proporcionales al trabajo realizado hasta la fecha de resolución, más una compensación equivalente al 20% de los honorarios pendientes.
b) Por decisión de EL CONSULTOR: se reembolsará la parte proporcional del anticipo no devengada por el trabajo realizado.

${data.additionalClauses ? `DECIMOPRIMERA.- CLÁUSULAS ADICIONALES\n${data.additionalClauses}\n\n` : ""}DECIMOPR${data.additionalClauses ? "IMERA (CONT.)" : "IMERA"}.- LEGISLACIÓN Y JURISDICCIÓN
El presente contrato se regirá por la legislación vigente en ${data.city || "la ciudad de firma"}. Las controversias se someterán a los tribunales de ${data.city || "la ciudad de firma"}.

Y en prueba de conformidad, firman el presente contrato por duplicado y a un solo efecto.


_____________________________              _____________________________
        EL CONSULTOR                           LA EMPRESA
    ${data.partyA || "_______________"}                    ${data.partyB || "_______________"}


DNI/NIF/RFC: _______________              DNI/NIF/RFC: _______________
`.trim(),

  saas: (data) => `
═══════════════════════════════════════════════════════════════
          CONTRATO DE SUSCRIPCIÓN DE SOFTWARE (SaaS)
═══════════════════════════════════════════════════════════════

En ${data.city || "la ciudad acordada"}, a ${data.date || formatDate()}

                              REUNIDOS

De una parte, ${data.partyA || "el proveedor del software"}, en calidad de titular y proveedor del Software como Servicio, en adelante "EL PROVEEDOR".

De otra parte, ${data.partyB || "el cliente suscriptor"}, en adelante "EL CLIENTE".

Ambas partes se reconocen mutuamente capacidad legal para celebrar el presente contrato, y

                              EXPONEN

I. Que EL PROVEEDOR ha desarrollado y opera una plataforma de Software como Servicio (SaaS) accesible a través de internet.

II. Que EL CLIENTE desea suscribirse al acceso y uso de dicha plataforma en los términos aquí establecidos.

Por lo anterior, acuerdan celebrar el presente CONTRATO DE SUSCRIPCIÓN SaaS, bajo las siguientes:

                             CLÁUSULAS

PRIMERA.- DESCRIPCIÓN DEL SERVICIO
EL PROVEEDOR otorga a EL CLIENTE acceso a la siguiente plataforma SaaS:

${data.description || "Plataforma de software accesible vía web, con las funcionalidades, límites de uso y niveles de servicio descritos en el Anexo Técnico de Servicio (SLA) que forma parte integral del presente contrato."}

EL PROVEEDOR se reserva el derecho de actualizar, mejorar o modificar el software con el fin de mejorar la experiencia del usuario, notificando cambios sustanciales con al menos treinta (30) días de antelación.

SEGUNDA.- LICENCIA DE USO
EL PROVEEDOR concede a EL CLIENTE una licencia de uso no exclusiva, no transferible, limitada y revocable para acceder y utilizar el Software durante la vigencia del presente contrato, exclusivamente para los fines internos legítimos del negocio de EL CLIENTE.

Queda expresamente prohibido:
a) Sublicenciar, revender, alquilar o compartir el acceso al Software con terceros no autorizados.
b) Realizar ingeniería inversa o intentar obtener el código fuente del Software.
c) Utilizar el Software para desarrollar productos o servicios competidores.
d) Superar los límites de usuarios, almacenamiento o uso establecidos en el plan contratado.

TERCERA.- DURACIÓN Y RENOVACIÓN
La suscripción tendrá una duración inicial de ${data.duration || "un (1) año"}. Al término de dicho período, la suscripción se renovará automáticamente por períodos iguales, salvo que cualquiera de las partes notifique su voluntad de no renovar con al menos treinta (30) días de antelación al vencimiento.

CUARTA.- PRECIO Y FORMA DE PAGO
El precio de la suscripción es de ${data.amount || "la tarifa correspondiente al plan contratado"}, pagadera de forma mensual o anual según el plan seleccionado por EL CLIENTE.

a) Los pagos se realizarán mediante tarjeta de crédito/débito, transferencia bancaria u otro medio acordado.
b) Las facturas se emitirán al inicio de cada período de facturación.
c) El impago de cualquier factura dentro de los diez (10) días de su vencimiento dará derecho a EL PROVEEDOR a suspender el acceso al servicio sin responsabilidad frente a EL CLIENTE.
d) Los precios podrán ser actualizados al inicio de cada período de renovación, con notificación de al menos treinta (30) días.

QUINTA.- NIVEL DE SERVICIO (SLA)
EL PROVEEDOR garantiza los siguientes niveles mínimos de disponibilidad del servicio:
• Disponibilidad garantizada: 99.5% mensual (excluyendo mantenimientos programados notificados con al menos 48 horas de antelación y causas de fuerza mayor).
• Tiempo de respuesta a incidencias críticas: máximo 4 horas hábiles.
• Tiempo de resolución de incidencias críticas: máximo 24 horas hábiles.

En caso de incumplimiento del SLA, EL CLIENTE tendrá derecho a créditos de servicio conforme a la tabla de compensación establecida en el Anexo SLA.

SEXTA.- DATOS DEL CLIENTE Y PRIVACIDAD
Los datos que EL CLIENTE almacena o procesa en la plataforma son de su exclusiva propiedad. EL PROVEEDOR actuará como encargado del tratamiento conforme a la normativa aplicable y:
a) Solo accederá a los datos de EL CLIENTE para prestar el servicio contratado o por imperativo legal.
b) No venderá, alquilará ni divulgará los datos de EL CLIENTE a terceros.
c) Implementará medidas de seguridad técnicas y organizativas adecuadas.
d) Colaborará con EL CLIENTE en el cumplimiento de sus obligaciones como responsable del tratamiento.

EL PROVEEDOR entregará a EL CLIENTE una copia de sus datos en formato exportable dentro de los treinta (30) días siguientes a la terminación del contrato, tras lo cual procederá a eliminarlos de sus sistemas.

SÉPTIMA.- SEGURIDAD Y ACCESO
EL PROVEEDOR implementará medidas de seguridad razonables para proteger la integridad y confidencialidad de los datos almacenados. EL CLIENTE es responsable de mantener la seguridad de sus credenciales de acceso y de gestionar los permisos de sus usuarios.

OCTAVA.- SOPORTE Y MANTENIMIENTO
EL PROVEEDOR prestará soporte técnico conforme al plan contratado:
a) Canales de soporte: correo electrónico, chat en la plataforma o teléfono según el plan.
b) Horario de soporte: según el plan contratado (ej: días hábiles de 9h a 18h, o 24/7 para planes enterprise).
c) Actualizaciones y mejoras del software: incluidas en la suscripción sin costo adicional.

NOVENA.- LIMITACIÓN DE RESPONSABILIDAD
La responsabilidad total de EL PROVEEDOR frente a EL CLIENTE por cualquier causa no excederá el importe de la suscripción abonada en los tres (3) meses anteriores al evento que generó la reclamación. EL PROVEEDOR no será responsable por pérdidas de datos derivadas de un uso incorrecto del servicio por parte de EL CLIENTE, ni por daños indirectos o consecuentes.

DÉCIMA.- TERMINACIÓN
Cualquiera de las partes podrá resolver el contrato por incumplimiento material de la otra parte, previa notificación y plazo de subsanación de quince (15) días. EL CLIENTE podrá cancelar su suscripción antes del período de renovación sin derecho a reembolso de las cuotas ya abonadas.

${data.additionalClauses ? `DECIMOPRIMERA.- CLÁUSULAS ADICIONALES\n${data.additionalClauses}\n\n` : ""}DECIMOPR${data.additionalClauses ? "IMERA (CONT.)" : "IMERA"}.- LEY APLICABLE
Este contrato se rige por las leyes de ${data.city || "la jurisdicción del proveedor"}. Las controversias se someterán a los tribunales de ${data.city || "dicha jurisdicción"}.

Y en prueba de conformidad, firman el presente contrato por duplicado.


_____________________________              _____________________________
        EL PROVEEDOR                           EL CLIENTE
    ${data.partyA || "_______________"}                    ${data.partyB || "_______________"}


DNI/NIF/RFC: _______________              DNI/NIF/RFC: _______________
`.trim(),

  agency: (data) => `
═══════════════════════════════════════════════════════════════
              CONTRATO DE AGENCIA COMERCIAL
═══════════════════════════════════════════════════════════════

En ${data.city || "la ciudad acordada"}, a ${data.date || formatDate()}

                              REUNIDOS

De una parte, ${data.partyA || "el empresario principal"}, en adelante "EL PRINCIPAL".

De otra parte, ${data.partyB || "el agente comercial"}, profesional independiente con experiencia en representación comercial, en adelante "EL AGENTE".

Ambas partes se reconocen mutuamente la capacidad legal para contratar, y

                              EXPONEN

I. Que EL PRINCIPAL necesita ampliar su red de ventas y representación comercial en determinados territorios o segmentos de mercado.

II. Que EL AGENTE tiene la experiencia, la red de contactos y los medios necesarios para actuar como representante comercial independiente de EL PRINCIPAL.

Por lo anterior, acuerdan celebrar el presente CONTRATO DE AGENCIA COMERCIAL, bajo las siguientes:

                             CLÁUSULAS

PRIMERA.- OBJETO
EL AGENTE se compromete a promover, de forma estable y continuada, la comercialización de los productos y/o servicios de EL PRINCIPAL, actuando como agente independiente por cuenta de este último:

${data.description || "Productos y/o servicios cuyas características, condiciones comerciales y materiales de apoyo serán facilitados por EL PRINCIPAL al inicio de la relación y actualizados periódicamente."}

EL AGENTE no podrá comprometer ni vincular a EL PRINCIPAL sin autorización expresa, ni actuar fuera de las condiciones comerciales aprobadas.

SEGUNDA.- TERRITORIO Y EXCLUSIVIDAD
EL AGENTE tendrá asignado el siguiente territorio de actuación: ${data.city || "el territorio acordado por las partes"}.

La asignación de territorio ${data.additionalClauses?.includes("exclusiv") ? "es exclusiva" : "no es exclusiva salvo pacto expreso en contrario"}.

TERCERA.- DURACIÓN
El presente contrato tendrá una duración de ${data.duration || "un (1) año"}, renovable automáticamente por períodos iguales, salvo preaviso de treinta (30) días antes del vencimiento.

CUARTA.- COMISIONES Y REMUNERACIÓN
EL PRINCIPAL abonará a EL AGENTE una comisión sobre las ventas efectivamente cerradas y cobradas gracias a la gestión de EL AGENTE, conforme a la siguiente estructura:

Comisión sobre ventas: ${data.amount || "el porcentaje acordado sobre el valor neto de cada operación cerrada y cobrada"}.

Las comisiones se liquidarán mensualmente, dentro de los primeros quince (15) días del mes siguiente al cobro de la operación correspondiente. EL PRINCIPAL facilitará a EL AGENTE un informe mensual detallado de las operaciones atribuidas a su gestión.

En caso de resolución del contrato, EL AGENTE tendrá derecho a las comisiones de las operaciones iniciadas durante la vigencia del contrato aunque se concreten con posterioridad, siempre dentro de los tres (3) meses siguientes a la terminación.

QUINTA.- OBLIGACIONES DEL AGENTE
EL AGENTE se compromete a:
a) Promover activamente los productos/servicios de EL PRINCIPAL con la diligencia de un profesional del sector.
b) Informar a EL PRINCIPAL mensualmente sobre las actividades realizadas, el estado del mercado y las oportunidades identificadas.
c) No representar ni actuar en nombre de empresas competidoras de EL PRINCIPAL en el territorio asignado sin su consentimiento previo y escrito.
d) Cumplir las condiciones comerciales, precios y políticas de descuento establecidas por EL PRINCIPAL.
e) Guardar confidencialidad sobre la información comercial y estratégica de EL PRINCIPAL.

SEXTA.- OBLIGACIONES DEL PRINCIPAL
EL PRINCIPAL se compromete a:
a) Facilitar a EL AGENTE la información, catálogos, materiales de marketing y muestras necesarias para su actividad.
b) Informar con antelación razonable de cualquier cambio en precios, condiciones o catálogo de productos.
c) Liquidar las comisiones devengadas en los plazos establecidos y proporcionar información transparente sobre las operaciones atribuidas.
d) No actuar directamente en el territorio asignado a EL AGENTE de forma que perjudique su actividad, salvo acuerdo expreso.

SÉPTIMA.- INDEPENDENCIA
EL AGENTE actúa como empresario independiente, siendo responsable de sus propios gastos operativos, impuestos y seguridad social. El presente contrato no crea relación laboral, de exclusividad laboral ni vínculo societario entre las partes.

OCTAVA.- INDEMNIZACIÓN POR CLIENTELA
A la terminación del contrato por causa no imputable a EL AGENTE, este tendrá derecho a una indemnización por clientela conforme a la legislación aplicable, en reconocimiento de los clientes aportados que sigan generando beneficios para EL PRINCIPAL.

${data.additionalClauses ? `NOVENA.- CLÁUSULAS ADICIONALES\n${data.additionalClauses}\n\n` : ""}NOVEN${data.additionalClauses ? "A (CONT.)" : "A"}.- LEY APLICABLE
Este contrato se rige por la legislación de agencia comercial vigente en ${data.city || "la jurisdicción acordada"}.

Y en prueba de conformidad, firman el presente contrato.


_____________________________              _____________________________
         EL PRINCIPAL                           EL AGENTE
    ${data.partyA || "_______________"}                    ${data.partyB || "_______________"}


DNI/NIF/RFC: _______________              DNI/NIF/RFC: _______________
`.trim(),

  joboffer: (data) => `
═══════════════════════════════════════════════════════════════
                    CARTA DE OFERTA LABORAL
═══════════════════════════════════════════════════════════════

${data.city || "Ciudad"}, ${data.date || formatDate()}

Estimado/a ${data.partyB || "candidato/a seleccionado/a"}:

En nombre de ${data.partyA || "la empresa"}, nos complace extenderle la presente oferta formal de empleo para incorporarse a nuestro equipo en los términos que a continuación se detallan.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DETALLES DE LA OFERTA

1. PUESTO Y DESCRIPCIÓN DE FUNCIONES
Posición ofrecida: ${data.description || "el cargo acordado durante el proceso de selección, con las responsabilidades y funciones detalladas en el Anexo de Descripción del Puesto adjunto a esta oferta."}

Área / Departamento: a determinar conforme a la estructura organizacional de ${data.partyA || "la empresa"}.

Reporta a: [nombre y cargo del superior directo]

2. FECHA DE INCORPORACIÓN
Se propone como fecha de inicio: ${data.duration || "la fecha acordada entre las partes"}.

3. MODALIDAD DE TRABAJO
La posición se desarrollará en modalidad [presencial / remota / híbrida], en [ubicación / ciudad / plataforma remota].

4. RETRIBUCIÓN
Salario bruto [mensual / anual]: ${data.amount || "la cantidad acordada durante el proceso de selección"}.

La retribución se abonará mediante transferencia bancaria en los primeros [5] días hábiles de cada mes. Esta compensación estará sujeta a las deducciones fiscales y de seguridad social que correspondan conforme a la legislación vigente.

5. BENEFICIOS Y COMPENSACIÓN ADICIONAL
Adicionalmente al salario base, el candidato tendrá derecho a:
• Vacaciones: [15/20/30] días hábiles anuales conforme a la política de la empresa y la legislación laboral.
• Seguro médico: [sí / no — plan familiar / individual].
• Bono de desempeño: [descripción de esquema de bonos, si aplica].
• Acciones / opciones sobre acciones (stock options): [descripción, si aplica].
• Beneficios adicionales: [formación, transporte, comedor, otros].
• Período de adaptación remunerado: [si aplica].

6. PERÍODO DE PRUEBA
La incorporación estará sujeta a un período de prueba de [30/60/90] días, durante el cual cualquiera de las partes podrá resolver la relación laboral sin indemnización, salvo el pago de los días trabajados. Superado satisfactoriamente el período de prueba, el candidato adquirirá la condición de empleado con todos los derechos y garantías laborales.

7. CONFIDENCIALIDAD Y PROPIEDAD INTELECTUAL
Como condición de su incorporación, el candidato deberá suscribir el Acuerdo de Confidencialidad y Propiedad Intelectual de la empresa, por el cual se compromete a mantener la confidencialidad de la información de la empresa y a ceder a esta los derechos sobre los desarrollos y creaciones realizados en el ejercicio de sus funciones.

8. CONDICIONES ADICIONALES
${data.additionalClauses || "La presente oferta está condicionada a la verificación de referencias, antecedentes y, cuando aplique, títulos académicos y certificaciones profesionales declaradas durante el proceso de selección."}

9. ACEPTACIÓN DE LA OFERTA
Esta oferta es válida hasta [fecha límite de respuesta]. Para aceptarla, el candidato deberá firmar y devolver una copia del presente documento antes de dicha fecha. La oferta quedará sin efecto si no se recibe respuesta en el plazo indicado.

Al aceptar esta oferta, el candidato declara que toda la información proporcionada durante el proceso de selección es veraz y que no tiene impedimentos legales para incorporarse en las condiciones descritas.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Esperamos contar con su incorporación al equipo de ${data.partyA || "la empresa"}. No dude en contactarnos si tiene alguna consulta sobre los términos de esta oferta.

Atentamente,


_____________________________
${data.partyA || "LA EMPRESA"}
[Nombre y cargo del firmante]
[Email de contacto]
[Teléfono]


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ACEPTACIÓN DEL CANDIDATO

Yo, ${data.partyB || "el candidato"}, declaro haber leído y comprendido la presente oferta y acepto sus términos en su totalidad.

Firma: _____________________________

Fecha de aceptación: ________________

DNI/RFC/CC: _______________________
`.trim(),

  distribution: (data) => `
═══════════════════════════════════════════════════════════════
              CONTRATO DE DISTRIBUCIÓN
═══════════════════════════════════════════════════════════════

En ${data.city || "la ciudad acordada"}, a ${data.date || formatDate()}

                              REUNIDOS

De una parte, ${data.partyA || "el fabricante / proveedor"}, en adelante "EL FABRICANTE".

De otra parte, ${data.partyB || "el distribuidor"}, en adelante "EL DISTRIBUIDOR".

Ambas partes se reconocen mutuamente capacidad legal para contratar, y

                              EXPONEN

I. Que EL FABRICANTE produce y/o comercializa los productos objeto del presente contrato y tiene interés en ampliar su distribución a través de terceros especializados.

II. Que EL DISTRIBUIDOR cuenta con la infraestructura, red comercial y experiencia necesarias para distribuir dichos productos en el territorio acordado.

Por lo anterior, acuerdan celebrar el presente CONTRATO DE DISTRIBUCIÓN, bajo las siguientes:

                             CLÁUSULAS

PRIMERA.- OBJETO Y PRODUCTOS
EL FABRICANTE designa a EL DISTRIBUIDOR como distribuidor de los siguientes productos:

${data.description || "Productos cuyas especificaciones, referencias, precios de compra y condiciones de venta se detallan en el Catálogo de Productos y Lista de Precios anexos, que forman parte integral del presente contrato y podrán ser actualizados periódicamente por EL FABRICANTE con un preaviso razonable."}

SEGUNDA.- TERRITORIO Y EXCLUSIVIDAD
EL DISTRIBUIDOR tendrá derecho a distribuir los productos en el siguiente territorio: ${data.city || "el territorio geográfico acordado"}.

La distribución ${data.additionalClauses?.includes("exclusiv") ? "tendrá carácter EXCLUSIVO en el territorio indicado" : "no tendrá carácter exclusivo salvo acuerdo escrito específico"}.

Queda prohibido a EL DISTRIBUIDOR vender los productos fuera del territorio asignado o a través de canales no autorizados por EL FABRICANTE.

TERCERA.- DURACIÓN
El presente contrato tendrá una duración de ${data.duration || "un (1) año"}, renovable automáticamente por períodos iguales, salvo preaviso de treinta (30) días antes del vencimiento.

CUARTA.- PRECIOS Y CONDICIONES DE COMPRA
EL DISTRIBUIDOR adquirirá los productos de EL FABRICANTE al precio mayorista acordado: ${data.amount || "los precios establecidos en la Lista de Precios vigente en cada momento, sujetos a revisión periódica con preaviso de treinta (30) días"}.

Condiciones de pago:
a) Pago a [30/60] días desde la recepción de la mercancía o la emisión de la factura, lo que ocurra antes.
b) Descuentos por pronto pago: [X]% si el pago se realiza dentro de los 10 días.
c) EL FABRICANTE podrá establecer un límite de crédito y exigir garantías adicionales si el historial de pagos de EL DISTRIBUIDOR así lo justifica.

QUINTA.- OBJETIVOS DE VENTAS
EL DISTRIBUIDOR se compromete a alcanzar los siguientes objetivos mínimos de compra / venta:
• Primer año: [volumen mínimo acordado].
• Años sucesivos: [revisable anualmente].

El incumplimiento reiterado de los objetivos mínimos (dos períodos consecutivos) dará derecho a EL FABRICANTE a revocar la exclusividad (si la hubiera) o resolver el contrato con preaviso de treinta (30) días.

SEXTA.- OBLIGACIONES DEL DISTRIBUIDOR
EL DISTRIBUIDOR se compromete a:
a) Promover y vender activamente los productos en el territorio asignado, destinando los recursos humanos y materiales necesarios.
b) Mantener un stock mínimo suficiente para atender la demanda habitual del mercado sin interrupciones.
c) Preservar la imagen de marca de EL FABRICANTE, utilizando sus materiales de marketing conforme a las directrices de marca.
d) Proporcionar a EL FABRICANTE reportes mensuales de ventas, inventario y actividad comercial.
e) No distribuir productos competidores sin autorización escrita de EL FABRICANTE.
f) Gestionar posventa, garantías y reclamaciones de los clientes finales conforme a los estándares de EL FABRICANTE.

SÉPTIMA.- OBLIGACIONES DEL FABRICANTE
EL FABRICANTE se compromete a:
a) Suministrar los productos en los plazos, calidades y condiciones acordados.
b) Proporcionar materiales de marketing, formación sobre los productos y soporte técnico.
c) Mantener la cadena de suministro necesaria para atender los pedidos de EL DISTRIBUIDOR.
d) No vender directamente a los clientes finales del territorio asignado (si la distribución es exclusiva), salvo acuerdo expreso.

OCTAVA.- PROPIEDAD INTELECTUAL Y MARCA
EL FABRICANTE concede a EL DISTRIBUIDOR una licencia limitada, no exclusiva y revocable para utilizar sus marcas, logotipos y materiales de marketing únicamente para la promoción de los productos en el territorio acordado. Esta licencia terminará con el contrato.

EL DISTRIBUIDOR no podrá registrar marcas similares a las de EL FABRICANTE ni utilizar su imagen de marca fuera del contexto de distribución autorizado.

NOVENA.- POLÍTICA DE DEVOLUCIONES Y GARANTÍAS
Los productos defectuosos o que no cumplan las especificaciones acordadas podrán ser devueltos a EL FABRICANTE dentro de los treinta (30) días siguientes a su recepción, quien los reemplazará o emitirá el correspondiente abono. Las condiciones detalladas de garantía y devolución se establecen en el Anexo de Garantías.

DÉCIMA.- TERMINACIÓN
En caso de terminación del contrato por cualquier causa:
a) EL DISTRIBUIDOR deberá cesar inmediatamente el uso de las marcas de EL FABRICANTE.
b) EL FABRICANTE tendrá la opción de recomprar el inventario que EL DISTRIBUIDOR tenga en existencias al precio de adquisición.
c) Las obligaciones de confidencialidad se extenderán por tres (3) años tras la terminación.

${data.additionalClauses ? `DECIMOPRIMERA.- CLÁUSULAS ADICIONALES\n${data.additionalClauses}\n\n` : ""}DECIMOPR${data.additionalClauses ? "IMERA (CONT.)" : "IMERA"}.- LEY APLICABLE
Este contrato se rige por las leyes de ${data.city || "la jurisdicción de las partes"}.

Y en prueba de conformidad, firman el presente contrato.


_____________________________              _____________________________
        EL FABRICANTE                          EL DISTRIBUIDOR
    ${data.partyA || "_______________"}                    ${data.partyB || "_______________"}


DNI/NIF/RFC: _______________              DNI/NIF/RFC: _______________
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
  // ── Penalizaciones y cláusulas económicas existentes ────────────────────────
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

  // ── Renovación automática ────────────────────────────────────────────────────
  {
    pattern: /renovación automática|prórroga automática|se prorrogará automáticamente/gi,
    title: "Renovación automática del contrato",
    risk: "medium" as const,
    description: "El contrato se renueva automáticamente sin requerir acción expresa de las partes. Si no estás atento a las fechas, podrías quedar vinculado por otro período completo sin desearlo.",
    suggestion: "Verifica el plazo de aviso para cancelar la renovación. Negocia que sea al menos 30 días antes del vencimiento y que se envíe una notificación activa.",
  },
  {
    pattern: /preaviso.*(\d\s*días|una semana|48 horas|72 horas).*cancel|cancel.*preaviso.*(\d\s*días|una semana|48 horas|72 horas)/gi,
    title: "Plazo de cancelación muy corto",
    risk: "medium" as const,
    description: "La ventana para cancelar la renovación automática es demasiado breve, lo que puede hacer difícil ejercer ese derecho en la práctica.",
    suggestion: "Negocia un plazo de aviso de al menos 30 días antes del vencimiento. Programa un recordatorio en el calendario.",
  },
  {
    pattern: /precio.*bloqueado.*renovación|tarifa.*fija.*prórroga|incremento.*automático.*renov/gi,
    title: "Precio bloqueado o incremento automático en renovación",
    risk: "medium" as const,
    description: "El precio queda fijado o se incrementa automáticamente al renovar, sin posibilidad de renegociación.",
    suggestion: "Solicita que el precio de la renovación sea renegociado antes de cada período o indexado a un índice oficial (IPC).",
  },

  // ── Desequilibrio de partes ──────────────────────────────────────────────────
  {
    pattern: /solo.*(?:una parte|el cliente|el proveedor|la empresa).*podrá terminar|únicamente.*(?:una parte|el cliente|el proveedor).*rescindir/gi,
    title: "Terminación unilateral asimétrica",
    risk: "high" as const,
    description: "Solo una de las partes tiene el derecho de terminar el contrato a su conveniencia. Esto crea un desequilibrio contractual significativo.",
    suggestion: "Negocia que ambas partes tengan el mismo derecho de terminación bajo condiciones equivalentes o elimina la cláusula.",
  },
  {
    pattern: /modificar.*condiciones.*sin.*consentimiento|actualizar.*términos.*sin.*previo aviso|cambiar.*unilateralmente.*sin.*acuerdo/gi,
    title: "Modificación unilateral de condiciones",
    risk: "high" as const,
    description: "Una parte puede cambiar las condiciones del contrato sin requerir el acuerdo de la otra. Esto vulnera el principio de pacta sunt servanda.",
    suggestion: "Establece que cualquier modificación requiere el consentimiento escrito de ambas partes, y que los cambios no tendrán efecto retroactivo.",
  },
  {
    pattern: /arbitraje.*(?:exclusivamente|solo).*(?:en favor de|beneficia a).*(?:una parte|el cliente|la empresa)|disputas.*resueltas.*según.*criterio.*(?:exclusivo|unilateral)/gi,
    title: "Resolución de disputas asimétrica",
    risk: "high" as const,
    description: "El mecanismo de resolución de disputas está diseñado en favor de una sola parte, limitando tus opciones de defensa.",
    suggestion: "Negocia un proceso de resolución de conflictos neutral: mediación primero y arbitraje con árbitro independiente acordado por ambas partes.",
  },
  {
    pattern: /indemnizar.*únicamente.*(?:el prestador|el proveedor|el contratista)|solo.*(?:una parte).*responde.*por daños/gi,
    title: "Indemnización unilateral",
    risk: "high" as const,
    description: "Solo una de las partes está obligada a indemnizar a la otra, sin reciprocidad. Este desequilibrio supone un riesgo económico desproporcionado.",
    suggestion: "Negocia que las obligaciones de indemnización sean recíprocas y proporcionales al grado de culpa o negligencia de cada parte.",
  },

  // ── Propiedad intelectual ────────────────────────────────────────────────────
  {
    pattern: /obra.*por.*encargo|work.*for.*hire|todos los derechos.*cedidos.*empresa|propiedad.*intelectual.*pertenece.*exclusivamente.*(?:al cliente|a la empresa)/gi,
    title: "Cláusula work-for-hire: cesión total de PI",
    risk: "high" as const,
    description: "El contrato transfiere toda la propiedad intelectual a la otra parte, incluyendo posiblemente trabajos preexistentes o herramientas propias.",
    suggestion: "Limita la cesión a los entregables específicos de este contrato. Excluye expresamente tus herramientas, metodologías y propiedad intelectual preexistente.",
  },
  {
    pattern: /licencia.*perpetua.*gratuita|licencia.*irrevocable.*sin.*royalty|uso.*ilimitado.*sin.*compensación/gi,
    title: "Licencia perpetua y gratuita",
    risk: "high" as const,
    description: "Se concede una licencia de uso perpetua y sin contraprestación económica, lo que puede equivaler económicamente a una cesión total de derechos.",
    suggestion: "Limita la licencia en tiempo, territorio y finalidad de uso. Considera establecer una compensación económica periódica.",
  },
  {
    pattern: /no competencia.*(?:nacional|todo el país|internacional|mundial)|competencia.*prohibida.*(?:a nivel nacional|en todo el territorio)/gi,
    title: "No competencia de alcance geográfico excesivo",
    risk: "high" as const,
    description: "La cláusula de no competencia cubre un área geográfica demasiado amplia, lo que puede limitar gravemente tu capacidad de trabajar en tu sector.",
    suggestion: "Limita el alcance geográfico de la no competencia al área donde la empresa opera efectivamente y tiene clientes activos.",
  },
  {
    pattern: /no competencia.*(?:[3-9]\s*años|más de dos años|indefinida)|competencia.*prohibida.*(?:[3-9]\s*años|más de dos años)/gi,
    title: "No competencia con duración excesiva",
    risk: "high" as const,
    description: "La cláusula de no competencia tiene una duración superior a 2 años, lo que puede resultar desproporcionada y en muchas jurisdicciones ser nula.",
    suggestion: "Negocia una duración máxima de 12 a 24 meses. Verifica la legislación local, ya que muchas jurisdicciones limitan estas cláusulas.",
  },

  // ── Pagos y finanzas ─────────────────────────────────────────────────────────
  {
    pattern: /interés.*(?:2[1-9]|[3-9]\d)\s*%|mora.*(?:2[1-9]|[3-9]\d)\s*%|tasa.*retraso.*(?:2[1-9]|[3-9]\d)\s*%/gi,
    title: "Interés por mora excesivamente alto",
    risk: "high" as const,
    description: "La tasa de interés por mora supera el 20% anual, lo que puede resultar desproporcionada y en algunos países ser considerada usuraria.",
    suggestion: "Negocia una tasa de interés moratorio razonable (1-2% mensual o vinculada a la tasa de referencia del banco central más 2 puntos).",
  },
  {
    pattern: /pago.*(?:a\s*)?(?:90|120|180)\s*días|plazo.*(?:90|120|180)\s*días.*factura|(?:90|120|180)\s*días.*neto/gi,
    title: "Plazo de pago de 90 días o más",
    risk: "high" as const,
    description: "El plazo de pago supera los 60 días, afectando gravemente el flujo de caja. En muchas jurisdicciones latinoamericanas esto puede ser contrario a la ley.",
    suggestion: "Negocia pagos a 30 días o, como máximo, 60 días. Considera facturar por hitos para mejorar el flujo de caja.",
  },
  {
    pattern: /pago.*(?:a\s*)?(?:60|75)\s*días|plazo.*(?:60|75)\s*días.*factura/gi,
    title: "Plazo de pago de 60 a 75 días",
    risk: "medium" as const,
    description: "El plazo de pago está en el límite superior del estándar comercial, lo que puede generar tensiones de liquidez.",
    suggestion: "Intenta reducirlo a 30-45 días. Si no es posible, negocia pagos anticipados parciales o descuentos por pronto pago.",
  },
  {
    pattern: /factura.*requisitos.*(?:específicos|estrictos)|rechazo.*factura.*(?:por|debido a)|requisitos.*facturación.*(?:incumplimiento|penalización)/gi,
    title: "Requisitos de facturación que pueden retrasar el pago",
    risk: "medium" as const,
    description: "El contrato establece requisitos formales muy estrictos para la factura, cuyo incumplimiento puede retrasar el inicio del plazo de pago.",
    suggestion: "Aclara todos los requisitos de facturación antes de firmar y establece un procedimiento claro para subsanar errores sin reiniciar el plazo de pago.",
  },

  // ── Terminación ──────────────────────────────────────────────────────────────
  {
    pattern: /terminación.*conveniencia.*(?:solo|únicamente|exclusivamente).*(?:cliente|empresa|contratante)|rescisión.*a.*voluntad.*(?:solo|únicamente).*(?:una parte)/gi,
    title: "Terminación por conveniencia solo para una parte",
    risk: "high" as const,
    description: "Solo una de las partes puede terminar el contrato a su conveniencia y sin causa, dejando a la otra parte en una posición vulnerable.",
    suggestion: "Negocia el derecho mutuo de terminación por conveniencia con el mismo plazo de preaviso para ambas partes, o solicita una indemnización por terminación anticipada.",
  },
  {
    pattern: /plazo.*subsanación.*(?:1|2|3|4)\s*días|cure.*period.*(?:1|2|3|4)\s*días|corregir.*incumplimiento.*(?:1|2|3|4)\s*días/gi,
    title: "Plazo de subsanación insuficiente (menos de 5 días)",
    risk: "high" as const,
    description: "El período para corregir un incumplimiento es inferior a 5 días, lo que puede resultar prácticamente imposible de cumplir y facilitar terminaciones abusivas.",
    suggestion: "Negocia un plazo de subsanación de al menos 10-15 días hábiles para incumplimientos ordinarios, y considera plazos mayores para situaciones complejas.",
  },
  {
    pattern: /terminación.*inmediata.*sin.*causa|rescisión.*inmediata.*sin.*preaviso|resolución.*automática.*sin.*notificación/gi,
    title: "Terminación inmediata sin causa ni preaviso",
    risk: "high" as const,
    description: "El contrato permite la terminación inmediata sin causa justificada ni preaviso, lo que puede causarte graves perjuicios económicos sin tiempo de reacción.",
    suggestion: "Solicita que la terminación sin causa requiera siempre un preaviso mínimo de 30 días y el pago de los servicios o trabajos ya realizados.",
  },

  // ── Responsabilidad ──────────────────────────────────────────────────────────
  {
    pattern: /responsabilidad.*ilimitada|sin.*límite.*responsabilidad|liability.*unlimited/gi,
    title: "Cláusula de responsabilidad ilimitada",
    risk: "high" as const,
    description: "El contrato no establece un techo a la responsabilidad que asumes, lo que podría exponerte a reclamaciones por importes muy superiores al valor del contrato.",
    suggestion: "Negocia un límite de responsabilidad equivalente al valor total del contrato o, como máximo, al importe asegurado bajo tu póliza de responsabilidad civil.",
  },
  {
    pattern: /indemnizar.*reclamaciones.*terceros|defender.*demandas.*terceros|mantener.*indemne.*por.*terceros/gi,
    title: "Indemnización por reclamaciones de terceros sin límite",
    risk: "high" as const,
    description: "Estás obligado a indemnizar a la otra parte por reclamaciones de terceros sin ningún límite de importe ni restricción por tipo de daño.",
    suggestion: "Limita la indemnización a reclamaciones directamente causadas por tu negligencia o incumplimiento, y establece un techo económico claro.",
  },
  {
    pattern: /límite.*responsabilidad.*(?:10|5|1)\s*%|techo.*responsabilidad.*mínimo|cap.*responsabilidad.*inferior/gi,
    title: "Límite de responsabilidad excesivamente bajo",
    risk: "high" as const,
    description: "El límite de responsabilidad establecido es tan bajo que podría no cubrir los daños reales que un incumplimiento pudiera causar.",
    suggestion: "Negocia que el límite de responsabilidad sea como mínimo equivalente al valor total del contrato.",
  },
  {
    pattern: /daños.*consecuentes.*no.*cubiertos|daño.*indirecto.*excluido|pérdida.*beneficios.*no.*indemnizable|lucro.*cesante.*excluido/gi,
    title: "Exclusión de daños consecuentes y lucro cesante",
    risk: "medium" as const,
    description: "El contrato excluye la responsabilidad por daños indirectos, consecuentes y lucro cesante. En caso de incumplimiento, solo podrás reclamar daños directos.",
    suggestion: "Evalúa si esta exclusión es aceptable en función del tipo de servicio. Para contratos críticos, negocia al menos la cobertura del lucro cesante previsible.",
  },

  // ── Confidencialidad ─────────────────────────────────────────────────────────
  {
    pattern: /confidencialidad.*perpetua|obligación.*confidencial.*sin.*plazo|secreto.*indefinido.*sin.*excepción/gi,
    title: "Confidencialidad perpetua sin excepciones",
    risk: "medium" as const,
    description: "La obligación de confidencialidad no tiene plazo de vencimiento ni excepciones estándar (información pública, requerimiento legal), lo que puede resultar desproporcionado.",
    suggestion: "Negocia un plazo razonable (2-5 años) y asegúrate de que se incluyan las excepciones estándar: información de dominio público, revelación por mandato legal, etc.",
  },
  {
    pattern: /información confidencial.*incluye.*toda.*información|cualquier.*información.*considerada.*confidencial|toda.*comunicación.*confidencial/gi,
    title: "Definición de información confidencial excesivamente amplia",
    risk: "medium" as const,
    description: "La definición de información confidencial es tan amplia que podría incluir información ya pública o que recibirás de otras fuentes, complicando el cumplimiento.",
    suggestion: "Negocia una definición acotada que requiera que la información esté marcada como confidencial o sea claramente sensible por su naturaleza.",
  },

  // ── Jurisdicción ─────────────────────────────────────────────────────────────
  {
    pattern: /jurisdicción.*(?:extranjera|otro país|estados unidos|españa|reino unido)|tribunales.*(?:de otro país|internacionales|extranjeros)|leyes.*(?:de otro país|extranjeras)/gi,
    title: "Jurisdicción extranjera",
    risk: "high" as const,
    description: "El contrato establece que las disputas se resolverán bajo la ley o en los tribunales de otro país, lo que puede resultar en costos y complejidades muy elevadas.",
    suggestion: "Negocia que la jurisdicción sea la del país donde resides o donde se ejecutan los servicios. Como alternativa, acepta arbitraje internacional neutral.",
  },
  {
    pattern: /arbitraje.*obligatorio.*(?:según|conforme a).*(?:reglas|reglamento).*(?:de|del).*(?:cliente|empresa|contratante)|arbitraje.*administrado.*por.*(?:la empresa|el cliente)/gi,
    title: "Arbitraje obligatorio con reglas de una sola parte",
    risk: "high" as const,
    description: "Se impone un arbitraje obligatorio bajo reglas establecidas unilateralmente o administrado por instituciones vinculadas a una de las partes.",
    suggestion: "El arbitraje debe ser ante una institución neutral (CIAC, ICC, AAA) con reglas predeterminadas y árbitros independientes acordados por ambas partes.",
  },
  {
    pattern: /renuncia.*derechos.*consumidor|renuncia.*protecciones.*legales|waiver.*derechos.*irrenunciables/gi,
    title: "Renuncia a protecciones legales o derechos del consumidor",
    risk: "high" as const,
    description: "El contrato incluye renuncia a derechos que en muchas jurisdicciones son irrenunciables, lo que podría hacer nula esa cláusula o incluso el contrato entero.",
    suggestion: "Consulta con un abogado local. En muchos países LATAM no se puede renunciar a derechos laborales, del consumidor o de orden público.",
  },

  // ── Misceláneos ──────────────────────────────────────────────────────────────
  {
    pattern: /acuerdo.*completo.*reemplaza.*anteriores|integración.*total.*deja.*sin efecto|este contrato.*sustituye.*todos.*acuerdos/gi,
    title: "Cláusula de integración que elimina acuerdos previos",
    risk: "medium" as const,
    description: "Esta cláusula anula todos los acuerdos, representaciones y promesas previas. Si algo fue prometido verbalmente y no quedó en el contrato, no será exigible.",
    suggestion: "Antes de firmar, asegúrate de que todo lo prometido durante la negociación está reflejado en el texto del contrato o en un anexo firmado.",
  },
  {
    pattern: /ceder.*contrato.*sin.*consentimiento|transferir.*derechos.*sin.*aprobación|asignar.*obligaciones.*a.*tercero.*libremente/gi,
    title: "Cesión del contrato sin consentimiento",
    risk: "medium" as const,
    description: "Una de las partes puede ceder sus derechos u obligaciones a un tercero sin tu aprobación. Podrías acabar contratando involuntariamente con una entidad desconocida.",
    suggestion: "Incluye una cláusula que requiera consentimiento escrito previo para cualquier cesión, o al menos el derecho a terminar el contrato si la cesión te perjudica.",
  },
  {
    pattern: /fuerza mayor.*(?:no incluye|excluye).*(?:huelga|pandemia|crisis económica|fallo.*sistemas)|fuerza mayor.*lista.*cerrada/gi,
    title: "Definición de fuerza mayor demasiado restrictiva",
    risk: "medium" as const,
    description: "La definición de fuerza mayor es una lista cerrada y excluye eventos razonablemente imprevisibles. En caso de crisis, no podrás alegar este eximente.",
    suggestion: "Negocia una definición amplia de fuerza mayor que incluya cláusula de cierre ('y otros eventos fuera del control razonable de las partes').",
  },
  {
    pattern: /fuerza mayor.*(?:incluye|comprende).*(?:cambio.*mercado|variación.*precio|dificultades económicas)|cualquier.*evento.*fuerza mayor/gi,
    title: "Definición de fuerza mayor excesivamente amplia",
    risk: "medium" as const,
    description: "La definición de fuerza mayor es tan amplia que podría utilizarse para excusar incumplimientos que en realidad son gestionables o previsibles.",
    suggestion: "Limita la fuerza mayor a eventos genuinamente imprevisibles e irresistibles. Incluye la obligación de notificar y mitigar los efectos.",
  },
  {
    pattern: /no.*disparag|no.*desprestigiar|prohibido.*comentar.*negativamente|no.*críticas.*públicas/gi,
    title: "Cláusula de no difamación excesivamente amplia",
    risk: "medium" as const,
    description: "La cláusula de no difamación puede estar redactada de forma tan amplia que podría impedirte hacer valoraciones honestas o alertar a otros sobre malas prácticas.",
    suggestion: "Asegúrate de que la cláusula se limite a declaraciones falsas y malintencionadas, y que no cubra opiniones honestas, reseñas o comunicaciones privadas.",
  },
  {
    pattern: /prórroga.*tácita|renovación.*tácita|silencio.*implica.*aceptación.*renovación/gi,
    title: "Prórroga tácita por silencio",
    risk: "low" as const,
    description: "El contrato se renueva automáticamente si ninguna parte manifiesta su voluntad de no renovar. El silencio equivale al consentimiento.",
    suggestion: "Anota la fecha de vencimiento y el plazo de preaviso para no renovar. Considera negociar que la renovación requiera acción expresa, no silencio.",
  },
  {
    pattern: /gastos.*legales.*asume.*(?:la parte perdedora|quien pierda)|costas.*procesales.*paga.*vencido/gi,
    title: "Cláusula de costas procesales en contra",
    risk: "low" as const,
    description: "La parte que pierda el litigio deberá asumir todos los gastos legales. Esto puede disuadirte de reclamar tus derechos ante el temor al coste.",
    suggestion: "Evalúa si esta cláusula es recíproca. Considera proponer que cada parte asuma sus propios gastos independientemente del resultado.",
  },
  {
    pattern: /garantía.*excluida|sin.*garantía.*expresa|as.*is.*sin.*garantías|sin.*responsabilidad.*por.*defectos/gi,
    title: "Exclusión total de garantías",
    risk: "medium" as const,
    description: "El contrato excluye expresamente todas las garantías sobre los bienes o servicios entregados, lo que te deja sin protección ante defectos o incumplimientos de calidad.",
    suggestion: "Negocia al menos una garantía mínima de que los servicios/bienes serán conformes a las especificaciones acordadas y se entregarán libres de vicios conocidos.",
  },
  {
    pattern: /derechos.*reservados.*proveedor|licencia.*no.*exclusiva.*revocable|uso.*condicionado.*pago.*continuo/gi,
    title: "Licencia de uso revocable condicionada al pago continuo",
    risk: "low" as const,
    description: "Tu derecho de uso sobre el producto o servicio puede ser revocado si dejas de pagar, incluso si ya pagaste por el período completo.",
    suggestion: "Verifica las condiciones exactas de revocación. Para software o activos críticos, negocia un derecho de uso permanente sobre las versiones ya pagadas.",
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
