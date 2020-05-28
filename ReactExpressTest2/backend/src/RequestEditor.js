/* PG7 Request editor class */
export function RequestEditor( requestArgs ) {

    this.init = ( requestArgs ) => {
	/*
	 requestArgs = {
	   mode: request editor mode string ( 'identify' || 'setup' )
	   requestUser: requested user id
	   requestStatusCode: complete request status code string
	   status: status object ( for 'setup' mode ONLY )
	   requestData: all services object ( for 'identify' mode ONLY )
	   activeRequest: active request object ( for 'setup' mode ONLY )
	 }
	 */
	console.log( '\n\nReached request editor.\nRequest arguments:\n', requestArgs );
	let activeUser = requestArgs.requestUser,
	    workflowURL = 'localhost:5000/workflow',
	    activeRequest,
	    activeStatus,
	    activeStatusCode;
	switch ( requestArgs.mode ){
	case 'identify':
	    // set active request
	    activeRequest = this.identifyRequest( requestArgs );
	    break;
	case 'setup':
	    // set active request
	    activeRequest = requestArgs.activeRequest;
	    // set active status
	    activeStatus = requestArgs.status;
	    // set active status code
	    activeStatusCode = requestArgs.requestStatusCode;
	    // define active status getter
	    this.getActiveStatus = () => {
		return activeStatus;
	    };
	    // define active status code getter
	    this.getActiveStatusCode = () => {
		return activeStatusCode;
	    };
	    break;
	}
	// define active user getter
	this.getActiveUser = () => {
	    return activeUser;
	};
	// define active request getter
	this.getActiveRequest = () => {
	    return activeRequest;
	};
	// define workflow URL getter
	this.getWorkflowURL = () => {
	    return workflowURL;
	};
    };

    // get active request ( for 'create' mode ONLY )
    this.identifyRequest = ( request ) => {
	let identifiedRequest = this.checkServiceRequest( request ); // look into services requests
	if ( ! identifiedRequest ){ // if request is not found in services, look into maintenance
	    identifiedRequest = this.checkMaintenanceRequest( request );
	}


	this.checkMaintenanceRequest( request ); // TEST!!! - logs maintenance

	
	console.log( '\n\nIdentified request:\n', identifiedRequest, '\n' );
	return identifiedRequest;
    };

    // check request in services ( this.identifyRequest helper function )
    this.checkServiceRequest = ( serviceRequests ) => {
	let identifiedServiceRequest;
	serviceRequests.requestData.serviceRequests.forEach( ( thisRequestsCategory, requestCategoryIndex ) => {
	    // for each service category
	    thisRequestsCategory.forEach( ( serviceCategory ) => {
		// for each property in service category
		for ( let theseRequests in serviceCategory ){
		    if ( theseRequests != '_id' ){ // if not _id field
			serviceCategory[ theseRequests ].forEach( ( thisRequest ) => { // check requests in this service category
			    if ( thisRequest.Status && thisRequest.Status === serviceRequests.requestStatusCode ){ // matched status, request identified
				identifiedServiceRequest = thisRequest; // define active request
				identifiedServiceRequest.serviceCategory = theseRequests; // add this service request category
			    }
			} );
		    }
		}
	    } );
	} );
	return identifiedServiceRequest;	
    };

    // check request in maintenance ( this.identifyRequest helper function )
    this.checkMaintenanceRequest = ( maintenanceRequests ) => {
	let identifiedMaintenanceRequest;
	maintenanceRequests.requestData.maintenanceRequests.forEach( ( thisRequestsCategory, requestCategoryIndex ) => {
	    console.log( '\n\nThis maintenance category:', thisRequestsCategory, '\nCategory info:', thisRequestsCategory.cat_lang[ 0 ] );
	    // for each maintenance request
	    thisRequestsCategory.Requests.forEach( ( thisRequest ) => {
		if ( thisRequest.Status && thisRequest.Status === maintenanceRequests.requestStatusCode ){ // identified maintenance request
		    identifiedMaintenanceRequest = thisRequest;
		    identifiedMaintenanceRequest.serviceCategory = thisRequestsCategory.cat_lang[ 0 ]; // add this service request category
		}
	    } );
	} );
	return identifiedMaintenanceRequest;
    };

    // launch request editor page - ( for 'setup' mode ONLY )
    this.launchEditorPage = () => {
	const activeRequest = this.getActiveRequest(),
	      activeStatus = this.getActiveStatus(),
	      activeStatusCode = this.getActiveStatusCode(),
	      serviceType = activeStatus.service.code.toUpperCase() === 'RESE' ? 'services' : 'maintenance',
	      lang = activeRequest.userinfo.Language.replace( ' ', '' ).toLowerCase(),
	      elsParams = { lang: lang, serviceType: serviceType, activeStatus: activeStatus, activeStatusCode: activeStatusCode, activeRequest: activeRequest },
	      head = this.getHead( elsParams ),
	      body = this.getBody( elsParams );
	// wrap final document
	return this.wrapDoc( {
	    head: head,
	    body: body,
	    lang: lang
	} );
    };

    // get page head
    this.getHead = ( headArgs ) => {
	/*
	 headArgs = {
	   serviceType: service type string - 'services' || 'maintenance'	  activeStatus: active status object
	   activeStatus: active status object
	   activeStatusCode: complete request status code string
	   activeRequest: active request object
	   lang: lower cased language string
	 }
	 */
	const translatedEls = this.languageObj[ headArgs.serviceType ][ headArgs.lang ],
	      styleString = 'html{box-sizing: border-box}html *{box-sizing: inherit}button.action-button{ color: #fff; background-color: cornflowerblue; margin: 4px 4px 4px 0; padding: 6px 8px; vertical-align: middle; border-radius: 2px; box-shadow: 0 0 2px 0 #333; text-decoration: none; border: none;}',
	      style = this.wrapEl( { tag: 'style', content: styleString } ),
	      title = this.wrapEl( { tag: 'title', content: `PG7 ESTH - ${ translatedEls.pageTitle }` } );
	console.log( '\n\nReached head:\n', style + title );
	return style + title;
    };

    // get page body
    this.getBody = ( bodyArgs ) => {
	/*
	bodyArgs = {
	  serviceType: service type string - 'services' || 'maintenance'
	  activeStatus: active status object
	  activeStatusCode: complete request status code string
	  activeRequest: active request object
	  lang: lower cased language string
	}
	 */
	bodyArgs.serviceType = bodyArgs.serviceType === 'services' ? 'servicesRequests' : 'maintenance'; // identify translated service fields
	bodyArgs.translatedEls = this.languageObj[ bodyArgs.serviceType ][ bodyArgs.lang ]; // add translated elements object
	//bodyArgs.activeRequest = this.getActiveRequest(); // add active request object
	//bodyArgs.activeStatus = this.getActiveStatus(); // add active status object
	const description = this.getRequestDescription( bodyArgs ),
	      form = this.getRequestForm( bodyArgs ),
	      footer = this.getFooter( bodyArgs ),
	      body = this.wrapEl( { tag: 'body', content: description + form + footer } );
	console.log( '\nReached body:\n', body );
	return body;
    };

    // get request description
    this.getRequestDescription = ( descriptionArgs ) => {
	/*
	descriptionArgs = {
	  serviceType: service type string - 'servicesRequests' || 'maintenance'
	  activeStatus: active status object
	  activeStatusCode: complete request status code string
	  activeRequest: active request object
	  translatedEls: translated elements object
	  lang: lower cased language string
	}
	 */
	const serviceDetails = this.languageObj.servicesDetails,
	      description = this.wrapEl( { tag: 'h3', content: `${ serviceDetails[ descriptionArgs.lang ][ descriptionArgs.activeRequest.serviceCategory ] } - ${ descriptionArgs.activeStatus.status.title[ descriptionArgs.lang ] } - ${ descriptionArgs.activeStatus.status.description[ descriptionArgs.lang ] }`  } );
	return this.wrapEl( { tag: 'header', content: description } );
    };

    // get request form
    this.getRequestForm = ( formArgs ) => {
	/*
	formArgs = {
	  serviceType: service type string - 'servicesRequests' || 'maintenance'
	  activeStatus: active status object
	  activeStatusCode: complete request status code string
	  activeRequest: active request object
	  translatedEls: translated elements object
	  lang: lower cased language string
	 }
	 */
	const request = formArgs.activeRequest,
	      serviceDetails = this.languageObj.servicesDetails,
	      lang = formArgs.lang,
	      wrapEl = this.wrapEl;
	let form = '',
	    allFields,
	    computedFields = {};
	// define editable fields
	switch ( request.serviceCategory.toLowerCase() ){
	case 'autos':
	    allFields = [ 'Size', 'PostoRiconsegna', 'PostoRitiro', 'DataOraRiconsegna', 'DataOraRitiro' ];
	    break;
	case 'ironing':
	    allFields = [ 'DataOraRiconsegna', 'DataOraRitiro', 'NumeroCapi' ];
	    break;
	case 'shoemaking':
	    allFields = [ 'DataOraRiconsegna', 'DataOraRitiro', 'NumeroCapi' ];
	    break;
	case 'tailoring':
	    allFields = [ 'DataOraRiconsegna', 'DataOraRitiro', 'NumeroCapi' ];
	    break;
	case 'laundry':
	    allFields = [ 'DataOraRiconsegna', 'DataOraRitiro', 'NumeroCapi' ];
	    break;
	}
	// compute all defined editable fields
	allFields.forEach( ( thisField ) => {
	    const label = wrapEl( { tag: 'label', attrs: { name: thisField }, content: serviceDetails[ lang ][ thisField ] }  ),
		  input = wrapEl( { tag: 'input', attrs: { id: thisField, type: 'text', value: request[ thisField ] }, content: '' } );
	    // assign to computed fields
	    computedFields[ thisField ] = {
		label: label,
		input: input
	    };
	} );
	// print all defined editable fields
	for ( let field in computedFields ){
	    const fieldsetLegend = this.wrapEl( { tag: 'legend', content: field} );
	    form += this.wrapEl( { tag: 'fieldset', attrs: { form: formArgs.activeStatusCode }, content: fieldsetLegend + computedFields[ field ].label + computedFields[ field ].input } );
	}
	const actionButtons = this.getActionButtons( lang ); // get form workflow action buttons
	form += actionButtons;
	return this.wrapEl( { tag: 'form', attrs: { id: formArgs.activeStatusCode, method: 'POST', action: '/workflow' }, content: form } );
    };

    // get form action buttons
    this.getActionButtons = ( lang ) => {
	let activeUser = this.getActiveUser(),
	    activeStatusCode = this.getActiveStatusCode(),
	    actionButtons = {
		confirm: {
		    text: this.languageObj.actionButtons[ lang ].confirm,
		    query: `${ this.getWorkflowURL() }?reqstatus=${ activeStatusCode }&requser=${ activeUser }&reqmode=proceed`
		},
		decline: {
		    text: this.languageObj.actionButtons[ lang ].decline,
		    query: `${ this.getWorkflowURL() }?reqstatus=${ activeStatusCode }&requser=${ activeUser }&reqmode=proceed`
		},
		modify: {
		    text: this.languageObj.actionButtons[ lang ].modify,
		    query: `${ this.getWorkflowURL() }?reqstatus=${ activeStatusCode }&requser=${ activeUser }&reqmode=proceed`
		}
	    },
	    buttonsOutput = '';
	for ( let button in actionButtons ){
	    buttonsOutput += this.wrapEl( { tag: 'button', attrs: { value: actionButtons[ button ].query, type: 'submit', class: 'action-button' }, content: actionButtons[ button ].text } );
	}
	const buttonsFieldsetLabel = this.wrapEl( { tag: 'legend', content: 'Action buttons' } );
	return this.wrapEl( { tag: 'fieldset', content: buttonsFieldsetLabel + buttonsOutput } );
    };
    
    // get page footer
    this.getFooter = ( footerArgs ) => {
	/*
	footerArgs = {
	  serviceType: service type string - 'services' || 'maintenance'
	  lang: lower cased language string
	}
	 */
	const footer = this.wrapEl( { tag: 'footer', content: '' } );
	console.log( '\nReached footer:\n', footer );
	return footer;
    };
    
    // HTML ELEMENTS WRAPPERS HELPERS

    // wrap main document
    this.wrapDoc = ( docArgs ) => {
	/*
	 docArgs = {
	   head: head html string
	   body: body  html string
	   lang: lower cased language string
	}
	 */
	return `<!doctype html><html lang=${ docArgs.lang }><head>${ docArgs.head }</head>${ docArgs.body }</html>`;
    };

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
		allAttrs += ` ${ attr }="${ requestedAttrs[ attr ] }"`;
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
		NumeroCapi: 'Clothing items amount'
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
		NumeroCapi: 'Numero capi'
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
	},
	// workflow action buttons
	actionButtons: {
	    en: {
		confirm: 'Confirm',
		decline: 'Decline',
		modify:'Modify'
	    },
	    it: {
		confirm: 'Conferma',
		decline: 'Rifiuta',
		modify:'Modifica'
	    }
	}
    };
    // language default object END
    
    // init on oject instantiation
    this.init( requestArgs );

}
