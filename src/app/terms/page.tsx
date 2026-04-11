import { FileText } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Términos de Servicio — ContractAI",
  description: "Lee los términos y condiciones de uso de ContractAI.",
};

const LAST_UPDATED = "10 de abril de 2026";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navbar simple */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-800">
              Contract<span className="text-indigo-500">AI</span>
            </span>
          </Link>
          <Link
            href="/"
            className="text-sm text-slate-500 hover:text-indigo-600 transition-colors"
          >
            ← Volver al inicio
          </Link>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <FileText className="w-3.5 h-3.5" />
            Legal
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Términos de Servicio
          </h1>
          <p className="text-slate-500 text-sm">
            Última actualización: {LAST_UPDATED}
          </p>
        </div>

        {/* Body */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sm:p-12 space-y-10 text-slate-700 leading-relaxed">

          <Section title="1. Aceptación de los términos">
            <p>
              Al acceder o utilizar ContractAI (el "Servicio"), usted acepta quedar vinculado por estos
              Términos de Servicio. Si no está de acuerdo con alguna parte de estos términos, no podrá
              utilizar el Servicio.
            </p>
            <p className="mt-3">
              ContractAI es una herramienta de asistencia para la creación y análisis de contratos mediante
              inteligencia artificial. No somos un despacho de abogados ni ofrecemos asesoría legal
              profesional.
            </p>
          </Section>

          <Section title="2. Descripción del Servicio">
            <p>
              ContractAI le permite:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-slate-600">
              <li>Generar borradores de contratos mediante IA a partir de sus respuestas</li>
              <li>Analizar texto de contratos para identificar cláusulas potencialmente riesgosas</li>
              <li>Guardar y gestionar sus contratos localmente en su dispositivo</li>
              <li>Acceder a plantillas de contratos comunes para Latinoamérica</li>
            </ul>
            <p className="mt-3">
              <strong>Importante:</strong> Los documentos generados por ContractAI son borradores
              de referencia. Recomendamos revisar todo contrato con un abogado licenciado antes de
              firmarlo o compartirlo con terceros.
            </p>
          </Section>

          <Section title="3. Uso aceptable">
            <p>Al usar ContractAI, usted se compromete a:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-slate-600">
              <li>Utilizar el Servicio únicamente para fines lícitos</li>
              <li>No intentar acceder a cuentas de otros usuarios</li>
              <li>No usar el Servicio para generar documentos fraudulentos o ilegales</li>
              <li>No reproducir, distribuir ni vender el contenido del Servicio sin autorización</li>
              <li>No realizar ingeniería inversa ni intentar extraer el código fuente</li>
            </ul>
          </Section>

          <Section title="4. Cuentas de usuario">
            <p>
              Para acceder a las funcionalidades completas del Servicio, debe crear una cuenta.
              Usted es responsable de mantener la confidencialidad de su contraseña y de todas las
              actividades que ocurran bajo su cuenta.
            </p>
            <p className="mt-3">
              <strong>Almacenamiento local:</strong> ContractAI almacena los datos de su cuenta y
              sus contratos en el almacenamiento local de su navegador (<em>localStorage</em>). Esto
              significa que sus datos son privados en su dispositivo y no se transmiten a servidores
              externos de ContractAI, salvo lo necesario para funcionalidades como el envío de correos
              de recuperación de contraseña.
            </p>
            <p className="mt-3">
              Nos reservamos el derecho de suspender o cancelar cuentas que violen estos términos.
            </p>
          </Section>

          <Section title="5. Propiedad intelectual">
            <p>
              El Servicio, incluyendo su código, diseño, logotipos y contenido editorial, es propiedad
              de ContractAI y está protegido por las leyes de propiedad intelectual aplicables.
            </p>
            <p className="mt-3">
              Los contratos y textos que usted genera o ingresa en el Servicio son de su propiedad.
              Al utilizar el Servicio, nos otorga una licencia limitada para procesar dichos textos
              con el único fin de prestarle el Servicio.
            </p>
          </Section>

          <Section title="6. Limitación de responsabilidad">
            <p>
              ContractAI se proporciona "tal como está" y "según disponibilidad". No garantizamos
              que el Servicio sea ininterrumpido, libre de errores o que los documentos generados
              sean jurídicamente válidos en su jurisdicción.
            </p>
            <p className="mt-3">
              En ningún caso ContractAI será responsable por daños indirectos, incidentales, especiales
              o consecuentes derivados del uso o la imposibilidad de uso del Servicio, incluyendo
              pérdidas económicas derivadas de contratos firmados con base en los borradores generados.
            </p>
          </Section>

          <Section title="7. Descargo sobre asesoría legal">
            <p>
              ContractAI no es un sustituto de la asesoría legal profesional. Los borradores de
              contratos generados por nuestra IA son herramientas de referencia educativa. Para
              cualquier asunto legal de importancia, le recomendamos consultar a un abogado habilitado
              en su país.
            </p>
          </Section>

          <Section title="8. Modificaciones al Servicio y los términos">
            <p>
              Nos reservamos el derecho de modificar o discontinuar el Servicio en cualquier momento
              sin previo aviso. También podemos actualizar estos Términos periódicamente. Los cambios
              entran en vigor al momento de su publicación en esta página. El uso continuado del
              Servicio constituye su aceptación de los nuevos términos.
            </p>
          </Section>

          <Section title="9. Ley aplicable">
            <p>
              Estos Términos se rigen por las leyes de la República de Colombia. Cualquier disputa
              relacionada con el Servicio se resolverá ante los tribunales competentes de dicho país,
              salvo que la legislación aplicable en su país de residencia disponga lo contrario.
            </p>
          </Section>

          <Section title="10. Contacto">
            <p>
              Si tiene preguntas sobre estos Términos, puede contactarnos en:{" "}
              <a
                href="mailto:hola@contractai.app"
                className="text-indigo-600 hover:underline"
              >
                hola@contractai.app
              </a>
            </p>
          </Section>

        </div>

        {/* Footer links */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} ContractAI. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-indigo-600 transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/login" className="hover:text-indigo-600 transition-colors">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xl font-bold text-slate-900 mb-3">{title}</h2>
      <div className="text-slate-600">{children}</div>
    </section>
  );
}
