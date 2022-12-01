const infoSelection = document.querySelectorAll('input[name="radioEl"]');
const searchBtn = document.querySelector('.searchBtn');
const searchTerm = document.querySelector('#searchTerm');
const deleteButton = document.querySelector('#delete');
const editButton = document.querySelector('#edit');

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

if (deleteButton) {
  deleteButton.addEventListener('click', async () => {
    const verify = confirm('Are you sure you want to delete this vehicle? This can not be undone.');
    if (!verify) return;
    const id = document.querySelector('#vehicle-id').dataset.id;
    await fetch(`/api/vehicle/${id}`, { method: 'DELETE' });
    window.location.replace('/');
  });
}

if (editButton) editButton.href = `/add?${window.location.href.split('?')[1].split('&')[0]}`;
