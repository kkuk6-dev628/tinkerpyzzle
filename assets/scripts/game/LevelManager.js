
//noinspection JSUnresolvedFunction
const Enum = require("EnumTypes");
//noinspection JSUnresolvedFunction
const LevelInfo = require("LevelInfo");

cc.Class({
    extends: cc.Component,

    properties: {
        levelInfo: {
            default: null,
            type: LevelInfo
        }
    },

    // use this for initialization
    onLoad: function () {

    },

    loadLevel: function(levelNumber, callback){
        var levelFileName = 'level1-' + levelNumber + '.json';
        var url = cc.url.raw( 'resources/data/levels/' + levelFileName );
        cc.loader.load( url, function( err, res)
        {
            cc.log( 'load['+ url +'], err['+err+'] result: ' + JSON.stringify( res ) );
            callback(res);
        });
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
