/* Dom selectors */
const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('people-amount');
const serviceInput = document.getElementById('input-select');
const errorDom = document.getElementById('error-dom');
const form = document.getElementById('form');
const clearBtn = document.getElementById('clear');

/* A variable that is later turned into a setTimeout */
let timeOut;

/* Dom & UI handler */
class UI {
  /* Make object values out of dom elements */
  constructor() {
    this.loader = document.getElementById('loader');
    this.result = document.getElementById('result');
    this.tipAmount = document.getElementById('tip-amount');
    this.totalAmount = document.getElementById('total-amount');
    this.personAmount = document.getElementById('person-amount');
    this.blankBill = document.getElementById('blank-bill');
    this.zeroUsers = document.getElementById('zero-users');
    this.faultyService = document.getElementById('faulty-service');
  }
  /* Initiate the render functionality */
  showLoader() {
    this.tipAmount.innerText = '';
    this.totalAmount.innerText = '';
    this.personAmount.innerText = '';
    this.result.classList.add('hidden');
    const bill = new Bill(
      Number(billInput.value),
      Number(peopleInput.value),
      Number(serviceInput.value)
    );
    this.clearInputFields();
    this.loader.classList.remove('hidden');
    setTimeout(() => {
      this.loader.classList.add('hidden');
      this.showResult(bill.amountToPay, bill.amountOfPeople, bill.serviceValue);
    }, 2000);
  }
  /* Render results to the DOM */
  showResult(billValue, peopleAmount, servicePercent) {
    const tipAmount = billValue * servicePercent;
    const totalAmount = billValue + tipAmount;
    const pricePerPerson = totalAmount / peopleAmount;

    this.tipAmount.innerText = `Tip Amount $ ${tipAmount.toFixed(2)}`;
    this.totalAmount.innerText = `Total Amount $ ${totalAmount.toFixed(2)}`;
    this.personAmount.innerText = `Each Person Owes $ ${pricePerPerson.toFixed(
      2
    )}`;
    this.result.classList.remove('hidden');
  }
  /* Clear the result */
  clear() {
    this.result.classList.add('hidden');
  }
  /* Clear the input fields */
  clearInputFields() {
    form.reset();
  }
  /* Handle errors */
  showError() {
    const error = new Error();
    errorDom.classList.remove('hidden');
    if (error.billValue === '') {
      this.blankBill.innerText = error.blankBillError;
    } else {
      this.blankBill.innerText = '';
    }
    if (error.peopleInput === '' || Number(error.peopleInput) <= 0) {
      this.zeroUsers.innerText = error.zeroUsersError;
    } else {
      this.zeroUsers.innerText = '';
    }
    if (error.serviceInput === 'Choose...') {
      this.faultyService.innerText = error.serviceError;
    } else {
      this.faultyService.innerText = '';
    }
    timeOut = setTimeout(() => {
      errorDom.classList.add('hidden');
    }, 5000);
  }
}

/* Instantiate ui object */
const ui = new UI();

/* Instantiate Bill object */
class Bill {
  constructor(amountToPay, amountOfPeople, serviceValue) {
    this.amountToPay = amountToPay;
    this.amountOfPeople = amountOfPeople;
    this.serviceValue = serviceValue;
  }
}

/* Instantiate Error object */
class Error {
  constructor() {
    this.billValue = billInput.value;
    this.peopleInput = peopleInput.value;
    this.serviceInput = serviceInput.value;
    this.blankBillError = 'Bill Amount Cannot Be Blank';
    this.zeroUsersError = 'Number Of Users Must Be Greater Than Zero';
    this.serviceError = 'You Must Select A Service';
  }
}

/* Run when no error */
function handleSuccess() {
  errorDom.classList.add('hidden');
  ui.showLoader();
}

/* Run on submit */
form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (
    billInput.value === '' ||
    peopleInput.value === '' ||
    Number(peopleInput.value) < 1 ||
    serviceInput.value === 'Choose...'
  ) {
    clearTimeout(timeOut);
    ui.showError();
  } else {
    handleSuccess();
  }
});

/* Eventlistener pointing to clear-result method */
clearBtn.addEventListener('click', () => {
  ui.clear();
});
