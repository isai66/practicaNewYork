/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const languageStrings = {
    en: {
        translation: {
            WELCOME_MESSAGE: 'Welcome, you can say Beautiful places to visit in New York or Help. Which one would you like to try?',
            DESCRIPTIONS: [
                'New York is known for its beautiful landscapes.',
                'New York City is known as the skyscrapers city.'
            ],
            LUGARES_MESSAGE: 'There are a lot of iconic and historic places in New York City like the Empire State Building, the Statue of Liberty, the Chrysler Building, the new One World Trade Center and even the subway. ',
            MUSICA_MESSAGE: 'Here is New York, New York by Frank Sinatra',
            TRAJES_MESSAGE: 'In New York City there is no typical clothing, however, the clothing with which the United States is known in the world is wearing different suits or dresses with the colors of the flag, men usually wear hats.',
            COMIDA_MESSAGE: 'New York City is rich in culture, as such it does not have a typical food, but being a mixture of cultures, its foods come from all over, since New York received immigrants from all countries.',
            PERSONAJE_MESSAGE: 'Jennifer Lynn Affleck is an American singer, songwriter, dancer, actress, fashion designer and businesswoman of Puerto Rican origin. Her interest in becoming famous arose from having a supporting role in the film My Little Girl.',
        }
    },
    es: {
        translation: {
            WELCOME_MESSAGE: 'Bienvenido, puedes decir Bonitos Lugares para visitar en Nueva York o Ayuda. ¿Cuál te gustaría probar?',
            DESCRIPTIONS: [
                'La ciudad de Nueva York es conocida por sus paisajes hermosos.',
                'Nueva York es conocida como la ciudad de los rascacielos.'
            ],
            LUGARES_MESSAGE: 'En Nueva York hay muchos lugares iconicos e historicos como el edificio Empire State Building, la Estatua de la Libertad, el edificio Chrysler, el recien One World Trade Center e incluso el metro.',
            MUSICA_MESSAGE: 'Aquí tienes New York, New York por Frank Sinatra',
            TRAJES_MESSAGE: 'En la ciudad de Nueva York no hay como tal una vestimenta típica, sin embargo, la vestimenta con la que se conoce a Estados Unidos en el mundo es portar distintos trajes o vestidos con los colores de la bandera, los hombres suelen usar sombrero.',
            COMIDA_MESSAGE: 'La ciudad de Nueva York es rica en cultura, como tal no tiene una comida típica, sino que al ser una mezcla de culturas, sus comidas provienen de todos lados, ya que Nueva York recibía inmigrantes de todos los países.',
            PERSONAJE_MESSAGE: 'Jennifer Lynn Affleck​ es una cantante, compositora, bailarina, actriz, diseñadora de moda y empresaria estadounidense de origen puertorriqueño. Su interés para llegar a la fama surgió de tener un papel secundario en la película My Little Girl.',
        }
    }
};


//APLBIENVENIDA
const DOCUMENT_ID1 = "Bienvenida";

const datasource1 = {
    "headlineTemplateData": {
        "type": "object",
        "objectId": "headlineSample",
        "properties": {
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://bucketpractica1apl.s3.us-east-2.amazonaws.com/Empire_State_Building_from_the_Top_of_the_Rock2.jpg",
                        "size": "large"
                    }
                ]
            },
            "textContent": {
                "primaryText": {
                    "type": "PlainText",
                    "text": "Bienvenido a la página de información de New York"
                }
            },
            "logoUrl": "",
            "hintText": "Isaí Lara Mojica 9o \"B\""
        }
    }
};

const createDirectivePayload = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']){
            
            const aplDirective = createDirectivePayload(DOCUMENT_ID1, datasource1);
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


//APLVIDEO
const DOCUMENT_IDVIDEO = "PracticaAPL";

