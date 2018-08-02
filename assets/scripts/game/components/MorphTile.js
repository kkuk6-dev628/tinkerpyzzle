//noinspection JSUnresolvedFunction
const Enum = require("EnumTypes");
//noinspection JSUnresolvedFunction
const Constants = require("Constants");
//noinspection JSUnresolvedFunction
const FigureTile = require("FigureTile");
//noinspection JSUnresolvedFunction
const Global = require("Global");
//noinspection JSUnresolvedFunction
const ForceWay = require(Constants.ForceWayScriptName);

cc.Class({
    extends: FigureTile,

    properties: {
        morphActive: {
            get: function () {
                return this._morphActive;
            },
            set: function (value) {
                this._morphActive = value;
            },
            visible: false
        },

        figure: {
            get: function () {
                return this._figure;
            },
            set: function (value) {
                this._figure = value;
                this.node.getChildByName("figure1").getComponent(cc.Sprite).spriteFrame = this.figuresAtlas.getSpriteFrame(value);
                if(this.bonus && this.bonus != Enum.BonusTypes.Lamp){
                    this.node.getChildByName("figure2").getComponent(cc.Sprite).spriteFrame = this.figuresAtlas.getSpriteFrame(`${this._bonus}_${this._figure}`);
                }
                if(this.forceWay){
                    this.node.getChildByName("figure2").getComponent(cc.Sprite).spriteFrame = this.figuresAtlas.getSpriteFrame(`${this.forceWay}_${this._figure}`);
                }
            },
            override: true
        },

        bonus: {
            get: function () {
                return this._bonus;
            },
            set: function (value) {
                this._bonus = value;
                this._bonusBackup = value;
                let spriteFrame = null;
                if(value == Enum.BonusTypes.Lamp){
                    spriteFrame = this.figuresAtlas.getSpriteFrame(Enum.BonusTypes.Lamp);
                }
                else{
                    spriteFrame = this.figuresAtlas.getSpriteFrame(`${value}_${this._figure}`);
                }
                let bonusNode = this.node.getChildByName("figure2");
                bonusNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;

                this.bonusEffectNode = bonusNode.getChildByName("bonus");

                this.bonusEffectNode.active = this._morphActive;
                let crushSpine = this.bonusEffectNode.getComponent('sp.Skeleton');
                switch (this._bonus){
                    case Enum.BonusTypes.HBonus:
                        this.bonusEffectNode.setRotation(0);
                        crushSpine.defaultAnimation = 'bonus_effect';
                        let anim = crushSpine.setAnimation(0, 'bonus_effect', true);
                        // anim.timeScale = 2;
                        break;
                    case Enum.BonusTypes.VBonus:
                        this.bonusEffectNode.setRotation(90);
                        crushSpine.defaultAnimation = 'bonus_effect';
                        let anim1 = crushSpine.setAnimation(0, 'bonus_effect', true);
                        // anim.timeScale = 2;
                        break;
                    case Enum.BonusTypes.XBonus:
                        this.bonusEffectNode.setRotation(45);
                        crushSpine.defaultAnimation = 'xbonus_effect';
                        let anim2 = crushSpine.setAnimation(0, 'xbonus_effect', true);
                        // anim.timeScale = 2;
                        break;
                    case Enum.BonusTypes.Bomb:
                        this.bonusEffectNode.setRotation(0);
                        crushSpine.defaultAnimation = 'bomb_effect_around';
                        let anim3 = crushSpine.setAnimation(0, 'bomb_effect_around', true);
                        // anim.timeScale = 2;
                        break;
                    case Enum.BonusTypes.Lamp:
                        this.bonusEffectNode.setRotation(90);
                        crushSpine.defaultAnimation = 'bomb_effect_lamp_area';
                        let anim4 = crushSpine.setAnimation(0, 'bomb_effect_lamp_area', true);
                        // anim.timeScale = 2;
                        break;
                    default:
                        this.bonusEffectNode.active = false;
                        break;
                }

            },
            visible: false
        },

        forceWay: {
            get: function () {
                return this._forceWay;
            },
            set: function (value) {
                this._forceWay = value;
                this._forceWayBackup = value;
                this.node.getChildByName("figure2").getComponent(cc.Sprite).spriteFrame = this.figuresAtlas.getSpriteFrame(`${value}_${this._figure}`);
            },
            visible: false
        },

        _bonusBackup: undefined,
        _forceWayBackup: undefined,
        _bonusEffectNode:{
            type: cc.Node,
            default: null
        }
    },

    // use this for initialization
    onLoad: function () {
        this._super();
    },

    activateAllChildren: function (active) {
        this.node.getChildByName("morph_special_area").active = true;
        this.node.getChildByName("morph_normal_area").active = true;
        this.node.getChildByName("morph_rotate").active = true;
        let normalNode = this.node.getChildByName("figure1");
        normalNode.active = true;
        normalNode.rotation = 0;
        normalNode.setScale(1, 1);
        let specialNode = this.node.getChildByName("figure2");
        specialNode.active = true;
        specialNode.rotation = 0;
        specialNode.setScale(1, 1);
    },

    setMorphActive: function (active, showTransition) {
        let normalNode = this.node.getChildByName("figure1");
        normalNode.setOpacity(active ? 0 : 255);
        let specialNode = this.node.getChildByName("figure2");
        specialNode.setOpacity(active ? 255 : 0);
        if(showTransition) {
            // Global.PendingActions++;
            this.node.getComponent(cc.Animation).play(!active ? "anim_morph_special_area" : "anim_morph_normal_area");
            this._morphActive = active;
            this.activateAllChildren(true);
            setTimeout(() => {
                this.node.getComponent(cc.Animation).play(this._morphActive ? "anim_morph_special" : "anim_morph_normal");
            }, 0.8 * 1000);
        }
        else{
            this._morphActive = active;
            this.node.getComponent(cc.Animation).play(this._morphActive ? "anim_morph_special" : "anim_morph_normal");
        }
    },

    toggleActive: function () {
        this.setMorphActive(!this._morphActive, true);
        if(this._morphActive){
            this._bonus = this._bonusBackup;
            this._forceWay = this._forceWayBackup;
            this.bonusEffectNode.active = true;
        }
        else{
            this.bonusEffectNode.active = false;
            this._bonus = undefined;
            this._forceWay = undefined;
        }
    },

    crushTile: function (foxPosition) {
        if(this.morphActive && this.forceWay){
            if(this.crushMilk() && this.freeChain() && this.crushMystery() && this.crushSnake() && this.crushGooBomb()) {
                if (!Global.PlayingLevel.levelCompleted) {
                    this.node.emit(Constants.FORCE_WAY_COLLECTED, {col: this.gridPosition.x, row: this.gridPosition.y});
                }
                this.node.emit(Constants.FIGURE_DESTROYED, {col: this.gridPosition.x, row: this.gridPosition.y, recycleDelay: 0.0});
            }
        }
        else{
            this._super();
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
