import { messagingServer, serviceRequestCodes, statusCodes, debugElements } from './WorkFlowSettings';
import { PG7Notifier } from './PG7Notifier';

/* PG7 main workflow class START */
export default class WorkFlow {

    constructor( option ){
	const privateMessagingServer = messagingServer; // define messaging server
	this.getMessagingServer = () => { // messaging server getter
	    return privateMessagingServer;
	};
	// define services and status codes
	this.serviceRequestCodes = serviceRequestCodes;
	this.statusCodes = statusCodes;
	// init
	this.init();
	// debug
	if ( option && option === 'debug' ){
	    // setup debug console logs
	    this.debug = function(){
		const debugArgsLength = arguments.length;
		if ( debugArgsLength > 0 ){
		    for ( let argIndex = 0; argIndex < debugArgsLength; argIndex++ ){
			const debugArg = arguments[ argIndex ];
			if ( typeof debugArg === 'string' ){
			    console.log( `\n${ debugArg }\n` );
			}
			else {
			    console.log( debugArg );
			}
		    }
		}
	    };
	    // setup test buttons
	    //this.setupDebugButtons();
	}
	else {
	    this.debug = () => {};
	}
    }

    // main init
    init(){
	// set state and define state getters and setters
	this.state = {
	    activeCustomer: null,
	    activeStatus: null,
	    activeOutput: null,
	    busy: false
	};
	this.getState = ( requested ) => {
	    const requestedState = this.state[ requested ];
	    if ( requested ){
		return requestedState;
	    }
	    return this.state;
	};
	this.setState = ( newState ) => { // pass new state value
	    if ( newState ){
		this.state = { ...this.state, ...newState };
	    }
	    else {
		this.debug( '\nInvalid state prop or object passed!\nPassed new state:\n', newState );
	    }
	};
	this.resetState = ( stateProp, newPropValue ) => {
	    if ( stateProp && newPropValue ){
		const newState = {
		    [ stateProp ]: newPropValue
		};
		this.setState( newState );
	    }
	    else {
		this.setState( 'activeCustomer', null );
		this.setState( 'activeStatus', null );
		this.setState( 'activeOutput', null );
		this.setState( 'busy', false );
	    }
	};
    }

    // setup browser debug UI
    setupDebugButtons(){
	this.debugButtonClick = this.debugButtonClick.bind( this );
	const debugButtons = document.getElementsByClassName( debugElements.ui.buttons );
	let buttonsCounter = 0;
	while ( buttonsCounter < debugButtons.length ){
	    let debugButton = debugButtons[ buttonsCounter ];
	    debugButton.style[ 'display' ] = 'unset';
	    debugButton.addEventListener( 'click', this.debugButtonClick );
	    buttonsCounter++;
	}
    }
    debugButtonClick(){
	arguments[ 0 ].preventDefault();
	const buttonEl = arguments[ 0 ].target,
	      testRequest = {
		  type: '',
		  status: buttonEl.value,
		  meta: []
	      };
	if ( buttonEl.id === 'wf-test-next' ){
	    this.debug( '\nNext step selected\n' );
	    testRequest.type = 'next';
	    this.processRequest( testRequest );
	}
	if ( buttonEl.id === 'wf-test-prev' ){
	    this.debug( '\nPrevious step selected\n' );
	    testRequest.type = 'previous';
	    this.processRequest( testRequest );
	}
	if ( buttonEl.id === 'wf-test-present' ){
	    this.debug( '\nPresent step selected\n' );
	    testRequest.type = 'present';
	    this.processRequest( testRequest );
	}
    }
    
