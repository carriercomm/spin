<?php

	//start
	
	$root_dir = $_SERVER['DOCUMENT_ROOT'];
	
	include_once $root_dir."include/PhpConsole.php";
	PhpConsole::start();
	
	//debug($root_dir, "root_dir");

	include_once $root_dir."include/mysql.php";
	
	$sql_list_name = "SELECT id, full_name FROM users ORDER BY `users`.`full_name` ASC;";

	$result_list_name = $mysqli->query($sql_list_name) or die($mysqli->error);
	if ($result_list_name->num_rows > 0)
	{
		echo "<option value=\"0\">Новый пользователь</option>\r\n";
		while ($row_list_name = $result_list_name->fetch_assoc()) {
			echo "<option value=\"".$row_list_name['id']."\">".$row_list_name['full_name']."</option>\r\n";
		}
	} else
	{
		echo "<option>Нет данных</option>";
		debug($sql_list_name, "Херня произошла");
	}
	
	$result_list_name->free();
?>
