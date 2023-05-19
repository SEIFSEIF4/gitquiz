<?php 
session_start();

	include("connection.php");
	include("functions.php");


	if($_SERVER['REQUEST_METHOD'] == "POST")
	{
		//something was posted
		$user_name = $_POST['user_name'];
		$password = $_POST['password'];
	if(!empty($user_name) && !empty($password) && !is_numeric($user_name))
		{
			//save to database
			$user_id = random_num(20);
			$query = "insert into users (user_id,user_name,password) values ('$user_id','$user_name','$password')";
			mysqli_query($con, $query);
			header("Location: login.php");
			die;
		}else
		{
			echo "Please enter some valid information!";
		}
	}
?>


<!DOCTYPE html>
<html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>SignUp</title>
      <link rel="stylesheet" href="css/style.css" />
    </head>
    <body>
        <div class="bg">
        <ul class="glass">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div id="box">
        <form method="post" >
            <h1>SignUp</h1>
            <div class="textBoxdiv">
                <input type="text" placeholder="username" name="user_name">
            </div>
            <div class="textBoxdiv">
                <input type="password" placeholder="password" name="password">
            </div>
            <input type="submit" value="Login" class="loginBtn" name="login_Btn">
            <div class="login">
                <span class="log">have an account :</span>
                </br>
                <a href="login.php" class="">Click to login</a hidden>
            </div>
        </form>
    </body>
</html>
