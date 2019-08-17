const Alexa = require("ask-sdk-core");
const axios = require("axios");

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "LaunchRequest";
  },
  handle(handlerInput) {
    const speechText = "Olá, que tal ouvir uma boa frase? É só pedir!";
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  }
};
const QuoteIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "QuoteIntent"
    );
  },
  async handle(handlerInput) {
    const speechText = await axios
      .get("server url") // Insert here the server url
      .then(res => {
        return res.data;
      })
      .catch(err => console.error);

    return (
      handlerInput.responseBuilder
        .speak(speechText)
        .getResponse()
    );
  }
};
const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      handlerInput.requestEnvelope.request.intent.name === "AMAZON.HelpIntent"
    );
  },
  handle(handlerInput) {
    const speechText = "É simples. Basta pedir uma frase e eu lhe darei!";

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  }
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      handlerInput.requestEnvelope.request.type === "IntentRequest" &&
      (handlerInput.requestEnvelope.request.intent.name ===
        "AMAZON.CancelIntent" ||
        handlerInput.requestEnvelope.request.intent.name ===
          "AMAZON.StopIntent")
    );
  },
  handle(handlerInput) {
    const speechText = "Tchauzinho!";
    return handlerInput.responseBuilder.speak(speechText).getResponse();
  }
};
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "SessionEndedRequest";
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder.getResponse();
  }
};

const IntentReflectorHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === "IntentRequest";
  },
  handle(handlerInput) {
    const intentName = handlerInput.requestEnvelope.request.intent.name;
    const speechText = `You just triggered ${intentName}`;

    return (
      handlerInput.responseBuilder
        .speak(speechText)
        .getResponse()
    );
  }
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`~~~~ Error handled: ${error.message}`);
    const speechText = `Ai, me desculpa. Eu não consegui entender, você poderia falar outra vez?.`;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .getResponse();
  }
};

exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    QuoteIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