const datasourceVIDEO = {
    "videoPlayerTemplateData": {
        "type": "object",
        "properties": {
            "backgroundImage": "https://wallpapers.com/images/featured/dark-background-b59iy2towqy5yrgb.jpg",
            "displayFullscreen": false,
            "headerTitle": "Welcome to New York",
            "headerSubtitle": "",
            "logoUrl": "https://bucketpractica1apl.s3.us-east-2.amazonaws.com/Empire_State_Building_from_the_Top_of_the_Rock.jpg",
            "videoControlType": "jump10",
            "videoSources": [
                "https://bucketpractica1apl.s3.us-east-2.amazonaws.com/New+York+in+8K+ULTRA+HD+-+Capital+of+Earth+(60FPS)+(360p).mp4"
            ],
            "sliderType": "determinate"
        }
    }
};

const createDirectivePayloadVIDEO = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};

const VideoIntentHandler = {
    canHandle(handlerInput) {
        // handle named intent
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'VideoIntent';
    },
    handle(handlerInput) {
        
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const descriptions = requestAttributes.t('DESCRIPTIONS');
        const descriptionIndex = Math.floor(Math.random() * descriptions.length);
        const speakOutput = descriptions[descriptionIndex];
    
        console.log("Speak Output: ", speakOutput);  // Debugging output
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirectiveVIDEO = createDirectivePayload(DOCUMENT_IDVIDEO, datasourceVIDEO);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirectiveVIDEO);
        }

        // send out skill response
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

//APLTURISTICOS

const DOCUMENT_IDTUR = "TuristicosAPL";

const datasourceTUR = {
    "cardsLayoutTemplateData": {
        "type": "object",
        "properties": {
            "backgroundImage": "https://d2o906d8ln7ui1.cloudfront.net/images/response_builder/background-leaf-2.png",
            "headerTitle": "",
            "headerSubtitle": "",
            "headerAttributionImage": "",
            "primaryText": "Lugares Turísticos de la ciudad de Nueva York",
            "listItems": [
                {
                    "primaryText": "New York Subway",
                    "secondaryText": "1904",
                    "thumbnailImage": "https://bucketpractica1apl.s3.us-east-2.amazonaws.com/Fsc9303.jpg"
                },
                {
                    "primaryText": "Chrysler Building",
                    "secondaryText": "1928",
                    "thumbnailImage": "https://bucketpractica1apl.s3.us-east-2.amazonaws.com/iStock-12706445941-e1686842660620.jpg"
                },
                {
                    "primaryText": "One World Trade Center",
                    "secondaryText": "2014",
                    "thumbnailImage": "https://bucketpractica1apl.s3.us-east-2.amazonaws.com/dsc_5921_retouch-1.jpeg"
                },
                {
                    "primaryText": "Empire State Building",
                    "secondaryText": "1933",
                    "thumbnailImage": "https://bucketpractica1apl.s3.us-east-2.amazonaws.com/Empire_State_Building_from_the_Top_of_the_Rock.jpg"
                },
                {
                    "primaryText": "Times Square",
                    "secondaryText": "1904",
                    "thumbnailImage": "https://bucketpractica1apl.s3.us-east-2.amazonaws.com/timessquare.jpeg"
                },
                {
                    "primaryText": "Statue Of Liberty",
                    "secondaryText": "1924",
                    "thumbnailImage": "https://bucketpractica1apl.s3.us-east-2.amazonaws.com/statue-of-liberty-photo-julienne-schaer-nyc-and-company-003-3.jpeg"
                }
            ]
        }
    }
};

const createDirectivePayloadTUR = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};

const SampleAPLRequestHandlerTUR = {
    canHandle(handlerInput) {
        // handle named intent
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TuristicosIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const lugaresMessage = requestAttributes.t('LUGARES_MESSAGE');
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload(DOCUMENT_IDTUR, datasourceTUR);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

        // send out skill response
        return handlerInput.responseBuilder
            .speak(lugaresMessage)
            .reprompt(lugaresMessage)
            .getResponse();
    }
};

//APLMUSICA
const DOCUMENT_IDMUS = "MusicaNewYork";

