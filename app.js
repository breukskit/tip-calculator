const billInput = document.getElementById('bill');
const peopleInput = document.getElementById('people-amount');
const serviceInput = document.getElementById('input-select');
const errorDom = document.getElementById('error-dom');
const form = document.getElementById('form');
const clearBtn = document.getElementById('clear');

let timeOut;

class UI {
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
  showLoader() {
    this.tipAmount.innerText = '';
    this.totalAmount.innerText = '';
    this.personAmount.innerText = '';
    this.result.classList.add('hidden');
    const bill = new Bill(
      Number(document.getElementById('bill').value),
      Number(document.getElementById('people-amount').value),
      Number(document.getElementById('input-select').value)
    );
    this.clearInputFields();
    this.loader.classList.remove('hidden');
    setTimeout(() => {
      this.loader.classList.add('hidden');
      this.showResult(bill.amountToPay, bill.amountOfPeople, bill.serviceValue);
    }, 2000);
  }
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
  clear() {
    this.result.classList.add('hidden');
  }
  clearInputFields() {
    form.reset();
  }
  showError() {
    const error = new Error();
    errorDom.classList.remove('hidden');
    if (error.billValue === '') {
      this.blankBill.innerText = 'Bill Amount Cannot Be Blank';
    } else {
      this.blankBill.innerText = '';
    }
    if (error.peopleInput === '' || Number(error.peopleInput) <= 0) {
      this.zeroUsers.innerText = 'Number Of Users Must Be Greater Than Zero';
    } else {
      this.zeroUsers.innerText = '';
    }
    if (error.serviceInput === 'Choose...') {
      this.faultyService.innerText = 'You Must Select A Service';
    } else {
      this.faultyService.innerText = '';
    }
    timeOut = setTimeout(() => {
      errorDom.classList.add('hidden');
    }, 5000);
  }
}

const ui = new UI();

class Bill {
  constructor(amountToPay, amountOfPeople, serviceValue) {
    this.amountToPay = amountToPay;
    this.amountOfPeople = amountOfPeople;
    this.serviceValue = serviceValue;
  }
}

class Error {
  constructor() {
    this.billValue = billInput.value;
    this.peopleInput = peopleInput.value;
    this.serviceInput = serviceInput.value;
  }
}

function handleSuccess() {
  errorDom.classList.add('hidden');
  ui.showLoader();
}

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

clearBtn.addEventListener('click', () => {
  ui.clear();
});
