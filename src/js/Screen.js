const util = Util;

const CONTENT_ID = "content";
const PLAY_BTN_ID = "play";
const SHOW_BTN_ID = "showAll";
const MESSAGE_ID = "message";
const HIDDEN_STYLE = "hidden";
const LOADING_ID = "loading";
const COUNTER_ID = "counter";
const MESSAGES = {
  success: {
    text: "Combinação correta!",
    style: "message-correct",
  },
  error: {
    text: "Combinacão incorreta!",
    style: "message-incorrect",
  },
};

class Screen {
  static getHtmlCode(item) {
    return `
      <div  class="flex flex-col max-w-xs bg-gray-200 rounded-lg m-2" onclick="window.verifySelection('${item.id}', '${item.name}')">
        <div class="w-64 p-1">
          <img src="${item.img}" name=${item.name}>
        </div>
      </div>
    `;
  }

  static configVerifySelectionButton(functionOnClick) {
    window.verifySelection = functionOnClick;
  }

  static changeHtmlContent(htmlCode) {
    const content = document.getElementById(CONTENT_ID);
    content.innerHTML = htmlCode;
  }

  static generateHtmlStringByImage(items) {
    return items.map(Screen.getHtmlCode).join("");
  }

  static refreshImages(items) {
    const htmlCode = Screen.generateHtmlStringByImage(items);
    Screen.changeHtmlContent(htmlCode);
  }

  static configPlayButton(functionOnClick) {
    const btnPlay = document.getElementById(PLAY_BTN_ID);

    btnPlay.onclick = functionOnClick;
  }

  static showHeroes(heroName, img) {
    const htmlElements = document.getElementsByName(heroName);

    htmlElements.forEach((item) => (item.src = img));
  }

  static async showMessage(success = true) {
    const element = document.getElementById(MESSAGE_ID);

    if (success) {
      element.classList.remove(MESSAGES.error.style);
      element.classList.add(MESSAGES.success.style);
      element.innerHTML = MESSAGES.success.text;
    } else {
      element.classList.remove(MESSAGES.success.style);
      element.classList.add(MESSAGES.error.style);
      element.innerHTML = MESSAGES.error.text;
    }

    element.classList.remove(HIDDEN_STYLE);
    await util.timeout(1000);
    element.classList.add(HIDDEN_STYLE);
  }

  static showLoading(show = true) {
    const loading = document.getElementById(LOADING_ID);

    if (show) {
      loading.classList.remove(HIDDEN_STYLE);
      return;
    }
    loading.classList.add(HIDDEN_STYLE);
  }

  static startCounter() {
    let countUntil = 3;

    const elementCounter = document.getElementById(COUNTER_ID);

    const textMark = "$$counter";
    const defaultText = `Começando em ${textMark} segundos...`;
    const updateText = () =>
      (elementCounter.innerHTML = defaultText.replace(textMark, countUntil--));

    updateText();
    const intervalId = setInterval(updateText, 1000);
    return intervalId;
  }

  static cleanCounter(intervalId) {
    clearInterval(intervalId);
  }

  static configShowAllButton(functionOnClick) {
    const btnShowAll = document.getElementById(SHOW_BTN_ID);

    btnShowAll.onclick = functionOnClick;
  }
}
