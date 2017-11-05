<?php
header("Access-Control-Allow-Origin: *");
$data = null;
if (isset($_POST['mouseImage']))
{
	$data = $_POST['mouseImage'];
	$data = urldecode($data);
}
//$data = 'data:image/png;base64,AAAFBfj42Pj4';

if ($data)
{
	list($type, $data) = explode(';', $data);
	list(, $data)      = explode(',', $data);
	$data = base64_decode($data);

	$fileCount = count (glob ('*.png'));
	file_put_contents ('mousethread' . ($fileCount + 1) . '.png', $data);
}
?>