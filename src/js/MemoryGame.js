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
    this.selectedHeroes = [];
  }

  initialize() {
    this.screen.refreshImages(this.initialHeroes);

    this.screen.configPlayButton(this.play.bind(this));

    this.screen.configVerifySelectionButton(this.verifySelection.bind(this));
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

  verifySelection(id, name) {
    const item = { id, name };

    const selectedHeroes = this.selectedHeroes.length;

    switch (selectedHeroes) {
      case 0:
        this.selectedHeroes.push(item);
        break;
      case 1:
        const [option1] = this.selectedHeroes;
        this.selectedHeroes = [];
        if (option1.name === item.name && option1.id !== item.id) {
          alert("combinação correta!" + item.name);
          return;
        }
        alert("combinação incorreta!");
        break;
    }
  }

  play() {
    this.randomize();
  }
}
