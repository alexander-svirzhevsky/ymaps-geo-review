/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/main.scss":
/*!***********************!*\
  !*** ./src/main.scss ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://ymap/./src/main.scss?");

/***/ }),

/***/ "./src/js/api.js":
/*!***********************!*\
  !*** ./src/js/api.js ***!
  \***********************/
/***/ ((module) => {

eval("const database = {\r\n    \"52.09, 23.71\": [\r\n        { name: '111', place: '111', date: '12.12.2020', text: '1111' },\r\n        { name: '222', place: '222', date: '12.12.2020', text: '2222' },\r\n    ],\r\n    \"52.10, 23.72\": [\r\n        { name: \"dasdsadsaй\", place: \"asddsa\", text: \"dsasdadsa\" },\r\n    ],\r\n};\r\n\r\nlocalStorage.setItem('placemarks', JSON.stringify(database));\r\n\r\n\r\nfunction _toString(coords) {\r\n    if (Array.isArray(coords)) {\r\n        coords = coords.join(\",\");\r\n    }\r\n\r\n    return coords;\r\n}\r\n\r\nfunction getPlacmarks() {\r\n    return new Promise(resolve => {\r\n        resolve(JSON.parse(localStorage.getItem('placemarks')));\r\n    });\r\n}\r\n\r\nasync function getPlacmark(coords) {\r\n    coords = _toString(coords);\r\n\r\n    const placemarks = JSON.parse(localStorage.getItem('placemarks'));\r\n    const placemark = placemarks[coords] ? placemarks[coords] : null;\r\n\r\n    return new Promise(resolve => {\r\n        resolve(placemark)\r\n    });\r\n}\r\n\r\nasync function setPlacmark(coords, payload) {\r\n    coords = _toString(coords);\r\n\r\n    const placemarks = JSON.parse(localStorage.getItem('placemarks'));\r\n    let status = false;\r\n\r\n    if (placemarks[coords]) {\r\n        placemarks[coords].push(payload);\r\n    } else {\r\n        placemarks[coords] = [payload];\r\n        status = true;\r\n    }\r\n\r\n    return new Promise(resolve => {\r\n        localStorage.setItem('placemarks', JSON.stringify(placemarks));\r\n        resolve(status ? { [coords]: placemarks[coords] } : null);\r\n    });\r\n}\r\n\r\nmodule.exports = {\r\n    getPlacmarks,\r\n    getPlacmark,\r\n    setPlacmark\r\n}\n\n//# sourceURL=webpack://ymap/./src/js/api.js?");

/***/ }),

/***/ "./src/js/createCustom.js":
/*!********************************!*\
  !*** ./src/js/createCustom.js ***!
  \********************************/
/***/ ((module) => {

eval("function createCustomBalloon() {\r\n    const customBalloon = document.getElementById('customBalloonTemplate').innerHTML;\r\n    const balloonTemplate = ymaps.templateLayoutFactory.createClass(customBalloon);\r\n    ymaps.layout.storage.add('my#customBallon', balloonTemplate);\r\n}\r\n\r\nfunction createCustomClusterer() {\r\n    const customClusterer = document.getElementById('customClustererItemLayout').innerHTML;\r\n    const clustererItemLayout = ymaps.templateLayoutFactory.createClass(customClusterer);\r\n    ymaps.layout.storage.add('my#clustererItemLayout', clustererItemLayout);\r\n}\r\n\r\nmodule.exports = {\r\n    createCustomBalloon,\r\n    createCustomClusterer\r\n}\n\n//# sourceURL=webpack://ymap/./src/js/createCustom.js?");

/***/ }),

