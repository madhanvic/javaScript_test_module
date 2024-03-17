(async function () {
  class RockPaperScissor {
    options = ["rock", "scissor", "paper"];
    #status;
    #userOption;
    #pcOption;
    #winner;
    #score = { user: 0, computer: 0 };

    constructor({ status, userOption, pcOption, winner, score }) {
      this.#userOption = userOption;
      this.#pcOption = pcOption;
      this.#winner = winner;
      this.#score = score;
      this.status = status;
    }

    set status(status) {
      if (this.#status !== status) {
        this.#status = status;
        if (status === "choose options") {
          this.scoreBoardSetter();
          this.optionSetter();
        } else if (status === "result announcement") {
          this.scoreBoardSetter();
          this.resultAnnouncement();
        } else if (status === "hurray") {
          this.hurrayPageSetter();
        }
      }
    }

    scoreBoardSetter() {
      const pcScore = document.querySelector(".computer__score");
      const userScore = document.querySelector(".your__score");
      pcScore.textContent = this.#score.computer;
      userScore.textContent = this.#score.user;
    }
    optionHandler(e) {
      this.#userOption = e.currentTarget.getAttribute("value");
      sessionStorage.setItem(
        "yourOption",
        e.currentTarget.getAttribute("value")
      );
      this.#pcOption = this.options[Math.ceil(Math.random() * 3) - 1];
      sessionStorage.setItem("pcOption", this.#pcOption);
      this.winnerAnalyzer();
      const aTag = document.createElement("a");
      aTag.setAttribute("href", "resultAnnouncement.html");
      aTag.click();
      // window.location.replace(
      //   `${window.location.origin}/resultAnnouncement.html`
      // );
    }
    optionSetter() {
      const rpcBtns = document.querySelectorAll(".rpc_option button");
      rpcBtns.forEach((rpcBtn) => {
        rpcBtn.addEventListener("click", this.optionHandler.bind(this));
      });
    }
    resultAnnouncement() {
      const resultAnnouncementEl = document.querySelector(
        ".result__anouncement"
      );

      const winner =
        this.#winner === this.#userOption
          ? "user"
          : this.#winner === this.#pcOption
          ? "pc"
          : null;
      const template = `
      <div class="picked__option">
      <p>YOU PICKED</p>
   
      <div class="picked__option--item ${
        winner === "user" ? "winner" : ""
      }" option="${this.#userOption}">
      
          <div class="picked__option--innerLayer ">
              <img src="./assets/images/${this.#userOption}.png" alt="${
        this.#userOption
      }" width="45" height="65">
          </div>
      </div>
      
  </div>
  <div class="result__msg-container">
   ${
     winner !== null
       ? `
          <p class="result">YOU ${winner === "user" ? "WON" : "LOST"}</p>
          <p class="opponent">AGAINST PC</p>
      `
       : `<p class="result tie">TIE UP</p>`
   }
      <button class="btn btn__playAgain rounded_md">
      ${winner === null ? "REPLAY" : "PLAY AGAIN"}
      </button>
  </div>
  <div class="picked__option">
      <p>PC PICKED</p>
      <div class="picked__option--item ${
        winner === "pc" ? "winner" : ""
      }" option="${this.#pcOption}">
          <div class="picked__option--innerLayer ">
              <img src="./assets/images/${this.#pcOption}.png" alt="${
        this.#pcOption
      }" width="45" height="65">
          </div>
      </div>
  </div>
      `;
      resultAnnouncementEl.innerHTML = template;
      this.playAgainSetter();
      if (winner === "user") {
        const btnContainer = document.querySelector(".btn_container");
        const nextBtn = document.createElement("button");
        nextBtn.classList.add("btn", "btn_outline", "btn_next", "rounded_md");
        nextBtn.textContent = "Next";
        btnContainer.appendChild(nextBtn);
        this.nextHandler();
      }
    }

    nextHandler() {
      const nextBtn = document.querySelector(".btn_next");
      nextBtn.addEventListener("click", () => {
        window.location.replace(`${window.location.origin}/hurray.html`);
      });
    }
    hurrayPageSetter() {
      this.playAgainSetter();
    }
    playAgainSetter() {
      const playAgainBtn = document.querySelector(".btn__playAgain");
      playAgainBtn.addEventListener("click", () => {
        sessionStorage.removeItem("yourOption");
        sessionStorage.removeItem("pcOption");
        sessionStorage.removeItem("winner");
        const aTag = document.createElement("a");
        aTag.setAttribute("href", "");
        aTag.click();
        // window.location.replace(window.location.origin);
      });
    }
    winnerAnalyzer() {
      if (this.#userOption === this.#pcOption) {
        this.#winner = null;
        sessionStorage.setItem("winner", null);
        console.log("decoded");
        return;
      }
      if (
        (this.#userOption === "rock" && this.#pcOption === "scissor") ||
        (this.#userOption === "scissor" && this.#pcOption === "rock")
      ) {
        this.#winner = "rock";
        sessionStorage.setItem("winner", "rock");
      } else if (
        (this.#userOption === "rock" && this.#pcOption === "paper") ||
        (this.#userOption === "paper" && this.#pcOption === "rock")
      ) {
        this.#winner = "paper";
        sessionStorage.setItem("winner", "paper");
      } else if (
        (this.#userOption === "scissor" && this.#pcOption === "paper") ||
        (this.#userOption === "paper" && this.#pcOption === "scissor")
      ) {
        this.#winner = "scissor";
        sessionStorage.setItem("winner", "scissor");
      }

      const isUserWinner = this.#userOption === this.#winner;
      this.#score = isUserWinner
        ? { ...this.#score, user: Number(this.#score.user) + 1 }
        : { ...this.#score, computer: Number(this.#score.computer) + 1 };
      sessionStorage.setItem("score", JSON.stringify(this.#score));
    }
  }
  const status =
    window.location.pathname === "/resultAnnouncement.html"
      ? "result announcement"
      : window.location.pathname === "/hurray.html"
      ? "hurray"
      : "choose options";
  const userOption =
    sessionStorage.getItem("yourOption") === undefined ||
    sessionStorage.getItem("yourOption") === null
      ? null
      : sessionStorage.getItem("yourOption");
  const pcOption =
    sessionStorage.getItem("pcOption") === undefined ||
    sessionStorage.getItem("pcOption") === null
      ? null
      : sessionStorage.getItem("pcOption");
  const winner =
    sessionStorage.getItem("winner") === undefined ||
    sessionStorage.getItem("winner") === null
      ? null
      : sessionStorage.getItem("winner");
  const score =
    sessionStorage.getItem("score") === undefined ||
    sessionStorage.getItem("score") === null
      ? { user: 0, computer: 0 }
      : await JSON.parse(sessionStorage.getItem("score"));

  const rpcGame = new RockPaperScissor({
    status: status,
    userOption: userOption,
    pcOption: pcOption,
    winner: winner,
    score: score,
  });
})();

console.log(window.location);
