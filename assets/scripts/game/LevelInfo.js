
//noinspection JSUnresolvedFunction
const Enum = require("EnumTypes");

cc.Class({
    extends: cc.Component,

    properties: {
        levelNumber: 0,
        levelType: {
            default: Enum.LevelTypes.FoxWay,
            type: Enum.LevelTypes
        },
        levelDifficulty: {
            default: Enum.LevelDifficulty.SuperEasy,
            type: Enum.LevelDifficulty
        },
        levelDescription: "Description of this level.",
        levelCompleted: false,
        moveNumber: 30,
        score2: 37900,
        score3: 50700,
        spawnBoot: 0,
        spawnKey: 0,
        keyCount: 0,
        score:0,
        oldScore: 0,
        levelMap: null,
        notMoveGenerators: false,
        customProps: [],
    },

    onLoad: function () {
    },

    saveResult: function () {
        let saveData = {
            score: this.score,
        };
        let levelResult = cc.sys.localStorage.getItem(this.levelNumber);
        if(levelResult){
            levelResult = JSON.parse(levelResult);
            let oldScore = parseInt(levelResult.score);
            if(oldScore < this.score){
                cc.sys.localStorage.setItem(this.levelNumber, JSON.stringify(saveData));
            }
        }
        else{
            cc.sys.localStorage.setItem(this.levelNumber, JSON.stringify(saveData));
        }
    },

    loadLevelFromFile: function (levelNumber, callback) {
        this.levelNumber = levelNumber;
        let levelResult = cc.sys.localStorage.getItem(this.levelNumber);
        if(levelResult){
            levelResult = JSON.parse(levelResult);
            this.oldScore = parseInt(levelResult.score);
        }
        const levelFileName = 'level1-' + levelNumber + '.json';
        const url = cc.url.raw('resources/data/levels/' + levelFileName);
        let self = this;
        cc.loader.load(url, function (err, res) {
            // cc.log( 'load['+ url +'], err['+err+'] result: ' + JSON.stringify( res ) );
            let customProps = res.CustomProps.data;
            for(let i in customProps){
                self.customProps[customProps[i]["DocID"].toLowerCase()] = customProps[i]["PropVal"].toLowerCase();
                if(customProps[i]["DocID"].indexOf("door") > -1){
                    if(self.smallDoorTeleports == undefined){
                        self.smallDoorTeleports = [];
                    }
                    let values = customProps[i]["PropVal"].split(",");
                    self.smallDoorTeleports.push({
                        keysCount: parseInt(values[0]),
                        start: {col: parseInt(values[1]), row: parseInt(values[2])},
                        dest: {col: parseInt(values[3]), row: parseInt(values[4])}
                    });
                }
            }

            self.levelType = self.customProps["level_type_1"] == 7 ? Enum.LevelTypes.Key : self.customProps["level_type"];
            self.levelType = parseInt(self.levelType);
            self.moveNumber = self.customProps["num_moves"];
            self.score2 = parseInt(self.customProps["score_2"]);
            self.score3 = parseInt(self.customProps["score_3"]);
            self.levelDescription = self.customProps["description"];
            self.difficulty = self.customProps["difficulty"];
            self.spawnBoot = parseFloat(self.customProps["spawn_boot"]);
            self.spawnGlass1 = parseFloat(self.customProps["spawn_glass_1"]);
            self.spawnGlass2 = parseFloat(self.customProps["spawn_glass_2"]);
            if(isNaN(self.spawnGlass2)){
                self.spawnGlass2 = parseFloat(self.customProps["spwan_glass_2"]);
            }
            self.spawnGlass3 = parseFloat(self.customProps["spawn_glass_3"]);
            self.spawnGlass4 = parseFloat(self.customProps["spawn_glass_4"]);
            self.spawnGlass5 = parseFloat(self.customProps["spawn_glass_5"]);
            self.spawnMMPPPaw = parseFloat(self.customProps["spawn_mmpp_paw"]);
            self.spawnGooBomb = parseFloat(self.customProps["spawn_goobomb"]);
            self.keyCount = parseFloat(self.customProps["tool2_count"]);
            self.spawnKey = parseFloat(self.customProps["spawn_key"]);
            if(isNaN(self.spawnKey)){
                self.spawnKey = parseFloat(self.customProps["spawn_keys"]);
            }
            self.notMoveGenerators = self.customProps["dont_move_generators"];

            self.dropDownRelics = parseInt(self.customProps["drop_down_relics"]);
            self.movesToFirstRelic = parseInt(self.customProps["moves_to_first_relic"]);
            self.movesToNextRelic = parseInt(self.customProps["moves_to_next_relic"]);
            self.startDropDownRelics = parseInt(self.customProps["start_drop_down_relics"]);
            self.levelMap = res.LevelMap;

            callback(res);
        });
    },
});