    // process request
    processRequest( request ){
	/*
	 request = {
	   type: 'next' || 'previous' || 'present'
	   status: complete status code string
	   meta: array of meta objects, identified by their names - { name: 'example-name', value: string || array || object }
	 }
	 */
	if ( ! request ){
	    this.debug( '\nERROR! No workflow request detected!\nSent request:\n', request );
	}
	else if ( typeof request !== 'function' && typeof request !== 'object' ){
	    this.debug( '\nERROR! No allowed workflow request type detected!\nSent request:\n', request );
	}
	else {
	    this.resetState( 'activeStatus', request.status ); // reset internal state
	    const status = this.getStatus( request.status ),
		  stepObj = {
		      stepArgs: status ? status : null,
		      meta: request.meta ? request.meta : null
		  };
	    switch ( request.type ){
	    case 'next':
		this.manageNextStep( stepObj );
		break;
	    case 'previous':
		this.managePreviousStep( stepObj );
		break;
	    case 'present':
		this.managePresentStep( stepObj );
		break;
	    default:
		this.debug( '\nERROR! No workflow request type detected!\nSent request:\n', request );
		break;
	    }
	}
    }
    
    // manage next workflow step
    manageNextStep( stepObj ){
	this.debug( '\nStep object:\n', stepObj );
	const serviceCode = stepObj.stepArgs.service.code;
	switch ( serviceCode ){
	case 'RESE': // rental services
	    this.manageNextStepRentals( stepObj );
	    break;
	case 'SISE': // side services
	    this.manageNextStepSides( stepObj );
	    break;
	case 'MASE': // maintenance services
	    this.manageNextStepMaintenance( stepObj );
	    break;
	}
    }

    // manage previous workflow step
    managePreviousStep( stepObj ){
	this.debug( '\nStep object:\n', stepObj );
	const serviceCode = stepObj.stepArgs.service.code;
	switch ( serviceCode ){
	case 'RESE': // rental services
	    this.managePreviousStepRentals( stepObj );
	    break;
	case 'SISE': // side services
	    this.managePreviousStepSides( stepObj );
	    break;
	case 'MASE': // maintenance services
	    this.managePreviousStepMaintenance( stepObj );
	    break;
	}
    }

    // manage present workflow step
    managePresentStep( stepObj ){
	this.debug( '\nStep object:\n', stepObj );
	const serviceCode = stepObj.stepArgs.service.code;
	switch ( serviceCode ){
	case 'RESE': // rental services
	    this.managePresentStepRentals( stepObj );
	    break;
	case 'SISE': // side services
	    this.managePresentStepSides( stepObj );
	    break;
	case 'MASE': // maintenance services
	    this.managePresentStepMaintenance( stepObj );
	    break;
	}
    }

    // STEP FUNCTIONS

    // rentals service next step
    manageNextStepRentals( stepParams ){
	this.debug( 'Reached rentals service next step!\nStep arguments:', stepParams );
	const rentalWorkflowOrder = [ 'NRE', 'WPR', 'APR', 'WCR', 'ACR', 'VPA', 'CLR' ],
	      availableSteps = this.getAvailableSteps( rentalWorkflowOrder, stepParams.stepArgs.status.code );
	let newStatusCode,
	    connectionType,
	    newCompleteStatusCode;
	const previousStatus = this.getState( 'activeStatus' );
	this.debug( 'Available steps:', availableSteps );
	switch ( availableSteps.thisStep.code ){
	case 'NRE': // new request
	    newStatusCode = availableSteps.nextStep.code; // define next step
	    newCompleteStatusCode = this.getUpdatedStatusCode( { newService: stepParams.stepArgs.service.code, newStatus: newStatusCode }, previousStatus ); // define new complete status code
	    connectionType = 'comm'; // define connection type
	    // define initial rental communication (to service provider)
	    const initialCommunication = this.printCommunication(
		{
		    status: newStatusCode,
		    statusCode: newCompleteStatusCode,
		    service: stepParams.stepArgs.service.code,
		    meta: stepParams.meta
		}
	    );
	    // add communications to meta
	    stepParams.meta.push( { communications: [ initialCommunication ] } );
	    break;
	case 'WPR': // waiting provider
	    // TO FINISH!
	    break;
	case 'APR': // accepted provider
	    // TO FINISH!
	    break;
	case 'WCR': // waiting customer
	    // TO FINISH!
	    break;
	case 'ACR': // accepted customer
	    // TO FINISH!
	    break;
	case 'VPA': // verified payment
	    // TO FINISH!
	    break;
	case 'CLR': // closed
	    // TO FINISH!
	    break;
	}
	const outputRequest = {
		  statusCode: newStatusCode && newCompleteStatusCode ? newCompleteStatusCode : previousStatus, // new or actual ( if 'newStatusCode' has not been assigned ) computed step status code
		  type: connectionType,
		  meta: stepParams.meta
	      };
	outputRequest.statusDetails = this.getStatus( outputRequest.statusCode ); // compute and assign new status props to output request
	this.debug( 'Output setup arguments:', outputRequest,'New status details:', outputRequest.statusDetails );
	// setup output request
	this.outputSetup( outputRequest );
    }

