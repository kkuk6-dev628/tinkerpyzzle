//noinspection JSUnresolvedFunction
let GameBase = require("GameBase");
//noinspection JSUnresolvedFunction
const Constants = require("Constants");
//noinspection JSUnresolvedFunction
const Enum = require("EnumTypes");
//noinspection JSUnresolvedFunction
const Global = require("Global");
//noinspection JSUnresolvedFunction

const ForceWay = require(Constants.ForceWayScriptName);

cc.Class({
    extends: GameBase,
    editor: {
        requireComponent: sp.Skeleton
    },

    properties: {

        forceWayTemplateNode: {
            default: null,
            type: cc.Prefab
        },

        keyTemplateNode: {
            default: null,
            type: cc.Prefab
        },

        _forceWayPool: {
            default: null,
            type: cc.NodePool
        },

        _keyPool: {
            default: null,
            type: cc.NodePool
        },

        _foxNode: {
            default: null,
            type: cc.Node
        },

        _wayFinishNode: {
            default: null,
            type: cc.Node
        },

        _wayTemplateNode: {
            default: null,
            type: cc.Node
        },

        _doorTeleportTemplateNode: {
            default: null,
            type: cc.Node
        },

        _doorTeleportLayerNode: {
            default: null,
            type: cc.Node
        },

        _wayLayerNode: {
            default: null,
            type: cc.Node
        },

        _topBoxNode: {
            default: null,
            type: cc.Node
        },

        _topKeyNode: {
            default: null,
            type: cc.Node
        },

        __topKeyNumNode: {
            default: null,
            type: cc.Node
        },

        _doorTeleportNode: {
            default: null,
            type: cc.Node
        },

        _doorTeleportDestNode: {
            default: null,
            type: cc.Node
        },

        _airshipNode: {
            default: null,
            type: cc.Node
        },

        _topKeyPosition: {
            default: null,
            type: cc.p
        },

        _foxPosition: {
            default: null,
            type: Array
        },

        _wayStartPosition: {
            default: null,
            type: Array
        },

        _wayFinishPosition: {
            default: null,
            type: Array
        },

        _doorTeleportDestPosition: {
            default: null,
            type: Array
        },

        _comeInDir: {
            default: null,
            type: Array
        },

        foxMovingTime: {
            default: 0,
            visible: false
        },

        _collectedKeysCount: 0,

        _playingPart: 0,

        _foxMoveCount:0,

        _spawnedTilesCount4Key: 0,

        _currentDoorNumber: -1,

        _currentFoxDoorNumber: -1,

        _spawnKey: false,

        _spawnForceWay: false,

        _spawnMorphForceWay: false,

        _foxSpineR: null,

        _foxSpineUp: null,

        _foxSpineDown: null,

        _foxNodeR: null,

        _foxNodeUp: null,

        _foxNodeDown: null,

        _foxNodeGlad: null,

        _foxSpineGlad: null,
    },

    // use this for initialization
    onLoad: function () {
        this._super();

        // cc.info(Constants.TILE_MOVE_ACTION, "test");
    },

    start: function () {
        this._super();
    },

    afterLoadLevelMap: function () {
        this._super();
        this.setWayKeyPoints();
        ForceWay.movingForceWay = 0;
        if(Global.PlayingLevel.levelType == Enum.LevelTypes.Key){
            this.initKeyGame();
        }
        else if(Global.PlayingLevel.levelType == Enum.LevelTypes.FoxWay){
            this.initFoxGame();
        }
    },

    initFoxGame: function () {
        this._topKeyNode.active = false;
        this._topKeyNumNode.active = false;
        this._topBoxNode.active = true;
        this._topBoxNode.x = 0;
    },

    initKeyGame: function () {
        this._topKeyNode.active = true;
        this._topKeyNumNode.active = true;
        this._topBoxNode.active = true;
        this._topBoxNode.x = 64;

        this.setKeyCountLabel(Global.PlayingLevel.keyCount);
        if(Global.PlayingLevel.smallDoorTeleports && Global.PlayingLevel.smallDoorTeleports.length > 0){
            this._currentDoorNumber = 0;
            this._currentFoxDoorNumber = 0;
            this.setKeyCountLabel(Global.PlayingLevel.smallDoorTeleports[0].keysCount);

        }
    },

    setWayKeyPoints: function () {
        this._foxNode.active = true;
        this.setFigureTile(this._foxPosition, Constants.FOX_POS);
        this.setFigureTile(this._wayFinishPosition, Constants.FOX_END_POS);
    },

    // this function will be called at onLoad function.
    initNodeTemplates: function () {
        this._super();

        this._forceWayPool = new cc.NodePool(Constants.ForceWayScriptName);
        this._keyPool = new cc.NodePool(Constants.KeyScriptName);

        this._foxNode = cc.find("way_key_points/fox", this.gameMapNode);

        this._foxNodeR = this._foxNode.getChildByName("right");
        this._foxNodeR.active = true;
        this._foxSpineR = this._foxNodeR.getComponent('sp.Skeleton');
        let anim = this._foxSpineR.setAnimation(0, 'Idle', true);
        anim.timeScale = 2;

        this._foxNodeUp = this._foxNode.getChildByName("top");
        this._foxNodeUp.active = false;
        this._foxSpineUp = this._foxNodeUp.getComponent('sp.Skeleton');

        this._foxNodeDown = this._foxNode.getChildByName("bottom");
        this._foxNodeDown.active = false;
        this._foxSpineDown = this._foxNodeDown.getComponent('sp.Skeleton');

        this._foxNode.getChildByName("left").active = false;

        this._foxNodeGlad = this._foxNode.getChildByName("fox_glad");
        this._foxNodeGlad.active = false;
        this._foxSpineGlad = this._foxNodeGlad.getComponent('sp.Skeleton');

        //this._foxNode.getComponent(cc.Sprite).spriteFrame = null;
        // let foxWait = this._foxNode.getChildByName("fox_wait");
        // let anim = foxWait.getComponent(cc.Animation);
        // anim.play("fox_wait");

        this._wayFinishNode = cc.find("way_key_points/way_finish", this.gameMapNode);
        this._wayLayerNode = cc.find("way", this.gameMapNode);

        this._wayTemplateNode = cc.find("way/way_template", this.gameMapNode);
        this._wayTemplateNode.removeFromParent(false);
        // this._forceWayTemplateNode = this.figuresLayer.getChildByName('force_way');
        // this._forceWayTemplateNode.removeFromParent(false);
        // this._keyTemplateNode = this.figuresLayer.getChildByName('key');
        // this._keyTemplateNode.removeFromParent(false);

        this._doorTeleportLayerNode = cc.find('Canvas/game_mask/game_node/items');
        this._doorTeleportTemplateNode = this._doorTeleportLayerNode.getChildByName('door_teleport');
        this._doorTeleportTemplateNode.removeFromParent(false);
        this._doorTeleportSmallNode = this._doorTeleportLayerNode.getChildByName('door_teleport_small');
        this._doorTeleportSmallNode.removeFromParent(false);
        this._doorTeleportSmallDestNode = this._doorTeleportLayerNode.getChildByName('door_teleport_small_dest');
        this._doorTeleportSmallDestNode.removeFromParent(false);

        this._topKeyNode = cc.find("Canvas/ui_nodes/top_status_area/top_1/key");
        this._topBoxNode = cc.find("Canvas/ui_nodes/top_status_area/top_1/box");
        this._topKeyNumNode = cc.find("Canvas/ui_nodes/top_status_area/top_1/key_count");
        let wKeyPos = this._topKeyNode.parent.convertToWorldSpaceAR(this._topKeyNode.getPosition());
        this._topKeyPosition = this._uiNode.convertToNodeSpaceAR(wKeyPos);
        this._finishBoxNode = cc.find('Canvas/fox_animation/gem_box_effect');
        this._finishBoxNode.active = false;
        this._airshipNode = this._doorTeleportLayerNode.getChildByName('airship');
        this._airshipNode.active = false;
        // this._finishBoxNode.getComponent(cc.Animation).play("finish_box");
    },

    createForceWay: function () {
        let forceWay = null;
        if (this._forceWayPool.size() > 0) { // use size method to check if there're nodes available in the pool
            forceWay = this._forceWayPool.get();
        } else { // if not enough node in the pool, we call cc.instantiate to create node
            forceWay = cc.instantiate(this.forceWayTemplateNode);
        }
        // forceWay.init();
        forceWay.on(Constants.TILE_MOVED, this.onFiguresMove, this);
        forceWay.on(Constants.FIGURE_DESTROYED, this.onFigureDestroyed, this);
        forceWay.on(Constants.FORCE_WAY_COLLECTED, this.onForceWayCollected, this);
        // forceWay.on(Constants.CHECK_MATCH, this.onCheckMatch, this);
        forceWay.on(Constants.SNAKE_DESTROYED, this.onSnakeDestroyed, this);
        forceWay.on(Constants.MILK_DESTROYED, this.onMilkDestroyed, this);

        return forceWay;
    },

    createKey: function () {
        let key = null;
        if (this._keyPool.size() > 0) { // use size method to check if there're nodes available in the pool
            key = this._keyPool.get();
        } else { // if not enough node in the pool, we call cc.instantiate to create node
            key = cc.instantiate(this.keyTemplateNode);
        }
        key.on(Constants.TILE_MOVED, this.onFiguresMove, this);
        key.on(Constants.FIGURE_DESTROYED, this.onFigureDestroyed, this);
        key.on(Constants.KEY_COLLECTED, this.onKeyCollected, this);
        // key.on(Constants.CHECK_MATCH, this.onCheckMatch, this);
        key.on(Constants.SNAKE_DESTROYED, this.onSnakeDestroyed, this);
        key.on(Constants.MILK_DESTROYED, this.onMilkDestroyed, this);

        return key;
    },

    addDoorTeleportSmall: function (col, row, cellValue) {
        let doorTeleportNode = cc.instantiate(cellValue == "door_teleport_small" ? this._doorTeleportSmallNode : this._doorTeleportSmallDestNode);
        let tile = doorTeleportNode.getComponent(Constants.DoorTeleportSmallScriptName);
        tile.gridPosition = cc.p(col, row);
        let pos = this.grid2pos(col, row);
        doorTeleportNode.x = pos.x + Constants.TileSize / 2;
        doorTeleportNode.y = pos.y + Constants.TileSize / 2;
        this._doorTeleportLayerNode.addChild(doorTeleportNode);
        this.setFigureTile(col, row, tile);
    },

    addDoorTeleportNodes: function (col, row, cellValue) {
        if(cellValue == "building_part"){
            return;
        }
        let node = cc.instantiate(this._doorTeleportTemplateNode);
        if(cellValue == "door_teleport_dest"){
            this._doorTeleportDestPosition = {col: col, row: row};
            node.getChildByName("door").active = false;
            this._doorTeleportDestNode = node;
        }
        else if(cellValue == "door_teleport"){
            this._doorTeleportNode = node;
        }
        let tile = node.getComponent(Constants.DoorTeleportSccriptName);
        tile.gridPosition = cc.p(col, row);
        for(let i = 0; i < tile.gridHeight; i++){
            let rowNum = row + tile.dy * i;
            if (this._mapNodesArray[Constants.FiguresLayerName][rowNum] == undefined) {
                this._mapNodesArray[Constants.FiguresLayerName][rowNum] = []
            }
            for (let j = 0; j < tile.gridWidth; j++) {
                let figureTile = this.getFigureTile(col + tile.dx * j, rowNum);
                if(figureTile != null){
                    this.recycleTile(figureTile);
                }
                this._mapNodesArray[Constants.FiguresLayerName][rowNum][col + tile.dx * j] = Constants.DOOR_TELEPORT;
            }
        }
        // node.getComponent(cc.Sprite).spriteFrame = this.othersAtlas.getSpriteFrame(cellValue);
        this.addLargeNodeToLayer(this._doorTeleportLayerNode, node, col, row);
        if (this._mapNodesArray[Constants.DoorTeleportsLayerName][row] == undefined){
            this._mapNodesArray[Constants.DoorTeleportsLayerName][row] = [];
        }
        this._mapNodesArray[Constants.DoorTeleportsLayerName][row][col] = tile;
    },

    isThereForceWay: function(){
        for(let i = this._minVisibleRow; i <= this._maxVisibleRow; i++){
            if(this._mapNodesArray[Constants.FiguresLayerName][i]){
                for(let j = this._minVisibleColumn; j <= this._maxVisibleColumn; j++){
                    let tile = this.getFigureTile(j, i);
                    if(tile && tile.forceWay){
                        return true;
                    }
                }
            }
        }
        return false;
    },

    checkSpawnForceWay: function () {
        return Global.checkSpawn(this._spawnedTilesCount, Global.PlayingLevel.spawnBoot) || !this.isThereForceWay();
    },

    checkSpawnMorphForceWay: function () {
        return Global.checkSpawn(this._spawnedTilesCount, Global.PlayingLevel.spawnMMPPPaw);
    },

    checkSpawnKey: function () {
        return this._colCurrentPage == 1 && Global.checkSpawn(this._spawnedTilesCount, Global.PlayingLevel.spawnKey);
    },

    checkSpawn: function () {
        if(this.checkSpawnForceWay()){
            this._spawnForceWay = true;
        }
        if(this.checkSpawnMorphForceWay()){
            this._spawnMorphForceWay = true;
        }
        if(this.checkSpawnKey()){
            this._spawnKey = true;
        }
    },

    spawnNewTile: function (col, row) {
        try {
            this.checkSpawn();
            let tile = null;

            if(this._spawnForceWay){
                tile = this.addRelicTile(col, row, "force_way_item");
                this._spawnForceWay = false;
            }
            else if(this._spawnMorphForceWay){
                this.addRelicTile(col, row, "force_way_item");
                tile = this.addMorphTile(col, row, "morph_special_area");
                this._spawnMorphForceWay = false;
            }
            else if(this._spawnKey){
                tile = this.addKeyNode(Constants.FiguresLayerName, col, row, "bonus2_h");
                this._spawnKey = false;
            }
            else{
                tile = this._super(col, row);
            }
            return tile;
        } catch (e) {
            cc.info(e, "fallNewTile");
            return false;
        }
    },

    showFailedPopup: function () {
        this._super();
    },

    addKeyNode: function (layerName, col, row, cellValue) {
        let oldTile = this.getFigureTile(col, row);
        (oldTile != null) && (oldTile.node) && (this.recycleFigure(oldTile.node));
        let node = this.createKey();
        let keyTile = node.getComponent(Constants.KeyScriptName);
        keyTile.figure = cellValue;
        keyTile.gridPosition = cc.p(col, row);
        this._mapNodesArray[Constants.FiguresLayerName][row][col] = keyTile;
        this.addNodeToLayer(this.figuresLayer, node, col, row);
        return keyTile;
    },

    onKeyCollected: function (event) {
        this._collectedKeysCount++;
        if(this._currentDoorNumber > -1 && this._currentDoorNumber < Global.PlayingLevel.smallDoorTeleports.length){
            let doorInfo = Global.PlayingLevel.smallDoorTeleports[this._currentDoorNumber];
            if (this._collectedKeysCount >= doorInfo.keysCount) {
                let startTile = this.getFigureTile(doorInfo.start);
                this.addPendingAction();
                setTimeout(() => {
                    this.setGameState();
                }, 1.8 * 1000);
                startTile.openDoor();
                let destTile = this.getFigureTile(doorInfo.dest);
                destTile.openDoor();
                if(this._currentDoorNumber >= Global.PlayingLevel.smallDoorTeleports.length - 1) {
                    this._currentDoorNumber++;
                    this._topCheckNode.active = true;
                    this._topCheckNode.x = -64;
                    this._topKeyNumNode.active = false;
                }
                else{
                    this._currentDoorNumber++;
                    doorInfo = Global.PlayingLevel.smallDoorTeleports[this._currentDoorNumber];
                    while(doorInfo && doorInfo.keysCount == 0){
                        startTile = this.getFigureTile(doorInfo.start);
                        destTile = this.getFigureTile(doorInfo.dest);
                        startTile.openDoor();
                        destTile.openDoor();
                        this._currentDoorNumber++;
                        doorInfo = Global.PlayingLevel.smallDoorTeleports[this._currentDoorNumber];
                    }
                    if(this._currentDoorNumber >= Global.PlayingLevel.smallDoorTeleports.length - 1) {
                        this._topCheckNode.active = true;
                        this._topCheckNode.x = -64;
                        this._topKeyNumNode.active = false;
                    }
                    else {
                        this.setKeyCountLabel(doorInfo.keysCount);
                        this._collectedKeysCount = 0;
                    }
                }
            }
            else if (this._collectedKeysCount < doorInfo.keysCount) {
                this.setKeyCountLabel(doorInfo.keysCount - this._collectedKeysCount);
            }

        }
        else {
            if (this._collectedKeysCount == Global.PlayingLevel.keyCount) {
                this._topCheckNode.active = true;
                this._topCheckNode.x = -64;
                this._topKeyNumNode.active = false;
            }
            else if (this._collectedKeysCount < Global.PlayingLevel.keyCount) {
                this.setKeyCountLabel(Global.PlayingLevel.keyCount - this._collectedKeysCount);
            }
        }
    },

    setKeyCountLabel: function (keyCount) {
        this._topKeyNumNode.getComponent(cc.Label).string = parseInt(keyCount);
    },

    addFigLayerNode: function (col, row, cellValue) {
        if(cellValue == "bonus2_h"){
            this.addKeyNode(Constants.FiguresLayerName, col, row, cellValue);
        }
        this._super(col, row, cellValue);
    },

    addRelicTile: function (col, row, cellValue) {
        if(cellValue != "force_way_item"){
            return;
        }
        let figure = "fig1";
        let self = this;
        let node = this.createForceWay();
        let tile = node.getComponent(Constants.ForceWayScriptName);

        if (this.isValidTile(Constants.FiguresLayerName, col, row)) {
            let figTile = this._mapNodesArray[Constants.FiguresLayerName][row][col];
            figure = figTile.figure;
            tile.copyTile(figTile);
            this.recycleFigure(figTile.node);
        }
        else{
            figure = this.getRandomFigure();
            while (this.checkMatch4Tile(col, row, figure)){
                figure = this.getRandomFigure();
            }
            tile.gridPosition = cc.p(col, row);
        }
        let spriteName = cellValue + "_" + figure;
        node.getComponent(cc.Sprite).spriteFrame = this.figuresAtlas.getSpriteFrame(spriteName);
        this.addNodeToLayer(this.figuresLayer, node, col, row);
        tile.forceWay = cellValue;
        tile.figure = figure;
        this._mapNodesArray[Constants.FiguresLayerName][row][col] = tile;
        return tile;
    },

    recycleForceWay: function (figureNode) {
        if(figureNode.getNumberOfRunningActions() > 0){
            figureNode.stopAllActions();
        }
        this._forceWayPool.put(figureNode);
    },

    recycleKey: function (keyNode) {
        this._keyPool.put(keyNode);
    },

    crushTile: function(tile){
        // when a force way tile is crushing it is need the fox position to send force way item to fox.
        tile.isPendingHole = true;
        if(this._foxPosition != null){
            // this.bringTopMost(tile.node);
            let foxPos = this.grid2pos(this._foxPosition.col, this._foxPosition.row);
            tile.crushTile(foxPos);
        }
        else{
            tile.crushTile();
        }
    },

    //region Fox Animation Control

    playFoxAnimation: function (animationName) {
        this.hideAllFoxAnimationNodes();
        let nodeName = animationName;
        let clipName = "jump";
        if(animationName == "fox_glad"){
            nodeName = animationName;
            clipName = "glad";
        }
        else if(animationName.indexOf("_") > 0){
            nodeName = "right";
            clipName = animationName.split("_")[1];
        }
        let foxAnimationNode = this._foxNode.getChildByName(nodeName);
        foxAnimationNode.active = true;
        let skeleton = foxAnimationNode.getComponent('sp.Skeleton');
        let animation = skeleton.setAnimation(0, clipName, true);
        if(animation){
            animation.loop = true;
            animation.timeScale = 2;
        }
    },

    hideAllFoxAnimationNodes: function () {
        let allChildren = this._foxNode.getChildren();
        for(let i = 0; i< allChildren.length; i++) {
            allChildren[i].active = false;
        }
    },

    //endregion

    findSnakeTarget: function (col, row) {
        col = parseInt(col); row = parseInt(row);
        let movableBonusTiles = [], movableForceWayTiles = [];
        for (let i = this._minVisibleRow; i <= this._maxVisibleRow; i++) {
            for (let j = this._minVisibleColumn; j <= this._maxVisibleColumn; j++) {
                if (this.isValidTile(Constants.FiguresLayerName, j, i)) {
                    if (j != col && i != row && this._figNodesArray[i][j].isMovable && this._figNodesArray[i][j].isMatchable) {
                        if(this._figNodesArray[i][j].bonus){
                            movableBonusTiles.push({col: j, row: i});
                        }
                        else if(this._figNodesArray[i][j].forceWay){
                            movableForceWayTiles.push({col: j, row: i});
                        }
                    }
                }
            }
        }
        if(movableForceWayTiles.length > 0){
            let forceWay = movableForceWayTiles[Math.floor(Math.random() * movableForceWayTiles.length)];
            return forceWay;
        }

        if(movableBonusTiles.length > 0){
            let bonusTile = movableBonusTiles[Math.floor(Math.random() * movableBonusTiles.length)];
            return bonusTile;
        }

        let randomTile = this.selectRandomTile();
        let loopCount = 20;
        while (!this.isValidTile(randomTile.col, randomTile.row)
            || !this.isInCurrentPage(randomTile.col, randomTile.row)
            || !this.isMovable(randomTile.col, randomTile.row)
            || (col == randomTile.col && row == randomTile.row)) {
            loopCount--;
            if(loopCount < 0){
                return null;
            }
            randomTile = this.selectRandomTile();
        }
        return randomTile;
    },

    addWayKeyPointsNode: function (col, row, cellValue) {
        if (cellValue == Enum.WayKeyPoints.WayStart) {
            this._wayStartPosition = {
                col: col,
                row: row
            };
            this._foxPosition = {
                col: col,
                row: row
            };
            let pos = this.grid2pos(col, row);
            this._foxNode.x = pos.x + Constants.TileSize / 2;
            this._foxNode.y = pos.y;
            // this.bringTopMost(this._foxNode);
            let figureTile = this.getFigureTile(col, row);
            if(figureTile){
                this.recycleTile(figureTile);
            }
            this.setFigureTile(col, row, Constants.FOX_POS);
        }
        else if (cellValue == Enum.WayKeyPoints.WayFinish) {
            this._wayFinishPosition = {
                col: col,
                row: row
            };
            let pos = this.grid2pos(col, row);
            this._wayFinishNode.active = true;
            this._wayFinishNode.x = pos.x;
            this._wayFinishNode.y = pos.y;
            let figureTile = this.getFigureTile(col, row);
            if(figureTile){
                this.recycleTile(figureTile);
            }
            this.setFigureTile(col, row, Constants.FOX_END_POS);
        }
        else if(cellValue == "hidden_way"){
            if(this._mapNodesArray[Constants.WayLayerName][row]) {
                let tile = this._mapNodesArray[Constants.WayLayerName][row][col];
                if(tile.node) {
                    tile.node.removeFromParent(true);
                    tile.node.destroy();
                }
                this._mapNodesArray[Constants.WayLayerName][row][col] = "hidden_way";
            }
        }
    },

    addWayNode: function (col, row, cellValue) {
        let node = cc.instantiate(this._wayTemplateNode);
        let tile = node.getComponent(Constants.WayScriptName);
        tile.gridPosition = cc.p(col, row);
        tile.wayValue = cellValue;
        node.getComponent(cc.Sprite).spriteFrame = this.figuresAtlas.getSpriteFrame(cellValue);
        this.addNodeToLayer(this._wayLayerNode, node, col, row);
        this._mapNodesArray[Constants.WayLayerName][row][col] = tile;
    },

    onForceWayCollected: function(event){
        let startPos = {col: event.detail.col, row: event.detail.row};
        let forceWayTile = this.getFigureTile(startPos.col, startPos.row);
        startPos = this.grid2pos(startPos.col, startPos.row);
        let showNode = this.getTempNode();
        showNode.height = showNode.width = Constants.TileSize;
        showNode.getComponent(cc.Sprite).spriteFrame = this.figuresAtlas.getSpriteFrame(`force_way_item_${forceWayTile.figure}`);
        showNode.active = true;
        showNode.setAnchorPoint(0, 0);
        showNode.x = startPos.x; showNode.y = startPos.y;
        this.gameMapNode.addChild(showNode);
        let targetPos = this.grid2pos(this._foxPosition.col, this._foxPosition.row);
        let seq = cc.sequence([
            cc.spawn([
                cc.jumpTo(0.6, targetPos.x, targetPos.y, Constants.TileSize, 1).easing(cc.easeQuadraticActionInOut()),
                cc.sequence([
                    cc.scaleTo(0.3, 1.5, 1.5),
                    cc.scaleTo(0.3, 1.2, 1.2)
                ])
            ]),
            cc.callFunc(this.recycleTempNode, this)
        ]);
        ForceWay.movingForceWay++;
        showNode.runAction(seq);
        setTimeout(() => {
            this._foxMoveCount++;
            ForceWay.movingForceWay--;
        }, 0.6 * 1000);
    },

    additionalLogic: function () {

    },

    stepFoxFinish: function (foxPos, delayTime) {
        this.setFigureTile(foxPos, Constants.HOLE);
        // this.bringTopMost(this._wayFinishNode);
        Global.PlayingLevel.levelCompleted = true;
        let canvas = cc.find('Canvas');
        let topBoxPos = Global.transformCoordinates(this._topBoxNode, canvas);
        let wayFinishPos = Global.transformCoordinates(this._wayFinishNode, canvas);
        wayFinishPos = cc.v2(wayFinishPos.x + Constants.TileSize / 2, wayFinishPos.y + Constants.TileSize / 2);
        this._finishBoxNode.x = wayFinishPos.x;
        this._finishBoxNode.y = wayFinishPos.y;

        this.addPendingAction();
        setTimeout(() => {
            let seq = cc.sequence(
                cc.moveTo(0.6, 0, 0),
                cc.delayTime(0.5),
                cc.moveTo(0.6, topBoxPos),
                cc.toggleVisibility(),
                cc.callFunc(this.setGameState, this)
            );
            this.scoreManager.pushConstantScore({scoreType: Constants.ScoreUnits.jewel_box, position: this._wayFinishNode.getPosition()});
            this._wayFinishNode.active = false;
            this._finishBoxNode.active = true;
            // this._finishBoxNode.getComponent(cc.Animation).play('finish_box');
            this._finishBoxNode.runAction(seq);
            this._gameFinished = true;
            this._foxNode.active = false;
        }, (delayTime) * 1000);
    },

    findSquareBonusTarget: function (col, row) {
        let specialTiles = this.searchSpecialTiles();
        let squareTargets = [];
        if (specialTiles.forceWay.length > 0) {
            squareTargets.push(...specialTiles.forceWay);
        }
        if (specialTiles.countStone.length > 0){
            squareTargets.push(...specialTiles.countStone);
        }
        if (specialTiles.key.length > 0){
            squareTargets.push(...specialTiles.key);
        }
        if (specialTiles.wishingWell.length > 0){
            squareTargets.push(...specialTiles.wishingWell);
        }

        if(squareTargets.length > 0){
            return squareTargets[Math.floor(Math.random() * squareTargets.length)];
        }
        if (specialTiles.bonus.length > 0) {
            return specialTiles.bonus[Math.floor(Math.random() * specialTiles.bonus.length)];
        }
        let loopCount = 20;
        let randomTile = this.selectRandomTile();
        while (loopCount > 0 && !this.isValidTile(randomTile.col, randomTile.row) || !this.isInCurrentPage(randomTile.col, randomTile.row) ){
            randomTile = this.selectRandomTile();
            loopCount--;
        }
        return randomTile;
    },

    checkFoxWayStatus: function () {
        for(let i in this._mapNodesArray[Constants.WayLayerName]){
            for(let j in this._mapNodesArray[Constants.WayLayerName][i]){
                if(this._mapNodesArray[Constants.FiguresLayerName][i][j] == Constants.HOLE){
                    return false;
                }
            }
        }
        return true;
    },

    isFoxMovable: function (tilePos) {
        let tile = this._mapNodesArray[Constants.FiguresLayerName][tilePos.row][tilePos.col];
        if(tile == undefined || tile == Constants.HOLE ||
            (this.isValidTile(tilePos.col, tilePos.row) && tile.isMovable) || this.equalTilePos(tilePos, this._wayFinishPosition)){
            return true;
        }
        this._foxMoveCount = 0;
        return false;
    },

    moveNextPage: function () {
        this.showOpenDoorAction();
        this.setGamePage(this._colCurrentPage + 1, this._rowCurrentPage);
        setTimeout(() =>{
            this.showPageMovingAction();
            this._doorTeleportNode.active = false;
            let canvasNode = cc.find('Canvas');
            this._airshipNode.removeFromParent();
            canvasNode.addChild(this._airshipNode);
            let airshipStartPos = Global.transformCoordinates(this._doorTeleportNode, canvasNode);
            this._foxNode.active = false;
            this._airshipNode.setPosition(airshipStartPos);
            this._airshipNode.active = true;
            this._doorTeleportDestNode.active = false;
            let actionTime = 0.2 * (this._maxVisibleColumn - this._minVisibleColumn);
            this._airshipNode.runAction(cc.sequence(
                cc.spawn(
                    cc.moveTo(actionTime / 2, 0, 0),
                    cc.scaleTo(actionTime / 2, 1.5, 1.5)
                ),
                cc.moveBy(0.5, 0, 50),
                cc.moveBy(0.5, 0, -50),
                cc.moveBy(0.5, 0, 50),
                cc.moveBy(0.5, 0, -50),

            ));

            setTimeout(()=>{
                let airshipDestPos = Global.transformCoordinates(this._doorTeleportDestNode, canvasNode);
                this._airshipNode.stopAllActions();
                this._airshipNode.runAction(cc.sequence(
                    cc.spawn(
                        cc.moveTo(actionTime / 2, airshipDestPos),
                        cc.scaleTo(actionTime / 2, 1, 1)
                    ),
                    cc.removeSelf(true),
                    cc.callFunc(()=>{
                        this._doorTeleportDestNode.active = true;
                        this._foxNode.active = true;
                    }, this),
                    cc.callFunc(this.setGameState, this)
                ));
            }, (actionTime + 0.6) * 1000);

        }, 1.8 * 1000);
        setTimeout(() =>{
            this.moveFoxThroughDoor(this._doorTeleportDestPosition);
        }, 2 * 1000);
    },

    moveFoxThroughDoor: function (doorDestPos) {
        let moveDir = this.findFoxMoveDir(doorDestPos);
        let moveDirValue = Constants.WayDirValue[moveDir];
        let targetFoxPos = {col: doorDestPos.col + moveDirValue.col, row: doorDestPos.row + moveDirValue.row};
        if(Global.isSameTile(this._wayFinishPosition, targetFoxPos)){
            this.stepFoxFinish(targetFoxPos, 0.2);
            let foxPos = this.grid2pos(targetFoxPos.col, targetFoxPos.row);
            this._foxNode.x = foxPos.x + Constants.TileSize / 2;
            this._foxNode.y = foxPos.y;
            setTimeout(() => {
                this.finishGame();
            }, 1.7 * 1000);
            return;
        }

        let foxPos = this.grid2pos(targetFoxPos.col, targetFoxPos.row);
        this._foxPosition = targetFoxPos;
        this._foxNode.x = foxPos.x + Constants.TileSize / 2;
        this._foxNode.y = foxPos.y;
        this._comeInDir = this.invertWayDir(moveDir);
        this._foxMoveCount = 0;
    },

    fallTileAnimation: function () {
        if(this.foxMoving){
            return false;
        }
        return this._super();
    },
    // processMatched: function () {
    //     if(this.foxMoving){
    //         return false;
    //     }
    //     this._super();
    // },

    stepFox: function () {
        // if(!this.checkFoxWayStatus()){
        //     return;
        // }
        this.foxMoving = true;
        let currentFoxPos = this._foxPosition;
        let currentComeInDir = this._comeInDir;
        let self = this;
        let startDir = this.findFoxMoveDir(currentFoxPos, currentComeInDir);
        let startDirValue = Constants.WayDirValue[startDir];
        let startPos = {col: currentFoxPos.col + startDirValue.col, row: currentFoxPos.row + startDirValue.row};

        if (!this.isFoxMovable(startPos) ){
            this.foxMoving = false;
            return;
        }

        //region 여우가 뛰여오르기 위한 준비동작을 취하는 애니메이션을 플레이 한다.
        this.addPendingAction();
        this.playFoxAnimation(startDir + "_ready");
        let delayTime = Constants.FoxAnimationTimes.ready;
        //endregion

        let moveDir = "";

        for(let i = 0; i < this._foxMoveCount; i ++) {
            moveDir = this.findFoxMoveDir(currentFoxPos, currentComeInDir);
            let moveDirValue = Constants.WayDirValue[moveDir];
            let targetFoxPos = {col: currentFoxPos.col + moveDirValue.col, row: currentFoxPos.row + moveDirValue.row};

            if (this.isFoxMovable(targetFoxPos) ){
                currentComeInDir = this.invertWayDir(moveDir); // 다음번 이동을 위하여 들어온 방향을 보관한다.

                if(this._mapNodesArray[Constants.FiguresLayerName][targetFoxPos.row][targetFoxPos.col] == Constants.DOOR_TELEPORT){
                    //this.moveNextPage(tileTo, delayTime);
                    currentFoxPos = targetFoxPos;
                    delayTime += Constants.FoxAnimationTimes.jump;
                    break;
                }
                let realDir = moveDir;
                setTimeout(function () {
                    self.playFoxAnimation(realDir);
                }, delayTime * 1000);

                //region 여우의 애니메이션이 플레이되는동안 여우의 위치를 타겟위치로 이동한다.
                let newPos = this.grid2pos(targetFoxPos.col, targetFoxPos.row);
                setTimeout(function () {
                    self._foxNode.runAction(cc.moveTo(Constants.FoxAnimationTimes.jump, newPos.x + Constants.TileSize / 2, newPos.y));
                }, delayTime * 1000);
                //endregion

                //region 여우가 옮겨가야 할 위치의 타일을 여우의 현재 위치에로 이동한다.
                let tileTo = {col: currentFoxPos.col, row: currentFoxPos.row};
                if(this._mapNodesArray[Constants.FiguresLayerName][targetFoxPos.row][targetFoxPos.col].isMovable){
                    this.moveTile4Fox(targetFoxPos, tileTo, delayTime);
                }
                else if(this.equalTilePos(targetFoxPos, this._wayFinishPosition)){
                    currentFoxPos = targetFoxPos;
                    delayTime += Constants.FoxAnimationTimes.jump;
                    this.stepFoxFinish(tileTo, delayTime);
                    break;
                }
                else {
                    this._foxPosition = targetFoxPos;
                    this._mapNodesArray[Constants.FiguresLayerName][targetFoxPos.row][targetFoxPos.col] = Constants.FOX_POS;
                    this._mapNodesArray[Constants.FiguresLayerName][currentFoxPos.row][currentFoxPos.col] = Constants.HOLE;
                }
                //endregion
                delayTime += Constants.FoxAnimationTimes.jump;
                currentFoxPos = targetFoxPos;
            }
        }

        //region 여우의 이동이 끝난다음 정지자세를 취하는 애니메이션을 플레이
        setTimeout(() => {
            this.playFoxAnimation(moveDir + "_end");
            this.foxMoving = false;
        }, delayTime * 1000);
        //endregion

        delayTime += Constants.FoxAnimationTimes.end;

        if(this.equalTilePos(currentFoxPos, this._wayFinishPosition)){
            Global.PlayingLevel.levelCompleted = true;
            setTimeout(function () {
                self.playFoxAnimation("fox_bark");
            }, delayTime * 1000);
            delayTime += Constants.FoxAnimationTimes.cry;
            setTimeout(function () {
                self.playFoxAnimation("fox_glad");
            }, delayTime * 1000);

            setTimeout(function () {
                self.finishGame();
            }, delayTime * 1000);
        }
        else{
            setTimeout(function () {
                self.playFoxAnimation("fox_Idle");
            }, delayTime * 1000);
        }

        setTimeout(() => {
            this.setGameState();
            this._foxPosition = currentFoxPos;
            this._comeInDir = currentComeInDir;
        }, delayTime * 1000);

        this._foxMoveCount = 0;
    },

    moveTile4Fox: function (from, to, delayTime) {
        if(this.isValidTile(from.col, from.row) && this._figNodesArray[from.row][from.col].isMovable){
            let movingTile = this._figNodesArray[from.row][from.col];
            if(this._figNodesArray[to.row] == undefined){
                this._figNodesArray[to.row] = [];
            }
            if(this._figNodesArray[to.row][to.col] != Constants.DOOR_TELEPORT){
                this._figNodesArray[to.row][to.col] = movingTile;
                let pos = this.grid2pos(to.col, to.row);
                movingTile.gridPosition = cc.p(to.col, to.row);
                movingTile.moveTile4Fox(pos, delayTime);
                // this._movedTiles.push(to);
            }
            else{
                this.recycleFigure(movingTile.node);
            }
            this._figNodesArray[from.row][from.col] = Constants.FOX_POS;
        }
    },

    showOpenDoorAction: function () {
        let openKeyNode = this._doorTeleportNode.getChildByName("key");
        let posOpenKey = openKeyNode.parent.convertToWorldSpaceAR(openKeyNode.getPosition());
        posOpenKey = this._uiNode.convertToNodeSpaceAR(posOpenKey);
        let movingKeyNode = cc.instantiate(this._topKeyNode);
        this._uiNode.addChild(movingKeyNode);
        movingKeyNode.x = this._topKeyPosition.x;
        movingKeyNode.y = this._topKeyPosition.y;

        // Global.PendingActions++;

        movingKeyNode.runAction(cc.sequence(cc.moveTo(1, posOpenKey), cc.removeSelf(true)));

        // setTimeout(() =>{
        //     openKeyNode.active = true;
        //     openKeyNode.runAction(cc.sequence(cc.rotateTo(1, -180), cc.removeSelf(true)));
        // }, 1 * 1000);

        setTimeout(() =>{
            this.playFoxAnimation("right_ready");
        }, 1000);
        setTimeout(() =>{
            // this.setGameState();
            this._foxNode.runAction(cc.moveBy(0.5, Constants.TileSize * 1.5, 0));
            this.playFoxAnimation("right_jump");
        }, 1.25 * 1000);
        // setTimeout(() =>{
        //     this.playFoxAnimation("top");
        // }, 2.0 * 1000);
        setTimeout(() =>{
            this.playFoxAnimation("fox_Idle");
        }, 2.85 * 1000);

    },

    // return Constants.WayAvailableDir: example "left", "right"
    findFoxMoveDir: function (currentPosition, comeInDir) {
        let wayTile = this._mapNodesArray[Constants.WayLayerName][currentPosition.row][currentPosition.col];
        let availableDir = Constants.WayAvailableDir[wayTile.wayValue];
        if (availableDir.length == 1) {
            return availableDir[0];
        }
        for (let i in availableDir) {
            if (availableDir[i] != comeInDir) {
                return availableDir[i];
            }
        }
    },

    invertWayDir: function (wayDir) {
        return Constants.InvertDirs[wayDir];
    },

    finishGame: function () {
        this._super();
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this._super(dt);
        //this.processMatched();
        if (!this._gameFinished && !this.isTherePendingActions() && !this.isTherePendingTiles() && ForceWay.movingForceWay <= 0) {

            if(this.foxMovingTime > 1) {
                this.foxMovingTime = 0;
                if (this._foxMoveCount > 0) {
                    if(!this.isThereMatched4All() && !this.fallTileInstant()) {
                        this.stepFox();
                    }
                }

                let moveDir = this.findFoxMoveDir(this._foxPosition, this._comeInDir);
                let moveDirValue = Constants.WayDirValue[moveDir];
                let targetFoxPos = {
                    col: this._foxPosition.col + moveDirValue.col,
                    row: this._foxPosition.row + moveDirValue.row
                };
                if(Global.PlayingLevel.smallDoorTeleports && Global.PlayingLevel.smallDoorTeleports.length > 0){
                    let tile = this.getFigureTile(targetFoxPos);
                    if(tile && tile.isOpen){
                        let doorInfo = Global.PlayingLevel.smallDoorTeleports[this._currentFoxDoorNumber];
                        this._currentFoxDoorNumber++;
                        this.addPendingAction();

                        ////////////////
                        let moveDir = this.findFoxMoveDir(doorInfo.dest);
                        let moveDirValue = Constants.WayDirValue[moveDir];
                        let targetDoorPos = {col: doorInfo.dest.col + moveDirValue.col, row: doorInfo.dest.row + moveDirValue.row};

                        let destTile = this.getFigureTile(targetDoorPos);
                        destTile && destTile.node && this.recycleFigure(destTile.node);
                        this.setFigureTile(this._foxPosition.col, this._foxPosition.row, Constants.HOLE);
                        this.setFigureTile(targetDoorPos.col, targetDoorPos.row, Constants.FOX_POS);
                        this._foxPosition = targetDoorPos;
                        //////////////////

                        this.playFoxAnimation(`${moveDir}_ready`);
                        let doorInPos = this.grid2pos(targetFoxPos.col, targetFoxPos.row);
                        setTimeout(() =>{
                            this._foxNode.runAction(cc.moveTo(0.5, doorInPos.x + Constants.TileSize / 2, doorInPos.y));
                            this.playFoxAnimation(moveDir);
                        }, 0.2 * 1000);
                        setTimeout(() =>{
                            // this._foxNode.setAnchorPoint(0.5, 0.5);
                            this._foxNode.runAction(cc.scaleTo(0.5, 0.5, 0.5));
                            this.playFoxAnimation("top");
                        }, 0.7 * 1000);
                        setTimeout(() => {
                            this.moveFoxThroughDoor(doorInfo.dest);
                            this.setGameState();
                        }, 1.1 * 1000);
                        setTimeout(() =>{
                            this._foxNode.runAction(cc.scaleTo(0.3, 1, 1));
                            this.playFoxAnimation("fox_glad");
                        }, 1.2 * 1000);
                    }
                }
                else if (this._collectedKeysCount >= Global.PlayingLevel.keyCount && this._colCurrentPage == 1) {
                    if (this._mapNodesArray[Constants.FiguresLayerName][targetFoxPos.row][targetFoxPos.col] == Constants.DOOR_TELEPORT) {
                        this.moveNextPage();
                    }
                }

            }
            else{
                this.foxMovingTime++;
            }
        }

    },
});
