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

			//read from database
			$query = "select * from users where user_name = '$user_name' limit 1";
			$result = mysqli_query($con, $query);

			if($result)
			{
				if($result && mysqli_num_rows($result) > 0)
				{

					$user_data = mysqli_fetch_assoc($result);
					
					if($user_data['password'] === $password)
					{

						$_SESSION['user_id'] = $user_data['user_id'];
						header("Location: index.php");
						die;
					}
				}
			}
			
			echo "wrong username or password!";
		}else
		{
			echo "wrong username or password!";
		}
	}

?>
<!DOCTYPE html>
<html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Login</title>
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
            <h1>Quiz<span></span></h1>
            <div class="textBoxdiv">
                <input type="text" placeholder="username" name="user_name">
            </div>
            <div class="textBoxdiv">
                <input type="password" placeholder="password" name="password">
            </div>
            <input type="submit" value="Login" class="loginBtn" name="login_Btn">
            <div class="signup">
                Sign up a new account ?
                </br>
                <a href="signup.php">Click to Signup</a>
            </div>
        </form>
    </body>
</html>

