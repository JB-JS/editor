const db = window.indexedDB.open('test2', 4);

const $roomBtn = document.querySelector('.room-btn');
const $modal = document.querySelector('.modal');
const $modalBg = document.querySelector('.modal-bg');
const $modalBtn = document.querySelector('.modal-btn');
const $modalInput = document.querySelector('.modal-input');
const $userList = document.querySelector('.user-list');
const $btnGroup = document.querySelector('.btn-group');
const $room = document.querySelector('.room');
const $content = document.querySelector('.editor textarea');
const $notify = document.querySelector('.name-notify');

const App = {
  onEnter() {
    const name = $modalInput.value;

    const users = JSON.parse(localStorage.getItem('user'));

    if (!users) {
      localStorage.setItem('user', JSON.stringify([{ idx: 1, name }]));
    } else {
      const updateUsers = JSON.stringify(
        users.concat({
          idx: users[users.length - 1].idx + 1,
          name,
        }),
      );

      localStorage.setItem('user', updateUsers);
    }

    $btnGroup.classList.add('hidden');
    $room.classList.remove('hidden');

    this.onClose();
    App.refresh();
    setInterval(App.refresh, 3000);
  },

  onChange(e) {
    localStorage.setItem('content', e.target.value);
  },

  onOpen() {
    $modal.classList.remove('hidden');
    $modalBg.classList.remove('hidden');
  },

  onClose() {
    $modal.classList.add('hidden');
    $modalBg.classList.add('hidden');
    $modalInput.value = '';
  },

  refresh() {
    const users = JSON.parse(localStorage.getItem('user'));
    const text = localStorage.getItem('content');

    const userItems = users.map(user => `<li>${user.name}</li>`).join('\n');

    $userList.innerHTML = userItems;
    $content.innerHTML = text;
    $notify.innerText = `${users[users.length - 1].name}님이 입장하셨습니다.`;
  },

  event() {
    $roomBtn.addEventListener('click', this.onOpen);
    $modalBg.addEventListener('click', this.onClose);
    $modalBtn.addEventListener('click', () => this.onEnter());
    $content.addEventListener('change', this.onChange);
  },

  init() {
    this.event();
  },
};

App.init();
