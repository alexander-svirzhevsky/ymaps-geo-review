const api = require("./api");

function clusterer() {
    ymaps.clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: false,
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
        clusterBalloonItemContentLayout: 'my#clustererItemLayout'
    })

    ymaps.map.geoObjects.add(ymaps.clusterer);
}


function createPlacemarks(placemarks = {}) {
    for (const placemark in placemarks) {
        const coords = placemark.split(',');
        const data = placemarks[placemark];

        ymaps.clusterer.add(new ymaps.Placemark(coords, data))
    }

}

function map(container) {
    container.innerHTML = '';
    ymaps.map = new ymaps.Map(container, {
        center: [52.09, 23.71],
        zoom: 13,
        controls: ['zoomControl'],
        behaviors: ['drag']
    });
}

async function openBalloon(coords) {
    ymaps.map.balloon.open(coords, 'загрузка...', { closeButton: true });

    const comments = await api.getPlacmark(coords);
    const address = await geoCoder(coords);
    const data = {
        address,
        coords,
        comments
    }

    ymaps.map.balloon.open(coords, data, { layout: 'my#customBallon' })
}

async function openClusterer(target) {
    const coords = target.geometry.getCoordinates();

    ymaps.map.balloon.open(coords, 'Загрузка...', { closeButton: false });

    const geoObjects = target.getGeoObjects();

    for (const geoObject of geoObjects) {
        const coords = geoObject.geometry.getCoordinates();
        const comments = await api.getPlacmark(coords);
        const address = await geoCoder(coords);

        geoObject.properties.set("comments", comments);
        geoObject.properties.set("address", address);
        geoObject.properties.set("coords", coords);
    }

    ymaps.clusterer.balloon.open(target);
}


async function geoCoder(coords) {
    const geocoder = await new ymaps.geocode(coords, { result: 1 });
    return geocoder.geoObjects.get(0).properties.get('name');
}


module.exports = {
    clusterer,
    createPlacemarks,
    openBalloon,
    geoCoder,
    map,
    openClusterer
} 