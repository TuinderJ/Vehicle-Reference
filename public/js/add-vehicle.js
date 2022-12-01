const addCardHandler = async (e) => {
  e.preventDefault();
  const form = document.querySelector('form');
  const vehicle = {
    unitNumber: document.querySelector('input[name="unit-num"]').value,
    customerUnitNumber: document.querySelector('input[name="customer-unit-num"]').value,
    vin: document.querySelector('input[name="vin-input"]').value,
    categories: [],
    values: [],
  };

  if (!vehicle.vin) return alert('Please enter a vin');

  for (i = 1; i < form.children[0].children.length; i++) {
    const tbody = form.children[0].children[i];
    const categoryId = tbody.dataset.id;
    let containsValues = false;
    for (let i = 1; i < tbody.children.length; i++) {
      const labelId = tbody.children[i].children[1].children[0].name;
      const value = tbody.children[i].children[1].children[0].value;
      if (value !== '') {
        containsValues = true;
        vehicle.values.push({ labelId, value });
      }
    }
    if (containsValues) vehicle.categories.push(categoryId);
  }

  console.log(vehicle);

  await fetch(`api/vehicle/`, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(vehicle),
  });

  document.location.replace(`/?vin=${vehicle.vin}`);
};

document.querySelector('#submit-button').addEventListener('click', addCardHandler);
