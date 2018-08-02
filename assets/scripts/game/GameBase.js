//import * as cc from "../../../build/web-mobile/cocos2d-js-min";

//noinspection JSUnresolvedFunction
const Constants = require("Constants");
//noinspection JSUnresolvedFunction
const Tile = require("Tile");
//noinspection JSUnresolvedFunction
const Enum = require("EnumTypes");
//noinspection JSUnresolvedFunction
const Global = require("Global");
//noinspection JSUnresolvedFunction
const LevelInfo = require("LevelInfo");
//noinspection JSUnresolvedFunction
const Settings = require("Settings");
//noinspection JSUnresolvedFunction
const FigureTile = require(Constants.FigureScriptName);
//noinspection JSUnresolvedFunction
const FigureBonusTile = require(Constants.FigureBonusScriptName);
//noinspection JSUnresolvedFunction
const ForceWayTile = require(Constants.ForceWayScriptName);
//noinspection JSUnresolvedFunction
const SwirlTile = require(Constants.SwirlScriptName);
//noinspection JSUnresolvedFunction
const KeyTile = require(Constants.KeyScriptName);
//noinspection JSUnresolvedFunction
const MorphTile = require(Constants.MorphScriptName);
//noinspection JSUnresolvedFunction
const CountStoneTile = require(Constants.CountStoneScriptName);
//noinspection JSUnresolvedFunction
const OfferingBaseTile = require(Constants.OfferingBaseScriptName);
//noinspection JSUnresolvedFunction
const ScoreManager = require(Constants.ScoreManagerName);

