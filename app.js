const currencyDropdownOne = document.getElementById('currencyOne');
const currencyDropdownTwo = document.getElementById('currencyTwo');
const inputElementOne = document.getElementById('input-one');
const inputElementTwo = document.getElementById('input-two');

const rateElement = document.getElementById('rate');
const swapBtn = document.getElementById('swap');
(function () {
  console.log('ready')
  const currencyArr = [
  "AED",
  "ARS",
  "AUD",
  "BGN",
  "BRL",
  "BSD",
  "CAD",
  "CHF",
  "CLP",
  "CNY",
  "COP",
  "CZK",
  "DKK",
  "DOP",
  "EGP",
  "EUR",
  "FJD",
  "GBP",
  "GTQ",
  "HKD",
  "HRK",
  "HUF",
  "IDR",
  "ILS",
  "INR",
  "ISK",
  "JPY",
  "KRW",
  "KZT",
  "MXN",
  "MYR",
  "NOK",
  "NZD",
  "PAB",
  "PEN",
  "PHP",
  "PKR",
  "PLN",
  "PYG",
  "RON",
  "RUB",
  "SAR",
  "SEK",
  "SGD",
  "THB",
  "TRY",
  "TWD",
  "UAH",
  "USD",
  "UYU",
  "VND",
  "ZAR"
  ]
  const html = currencyArr.map(curr => (`<option value="${curr}">${curr}</option>`)).join(' ')
  currencyDropdownOne.innerHTML = html
  currencyDropdownOne.getElementsByTagName('option')['48'].selected = true
  

  currencyDropdownTwo.innerHTML = html
  currencyDropdownTwo.getElementsByTagName('option')['15'].selected = true
  console.log(currencyDropdownTwo.getElementsByTagName('option')['15'].selected)
})()


// Fetch exchange rates and update the dom
function calculate() {
  const currencyOne = currencyDropdownOne.value;
  const currencyTwo = currencyDropdownTwo.value;

  fetch(`https://v6.exchangerate-api.com/v6/b71ba5a6f69833fe3ac900ec/latest/${currencyOne}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
      const rate = data.conversion_rates[currencyTwo];
      rateElement.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;

      inputElementTwo.value = (inputElementOne.value * rate).toFixed(2);
    });
}

// Event Listeners
currencyDropdownOne.addEventListener('change', calculate);
inputElementOne.addEventListener('input', calculate);
currencyDropdownTwo.addEventListener('change', calculate);
inputElementTwo.addEventListener('input', calculate);
swapBtn.addEventListener('click', () => {
  const temp = currencyDropdownOne.value;
  currencyDropdownOne.value = currencyDropdownTwo.value;
  currencyDropdownTwo.value = temp;
  calculate();
});

calculate();