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

    this.maskHero = "./img/ninja.png";

    this.hiddenHeroes = [];
  }

  initialize() {
    this.screen.refreshImages(this.initialHeroes);

    this.screen.configPlayButton(this.play.bind(this));
  }
  randomize() {
    const copies = this.initialHeroes
      .concat(this.initialHeroes)
      .map((item) => {
        return Object.assign({}, item, { id: Math.random() / 0.5 });
      })
      .sort(() => Math.random() - 0.5);
    this.screen.refreshImages(copies);

    setTimeout(() => {
      this.hideHeroes(copies);
    }, 1000);
  }

  hideHeroes(heroes) {
    const hidedenHeroes = heroes.map(({ name, id }) => ({
      id,
      name,
      img: this.maskHero,
    }));
    this.screen.refreshImages(hidedenHeroes);

    this.hiddenHeroes = hidedenHeroes;
  }

  play() {
    this.randomize();
  }
}
