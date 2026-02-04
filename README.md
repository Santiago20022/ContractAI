# ContractAI

Plataforma web para generar y analizar contratos legales de forma simple y segura. Diseñada para freelancers, emprendedores y pequenos negocios que necesitan proteger sus acuerdos comerciales sin depender de abogados costosos.

## El Problema

Cualquier persona que haya trabajado como freelancer o iniciado un negocio sabe lo complicado que es manejar contratos:

- Los abogados cobran demasiado por documentos que muchas veces no entendemos
- Las plantillas gratuitas de internet no se adaptan a nuestras necesidades
- Firmamos contratos sin saber si las clausulas nos perjudican
- Perdemos tiempo valioso en papeleo en lugar de trabajar

## La Solucion

ContractAI resuelve esto con dos funcionalidades principales:

**Generador de Contratos**: Seleccionas el tipo de contrato que necesitas, completas los datos basicos (nombres, montos, duracion) y obtienes un documento profesional listo para firmar.

**Analizador de Contratos**: Subes o pegas un contrato existente y el sistema identifica clausulas problematicas, calcula un score de seguridad y te explica en lenguaje simple que significa cada seccion.

## Tecnologias

El proyecto esta construido con el stack moderno de React:

- **Next.js 15** - Framework de React con App Router para el routing y renderizado
- **React 19** - Libreria de UI con los ultimos hooks y mejoras de rendimiento
- **TypeScript** - Tipado estatico para evitar errores en tiempo de desarrollo
- **Tailwind CSS** - Utilidades CSS para estilos rapidos y consistentes
- **Framer Motion** - Animaciones fluidas para mejor experiencia de usuario

## Estructura del Proyecto

```
src/
├── app/                    # Rutas de la aplicacion (App Router)
│   ├── page.tsx           # Landing page principal
│   ├── login/             # Pagina de inicio de sesion
│   ├── register/          # Pagina de registro
│   ├── generate/          # Generador de contratos
│   ├── analyze/           # Analizador de contratos
│   └── dashboard/         # Panel del usuario
│       └── contracts/     # Lista y detalle de contratos
│
├── components/
│   ├── ui/                # Componentes reutilizables (Button, Card, Input)
│   ├── landing/           # Secciones de la landing page
│   └── shared/            # Navbar, Footer, DashboardLayout
│
├── context/
│   └── AuthContext.tsx    # Contexto de autenticacion global
│
└── lib/
    ├── auth.ts            # Logica de autenticacion con LocalStorage
    ├── contracts-storage.ts   # CRUD de contratos en LocalStorage
    └── contract-templates.ts  # Plantillas y logica de analisis
```

## Como Funciona

### Autenticacion

El sistema usa LocalStorage para manejar sesiones. Los usuarios se registran con email y contrasena, y sus datos se guardan localmente en el navegador. Esto permite que la app funcione sin necesidad de un backend externo.

```typescript
// Registro de usuario
const result = register(email, password, name);
if (result.success) {
  // Usuario creado y sesion iniciada
}

// Login
const result = login(email, password);
if (result.success) {
  // Sesion iniciada
}
```

### Generacion de Contratos

Los contratos se generan a partir de plantillas predefinidas que se rellenan con los datos del usuario. Hay 8 tipos disponibles:

1. Contrato de Servicios - Para freelancers y consultores
2. NDA (Confidencialidad) - Proteccion de informacion sensible
3. Contrato de Trabajo - Relacion empleador-empleado
4. Contrato de Socios - Acuerdos entre socios de negocio
5. Contrato de Alquiler - Arrendamiento de propiedades
6. Contrato de Compraventa - Transacciones de bienes
7. Terminos y Condiciones - Para sitios web y apps
8. Politica de Privacidad - Cumplimiento de proteccion de datos

Cada plantilla incluye clausulas estandar del sector legal hispanohablante, con espacios para personalizar nombres, montos, duraciones y clausulas adicionales.

### Analisis de Contratos

El analizador busca patrones de riesgo comunes en contratos:

- Penalizaciones excesivas (mas del 20% del valor)
- Cesion total de derechos de propiedad intelectual
- Clausulas de exclusividad sin limite temporal
- Plazos de pago superiores a 60 dias
- Confidencialidad unilateral
- Responsabilidad ilimitada

Para cada problema detectado, el sistema muestra la clausula especifica, explica por que es un riesgo y sugiere como negociar una mejor alternativa.

## Instalacion

```bash
# Clonar el repositorio
git clone https://github.com/Santiago20022/ContractAI.git
cd ContractAI

# Instalar dependencias
npm install

# Iniciar en modo desarrollo
npm run dev

# Construir para produccion
npm run build
```

La aplicacion estara disponible en `http://localhost:3000`

## Despliegue

El proyecto esta optimizado para desplegarse en Vercel:

```bash
npm install -g vercel
vercel
```

Tambien funciona en cualquier plataforma que soporte Node.js como Netlify, Railway o un VPS con Nginx.

## Proximos Pasos

Funcionalidades planeadas para futuras versiones:

- Integracion con base de datos (Supabase o PostgreSQL)
- Exportacion a PDF con formato profesional
- Firma digital de documentos
- Colaboracion en tiempo real para editar contratos
- API publica para integraciones

## Autor

**Santiago Garcia**

- GitHub: [Santiago20022](https://github.com/Santiago20022)
- LinkedIn: [santiagogarciadev](https://www.linkedin.com/in/santiagogarciadev/)
- Instagram: [@santiagogarcia_dev](https://www.instagram.com/santiagogarcia_dev/)

## Licencia

MIT License - Puedes usar, modificar y distribuir este codigo libremente.
