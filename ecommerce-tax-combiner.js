// Webflow E-commerce Tax Combiner.

// Tax names
const combination = ['State Taxes', 'City Taxes', 'County Taxes', 'Country Taxes', 'Special District Taxes']

// Tax line ID
const taxLine = 'tax-line'

// Main Script

window.addEventListener('load', function () {

	var combinedLabel = document.getElementById(taxLine)
	combinedLabel.style.display = 'none'
  
	  function combineTaxes() {

	      console.log('Combining taxes...');

	      var fees = document.getElementsByClassName('w-commerce-commercecheckoutordersummaryextraitemslistitem')

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
