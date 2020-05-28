import { routingKeys } from './RabbitSettings';

/* PG7 WorkFlow configuration START */

// PG7 messaging server
const messagingServer = 'localhost:5672',
      messagingProtocol = 'amqp://localhost';

// PG7 services requests types codes
const serviceRequestCodes = {
    rental: {
	title: {
	    en: 'Rental service',
	    it: 'Servizio noleggio'
	},
	code: 'RESE', // rental services code
	routingKey: routingKeys.rentalService // RabbitMQ routing key
    },
    side: {
	title: {
	    en: 'Additional service',
	    it: 'Servizio aggiuntivo'
	},
	code: 'SISE', // side services code
	routingKey: routingKeys.sideService // RabbitMQ routing key
    },
    maintenance: {
	title: {
	    en: 'Maintenance service',
	    it: 'Servizio manutenzione'
	},
	code: 'MASE', // maintenance services code
	routingKey: routingKeys.maintenance // RabbitMQ routing key
    }
};

// PG7 status codes
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

// debug
const debugElements = {
    ui: {
	buttons: 'workflow-test-button'
    }
};

export { messagingServer, serviceRequestCodes, statusCodes, debugElements };
