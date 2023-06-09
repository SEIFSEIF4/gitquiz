<?php 
session_start();
	include("connection.php");
	include("functions.php");
	$user_data = check_login($con);
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Quiz App" />
    <title>Quiz App</title>
    <link rel="shortcut icon" href="https://www.linkpicture.com/q/icons8_ghost.ico" type="image/x-icon">
    <link rel="stylesheet" href="css/main.css" />
    <script src="js/main.js" defer></script>
  </head>
  <body>
    <div class="container quiz">
      <div id="glow"></div>
      <div class="quiz-app">
        <div class="quiz-info">
          <div class="category">Category: <span>Java Script</span></div>
          <div class="count" id="count">Questions Count: <span>?</span></div>
        </div>
        <div class="quiz-area">
          <h3>
            Questions will be displayed here<br />Click
            <code>Start Quiz</code>
            below
          </h3>
        </div>
        <div class="answers-area"></div>
        <button class="submit-button" style="background-color: dimgray">
          Submit Answer
        </button>
        <div class="bullets">
          <div class="spans"></div>
          <div class="countdown"></div>
        </div>
        <div class="results"></div>
        <div class="answer" id="recap" style="display: none;"></div>
        <div class="answer" id="recap2" style="display: none;"></div>
      </div>
      <div class="controls">
        <button id="startBtn" class="btn">Start Quiz</button>
        <!-- <button id="startBtn2" class="btn">Save to recap</button> -->
        <input
          type="number"
          name="countq"
          id="countq"
          placeholder="  Number of Questions"
          step="2"
          min="1"
          max="20"
        />
      </div>
    </div>
  </body>
</html>