cc.Class({
    extends: cc.Component,

    editor: {
        requireComponent: sp.Skeleton
    },

    properties: {

        scoreManagerNode: {
            default: null,
            type: cc.Node
        },

        audioManager: {
            default: null,
            type: cc.Node
        },

        scoreManager: {
            default: null,
            type: ScoreManager,
            visible: false
        },

        gameMapNode: {
            default: null,
            type: cc.Node
        },

        backgroundTileLayer: {
            default: null,
            type: cc.Node
        },

        figuresLayer: {
            default: null,
            type: cc.Node
        },

        topMostLayer: {
            default: null,
            type: cc.Node
        },

        globalAnimations: {
            default: null,
            type: cc.Node
        },

        figuresAtlas: {
            default: null,
            type: cc.SpriteAtlas
        },

        gameUIAtlas: {
            default: null,
            type: cc.SpriteAtlas
        },

        uiAtlas: {
            default: null,
            type: cc.SpriteAtlas
        },

        texture2Atlas: {
            default: null,
            type: cc.SpriteAtlas
        },

        texture3Atlas: {
            default: null,
            type: cc.SpriteAtlas
        },

        figTemplate: {
            default: null,
            type: cc.Prefab
        },

        figBonusTemplate: {
            default: null,
            type: cc.Prefab
        },

        swirlTemplate: {
            default: null,
            type: cc.Prefab
        },

        countStoneCrushPrefab: {
            default: null,
            type: cc.Prefab
        },

        countStonePrefab: {
            default: null,
            type: cc.Prefab
        },

        bonusBarEffectPrefab: {
            default: null,
            type: cc.Prefab
        },

        bonusCircleEffectPrefab: {
            default: null,
            type: cc.Prefab
        },

        bonusCircleLightEffectPrefab: {
            default: null,
            type: cc.Prefab
        },

        shootBonusParticlePrefab: {
            default: null,
            type: cc.Prefab
        },

        fairyParticlePrefab: {
            default: null,
            type: cc.Prefab
        },

        fairyBombParticlePrefab: {
            default: null,
            type: cc.Prefab
        },

        wideFairyParticlePrefab: {
            default: null,
            type: cc.Prefab
        },

        lampLinePrefab: {
            default: null,
            type: cc.Prefab
        },

        mysteryCrushPrefab: {
            default: null,
            type: cc.Prefab
        },

        mysteryPiecePrefab: {
            default: null,
            type: cc.Prefab
        },

        gooBombPrefab: {
            default: null,
            type: cc.Prefab
        },

        figuresCrushPrefab: {
            default: null,
            type: cc.Prefab
        },

        morphTilePrefab: {
            default: null,
            type: cc.Prefab
        },

        _shootBonusPool: {
            default: null,
            type: cc.NodePool
        },

        _fairyParticlePool: {
            default: null,
            type: cc.NodePool
        },

        _fairyBombParticlePool: {
            default: null,
            type: cc.NodePool
        },

        _wideFairyParticlePool: {
            default: null,
            type: cc.NodePool
        },

        _bonusBarPool: {
            default: null,
            type: cc.NodePool
        },

        _bonusCirclePool: {
            default: null,
            type: cc.NodePool
        },

        _bonusCircleLightPool: {
            default: null,
            type: cc.NodePool
        },

        _figurePool: {
            default: null,
            type: cc.NodePool
        },

        _figBonusPool: {
            default: null,
            type: cc.NodePool
        },

        _swirlPool: {
            default: null,
            type: cc.NodePool
        },

        _lampLinePool: {
            default: null,
            type: cc.NodePool
        },

        _lampPointPool: {
            default: null,
            type: cc.NodePool
        },

        _morphPool: {
            default: null,
            type: cc.NodePool
        },

        _savedNodesPool: {
            default: null,
            type: cc.NodePool
        },

        _bgTemplate: {
            default: null,
            type: cc.Node
        },

        _teleportBeginTemplate: {
            default: null,
            type: cc.Node
        },

        _teleportEndTemplate: {
            default: null,
            type: cc.Node
        },

        _wishingWellTemplate: {
            default: null,
            type: cc.Node
        },

        _topCheckNode: {
            default: null,
            type: cc.Node
        },

        _uiNode: {
            default: null,
            type: cc.Node
        },

        _barImageTemplate: {
            default: null,
            type: cc.Node
        },

        _circleImageTemplate: {
            default: null,
            type: cc.Node
        },

        _circleLightImageTemplate: {
            default: null,
            type: cc.Node
        },

        _barParticleTemplate: {
            default: null,
            type: cc.Node
        },

        _globalEffectsContainer: {
            default: null,
            type: cc.Node
        },

        _colorPieTemplate: {
            default: null,
            type: cc.Node
        },

        _wishingLineTemplate: {
            default: null,
            type: cc.Node
        },

        _wishingPointTemplate: {
            default: null,
            type: cc.Node
        },

        _wishingLinePool: {
            default: null,
            type: cc.NodePool
        },

        _boosterInputNode: {
            default: null,
            type: cc.Node
        },

        _boosterLampNode: {
            default: null,
            type: cc.Node
        },

        _boosterButterflyNode: {
            default: null,
            type: cc.Node
        },

        _boosterLineNode: {
            default: null,
            type: cc.Node
        },

        _boosterParticleNode: {
            default: null,
            type: cc.Node
        },

        _popupsNode: {
            default: null,
            type: cc.Node
        },

        _popupMaskNode: {
            default: null,
            type: cc.Node
        },

        _levelData: null,

        _mapNodesArray: [],

        _forceFigure: "fig1",

        _figuresLayerName: "figures",

        _maxRow: 0,

        _minRow: 99,

        _maxColumn: 0,

        _minColumn: 99,

        _maxVisibleRow: 0,

        _minVisibleRow: 99,

        _maxVisibleColumn: 0,

        _minVisibleColumn: 99,

        _rowPageCount: 1,

        _colPageCount: 1,

        _rowCurrentPage: 1,

        _colCurrentPage: 1,

        _pickedTile: {
            default: null,
            type: cc.p
        },

        _pickedPosition: {
            default: null,
            type: cc.p
        },

        _gameState: {
            default: Enum.GameState.Idle,
            type: Enum.GameState
        },

        _butterflyAction: {
            default: null,
            type: cc.Action
        },

        _willCrushTiles: [],

        _willMoveTiles: [],

        _scoresQueue: [],

        _movedTiles: [],

        _holeTiles: [],

        _pendingSnakes: [],

        _fullWells: [],

        _gameArea: null,

        _moveCount: 0,

        _viewSize: null,

        // arrays to back up bonus tiles
        _bonusArrays: null,

        _lastFigure: "fig1",

        _availableMove: [],

        _hintTimer: null,

        _figNodesArray: null,

        _spawnedTilesCount: 0,

        _spawnMilk: false,

        _figuresForce: "fig1",

        _squareTargets: [],

        _elapsedTime: 0,

        _elapsedTime4Crush: 0,

        _matchNumber: 0,

        _isBonusTime: false,

        _conveyors: [],

        _doConvey: false,

        _doGooBomb: false,

        _gooBombGrowCount: 4,

        _isThereGooBomb: false,

        _isThereMorphs: false,

        _matchId: 0,

        _gameFinished: false,

        _spawnedCountByCol: [],

        _videoWatched: false,

        _actionDuration: 0
    },

    // use this for initialization
    onLoad: function () {
        if (!cc.vv) {
            cc.vv = {};
        }
        cc.sys.garbageCollect();
        cc.vv.tileManager = this;
        Global.PendingActions = 0;
        this.initNodeTemplates();
        this.initGlobalPools();
        this.initManagers();
        this.initBoosters();

        this.loadDynamicRes();
        this.initEventHandlers();
    },

    start: function () {
        Global.PendingActions = 0;
        this.addPendingAction();

        if (Global.PlayingLevel != null && Global.PlayingLevel.levelMap != null) {
            (cc.sys.isMobile) && Global.sendGAProgressionEvent(ga.EGAProgressionStatus.Start, `level-${Global.PlayingLevel.levelNumber}`, `type-${Global.PlayingLevel.levelType}`);
            this.initAvailableFigures();
            this.initConstants();
            this.loadLevelMap();
            this.initLevelInfo();
            this.setGameState();
            this.afterLoadLevelMap();
            this.initAdmob();
        }
        else {
            Global.PlayingLevel = new LevelInfo();
            Global.PlayingLevel.loadLevelFromFile(1, (data) => {
                this.initAvailableFigures();
                this.initConstants();
                this.loadLevelMap();
                this.initLevelInfo();
                this.setGameState();
                this.afterLoadLevelMap();
                this.initAdmob();
            });
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this._elapsedTime += dt;
        this._elapsedTime4Crush += dt;
        if (this._levelMapLoaded) {

            this.processMatched(dt);
            this.crushMatchedTiles();
            this.runPendingTiles();

            if (this._isBonusTime) {
                this.crushAllBonus();
            }
        }
    },

    checkLevelFailed: function () {
        if(this._gameFinished || this.isTherePendingActions() || this.isTherePendingTiles()
            || this._gameState === Enum.GameState.Collecting){
            return false;
        }

        if (this.checkFailedDelay < 90) {
            this.checkFailedDelay++;
            return false;
        }
        this.checkFailedDelay = 0;

        if(Global.PlayingLevel.moveNumber <= 0){
            return true;
        }
    },

    onWatchVideoClosed: function () {
        let watchVideo = this._popupsNode.getChildByName("watch_video");
        watchVideo.active = false;
    },

    showFailedPopup: function () {
        this._popupMaskNode.active = true;
        this._gameFinished = true;
        let action = Global.createShowPopupAction();

        let failedPopup = this._popupsNode.getChildByName("failed_popup");
        let videoButton = failedPopup.getChildByName("video_button");
        let continueButton = failedPopup.getChildByName("continue_button");
        if(!cc.sys.isMobile || this._videoWatched || !sdkbox.PluginAdMob.isAvailable(Constants.AdMobRewarded)){
            videoButton.active = false;
            continueButton.y = -130;
        }
        else{
            this._videoWatched = true;
            videoButton.active = true;
            continueButton.y = -70;
        }
        failedPopup.active = true;
        failedPopup.y = 0;
        // failedPopup.runAction(action);
        // setTimeout(()=>{
        //     failedPopup.y = 0;
        // }, 0.48);
    },

    initAvailableFigures: function () {
        if (Global.AllLevels == null) {
            Global.AllLevels = require("AllLevels");
        }
        let levelSummary = Global.AllLevels[Global.PlayingLevel.levelNumber];
        this.availableFigures = [];
        for (let i = 1; i < 6; i++) {
            if (levelSummary[`figure_${i}`] == "true") {
                this.availableFigures.push(`fig${i}`);
            }
        }
        if (levelSummary[`figure_9`] == "true") {
            this.availableFigures.push(`fig9`);
        }
    },

    loadDynamicRes: function () {
        cc.loader.loadRes("animations/effect_wishing", (err, wishingAnim) => {
            this._wishingLineTemplate = new cc.Node("wishing_line");

            this._wishingLineTemplate.setAnchorPoint(0, 0.5);
            this._wishingLineTemplate.addComponent(cc.Animation).addClip(wishingAnim, "wishing_line");
            let sprite = this._wishingLineTemplate.addComponent(cc.Sprite);
            sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            this._wishingLinePool.put(this._wishingLineTemplate);
            for (let i = 0; i < 6; i++) {
                this._wishingLinePool.put(cc.instantiate(this._wishingLineTemplate));
            }
        });
    },

    afterLoadLevelMap: function () {
        // this.addFigureNode(Constants.FiguresLayerName, 4, 2, "fig2");
        // this.addFigureNode(Constants.FiguresLayerName, 3, 3, "fig3");
        // this.addFigureNode(Constants.FiguresLayerName, 4, 3, "fig3");
        // this.addFigureNode(Constants.FiguresLayerName, 6, 3, "fig3");
        // this.addFigureBonusNode(4, 4, Enum.BonusTypes.Lamp);
        // this.addFigureBonusNode(4, 3, Enum.BonusTypes.Lamp);
        this.setMapBorder();
        this._mapNodesArray.hasOwnProperty(Constants.ConveyorLayerName) && this.buildConveyors();
        this.checkMatches();
    },

    popTileFromPendingCrush: function (tilesArray) {
        for (let i = this._willCrushTiles.length - 1; i >= 0; i--) {
            if (this.includeTile(tilesArray, this._willCrushTiles[i])) {
                this._willCrushTiles.splice(i, 1);
            }
        }
    },

    popTileFromPendingMove: function (tile) {
        for (let i = this._willMoveTiles.length - 1; i >= 0; i--) {
            if (Global.isSameTile(this._willMoveTiles[i], tile)) {
                this._willMoveTiles.splice(i, 1);
            }
        }
    },

    onFailedDialogClose: function () {
        this.clearAllTimers();
        (cc.sys.isMobile) && Global.sendGAProgressionEvent(ga.EGAProgressionStatus.Fail, `level-${Global.PlayingLevel.levelNumber}`, `type-${Global.PlayingLevel.levelType}`);
        cc.director.preloadScene("map", ()=>{
            cc.director.loadScene("map");
        });
        if(Global.PlayingLevel.levelNumber > Constants.ADShowLevel) this.showInterstitial();
    },

    addMoveNumber4Failed: function () {
        this._gameFinished = false;
        Global.PendingActions = 0;
        Global.PlayingLevel.moveNumber = 5;
        this.setMoveNumber();
        let action = Global.createHidePopupAction();
        this._popupsNode.getChildByName("failed_popup").active = false;
        this._popupMaskNode.active = false;
    },

    onFailedContinue: function () {
        if(Global.UserData.coins > 25){
            Global.UserData.coins -= 25;
            this.addMoveNumber4Failed();
        }
        else{
            this.showBuyCoinsPopup();
        }
    },

    onFailedVideo: function () {
        if(Global.checkAdMobAvailable(Constants.AdMobRewarded)){
            this.showRewardedVideo();
            //this.addMoveNumber4Failed();
        }
    },

    onFinishDialogClose: function () {
        this.clearAllTimers();
        Global.PlayNext = false;
        cc.director.preloadScene("map", ()=>{
            cc.director.loadScene("map");
        });
        if(Global.PlayingLevel.levelNumber > Constants.ADShowLevel) this.showInterstitial();
    },

    onFinishDialogNext: function () {
        this.clearAllTimers();
        Global.PlayNext = true;
        Global.loadLevel(Global.PlayingLevel.levelNumber + 1);
        if(Global.PlayingLevel.levelNumber > Constants.ADShowLevel) this.showInterstitial();
    },

    clearAllTimers: function () {
        let killId = setTimeout(() => {
            cc.info(killId, "clear all timers.");
        }, 100);
        for (let i = killId; i > 0; i--) clearTimeout(i);
    },

    getMatchId: function () {
        this._matchId++;
        return this._matchId;
    },

    setFigureTile: function (col, row, celValue) {
        if (celValue == undefined) {
            celValue = row;
            row = col.row;
            col = col.col;
        }
        if (this._mapNodesArray[Constants.FiguresLayerName] === undefined) {
            this._mapNodesArray[Constants.FiguresLayerName] = [];
        }
        if (this._mapNodesArray[Constants.FiguresLayerName][row] === undefined) {
            this._mapNodesArray[Constants.FiguresLayerName][row] = [];
        }
        this._mapNodesArray[Constants.FiguresLayerName][row][col] = celValue;
    },

    showBannerAds: function(){
        if(cc.sys.isMobile) {
            cc.find("Canvas/ui_nodes/ads_banner/label").active = false;
            sdkbox.PluginAdMob.show('home');
        }
    },

    showRewardedVideo: function() {
        if(cc.sys.isMobile) {
            sdkbox.PluginAdMob.show('rewarded');
        }
    },

    showInterstitial: function() {
        if(cc.sys.isMobile) {
            sdkbox.PluginAdMob.show('gameover');
        }
    },

    showInfo: function (info) {
        cc.info(info, "admob");
    },

    initAdmob: function(){
        if(cc.sys.isMobile) {
            let self = this;
            sdkbox.PluginAdMob.setListener({
                adViewDidReceiveAd: function(name) {
                    self.showInfo('adViewDidReceiveAd name=' + name);
                },
                adViewDidFailToReceiveAdWithError: function(name, msg) {
                    self.showInfo('adViewDidFailToReceiveAdWithError name=' + name + ' msg=' + msg);
                },
                adViewWillPresentScreen: function(name) {
                    self.showInfo('adViewWillPresentScreen name=' + name);
                },
                adViewDidDismissScreen: function(name) {
                    self.showInfo('adViewDidDismissScreen name=' + name);
                },
                adViewWillDismissScreen: function(name) {
                    self.showInfo('adViewWillDismissScreen=' + name);
                },
                adViewWillLeaveApplication: function(name) {
                    self.showInfo('adViewWillLeaveApplication=' + name);
                },
                reward: function (name, currency, amount) {
                    cc.info(name, "video ads name");
                    cc.info(currency, "video ads currency");
                    cc.info(amount, "video ads amount");
                    self.addMoveNumber4Failed();
                }
            });
            sdkbox.PluginAdMob.init();
            this.showBannerAds();
            // setTimeout(() => {
            //     this.showBannerAds();
            // }, 2*1000);
        }
    },

    initManagers: function () {
        this.scoreManager = this.scoreManagerNode.getComponent(Constants.ScoreManagerName);
        Global.AudioManager = this.audioManager.getComponent(Constants.AudioManagerName);
        Global.loadSettings();
        Global.loadUserData();
        Global.Settings.backgroundMusic == true ? Global.AudioManager.playBGM() : Global.AudioManager.pauseMusic();
    },

    initBoosters: function () {
        let lampBoosterCountNode = this._boosterLampNode.getChildByName("booster_count");
        let noLampBoosterNode = this._boosterLampNode.getChildByName("no_booster");
        if (Global.UserData.availableBoosters.lamp > 0) {
            lampBoosterCountNode.getChildByName("lamp_booster_count").getComponent(cc.Label).string = Global.UserData.availableBoosters.lamp;
            lampBoosterCountNode.active = true;
            noLampBoosterNode.active = false;
        }
        else {
            noLampBoosterNode.active = true;
            lampBoosterCountNode.active = false;
        }

        let lineBoosterCountNode = this._boosterLineNode.getChildByName("booster_count");
        let noLineBoosterNode = this._boosterLineNode.getChildByName("no_booster");
        if (Global.UserData.availableBoosters.line > 0) {
            lineBoosterCountNode.getChildByName("line_booster_count").getComponent(cc.Label).string = Global.UserData.availableBoosters.line;
            lineBoosterCountNode.active = true;
            noLineBoosterNode.active = false;
        }
        else {
            noLineBoosterNode.active = true;
            lineBoosterCountNode.active = false;
        }

        let butterflyBoosterCountNode = this._boosterButterflyNode.getChildByName("booster_count");
        let noButterflyBoosterNode = this._boosterButterflyNode.getChildByName("no_booster");
        if (Global.UserData.availableBoosters.butterfly > 0) {
            butterflyBoosterCountNode.getChildByName("butterfly_booster_count").getComponent(cc.Label).string = Global.UserData.availableBoosters.butterfly;
            butterflyBoosterCountNode.active = true;
            noButterflyBoosterNode.active = false;
        }
        else {
            noButterflyBoosterNode.active = true;
            butterflyBoosterCountNode.active = false;
        }

    },

    initGlobalPools: function () {
        let initCount = 5;
        if (Tile.fogPool == null) {
            Tile.fogPool = new cc.NodePool();
            let fogTemplate = cc.find("Canvas/game_mask/animation/fog");
            for (let i = 0; i < initCount; ++i) {
                let fog = cc.instantiate(fogTemplate); // create node instance
                Tile.fogPool.put(fog); // populate your pool with putInPool method
            }
        }

        if (FigureTile.figuresCrushAnimationPool == null) {
            FigureTile.figuresCrushAnimationPrefab = this.figuresCrushPrefab;
            FigureTile.figuresCrushAnimationPool = new cc.NodePool();
            for (let i = 0; i < initCount * 2; i++) {
                let figureCrush = cc.instantiate(this.figuresCrushPrefab);
                FigureTile.figuresCrushAnimationPool.put(figureCrush);
            }
        }

        if (CountStoneTile.countStoneCrushPool == null) {
            CountStoneTile.countStoneCrushPool = new cc.NodePool();
            for (let i = 0; i < initCount; ++i) {
                let countStoneCrush = cc.instantiate(this.countStoneCrushPrefab); // create node instance
                CountStoneTile.countStoneCrushPool.put(countStoneCrush); // populate your pool with putInPool method
            }
        }

        this._figurePool = new cc.NodePool(Constants.FigureScriptName);
        this._figBonusPool = new cc.NodePool(Constants.FigureBonusScriptName);
        this._swirlPool = new cc.NodePool(Constants.SwirlScriptName);
        this._morphPool = new cc.NodePool(Constants.MorphScriptName);
        this._savedNodesPool = new cc.NodePool();
        for (let i = 0; i < 15; i++) {
            let node = new cc.Node();
            node.addComponent(cc.Sprite);
            this._savedNodesPool.put(node);
        }

        this._bonusBarPool = new cc.NodePool();
        for (let i = 0; i < initCount; ++i) {
            let bonusBar = cc.instantiate(this.bonusBarEffectPrefab);
            this._bonusBarPool.put(bonusBar);
        }

        this._bonusCirclePool = new cc.NodePool();
        for (let i = 0; i < initCount; ++i) {
            let bonusCircle = cc.instantiate(this.bonusCircleEffectPrefab);
            this._bonusCirclePool.put(bonusCircle);
        }
        this._bonusCircleLightPool = new cc.NodePool();
        for (let i = 0; i < initCount; ++i) {
            let bonusCircleLight = cc.instantiate(this.bonusCircleLightEffectPrefab);
            this._bonusCircleLightPool.put(bonusCircleLight);
        }

        this._shootBonusPool = new cc.NodePool();
        let shootBonusParticlePref = cc.instantiate(this.shootBonusParticlePrefab);
        this._shootBonusPool.put(shootBonusParticlePref);

        this._fairyParticlePool = new cc.NodePool();
        let fairyParticlePref = cc.instantiate(this.fairyParticlePrefab);
        this._fairyParticlePool.put(fairyParticlePref);

        this._fairyBombParticlePool = new cc.NodePool();
        this._wideFairyParticlePool = new cc.NodePool();

        this._lampLinePool = new cc.NodePool();
        this._lampPointPool = new cc.NodePool();
        for (let i = 0; i < 15; i++) {
            let lampLine = cc.instantiate(this.lampLinePrefab);
            this._lampLinePool.put(lampLine);

            let lampPoint = new cc.Node("lamp_point");
            let sprite = lampPoint.addComponent(cc.Sprite);
            sprite.spriteFrame = this.texture3Atlas.getSpriteFrame("effect_2_1");
            this._lampPointPool.put(lampPoint);
        }

        this._wishingLinePool = new cc.NodePool();

        if (!Tile.mysteryCrushPool) {
            Tile.mysteryCrushPool = new cc.NodePool();
            Tile.mysteryCrushPrefab = this.mysteryCrushPrefab;
            for (let i = 0; i < initCount; i++) {
                let mysteryCrush = cc.instantiate(this.mysteryCrushPrefab);
                Tile.mysteryCrushPool.put(mysteryCrush);
            }
        }
        if (!Tile.mysteryPiecePool) {
            Tile.mysteryPiecePool = new cc.NodePool();
            Tile.mysteryPiecePrefab = this.mysteryPiecePrefab;
            for (let i = 0; i < initCount; i++) {
                let mysteryPiece = cc.instantiate(this.mysteryPiecePrefab);
                Tile.mysteryPiecePool.put(mysteryPiece);
            }
        }

    },

    instantiateFigures: function (figuresCount) {
        for (let i = 0; i < figuresCount; i++) {
            let figure = cc.instantiate(this.figTemplate);
            this._figurePool.put(figure);
        }
    },

    initConstants: function () {

        this._viewSize = {
            width: this.gameMapNode.width,
            height: this.gameMapNode.height
        };

        Global.GridViewSize = this._viewSize;

        this._minVisibleColumn = 99;
        this._minVisibleRow = 99;
        this._hintTimer = null;

        // arrays to back up bonus tiles
        this._bonusArrays = {
            bomb_area: [],
            hbonus_area: [],
            vbonus_area: [],
            xbonus_area: [],
            squarebomb_area: [],
            lamp_area: []
        };

        this._figuresForce = this.getRandomFigure();
    },

    initLevelInfo: function () {
        const levelNode = cc.find("Canvas/ui_nodes/top_status_area/common_ui/level_number");
        levelNode.getComponent(cc.Label).string = Global.PlayingLevel.levelNumber;
        const numMovesNode = cc.find("Canvas/ui_nodes/top_status_area/common_ui/move_num");
        numMovesNode.getComponent(cc.Label).string = Global.PlayingLevel.moveNumber;
    },

    initNodeTemplates: function () {
        this._bgTemplate = this.backgroundTileLayer.getChildByName('bg_tile');
        this._bgTemplate.removeFromParent(false);
        this._countStoneTemplate = this.figuresLayer.getChildByName('count_stone');
        this._countStoneTemplate.removeFromParent(false);
        this._teleportBeginTemplate = cc.find("Canvas/game_mask/game_node/teleports/begin_01");
        this._teleportBeginTemplate.removeFromParent(false);
        this._teleportEndTemplate = cc.find("Canvas/game_mask/game_node/teleports/end_01");
        this._teleportEndTemplate.removeFromParent(false);
        this._wishingWellTemplate = cc.find("Canvas/game_mask/game_node/figures/wishing_well");
        this._wishingWellTemplate.removeFromParent(false);

        this._topCheckNode = cc.find('Canvas/ui_nodes/top_status_area/top_1/check');
        this._uiNode = cc.find("Canvas/ui_nodes");
        this._popupsNode = this._uiNode.getChildByName("popups");
        this._popupMaskNode = this._popupsNode.getChildByName("mask");
        this._popupMaskNode.active = false;

        this._globalEffectsContainer = cc.find("Canvas/global_animation");

        this._barImageTemplate = this._globalEffectsContainer.getChildByName("bar");
        this._barImageTemplate.removeFromParent(false);
        this._circleImageTemplate = this._globalEffectsContainer.getChildByName("bonus_circle");
        this._circleImageTemplate.removeFromParent(false);
        this._circleLightImageTemplate = this._globalEffectsContainer.getChildByName("bonus_circle_light");
        this._circleLightImageTemplate.removeFromParent(false);
        this._barParticleTemplate = this._globalEffectsContainer.getChildByName("bonus_particle");

        this._colorPieTemplate = cc.find("figures/color_pie", this.gameMapNode);
        this._colorPieTemplate.removeFromParent(false);

        this._boosterInputNode = cc.find("bottom_booster_area/booster_input", this._uiNode);
        this._boosterInputNode.active = false;
        this._boosterParticleNode = cc.find("bottom_booster_area/booster_effect", this._uiNode);
        this._boosterParticleNode.active = false;
        this._boosterLampNode = cc.find("bottom_booster_area/lamp", this._uiNode);
        this._boosterLineNode = cc.find("bottom_booster_area/line", this._uiNode);
        this._boosterButterflyNode = cc.find("bottom_booster_area/butterfly", this._uiNode);
        let mapMask = this.gameMapNode.parent.getComponent(cc.Mask);
        // mapMask.enabled = false;

        //asd.remove();

        this._butterflyAction = cc.sequence([
            cc.scaleTo(0.05, 0.2, 2),
            cc.scaleTo(0.05, 2, 2),
            cc.scaleTo(0.05, 0.2, 2),
            cc.scaleTo(0.05, 2, 2),
            cc.scaleTo(0.05, 0.2, 2),
            cc.scaleTo(0.05, 2, 2),
            cc.scaleTo(0.05, 0.2, 2),
            cc.scaleTo(0.05, 2, 2),
            cc.scaleTo(0.05, 0.2, 2),
            cc.scaleTo(0.05, 2, 2),
            cc.scaleTo(0.05, 0.2, 2),
            cc.scaleTo(0.05, 2, 2),
            cc.scaleTo(0.05, 0.2, 2),
            cc.scaleTo(0.05, 1, 1),
        ]);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this, false);

    },

    onKeyDown: function (event) {
        // cc.info(event, `onKeyDown: keyCode: ${JSON.stringify(event.keyCode)}`);

        switch(event.keyCode) {
            case cc.KEY.back:{
                let settings = this._popupsNode.getChildByName("settings_popup");
                let finish = this._popupsNode.getChildByName("finish_popup");
                let failed = this._popupsNode.getChildByName("failed_popup");
                if(failed.active){
                    this.onFailedDialogClose();
                }
                else if(finish.active){
                    this.onFinishDialogClose();
                }
                else if(settings.active){
                    this.onSettingsCloseClicked();
                }
                else{
                    this.onSettingsButtonClicked();
                }
                break;
            }
        }
    },

    initEventHandlers: function () {
        this._boosterInputNode.on(cc.Node.EventType.TOUCH_START, this.onGameAreaTouchStart, this);
    },

    onGameAreaTouchStart: function (event) {
        let boosterPos = this.gameMapNode.convertTouchToNodeSpace(event.touch);
        //cc.info(this._pickedPosition);
        let pickedTilePos = this.pos2grid(boosterPos);
        let pickedTile = this.getFigureTile(pickedTilePos.x, pickedTilePos.y);

        if (pickedTile == null) {
            return;
        }
        // cc.info(pickedTile, "Booster picked tile.");
        switch (Global.ActiveBooster) {
            case Enum.Boosters.Lamp:
                this.processLampBooster(pickedTile);
                break;
            case Enum.Boosters.Line:
                this.processLineBooster(pickedTile);
                break;
            case Enum.Boosters.Butterfly:
                this.processButterflyBooster(pickedTile);
                break;
        }
        Global.ActiveBooster = null;
        this._boosterInputNode.active = false;
        this._boosterParticleNode.active = false;
    },

    activateBoosterParticle: function (pos) {
        this._boosterParticleNode.x = pos.x;
        this._boosterParticleNode.y = pos.y;
        this._boosterParticleNode.active = true;
        this._boosterParticleNode.getComponent(cc.ParticleSystem).resetSystem();
    },

    processLampBooster: function (pickedTile) {
        if (pickedTile.isMovable && pickedTile.isMatchable) {
            this.addPendingAction();
            Global.UserData.availableBoosters[Enum.Boosters.Lamp] --;
            Global.UserData.save();
            this.initBoosters();
            let lampEffectNode = this._boosterLampNode.getChildByName("lamp_booster_effect");
            if (lampEffectNode == null) {
                lampEffectNode = new cc.Node("lamp_booster_effect");
                let sprite = lampEffectNode.addComponent(cc.Sprite);
                sprite.spriteFrame = this.figuresAtlas.getSpriteFrame(Enum.BonusTypes.Lamp);
                this._boosterLampNode.addChild(lampEffectNode);
            }

            let pos = Global.transformCoordinates(pickedTile.node, this._boosterLampNode);
            lampEffectNode.x = pos.x + Constants.TileSize / 2;
            lampEffectNode.y = pos.y + Constants.TileSize / 2;
            lampEffectNode.active = true;
            lampEffectNode.setScale(2, 2);
            let action = cc.scaleTo(1, 1, 1).easing(cc.easeBackIn());
            lampEffectNode.runAction(action);

            setTimeout(() => {
                this.setGameState();
                lampEffectNode.active = false;
                if (pickedTile instanceof FigureBonusTile || (pickedTile instanceof MorphTile && pickedTile.morphActive)) {
                    if (pickedTile.bonus == Enum.BonusTypes.Lamp) {
                        this.show2LampAction(pickedTile);
                    }
                    else {
                        this.processLampAndBonus("booster", pickedTile.gridPosition);
                    }
                }
                else {
                    this.addFigureBonusNode(pickedTile.gridPosition.x, pickedTile.gridPosition.y, Enum.BonusTypes.Lamp);
                    this.processLampBonus(pickedTile.figure, pickedTile.gridPosition);
                }
            }, 1000);
        }
    },

    processLineBooster: function (pickedTile) {
        Global.UserData.availableBoosters[Enum.Boosters.Line] --;
        Global.UserData.save();
        this.initBoosters();
        let lineEffectNode = this._boosterLineNode.getChildByName("line_booster_effect");
        let pos = Global.transformCoordinates(pickedTile.node, this._boosterLineNode);
        lineEffectNode.x = pos.x + Constants.TileSize / 2;
        lineEffectNode.y = pos.y + Constants.TileSize / 2;
        lineEffectNode.active = true;
        lineEffectNode.getComponent("sp.Skeleton").setAnimation(0, "line_booster", false);
        setTimeout(() => {
            this.processHBonus(pickedTile.gridPosition.x, pickedTile.gridPosition.y);
            this.processVBonus(pickedTile.gridPosition.x, pickedTile.gridPosition.y);
            this.removeTile(pickedTile.gridPosition.x, pickedTile.gridPosition.y);
            Global.AudioManager.playBombLine();
        }, 0.6 * 1000);
        setTimeout(() => {
            lineEffectNode.active = false;
        }, 1.08 * 1000);
    },

    processButterflyBooster: function (pickedTile) {
        Global.UserData.availableBoosters[Enum.Boosters.Butterfly] --;
        Global.UserData.save();
        this.initBoosters();
        let randomPositions = [];
        for (let i = 0; i < 2; i++) {
            let x = this._gameArea.left + Constants.TileSize * 2 + Math.random() * (this._gameArea.width - Constants.TileSize * 3);
            let y = this._gameArea.bottom + Constants.TileSize * 2 + Math.random() * (this._gameArea.height - Constants.TileSize * 3);
            randomPositions.push(cc.p(x, y));
        }

        let seqScale = this._butterflyAction.clone();
        let pos = {x: pickedTile.node.x + Constants.TileSize / 2, y: pickedTile.node.y + Constants.TileSize / 2};
        let bezier = [randomPositions[0], randomPositions[1], pos];
        let bezierTo = cc.bezierTo(0.7, bezier);
        let actions = [
            cc.spawn([
                seqScale,
                bezierTo
            ]),
            cc.callFunc(this.recycleTempNode, this),
            cc.callFunc(this.removeTile, this, {col: pickedTile.gridPosition.x, row: pickedTile.gridPosition.y}),
        ];
        let seq = cc.sequence(actions);
        let tempNode = this.getTempNode();
        tempNode.getComponent(cc.Sprite).spriteFrame = this.uiAtlas.getSpriteFrame("butterfly");
        tempNode.x = 0;
        tempNode.y = 0;
        tempNode.active = true;
        tempNode.setAnchorPoint(0.5, 0.5);
        this.gameMapNode.addChild(tempNode);
        tempNode.runAction(seq);
    },

    createLampLine: function () {
        let lampLine = null;
        if (this._lampLinePool && this._lampLinePool.size() > 0) {
            lampLine = this._lampLinePool.get();
        }
        else {
            lampLine = cc.instantiate(this.lampLinePrefab);
        }
        return lampLine;
    },

    recycleLampLine: function (lampLine) {
        (this._lampLinePool != null) && (lampLine) && (this._lampLinePool.put(lampLine));
    },

    createLampPoint: function () {
        let lampPoint = null;
        if (this._lampPointPool && this._lampPointPool.size() > 0) {
            lampPoint = this._lampPointPool.get();
        }
        else {
            lampPoint = new cc.Node("lamp_point");
            let sprite = lampPoint.addComponent(cc.Sprite);
            sprite.spriteFrame = this.texture3Atlas.getSpriteFrame("effect_2_1");
        }
        lampPoint.setScale(1, 1);
        return lampPoint;
    },

    recycleLampPoint: function (lampPoint) {
        (this._lampPointPool != null) && (lampPoint) && (this._lampPointPool.put(lampPoint));
    },

    createFigure: function () {
        let figure = null;
        if (this._figurePool != null && this._figurePool.size() > 0) { // use size method to check if there're nodes available in the pool
            figure = this._figurePool.get();
        } else { // if not enough node in the pool, we call cc.instantiate to create node
            figure = cc.instantiate(this.figTemplate);
        }
        figure.init();
        figure.on(Constants.TILE_MOVED, this.onFiguresMove, this);
        figure.on(Constants.FIGURE_DESTROYED, this.onFigureDestroyed, this);
        // figure.on(Constants.CHECK_MATCH, this.onCheckMatch, this);
        figure.on(Constants.SNAKE_DESTROYED, this.onSnakeDestroyed, this);
        figure.on(Constants.MILK_DESTROYED, this.onMilkDestroyed, this);

        return figure;
    },

    createFigBonus: function () {
        let figure = null;
        if (this._figBonusPool != null && this._figBonusPool.size() > 0) { // use size method to check if there're nodes available in the pool
            figure = this._figBonusPool.get();
        } else { // if not enough node in the pool, we call cc.instantiate to create node
            figure = cc.instantiate(this.figBonusTemplate);
        }
        figure.on(Constants.TILE_MOVED, this.onFiguresMove, this);
        figure.on(Constants.FIGURE_DESTROYED, this.onFigureDestroyed, this);
        // figure.on(Constants.CHECK_MATCH, this.onCheckMatch, this);
        figure.on(Constants.SNAKE_DESTROYED, this.onSnakeDestroyed, this);
        figure.on(Constants.MILK_DESTROYED, this.onMilkDestroyed, this);

        return figure;
    },

    createSwirl: function () {
        let swirl = null;
        if (this._swirlPool != null && this._swirlPool.size() > 0) { // use size method to check if there're nodes available in the pool
            swirl = this._swirlPool.get();
        } else { // if not enough node in the pool, we call cc.instantiate to create node
            swirl = cc.instantiate(this.swirlTemplate);
        }
        swirl.on(Constants.TILE_MOVED, this.onFiguresMove, this);
        swirl.on(Constants.FIGURE_DESTROYED, this.onFigureDestroyed, this);
        swirl.on(Constants.MILK_DESTROYED, this.onMilkDestroyed, this);
        return swirl;
    },

    createMorph: function () {
        let morph = null;
        if (this._morphPool != null && this._morphPool.size() > 0) {
            morph = this._morphPool.get();
        }
        else {
            morph = cc.instantiate(this.morphTilePrefab);
        }
        let morphTile = morph.getComponent(Constants.MorphScriptName);
        if(morphTile){
            morphTile.bonus = undefined;
            morphTile.forceWay = undefined;
        }
        morph.on(Constants.TILE_MOVED, this.onFiguresMove, this);
        morph.on(Constants.FIGURE_DESTROYED, this.onFigureDestroyed, this);
        // morph.on(Constants.CHECK_MATCH, this.onCheckMatch, this);
        morph.on(Constants.SNAKE_DESTROYED, this.onSnakeDestroyed, this);
        morph.on(Constants.MILK_DESTROYED, this.onMilkDestroyed, this);
        return morph;
    },

    getTempNode: function () {
        let node = null;
        if (this._savedNodesPool && this._savedNodesPool.size() > 0) {
            node = this._savedNodesPool.get();
        }
        else {
            node = new cc.Node();
            node.addComponent(cc.Sprite);
        }
        return node;
    },

    getBonusBarEffect: function () {
        let bonusBar = null;
        if (this._bonusBarPool != null && this._bonusBarPool.size() > 0) { // use size method to check if there're nodes available in the pool
            bonusBar = this._bonusBarPool.get();
        } else { // if not enough node in the pool, we call cc.instantiate to create node
            bonusBar = cc.instantiate(this.bonusBarEffectPrefab);
        }
        return bonusBar;
    },

    getBonusCircleEffect: function () {
        let bonusCircle = null;
        if (this._bonusCirclePool != null && this._bonusCirclePool.size() > 0) { // use size method to check if there're nodes available in the pool
            bonusCircle = this._bonusCirclePool.get();
        } else { // if not enough node in the pool, we call cc.instantiate to create node
            bonusCircle = cc.instantiate(this.bonusCircleEffectPrefab);
        }
        return bonusCircle;
    },

    getBonusCircleLightEffect: function () {
        let bonusCircle = null;
        if (this._bonusCircleLightPool != null && this._bonusCircleLightPool.size() > 0) { // use size method to check if there're nodes available in the pool
            bonusCircle = this._bonusCircleLightPool.get();
        } else { // if not enough node in the pool, we call cc.instantiate to create node
            bonusCircle = cc.instantiate(this.bonusCircleLightEffectPrefab);
        }
        return bonusCircle;
    },

    getShootBonusParticle: function () {
        let shootBonus = null;
        if (this._shootBonusPool != null && this._shootBonusPool.size() > 0) {
            shootBonus = this._shootBonusPool.get();
        } else {
            shootBonus = cc.instantiate(this.shootBonusParticlePrefab);
        }
        return shootBonus;
    },

    getFairyParticle: function () {
        let fairyParticle = null;
        if (this._fairyParticlePool != null && this._fairyParticlePool.size() > 0) {
            fairyParticle = this._fairyParticlePool.get();
        } else {
            fairyParticle = cc.instantiate(this.fairyParticlePrefab);
        }
        return fairyParticle;
    },

    getFairyBombParticle: function () {
        let fairyParticle = null;
        if (this._fairyBombParticlePool != null && this._fairyBombParticlePool.size() > 0) {
            fairyParticle = this._fairyBombParticlePool.get();
        } else {
            fairyParticle = cc.instantiate(this.fairyBombParticlePrefab);
        }
        return fairyParticle;
    },

    getWideFairyParticle: function () {
        let fairyParticle = null;
        if (this._wideFairyParticlePool != null && this._wideFairyParticlePool.size() > 0) {
            fairyParticle = this._wideFairyParticlePool.get();
        } else { // if not enough node in the pool, we call cc.instantiate to create node
            fairyParticle = cc.instantiate(this.wideFairyParticlePrefab);
        }
        return fairyParticle;
    },

    getWishingLine: function () {
        let wishingLine = null;
        if (this._wishingLinePool != null && this._wishingLinePool.size() > 0) {
            wishingLine = this._wishingLinePool.get();
        }
        else if (this._wishingLineTemplate != null) {
            wishingLine = cc.instantiate(this._wishingLineTemplate);
        }
        return wishingLine;
    },

    recycleWishingLine: function (wishingLine) {
        (this._wishingLinePool != null) && (wishingLine != null) && (this._wishingLinePool.put(wishingLine));
    },

    recycleFigure: function (figureNode) {
        try {
            if (figureNode == null) {
                return;
            }
            if (figureNode.getNumberOfRunningActions() > 0) {
                // cc.info(figureNode, "running actions at Figure");
                figureNode.stopAllActions();
                this.setGameState();
            }
            figureNode && (figureNode.getComponent(Constants.FigureScriptName).isPendingAction = false);
            (this._figurePool != null) && (this._figurePool.put(figureNode));
        } catch (e) {
            cc.info(e, "recycleFigure");
        }
    },

    recycleShootBonus: function (shootBonus) {
        (this._shootBonusPool !== null) && (this._shootBonusPool.put(shootBonus));
    },

    recycleFairyParticle: function (shootBonus) {
        (this._fairyParticlePool !== null) && (this._fairyParticlePool.put(shootBonus));
    },

    recycleFairyBombParticle: function (fairyBombParticle) {
        (this._fairyBombParticlePool !== null) && (this._fairyBombParticlePool.put(fairyBombParticle));
    },

    recycleWideFairyParticle: function (shootBonus) {
        (this._wideFairyParticlePool !== null) && (this._wideFairyParticlePool.put(shootBonus));
    },

    recycleFigBonus: function (figBonusNode) {
        if (figBonusNode.getNumberOfRunningActions() > 0) {
            // cc.info(figBonusNode.getNumberOfRunningActions(), "running actions at Bonus");
            figBonusNode.stopAllActions();
            this.setGameState();
        }
        this._figBonusPool.put(figBonusNode);
    },

    recycleMorph: function (morph) {
        if (morph && morph.getNumberOfRunningActions() > 0) {
            // cc.info(figBonusNode.getNumberOfRunningActions(), "running actions at Bonus");
            morph.stopAllActions();
            this.setGameState();
        }
        this._morphPool && morph && this._morphPool.put(morph);
    },

    recycleSwirl: function (swirlNode) {
        (this._swirlPool != null) && (this._swirlPool.put(swirlNode));
    },

    recycleBonusBar: function (bonusBar) {
        (this._bonusBarPool != null) && (this._bonusBarPool.put(bonusBar));
    },

    recycleBonusCircle: function (bonusCircle) {
        (this._bonusCirclePool != null) && (this._bonusCirclePool.put(bonusCircle));
    },

    recycleBonusCircleLight: function (bonusCircle) {
        (this._bonusCircleLightPool != null) && (this._bonusCircleLightPool.put(bonusCircle));
    },

    recycleTempNode: function (node) {
        (this._savedNodesPool != null) && (node != null) && (this._savedNodesPool.put(node));
    },

    transformTilePos: function (position, toNode) {
        try {
            let worldPos = this.gameMapNode.convertToWorldSpaceAR(position);
            return toNode.convertToNodeSpaceAR(worldPos);
        } catch (e) {
            return null;
        }
    },

    grid2pos: function (col, row) {
        col = parseInt(col);
        row = parseInt(row);
        let x = col * Constants.TileSize;
        let y = this._viewSize.height - (row + 1) * Constants.TileSize;
        return cc.p(x, y);
    },

    pos2grid: function (pos) {
        const col = Math.floor(pos.x / Constants.TileSize);
        let row = Math.floor((this._viewSize.height - pos.y) / Constants.TileSize);

        return new cc.p(col, row);

    },

    loadLevelMap: function () {
        if (Global.PlayingLevel && Global.PlayingLevel.levelMap != null) {
            let layers = Global.PlayingLevel.levelMap.data;
            this._forceFigure = this.getRandomFigure();
            let totalTileCount = 0;
            for (let index in layers) {
                let layer = layers[index];
                let layerName = layer.Name;
                this._columnCount = layer.Width;
                this._rowCount = layer.Height;

                if (this._mapNodesArray[layerName] == undefined) {
                    this._mapNodesArray[layerName] = [];
                }

                let gridLineData = layer.data;

                for (let key in gridLineData) {
                    const row = gridLineData[key];
                    const rowIndex = row.GridLine;
                    const rowData = row.data;
                    let cellValue = "";
                    let j = 1;

                    let mapRowIndex = this.fileIndex2GameIndex(rowIndex);
                    if (layerName == Constants.BackgroundLayerName) {
                        this._maxVisibleRow = this._maxVisibleRow < mapRowIndex ? mapRowIndex : this._maxVisibleRow;
                        this._minVisibleRow = this._minVisibleRow > mapRowIndex ? mapRowIndex : this._minVisibleRow;
                    }
                    if (this._mapNodesArray[layerName][mapRowIndex] == undefined) {
                        this._mapNodesArray[layerName][mapRowIndex] = [];
                    }

                    for (let key1 in rowData) {
                        const cellData = rowData[key1];
                        const col = cellData.X;
                        for (; j < col; j++) {
                            if (cellValue == "") {
                                continue;
                            }
                            let mapColIndex = this.fileIndex2GameIndex(j);

                            if (layerName == Constants.BackgroundLayerName) {
                                this._maxVisibleColumn = this._maxVisibleColumn < mapColIndex ? mapColIndex : this._maxVisibleColumn;
                                this._minVisibleColumn = this._minVisibleColumn > mapColIndex ? mapColIndex : this._minVisibleColumn;
                                totalTileCount++;
                                this.setFigureTile(mapColIndex, mapRowIndex, Constants.HOLE);
                            }
                            this.addNodeByLayerName(layerName, mapColIndex, mapRowIndex, cellValue); //
                        }
                        cellValue = cellData.SID;
                    }
                }
                if (layerName == Constants.BackgroundLayerName) {
                    this.instantiateFigures(totalTileCount + 10);
                }
            }
            this.calibrateGameArea();
            // this.addFigureBonusNode(6, 6, "lamp_area");
            this._willCrushTiles = [];
            this._figNodesArray = this._mapNodesArray[Constants.FiguresLayerName];
            this._levelMapLoaded = true;
        }
    },

    calibrateGameArea: function () {
        // calibrate game area position because its columns and rows are variable.
        this._minColumn = this._minVisibleColumn;
        this._maxColumn = this._maxVisibleColumn;
        this._minRow = this._minVisibleRow;
        this._maxRow = this._maxVisibleRow;

        this._rowPageCount = Math.round(this._maxRow / Constants.MapSize.height);
        this._colPageCount = Math.round(this._maxColumn / Constants.MapSize.width);

        this.setGamePage(this._colCurrentPage, this._rowCurrentPage);
        this.setGameNode2LastPage();
        this.showPageMovingAction();
    },

    setGameNode2LastPage: function () {
        let originPos = this.grid2pos(this._maxColumn - 1 > Constants.MapSize.width ? this._maxColumn - Constants.MapSize.width + 1 : this._minVisibleColumn, this._maxRow);
        if (this._maxColumn < this._maxVisibleColumn) {

        }
        this.gameMapNode.x = -originPos.x + (355 - this._gameArea.width / 2);
        this.gameMapNode.y = -originPos.y + (360 - this._gameArea.height / 2);
    },

    showPageMovingAction: function () {
        let actionTime = 0;
        if (this._rowPageCount > 1) {
            actionTime = 0.1 * (this._maxVisibleRow - this._minVisibleRow);
            let trailAction = new cc.MoveTo(actionTime, cc.p(this.gameMapNode.x, -this._gameArea.bottom));
            this.addPendingAction();
            let seq = new cc.Sequence(cc.delayTime(0.5), trailAction, cc.callFunc(this.setGameState, this));
            this.gameMapNode.runAction(seq);
        }
        else if (this._colPageCount > 1) {
            actionTime = 0.2 * (this._maxVisibleColumn - this._minVisibleColumn);
            let trailAction = new cc.MoveTo(actionTime, cc.p(-this._gameArea.left, this.gameMapNode.y));
            this.addPendingAction();
            let seq = new cc.Sequence(cc.delayTime(0.5), trailAction, cc.callFunc(this.setGameState, this));
            this.gameMapNode.runAction(seq);
        }
        setTimeout(() => {
            this.checkMatches();
        }, (actionTime + 0.6) * 1000);
        this._fullWells = [];
    },

    setGamePage: function (colPage, rowPage) {
        this._colCurrentPage = colPage;
        this._rowCurrentPage = rowPage;

        this._minVisibleColumn = (this._colCurrentPage - 1) * (Constants.PageSpacing.col + Constants.MapSize.width) + this._minVisibleColumn;
        this._maxVisibleColumn = (Constants.MapSize.width < (this._maxColumn - this._minColumn) ? (this._minVisibleColumn + Constants.MapSize.width - 1) : this._maxColumn);
        this._minVisibleRow = (this._rowCurrentPage - 1) * (Constants.PageSpacing.row + Constants.MapSize.height) + this._minRow;
        this._maxVisibleRow = this._minVisibleRow + (Constants.MapSize.height < (this._maxRow - this._minRow) ? (Constants.MapSize.height - 1) : this._maxRow);

        this._minVisibleColumn = this._minVisibleColumn < this._minColumn ? this._minColumn : this._minVisibleColumn;
        this._maxVisibleColumn = this._maxVisibleColumn > this._maxColumn ? this._maxColumn : this._maxVisibleColumn;
        this._minVisibleRow = this._minVisibleRow < this._minRow ? this._minRow : this._minVisibleRow;
        // if (this._rowCurrentPage > 1 && this._maxRow - this._minVisibleRow < Constants.MapSize.height) {
        //     this._minVisibleRow = this._maxRow - Constants.MapSize.height + 1;
        // }
        this._maxVisibleRow = this._maxVisibleRow > this._maxRow ? this._maxRow : this._maxVisibleRow;
        if (this._mapNodesArray[Constants.ScrollLayerName]) {
            let i = 1;
            for (let row in this._mapNodesArray[Constants.ScrollLayerName]) {
                if (i == this._rowCurrentPage) {
                    this._maxVisibleRow = parseInt(row);
                    this._minVisibleRow = this._maxVisibleRow - Constants.MapSize.height + 1;
                }
                i++;
            }
        }

        let rightTop = this.grid2pos(this._maxVisibleColumn + 1, this._minVisibleRow - 1);
        let leftBottom = this.grid2pos(this._minVisibleColumn, this._maxVisibleRow);
        this._gameArea = {
            left: leftBottom.x,
            right: rightTop.x,
            top: rightTop.y,
            bottom: leftBottom.y,
            width: Math.abs(rightTop.x - leftBottom.x),
            height: Math.abs(rightTop.y - leftBottom.y),
            center: cc.v2((leftBottom.x + rightTop.x) / 2, (rightTop.y + leftBottom.y) / 2)
        };
        // this._boosterInputNode.setPosition(this._gameArea.left, this._gameArea.bottom);
        // this._boosterInputNode.width = this._gameArea.width;
        // this._boosterInputNode.height = this._gameArea.height;
    },

    fileIndex2GameIndex: function (fileIndex) {
        return fileIndex - 0;
    },

    addNodeByLayerName: function (layerName, col, row, cellValue) {
        switch (layerName) {
            case "background":
                this.addBackgroundTile(col, row);
                break;
            case "conveyor":
                this.addConveyorTile(col, row, cellValue);
                break;
            case "way":
                this.addWayNode(col, row, cellValue);
                break;
            case "way_key_points":
                this.addWayKeyPointsNode(col, row, cellValue);
                break;
            case "items":
                if (cellValue == "door_teleport_small" || cellValue == "door_teleport_small_dest") {
                    this.addDoorTeleportSmall(col, row, cellValue);
                }
                else if (cellValue == "door_teleport" || cellValue == "door_teleport_dest") {
                    this.addDoorTeleportNodes(col, row, cellValue);
                }
                break;
            case "stamps":
                this.addMarkTile(col, row, cellValue);
                break;
            case "stamps_cover1":
                this.addMarkLockTile(col, row, cellValue);
                break;
            case "stamps_cover2":
                this.addMarkLockTile(col, row, cellValue);
                break;
            case "stamps_cover3":
                this.addMarkLockTile(col, row, cellValue);
                break;
            case "figures":
                this.addFigLayerNode(col, row, cellValue);
                break;
            case "figures_bonus":
                this.addFigureBonusNode(col, row, cellValue);
                break;
            case "figures_chains":
                this.addFigureChainsTile(col, row, cellValue);
                break;
            case "ground":
                cellValue != "figures_area" && this.addGroundTile(col, row, cellValue);
                break;
            case "weed":
                this.addWeedTile(col, row, cellValue);
                break;
            case "grass1":
                this.addGrassTile(col, row, cellValue);
                break;
            case "grass2":
                this.addGrassTile(col, row, cellValue);
                break;
            case "mystery":
                this.addMysteryTile(col, row, cellValue);
                break;
            case "snake":
                this.addSnakeNode(col, row, cellValue);
                break;
            case "milk":
                if (cellValue == "milk") {
                    this.addMilkTile(col, row, cellValue, 0, false);
                }
                else {
                    this.addGooBombTile(col, row, cellValue);
                }
                break;
            case "dont_mix_items":
                this.addDontMixItem(col, row, cellValue);
                break;
            case "relic_area":
                this.addRelicTile(col, row, cellValue);
                break;
            case "pickup":
                this.addPickupTile(col, row, cellValue);
                break;
            case "scroll":
                this.addScroll(col, row, cellValue);
                break;
            case "mmpp":
                this.addMorphTile(col, row, cellValue);
                break;
            case "teleports":
                this.addTeleportsNode(col, row, cellValue);
                break;
            case "generators":
                this.addGeneratorTile(col, row, cellValue);
                break;
            // case "portals":
            //     this.addFigureNode(col, row, cellValue);
            //     break;

            default:
                this.addOtherNode(layerName, col, row, cellValue);
                break;
        }
    },

    checkSpawnGooBomb: function () {
        return Global.checkSpawn(this._spawnedTilesCount, Global.PlayingLevel.spawnGooBomb);
    },

    addMorphTile: function (col, row, cellValue) {
        let oldTile = this.getFigureTile(col, row);
        let morphNode = this.createMorph();
        let tile = morphNode.getComponent(Constants.MorphScriptName);
        if (oldTile && tile) {
            tile.copyTile(oldTile);
            tile.setMorphActive(cellValue == "morph_special_area");
            oldTile.bonus && (tile.bonus = oldTile.bonus);
            oldTile.forceWay && (tile.forceWay = oldTile.forceWay);
            tile.forceWay && morphNode.on(Constants.FORCE_WAY_COLLECTED, this.onForceWayCollected, this);
            (oldTile.figure == "bonus2_h") && morphNode.on(Constants.KEY_COLLECTED, this.onKeyCollected, this);
            if (oldTile.figure == Enum.BonusTypes.Lamp) {
                tile.figure = oldTile.figureBackup;
            }
            this.recycleTile(oldTile);
            this.addNodeToLayer(this.figuresLayer, morphNode, col, row);
            tile.activateAllChildren(true);
            this.setFigureTile(col, row, tile);
            this._isThereMorphs = true;
            return tile;
        }
    },

    addScroll: function (col, row, cellValue) {
        !this._mapNodesArray[Constants.ScrollLayerName][row] && (this._mapNodesArray[Constants.ScrollLayerName][row] = []);
        this._mapNodesArray[Constants.ScrollLayerName][row][col] = cellValue;
    },

    addDontMixItem: function (col, row, cellValue) {
        let tile = this.getFigureTile(col, row);
        tile && (tile.isDontMixItem = true);
    },

    addMysteryTile: function (col, row, cellValue) {
        let tile = this.getFigureTile(col, row);
        if (tile) {
            tile.setMysteryPiece();
        }
    },

    // onCheckMatch: function (event) {
    //     this._movedTiles.push(event.detail);
    // },

    addConveyorTile: function (col, row, cellValue) {
        this._mapNodesArray[Constants.ConveyorLayerName][row][col] = cellValue;
        let node = new cc.Node(cellValue);
        let spriteComponent = node.addComponent(cc.Sprite);
        spriteComponent.spriteFrame = this.figuresAtlas.getSpriteFrame(cellValue);

        let conveyorLayer = this.gameMapNode.getChildByName(Constants.ConveyorLayerName);

        this.addNodeToLayer(conveyorLayer, node, col, row);
    },

    isContainedConveyor: function (col, row) {
        for (let conveyor of this._conveyors) {
            if (this.isContainsTile(col, row, conveyor)) {
                return true;
            }
        }
        return false;
    },

    findConveyorArray: function (col, row) {
        col = parseInt(col);
        row = parseInt(row);
        if (!this._mapNodesArray[Constants.ConveyorLayerName][row] || !this._mapNodesArray[Constants.ConveyorLayerName][row][col]) {
            return null;
        }
        let conveyorValue = this._mapNodesArray[Constants.ConveyorLayerName][row][col];
        let conveyDir = Constants.ConveyorDirections[conveyorValue].out;
        if (conveyDir) {
            let ret = [{col: col, row: row}];
            let nextCol = col + conveyDir[0];
            let nextRow = row + conveyDir[1];
            if (this._mapNodesArray[Constants.ConveyorLayerName][nextRow] == undefined || this._mapNodesArray[Constants.ConveyorLayerName][nextRow][nextCol] == undefined) {
                return ret;
            }
            conveyorValue = this._mapNodesArray[Constants.ConveyorLayerName][nextRow][nextCol];
            while (conveyorValue && !this.isContainsTile(nextCol, nextRow, ret)) {
                if (this._mapNodesArray[Constants.ConveyorLayerName][nextRow][nextCol] == undefined) {
                    return ret;
                }
                ret.push({col: nextCol, row: nextRow});
                conveyDir = Constants.ConveyorDirections[conveyorValue].out;
                nextCol = nextCol + conveyDir[0];
                nextRow = nextRow + conveyDir[1];
                if (this._mapNodesArray[Constants.ConveyorLayerName][nextRow] == undefined) {
                    break;
                }
                conveyorValue = this._mapNodesArray[Constants.ConveyorLayerName][nextRow][nextCol];
            }
            return ret;
        }
        else {
            return null;
        }
    },

    checkCanConvey: function () {
        for (let conveyor of this._conveyors) {
            for (let conveyorTile of conveyor) {
                let figureTile = this.getFigureTile(conveyorTile.col, conveyorTile.row);
                if (figureTile != Constants.HOLE && figureTile != null && figureTile.node && figureTile.node.getNumberOfRunningActions() > 0) {
                    // cc.info(figureTile.node.actions, "checkCanConvey actions");
                    // cc.info(figureTile.node.actionsToAdd, "checkCanConvey actionsToAdd");
                    let runningAction = figureTile.node.getActionByTag(Constants.TILE_MOVE_ACTION);
                    if (runningAction && !runningAction.isDone()) {
                        return false;
                    }
                }

            }
        }
        return true;
    },

    checkConveyorStatus: function (conveyors) {
        let ret = false;
        for (let conveyorTile of conveyors) {
            let figureTile = this.getFigureTile(conveyorTile.col, conveyorTile.row);
            if (figureTile != Constants.HOLE && figureTile != null
                && !Constants.CanConveyTiles.includes(figureTile.tileKind) && !figureTile.isMovable) {
                return false;
            }
            if (!this.isInCurrentPage(conveyorTile.col, conveyorTile.row)) {
                return false;
            }
            if (figureTile != null) {
                ret = true;
            }
        }
        return ret;
    },

    findNextConveyorSection: function (prevLastTile, conveyorsInfo) {
        for (let info of conveyorsInfo) {
            if (prevLastTile.col == info[0] && prevLastTile.row == info[1]) {
                return {col: info[2], row: info[3]};
            }
        }
        return null;
    },

    buildConveyors: function () {
        if (this._mapNodesArray[Constants.ConveyorLayerName]) {
            let conveyorsInfo = this.getConveyorsInfo();
            for (let info of conveyorsInfo) {
                if (info.length == 4) {
                    let startCol = parseInt(info[2]);
                    let startRow = parseInt(info[3]);
                    if (!isNaN(startCol) && !isNaN(startRow) && !this.isContainedConveyor(startCol, startRow)) {
                        let conveyor = this.findConveyorArray(startCol, startRow);
                        if (conveyor != null) {
                            let endTile = {col: parseInt(info[0]), row: parseInt(info[1])};
                            this._conveyors.push(conveyor);
                            let nextSection = [];
                            while (nextSection && !Global.isSameTile(conveyor[conveyor.length - 1], endTile)) {
                                let nextSectionStartTile = this.findNextConveyorSection(conveyor[conveyor.length - 1], conveyorsInfo);
                                nextSection = this.findConveyorArray(nextSectionStartTile.col, nextSectionStartTile.row);
                                conveyor && nextSection && conveyor.push(...nextSection);
                            }
                        }
                    }
                }
            }
            for (let i in this._mapNodesArray[Constants.ConveyorLayerName]) {
                i = parseInt(i);
                for (let j in this._mapNodesArray[Constants.ConveyorLayerName][i]) {
                    j = parseInt(j);
                    if (this._mapNodesArray[Constants.ConveyorLayerName][i][j] && !this.isContainedConveyor(j, i)) {
                        let conveyor = this.findConveyorArray(j, i);
                        conveyor != null && this._conveyors.push(conveyor);
                    }
                }
            }
        }
    },

    getConveyorsInfo: function () {
        let conveyorsInfo = [];
        for (let key in Global.PlayingLevel.customProps) {
            if (key.indexOf("conveyor") > -1) {
                conveyorsInfo.push(Global.PlayingLevel.customProps[key].split(","));
            }
        }
        return conveyorsInfo;
    },

    addTeleportsNode: function (col, row, cellValue) {
        try {
            let node = null;
            if (cellValue.indexOf("begin") > -1) {
                if(this._mapNodesArray[Constants.BackgroundLayerName][row + 1] && this._mapNodesArray[Constants.BackgroundLayerName][row + 1][col]){
                    return;
                }
                node = cc.instantiate(this._teleportBeginTemplate);
            }
            else if (cellValue.indexOf("end") > -1) {
                if(this._mapNodesArray[Constants.BackgroundLayerName][row - 1] && this._mapNodesArray[Constants.BackgroundLayerName][row - 1][col]){
                    return;
                }
                node = cc.instantiate(this._teleportEndTemplate);
            }
            let teleportsLayer = cc.find("Canvas/game_mask/game_node/teleports");
            if (this._mapNodesArray[Constants.TeleportsLayerName][row] == undefined) {
                this._mapNodesArray[Constants.TeleportsLayerName][row] = [];
            }
            let tile = node.getComponent(Constants.TileScriptName);
            let pos = this.grid2pos(col, row);
            node.x = pos.x;
            node.y = pos.y;
            tile.gridPosition = cc.p(col, row);
            tile.isMovable = false;
            tile.tileKind = Enum.TileKind.Teleport;
            tile.value = cellValue;
            teleportsLayer.addChild(node);
            this._mapNodesArray[Constants.TeleportsLayerName][row][col] = tile;
        } catch (e) {
            cc.info(e, "addTeleportsNode");
        }
    },

    addWishingWellTile: function (col, row, cellValue) {
        let node = cc.instantiate(this._wishingWellTemplate);
        let wishingTile = node.getComponent(Constants.WishingWellScriptName);
        node.on(Constants.WISHING_WELL_FULL, this.onWishingWellFull, this);
        wishingTile.gridPosition = cc.p(col, row);
        wishingTile.wellValue = cellValue;
        let pos = this.grid2pos(col, row);
        node.x = pos.x;
        node.y = pos.y;
        node.parent = this.figuresLayer;
        this.setFigureTile(col, row, wishingTile);
    },

    addFigureChainsTile: function (col, row, cellValue) {
        // if(this._mapNodesArray[Constants.FiguresChains][row] === undefined){
        //     this._mapNodesArray[Constants.FiguresChains][row] = [];
        // }
        // this._mapNodesArray[Constants.FiguresChains][row][col] = Constants.CHAIN_HOLD;

        if (this.isValidTile(Constants.FiguresLayerName, col, row)) {
            let node = new cc.Node(Constants.ChainNodeName);
            let sp = node.addComponent(cc.Sprite);

            node.width = Constants.TileSize;
            node.height = Constants.TileSize;
            node.setAnchorPoint(0, 0);
            sp.spriteFrame = this.figuresAtlas.getSpriteFrame(cellValue);
            let tile = this._mapNodesArray[Constants.FiguresLayerName][row][col];
            tile.chainNode = node;
            tile.node.addChild(node);
            tile.isChainHold = true;
            tile.isMovable = false;
        }
    },

    addGooBombTile: function (col, row, cellValue) {
        let tile = this.getFigureTile(col, row);
        tile && tile.setGooBomb(this.gooBombPrefab);
        this._isThereGooBomb = true;
    },

    doGooBomb: function () {
        if (this._gameFinished || !this._isThereGooBomb || !this._doGooBomb || this.isTherePendingActions() ||
            this.isTherePendingTiles()) {
            return;
        }
        this._doGooBomb = false;
        this._isThereGooBomb = false;
        for (let i in this._mapNodesArray[Constants.FiguresLayerName]) {
            if (this._mapNodesArray[Constants.FiguresLayerName][i]) {
                for (let j in this._mapNodesArray[Constants.FiguresLayerName][i]) {
                    let figureTile = this.getFigureTile(j, i);
                    if (figureTile && figureTile.isGooBomb) {
                        figureTile.growGooBomb();
                        this._isThereGooBomb = true;
                    }
                }
            }
        }
    },

    toggleMorphs: function () {
        if (!this._isThereMorphs || !this._toggleMorphs || this.isTherePendingActions() ||
            this.isTherePendingTiles()) {
            return;
        }
        this._toggleMorphs = false;
        this._isThereMorphs = false;
        for (let i in this._mapNodesArray[Constants.FiguresLayerName]) {
            if (this._mapNodesArray[Constants.FiguresLayerName][i]) {
                for (let j in this._mapNodesArray[Constants.FiguresLayerName][i]) {
                    let figureTile = this.getFigureTile(j, i);
                    if (figureTile && figureTile instanceof MorphTile) {
                        figureTile.toggleActive();
                        this._isThereMorphs = true;
                    }
                }
            }
        }
    },

    addMilkTile: function (col, row, cellValue, rotation, showEffect) {
        try {
            let tile = this.getFigureTile(col, row);
            if (tile == null) {
                return;
            }
            tile.setMilkTile(cellValue, rotation, showEffect);
        } catch (e) {
            cc.info(e, "addMilkTile");
        }
    },

    addGeneratorTile: function (col, row, cellValue) {
        if (this._mapNodesArray[Constants.GeneratorsLayerName][row] === undefined) {
            this._mapNodesArray[Constants.GeneratorsLayerName][row] = [];
        }
        this._mapNodesArray[Constants.GeneratorsLayerName][row][col] = {generator: true};
    },

    saveResult: function () {
        Global.passedLevel = Global.PlayingLevel.levelNumber;
        Global.savePassedLevel(Global.PlayingLevel.levelNumber);
        Global.PlayingLevel.saveResult();
    },

    finishGame: function () {
        this._gameFinished = true;
        this.showBonusTimeAction();
    },

    showBonusTimeAction: function () {
        if (Global.PlayingLevel.moveNumber < 1) {
            this._isBonusTime = true;
            return;
        }
        let time4MoveNumber = 0.3;
        let bonusTimeDelay = Global.PlayingLevel.moveNumber * time4MoveNumber;

        let delayTime = this.showGeniesAnimation();

        setTimeout(() => {
            this._isBonusTime = true;
        }, (bonusTimeDelay + delayTime) * 1000);

        setTimeout(() => {
            this.showMoveNumAction(bonusTimeDelay);
        }, (delayTime) * 1000);

        for (let i = 0; i < Global.PlayingLevel.moveNumber; i++) {
            setTimeout(() => {
                this.countDownMoveNum();
                this.showRandomBonusAction();
                this.scoreManager.pushConstantScore({scoreType: Constants.ScoreUnits.remain_move});
            }, (delayTime + i * time4MoveNumber) * 1000);
        }
    },

    showMoveNumAction: function (bonusTimeDelay) {
        let moveNumEffect = this._globalEffectsContainer.getChildByName("move_num");
        moveNumEffect.active = true;
        moveNumEffect.getChildByName("particle").getComponent(cc.ParticleSystem).resetSystem();
        moveNumEffect.runAction(cc.rotateBy(0.7, 360).repeatForever());
        setTimeout(() => {
            moveNumEffect.stopAllActions();
            moveNumEffect.getChildByName("particle").getComponent(cc.ParticleSystem).stopSystem();
            moveNumEffect.active = false;
        }, bonusTimeDelay * 1000);

        let moveNumNode = cc.find("Canvas/ui_nodes/top_status_area/common_ui/move_num");
        let seq = cc.sequence(
            cc.scaleTo(0.075, 1.2, 0.8),
            cc.scaleTo(0.15, 0.8, 1.2),
            cc.scaleTo(0.075, 1.0, 1.0)
        );
        moveNumNode.runAction(seq.repeat(Global.PlayingLevel.moveNumber));
    },

    showGeniesAnimation: function () {
        let magicTimeNode = this._globalEffectsContainer.getChildByName("genies");
        let explosionNode = this._globalEffectsContainer.getChildByName("bonus_fog");
        explosionNode.active = true;
        explosionNode.setScale(2.5);
        explosionNode.runAction(
            cc.sequence(
                cc.fadeIn(0.05),
                cc.delayTime(0.8),
                cc.fadeOut(0.4)
            )
        );
        let duration = 2.3;
        setTimeout(() => {
            explosionNode.active = false;
            magicTimeNode.active = true;
            magicTimeNode.runAction(
                cc.fadeIn(0.5)
            );
            for (let i = 0; i < 3; i++) {
                let circle = this.getWideFairyParticle();
                circle.x = Constants.MagicTimeParticlesPos[i].x;
                circle.y = Constants.MagicTimeParticlesPos[i].y;
                //circle.setScale(0.2, 0.2);
                circle.active = true;
                // let seq = cc.sequence(
                //     cc.spawn(
                //         cc.scaleTo(0.2, 0.8, 0.8),
                //         cc.fadeIn(0.2),
                //     ),
                //     cc.spawn(
                //         cc.scaleTo(0.2, 1.2, 1.2),
                //         cc.fadeOut(0.2)
                //     )
                // );
                circle.parent = this._globalEffectsContainer;
                // circle.runAction(seq.clone());
                setTimeout(() => {
                    this.recycleWideFairyParticle(circle)
                }, (duration-0.5) * 1000);
            }
        }, 0.5 * 1000);
        magicTimeNode.setLocalZOrder(1000);
        setTimeout(() => {
            magicTimeNode.active = false;
        }, duration * 1000);
        return duration;
    },

    showRandomBonusAction: function () {
        let randomTile = this.selectRandomTile();
        let loopLimit = 20;
        while (loopLimit > 0 && !this.isMatchable(randomTile.col, randomTile.row) || ( this.getFigureTile(randomTile.col, randomTile.row) && this.getFigureTile(randomTile.col, randomTile.row).bonus)) {
            randomTile = this.selectRandomTile();
            loopLimit--;
        }
        let bonus = Enum.BonusTypes.all[Math.floor(Math.random() * Enum.BonusTypes.all.length)];
        loopLimit = 20;
        while (loopLimit > 0 && bonus == Enum.BonusTypes.Square || bonus == Enum.BonusTypes.Lamp || bonus == Enum.BonusTypes.Normal) {
            bonus = Enum.BonusTypes.all[Math.floor(Math.random() * Enum.BonusTypes.all.length)];
        }

        let pos = this.transformTileCoordinates(randomTile.col, randomTile.row, this._globalEffectsContainer);
        pos = cc.v2(pos.x + Constants.TileSize / 2, pos.y + Constants.TileSize / 2);
        let moveNumNode = cc.find("Canvas/ui_nodes/top_status_area/common_ui/move_num");
        let startPos = Global.transformCoordinates(moveNumNode, this._globalEffectsContainer);
        let shootBonus = this.getFairyParticle();
        shootBonus.x = startPos.x;
        shootBonus.y = startPos.y;
        shootBonus.setScale(1, 1);
        shootBonus.parent = this._globalEffectsContainer;
        let fairyParticle = shootBonus.getComponent(cc.ParticleSystem);
        fairyParticle.resetSystem();

        let seq = cc.sequence(
            cc.moveTo(0.3, pos),
            cc.callFunc(this.recycleFairyParticle, this, shootBonus)
        );
        shootBonus.runAction(seq);
        let bonusCircleLight = this.getBonusCircleLightEffect();
        bonusCircleLight.x = pos.x;
        bonusCircleLight.y = pos.y;
        bonusCircleLight.active = true;
        bonusCircleLight.setOpacity(255);
        bonusCircleLight.setScale(0.5);
        setTimeout(() => {
            bonusCircleLight.parent = this._globalEffectsContainer;
            bonusCircleLight.runAction(cc.sequence(
                cc.spawn(
                    cc.scaleTo(0.1, 1.5, 1.5),
                    cc.fadeOut(0.1)
                ),
                cc.callFunc(this.recycleBonusCircleLight, this, bonusCircleLight)
            ));
        }, 0.3 * 1000);

        setTimeout(() => {
            this.addFigureBonusNode(randomTile.col, randomTile.row, bonus);
        }, 0.35 * 1000);

    },

    crushAllBonus: function () {
        if (this.isTherePendingActions() || this.isTherePendingTiles()) {
            return;
        }
        for (let i = this._minVisibleRow; i < this._maxVisibleRow; i++) {
            for (let j = this._minVisibleColumn; j < this._maxVisibleColumn; j++) {
                let tile = this.getFigureTile(j, i);
                if (tile && tile.bonus && tile.isMovable) {
                    this._willCrushTiles.push({col: j, row: i});
                    return;
                }
            }
        }
        this._isBonusTime = false;
        setTimeout(() => {
            this.showFinishDlg();
        }, 0.8 * 1000);
    },

    showFinishDlg: function () {
        if (this.isTherePendingTiles() || this.isTherePendingActions()) {
            setTimeout(() => {
                this.showFinishDlg();
            }, 0.2 * 1000);
            return;
        }
        (cc.sys.isMobile) && Global.sendGAProgressionEvent(ga.EGAProgressionStatus.Complete, `level-${Global.PlayingLevel.levelNumber}`, `type-${Global.PlayingLevel.levelType}`, `score ${Global.PlayingLevel.score}`);

        this.saveResult();
        this._popupMaskNode.active = true;
        let finishDlgNode = cc.find("Canvas/ui_nodes/popups/finish_popup");
        finishDlgNode.getChildByName("label").getComponent(cc.Label).string = "Level " + Global.PlayingLevel.levelNumber;
        finishDlgNode.getChildByName("star2").active = Global.PlayingLevel.score > Global.PlayingLevel.score2;
        finishDlgNode.getChildByName("star3").active = Global.PlayingLevel.score > Global.PlayingLevel.score3;
        finishDlgNode.getChildByName("score_value").getComponent(cc.Label).string = Global.PlayingLevel.score;
        let gainedCoin = 0;
        if(Global.PlayingLevel.oldScore < Global.PlayingLevel.score3){
            if(Global.PlayingLevel.oldScore > Global.PlayingLevel.score2){
                if(Global.PlayingLevel.score > Global.PlayingLevel.score3){
                    gainedCoin = 3;
                    Global.UserData.saveLevelStar(Global.PlayingLevel.levelNumber, 3);
                }
            }
            else if(Global.PlayingLevel.oldScore > 0){
                if(Global.PlayingLevel.score > Global.PlayingLevel.score3){
                    Global.UserData.saveLevelStar(Global.PlayingLevel.levelNumber, 3);
                    gainedCoin = 5;
                }
                else if(Global.PlayingLevel.score > Global.PlayingLevel.score2){
                    Global.UserData.saveLevelStar(Global.PlayingLevel.levelNumber, 2);
                    gainedCoin = 2;
                }
            }
            else{
                if(Global.PlayingLevel.score > Global.PlayingLevel.score3){
                    Global.UserData.saveLevelStar(Global.PlayingLevel.levelNumber, 3);
                    gainedCoin = 6;
                }
                else if(Global.PlayingLevel.score > Global.PlayingLevel.score2){
                    Global.UserData.saveLevelStar(Global.PlayingLevel.levelNumber, 2);
                    gainedCoin = 3;
                }
                else{
                    Global.UserData.saveLevelStar(Global.PlayingLevel.levelNumber, 1);
                    gainedCoin = 1;
                }
            }
        }
        let bonusCoinNode = finishDlgNode.getChildByName("daily_bonus");
        if(gainedCoin > 0){
            bonusCoinNode.active = true;
            cc.find("texture/label", bonusCoinNode).getComponent(cc.Label).string = gainedCoin;
            bonusCoinNode.getComponent(cc.Animation).play();
            Global.UserData.coins += gainedCoin;
            Global.UserData.save();
        }
        else{
            bonusCoinNode.active = false;
        }
        Global.PendingActions = 0;
        finishDlgNode.active = true;
        finishDlgNode.y = 0;
        // let action = Global.createShowPopupAction();
        // finishDlgNode.runAction(action);
        // setTimeout(()=>{
        //     finishDlgNode.y = 0;
        // }, 0.48);
    },

    addBackgroundTile: function (col, row) {
        const node = cc.instantiate(this._bgTemplate);
        const evenOrOdd = (col % 2 == 0) == (row % 2 == 0);
        node.getComponent(cc.Sprite).spriteFrame = this.figuresAtlas.getSpriteFrame('bg_tile_' + (evenOrOdd ? 1 : 2));
        this._mapNodesArray[Constants.BackgroundLayerName][row][col] = node.getComponent(Constants.BackgroundTile);
        this.addNodeToLayer(this.backgroundTileLayer, node, col, row);
    },

    isTherePendingActions: function () {
        return Global.PendingActions > 0;
    },

    onFiguresMove: function (event) {
        let detail = event.detail;
        if (this._gameState == Enum.GameState.TileCrashing || this._gameState == Enum.GameState.TileMoving || Global.PlayingLevel.levelCompleted) {
            return;
        }
        if (this.isTherePendingActions()) {
            return;
        }
        if (!this.isMovable(detail.from.x, detail.from.y) || !this.isMovable(detail.to.x, detail.to.y)) {
            return;
        }

        this._gameState = Enum.GameState.TileMoving;
        this._matchNumber = 0;

        // this.swapTiles(detail.from, detail.to);
        let fromTile = this._mapNodesArray[Constants.FiguresLayerName][detail.from.y][detail.from.x];
        let toTile = this._mapNodesArray[Constants.FiguresLayerName][detail.to.y][detail.to.x];
        let fromNode = fromTile.node;
        let toNode = toTile.node;
        let fromPos = this.grid2pos(detail.from.x, detail.from.y);
        let toPos = this.grid2pos(detail.to.x, detail.to.y);
        let middlePos = cc.v2((fromPos.x + toPos.x) / 2, (fromPos.y + toPos.y) / 2);
        let toAction = cc.sequence(
            cc.spawn(
                cc.scaleTo(0.08, 0.7, 0.7),
                cc.moveTo(0.08, middlePos).easing(cc.easeCircleActionIn())
            ),
            cc.spawn(
                cc.scaleTo(0.08, 1, 1),
                cc.moveTo(0.08, fromPos).easing(cc.easeCircleActionOut())
            ),
            // cc.callFunc(this.setGameState, this, Enum.GameState.Idle)
        );
        toAction.setTag(Constants.TILE_MOVE_ACTION);
        // trailAction.easing(cc.easeOut(2.0));
        let finishFunc = new cc.callFunc(this.checkRightMove, this, detail);
        let fromAction = cc.sequence(
            cc.spawn(
                cc.scaleTo(0.08, 1.3, 1.3),
                cc.moveTo(0.08, middlePos).easing(cc.easeCircleActionIn())
            ),
            cc.spawn(
                cc.scaleTo(0.08, 1, 1),
                cc.moveTo(0.08, toPos).easing(cc.easeCircleActionOut())
            ),
            // cc.delayTime(0.15),
            finishFunc
        );
        fromAction.setTag(Constants.TILE_MOVE_ACTION);

        // let seq = new cc.Sequence(cc.delayTime(0.5), trailAction);

        this._gameState = Enum.GameState.TileMoving;
        this.addPendingAction();
        // if(firstNode.getNumberOfRunningActions() > 0){
        //     firstNode.stopAllActions();
        //     this.setGameState();
        // }
        // if(secondNode.getNumberOfRunningActions() > 0){
        //     secondNode.stopAllActions();
        //     this.setGameState();
        // }
        fromNode.runAction(fromAction);
        toNode.runAction(toAction);

    },

    addPendingAction: function () {
        if (Global.PendingActions < 0) {
            Global.PendingActions = 1;
        }
        else {
            Global.PendingActions++;
        }
    },

    setGameState: function (target, state) {
        if(state !== undefined) {
            this._gameState = state;
        }
        if (Global.PendingActions < 0) {
            Global.PendingActions = 0
        }
        else {
            Global.PendingActions--;
        }
    },

    checkBonusMove: function (first, second) {
        let firstTile = this._mapNodesArray[Constants.FiguresLayerName][first.y][first.x];
        let secondTile = this._mapNodesArray[Constants.FiguresLayerName][second.y][second.x];
        if (!firstTile.isMatchable || !secondTile.isMatchable) {
            return false;
        }
        if (firstTile.bonus === Enum.BonusTypes.Lamp) {
            if (secondTile.bonus === Enum.BonusTypes.Lamp) {
                this.show2LampAction(firstTile, secondTile);
                // this.setGameState();
                // this.countDownMoveNum();
                return true;
            }
            else if (!secondTile.bonus && secondTile.tileKind !== Enum.TileKind.Relic) {
                this.processLampBonus(secondTile.figure, first);
                // this.setGameState();
                // this.countDownMoveNum();
                return true;
            }
        }
        else if (secondTile.bonus == Enum.BonusTypes.Lamp && !firstTile.bonus && firstTile.tileKind !== Enum.TileKind.Relic) {
            this.processLampBonus(firstTile.figure, second);
            // this.setGameState();
            // this.countDownMoveNum();
            return true;
        }
        if (firstTile.bonus && secondTile.bonus) {
            switch (firstTile.bonus) {
                case Enum.BonusTypes.Bomb:
                    switch (secondTile.bonus) {
                        case Enum.BonusTypes.Bomb:
                            this.process2Bomb(first, second);
                            break;
                        case Enum.BonusTypes.XBonus:
                        case Enum.BonusTypes.HBonus:
                        case Enum.BonusTypes.VBonus:
                            this.processBombAndHBonus(first, second);
                            break;
                        case Enum.BonusTypes.Lamp:
                            this.processLampAndBonus(second, first);
                            break;
                        case Enum.BonusTypes.Square:
                            this.processSquareAndHBonus(secondTile, firstTile);
                            break;
                    }
                    break;
                case Enum.BonusTypes.XBonus:
                    switch (secondTile.bonus) {
                        case Enum.BonusTypes.Bomb:
                            this.processBombAndHBonus(first, second);
                            break;
                        case Enum.BonusTypes.XBonus:
                        case Enum.BonusTypes.HBonus:
                        case Enum.BonusTypes.VBonus:
                            this.processXAndHBonus(first, second);
                            break;
                        case Enum.BonusTypes.Lamp:
                            this.processLampAndBonus(second, first);
                            break;
                        case Enum.BonusTypes.Square:
                            this.processSquareAndHBonus(secondTile, firstTile);
                            break;
                    }
                    break;
                case Enum.BonusTypes.HBonus:
                case Enum.BonusTypes.VBonus:
                    switch (secondTile.bonus) {
                        case Enum.BonusTypes.Bomb:
                            this.processBombAndHBonus(first, second);
                            break;
                        case Enum.BonusTypes.XBonus:
                            this.processXAndHBonus(first, second);
                            break;
                        case Enum.BonusTypes.HBonus:
                        case Enum.BonusTypes.VBonus:
                            this.processVAndHBonus(first, second);
                            break;
                        case Enum.BonusTypes.Lamp:
                            this.processLampAndBonus(second, first);
                            break;
                        case Enum.BonusTypes.Square:
                            this.processSquareAndHBonus(secondTile, firstTile);
                            break;
                    }
                    break;
                case Enum.BonusTypes.Lamp:
                    this.processLampAndBonus(first, second);
                    break;
                case Enum.BonusTypes.Square:
                    switch (secondTile.bonus) {
                        case Enum.BonusTypes.Bomb:
                        case Enum.BonusTypes.XBonus:
                        case Enum.BonusTypes.HBonus:
                        case Enum.BonusTypes.VBonus:
                            this.processSquareAndHBonus(firstTile, secondTile);
                            break;
                        case Enum.BonusTypes.Lamp:
                            this.processLampAndBonus(second, first);
                            break;
                        case Enum.BonusTypes.Square:
                            this.process2Square(first, second);
                            break;
                    }
                    break;
            }
            // this.setGameState();
            // this.countDownMoveNum();
            return true;
        }
        return false;
    },

    process2Bomb: function (first, second) {
        Global.AudioManager.playBombBomb();
        this.processBombArea(second.x, second.y);
        let col = second.x, row = second.y;
        for (let i = row - 1; i <= row + 1; i++) {
            for (let j = col - 1; j <= col + 1; j++) {
                if (i != row || j != col) {
                    this.processBombArea(j, i);
                }
            }
        }

    },

    process2Square: function (first, second) {
        this.removeTile(first.x, first.y);
        this.removeTile(second.x, second.y);
        this.addFigureBonusNode(first.x, second.y, Enum.BonusTypes.Square);
        this.removeTile(first.x, second.y);
    },

    processSquareAndHBonus: function (square, bonus) {
        // if (this.isValidTile(square.col, square.row)) {
        //     let tile = this._figNodesArray[square.row][square.col];
        //     if (tile.isChainHold) {
        //         return;
        //     }

        this._gameState = Enum.GameState.SquareCrushing;
        // this.addPendingAction();
        // this.bringTopMost(square.node);
        let squareTarget = this.findSquareBonusTarget(square.gridPosition.x, square.gridPosition.y);
        if (this.isValidTile(squareTarget)) {
            return;
        }
        this._squareTargets.push(squareTarget);
        let targetPos = this.grid2pos(squareTarget.col, squareTarget.row);
        let randomPositions = [];
        for (let i = 0; i < 2; i++) {
            let x = this._gameArea.left + Constants.TileSize * 2 + Math.random() * (this._gameArea.width - Constants.TileSize * 3);
            let y = this._gameArea.bottom + Constants.TileSize * 2 + Math.random() * (this._gameArea.height - Constants.TileSize * 3);
            randomPositions.push(cc.p(x, y));
        }

        let seqScale = this._butterflyAction.clone();
        let bezier = [randomPositions[0], randomPositions[1], targetPos];
        let bezierTo = cc.bezierTo(0.7, bezier);

        // this.removeTileWithoutCrush(bonus.gridPosition.x, bonus.gridPosition.y);
        let actions = [
            cc.spawn([
                seqScale,
                bezierTo
            ]),
            cc.callFunc(this.recycleTempNode, this),
            cc.callFunc(this.addRemoveBonus, this, {col: squareTarget.col, row: squareTarget.row, bonus: bonus.bonus}),
            // cc.callFunc(this.setGameState, this)
        ];
        let seq = cc.sequence(actions);
        let tempNode = this.getTempNode();
        tempNode.getComponent(cc.Sprite).spriteFrame = this.figuresAtlas.getSpriteFrame(`${square.bonus}_${square.figure}`);
        tempNode.x = square.node.x;
        tempNode.y = square.node.y;
        tempNode.setAnchorPoint(0.5, 0.5);
        this.gameMapNode.addChild(tempNode);
        tempNode.runAction(seq);
        bonus.emitFigureDestroyed();
        square.emitFigureDestroyed();
    },

    addRemoveBonus: function (target, params) {
        this.removeTile(params.col, params.row);
        switch (params.bonus) {
            case Enum.BonusTypes.Bomb:
                this.processBombArea(params.col, params.row);
                break;
            case Enum.BonusTypes.HBonus:
                this.processHBonus(params.col, params.row);
                break;
            case Enum.BonusTypes.VBonus:
                this.processVBonus(params.col, params.row);
                break;
            case Enum.BonusTypes.XBonus:
                this.processXBonus(params.col, params.row);
                break;
            case Enum.BonusTypes.Square:
                this.processSquareBonus(params.col, params.row);
                break;
        }
    },

    checkMatchMove: function (from, to) {
        let isMatched = false;
        if (this.isThereMatched(Constants.FiguresLayerName, from.x, from.y, this._mapNodesArray[Constants.FiguresLayerName][from.y][from.x].figure)) {
            // cc.info("matched at from !!!!!!!!!!!!!!!!");
            isMatched = true;
        }
        if (this.isThereMatched(Constants.FiguresLayerName, to.x, to.y, this._mapNodesArray[Constants.FiguresLayerName][to.y][to.x].figure)) {
            // cc.info("matched at to !!!!!!!!!!!!!!!!");
            isMatched = true;
        }
        if (!isMatched) {
            this.swapTiles(from, to);
            let firstNode = this._mapNodesArray[Constants.FiguresLayerName][from.y][from.x].node;
            let secondNode = this._mapNodesArray[Constants.FiguresLayerName][to.y][to.x].node;
            if(!firstNode || !secondNode){
                return;
            }
            let firstAction = cc.moveTo(0.2, this.grid2pos(from.x, from.y));
            let secondAction = cc.moveTo(0.2, this.grid2pos(to.x, to.y));
            firstAction.setTag(Constants.TILE_MOVE_ACTION);
            secondAction.setTag(Constants.TILE_MOVE_ACTION);
            let setStateFunc = new cc.callFunc(this.setGameState, this, Enum.GameState.Idle);
            let seq = cc.sequence([secondAction, setStateFunc]);
            this._gameState = Enum.GameState.TileMoving;
            firstNode.runAction(firstAction);
            secondNode.runAction(seq);
            //noinspection JSUnresolvedFunction
            Global.AudioManager.playMismatchSFX();
            // cc.info("not matched at ??????????????");
        }
        else {
            this._gameState = Enum.GameState.Idle;
            this.setGameState();
            this.clearHintAction();
            this.countDownMoveNum();
            //noinspection JSUnresolvedFunction
            Global.AudioManager.playSelectTileSFX();
        }
    },

    checkRightMove: function (target, detail) {
        this._squareTargets = [];
        // if(this._gameState === Enum.GameState.TileMoving){
        //     setTimeout(() => {this.checkRightMove(target, detail);}, 0.1);
        //     return;
        // }
        this.swapTiles(detail.from, detail.to);
        let firstTile = this._mapNodesArray[Constants.FiguresLayerName][detail.from.y][detail.from.x];
        let secondTile = this._mapNodesArray[Constants.FiguresLayerName][detail.to.y][detail.to.x];
        if(!firstTile || !secondTile){
            return;
        }

        (typeof firstTile.initPosition === "function") && firstTile.initPosition();
        (typeof firstTile.initPosition === "function") && secondTile.initPosition();

        if (this.checkBonusMove(detail.from, detail.to)) {
            this.setGameState(null, Enum.GameState.Idle);
            this.countDownMoveNum();
            //noinspection JSUnresolvedFunction
            Global.AudioManager.playSelectTileSFX();
            // this._gameState = Enum.GameState.Idle;
            return;
        }
        this.checkMatchMove(detail.from, detail.to);
    },

    countDownMoveNum: function () {
        Global.PlayingLevel.moveNumber--;
        this._moveCount++;
        this._spawnMilk = true;
        this._doConvey = true;
        this._doGooBomb = true;
        this._toggleMorphs = true;
        this.findHoles();
        this.setMoveNumber();
    },

    setMoveNumber: function () {
        let moveNumNode = cc.find("Canvas/ui_nodes/top_status_area/common_ui/move_num");
        moveNumNode.getComponent(cc.Label).string = Global.PlayingLevel.moveNumber > 0 ? Global.PlayingLevel.moveNumber : 0;
    },

    bringTopMost: function (node) {
        if (node == null) {
            return;
        }
        node.removeFromParent(false);
        this.topMostLayer.addChild(node);
    },

    isInCurrentPage: function (col, row) {
        col = parseInt(col);
        row = parseInt(row);
        return col >= this._minVisibleColumn && col <= this._maxVisibleColumn && row >= this._minVisibleRow && row <= this._maxVisibleRow;
    },

    processLampBonus: function (figure, refPos) {
        // this._willCrushTiles.push({col: refPos.x, row: refPos.y});
        for (let i = this._minVisibleRow; i <= this._maxVisibleRow; i++) {
            if (this._mapNodesArray[Constants.FiguresLayerName][i] == undefined) {
                continue;
            }
            for (let j = this._minVisibleColumn; j <= this._maxVisibleColumn; j++) {
                if (this.isMatchable(j, i) && this._mapNodesArray[Constants.FiguresLayerName][i][j].figure == figure) {
                    // this._willCrushTiles.push({col: j, row: i});
                    this.playLampAnimation(refPos, cc.p(j, i));
                }
            }
        }
        setTimeout(() => {
            this.addTileToCrushQueue({col: refPos.x, row: refPos.y});
        }, 0.8 * 1000);
    },

    playLampAnimation: function (start, end, bonus) {
        let startPos = this.grid2pos(start.x, start.y);
        startPos.x += Constants.TileSize / 2;
        startPos.y += Constants.TileSize / 2;
        let endPos = this.grid2pos(end.x, end.y);
        endPos.x += Constants.TileSize / 2;
        endPos.y += Constants.TileSize / 2;

        // let temp = cc.find("lamp/line", this.globalAnimations);
        let lampLineNode = this.createLampLine();
        this.gameMapNode.addChild(lampLineNode);
        let dist = this.calcDistance(startPos, endPos);
        lampLineNode.x = startPos.x;
        lampLineNode.y = startPos.y;
        lampLineNode.setContentSize(dist, 48);
        lampLineNode.setScale(0.3, 1);
        let rot = this.calcRotation(startPos, endPos);
        lampLineNode.setRotation(rot);
        this.addPendingAction();
        lampLineNode.runAction(cc.scaleTo(0.3, 1, 1));
        setTimeout(() => {
            this.recycleLampLine(lampLineNode);
        }, 0.75 * 1000);
        // let anim = lampLineNode.getComponent(cc.Animation);
        // anim.play("lamp");

        // let tempPoint = cc.find("lamp/point", this.globalAnimations);
        let pointNode = this.createLampPoint();
        this.gameMapNode.addChild(pointNode);
        pointNode.x = startPos.x;
        pointNode.y = startPos.y;
        let moveAct = cc.moveTo(0.3, endPos);
        let scaleAct = cc.scaleTo(0.075, 3.0);

        pointNode.runAction(cc.sequence(moveAct, cc.delayTime(0.33), scaleAct, cc.callFunc(this.recycleLampPoint, this),));
        setTimeout(() => {
            if(bonus){
                this.addFigureBonusNode(end.x, end.y, bonus);
            }
            else{
                let tile = this.getFigureTile(end.x, end.y);
                let pos = Global.transformCoordinates(tile.node, this._globalEffectsContainer);
                pos.x += Constants.TileSize / 2; pos.y += Constants.TileSize / 2;
                this.showCircleEffect(pos);
            }
            this.addTileToCrushQueue({col: end.x, row: end.y});
        }, 0.75 * 1000);
        setTimeout(() => {
            this.setGameState();
        }, 1.25 * 1000);
    },

    calcDistance: function (pos1, pos2) {
        return Math.pow((pos1.x - pos2.x) * (pos1.x - pos2.x) + (pos1.y - pos2.y) * (pos1.y - pos2.y), 0.5);
    },

    calcRotation: function (pos1, pos2) {
        if (pos1.x == pos2.x) {
            if (pos1.y > pos2.y) {
                return 90;
            }
            else if (pos1.y < pos2.y) {
                return -90;
            }
            else {
                return 0;
            }
        }
        else if (pos1.x < pos2.x) {
            return 180 * Math.atan((pos1.y - pos2.y) / Math.abs(pos1.x - pos2.x)) / Math.PI;
        }
        else {
            return 180 - 180 * Math.atan((pos1.y - pos2.y) / Math.abs(pos1.x - pos2.x)) / Math.PI;
        }
    },

    removeAllTiles: function () {
        for (let i = this._minVisibleRow; i <= this._maxVisibleRow; i++) {
            for (let j = this._minVisibleColumn; j <= this._maxVisibleColumn; j++) {
                this.removeTile(j, i);
            }
        }
    },

    doConvey: function () {
        // if(this.isTherePendingActions()){
        //     cc.info(Global.PendingActions, "doConvey not run");
        // }
        if (this._gameFinished || !this._mapNodesArray.hasOwnProperty(Constants.ConveyorLayerName) || this.isTherePendingActions() ||
            this.isTherePendingTiles() || this.isThereMovingActions()
            || !this._doConvey) {
            return false;
        }
        // return false;
        if (this.conveyDelay < 6) {
            this.conveyDelay++;
            return false;
        }
        this.conveyDelay = 0;
        this.addPendingAction();
        this._doConvey = false;
        for (let conveyor of this._conveyors) {
            if (!this.checkConveyorStatus(conveyor)) {
                continue;
            }
            let backupFigureTile = this.conveyTile(conveyor[conveyor.length - 1], conveyor[0]);
            for (let i = conveyor.length - 2; i > 0; i--) {
                this.conveyTile(conveyor[i], conveyor[i + 1]);
            }
            this.conveyTile(conveyor[0], conveyor[1], backupFigureTile);
        }
        setTimeout(() => {
            this.setGameState();
        }, 0.4 * 1000);
        return true;
    },

    conveyTile: function (fromTile, toTile, backupFigureTile) {
        let toConveyorValue = this._mapNodesArray[Constants.ConveyorLayerName][toTile.row][toTile.col];
        let conveyDir = Constants.ConveyorDirections[toConveyorValue].in;
        let inTile = {col: toTile.col + conveyDir[0], row: toTile.row + conveyDir[1]};
        let fromFigureTile = this._mapNodesArray[Constants.FiguresLayerName][fromTile.row][fromTile.col];
        if (backupFigureTile) {
            fromFigureTile = backupFigureTile;
        }
        let toFigureTile = this._mapNodesArray[Constants.FiguresLayerName][toTile.row][toTile.col];
        let actionTime = 0.2;
        let inTilePos = null;

        if (fromFigureTile.node && (inTile.col != fromTile.col || inTile.row != fromTile.row)) {
            inTilePos = this.grid2pos(inTile.col, inTile.row);
            fromFigureTile.node.x = inTilePos.x;
            fromFigureTile.node.y = inTilePos.y;
            // let showFigureNode = this.getTempNode();
            // if(fromFigureTile.isMystery){
            //     showFigureNode.getComponent(cc.Sprite).spriteFrame = fromFigureTile.mysteryNode.getComponent(cc.Sprite).spriteFrame;
            // }
            // else {
            //     showFigureNode.getComponent(cc.Sprite).spriteFrame = fromFigureTile.node.getComponent(cc.Sprite).spriteFrame;
            // }
            // let pos = this.grid2pos(fromTile.col, fromTile.row);
            // showFigureNode.x = pos.x; showFigureNode.y = pos.y;
            // showFigureNode.setAnchorPoint(0, 0);
            // showFigureNode.parent = this.figuresLayer;
            // let fromConveyorValue = this._mapNodesArray[Constants.ConveyorLayerName][fromTile.row][fromTile.col];
            // let outDir = Constants.ConveyorDirections[fromConveyorValue].out;
            // let outPos = this.grid2pos(fromTile.col + outDir[0], fromTile.row + outDir[1]);
            // showFigureNode.runAction(cc.moveTo(actionTime, outPos));
            // setTimeout(() => {
            //     this.recycleTempNode(showFigureNode);
            // }, (actionTime + 0.05) * 1000);
        }

        this.setFigureTile(toTile.col, toTile.row, fromFigureTile);
        if (fromFigureTile && fromFigureTile.node) {
            let toTilePos = this.grid2pos(toTile.col, toTile.row);
            let action = cc.sequence([
                cc.moveTo(actionTime, toTilePos),
                cc.callFunc(this.setGameState, this)
            ]);
            // this._willMoveTiles.push({
            //     node: fromFigureTile.node,
            //     action: action,
            //     position: inTilePos
            // });
            this.addPendingAction();
            action.setTag(Constants.TILE_MOVE_ACTION);
            fromFigureTile.node.stopAllActions();
            fromFigureTile.node.runAction(action);
            fromFigureTile.gridPosition = cc.p(toTile.col, toTile.row);
            // this._movedTiles.push(toTile);
        }
        return toFigureTile;
    },

    processMatched: function (dt) {
        if (this.isTherePendingTiles() || this.isThereMovingActions() || this._gameState == Enum.GameState.TileMoving) {
            return false;
        }
        let moved = this.fallTileAnimation();
        if(this.isTherePendingActions()){
            this._actionDuration += dt;
            if(this._actionDuration > 5){
                this._actionDuration = 0;
                Global.PendingActions = 0;
            }
            else{
                return;
            }
        }
        this.actionDuration = 0;
        if (Global.PendingActions < 0) {
            Global.PendingActions = 0;
        }
        this.checkMatches();
        this.addBonusTiles();
        if (!moved) {
            this.doConvey();
            this.spawnMilk();
            this.doGooBomb();
            this.processFullWells();
            this.jumpSnakes();
            this.toggleMorphs();
            this.doShuffle();
            if(this.checkLevelFailed()){
                this.showFailedPopup();
            }
        }
        if (moved) {
            this.clearHintAction();
        }
        this.setHintTimer();
        return true;
    },

    resumeBGMusic: function () {
        if (this.resumeDelay < 15) {
            this.resumeDelay++;
            return false;
        }
        this.resumeDelay = 0;

        Global.AudioManager.resumeMusic();
    },

    setHintTimer: function () {
        if (this._hintTimer == null) {
            let self = this;
            let fn = () => {
                if (self.isTherePendingActions() || self.isTherePendingTiles() || self.isThereMovingActions()) {
                    self._hintTimer = setTimeout(fn, 5 * 1000);
                }
                else {
                    self.showHintAction();
                }
            };
            this._hintTimer = setTimeout(fn, 5 * 1000);
        }

        // if (this._gameState != Enum.GameState.SquareCrushing) {
        //     this._gameState = Enum.GameState.Idle;
        // }
    },

    findHoles: function () {
        for (let i in this._mapNodesArray[Constants.FiguresLayerName]) {
            for (let j in this._mapNodesArray[Constants.FiguresLayerName][i]) {
                if (this.isInCurrentPage(j, i) && this._mapNodesArray[Constants.FiguresLayerName][i][j] == Constants.HOLE) {
                    if (!this.includeTile(this._holeTiles, {col: j, row: i})) {
                        this._holeTiles.push({col: j, row: i});
                    }
                }
            }
        }
    },

    doShuffle: function () {
        if (this._gameFinished || this.isTherePendingActions() || this.isTherePendingTiles()) {
            return;
        }
        if (this.shuffleDelay < 60) {
            this.shuffleDelay++;
            return false;
        }
        this.shuffleDelay = 0;

        if (!this.fallTileInstant() && this.isShuffleNeed()) {
            // if(this.isThereRunningActions()){
            //     return false;
            // }
            this._gameState = Enum.GameState.Shuffling;
            this.addPendingAction();
            this.shuffle();
            if (this.isShuffleNeed() && !this.addAvailableMove()) {
                return false;
            }
            this.showShuffleStartAction();
            setTimeout(() => {
                this.showShuffleEndAction();
            }, 0.5 * 1000);
            setTimeout(() => {
                this.setGameState(null, Enum.GameState.Idle);
                this.checkMatches();
            }, 1000);
        }
    },

    addAvailableMove: function () {
        let figure = this.getRandomFigure();
        this._availableMove = this.findAvailableMoveTiles();
        if(!this._availableMove){
            return false;
        }
        for (let tile of this._availableMove) {
            let figureTile = this.getFigureTile(tile);
            figureTile.setFigure(figure);
        }
        return true;
    },

    findAvailableMoveTiles: function () {
        for (let row = this._minVisibleRow; row <= this._maxVisibleRow; row++) {
            if (this._mapNodesArray[Constants.FiguresLayerName][row]) {
                for (let col = this._minVisibleColumn; col <= this._maxVisibleColumn; col++) {

                    if (this.isMovable(col, row) && this.isMatchable(col, row)
                        && !(this.getFigureTile(col, row) instanceof FigureBonusTile)) {

                        for (let dir of Constants.AvailableMoves) {
                            let allMovable = true;
                            for (let el of dir) {
                                if (!this.isMovable(col + el[1], row + el[0])
                                    || !this.isMatchable(col + el[1], row + el[0])
                                    || this.getFigureTile(col + el[1], row + el[0]) instanceof FigureBonusTile) {
                                    allMovable = false;
                                }
                            }
                            if (allMovable) {
                                return [
                                    {col: col, row: row},
                                    {col: col + dir[0][1], row: row + dir[0][0]},
                                    {col: col + dir[1][1], row: row + dir[1][0]}
                                ];
                            }
                        }
                    }
                }
            }
        }
    },

    addBonusTiles: function () {
        for (let key in this._bonusArrays) {
            for (let i in this._bonusArrays[key]) {
                let bonusTiles = this._bonusArrays[key][i].tiles;
                let gridPos = this._bonusArrays[key][i].pos;
                if (this.isValidTile(Constants.FiguresLayerName, gridPos.col, gridPos.row)) {
                    let tile = this.getFigureTile(gridPos.col, gridPos.row);
                    if (tile != null && tile instanceof KeyTile) {
                        this._willCrushTiles.push(...bonusTiles);
                        continue;
                    }
                    for (let j in bonusTiles) {
                        if (bonusTiles[j].col != gridPos.col || bonusTiles[j].row != gridPos.row) {
                            this.showGenerateBonusAction(gridPos, bonusTiles[j]);
                            this._willCrushTiles.push(bonusTiles[j]);
                        }
                    }
                    let figure = this._mapNodesArray[Constants.FiguresLayerName][gridPos.row][gridPos.col].figure;
                    if (tile.bonus || tile.forceWay) {
                        this.removeTile(gridPos.col, gridPos.row);
                    }
                    else if(tile.emitFigureDestroyed){
                        tile.emitFigureDestroyed();
                    }
                    this.addFigureBonusNode(gridPos.col, gridPos.row, key, figure);
                }
            }
            this._bonusArrays[key] = [];
        }
    },

    addFigureBonusNode: function (col, row, bonus, figure) {
        if (!Enum.BonusTypes.all.includes(bonus)) {
            return;
        }
        // cc.info({col: col, row: row, bonus: bonus, figure: figure}, "addFigureBonusNode");
        let node = this.createFigBonus();
        let tile = node.getComponent(Constants.FigureBonusScriptName);
        if (figure == undefined) {
            let figTile = this.getFigureTile(col, row);
            if (figTile && figTile.figure) {
                // let figTile = this._mapNodesArray[Constants.FiguresLayerName][row][col];
                tile.copyTile(figTile);
                figure = tile.figure;
                if (figTile.bonus || figTile.forceWay) {
                    if (figTile.isChainHold) {
                        this.recycleFigBonus(node);
                        return;
                    }
                    this.removeTile(col, row);
                }
                else {
                    this.recycleTile(figTile);
                }
            }
            else {
                figure = this.getRandomFigure();
                while (this.checkMatch4Tile(Constants.FiguresLayerName, col, row, figure)) {
                    figure = this.getRandomFigure();
                }
            }
        }
        else if (!Constants.BonusFigureNamesArray.includes(figure)) {
            this.recycleFigBonus(node);
            return;
        }
        let spriteName = bonus == "lamp_area" ? bonus : bonus + "_" + figure;
        node.getComponent(cc.Sprite).spriteFrame = this.figuresAtlas.getSpriteFrame(spriteName);
        this.addNodeToLayer(this.figuresLayer, node, col, row);
        tile.bonus = bonus;
        tile.figure = bonus == "lamp_area" ? bonus : figure;
        tile.figureBackup = figure;
        tile.isMatchable = true;
        tile.gridPosition = cc.p(col, row);
        this._mapNodesArray[Constants.FiguresLayerName][row][col] = tile;
        this.popFromPendingCrush(col, row);
    },

    popFromPendingCrush: function (col, row) {
        for (let i = this._willCrushTiles.length - 1; i >= 0; i--) {
            if (this._willCrushTiles[i].col == col && this._willCrushTiles[i].row == row) {
                this._willCrushTiles.splice(i, 1);
            }
        }
    },

    showGenerateBonusAction: function (targetPos, nodePos) {
        let tile = this.getFigureTile(nodePos.col, nodePos.row);
        let showNode = this.getTempNode();
        showNode.getComponent(cc.Sprite).spriteFrame = this.figuresAtlas.getSpriteFrame(tile.figure);
        showNode.setAnchorPoint(0, 0);
        showNode.x = tile.node.x;
        showNode.y = tile.node.y;
        showNode.active = true;
        this.gameMapNode.addChild(showNode);
        let pos = this.grid2pos(targetPos.col, targetPos.row);
        let seq = cc.sequence([
            cc.moveTo(0.2, pos.x, pos.y),
            cc.callFunc(this.recycleTempNode, this)
        ]);
        showNode.runAction(seq);
    },

    runPendingTiles: function () {
        let movingTiles = this._willMoveTiles.splice(0, Constants.MaxRunningActions);
        for (let i = 0; i < movingTiles.length; i++) {
            if (movingTiles[i].node.getNumberOfRunningActions() > 0) {
                // cc.info(movingTiles[i].node, "runPendingTiles");
                movingTiles[i].node.stopAllActions();
                this.setGameState();
                let startPos = this.grid2pos(movingTiles[i].startCol, movingTiles[i].startRow);
                movingTiles[i].node.x = startPos.x;
                movingTiles[i].node.y = startPos.y;
                // this._willMoveTiles.push(movingTiles[i]);
                // setTimeout(() => {
                //     movingTiles[i].node.runAction(movingTiles[i].action);
                // }, 1.2 * 1000);
                // continue;
            }
            this.addPendingAction();
            if (movingTiles[i].position) {
                movingTiles[i].node.x = movingTiles[i].position.x;
                movingTiles[i].node.y = movingTiles[i].position.y;
            }
            movingTiles[i].action.setTag(Constants.TILE_MOVE_ACTION);
            movingTiles[i].node.runAction(movingTiles[i].action);
            // let actionTime = movingTiles[i].action.getDuration();
            // setTimeout(() => {
            //     this.setGameState();
            // }, (actionTime + 0.2) * 1000);
            // cc.info(movingTiles[i].action.getDuration(), "runPendingTiles");
        }
    },

    crushMatchedTiles: function () {
        let crushingTiles = this._willCrushTiles.splice(0, Constants.MaxCrushTileUnit);
        for (let i in crushingTiles) {
            // let tile = this.getFigureTile(crushingTiles[i].col, crushingTiles[i].row);
            // if(tile != null && tile.node.getNumberOfRunningActions() > 0 || this.includeTile(this._willMoveTiles, crushingTiles[i])){
            //     this._willCrushTiles.push(crushingTiles[i]);
            //     continue;
            // }
            this.removeTile(crushingTiles[i].col, crushingTiles[i].row);
        }
    },

    removeTile: function (col, row, bonus) {
        if (row.col != undefined) {
            col = row.col;
            row = row.row;
        }
        if (!this.isValidTile(Constants.FiguresLayerName, col, row)) {
            return;
        }

        let tile = this._mapNodesArray[Constants.FiguresLayerName][row][col];
        if (tile.isPendingAction) {
            return;
        }
        if (tile.bonus) {
            bonus = tile.bonus;
        }

        if (bonus && (tile.morphActive == undefined || tile.morphActive == true) && !tile.isChainHold && !tile.isMilkTile && !tile.isMystery && !tile.isSnake) {
            switch (bonus) {
                case Enum.BonusTypes.Bomb:
                    this.processBombArea(col, row);
                    break;
                case Enum.BonusTypes.HBonus:
                    this.processHBonus(col, row);
                    break;
                case Enum.BonusTypes.VBonus:
                    this.processVBonus(col, row);
                    break;
                case Enum.BonusTypes.XBonus:
                    this.processXBonus(col, row);
                    break;
                case Enum.BonusTypes.Square:
                    this.processSquareBonus(col, row);
                    break;
            }
        }
        this.crushTile(tile);
    },

    crushTile: function (tile) {
        if (tile) {
            tile.isPendingHole = true;
            tile.crushTile();
        }
    },

    checkNearbyTilesCrush: function (col, row) {
        row = parseInt(row);
        col = parseInt(col);
        let refTile = this.getFigureTile(col, row);
        if (refTile == null) {
            return;
        }
        for (let i in Constants.NearByDirects) {
            if (this._figNodesArray[row + Constants.NearByDirects[i][0]]) {
                if (this.isNearbyAffect(Constants.FiguresLayerName, col + Constants.NearByDirects[i][1], row + Constants.NearByDirects[i][0])) {
                    this.setMatchNumber([{
                        row: row + Constants.NearByDirects[i][0],
                        col: col + Constants.NearByDirects[i][1]
                    }], refTile.matchId);
                    let nearbyTile = this.getFigureTile(col + Constants.NearByDirects[i][1], row + Constants.NearByDirects[i][0]);
                    if(nearbyTile && nearbyTile instanceof OfferingBaseTile){
                        nearbyTile.nearbyFigure = refTile.figure;
                    }
                    this._willCrushTiles.push({
                        row: row + Constants.NearByDirects[i][0],
                        col: col + Constants.NearByDirects[i][1],
                    });
                }
            }
        }
    },

    isThereMovedTiles: function () {
        return (this._movedTiles && this._movedTiles.length > 0);
    },

    isTherePendingTiles: function () {
        if (this._willCrushTiles && this._willCrushTiles.length > 0) {
            return true;
        }

        if (this._willMoveTiles && this._willMoveTiles.length > 0) {
            return true;
        }

        return false;
    },

    spawnMilk: function () {
        if (this.isTherePendingActions() || this.isTherePendingTiles() || !this._spawnMilk) {
            return;
        }
        let spawnTarget = this.findMilkSpawnTarget();
        this._spawnMilk = false;
        if (spawnTarget == null) {
            return;
        }
        let availableTiles = spawnTarget.availableTiles;
        let spawnTile = spawnTarget.refTile;
        spawnTarget = availableTiles[Math.floor(Math.random() * availableTiles.length)];
        let rotation = this.getSpawnRotation(spawnTile.gridPosition, spawnTarget.gridPosition);
        this.addMilkTile(spawnTarget.gridPosition.x, spawnTarget.gridPosition.y, "milk", rotation, true);
    },

    getSpawnRotation: function (start, end) {
        let dir = [end.x - start.x, end.y - start.y];
        if (dir[0] == 0) {
            return dir[1] == 1 ? 180 : 0;
        }
        else if (dir[1] == 0) {
            return dir[0] == 1 ? 90 : -90;
        }
    },

    getMovableTiles: function (col, row) {
        let movableTiles = [];
        for (let k in Constants.NearByDirects) {
            let dir = Constants.NearByDirects[k];
            if (this.isValidTile(Constants.FiguresLayerName, col + dir[0], row + dir[1])) {
                let tile = this.getFigureTile(col + dir[0], row + dir[1]);
                if (tile.isMovable && !tile.isMystery && tile.tileKind !== Enum.TileKind.Relic) {
                    movableTiles.push(tile);
                }
            }
        }
        return movableTiles;
    },

    findMilkSpawnTarget: function () {
        let spawnableTiles = [];
        for (let i = this._minVisibleRow; i <= this._maxVisibleRow; i++) {
            if (this._mapNodesArray[Constants.FiguresLayerName][i]) {
                for (let j = this._minVisibleColumn; j <= this._maxVisibleColumn; j++) {
                    if (this.isValidTile(j, i)) {
                        let milkTile = this.getFigureTile(j, i);
                        if (milkTile.isMilkTile) {
                            let movableTiles = this.getMovableTiles(j, i);
                            if (movableTiles.length > 0) {
                                spawnableTiles.push({
                                    refTile: milkTile,
                                    availableTiles: movableTiles
                                });
                            }
                        }
                    }
                }
            }
        }

        if (spawnableTiles.length > 0) {
            return spawnableTiles[Math.floor(Math.random() * spawnableTiles.length)];
        }
        return null;
    },

    findSnakeTarget: function (col, row) {
        col = parseInt(col);
        row = parseInt(row);
        let movableBonusTiles = [];
        for (let i = this._minVisibleRow; i <= this._maxVisibleRow; i++) {
            for (let j = this._minVisibleColumn; j <= this._maxVisibleColumn; j++) {
                if (this.isValidTile(Constants.FiguresLayerName, j, i)) {
                    if (j != col && i != row && this._figNodesArray[i][j].bonus
                        && this._figNodesArray[i][j].isMovable && this._figNodesArray[i][j].isMatchable) {
                        movableBonusTiles.push({col: j, row: i});
                    }
                }
            }
        }

        if (movableBonusTiles.length > 0) {
            let bonusTile = movableBonusTiles[Math.floor(Math.random() * movableBonusTiles.length)];
            return bonusTile;
        }

        let randomTile = this.selectRandomTile();
        let loopCount = 20;
        while (!this.isValidTile(randomTile.col, randomTile.row) || !this.isInCurrentPage(randomTile.col, randomTile.row) || !this.isMovable(randomTile.col, randomTile.row) ||
        (col == randomTile.col && row == randomTile.row)) {
            loopCount--;
            if(loopCount < 0){
                return null;
            }
            randomTile = this.selectRandomTile();
        }
        return randomTile;
    },

    jumpSnakes: function () {
        if (this._gameFinished || this.isTherePendingActions() || this.isTherePendingTiles() || this.isThereMovingActions()) {
            return;
        }

        let snakeTargets = [];
        // let procSnakes = this._pendingSnakes.splice(0, 2);
        for (let snakeEvent of this._pendingSnakes) {
            let target = this.findSnakeTarget(snakeEvent.col, snakeEvent.row);
            if(target == null){
                continue;
            }
            let targetTile = this.getFigureTile(target.col, target.row);
            let loopCount = 20;
            while (loopCount > 0 && target != null && (snakeTargets.includes(target) || targetTile == null || (!targetTile.isMatchable && targetTile.bonus != Enum.BonusTypes.Lamp) || !targetTile.isMovable)) {
                target = this.findSnakeTarget(snakeEvent.col, snakeEvent.row);
                targetTile = this.getFigureTile(target.col, target.row);
                loopCount--;
            }
            if(target == null){
                return;
            }
            // cc.info(snakeEvent, target);
            let oldTile = this.getFigureTile(snakeEvent.col, snakeEvent.row);
            if (!oldTile.snakeNode) {
                continue;
            }
            let snakeNode = oldTile.snakeNode;
            // let seq = cc.sequence(
            snakeNode.removeFromParent(false);
            this.gameMapNode.addChild(snakeNode);
            let pos = this.grid2pos(snakeEvent.col, snakeEvent.row);
            snakeNode.x = pos.x;
            snakeNode.y = pos.y;
            let snakePos = this.grid2pos(target.col, target.row);
            let action = cc.jumpTo(0.3, snakePos.x, snakePos.y, 64, 1);
            // );
            oldTile.removeSnake();
            this.addPendingAction();
            // if(snakeNode && snakeNode.getNumberOfRunningActions() > 0){
            //     snakeNode.stopAllActions();
            // }
            snakeNode.runAction(action);
            targetTile.setSnakeState();
            setTimeout(() => {
                this.setGameState();
                targetTile.setSnakeNode(snakeNode);
            }, 0.35 * 1000);
        }
        this._pendingSnakes = [];
    },

    onSnakeDestroyed: function (event) {
        if (!this.includeTile(this._pendingSnakes, event.detail)) {
            let snakeEvent = {col: event.detail.col, row: event.detail.row, snakeNode: event.detail.snakeNode};
            this._pendingSnakes.push(snakeEvent);
            // cc.info(event.detail, "onSnakeDestroyed accepted.");
        }
        else {
            // cc.info(event, "onSnakeDestroyed ignored.");
        }
    },

    onMilkDestroyed: function (event) {
        this._spawnMilk = false;
        // this._movedTiles.push(event.detail);
        // if (this.isValidTile(Constants.MilksLayerName, position.col, position.row)) {
        //     // let tile = this._mapNodesArray[Constants.MilksLayerName][position.row][position.col];
        //     this._mapNodesArray[Constants.MilksLayerName][position.row][position.col] = Constants.HOLE;
        //     let figTile = this.getFigureTile(position.col, position.row);
        //     if(figTile){
        //         figTile.isMatchable = true;
        //         figTile.isMovable = true;
        //     }
        // }
    },

    processFullWells: function () {
        if (this.isTherePendingActions() || this.isThereMovingActions() || this.isTherePendingTiles()) {
            return;
        }
        if (this._fullWells.length <= 0) {
            return;
        }
        // let wellTile = this._fullWells.shift();
        let wishingTargets = [];
        for (let wellTile of this._fullWells) {
            for (let i = 0; i < 3; i++) {
                let target = this.findWishingTarget(wishingTargets);
                let tile = this.getFigureTile(target);
                if(tile == null || tile.tileKind != Enum.TileKind.Figure || tile instanceof FigureBonusTile || tile instanceof ForceWayTile || tile instanceof KeyTile || !tile.isMatchable){
                    return;
                }
                wishingTargets.push(target);
                this.showWishingLineAction(wellTile, target);
            }
        }
        this._fullWells = [];
    },

    onWishingWellFull: function (event) {
        let wishingTile = this.getFigureTile(event.detail);
        (wishingTile) && this._fullWells.push(wishingTile);
    },

    showWishingLineAction: function (wishingTile, end) {
        let seq = cc.sequence(
            cc.scaleTo(0.1, 1.2, 1.2),
            cc.sequence(
                cc.rotateTo(0.05, -5),
                cc.rotateTo(0.1, 5),
                cc.rotateTo(0.05, 0)
            ).repeat(4),
            cc.rotateTo(0.1, 0)
        );
        let spriteNode = wishingTile.node.getChildByName("sprite");
        // let tilePos = this.grid2pos(start.col, start.row);
        // wishingTile.node.x = tilePos.x + Constants.TileSize / 2;
        // wishingTile.node.y = tilePos.y + Constants.TileSize / 2;
        // wishingTile.node.setAnchorPoint(0.5, 0.5);
        spriteNode.runAction(seq);

        let startPos = this.grid2pos(wishingTile.gridPosition.x, wishingTile.gridPosition.y);
        startPos.x += Constants.TileSize / 2;
        startPos.y += Constants.TileSize / 2;
        let endPos = this.grid2pos(end.col, end.row);
        endPos.x += Constants.TileSize / 2;
        endPos.y += Constants.TileSize / 2;

        // let temp = cc.find("lamp/line", this.globalAnimations);
        let wishingLineNode = this.getWishingLine();
        this.gameMapNode.addChild(wishingLineNode);
        wishingLineNode.active = true;
        let dist = this.calcDistance(startPos, endPos);
        wishingLineNode.x = startPos.x;
        wishingLineNode.y = startPos.y;
        wishingLineNode.setContentSize(dist, 48);
        wishingLineNode.setScale(0.3, 1);
        wishingLineNode.rotation = this.calcRotation(startPos, endPos);
        wishingLineNode.active = false;
        this.addPendingAction();

        let circleLight = this.getBonusCircleLightEffect();
        this.gameMapNode.addChild(circleLight);
        circleLight.x = endPos.x;
        circleLight.y = endPos.y;
        circleLight.setScale(0.5, 0.5);
        circleLight.active = false;
        circleLight.setOpacity(255);

        setTimeout(() => {
            circleLight.active = true;
            circleLight.runAction(
                cc.spawn(
                    cc.fadeOut(0.45),
                    cc.scaleTo(0.45, 1, 1)
                )
            )
        }, 0.5 * 1000);

        setTimeout(() => {
            wishingLineNode.active = true;
            wishingLineNode.getComponent(cc.Animation).play("effect_wishing");
            wishingLineNode.runAction(cc.scaleTo(0.3, 1, 1));
        }, 0.2 * 1000);
        setTimeout(() => {
            this.recycleWishingLine(wishingLineNode);
            this.recycleBonusCircleLight(circleLight);
            this.setGameState();
            wishingTile.initWellState();
            spriteNode.setScale(1, 1);
            spriteNode.rotation = 0;
            this.addWishingBonus(end, wishingTile.wellValue);
            // this._movedTiles.push(end);
        }, 0.8 * 1000);

    },

    addWishingBonus: function (tile, wellType) {
        switch (wellType) {
            case Enum.WishingWellTypes.WishingPaw:
                this.addRelicTile(tile.col, tile.row, "force_way_item");
                break;
            case Enum.WishingWellTypes.WishingLine:
                this.addFigureBonusNode(tile.col, tile.row, Math.random() > 0.5 ? Enum.BonusTypes.VBonus : Enum.BonusTypes.HBonus);
                break;
            case Enum.WishingWellTypes.WishingX:
                this.addFigureBonusNode(tile.col, tile.row, Enum.BonusTypes.XBonus);
                break;
            case Enum.WishingWellTypes.WishingKey:
                this.addKeyNode(Constants.FiguresLayerName, tile.col, tile.row, "bonus2_h");
                break;
            case Enum.WishingWellTypes.WishingBomb:
                this.addFigureBonusNode(tile.col, tile.row, Enum.BonusTypes.Bomb);
                break;
            case Enum.WishingWellTypes.WishingButterfly:
                this.addFigureBonusNode(tile.col, tile.row, Enum.BonusTypes.Square);
                break;
            case Enum.WishingWellTypes.WishingRainbow:
                this.addFigureBonusNode(tile.col, tile.row, Enum.BonusTypes.Lamp);
                break;
        }
    },

    findWishingTarget: function (selectedTargets) {
        let loopCount = 30;
        let randomTile = this.selectRandomTile();
        let tile = this.getFigureTile(randomTile);
        while (loopCount > 0 && (tile == null || tile.tileKind != Enum.TileKind.Figure || tile instanceof FigureBonusTile || tile instanceof ForceWayTile || tile instanceof KeyTile || !tile.isMatchable || this.includeTile(selectedTargets, randomTile))) {
            randomTile = this.selectRandomTile();
            tile = this.getFigureTile(randomTile);
            loopCount--;
        }
        return randomTile;
    },

    onFigureDestroyed: function (event) {
        let position = event.detail;
        if (this.isValidTile(position.col, position.row) && this._figNodesArray[position.row][position.col].isPendingHole == true) {
            let tile = this._figNodesArray[position.row][position.col];
            if (tile instanceof SwirlTile) {
                //noinspection JSUnresolvedFunction
                this.scoreManager.pushObstacleScore({position: this.grid2pos(position.col, position.row)});
                setTimeout(() => {
                    this.recycleSwirl(tile.node);
                }, position.recycleDelay * 1000);
            }
            if (tile.tileKind == Enum.TileKind.Figure) {
                if (tile.nearbyCheck) {
                    this.checkNearbyTilesCrush(position.col, position.row);
                }
                else {
                    // cc.info(tile, "nearbycheck is false.");
                }
                this.overlayTilesCrush(position.col, position.row);
                if (!tile.notRecycle) {
                    if (position.recycleDelay > 0) {
                        setTimeout(() => {
                            this.recycleTile(tile);
                        }, position.recycleDelay * 1000);
                    }
                    else {
                        this.recycleTile(tile);
                    }
                }
            }
            this.setFigureTile(position.col, position.row, Constants.HOLE);
        }
    },

    recycleTile: function (tile, tileFromAction) {
        if (tileFromAction) {
            tile = tileFromAction;
        }
        if (tile instanceof FigureBonusTile) {
            this.recycleFigBonus(tile.node);
        }
        else if (tile instanceof ForceWayTile) {
            this.recycleForceWay(tile.node);
        }
        else if (tile instanceof KeyTile) {
            this.recycleKey(tile.node);
        }
        else if (tile instanceof SwirlTile) {
            this.recycleSwirl(tile.node);
        }
        else if (tile instanceof MorphTile) {
            this.recycleMorph(tile.node);
        }
        else {
            this.recycleFigure(tile.node);
        }
    },

    overlayTilesCrush: function (col, row) {

    },

    isNearbyAffect: function (layerName, col, row) {
        try {
            let colNum = parseInt(col), rowNum = parseInt(row);
            if (this.isInCurrentPage(col, row) && this.isValidTile(layerName, colNum, rowNum)) {
                return this._mapNodesArray[layerName][rowNum][colNum].isNearbyAffect;
            }
        } catch (e) {
            cc.info([layerName, col, row], "isNearbyAffect");
            return false;
        }
    },

    getFigureTile: function (col, row) {
        if (row == undefined) {
            row = col.row;
            col = col.col;
        }
        if (this.isValidTile(col, row)) {
            return this._mapNodesArray[Constants.FiguresLayerName][row][col];
        }
        else {
            if (this._mapNodesArray[Constants.FiguresLayerName][row] == undefined ||
                this._mapNodesArray[Constants.FiguresLayerName][row][col] == undefined) {
                if (this._mapNodesArray[Constants.BackgroundLayerName][row] &&
                    this._mapNodesArray[Constants.BackgroundLayerName][row][col]) {
                    this.setFigureTile(col, row, Constants.HOLE);
                }
            }
            return null;
        }
    },

    removeTileWithoutCrush: function (col, row) {
        let tile = this.getFigureTile(col, row);
        if (tile != null) {
            tile.isPendingHole = true;
            tile.node.emit(Constants.FIGURE_DESTROYED, {col: col, row: row, recycleDelay: 0.05});
        }
        return tile;
    },

    processLampAndBonus: function (lampPos, bonusPos) {
        let crushLamp = true;
        let bonusTile = this.getFigureTile(bonusPos.x, bonusPos.y);
        let bonus = bonusTile.bonus;
        if (lampPos == "booster") {
            lampPos = bonusPos;
            crushLamp = false;
            if (bonusTile.setBonusType) {
                bonusTile.setBonusType(Enum.BonusTypes.Lamp);
            }
            else {
                bonusTile.bonus = Enum.BonusTypes.Lamp;
            }
        }
        this.addPendingAction();
        // this._willCrushTiles.push({col: lampPos.x, row: lampPos.y});
        for (let i = this._minVisibleRow; i <= this._maxVisibleRow; i++) {
            for (let j = this._minVisibleColumn; j <= this._maxVisibleColumn; j++) {
                let tile = this.getFigureTile(j, i);
                if (tile != null && tile.isMatchable && tile.figure == bonusTile.figure) {
                    setTimeout(() => {
                        if (bonus == Enum.BonusTypes.HBonus || bonus == Enum.BonusTypes.VBonus) {
                            bonus = Math.random() > 0.5 ? Enum.BonusTypes.HBonus : Enum.BonusTypes.VBonus;
                        }
                        this.playLampAnimation(lampPos, {x: j, y: i}, bonus);
                    }, 0.1 * 1000);
                }
            }
        }
        setTimeout(() => {
            this.addTileToCrushQueue({col: bonusPos.x, row: bonusPos.y});
            this.setGameState();
            crushLamp && this.addTileToCrushQueue({col: lampPos.x, row: lampPos.y});
        }, 1.5 * 1000);
    },

    transformTileCoordinates: function (col, row, targetParent) {
        try {
            let fromPos = this.grid2pos(col, row);
            let fromPosWorld = this.gameMapNode.convertToWorldSpaceAR(fromPos);
            return targetParent.convertToNodeSpaceAR(fromPosWorld);
        } catch (e) {
            return null;
        }

    },

    showXBonusEffect: function (col, row) {
        let pos = this.transformTileCoordinates(col, row, this._globalEffectsContainer);
        pos = cc.v2(pos.x + Constants.TileSize / 2, pos.y + Constants.TileSize / 2);
        this.showBarEffect(pos, 45);
        this.showBarEffect(pos, -45);
        this.showCircleEffect(pos);
        // this.showBonusParticle(pos, 45);
        // this.showBonusParticle(pos, -45);
    },

    showVHBonusEffect: function (col, row, rotation) {
        let pos = this.transformTileCoordinates(col, row, this._globalEffectsContainer);
        pos = cc.v2(pos.x + Constants.TileSize / 2, pos.y + Constants.TileSize / 2);

        this.showBarEffect(pos, rotation);
        this.showCircleEffect(pos);
        // this.showBonusParticle(pos, rotation);
    },

    showBarEffect: function (pos, rotation) {
        let fairyParticle1 = this.getFairyParticle();
        fairyParticle1.getComponent(cc.ParticleSystem).resetSystem();
        fairyParticle1.x = pos.x;
        fairyParticle1.y = pos.y;
        this._globalEffectsContainer.addChild(fairyParticle1);
        let movement = 2000;
        let rad = Math.PI * rotation / 180;
        let xMovement = Math.cos(rad) * movement;
        let yMovement = -Math.sin(rad) * movement;
        fairyParticle1.runAction(cc.sequence(
            cc.moveBy(1.2, xMovement, yMovement),
            cc.callFunc(()=>{
                this.recycleFairyParticle(fairyParticle1)
            })
        ));

        let fairyParticle2 = this.getFairyParticle();
        fairyParticle2.getComponent(cc.ParticleSystem).resetSystem();
        fairyParticle2.x = pos.x;
        fairyParticle2.y = pos.y;
        this._globalEffectsContainer.addChild(fairyParticle2);
        fairyParticle2.runAction(cc.sequence(
            cc.moveBy(1.2, -xMovement, -yMovement),
            cc.callFunc(()=>{
                this.recycleFairyParticle(fairyParticle2)
            })
        ));

        let barImage = this.getBonusBarEffect();
        barImage.x = pos.x;
        barImage.y = pos.y;
        barImage.active = true;
        barImage.rotation = rotation;
        barImage.setScale(0.5, 2);
        barImage.setOpacity(255);
        this._globalEffectsContainer.addChild(barImage);

        barImage.runAction(
            cc.sequence(
                cc.spawn(
                    cc.scaleTo(1.2, 7, 0.2),
                    cc.moveBy(1.2, xMovement, yMovement),
                    cc.fadeOut(1.2)
                ),
                cc.callFunc(this.recycleBonusBar, this, barImage)
            )
        );

        let left = this.getBonusBarEffect();
        left.x = pos.x;
        left.y = pos.y;
        left.active = true;
        left.rotation = rotation;
        left.setScale(0.5, 2);
        left.setOpacity(255);
        this._globalEffectsContainer.addChild(left);
        left.runAction(
            cc.sequence(
                cc.spawn(
                    cc.scaleTo(1.2, 7, 0.2),
                    cc.moveBy(1.2, -xMovement, -yMovement),
                    cc.fadeOut(1.2)
                ),
                cc.callFunc(this.recycleBonusBar, this, left)
            )
        );

    },

    showCircleEffect: function (pos, multiplier) {
        if (multiplier == undefined) {
            multiplier = 1;
        }
        let circleNode = this.getBonusCircleEffect();
        circleNode.x = pos.x;
        circleNode.y = pos.y;
        circleNode.active = true;
        circleNode.setScale(0.2 * multiplier);
        circleNode.setOpacity(8);
        this._globalEffectsContainer.addChild(circleNode);
        circleNode.runAction(
            cc.sequence(
                cc.spawn(
                    cc.scaleTo(0.05, 1 * multiplier),
                    cc.fadeIn(0.05)
                ),
                cc.spawn(
                    cc.scaleTo(0.5, 2 * multiplier),
                    cc.fadeOut(0.5)
                ),
                cc.callFunc(this.recycleBonusCircle, this, circleNode)
            )
        );

        let circleLightNode = this.getBonusCircleLightEffect();
        circleLightNode.x = pos.x;
        circleLightNode.y = pos.y;
        circleLightNode.active = true;
        circleLightNode.setScale(0.5 * multiplier);
        circleLightNode.setOpacity(8);
        this._globalEffectsContainer.addChild(circleLightNode);
        circleLightNode.runAction(
            cc.sequence(
                cc.delayTime(0.1),
                cc.spawn(
                    cc.scaleTo(0.1, 1.5 * multiplier),
                    cc.fadeIn(0.1)
                ),
                cc.spawn(
                    cc.scaleTo(0.4, 3 * multiplier),
                    cc.fadeOut(0.4)
                ),
                cc.callFunc(this.recycleBonusCircleLight, this, circleLightNode)
            )
        );

        let fairyBombParticle = this.getFairyBombParticle();
        fairyBombParticle.x = pos.x; fairyBombParticle.y = pos.y;
        fairyBombParticle.getComponent(cc.ParticleSystem).resetSystem();
        this._globalEffectsContainer.addChild(fairyBombParticle);
        setTimeout(() => {
            fairyBombParticle.removeFromParent();
            this.recycleFairyBombParticle(fairyBombParticle);
        }, 0.7*1000);
    },

    showBonusParticle: function (pos, rotation) {
        let barParticle = cc.instantiate(this._barParticleTemplate);
        barParticle.rotation = rotation + 90;
        this._globalEffectsContainer.addChild(barParticle);
        barParticle.x = pos.x;
        barParticle.y = pos.y;
        setTimeout(() => {
            barParticle.getComponent(cc.ParticleSystem).resetSystem();
        }, 400);
        setTimeout(() => {
            barParticle.removeFromParent(true);
            barParticle.destroy();
        }, 1000)
    },

    processBombAndHBonus: function (first, second) {
        Global.AudioManager.playBombLine();
        this.removeTileWithoutCrush(first.x, first.y);
        this.processBombArea(second.x, second.y);
        this.removeTileWithoutCrush(second.x, second.y);

        setTimeout(() => {
            this.processVBonus(second.x, second.y);
            this.processVBonus(second.x + 1, second.y);
            this.processVBonus(second.x - 1, second.y);
        }, 0.3 * 1000);

        setTimeout(() => {
            this.processHBonus(second.x, second.y);
            this.processHBonus(second.x, second.y + 1);
            this.processHBonus(second.x, second.y - 1);
        }, 0.6 * 1000);

    },

    processVAndHBonus: function (first, second) {
        Global.AudioManager.playBombLine();
        this.removeTileWithoutCrush(first.x, first.y);
        this.processVBonus(second.x, second.y);
        this.removeTileWithoutCrush(second.x, second.y);
        this.processHBonus(second.x, second.y);
    },

    processXAndHBonus: function (first, second) {
        Global.AudioManager.playBombLine();
        this.removeTileWithoutCrush(first.x, first.y);
        this.processVBonus(second.x, second.y);
        this.removeTileWithoutCrush(second.x, second.y);
        this.processHBonus(second.x, second.y);
        this.processXBonus(second.x, second.y);
    },

    checkNotAffectedBonusTile: function (tile) {
        if (Constants.NotAffectedBonusTiles.includes(tile.figure)) {
            if (!tile.isChainHold && !tile.isMilkTile && !tile.isMystery && !tile.isSnake && !tile.isGooBomb) {
                return true;
            }
        }
        return false;
    },

    processHBonus: function (col, row) {
        let rowArray = this._mapNodesArray[Constants.FiguresLayerName][row];
        if (!rowArray) {
            return;
        }
        this.showVHBonusEffect(col, row, 0);
        // this._mapNodesArray[Constants.FiguresLayerName][row][col] = Constants.HOLE;

        this._matchId++;
        for (let i = col + 1; i <= this._maxVisibleColumn; i++) {
            if (this.isInCurrentPage(i, row) && this.isValidTile(Constants.FiguresLayerName, i, row)
                && !this.checkNotAffectedBonusTile(rowArray[i])) {
                let tile = this.getFigureTile(i, row);
                (tile != null) && (tile.nearbyCheck = false);
                if (!this.isContainedPendingBonus([{col: i, row: row}])) {
                    this.setMatchNumber([{col: i, row: row}], true);
                    this.addTileToCrushQueue({col: i, row: row});
                }
                if (tile != null && tile.blockBonusEffect) {
                    break;
                }
            }
        }
        for (let i = col - 1; i >= this._minVisibleColumn; i--) {
            if (this.isInCurrentPage(i, row) && this.isValidTile(Constants.FiguresLayerName, i, row) && !this.checkNotAffectedBonusTile(rowArray[i])) {
                let tile = this.getFigureTile(i, row);
                (tile != null) && (tile.nearbyCheck = false);
                if (!this.isContainedPendingBonus([{col: i, row: row}])) {
                    this.setMatchNumber([{col: i, row: row}], true);
                    this.addTileToCrushQueue({col: i, row: row});
                }
                if (tile != null && tile.blockBonusEffect) {
                    break;
                }
            }
        }
    },

    processVBonus: function (col, row) {
        let figuresArray = this._mapNodesArray[Constants.FiguresLayerName];
        if (!figuresArray) {
            return;
        }
        this.showVHBonusEffect(col, row, 90);
        this._matchId++;

        for (let i = row + 1; i <= this._maxVisibleRow; i++) {
            if (this.isInCurrentPage(col, i) && this.isValidTile(Constants.FiguresLayerName, col, i)
                && !this.checkNotAffectedBonusTile(figuresArray[i][col])) {
                let tile = this.getFigureTile(col, i);
                (tile != null) && (tile.nearbyCheck = false);
                if (!this.isContainedPendingBonus([{col: col, row: i}])) {
                    this.setMatchNumber([{col: col, row: i}], true);
                    this.addTileToCrushQueue({col: col, row: i});
                }
                if (tile != null && tile.blockBonusEffect) {
                    break;
                }
            }
        }
        for (let i = row - 1; i >= this._minVisibleRow; i--) {
            if (this.isInCurrentPage(col, i) && this.isValidTile(Constants.FiguresLayerName, col, i)
                && !this.checkNotAffectedBonusTile(figuresArray[i][col])) {
                let tile = this.getFigureTile(col, i);
                (tile != null) && (tile.nearbyCheck = false);
                if (!this.isContainedPendingBonus([{col: col, row: i}])) {
                    this.setMatchNumber([{col: col, row: i}], true);
                    this.addTileToCrushQueue({col: col, row: i});
                }
                if (tile != null && tile.blockBonusEffect) {
                    break;
                }
            }
        }
    },

    processXBonus: function (col, row) {
        this.showXBonusEffect(col, row);
        this._matchId++;

        for (let c = col - 1, r = row - 1; (c >= this._minVisibleColumn && r >= this._minVisibleRow); c--, r--) {
            let tile = this.getFigureTile(c, r);
            if (tile == null) continue;

            tile.nearbyCheck = false;
            if (!this.isContainedPendingBonus([{col: c, row: r}]) && !this.checkNotAffectedBonusTile(tile)) {
                this.setMatchNumber([{col: c, row: r}]);
                this.addTileToCrushQueue({col: c, row: r});
            }
            if (tile != null && tile.blockBonusEffect) {
                break;
            }
        }

        for (let c = col - 1, r = row + 1; (c >= this._minVisibleColumn && r <= this._maxVisibleRow); c--, r++) {
            let tile = this.getFigureTile(c, r);
            if (tile == null) continue;

            tile.nearbyCheck = false;
            if (!this.isContainedPendingBonus([{col: c, row: r}]) && !this.checkNotAffectedBonusTile(tile)) {
                this.setMatchNumber([{col: c, row: r}]);
                this.addTileToCrushQueue({col: c, row: r});
            }
            if (tile != null && tile.blockBonusEffect) {
                break;
            }
        }

        for (let c = col + 1, r = row + 1; (c <= this._maxVisibleColumn && r <= this._maxVisibleRow); c++, r++) {
            let tile = this.getFigureTile(c, r);
            if (tile == null) continue;

            tile.nearbyCheck = false;
            if (!this.isContainedPendingBonus([{col: c, row: r}]) && !this.checkNotAffectedBonusTile(tile)) {
                this.setMatchNumber([{col: c, row: r}]);
                this.addTileToCrushQueue({col: c, row: r});
            }
            if (tile != null && tile.blockBonusEffect) {
                break;
            }
        }

        for (let c = col + 1, r = row - 1; (c <= this._maxVisibleColumn && r >= this._minVisibleRow); c++, r--) {
            let tile = this.getFigureTile(c, r);
            if (tile == null) continue;

            tile.nearbyCheck = false;
            if (!this.isContainedPendingBonus([{col: c, row: r}]) && !this.checkNotAffectedBonusTile(tile)) {
                this.setMatchNumber([{col: c, row: r}]);
                this.addTileToCrushQueue({col: c, row: r});
            }
            if (tile != null && tile.blockBonusEffect) {
                break;
            }
        }
    },

    processBombArea: function (col, row) {
        let rowArray = this._mapNodesArray[Constants.FiguresLayerName][row];
        if (!rowArray) {
            return;
        }
        this._matchId++;
        let tile = this.getFigureTile(col, row);
        if (tile) {
            let pos = Global.transformCoordinates(tile.node, this._globalEffectsContainer);
            pos = cc.v2(pos.x + Constants.TileSize / 2, pos.y + Constants.TileSize / 2);
            this.showCircleEffect(pos, 2);
        }

        for (let i = row - 1; i <= row + 1; i++) {
            for (let j = col - 1; j <= col + 1; j++) {
                if (i != row || j != col && this.isValidTile(j, i)) {
                    let crushTile = this.getFigureTile(j, i);
                    if (!this.isValidTile(j, i)) {
                        continue;
                    }
                    if (!this.isContainedPendingBonus([{
                            col: j,
                            row: i
                        }]) && !this.checkNotAffectedBonusTile(crushTile)) {
                        this.setMatchNumber([{col: j, row: i}]);
                        this.addTileToCrushQueue({col: j, row: i});
                    }
                }
            }
        }
    },

    processSquareBonus: function (col, row) {
        if (this.isValidTile(this._figuresLayerName, col, row)) {
            let tile = this._figNodesArray[row][col];
            if (tile.isChainHold) {
                return;
            }

            this._gameState = Enum.GameState.SquareCrushing;
            // this.addPendingAction();
            // this.bringTopMost(tile.node);
            // tile.node.setLocalZOrder(999);
            let squareTarget = this.findSquareBonusTarget(col, row);
            if (this.isValidTile(squareTarget)) {
                return;
            }
            this._squareTargets.push(squareTarget);
            let targetPos = this.grid2pos(squareTarget.col, squareTarget.row);
            let randomPositions = [];
            for (let i = 0; i < 2; i++) {
                let x = this._gameArea.left + Constants.TileSize * 2 + Math.random() * (this._gameArea.width - Constants.TileSize * 3);
                let y = this._gameArea.bottom + Constants.TileSize * 2 + Math.random() * (this._gameArea.height - Constants.TileSize * 3);
                randomPositions.push(cc.p(x, y));
            }

            let seqScale = this._butterflyAction.clone();
            let bezier = [randomPositions[0], randomPositions[1], targetPos];
            let bezierTo = cc.bezierTo(0.7, bezier);
            let actions = [
                cc.spawn([
                    seqScale,
                    bezierTo
                ]),
                cc.callFunc(this.recycleTempNode, this),
                cc.callFunc(this.removeTile, this, {col: squareTarget.col, row: squareTarget.row}),
            ];
            let seq = cc.sequence(actions);
            let tempNode = this.getTempNode();
            tempNode.getComponent(cc.Sprite).spriteFrame = this.figuresAtlas.getSpriteFrame(`${tile.bonus}_${tile.figure}`);
            tempNode.x = tile.node.x;
            tempNode.y = tile.node.y;
            tempNode.setAnchorPoint(0.5, 0.5);
            this.gameMapNode.addChild(tempNode);
            tempNode.runAction(seq);
        }
    },

    addBonus4Square: function (target, param) {
        this.addFigureBonusNode(param.col, param.row, param.bonus);
    },

    equalTilePos: function (pos1, pos2) {
        return pos1.col == pos2.col && pos1.row == pos2.row;
    },

    searchSpecialTiles: function () {
        let result = {
            bonus: [],
            forceWay: [],
            key: [],
            wishingWell: [],
            ground: [],
            countStone: [],
            wayStone: [],
            milk: []
        };
        for (let i = this._minVisibleRow; i <= this._maxVisibleRow; i++) {
            for (let j = this._minVisibleColumn; j <= this._maxVisibleColumn; j++) {
                let figureTile = this.getFigureTile(j, i);
                if (figureTile && !this.isContainsTile(j, i, this._squareTargets) && !figureTile.isMystery && !figureTile.isMilkTile) {
                    if (figureTile.bonus && figureTile.bonus != Enum.BonusTypes.Lamp && figureTile.bonus != Enum.BonusTypes.Square) {
                        result.bonus.push({col: j, row: i});
                    }
                    if (figureTile.forceWay) {
                        result.forceWay.push({col: j, row: i});
                    }
                    if (figureTile instanceof KeyTile) {
                        result.key.push({col: j, row: i});
                    }
                    if (figureTile.tileKind == Enum.TileKind.WishingWell) {
                        result.wishingWell.push({col: j, row: i});
                    }
                    if (figureTile.tileKind == Enum.TileKind.Ground) {
                        result.ground.push({col: j, row: i});
                    }
                    if (figureTile.tileKind == Enum.TileKind.CountStone) {
                        if(this._mapNodesArray[Constants.WayLayerName]){
                            if(this._mapNodesArray[Constants.WayLayerName][i] && this._mapNodesArray[Constants.WayLayerName][i][j]){
                                result.wayStone.push({col: j, row: i});
                            }
                        }
                        result.countStone.push({col: j, row: i});
                    }
                }
            }
        }
        return result;
    },

    findSquareBonusTarget: function (col, row) {
        let specialTiles = this.searchSpecialTiles();
        let targetTiles = [];
        if(specialTiles.wishingWell.length > 0){
            targetTiles.push(...specialTiles.wishingWell);
        }
        if (specialTiles.countStone.length > 0) {
            targetTiles.push(...specialTiles.countStone); //[Math.floor(Math.random() * specialTiles.countStone.length)];
        }

        if(targetTiles.length > 0){
            return targetTiles[Math.floor(Math.random() * targetTiles.length)];
        }
        if (specialTiles.bonus.length > 0) {
            return specialTiles.bonus[Math.floor(Math.random() * specialTiles.bonus.length)];
        }

        let loopCount = 20;
        let randomTile = this.selectRandomTile();
        while (loopCount > 0 && !this.isValidTile(randomTile.col, randomTile.row) || !this.isInCurrentPage(randomTile.col, randomTile.row)) {
            randomTile = this.selectRandomTile();
            loopCount--;
        }
        return randomTile;
    },

    selectRandomTile: function () {
        return {
            col: Math.floor(Math.random() * (this._maxVisibleColumn - this._minVisibleColumn)) + this._minVisibleColumn,
            row: Math.floor(Math.random() * (this._maxVisibleRow - this._minVisibleRow) + this._minVisibleRow)
        };
    },

    isThereMovingActions: function () {
        return (this._willCrushTiles != null) && this._willMoveTiles.length > 0;
    },

    isThereRunningActions: function () {
        for (let i = this._maxVisibleRow; i >= this._minVisibleRow; i--) {
            if (this._mapNodesArray[Constants.FiguresLayerName][i]) {
                for (let j = this._minVisibleColumn; j <= this._maxVisibleColumn; j++) {
                    let tile = this.getFigureTile(j, i);
                    if (tile && tile.node && tile.isMovable && tile.node.getNumberOfRunningActions() > 0) {
                        let runningAction = tile.node.getActionByTag(Constants.TILE_MOVE_ACTION);
                        if (runningAction && !runningAction.isDone()) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    },

    fallTileInstant: function () {
        let moved = false;

        for (let ii = this._minVisibleColumn; ii <= this._maxVisibleColumn; ii++) {
            this._spawnedCountByCol[ii] = 0;
        }

        let teleportPassed = false;
        for (let i = this._maxVisibleRow; i >= this._minVisibleRow; i--) {
            if (this._mapNodesArray[Constants.FiguresLayerName][i]) {
                for (let j = this._minVisibleColumn; j <= this._maxVisibleColumn; j++) {
                    if (this.isHole(j, i)) {
                        let fallPath = this.findFallTile(j, i);
                        if (fallPath && fallPath.length > 0) {
                            moved = true;
                            if (this.fallTileThroughPath({col: j, row: i}, fallPath)) {
                                teleportPassed = true;
                            }
                        }
                    }
                }
            }
        }
        let loopCount = 5;
        while (teleportPassed && loopCount > 0) {
            teleportPassed = false;
            loopCount--;
            for (let row = this._maxVisibleRow; row >= this._minVisibleRow; row--) {
                if (this._mapNodesArray[Constants.FiguresLayerName][row]) {
                    for (let col = this._minVisibleColumn; col <= this._maxVisibleColumn; col++) {
                        if (this.isHole(col, row)) {
                            let fallPath = this.findFallTile(col, row);
                            if (fallPath && fallPath.length > 0) {
                                moved = true;
                                if (this.fallTileThroughPath({col: col, row: row}, fallPath)) {
                                    teleportPassed = true;
                                }
                            }
                        }
                    }
                }
            }
        }
        return moved;
    },

    fallTileAnimation: function () {
        if (this.fallTileDelay < 6) {
            this.fallTileDelay++;
            return false;
        }
        if(this._gameState == Enum.GameState.Shuffling){
            return false;
        }
        this.fallTileDelay = 0;
        return this.fallTileInstant();
    },

    isHole: function (col, row) {
        if (!row) {
            row = col.row;
            col = col.col;
        }
        if (this._mapNodesArray[Constants.FiguresLayerName][row] && this._mapNodesArray[Constants.FiguresLayerName][row][col] == Constants.HOLE) {
            return true;
        }
        if (this._mapNodesArray[Constants.BackgroundLayerName][row]
            && this._mapNodesArray[Constants.BackgroundLayerName][row][col]) {
            return this._mapNodesArray[Constants.FiguresLayerName][row][col] === undefined;
        }
    },

    makeFallTileAction: function (from, to, isEnd) {
        let pos = this.grid2pos(to.col, to.row);
        let actionsList = [];
        let fallTime = Constants.FallTileTime;
        if (from.teleport) {
            actionsList.push(cc.moveBy(0.1, 0, -79));
            actionsList.push(cc.hide());
            actionsList.push(cc.place(pos.x, pos.y + 79));
            actionsList.push(cc.show());
        }
        else {
            // fallAction.easing(cc.easeInOut(3.0));
            if (from.backPos > 0) {
                fallTime = Constants.FallTileTime + 0.4 * (parseInt(to.row) - parseInt(from.row - from.backPos - 1)) / Constants.MapSize.height;
            }
            else {
                fallTime = Constants.FallTileTime + 0.4 * (parseInt(to.row) - parseInt(from.row)) / Constants.MapSize.height;
            }
            if(from.row < to.row || from.backPos > 0 || this.isThereGenerator(to.col, to.row)
                || (this.checkTeleport(from.col, from.row))) {
                actionsList.push(cc.moveTo(fallTime, pos.x, pos.y));//.easing(cc.easeSineIn()));
            }
            if (isEnd) {
                actionsList.push(cc.moveBy(0.01, 0, 5));
                actionsList.push(cc.moveBy(0.02, 0, 2));
                actionsList.push(cc.moveBy(0.03, 0, 3));//, cc.rotateBy(0.2, 5 * Math.random()));
                actionsList.push(cc.moveBy(0.03, 0, 1));
            }
        }
        return actionsList;

    },

    fallTileThroughPath: function (targetPos, fallPath) {
        try {
            let teleportPassed = false;
            if (!this.isHole(targetPos.col, targetPos.row)) {
                return false;
            }
            let startPos = fallPath[fallPath.length - 1];
            let tile = this._mapNodesArray[Constants.FiguresLayerName][startPos.row][startPos.col];
            // if(tile.node && tile.node.getNumberOfRunningActions() > 0){
            //     tile.node.stopAllActions();
            //     this.setGameState();
            // }
            let delayTime = 0;
            if (tile === Constants.HOLE) {
                if (this.isThereGenerator(startPos.col, startPos.row)) {
                    tile = this.createNewTile(startPos.col, startPos.row);
                    delayTime = this._spawnedCountByCol[startPos.col];
                    tile.node.y = this.grid2pos(startPos.col, startPos.row - delayTime - 1).y;
                    this._spawnedCountByCol[startPos.col]++;
                }
                else {
                    return false;
                }
            }
            let actions = [cc.show()];
            let tempPos = startPos;
            if (delayTime > 0) {
                tempPos.backPos = delayTime;
            }
            for (let i = fallPath.length - 2; i >= 0; i--) {
                let pathPos = fallPath[i];
                let fallAction = this.makeFallTileAction(tempPos, pathPos, false);
                actions.push(...fallAction);
                if (tempPos.teleport) {
                    teleportPassed = true;
                    if (i - 1 >= 0 && fallPath[i - 1].col != tempPos.col) {
                        actions.push(cc.moveTo(Constants.FallTileTime, this.grid2pos(pathPos.col, pathPos.row)).easing(cc.easeSineIn()));
                        actions.push(cc.moveBy(0.01, 0, 5));
                        actions.push(cc.moveBy(0.02, 0, 2));
                        actions.push(cc.moveBy(0.03, 0, 3));
                        actions.push(cc.moveBy(0.03, 0, 1));
                    }
                }
                tempPos = pathPos;
            }
            // if(!Global.isSameTile(tempPos, targetPos) || fallPath.length == 1){
            let fallAction = this.makeFallTileAction(tempPos, targetPos, true);
            actions.push(...fallAction);
            // }
            if (targetPos.teleport) {
                actions.push(cc.moveTo(Constants.FallTileTime, this.grid2pos(targetPos.col, targetPos.row)).easing(cc.easeSineIn()));
                actions.push(cc.moveBy(0.01, 0, 5));
                actions.push(cc.moveBy(0.02, 0, 2));
                actions.push(cc.moveBy(0.03, 0, 3));
                actions.push(cc.moveBy(0.03, 0, 1));
                teleportPassed = true;
            }
            let endPos = this.grid2pos(targetPos.col, targetPos.row);
            let bouncingEndAction = cc.moveTo(0.1, endPos.x, endPos.y);
            actions.push(bouncingEndAction);
            actions.push(cc.callFunc(this.setGameState, this));
            // let as = this._willMoveTiles.filter((el) => {
            //     return el.col === startPos.col && el.row == startPos.row;
            // });
            // if(as.length > 0){
            //     return false;
            // }
            this._willMoveTiles.push({
                col: targetPos.col,
                row: targetPos.row,
                startCol: startPos.col,
                startRow: startPos.row,
                node: tile.node,
                action: cc.sequence(actions),
            });
            tile.gridPosition = {x: targetPos.col, y: targetPos.row};
            this.setFigureTile(startPos, Constants.HOLE);
            this.setFigureTile(targetPos, tile);
            return teleportPassed;
        } catch (e) {
            cc.info(e, "fallTileThroughPath");
            cc.info(targetPos, fallPath);
        }
    },

    isCanFall: function (col, row) {
        if (this.isValidTile(col, row)) {
            let tile = this._mapNodesArray[Constants.FiguresLayerName][row][col];
            return tile.isMovable;
        }
        return false;
    },

    isContainsTile: function (col, row, tilesArray) {
        if (tilesArray == undefined) {
            tilesArray = row;
            row = col.row;
            col = col.col;
        }
        for (let i in tilesArray) {
            if (tilesArray[i].col == col && tilesArray[i].row == row) {
                return true
            }
        }
        return false;
    },

    isThereGenerator: function (col, row) {
        if (this._mapNodesArray[Constants.GeneratorsLayerName][row] && this._mapNodesArray[Constants.GeneratorsLayerName][row][col]) {
            return true;
        }
        return false;
    },

    findDirectFallTile: function (col, row) {
        col = parseInt(col);
        row = parseInt(row);
        let pos = null;
        if (this.isThereGenerator(col, row) || this.findTeleportRevers(col, row)) {
            return {col: col, row: row};
        }
        for (let k = row - 1; k >= this._minVisibleRow; k--) {
            pos = {col: col, row: k};
            if (this.isCanFall(col, k)) {
                return pos;
            }
            else {
                if (this.isFillableTile(col, k)) {
                    if (this.isThereGenerator(col, k) || this.checkTeleport(col, k)) {
                        return pos;
                    }
                }
                else if (!this.isFallPassTile(col, k)) {
                    return {col: col, row: k + 1};
                }
                else if (this.isOutTile(col, k) && Constants.UndefinedNotPassLevels.includes(Global.PlayingLevel.levelNumber)){
                    return {col: col, row: k + 1};
                }
                else if(this._mapNodesArray[Constants.FiguresLayerName][k] && this._mapNodesArray[Constants.FiguresLayerName][k][col] == Constants.FOX_POS){
                    if (this.isThereGenerator(col, k) || this.checkTeleport(col, k)) {
                        return {col: col, row: k + 1};
                    }
                }
            }
        }
        return {col: col, row: row};
    },

    isOutTile: function (col, row) {
        return !this._mapNodesArray[Constants.BackgroundLayerName][row] || !this._mapNodesArray[Constants.BackgroundLayerName][row][col];
    },

    findFallTile: function (col, row) {
        let fallPos = this.findDirectFallTile(col, row);
        let fallPath = [];
        // if (fallPos == null) { // row == this._minVisibleRow || no generator on this col
        //     if (this.isHole(col, row)) {
        //         fallPos = {col: col, row: row};
        //         if (!this.checkTeleport(col, row)) {
        //             return [fallPos];
        //         }
        //     }
        //     else {
        //         return null;
        //     }
        // }

        if (this.isCanFall(fallPos.col, fallPos.row)) {
            fallPath.push(fallPos);
            return fallPath;
        }
        else { // in the case fallPos is HOLE
            if (this._mapNodesArray[Constants.TeleportsLayerName]) {
                let teleportPos = this.findTeleportRevers(fallPos.col, fallPos.row);
                if (teleportPos != null) {
                    if (this.isCanFall(teleportPos.col, teleportPos.row)) {
                        fallPath.push(fallPos);
                        fallPath.push(teleportPos);
                        return fallPath;
                    }
                    else{
                        let newFallPath = this.findFallTile(teleportPos.col, teleportPos.row);
                        if (newFallPath && newFallPath.length > 0) {
                            fallPath.push(fallPos);
                            fallPath.push(teleportPos);
                            for(let newFall of newFallPath){
                                if(!this.includeTile(fallPath, newFall)){
                                    fallPath.push(newFall);
                                }
                            }
                            fallPos = newFallPath[newFallPath.length - 1];
                        }
                    }
                }
            }
            if (this.isCanFall(fallPos.col, fallPos.row) || this.isThereGenerator(fallPos.col, fallPos.row)) {
                !this.includeTile(fallPath, fallPos) && fallPath.push(fallPos);
                return fallPath;
            }
            else {
                fallPos = {col: col, row: row};
                let additionalHolePos = null;
                while (additionalHolePos == null && fallPos.row >= this._minVisibleRow && this.isFillableTile(fallPos.col, fallPos.row)) {
                    additionalHolePos = this.findAdditionalFallTile(fallPos.col, fallPos.row);
                    fallPos.row--;
                }
                if (additionalHolePos != null) {
                    fallPath.push({col: fallPos.col, row: fallPos.row + 1});
                    fallPath.push(additionalHolePos);
                    if (this.isFillableTile(additionalHolePos.col, additionalHolePos.row)) {
                        let newFallPath = this.findFallTile(additionalHolePos.col, additionalHolePos.row);
                        if (newFallPath && newFallPath.length > 0) {
                            for(let newFall of newFallPath){
                                if(!this.includeTile(fallPath, newFall)){
                                    fallPath.push(newFall);
                                }
                            }
                            fallPos = fallPath[fallPath.length - 1];
                            if (this.isCanFall(fallPos.col, fallPos.row) || this.isThereGenerator(fallPos.col, fallPos.row)) {
                                return fallPath;
                            }
                        }
                    }
                    else if (this.isCanFall(additionalHolePos.col, additionalHolePos.row) || this.isThereGenerator(additionalHolePos.col, additionalHolePos.row)) {
                        return fallPath;
                    }
                    return null;
                }
                return fallPath;
            }
        }


        // if(this._mapNodesArray[Constants.TeleportsLayerName]){
        //     let teleportPos = this.findTeleportRevers(holePos.col, holePos.row);
        //     while (teleportPos != null) {
        //         fallPath.push(teleportPos);
        //         holePos = this.findDirectFallTile(teleportPos.col, teleportPos.row);
        //         if (holePos != null) {
        //             fallPath.push(holePos);
        //             teleportPos = this.findTeleport(holePos.col, holePos.row);
        //         }
        //         else {
        //             holePos = teleportPos;
        //             teleportPos = null;
        //         }
        //     }
        // }
        // let additionalHolePos = this.findAdditionalFallTile(holePos.col, holePos.row);
        // while (additionalHolePos != null) {
        //     fallPath.push(additionalHolePos);
        //     additionalHolePos = this.findAdditionalFallTile(additionalHolePos.col, additionalHolePos.row);
        // }

        return null;
    },

    checkTeleport: function (col, row) {
        if (this._mapNodesArray[Constants.TeleportsLayerName] && this._mapNodesArray[Constants.TeleportsLayerName][row]) {
            let tile = this._mapNodesArray[Constants.TeleportsLayerName][row][col];
            return tile != undefined;
        }
        return false;
    },

    findTeleport: function (col, row) {
        if (this._mapNodesArray[Constants.TeleportsLayerName] && this._mapNodesArray[Constants.TeleportsLayerName][row]) {
            let tile = this._mapNodesArray[Constants.TeleportsLayerName][row][col];
            if (tile && tile.value.indexOf("begin") > -1) {
                let teleportNumber = tile.value.split("_").pop();
                if (teleportNumber) {
                    for (let i in this._mapNodesArray[Constants.TeleportsLayerName]) {
                        for (let j in this._mapNodesArray[Constants.TeleportsLayerName][i]) {
                            if (this._mapNodesArray[Constants.TeleportsLayerName][i][j].value == "end_" + teleportNumber) {
                                if (this.isFillableTile(j, i)) {
                                    return {col: j, row: i, teleport: true};
                                }
                            }
                        }
                    }
                }
            }
        }
        return null;
    },

    findTeleportRevers: function (col, row) {
        if (this._mapNodesArray[Constants.TeleportsLayerName] && this._mapNodesArray[Constants.TeleportsLayerName][row]) {
            let tile = this._mapNodesArray[Constants.TeleportsLayerName][row][col];
            if (tile && tile.value.indexOf("end") > -1) {
                let teleportNumber = tile.value.split("_").pop();
                if (teleportNumber) {
                    for (let i in this._mapNodesArray[Constants.TeleportsLayerName]) {
                        let i = parseInt(i);
                        for (let j in this._mapNodesArray[Constants.TeleportsLayerName][i]) {
                            j = parseInt(j);
                            if (this._mapNodesArray[Constants.TeleportsLayerName][i][j].value == "begin_" + teleportNumber) {
                                if (this.isCanFall(j, i) || this.isFillableTile(j, i)) {
                                    return {col: j, row: i, teleport: true};
                                }
                            }
                        }
                    }
                }
            }
        }
        return null;
    },

    findAdditionalFallTile: function (col, row) {
        if (row - 1 < this._minVisibleRow) {
            return null;
        }

        if(Constants.TeleportLoop.includes(Global.PlayingLevel.levelNumber)) {
            if (this.isCanFall(col - 1, row - 1)) {
                let teleportTile = this.checkTeleportCol(col - 1, row - 1);
                if (teleportTile == false || teleportTile.value.indexOf("end") == -1) {
                    return {col: col - 1, row: row - 1};
                }
            }
            if (this.isCanFall(col + 1, row - 1)) {
                let teleportTile = this.checkTeleportCol(col + 1, row - 1);
                if (teleportTile == false || teleportTile.value.indexOf("end") == -1) {
                    return {col: col + 1, row: row - 1};
                }
            }
            if (this.isFillableTile(col - 1, row - 1)) {
                let teleportTile = this.checkTeleportCol(col - 1, row - 1);
                if (teleportTile == false || teleportTile.value.indexOf("end") == -1) {
                    return {col: col - 1, row: row - 1};
                }
            }
            if (this.isFillableTile(col + 1, row - 1)) {
                let teleportTile = this.checkTeleportCol(col + 1, row - 1);
                if (teleportTile == false || teleportTile.value.indexOf("end") == -1) {
                    return {col: col + 1, row: row - 1};
                }
            }
        }
        else{
            if (this.isCanFall(col - 1, row - 1)) {
                return {col: col - 1, row: row - 1};
            }
            if (this.isCanFall(col + 1, row - 1)) {
                return {col: col + 1, row: row - 1};
            }
            if (this.isFillableTile(col - 1, row - 1)) {
                return {col: col - 1, row: row - 1};
            }
            if (this.isFillableTile(col + 1, row - 1)) {
                return {col: col + 1, row: row - 1};
            }
        }
    },

    checkTeleportCol: function (col, row) {
        for(let i = row; i >= this._minVisibleRow; i --){
            if(!this._mapNodesArray[Constants.TeleportsLayerName][i]){
                continue;
            }
            let tile = this._mapNodesArray[Constants.TeleportsLayerName][i][col];
            if(tile){
                return tile;
            }
            if(!this._mapNodesArray[Constants.BackgroundLayerName][i] || !this._mapNodesArray[Constants.BackgroundLayerName][i][col]){
                return false;
            }
        }
        return false;
    },

    isCanFillDirect: function (col, row) {
        if (row == undefined) {
            row = col.row;
            col = col.col;
        }
        for (let i = row - 1; i >= this._minVisibleRow; i--) {
            if (this.isCanFall(col, i)) {
                return true;
            }
            else if (!this.isFallPassTile(col, i)) {
                break;
            }
        }
        let generatorTile = this.findGeneratorTile(col, row);
        if (generatorTile != null &&
            (this.isMovable(generatorTile.col, generatorTile.row) ||
            this._mapNodesArray[Constants.FiguresLayerName][generatorTile.row][generatorTile.col] == Constants.HOLE)) {
            return true;
        }
        let teleportTile = this.findTeleportInColumn(col, row);
        if (teleportTile != null) {
            let teleportBeginTile = this.findTeleportRevers(teleportTile.col, teleportTile.row);
            if (teleportBeginTile == null) {
                return false;
            }
            else {
                return this.isCanFillDirect(teleportBeginTile.col, teleportBeginTile.row);
            }
        }
        return false;
    },

    isFillableTile: function (col, row) {
        if (this.isValidTile(Constants.FiguresLayerName, col, row)) {
            return false;
        }
        if (col > this._maxVisibleColumn || col < this._minVisibleColumn) {
            return false;
        }
        if (row > this._maxVisibleRow || row < this._minVisibleRow) {
            return false;
        }
        if (this._mapNodesArray[Constants.BackgroundLayerName][row] == undefined) {
            return false;
        }
        if (this._mapNodesArray[Constants.BackgroundLayerName][row][col] == undefined) {
            return false;
        }
        if (this._mapNodesArray[Constants.FiguresLayerName][row] == undefined) {
            return true;
        }
        if (this._mapNodesArray[Constants.FiguresLayerName][row][col] == undefined) {
            return true;
        }
        if (this._mapNodesArray[Constants.FiguresLayerName][row][col] == Constants.HOLE) {
            return true;
        }
        return false;

    },

    processMovedTiles: function () {
        // if (this.isTherePendingActions() || this.isTherePendingTiles()) {
        //     return;
        // }
        let isMatched = false;
        for (let i in this._movedTiles) {
            if (!this.isContainedPendingBonus([this._movedTiles[i]])) {
                let b = this.isThereMatched(Constants.FiguresLayerName, this._movedTiles[i].col, this._movedTiles[i].row);
                if (b) {
                    isMatched = true;
                }
            }
        }
        this._movedTiles = [];
    },

    showShuffleStartAction: function () {
        // let centerPos = {x: (this._gameArea..right + this._gameArea.left) / 2, y: (this._gameArea.top + this._gameArea.bottom) / 2);
        let shuffle1Node = cc.find("Canvas/global_animation/shuffle");
        // shuffle1Node.setPosition(centerPos);
        shuffle1Node.active = true;
        shuffle1Node.setScale(5.0);
        shuffle1Node.getComponent("sp.Skeleton").setAnimation(0, "shuffle", false);
        setTimeout(() => {
            shuffle1Node.active = false;
        }, 1000);
        for (let i in this._mapNodesArray[Constants.FiguresLayerName]) {
            for (let j in this._mapNodesArray[Constants.FiguresLayerName][i]) {
                if (this.isInCurrentPage(j, i) && this.isMovable(j, i)) {
                    let node = this._mapNodesArray[Constants.FiguresLayerName][i][j].node;
                    if (node) {
                        if (node.getNumberOfRunningActions() > 0) {
                            node.stopAllActions();
                            node.runAction(cc.show());
                            this.setGameState();
                        }
                        let moveAct = cc.moveTo(0.4, this._gameArea.center.x, this._gameArea.center.y);
                        node.runAction(moveAct);
                    }
                }
            }
        }
    },

    show2LampAction: function (firstTile, secondTile) {
        let pos = this.grid2pos(firstTile.gridPosition.x, firstTile.gridPosition.y);
        Global.AudioManager.playLampLamp();
        let rotate = 2;

        let globalPos = Global.transformCoordinates(firstTile.node, this._uiNode);
        globalPos.x += Constants.TileSize / 2;
        globalPos.y += Constants.TileSize / 2;
        let seq = cc.sequence([
            cc.spawn([
                cc.moveTo(0.5, globalPos.x, globalPos.y),
                cc.scaleTo(0.5, 3, 3)
            ]),
            cc.rotateTo(0.1, rotate),
            cc.rotateTo(0.1, -rotate),
            cc.rotateTo(0.1, rotate),
            cc.rotateTo(0.1, -rotate),
            cc.rotateTo(0.1, rotate),
            cc.rotateTo(0.1, -rotate),
            cc.rotateTo(0.1, rotate),
            cc.rotateTo(0.1, -rotate),
            cc.rotateTo(0.1, rotate),
            cc.rotateTo(0.1, -rotate),
            cc.scaleTo(0.5, 1, 1),
            cc.scaleTo(0.1, 1.1, 1.1),
            cc.scaleTo(0.1, 1, 1),
            cc.scaleTo(0.1, 1.1, 1.1),
            cc.scaleTo(0.1, 1, 1),
            cc.scaleTo(0.1, 1.1, 1.1),
            cc.scaleTo(0.1, 1, 1),
        ]);
        this.addPendingAction();

        let firstPos = Global.transformCoordinates(firstTile.node, this._globalEffectsContainer);
        firstPos.x += Constants.TileSize / 2; firstPos.y += Constants.TileSize / 2;
        let secondPos = Global.transformCoordinates(secondTile.node, this._globalEffectsContainer);
        secondPos.x += Constants.TileSize / 2; secondPos.y += Constants.TileSize / 2;
        setTimeout(() => {
            this.showCircleEffect(firstPos, 2);
            this.showCircleEffect(secondPos, 2);
        }, 2 * 1000);

        if (secondTile && secondTile.node) {
            firstTile.node.removeFromParent(false);
            secondTile.node.removeFromParent(false);
            // this._uiNode.addChild(firstTile.node);
            // firstTile.node.x = globalPos.x;
            // firstTile.node.y = globalPos.y;
            // firstTile.node.setAnchorPoint(0.5, 0.5);
            // firstTile.node.runAction(seq);
            // secondTile.node.setAnchorPoint(0.5, 0.5);
            // secondTile.node.x = globalPos.x;
            // secondTile.node.x = globalPos.y;
            // secondTile.node.runAction(seq.clone());
        }

        let showNode = this.getTempNode();
        showNode.getComponent(cc.Sprite).spriteFrame = this.figuresAtlas.getSpriteFrame(Enum.BonusTypes.Lamp);
        this._uiNode.addChild(showNode);
        showNode.x = globalPos.x;
        showNode.y = globalPos.y;
        showNode.active = true;
        showNode.setAnchorPoint(0.5, 0.5);
        showNode.height = showNode.width = Constants.TileSize;
        showNode.runAction(seq);
        setTimeout(() => {
            this.recycleTempNode(showNode);
        }, 2.6 * 1000);

        setTimeout(() => {
            this.showLampAllAction(globalPos);
            let firstPos = Global.transformCoordinates(firstTile.node, this._globalEffectsContainer);
            firstPos.x += Constants.TileSize / 2; firstPos.y += Constants.TileSize / 2;
            let secondPos = Global.transformCoordinates(secondTile.node, this._globalEffectsContainer);
            secondPos.x += Constants.TileSize / 2; secondPos.y += Constants.TileSize / 2;
            this.showCircleEffect(firstPos);
            this.showCircleEffect(secondPos);
        }, 2 * 1000);
        setTimeout(() => {
            this.crushAllTiles({col: firstTile.gridPosition.x, row: firstTile.gridPosition.y});
            this.addTileToCrushQueue({col: firstTile.gridPosition.x, row: firstTile.gridPosition.y});
            this.addTileToCrushQueue({col: secondTile.gridPosition.x, row: secondTile.gridPosition.y});
            this.setGameState();
        }, 2.5 * 1000);
    },

    showLampAllAction: function (pos) {
        // let centerPosWorld = this.gameMapNode.convertToWorldSpaceAR(this._gameArea.center);
        // let centerUI = this._uiNode.convertToNodeSpaceAR(centerPosWorld);
        for (let i = 1; i <= 5; i++) {
            let spriteFrame = this.texture2Atlas.getSpriteFrame("ring_" + i);
            let ringNode = new cc.Node();
            let sp = ringNode.addComponent(cc.Sprite);
            sp.spriteFrame = spriteFrame;
            ringNode.setScale(0.5, 0.5);
            ringNode.active = true;
            ringNode.x = pos.x;
            ringNode.y = pos.y;
            ringNode.setOpacity(64);
            this._uiNode.addChild(ringNode);
            ringNode.runAction(
                cc.sequence([
                    cc.delayTime(0.1 * i),
                    cc.spawn([
                        cc.scaleTo(2, 10, 10),
                        cc.sequence([cc.fadeIn(1.0), cc.fadeOut(1.0)])
                    ]),
                    cc.removeSelf(true)
                ])
            );
        }
    },

    showShuffleEndAction: function () {
        for (let i in this._mapNodesArray[Constants.FiguresLayerName]) {
            for (let j in this._mapNodesArray[Constants.FiguresLayerName][i]) {
                if (this.isInCurrentPage(j, i) && this.isMovable(j, i)) {
                    let node = this._mapNodesArray[Constants.FiguresLayerName][i][j].node;
                    if (node) {
                        let targetPos = this.grid2pos(j, i);
                        if (node.getNumberOfRunningActions() > 0) {
                            node.stopAllActions();
                            this.setGameState();
                        }
                        let moveAct = cc.moveTo(0.4, targetPos.x, targetPos.y);
                        node.runAction(moveAct);
                    }
                }
            }
        }
    },

    clearBonusTilesBackup: function () {
        this._bonusArrays.lamp_area = [];
        this._bonusArrays.hbonus_area = [];
        this._bonusArrays.vbonus_area = [];
        this._bonusArrays.xbonus_area = [];
        this._bonusArrays.bomb_area = [];
        this._willCrushTiles = [];
    },

    calibrateTilePositions: function () {
        if (this.isTherePendingActions() || this.isTherePendingTiles()) {
            return;
        }

        this.addPendingAction();
        for (let i in this._mapNodesArray[Constants.FiguresLayerName]) {
            if (this._mapNodesArray[Constants.FiguresLayerName][i]) {
                for (let j in this._mapNodesArray[Constants.FiguresLayerName][i]) {
                    if (this.isInCurrentPage(j, i) && this._mapNodesArray[Constants.FiguresLayerName][i][j] && this._mapNodesArray[Constants.FiguresLayerName][i][j].node) {
                        let pos = this.grid2pos(j, i);
                        this._mapNodesArray[Constants.FiguresLayerName][i][j].node.x = pos.x;
                        this._mapNodesArray[Constants.FiguresLayerName][i][j].node.y = pos.y;
                    }
                }
            }
        }
        this.setGameState();
    },
    clearHintAction: function () {
        if (this.isTherePendingActions()) {
            return;
        }
        if (this._hintTimer != null) {
            clearTimeout(this._hintTimer);
            this._hintTimer = null;
        }
        for (let i in this._mapNodesArray[Constants.FiguresLayerName]) {
            if (this._mapNodesArray[Constants.FiguresLayerName][i]) {
                for (let j in this._mapNodesArray[Constants.FiguresLayerName][i]) {
                    if (this._mapNodesArray[Constants.FiguresLayerName][i][j] && this._mapNodesArray[Constants.FiguresLayerName][i][j].node) {
                        let tile = this._mapNodesArray[Constants.FiguresLayerName][i][j];
                        tile.node.stopActionByTag(Constants.TILE_HINT_ACTION);
                        tile.node.setScale(1, 1);
                        // tile.node.runAction(cc.tintTo(0.01, 255, 255, 255));
                        // this._mapNodesArray[Constants.FiguresLayerName][i][j].node.stopAllActions();
                    }
                }
            }
        }
    },

    fillHoles: function () {
        // if (this.isTherePendingActions()) {
        //     return;
        // }
        for (let i in this._mapNodesArray[Constants.GeneratorsLayerName]) {
            for (let j in this._mapNodesArray[Constants.GeneratorsLayerName][i]) {
                let col = parseInt(j), row = parseInt(i);
                if (this.isInCurrentPage(col, row)) {
                    let fallenCount = 0;
                    while (this.isFillableTile(col, row)) {
                        this.fallNewTile(col, row, fallenCount);
                        fallenCount++
                    }
                }
            }
        }
        for (let i in this._mapNodesArray[Constants.FiguresLayerName][this._minVisibleRow]) {
            let col = parseInt(i), row = this._minVisibleRow;
            if (this.isInCurrentPage(col, row) && this.findTeleport(col, row)) {
                let fallenCount = 0;
                while (this.isFillableTile(col, row)) {
                    this.fallNewTile(col, row, fallenCount);
                    fallenCount++
                }
            }
        }
    },

    findGeneratorTile: function (col, row) {
        for (let i = row; i >= this._minVisibleRow; i--) {
            if (this.isFallPassTile(col, i)) {
                if (this._mapNodesArray[Constants.GeneratorsLayerName][i] && this._mapNodesArray[Constants.GeneratorsLayerName][i][col]) {
                    return {col: col, row: i};
                }
            }
            // else if(this._mapNodesArray[Constants.GeneratorsLayerName][i] && this._mapNodesArray[Constants.GeneratorsLayerName][i][col]){
            //     return {col: col, row: i};
            // }
            else {
                break;
            }
        }
        return null;
    },

    findTeleportInColumn: function (col, row) {
        for (let i = row; i >= this._minVisibleRow; i--) {
            if (this.isFallPassTile(col, i)) {
                if (this._mapNodesArray[Constants.TeleportsLayerName] &&
                    this._mapNodesArray[Constants.TeleportsLayerName][i] &&
                    this._mapNodesArray[Constants.TeleportsLayerName][i][col]) {
                    return {col: col, row: i};
                }
            }
            // else if(this._mapNodesArray[Constants.GeneratorsLayerName][i] && this._mapNodesArray[Constants.GeneratorsLayerName][i][col]){
            //     return {col: col, row: i};
            // }
            else {
                break;
            }
        }
        return null;
    },

    isFallPassTile: function (col, row) {
        if (this._mapNodesArray[Constants.FiguresLayerName][row] == undefined) {
            return !Constants.UndefinedNotPassLevels.includes(Global.PlayingLevel.levelNumber);
        }
        if (this._mapNodesArray[Constants.FiguresLayerName][row][col] == undefined
            && (this._mapNodesArray[Constants.BackgroundLayerName][row] == undefined || this._mapNodesArray[Constants.BackgroundLayerName][row][col] == undefined)) {
            return !Constants.UndefinedNotPassLevels.includes(Global.PlayingLevel.levelNumber);
        }
        if (this._mapNodesArray[Constants.FiguresLayerName][row][col] == Constants.FOX_POS) {
            return true;
        }
        if (this.isFillableTile(col, row)) {
            return true;
        }
        return false;
    },

    spawnNewTile: function (col, row) {
        let tile = this.addFigureNode(Constants.FiguresLayerName, col, row, "");
        if (this.checkSpawnGooBomb()) {
            tile.setGooBomb(this.gooBombPrefab);
            this._isThereGooBomb = true;
        }
        return tile;
    },

    createNewTile: function (col, row) {
        this._spawnedTilesCount++;

        let tile = this.spawnNewTile(col, row);
        // while (this.checkMatch4Tile(col, row, spriteName)) {
        //     spriteName = this.getRandomFigure();
        // }
        return tile;
    },

    fallNewTile: function (col, row, fallenCount) {
        try {
            if (!this.isFillableTile(col, row)) {
                return false;
            }
            let generatorTile = this.findGeneratorTile(col, row);
            if (generatorTile == null) {
                if (row == this._minVisibleRow) {
                    generatorTile = {col: col, row: row};
                }
                else {
                    return false;
                }
            }

            this.createNewTile(generatorTile.col, generatorTile.row);
            // this.fallTileAction(pos, node);

            let fallPath = this.findFallTile(col, row);
            if (fallPath.length == 0) {
                fallPath.push({col: col, row: row});
            }
            else if (fallPath[0].col != col) {
                fallPath.unshift({col: col, row: row});
            }
            this.fallTileThroughPath(generatorTile, fallPath, fallenCount * Constants.FallTileTime * 0.6);
            return true;
        } catch (e) {
            cc.info(e, "fallNewTile");
            return false;
        }
    },

    fallTileAction: function (pos, node, fallTime) {
        // this._gameState = Enum.GameState.TileMoving;
        if (fallTime == undefined) {
            let distance = node.y - pos.y;
            fallTime = Constants.FallTileTime + 0.6 * distance / this._gameArea.height;
        }
        this.addPendingAction();
        let fallAction = cc.moveTo(fallTime, pos);
        fallAction.easing(cc.easeSineIn());
        let bouncingAction1 = cc.moveBy(0.01, 0, 3);
        let bouncingAction2 = cc.moveBy(0.02, 0, 2);
        let bouncingAction3 = cc.moveBy(0.03, 0, 1);//, cc.rotateBy(0.2, 5 * Math.random()));
        let bouncingEndAction = cc.moveTo(0.1, pos);
        // let setStateFunc = new cc.callFunc(this.setGameState, this, Enum.GameState.Idle);
        // let seq = new cc.Sequence(fallAction, setStateFunc);
        // if(node.getNumberOfRunningActions() > 0){
        //     node.stopAllActions();
        //     this.setGameState();
        // }
        node.runAction(cc.sequence([cc.delayTime(0.2), fallAction, bouncingAction1, bouncingAction2, bouncingAction3, cc.delayTime(0.1), bouncingEndAction, cc.callFunc(this.setGameState, this, Enum.GameState.Idle)]));
    },

    swapTiles: function (first, second) {
        let temp = this._mapNodesArray[Constants.FiguresLayerName][first.y][first.x];
        this._mapNodesArray[Constants.FiguresLayerName][first.y][first.x] = this._mapNodesArray[Constants.FiguresLayerName][second.y][second.x];
        if(this._mapNodesArray[Constants.FiguresLayerName][first.y][first.x] instanceof Tile) {
            this._mapNodesArray[Constants.FiguresLayerName][first.y][first.x].gridPosition = first;
        }
        this._mapNodesArray[Constants.FiguresLayerName][second.y][second.x] = temp;
        if(this._mapNodesArray[Constants.FiguresLayerName][second.y][second.x] instanceof Tile) {
            this._mapNodesArray[Constants.FiguresLayerName][second.y][second.x].gridPosition = second;
        }
    },

    addFigLayerNode: function (col, row, cellValue) {
        if(this._mapNodesArray[Constants.BackgroundLayerName][row] === undefined
            || this._mapNodesArray[Constants.BackgroundLayerName][row][col] === undefined){
            return;
        }
        if (Constants.SkipFiguresArray.includes(cellValue)) {
            return;
        }
        if (Constants.CountStoneNamesArray.includes(cellValue)) {
            this.addCountStoneNode(col, row, cellValue);
        }
        else if (Enum.WishingWellTypes.all.includes(cellValue)) {
            this.addWishingWellTile(col, row, cellValue);
        }
        else if (cellValue == "mono_color_pie_large") {
            this.addColorPieTile(col, row, cellValue);
        }
        else if (cellValue == Enum.TileKind.OfferingBase) {
            this.addOfferingBaseTile(col, row, cellValue);
        }
        else {
            this.addFigureNode(Constants.FiguresLayerName, col, row, cellValue);
        }
    },

    addColorPieTile: function (col, row, cellValue) {
        let node = cc.instantiate(this._colorPieTemplate);
        let tile = node.getComponent(Constants.ColorPieScriptName);
        tile.gridPosition = cc.p(col, row);
        tile.value = cellValue;
        tile.node.on(Constants.COLOR_PIE_FULL, this.onColorPieFull, this);

        this.addLargeNodeToLayer(this.figuresLayer, node, col, row, {
            w: tile.gridWidth,
            h: tile.gridHeight,
            dx: tile.dx,
            dy: tile.dy
        });
        for (let i = 0; i < tile.gridHeight; i++) {
            for (let j = 0; j < tile.gridWidth; j++) {
                this.setFigureTile(col + j * tile.dx, row + i * tile.dy, tile);
            }
        }
    },

    onColorPieFull: function (event) {
        this.crushAllTiles(event.detail);
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                this.setFigureTile(event.detail.col + j, event.detail.row + i, Constants.HOLE);
            }
        }
    },

    crushAllTiles: function (startTile) {
        let rowLoopCount = this._maxVisibleRow - startTile.row > startTile.row - this._minVisibleRow ?
        this._maxVisibleRow - startTile.row + 1 : startTile.row - this._minVisibleRow + 1;

        let colLoopCount = this._maxVisibleColumn - startTile.col > startTile.col - this._minVisibleColumn ?
        this._maxVisibleColumn - startTile.col + 1 : startTile.col - this._minVisibleColumn + 1;

        this._matchId++;
        for (let i = 0; i < rowLoopCount; i++) {
            for (let j = 0; j < colLoopCount; j++) {
                this.setMatchNumber([
                    {col: startTile.col + j, row: startTile.row + i},
                    {col: startTile.col - j, row: startTile.row + i},
                    {col: startTile.col + j, row: startTile.row - i},
                    {col: startTile.col - j, row: startTile.row - i},
                ], true);
                if(this.getFigureTile(startTile.col + j, startTile.row + i) && this.getFigureTile(startTile.col + j, startTile.row + i).bonus !== Enum.BonusTypes.Lamp){
                    this.addTileToCrushQueue({col: startTile.col + j, row: startTile.row + i});
                }
                if(this.getFigureTile(startTile.col - j, startTile.row + i) && this.getFigureTile(startTile.col - j, startTile.row + i).bonus !== Enum.BonusTypes.Lamp){
                    this.addTileToCrushQueue({col: startTile.col - j, row: startTile.row + i});
                }
                if(this.getFigureTile(startTile.col + j, startTile.row - i) && this.getFigureTile(startTile.col + j, startTile.row - i).bonus !== Enum.BonusTypes.Lamp){
                    this.addTileToCrushQueue({col: startTile.col + j, row: startTile.row - i});
                }
                if(this.getFigureTile(startTile.col - j, startTile.row - i) && this.getFigureTile(startTile.col - j, startTile.row - i).bonus !== Enum.BonusTypes.Lamp){
                    this.addTileToCrushQueue({col: startTile.col - j, row: startTile.row - i});
                }
            }
        }
    },

    checkMatch4Tile: function (col, row, cellValue) {
        let matchResults = this.searchMatchTile(Constants.FiguresLayerName, col, row, cellValue);
        return matchResults.h.length >= 3 || matchResults.v.length >= 3 || matchResults.s.length >= 4;
    },

    addSnakeNode: function (col, row, cellValue) {
        let figureTile = this.getFigureTile(col, row);
        if (figureTile == null) {
            return;
        }
        figureTile.setSnake();
    },

    addFigureNode: function (layerName, col, row, cellValue) {
        let node = null;
        let figureTile = null;
        let oldTile = this._mapNodesArray[Constants.FiguresLayerName][row][col];
        if(oldTile == Constants.DOOR_TELEPORT){
            return;
        }
        if (oldTile) {
            this.recycleFigure(oldTile.node);
        }
        if (cellValue.indexOf("swirl") > -1) {
            node = this.createSwirl();
            figureTile = node.getComponent(Constants.SwirlScriptName);
        }
        else {
            node = this.createFigure();
            figureTile = node.getComponent(Constants.FigureScriptName);
            figureTile.isMatchable = true;
        }
        if (!Constants.FigureNamesArray.includes(cellValue)) {
            if (cellValue == "figures_force") {
                cellValue = this._figuresForce;
            }
            else {
                cellValue = this.getRandomFigure();
                while (this.checkMatch4Tile(col, row, cellValue)) {
                    cellValue = this.getRandomFigure();
                }
            }
        }
        // node.getComponent(cc.Sprite).spriteFrame = this.figuresAtlas.getSpriteFrame(cellValue);
        figureTile.setFigure && figureTile.setFigure(cellValue);
        figureTile.gridPosition = cc.p(col, row);
        this._mapNodesArray[layerName][row][col] = figureTile;
        if (cellValue in Constants.LargeTiles) {
            this.addLargeNodeToLayer(this.figuresLayer, node, col, row, Constants.LargeTiles[cellValue]);
        }
        else {
            this.addNodeToLayer(this.figuresLayer, node, col, row);
        }
        return figureTile;
    },

    addCountStoneNode: function (col, row, cellValue) {
        const node = cc.instantiate(this.countStonePrefab);
        let tile = node.getComponent(Constants.CountStoneScriptName);
        tile.stoneLevel = cellValue;// "count_stone_5";
        tile.gridPosition = cc.p(col, row);
        let self = this;
        tile.node.on(Constants.FIGURE_DESTROYED, this.onFigureDestroyed, this);
        this._mapNodesArray[Constants.FiguresLayerName][row][col] = tile;
        this.addNodeToLayer(this.figuresLayer, node, col, row);
    },

    showHintAction: function () {
        if(this.isShuffleNeed()){
            return;
        }
        for (let i in this._availableMove) {
            let tile = this._mapNodesArray[Constants.FiguresLayerName][this._availableMove[i].row][this._availableMove[i].col]
            if (tile && tile.isMovable) {
                let seq = cc.repeat(
                    cc.sequence([
                        cc.scaleTo(0.4, 1.1),
                        cc.scaleTo(0.4, 1.0)
                    ]), 10);
                // if(tile.node.getNumberOfRunningActions() > 0){
                //     tile.node.stopAllActions();
                //     this.setGameState();
                // }

                seq.setTag(Constants.TILE_HINT_ACTION);
                tile.node.runAction(seq);
                //noinspection JSUnresolvedFunction
                // Global.AudioManager.playHintSFX();
            }
        }
    },

    checkMatches: function () {
        if (this.isTherePendingActions() || this.isTherePendingTiles() || this._gameState === Enum.GameState.TileMoving) {
            return false;
        }
        else {
            if (this.checkMatchDelay < 3) {
                this.checkMatchDelay++;
                return false;
            }
            this.checkMatchDelay = 0;
            return this.isThereMatched4All();
        }
        // cc.info("checkMatches", false);
    },

    isThereMatched4All: function () {
        let isMatched = false;
        for (let i in this._mapNodesArray[Constants.FiguresLayerName]) {
            for (let j in this._mapNodesArray[Constants.FiguresLayerName][i]) {
                if (this.isInCurrentPage(j, i) && !this.isContainedPendingBonus([{col: j, row: i}])
                    && this.isThereMatched(Constants.FiguresLayerName, j, i)) {
                    // cc.info("checkMatches", true);
                    isMatched = true;
                }
            }
        }
        return isMatched;
    },

    shuffle: function () {
        let temp = [];
        for (let i = this._minVisibleRow; i <= this._maxVisibleRow; i++) {
            if (this._mapNodesArray[Constants.FiguresLayerName][i]) {
                temp.push(...this._mapNodesArray[Constants.FiguresLayerName][i].slice(this._minVisibleColumn, this._maxVisibleColumn + 1));
            }
        }
        //cc.info(temp.splice(0,10), "temp before");
        temp = temp.concat(temp.splice(0, Math.floor(Math.random() * temp.length)));
        //cc.info(temp, "temp after");

        // cc.info(this._mapNodesArray[Constants.FiguresLayerName], "before");
        let splicePos = 0;
        for (let i = this._minVisibleRow; i <= this._maxVisibleRow; i++) {
            for (let j = this._minVisibleColumn; j <= this._maxVisibleColumn; j++) {
                let shuffleTile = temp[splicePos];
                while (splicePos < temp.length - 1 &&
                (shuffleTile == undefined || !shuffleTile.gridPosition || !this.isMovable(shuffleTile.gridPosition.x, shuffleTile.gridPosition.y)
                || shuffleTile.tileKind == Enum.TileKind.Relic || !shuffleTile.isMatchable)) {
                    splicePos++;
                    shuffleTile = temp[splicePos];
                }
                let realTile = this.getFigureTile(j, i);
                if (shuffleTile && this.isMovable(j, i) && realTile != undefined && realTile.tileKind != Enum.TileKind.Relic
                    && realTile.isMatchable) {
                    shuffleTile.gridPosition = cc.p(parseInt(j), parseInt(i));
                    this.setFigureTile(j, i, shuffleTile);
                    splicePos++;
                }
            }
            // cc.info(this._mapNodesArray[Constants.FiguresLayerName][i], "row: " + i);
        }
        // cc.info(this._mapNodesArray[Constants.FiguresLayerName], "after");
    },


    isShuffleNeed: function () {
        for (let i = this._minVisibleRow; i <= this._maxVisibleRow; i++) {
            for (let j = this._minVisibleColumn; j <= this._maxVisibleColumn; j++) {
                if (this.checkAvailableMove(i, j)) {
                    return false;
                }
            }
        }

        // for (let i = this._minVisibleRow; i <= this._maxVisibleRow; i++) {
        //     for (let j = this._minVisibleColumn; j <= this._maxVisibleColumn; j++) {
        //         if (this.checkAvailableMove(i, j)) {
        //             return false;
        //         }
        //     }
        // }
        return true;
    },

    isMovable: function (col, row) {
        col = parseInt(col);
        row = parseInt(row);
        if (this.isValidTile(Constants.FiguresLayerName, col, row)) {
            if (this._mapNodesArray[Constants.FiguresLayerName][row][col].isMovable) {
                let movableDirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
                let isMovable = false;
                for (let i in movableDirs) {
                    let dir = movableDirs[i];
                    if (this.isInCurrentPage(col + dir[0], row + dir[1]) && this.isValidTile(Constants.FiguresLayerName, col + dir[0], row + dir[1]) && this._mapNodesArray[Constants.FiguresLayerName][row + dir[1]][col + dir[0]].isMovable) {
                        isMovable = true;
                        break;
                    }
                }
                return isMovable;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    },

    checkChains: function (col, row) {
        if (this._mapNodesArray[Constants.FiguresChains]) {
            if (this._mapNodesArray[Constants.FiguresChains][row] && this._mapNodesArray[Constants.FiguresChains][row][col]) {
                return this._mapNodesArray[Constants.FiguresChains][row][col] != Constants.CHAIN_FREE;
            }
        }
        return false;
    },

    checkAvailableMove: function (R, C) {
        if (!this.isMatchable(C, R)) {
            return false;
        }
        let referTile = this._figNodesArray[R][C];
        if (referTile.bonus == Enum.BonusTypes.Lamp && referTile.isMovable) {
            const moveDir = [[0, -1], [0, 1], [-1, 0], [1, 0]];
            for (let i in moveDir) {
                if (this.isMovable(C + moveDir[i][0], R + moveDir[i][1]) && this.isInCurrentPage(C + moveDir[i][0], R + moveDir[i][1])) {
                    this._availableMove = [
                        {col: C, row: R},
                        {col: C + moveDir[i][0], row: R + moveDir[i][1]}
                    ];
                    return true;
                }
            }
        }
        else {
            let shuffleDir = Constants.AvailableMoves;
            for (let i = 0; i < shuffleDir.length; i++) {
                let count = 0;
                let available = [{col: C, row: R}];
                for (let j = 0; j < 2; j++) {
                    if ((shuffleDir[i][j][0] + R >= this._minVisibleRow && shuffleDir[i][j][0] + R <= this._maxVisibleRow) && (shuffleDir[i][j][1] + C >= this._minVisibleColumn && shuffleDir[i][j][1] + C <= this._maxVisibleColumn)) {
                        if (this.isMatchable(shuffleDir[i][j][1] + C, shuffleDir[i][j][0] + R)) {
                            if (this._figNodesArray[shuffleDir[i][j][0] + R][shuffleDir[i][j][1] + C].figure == referTile.figure) {
                                available.push({col: shuffleDir[i][j][1] + C, row: shuffleDir[i][j][0] + R});
                                count++;
                            }
                        }
                    }
                }
                if (count >= 2 && this.isMovable(shuffleDir[i][2][1] + C, shuffleDir[i][2][0] + R) && this.isMovable(shuffleDir[i][3][1] + C, shuffleDir[i][3][0] + R)) {
                    this._availableMove = available;
                    return true;
                }
            }

            if (referTile.bonus && referTile.isMovable) {
                for (let i in Constants.NearByDirects) {
                    let nearbyTile = this.getFigureTile(C + Constants.NearByDirects[i][0], R + Constants.NearByDirects[i][1]);
                    if (nearbyTile != null && nearbyTile.bonus && nearbyTile.isMatchable && nearbyTile.isMovable) {
                        this._availableMove = [
                            {col: C, row: R},
                            {col: C + Constants.NearByDirects[i][0], row: R + Constants.NearByDirects[i][1]}
                        ];
                        return true;
                    }
                }
            }
            this._availableMove = [];
            return false;
        }
    },

    isMatchable: function (col, row) {
        col = parseInt(col);
        row = parseInt(row);
        if (!this.isValidTile(col, row)) {
            return false;
        }
        let tile = this._mapNodesArray[Constants.FiguresLayerName][row][col];
        if (tile.tileKind == Enum.TileKind.Figure) {
            return tile.isMatchable;
        }
        else {
            return false;
        }
    },

    isValidTile: function (layerName, col, row) {
        if (row == undefined) {
            row = col;
            col = layerName;
            layerName = Constants.FiguresLayerName;
        }
        col = parseInt(col);
        row = parseInt(row);
        return this._mapNodesArray && this._mapNodesArray[layerName] && this._mapNodesArray[layerName][row] && this._mapNodesArray[layerName][row][col] &&
            this._mapNodesArray[layerName][row][col] instanceof Tile;
    },

    getRandomFigure: function () {
        return this.availableFigures[Math.floor(Math.random() * this.availableFigures.length)];
    },

    addOtherNode: function (layerName, col, row, cellValue) {
        let layerNode = this.gameMapNode.getChildByName(layerName);
        if (layerNode == null) {
            layerNode = this.backgroundTileLayer;
        }
        let node = new cc.Node(cellValue);
        let spriteComponent = node.addComponent(cc.Sprite);
        spriteComponent.spriteFrame = this.figuresAtlas.getSpriteFrame(cellValue);

        if (cellValue in Constants.LargeTiles) {
            this.addLargeNodeToLayer(layerNode, node, col, row, Constants.LargeTiles[cellValue]);
        }
        else {
            this.addNodeToLayer(layerNode, node, col, row);
        }
    },

    setMapBorder: function () {
        let zOrder = 500;
        for (let i in this._mapNodesArray[Constants.BackgroundLayerName]) {
            i = parseInt(i);
            for (let j in this._mapNodesArray[Constants.BackgroundLayerName][i]) {
                j = parseInt(j);
                let backTile = this._mapNodesArray[Constants.BackgroundLayerName][i][j];
                if (backTile) {

                    let borders = [];
                    let hasBorder = false;
                    for (let k of Constants.NearByDirects) {
                        if (this._mapNodesArray[Constants.BackgroundLayerName][i + k[1]] == undefined || this._mapNodesArray[Constants.BackgroundLayerName][i + k[1]][j + k[0]] == undefined) {
                            borders.push(true);
                            hasBorder = true;
                        }
                        else {
                            borders.push(false);
                        }
                    }
                    if (hasBorder) {
                        zOrder++;
                        backTile.setBorder(borders, zOrder);
                    }
                    else {
                        backTile.setBorder(borders);
                    }
                }
            }
        }
    },

    addNodeToLayer: function (layer, node, col, row) {
        try {
            const pos = this.grid2pos(col, row);
            node.x = pos.x;
            node.y = pos.y;
            node.anchorX = 0;
            node.anchorY = 0;
            node.width = Constants.TileSize;
            node.height = Constants.TileSize;
            layer.addChild(node);
        } catch (e) {
            cc.info(e, "addNodeToLayer Exception");
        }
    },
    addLargeNodeToLayer: function (layer, node, col, row, largeNodeInfo) {
        try {
            let pos = null;
            let width = 2, height = 2;
            if (largeNodeInfo == undefined) {
                pos = this.grid2pos(col, row);
            }
            else {
                pos = this.grid2pos(col, row + largeNodeInfo.dy * (largeNodeInfo.h - 1));
                width = largeNodeInfo.w;
                height = largeNodeInfo.h
            }
            node.x = pos.x;
            node.y = pos.y;
            node.anchorX = 0;
            node.anchorY = 0;
            node.width = Constants.TileSize * width;
            node.height = Constants.TileSize * height;
            layer.addChild(node);
        } catch (e) {
            cc.info(e, "addLargeNodeToLayer Exception");
        }
    },

    isCanCrush: function (tilesArray) {
        return !this.isContainedPendingBonus(tilesArray) && !this.isContainedPendingMove(tilesArray);
    },

    setMatchNumber: function (tilesArray, notIncreaseMatchId) {
        !notIncreaseMatchId && this._matchId++;
        for (let tile of tilesArray) {
            let figureTile = this.getFigureTile(tile);
            (figureTile != null) && (figureTile.matchId = this._matchId);
        }
    },

    isThereMatched: function (layerName, currentCol, currentRow, cellValue) {
        if (!this.isMovable(currentCol, currentRow) || !this.isMatchable(currentCol, currentRow)) {
            return false;
        }
        const matchTiles = this.searchMatchTile(layerName, currentCol, currentRow, cellValue);
        // cc.info("isThereMatched", "col: " + currentCol + " row: " + currentRow);
        let allTiles = [];
        allTiles.push(...matchTiles.v);
        allTiles.push(...matchTiles.h);

        if (matchTiles.h.length >= 5) {
            let bonus = {
                pos: {
                    col: currentCol,
                    row: currentRow
                },
                tiles: matchTiles.h
            };
            if (this.isCanCrush(bonus.tiles)) {
                this.popTileFromPendingCrush(bonus.tiles);
                this._bonusArrays.lamp_area.push(bonus);
                this._matchNumber++;
                this.setMatchNumber(bonus.tiles);
                //noinspection JSUnresolvedFunction
                this.scoreManager.pushAdditiveScore({
                    matchType: Enum.BonusTypes.Lamp,
                    position: this.grid2pos(currentCol, currentRow),
                    matchNumber: this._matchNumber
                });
                //noinspection JSUnresolvedFunction
                Global.AudioManager.playMatchSFX(this._matchNumber);
            }
        }
        else if (matchTiles.h.length == 4) {
            if (matchTiles.v.length >= 3) {
                let bonus = {
                    pos: {
                        col: currentCol,
                        row: currentRow
                    },
                    tiles: allTiles
                };
                if (this.isCanCrush(bonus.tiles)) {
                    this.popTileFromPendingCrush(bonus.tiles);
                    this._bonusArrays.xbonus_area.push(bonus);
                    this._matchNumber++;
                    this.setMatchNumber(bonus.tiles);
                    //noinspection JSUnresolvedFunction
                    this.scoreManager.pushAdditiveScore({
                        matchType: Enum.BonusTypes.XBonus,
                        position: this.grid2pos(currentCol, currentRow),
                        matchNumber: this._matchNumber
                    });
                    //noinspection JSUnresolvedFunction
                    Global.AudioManager.playMatchSFX(this._matchNumber);
                }
            }
            else {
                let bonus = {
                    pos: {
                        col: currentCol,
                        row: currentRow
                    },
                    tiles: matchTiles.h
                };
                if (this.isCanCrush(bonus.tiles)) {
                    this.popTileFromPendingCrush(bonus.tiles);
                    this._bonusArrays.vbonus_area.push(bonus);
                    this._matchNumber++;
                    this.setMatchNumber(bonus.tiles);
                    //noinspection JSUnresolvedFunction
                    this.scoreManager.pushAdditiveScore({
                        matchType: Enum.BonusTypes.VBonus,
                        position: this.grid2pos(currentCol, currentRow),
                        matchNumber: this._matchNumber
                    });
                    //noinspection JSUnresolvedFunction
                    Global.AudioManager.playMatchSFX(this._matchNumber);
                }
            }
        }
        if (matchTiles.h.length == 3) {
            if (matchTiles.v.length == 3) {
                let bonus = {
                    pos: {
                        col: currentCol,
                        row: currentRow
                    },
                    tiles: allTiles
                };
                if ((matchTiles.h[0].col < matchTiles.h[1].col && matchTiles.h[0].col > matchTiles.h[2].col) ||
                    (matchTiles.v[0].row < matchTiles.v[1].row && matchTiles.v[0].row > matchTiles.v[2].row)) {
                    if (this.isCanCrush(bonus.tiles)) {
                        this.popTileFromPendingCrush(bonus.tiles);
                        this._bonusArrays.xbonus_area.push(bonus);
                        this._matchNumber++;
                        this.setMatchNumber(bonus.tiles);
                        //noinspection JSUnresolvedFunction
                        this.scoreManager.pushAdditiveScore({
                            matchType: Enum.BonusTypes.XBonus,
                            position: this.grid2pos(currentCol, currentRow),
                            matchNumber: this._matchNumber
                        });
                        //noinspection JSUnresolvedFunction
                        Global.AudioManager.playMatchSFX(this._matchNumber);
                    }
                }
                else if (this.isCanCrush(bonus.tiles)) {
                    this.popTileFromPendingCrush(bonus.tiles);
                    this._bonusArrays.bomb_area.push(bonus);
                    this._matchNumber++;
                    this.setMatchNumber(bonus.tiles);
                    //noinspection JSUnresolvedFunction
                    this.scoreManager.pushAdditiveScore({
                        matchType: Enum.BonusTypes.Bomb,
                        position: this.grid2pos(currentCol, currentRow),
                        matchNumber: this._matchNumber
                    });
                    //noinspection JSUnresolvedFunction
                    Global.AudioManager.playMatchSFX(this._matchNumber);
                }
            }
            else if (matchTiles.v.length < 3 && matchTiles.s.length < 4) {
                if (this.isCanCrush(matchTiles.h)) {
                    this._willCrushTiles.push(...matchTiles.h);
                    this._matchNumber++;
                    this.setMatchNumber(matchTiles.h);
                    //noinspection JSUnresolvedFunction
                    this.scoreManager.pushAdditiveScore({
                        matchType: Enum.BonusTypes.Normal,
                        position: this.grid2pos(currentCol, currentRow),
                        matchNumber: this._matchNumber
                    });
                    //noinspection JSUnresolvedFunction
                    Global.AudioManager.playMatchSFX(this._matchNumber);
                }
            }
        }

        if (matchTiles.v.length >= 5) {
            let bonus = {
                pos: {
                    col: currentCol,
                    row: currentRow
                },
                tiles: matchTiles.v
            };
            if (this.isCanCrush(bonus.tiles)) {
                this.popTileFromPendingCrush(bonus.tiles);
                this._bonusArrays.lamp_area.push(bonus);
                this._matchNumber++;
                this.setMatchNumber(bonus.tiles);
                //noinspection JSUnresolvedFunction
                this.scoreManager.pushAdditiveScore({
                    matchType: Enum.BonusTypes.Lamp,
                    position: this.grid2pos(currentCol, currentRow),
                    matchNumber: this._matchNumber
                });
                //noinspection JSUnresolvedFunction
                Global.AudioManager.playMatchSFX(this._matchNumber);
            }
        }
        else if (matchTiles.v.length == 4) {
            if (matchTiles.h.length >= 3) {
                let bonus = {
                    pos: {
                        col: currentCol,
                        row: currentRow
                    },
                    tiles: allTiles
                };
                if (this.isCanCrush(bonus.tiles)) {
                    this.popTileFromPendingCrush(bonus.tiles);
                    this._bonusArrays.xbonus_area.push(bonus);
                    this._matchNumber++;
                    this.setMatchNumber(bonus.tiles);
                    //noinspection JSUnresolvedFunction
                    this.scoreManager.pushAdditiveScore({
                        matchType: Enum.BonusTypes.XBonus,
                        position: this.grid2pos(currentCol, currentRow),
                        matchNumber: this._matchNumber
                    });
                    //noinspection JSUnresolvedFunction
                    Global.AudioManager.playMatchSFX(this._matchNumber);
                }
            }
            else {
                let bonus = {
                    pos: {
                        col: currentCol,
                        row: currentRow
                    },
                    tiles: matchTiles.v
                };
                if (this.isCanCrush(bonus.tiles)) {
                    this.popTileFromPendingCrush(bonus.tiles);
                    this._bonusArrays.hbonus_area.push(bonus);
                    this._matchNumber++;
                    this.setMatchNumber(bonus.tiles);
                    //noinspection JSUnresolvedFunction
                    this.scoreManager.pushAdditiveScore({
                        matchType: Enum.BonusTypes.HBonus,
                        position: this.grid2pos(currentCol, currentRow),
                        matchNumber: this._matchNumber
                    });
                    //noinspection JSUnresolvedFunction
                    Global.AudioManager.playMatchSFX(this._matchNumber);
                }
            }
        }
        else if (matchTiles.v.length == 3) {
            if (matchTiles.h.length < 3 && matchTiles.s.length < 4) {
                if (this.isCanCrush(matchTiles.v)) {
                    this._willCrushTiles.push(...matchTiles.v);
                    this._matchNumber++;
                    this.setMatchNumber(matchTiles.v);
                    //noinspection JSUnresolvedFunction
                    this.scoreManager.pushAdditiveScore({
                        matchType: Enum.BonusTypes.Normal,
                        position: this.grid2pos(currentCol, currentRow),
                        matchNumber: this._matchNumber
                    });
                    //noinspection JSUnresolvedFunction
                    Global.AudioManager.playMatchSFX(this._matchNumber);
                }
            }
        }

        if (matchTiles.s.length >= 4) {
            let bonus = {
                pos: {
                    col: currentCol,
                    row: currentRow
                },
                tiles: matchTiles.s
            };
            if (matchTiles.h.length >= 3) {
                for (let i in matchTiles.h) {
                    if (!this.includeTile(bonus.tiles, matchTiles.h[i])) {
                        bonus.tiles.push(matchTiles.h[i]);
                        this.addTileToCrushQueue(matchTiles.h[i]);
                    }
                }
            }
            if (matchTiles.v.length >= 3) {
                for (let i in matchTiles.v) {
                    if (!this.includeTile(bonus.tiles, matchTiles.v[i])) {
                        bonus.tiles.push(matchTiles.v[i]);
                        this.addTileToCrushQueue(matchTiles.v[i]);
                    }
                }
            }
            if (this.isCanCrush(bonus.tiles)) {
                this.popTileFromPendingCrush(bonus.tiles);
                this._bonusArrays.squarebomb_area.push(bonus);
                this._matchNumber++;
                this.setMatchNumber(bonus.tiles);
                //noinspection JSUnresolvedFunction
                this.scoreManager.pushAdditiveScore({
                    matchType: Enum.BonusTypes.Square,
                    position: this.grid2pos(currentCol, currentRow),
                    matchNumber: this._matchNumber
                });
                //noinspection JSUnresolvedFunction
                Global.AudioManager.playMatchSFX(this._matchNumber);
            }
        }

        return matchTiles.h.length >= 3 || matchTiles.v.length >= 3 || matchTiles.s.length >= 4;
    },

    isContainedPendingBonus: function (tilesArray) {
        // if(tilesArray.length > 1){
        //     cc.info(tilesArray, "isContainedPendingBonus");
        //     cc.info(this._bonusArrays, "isContainedPendingBonus");
        //     console.trace();
        // }
        for (let bonusKey in this._bonusArrays) {
            let bonus = this._bonusArrays[bonusKey];
            for (let i in bonus) {
                for (let j in tilesArray) {
                    if (this.includeTile(bonus[i].tiles, tilesArray[j])) {
                        return true;
                    }
                }
            }
        }
        return false;
    },

    isContainedPendingMove: function (tilesArray) {
        for (let i in tilesArray) {
            if (this.isContainsTile(tilesArray[i], this._willMoveTiles)) {
                return true;
            }
        }
        return false;
    },

    isContainedPendingCrush: function (tilesArray) {
        for (let i in tilesArray) {
            if (this.isContainsTile(tilesArray[i], this._willCrushTiles)) {
                return true;
            }
        }
        return false;
    },

    addTileToCrushQueue: function (tile) {
        if (!this.isContainsTile(tile, this._willCrushTiles) && !this.isContainedPendingBonus([tile]) &&
            this.isInCurrentPage(tile.col, tile.row)) {
            this._willCrushTiles.push(tile);
            this.scoreManager.pushConstantScore({position: this.grid2pos(tile.col, tile.row)})
        }
    },

    checkContains: function (bonusArray, bonus) {
        for (let i in bonusArray) {
            for (let j in bonus.tiles) {
                if (this.includeTile(bonusArray[i].tiles, bonus.tiles[j])) {
                    return true;
                }
            }
        }
        return false;
    },

    includeTile: function (a, b) {
        for (let i in a) {
            if (a[i].row == b.row && a[i].col == b.col) {
                return true;
            }
        }
        return false;
    },

    searchMatchTile: function (layerName, currentCol, currentRow, cellValue) {
        const matchHorizontalTile = [];
        const matchVerticalTile = [];
        const matchSquareTile = [];
        currentCol = parseInt(currentCol);
        currentRow = parseInt(currentRow);

        if (cellValue == undefined) {
            if (!this.isMovable(currentCol, currentRow)) {
                return {h: {}, v: {}, s: {}};
            }
            cellValue = this._mapNodesArray[layerName][currentRow][currentCol].figure;
        }
        // Vertical Search
        matchVerticalTile.push({
            row: currentRow,
            col: currentCol,
            val: cellValue
        });

        for (let i = 1;
             (currentRow + i <= this._maxVisibleRow && currentRow + i >= this._minVisibleRow) &&
             this._mapNodesArray[layerName][currentRow + i] &&
             this._mapNodesArray[layerName][currentRow + i][currentCol] &&
             this._mapNodesArray[layerName][currentRow + i][currentCol].figure == cellValue &&
             this._mapNodesArray[layerName][currentRow + i][currentCol].isMatchable &&
             this.notInMatchResultTile(matchVerticalTile, currentRow + i, currentCol); i++) {

            matchVerticalTile.push({
                row: currentRow + i,
                col: currentCol,
                val: this._mapNodesArray[layerName][currentRow + i][currentCol].figure
            });
        }

        for (let i = -1; (currentRow + i <= this._maxVisibleRow && currentRow + i >= this._minVisibleRow) &&
        this._mapNodesArray[layerName][currentRow + i] &&
        this._mapNodesArray[layerName][currentRow + i][currentCol] &&
        this._mapNodesArray[layerName][currentRow + i][currentCol].figure == cellValue &&
        this._mapNodesArray[layerName][currentRow + i][currentCol].isMatchable &&
        this.notInMatchResultTile(matchVerticalTile, currentRow + i, currentCol); i--) {
            matchVerticalTile.push({
                row: currentRow + i,
                col: currentCol,
                val: this._mapNodesArray[layerName][currentRow + i][currentCol].figure
            });
        }

        // Horizontal Search
        matchHorizontalTile.push({
            row: currentRow,
            col: currentCol,
            val: cellValue
        });

        // const columnCount = this._mapNodesArray[layerName][currentRow].length;
        for (let i = 1; (currentCol + i <= this._maxVisibleColumn && currentCol + i >= this._minVisibleColumn) &&
        this._mapNodesArray[layerName][currentRow] &&
        this._mapNodesArray[layerName][currentRow][currentCol + i] &&
        this._mapNodesArray[layerName][currentRow][currentCol + i].figure == cellValue &&
        this._mapNodesArray[layerName][currentRow][currentCol + i].isMatchable &&
        this.notInMatchResultTile(matchHorizontalTile, currentRow, currentCol + i); i++) {
            matchHorizontalTile.push({
                row: currentRow,
                col: currentCol + i,
                val: this._mapNodesArray[layerName][currentRow][currentCol + i].figure
            });
        }

        for (let i = -1; (currentCol + i <= this._maxVisibleColumn && currentCol + i >= this._minVisibleColumn) &&
        this._mapNodesArray[layerName][currentRow] &&
        this._mapNodesArray[layerName][currentRow][currentCol + i] &&
        this._mapNodesArray[layerName][currentRow][currentCol + i].figure == cellValue &&
        this._mapNodesArray[layerName][currentRow][currentCol + i].isMatchable &&
        this.notInMatchResultTile(matchHorizontalTile, currentRow, currentCol + i); i--) {
            matchHorizontalTile.push({
                row: currentRow,
                col: currentCol + i,
                val: this._mapNodesArray[layerName][currentRow][currentCol + i].figure
            });
        }

        // Square Search
        matchSquareTile.push({
            row: currentRow,
            col: currentCol,
            val: cellValue
        });

        if (this._mapNodesArray[layerName][currentRow - 1]) {
            if (this.isMatchable(currentCol - 1, currentRow - 1) && this.isMatchable(currentCol, currentRow - 1) &&
                this.isMatchable(currentCol - 1, currentRow)) {
                if (this._mapNodesArray[layerName][currentRow - 1][currentCol - 1].figure == cellValue && this._mapNodesArray[layerName][currentRow - 1][currentCol].figure == cellValue && this._mapNodesArray[layerName][currentRow][currentCol - 1].figure == cellValue) {
                    matchSquareTile.push({row: currentRow - 1, col: currentCol, val: cellValue});
                    matchSquareTile.push({row: currentRow - 1, col: currentCol - 1, val: cellValue});
                    matchSquareTile.push({row: currentRow, col: currentCol - 1, val: cellValue});
                }
            }
            if (this.isMatchable(currentCol + 1, currentRow - 1) && this.isMatchable(currentCol, currentRow - 1) &&
                this.isMatchable(currentCol + 1, currentRow)) {
                if (this._mapNodesArray[layerName][currentRow - 1][currentCol + 1].figure == cellValue && this._mapNodesArray[layerName][currentRow - 1][currentCol].figure == cellValue && this._mapNodesArray[layerName][currentRow][currentCol + 1].figure == cellValue) {
                    matchSquareTile.push({row: currentRow - 1, col: currentCol, val: cellValue});
                    matchSquareTile.push({row: currentRow - 1, col: currentCol + 1, val: cellValue});
                    matchSquareTile.push({row: currentRow, col: currentCol + 1, val: cellValue});
                }
            }
        }
        if (this._mapNodesArray[layerName][currentRow + 1]) {
            if (this.isMatchable(currentCol - 1, currentRow + 1) && this.isMatchable(currentCol, currentRow + 1) &&
                this.isMatchable(currentCol - 1, currentRow)) {
                if (this._mapNodesArray[layerName][currentRow + 1][currentCol - 1].figure == cellValue && this._mapNodesArray[layerName][currentRow + 1][currentCol].figure == cellValue && this._mapNodesArray[layerName][currentRow][currentCol - 1].figure == cellValue) {
                    matchSquareTile.push({row: currentRow + 1, col: currentCol, val: cellValue});
                    matchSquareTile.push({row: currentRow + 1, col: currentCol - 1, val: cellValue});
                    matchSquareTile.push({row: currentRow, col: currentCol - 1, val: cellValue});
                }
            }
            if (this.isMatchable(currentCol + 1, currentRow + 1) && this.isMatchable(currentCol, currentRow + 1) &&
                this.isMatchable(currentCol + 1, currentRow)) {
                if (this._mapNodesArray[layerName][currentRow + 1][currentCol + 1].figure == cellValue && this._mapNodesArray[layerName][currentRow + 1][currentCol].figure == cellValue && this._mapNodesArray[layerName][currentRow][currentCol + 1].figure == cellValue) {
                    matchSquareTile.push({row: currentRow + 1, col: currentCol, val: cellValue});
                    matchSquareTile.push({row: currentRow + 1, col: currentCol + 1, val: cellValue});
                    matchSquareTile.push({row: currentRow, col: currentCol + 1, val: cellValue});
                }
            }
        }

        // cc.info("searchMatchTile", "h: " + matchHorizontalTile.length + ", v: " + matchVerticalTile.length + ", s: " + matchSquareTile.length);
        return {
            h: matchHorizontalTile,
            v: matchVerticalTile,
            s: matchSquareTile
        };
    },

    notInMatchResultTile: function (matchResultTile, r, c) {
        for (let i = 0; i < matchResultTile.length; i++) {
            if (matchResultTile[i].row == r && matchResultTile[i].col == c)
                return false;
        }

        return true;
    },


    onSettingsButtonClicked: function () {
        const settingsPopup = this._popupsNode.getChildByName("settings_popup");
        if (settingsPopup) {
            this._popupMaskNode.active = true;
            settingsPopup.getChildByName("music_button").getComponent(cc.Sprite).spriteFrame = this.uiAtlas.getSpriteFrame(
                Global.Settings.backgroundMusic == true ? "12" : "15"
            );
            settingsPopup.getChildByName("sound_button").getComponent(cc.Sprite).spriteFrame = this.uiAtlas.getSpriteFrame(
                Global.Settings.soundFX == true ? "11" : "14"
            );
            settingsPopup.active = true;
            let action = Global.createShowPopupAction();
            settingsPopup.runAction(action);
        }
    },

    onRateAppClicked: function () {
        this.clearAllTimers();
        Global.PendingActions = 0;
        Global.loadLevel(Global.PlayingLevel.levelNumber);
    },

    onWatchVideoClicked: function (event) {
        let coinsCount = 25;
        isNaN(coinsCount) && (coinsCount = 25);
        Global.UserData.coins += coinsCount;
        let coinsNode = cc.find("buy_item_popup/coins/label", this._popupsNode);
        coinsNode.getComponent(cc.Label).string = Global.UserData.coins;
        // let watchVideo = this._popupsNode.getChildByName("watch_video");
        // watchVideo.active = true;
        // watchVideo.runAction(cc.fadeIn(0.5));
        this.showRewardedVideo();
        Global.increaseVideoWatched();
        this.onBuyCoinsCloseClicked();
    },
    onWatchAdsClicked: function (event) {
        let coinsCount = 5;
        isNaN(coinsCount) && (coinsCount = 25);
        Global.UserData.coins += coinsCount;
        let coinsNode = cc.find("buy_item_popup/coins/label", this._popupsNode);
        coinsNode.getComponent(cc.Label).string = Global.UserData.coins;
        // let watchVideo = this._popupsNode.getChildByName("fullscreen_ads");
        // watchVideo.active = true;
        // watchVideo.runAction(cc.fadeIn(0.5));
        this.showInterstitial();
        Global.increaseAdsWatched();
        this.onBuyCoinsCloseClicked();
    },

    onAdsCloseClicked: function () {
        let adsPopup = this._popupsNode.getChildByName("fullscreen_ads");
        adsPopup.active = false;
    },

    showBuyItemPopup: function(boosterType){
        this._popupMaskNode.active = true;
        let buyItemPopup = this._popupsNode.getChildByName("buy_item_popup");
        buyItemPopup.active = true;
        let coins = cc.find("coins/label", buyItemPopup);
        coins.getComponent(cc.Label).string = Global.UserData.coins;
        let imageSprite = cc.find("image", buyItemPopup).getComponent(cc.Sprite);
        let detailsLabel = cc.find("details_text", buyItemPopup).getComponent(cc.Label);
        let buyItemNode =  cc.find("buy_button", buyItemPopup);
        let priceLabel = cc.find("buy_button/price", buyItemPopup).getComponent(cc.Label);
        buyItemNode.item = boosterType;
        imageSprite.spriteFrame = this.gameUIAtlas.getSpriteFrame(`buy_${boosterType}`);
        detailsLabel.string = Constants.BuyItemDetails[boosterType];
        priceLabel.string = Constants.ItemPrices[boosterType];
        let action = Global.createShowPopupAction();
        buyItemPopup.runAction(action);
    },

    hideBuyItemPopup: function(){
        this._popupMaskNode.active = false;
        let buyItemPopup = this._popupsNode.getChildByName("buy_item_popup");
        let action = Global.createHidePopupAction();
        buyItemPopup.runAction(action);
    },

    onBuyItemCloseClicked: function () {
        this.hideBuyItemPopup();
    },

    onBuyItemClicked: function (event) {
        let booster = event.target.item;
        let needCoins = Constants.ItemPrices[booster];
        if(Global.UserData.coins >= needCoins){
            Global.UserData.coins -= needCoins;
            Global.UserData.availableBoosters[booster] += Constants.ItemBuyUnits[booster];
            Global.UserData.save();
            this.initBoosters();
            this.hideBuyItemPopup();
        }
        else{
            this.showBuyCoinsPopup();
        }
    },

    showBuyCoinsPopup: function () {
        let action = Global.createShowPopupAction();
        let buyCoinsPopup = this._popupsNode.getChildByName("buy_coins_popup");
        Global.initBuyCoinsPopup(buyCoinsPopup);
        buyCoinsPopup.active = true;
        buyCoinsPopup.runAction(action);
    },

    onBuyCoinsCloseClicked: function () {
        let action = Global.createHidePopupAction();
        let buyCoinsPopup = this._popupsNode.getChildByName("buy_coins_popup");
        buyCoinsPopup.runAction(action);
    },

    onBuyCoinsClicked: function (event) {
        let coinsCount = parseInt(event.target.coins);
        isNaN(coinsCount) && (coinsCount = 25);
        Global.UserData.coins += coinsCount;
        Global.UserData.save();
        let priceDollar = Constants.CoinBuyUnits[coinsCount];
        cc.info(priceDollar, "buy coins price");
        let coinsNode = cc.find("buy_item_popup/coins/label", this._popupsNode);
        coinsNode.getComponent(cc.Label).string = Global.UserData.coins;
        this.onBuyCoinsCloseClicked();
    },

    onLampBonusClicked: function () {
        if (this.isTherePendingActions() || this.isThereMovingActions() || this.isTherePendingTiles()) {
            return;
        }
        if (Global.ActiveBooster == Enum.Boosters.Lamp) {
            this._boosterInputNode.active = false;
            this._boosterParticleNode.active = false;
            Global.ActiveBooster = null;
        }
        else if (Global.ActiveBooster == null) {
            if (Global.UserData.availableBoosters.lamp > 0) {
                Global.ActiveBooster = Enum.Boosters.Lamp;
                this._boosterInputNode.active = true;
                this.activateBoosterParticle(this._boosterLampNode.getPosition());
            }
            else {
                this.showBuyItemPopup(Enum.Boosters.Lamp);
            }
        }
    },

    onLineBoosterClicked: function () {
        if (this.isTherePendingActions() || this.isThereMovingActions() || this.isTherePendingTiles()) {
            return;
        }
        if (Global.ActiveBooster == Enum.Boosters.Line) {
            this._boosterInputNode.active = false;
            this._boosterParticleNode.active = false;
            Global.ActiveBooster = null;
        }
        else if (Global.ActiveBooster == null) {
            if (Global.UserData.availableBoosters.line > 0) {
                Global.ActiveBooster = Enum.Boosters.Line;
                this._boosterInputNode.active = true;
                this.activateBoosterParticle(this._boosterLineNode.getPosition());
            }
            else {
                this.showBuyItemPopup(Enum.Boosters.Line);
            }
        }
    },

    onButterflyBoosterClicked: function () {
        if (this.isTherePendingActions() || this.isThereMovingActions() || this.isTherePendingTiles()) {
            return;
        }
        if (Global.ActiveBooster == Enum.Boosters.Butterfly) {
            this._boosterInputNode.active = false;
            this._boosterParticleNode.active = false;
            Global.ActiveBooster = null;
        }
        else if (Global.ActiveBooster == null) {
            if (Global.UserData.availableBoosters.butterfly > 0) {
                Global.ActiveBooster = Enum.Boosters.Butterfly;
                this._boosterInputNode.active = true;
                this.activateBoosterParticle(this._boosterButterflyNode.getPosition());
            }
            else {
                this.showBuyItemPopup(Enum.Boosters.Butterfly);
            }
        }
    },

    onExitButtonClicked: function () {
        Global.PendingActions = 0;
        this.clearAllTimers();

        (cc.sys.isMobile) && Global.sendGAProgressionEvent(ga.EGAProgressionStatus.Fail, `level-${Global.PlayingLevel.levelNumber}`, `type-${Global.PlayingLevel.levelType}`, `Exit`);

        cc.director.loadScene("map");
    },

    onSettingsCloseClicked: function () {
        const settingsPopup = cc.find("Canvas/ui_nodes/popups/settings_popup");
        if (settingsPopup) {
            this._popupMaskNode.active = false;
            let action = Global.createHidePopupAction();
            settingsPopup.runAction(cc.sequence(
                action,
                cc.callFunc(()=>{
                    settingsPopup.active = false;
                })
            ));
        }
    },

    onSettingsMusicClicked: function () {
        Global.Settings.backgroundMusic = !Global.Settings.backgroundMusic;
        Global.Settings.save();
        let bgMusicNode = cc.find("Canvas/ui_nodes/popups/settings_popup/music_button");
        bgMusicNode.getComponent(cc.Sprite).spriteFrame = this.uiAtlas.getSpriteFrame(
            Global.Settings.backgroundMusic ? "12" : "15"
        );
        if(Global.Settings.backgroundMusic){
            Global.AudioManager.playBGM()
        }
        else{
            Global.AudioManager.pauseMusic();
        }
    },

    onSettingsSoundClicked: function (event) {
        Global.Settings.soundFX = !Global.Settings.soundFX;
        Global.Settings.save();
        let bgMusicNode = cc.find("Canvas/ui_nodes/popups/settings_popup/sound_button");
        bgMusicNode.getComponent(cc.Sprite).spriteFrame = this.uiAtlas.getSpriteFrame(
            Global.Settings.soundFX ? "11" : "14"
        );
    },

});
