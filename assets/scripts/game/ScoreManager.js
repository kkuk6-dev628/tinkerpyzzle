
//noinspection JSUnresolvedFunction
const Constants = require("Constants");
//noinspection JSUnresolvedFunction
const Global = require("Global");

cc.Class({
    extends: cc.Component,

    properties: {

        gameInstance: {
            default: null,
            type: cc.Object,
            visible: false
        },

        scoreBoardLayer: {
            default: null,
            type: cc.Node
        },

        scorePref: {
            default: null,
            type: cc.Prefab
        },

        scoreNode: {
            default: null,
            type: cc.Node,
            visible: false
        },

        scorePool: {
            default: null,
            type: cc.NodePool,
            visible: false
        },

        constantScoresQueue: {
            default: [],
            visible: false
        },

        obstacleScoresQueue: {
            default: [],
            visible: false
        },

        additiveScoresQueue: {
            default: [],
            visible: false
        },
    },

    // use this for initialization
    onLoad: function () {
        this.init();
    },

    init: function () {
        this.initPool();
        this.initQueues();
        this.initNodes();
        Global.PlayingLevel.score = 0;
        this.addTotalScore(0);
    },

    initNodes: function () {
        this.scoreNode = cc.find("Canvas/ui_nodes/top_status_area/common_ui/score");
        let topStatusArea = cc.find("Canvas/ui_nodes/top_status_area/common_ui");
        topStatusArea.getChildByName("star1").active = false;
        topStatusArea.getChildByName("star2").active = false;
        topStatusArea.getChildByName("star3").active = false;
    },

    initPool: function () {
        this.scorePool = new cc.NodePool();
        for (let i = 0; i < 25; ++i) {
            let score = cc.instantiate(this.scorePref);
            this.scorePool.put(score);
        }
    },

    initQueues: function () {
        this.constantScoresQueue = [];
        this.additiveScoresQueue = [];
    },

    addTotalScore: function (score) {
        Global.PlayingLevel.score += score;
        this.scoreNode.getComponent(cc.Label).string = Global.PlayingLevel.score;
        let topStatusArea = cc.find("Canvas/ui_nodes/top_status_area/common_ui");
        if(Global.PlayingLevel.score > Global.PlayingLevel.score3){
            topStatusArea.getChildByName("star1").active = true;
            topStatusArea.getChildByName("star2").active = true;
            topStatusArea.getChildByName("star3").active = true;
        }
        else if(Global.PlayingLevel.score > Global.PlayingLevel.score2){
            topStatusArea.getChildByName("star1").active = true;
            topStatusArea.getChildByName("star2").active = true;
        }
        else if(Global.PlayingLevel.score > Constants.Score1){
            topStatusArea.getChildByName("star1").active = true;
        }
    },

    getScoreNode: function () {
        let score = null;
        if (this.scorePool.size() > 0) { // use size method to check if there're nodes available in the pool
            score = this.scorePool.get();
        } else { // if not enough node in the pool, we call cc.instantiate to create node
            score = cc.instantiate(this.scorePref);
        }
        score.parent = this.scoreBoardLayer; // add new enemy node to the node tree
        score.setOpacity(255);
        score.active = true;
        return score;
    },

    recycleScore: function (self, score) {
        this.scorePool.put(score);
    },

    pushAdditiveScore: function (score) {
        this.additiveScoresQueue.push(score);
    },

    pushConstantScore: function (score) {
        this.constantScoresQueue.push(score);
    },

    pushObstacleScore: function (score) {
        this.obstacleScoresQueue.push(score);
    },

    showScoreAction: function (score, position) {
        let scoreNode = this.getScoreNode();
        let label = scoreNode.getComponent(cc.Label);
        label.string = "+" + score;
        scoreNode.x = position.x + Constants.TileSize / 2;
        scoreNode.y = position.y;
        let seq = cc.sequence(
            cc.spawn(
                cc.moveBy(1.2, 0, Constants.TileSize * 1.5),
                cc.fadeOut(1.2)
            ),
            cc.callFunc(this.recycleScore, this, scoreNode)
        );
        scoreNode.runAction(seq);
    },

    calcAdditiveScore: function (matchType, matchNumber) {
        return Constants.ScoreUnits[matchType] * matchNumber;
    },

    processScoresQueue: function () {
        let additiveScoreObject = this.additiveScoresQueue.shift();
        if(additiveScoreObject){
            let score = this.calcAdditiveScore(additiveScoreObject.matchType, additiveScoreObject.matchNumber);
            this.addTotalScore(score);
            this.showScoreAction(score, additiveScoreObject.position);
        }

        let constantScoreObject = this.constantScoresQueue.shift();
        if(constantScoreObject){
            let score = Constants.ScoreUnits.normal;
            if(constantScoreObject.scoreType){
                score = constantScoreObject.scoreType;
            }
            this.addTotalScore(score);
            constantScoreObject.position && this.showScoreAction(score, constantScoreObject.position);
        }

        let obstacleScoreObject = this.obstacleScoresQueue.shift();
        if(obstacleScoreObject){
            let score = Constants.ScoreUnits.obstacle;
            this.addTotalScore(score);
            this.showScoreAction(score, obstacleScoreObject.position);
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.processScoresQueue();
    },
});
