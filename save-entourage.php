<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'POST only']);
    exit;
}

$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Invalid JSON']);
    exit;
}

// Sanitise every string value recursively
function sanitise(&$val)
{
    if (is_string($val)) {
        $val = htmlspecialchars(strip_tags(trim($val)), ENT_QUOTES, 'UTF-8');
    } elseif (is_array($val)) {
        foreach ($val as &$v) {
            sanitise($v);
        }
    }
}
sanitise($data);

$file = __DIR__ . '/entourage-data.json';
$json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

if (file_put_contents($file, $json) === false) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Could not write file']);
    exit;
}

echo json_encode(['ok' => true]);
