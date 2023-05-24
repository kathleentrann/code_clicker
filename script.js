/* eslint-disable no-alert */

// Make your References to the two DOM nodes
// Create a reference to the element who's ID is 'coding_station and call it codingStation
const codingStation = document.getElementById('coding_station');

// Create a reference to the element who's ID is 'producer_container' and call it producerContainer
const producerContainer = document.getElementById('producer_container');

/**************
 *   SLICE 1
 **************/

function updateCodeView(codeQty) {
	// Create a reference to the element who's ID is 'code_counter'
	const codeCounter = document.getElementById('code_counter');
	// Set the innerText of that element to be the codeQty passed into this function
	codeCounter.innerText = codeQty;
}

function clickDesktop(data) {
	// Increment the data object's (passed into this function) code property by one
	data.codeLines++;
	// call the updateCodeView function and pass it the newly updated data.code property
	updateCodeView(data.codeLines);
	// call the renderProducers function and pass it the data object
	renderProducers(data);
}

/**************
 *   SLICE 2
 **************/

function unlockProducers(producers, codeCount) {
	// loop through the producers array passed into the function
	// for each producer, if the codeCount (passed in) is greater than or equal
	// to half the producer's price, reassign the producers.unlocked property to equal true
	producers.forEach(idObj => {
		if (codeCount >= idObj.price / 2) {
			idObj.unlocked = true;
		}
	});
	return producers;
}

function getUnlockedProducers(data) {
	// use the Array.prototype.filter() method
	// filter through the data.producers property, and return an array with only the producers whose
	// unlocked property is true
	return data.producers.filter(producer => producer.unlocked === true);
}

// You shouldn't need to edit this function
function makeDisplayNameFromId(id) {
	return id
		.split('_')
		.map(word => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}

// You shouldn't need to edit this function-- its tests should pass once you've written makeDisplayNameFromId
function makeProducerDiv(producer) {
	const containerDiv = document.createElement('div');
	containerDiv.className = 'producer';
	const displayName = makeDisplayNameFromId(producer.id);
	const currentCost = producer.price;
	const html = `
  <div class="producer-column">
    <div class="producer-title">${displayName}</div>
    <button class="btn-grad" type="button" id="buy_${producer.id}">Buy</button>
  </div>
  <div class="producer-column">
    <div>Quantity: ${producer.qty}</div>
    <div>Code Line/second: ${producer.cps}</div>
    <div>Cost: ${currentCost} code</div>
  </div>
  `;
	containerDiv.innerHTML = html;
	return containerDiv;
}

// You do not need to edit this function
function deleteAllChildNodes(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

function renderProducers(data) {
	// call the unlockProducers function and pass it data.producers and data.code
	unlockProducers(data.producers, data.codeLines);
	// make a reference to the DOM element whose ID is producer_container
	const producerContainer = document.getElementById('producer_container');
	// call the deleteAllChildNodes function and pass it the above producerContainer element
	deleteAllChildNodes(producerContainer);
	// you do not need to edit the following code, but for understanding, this gets the unlocked producers,
	// and for each producer makes a little html div with that producer's info
	getUnlockedProducers(data).forEach(producer => {
		producerContainer.appendChild(makeProducerDiv(producer));
	});
}

/**************
 *   SLICE 3
 **************/
// You shouldn't need to edit this function
function getProducerById(data, producerId) {
	return data.producers.find(producer => producerId === producer.id);
}

// You shouldn't need to edit this function
function canAffordProducer(data, producerId) {
	return getProducerById(data, producerId).price <= data.codeLines;
}

// You shouldn't need to edit this function
function updateCPSView(cps) {
	const cpsDiv = document.getElementById('cps');
	cpsDiv.innerText = cps;
}

// You shouldn't need to edit this function
function updatePrice(oldPrice) {
	return Math.floor(oldPrice * 1.25);
}

// You shouldn't need to edit this function
function attemptToBuyProducer(data, producerId) {
	if (canAffordProducer(data, producerId)) {
		const producer = getProducerById(data, producerId);
		data.codeLines -= producer.price;
		producer.qty += 1;
		producer.price = updatePrice(producer.price);
		data.totalCPS += producer.cps;
		return true;
	} else {
		return false;
	}
}

// You shouldn't need to edit this function
function buyButtonClick(event, data) {
	if (event.target.tagName === 'BUTTON') {
		const producerId = event.target.id.slice(4);
		const result = attemptToBuyProducer(data, producerId);
		if (!result) {
			window.alert('Not enough code!');
		} else {
			renderProducers(data);
			updateCodeView(data.codeLines);
			updateCPSView(data.totalCPS);
		}
	}
}

function tick(data) {
	// increment the data object's (passed into this function)
	// code property by the data.totalCPS amount
	data.codeLines += data.totalCPS;
	// call the updateCodeView function and pass it the data.code property
	updateCodeView(data.codeLines);
	// call the renderProducers function and pass it the newly updated data object
	renderProducers(data);
}

/*************************
 *  Start your engines!
 *************************/

// So far we've just defined some functions; we haven't actually
// called any of them. Now it's time to get things moving.

// We'll begin with a check to see if we're in a web browser; if we're just running this code in node for purposes of testing, we don't want to 'start the engines'.

// How does this check work? Node gives us access to a global variable /// called `process`, but this variable is undefined in the browser. So,
// we can see if we're in node by checking to see if `process` exists.
if (typeof process === 'undefined') {
	// Get starting data from the window object
	// (This comes from data.js)
	const data = window.data;

	/**************
	 *   EVENT LISTENERS
	 **************/

	// Add an event listener to the giant code emoji
	codingStation.addEventListener('click', () => clickDesktop(data));

	// Add an event listener to the container that holds all of the producers
	// Pass in the browser event and our data object to the event listener
	producerContainer.addEventListener('click', event => {
		buyButtonClick(event, data);
	});

	// Call the tick function passing in the data object once per second
	setInterval(() => tick(data), 1000);
}

// Meanwhile, if we aren't in a browser and are instead in node
// we'll need to exports the code written here so we can import and
// Don't worry if it's not clear exactly what's going on here;
// We just need this to run the tests in Mocha.
else if (process) {
	module.exports = {
		updateCodeView,
		clickDesktop,
		unlockProducers,
		getUnlockedProducers,
		makeDisplayNameFromId,
		makeProducerDiv,
		deleteAllChildNodes,
		renderProducers,
		updateCPSView,
		getProducerById,
		canAffordProducer,
		updatePrice,
		attemptToBuyProducer,
		buyButtonClick,
		tick,
	};
}
