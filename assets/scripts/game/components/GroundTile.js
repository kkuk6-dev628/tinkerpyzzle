
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
    editor: {
        requireComponent: sp.Skeleton
    },

    properties: {

        figuresAtlas: {
            default: null,
            type: cc.SpriteAtlas
        },

        _goldTemplateNode: {
            default: null,
            type: cc.Node
        },

        decorNode: {
            default: null,
            type: cc.Node
        },

        groundDecorType: {
            get: function () {
                return this._groundDecorType;
            },
            set: function (value) {
                if(this.decorNode){
                    this.decorNode.getComponent(cc.Sprite).spriteFrame = this.figuresAtlas.getSpriteFrame(value);
                }
                this._groundDecorType = value;
            },
            type: cc.String,
            visible: false,
            tooltip: "The type of ground decor"
        },

        groundType: {
            get: function () {
                return this._groundType;
            },
            set: function (value) {
                if(this.node){
                    this.node.getComponent(cc.Sprite).spriteFrame = this.figuresAtlas.getSpriteFrame(value);
                }
                this._groundType = value;
            },
            type: cc.String,
            visible: false,
            tooltip: "The type of ground"
        },

        grass: {
            get: function () {
                return this._grass;
            },
            set: function (value) {
                this._grass = value;
                this.grassNum = parseInt(value.slice(-1));
                this.setGrassTexture();
            },
            type: cc.String,
            visible: false,
        },

        grassNum: 0,

        tileKind: {
            get: function () {
                return Enum.TileKind.Ground;
            },
            type: Enum.TileKind,
            override: true,
            tooltip: "kind of tile"
        },

        isMovable: {
            get: function () {
                return false;
            },
            override: true
        },

        isNearbyAffect:{
            get: function () {
                return true;
            },
            override: true
        },

        isWeed: {
            default: false,
            visible: false
        },

        isGold: {
            get: function () {
                return this.groundDecorType && this.groundDecorType.indexOf("gold") > -1;
            },
            visible: false
        },

        blockBonusEffect: {
            default: true,
            visible: false
        }
    },

    // use this for initialization
    onLoad: function () {
        this._goldTemplateNode = cc.find("Canvas/game_mask/game_node/gold_elements/gold");
    },

    crushTile: function () {
        if(this.grassNum > 0){
            this.grassNum--;
            this.showGrassCrushAnimation();
            this.setGrassTexture();
            // setTimeout(() => {
            // }, 0.1 * 1000);
        }
        else if(this.isWeed){
            this.stripWeed();
        }
        else {
            let showGroundScore = true;
            if (this.groundDecorType.indexOf("gold") > -1) {
                // this.showGoldCollectingAction();
                showGroundScore = false;
                this.node.emit(Constants.GOLD_COLLECTED, {col: this.gridPosition.x, row: this.gridPosition.y});
            }

            this.decorNode.active = false;

            let animationNode = this.node.getChildByName("effect_flower");
            animationNode.active = true;
            let spine = animationNode.getComponent("sp.Skeleton");
            let effectGrass = spine.setAnimation(0, 'effect_soil', false);
            effectGrass.timeScale = 2;
            this._super();
            this.node.emit(Constants.GROUND_DESTROYED, {col: this.gridPosition.x, row: this.gridPosition.y, showGroundScore: showGroundScore});
        }
        // Global.AudioManager.playGroundCrushSFX();
    },

    setGrassTexture: function () {
        if(this.node == null){
            return;
        }
        let grassNode = this.node.getChildByName("grass");
        if(this.grassNum > 0){
            grassNode.active = true;
            let spriteName = "grass" + this.grassNum;
            grassNode.getComponent(cc.Sprite).spriteFrame = this.figuresAtlas.getSpriteFrame(spriteName);
        }
        else{
            grassNode.active = false;
        }
    },

    stripWeed: function () {
        this.isWeed = false;
        let weedNode = this.node.getChildByName("weed_1");
        weedNode.active = false;
        let weedEffect = this.node.getChildByName("weed");
        weedEffect.active = true;
        weedEffect.getComponent("sp.Skeleton").setAnimation(0, "effect_weed", false);
        this.node.emit(Constants.WEED_STRIPPED, {col: this.gridPosition.x, row: this.gridPosition.y});
        setTimeout(() => {
            weedEffect.active = false;
        }, 0.4 * 1000);
    },

    stripAllCovers: function () {
        if(this.grassNum > 0){
            this.grassNum = 0;
            this.showGrassCrushAnimation();
            this.setGrassTexture();
        }
        if(this.isWeed){
            this.stripWeed();
        }
    },

    coverWeed: function () {
        this.isWeed = true;
        let weedNode = this.node.getChildByName("weed_1");
        weedNode.active = true;
        weedNode.setScale(0.2, 0.2);
        weedNode.runAction(cc.scaleTo(0.1, 1, 1));
    },

    showGrassCrushAnimation: function () {
        let animationNode = this.node.getChildByName("effect_flower");
        animationNode.active = true;
        let spine = animationNode.getComponent("sp.Skeleton");
        switch (this.grassNum){
            case 0:
                let effectGrass = spine.setAnimation(0, 'effect_grass', false);
                effectGrass.timeScale = 2;
                break;
            case 1:
                let effectFlower = spine.setAnimation(0, 'effect_flower', false);
                effectFlower.timeScale = 2;
                break;
        }
    },
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
