<?
require_once 'config.php';
require_once 'functions.php';
$sql = '
SELECT
  id AS id
  ,title AS title
  ,memo AS memo
FROM 
  t_material_memo
WHERE
  delflg = 0
ORDER BY 
  id DESC
';
header('Content-type: application/json; charset=UTF-8');
echo json_encode(connectDb()->query($sql)->fetchAll(PDO::FETCH_ASSOC));
?>
