class GemPuzzle {
  constructor() {
    this.side = 4;
    this.zero = null;
    this.turnCount = 0;
    this.checker = 0;
    this.paused = false;
    this.gameStart = false;
    this.timer = 0;
    this.min = 0;
    this.sec = 0;
    this.timeId = null;
    this.winnerName = null;
  }


  static createField() {
    for (let i = 1; i <= 9; i += 1) {
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
          div.classList.add('timer');
          document.querySelector('.interfaceContainer').append(div);
          div.innerHTML = '0 minutes 0 seconds';
          break;
        case 4:
          div.classList.add('turns-count');
          div.innerHTML = 'Turns : 0';
          document.querySelector('.interfaceContainer').append(div);
          break;
        case 5:
          div.classList.add('restartBtn');
          div.innerHTML = 'START/RESTART';
          document.querySelector('.interfaceContainer').append(div);
          break;
        case 6:
          div.classList.add('pauseBtn');
          div.innerHTML = 'PAUSE';
          document.querySelector('.interfaceContainer').append(div);
          break;
        case 7:
          div.classList.add('saveBtn');
          div.innerHTML = 'SAVE';
          document.querySelector('.interfaceContainer').append(div);
          break;
        case 8:
          div.classList.add('loadBtn');
          div.innerHTML = 'LOAD';
          document.querySelector('.interfaceContainer').append(div);
          break;
        case 9:
          div.classList.add('scoreBtn');
          div.innerHTML = 'SCORE';
          document.querySelector('.interfaceContainer').append(div);
          break;
        default:
      }
    }
    const sideSelect = document.createElement('select');
    sideSelect.setAttribute('id', 'side-select');
    sideSelect.innerHTML = '  <option value="3">3</option><option value="4" selected>4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option>';
    document.querySelector('.interfaceContainer').prepend(sideSelect);
    const sideSelectLabel = document.createElement('label');
    sideSelectLabel.setAttribute('for', 'side-select');
    sideSelectLabel.innerHTML = 'Chose field size: ';
    document.querySelector('.interfaceContainer').prepend(sideSelectLabel);
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
    document.querySelector('.startModal').classList.remove('hidden');
  }

  createModal() {
    const pauseModal = document.createElement('div');
    pauseModal.classList.add('pauseModal');
    pauseModal.classList.add('hidden');
    pauseModal.innerHTML = 'PAUSE';
    document.querySelector('.square').append(pauseModal);

    const startModal = document.createElement('div');
    startModal.classList.add('startModal');
    startModal.classList.add('hidden');
    startModal.innerHTML = 'PRESS START';
    document.querySelector('.square').append(startModal);

    const winModal = document.createElement('div');
    winModal.classList.add('winModal');
    winModal.classList.add('hidden');
    document.body.append(winModal);
    const winModalMessage = document.createElement('div');
    winModalMessage.classList.add('winModalMessage');
    document.querySelector('.winModal').append(winModalMessage);

    const scoreModal = document.createElement('div');
    scoreModal.classList.add('scoreModal');
    scoreModal.classList.add('hidden');
    document.body.append(scoreModal);
    const scoreModalMessage = document.createElement('div');
    scoreModalMessage.classList.add('scoreModalMessage');
    document.querySelector('.scoreModal').append(scoreModalMessage);
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
    document.querySelector('.turns-count').innerHTML = `Turns: ${this.turnCount}`;
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
      this.checker = 0;
      this.winnerName = prompt('Enter your name:') || 'Mr.Incognito';
      document.querySelector('.winModal').classList.remove('hidden');
      document.querySelector('.winModalMessage').innerHTML = `Congratulations, ${this.winnerName || 'Mr.Incognito'}! You win!<br>Your turns: ${this.turnCount}<br>Your time: ${parseInt(this.timer / 60, 10)} minutes ${this.timer % 60} seconds<br><br> Click to continue!`;
      this.writeScore();
      document.querySelector('.startModal').classList.remove('hidden');
      this.gameStart = true;
    }
  }

  shuffleGems() {
    for (let i = 1; i <= 1000; i += 1) {
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
    document.querySelector('.startModal').classList.add('hidden');
    this.resetTimer();
    this.shuffleGems();
    this.findRemovable();
    this.gameStart = false;
    if (this.paused === true) {
      this.pause();
    }
    this.turnCount = 0;
    document.querySelector('.turns-count').innerHTML = 'Turns : 0';
    this.startTimer();
  }

  pause() {
    if (!this.gameStart) {
      this.paused = !this.paused;
      document.querySelector('.pauseModal').classList.toggle('hidden');
    }
  }

  startTimer() {
    this.timeId = setInterval(() => {
      if (!this.paused && !this.gameStart) {
        this.timer += 1;
        this.sec = this.timer % 60;
        this.min = parseInt(this.timer / 60, 10);
        document.querySelector('.timer').innerHTML = `${this.min} minutes ${this.sec} seconds`;
      }
    }, 1000);
  }

  resetTimer() {
    clearInterval(this.timeId);
    this.timer = 0;
    this.sec = 0;
    this.min = 0;
    document.querySelector('.timer').innerHTML = `${this.min} minutes ${this.sec} seconds`;
  }

  listeners() {
    const restart = document.querySelector('.restartBtn');
    const pause = document.querySelector('.pauseBtn');
    const save = document.querySelector('.saveBtn');
    const load = document.querySelector('.loadBtn');
    const score = document.querySelector('.scoreBtn');
    const winModal = document.querySelector('.winModal');
    const scoreModal = document.querySelector('.scoreModal');
    const sideSelect = document.querySelector('#side-select');

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

      if (event.target === save) {
        this.save();
      }

      if (event.target === load) {
        this.load();
      }

      if (event.target === score) {
        this.showScore();
      }

      if (event.target === winModal) {
        winModal.classList.add('hidden');
      }

      if (event.target === scoreModal) {
        scoreModal.classList.add('hidden');
      }
    });

    sideSelect.addEventListener('change', (event) => {
      this.side = sideSelect.value;
      document.querySelectorAll('.gem').forEach((el) => {
        el.remove();
      });
      if (this.paused) {
        this.pause();
      }
      this.createGems();
      this.findRemovable();
      document.querySelector('.timer').innerHTML = '0 minutes 0 seconds';
      document.querySelector('.turns-count').innerHTML = 'Turns: 0';
    });
  }

  save() {
    if (!this.gameStart) {
      let positionList = [...document.querySelectorAll('.gem')];
      positionList = positionList.map((el) => ({
        id: el.getAttribute('id'),
        data: el.getAttribute('data'),
      }));
      window.localStorage.setItem('positionList', JSON.stringify(positionList));
      window.localStorage.setItem('turns', this.turnCount);
      window.localStorage.setItem('time', this.timer);
      window.localStorage.setItem('side', this.side);
    } else {
      const scoreModal = document.querySelector('.scoreModal');
      scoreModal.classList.remove('hidden');
      document.querySelector('.scoreModalMessage').innerHTML = 'Bro, start the game, nothing to save here';
    }
  }

  load() {
    if (window.localStorage.positionList) {
      this.gameStart = false;
      if (this.paused) {
        this.pause();
      }
      this.resetTimer();
      this.startTimer();
      this.timer = Number(window.localStorage.time);
      document.querySelector('.timer').innerHTML = `${parseInt(this.timer / 60, 10)} minutes ${this.timer % 60} seconds`;
      this.turnCount = Number(window.localStorage.turns);
      document.querySelector('.turns-count').innerHTML = this.turnCount;
      document.querySelectorAll('.gem').forEach((el) => {
        el.remove();
      });
      document.querySelector('.startModal').classList.add('hidden');
      this.side = window.localStorage.side;
      const positionList = JSON.parse(window.localStorage.positionList);
      positionList.forEach((el, i) => {
        const gem = document.createElement('div');
        gem.classList.add('gem');
        gem.setAttribute('data', el.data);
        if (i !== this.side ** 2 - 1) {
          gem.innerHTML = `<span>${i + 1}</span>`;
        } else {
          gem.innerHTML = '<span></span>';
        }
        if (i !== this.side ** 2 - 1) {
          gem.setAttribute('id', el.id);
        } else {
          gem.setAttribute('id', 'zero');
        }
        gem.style.width = `${100 / this.side - 1}%`;
        gem.style.height = `${100 / this.side - 1}%`;
        this.setPosition(gem);
        document.querySelector('.square').append(gem);
      });
      this.findRemovable();
      document.querySelectorAll('option').forEach((item) => {
        item.selected = false;
        if (item.value === this.side) {
          item.selected = true;
        }
      });
    } else {
      const scoreModal = document.querySelector('.scoreModal');
      scoreModal.classList.remove('hidden');
      document.querySelector('.scoreModalMessage').innerHTML = 'No saves yet!<br> Click to continue!';
    }
  }

  showScore() {
    const scoreModal = document.querySelector('.scoreModal');
    scoreModal.classList.remove('hidden');
    if (!window.localStorage.score) {
      document.querySelector('.scoreModalMessage').innerHTML = 'No score yet!<br> Click to continue!';
    } else {
      const score = JSON.parse(window.localStorage.score);
      let scoreString = '';
      for (const key in score) {
        scoreString += `Name: ${score[key].name}, game: ${score[key].gems_number}x${score[key].gems_number}, turns: ${score[key].turns}, time: ${score[key].time}<br><br>`;
      }
      document.querySelector('.scoreModalMessage').innerHTML = `Top 10 score<br><br>${scoreString}<br> Click to continue!`;
    }
  }

  writeScore() {
    if (!window.localStorage.score) {
      const localScore = {
        1: {
          name: this.winnerName, turns: `${this.turnCount}`, time: `${parseInt(this.timer / 60, 10)} minutes ${this.timer % 60} seconds`, realSec: this.timer, gems_number: this.side,
        },
      };
      window.localStorage.setItem('score', JSON.stringify(localScore));
    } else {
      const localScore = JSON.parse(window.localStorage.score);
      const keyMax = Math.max.apply(null, Object.keys(localScore));
      localScore[keyMax + 1] = {
        name: this.winnerName, turns: `${this.turnCount}`, time: `${parseInt(this.timer / 60, 10)} minutes ${this.timer % 60} seconds`, realSec: this.timer, gems_number: this.side,
      };
      const temp = [];
      for (const i in localScore) {
        temp.push(localScore[i]);
      }
      temp.sort((a, b) => a.turns - b.turns);
      if (temp.length>10) {
        temp.splice(9,1);
      }
      window.localStorage.setItem('score', JSON.stringify(temp));
    }
  }

  init() {
    GemPuzzle.createField();
    this.createModal();
    this.createGems();
    this.findRemovable();
    this.listeners();
  }
}

const gemGame = new GemPuzzle();
gemGame.init();
