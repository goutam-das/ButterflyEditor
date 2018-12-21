(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("opentok-ux-components", [], factory);
	else if(typeof exports === 'object')
		exports["opentok-ux-components"] = factory();
	else
		root["opentok-ux-components"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../../dist/app.js":
/*!*************************************************!*\
  !*** C:/Source/Projects/Deep-Draft/dist/app.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("(function webpackUniversalModuleDefinition(root, factory) {\n  if (true) module.exports = factory();else {}\n})(window, function () {\n  return (\n    /******/\n    function (modules) {\n      // webpackBootstrap\n\n      /******/\n      // install a JSONP callback for chunk loading\n\n      /******/\n      function webpackJsonpCallback(data) {\n        /******/\n        var chunkIds = data[0];\n        /******/\n\n        var moreModules = data[1];\n        /******/\n\n        var executeModules = data[2];\n        /******/\n\n        /******/\n        // add \"moreModules\" to the modules object,\n\n        /******/\n        // then flag all \"chunkIds\" as loaded and fire callback\n\n        /******/\n\n        var moduleId,\n            chunkId,\n            i = 0,\n            resolves = [];\n        /******/\n\n        for (; i < chunkIds.length; i++) {\n          /******/\n          chunkId = chunkIds[i];\n          /******/\n\n          if (installedChunks[chunkId]) {\n            /******/\n            resolves.push(installedChunks[chunkId][0]);\n            /******/\n          }\n          /******/\n\n\n          installedChunks[chunkId] = 0;\n          /******/\n        }\n        /******/\n\n\n        for (moduleId in moreModules) {\n          /******/\n          if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {\n            /******/\n            modules[moduleId] = moreModules[moduleId];\n            /******/\n          }\n          /******/\n\n        }\n        /******/\n\n\n        if (parentJsonpFunction) parentJsonpFunction(data);\n        /******/\n\n        /******/\n\n        while (resolves.length) {\n          /******/\n          resolves.shift()();\n          /******/\n        }\n        /******/\n\n        /******/\n        // add entry modules from loaded chunk to deferred list\n\n        /******/\n\n\n        deferredModules.push.apply(deferredModules, executeModules || []);\n        /******/\n\n        /******/\n        // run deferred modules when all chunks ready\n\n        /******/\n\n        return checkDeferredModules();\n        /******/\n      }\n\n      ;\n      /******/\n\n      function checkDeferredModules() {\n        /******/\n        var result;\n        /******/\n\n        for (var i = 0; i < deferredModules.length; i++) {\n          /******/\n          var deferredModule = deferredModules[i];\n          /******/\n\n          var fulfilled = true;\n          /******/\n\n          for (var j = 1; j < deferredModule.length; j++) {\n            /******/\n            var depId = deferredModule[j];\n            /******/\n\n            if (installedChunks[depId] !== 0) fulfilled = false;\n            /******/\n          }\n          /******/\n\n\n          if (fulfilled) {\n            /******/\n            deferredModules.splice(i--, 1);\n            /******/\n\n            result = __webpack_require__(__webpack_require__.s = deferredModule[0]);\n            /******/\n          }\n          /******/\n\n        }\n        /******/\n\n\n        return result;\n        /******/\n      }\n      /******/\n\n      /******/\n      // The module cache\n\n      /******/\n\n\n      var installedModules = {};\n      /******/\n\n      /******/\n      // object to store loaded and loading chunks\n\n      /******/\n      // undefined = chunk not loaded, null = chunk preloaded/prefetched\n\n      /******/\n      // Promise = chunk loading, 0 = chunk loaded\n\n      /******/\n\n      var installedChunks = {\n        /******/\n        \"main\": 0\n        /******/\n\n      };\n      /******/\n\n      /******/\n\n      var deferredModules = [];\n      /******/\n\n      /******/\n      // The require function\n\n      /******/\n\n      function __webpack_require__(moduleId) {\n        /******/\n\n        /******/\n        // Check if module is in cache\n\n        /******/\n        if (installedModules[moduleId]) {\n          /******/\n          return installedModules[moduleId].exports;\n          /******/\n        }\n        /******/\n        // Create a new module (and put it into the cache)\n\n        /******/\n\n\n        var module = installedModules[moduleId] = {\n          /******/\n          i: moduleId,\n\n          /******/\n          l: false,\n\n          /******/\n          exports: {}\n          /******/\n\n        };\n        /******/\n\n        /******/\n        // Execute the module function\n\n        /******/\n\n        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n        /******/\n\n        /******/\n        // Flag the module as loaded\n\n        /******/\n\n        module.l = true;\n        /******/\n\n        /******/\n        // Return the exports of the module\n\n        /******/\n\n        return module.exports;\n        /******/\n      }\n      /******/\n\n      /******/\n\n      /******/\n      // expose the modules object (__webpack_modules__)\n\n      /******/\n\n\n      __webpack_require__.m = modules;\n      /******/\n\n      /******/\n      // expose the module cache\n\n      /******/\n\n      __webpack_require__.c = installedModules;\n      /******/\n\n      /******/\n      // define getter function for harmony exports\n\n      /******/\n\n      __webpack_require__.d = function (exports, name, getter) {\n        /******/\n        if (!__webpack_require__.o(exports, name)) {\n          /******/\n          Object.defineProperty(exports, name, {\n            enumerable: true,\n            get: getter\n          });\n          /******/\n        }\n        /******/\n\n      };\n      /******/\n\n      /******/\n      // define __esModule on exports\n\n      /******/\n\n\n      __webpack_require__.r = function (exports) {\n        /******/\n        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {\n          /******/\n          Object.defineProperty(exports, Symbol.toStringTag, {\n            value: 'Module'\n          });\n          /******/\n        }\n        /******/\n\n\n        Object.defineProperty(exports, '__esModule', {\n          value: true\n        });\n        /******/\n      };\n      /******/\n\n      /******/\n      // create a fake namespace object\n\n      /******/\n      // mode & 1: value is a module id, require it\n\n      /******/\n      // mode & 2: merge all properties of value into the ns\n\n      /******/\n      // mode & 4: return value when already ns object\n\n      /******/\n      // mode & 8|1: behave like require\n\n      /******/\n\n\n      __webpack_require__.t = function (value, mode) {\n        /******/\n        if (mode & 1) value = __webpack_require__(value);\n        /******/\n\n        if (mode & 8) return value;\n        /******/\n\n        if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;\n        /******/\n\n        var ns = Object.create(null);\n        /******/\n\n        __webpack_require__.r(ns);\n        /******/\n\n\n        Object.defineProperty(ns, 'default', {\n          enumerable: true,\n          value: value\n        });\n        /******/\n\n        if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) {\n          return value[key];\n        }.bind(null, key));\n        /******/\n\n        return ns;\n        /******/\n      };\n      /******/\n\n      /******/\n      // getDefaultExport function for compatibility with non-harmony modules\n\n      /******/\n\n\n      __webpack_require__.n = function (module) {\n        /******/\n        var getter = module && module.__esModule ?\n        /******/\n        function getDefault() {\n          return module['default'];\n        } :\n        /******/\n        function getModuleExports() {\n          return module;\n        };\n        /******/\n\n        __webpack_require__.d(getter, 'a', getter);\n        /******/\n\n\n        return getter;\n        /******/\n      };\n      /******/\n\n      /******/\n      // Object.prototype.hasOwnProperty.call\n\n      /******/\n\n\n      __webpack_require__.o = function (object, property) {\n        return Object.prototype.hasOwnProperty.call(object, property);\n      };\n      /******/\n\n      /******/\n      // __webpack_public_path__\n\n      /******/\n\n\n      __webpack_require__.p = \"\";\n      /******/\n\n      /******/\n\n      var jsonpArray = window[\"webpackJsonpopentok_ux_components\"] = window[\"webpackJsonpopentok_ux_components\"] || [];\n      /******/\n\n      var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);\n      /******/\n\n      jsonpArray.push = webpackJsonpCallback;\n      /******/\n\n      jsonpArray = jsonpArray.slice();\n      /******/\n\n      for (var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);\n      /******/\n\n\n      var parentJsonpFunction = oldJsonpFunction;\n      /******/\n\n      /******/\n\n      /******/\n      // add entry module to deferred list\n\n      /******/\n\n      deferredModules.push([\"./app.tsx\", \"commons\"]);\n      /******/\n      // run deferred modules when ready\n\n      /******/\n\n      return checkDeferredModules();\n      /******/\n    }(\n    /************************************************************************/\n\n    /******/\n    [])\n  );\n});\n\n//# sourceURL=webpack://opentok-ux-components/C:/Source/Projects/Deep-Draft/dist/app.js?");

/***/ }),

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dist_app_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dist/app.js */ \"../../dist/app.js\");\n/* harmony import */ var _dist_app_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_dist_app_js__WEBPACK_IMPORTED_MODULE_0__);\n//Import Main Editor (Imports an EditorCrea)\nalert(\"shit ghahaha WHAT\");\n //const EditorCreator = require(\"../../dist/app\");\n\nvar editorContainer = document.getElementById(\"editor-root-container\"); //This will create and render the Editor Component into the target's id\n\n_dist_app_js__WEBPACK_IMPORTED_MODULE_0___default.a.createEditor(\"editor-root-container\").then(function (editorInstance) {\n  console.log(\"Current HTML: \", editorInstance.getExportedHTML());\n});\nconsole.log(\"testy ANOTHER ONE eee\");\n\n//# sourceURL=webpack://opentok-ux-components/./app.js?");

/***/ })

/******/ });
});