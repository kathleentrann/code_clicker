/* eslint-disable no-alert */

// Make your References to the two DOM nodes
// Create a reference to the element who's ID is 'coding_station and call it codingStation
// Write Code Under This //

// Create a reference to the element who's ID is 'producer_container' and call it producerContainer
// Write Code Under This //

/**************
 *   SLICE 1
 ************* */

/**
 * Updates the code view with the given code quantity.
 * @param {number} codeQty - The code quantity to display.
 */

function updateCodeView(codeQty) {
	// Create a reference to the element who's ID is 'code_counter'
	// Set the innerText of that element to be the codeQty passed into this function
}

/**
 * Handles the click event on the codingStation element.
 * Increments the code property of the data object by one.
 * Calls the updateCodeView and renderProducers functions with the updated data.
 * @param {Object} data - The game data object.
 */

function clickDesktop(data) {
	// Increment the data object's (passed into this function) code property by one
	// call the updateCodeView function and pass it the newly updated data.code property
	// call the renderProducers function and pass it the data object
}

/**************
 *   SLICE 2
 ************* */

/**
 * Unlocks producers based on the codeCount.
 * @param {Array} producers - The array of producers to unlock.
 * @param {number} codeCount - The current code count.
 */


function unlockProducers(producers, codeCount) {
	// loop through the producers array passed into the function
	// If the codeCount (passed in) is greater than or equal to half the producer's price,
	// reassign the producer's unlocked property to true
}

/**
 * Gets the unlocked producers from the data object.
 * @param {Object} data - The game data object.
 * @returns {Array} - An array of unlocked producers.
 */

function getUnlockedProducers(data) {
	// Use the Array.prototype.filter() method
	// Filter through the data.producers property and return an array with only the producers whose
	// unlocked property is true
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


/**
 * Renders the producers on the screen.
 * Calls the unlockProducers function with data.producers and data.code to determine the unlocked producers.
 * Retrieves a reference to the DOM element with the ID 'producer_container'.
 * Calls the deleteAllChildNodes function with the producerContainer element to clear its child nodes.
 * For each unlocked producer, creates an HTML div element using makeProducerDiv and appends it to the producerContainer element.
 * @param {Object} data - The game data object.
 */

function renderProducers(data) {
  // Call the unlockProducers function and pass it data.producers and data.code
  // Retrieve a reference to the DOM element with the ID 'producer_container'
  // Call the deleteAllChildNodes function and pass it the producerContainer element

  // you do not need to edit the following code, but for understanding,
  // Iterate over the unlocked producers and create HTML div elements for each
  getUnlockedProducers(data).forEach(producer => {
    producerContainer.appendChild(makeProducerDiv(producer));
  });
}

/**************
 *   SLICE 3
 ************* */
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

/**
 * Updates the game state in each tick.
 * Increments the data object's code property by the data.totalCPS amount.
 * Calls the updateCodeView function with the data.code property.
 * Calls the renderProducers function with the newly updated data object.
 * @param {Object} data - The game data object.
 */

function tick(data) {
 // Increment the data object's code property by the data.totalCPS amount
 // Call the updateCodeView function and pass it the data.code property
 // Call the renderProducers function and pass it the newly updated data object

}

/*************************
 *  Start your engines!
 ************************ */

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
	 ************* */

  /**
 * Handles the click event on the codingStation element.
 * Calls the clickDesktop function with the global data object.
 * @param {Event} event - The click event object.
 */
	// Write Code Under This //


/**
 * Handles the click event on the container that holds producers (that you referenced above).
 * Calls the buyButtonClick function with the event object and the global data object.
 * @param {Event} event - The click event object.
 */
// Write Code Under This //


	// You do not need to edit this last line.
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
