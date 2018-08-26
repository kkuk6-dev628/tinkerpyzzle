const Constants = require("Constants");
//noinspection JSUnresolvedFunction
const Global = require("Global");
//noinspection JSUnresolvedFunction
const LevelInfo = require("LevelInfo");
//noinspection JSUnresolvedFunction
const Enum = require("EnumTypes");
//noinspection JSUnresolvedFunction
const Settings = require("Settings");

cc.Class({
    extends: cc.Component,

    properties: {

        canvas: {
            default: null,
            type: cc.Canvas
        },

        root: {
            default: null,
            type: cc.Node
        },

        audioManager: {
            default: null,
            type: cc.Node
        },

        section: {
            default: null,
            type: cc.Node
        },

        popups: {
            default: null,
            type: cc.Node
        },

        figuresAtlas: {
            default: null,
            type: cc.SpriteAtlas
        },

        gameUIAtlas: {
            default: null,
            type: cc.SpriteAtlas
        },

        uiAtlas: {
            default: null,
            type: cc.SpriteAtlas
        },

        levelIcons: {
            default: null,
            type: cc.SpriteAtlas
        },

        _allLevels: [],

        _firstSubSection: 0,

        _subSectionHeight: 1536,

        _subSectionCount: 4,

        _trailActionDistance: 32,

        _levelsPerSubSection: 10,

        _levelsPerSideItem: 20,

        _unlockedSection: 1,

        _passedLevel: 0,

        _sideSectionItemTemp: {
            default: null,
            type: cc.Node
        },

        _sideSectionsContent: {
            default: null,
            type: cc.Node
        },

        _popupMaskNode: {
            default: null,
            type: cc.Node
        },

        _coinsLabel: {
            default: null,
            type: cc.Label
        },

        _hartsLabel: {
            default: null,
            type: cc.Label
        },

        _hartsTimeLabel: {
            default: null,
            type: cc.Label
        },

        _playerPosition: {
            default: null,
            type: cc.Node
        },

        _playerNode: {
            default: null,
            type: cc.Node
        },

        _levelSelected: false
    },

    // use this for initialization
    onLoad: function () {
        const self = this;
        Global.passedLevel = Global.readPassedLevel();
        this._trailActionDistance = 256;
        if (Global.AllLevels == null) {
            //noinspection JSUnresolvedFunction
            Global.AllLevels = require("AllLevels");
        }
        this._subSectionCount = this.section.childrenCount;
        this._levelsPerSubSection = this.section.children[0].getChildByName("level_buttons").childrenCount;

        this.section.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            const delta = event.getDelta();
            self.onSectionTouchMove(delta);
        });

        this.section.on(cc.Node.EventType.TOUCH_END, function (event) {
            self.onSectionTouchEnd(event);
        });

        Global.AudioManager = this.audioManager.getComponent("AudioMgr");

        Global.loadSettings();
        Global.loadUserData();
        Global.Settings.backgroundMusic == true && Global.AudioManager.playBGM();

        this.initNodes();
        this.initLevelsMap();
        this.initSideSections();
        this.initHartTime();
        this.initAdmob();
    },

    initNodes: function () {
        this._popupMaskNode = this.popups.getChildByName("mask");
        this._coinsLabel = cc.find("Canvas/root/main_buttons/coins/coins_label").getComponent(cc.Label);
        this._hartsLabel = cc.find("Canvas/root/main_buttons/harts/harts").getComponent(cc.Label);
        this._hartsTimeLabel = cc.find("Canvas/root/main_buttons/harts/hart_time").getComponent(cc.Label);
        this._coinsLabel.string = Global.UserData.coins;
        this._hartsLabel.string = Global.UserData.harts;
        this._playerPosition = cc.find("Canvas/root/main_buttons/side_menu/side_page/player_position");
        this._playerPosition.removeFromParent(false);
        this._playerNode = cc.find("Canvas/root/player");
        this._playerNode.removeFromParent(false);
        this.showDailyBonusButton();

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this, false);

    },

    onKeyDown: function (event) {
        cc.info(event, `onKeyDown: keyCode: ${JSON.stringify(event.keyCode)}`);

        switch(event.keyCode) {
            case cc.KEY.back: {
                if (cc.sys.isMobile) {
                    sdkbox.PluginAdMob.show('gameover');
                    sdkbox.PluginAdMob.setListener({
                        adViewDidDismissScreen: function(name) {
                            cc.director.end();
                        }
                    });
                }
            }
        }
    },

    checkDailyBonus: function () {
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        today = today.getTime();
        return Global.UserData.dailyBonusDate < today;
    },

    showDailyBonusButton: function () {
        let dailySpinner = cc.find("Canvas/root/main_buttons/daily_spinner");
        dailySpinner.active = this.checkDailyBonus();
    },

    updateHartTime: function () {
        let currentTimeMS = (new Date()).getTime();
        let delta = currentTimeMS - Global.UserData.hartResetTime;
        if (delta > Constants.NewHartInterval) {
            Global.UserData.harts++;
            if (Global.UserData.harts >= 5) {
                Global.UserData.harts = 5;
                this._hartsTimeLabel.string = "Full";
                this._hartsLabel.string = 5;
            }
            Global.UserData.hartResetTime = currentTimeMS;
            Global.UserData.save();
        }
        else if(Global.UserData.harts < 5){
            let oneMin = 60 * 1000;
            delta = Constants.NewHartInterval - delta;
            let min = Math.floor(delta / oneMin);
            let sec = Math.floor((delta - min * oneMin) / 1000);
            let timeText = `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`;
            this._hartsTimeLabel.string = timeText;
        }
        else{
            this._hartsTimeLabel.string = "Full";
        }
        this._hartsLabel.string = Global.UserData.harts;
    },

    initHartTime: function () {
        if (!Global.UserData.hartResetTime) {
            Global.UserData.hartResetTime = (new Date()).getTime();
            Global.UserData.save();
        }
        Global.UserData.hartResetTime = parseInt(Global.UserData.hartResetTime);
    },

    resetSection: function (deltaY) {
        const firstSubSectionNumber = this._firstSubSection % this._subSectionCount;
        const canvasHeight = 1280;
        let positionY = this.section.y + deltaY;

        if (positionY + this._subSectionHeight * 2 < canvasHeight) { // 내려갈때 한개의 싸브섹션이 화면에서 벗어났다.
            for (var i = 0; i < this._subSectionCount; i++) {
                this.section.children[i].y -= this._subSectionHeight;
            }
            const firstSubSection = this.section.getChildByName("sub_section_" + firstSubSectionNumber);
            firstSubSection.y = (this._subSectionCount - 1) * this._subSectionHeight;
            this.section.y += this._subSectionHeight;
            this._firstSubSection++;

            this.loadLevelsToSection(firstSubSection, this._firstSubSection + this._subSectionCount - 1);
        }
        else if (this._firstSubSection > 0 && positionY + this._subSectionHeight > canvasHeight) { // 올라갈때
            for (var i = 0; i < this._subSectionCount; i++) {
                this.section.children[i].y += this._subSectionHeight;
            }
            const lastSubSection = this.section.getChildByName("sub_section_" + (firstSubSectionNumber != 0 ? firstSubSectionNumber - 1 : this._subSectionCount - 1));
            lastSubSection.y = 0;
            this.section.y -= this._subSectionHeight;
            this._firstSubSection--; // = self._firstSubSection == 0 ? subSectionCount - 1 : self._firstSubSection - 1;

            this.loadLevelsToSection(lastSubSection, this._firstSubSection);
        }
    },

    onSectionTouchMove: function (delta) {
        this.delta = delta;
        if (this._firstSubSection <= 0 && delta.y > 0 && this.section.y + delta.y >= 0) {
            return;
        }

        this.resetSection(delta.y);
        this.section.y += delta.y;
        //var subSectionCount = self.section.childrenCount;
    },

    onSectionTouchEnd: function (event) {
        // const startPos = event.getStartLocation();
        // const endPosY = event.getLocationY();
        // cc.info(startPos, "start Position");
        // cc.info(event.getPreviousLocation(), "previous position");
        // cc.info(endPosY, "end Position");
        // cc.info(this.delta, "delta");
        if(this.section === undefined || this.section === null){
            return;
        }
        if(this.delta === undefined || this.delta === null){
            return;
        }

        const touchDirection = Math.sign(this.delta.y);
        const multiplier = 10;

        if (this._firstSubSection <= 0 && touchDirection > 0 && this.section.y + this.delta.y * multiplier >= 0) {
            return;
        }
        this.resetSection(this.delta.y * multiplier);
        // this.onSectionTouchMove(touchDirection * this._trailActionDistance);
        const trailAction = new cc.MoveTo(0.5, cc.p(this.section.x, this.section.y + this.delta.y * multiplier));
        trailAction.easing(cc.easeOut(3.0));
        //var seq = new cc.Sequence(trailAction);
        this.section.runAction(trailAction);
    },

    initLevelsMap: function () {
        let targetLevel = (Global.PlayingLevel != null && Global.PlayingLevel.levelNumber > 0) ? Global.PlayingLevel.levelNumber : Global.passedLevel;
        const levelsPerSection = this._levelsPerSubSection * this._subSectionCount;
        this._firstSubSection = Math.floor(targetLevel / levelsPerSection) * 4;
        let subSectionPos = Math.floor((targetLevel % levelsPerSection) / 10);
        this._unlockedSection = Math.floor(Global.passedLevel / this._levelsPerSubSection) + 1;
        this.section.y = -subSectionPos * this._subSectionHeight;
        for (let i = 0; i < this._subSectionCount; i++) {
            const subSection = this.section.getChildByName("sub_section_" + i);
            if (subSection) {
                this.loadLevelsToSection(subSection, this._firstSubSection + i);
            }
        }

    },

    moveLevelsMap: function (sideSectionNumber) {
        const self = this;

        const firstSectionNumber = sideSectionNumber * self._levelsPerSideItem / self._levelsPerSubSection;
        self._firstSubSection = firstSectionNumber;
        self._firstSubSection = Math.floor(firstSectionNumber / self._subSectionCount) * self._subSectionCount;
        const subSectionPos = (sideSectionNumber % 2) * 2;
        for (let i = 0; i < self._subSectionCount; i++) {
            const subSection = self.section.getChildByName("sub_section_" + i);
            if (subSection) {
                self.loadLevelsToSection(subSection, self._firstSubSection + i);
                subSection.y = i * self._subSectionHeight;
            }
        }
        self.section.y = -self._subSectionHeight - subSectionPos * self._subSectionHeight;

        const trailAction = new cc.MoveTo(0.5, cc.p(this.section.x, 0 - subSectionPos * self._subSectionHeight));
        trailAction.easing(cc.easeOut(3.0));

        // var finishFunc = new cc.callFunc(this.moveLevelsMap, this, sectionItem.sectionNumber);
        // var seq = new cc.Sequence(trailAction, finishFunc);
        this.section.runAction(trailAction);
    },

    initSubSectionNodes: function () {

    },

    showRewardedVideo: function() {
        if(cc.sys.isMobile) {
            sdkbox.PluginAdMob.show('rewarded');
        }
    },

    showInterstitial: function() {
        if(cc.sys.isMobile) {
            sdkbox.PluginAdMob.show('gameover');
        }
    },

    showInfo: function (info) {
        cc.info(info, "admob");
    },

    initAdmob: function(){
        if(cc.sys.isMobile) {
            let self = this;
            sdkbox.PluginAdMob.setListener({
                adViewDidReceiveAd: function(name) {
                    self.showInfo('adViewDidReceiveAd name=' + name);
                },
                adViewDidFailToReceiveAdWithError: function(name, msg) {
                    self.showInfo('adViewDidFailToReceiveAdWithError name=' + name + ' msg=' + msg);
                },
                adViewWillPresentScreen: function(name) {
                    self.showInfo('adViewWillPresentScreen name=' + name);
                },
                adViewDidDismissScreen: function(name) {
                    self.showInfo('adViewDidDismissScreen name=' + name);
                },
                adViewWillDismissScreen: function(name) {
                    self.showInfo('adViewWillDismissScreen=' + name);
                },
                adViewWillLeaveApplication: function(name) {
                    self.showInfo('adViewWillLeaveApplication=' + name);
                },
                reward: function(name){
                    Global.BuyCoinVideo = false;
                    Global.UserData.coins += 25;
                    Global.UserData.save();
                    // let priceDollar = Constants.CoinBuyUnits[coinsCount];
                    self._coinsLabel.string = Global.UserData.coins;

                }
            });
            sdkbox.PluginAdMob.init();
            sdkbox.PluginAdMob.show('home');
        }
    },

    initSideSections: function () {
        this._sideSectionsContent = cc.find("main_buttons/side_menu/side_page/scrollview/view/content", this.root);
        this._sideSectionItemTemp = this._sideSectionsContent.children[0];
        this._sideSectionItemTemp.removeFromParent();

        let playerPos = Math.floor(Global.passedLevel / this._levelsPerSideItem);
        this._playerPosition.getChildByName("level_number").getComponent(cc.Label).string = Global.passedLevel;

        // let i = 0, j = 0;
        let playerPosIndent = 0;
        for (let i = 0, j = 0; i < Constants.LevelsCount; i += this._levelsPerSideItem, j++) {
            if(j === playerPos){
                this._playerPosition.removeFromParent(false);
                this._sideSectionsContent.addChild(this._playerPosition);
                playerPosIndent = 1;
            }
            const node = this.getSideSectionItem(j + playerPosIndent);
            node.sectionNumber = j;
            node.getChildByName("star_number").getComponent(cc.Label).string = `${this.getSectionStarNumber(j)}/60`;
            let imageNumber = j - Math.floor(j / 6) * 6;
            node.getChildByName("image").getComponent(cc.Sprite).spriteFrame = this.gameUIAtlas.getSpriteFrame(`map_background_${imageNumber}`);
            node.getChildByName("side_item0").getComponent(cc.Sprite).spriteFrame = this.levelIcons.getSpriteFrame("side_item" + j % 2);
            node.getChildByName("label").getComponent(cc.Label).string = (i + 1) + " - " + (i + this._levelsPerSideItem);
        }
    },

    getSectionStarNumber: function(sectionNumber){
        let sectionStars = 0;
        for(let i = 1; i <= 20; i++){
            sectionStars += Global.UserData.getLevelStar(sectionNumber * 20 + i);
        }
        return sectionStars;
    },

    getSideSectionItem: function (index) {
        if (this._sideSectionsContent.childrenCount > index) {
            return this._sideSectionsContent.children[index];
        }
        const node = cc.instantiate(this._sideSectionItemTemp);
        this._sideSectionsContent.addChild(node);
        return node;
    },

    loadLevelsToSection: function (sectionNode, sectionNumber) {
        const cloudNode = sectionNode.getChildByName("clouds");
        if (cloudNode) {
            cloudNode.active = sectionNumber > this._unlockedSection;
        }
        for (let i = 0; i < 10; i++) {
            const levelNumber = sectionNumber * 10 + i + 1;
            const levelNode = cc.find("level_buttons/level_" + i, sectionNode);
            if (levelNode) {
                levelNode.getChildByName("label").getComponent(cc.Label).string = levelNumber;
                // cc.loader.loadRes(cc.url.res(this.getLevelIconFromNumber(levelNumber, true) + ".png"), function(err, data) {
                //     this.spriteFrame = new cc.SpriteFrame(data);
                // }.bind(levelNode.getComponent(cc.Sprite)));

                if(levelNumber == Global.passedLevel + 1){
                    if(this._playerNode.parent){
                        this._playerNode.removeFromParent();
                    }
                    levelNode.addChild(this._playerNode);
                    this._playerNode.y = 128;
                    this._playerNode.x = 0;
                    sectionNode.setLocalZOrder(555);
                    this._playerNode.runAction(cc.sequence([
                        cc.moveBy(1.2, 0, 20),
                        cc.moveBy(1.2, 0, -20)
                    ]).repeatForever());
                }
                levelNode.getComponent(cc.Button).interactable = levelNumber <= Global.passedLevel + 1;
                levelNode.getComponent(cc.Sprite).spriteFrame = this.levelIcons.getSpriteFrame(this.getLevelIconFromNumber(levelNumber, levelNumber <= Global.passedLevel + 1));
                let levelResult = Global.readLevelResult(levelNumber);
                if (levelResult != null) {

                    levelNode.getChildByName("stars").active = true;
                    let stars = Global.getStarScores(levelNumber);
                    cc.find("stars/star_1", levelNode).active = levelResult.score > Constants.Score1;
                    cc.find("stars/star_2", levelNode).active = levelResult.score > stars.score2;
                    cc.find("stars/star_3", levelNode).active = levelResult.score > stars.score3;
                }
                else {
                    levelNode.getChildByName("stars").active = false;
                }
            }
        }
    },

    getLevelIconFromNumber: function (levelNumber, passed) {
        const levelInfo = Global.AllLevels[levelNumber];
        if (levelInfo) {
            return passed == true ? levelInfo.level_type + "_1" : levelInfo.level_type;
        }
        else {
            return "7";
        }
    },

    onShowMiniMapClicked: function (event) {
        if (!this.root) {
            return;
        }
        this.toggleSideMenu();
    },

    toggleSideMenu: function () {

        let scrollView = cc.find("Canvas/root/main_buttons/side_menu/side_page/scrollview").getComponent(cc.ScrollView);
        // this._playerPosition.parent = content;

        let scrollPercent = this._firstSubSection * 10 / Constants.LevelsCount;
        scrollView.scrollToPercentVertical(scrollPercent);
        const sideMenu = cc.find("main_buttons/side_menu", this.root);
        const sideMoveAnim = sideMenu.getComponent(cc.Animation);

        if (sideMenu.x > 0) {
            var animState = sideMoveAnim.play("side_move");
            animState.wrapMode = cc.WrapMode.Normal;
        }
        else {
            var animState = sideMoveAnim.play("side_move");
            animState.wrapMode = cc.WrapMode.Reverse;
        }
    },

    onRateAppClicked: function () {
        if(cc.vv.anysdkMgr) {
            cc.vv.anysdkMgr.rateApp();
        }
    },

    onLevelBtnClicked: function (event) {
        if(this._levelSelected){
            return;
        }
        this._levelSelected = true;
        const levelNode = event.target;
        let splashNode = this.popups.getChildByName("splash");
        splashNode.active = true;
        const levelNumber = levelNode.getChildByName("label").getComponent(cc.Label).string;
        Global.loadLevel(levelNumber);
    },

    onMessageBoxClose: function () {
        this._popupMaskNode.active = false;
        let dlg = this.popups.getChildByName("message");
        dlg.active = false;
        let action = Global.createHidePopupAction();
        dlg.runAction(action);
    },

    onSideSectionItemClicked: function (event) {
        const sectionItem = event.target;
        this.moveLevelsMap(sectionItem.sectionNumber);
        this.toggleSideMenu();
    },

    onWatchVideoClicked: function (event) {
        Global.BuyCoinVideo = true;
        Global.increaseVideoWatched();
        this.showRewardedVideo();
        this.onCloseBuyCoinsClicked();
    },
    onWatchAdsClicked: function (event) {
        let coinsCount = 5;
        isNaN(coinsCount) && (coinsCount = 25);
        Global.UserData.coins += coinsCount;
        // let priceDollar = Constants.CoinBuyUnits[coinsCount];
        // cc.info(priceDollar, "buy coins price");
        this._coinsLabel.string = Global.UserData.coins;
        // let watchVideo = cc.find("Canvas/root/popups/fullscreen_ads");
        // watchVideo.active = true;
        // watchVideo.runAction(cc.fadeIn(0.5));
        Global.increaseAdsWatched();
        this.showInterstitial();
        this.onCloseBuyCoinsClicked();
    },

    onCloseBuyCoinsClicked: function () {
        this._popupMaskNode.active = false;
        const dlg = this.popups.getChildByName("buy_coins_popup");
        if (dlg) {
            let action = Global.createHidePopupAction();
            dlg.runAction(action);
        }
    },

    onCoinsClicked: function () {
        this._popupMaskNode.active = true;
        const dlg = this.popups.getChildByName("buy_coins_popup");
        if (dlg) {
            Global.initBuyCoinsPopup(dlg);
            dlg.active = true;
            let action = Global.createShowPopupAction();
            dlg.runAction(action);
        }
    },

    onCloseChargeHartsClicked: function () {
        this._popupMaskNode.active = false;
        const dlg = this.popups.getChildByName("charge_harts");
        if (dlg) {
            let action = Global.createHidePopupAction();
            dlg.runAction(action);
        }
    },

    onHartsClicked: function () {
        this._popupMaskNode.active = true;
        const dlg = this.popups.getChildByName("charge_harts");
        if (dlg) {
            dlg.active = true;
            let action = Global.createShowPopupAction();
            dlg.runAction(action);
        }
    },

    onCloseSettingsClicked: function (event) {
        this._popupMaskNode.active = false;
        const dlg = this.popups.getChildByName("settings");
        if (dlg) {
            let action = Global.createHidePopupAction();
            dlg.runAction(action);
        }
    },

    onSettingsClicked: function () {
        this._popupMaskNode.active = true;
        const dlg = this.popups.getChildByName("settings");
        if (dlg) {
            let action = Global.createShowPopupAction();
            dlg.getChildByName("music_button").getComponent(cc.Sprite).spriteFrame = this.uiAtlas.getSpriteFrame(
                Global.Settings.backgroundMusic == true ? "12" : "15"
            );
            dlg.getChildByName("sound_button").getComponent(cc.Sprite).spriteFrame = this.uiAtlas.getSpriteFrame(
                Global.Settings.soundFX == true ? "11" : "14"
            );

            dlg.active = true;
            dlg.runAction(action);
        }
    },

    onSettingsMusicClicked: function (event) {
        Global.Settings.backgroundMusic = !Global.Settings.backgroundMusic;
        Global.Settings.save();
        let bgMusicNode = cc.find("Canvas/root/popups/settings/music_button");
        bgMusicNode.getComponent(cc.Sprite).spriteFrame = this.uiAtlas.getSpriteFrame(
            Global.Settings.backgroundMusic ? "12" : "15"
        );
        Global.Settings.backgroundMusic ? Global.AudioManager.playBGM() : Global.AudioManager.pauseMusic();
    },

    onSettingsSoundClicked: function (event) {
        Global.Settings.soundFX = !Global.Settings.soundFX;
        Global.Settings.save();
        let bgMusicNode = cc.find("Canvas/root/popups/settings/sound_button");
        bgMusicNode.getComponent(cc.Sprite).spriteFrame = this.uiAtlas.getSpriteFrame(
            Global.Settings.soundFX ? "11" : "14"
        );
    },

    onSpinnerClicked: function () {
        this._popupMaskNode.active = true;
        let spinnerPopup = this.popups.getChildByName("daily_spinner");
        if(spinnerPopup){
            spinnerPopup.active = true;
            let action = Global.createShowPopupAction();
            spinnerPopup.runAction(action);
            let spinnerRotter = cc.find("daily_spinner/spinner/roter", this.popups);
            if(spinnerRotter){
                let action = cc.rotateBy(1, 360, 360).repeatForever();
                spinnerRotter.runAction(action);
            }
            let stopButton = cc.find("daily_spinner/stop_button", this.popups);
            stopButton.getComponent(cc.Button).interactable = true;
            let spinner = spinnerPopup.getChildByName("spinner");
            spinner.getComponent(cc.Animation).play();
        }
    },

    onSpinnerCloseClicked: function () {
        let spinnerPopup = this.popups.getChildByName("daily_spinner");
        this._popupMaskNode.active = false;
        if(spinnerPopup){
            let action = Global.createHidePopupAction();
            spinnerPopup.runAction(action);
        }
    },

    onSpinnerStopClicked: function () {
        let spinnerRotter = cc.find("daily_spinner/spinner/roter", this.popups);
        if(spinnerRotter){
            cc.find("Canvas/root/main_buttons/daily_spinner").active = false;
            let today = new Date();
            today.setHours(0, 0, 0, 0);
            Global.UserData.dailyBonusDate = today.getTime();
            Global.UserData.save();
            spinnerRotter.stopAllActions();
            let action = cc.rotateBy(4, 720, 720).easing(cc.easeSineOut());
            spinnerRotter.runAction(action);
            let spinner = cc.find("daily_spinner/spinner", this.popups);
            let spin = cc.find("daily_spinner/spinner/spin1", this.popups);
            let stopButton = cc.find("daily_spinner/stop_button", this.popups);
            stopButton.getComponent(cc.Button).interactable = false;

            let rotation = spinnerRotter.rotation;
            rotation = rotation - Math.floor(rotation / 360) * 360;
            let section = Math.floor(rotation / 45);
            cc.info(section, "daily spinner rotation");
            let bonusSprite = null;
            let dailyBonusEffectNode = cc.find("daily_spinner/daily_bonus", this.popups);
            let textureNode = dailyBonusEffectNode.getChildByName("texture");
            let label = textureNode.getChildByName("label");
            switch (section){
                case 0:
                case 4: // butterfly
                    bonusSprite = this.gameUIAtlas.getSpriteFrame("no_tittle_5");
                    label.active = false;
                    Global.UserData.availableBoosters[Enum.Boosters.Butterfly] ++;
                    break;
                case 1:
                case 5: // Cross
                    bonusSprite = this.gameUIAtlas.getSpriteFrame("no_tittle_4");
                    label.active = false;
                    Global.UserData.availableBoosters[Enum.Boosters.Line] ++;
                    break;
                case 2:
                case 6: // Coins
                    bonusSprite = this.gameUIAtlas.getSpriteFrame("coin");
                    label.active = true;
                    label.getComponent(cc.Label).string = 10;
                    Global.UserData.coins += 10;
                    break;
                case 3: // harts
                    bonusSprite = this.uiAtlas.getSpriteFrame("hart_unlimited");
                    label.active = true;
                    label.getComponent(cc.Label).string = "1 Hr";
                    break;
                case 7: // lamp
                    bonusSprite = this.figuresAtlas.getSpriteFrame("lamp_area");
                    label.active = false;
                    Global.UserData.availableBoosters[Enum.Boosters.Lamp] ++;
                    break;
            }

            Global.UserData.save();
            setTimeout(() => {
                this._coinsLabel.string = Global.UserData.coins;
                this._hartsLabel.string = Global.UserData.harts;

                spinner.getComponent(cc.Animation).stop();
                spin.rotation = 0;
                this.showDailyBonusAction(bonusSprite);
            }, 4 * 1000);
        }
    },

    onWatchVideoClosed: function () {
        let watchVideo = cc.find("Canvas/root/popups/watch_video");
        watchVideo.active = false;
    },

    onAdsCloseClicked: function () {
        let adsPopup = cc.find("Canvas/root/popups/fullscreen_ads");
        adsPopup.active = false;
    },

    showDailyBonusAction: function (bonusSprite) {
        let dailyBonusEffectNode = cc.find("daily_spinner/daily_bonus", this.popups);
        let textureNode = dailyBonusEffectNode.getChildByName("texture");
        textureNode.getComponent(cc.Sprite).spriteFrame = bonusSprite;
        dailyBonusEffectNode.active = true;
        dailyBonusEffectNode.getComponent(cc.Animation).play();
        setTimeout(() => {
            dailyBonusEffectNode.active = false;
            this.onSpinnerCloseClicked();
        }, 3 * 1000);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.updateHartTime();
    },
});
