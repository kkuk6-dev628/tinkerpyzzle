
//noinspection JSUnresolvedFunction
const Enum = require("EnumTypes");
//noinspection JSUnresolvedFunction
const Constants = require("Constants");
//noinspection JSUnresolvedFunction
const Global = require("Global");

const Tile = cc.Class({
    extends: cc.Component,

    statics: {
        fogPool: null,

        mysteryCrushPool: null,

        mysteryCrushPrefab: null,

        mysteryPiecePool: null,

        mysteryPiecePrefab: null
    },

    properties: {
        tileKind: {
            get: function () {
                return this._tileKind;
            },
            set: function (value) {
                this._tileKind = value;
            },
            type: Enum.TileKind,
            visible: false,
            tooltip: "The kind of tile"
        },
        value: {
            get: function () {
                return this._value;
            },
            set: function (value) {
                this._value = value;
            },
            visible: false,
            tooltip: "The kind of tile"
        },

        gridPosition:{
            get: function () {
                return this._gridPosition;
            },
            set: function (value) {
                this._gridPosition = value;
            },
            type: Object,
            visible: false,
            tooltip: "Grid position, x is col and y is row."
        },
        isMovable: {
            default: true,
            visible: false
        },

        isNearbyAffect:{
            default: false,
            visible: false
        },

        isPendingAction:{
            default: false,
            visible: false
        },
    },

    // use this for initialization
    onLoad: function () {

    },

    crushTile: function () {
        this.isPendingAction = true;

        // cc.info("count_stone", "start remove");
        this.node.getComponent(cc.Sprite).spriteFrame = null;
        this.showCrushAnimation();
        // let animation = this.node.getChildByName("crush").getComponent(cc.Animation);
        // animation.play(this.tileKind + "_crush");
        this.node.emit(Constants.FIGURE_DESTROYED, {col:this.gridPosition.x, row: this.gridPosition.y});
        setTimeout(() => {
            // this.node.removeFromParent(true);
            this.node.destroy();
        }, 0.5 * 1000);
    },

    createFog: function (parentNode) {
        let enemy = null;
        if (Tile.fogPool.size() > 0) { // use size method to check if there're nodes available in the pool
            enemy = Tile.fogPool.get();
        } else { // if not enough node in the pool, we call cc.instantiate to create node
            let fogNode = cc.find("Canvas/game_mask/animation/fog");
            enemy = cc.instantiate(fogNode);
        }
        enemy.parent = parentNode; // add new enemy node to the node tree
        return enemy;
    },

    recycleFog: function (fogNode) {
        Tile.fogPool.put(fogNode);
    },

    showCrushAnimation: function () {

    },

    showFog: function () {
        let animationNode = cc.find("Canvas/game_mask/animation");
        let fogNode = this.createFog(animationNode);
        let pos = Global.transformCoordinates(this.node, animationNode);
        // fogNode = cc.instantiate(fogNode);
        fogNode.x = pos.x + Constants.TileSize / 2;
        fogNode.y = pos.y + Constants.TileSize / 2;
        fogNode.active = true;
        fogNode.setOpacity(64);
        // animationNode.addChild(fogNode);
        let seq = cc.sequence(
            cc.spawn(
                cc.scaleTo(0.1, 1.5, 1.5),
                cc.fadeIn(0.1)
            ),
            cc.spawn(
                cc.scaleTo(0.5, 2.5, 2.5),
                cc.fadeOut(0.5)
            ),
            cc.callFunc(this.recycleFog, fogNode)
        );
        fogNode.runAction(seq);
    },

    copyTile: function(tile){
        if(tile && tile.tileKind){
            this.gridPosition = tile.gridPosition;
            // this.tileKind = tile.tileKind;
            this.isMovable = tile.isMovable;
            this.isNearbyAffect = tile.isNearbyAffect;
            this.isPendingAction = tile.isPendingAction;
        }
    }
});
