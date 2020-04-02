
function createField(n) {
  for (let i = 0; i < n; i += 1) {
    for (let j = 0; j < n; j += 1) {
      const gem = document.createElement('div');
      gem.classList.add('gem');
      gem.setAttribute('data', `${i}${j}`);
      const gemNumber = (n * i + 1) + j;
      if (i === n - 1 && j === n - 1) {
        gem.innerHTML = '<span></span>';
        gem.setAttribute('id', 'zero');
      } else {
        gem.innerHTML = `<span>${gemNumber}</span>`;
        gem.setAttribute('id', `${i}${j}`);
      }
      const topShift = gem.getAttribute('data').slice(0, 1) * (100 / n);
      const leftShift = gem.getAttribute('data').slice(1) * (100 / n);
      gem.style.left = `${leftShift}%`;
      gem.style.top = `${topShift}%`;
      gem.style.width = `${100 / n}%`;
      gem.style.height = `${100 / n}%`;
      document.querySelector('.square').append(gem);
    }
  }
}

function findRemovable() {
  const zero = document.querySelector('#zero');
  const a = zero.getAttribute('data').slice(0, 1);
  const b = zero.getAttribute('data').slice(-1);
  const [atTop, atRight, atBottom, atLeft] = [`${a - 1}${b}`, `${a}${b + 1}`, `${a + 1}${b}`, `${a}${b - 1}`];
  const moveAble = [atTop, atRight, atBottom, atLeft];

  document.querySelectorAll('.gem').forEach((el) => {
    moveAble.forEach((item) => {
      if (item === el.getAttribute('data')) {
        el.classList.add('moveAble');
      }
    });
  });
}

createField(4);
findRemovable();
