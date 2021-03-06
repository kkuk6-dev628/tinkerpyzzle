//noinspection JSUnresolvedFunction
const Enum = require("EnumTypes");
//noinspection JSUnresolvedFunction
const Global = require("Global");
//noinspection JSUnresolvedFunction
const Constants = require("Constants");
//noinspection JSUnresolvedFunction
const LargeTile = require("LargeTile");

cc.Class({
    extends: LargeTile,

    properties: {
        pieLevel: {
            default: 0,
            visible: false
        },

        isNearbyAffect: {
            default: true,
            override: true,
            visible: false
        },

        matchId: {
            default: -1,
            override: true,
            visible: false
        },

        prevMatchId: {
            default: -1,
            override: true,
            visible: false
        },

        textureAtlas: {
            default: null,
            type: cc.SpriteAtlas
        }
    },

    // use this for initialization
    onLoad: function () {
        this.dx = 1;
        this.dy = 1;
        this.isNearbyAffect = true;
        this.isMovable = false;
    },

    pieLevelUp: function () {
        this.pieLevel++;
        let textureNode = this.node.getChildByName("bomb_rotation_0");
        textureNode.getComponent(cc.Sprite).spriteFrame = this.textureAtlas.getSpriteFrame(`bomb_rotation_${this.pieLevel}`);
    },

    showPieAnimation: function () {
        this.node.getChildByName("bomb_rotation_0").active = false;
        let uiNode = cc.find("Canvas/ui_nodes");
        let animNode = this.node.getChildByName("color_pie_node");
        let pos = Global.transformCoordinates(animNode, uiNode);
        animNode.removeFromParent(false);
        uiNode.addChild(animNode);
        animNode.x = pos.x;
        animNode.y = pos.y;
        animNode.active = true;
        animNode.getComponent(cc.Animation).play();
        setTimeout(() => {
            //noinspection JSUnresolvedFunction
            this.node.emit(Constants.COLOR_PIE_FULL, {col: this.gridPosition.x, row: this.gridPosition.y});
        }, 2.5 * 1000);
        setTimeout(() => {
            animNode.active = false;
            // this.pieLevelUp();
            animNode.destroy();
            this.node.destroy();
        }, 3.5 * 1000);
    },

    crushTile: function () {
        if(this.prevMatchId != this.matchId) {
            this.prevMatchId = this.matchId;
            this.pieLevelUp();
            if (this.pieLevel >= 8) {
                this.pieLevel = -1;
                this.showPieAnimation();
            }
        }
    }
});
