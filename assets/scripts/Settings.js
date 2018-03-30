
//noinspection JSUnresolvedFunction
const Global = require("Global");
cc.Class({
    extends: cc.Component,

    properties: {
        backgroundMusic: {
            get: function () {
                return this._backgroundMusic;
            },
            set: function (value) {
                this._backgroundMusic = value;
                // if(this._backgroundMusic){
                //     Global.AudioManager.resumeMusic();
                // }
                // else{
                //     Global.AudioManager.pauseMusic();
                // }
            }
        },
        soundFX: true,
    },

    // use this for initialization
    onLoad: function () {

    },

    load: function () {
        this.backgroundMusic = cc.sys.localStorage.getItem("backgroundMusic") == "true";
        this.soundFX = cc.sys.localStorage.getItem("soundFX") == "true";
    },

    save: function () {
        cc.sys.localStorage.setItem("backgroundMusic", this.backgroundMusic);
        cc.sys.localStorage.setItem("soundFX", this.soundFX);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
