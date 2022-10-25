// Webflow E-commerce Tax Combiner.

// Tax names
const combination = ['State Taxes', 'City Taxes', 'County Taxes', 'Country Taxes', 'Special District Taxes']


// Main Script

window.addEventListener('load', function () {

  const lineItemsContainer = document.getElementsByClassName('w-commerce-commercecheckoutordersummarywrapper')[0].children[1]
  
  // lineItems index 1 is skipped because it is a Webflow script element.
  const lineItems = lineItemsContainer.children
  
  const combinedLabel = lineItems[0].cloneNode(true)
  combinedLabel.children[1].removeAttribute('data-wf-bindings')

  lineItemsContainer.insertBefore(combinedLabel, lineItems[3]);
  combinedLabel.children[0].innerText = 'Taxes'
  combinedLabel.children[1].innerText = ''
  combinedLabel.style.display = 'none'
  
  function combineTaxes() {

    console.log('Combining taxes...');

    var fees = lineItems[2].children

    var prices = []

    for (var i = 0; i < fees.length; i++) {

      if (combination.includes(fees[i].children[0].innerText)) {

        fees[i].style.display = 'none'

        prices.push(parseFloat(fees[i].children[1].innerText.replace('$', '')))

      }
    }

    const priceSum = (prices.length > 0) ? prices.reduce((a, b) => a + b).toFixed(2) : 0

    console.log('Sum of taxes: '+priceSum)

    combinedLabel.children[1].innerText = '$ ' + priceSum

    if (priceSum > 0) {
      combinedLabel.style.display = 'flex'
    } else {
      combinedLabel.style.display = 'none'
    }

  }

  var dom_observer = new MutationObserver(combineTaxes);

  var container = document.getElementById('fees')
  console.log(container);
  var config = { attributes: true, childList: true, characterData: true };
  dom_observer.observe(container, config);

  combineTaxes()

})