const datasourceMUS = {
    "audioPlayerTemplateData": {
        "type": "object",
        "properties": {
            "audioControlType": "jump30",
            "audioSources": [
                "https://bucketpractica1apl.s3.us-east-2.amazonaws.com/Theme+From+New+York%2C+New+York+(2008+Remastered)+(320).mp3"
            ],
            "backgroundImage": "https://d2o906d8ln7ui1.cloudfront.net/images/response_builder/background-rose.png",
            "coverImageSource": "https://bucketpractica1apl.s3.us-east-2.amazonaws.com/ab67616d0000b27398a6c897be7c828f3649ca12.jpeg",
            "headerTitle": "Música de New York",
            "logoUrl": "",
            "primaryText": "New York, New York",
            "secondaryText": "Frank Sinatra",
            "sliderType": "determinate"
        }
    }
};

const createDirectivePayloadMUS = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};

const SampleAPLRequestHandlerMUS = {
    canHandle(handlerInput) {
        // handle named intent
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'MusicaIntent';
    },
    handle(handlerInput) {
                const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('MUSICA_MESSAGE');
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirectiveMUS = createDirectivePayload(DOCUMENT_IDMUS, datasourceMUS);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirectiveMUS);
        }

        // send out skill response
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

//TRAJES
const DOCUMENT_IDTRAJE = "TrajesAPL";

const datasourceTRAJE = {
    "simpleTextTemplateData": {
        "type": "object",
        "properties": {
            "backgroundImage": "https://bucketpractica1apl.s3.us-east-2.amazonaws.com/Empire_State_Building_from_the_Top_of_the_Rock2.jpg",
            "foregroundImageLocation": "top",
            "foregroundImageSource": "https://www.ecured.cu/images/thumb/4/49/B-614035.jpg/260px-B-614035.jpg",
            "headerTitle": "Nueva York",
            "headerSubtitle": "",
            "hintText": "Isaí Lara Mojica 9o \"B\"",
            "headerAttributionImage": "",
            "primaryText": "En la ciudad de Nueva York no hay como tal una vestimenta típica, sin embargo, la vestimenta con la que se conoce a Estados Unidos en el mundo es portar distintos trajes o vestidos con los colores de la bandera, los hombres suelen usar sombrero.",
            "textAlignment": "start",
            "titleText": "Vestimenta Típica"
        }
    }
};

const createDirectivePayloadTRAJE = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};

const SampleAPLRequestHandlerTRAJE = {
    canHandle(handlerInput) {
        // handle named intent
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'TrajesIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const trajesMessage = requestAttributes.t('TRAJES_MESSAGE');
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirectiveTRAJE = createDirectivePayload(DOCUMENT_IDTRAJE, datasourceTRAJE);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirectiveTRAJE);
        }

        // send out skill response
        return handlerInput.responseBuilder
            .speak(trajesMessage)
            .reprompt(trajesMessage)
            .getResponse();
    }
};

//COMIDA
const DOCUMENT_IDCOMIDA = "ComidaAPL";

const datasourceCOMIDA = {
    "detailImageRightData": {
        "type": "object",
        "objectId": "detailImageRightSample",
        "backgroundImage": {
            "contentDescription": null,
            "smallSourceUrl": null,
            "largeSourceUrl": null,
            "sources": [
                {
                    "url": "https://d2o906d8ln7ui1.cloudfront.net/images/templates_v3/detail/DetailListBackground_Dark.png",
                    "size": "large"
                }
            ]
        },
        "title": "Comida de Nueva York",
        "subtitle": "",
        "image": {
            "contentDescription": "",
            "smallSourceUrl": null,
            "largeSourceUrl": null,
            "sources": [
                {
                    "url": "https://static.anuevayork.com/wp-content/uploads/2020/04/27233604/Las-comidas-tipicas-de-Nueva-York-Hot-dogs-pretzels-bagels.jpg",
                    "size": "large"
                }
            ]
        },
        "textContent": {
            "primaryText": {
                "type": "PlainText",
                "text": "Comida Internacional"
            },
            "rating": {
                "number": 5,
                "text": "100"
            },
            "locationText": {
                "type": "PlainText",
                "text": ""
            },
            "secondaryText": {
                "type": "PlainText",
                "text": "<br><br>La ciudad de Nueva York es rica en cultura, como tal no tiene una comida típica, sino que al ser una mezcla de culturas, sus comidas provienen de todos lados, ya que Nueva York recibía inmigrantes de todos los países."
            }
        },
        "buttons": [
            {
                "text": ""
            },
            {
                "text": ""
            }
        ],
        "logoUrl": ""
    }
};

