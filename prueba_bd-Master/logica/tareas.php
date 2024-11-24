<?php 

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
include "../security/db.php";

$id = isset($_GET["id"]) ? $_GET["id"] : 0;

$input = file_get_contents("php://input");  
$data = json_decode($input, true); 
$idPost = isset( $data['save']) ?  $data['save'] : 0;

//Codigo guardar
if($idPost != 0){
  
  if($idPost==1){
    $nombre = isset( $data['nombre']) ?  $data['nombre'] : "-";
    $descripcion = isset( $data['descripcion']) ?  $data['descripcion'] : "-";
    $img = isset( $data['img']) ?  $data['img'] : "-";
    $sql = "  INSERT INTO `tabla_prueba`( `Nombre`, `descripcion`, `estado`,`url`) VALUES (?,?,1,?);";

    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        echo "Error en la preparación de la consulta: " . $conn->error;
    } else {
        $stmt->bind_param("sss", $nombre, $descripcion,$img);

        if ($stmt->execute()) {
          echo json_encode(array("message" => 200));
        } else {
          echo json_encode(array("message" => $stmt->error));
        }
    }

    $stmt->close();
  }

  die();
}


//Codigo actualizar

$idPost = isset( $data['update']) ?  $data['update'] : 0;

if($idPost != 0){
  $id = isset( $data['id']) ?  $data['id'] : "-";
  if($idPost == 1){
    $nombre = isset( $data['nombre']) ?  $data['nombre'] : "-";
    $descripcion = isset( $data['descripcion']) ?  $data['descripcion'] : "-";
        $img = isset( $data['img']) ?  $data['img'] : "-";
    $sql = "UPDATE `tabla_prueba` SET `Nombre`=?,`descripcion`=?,`url`=? WHERE id = ?";

    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        echo "Error en la preparación de la consulta: " . $conn->error;
    } else {
        $stmt->bind_param("sssi", $nombre, $descripcion, $img,$id);

        if ($stmt->execute()) {
          echo json_encode(array("message" => 200));
        } else {
          echo json_encode(array("message" => $stmt->error));
        }
    }

    $stmt->close();
  }else  if($idPost == -1){
    $sql = "UPDATE `tabla_prueba` SET estado = 0 WHERE id = ?";

    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        echo "Error en la preparación de la consulta: " . $conn->error;
    } else {
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
          echo json_encode(array("message" => 200));
        } else {
          echo json_encode(array("message" => $stmt->error));
        }
    }

    $stmt->close();
  }else  if($idPost == 2){
    $sql = "UPDATE `tabla_prueba` SET estado = 2 WHERE id = ?";

    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        echo "Error en la preparación de la consulta: " . $conn->error;
    } else {
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
          echo json_encode(array("message" => 200));
        } else {
          echo json_encode(array("message" => $stmt->error));
        }
    }
  }
  die();
}





//$stmt = $conn->prepare("SELECT * FROM `tabla_prueba` WHERE id = ?");
//$stmt->bind_param("i", $id);

$stmt = $conn->prepare("SELECT * FROM `tabla_prueba` order by 1 desc ");


$stmt->execute();

$result = $stmt->get_result();
if ($result->num_rows > 0) { 
  $rows = array();
  while($r = $result->fetch_assoc()) {
     $rows[] = $r; 
    } 
     // Imprime el resultado como JSON print json_encode($rows); 
     } else { 
      
      $rows = [];
     
     }

     echo json_encode($rows);
$conn->close();
?>