    // rentals service previous step
    managePreviousStepRentals( stepParams ){
	this.debug( '\nReached rentals service previous step!\nStep arguments:\n', stepParams );
	const rentalWorkflowOrder = [ 'NRE', 'WPR', 'APR', 'WCR', 'ACR', 'VPA', 'CLR' ],
	      availableSteps = this.getAvailableSteps( rentalWorkflowOrder, stepParams.stepArgs.status.code );
	this.debug( '\nAvailable steps:\n', availableSteps );
	// TO FINISH!
    }

    // rentals service present step
    managePresentStepRentals( stepParams ){
	this.debug( '\nReached rentals service present step!\nStep arguments:\n', stepParams );
	const rentalWorkflowOrder = [ 'NRE', 'WPR', 'APR', 'WCR', 'ACR', 'VPA', 'CLR' ],
	      availableSteps = this.getAvailableSteps( rentalWorkflowOrder, stepParams.stepArgs.status.code );
	this.debug( '\nAvailable steps:\n', availableSteps );
	// TO FINISH!
    }

    // sides service next step
    manageNextStepSides( stepParams ){
	this.debug( '\nReached sides service next step!\nStep arguments:\n', stepParams );
	const sidesWorkflowOrder = [ 'NRE', 'WPR', 'APR', 'WCR', 'ACR', 'VPA', 'CLR' ],
	      availableSteps = this.getAvailableSteps( sidesWorkflowOrder, stepParams.stepArgs.status.code );
	this.debug( '\nAvailable steps:\n', availableSteps );
	// TO FINISH!
    }

    // sides service previous step
    managePreviousStepSides( stepParams ){
	this.debug( '\nReached sides service previous step!\nStep arguments:\n', stepParams );
	const sidesWorkflowOrder = [ 'NRE', 'WPR', 'APR', 'WCR', 'ACR', 'VPA', 'CLR' ],
	      availableSteps = this.getAvailableSteps( sidesWorkflowOrder, stepParams.stepArgs.status.code );
	this.debug( '\nAvailable steps:\n', availableSteps );
	// TO FINISH!
    }

    // sides service present step
    managePresentStepSides( stepParams ){
	this.debug( '\nReached sides service present step!\nStep arguments:\n', stepParams );
	const sidesWorkflowOrder = [ 'NRE', 'WPR', 'APR', 'WCR', 'ACR', 'VPA', 'CLR' ],
	      availableSteps = this.getAvailableSteps( sidesWorkflowOrder, stepParams.stepArgs.status.code );
	this.debug( '\nAvailable steps:\n', availableSteps );
	// TO FINISH!
    }

    // maintenance service next step
    manageNextStepMaintenance( stepParams ){
	this.debug( '\nReached maintenance service next step!\nStep arguments:\n', stepParams );
	const maintenanceWorkflowOrder = [ 'NRE', 'WPR', 'APR', 'WCR', 'ACR', 'VPA', 'CLR' ],
	      availableSteps = this.getAvailableSteps( maintenanceWorkflowOrder, stepParams.stepArgs.status.code );
	this.debug( '\nAvailable steps:\n', availableSteps );
	// TO FINISH!
    }

