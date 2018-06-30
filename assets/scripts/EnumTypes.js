const Utils = require("Utils")
module.exports.GameState = cc.Enum({
    Idle: 0,
    TileMoving: 1,
    TileCrashing: 2,
    SquareCrushing: 3,
    Shuffling: 4,
    Collecting: 5,
});

module.exports.TileKind = cc.Enum({
    Tile: "tile",
    Figure: "fig",
    Swirl: "swirl",
    CountStone: "count_stone",
    Ground: "ground",
    Teleport: "teleports",
    Milk: "milk",
    Mark: "mark",
    MarkLock: "mark_lock",
    Relic: "relic",
    WishingWell: "wishing_well",
    OfferingBase: "offering_base"
});

module.exports.WishingWellTypes = cc.Enum({
    WishingPaw: "wishing_well_paw",
    WishingLine: "wishing_well_line",
    WishingX: "wishing_well_x",
    WishingButterfly: "wishing_well_butterfly",
    WishingKey: "wishing_well_key",
    WishingRainbow: "wishing_well_rainbow",
    WishingBomb: "wishing_well_bomb"
});
Utils.makeEnum(module.exports.WishingWellTypes);

module.exports.BonusTypes = cc.Enum({
    HBonus: "hbonus_area",
    VBonus: "vbonus_area",
    XBonus: "xbonus_area",
    Square: "squarebomb_area",
    Bomb: "bomb_area",
    Lamp: "lamp_area",
    Normal: "normal"
});
Utils.makeEnum(module.exports.BonusTypes);

module.exports.WayValues = cc.Enum({
    WayStartBottom: "way_start_bottom",
    WayStartTop: "way_start_top",
    WayStartLeft: "way_start_left",
    WayStartRight: "way_start_right",
    WayRightBottom: "way_right_bottom",
    WayLeftRight: "way_left_right",
    WayLeftBottom: "way_left_bottom",
    WayTopBottom: "way_top_bottom",
    WayRightTop: "way_right_top",
    WayLeftTop: "way_left_top",
});

module.exports.WayKeyPoints = cc.Enum({
    WayStart: "way_start",
    WayFinish: "way_finish"
});

module.exports.LevelTypes = cc.Enum({
    FoxWay: 7,
    Gold: 6,
    Box: 4,
    Relic: 2,
    Key: 5
});

module.exports.LevelDifficulty = cc.Enum({
    SuperEasy: "Super Easy",
    Easy: "Easy",
    Difficult: "Difficult",
});

module.exports.Boosters = cc.Enum({
    Lamp: "lamp",
    Line: "line",
    Butterfly: "butterfly"
});