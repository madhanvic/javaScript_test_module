/**Popup*/

class Popup {
  #isPopup = false;
  rulesBtn = document.querySelector(".btn_rules");
  popupWrapper = null;
  closeBtn = null;
  popup = `
  <h2 class="rules__popup--title">Game Rules</h2>
  <ul class="rule__popup--lists">
   <li class="rule__popup--list">
       Rocks beats scissors, scissors beat paper, and paper beats rock.
   </li>
   <li class="rule__popup--list">
      Agree ahead of time whether you'll count off "Rock, paper, scissors, shoot" or just "rock, paper, scissors."
   </li>
   <li class="rule__popup--list">
       Use rock, paper, scissors to settle minor decisions or simply play to pass the time
   </li>
   <li class="rule__popup--list">
      If both players lay down the same hand, each player lays down another hand
   </li>
  </ul>
  <button class="rules__popup--close-btn">X</button>
  `;

  onInit() {
    this.rulesBtn.addEventListener("click", () => {
      if (this.#isPopup === false) {
        this.createRulesPopup();
      }
    });
  }

  createRulesPopup() {
    this.popupWrapper = document.createElement("div");
    if (this.popupWrapper !== null) {
      this.popupWrapper.classList.add("rules__popup", "rounded_md");
      this.popupWrapper.innerHTML = `
         ${this.popup}
        `;
      this.positionSetter();
      document.body.appendChild(this.popupWrapper);
      this.isPopup = true;
      this.closeRulesPopup();
    }
    return;
  }

  positionSetter() {
    if (this.rulesBtn !== null) {
      const parentElement = this.rulesBtn.parentElement;
      const { left, width, top } = parentElement.getBoundingClientRect();
      this.popupWrapper.style.left = `${left + width}px`;
      this.popupWrapper.style.top = `${top - 20}px`;
      this.popupWrapper.style.transform = `translate(-100%, -100%)`;
    }
  }

  closeRulesPopup() {
    this.closeBtn = document.querySelector(".rules__popup--close-btn");
    const closeHandler = () => {
      this.closeBtn.removeEventListener("click", closeHandler);
      this.popupWrapper.remove();
      this.isPopup = false;
      this.resetHandler();
    };
    if (this.closeBtn !== null) {
      this.closeBtn?.addEventListener("click", closeHandler);
    }
  }

  resetHandler() {
    this.popupWrapper = null;
    this.closeBtn = null;
  }

  windowListner() {
    if (this.#isPopup === true) {
      window.addEventListener("resize", this.positionSetter.bind(this));
      window.addEventListener("scroll", this.positionSetter.bind(this));
    } else {
      window.removeEventListener("resize", this.positionSetter.bind(this));
      window.removeEventListener("scroll", this.positionSetter.bind(this));
    }
  }

  set isPopup(value) {
    if (value !== this.#isPopup) {
      this.#isPopup = value;
      this.windowListner();
    }
  }
}

const popup = new Popup();

popup.onInit();
