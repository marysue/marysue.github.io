
function getUrl(symbol){
    return `https://api.iextrading.com/1.0/stock/${symbol}/quote?filter=symbol,companyName,open,close,high,low,change,changePercent`;
//	return 'https://ghibliapi.herokuapp.com/films';
}

//INQD
//HVGDF
//CNHI
//HROF
//ETFMG
//MJX

function getContainer() {
	container = document.getElementById('container');
	
	if (container) {
		return container;
	} else {
		const app = document.getElementById('root');
		const newContainer = document.createElement('div');
		newContainer.setAttribute('id', 'container');
		newContainer.setAttribute('class', 'container');
		
		app.appendChild(newContainer);
		return newContainer;
	}
}

function displayData(data){
	if (!document.getElementById(data.symbol)) {  
		container = getContainer();	
		const card = document.createElement('div');
		card.setAttribute('class', 'card');
		container.appendChild(card);
		
		const cardLeft = document.createElement('div');
		cardLeft.setAttribute("class", "cardLeft");
		card.appendChild(cardLeft);
		
		const companySection = document.createElement('div');
		cardLeft.appendChild(createCompanySection(companySection, data));
		
		const indexSection = document.createElement('div');
		cardLeft.appendChild(createIndexSection(indexSection,data));
		//remove symbol from company section, then createSymbolSection here //
		
		const percentChgSection = document.createElement('div');
		cardLeft.appendChild(createPercentChgSection(percentChgSection, data));
		
		const priceSection = document.createElement('div');	
		cardLeft.appendChild(createPriceSection(priceSection, data));
		//remove priceChange from priceSection, then createPriceChangeSection here//
			
		card.appendChild(createArrowSection(data));
		card.appendChild(createGraphSection(data));
	} else {
		alert("Symbol already entered.  Choose another.");
	}
}
function createCompanySection(companySection, data){
	/**************************************************/
	/*                  COMPANY SECTION               */
	/**************************************************/
	const coName = document.createElement('p');
	var cn = data.companyName
	if (data.companyName.length > 20) {
		cn = cn.substring(0,17);
		cn += "...";
	}
	coName.textContent = cn;
	coName.style.fontWeight = "bold";

	companySection.setAttribute('class', 'company');
	companySection.appendChild(coName);
	
	return companySection;
}

function createIndexSection(indexSection, data) {
	/*********************************************************/
	/*                INDEX SECTION                          */
	/*********************************************************/
	indexSection.setAttribute('class', 'symbol');
	indexSection.setAttribute('id', data.symbol);

	const sym = document.createElement('p');
	sym.textContent = data.symbol;
	indexSection.appendChild(sym); 
	return indexSection;
}
function createPriceSection(priceSection, data){
	/*********************************************************/
	/*                        PRICE SECTION                  */
	/*********************************************************/

	
	const p3 = document.createElement('p');
	p3.textContent = "$" + parseFloat(data.close).toFixed(2);

	/* priceSection.appendChild(arrImg); */

	priceSection.appendChild(p3);
	priceSection.setAttribute('class', 'price');
	
	return priceSection;
}

