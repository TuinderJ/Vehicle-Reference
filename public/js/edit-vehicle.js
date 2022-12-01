const init = async () => {
  const search = window.location.href.split('?')[1].split('&')[0];
  const response = await fetch(`/api/vehicle?${search}`);
  const vehicleData = await response.json();
  const inputs = document.querySelectorAll('input');

  document.querySelector('#vehicle-id').dataset.id = vehicleData.id;
  const form = document.querySelector('form');
  form['unit-num'].value = vehicleData.unitNumber;
  form['customer-unit-num'].value = vehicleData.customerUnitNumber;
  form['vin-input'].value = vehicleData.vin;

  vehicleData.categories.forEach((category) => {
    category.labels.forEach((label) => {
      if (label.values) {
        const id = label.id;
        inputs.forEach((input) => {
          if (Number(input.name) === Number(id)) {
            input.value = label.values[0].value;
            input.dataset.id = label.values[0].id;
          }
        });
      }
    });
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const form = document.querySelector('form');
  const id = document.querySelector('#vehicle-id').dataset.id;
  const vehicle = {
    unitNumber: form['unit-num'].value,
    customerUnitNumber: form['customer-unit-num'].value,
    vin: form['vin-input'].value,
    categories: [],
    values: [],
  };

  for (i = 1; i < form.children[0].children.length; i++) {
    const tbody = form.children[0].children[i];
    const categoryId = tbody.dataset.id;
    let containsValues = false;
    for (let i = 1; i < tbody.children.length; i++) {
      const id = tbody.children[i].children[1].children[0].dataset.id;
      const labelId = tbody.children[i].children[1].children[0].name;
      const value = tbody.children[i].children[1].children[0].value;
      if (value !== '') {
        containsValues = true;
        vehicle.values.push({ id, labelId, value });
      }
    }
    if (containsValues) vehicle.categories.push(categoryId);
  }

  await fetch(`api/vehicle/${id}`, {
    method: 'PUT',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(vehicle),
  });

  location.replace(`/?vin=${vehicle.vin}`)
};

document.querySelector('#submit-button').addEventListener('click', handleSubmit);

init();
