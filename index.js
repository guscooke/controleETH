const account1 = {
  owner: 'Jonas Schmedtmann',
  pin: 1111,
};

const account2 = {
  owner: 'ricardo tubaki',
  pin: 2222,
};
const accounts = [account1, account2];
// *********LABELS*******
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

// ****CLEAR BUTTON******
const btnIndex = document.querySelector('.form_btnC');

// *****localStorage*******
const balance = document.querySelector(".balance__total");
if (localStorage.balanceHTML) balance.innerHTML = localStorage.balanceHTML;

const table = document.querySelector('.movements');
if (localStorage.tableHTML) table.innerHTML = localStorage.tableHTML;

const index = document.querySelector("#profit");
if (localStorage.indexHTML) index.innerHTML = localStorage.indexHTML;

function dateHeader() {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed).toLocaleDateString();
  return dailyDate.textContent = `${today}`
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

document.addEventListener('DOMContentLoaded', function () {
  dateHeader();

  document.querySelector('form').onsubmit = (e) => {
    e.preventDefault();
    // localstorage
    const getTrade = JSON.parse(localStorage
      .getItem('trade'));

    const trade = localStorage
      .getItem('trade') !== null ? getTrade : [];
    console.log('get item:', trade);


    // ****BTN ERASE ID****
    const removeTrade = ID => {
      trade = trade.filter(tradie => tradie.id !== ID)
      updateTrade();
    };


    // *********juntar todas a functions to start
    // const init = () => {
    //   updateTrade();
    //   const generateID = () => Math.round(Math.random() * 1000);
    // };

    // Function to call init and localstore
    const updateTrade = () => {
      trade.push(tradeDeal);
      // console.warn('added', { trade });
      localStorage.setItem('trade', JSON.stringify(trade));

      // Table
      table.insertAdjacentHTML('afterbegin', html);
      localStorage.tableHTML = table.innerHTML;

      // volume total
      balance.textContent = `Total ${volShow}m3`;
      localStorage.balanceHTML = balance.innerHTML;

      // ***real profit****
      index.textContent = `Lucro: ${profit}`;
      localStorage.indexHTML = index.innerHTML;
    }

    // *****tem que atualizar de primeira button click****
    const volTotal = trade.reduce(getTotal, 0);
    function getTotal(total, item) {
      return Math.floor(item.volume) + total
    };

    // ***ternary to show first Input****
    const volShow = volTotal === 0 ? cbm.value : volTotal;
    console.log('volume total:', volShow);

    // ********GENERATE ID******
    const generateID = () => Math.round(Math.random() * 1000);

    // MAPPING
    // const maping = trade.map(({ value, ...rest }) => ({ ...rest, value: +value }));
    // console.warn('I am mapping:', maping);

    let tradeDeal = {
      id: generateID(),
      seller: vendedor.value,
      buyer: comprador.value,
      valor: price.value,
      volume: cbm.value,
      data: dateHeader(),
      basePrice: base.value,
      frete: frete.value,
      total: volTotal.value
    };
    // ****resultado original***
    const valorOV = (tradeDeal.valor * tradeDeal.volume * 1000);
    const valorOVS = valorOV.
      toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // ****resultado Base****
    const valorBase = (tradeDeal.basePrice * tradeDeal.volume * 1000);
    const valorBases = valorBase.
      toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const valorv = Number(tradeDeal.volume);
    const valory = Number(tradeDeal.frete);
    const valorx = Number(tradeDeal.valor);
    const freight = Number(valorx + valory);

    const freights = freight.
      toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    const volFreteIn = (freight * tradeDeal.volume) * 1000;
    console.log('o que vai dar é:', valory);


    const profit = ((valorBase) - (volFreteIn)).
      toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    // if (freight == null ? alertx : profit);

    // console.log("com frete:", volFreteIn);

    let html = `
    <div class="movements__row">
      <div class="movements__value">
      ${tradeDeal.seller} -
      ${tradeDeal.buyer} -
      ${tradeDeal.volume}m3  -
      R$${tradeDeal.valor} - 
      Data ${tradeDeal.data}

      <div>
      <p class="balance__resultado">valor contrato:${valorOVS}</p>
        <p class="balance__frete">Frete incluso:${freights}</p>
        <p class="balance__value">Base: ${tradeDeal.basePrice} - ${valorBases}</p>
        <p class="balance__resultado1">lucro: ${profit}</p>
      </div>
       <button class="form__btnC" onClick="removeTrade(${trade.id})"><p>clear</p></button>
          `;

    // <button class="form__btnC" onClick="removeTrade"(${tradie.id})><p>clear</p></button>


    updateTrade();
    // limpar o form
    vendedor.value = '';
    comprador.value = '';
    price.value = '';
    cbm.value = '';
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
  alert('EM BREVE, APERTA QUE DESESTRESSA!!!!')

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