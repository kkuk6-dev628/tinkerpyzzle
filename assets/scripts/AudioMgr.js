
//noinspection JSUnresolvedFunction
const Enum = require("EnumTypes");
//noinspection JSUnresolvedFunction
const Global = require("Global");

cc.Class({
    extends: cc.Component,

    properties: {
        bgMusic:{
            default: null,
            url: cc.AudioClip
        },
        bgmVolume:1.0,
        sfxVolume:1.0,
        
        bgmAudioID:-1
    },

    init: function () {
        let temp = cc.sys.localStorage.getItem("bgmVolume");

        if(temp != null){
            this.bgmVolume = parseFloat(temp);
        }
        
        temp = cc.sys.localStorage.getItem("sfxVolume");

        if(temp != null){
            this.sfxVolume = parseFloat(temp);
        }
        
        cc.game.on(cc.game.EVENT_HIDE, function () {
            cc.audioEngine.pauseAll();
        });

        cc.game.on(cc.game.EVENT_SHOW, function () {
            if(Global.Settings && Global.Settings.backgroundMusic) {
                cc.audioEngine.resumeAll();
            }
        });
    },

    getUrl:function(url){
        return cc.url.raw("resources/sounds/" + url);
    },
    
    playBGM: function(url){
        if(url){
            let audioUrl = this.getUrl(url);

            cc.log(audioUrl);

            if(this.bgmAudioID >= 0){
                cc.audioEngine.stop(this.bgmAudioID);
            }

            this.bgmAudioID = cc.audioEngine.playMusic(audioUrl,true,this.bgmVolume);
        }
        else{
            this.bgmAudioID = cc.audioEngine.playMusic( this.bgMusic, true );
        }
    },
    
    playSFX: function(audioName){
        const audioUrl = this.getUrl("fx/" + audioName);

        if(this.sfxVolume > 0){
            // this.musicPaused = true;
            // cc.audioEngine.pauseMusic();
            let audioId = cc.audioEngine.playEffect(audioUrl, false, this.sfxVolume);
        }
    },
    
    setSFXVolume:function(v){
        if(this.sfxVolume != v){
            cc.sys.localStorage.setItem("sfxVolume",v);
            this.sfxVolume = v;
        }
    },
    
    setBGMVolume:function(v,force){
        if(this.bgmAudioID >= 0){
            if(v > 0){
                cc.audioEngine.resumeMusic(this.bgmAudioID);
            }
            else{
                cc.audioEngine.pauseMusic(this.bgmAudioID);
            }
            //cc.audioEngine.setVolume(this.bgmAudioID,this.bgmVolume);
        }

        if(this.bgmVolume != v || force){
            cc.sys.localStorage.setItem("bgmVolume",v);
            this.bgmVolume = v;
            cc.audioEngine.setVolume(this.bgmAudioID,v);
        }
    },

    resumeMusic: function() {
        if(this.musicPaused) {
            this.musicPaused = false;
            cc.audioEngine.resumeMusic();
        }
    },

    pauseMusic: function() {
        // if(!this.musicPaused) {
        //     this.musicPaused = true;
            cc.audioEngine.pauseMusic();
        // }
    },

    pauseAll:function(){
        cc.audioEngine.pauseAll();
    },
    
    resumeAll:function(){
        cc.audioEngine.resumeAll();
    },

    playMatchSFX: function (matchNumber) {
        if(!Global.Settings.soundFX){
            return;
        }
        if(matchNumber > 8){
            matchNumber = 8;
        }
        this.playSFX("match_step_" + (matchNumber - 1) + ".ogg");
        this.playSFX("match_walk_element.ogg");
    },

    playMismatchSFX: function () {
        if(!Global.Settings.soundFX){
            return;
        }
        this.playSFX("mismatch.ogg");
    },

    playHintSFX: function () {
        if(!Global.Settings.soundFX){
            return;
        }
        this.playSFX("hint_match.ogg");
    },

    playBonusSFX: function (bonusType) {
        if(!Global.Settings.soundFX){
            return;
        }
        switch (bonusType){
            case Enum.BonusTypes.VBonus:
            case Enum.BonusTypes.HBonus:
            case Enum.BonusTypes.XBonus:
                this.playSFX("match_line.ogg");
                break;
            case Enum.BonusTypes.Lamp:
                this.playSFX("match_lamp.ogg");
                break;
            case Enum.BonusTypes.Bomb:
                this.playSFX("match_bomb.ogg");
                break;
            case Enum.BonusTypes.Square:
                this.playSFX("match_butterfly.ogg");
                break;
        }
    },

    playSelectTileSFX: function () {
        if(!Global.Settings.soundFX){
            return;
        }
         this.playSFX("select.ogg");
    },

    playLockCrushSFX: function () {
        if(!Global.Settings.soundFX){
            return;
        }
        this.playSFX("mark_corner_destroy.ogg");
    },

    playGroundCrushSFX: function () {
        if(!Global.Settings.soundFX){
            return;
        }
        this.playSFX("mark_corner_destroy.ogg");
    },

    playStoneCracksSFX: function () {
        if(!Global.Settings.soundFX){
            return;
        }
        this.playSFX("stone_cracks.ogg");
    },

    playStoneCrushSFX: function () {
        if(!Global.Settings.soundFX){
            return;
        }
        this.playSFX("stone_destroy.ogg");
    },

    playBombBomb: function () {
        if(!Global.Settings.soundFX){
            return;
        }
        this.playSFX("match_bomb_and_bomb.ogg");
    },

    playBombLine: function () {
        if(!Global.Settings.soundFX){
            return;
        }
        this.playSFX("match_bomb_and_line.ogg");
    },

    playLampLamp: function () {
        if(!Global.Settings.soundFX){
            return;
        }
        this.playSFX("match_lamp_and_lamp.ogg");
    },

    playMatchKey: function () {
        if(!Global.Settings.soundFX){
            return;
        }
        this.playSFX("match_key.ogg");
    }
});
