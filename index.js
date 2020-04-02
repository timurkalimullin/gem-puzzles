class GemPuzzle {
  constructor(side) {
    this.side = side;
    this.zero = null;
  }


  createField() {
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
        gem.style.width = `${100 / this.side}%`;
        gem.style.height = `${100 / this.side}%`;
        document.querySelector('.square').append(gem);
      }
    }
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

  swapPosition() {
    document.querySelector('.square').addEventListener('mousedown', (event) => {
      if (event.target.className.includes('moveable')) {
        const zeroData = this.zero.getAttribute('data'); const
          moveGemData = event.target.getAttribute('data');
        event.target.setAttribute('data', zeroData);
        this.zero.setAttribute('data', moveGemData);
        document.querySelectorAll('.moveable').forEach((item) => {
          item.classList.remove('moveable');
        });
        this.findRemovable();
        this.setPosition(this.zero);
        this.setPosition(event.target);
      }
    });
  }
}

const gemGame = new GemPuzzle(4);
gemGame.createField();
gemGame.findRemovable();
gemGame.swapPosition();
