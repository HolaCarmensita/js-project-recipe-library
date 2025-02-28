const button = document.getElementById('clickMe');
const message = document.getElementById('message');

button.addEventListener('click', function () {
  message.innerText = 'Du klickade på knappen! 🎉';
});
