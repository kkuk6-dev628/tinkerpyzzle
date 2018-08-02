
//noinspection JSUnresolvedFunction
const GameBase = require("GameBase");
//noinspection JSUnresolvedFunction
const Constants = require("Constants");
//noinspection JSUnresolvedFunction
const Enum = require("EnumTypes");
//noinspection JSUnresolvedFunction
const Global = require("Global");
//noinspection JSUnresolvedFunction
const RelicTile = require(Constants.RelicScriptName);

cc.Class({
    extends: GameBase,

    properties: {

        _relicTemplate: {
            default: null,
            type: cc.Node
        },

        _pickupTemplate: {
            default: null,
            type: cc.Node
        },

        _relicCountNode: {
            default: null,
            type: cc.Node
        },

        _relicMergedNode: {
            default: null,
            type: cc.Node
        },

        relicAreaArray: {
            default: [],
            visible: false
        },

        collectedRelicCount: {
            default: 0,
            visible: false
        },

        spawnedRelicCount: {
            default: 0,
            visible: false
        },

        startRelicCount: {
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
        this.initRelicGame();
    },

    initRelicGame: function () {
        this.addRealRelicTiles();
        this.setRelicCountLabel();
        this.movesToNextRelic = Math.floor(Global.PlayingLevel.moveNumber / (Global.PlayingLevel.dropDownRelics + 2));
    },

    initNodeTemplates: function () {
        this._super();
        this._relicTemplate = cc.find('Canvas/game_mask/game_node/relic_area/relic');
        this._relicTemplate.removeFromParent(false);
        this._pickupTemplate = cc.find('Canvas/game_mask/game_node/relic_area/pickup');
        this._pickupTemplate.removeFromParent(false);
        this._relicCountNode = cc.find('Canvas/ui_nodes/top_status_area/top_1/relic_count');
        // this._goldCountNode.removeFromParent(false);
        this._relicGroupNode = cc.find('Canvas/ui_nodes/top_status_area/top_1/relic');
    },

    showFailedPopup: function () {
        cc.find("failed_popup/missed_count", this._popupsNode).getComponent(cc.Label).string = `${this.collectedRelicCount}/${Global.PlayingLevel.dropDownRelics}`;
        let relicGroupNode = cc.instantiate(this._relicGroupNode);
        cc.find("failed_popup/relic_group", this._popupsNode).addChild(relicGroupNode);
        this._super();
    },

    addRelicTile: function (col, row, cellValue) {
        if(this.isInCurrentPage(col, row)) {
            this.relicAreaArray.push({col: col, row: row, cellValue: cellValue});
        }
    },

    addRealRelicTiles: function () {
        if(this.relicAreaArray.length == 0 || isNaN(Global.PlayingLevel.dropDownRelics) || isNaN(Global.PlayingLevel.startDropDownRelics)){
            return;
        }
        let creatingRelics = [];
        for(let i = 0; i < Global.PlayingLevel.startDropDownRelics; i++){
            let relicArea = this.relicAreaArray[Math.floor(Math.random() * this.relicAreaArray.length)];
            while(this.isContainsTile(relicArea.col, relicArea.row, creatingRelics)){
                relicArea = this.relicAreaArray[Math.floor(Math.random() * this.relicAreaArray.length)];
            }
            creatingRelics.push(relicArea);
            this.createRelicTile(relicArea.col, relicArea.row, relicArea.cellValue);
            this.startRelicCount++;
        }
    },

    createRelicTile: function (col, row, cellValue) {
        let figureTile = this.getFigureTile(col, row);
        if(figureTile != null){
            figureTile.nearbyCheck = false;
            figureTile.emitFigureDestroyed();
        }
        this.spawnedRelicCount++;

        const node = cc.instantiate(this._relicTemplate);
        let tile = node.getComponent(Constants.RelicScriptName);
        // let spriteName = `relic_${Global.PlayingLevel.dropDownRelics}_${this.spawnedRelicCount}`;
        let spriteName = `relic`;
        node.getChildByName("relic").getComponent(cc.Sprite).spriteFrame = this.figuresAtlas.getSpriteFrame(spriteName);
        node.getChildByName("relic").setScale(0.8);
        this.addNodeToLayer(this.figuresLayer, tile.node, col, row);
        tile.reuse();
        tile.figure = cellValue;
        tile.relicName = spriteName;
        tile.gridPosition = cc.p(col, row);

        node.on(Constants.TILE_MOVED, (event) => {
            this.onFiguresMove(event);
        });
        node.on(Constants.FIGURE_DESTROYED, (event) => {
            this.onFigureDestroyed(event);
        });
        node.on(Constants.RELIC_COLLECTED, (event) =>{
            this.onRelicCollected(event);
        });
        this.setFigureTile(col, row, tile);
        return tile;
    },

    findSquareBonusTarget: function (col, row) {
        for(let i = this._minVisibleRow; i <= this._maxVisibleRow; i++){
            if(this._mapNodesArray[Constants.FiguresLayerName][i]){
                for(let j = this._minVisibleColumn; j <= this._maxVisibleColumn; j++){
                    let tile = this.getFigureTile(j, i);
                    if(tile && tile.tileKind == Enum.TileKind.Relic){
                        let belowRelicTiles = [];
                        for(let k = 1; i + k <= this._maxVisibleRow; k++){
                            this.isValidTile(j, i + k) && !this.isContainedPendingCrush([{col: j, row: i + k}])
                            && !this.isContainedPendingMove([{col: j, row: i + k}])
                            && this.getFigureTile(j, i + k).tileKind != Enum.TileKind.Relic
                                && !this.isContainsTile(j, i + k, this._squareTargets)
                            && belowRelicTiles.push({col: j, row: i + k});
                        }
                        if(belowRelicTiles.length > 0) {
                            return belowRelicTiles[Math.floor(Math.random() * belowRelicTiles.length)];
                        }
                    }
                }
            }
        }
        return this._super();
    },

    crushAllTiles: function (startTile) {
        let rowLoopCount = this._maxVisibleRow - startTile.row > startTile.row - this._minVisibleRow ?
        this._maxVisibleRow - startTile.row + 1 : startTile.row - this._minVisibleRow + 1;

        let colLoopCount = this._maxVisibleColumn - startTile.col > startTile.col - this._minVisibleColumn ?
        this._maxVisibleColumn - startTile.col + 1 : startTile.col - this._minVisibleColumn + 1;

        this._matchId++;
        for(let i = 0; i < rowLoopCount; i++){
            for(let j = 0; j < colLoopCount; j++){
                let col1 = startTile.col + j, col2 = startTile.col - j;
                let row1 = startTile.row + i, row2 = startTile.row - i;
                this.setMatchNumber([
                    {col: col1, row: row1},
                    {col: col1, row: row2},
                    {col: col2, row: row1},
                    {col: col2, row: row2}
                    ], true);
                (this.getFigureTile(col1, row1)) && !(this.getFigureTile(col1, row1) instanceof RelicTile) && this.addTileToCrushQueue({col: col1, row: row1});
                (this.getFigureTile(col1, row2)) && !(this.getFigureTile(col1, row2) instanceof RelicTile) && this.addTileToCrushQueue({col: col1, row: row2});
                (this.getFigureTile(col2, row1)) && !(this.getFigureTile(col2, row1) instanceof RelicTile) && this.addTileToCrushQueue({col: col2, row: row1});
                (this.getFigureTile(col2, row2)) && !(this.getFigureTile(col2, row2) instanceof RelicTile) && this.addTileToCrushQueue({col: col2, row: row2});
            }
        }
    },

    checkSpawnRelic: function () {
        if(this.spawnedRelicCount >= Global.PlayingLevel.dropDownRelics){
            return false;
        }

        // if((this.spawnedRelicCount - this.startRelicCount) * (Global.PlayingLevel.movesToNextRelic - this.spawnedRelicCount * 2) + Global.PlayingLevel.movesToFirstRelic == this._moveCount){
        // if(this.spawnedRelicCount == 0 && this._moveCount == Global.PlayingLevel.movesToFirstRelic){
        //     return true;
        // }
        if((this.spawnedRelicCount + 1) * this.movesToNextRelic == this._moveCount){
            return true;
        }
        else{
            return false
        }
    },

    createNewTile: function (col, row) {
        try {
            let tile = null;
            const generatorPos = this.grid2pos(col, row - 1);

            if(this.checkSpawnRelic()){
                tile = this.createRelicTile(col, row, "relic");
            }
            else{
                tile = this.addFigureNode(Constants.FiguresLayerName, col, row, "");
            }
            tile.node.x = generatorPos.x;
            tile.node.y = generatorPos.y;
            return tile;
        } catch (e) {
            cc.info(e, "fallNewTile");
            return false;
        }
    },

    addPickupTile: function (col, row, cellValue) {
        const node = cc.instantiate(this._pickupTemplate);
        let tile = node.getComponent(Constants.TileScriptName);
        let relicAreaLayer = this.gameMapNode.getChildByName("relic_area");
        const pos = this.grid2pos(col, row);
        node.x = pos.x;
        node.y = pos.y;
        node.width = Constants.TileSize;
        node.height = Constants.TileSize;
        relicAreaLayer.addChild(node);
        tile.value = cellValue;
        tile.gridPosition = cc.p(col, row);
        this._mapNodesArray[Constants.PickupsLayerName][row][col] = tile;
    },

    pickupRelics: function () {
        if(this.isTherePendingActions() || this.isTherePendingTiles()){
            return;
        }

        for(let i in this._mapNodesArray[Constants.PickupsLayerName]){
            for(let j in this._mapNodesArray[Constants.PickupsLayerName][i]){
                let tile = this.getFigureTile(j, i);
                if(tile !== null && tile.tileKind === Enum.TileKind.Relic){
                    tile.pickupTile();
                }
            }
        }
    },

    setRelicCountLabel: function () {
        this._relicCountNode.getComponent(cc.Label).string = Global.PlayingLevel.dropDownRelics - this.collectedRelicCount;
        // let relicMergedNode = `relic_${Global.PlayingLevel.dropDownRelics}`;
        // this._relicMergedNode = this._relicGroupNode.getChildByName(relicMergedNode);
        // this._relicMergedNode.active = true;
    },

    onRelicCollected: function (event) {
        this.collectedRelicCount ++;
        setTimeout(()=>{
            this.setRelicCountLabel();
        }, 1.4);
        // cc.info(event.detail);
        // this._relicMergedNode.getChildByName(event.detail).active = true;
        if(this.collectedRelicCount == Global.PlayingLevel.dropDownRelics){
            this.finishGame();
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.pickupRelics();
        this._super(dt);
    },
});
