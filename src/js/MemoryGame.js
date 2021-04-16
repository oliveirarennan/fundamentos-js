class MemoryGame {
  constructor({ screen }) {
    this.screen = screen;

    this.initialHeroes = [
      {
        img: "./img/batman.png",
        name: "batman",
      },
      {
        img: "./img/flash.png",
        name: "flash",
      },
      {
        img: "./img/spiderman.png",
        name: "spiderman",
      },
      { img: "./img/punisher.png", name: "punisher" },
    ];
  }

  initialize() {
    this.screen.refreshImages(this.initialHeroes);
  }
}
