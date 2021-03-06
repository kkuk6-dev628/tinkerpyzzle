

//noinspection JSUnresolvedFunction
const Enum = require("EnumTypes");
//noinspection JSUnresolvedFunction
const Constants = require("Constants");
//noinspection JSUnresolvedFunction
const FigureTile = require("FigureTile");
//noinspection JSUnresolvedFunction
const Global = require("Global");

cc.Class({
    extends: FigureTile,

    properties: {
        _uiNode: {
            default: null,
            type: cc.Node
        },

        _topKeyNode: {
            default: null,
            type: cc.Node
        },

        _keyTargetPosition:{
            default: null,
            type: cc.p
        }
    },

    // use this for initialization
    onLoad: function () {
        this._super();
        this._uiNode = cc.find("Canvas/ui_nodes");
        this._topKeyNode = cc.find("Canvas/ui_nodes/top_status_area/top_1/key");
        let wKeyPos = this._topKeyNode.parent.convertToWorldSpaceAR(this._topKeyNode.getPosition());
        this._keyTargetPosition = this._uiNode.convertToNodeSpaceAR(wKeyPos);

    },

    crushTile: function () {
        if(this.freeChain() && this.crushMystery() && this.crushMilk() && this.crushSnake() && this.crushGooBomb()) {
            // Global.PendingActions++;
            this.isPendingAction = true;
            let nodeLocalPos = this.node.getPosition();
            let wNodePos = this.node.parent.convertToWorldSpaceAR(this.node.getPosition());
            let nNodePos = this._uiNode.convertToNodeSpaceAR(wNodePos);
            // nKeyPos = cc.v2(nKeyPos.x, nKeyPos.y - 640);

            this.node.removeFromParent(false);
            this._uiNode.addChild(this.node);
            this.node.setAnchorPoint(cc.v2(0.5,0.5));
            this.node.x = nNodePos.x + Constants.TileSize / 2;
            this.node.y = nNodePos.y + Constants.TileSize / 2;
            let middlePos = cc.p((this._keyTargetPosition.x + nNodePos.x) / 2, (this._keyTargetPosition.y + nNodePos.y) / 2);
            this.node.setLocalZOrder(999);
            let seq = cc.sequence(
                cc.spawn(
                    cc.scaleTo(0.5, 2.5, 2.5),
                    cc.moveTo(0.5, middlePos).easing(cc.easeQuinticActionIn())
                ),
                cc.spawn(
                    cc.scaleTo(0.5, 1, 1),
                    cc.moveTo(0.5, this._keyTargetPosition).easing(cc.easeQuinticActionOut())
                ),
                cc.callFunc(this.notifyKeyCollected, this)
            );
            this.node.emit(Constants.FIGURE_DESTROYED, {col: this.gridPosition.x, row: this.gridPosition.y, recycleDelay: 1.1});
            this.node.runAction(seq);
        }
    },

    notifyKeyCollected: function () {
        // Global.PendingActions--;
        this.node.emit(Constants.KEY_COLLECTED, {col:this.gridPosition.x, row: this.gridPosition.y});
        this.isPendingAction = false;
    }
});
