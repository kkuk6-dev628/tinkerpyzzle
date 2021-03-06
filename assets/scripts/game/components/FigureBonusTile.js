

//noinspection JSUnresolvedFunction
const Enum = require("EnumTypes");
//noinspection JSUnresolvedFunction
const Constants = require("Constants");
//noinspection JSUnresolvedFunction
const Global = require("Global");
//noinspection JSUnresolvedFunction
const FigureTile = require("FigureTile");

cc.Class({
    extends: FigureTile,

    editor: {
        requireComponent: sp.Skeleton
    },

    properties: {
        // globalEffectContainer: {
        //     default: null,
        //     type: cc.Node
        // },
        // vBonusNode:{
        //     default: null,
        //     type: cc.Node
        // },
        // xBonusNode1:{
        //     default: null,
        //     type: cc.Node
        // },
        // xBonusNode2:{
        //     default: null,
        //     type: cc.Node
        // },
        bonus: {
            get: function () {
                return this._bonus;
            },
            set: function (value) {
                this._bonus = value;
                this.initEffect();
            },
            type: Enum.BonusTypes,
            visible: false,
            tooltip: "The bonus name of tile"
        },

        effectNode: {
            default: null,
            type: cc.Node,
            visible: false
        },

        effectNode1: {
            default: null,
            type: cc.Node,
            visible: false
        }

    },

    // use this for initialization
    onLoad: function () {
        this._super();
        this._particleNode = cc.find("Canvas/game_mask/game_node/top_most/bonus");
        this.effectNode = this.node.getChildByName("bonus");
        this._sunNode = cc.find("Canvas/game_mask/game_node/top_most/test");
    },

    unuse: function () {
    },

    reuse: function () {
        this._super();
        this.effectNode && (this.effectNode.active = false);
        if(this.effectNode1 != null){
            this.effectNode1.active = false;
        }
    },

    setBonusType: function (bonusType) {
        this.bonus = bonusType;
        this.node.getComponent(cc.Sprite).spriteFrame = this.figuresAtlas.getSpriteFrame(bonusType);
    },

    initEffect: function () {
        if(this.bonus != Enum.BonusTypes.Square) {
            this.effectNode.active = true;
        }
        let crushSpine = this.effectNode.getComponent('sp.Skeleton');
        switch (this.bonus){
            case Enum.BonusTypes.HBonus:
                this.effectNode.setRotation(0);
                let anim = crushSpine.setAnimation(0, 'bonus_effect', true);
                // anim.timeScale = 2;
                break;
            case Enum.BonusTypes.VBonus:
                this.effectNode.setRotation(90);
                let anim1 = crushSpine.setAnimation(0, 'bonus_effect', true);
                // anim.timeScale = 2;
                break;
            case Enum.BonusTypes.XBonus:
                this.effectNode.setRotation(45);
                let anim2 = crushSpine.setAnimation(0, 'xbonus_effect', true);
                // anim.timeScale = 2;
                break;
            case Enum.BonusTypes.Bomb:
                this.effectNode.setRotation(0);
                let anim3 = crushSpine.setAnimation(0, 'bomb_effect_around', true);
                // anim.timeScale = 2;
                break;
            case Enum.BonusTypes.Lamp:
                this.effectNode.setRotation(90);
                let anim4 = crushSpine.setAnimation(0, 'bomb_effect_lamp_area', true);
                // anim.timeScale = 2;
                break;
        }
    },

    crushTile: function () {
        Global.AudioManager.playBonusSFX(this.bonus);
        this._super();
    },

});
