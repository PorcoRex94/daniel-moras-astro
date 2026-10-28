# Integración del formulario de contacto

## Estado comprobado

El proyecto se genera de forma estática: `astro.config.mjs` no declara `output: "server"`, adapter, endpoint ni función serverless. El repositorio tampoco contiene `vercel.json`, `netlify.toml`, `wrangler.toml`, proveedor de correo, credenciales ni una variable `PUBLIC_CONTACT_FORM_ENDPOINT` configurada.

La URL histórica `daniel-moras-astro.vercel.app` es la única pista de infraestructura. No confirma que Vercel sea el hosting final ni autoriza a agregar una función específica de esa plataforma.

El formulario actual ya implementa en cliente:

- Obligatorios: `name`, `email` y `phone`.
- Opcionales: `company`, `category` y `message`.
- Validación de formato y longitudes, estado de procesamiento, éxito/error y conservación de datos ante una falla.
- Bloqueo de doble clic durante un envío y honeypot `website`.

No hay validación del servidor, rate limit ni recepción real hasta que exista un endpoint. Por lo tanto, el formulario **no está operativo** y no debe presentarse como tal.

## Propuesta compatible si se confirma Vercel

Mantener Astro estático y agregar una única Vercel Function Node en `api/contact.mjs`. Esta alternativa no requiere convertir todas las páginas a SSR ni incorporar el adapter de Astro. El cliente se configuraría con:

```env
PUBLIC_CONTACT_FORM_ENDPOINT=/api/contact
```

La función debe enviar por HTTP a un proveedor transaccional aprobado o, si ya existe, al SMTP autenticado del correo comercial. No se agrega ninguno hasta que se confirme cuál se utilizará. La función debe esperar la confirmación del proveedor antes de responder éxito.

Para un hosting distinto, se mantiene exactamente el contrato HTTP y se implementa la misma función en el mecanismo nativo del proveedor (por ejemplo, una función de Netlify o un Worker de Cloudflare). No conviene crear el endpoint antes de confirmar el destino, porque no sería verificable ni necesariamente desplegable.

## Contrato seguro del endpoint

El cliente envía `POST` JSON con `name`, `email`, `phone`, `company`, `category`, `message` y `website` (honeypot). El endpoint debe:

- Aceptar solo `POST` JSON de tamaño acotado y rechazar cuerpos inválidos.
- Revalidar los campos obligatorios, formatos y longitudes con `src/lib/contact-form-validation.js` o reglas equivalentes del lado servidor.
- Rechazar el honeypot completo y aplicar límite de frecuencia por IP antes de intentar enviar correo.
- Escapar todo contenido interpolado en el email, usar el asunto fijo `Nueva consulta web — Daniel Moras` y establecer `Reply-To` únicamente con el email ya validado del visitante.
- Usar un destinatario configurado solo en servidor y no aceptar destinatarios desde el navegador.
- Responder `{ "ok": true }` exclusivamente tras la aceptación del proveedor; ante un error, responder `{ "ok": false, "errors": { ... } }` sin filtrar detalles internos ni credenciales.
- Registrar solo metadatos operativos mínimos y nunca el contenido completo ni secretos en logs públicos.

El honeypot no reemplaza la limitación de frecuencia. Si el hosting elegido no aporta un rate limit confiable, hay que aprobar explícitamente el mecanismo adicional antes de habilitar el formulario.

## Datos mínimos para activarlo y probar recepción

1. Hosting final confirmado y acceso al proyecto correspondiente.
2. Destinatario comercial autorizado. El email visible en la interfaz no se toma automáticamente como destinatario.
3. Método de envío aprobado: SMTP autenticado existente o proveedor transaccional, junto con remitente/dominio verificado.
4. Secretos cargados exclusivamente en las variables del hosting: credencial del proveedor, `CONTACT_FROM_EMAIL` y `CONTACT_TO_EMAIL`. Nunca en `.env.example`, `PUBLIC_*` ni Git.
5. Mecanismo de rate limit y, si se requiere, antispam adicional.
6. Un destinatario de prueba autorizado para comprobar recepción, remitente y `Reply-To` antes de habilitar producción.

Mientras falte cualquiera de esos datos, `PUBLIC_CONTACT_FORM_ENDPOINT` debe permanecer vacío. No hay prueba de recepción real todavía.
