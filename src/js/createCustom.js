function createCustomBalloon() {
    const customBalloon = document.getElementById('customBalloonTemplate').innerHTML;
    const balloonTemplate = ymaps.templateLayoutFactory.createClass(customBalloon);
    ymaps.layout.storage.add('my#customBallon', balloonTemplate);
}

function createCustomClusterer() {
    const customClusterer = document.getElementById('customClustererItemLayout').innerHTML;
    const clustererItemLayout = ymaps.templateLayoutFactory.createClass(customClusterer);
    ymaps.layout.storage.add('my#clustererItemLayout', clustererItemLayout);
}

module.exports = {
    createCustomBalloon,
    createCustomClusterer
}