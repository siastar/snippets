// language default object START
const languageObj = {
    // login
    login: {
	en: {
	    userName: 'Username',
	    password: 'Password'
	},
	it: {
	    userName: 'Utente',
	    password: 'Password'
	}
    },
    // menu
    menu: {
	en: {
	    pageTitle: 'Menu Settings',
	    title: 'Title',
	    url: 'URL',
	    icon: 'Icon'
	},
	it: {
	    pageTitle: 'Impostazioni Menu',
	    title: 'Titolo',
	    url: 'URL',
	    icon: 'Icona'
	}
    },
    // services
    services: {
	en: {
	    pageTitle: 'Services',
	    category: 'Category',
	    provider: 'Provider',
	    url: 'URL'
	},
	it: {
	    pageTitle: 'Servizi',
	    category: 'Categoria',
	    provider: 'Fornitore',
	    url: 'URL'
	}
    },
    // services categories
    servicesCategories: {
	en: {
	    pageTitle: 'Services Categories',
	    category: 'Category'
	},
	it: {
	    pageTitle: 'Services Categories',
	    category: 'Categorie Servizi'
	}
    },
    // services requests
    servicesRequests: {
	en: {
	    pageTitle: 'Services Requests',
	    serviceName: 'Service Name',
	    userName: 'Username',
	    option: 'Option',
	    status: 'Status',
	    pickUpDate: 'Pick-up Date',
	    returnDate: 'Return Date',
	    updatedDate: 'Updated Date'
	},
	it: {
	    pageTitle: 'Richieste Servizi',
	    serviceName: 'Nome Servizio',
	    userName: 'Utente',
	    option: 'Opzione',
	    status: 'Stato',
	    pickUpDate: 'Data Ritiro',
	    returnDate: 'Data Riconsegna',
	    updatedDate: 'Data Aggiornamento'
	}
    },
    // maintenance
    maintenance: {
	en: {
	    pageTitle: 'Maintenance Services',
	    type: [
		'Electricity',
		'Heating',
		'Plumbing',
		'Masonery',
		'Furniture'
	    ]
	},
	it: {
	    pageTitle: 'Servizi Manutenzione',
	    type: [
		'Elettricitá',
		'Riscaldamento',
		'Idraulica',
		'Muratura',
		'Arredamento'
	    ]
	}
    }
};
// language default object END

// language switcher class
export default class PG7Translator {

    constructor( translationOptions ){

	if ( this.paramsCheck( translationOptions ) ){ // check passed parameters
	    this.selectedLang = translationOptions.lang;
	    return translationOptions.section ? this.getTranslated( translationOptions.section ) : this.getTranslated();
	}
	return null;
    }

    paramsCheck( params ){
	let passedCheck = true;
	if ( ! params || ! params.lang ){
	    passedCheck = false;
	}
	if ( ! params ){
	    console.log( '\nNo translation parameters passed!\n' );
	}
	if ( ! params.lang ){
	    console.log( '\nNo selected translation language!\n' );
	}
	return passedCheck;
    }
    
    getTranslated( requestedSection ){
	if ( requestedSection ){ // if specific section is required
	    const requestedTranslation = languageObj[ requestedSection ][ this.selectedLang ];
	    if ( requestedTranslation ){
		console.log( '\nTranslated section:\n', requestedTranslation );
		return requestedTranslation;
	    }
	}
	// if no specific section is required, return all translations
	if ( ! this.translated ){ // if no translation has been built yet
	    this.buildTranslation();
	}
	console.log( '\nTranslated section:\n', this.translated );
	return this.translated;
    }
    
    buildTranslation(){
	let translLang = this.selectedLang,
	    translation = {};
	for ( const translProp in languageObj ){
	    translation[ translProp ] = languageObj[ translProp ][ translLang ];
	}
	this.translated = translation; // assign translated object
    }
    
}
