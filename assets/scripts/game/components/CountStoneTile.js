
//noinspection JSUnresolvedFunction
const Enum = require("EnumTypes");
//noinspection JSUnresolvedFunction
const Constants = require("Constants");
//noinspection JSUnresolvedFunction
const Tile = require("Tile");
//noinspection JSUnresolvedFunction
const Global = require("Global");

const CountStoneTile = cc.Class({
    extends: Tile,

    statics: {
        countStoneCrushPool: null
    },
    editor: {
        requireComponent: sp.Skeleton
    },

    properties: {
        countStoneCrushPrefab: {
            default: null,
            type: cc.Prefab
        },

        stoneLevel: {
            get: function () {
                return this._stoneLevel;
            },
            set: function (value) {
                let levelNumber = parseInt(value.split("_").pop());
                for(let i = 1; i <= 5; i++){
                    this.node.getChildByName("count_stone_pixel_" + i).active = i <= levelNumber;
                }
                this._stoneLevel = levelNumber;
            },
            type: cc.Integer,
            visible: false,
            tooltip: "The Number of red pixel"
        },
        tileKind: {
            get: function () {
                return Enum.TileKind.CountStone;
            },
            type: Enum.TileKind,
            override: true,
            tooltip: "kind of tile"
        },
        isMovable: {
            // get: function () {
            //     return this._isMovable;
            // },
            // set: function (value) {
            //     this._isMovable = value;
            // },
            default: false,
            override: true
        },

        isNearbyAffect:{
            // get: function () {
            //     return this._isNearbyAffect;
            // },
            // set: function (value) {
            //     this._isNearbyAffect = value;
            // },
            default: true,
            override: true
        },
    },

    // use this for initialization
    onLoad: function () {
        this._super();
    },

    getCountStoneCrush: function (parentNode) {
        let enemy = null;
        if (CountStoneTile.countStoneCrushPool.size() > 0) { // use size method to check if there're nodes available in the pool
            enemy = CountStoneTile.countStoneCrushPool.get();
        } else { // if not enough node in the pool, we call cc.instantiate to create node
            enemy = cc.instantiate(this.countStoneCrushPrefab);
        }
        enemy.parent = parentNode; // add new enemy node to the node tree
        let scaleX = Math.sign(0.5 - Math.random());
        enemy.setScale(scaleX, 1);
        enemy.x = 50;
        enemy.y = 10;
        return enemy;
    },

    recycleCountStoneCrush: function (countStoneCrush) {
        CountStoneTile.countStoneCrushPool.put(countStoneCrush);
    },

    crushTile: function () {
        let self = this;
        let pixelNode = this.node.getChildByName("count_stone_pixel_" + this.stoneLevel);
        // cc.info("count_stone", "start crush");
        if(this.stoneLevel == 1){
            this.node.getComponent(cc.Sprite).setVisible(false);
            this.node.getChildByName("count_stone_pixel_1").active = false;
            let stoneCrush = this.getCountStoneCrush(this.node.parent);
            stoneCrush.x = this.node.x + Constants.TileSize / 2;
            stoneCrush.y = this.node.y + Constants.TileSize / 2;
            let crushSpine = stoneCrush.getChildByName('count_stone').getComponent('sp.Skeleton');
            let anim = crushSpine.setAnimation(0, 'count_stone', false);
            anim.timeScale = 2;
            setTimeout(() => {
                this.recycleCountStoneCrush(stoneCrush);
            }, 0.5 * 1000);
        }
        else{
            let animation = pixelNode.getComponent(cc.Animation);
            animation.play("count_stone_" + this.stoneLevel);
            this.node.runAction(cc.sequence([cc.scaleTo(0.15, 1.1), cc.scaleTo(0.15, 1)]));
            // Global.AudioManager.playStoneCracksSFX();
        }

        if(this.stoneLevel > 1){
            this._stoneLevel--;
            setTimeout(function () {
                pixelNode.removeFromParent(true);
                // pixelNode.active = false;
                // pixelNode.destroy();
            }, 0.5 * 1000);
        }
        else{
            this.isPendingAction = true;
            this.node.emit(Constants.FIGURE_DESTROYED, {col:this.gridPosition.x, row: this.gridPosition.y, delayTime: 0});
            self.node.removeFromParent(true);
            setTimeout(function () {

                // self.node.destroy();
            }, 0.5 * 1000);

        }
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
