/* PG7 WorkFlow notifier START */
export function PG7Notifier( notificationArgs ) {

    // main notifier init
    this.init = ( notificationArgs ) => {
	/*
	 notificationArgs = {
	 service: service code string
	 commElements: step object
	 status: status step
	 statusCode: complete status code string
	 meta: communication meta object
	 }
	 */
	if ( notificationArgs ){
	    this.email = this.getEmail( notificationArgs ); // set email communication
	    this.sms = this.getSMS( notificationArgs );
	    this.pushNotification = this.getPush( notificationArgs );
	    console.log( '\nNotification arguments:\n', notificationArgs );
	}
    };

    // request details API URL getter - TO FINISH! - hook to dynamic URL
    this.getRequestDetailsURL = () => {
	const domain = 'http://ec2-54-93-236-63.eu-central-1.compute.amazonaws.com',// 'localhost:5000'
	      requestDetailsURL = '/servicerequestdetails';
	return `${ domain }${ requestDetailsURL }`;
    };

    // get email communication
    this.getEmail = ( emailArgs ) => {
	const newEmailArgs =  this.getEmailHeader( { serviceRequest: emailArgs.service, rentalType: emailArgs.meta.rentalType, meta: emailArgs.meta } );
	const emailActions = this.getActionButtons( { type: 'email', status: emailArgs.statusCode } );
	const documentENStart = "<!doctype html><html lang='en'>",
	      documentITStart = "<!doctype html><html lang='it'>",
	      htmlStyle = 'html {padding: 10px;}',
	      bodyStyle = 'body {font-family: \'Arial\';border: 1px solid;padding: 20px;color: #4a4d4f;}',
	      headerStyle = 'header {text-align: center;}header svg {padding: 0 26px;}header h1 {display: inline-block;font-size: 3em;margin-bottom: 0;}header h3 {border-top: 1px solid;padding: 26px 0 0 28px;font-size: 2em;margin: 0 auto;width: 78%;}header .brand-icon {display: inline-block;}',
	      articleStyle = 'article {width: 78%;margin: 32px auto;}article p span {font-weight: bold;}',
	      sectionStyle = 'section {text-align: center;margin: 56px auto auto auto;width: 78%;border-top: 1px solid;padding-top: 20px;}section .action-button {color: #fff;background-color: cornflowerblue;margin: 0 12px;padding: 10px 38px;vertical-align: middle;font-size: 1.2em;box-shadow: 0 0 2px 0 #333;text-decoration: none;border: none;}section .action-button.action-button-decline {background-color: #e91c1c}section .action-button:hover {background-color: #fff;color: #333;}',
	      mobileStyle = '@media screen and (max-width: 720px){ html {padding: 0;}body {border: none;}header h3 {width: 96%;padding: 26px 0 0 0px;}article {width: 96%;}section {width: 96%;}section .action-button {margin: 0 4px;padding: 6px 8px;font-size: 1em;} }',
	      styleStart =`<head><style>${ htmlStyle + bodyStyle + headerStyle + articleStyle + sectionStyle + mobileStyle }`,
	      styleEnd = '</style></head>',
	      bodyStart = '<body>',
	      bodyEnd = '</body>',
	      documentEnd = '</html>';
	newEmailArgs.computed = {
	    en: documentENStart + styleStart + styleEnd + bodyStart + this.wrapEl( { tag: 'header', content: newEmailArgs.en.logo + newEmailArgs.en.top + this.wrapEl( { tag: 'h3', content: newEmailArgs.en.title } ) } ) + newEmailArgs.en.fields + emailActions.en + bodyEnd + documentEnd,
	    it: documentITStart + styleStart + styleEnd + bodyStart + this.wrapEl( { tag: 'header', content: newEmailArgs.it.logo + newEmailArgs.it.top + this.wrapEl( { tag: 'h3', content: newEmailArgs.it.title } ) } ) + newEmailArgs.it.fields + emailActions.it + bodyEnd + documentEnd
	};
	return newEmailArgs;
    };

    // get sms communication
    this.getSMS = ( smsArgs ) => {
	return 'SMS test';
    };

    // get push communication
    this.getPush = ( pushArgs ) => {
	return 'Push notification test';
    };

    // get communication
    this.getCommunication = () => {
	return {
	    email: this.email,
	    sms: this.sms,
	    pushNotification: this.pushNotification
	};
    };

    // get email header
    this.getEmailHeader = ( headerArgs ) => {
	/*
	 headerArgs = {
	 serviceRequest: service request code string
	 serviceType: service category string
	 rentalType: rental category string // for rentals ONLY
	 meta: all request metas object
	 }
	 */
	const rentalType = headerArgs.rentalType;
	let mainLogo = "<svg class='brand-icon' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMidYMid' width='30' height='33' viewBox='0 0 30 33'><g fill='none' fill-rule='evenodd'><path class='logo-fill-blue' fill='#7DBCFF' d='M0 4v25l8 4V0zM22 4v25l8 4V0z'></path><path class='logo-fill-white' fill='#FFF' d='M11 4v25l8 4V0z'></path></g></svg>",
	    mainTop = '<h1>PG7 ESTH</h1>',
	    emailHeader = {
		en: {},
		it: {}
	    };
	for ( let lang in emailHeader  ){
	    // set logo and top liner
	    emailHeader[ lang ].logo = mainLogo;
	    emailHeader[ lang ].top = mainTop;
	    let requestContent;
	    // if rental request
	    if ( rentalType && headerArgs.serviceRequest.trim().toUpperCase() === 'RESE' ){
		if ( rentalType.trim().toLowerCase() === 'autos' ){ // if vehicle rental
		    requestContent = this.printFields( { type: 'rentalRequest', isAutos: true, lang: lang, meta: headerArgs.meta } );
		    if ( lang == 'en' ){
			emailHeader[ lang ].title = 'Veichle rental request';
		    }
		    else {
			emailHeader[ lang ].title = 'Richiesta di veicolo a noleggio';
		    }
		}
		else { // not an vehicle rental request
		    requestContent = this.printFields( { type: 'rentalRequest', isAutos: false, lang: lang, meta: headerArgs.meta } );
		    if ( lang == 'en' ){
			emailHeader[ lang ].title = 'Service request';
		    }
		    else {
			emailHeader[ lang ].title = 'Richiesta di servizio';
			//emailHeader[ lang ].fields = '<div>IT FIELDS TEST</div>';
		    }
		}
	    }
	    // if a side service request
	    else if ( headerArgs.serviceRequest === 'SISE' ) {
		requestContent = this.printFields( { type: 'sideService', isAutos: false, lang: lang, meta: headerArgs.meta } );
		if ( lang == 'en' ){
		    emailHeader[ lang ].title = 'Side service request';
		}
		else {
		    emailHeader[ lang ].title = 'Richiesta di servizio aggiuntivo';
		}
	    }
	    // if maintenance request
	    else {
		requestContent = this.printFields( { type: 'maintenanceRequest', isAutos: false, lang: lang, meta: headerArgs.meta } );
		if ( lang == 'en' ){
		    emailHeader[ lang ].title = 'Maintenance request';
		}
		else {
		    emailHeader[ lang ].title = 'Richiesta di manutenzione';
		}
	    }
	    // define localized content
	    emailHeader[ lang ].fields = this.wrapEl( { tag: 'article', content: requestContent } );
	}
	return emailHeader;
    };

    // return communication action buttons
    this.getActionButtons = ( actionsArgs ) => {
	/*
	 {
	 type: communication mode string - 'email' || 'sms' || 'push'
	 status: complete status code string
	 }
	 */
	const langs = [ 'en', 'it' ];
	let actionsButtons = {
	    en: '',
	    it: ''
	};
	langs.forEach( ( lang ) => {
	    for ( let thisButton in this.languageObj.actionButtons[ lang ] ){ // for each defined action button ( confirm, reject, modify )
		// define action URL
		let actionHref = `${ this.getRequestDetailsURL() }?reqstatus=${ actionsArgs.status }`;
		actionsButtons[ lang ] += this.wrapEl( { tag: 'a', attrs: { href: actionHref, class: `action-button action-button-${ thisButton.toLowerCase() }` }, content: this.languageObj.actionButtons[ lang ][ thisButton ] } ); // TO FINISH! - hook other request parameters
	    }
	    actionsButtons[ lang ] = this.wrapEl( { tag: 'section', content: actionsButtons[ lang ] } );
	} );
	return actionsButtons;
    };
    
    // print fields html
    this.printFields = ( fieldsArgs ) => {
	/*
	 fieldsArgs = {
	 type: service type string - 'rentalRequest' || 'sideService' || 'maintenanceRequest'
	 isAutos: is autos rental bool
	 lang: language code
	 meta: all metas object
	 }
	 */
	const wrapField = this.wrapField;
	let commFields,
	    fieldsOutput = '';
	switch ( fieldsArgs.type ){
	case 'rentalRequest':
	    if ( fieldsArgs.isAutos == true ){ // if autos rental
		commFields = [ 'size', 'pickUpPlace', 'pickUpDate', 'returnPlace', 'returnDate', 'price'  ];
	    }
	    else { // if other rentals
		commFields = [ 'itemsAmount', 'pickUpDate', 'returnDate', 'price'  ];
	    }
	    break;
	case 'sideService':
	    // TO FINISH! - hook up side services fields
	    break;
	case 'maintenanceRequest':
	    // TO FINISH! - hook up maintenance fields
	    break;
	}
	if ( ! commFields ){ // if type switch did not recognize the type argument
	    console.log( '\nERROR! Wrong fields type parameter passed to PG7 Notifier \'printFields\' method!\nFields arguments:\n', fieldsArgs );
	}
	else {
	    
	    commFields.forEach( ( thisField ) => { // for each defined field
		console.log( '\nThis PG7 Notifier field:\n', thisField );
		if ( thisField === 'price' ){ // if price field
		    const finalPrice = fieldsArgs.meta[ thisField ].negotiated ? fieldsArgs.meta[ thisField ].negotiated : fieldsArgs.meta[ thisField ].base;
		    fieldsOutput += wrapField( { lang: fieldsArgs.lang, content: `${ finalPrice } Euros`, name: thisField } );
		}
		else {
		    fieldsOutput += wrapField( { lang: fieldsArgs.lang, content: fieldsArgs.meta[ thisField ], name: thisField } );
		}
	    } );
	}
	return fieldsOutput;
    };

    // wrap single field
    this.wrapField = ( fieldData ) => {
	/*
	 fieldData = {
	 lang: language code string
	 content: field data object
	 name: field name string
	 }
	 */
	const fieldName = this.languageObj.servicesDetails[ fieldData.lang ][ fieldData.name ],
	      fieldContent = fieldData.content;
	return this.wrapEl( { tag: 'p', content: `${ fieldName }: ${ this.wrapEl( { tag: 'span', content: fieldContent } ) }` } );
    };
    
    // wrap html elements
    this.wrapEl = ( elArgs ) => {
	/*
	 elArgs = {
	 tag: html tag string
	 attrs: html element attributes object - example: { src: 'http://test.net' } 
	 content: html tag content string
	 }
	 */
	const tag = elArgs.tag,
	      requestedAttrs = elArgs.attrs,
	      content = elArgs.content != '' ? elArgs.content : null;
	let allAttrs = '';
	if ( requestedAttrs ){ // define tag attributes
	    for ( let attr in requestedAttrs ){
		allAttrs += attr == 'href' || attr == 'class'  ? ` ${ attr }='${ requestedAttrs[ attr ] }'` : ` ${ attr }="${ requestedAttrs[ attr ] }"`;
	    }
	}
	const autoClosing = tag === 'img' || tag === 'input' ? 'self' : 'normal', // self closing tags
	      tagClosing = autoClosing === 'self' ? '' : '>',
	      elClosing = autoClosing === 'self' ? ( () => { return tag === 'input' ? '>' : ' />'; } )() : `</${ elArgs.tag }>`,
	      newTag = content ? `<${ tag }${ allAttrs }${ tagClosing }${ content }${ elClosing }` : `<${ tag }${ allAttrs }${ tagClosing }${ elClosing }`;
	return newTag;
    };

    // language default object START
    this.languageObj = {
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
	// services details
	servicesDetails: {
	    en: {
		// categories
		Autos: 'Veichle rental',
		Ironing: 'Ironing service',
		Shoemaking: 'Shoemaking service',
		Tailoring: 'Tailoring service',
		Laundry: 'Laundry service',
		// properties
		Size: 'Size',
		PostoRiconsegna: 'Return location',
		PostoRitiro: 'Pick-up location',
		DataOraRiconsegna: 'Return date-time',
		DataOraRitiro: 'Pick-up date-time',
		NumeroCapi: 'Clothing items amount',
		// notifier fields
		size: 'Size',
		pickUpDate: 'Pick-up Date',
		returnDate: 'Return Date',
		pickUpPlace: 'Pick-up location',
		returnPlace: 'Return location',
		updatedDate: 'Updated Date',
		itemsAmount: 'Clothing items amount',
		price: 'Price'
	    },
	    it: {
		// categories
		Autos: 'Noleggio di veicoli',
		Ironing: 'Servizio di stiratura',
		Shoemaking: 'Servizio di calzoleria',
		Tailoring: 'Servizio di sartoria',
		Laundry: 'Servizio di lavanderia',
		// properties
		Size: 'Dimensioni',
		PostoRiconsegna: 'Luogo di riconsegna',
		PostoRitiro: 'Luogo di ritiro',
		DataOraRiconsegna: 'Data-ora di riconsegna',
		DataOraRitiro: 'Data-ora di ritiro',
		NumeroCapi: 'Numero capi',
		// notifier fields
		size: 'Dimensioni',
		pickUpDate: 'Data Ritiro',
		returnDate: 'Data Riconsegna',
		pickUpPlace: 'Luogo di ritiro',
		returnPlace: 'Luogo di riconsegna',
		updatedDate: 'Data Aggiornamento',
		itemsAmount: 'Numero capi',
		price: 'Prezzo'
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
		updatedDate: 'Updated Date',
		price: 'Price'
	    },
	    it: {
		pageTitle: 'Richieste Servizi',
		serviceName: 'Nome Servizio',
		userName: 'Utente',
		option: 'Opzione',
		status: 'Stato',
		pickUpDate: 'Data Ritiro',
		returnDate: 'Data Riconsegna',
		updatedDate: 'Data Aggiornamento',
		price: 'Prezzo'
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
	},
	// workflow action buttons
	actionButtons: {
	    en: {
		confirm: 'Confirm',
		modify:'Modify',
		decline: 'Decline'
	    },
	    it: {
		confirm: 'Conferma',
		modify:'Modifica',
		decline: 'Rifiuta'
	    }
	}
    };

    // run init on object instantiation
    this.init( notificationArgs );

}
/* PG7 WorkFlow notifier END */
