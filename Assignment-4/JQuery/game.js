$(document).ready(function() {
    let score = 0;
    let gameInterval;
    let gameRunning = false;
    let totalTargets = 0;
    let difficulty = 1000; // Initial difficulty (time between target spawns)
  
    // Game Start Function
    function startGame() {
      score = 0;
      totalTargets = 0;
      $('#score').text('Score: ' + score);
      gameRunning = true;
      $('#start-btn').hide(); // Hide the start button
      $('#end-game-btn').show(); // Show the "End Game" button when the game starts
      $('#game-over').hide(); // Hide game over screen
      $('#restart-btn').hide(); // Hide restart button
      $('#game-area').css('background-color', '#e3e3e3'); // Reset background color
      spawnTarget(); // Spawn the first target
      gameInterval = setInterval(spawnTarget, difficulty); // Start spawning targets
    }
  
    // Game Over Function
    function endGame() {
      gameRunning = false;
      clearInterval(gameInterval); // Stop the target spawning
      $('#final-score').text(score); // Show the final score
      $('#game-over').fadeIn(500); // Show the game over screen
      $('#restart-btn').fadeIn(500); // Show the restart button
      $('#end-game-btn').hide(); // Hide the "End Game" button
      $('#game-area').css('background-color', '#f1c40f'); // Change background on game over
    }
  
    // Function to restart the game
    function restartGame() {
      $('#game-over').hide();
      $('#restart-btn').hide();
      startGame(); // Start a new game
    }
  
    // Function to spawn targets
    function spawnTarget() {
      const $target = $('<div class="target"></div>');
      
      // Random position within game area
      const posX = Math.random() * ($('#game-area').width() - 50);
      const posY = Math.random() * ($('#game-area').height() - 50);
  
      // Add target to game area
      $target.css({ top: posY, left: posX });
      $('#game-area').append($target);
  
      // When the target is clicked, increase score and remove the target
      $target.on('click', function() {
        score++;
        $('#score').text('Score: ' + score);
        totalTargets++;
  
        // Increase difficulty by decreasing spawn interval
        if (totalTargets % 10 === 0 && difficulty > 500) {
          difficulty -= 100;
          clearInterval(gameInterval);
          gameInterval = setInterval(spawnTarget, difficulty);
        }
  
        $(this).fadeOut(300, function() {
          $(this).remove();
        });
      });
  
      // Remove the target after a certain time if not clicked
      setTimeout(function() {
        $target.fadeOut(300, function() {
          $(this).remove();
        });
      }, 2000);
    }
  
    // Event Listener to Start the Game
    $('#start-btn').on('click', function() {
      if (!gameRunning) {
        startGame();
      }
    });
  
    // Event Listener to Restart the Game
    $('#restart-btn').on('click', function() {
      restartGame();
    });
  
    // Event Listener to End the Game Manually
    $('#end-game-btn').on('click', function() {
      if (gameRunning) {
        endGame(); // Call the endGame function when the button is clicked
      }
    });
  });
  