    // maintenance service previous step
    managePreviousStepMaintenance( stepParams ){
	this.debug( '\nReached maintenance service previous step!\nStep arguments:\n', stepParams );
	const maintenanceWorkflowOrder = [ 'NRE', 'WPR', 'APR', 'WCR', 'ACR', 'VPA', 'CLR' ],
	      availableSteps = this.getAvailableSteps( maintenanceWorkflowOrder, stepParams.stepArgs.status.code );
	this.debug( '\nAvailable steps:\n', availableSteps );
	// TO FINISH!
    }

    // maintenance service present step
    managePresentStepMaintenance( stepParams ){
	this.debug( '\nReached maintenance service present step!\nStep arguments:\n', stepParams );
	const maintenanceWorkflowOrder = [ 'NRE', 'WPR', 'APR', 'WCR', 'ACR', 'VPA', 'CLR' ],
	      availableSteps = this.getAvailableSteps( maintenanceWorkflowOrder, stepParams.stepArgs.status.code );
	this.debug( '\nAvailable steps:\n', availableSteps );
	// TO FINISH!
    }

    // get available steps
    getAvailableSteps( stepsSequence, selectedStep ){
	if ( ! Array.isArray( stepsSequence ) ){
	    this.debug( '\nInvalid steps sequence!\nPassed sequence:\n', stepsSequence );
	    return null;
	}
	if ( ! selectedStep || typeof selectedStep !== 'string' ){
	    this.debug( '\nInvalid sequence step!\nPassed step:\n', selectedStep );
	    return null;    
	}
	let thisStepIndex, nextStepIndex, prevStepIndex,
	    thisStep = stepsSequence.filter( ( step, stepIndex ) => {
		if ( step === selectedStep ){
		    prevStepIndex = stepIndex -1 >= 0 ? stepIndex -1 : null;
		    thisStepIndex = stepIndex;
		    nextStepIndex = stepIndex +1 <= parseInt( stepsSequence.length -1 ) ? stepIndex +1 : null;
		}
		return step === selectedStep;
	    } ),
	    prevStep = stepsSequence[ prevStepIndex ] ? stepsSequence[ prevStepIndex ] : null,
	    nextStep = stepsSequence[ nextStepIndex ] ? stepsSequence[ nextStepIndex ] : null;
	// return available steps obj
	return {
	    thisStep: {
		code: thisStep[ 0 ],
		index: thisStepIndex
	    },
	    nextStep: {
		code: nextStep,
		index: nextStepIndex
	    },
	    prevStep: {
		code: prevStep,
		index: prevStepIndex
	    },
	    allSteps: stepsSequence
	};
    }

    // print communication
    printCommunication( printArgs ){
	/*
	 printArgs = {
	   service: service code string
	   status: status code string
	   statusCode: complete status code string
	   meta: meta objects array
	 }
	 */
	let commArgs = {
	    service: printArgs.service,
	    commElements: this.getStepFromStatusCode( printArgs.status ), // define communication elements
	    status: printArgs.status,
	    statusCode: printArgs.statusCode,
	    meta: {}
	},
	    metaLength = printArgs.meta.length;
	// aggregate all metas
	for ( let metaI = 0; metaI < metaLength; metaI++ ){
	    for ( let commProp in printArgs.meta[ metaI ] ){
		commArgs.meta[ commProp ] = printArgs.meta[ metaI ][ commProp ];
	    }
	}
	// create new notifier
	const newCommunication = new PG7Notifier( commArgs );
	// return computed communication ( email, sms and push ) 
	return newCommunication.getCommunication();
    }

    // OUTPUT
    
