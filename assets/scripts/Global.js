
if(cc.sys.isMobile){
    ga.EGAResourceFlowType = {
        Source : 1,
        Sink : 2
    };

    ga.EGAProgressionStatus = {
        Start : 1,
        Complete : 2,
        Fail : 3
    };

    ga.EGAErrorSeverity = {
        Debug : 1,
        Info : 2,
        Warning : 3,
        Error : 4,
        Critical : 5
    };

    ga.EGAGender = {
        Male : 1,
        Female : 2
    };
}

//noinspection JSUnresolvedFunction
const Enum = require("EnumTypes");
//noinspection JSUnresolvedFunction
const Constants = require("Constants");
//noinspection JSUnresolvedFunction
const LevelManager = require("LevelManager");
//noinspection JSUnresolvedFunction
const LevelInfo = require("LevelInfo");
//noinspection JSUnresolvedFunction
const UserData = require("UserData");
//noinspection JSUnresolvedFunction
const Settings = require("Settings");

const Global = cc.Class({
    extends: cc.Component,

    statics:{
        AllLevels: null,

        Settings: null,

        LevelManager: {
            default: null,
            type: LevelManager
        },

        PlayingLevel: {
            default: null,
            type: LevelInfo
        },

        UserData: null,

        AudioManager: null,

        ActiveBooster: null,

        coins: 100,
        harts: 5,
        passedLevel: 0,
        PendingActions: 0,
        PlayNext: false,

        sendGAProgressionEvent(status, progression01, progression02, progression03){
            if(cc.sys.isMobile){
                ga.GameAnalytics.addProgressionEvent(status, progression01, progression02, progression03);
            }
        },

        loadUserData: function () {
            if(Global.UserData == null) {
                Global.UserData = new UserData();
                Global.UserData.load();
            }
        },

        loadSettings: function () {
            if(Global.Settings == null) {
                Global.Settings = new Settings();
                Global.Settings.load();
            }
        },

        checkAdMobAvailable: function(name){
            if(cc.sys.isMobile){
                if(sdkbox.PluginAdMob.isAvailable(name)){
                    return true;
                }
                else{
                    cc.log(`AdMob ${name} is not available!!!!!!!!!!!!!!!!`);
                }
            }
            return false
        },

        initBuyCoinsPopup: function (buyPopupNode) {
            if(!buyPopupNode){
                return false;
            }
            let enableAdsWatch = Global.checkAdsWatchCount();
            let adsAvailable = Global.checkAdMobAvailable(Constants.AdMobGameOver);
            cc.find("watch_ads/watch_ads_button", buyPopupNode).active = enableAdsWatch && adsAvailable;
            let adsLabel = buyPopupNode.getChildByName("ads_try_tomorrow");
            adsLabel.active = !enableAdsWatch;
            if(!adsAvailable){
                adsLabel.active = !adsAvailable;
                adsLabel.getComponent(cc.Label).string = "Please check network.";
            }
            else{
                adsLabel.getComponent(cc.Label).string = "Try at tomorrow.";
            }

            let enableVideoWatch = Global.checkVideoWatchCount();
            let videoAvailable = Global.checkAdMobAvailable(Constants.AdMobRewarded);
            cc.find("watch_video/watch_video_button", buyPopupNode).active = enableVideoWatch && videoAvailable;
            let videoLabel = buyPopupNode.getChildByName("video_try_tomorrow");
            videoLabel.active = !enableVideoWatch;
            if(!videoAvailable){
                videoLabel.active = !videoAvailable;
                videoLabel.getComponent(cc.Label).string = "Please check network.";
            }
            else{
                videoLabel.getComponent(cc.Label).string = "Try at tomorrow.";
            }

            // let scrollContent = cc.find("scroll_view/view/content", buyPopupNode);
            // if(!scrollContent){
            //     return false;
            // }
            // let item = scrollContent.getChildByName("item_small");
            // for(let i = scrollContent.childrenCount -1; i > 0; i--){
            //     scrollContent.removeChild(scrollContent.children[i]);
            // }
            // let i = 1;
            // for(let coins in Constants.CoinBuyUnits){
            //     let priceDollar = Constants.CoinBuyUnits[coins];
            //     let itemNode = null;
            //     if(scrollContent.childrenCount > i){
            //         itemNode = scrollContent.children[i];
            //     }
            //     else{
            //         itemNode = cc.instantiate(item);
            //         scrollContent.addChild(itemNode);
            //     }
            //     itemNode.getChildByName("label_coin").getComponent(cc.Label).string = coins;
            //     let buyButton = cc.find("buy_button", itemNode);
            //     buyButton.coins = coins;
            //     buyButton.getChildByName("label").getComponent(cc.Label).string = `$ ${priceDollar}`;
            //     i++;
            // }
            return true;
        },

        createShowPopupAction: function(){
            return cc.sequence([
                cc.place(0, 1280),
                cc.show(),
                cc.moveTo(0.2, 0, -50),
                cc.moveBy(0.03, 0, 10),
                cc.moveBy(0.03, 0, 30),
                cc.moveBy(0.01, 0, 50),
                cc.moveBy(0.03, 0, 30),
                cc.moveBy(0.03, 0, 10),
                cc.moveTo(0.12, 0, 0),
            ]);
        },

        createHidePopupAction: function(){
            return cc.sequence([
                cc.place(0, 0),
                cc.moveTo(0.2, 0, 1280),
                cc.hide()
            ]);
        },

        grid2pos: function (col, row) {
            col = parseInt(col);
            row = parseInt(row);
            let x = col * Constants.TileSize;
            let y = Global.GridViewSize.height - (row + 1) * Constants.TileSize;
            return {x: x, y: y};
        },

        transformCoordinates: function (fromNode, toNode) {
            try {
                let wayFinishPos = fromNode.getPosition();
                wayFinishPos = fromNode.parent.convertToWorldSpaceAR(wayFinishPos);
                wayFinishPos = toNode.convertToNodeSpaceAR(wayFinishPos);
                return wayFinishPos;
            } catch (e) {
                return null;
            }
        },

        isSameTile: function (a, b) {
            if(a !== undefined && b !== undefined){
                return a.col == b.col && a.row == b.row;
            }
            return false;
        },

        readLevelResult: function (levelNumber) {
            let str = cc.sys.localStorage.getItem(levelNumber);
            return JSON.parse(str);
        },

        savePassedLevel: function (passedLevel) {
            if(Global.readPassedLevel() < passedLevel){
                cc.sys.localStorage.setItem("passedLevel", passedLevel);
            }
        },

        checkSpawn: function (spawnedTileCount, spawnRate) {
            let prod = spawnedTileCount * spawnRate;
            let reminder = prod - Math.floor(prod);
            return reminder < spawnRate;
        },

        checkAdsWatchCount: function () {
            let today = new Date();
            today.setHours(0, 0, 0, 0);
            today = today.getTime();
            if( Global.UserData.adsWatchedDate < today){
                return true;
            }
            else{
                return Global.UserData.adsWatchedCount < Constants.ADSWatchCountPerDay;
            }
        },

        increaseVideoWatched: function () {
            let today = new Date();
            today.setHours(0, 0, 0, 0);
            today = today.getTime();
            Global.UserData.videoWatchedDate = today;
            Global.UserData.videoWatchedCount++;
            Global.UserData.save();
        },

        increaseAdsWatched: function () {
            let today = new Date();
            today.setHours(0, 0, 0, 0);
            today = today.getTime();
            Global.UserData.adsWatchedDate = today;
            Global.UserData.adsWatchedCount++;
            Global.UserData.save();
        },

        checkVideoWatchCount: function () {
            let today = new Date();
            today.setHours(0, 0, 0, 0);
            today = today.getTime();
            if( Global.UserData.videoWatchedDate < today){
                return true;
            }
            else{
                return Global.UserData.videoWatchedCount < Constants.ADSWatchCountPerDay;
            }
        },

        readPassedLevel: function () {
            let passedLevel = parseInt(cc.sys.localStorage.getItem("passedLevel"));
            if(isNaN(passedLevel)){
                passedLevel = 0;
            }
            //return 242;
            return passedLevel;
        },

        getStarScores: function (levelNumber) {
            const levelInfo = Global.AllLevels[levelNumber];
            let result = {
                score2: parseInt(levelInfo.score_2),
                score3: parseInt(levelInfo.score_3)
            };
            return result;
        },

        loadLevel: function (levelNumber) {
            cc.tinker.levelNumber = levelNumber;
            const levelInfo = Global.AllLevels[levelNumber];
            // cc.info(levelNumber);
            let levelType = parseInt(levelInfo.level_type);
            cc.tinker.levelType = levelType;
            Global.PlayingLevel = new LevelInfo();
            Global.PendingActions = 0;
            switch(levelType){
                case Enum.LevelTypes.FoxWay:
                    // cc.director.loadScene("wait");
                    Global.PlayingLevel.loadLevelFromFile(levelNumber, (data) => {
                        cc.director.preloadScene('game_fox', () => {
                            cc.director.loadScene("game_fox");
                        });
                    });
                    break;
                case Enum.LevelTypes.Key:
                    Global.PlayingLevel.loadLevelFromFile(levelNumber, (data) => {
                        cc.director.preloadScene('game_fox', () => {
                            cc.director.loadScene("game_fox");
                        });
                    });
                    break;
                case Enum.LevelTypes.Gold:
                    Global.PlayingLevel.loadLevelFromFile(levelNumber, (data) => {
                        cc.director.preloadScene('game_gold', () => {
                            cc.director.loadScene("game_gold");
                        });
                    });
                    break;
                case Enum.LevelTypes.Relic:
                    Global.PlayingLevel.loadLevelFromFile(levelNumber, (data) => {
                        cc.director.preloadScene('game_relic', () => {
                            cc.director.loadScene("game_relic");
                        });
                    });
                    break;
                case Enum.LevelTypes.Box:
                    Global.PlayingLevel.loadLevelFromFile(levelNumber, (data) => {
                        cc.director.preloadScene('game_box', () => {
                            cc.director.loadScene("game_box");
                        });
                    });
                    break;
            }

        }
    }
});
