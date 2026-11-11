<?php

declare(strict_types=1);

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

const MAX_BODY_BYTES = 8192;

function respond(int $status, array $payload): never
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function field(string $value): string
{
    return trim($value);
}

function readConfig(): array
{
    $configPath = getenv('DANIEL_MORAS_CONTACT_CONFIG') ?: dirname(__DIR__, 2) . '/private/contact.config.php';

    if (!is_file($configPath)) {
        respond(503, ['ok' => false, 'message' => 'El servicio de consultas no está disponible temporalmente.']);
    }

    $config = require $configPath;
    if (!is_array($config)) {
        respond(503, ['ok' => false, 'message' => 'El servicio de consultas no está disponible temporalmente.']);
    }

    return $config;
}

function applyCors(array $config): void
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowedOrigins = $config['allowedOrigins'] ?? [];

    if ($origin !== '') {
        if (!in_array($origin, $allowedOrigins, true)) {
            respond(403, ['ok' => false, 'message' => 'Origen no autorizado.']);
        }

        header("Access-Control-Allow-Origin: {$origin}");
        header('Vary: Origin');
        header('Access-Control-Allow-Methods: POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
    }

    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
        http_response_code(204);
        exit;
    }
}

function validationErrors(array $input): array
{
    $errors = [];
    if ($input['name'] === '') {
        $errors['name'] = 'Ingresá tu nombre.';
    }
    if ($input['email'] === '' || !filter_var($input['email'], FILTER_VALIDATE_EMAIL) || preg_match('/[\r\n]/', $input['email'])) {
        $errors['email'] = 'Ingresá un email válido.';
    }
    $digits = preg_replace('/\D+/', '', $input['phone']);
    if ($input['phone'] === '' || strlen($digits) < 7 || strlen($digits) > 20) {
        $errors['phone'] = 'Ingresá un teléfono válido.';
    }
    if ($input['name'] !== '' && strlen($input['name']) > 100) {
        $errors['name'] = 'El nombre no puede superar 100 caracteres.';
    }
    if ($input['email'] !== '' && strlen($input['email']) > 254) {
        $errors['email'] = 'El email no puede superar 254 caracteres.';
    }
    if ($input['phone'] !== '' && strlen($input['phone']) > 40) {
        $errors['phone'] = 'El teléfono no puede superar 40 caracteres.';
    }
    if ($input['company'] !== '' && strlen($input['company']) > 120) {
        $errors['company'] = 'La empresa no puede superar 120 caracteres.';
    }
    if ($input['category'] !== '' && strlen($input['category']) > 64) {
        $errors['category'] = 'El rubro no es válido.';
    }
    if ($input['message'] !== '' && strlen($input['message']) > 2000) {
        $errors['message'] = 'La consulta no puede superar 2000 caracteres.';
    }

    return $errors;
}

function rateLimit(string $directory, string $key, string $requestId, int $maxRequests, int $windowSeconds, callable $send): bool
{
    if (!is_dir($directory) && !mkdir($directory, 0700, true) && !is_dir($directory)) {
        throw new RuntimeException('No se pudo inicializar el límite de solicitudes.');
    }

    $file = $directory . DIRECTORY_SEPARATOR . hash('sha256', $key) . '.json';
    $handle = fopen($file, 'c+');
    if ($handle === false || !flock($handle, LOCK_EX)) {
        throw new RuntimeException('No se pudo aplicar el límite de solicitudes.');
    }

    try {
        $raw = stream_get_contents($handle);
        $state = json_decode($raw ?: '{"requests":{}}', true);
        $requests = is_array($state['requests'] ?? null) ? $state['requests'] : [];
        $now = time();
        $requests = array_filter($requests, static fn ($timestamp) => is_int($timestamp) && $timestamp > $now - $windowSeconds);

        if (array_key_exists($requestId, $requests)) {
            return true;
        }
        if (count($requests) >= $maxRequests) {
            respond(429, ['ok' => false, 'message' => 'Esperá unos minutos antes de enviar otra consulta.']);
        }

        $send();
        $requests[$requestId] = $now;
        ftruncate($handle, 0);
        rewind($handle);
        fwrite($handle, json_encode(['requests' => $requests], JSON_UNESCAPED_SLASHES));
        fflush($handle);
        return false;
    } finally {
        flock($handle, LOCK_UN);
        fclose($handle);
    }
}

