
//noinspection JSUnresolvedFunction
const Enum = require("EnumTypes");
//noinspection JSUnresolvedFunction
const Global = require("Global");
//noinspection JSUnresolvedFunction
const Constants = require("Constants");
//noinspection JSUnresolvedFunction
const Tile = require("Tile");

cc.Class({
    extends: Tile,

    properties: {

        gridWidth:{
            default: 2
        },

        gridHeight: {
            default: 2
        },

        dx: {
            default: 1
        },

        dy: {
            default: -1
        },
    },

    // use this for initialization
    onLoad: function () {

    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