    // setup active output
    outputSetup( outputRequest ){
	/*
	 outputRequest = {
	   type: 'comm' || 'pos' || 'db' // messaging, ecommerce, database
	   statusCode: '' // complete status code
	   status: status props object
	   meta: [] // array of meta objects
	 */
	this.debug( 'Output request:', outputRequest );
	if ( outputRequest.type !== 'comm' && outputRequest.type !== 'pos' && outputRequest.type !== 'db' ){
	    console.log( '\nERROR! No valid communication type specified in the output request argument!\nOutput request:\n', outputRequest );
	}
	else {
	    let outputArgs;
	    switch ( outputRequest.type ){
	    case 'comm': // messaging system
		outputArgs = {
		    statusDetails: outputRequest.statusDetails,
		    statusCode: outputRequest.statusCode,
		    meta: outputRequest.meta
		};
		break;
	    case 'pos':
		// TO FINISH! - define point of sale actions
		break;
	    case 'db':
		// TO FINISH! - define database actions
		break;
	    }
	    // compute requested output
	    this.outputCompute( outputArgs );
	}
    }
    
    // compute active output
    outputCompute( outputArgs ){
	// TO FINISH! - connect to messaging system
	this.debug( 'Final Status Object:', outputArgs );
	let newState = this.getState();
	newState.activeOutput = outputArgs;
	newState.busy = false;
	this.setState( newState ); // set new state
    }


    // WRAPPERS

    // proceed to next step
    proceed( requestObj ){
	/*
	 requestObj = {
	 service: service type string
	 status: complete status code string (only if previously coded - not a new request)
	 fieldID: unique identifier string (only if new request)
	 meta: array of meta objects, identified by their names - { name: 'example-name', value: string || array || object }
	 }
	 */
	if ( ! requestObj.status && ! requestObj.fieldID ){ // if no status code and no field ID
	    console.log( 'ERROR! Invalid input passed to \'this.proceed\'!\nPassed arguments:', arguments );
	}
	else if ( requestObj.status && requestObj.fieldID ){ // if both status code and field ID
	    console.log( 'ERROR! Wrong or too many parameters passed to \'this.proceed\'!\nPassed arguments:', arguments );
	}
	else {
	    if ( this.state.activeOutput ){ // if internal state is not clear
		this.resetState( 'activeOutput', null );
	    }
	    this.setState( { busy: true } );  // define new (busy) state
	    if ( ! requestObj.status && requestObj.fieldID ){ // if no status code and with field ID ( new request )
		requestObj.status = this.createStatusCode( requestObj.service, 'NRE', requestObj.fieldID ); // define new request
	    }
	    const statusData = this.getStatus( requestObj.status );
	    this.processRequest( { type: 'next', status: requestObj.status, meta: requestObj.meta } );
	}
    }

    // STATUS CODES FUNCTIONS

    // get status obj from status code
    getStatus( statusCode ){
	const service = statusCode[ 2 ] + statusCode[ 5 ] + statusCode[ 8 ] + statusCode[ 11 ],
	      status = statusCode[ 13 ] + statusCode[ 15 ] + statusCode[ 17 ],
	      thisStatus = {
		  service: this.serviceRequestCodes[ this.getServiceFromCode( service ) ],
		  status: this.statusCodes[ this.getStatusFromCode( status ) ],
		  fieldID: statusCode.substring( 18 )
	      };
	return thisStatus;
    }
    
    // get updated status code
    getUpdatedStatusCode( newParams, oldStatusCode ){
	/*
	 newParams = {
	   newService = service code string
	   newStatus = status code string
	 }
	 */
	let newStatusCode = '';
	for ( let i = 0; i < oldStatusCode.length; i++ ){
	    if ( i > 17 ){ // code update completed, add field id and reset counter
		let fieldID = '',
		    fieldIDIndex = i;
		while ( fieldIDIndex < oldStatusCode.length ){
		    fieldID += oldStatusCode[ fieldIDIndex ];
		    fieldIDIndex++;
		}
		newStatusCode += fieldID;
		i = oldStatusCode.length;
	    }
	    else if ( i === 2 ){
		newStatusCode += newParams.newService[ 0 ].toUpperCase();
	    }
	    else if ( i === 5 ){
		newStatusCode += newParams.newService[ 1 ].toUpperCase();
	    }
	    else if ( i === 8 ){
		newStatusCode += newParams.newService[ 2 ].toUpperCase();
	    }
	    else if ( i === 11 ){
		newStatusCode += newParams.newService[ 3 ].toUpperCase();
	    }
	    else if ( i === 13 ){
		newStatusCode += newParams.newStatus[ 0 ].toUpperCase();
	    }
	    else if ( i === 15 ){
		newStatusCode += newParams.newStatus[ 1 ].toUpperCase();
	    }
	    else if ( i === 17 ){
		newStatusCode += newParams.newStatus[ 2 ].toUpperCase();
	    }
	    else { // preserve old code char
		newStatusCode += oldStatusCode[ i ];
	    }
	}
	return newStatusCode;
    }

