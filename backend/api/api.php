<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,PUT,POST,DELETE');
header('Access-Control-Allow-Headers: Content-Type');

    include("../bin/connect.php");
    header("Content-Type: application/json");
    if(isset($_GET['action'])) {
        if($_GET['action'] == "display") {
            $result = $connect->query("SELECT * FROM products");
            foreach($result as $row) {
                $data[] = $row;
            }
            echo json_encode($data);
        }
    }

    if(isset($_GET['action'])) {
        if($_GET['action'] == "sort" && isset($_GET['category'])) {
            $category = $_GET['category'];
            $result = $connect->query("SELECT * FROM products WHERE category = '$category'");
            foreach($result as $row) {
                $data[] = $row;
            } 
            if(!empty($data)) {
                echo json_encode($data);
            }
        }
    }

 ?>