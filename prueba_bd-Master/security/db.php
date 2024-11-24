<?php

$servername = "127.0.0.1";  // Host
$username = "gastonsegura";  //User
$password = 'Enac2024'; // Password  
$dbname = "bbdd4"; // dbname
$port = 3306; // dbname

$conn = new mysqli($servername, $username, $password, $dbname, $port);
if ($conn->connect_error) {
die("Conexion Fallida: " . $conn->connect_error);
}

?>