$config = readConfig();
applyCors($config);

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(405, ['ok' => false, 'message' => 'Método no permitido.']);
}
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > MAX_BODY_BYTES) {
    respond(413, ['ok' => false, 'message' => 'La consulta supera el tamaño permitido.']);
}

try {
    $payload = json_decode(file_get_contents('php://input') ?: '', true, 32, JSON_THROW_ON_ERROR);
} catch (JsonException) {
    respond(400, ['ok' => false, 'message' => 'No pudimos procesar la consulta.']);
}

if (!is_array($payload)) {
    respond(400, ['ok' => false, 'message' => 'No pudimos procesar la consulta.']);
}

$input = [
    'name' => field((string) ($payload['name'] ?? '')),
    'email' => field((string) ($payload['email'] ?? '')),
    'phone' => field((string) ($payload['phone'] ?? '')),
    'company' => field((string) ($payload['company'] ?? '')),
    'category' => field((string) ($payload['category'] ?? '')),
    'message' => field((string) ($payload['message'] ?? '')),
    'website' => field((string) ($payload['website'] ?? '')),
    'requestId' => field((string) ($payload['requestId'] ?? '')),
];

$errors = validationErrors($input);
if ($errors !== []) {
    respond(422, ['ok' => false, 'errors' => $errors, 'message' => 'Revisá los campos marcados.']);
}
if (!preg_match('/^[A-Za-z0-9-]{16,80}$/', $input['requestId'])) {
    respond(400, ['ok' => false, 'message' => 'No pudimos procesar la consulta.']);
}
if ($input['website'] !== '') {
    respond(200, ['ok' => true]);
}

$smtp = $config['smtp'] ?? [];
$rate = $config['rateLimit'] ?? [];
if (!filter_var($config['recipientEmail'] ?? '', FILTER_VALIDATE_EMAIL)
    || !filter_var($config['fromEmail'] ?? '', FILTER_VALIDATE_EMAIL)
    || !is_string($smtp['host'] ?? null)
    || !is_string($smtp['username'] ?? null)
    || !is_string($smtp['password'] ?? null)
    || !is_string($rate['directory'] ?? null)
    || !is_string($rate['salt'] ?? null)) {
    respond(503, ['ok' => false, 'message' => 'El servicio de consultas no está disponible temporalmente.']);
}

$autoloadPath = __DIR__ . '/vendor/autoload.php';
if (!is_file($autoloadPath)) {
    respond(503, ['ok' => false, 'message' => 'El servicio de consultas no está disponible temporalmente.']);
}
require $autoloadPath;

try {
    $clientIp = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';
    $rateKey = hash_hmac('sha256', $clientIp . '|' . $userAgent, $rate['salt']);
    $duplicate = rateLimit(
        $rate['directory'],
        $rateKey,
        $input['requestId'],
        max(1, (int) ($rate['maxRequests'] ?? 5)),
        max(60, (int) ($rate['windowSeconds'] ?? 900)),
        static function () use ($smtp, $config, $input): void {
            $mail = new PHPMailer(true);
            $mail->isSMTP();
            $mail->Host = $smtp['host'];
            $mail->Port = (int) ($smtp['port'] ?? 465);
            $mail->SMTPAuth = true;
            $mail->Username = $smtp['username'];
            $mail->Password = $smtp['password'];
            $mail->SMTPSecure = ($smtp['encryption'] ?? 'ssl') === 'tls'
                ? PHPMailer::ENCRYPTION_STARTTLS
                : PHPMailer::ENCRYPTION_SMTPS;
            $mail->CharSet = PHPMailer::CHARSET_UTF8;
            $mail->isHTML(false);
            $mail->setFrom($config['fromEmail'], $config['fromName'] ?? 'Daniel Moras');
            $mail->addAddress($config['recipientEmail']);
            $mail->addReplyTo($input['email'], $input['name']);
            $mail->Subject = 'Nueva consulta web — Daniel Moras';
            $mail->Body = "Nombre: {$input['name']}\nEmail: {$input['email']}\nTeléfono: {$input['phone']}\nEmpresa: {$input['company']}\nRubro: {$input['category']}\n\nConsulta:\n{$input['message']}";
            $mail->send();
        },
    );

    respond(200, ['ok' => true, 'duplicate' => $duplicate]);
} catch (Exception | RuntimeException) {
    error_log('Daniel Moras contact endpoint: delivery failed.');
    respond(502, ['ok' => false, 'message' => 'No pudimos enviar la consulta. Intentá nuevamente o contactanos por email.']);
}
