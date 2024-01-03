const wheel = document.getElementById("wheel");
    const spinBtn = document.getElementById("spin-btn");
    const player1ScoreElement = document.getElementById("score1");
    const player2ScoreElement = document.getElementById("score2");
    const winnerElement = document.getElementById("win");
    const restartBtn = document.getElementById("restart-btn");
    let spinning = false;
    const spinSound = document.getElementById("spinSound");
    const winSound = document.getElementById("winSound");

    function restartGame() {
      player1ScoreElement.textContent = "0";
      player2ScoreElement.textContent = "0";
      winnerElement.textContent = "";
      wheel.style.transform = "rotate(0deg)";
    }

    spinBtn.addEventListener("click", () => {
      if (!spinning) {
        spinning = true;
        spinSound.play();
        const randomDegree = Math.floor(Math.random() * 3600) + 1800; // Minimum 5 full spins
        wheel.style.transition = "transform 3s ease-out";
        wheel.style.transform = `rotate(${randomDegree}deg)`;
        
        setTimeout(() => {
          spinning = false;
          wheel.style.transition = "none";
          const rotationRemainder = randomDegree % 360;
          wheel.style.transform = `rotate(${rotationRemainder}deg)`;
          updateScores(rotationRemainder);
        }, 4000);
      }
    });

    const updateScores = (angleValue) => {
      const rotationValues = [
        { minDegree: 0, maxDegree: 60, value: 3 },
        { minDegree: 60, maxDegree: 120, value: 3 },
        { minDegree: 120, maxDegree: 180, value: 3 },
        { minDegree: 180, maxDegree: 240, value: 4 },
        { minDegree: 240, maxDegree: 300, value: 4 },
        { minDegree: 300, maxDegree: 360, value: 4 },
      ];

      for (let i of rotationValues) {
        if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
          if (i.value >= 1 && i.value <= 3) {
            player1ScoreElement.textContent = parseInt(player1ScoreElement.textContent) + i.value;
            if (parseInt(player1ScoreElement.textContent) >= 15) {
              winnerElement.textContent = "Player 1 has the LUCK of winning today!!";
               winSound.play();
            }
          } else {
            player2ScoreElement.textContent = parseInt(player2ScoreElement.textContent) + i.value;
            if (parseInt(player2ScoreElement.textContent) >= 15) {
              winnerElement.textContent = "Player 2 has the LUCK of winning today!!";
               winSound.play();
            }
          }
          break;
        }
      }
    };