<?
require_once('config.php');
require_once('functions.php');

$title = $_POST['title'];
$memo = $_POST['memo'];

$succeed = true;
$message = "registed your memo";

try{
$pdo = connectDB();
$statement = $pdo->prepare('insert into t_material_memo ( title , memo ) values (? ,? )');
$statement->bindParam(1,$title,PDO::PARAM_STR);
$statement->bindParam(2,$memo,PDO::PARAM_STR);
$statement->execute();
$message = "inserted '$title','$memo'";
}catch(Exception $e){
  $succeed = false;
  $message = $e->getMessage();
}
header('Content-type: application/json; charset=UTF-8');
echo json_encode(
  array(
    'succeed'=>$succeed
    ,'message'=>$message));
?>
