<?php

declare(strict_types=1);

/*
 * Copiar este archivo FUERA de public_html como contact.config.php.
 * No subir valores reales al repositorio ni dentro de dist/.
 */
return [
    'recipientEmail' => 'confirmar-destinatario@ejemplo.com',
    'fromEmail' => 'formularios@ejemplo.com',
    'fromName' => 'Daniel Moras',
    'allowedOrigins' => [
        'https://confirmar-dominio-final.ejemplo',
    ],
    'smtp' => [
        'host' => 'smtp.hostinger.com',
        'port' => 465,
        'encryption' => 'ssl', // "ssl" para 465 o "tls" para 587.
        'username' => 'formularios@ejemplo.com',
        'password' => 'REEMPLAZAR_CON_CONTRASENA_SMTP',
    ],
    'rateLimit' => [
        'directory' => __DIR__ . '/contact-rate-limit',
        'salt' => 'GENERAR_UN_SECRETO_ALEATORIO_LARGO',
        'maxRequests' => 5,
        'windowSeconds' => 900,
    ],
];
