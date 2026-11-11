# Integración del formulario de contacto

## Estado comprobado

El proyecto se genera de forma estática: `astro.config.mjs` no declara `output: "server"` ni adapter. El repositorio no contiene credenciales ni una variable `PUBLIC_CONTACT_FORM_ENDPOINT` configurada.

Hostinger es el hosting final previsto. La URL histórica de Vercel no se usa como canonical ni como base de metadatos.

El formulario actual ya implementa en cliente:

- Obligatorios: `name`, `email` y `phone`.
- Opcionales: `company`, `category` y `message`.
- Validación de formato y longitudes, estado de procesamiento, éxito/error y conservación de datos ante una falla.
- Bloqueo de doble clic durante un envío y honeypot `website`.

No hay validación del servidor, rate limit ni recepción real hasta que exista un endpoint. Por lo tanto, el formulario **no está operativo** y no debe presentarse como tal.

## Implementación compatible con Hostinger

Se mantiene Astro estático y se agregó un endpoint PHP independiente en `hosting/contact-endpoint/contact.php`. No requiere convertir el sitio a SSR ni agregar un servicio de pago. Una vez instalado en Hostinger, el cliente se configura con:

```env
PUBLIC_CONTACT_FORM_ENDPOINT=/api/contact.php
```

El endpoint usa SMTP autenticado de Hostinger mediante PHPMailer, no `mail()`. No se agregaron destinatarios ni credenciales: la configuración privada se define en el servidor, fuera de `public_html`. El paso a paso y los requisitos están en [hostinger-contact-endpoint.md](./hostinger-contact-endpoint.md).

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
