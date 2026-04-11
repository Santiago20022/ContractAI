/**
 * Script para Google Apps Script
 * Crea automáticamente la encuesta de validación — Módulo de Contratos NexaOps
 *
 * INSTRUCCIONES:
 * 1. Ve a https://script.google.com
 * 2. Crea un nuevo proyecto (Proyecto sin título)
 * 3. Borra todo el contenido del editor
 * 4. Pega este script completo
 * 5. Haz clic en ▶ Ejecutar (selecciona la función "crearEncuesta")
 * 6. Acepta los permisos que pide Google
 * 7. Cuando termine, revisa el log (Ver → Registros) — ahí aparece el link del formulario
 */

function crearEncuesta() {

  // ── Crear el formulario ──────────────────────────────────────────────────
  var form = FormApp.create("Encuesta de Validación — Módulo de Contratos NexaOps");

  form.setDescription(
    "Esta encuesta es parte de un ejercicio académico de Ingeniería de Software I. " +
    "Su objetivo es entender cómo las personas manejan contratos y acuerdos en su entorno laboral o de estudio. " +
    "No hay respuestas correctas ni incorrectas, y los datos son completamente anónimos. " +
    "Solo toma 3 minutos completarla."
  );

  form.setConfirmationMessage("¡Muchas gracias por su tiempo! Sus respuestas son muy valiosas para este proyecto.");
  form.setAllowResponseEdits(false);
  form.setLimitOneResponsePerUser(false);
  form.setProgressBar(true);
  form.setShuffleQuestions(false);


  // ── PREGUNTA 1 — Rol (selección múltiple, una opción) ───────────────────
  form.addMultipleChoiceItem()
    .setTitle("¿Cuál es el rol principal que desempeña la persona que responde esta encuesta?")
    .setChoices([
      FormApp.getActiveForm().createChoice("Empleado administrativo o de oficina"),
      FormApp.getActiveForm().createChoice("Emprendedor o dueño de negocio"),
      FormApp.getActiveForm().createChoice("Estudiante universitario"),
      FormApp.getActiveForm().createChoice("Freelancer o trabajador independiente"),
    ])
    .showOtherOption(true)
    .setRequired(true);


  // ── PREGUNTA 2 — Escala: dificultad de herramientas ─────────────────────
  form.addScaleItem()
    .setTitle(
      "Las herramientas que existen hoy para crear o revisar contratos son complicadas de usar " +
      "y requieren conocimientos legales que la mayoría de personas no tiene."
    )
    .setHelpText(
      "Ejemplo: programas como Word no tienen guía legal, y herramientas especializadas como DocuSign " +
      "o Adobe Sign suelen ser confusas si no se es abogado.\n" +
      "1 = Totalmente en desacuerdo  ·  5 = Totalmente de acuerdo"
    )
    .setBounds(1, 5)
    .setLabels("Totalmente en desacuerdo", "Totalmente de acuerdo")
    .setRequired(true);

  form.addTextItem()
    .setTitle("¿Qué experiencia tiene la persona con este tipo de herramientas?")
    .setHelpText("Campo opcional — puede dejarlo en blanco si lo prefiere.")
    .setRequired(false);


  // ── PREGUNTA 3 — Escala: alertas automáticas ────────────────────────────
  form.addScaleItem()
    .setTitle(
      "Sería de gran ayuda que un sistema avisara automáticamente cuando un contrato tiene " +
      "condiciones que podrían perjudicar a quien lo firma, antes de que lo acepte."
    )
    .setHelpText(
      "Ejemplo: el sistema detecta una cláusula que obliga a pagar una multa del 40% del valor total " +
      "si se cancela el contrato con menos de 30 días de aviso.\n" +
      "1 = Totalmente en desacuerdo  ·  5 = Totalmente de acuerdo"
    )
    .setBounds(1, 5)
    .setLabels("Totalmente en desacuerdo", "Totalmente de acuerdo")
    .setRequired(true);

  form.addTextItem()
    .setTitle("¿Alguna vez alguien en su entorno firmó algo perjudicial por no leer bien el contrato?")
    .setHelpText("Campo opcional — puede dejarlo en blanco si lo prefiere.")
    .setRequired(false);


  // ── PREGUNTA 4 — Escala: historial de contratos ─────────────────────────
  form.addScaleItem()
    .setTitle(
      "Contar con un registro organizado de todos los contratos gestionados — con fecha de inicio, " +
      "estado actual y fecha de vencimiento — facilita el trabajo de cualquier persona o empresa."
    )
    .setHelpText(
      "Ejemplo: poder ver de un vistazo que un contrato con un proveedor vence en 15 días y aún no ha sido renovado.\n" +
      "1 = Totalmente en desacuerdo  ·  5 = Totalmente de acuerdo"
    )
    .setBounds(1, 5)
    .setLabels("Totalmente en desacuerdo", "Totalmente de acuerdo")
    .setRequired(true);

  form.addTextItem()
    .setTitle("¿Cómo lleva el registro de contratos actualmente la persona u organización que representa?")
    .setHelpText("Campo opcional — puede dejarlo en blanco si lo prefiere.")
    .setRequired(false);


  // ── PREGUNTA 5 — Escala: costo como barrera ─────────────────────────────
  form.addScaleItem()
    .setTitle(
      "El precio elevado de las herramientas profesionales para contratos ha sido una barrera real " +
      "para que muchas personas o empresas pequeñas las adopten."
    )
    .setHelpText(
      "Ejemplo: plataformas como PandaDoc o DocuSign cobran entre $15 y $50 USD al mes, lo que para una " +
      "pequeña empresa o freelancer puede ser difícil de justificar.\n" +
      "1 = Totalmente en desacuerdo  ·  5 = Totalmente de acuerdo"
    )
    .setBounds(1, 5)
    .setLabels("Totalmente en desacuerdo", "Totalmente de acuerdo")
    .setRequired(true);

  form.addTextItem()
    .setTitle("¿Cuánto estaría dispuesta la persona a pagar mensualmente por una herramienta así?")
    .setHelpText("Campo opcional — puede dejarlo en blanco si lo prefiere.")
    .setRequired(false);


  // ── PREGUNTA 6 — Escala: guía paso a paso ───────────────────────────────
  form.addScaleItem()
    .setTitle(
      "Un sistema que guíe paso a paso en la creación de un contrato — haciendo preguntas simples — " +
      "es más útil que tener que redactarlo desde cero o buscar plantillas por internet."
    )
    .setHelpText(
      "Ejemplo: el sistema pregunta '¿quién contrata?', '¿qué servicio se va a prestar?', '¿cuánto se paga y cuándo?' " +
      "y con esas respuestas genera el contrato completo automáticamente.\n" +
      "1 = Totalmente en desacuerdo  ·  5 = Totalmente de acuerdo"
    )
    .setBounds(1, 5)
    .setLabels("Totalmente en desacuerdo", "Totalmente de acuerdo")
    .setRequired(true);

  form.addTextItem()
    .setTitle("¿Qué parte del proceso de crear un contrato le parece más difícil o demorada?")
    .setHelpText("Campo opcional — puede dejarlo en blanco si lo prefiere.")
    .setRequired(false);


  // ── PREGUNTA 7 — Cómo maneja contratos (selección múltiple) ─────────────
  form.addMultipleChoiceItem()
    .setTitle(
      "Cuando alguien necesita manejar un contrato o acuerdo en su trabajo o estudio, " +
      "¿cuál de estas opciones describe mejor cómo suele hacerlo?"
    )
    .setChoices([
      FormApp.getActiveForm().createChoice("Lo redacta en Word o Google Docs, sin ninguna plantilla fija"),
      FormApp.getActiveForm().createChoice("Usa una plantilla que alguien le pasó anteriormente"),
      FormApp.getActiveForm().createChoice("Usa una herramienta especializada para contratos"),
      FormApp.getActiveForm().createChoice("Le pide ayuda a alguien con más conocimiento (abogado, jefe, compañero)"),
      FormApp.getActiveForm().createChoice("No maneja contratos en su trabajo o estudio"),
    ])
    .showOtherOption(true)
    .setRequired(true);


  // ── PREGUNTA 8 — Reacción ante riesgos (selección múltiple) ─────────────
  form.addMultipleChoiceItem()
    .setTitle(
      "Si un sistema mostrara automáticamente los puntos más riesgosos de un contrato justo antes " +
      "de firmarlo, ¿cuál sería la reacción más probable de la persona?"
    )
    .setHelpText(
      "Ejemplo: el sistema indica que hay una penalización del 30% del valor total si el contrato " +
      "se termina antes de tiempo, y que los pagos no tienen fecha fija definida."
    )
    .setChoices([
      FormApp.getActiveForm().createChoice("Lo firmaría de todas formas, confiando en su criterio"),
      FormApp.getActiveForm().createChoice("Pediría que se modificaran esas cláusulas antes de firmar"),
      FormApp.getActiveForm().createChoice("Consultaría con un abogado antes de proceder"),
      FormApp.getActiveForm().createChoice("Cancelaría la firma si el nivel de riesgo es alto"),
      FormApp.getActiveForm().createChoice("Dependería del contexto y del tipo de contrato"),
    ])
    .showOtherOption(true)
    .setRequired(true);


  // ── PREGUNTA 9 — Característica más importante (selección múltiple) ──────
  form.addMultipleChoiceItem()
    .setTitle(
      "¿Qué característica considera más importante a la hora de elegir una herramienta " +
      "para crear y administrar contratos?"
    )
    .setChoices([
      FormApp.getActiveForm().createChoice("Que sea fácil de usar sin necesidad de ser abogado"),
      FormApp.getActiveForm().createChoice("Que sea económica o gratuita"),
      FormApp.getActiveForm().createChoice("Que esté disponible completamente en español"),
      FormApp.getActiveForm().createChoice("Que detecte y avise sobre cláusulas peligrosas"),
      FormApp.getActiveForm().createChoice("Que guarde todos los contratos organizados en un solo lugar"),
    ])
    .showOtherOption(true)
    .setRequired(true);


  // ── PREGUNTA 10 — Situación problemática (respuesta larga) ──────────────
  form.addParagraphTextItem()
    .setTitle(
      "Describa una situación real o hipotética en la que el manejo de un contrato generó " +
      "un problema, confusión o pérdida de tiempo."
    )
    .setHelpText(
      "Puede ser algo que le ocurrió directamente, a alguien conocido, o una situación que considera probable en su entorno.\n\n" +
      "Ejemplo: 'Firmé un acuerdo de servicios con un cliente sin revisarlo bien y luego tuve que pagar " +
      "una multa por cancelarlo antes de tiempo porque no había leído esa cláusula.'"
    )
    .setRequired(true);


  // ── PREGUNTA 11 — Funcionalidad nueva (respuesta larga) ─────────────────
  form.addParagraphTextItem()
    .setTitle(
      "¿Qué funcionalidad le agregaría a un sistema de gestión de contratos que considera que " +
      "las herramientas actuales no ofrecen de manera adecuada?"
    )
    .setHelpText(
      "Ejemplo: que el sistema avise por WhatsApp cuando un contrato está por vencer, " +
      "o que permita firmar digitalmente desde el celular sin necesidad de imprimir ni escanear."
    )
    .setRequired(false);


  // ── Imprimir el link en los logs ─────────────────────────────────────────
  Logger.log("✅ Formulario creado exitosamente.");
  Logger.log("🔗 Link para responder: " + form.getPublishedUrl());
  Logger.log("✏️  Link para editar:   " + form.getEditUrl());
}
