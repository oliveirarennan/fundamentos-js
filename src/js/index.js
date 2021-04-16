function onLoad() {
  const dependencies = {
    screen: Screen,
  };

  const memoryGame = new MemoryGame(dependencies);

  memoryGame.initialize();
}

window.onload = onLoad;
