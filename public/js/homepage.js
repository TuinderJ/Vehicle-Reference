const infoSelection = document.querySelectorAll('input[name="radioEl"]');
const searchBtn = document.querySelector('.searchBtn');

searchBtn.addEventListener("click", () => {
   infoSelection.forEach(isChecked=> {
   if(isChecked.checked)
   console.log(isChecked.id);    
   });
});

