class MemoryGame {
  constructor({ screen, util }) {
    this.screen = screen;
    this.util = util;

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

    this.screen.configShowAllButton(this.showHiddenHeroes.bind(this));
  }
  async randomize() {
    const copies = this.initialHeroes
      .concat(this.initialHeroes)
      .map((item) => {
        return Object.assign({}, item, { id: Math.random() / 0.5 });
      })
      .sort(() => Math.random() - 0.5);

    this.screen.refreshImages(copies);
    this.screen.showLoading();

    const intervalId = this.screen.startCounter();

    await this.util.timeout(3000);
    this.screen.cleanCounter(intervalId);
    this.hideHeroes(copies);
    this.screen.showLoading(false);
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

  showHeroes(heroName) {
    const { img } = this.initialHeroes.find(({ name }) => heroName === name);
    this.screen.showHeroes(heroName, img);
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
          this.showHeroes(item.name);

          this.screen.showMessage();
          return;
        }
        this.screen.showMessage(false);
        break;
    }
  }

  showHiddenHeroes() {
    const hiddenHeroes = this.hiddenHeroes;

    for (const hero of hiddenHeroes) {
      const { img } = this.initialHeroes.find(
        (item) => item.name === hero.name
      );
      hero.img = img;
    }

    this.screen.refreshImages(hiddenHeroes);
  }

  play() {
    this.randomize();
  }
}
