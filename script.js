// Toggle Buttons
const toggleButtons = document.querySelectorAll('.toggle-btn');

function handleButtonClick(button) {
    
    toggleButtons.forEach((btn) => {
        btn.classList.remove('active');
    });

    
    button.classList.add('active');

    const mode = button.getAttribute('data-mode');

    result.textContent = "";
    if (mode === 'convert') {
        document.getElementById('convert-mode').style.display = "block";  
        document.getElementById('exchange-mode').style.display = "none";   
    } else {
        document.getElementById('convert-mode').style.display = "none";    
        document.getElementById('exchange-mode').style.display = "block";  
    }
}


toggleButtons.forEach((button) => {
    button.addEventListener('click', () => handleButtonClick(button));
});


const amountInput = document.getElementById
("amount");
const fromCurrency = document.getElementById
('from-currency');
const toCurrency = document.getElementById
('to-currency');
const convertBtn =  document.getElementById
('converter-btn');
const result = document.getElementById
('result');
const baseCurrency = document.getElementById
("base-currency");
const getRatesbtn = document.getElementById
("get-exchange-rate-btn")


const apiKey = "7ac897ee71097f396cfab271";

// Work on convert

convertBtn.addEventListener('click', ()=>{
    alert("Clicked");
    const amount = amountInput.value;
    const from = fromCurrency.value;
    const to = toCurrency.value;

    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}`)
    .then(
        (result) =>{
            return result.json();
    })
    .then( (data) => {
        const rate = data.conversion_rate;
        const convertedAmount = (rate*amount).toFixed(2);
        console.log(convertedAmount);
        result.textContent = `The converted amount is ${convertedAmount} ${to}'s` ;
        
    })
    .catch((error)=>{
        console.log(error);
    });
    
})


// standard exchange rates
getRatesbtn.addEventListener('click', () => {
    const currency = baseCurrency.value; // Get the base currency value
    fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency}`)
        .then((response) => response.json()) 
        .then((data) => {
            let ratesHtml = '<h3>Exchange Rates</h3><ul>';
            for (const [currency, rate] of Object.entries(data.conversion_rates)) {
              ratesHtml += `<li>${currency} - ${rate}</li>`;
            } 
            ratesHtml += '</ul>'
            result.innerHTML = ratesHtml;
        })
        .catch((error) => {
            console.log(error); // Log any errors
        });
});
