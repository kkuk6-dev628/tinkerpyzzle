

//noinspection JSUnresolvedFunction
const Enum = require("EnumTypes");
//noinspection JSUnresolvedFunction
const Constants = require("Constants");
//noinspection JSUnresolvedFunction
const FigureTile = require("FigureTile");
//noinspection JSUnresolvedFunction
const Global = require("Global");

const ForceWay = cc.Class({
    extends: FigureTile,

    statics: {
        movingForceWay: 0,
    },

    properties: {
        forceWay:{
            default: "force_way_item",
            visible: false
        }
    },

    // use this for initialization
    onLoad: function () {
        this._super();

    },

    crushTile: function (foxPosition) {
        if(this.crushMilk() && this.freeChain() && this.crushMystery() && this.crushSnake() && this.crushGooBomb()) {
            if (!Global.PlayingLevel.levelCompleted) {
                this.node.emit(Constants.FORCE_WAY_COLLECTED, {col: this.gridPosition.x, row: this.gridPosition.y});
            }
            this.node.emit(Constants.FIGURE_DESTROYED, {col: this.gridPosition.x, row: this.gridPosition.y, recycleDelay: 0});
        }
    },

    setFigure: function (figure) {
        this.figure = figure;
        this.node.getComponent(cc.Sprite).spriteFrame = this.figuresAtlas.getSpriteFrame("force_way_item_" + figure);
    },
});
