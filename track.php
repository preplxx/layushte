<?php
$ip = $_SERVER['REMOTE_ADDR'];
$time = date('Y-m-d H:i:s');
$agent = $_SERVER['HTTP_USER_AGENT'];
$data = "IP: $ip | Time: $time | Agent: $agent\n";
file_put_contents('visitors.log', $data, FILE_APPEND);
// Optional: Send to Discord
$webhook = 'https://discord.com/api/webhooks/1280913195833495583/3050obdCCGkZ707G-3fJ-dzCByTmIfwty6UlIkiQ6PVkweUIKj94CfEAaHspXrazBqNy';
$msg = "New visitor: IP $ip at $time";
file_get_contents($webhook . '?content=' . urlencode($msg));
?>
<!-- Hidden tracking pixel -->
<img src="track.php" width="1" height="1" style="display:none">
