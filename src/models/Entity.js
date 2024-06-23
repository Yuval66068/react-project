var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Top-most class in the app
// This class includes all GENERIC methods and properties that can be use by all entities in the system
var Entity = function () {
    function Entity() {
        _classCallCheck(this, Entity);
    }

    _createClass(Entity, [{
        key: "updateField",
        value: function updateField(fieldName, value) {
            // The following static method checks if a 'fieldName' exists (declared), if so, set the value to it
            if (Object.hasOwnProperty.call(this, fieldName)) this[fieldName] = value;
        }
    }, {
        key: "generateUID",
        value: function generateUID() {
            this.id = Math.floor(Math.random() * 1000000);
        }
    }]);

    return Entity;
}();

export default Entity;