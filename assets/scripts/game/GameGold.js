
//noinspection JSUnresolvedFunction
const GameBase = require("GameBase");
//noinspection JSUnresolvedFunction
const Constants = require("Constants");

//noinspection JSUnresolvedFunction
const Enum = require("EnumTypes");
//noinspection JSUnresolvedFunction
const Global = require("Global");
//noinspection JSUnresolvedFunction
const GroundTile = require("GroundTile");

cc.Class({
    extends: GameBase,

    editor: {
        requireComponent: sp.Skeleton
    },

    properties: {

        goldPrefab: {
            default: null,
            type: cc.Prefab
        },

        _goldPool: {
            default: null,
            type: cc.NodePool
        },

        _groundTemplate: {
            default: null,
            type: cc.Node
        },

        _offeringBaseTemplate: {
            default: null,
            type: cc.Node
        },

        _goldGroupNode: {
            default: null,
            type: cc.Node
        },

        _goldCountNode: {
            default: null,
            type: cc.Node
        },

        goldCount: {
            default: 0,
            visible: false
        },

        goldCountInPage: {
            default: 0,
            visible: false
        },

        collectedGoldCount: {
            default: 0,
            visible: false
        },

        isThereWeeds: {
            default: false,
            visible: false
        },

        spreadWeed: {
            default: false,
            visible: false
        }
    },

    // use this for initialization
    onLoad: function () {
        //noinspection JSUnresolvedFunction
        this._super();
    },

    afterLoadLevelMap: function () {
        //noinspection JSUnresolvedFunction
        this._super();
        this.initGoldGame();
        this.initGroundBackground();
    },

    initNodeTemplates: function () {
        //noinspection JSUnresolvedFunction
        this._super();
        this._groundTemplate = cc.find('Canvas/game_mask/game_node/ground/ground');
        this._groundTemplate.removeFromParent(false);
        this._offeringBaseTemplate = cc.find('Canvas/game_mask/game_node/figures/offering_base');
        this._offeringBaseTemplate.removeFromParent(false);
        this._goldCountNode = cc.find('Canvas/ui_nodes/top_status_area/top_1/gold_count');
        // this._goldCountNode.removeFromParent(false);
        this._goldGroupNode = cc.find('Canvas/ui_nodes/top_status_area/top_1/gold_group');
        // this._goldGroupNode.removeFromParent(false);

        this._goldPool = new cc.NodePool();
        for (let i = 0; i < 5; ++i) {
            let goldNode = cc.instantiate(this.goldPrefab);
            //noinspection JSCheckFunctionSignatures
            this._goldPool.put(goldNode);
        }
    },

    initGoldGame: function () {
        this._goldCountNode.getComponent(cc.Label).string = this.goldCount;
        this.countingGoldInPage();
        this.refreshGroundBackground();
        if(this._rowPageCount > 1){
            this.gameMapNode.parent.getComponent(cc.Mask).enabled = true;
        }
    },

    getGoldNode: function () {
        let gold = null;
        if (this._goldPool.size() > 0) { // use size method to check if there're nodes available in the pool
            gold = this._goldPool.get();
        } else { // if not enough node in the pool, we call cc.instantiate to create node
            gold = cc.instantiate(this.goldPrefab);
        }
        gold.active = false;
        return gold;
    },

    recycleGold: function (gold) {
        this._goldPool.put(gold);
    },

    showFailedPopup: function () {
        cc.find("failed_popup/missed_count", this._popupsNode).getComponent(cc.Label).string = `${this.collectedGoldCount}/${this.goldCount}`;
        this._super();
    },

    showGoldCollectingAction: function (col, row) {
        let goldNode = this.getGoldNode();
        let uiNode = cc.find("Canvas/ui_nodes");
        goldNode.parent = uiNode;

        let goldPos = this.transformTilePos(this.grid2pos(col, row), uiNode);
        goldNode.x = goldPos.x + Constants.TileSize / 2;
        goldNode.y = goldPos.y + Constants.TileSize / 2;
        goldNode.active = true;
        goldNode.setScale(0.4, 0.4);
        let goldGroupNode = cc.find("Canvas/ui_nodes/top_status_area/top_1/gold_group");
        let goldGroupPos = Global.transformCoordinates(goldGroupNode, uiNode);
        let middlePos = cc.p((goldGroupPos.x + goldNode.x) / 2, (goldGroupPos.y + goldNode.y) / 2);
        this._gameState = Enum.GameState.Collecting;
        let seq = cc.sequence([
            cc.spawn([
                cc.scaleTo(0.5, 1, 1),
                cc.moveTo(0.5, middlePos).easing(cc.easeQuinticActionIn())
            ]),
            cc.spawn([
                cc.scaleTo(0.5, 0.8, 0.8),
                cc.moveTo(0.5, goldGroupPos).easing(cc.easeQuinticActionOut())
            ]),
            cc.callFunc(()=>{this._gameState = Enum.GameState.Idle;}),
            cc.callFunc(this.recycleGold, this, goldNode)
            ]);
        goldNode.runAction(seq);
    },

    countDownMoveNum: function(){
        this._super();
        this.spreadWeed = true;
    },

    countingGoldInPage: function () {
        for(let i = this._minVisibleRow; i <= this._maxVisibleRow; i++){
            if(this.isValidFigureRow(i)){
                for(let j = this._minVisibleColumn; j <= this._maxVisibleColumn; j++){
                    let tile = this.getFigureTile(j, i);
                    tile != null && tile.isGold && this.goldCountInPage ++;
                }
            }
        }
    },

    isValidFigureRow: function (row) {
        return this._mapNodesArray[Constants.FiguresLayerName] && this._mapNodesArray[Constants.FiguresLayerName][row];
    },

    processMatched: function () {
        if(this._super()){
            this.doSpreadWeed();
        }
    },

    getNearbyGroundTiles: function (col, row) {
        let movableTiles = [];
        for (let k in Constants.NearByDirects) {
            let dir = Constants.NearByDirects[k];
            if (this.isValidTile(Constants.FiguresLayerName, col + dir[0], row + dir[1])) {
                let tile = this.getFigureTile(col + dir[0], row + dir[1]);
                if (tile.tileKind == Enum.TileKind.Ground && !tile.isWeed) {
                    movableTiles.push(tile);
                }
            }
        }
        return movableTiles;
    },

    findWeedTarget: function () {
        let weedTargets = [];
        let weedCount = 0;
        for(let i = this._minVisibleRow; i <= this._maxVisibleRow; i++){
            if(this._mapNodesArray[Constants.FiguresLayerName][i]){
                for(let j = this._minVisibleColumn; j <= this._maxVisibleColumn; j++){
                    let tile = this.getFigureTile(j, i);
                    if(tile != null && tile instanceof GroundTile){
                        if(tile.isWeed)
                        {
                            let movableTiles = this.getNearbyGroundTiles(j, i);
                            for(let nearbyTile of movableTiles){
                                let temp = {col: nearbyTile.gridPosition.x, row: nearbyTile.gridPosition.y};
                                if(!this.includeTile(weedTargets, temp)){
                                    weedTargets.push(temp)
                                }
                            }
                            weedCount++;
                        }
                    }
                }
            }
        }
        if(weedCount == 0){
            this.isThereWeeds = false;
            return null;
        }

        if(weedTargets.length > 0){
            return weedTargets[Math.floor(Math.random() * weedTargets.length)];
        }
        else{
            null;
        }
    },

    doSpreadWeed: function () {
        if(this.isThereMovingActions() || this.isTherePendingActions()
            || this.isTherePendingTiles() || !this.isThereWeeds || !this.spreadWeed){
            return false;
        }
        let weedTarget = this.findWeedTarget();
        if(weedTarget){
            this.addWeedTile(weedTarget.col, weedTarget.row, "weed_1");
            this.spreadWeed = false;
            return true;
        }
        else{
            return false;
        }
    },

    addWeedTile: function (col, row, cellValue) {
        let groundTile = this.getFigureTile(col, row);
        if(groundTile == null || !(groundTile instanceof GroundTile)){
            return;
        }
        this.isThereWeeds = true;
        groundTile.coverWeed();
    },

    onWeedStripped: function (event) {
        this.spreadWeed = false;
    },

    addGroundTile: function (col, row, cellValue) {
        if(cellValue.indexOf("gold") > -1){
            this.goldCount++;
        }
        const node = cc.instantiate(this._groundTemplate);
        let tile = node.getComponent(Constants.GroundScriptName);
        tile.groundDecorType = cellValue;
        tile.gridPosition = {x: col, y: row};
        tile.node.on(Constants.FIGURE_DESTROYED, this.onFigureDestroyed, this);
        tile.node.on(Constants.GOLD_COLLECTED, this.onGoldCollected, this);
        tile.node.on(Constants.GROUND_DESTROYED, this.onGroundDestroyed, this);
        tile.node.on(Constants.WEED_STRIPPED, this.onWeedStripped, this);
        this._mapNodesArray[Constants.FiguresLayerName][row][col] = tile;
        this.addNodeToLayer(this.figuresLayer, node, col, row);
    },

    addOfferingBaseTile: function (col, row, cellValue) {
        const node = cc.instantiate(this._offeringBaseTemplate);
        node.on(Constants.FIGURE_DESTROYED, this.onFigureDestroyed, this);
        node.on(Constants.OFFERING_BASE_FULL, this.onOfferingBaseFull, this);
        let tile = node.getComponent(Constants.OfferingBaseScriptName);
        tile.gridPosition = {x: col, y: row};
        this._mapNodesArray[Constants.FiguresLayerName][row][col] = tile;
        this.addNodeToLayer(this.figuresLayer, node, col, row);
    },

    onOfferingBaseFull: function (event) {
        let startPos = {col: event.detail.col, row: event.detail.row};
        this.setFigureTile(event.detail.col, event.detail.row, Constants.HOLE);
        startPos = this.grid2pos(startPos.col, startPos.row);
        let showNode = this.getTempNode();
        showNode.height = showNode.width = Constants.TileSize;
        showNode.getComponent(cc.Sprite).spriteFrame = this.figuresAtlas.getSpriteFrame("gold_butterfly");
        showNode.setAnchorPoint(0.5, 0.5);
        showNode.active = true;
        showNode.x = startPos.x + Constants.TileSize / 2;
        showNode.y = startPos.y + Constants.TileSize / 2;
        this.gameMapNode.addChild(showNode);
        let target = this.findOfferingBaseTarget();
        let effectNode = event.detail.effectNode;
        effectNode.removeFromParent(false);
        let targetPos = this.grid2pos(target.col, target.row);
        let butterflyAction = this._butterflyAction.clone();
        let seq = cc.sequence([
            cc.spawn([
                butterflyAction,
                cc.jumpTo(0.7, targetPos.x, targetPos.y, Constants.TileSize, 4)
            ]),
            cc.callFunc(this.recycleTempNode, this)
        ]);
        showNode.runAction(seq);
        setTimeout(() => {
            effectNode.x = targetPos.x;
            effectNode.y = targetPos.y;
            effectNode.active = true;
            this.gameMapNode.addChild(effectNode);
            effectNode.getComponent('sp.Skeleton').setAnimation(0, "offering_base_crush", false);
            setTimeout(() => {
                effectNode.removeFromParent(true);
            }, 0.6 * 1000);
            for(let i = target.row - 1; i <= target.row + 1; i++){
                if(this._mapNodesArray[Constants.FiguresLayerName][i]){
                    for(let j = target.col - 1; j <= target.col + 1; j++){
                        let tile = this.getFigureTile(j, i);
                        if(tile && (tile.grassNum > 0 || tile.isWeed)){
                            tile.stripAllCovers();
                        }
                    }
                }
            }
        }, 0.7 * 1000);
    },

    findOfferingBaseTarget: function () {
        let coveredGrounds = [];
        let groundTiles = [];
        for(let i = this._minVisibleRow; i <= this._maxVisibleRow; i++){
            if(this._mapNodesArray[Constants.FiguresLayerName][i]){
                for(let j = this._minVisibleColumn; j <= this._maxVisibleColumn; j++){
                    let tile = this.getFigureTile(j, i);
                    if(tile && tile instanceof GroundTile){
                        groundTiles.push({col: j, row: i});
                        if(tile.grassNum > 0 || tile.isWeed){
                            coveredGrounds.push({col: j, row: i});
                        }
                    }
                }
            }
        }
        if(coveredGrounds.length > 0){
            return coveredGrounds[Math.floor(Math.random() * coveredGrounds.length)];
        }
        else if(groundTiles.length > 0){
            return groundTiles[Math.floor(Math.random() * groundTiles.length)];
        }
    },

    refreshGroundBackground: function () {
        for(let i = this._minVisibleRow; i <= this._maxVisibleRow; i++){
            for(let j = this._minVisibleColumn; j <= this._maxVisibleColumn; j++){
                if(this.isGroundTile(j, i)){
                    let mapKey = this.makeGroundMapKey(j, i);
                    this.getFigureTile(j, i).groundType = Constants.GroundMap[mapKey];
                }
            }
        }
    },

    initGroundBackground: function () {
        for(let i = this._minRow; i <= this._maxRow; i++){
            for(let j = this._minColumn; j <= this._maxColumn; j++){
                if(this.isGroundTile(j, i)){
                    let mapKey = this.makeGroundMapKey(j, i);
                    this.getFigureTile(j, i).groundType = Constants.GroundMap[mapKey];
                }
            }
        }
        if(this._rowPageCount > 1){ // set Mask size
            this.gameMapNode.parent.height = this._gameArea.height;
            this.gameMapNode.parent.setAnchorPoint(0, 0);
        }
    },

    onGroundDestroyed: function (event) {
        event.detail.showGroundScore && this.scoreManager.pushObstacleScore({position: this.grid2pos(event.detail.col, event.detail.row)});
        this.refreshGroundBackground();
    },

    makeGroundMapKey: function (col, row) {
        let mapKey = "";
        for(let i = -1; i <= 1; i++){
            for(let j = -1; j <= 1; j++){
                mapKey += this.isGroundTile(col + j, row + i) ? "1" : "0";
            }
            mapKey += " ";
        }
        return mapKey.trim();
    },

    isGroundTile: function (col, row) {
        if(this.isValidTile(col, row)){
            return this.getFigureTile(col, row).tileKind == Enum.TileKind.Ground;
        }
        return false;
    },

    addGrassTile: function (col, row, cellValue) {
        let tile = this.getFigureTile(col, row);
        if(tile){
            tile.grass = cellValue;
        }
    },

    onGoldCollected: function (event) {
        this.collectedGoldCount++;
        if(this.collectedGoldCount >= this.goldCount){
            this._gameFinished = true;
        }
        if(this.collectedGoldCount >= this.goldCount){
            this.finishGame();
        }
        else {
            this.goldCountInPage < this.goldCount && this.goldCountInPage <= this.collectedGoldCount &&
            this.moveNextPage();
        }
        setTimeout(() => {
            this.setGoldCountLabel();
        }, 1000);
        this.scoreManager.pushConstantScore({scoreType: Constants.ScoreUnits.gold, position: this.grid2pos(event.detail.col, event.detail.row)});
        this.showGoldCollectingAction(event.detail.col, event.detail.row);
    },

    moveNextPage: function () {
        this.setGamePage(this._colCurrentPage, this._rowCurrentPage + 1);
        this.showPageMovingAction();
        this.countingGoldInPage();
        this.moveGenerators();
    },

    moveGenerators: function () {
        if(this._mapNodesArray[Constants.GeneratorsLayerName][this._minVisibleRow] == undefined){
            this._mapNodesArray[Constants.GeneratorsLayerName][this._minVisibleRow] = this._mapNodesArray[Constants.GeneratorsLayerName][this._minRow];
        }
    },

    findSquareBonusTarget: function (col, row) {
        let specialTiles = this.searchSpecialTiles();
        if (specialTiles.ground.length > 0 && specialTiles.ground.length) {
            return specialTiles.ground[Math.floor(Math.random() * specialTiles.ground.length)];
        }

        return this._super();
    },

    setGoldCountLabel: function () {
        this._goldCountNode.getComponent(cc.Label).string = this.goldCount - this.collectedGoldCount;
    },

    crushTile: function (tile) {
        this._super(tile);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
