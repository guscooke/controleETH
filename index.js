const account1 = {
  owner: 'Jonas Schmedtmann',
  pin: 1111,
};

const account2 = {
  owner: 'ricardo tubaki',
  pin: 2222,
};
const accounts = [account1, account2];

const submit = document.querySelector("#submit");
const vendedor = document.querySelector("#vendedor");
const comprador = document.querySelector("#comprador");
const price = document.querySelector("#price");
const cbm = document.querySelector("#cbm");
const date = document.querySelector("#data");
const dailyDate = document.querySelector(".balance__date");
const base = document.querySelector("#base");
const frete = document.querySelector("#frete");


const containerApp = document.querySelector('.app');
// *****Password***** 
const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');

// *****button*****
const btnLogin = document.querySelector('#index');
// const index = document.querySelector("#display");
// if (localStorage.indexHTML) index.innerHTML = localStorage.indexHTML;

const btnIndex = document.querySelector('.form_btn');

const balance = document.querySelector(".balance__total");
if (localStorage.balanceHTML) balance.innerHTML = localStorage.balanceHTML;

const table = document.querySelector('.movements');
if (localStorage.tableHTML) table.innerHTML = localStorage.tableHTML;

const index = document.querySelector("#profit");
if (localStorage.indexHTML) index.innerHTML = localStorage.indexHTML;

function dateHeader() {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const dates = today.toLocaleDateString();
  return dailyDate.textContent = `Data ${dates}`
};

submit.disabled = true;
// disable input field
vendedor.onkeyup = () => {
  if (vendedor.value.length > 0) {
    submit.disabled = false;
  }
  else {
    submit.disabled = true;
  }
};


// btnIndex.addEventListener('click', function (e) {
//   // Prevent form from submitting
//   e.preventDefault();
// },
document.addEventListener('DOMContentLoaded', function () {
  dateHeader();

  document.querySelector('form').onsubmit = (e) => {
    e.preventDefault();
    // localstorage
    const getTrade = JSON.parse(localStorage
      .getItem('trade'));

    const trade = localStorage
      .getItem('trade') !== null ? getTrade : [];
    console.log('get item:', getTrade);

    // Function to call init and localstore
    const updateTrade = () => {
      trade.push(tradeDeal);
      // console.warn('added', { trade });
      localStorage.setItem('trade', JSON.stringify(trade));
      // Table
      table.insertAdjacentHTML('afterbegin', html);
      localStorage.tableHTML = table.innerHTML;
      // volume total
      balance.textContent = `Total ${volTotal}m3`;
      localStorage.balanceHTML = balance.innerHTML;

      index.textContent = `Lucro: ${profit}`;
      localStorage.indexHTML = index.innerHTML;
    }

    const volTotal = trade.reduce(getTotal, 0);
    function getTotal(total, item) {
      return Math.floor(item.volume) + total;
    };
    console.log('volume total:', volTotal);


    // MAPPING
    // const maping = trade.map(({ value, ...rest }) => ({ ...rest, value: +value }));
    // console.warn('I am mapping:', maping);

    let tradeDeal = {
      id: Date.now(),
      seller: vendedor.value,
      buyer: comprador.value,
      valor: price.value,
      volume: cbm.value,
      data: date.value,
      basePrice: base.value,
      frete: frete.value
    };

    const valorOV = (tradeDeal.valor * tradeDeal.volume * 1000);
    const valorOVS = valorOV.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const valorBase = (tradeDeal.basePrice * tradeDeal.volume * 1000);
    const valorBases = valorBase.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const valory = Number(tradeDeal.frete);
    const valorx = Number(tradeDeal.valor);
    const freight = Number(valorx + valory);
    const freights = freight.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const profit = ((valorOV) - (valorBase)).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    console.log(freights);
    console.log('frete', valory);
    console.log('preço', valorx);
    // function freightSum() { valorC - valorBa + valorF };



    let html = `
    <div class="movements__row">
      <div class="movements__value">
      ${tradeDeal.seller} -
      ${tradeDeal.buyer} -
      ${tradeDeal.volume}m3  -
      R$${tradeDeal.valor} - 
      ${tradeDeal.data} -
      ${freights}
      total:${valorOVS}

      <div>
        <p class="balance__value">Base: ${tradeDeal.basePrice} - ${valorBases}</p>
      </div>
      <div>
      <p class="balance__resultado">Result: ${profit}</p>
    </div>
      </div>
    </div>
          `;
    updateTrade();
    // limpar o form
    vendedor.value = '';
    comprador.value = '';
    price.value = '';
    cbm.value = '';
    date.value = '';
    base.value = '';
    frete.value = '';
    submit.disabled = true;
    return false;
  }
})

// eventHandler

// const updateUI = function (acc) {
//   // Display movements
//   displayMovements(acc.movements);

//   // Display balance

// };

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();
  alert('hello I am here')

  // currentAccount = accounts.find(
  //   acc => acc.username === inputLoginUsername.value
  // );
  // console.log(currentAccount);

  // if (currentAccount?.pin === Number(inputLoginPin.value)) {
  //   // Display UI and message
  //   // labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]
  //   //   }`;
  //   containerApp.style.opacity = 100;

  //   // Clear input fields
  //   inputLoginUsername.value = inputLoginPin.value = '';
  //   inputLoginPin.blur();

  //   // Update UI
  //   updateUI(currentAccount);
})

// console.log(brokerage);
// const Ov = function (vendedor, comprador, quantidade, price, date) {
//     // console.log(this)
//     this.vendedor = vendedor;
//     this.comprador = comprador;
//     this.quantidade = quantidade;
//     this.price = price;
//     this.date = date;
//     this.greet = function greet() {
//         return `Resumos das operações --- vendedor:${this.vendedor}, comprador:${this.comprador}, quantidade:${quantidade}`
//     }
// };


// const Ov1 = new Ov('Sao paulo', 'petrogold', '250k');
// // const Ov2 = new Ov('empty', 'empty')

// console.log(Ov1.greet());