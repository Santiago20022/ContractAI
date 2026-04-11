import { Shield } from "lucide-react";
import { FileText } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Política de Privacidad — ContractAI",
  description: "Conoce cómo ContractAI maneja y protege tu información.",
};

const LAST_UPDATED = "10 de abril de 2026";

export default function PrivacyPage() {
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
          <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
            <Shield className="w-3.5 h-3.5" />
            Privacidad
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            Política de Privacidad
          </h1>
          <p className="text-slate-500 text-sm">
            Última actualización: {LAST_UPDATED}
          </p>
        </div>

        {/* Highlight box */}
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mb-10 flex gap-4">
          <Shield className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-indigo-900 mb-1">Tu privacidad, nuestra prioridad</p>
            <p className="text-sm text-indigo-700">
              ContractAI está diseñado para minimizar la recopilación de datos. Tus contratos se
              guardan localmente en tu dispositivo y no los transmitimos a nuestros servidores.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sm:p-12 space-y-10 text-slate-700 leading-relaxed">

          <Section title="1. Información que recopilamos">
            <p className="font-medium text-slate-800 mb-2">a) Información que usted nos proporciona</p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 mb-4">
              <li>Dirección de correo electrónico (para crear su cuenta y recuperar contraseña)</li>
              <li>Nombre de usuario o nombre para mostrar</li>
              <li>Contraseña (almacenada de forma hasheada en su dispositivo)</li>
            </ul>

            <p className="font-medium text-slate-800 mb-2">b) Información generada por el uso del Servicio</p>
            <ul className="list-disc list-inside space-y-1 text-slate-600 mb-4">
              <li>Contratos generados o analizados (almacenados localmente en su navegador)</li>
              <li>Preferencias de uso y configuración</li>
            </ul>

            <p className="font-medium text-slate-800 mb-2">c) Información técnica (mínima)</p>
            <ul className="list-disc list-inside space-y-1 text-slate-600">
              <li>Dirección IP (registrada temporalmente por razones de seguridad)</li>
              <li>Tipo de navegador y sistema operativo</li>
              <li>Páginas visitadas y marcas de tiempo de acceso</li>
            </ul>
          </Section>

          <Section title="2. Almacenamiento local (localStorage)">
            <p>
              ContractAI utiliza el almacenamiento local del navegador (<em>localStorage</em>) para
              guardar su cuenta, contraseñas y contratos directamente en su dispositivo. Esto significa:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1 text-slate-600">
              <li>Sus contratos <strong>no se almacenan en nuestros servidores</strong></li>
              <li>Los datos se pierden si borra el caché o el almacenamiento del navegador</li>
              <li>Los datos son accesibles solo desde el mismo dispositivo y navegador</li>
              <li>No realizamos copias de seguridad de sus contratos en la nube</li>
            </ul>
          </Section>

          <Section title="3. Cómo usamos su información">
            <p>Usamos su información exclusivamente para:</p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-slate-600">
              <li>Autenticar su identidad y proteger su cuenta</li>
              <li>Enviar correos de recuperación de contraseña cuando usted los solicita</li>
              <li>Mejorar la calidad del Servicio mediante análisis agregados y anónimos</li>
              <li>Comunicarle actualizaciones importantes del Servicio</li>
            </ul>
            <p className="mt-3">
              <strong>No vendemos</strong> su información personal a terceros. Nunca.
            </p>
          </Section>

          <Section title="4. Compartición de datos con terceros">
            <p>
              Podemos compartir datos limitados únicamente con proveedores de servicios que nos ayudan
              a operar el Servicio:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-slate-600">
              <li>
                <strong>Resend</strong> (resend.com): para el envío de correos transaccionales
                como recuperación de contraseña. Su correo electrónico es compartido con Resend
                únicamente cuando solicita este servicio.
              </li>
              <li>
                <strong>Vercel</strong>: para el alojamiento de la aplicación web. Puede recopilar
                datos de acceso básicos según su{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline"
                >
                  política de privacidad
                </a>.
              </li>
            </ul>
            <p className="mt-3">
              Ninguno de estos proveedores tiene acceso al contenido de sus contratos.
            </p>
          </Section>

          <Section title="5. Seguridad">
            <p>
              Tomamos las siguientes medidas para proteger su información:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-slate-600">
              <li>Las contraseñas se almacenan hasheadas con sal criptográfica aleatoria</li>
              <li>Los tokens de recuperación de contraseña son de un solo uso y expiran en 1 hora</li>
              <li>Las comparaciones de tokens se realizan en tiempo constante para prevenir ataques de temporización</li>
              <li>La comunicación con nuestros servidores se realiza siempre sobre HTTPS</li>
            </ul>
            <p className="mt-3">
              Sin embargo, ningún sistema es completamente infalible. Le recomendamos usar una contraseña
              única y robusta para su cuenta de ContractAI.
            </p>
          </Section>

          <Section title="6. Sus derechos">
            <p>
              Dependiendo de su país de residencia, puede tener los siguientes derechos sobre sus datos:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1 text-slate-600">
              <li><strong>Acceso:</strong> solicitar una copia de los datos que tenemos sobre usted</li>
              <li><strong>Rectificación:</strong> corregir datos incorrectos o incompletos</li>
              <li><strong>Eliminación:</strong> solicitar la eliminación de su cuenta y datos asociados</li>
              <li><strong>Portabilidad:</strong> recibir sus datos en un formato legible por máquina</li>
              <li><strong>Oposición:</strong> oponerse al tratamiento de sus datos para ciertos fines</li>
            </ul>
            <p className="mt-3">
              Para ejercer cualquiera de estos derechos, escríbanos a{" "}
              <a
                href="mailto:privacidad@contractai.app"
                className="text-indigo-600 hover:underline"
              >
                privacidad@contractai.app
              </a>.
            </p>
          </Section>

          <Section title="7. Cookies">
            <p>
              ContractAI utiliza cookies técnicas estrictamente necesarias para el funcionamiento del
              Servicio (por ejemplo, para mantener su sesión activa). No utilizamos cookies de seguimiento
              publicitario ni de terceros con fines de marketing.
            </p>
          </Section>

          <Section title="8. Menores de edad">
            <p>
              El Servicio no está dirigido a personas menores de 18 años. No recopilamos
              intencionalmente información de menores. Si tiene conocimiento de que un menor nos ha
              proporcionado datos personales, contáctenos para eliminarlos.
            </p>
          </Section>

          <Section title="9. Cambios a esta política">
            <p>
              Podemos actualizar esta Política de Privacidad periódicamente. Le notificaremos de cambios
              significativos publicando la nueva política en esta página con la fecha de actualización.
              El uso continuado del Servicio tras los cambios implica su aceptación.
            </p>
          </Section>

          <Section title="10. Contacto">
            <p>
              Para preguntas, solicitudes o ejercicio de sus derechos de privacidad, contáctenos:
            </p>
            <div className="mt-3 bg-slate-50 rounded-xl p-4 text-sm text-slate-600 space-y-1">
              <p><strong>ContractAI</strong></p>
              <p>
                Email de privacidad:{" "}
                <a href="mailto:privacidad@contractai.app" className="text-indigo-600 hover:underline">
                  privacidad@contractai.app
                </a>
              </p>
              <p>
                Soporte general:{" "}
                <a href="mailto:hola@contractai.app" className="text-indigo-600 hover:underline">
                  hola@contractai.app
                </a>
              </p>
            </div>
          </Section>

        </div>

        {/* Footer links */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} ContractAI. Todos los derechos reservados.</p>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-indigo-600 transition-colors">
              Términos de Servicio
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
