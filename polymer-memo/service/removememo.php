<?
require_once('config.php');
require_once('functions.php');

$id = $_POST['id'];
$title = $_POST['title'];
$memo = $_POST['memo'];

$succeed = true;
$message = "succeed remove memo.";

try{
  $pdo = connectDB();
  $sql = 'update t_material_memo set delflg = 1';
  $where = "";
  if( $id != "" ){
    $where .= " AND id = $id";
  }
  if( $title != ""){
    $where .= " AND title like '%$title%'";
  }
  if( $memo != ""){
    $where .= " AND memo like '%$memo%'";
  }
  if($where != ""){
    $sql .= " WHERE ".mb_substr($where,5);
  }
  $statement= $pdo->prepare($sql);
  $statement->execute();
} catch (Exception $e){
  $succeed = false;
  $message = $e->getMesssage();
}
header('Content-type: application/json; charset=UTF-8');
echo json_encode(
  array(
    'succeed'=>$succeed
    ,'message'=>$message));
?>