function createPercentChgSection(percentChgSection, data)
{

	percentChgSection.setAttribute('class', 'percentChg');

	const p2 = document.createElement('p');

	var faClassName = "";
	var p2Style = "";
	var p2Text = "";
	
	if (data.change < 0) {
		p2.style = "color: red;";
		faClassName = "fas fa-caret-down";
	} else {
		p2.style = "color: green;";
		faClassName = "fas fa-caret-up";
	}
	console.log("Data Change:  " + data.change);
	
	p2Text =  data.change + "(" + data.changePercent + ")";
	p2.innerHTML = `<i class="${faClassName}"> <\/i> ${p2Text}`;
	percentChgSection.appendChild(p2);
	
	return percentChgSection;
	
}
function createArrowSection(data){
	/*********************************************************/
	/*                    ARROW SECTION                      */
	/*********************************************************/
	const arrowSection = document.createElement('div');
	arrowSection.setAttribute('class', 'arrow');
	var img1 = document.createElement("img");
	img1.setAttribute("src", "images/arrow.png");
	img1.setAttribute("class", "arrowImg");


	// height is 117px;
	// top is 5 px = currentPrice == High
	// bottom is 117px = Low.  
	

	//If the lowest stock price is 0, and the highest stock price is 5
	//then the graph length would be 5 units.  We calculate that here:
	var graphLength = parseFloat(data.high - data.low).toFixed(2);
	// If our graph length is 5 units, where does the current stock price 
	// fit on this scale?  Say the stock is at 1.  5-1 = 4.  So we are 4 units
	// away from the high price on a scale of 0 - 5.
	var priceVariation = parseFloat(data.high - data.close).toFixed(2);
	// We need to calculate our pixels now.  Translate our priceVariation into
	// the relative position based on percent.  priceVariation/graphLength
	// so our price variation was 4 units from the high price.   
    //4/5 = 80%.  So we are 80% down from the top pixel.
	var posRel = parseFloat(priceVariation/graphLength).toFixed(2);
	//What percent does this translate to in pixels?
	//If top = 0px and bottom is 105px, then range = 105-0 = 105pxs;
	//80% of 105px = 84pxs down from the top.
	var posInPxs = parseFloat(posRel * 105).toFixed(0);
	/* bottom:  var posInPxs=105; */
	/* var posInPxs=0;*/
	//This is the number of pixels on the graph line
	img1.setAttribute("style", `margin-top: ${posInPxs}px;`);
	console.log("position (in pxs):  "  + posInPxs);

	console.log(`Open:  ${data.open}, Close: ${data.close}, High: ${data.high}, Low: ${data.low}`);
	console.log(`Change: ${data.change}, Change Percent: ${data.changePercent}`);
	
	
	
	arrowSection.appendChild(img1);
	return arrowSection;
}
function createGraphSection(data) {
	/**********************************************************/
	/*                    GRAPH SECTION                       */
	/**********************************************************/
	const graphSection = document.createElement('div');
	graphSection.setAttribute('class', 'graph');
	graphSection.style.fontSize = ".75rem";
	
	const p4 = document.createTextNode("$" + parseFloat(data.high).toFixed(2));
	//p4.style.fontSize = ".75rem"
	
	const p5 = document.createTextNode("$" + parseFloat(data.low).toFixed(2));
	// p5.style.fontSize = ".75rem";

	graphSection.appendChild(p4);
	graphSection.appendChild(document.createElement("br"));
	graphSection.appendChild(document.createElement("br"));
	graphSection.appendChild(document.createElement("br"));
	graphSection.appendChild(document.createElement("br"));
	graphSection.appendChild(document.createElement("br"));
	graphSection.appendChild(p5); 
	
	return graphSection;
}

function displayFooData(data){
	displayManualData();
return;
	 // var data = JSON.parse(this.response);
	const app = document.getElementById('root');

	const logo = document.createElement('img');
	logo.src = 'images/logo.png';
  

	const container = document.createElement('div');
	container.setAttribute('id', 'container');
	container.setAttribute('class', 'container');

	app.appendChild(logo);
	app.appendChild(container);
	var i = 0;
	data.forEach(movie => {
		i++;
      const card = document.createElement('div');
      card.setAttribute('class', 'card');

      const h1 = document.createElement('h1');
      h1.textContent = movie.title;

      const p = document.createElement('p');
      movie.description = movie.description.substring(0, 300);
      p.textContent = `${movie.description}...`;

      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(p);
	  
	  console.log(`Title: ${movie.title}`);
	  console.log(`Description: ${movie.description}`); 
	  
    });
}

function displayError(err){
    //Handle error condition here.
    console.log(`Error ${JSON.stringify(err, null, 3)}`);
}

$(document).ready(function() {
	$('#btn').click(function() {
		const symbol = document.getElementById('inputSymbol').value;

			$.ajax({
							url: getUrl(symbol),
							type: "GET",
							success: displayData,		
							error: displayError
			});
		
		
		document.getElementById('inputSymbol').value = "";	
	});

});




//svg for vertical bar - image format type
//know how long your line is = that's your 100%
//calc how far the close value is from your high and low
//css is just the position of the arrow



