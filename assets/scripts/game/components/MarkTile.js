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
        tileKind: {
            get: function () {
                return Enum.TileKind.Mark;
            },
            type: Enum.TileKind,
            override: true,
            tooltip: "kind of tile"
        },

        figuresAtlas: {
            default: null,
            type: cc.SpriteAtlas
        },

        value: {
            get: function () {
                return this._value;
            },
            set: function (value) {
                this._value = value;
                let dimension = value.split("_").pop();
                dimension = dimension.split("x");
                this.gridWidth = parseInt(dimension[0]);
                this.gridHeight = parseInt(dimension[1]);
                this.node.getComponent(cc.Sprite).spriteFrame = this.figuresAtlas.getSpriteFrame(value);
            },
            override: true,
            visible: false
        },

        topBoxNodePosition: {
            default: null,
            type: cc.v2,
            visible: false
        }
    },

    // use this for initialization
    onLoad: function () {
        this.dx = 1;
        this.dy = 1;

    },

    showCollectBoxAction: function () {
        let topBoxNode = cc.find("Canvas/ui_nodes/top_status_area/top_1/box_group");
        let uiNode = cc.find("Canvas/ui_nodes");
        let topBoxPos = Global.transformCoordinates(topBoxNode, uiNode);
        let nodeWorldPos = Global.transformCoordinates(this.node, uiNode);
        nodeWorldPos = cc.v2(nodeWorldPos.x + Constants.TileSize * this.gridWidth / 2, nodeWorldPos.y + Constants.TileSize * this.gridHeight / 2);
        this.node.removeFromParent(false);
        uiNode.addChild(this.node);
        this.node.x = nodeWorldPos.x;
        this.node.y = nodeWorldPos.y;
        this.node.setAnchorPoint(0.5, 0.5);
        let seq = cc.sequence(
            cc.spawn(
                cc.scaleTo(0.7, 1.5),
                cc.sequence(
                    cc.rotateTo(0.3, 5),
                    cc.rotateTo(0.3, -5),
                    cc.rotateTo(0.1, 0)
                )
            ),
            cc.spawn(
                cc.moveTo(1.0, topBoxPos).easing(cc.easeSineIn()),
                cc.scaleTo(1.0, 0.3)
            ),
            cc.callFunc(this.notifyMarkCollected, this),
            cc.removeSelf(true)
        );
        this.node.emit(Constants.MARK_COLLECTED, {col:this.gridPosition.x, row: this.gridPosition.y, delayTime: 1.75});
        this.node.runAction(seq);
    },

    notifyMarkCollected: function () {

    },

    crushTile: function () {
        this.showCollectBoxAction();
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
