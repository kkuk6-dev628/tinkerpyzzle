
const Constants = require("Constants");

cc.Class({
    extends: cc.Component,

    properties: {
        messageLabelNode:cc.Label,
        _stateStr:'',
        _progress:0.0,
        _splash:null,
        _isLoading:false,
        _progressBarNode: null,
        _progressBar: null,
        _loadedUuidIndex:0,
        _uuidArray: []
    },

    onLoad: function () {
        if(!cc.sys.isNative && cc.sys.isMobile){
            const cvs = this.node.getComponent(cc.Canvas);
            cvs.fitHeight = true;
            cvs.fitWidth = true;
        }

        this._progressBarNode = cc.find('Canvas/progressBar');

        this._progressBar = this._progressBarNode.getComponent(cc.ProgressBar);
        this._progressBarNode.active = false;

        cc.args = this.urlParse();

        this.initMgr();

        cc.tinker = {};
        cc.tinker.version = Constants.version;

        cc.vv.loading = this;

        /////////////////////////////////////////////////////////////////////////////
        if(cc.sys.isMobile){
            //ga.GameAnalytics.configureBuild("android 1.0.0");
            ga.GameAnalytics.configureBuild(Constants.version);
            ga.GameAnalytics.setEnabledInfoLog(true);
            ga.GameAnalytics.setEnabledVerboseLog(true);


            ga.GameAnalytics.configureAvailableResourceCurrencies(["gems", "gold"]);
            ga.GameAnalytics.configureAvailableResourceItemTypes(["boost", "gold"]);
            // ga.GameAnalytics.configureAvailableCustomDimensions01(["ninja", "samurai"]);
            // ga.GameAnalytics.configureAvailableCustomDimensions02(["whale", "dolphin"]);
            // ga.GameAnalytics.configureAvailableCustomDimensions03(["horde", "alliance"]);

            ga.GameAnalytics.initialize("d4ab610da008165c03e163eb57db56d5", "ba8f2fda0a16c7da87a71848d8853f9fdba5465f");

            // ga.GameAnalytics.addErrorEvent(ga.EGAErrorSeverity.Debug, "Test GA!");
        }

        //////////////////////////////////////////////////////////////////////////////

        if(cc.sys.isMobile) {
            sdkbox.PluginAdMob.setListener({
                adViewDidReceiveAd: function(name) {},
                adViewDidFailToReceiveAdWithError: function(name, msg) {},
                adViewWillPresentScreen: function(name) {},
                adViewDidDismissScreen: function(name) {},
                adViewWillDismissScreen: function(name) {},
                adViewWillLeaveApplication: function(name) {}
            });
            sdkbox.PluginAdMob.init();
        }

        for (let prop in cc.loader._resources._pathToUuid) {
            const entry = cc.loader._resources._pathToUuid[prop];

            if (entry[0] && entry[0]['uuid'] && entry[0]['type']){
                const uuid = cc.loader._resources._pathToUuid[prop][0]['uuid'];
                this._uuidArray.push(uuid);
                // const typeName = cc.loader._resources._pathToUuid[prop][0]['type']['name'];

                //in native platform typeName is Texture2D
                //but in browser desktop cc_Texture2D

                // if (uuid) {
                //     if (typeName == 'cc_Texture2D' || typeName == 'Texture2D') {
                //         this._uuidArray.push(uuid);
                //     }
                // }
            }
            else {
                //cc.log(prop);
            }
        }
    },

    urlParse:function(){
        const params = {};

        if(window.location == null){
            return params;
        }

        let name, value;
        let str = window.location.href; //取得整个地址栏
        let num = str.indexOf("?");

        str = str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]

        const arr = str.split("&"); //各个参数放到数组里

        for(let i = 0; i < arr.length; i++){
            num=arr[i].indexOf("=");

            if(num > 0){
                name = arr[i].substring(0,num);
                value = arr[i].substr(num+1);
                params[name]=value;
            }
        }

        return params;
    },

    initMgr: function () {
        cc.vv = {};

        const App = require("App");
        cc.vv.app = new App();

        cc.vv.http = require("HTTP");

        cc.vv.http.setURL(cc.vv.app.getServerURL());

        // cc.vv.net = require("Net");

        const AudioMgr = require("AudioMgr");
        cc.vv.audioMgr = new AudioMgr();
        cc.vv.audioMgr.init();

        // var UserMgr = require("UserMgr");
        // cc.vv.userMgr = new UserMgr();

        // const TileManager = require("TileManager");
        // cc.vv.tileManager = new TileManager();
        // cc.vv.tileManager.initHandlers();

        const Utils = require("Utils");
        cc.vv.utils = new Utils();

        const AnysdkMgr = require("AnysdkMgr");
        cc.vv.anysdkMgr = new AnysdkMgr();
        cc.vv.anysdkMgr.init();

        // var VoiceMgr = require("VoiceMgr");
        // cc.vv.voiceMgr = new VoiceMgr();
        // cc.vv.voiceMgr.init();
    },

    start: function () {
        const self = this;
        let SHOW_TIME = 3000;
        let FADE_TIME = 500;
        self.startPreloading();
        // if(cc.sys.os != cc.sys.OS_IOS || !cc.sys.isNative){
        //     self._splash.active = true;
        //     var t = Date.now();
        //
        //     var fn = function(){
        //         var dt = Date.now() - t;
        //
        //         if(dt < SHOW_TIME){
        //             setTimeout(fn, 33);
        //         }
        //         else {
        //             var op = (1 - ((dt - SHOW_TIME) / FADE_TIME)) * 255;
        //
        //             if(op < 0){
        //                 self._splash.opacity = 0;
        //                 self.checkVersion();
        //             }
        //             else{
        //                 self._splash.opacity = op;
        //                 setTimeout(fn, 33);
        //             }
        //         }
        //     };
        //
        //     setTimeout(fn, 33);
        // }
        // else{
        //     this._splash.active = false;
        //     this.checkVersion();
        // }
    },

    checkVersion:function(){
        const self = this;

        let onGetVersion = function (ret) {
            if (ret.version == null) {
                cc.warn("failed to get version.");
            }
            else {
                cc.vv.SI = ret;

                if (ret.version != cc.vv.app.getVersionInfoString()) {
                    cc.find("Canvas/alert").active = true;
                }
                else {
                    if (!cc.sys.isNative) {
                        self.startPreloading();
                    }
                    else {
                        self._stateStr = '';
                        cc.vv.hotUpdate.checkUpdate();
                    }
                }
            }
        };

        const onOk = function () {
            self.checkVersion();
        };

        const onCancel = function () {
            cc.game.end();
        };

        let errorHandler = function () {
            self._stateStr = '';
            self.messageLabelNode.string = '';
            cc.vv.alert.show('提示', '服务器连接失败! 错误代码: 1.\n 你想重试吗？', onOk, onCancel);
        };

        let timeoutHandler = function () {
            self._stateStr = '';
            self.messageLabelNode.string = '';
            cc.vv.alert.show('提示', '服务器连接失败! 错误代码: 2\n 你想重试吗？', onOk, onCancel);
        };

        let abortHandler = function () {
            self._stateStr = '';
            self.messageLabelNode.string = '';
            cc.vv.alert.show('提示', '服务器连接失败! 错误代码: 3\n 你想重试吗？', onOk, onCancel);
        };

        // self._stateStr = "正在连接服务器";

        // cc.vv.http.sendRequest("/get_serverinfo", null, onGetVersion, null, errorHandler, timeoutHandler, abortHandler);
    },

    startPreloading:function(){
        this._stateStr = "正在加载资源";
        this._progressBarNode.active = true;
        this._isLoading = true;
    },

    update: function (dt) {
        if(this._stateStr.length == 0){
            return;
        }

        this.messageLabelNode.string = this._stateStr + ' ';

        const dotCount = 8;
        const refreshTime = 500;//ms

        const t = Math.floor(Date.now() / refreshTime) % dotCount;

        for(let i = 0; i < t; ++ i){
            this.messageLabelNode.string += '.';
        }

        if(this._isLoading){
            const progressDelta = 1.0 / this._uuidArray.length;

            if (this._loadedUuidIndex >= this._uuidArray.length -1 ) {
                const playButton = cc.find("Canvas/play_button");
                playButton.active = true;
                this._progressBarNode.active = false;
                // cc.director.loadScene("map");
                this._stateStr = '';
            }
            else {
                const res = {
                    type: 'uuid',
                    uuid: this._uuidArray[this._loadedUuidIndex]
                };

                const self = this;

                cc.loader.load(res, function (err, tex) {
                    self._progress += progressDelta;
                    self._loadedUuidIndex++;
                });
            }

            this._progressBar.progress = this._progress;
        }
    },

    onPlayButtonClicked: function (event) {
        cc.vv.anysdkMgr.showPopWindow();
        cc.director.loadScene("map");
    }
});
