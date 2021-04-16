const CONTENT_ID = "content";

class Screen {
  static getHtmlCode(item) {
    return `
      <div  class="flex flex-col max-w-xs bg-gray-200 rounded-lg m-2 hover:animate-spin">
        <div class="w-64 p-1">
          <img src="${item.img}" name=${item.name}>
        </div>
      </div>
    `;
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
}