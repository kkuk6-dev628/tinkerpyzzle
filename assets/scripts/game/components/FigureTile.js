
//noinspection JSUnresolvedFunction
const Enum = require("EnumTypes");
//noinspection JSUnresolvedFunction
const Global = require("Global");
//noinspection JSUnresolvedFunction
const Constants = require("Constants");
//noinspection JSUnresolvedFunction
const Tile = require("Tile");
const FigureTile = cc.Class({
    extends: Tile,
    editor: {
        requireComponent: sp.Skeleton
    },

    statics: {
        figuresCrushAnimationPool: null,
        figuresCrushAnimationPrefab: null,

        getFiguresCrush: function () {
            let figuresCrush = null;
            if(FigureTile.figuresCrushAnimationPool && FigureTile.figuresCrushAnimationPool.size() > 0){
                figuresCrush = FigureTile.figuresCrushAnimationPool.get();
            }
            else{
                figuresCrush = cc.instantiate(FigureTile.figuresCrushAnimationPrefab);
            }
            return figuresCrush;
        },

        recycleFiguresCrush: function (figuresCrush) {
            (FigureTile.figuresCrushAnimationPool && figuresCrush) && FigureTile.figuresCrushAnimationPool.put(figuresCrush);
        },

    },

    properties: {

        figuresAtlas: {
            default: null,
            type: cc.SpriteAtlas
        },

        figure: {
            get: function () {
                return this._figure;
            },
            set: function (value) {
                this._figure = value;
                // this.isMatchable = Constants.MatchableArray.includes(this._figure);
            },
            type: cc.String,
            visible: false,
            tooltip: "The figure name of tile"
        },

        tileKind: {
            get: function () {
                return Enum.TileKind.Figure;
            },
            type: Enum.TileKind,
            override: true,
            visible: false,
            tooltip: "kind of tile"
        },

        milkSpawnDir: {
            get: function () {
                return this._milkSpawnDir;
            },
            set: function (value) {
                this._milkSpawnDir = value;
            },
            visible: false
        },

        isMatchable: {
            default: true,
            visible: false,
            tooltip: "whether or not this tile can make match."
        },

        isMovable: {
            default: true,
            override: true,
            visible: false
        },

        isNearbyAffect:{
            default: false,
            override: true,
            visible: false
        },

        chainNode: {
            default: null,
            type: cc.Node,
            visible: false
        },

        chainAnimNode: {
            default: null,
            type: cc.Prefab,
        },

        isPendingHole:{
            default: false,
            override: true,
            visible: false
        },

        _isMoving: false,

        isChainHold: {
            default: false,
            override: true,
            visible: false
        },

        isMilkTile: {
            default: false,
            visible: false
        },

        nearbyCheck:{
            default: true,
            visible: false
        },

        milkType: {
            default: "milk",
            visible: false
        },

        mysteryLevel: {
            default: 0,
            visible: false
        },

        mysteryNode: {
            default: null,
            type: cc.Node,
            visible: false
        },

        isMystery: {
            default: false,
            visible: false
        },

        gooBombLevel: {
            default: 0,
            visible: false
        },

        gooBombNode: {
            default: null,
            type: cc.Node,
            visible: false
        },

        isGooBomb: {
            default: false,
            visible: false
        },

        isDontMixItem: {
            default: false,
            visible: false
        },

        notRecycle: {
            default: false,
            visible: false
        }
    },

    // use this for initialization
    onLoad: function () {
        this._super();
        this.initEventHandlers();
        // const anim = this.getComponent(cc.Animation);
        // const animState = anim.play('fig_normal');
        // set the loop mode as Normal
        // animState.wrapMode = cc.WrapMode.Normal;
        // set the loop mode as Loop
        // animState.wrapMode = cc.WrapMode.Loop;
        // set the loop count of animation as 2 times
        // animState.repeatCount = 2;
        // set the loop count of animation as infinite
        // animState.repeatCount = Infinity;

    },

    copyTile: function(tile){
        this._super(tile);
        if(tile && tile.tileKind){
            this.figure = tile.figure;
            this.isChainHold = tile.isChainHold;
            this.chainNode = tile.chainNode;
            this.isMovable = tile.isMovable;
            this.isMatchable = tile.isMatchable;
            this.isNearbyAffect = tile.isNearbyAffect;
            this.isMilkTile = tile.isMilkTile;
            this.milkType = tile.milk;
            this.mysteryNode = tile.mysteryNode;
            this.isMystery = tile.isMystery;
            this.isSnake = tile.isSnake;
            this.snakeNode = tile.snakeNode;
            this.isGooBomb = tile.isGooBomb;

            if(this.isChainHold && this.chainNode && this.node){
                this.chainNode.removeFromParent(false);
                this.node.addChild(this.chainNode);
            }
            if(this.isMystery && this.mysteryNode && this.node){
                this.mysteryNode.removeFromParent(false);
                this.node.addChild(this.mysteryNode);
            }
            if(this.isSnake && this.snakeNode && this.node){
                this.snakeNode.removeFromParent(false);
                this.node.addChild(this.snakeNode);
            }

            if(this.isMilkTile){
                this.node.getChildByName("milk").active = true;
            }

            if(this.isGooBomb){
                this.setGooBomb(tile.gooBombNode);
            }
        }
    },

    emitFigureDestroyed: function (recycleDelay) {
        this.isPendingHole = true;
        this.node.emit(Constants.FIGURE_DESTROYED, {col:this.gridPosition.x, row: this.gridPosition.y, recycleDelay: recycleDelay ? recycleDelay:0});
    },

    initPosition: function () {
        this.node.stopAllActions();
        let pos = Global.grid2pos(this.gridPosition.x, this.gridPosition.y);
        this.node.x = pos.x;
        this.node.y = pos.y;
    },

    setFigure: function (figure) {
        try {
            this.figure = figure;
            this.node.getComponent(cc.Sprite).spriteFrame = this.figuresAtlas.getSpriteFrame(figure);
            this.node.getComponent(cc.Sprite).setVisible(true);
        } catch (e) {
            cc.info(this, `setFigure(${figure})`);
        }
    },

    setMilkTile: function (milkType, rotation, showEffect) {
        this.isMilkTile = true;
        this.milkSpawnDir = rotation;
        this.isMovable = false;
        this.isMatchable = false;
        this.isNearbyAffect = true;
        this.milkType = milkType;
        if(showEffect){
            this.showMilkSpawnEffect();
        }
        else{
            let milkNode = this.node.getChildByName("milk");
            milkNode.active = true;
            milkNode.getChildByName("milk").active = true;
        }
    },

    setMysteryPiece: function () {
        try {
            this.mysteryLevel = 0;
            this.isMatchable = false;
            this.isNearbyAffect = true;
            this.mysteryNode = new cc.Node(Constants.MysteryNodeName);
            let sprite = this.mysteryNode.addComponent(cc.Sprite);
            sprite.spriteFrame = this.figuresAtlas.getSpriteFrame(Constants.MysteryNodeName);
            this.mysteryNode.parent = this.node;
            let milkNode = this.node.getChildByName("milk");
            let mysteryZOrder = this.mysteryNode.getLocalZOrder();
            milkNode.setLocalZOrder(mysteryZOrder + 1);
            this.mysteryNode.setAnchorPoint(0, 0);
            this.isMystery = true;
        } catch (e) {
            cc.info(this, "setMysteryPiece");
        }
    },

    setGooBomb: function (gooBombPrefab) {
        if(!gooBombPrefab){
            return;
        }
        this.gooBombLevel = 0;
        this.isMatchable = false;
        this.isNearbyAffect = true;
        this.isMovable = true;
        this.nearbyCheck = false;
        if(!this.gooBombNode) {
            this.gooBombNode = cc.instantiate(gooBombPrefab);
            this.node.addChild(this.gooBombNode);
        }
        this.isGooBomb = true;
        this.gooBombNode.active = true;
        this.gooBombNode.x = Constants.TileSize / 2;
        this.gooBombNode.y = Constants.TileSize / 2;
        this.setVisibleSprite(false);
    },

    setVisibleSprite: function (show) {
        this.node.getComponent(cc.Sprite).setVisible(show);
    },
    setSnake: function (snakeNode) {
        this.setSnakeState();
        this.setSnakeNode(snakeNode);
    },

    setSnakeState: function () {
        this.isSnake = true;
        // cc.info(this.gridPosition, "setSnakeState!!!!!!!!!!!!!!");
        this.isMatchable = true;
        this.isMovable = false;
        this.name = "snake";
    },

    setSnakeNode: function (snakeNode) {
        if(snakeNode){
            this.snakeNode = snakeNode;
        }
        else{
            this.snakeNode = new cc.Node(Constants.SnakeNodeName);
            let sprite = this.snakeNode.addComponent(cc.Sprite);
            sprite.spriteFrame = this.figuresAtlas.getSpriteFrame(Constants.SnakeNodeName);
        }
        this.snakeNode.x = 0;
        this.snakeNode.y = 0;
        this.snakeNode.setAnchorPoint(0, 0);
        this.snakeNode.parent = this.node;
    },

    removeSnake: function () {
        // cc.info("removeSnake", "");
        this.isSnake = false;
        this.isMatchable = true;
        this.isMovable = true;
        this.snakeNode = null;
        this.nearbyCheck = true;
    },

    crushSnake: function(){
        if(this.isSnake === true){
            this.node.emit(Constants.SNAKE_DESTROYED, {col: this.gridPosition.x, row: this.gridPosition.y, snakeNode: this.snakeNode});
            return false;
        }
        else{
            return true;
        }
    },

    getMysteryCrush: function () {
        let mysteryCrush = null;
        if(Tile.mysteryCrushPool && Tile.mysteryCrushPool.size() > 0){
            mysteryCrush = Tile.mysteryCrushPool.get();
        }
        else{
            mysteryCrush = cc.instantiate(Tile.mysteryCrushPrefab);
        }
        return mysteryCrush;
    },

    recycleMysteryCrush: function (mysteryCrush) {
        (Tile.mysteryCrushPool && mysteryCrush) && Tile.mysteryCrushPool.put(mysteryCrush);
    },

    getMysteryPiece: function () {
        let mysteryCrush = null;
        if(Tile.mysteryPiecePool && Tile.mysteryPiecePool.size() > 0){
            mysteryCrush = Tile.mysteryPiecePool.get();
        }
        else{
            mysteryCrush = cc.instantiate(Tile.mysteryPiecePrefab);
        }
        return mysteryCrush;
    },

    recycleMysteryPiece: function (mysteryPiece) {
        (Tile.mysteryPiecePool && mysteryPiece) && Tile.mysteryPiecePool.put(mysteryPiece);
    },

    crushMystery: function () {
        if(this.isMystery === true) {
            this.mysteryLevel++;
            if (this.mysteryLevel < 3) {
                this.mysteryNode.getComponent(cc.Sprite).spriteFrame = this.figuresAtlas.getSpriteFrame(`${Constants.MysteryNodeName}_${this.mysteryLevel}`);
            }
            else {
                this.mysteryLevel = 0;
                this.mysteryNode.active = false;
                this.isMystery = false;
                this.restoreDefaultFlags();
            }
            let mysteryPiece = this.getMysteryPiece();
            mysteryPiece.active = true;
            let spineNode = mysteryPiece.getChildByName('effect_mystery1');
            spineNode.active = true;
            let crushSpine = spineNode.getComponent('sp.Skeleton');
            let anim = crushSpine.setAnimation(0, 'effect_mystery1', false);
            // anim.timeScale = 2;

            setTimeout(() => {
                this.recycleMysteryPiece(mysteryPiece);
            }, 0.3 * 1000);
            return false;
        }
        else{
            return true;
        }
    },

    restoreDefaultFlags: function () {
        this.isMovable = true;
        this.isMatchable = true;
        this.isNearbyAffect = false;
        this.nearbyCheck = true;
    },

    setIsMoving: function (isMoving) {
        this._isMoving = isMoving;
    },

    initEventHandlers: function () {
        let self = this;
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            self.onGameTouchStart(event);
        });

        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            self.onGameTouchMove(event);
        });

        this.node.on(cc.Node.EventType.TOUCH_END, function (event) {
            self.onGameTouchEnd(event);
        });
    },
    onGameTouchStart: function (event) {
        try {
            this._pickedPosition = cc.vv.tileManager.gameMapNode.convertTouchToNodeSpace(event.touch);
            this._pickedTile = cc.vv.tileManager.pos2grid(this._pickedPosition);
            this._startMove = true;
            Global.AudioManager.playSelectTileSFX();

        } catch (e) {
            cc.info(e, "onGameTouchStart");
        }
    },

    unuse: function () {
        if(this.node) {
            this.node.stopAllActions();
            for (let child of this.node.children) {
                child.active = false;
            }
        }
    },

    init: function () {

    },

    reuse: function () {
        if(this.node){
            this.isPendingAction = false;
            this.node.setOpacity(255);
            // let figureSprite = this.node.getComponent(cc.Sprite);
            // if (figureSprite){
            //     figureSprite.setVisible(true);
            // }
            // else{
            //     cc.info("Figure Tile", "Sprite is not valid!!!");
            // }
            let milkNode = this.node.getChildByName("milk");
            if(milkNode) {
                milkNode.active = false;
                milkNode.getChildByName("milk").active = false;
            }
        }
        else{
            cc.info("Figure Tile", "node is not valid!!!");
        }
        this.isGooBomb = false;
        this.isMilkTile = false;
        this.isPendingHole = false;
        this.isMovable = true;
        this.isMystery = false;
        this.isMatchable = true;
        this.isNearbyAffect = false;
        this.isChainHold = false;
        this.isSnake = false;
        this.nearbyCheck = true;
        this.notRecycle = false;
    },

    onGameTouchMove: function (event) {
        if (this._startMove) {
            let delta = event.getDelta();
            this._pickedPosition.x += delta.x;
            this._pickedPosition.y += delta.y;
            //cc.info(this._pickedPosition);
            let tile = cc.vv.tileManager.pos2grid(this._pickedPosition);
            if (this._pickedTile.x != tile.x || this._pickedTile.y != tile.y) {
                if(this._pickedTile.x != tile.x && this._pickedTile.y != tile.y){
                    tile.y = this._pickedTile.y;
                    tile.x = this._pickedTile.x + Math.sign(tile.x - this._pickedTile.x);
                }
                else{
                    tile.y = this._pickedTile.y + Math.sign(tile.y - this._pickedTile.y);
                    tile.x = this._pickedTile.x + Math.sign(tile.x - this._pickedTile.x);
                }
                this._startMove = false;
                // cc.info(tile, "onGameTouchMove");
                this.node.emit(Constants.TILE_MOVED, {
                    from: this._pickedTile,
                    to: tile,
                    value: this._figureName
                });
            }
        }
        else{
            // cc.info(this._startMove, "onGameTouchMove");
        }
    },

    onGameTouchEnd: function (event) {

    },

    freeChain: function () {
        if(this.isChainHold && this.chainNode){
            this.chainNode.active = false;
            this.isChainHold = false;
            this.isMovable = true;
            this.nearbyCheck = true;
            let chainAnim = cc.instantiate(this.chainAnimNode);
            chainAnim.removeFromParent(false);
            this.node.addChild(chainAnim);
            chainAnim.x = 39.5;
            chainAnim.y = 39.5;
            let crushSpine = chainAnim.getComponent('sp.Skeleton');
            let anim = crushSpine.setAnimation(0, 'chains', false);
            anim.timeScale = 2;
            this.node.emit(Constants.CHECK_MATCH, {col: this.gridPosition.x, row: this.gridPosition.y});
            return false;
        }
        return true
    },

    crushGooBomb: function () {
        if(this.isGooBomb === true){
            let milkNode = this.node.getChildByName("milk");
            milkNode.active = true;
            let anim = milkNode.getChildByName("effect_milk");
            anim.active = true;
            let crushSpine = anim.getComponent('sp.Skeleton');
            let skeltal = crushSpine.setAnimation(0, 'effect_milk', false);
            skeltal.timeScale = 2;

            this.setVisibleSprite(true);

            this.isGooBomb = false;
            if(this.gooBombNode != null)  this.gooBombNode.active = false;
            this.gooBombLevel = 0;
            this.isMilkTile = false;
            this.restoreDefaultFlags();
            setTimeout(() => {
                milkNode.active = false;
            }, 0.5 * 1000);
            return false;
        }
        return true;
    },

    growGooBomb: function () {
        if(this.isGooBomb){
            this.gooBombLevel++;
            this.hideAllChildren(this.gooBombNode);
            this.gooBombNode.getChildByName('goobomb').active = true;
            let gooBombSpine = this.gooBombNode.getChildByName('goobomb').getComponent('sp.Skeleton');
            let gooBombLevelNode = gooBombSpine.setAnimation(0, `effect_goobomb${this.gooBombLevel}`, false);
            if(this.gooBombLevel >= 4){
                this.isGooBomb = false;
                this.gooBombLevel = 0;
                setTimeout(() => {
                    //this.gooBombNode.active = false;
                    this.setMilkTile("milk", 0, false);
                    this.setVisibleSprite(true);
                }, 1.1 * 1000);
            }
        }
    },

    hideAllChildren: function (node) {
        if(!node){
            return;
        }
        for(let i = 0; i < node.childrenCount; i++){
            node.children[i].active = false
        }
    },

    crushMilk: function () {
        if(this.isMilkTile === true){
            let milkNode = this.node.getChildByName("milk");
            let anim = milkNode.getChildByName("effect_milk");
            anim.active = true;
            anim.getComponent('sp.Skeleton').setAnimation(0, "effect_milk", false);
            this.isMilkTile = false;
            this.restoreDefaultFlags();
            milkNode.getChildByName("milk").active = false;
            if(this.gooBombNode != null) this.gooBombNode.active = false;
            setTimeout(() => {
                milkNode.active = false;
            }, 0.5 * 1000);
            this.node.emit(Constants.MILK_DESTROYED, {col:this.gridPosition.x, row: this.gridPosition.y});
            return false;
        }
        return true;
    },

    getNearbyDefault: function () {
        return false;
    },

    getMatchableDefault: function () {
        return true;
    },

    crushTile: function () {
        if(this.crushMilk() && this.freeChain() && this.crushMystery() && this.crushSnake() && this.crushGooBomb()){
            this.isPendingAction = true;
            // if(this.node){
            //     let figureSprite = this.node.getComponent(cc.Sprite);
            //     if (figureSprite){
            //         figureSprite.setVisible(false);
            //     }
            // }
            // cc.info(this, "crushTile");
            let figuresCrush = FigureTile.getFiguresCrush();
            if(figuresCrush != null) {
                if (this.figure !== "lamp_area" && (!this.bonus || this.morphActive !== true)) {
                    (this.node != null) && (this.node.parent != null) && this.node.parent.addChild(figuresCrush);
                    figuresCrush.x = this.node.x;
                    figuresCrush.y = this.node.y;
                    let crushSpine = figuresCrush.getChildByName('spine').getComponent('sp.Skeleton');
                    let anim = crushSpine.setAnimation(0, this.figure, false);
                    if(anim != null) anim.timeScale = 2;
                    setTimeout(() => {
                        FigureTile.recycleFiguresCrush(figuresCrush);
                    }, 0.5 * 1000);
                }
            }
            this.node.emit(Constants.FIGURE_DESTROYED, {col:this.gridPosition.x, row: this.gridPosition.y, recycleDelay: 0});
        }
        // let particle = this.node.getChildByName("figure_crush").getComponent(cc.ParticleSystem);
        // particle.resetSystem();
        //particle.stopSystem();
    },

    moveTile4Fox: function (pos, delayTime) {
        let seq = cc.sequence(
            cc.delayTime(delayTime),
            cc.spawn(
                cc.scaleTo(0.1, 0.5, 0.5),
                cc.moveTo(0.3, (pos.x + this.node.x) / 2, (pos.y + this.node.y) / 2)
            ),
            cc.spawn(
                cc.scaleTo(0.3, 1.0, 1.0),
                cc.moveTo(0.3, pos)
            ),
            cc.callFunc(this.finishMove, this)
        );
        Global.PendingActions ++;
        this.node.runAction(seq);
    },

    showMilkSpawnEffect: function () {
        let milkParent = this.node.getChildByName("milk");
        milkParent.rotation = this._milkSpawnDir;
        milkParent.active = true;
        let milkEffectNode = milkParent.getChildByName("effect_milk");
        milkEffectNode.active = true;
        let milkNode = milkParent.getChildByName("milk");
        if(milkNode){
            milkNode.active = true;
            milkNode.x = 0;
            milkNode.y = - Constants.TileSize / 2;
            milkNode.runAction(cc.moveTo(0.5, 0, 0));
            setTimeout(() => {
                milkNode.y = 0;
            }, 0.55 * 1000);
        }
        let milkSpine = milkEffectNode.getComponent("sp.Skeleton");
        if(milkSpine){
            milkSpine.setAnimation(0, "effect_milk_appear", false);
            Global.PendingActions++;
            setTimeout(() => {
                Global.PendingActions--;
                milkEffectNode.active = false;
            }, 0.55 * 1000);
        }
    },

    finishMove: function () {
        Global.PendingActions --;
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {
        // this._super(dt);
        // if(Global.PendingActions <= 0 && this.node.getNumberOfRunningActions() <= 0) {
        //     let correctPos = Global.grid2pos(this.gridPosition.x, this.gridPosition.y);
        //     (this.node.x != correctPos.x) && (this.node.x = correctPos.x);
        //     (this.node.y != correctPos.y) && (this.node.y = correctPos.y);
        // }
    // },
});
