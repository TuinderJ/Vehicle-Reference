const addCardHandler = async (event) => {
    event.preventDefault();

    const unitNumber  = document.querySelector('input[name="unit-num"]').value;
    const customerUnitNumber = document.querySelector('input[name="customer-unit-num"]').value;
    const vin = document.querySelector('input[name="vin-input"]').value;

    await fetch("/api/vehicle", {
        method: 'POST',
        body: JSON.stringify({
            unitNumber,
            customerUnitNumber,
            vin
        })
    });
    document.location.replace('/');
}

document.querySelector('new-card-form').addEventListener('submit', addCardHandler);