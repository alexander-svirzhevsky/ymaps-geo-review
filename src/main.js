const container = document.querySelector('#map');
const interactiveMap = require('./js/interactiveMap');
const events = require('./js/events');
const api = require('./js/api');
const create = require('./js/createCustom');


ymaps.ready(async () => {
  console.log('Ymaps ready');

  create.createCustomClusterer();
  create.createCustomBalloon();

  try {
    const placemarks = await api.getPlacmarks();

    interactiveMap.map(container);
    interactiveMap.clusterer();
    interactiveMap.createPlacemarks(placemarks);

    events.click();
  } catch (error) {
    console.log(error);
  }

  events.click();
});