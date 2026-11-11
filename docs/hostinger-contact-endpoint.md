# Formulario de contacto en Hostinger

## Estado del repositorio

Astro sigue siendo estático. El formulario del sitio valida en el navegador y se prepara para enviar JSON a `PUBLIC_CONTACT_FORM_ENDPOINT`; no contiene destinatarios ni credenciales. El endpoint PHP se mantiene fuera de `public/` en `hosting/contact-endpoint/` para que no se copie por accidente a `dist/`.

La propuesta usa PHP y SMTP autenticado de Hostinger, no `mail()`. PHPMailer se instala en el hosting con Composer y el endpoint confirma éxito solo después de que SMTP acepte el mensaje. Sus controles incluyen validación servidor, honeypot, tamaño máximo de body, origen permitido, límite por IP/user-agent y clave idempotente por intento.

## Datos indispensables antes de habilitarlo

1. URL final HTTPS que se usará en producción (`SITE_URL`) y que se agregará a `allowedOrigins`.
2. Destinatario comercial autorizado (`recipientEmail`). El email visible en la web no se usa como destinatario por defecto.
3. Cuenta de correo Hostinger para remitir, sus credenciales SMTP y el nombre del remitente.
4. Confirmación de que el plan permite PHP y Composer/SSH, o un procedimiento equivalente aprobado para instalar PHPMailer.
5. Directorio privado, fuera de `public_html`, con permisos de escritura para el límite de frecuencia.
6. Destinatario de prueba autorizado para una recepción real, incluido Reply-To.

No completar `PUBLIC_CONTACT_FORM_ENDPOINT` ni declarar el formulario operativo hasta que los seis puntos estén resueltos.

## Instalación en Hostinger

1. Para revisión, construir con `SITE_URL=https://subdominio-de-revision` y `SITE_INDEXING=false`. Para producción, usar el dominio definitivo y `SITE_INDEXING=true` una vez autorizada la indexación. En ambos casos, configurar `PUBLIC_CONTACT_FORM_ENDPOINT=/api/contact.php` solo cuando ese endpoint exista. Si ya se confirmó el WhatsApp comercial, agregar `PUBLIC_WHATSAPP_NUMBER` solo en el entorno de build.
2. Subir **solo** `dist/` a `public_html`.
3. En `public_html/api/`, subir `contact.php` y `composer.json` desde `hosting/contact-endpoint/`.
4. Crear fuera de `public_html` el archivo `private/contact.config.php` copiando `contact.config.example.php`. Completarlo en el servidor; este archivo está ignorado por Git.
5. Desde SSH, en `public_html/api/`, ejecutar `composer2 install --no-dev --classmap-authoritative`. Esto crea `vendor/`, que tampoco se versiona.
6. Confirmar que `private/contact-rate-limit/` es escribible por PHP y que no es público. No almacenar consultas ni contraseñas dentro de `public_html`.
7. Probar con un envío controlado: validar recepción en el destinatario autorizado, asunto exacto `Nueva consulta web — Daniel Moras`, Reply-To del visitante, rechazo de datos inválidos, límite de frecuencia y comportamiento ante una credencial SMTP incorrecta.

Si la estructura de directorios difiere, configurar `DANIEL_MORAS_CONTACT_CONFIG` en el entorno PHP con la ruta absoluta del archivo privado. Si el panel no permite variables de entorno, ajustar esa ruta una sola vez en el endpoint **sin incluir secretos**.

## Operación segura

- El endpoint solo acepta `POST` JSON de hasta 8 KiB.
- `name`, `email` y `phone` se vuelven a validar en PHP; empresa, rubro y consulta son opcionales.
- El destinatario y remitente se leen solo desde el archivo privado.
- No se utiliza `mail()` ni se exponen errores SMTP al visitante.
- Ante un error de red o servidor, el cliente conserva los datos para reintentar. El mismo `requestId` no dispara otro correo después de una entrega aceptada.
- Una vez terminado el ensayo, conservar `PUBLIC_CONTACT_FORM_ENDPOINT` vacío en cualquier entorno de revisión que no tenga el endpoint configurado.

Las guías de Hostinger describen la configuración SMTP, el uso de Composer y la recomendación de SMTP autenticado frente a `mail()`:

- https://support.hostinger.com/en/articles/1575756-how-to-get-email-account-configuration-details-for-hostinger-email
- https://support.hostinger.com/en/articles/5792078-how-to-use-composer
- https://support.hostinger.com/en/articles/11393648-php-mail-limitation-explained-how-to-improve-email-delivery-with-smtp
