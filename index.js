class GemPuzzle {
  constructor(side) {
    this.side = side;
    this.zero = null;
    this.turnCount = 0;
    this.checker = 0;
    this.paused = false;
    this.gameStart = false;
    this.timer = 0;
    this.min = 0;
    this.sec = 0;
  }


  static createField() {
    for (let i = 1; i <= 6; i += 1) {
      const div = document.createElement('div');
      switch (i) {
        case 1:
          div.classList.add('square');
          document.body.append(div);
          break;
        case 2:
          div.classList.add('interfaceContainer');
          document.body.append(div);
          break;
        case 3:
          div.classList.add('restartBtn');
          div.innerHTML = 'RESTART';
          document.querySelector('.interfaceContainer').append(div);
          break;
        case 4:
          div.classList.add('pauseBtn');
          div.innerHTML = 'PAUSE';
          document.querySelector('.interfaceContainer').append(div);
          break;
        case 5:
          div.classList.add('timer');
          document.querySelector('.interfaceContainer').append(div);
          break;
        case 6:
          div.classList.add('turns-count');
          div.innerHTML = '0';
          document.querySelector('.interfaceContainer').append(div);
        default:
      }
    }
  }

  createGems() {
    for (let i = 0; i < this.side; i += 1) {
      for (let j = 0; j < this.side; j += 1) {
        const gem = document.createElement('div');
        gem.classList.add('gem');
        gem.setAttribute('data', `${i}${j}`);
        const gemNumber = (this.side * i + 1) + j;
        if (i === this.side - 1 && j === this.side - 1) {
          gem.innerHTML = '<span></span>';
          gem.setAttribute('id', 'zero');
        } else {
          gem.innerHTML = `<span>${gemNumber}</span>`;
          gem.setAttribute('id', `${i}${j}`);
        }
        this.setPosition(gem);
        gem.style.width = `${100 / this.side - 1}%`;
        gem.style.height = `${100 / this.side - 1}%`;
        document.querySelector('.square').append(gem);
      }
    }
    this.gameStart = true;
  }

  findRemovable() {
    this.zero = document.querySelector('#zero');
    const a = Number(this.zero.getAttribute('data').slice(0, 1));
    const b = Number(this.zero.getAttribute('data').slice(-1));
    const [atTop, atRight, atBottom, atLeft] = [`${a - 1}${b}`, `${a}${b + 1}`, `${a + 1}${b}`, `${a}${b - 1}`];
    const moveAble = [atTop, atRight, atBottom, atLeft];
    document.querySelectorAll('.gem').forEach((el) => {
      moveAble.forEach((item) => {
        if (item === el.getAttribute('data')) {
          el.classList.add('moveable');
        }
      });
    });
  }

  setPosition(elem) {
    const topShift = elem.getAttribute('data').slice(0, 1) * (100 / this.side);
    const leftShift = elem.getAttribute('data').slice(1) * (100 / this.side);
    elem.style.left = `${leftShift}%`;
    elem.style.top = `${topShift}%`;
  }

  swapData(gem) {
    const zeroData = this.zero.getAttribute('data'); const
      currentData = gem.getAttribute('data');
    gem.setAttribute('data', zeroData);
    this.zero.setAttribute('data', currentData);
    document.querySelectorAll('.moveable').forEach((item) => {
      item.classList.remove('moveable');
    });
  }

  swapPosition(event) {
    this.swapData(event.target);
    this.findRemovable();
    this.setPosition(this.zero);
    this.setPosition(event.target);
    this.turnCount += 1;
    document.querySelector('.turns-count').innerHTML = this.turnCount;
    this.checkWin();
  }

  checkWin() {
    document.querySelectorAll('.gem').forEach((gem) => {
      if (gem !== this.zero) {
        if (gem.getAttribute('data') === gem.id) {
          this.checker += 1;
        }
      }
    });

    if (this.checker !== (this.side ** 2) - 1) {
      this.checker = 0;
    } else {
      alert(`${this.turnCount} turns`);
      this.restart();
    }
  }

  shuffleGems() {
    for (let i = 1; i <= this.side ** 3; i += 1) {
      let removableGems = [];
      document.querySelectorAll('.moveable').forEach((item) => {
        removableGems.push(item);
      });
      const currentMove = removableGems[Math.floor(Math.random() * (removableGems.length))];
      this.swapData(currentMove);
      this.setPosition(currentMove);
      this.setPosition(this.zero);
      this.findRemovable();
      removableGems = [];
    }
  }

  restart() {
    this.shuffleGems();
    this.findRemovable();
    this.paused = false;
    this.gameStart = false;
    this.turnCount = 0;
    document.querySelector('.turns-count').innerHTML = '0';
  }

  pause() {
    this.paused = !this.paused;
  }

  listeners() {
    const restart = document.querySelector('.restartBtn');
    const pause = document.querySelector('.pauseBtn');
    window.addEventListener('mousedown', (event) => {
      if (event.target === restart) {
        this.restart();
      }
      if (event.target === pause) {
        this.pause();
      }
      if (!this.paused && !this.gameStart) {
        if (event.target.className.includes('moveable')) {
          this.swapPosition(event);
        }
      }
    });
  }

}

const gemGame = new GemPuzzle(3);
GemPuzzle.createField();
gemGame.createGems();
gemGame.findRemovable();
gemGame.listeners();









