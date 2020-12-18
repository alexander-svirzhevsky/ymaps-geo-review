const database = {
    "52.09, 23.71": [
        { name: '111', place: '111', date: '12.12.2020', text: '1111' },
        { name: '222', place: '222', date: '12.12.2020', text: '2222' },
    ],
    "52.10, 23.72": [
        { name: "dasdsadsaй", place: "asddsa", text: "dsasdadsa" },
    ],
};

localStorage.setItem('placemarks', JSON.stringify(database));


function _toString(coords) {
    if (Array.isArray(coords)) {
        coords = coords.join(",");
    }

    return coords;
}

function getPlacmarks() {
    return new Promise(resolve => {
        resolve(JSON.parse(localStorage.getItem('placemarks')));
    });
}

async function getPlacmark(coords) {
    coords = _toString(coords);

    const placemarks = JSON.parse(localStorage.getItem('placemarks'));
    const placemark = placemarks[coords] ? placemarks[coords] : null;

    return new Promise(resolve => {
        resolve(placemark)
    });
}

async function setPlacmark(coords, payload) {
    coords = _toString(coords);

    const placemarks = JSON.parse(localStorage.getItem('placemarks'));
    let status = false;

    if (placemarks[coords]) {
        placemarks[coords].push(payload);
    } else {
        placemarks[coords] = [payload];
        status = true;
    }

    return new Promise(resolve => {
        localStorage.setItem('placemarks', JSON.stringify(placemarks));
        resolve(status ? { [coords]: placemarks[coords] } : null);
    });
}

module.exports = {
    getPlacmarks,
    getPlacmark,
    setPlacmark
}