const createDirectivePayloadCOMIDA = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};

const SampleAPLRequestHandlerCOMIDA = {
    canHandle(handlerInput) {
        // handle named intent
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ComidaIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const comidaMessage = requestAttributes.t('COMIDA_MESSAGE');
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload(DOCUMENT_IDCOMIDA, datasourceCOMIDA);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

        // send out skill response
        return handlerInput.responseBuilder
            .speak(comidaMessage)
            .reprompt(comidaMessage)
            .getResponse();
    }
};

//PERSONAJE

const DOCUMENT_IDPER = "Persona";

const datasourcePER = {
    "simpleTextTemplateData": {
        "type": "object",
        "properties": {
            "backgroundImage": "https://d2o906d8ln7ui1.cloudfront.net/images/response_builder/background-green.png",
            "foregroundImageLocation": "left",
            "foregroundImageSource": "https://cdn-p.smehost.net/sites/5b3bac59eb36401694af3a241173447f/wp-content/uploads/2018/08/foto_de_jennifer-lopez-2.jpg",
            "headerTitle": "Personaje Sobresaliente de Nueva York",
            "headerSubtitle": "",
            "hintText": "Isaí Lara Mojica 9o \"B\"",
            "headerAttributionImage": "",
            "primaryText": "<br>24 de julio de 1969 <br><br> Jennifer Lynn Affleck​ es una cantante, compositora, bailarina, actriz, diseñadora de moda y empresaria estadounidense de origen puertorriqueño. Su interés para llegar a la fama surgió de tener un papel secundario en la película My Little Girl.",
            "textAlignment": "start",
            "titleText": "Jennifer Lopez"
        }
    }
};

const createDirectivePayloadPER = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};

const SampleAPLRequestHandlerPER = {
    canHandle(handlerInput) {
        // handle named intent
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'PersonajeIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const personajeMessage = requestAttributes.t('PERSONAJE_MESSAGE');
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirectivePER = createDirectivePayload(DOCUMENT_IDPER, datasourcePER);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirectivePER);
        }

        // send out skill response
        return handlerInput.responseBuilder
            .speak(personajeMessage)
            .reprompt(personajeMessage)
            .getResponse();
    }
};



const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Hello World!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

// This request interceptor will log all incoming requests to this lambda
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};

// This response interceptor will log all outgoing responses of this lambda
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
      console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

// This request interceptor will bind a translation function 't' to the requestAttributes.
const LocalizationInterceptor = {
  process(handlerInput) {
    let locale = handlerInput.requestEnvelope.request.locale;
    const localizationClient = i18n.use(sprintf).init({
      lng: locale,
      fallbackLng: 'en', // Specify fallback language
      resources: languageStrings,
      returnObjects: true,
      debug: true // Set to false in production
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = (...args) => localizationClient.t(...args);
  }
};



/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()

    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        VideoIntentHandler,
        SampleAPLRequestHandlerTUR,
        SampleAPLRequestHandlerMUS,
        SampleAPLRequestHandlerTRAJE,
        SampleAPLRequestHandlerCOMIDA,
        SampleAPLRequestHandlerPER,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(LoggingRequestInterceptor, LocalizationInterceptor)
    .addResponseInterceptors(LoggingResponseInterceptor)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();