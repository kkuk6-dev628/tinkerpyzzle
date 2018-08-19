cc.Class({
    extends: cc.Component,

    properties: {

        availableBoosters: {
            default: {}
        },

        coins: 0,

        harts: 5,

        hartResetTime: 0,

        dailyBonusDate: 0,

        videoWatchedDate: 0,

        videoWatchedCount: 0,

        adsWatchedDate: 0,

        adsWatchedCount: 0
    },

    // use this for initialization
    onLoad: function () {

    },

    load: function () {
        let lamp = parseInt(cc.sys.localStorage.getItem("lamp_booster"));
        // this.availableBoosters.lamp = isNaN(lamp) ? 3 : lamp;
        this.availableBoosters.lamp = 10;
        let line = parseInt(cc.sys.localStorage.getItem("line_booster"));
        // this.availableBoosters.line = isNaN(line) ? 3 : line;
        this.availableBoosters.line = 10;
        let butterfly = parseInt(cc.sys.localStorage.getItem("butterfly_booster"));
        // this.availableBoosters.butterfly = isNaN(butterfly) ? 3 : butterfly;
        this.availableBoosters.butterfly = 10;
        let coins = parseInt(cc.sys.localStorage.getItem("coins"));
        this.coins = isNaN(coins) ? 100 : coins;
        let harts = parseInt(cc.sys.localStorage.getItem("harts"));
        this.harts = isNaN(harts) ? 5 : harts;
        let hartResetTime = parseInt(cc.sys.localStorage.getItem("harts_reset_time"));
        this.hartResetTime = isNaN(hartResetTime) ? 0 : hartResetTime;
        let dailyBonusTime = parseInt(cc.sys.localStorage.getItem("daily_bonus_time"));
        this.dailyBonusDate = isNaN(dailyBonusTime) ? 0 : dailyBonusTime;
        let videoWatchDate = parseInt(cc.sys.localStorage.getItem("video_watched_date"));
        this.videoWatchedDate = isNaN(videoWatchDate) ? 0 : videoWatchDate;
        let videoWatchCount = parseInt(cc.sys.localStorage.getItem("video_watched_count"));
        this.videoWatchedCount = isNaN(videoWatchCount) ? 0 : videoWatchCount;
        let adsWatchDate = parseInt(cc.sys.localStorage.getItem("ads_watched_date"));
        this.adsWatchedDate = isNaN(adsWatchDate) ? 0 : adsWatchDate;
        let adsWatchCount = parseInt(cc.sys.localStorage.getItem("ads_watched_count"));
        this.adsWatchedCount = isNaN(adsWatchCount) ? 0 : adsWatchCount;
    },

    save: function () {
        cc.sys.localStorage.setItem("lamp_booster", this.availableBoosters.lamp);
        cc.sys.localStorage.setItem("line_booster", this.availableBoosters.line);
        cc.sys.localStorage.setItem("butterfly_booster", this.availableBoosters.butterfly);
        cc.sys.localStorage.setItem("coins", this.coins);
        cc.sys.localStorage.setItem("harts", this.harts);
        cc.sys.localStorage.setItem("harts_reset_time", this.hartResetTime);
        cc.sys.localStorage.setItem("daily_bonus_time", this.dailyBonusDate);
        cc.sys.localStorage.setItem("video_watched_date", this.videoWatchedDate);
        cc.sys.localStorage.setItem("video_watched_count", this.videoWatchedCount);
        cc.sys.localStorage.setItem("ads_watched_date", this.adsWatchedDate);
        cc.sys.localStorage.setItem("ads_watched_count", this.adsWatchedCount);
    },

    saveLevelStar: function(levelNumber, starCount){
        cc.sys.localStorage.setItem(`star_${levelNumber}`, starCount);
    },

    getLevelStar: function(levelNumber){
        let star = parseInt(cc.sys.localStorage.getItem(`star_${levelNumber}`));
        star = isNaN(star) ? 0 : star;
        return star;
    }

});