    // set status code
    setStatusCode( updatedCode ){
	// TO FINISH! - update database
    }
    
    // create status code
    createStatusCode( service, status, fieldID ){
	/*
	 service: service code string
	 status: status code string
	 fieldID: mongo field index

	 code structure:
	 [ 0-1 ] = 2 random alphanumerical
	 [ 2 ] = First service code character
	 [ 3-4 ] = 2 random alphanumerical
	 [ 5 ] = Second service code character
	 [ 6-7 ] = 2 random alphanumerical
	 [ 8 ] = Third service code character
	 [ 9-10 ] = 2 random alphanumerical
	 [ 11 ] = Fourth service code character
	 [ 12 ] = 1 random alphanumerical
	 [ 13 ] = First status code character
	 [ 14 ] = 1 random alphanumerical
	 [ 15 ] = Second status code character
	 [ 16 ] = 1 random alphanumerical
	 [ 17 ] = Third status code character
	 [ 18-END ] = field ID

	 */
	let newStatusCode = '',
	    serviceI = 0,
	    statusI = 0;
	while ( serviceI < service.length ){
	    newStatusCode += this.createRandomSessionID( 2 ); // add two random chars
	    newStatusCode += service[ serviceI ].toUpperCase(); // add request code char
	    serviceI++;
	}
	while ( statusI < status.length ){
	    newStatusCode += this.createRandomSessionID( 1 ); // add random char
	    newStatusCode += status[ statusI ].toUpperCase(); // add status code char
	    statusI++;
	}
	newStatusCode += fieldID; // add field id
	return newStatusCode;
    }

    // get service object from service code
    getServiceFromCode( serviceCode ){
	let serviceObj = null;
	for ( let service in this.serviceRequestCodes ){
	    if ( this.serviceRequestCodes[ service ].code === serviceCode.trim().toUpperCase() ){
		serviceObj = service;
	    }
	}
	return serviceObj;
    }

    // get status obj from status code
    getStatusFromCode( statusCode ){
	let statusObj = null;
	for ( let status in this.statusCodes ){
	    if ( this.statusCodes[ status ].code === statusCode.trim().toUpperCase() ){
		statusObj = status;
	    }
	}
	return statusObj;
    }

    // get step details from status code
    getStepFromStatusCode( statusCode ){
	let stepElements;
	// define communication elements
	for ( let statusStep in this.statusCodes ){
	    const thisStep = this.statusCodes[ statusStep ];
	    if ( thisStep.code === statusCode ){
		stepElements = thisStep;
	    }
	}
	return stepElements;
    }
    
    // create random alphanumeric session id of given length
    createRandomSessionID( idLength ){
	let newRandomSessionID = '';
	while ( newRandomSessionID.length < idLength ){
	    const randomCheck = this.getRandomInt( 0, 1 ),
		  randomChar = randomCheck === 0 ? this.getRandomInt( 0, 9 ) : this.getRandomLetter();
	    newRandomSessionID += randomChar;
	}
	return newRandomSessionID;
    }
    
    // get random int
    getRandomInt( min, max ) {
	min = Math.ceil( min );
	max = Math.floor( max );
	return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
    }
    
    // get random letter
    getRandomLetter(){
	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	return alphabet[ this.getRandomInt( 0, ( alphabet.length -1 ) ) ];
    }
    
}
/* PG7 main workflow class END */