/***/ "./src/js/dom.js":
/*!***********************!*\
  !*** ./src/js/dom.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const api = __webpack_require__(/*! ./api.js */ \"./src/js/api.js\");\r\n\r\nasync function getForm() {\r\n    const comments = document.querySelector('[data-role=review-comments]');\r\n    const form = document.querySelector('[data-role=review-form]');\r\n    const name = form.querySelector('[data-role=review-name]');\r\n    const place = form.querySelector('[data-role=review-place]');\r\n    const text = form.querySelector('[data-role=review-text]');\r\n    const button = form.querySelector('[data-role=review-submit]');\r\n\r\n    const review = {\r\n        name: name.value,\r\n        place: place.value,\r\n        text: text.value,\r\n        date: new Date().toISOString().split(\"T\")[0].split(\"-\").reverse().join(\".\")\r\n    }\r\n\r\n    if (!review.name || !review.place || !review.text) {\r\n        return null;\r\n    }\r\n\r\n    const div = document.createElement('div');\r\n\r\n    div.innerHTML = `\r\n    <div class=\"comments__comment\">\r\n      <div>\r\n        <strong>${review.name}</strong>\r\n        <span>${review.place}</span>\r\n      </div>\r\n      <small>${review.date}</small>\r\n    </div>\r\n    <div>${review.text}</div>\r\n  `;\r\n\r\n    comments.append(div);\r\n    comments.scrollTo(0, comments.scrollHeight);\r\n\r\n    const response = await api.setPlacmark(button.dataset.coords, review)\r\n\r\n    name.value = place.value = text.value = \"\";\r\n\r\n    return response;\r\n}\r\n\r\nmodule.exports = {\r\n    getForm\r\n}\n\n//# sourceURL=webpack://ymap/./src/js/dom.js?");

/***/ }),

/***/ "./src/js/events.js":
/*!**************************!*\
  !*** ./src/js/events.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const interactiveMap = __webpack_require__(/*! ./interactiveMap */ \"./src/js/interactiveMap.js\");\r\nconst dom = __webpack_require__(/*! ./dom */ \"./src/js/dom.js\");\r\n\r\nfunction onMapClick(e) {\r\n    const coords = e.get('coords');\r\n\r\n    interactiveMap.openBalloon(coords);\r\n}\r\n\r\nfunction onGeoObjectsClick(e) {\r\n    const target = e.get('target');\r\n    const coords = target.geometry.getCoordinates();\r\n    const geoObjects = target.properties.get('geoObjects');\r\n\r\n    if (!geoObjects) {\r\n        interactiveMap.openBalloon(coords);\r\n    } else {\r\n        interactiveMap.openClusterer(target);\r\n    }\r\n\r\n}\r\n\r\nasync function onDomClick(e) {\r\n    e.preventDefault();\r\n\r\n    switch (e.target.dataset.role) {\r\n        case 'review-close':\r\n            ymaps.map.balloon.close();\r\n            break;\r\n        case 'clusterer-link':\r\n            const coords = e.target.dataset.coords.split(\",\");\r\n            interactiveMap.openBalloon(coords)\r\n            break;\r\n        case 'review-submit':\r\n            const response = await dom.getForm();\r\n\r\n            if (response) {\r\n                interactiveMap.createPlacemarks(response)\r\n            }\r\n            break;\r\n    }\r\n}\r\n\r\nfunction click() {\r\n    ymaps.map.events.add('click', onMapClick);\r\n    ymaps.map.geoObjects.events.add('click', onGeoObjectsClick);\r\n    document.body.addEventListener('click', onDomClick);\r\n}\r\n\r\nmodule.exports = {\r\n    click\r\n}\n\n//# sourceURL=webpack://ymap/./src/js/events.js?");

/***/ }),

