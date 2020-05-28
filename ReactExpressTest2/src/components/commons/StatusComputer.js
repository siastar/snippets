// PG7 services requests types codes START
const serviceRequestCodes = {
    rental: {
	title: {
	    en: 'Rental service',
	    it: 'Servizio noleggio'
	},
	code: 'RESE', // rental services code
    },
    side: {
	title: {
	    en: 'Additional service',
	    it: 'Servizio aggiuntivo'
	},
	code: 'SISE', // side services code
    },
    maintenance: {
	title: {
	    en: 'Maintenance service',
	    it: 'Servizio manutenzione'
	},
	code: 'MASE', // maintenance services code
    }
};
// PG7 services requests types codes END

// PG7 Control Room icons START
const statusIcons = {
    NRE: { // new request code
	type: 'plus-square',
	class: 'text-primary'
    },
    WPR: { // waiting provider response code
	type: 'angle-right',
	class: 'text-success'
    },
    WCR: { // waiting customer response code
	type: 'exchange-alt',
	class: 'text-success'
    },
    APR: { // accepted by provider code
	type: 'check',
	class: 'text-success'
    },
    ACR: { // accepted by customer code
	type: 'check-double',
	class: 'text-success'
    },
    RPR: { // refused by provider code
	type: 'exclamation-circle',
	class: 'text-error'
    },
    RCR: { // refused by customer code
	type: 'exclamation',
	class: 'text-error'
    },
    EPA: { // payment error code
	type: 'exclamation-triangle',
	class: 'text-error'
    },
    CPA: { // completed payment code
	type: 'circle-notch',
	class: 'text-success'
    },
    PPA: { // pre-ordered service code
	type: 'certificate',
	class: 'text-primary'
    },
    VPA: { // verified payment code
	type: 'check-square',
	class: 'text-success'
    },
    CLR: { // closed request code
	type: 'check-square',
	class: 'text-warning'
    }
};
// PG7 Control Room icons END

// PG7 status codes START
const statusCodes = {
    new: {
	title: {
	    en: 'New',
	    it: 'Nuovo'
	},
	description: {
	    en: 'New request',
	    it: 'Nuova richiesta'
	},
	code: 'NRE' // new request code
    },
    waitingProvider: {
	title: {
	    en: 'In progress',
	    it: 'In corso'
	},
	description: {
	    en: 'Waiting for provider',
	    it: 'In attesa del fornitore'
	},
	code: 'WPR', // waiting provider response code
	communication: {
	    autos: {
		title: {
		    en: 'Vehicole rental request',
		    it: 'Richiesta noleggio veicolo'
		},
		body: {
		    en: 'Please confirm or deny the following request:',
		    it: 'Si prega di confermare o rifiutare la seguente richiesta:'
		}
	    },
	    services: {
		title: {
		    en: 'Service request',
		    it: 'Richiesta servizio'
		},
		body: {
		    en: 'Please confirm or deny the following request:',
		    it: 'Si prega di confermare o rifiutare la seguente richiesta:'
		}
	    }
	} 
    },
    waitingCustomer: {
	title: {
	    en: 'In progress',
	    it: 'In corso'
	},
	description: {
	    en: 'Waiting for customer',
	    it: 'In attesa del cliente'
	},
	code: 'WCR' // waiting customer response code
    },
    acceptedProvider: {
	title: {
	    en: 'In progress',
	    it: 'In corso'
	},
	description: {
	    en: 'Accepted by provider',
	    it: 'Accettato dal fornitore'
	},
	code: 'APR' // accepted by provider code
    },
    acceptedCustomer: {
	title: {
	    en: 'In progress',
	    it: 'In corso'
	},
	description: {
	    en: 'Accepted by customer',
	    it: 'Accettato dal cliente'
	},
	code: 'ACR' // accepted by customer code
    },
    refusedProvider: {
	title: {
	    en: 'In progress',
	    it: 'In corso'
	},
	description: {
	    en: 'Refused by provider',
	    it: 'Rifiutato dal fornitore'
	},
	code: 'RPR' // refused by provider code
    },
    refusedCustomer: {
	title: {
	    en: 'In progress',
	    it: 'In corso'
	},
	description: {
	    en: 'Refused by customer',
	    it: 'Rifiutato dal cliente'
	},
	code: 'RCR' // refused by customer code
    },
    refusedPayment: {
	title: {
	    en: 'In progress',
	    it: 'In corso'
	},
	description: {
	    en: 'Rejected by payment system',
	    it: 'Rifiutato dal sistema di pagamento'
	},
	code: 'RPA' // rejected payment code
    },
    errorPayment: {
	title: {
	    en: 'In progress',
	    it: 'In corso'
	},
	description: {
	    en: 'Error during payment',
	    it: 'Errore nel pagamento'
	},
	code: 'EPA' // payment error code
    },
    payedBySystem: {
	title: {
	    en: 'In progress',
	    it: 'In corso'
	},
	description: {
	    en: 'Completed payment',
	    it: 'Pagamento completato'
	},
	code: 'CPA' // completed payment code
    },
    preOrdered: {
	title: {
	    en: 'In progress',
	    it: 'In corso'
	},
	description: {
	    en: 'Payment included in order',
	    it: 'Pagamento incluso nella richiesta'
	},
	code: 'PPA' // pre-ordered service code
    },
    verifiedPayment: {
	title: {
	    en: 'In progress',
	    it: 'In corso'
	},
	description: {
	    en: 'Payment verified',
	    it: 'Pagamento verificato'
	},
	code: 'VPA' // verified payment code
    },
    closed: {
	title: {
	    en: 'Closed',
	    it: 'Chiuso'
	},
	description: {
	    en: 'Closed request',
	    it: 'Richiesta chiusa'
	},
	code: 'CLR' // closed request code
    }
};
// PG7 services requests types codes END

// PG7 main status computer
export default function StatusComputer(){

    this.init = () => {
	// define services, status codes and icons
	this.serviceRequestCodes = serviceRequestCodes;
	this.statusCodes = statusCodes;
	this.statusIcons = statusIcons;
    };

    // get status obj from status code
    this.getStatus = ( statusCode ) => {
	const service = statusCode[ 2 ] + statusCode[ 5 ] + statusCode[ 8 ] + statusCode[ 11 ],
	      status = statusCode[ 13 ] + statusCode[ 15 ] + statusCode[ 17 ],
	      thisStatus = {
		  service: this.serviceRequestCodes[ this.getServiceFromCode( service ) ],
		  status: this.statusCodes[ this.getStatusFromCode( status ) ],
		  fieldID: statusCode.substring( 18 ),
		  icon: this.statusIcons[ status ]
	      };
	return thisStatus;
    };

    // get service object from service code
    this.getServiceFromCode = ( serviceCode ) => {
	let serviceObj = null;
	for ( let service in this.serviceRequestCodes ){
	    if ( this.serviceRequestCodes[ service ].code === serviceCode.trim().toUpperCase() ){
		serviceObj = service;
	    }
	}
	return serviceObj;
    };

    // get status obj from status code
    this.getStatusFromCode = ( statusCode ) => {
	let statusObj = null;
	for ( let status in this.statusCodes ){
	    if ( this.statusCodes[ status ].code === statusCode.trim().toUpperCase() ){
		statusObj = status;
	    }
	}
	return statusObj;
    };
    
    // launch init on object instantiation
    this.init();
}
