window.onload = function () {
    startGame();
  };
  
  const emojis = ["❤️", "🌹", "💋", "🎵", "💖", "🍫", "🌸", "🎁"];
  const loveNotes = [
    "You make my heart skip a beat! 💓",
    "You're my favorite notification. 📱❤️",
    "Our love story is my favorite adventure. ✈️",
    "You light up my world like nobody else. 🌟",
    "Every day with you is Valentine's Day! 💘",
    "You had me at hello. 😍",
    "You're the best part of my life. 🥰",
    "Let's make memories forever. 🌹"
  ];
  
  let gameBoard = document.getElementById("gameBoard");
  let timeDisplay = document.getElementById("time");
  let scoreDisplay = document.getElementById("score");
  let heartSurprise = document.getElementById("heartSurprise");
  
  let firstCard = null;
  let secondCard = null;
  let score = 0;
  let timeLeft = 60;
  let timer;
  
  function startGame() {
    const emojiPairs = [...emojis, ...emojis];
    shuffleArray(emojiPairs);
    createCards(emojiPairs);
    startTimer();
  }
  
  function shuffleArray(array) {
    array.sort(() => 0.5 - Math.random());
  }
  
  function createCards(emojiArray) {
    gameBoard.innerHTML = "";
    emojiArray.forEach((emoji, index) => {
      let card = document.createElement("div");
      card.classList.add("card");
      card.dataset.emoji = emoji;
      card.innerHTML = "❓";
      card.addEventListener("click", () => flipCard(card));
      gameBoard.appendChild(card);
    });
  }
  
  function flipCard(card) {
    if (card.classList.contains("matched") || card === firstCard) return;
    card.innerHTML = card.dataset.emoji;
  
    if (!firstCard) {
      firstCard = card;
    } else {
      secondCard = card;
      checkMatch();
    }
  }
  
  function checkMatch() {
    if (!firstCard || !secondCard) return;
  
    if (firstCard.dataset.emoji === secondCard.dataset.emoji) {
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      score += 10;
      updateScore();
      showLoveNote();
      resetSelection();
      checkWin();
    } else {
      setTimeout(() => {
        if (firstCard) firstCard.innerHTML = "❓";
        if (secondCard) secondCard.innerHTML = "❓";
        resetSelection();
      }, 1000);
    }
  }
  
  function resetSelection() {
    firstCard = null;
    secondCard = null;
  }
  
  function updateScore() {
    scoreDisplay.textContent = score;
  }
  
  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      timeDisplay.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        showTimeUpMessage();
      }
    }, 1000);
  }
  
  function showTimeUpMessage() {
    Swal.fire({
      title: '⏳ Time’s Up! ⏳',
      html: `
        <p>But don’t worry, my love! ❤️</p>
        <p>Try again, baby, I know you want my love, but it's not easy to catch— win this game, and it's yours! 💪🎁</p>
        <img src="https://cdn.pixabay.com/animation/2022/08/23/03/32/03-32-04-108_512.gif" style="width: 80px; height: 80px; margin: 10px;">
      `,
      confirmButtonText: '💪 Try Again!',
      backdrop: `
        rgba(255, 102, 153, 0.5)
        url("https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif")
        center center
        no-repeat
      `,
      customClass: {
        popup: 'responsive-popup', 
        title: 'responsive-title',
        content: 'responsive-content',
        confirmButton: 'responsive-btn',
    }
    }).then(() => {
      restartGame();
    });
  }
  
  function restartGame() {
    score = 0;
    timeLeft = 60;
    updateScore();
    timeDisplay.textContent = timeLeft;
    startGame();
  }
  
  function showLoveNote() {
    const note = loveNotes[Math.floor(Math.random() * loveNotes.length)];
    setTimeout(() => {
      Swal.fire({
        title: '💖 Love Note 💖',
        html: `
          <p>${note}</p>
          <img src="img/gif1.gif" style="width: 100px; height: 100px; margin-top: 10px;">
        `,
        confirmButtonText: 'Aww, Thank You!',
        backdrop: `rgba(255, 51, 102, 0.4)`,
        customClass: {
          popup: 'responsive-popup',
          title: 'responsive-title',
          content: 'responsive-content',
          confirmButton: 'responsive-btn',
      }
      });
    }, 500);
  }
  
  function checkWin() {
    const matchedCards = document.querySelectorAll(".card.matched");
    if (matchedCards.length === emojis.length * 2) {
      clearInterval(timer);
      showHeartSurprise();
    }
  }
  
  function showHeartSurprise() {
    heartSurprise.style.display = "block";
    setTimeout(() => {
        heartSurprise.style.display = "none";
        Swal.fire({
            title: '🎉 You Won! 🎉',
            html: `
                <p>You've captured my heart! 💖</p>
                <p>You're my Valentine! 💕</p>
                <img src="img/gif2.gif" style="width: 100px; height: 100px; margin-top: 10px;">
            `,
            confirmButtonText: 'Yay! 💖',
            backdrop: `rgba(255, 51, 102, 0.4)`,
            customClass: {
                popup: 'responsive-popup', 
                title: 'responsive-title',
                content: 'responsive-content',
                confirmButton: 'responsive-btn',
            }
        });
    }, 5000);
}