/***/ "./src/js/interactiveMap.js":
/*!**********************************!*\
  !*** ./src/js/interactiveMap.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const api = __webpack_require__(/*! ./api */ \"./src/js/api.js\");\r\n\r\nfunction clusterer() {\r\n    ymaps.clusterer = new ymaps.Clusterer({\r\n        clusterDisableClickZoom: true,\r\n        clusterOpenBalloonOnClick: false,\r\n        clusterBalloonContentLayout: 'cluster#balloonCarousel',\r\n        clusterBalloonItemContentLayout: 'my#clustererItemLayout'\r\n    })\r\n\r\n    ymaps.map.geoObjects.add(ymaps.clusterer);\r\n}\r\n\r\n\r\nfunction createPlacemarks(placemarks = {}) {\r\n    for (const placemark in placemarks) {\r\n        const coords = placemark.split(',');\r\n        const data = placemarks[placemark];\r\n\r\n        ymaps.clusterer.add(new ymaps.Placemark(coords, data))\r\n    }\r\n\r\n}\r\n\r\nfunction map(container) {\r\n    container.innerHTML = '';\r\n    ymaps.map = new ymaps.Map(container, {\r\n        center: [52.09, 23.71],\r\n        zoom: 13,\r\n        controls: ['zoomControl'],\r\n        behaviors: ['drag']\r\n    });\r\n}\r\n\r\nasync function openBalloon(coords) {\r\n    ymaps.map.balloon.open(coords, 'загрузка...', { closeButton: true });\r\n\r\n    const comments = await api.getPlacmark(coords);\r\n    const address = await geoCoder(coords);\r\n    const data = {\r\n        address,\r\n        coords,\r\n        comments\r\n    }\r\n\r\n    ymaps.map.balloon.open(coords, data, { layout: 'my#customBallon' })\r\n}\r\n\r\nasync function openClusterer(target) {\r\n    const coords = target.geometry.getCoordinates();\r\n\r\n    ymaps.map.balloon.open(coords, 'Загрузка...', { closeButton: false });\r\n\r\n    const geoObjects = target.getGeoObjects();\r\n\r\n    for (const geoObject of geoObjects) {\r\n        const coords = geoObject.geometry.getCoordinates();\r\n        const comments = await api.getPlacmark(coords);\r\n        const address = await geoCoder(coords);\r\n\r\n        geoObject.properties.set(\"comments\", comments);\r\n        geoObject.properties.set(\"address\", address);\r\n        geoObject.properties.set(\"coords\", coords);\r\n    }\r\n\r\n    ymaps.clusterer.balloon.open(target);\r\n}\r\n\r\n\r\nasync function geoCoder(coords) {\r\n    const geocoder = await new ymaps.geocode(coords, { result: 1 });\r\n    return geocoder.geoObjects.get(0).properties.get('name');\r\n}\r\n\r\n\r\nmodule.exports = {\r\n    clusterer,\r\n    createPlacemarks,\r\n    openBalloon,\r\n    geoCoder,\r\n    map,\r\n    openClusterer\r\n} \n\n//# sourceURL=webpack://ymap/./src/js/interactiveMap.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const container = document.querySelector('#map');\r\nconst interactiveMap = __webpack_require__(/*! ./js/interactiveMap */ \"./src/js/interactiveMap.js\");\r\nconst events = __webpack_require__(/*! ./js/events */ \"./src/js/events.js\");\r\nconst api = __webpack_require__(/*! ./js/api */ \"./src/js/api.js\");\r\nconst create = __webpack_require__(/*! ./js/createCustom */ \"./src/js/createCustom.js\");\r\n\r\n\r\nymaps.ready(async () => {\r\n  console.log('Ymaps ready');\r\n\r\n  create.createCustomClusterer();\r\n  create.createCustomBalloon();\r\n\r\n  try {\r\n    const placemarks = await api.getPlacmarks();\r\n\r\n    interactiveMap.map(container);\r\n    interactiveMap.clusterer();\r\n    interactiveMap.createPlacemarks(placemarks);\r\n\r\n    events.click();\r\n  } catch (error) {\r\n    console.log(error);\r\n  }\r\n\r\n  events.click();\r\n});\n\n//# sourceURL=webpack://ymap/./src/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./src/main.scss");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ 	__webpack_require__("./src/main.js");
/******/ })()
;