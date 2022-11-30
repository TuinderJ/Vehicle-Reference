const infoSelection = document.querySelectorAll('input[name="radioEl"]');
const searchBtn = document.querySelector('.searchBtn');
const searchTerm = document.querySelector('#searchTerm');

searchBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (!searchTerm.value) return alert('Type something to search for');
  infoSelection.forEach((option) => {
    if (option.checked) {
      const url = window.location.href.split('?')[0];
      window.location.href = `${url}?${option.dataset.search}=${searchTerm.value}`;
    }
  });
});

document.querySelector('#edit').href = `/add?${window.location.href.split('?')[1].split('&')[0]}`;
