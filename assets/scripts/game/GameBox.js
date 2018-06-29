
//noinspection JSUnresolvedFunction
const GameBase = require("GameBase");
//noinspection JSUnresolvedFunction
const Constants = require("Constants");

//noinspection JSUnresolvedFunction
const Enum = require("EnumTypes");
//noinspection JSUnresolvedFunction
const Global = require("Global");

cc.Class({
    extends: GameBase,

    properties: {

        markLockLayer: {
            default: null,
            type: cc.Node
        },

        markLayer: {
            default: null,
            type: cc.Node
        },

        _markTemplate: {
            default: null,
            type: cc.Node
        },

        _markLockTemplate: {
            default: null,
            type: cc.Node
        },

        _boxCountNode: {
            default: null,
            type: cc.Node
        },

        _boxGroupNode: {
            default: null,
            type: cc.Node
        },

        boxCount: {
            default: 0,
            visible: false
        },

        boxCountInPage: {
            default: 0,
            visible: false
        },

        collectedBoxCount: {
            default: 0,
            visible: false
        }
    },

    // use this for initialization
    onLoad: function () {
        this._super();
    },

    start: function () {
        this._super();
    },

    afterLoadLevelMap: function () {
        this._super();
        this.initBoxGame();
    },

    initBoxGame: function () {
        this.setBoxCountLabel();
    },

    initNodeTemplates: function () {
        this._super();
        this._markTemplate = cc.find('Canvas/game_mask/game_node/stamps/mark');
        this._markTemplate.removeFromParent(false);
        this._markLockTemplate = cc.find('Canvas/game_mask/game_node/stamps_cover1/mark_lock');
        this._markLockTemplate.removeFromParent(false);
        this._boxCountNode = cc.find('Canvas/ui_nodes/top_status_area/top_1/box_count');
        // this._goldCountNode.removeFromParent(false);
        this._boxGroupNode = cc.find('Canvas/ui_nodes/top_status_area/top_1/box_group');
        // this._goldGroupNode.removeFromParent(false);
    },

    addMarkTile: function (col, row, cellValue) {
        let node = cc.instantiate(this._markTemplate);
        let tile = node.getComponent(Constants.MarkScriptName);
        tile.gridPosition = cc.p(col, row);
        tile.value = cellValue;
        tile.node.on(Constants.MARK_COLLECTED, (event) => {
            this.onMarkCollected(event.detail);
        });

        this.addLargeNodeToLayer(this.markLayer, node, col, row, {w: tile.gridWidth, h: tile.gridHeight, dx: tile.dx, dy: tile.dy});
        if (this._mapNodesArray[Constants.MarkLayerName][row] == undefined){
            this._mapNodesArray[Constants.MarkLayerName][row] = [];
        }
        this._mapNodesArray[Constants.MarkLayerName][row][col] = tile;
        this.boxCount++;
    },

    addMarkLockTile: function (col, row, cellValue) {
        let tile = this.getMarkLockTile(col, row);
        if(tile == null){
            const node = cc.instantiate(this._markLockTemplate);
            tile = node.getComponent(Constants.MarkLockScriptName);
            this.addNodeToLayer(this.markLockLayer, tile.node, col, row);
        }
        tile.value = cellValue;
        tile.gridPosition = cc.p(col, row);
        tile.node.on(Constants.MARK_LOCK_DESTROYED, (event) => {
            this.onMarkLockDestroyed(event.detail);
        });
        if(!this._mapNodesArray[Constants.MarkLockLayerName][row]){
            this._mapNodesArray[Constants.MarkLockLayerName][row] = [];
        }
        this._mapNodesArray[Constants.MarkLockLayerName][row][col] = tile;
    },

    onMarkLockDestroyed: function (params) {
        this.setMarkLockTile(params.col, params.row, Constants.MARK_LOCK_FREE);
    },

    onMarkCollected: function (params) {
        this.collectedBoxCount++;
        let markTile = this._mapNodesArray[Constants.MarkLayerName][params.row][params.col];
        let markScore = markTile.gridWidth * markTile.gridHeight * Constants.ScoreUnits.mark;
        this._mapNodesArray[Constants.MarkLayerName][params.row][params.col] = Constants.MARK_LOCK_FREE;
        this.scoreManager.pushConstantScore({position: this.grid2pos(params.col, params.row), scoreType: markScore});
        this._gameState = Enum.GameState.TileMoving;
        setTimeout(() => {
            this.setBoxCountLabel();
            if(this.collectedBoxCount >= this.boxCount){
                this.finishGame();
            }
            this._gameState = Enum.GameState.Idle;
        }, params.delayTime * 1000);
    },

    findSquareBonusTarget: function (col, row) {
        let markLocks = [];
        for(let i in this._mapNodesArray[Constants.MarkLayerName]){
            for(let j in this._mapNodesArray[Constants.MarkLayerName][i]){
                let markTile = this._mapNodesArray[Constants.MarkLayerName][i][j];
                if(markTile && markTile.tileKind == Enum.TileKind.Mark){
                    i = parseInt(i);
                    j = parseInt(j);
                    for(let y = 0; y < markTile.gridHeight; y++){
                        for(let x = 0; x < markTile.gridWidth; x++){
                            let lockTile = this.getMarkLockTile(j + x, i + y);
                            if(lockTile && lockTile.tileKind == Enum.TileKind.MarkLock && this.isValidTile(j + x, i + y)){
                                markLocks.push({col: j + x, row: i + y});
                            }
                        }
                    }
                }
            }
        }
        if(markLocks.length > 0){
            let target = markLocks[Math.floor(Math.random() * markLocks.length)];
            let repeatCount = 5;
            while(this.includeTile(this._squareTargets, target) && markLocks.length > this._squareTargets.length && repeatCount > 0){
                repeatCount--;
                target = markLocks[Math.floor(Math.random() * markLocks.length)];
            }
            if(this.includeTile(this._squareTargets, target)){
                return this._super(col, row);
            }
            else {
                return target;
            }
        }
        else{
            return this._super(col, row);
        }
    },

    overlayTilesCrush: function (col, row) {
        let markLockTile = this.getMarkLockTile(col, row);
        if(markLockTile != null) {
            markLockTile.crushTile();
        }
    },

    showFailedPopup: function () {
        cc.find("failed_popup/missed_count", this._popupsNode).getComponent(cc.Label).string = `${this.collectedBoxCount}/${this.boxCount}`;
        this._super();
    },

    setMarkLockTile: function (col, row, tileValue) {
        if(this._mapNodesArray[Constants.MarkLockLayerName][row] == undefined){
            this._mapNodesArray[Constants.MarkLockLayerName][row] = [];
        }
        this._mapNodesArray[Constants.MarkLockLayerName][row][col] = tileValue;
    },

    getMarkLockTile: function (col, row) {
        if(this._mapNodesArray[Constants.MarkLockLayerName] && this._mapNodesArray[Constants.MarkLockLayerName][row]){
            if(this._mapNodesArray[Constants.MarkLockLayerName][row][col] &&
                this._mapNodesArray[Constants.MarkLockLayerName][row][col].tileKind == Enum.TileKind.MarkLock){
                return this._mapNodesArray[Constants.MarkLockLayerName][row][col];
            }
        }
        return null;
    },

    setBoxCountLabel: function () {
        this._boxCountNode.getComponent(cc.Label).string = this.boxCount - this.collectedBoxCount;
    },

    checkMarkFree: function(){
        if(this.isTherePendingActions() || this.isTherePendingTiles()){
            return;
        }
        for(let i in this._mapNodesArray[Constants.MarkLayerName]){
            for(let j in this._mapNodesArray[Constants.MarkLayerName][i]){
                let markTile = this._mapNodesArray[Constants.MarkLayerName][i][j];
                if(markTile && markTile.tileKind == Enum.TileKind.Mark){
                    i = parseInt(i);
                    j = parseInt(j);
                    let isFree = true;
                    for(let y = 0; y < markTile.gridHeight; y++){
                        for(let x = 0; x < markTile.gridWidth; x++){
                            let lockTile = this.getMarkLockTile(j + x, i + y);
                            if(lockTile && lockTile.tileKind == Enum.TileKind.MarkLock){
                                isFree = false;
                                break;
                            }
                        }
                        if(isFree == false){
                            break;
                        }
                    }
                    if(isFree){
                        markTile.crushTile();
                    }
                }
            }
        }
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this._super(dt);
        this.checkMarkFree();
    },
});
