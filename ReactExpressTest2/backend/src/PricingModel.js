/* PG7 main pricing model class START */
export default class PricingModel {

    constructor(){
	let defaultPrices = {
	    rental: {
		autos: {
		    small: 50,
		    medium: 75,
		    large: 100
		},
		ironing: 50,
		shoemaking: 50,
		tailoring: 50,
		laundry: 50
	    }
	};
	// define pricing list getter
	this.getPriceList = ( service ) => {
	    const foundService = service && service.toLowerCase() ? defaultPrices[ service.toLowerCase() ] : null,
		  servicePrice = service ? foundService : null,
		  priceList = service && servicePrice ? servicePrice : defaultPrices;
	    return priceList;
	};
	// define pricing list setter
	this.setPriceList = ( newPriceList ) => {
	    defaultPrices = newPriceList;
	};
    }

    // get price from metas array
    getPriceFromMetasArray = ( metasArr, priceOnly ) => {
	const metasLength = metasArr.length;
	let price;
	for ( let metasCount = 0; metasCount < metasLength; metasCount++ ){
	    const thisMeta = metasArr[ metasCount ];
	    if ( thisMeta.price ){ // if price meta
		if ( priceOnly ){ // if only final price is requested ( priceOnly ), return base or negotiated price
		    price = thisMeta.price.negotiated && thisMeta.price.negotiated != false ? thisMeta.price.negotiated : price = thisMeta.price.base; // return negotiated price if available
		}
		else { // no final price ( priceOnly ) requested, return price object
		    price = thisMeta.price;
		}
		metasCount = metasLength; // end counter
	    }
	}
	return price;
    }

    // update price from metas array
    updatePriceFromMetasArray( metasArr, newPrice ){
	/*
	   metasArr = meta objects array
	   newPrice = {
	     base: base price int
	     negotiated: negotiated price int
	   }
	 */
	if ( ! metasArr || ! newPrice ){
	    console.log( '\nWrong parameters passed to \'updatePriceFromMetasArray\'!\nPassed metas array:\n', metasArr, '\nPassed new price object:\n', newPrice );
	    return null;
	}
	else {
	    const metasLength = metasArr.length;
	    let newMetasArr = metasArr;
	    for ( let metasCount = 0; metasCount < metasLength; metasCount++ ){
		const thisMeta = newMetasArr[ metasCount ];
		if ( thisMeta.price ){
		    newMetasArr[ metasCount ].price = newPrice;
		    metasCount = metasLength; // end counter
		}
	    }
	    return newMetasArr;
	}
    }

}
/* PG7 main pricing model class END */
