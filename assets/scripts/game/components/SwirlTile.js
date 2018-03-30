
//noinspection JSUnresolvedFunction
const Enum = require("EnumTypes");
//noinspection JSUnresolvedFunction
const Constants = require("Constants");
//noinspection JSUnresolvedFunction
const FigureTile = require("FigureTile");
//noinspection JSUnresolvedFunction
const Global = require("Global");

cc.Class({
    extends: FigureTile,

    editor: {
        requireComponent: sp.Skeleton
    },

    properties: {
        figure: {
            get: function () {
                return this._figure;
            },
            set: function (value) {
                this._figure = value;
                let levelNumber = parseInt(value.split("_").pop());
                if(isNaN(levelNumber)) {
                    levelNumber = 1;
                }
                this.swirlLevel = levelNumber;
            },
            type: cc.String,
            override: true,
            visible: false,
            tooltip: "The figure name of tile"
        },

        tileKind: {
            get: function () {
                return Enum.TileKind.Swirl;
            },
            type: Enum.TileKind,
            override: true,
            tooltip: "kind of tile"
        },

        isMatchable: {
            default: false,
            override: true,
            visible: false,
            tooltip: "whether or not this tile can make match."
        },

        isNearbyAffect:{
            default: true,
            override: true,
            visible: false
        },

        swirlLevel: {
            get: function () {
                return this._swirlLevel;
            },
            set: function (value) {
                let spriteName = value == 1 ? "swirl" : "swirl_" + value;
                this.node.getComponent(cc.Sprite).spriteFrame = this.figuresAtlas.getSpriteFrame(spriteName);
                this._swirlLevel = value;
            },
            type: cc.String,
            override: true,
            visible: false,
            tooltip: "The figure name of tile"
        },
    },

    // use this for initialization
    onLoad: function () {
        this._super();
    },

    reuse: function () {
        if(this.node){
            this.isPendingAction = false;
            let figureSprite = this.node.getComponent(cc.Sprite);
            if (figureSprite){
                figureSprite.setVisible(true);
            }
        }
        this.isMovable = true;
        this.isMatchable = false;
        this.isNearbyAffect = true;
        this.isChainHold = false;
    },

    showCrushAnimation: function () {
        let effectsNode = this.node.getChildByName('effects');
        effectsNode.active = true;
        let crushSpine = effectsNode.getComponent('sp.Skeleton');
        let anim = crushSpine.setAnimation(0, 'effect_pot', false);
        // anim.timeScale = 2;

        setTimeout(() => {
            effectsNode.active = false;
        }, 0.35 * 1000);
    },

    getNearbyDefault: function () {
        return true;
    },

    getMatchableDefault: function () {
        return false;
    },

    restoreDefaultFlags: function () {
        this.isMovable = true;
        this.isMatchable = false;
        this.isNearbyAffect = true;
        this.nearbyCheck = false;
    },

    crushTile: function () {
        let self = this;
        if(this.freeChain() && this.crushMystery() && this.crushMilk() && this.crushSnake()) {
            if (this.swirlLevel <= 1) {
                this.isPendingAction = true;
                if (self.node) {
                    let figureSprite = self.node.getComponent(cc.Sprite);
                    if (figureSprite) {
                        figureSprite.setVisible(false);
                    }
                }
                this.showCrushAnimation();
                // cc.info(this, "crushTile");
                self.node.emit(Constants.FIGURE_DESTROYED, {col: self.gridPosition.x, row: self.gridPosition.y, recycleDelay: 0.75});
            } else {
                let effectsNode = this.node.getChildByName('effects');
                effectsNode.active = true;
                let crushSpine = effectsNode.getComponent('sp.Skeleton');
                let anim = crushSpine.setAnimation(0, `effect_swirl_${this.swirlLevel}`, false);
                // anim.timeScale = 2;

                setTimeout(() => {
                    effectsNode.active = false;
                }, 0.35 * 1000);

                this.swirlLevel--;
            }
        }
    },
});
