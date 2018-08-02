
//noinspection JSUnresolvedFunction
const Enum = require("EnumTypes");

cc.Class({
    extends: cc.Component,

    statics:{

        version: "android 1.1.4",

        // item prices
        ItemPrices: {
            lamp: 60,
            line: 45,
            butterfly: 25,
        },

        ItemBuyUnits: {
            lamp: 3,
            line: 3,
            butterfly: 3,
        },

        CoinBuyUnits: { // coins : dollars
            25: 1,
            135: 5,
            275: 10
        },

        NewHartInterval: 30 * 60 * 1000, // 30 minutes as millisecond

        // Buy Item Popup details
        BuyItemDetails: {
            lamp: "Gilded Rainbow wishes away one color!",
            line: "Gilded Cross destroys a row and column!",
            butterfly: "Gilded Butterfly targets any single element!",
        },

        MagicTimeParticlesPos: [
            {x:200, y:200},
            {x:-70, y:200},
            {x:30, y:100},
        ],

        ADShowLevel: 100,
        ADSWatchCountPerDay: 10,
        LevelsCount: 1720,
        MaxCrushTileUnit: 1,
        MaxRunningActions: 5,

        // Action Tags
        TILE_MOVE_ACTION: 10001,
        TILE_HINT_ACTION: 10002,

        UndefinedNotPassLevels: [5, 59, 61, 93, 104, 546, 746, 1208, 1678, 1710],

        TeleportLoop: [1202],

        MovableTiles: ["fig1", "fig2", "fig3", "fig4", "fig5", "fig9", "lamp_area"],
        AvailableCrushTiles: [Enum.TileKind.CountStone, Enum.TileKind.Ground],
        CanConveyTiles: [Enum.TileKind.WishingWell, Enum.TileKind.OfferingBase],
        NotAffectedBonusTiles: ["lamp_area", "relic"],
        IgnoreLayers: ["scroll"],
        LargeTiles: {
            door_teleport: {w: 2, h: 2, dx: 0, dy: 0},
            door_teleport_dest: {w: 2, h: 2, dx: 0, dy: 0},
            mono_color_pie_large: {w: 2, h: 2, dx: 0, dy: 1},
            mark_3x5: {w: 3, h: 5, dx: 0, dy: 1},
            mark_2x3: {w: 2, h: 3, dx: 0, dy: 1},
            mark_2x2: {w: 2, h: 2, dx: 0, dy: 1},
            mark_3x3: {w: 3, h: 3, dx: 0, dy: 1},
            mark_3x4: {w: 3, h: 4, dx: 0, dy: 1},
            mark_1x2: {w: 1, h: 2, dx: 0, dy: 1},
            mark_2x1: {w: 2, h: 1, dx: 0, dy: 1},
            mark_3x2: {w: 3, h: 2, dx: 0, dy: 1},
            way_start: {w:1, h: 1.5, dx: 0, dy: 0}
        },
        MapSize: {width: 9, height: 9},
        TileSize: 79,
        PageSpacing: {col: 4, row: 0},
        FallTileTime: 0.14,

        // Tile names arrays
        SkipFiguresArray: ["dig_ground", ""],
        BonusFigureNamesArray: ["fig1", "fig2", "fig3", "fig4", "fig5", "fig9"],
        MatchableArray: ["fig1", "fig2", "fig3", "fig4", "fig5", "fig9", "bonus2_h"],
        FigureNamesArray: ["fig1", "fig2", "fig3", "fig4", "fig5", "fig9", "bonus2_h", "swirl", "swirl_2", "swirl_3", "swirl_4", "swirl_5"],
        CountStoneNamesArray: ["count_stone_1", "count_stone_2", "count_stone_3", "count_stone_4", "count_stone_5"],

        // custom event identifiers
        TILE_MOVED: "TILE_MOVED",
        TILE_CRUSHED: "TILE_CRUSHED",
        FORCE_WAY_COLLECTED: "FORCE_WAY_COLLECTED",
        FIGURE_DESTROYED: "FIGURE_DESTROYED",
        KEY_COLLECTED: "KEY_COLLECTED",
        GOLD_COLLECTED: "GOLD_COLLECTED",
        GROUND_DESTROYED: "GROUND_DESTROYED",
        MILK_DESTROYED: "MILK_DESTROYED",
        MARK_LOCK_DESTROYED: "MARK_LOCK_DESTROYED",
        MARK_COLLECTED: "MARK_COLLECTED",
        RELIC_COLLECTED: "RELIC_COLLECTED",
        WISHING_WELL_FULL: "WISHING_WELL_FULL",
        CHECK_MATCH: "CHECK_MATCH",
        SNAKE_DESTROYED: "SNAKE_DESTROYED",
        COLOR_PIE_FULL: "COLOR_PIE_FULL",
        WEED_STRIPPED: "WEED_STRIPPED",
        BOOSTER_CRUSHED: "BOOSTER_CRUSHED",
        OFFERING_BASE_FULL: "OFFERING_BASE_FULL",

        // grid specific tile identifiers
        HOLE: "HOLE",
        FOX_POS: "FOX_POS",
        FOX_END_POS: "FOX_END_POS",
        DOOR_TELEPORT: "door_teleport_dest",
        DOOR_TELEPORT_SMALL_DEST: "door_teleport_small_dest",
        DOOR_TELEPORT_SMALL: "door_teleport_small",
        CHAIN_HOLD: "CHAIN_HOLD",
        CHAIN_FREE: "CHAIN_FREE",
        MARK_LOCK_FREE: "MARK_LOCK_FREE",

        // custom components names
        ScoreManagerName: "ScoreManager",
        TileScriptName: "Tile",
        FigureScriptName: "FigureTile",
        FigureBonusScriptName: "FigureBonusTile",
        CountStoneScriptName: "CountStoneTile",
        ForceWayScriptName: "ForceWayTile",
        WayScriptName: "WayTile",
        DoorTeleportSccriptName: "DoorTeleport",
        KeyScriptName: "KeyTile",
        GroundScriptName: "GroundTile",
        MilkScriptName: "MilkTile",
        MarkLockScriptName: "MarkLockTile",
        MarkScriptName: "MarkTile",
        RelicScriptName: "RelicTile",
        SwirlScriptName: "SwirlTile",
        BackgroundTile: "BackgroundTile",
        WishingWellScriptName: "WishingWellTile",
        ColorPieScriptName: "ColorPieTile",
        AudioManagerName: "AudioMgr",
        DoorTeleportSmallScriptName: "DoorTeleportSmallTile",
        MorphScriptName: "MorphTile",
        OfferingBaseScriptName: "OfferingBaseTile",

        // layer names
        BackgroundLayerName: "background",
        FiguresLayerName: "figures",
        WayLayerName: "way",
        WayKeyPointsLayerName: "way_key_points",
        GeneratorsLayerName: "generators",
        FiguresChains: "figures_chains",
        DoorTeleportsLayerName: "items",
        TeleportsLayerName: "teleports",
        MilksLayerName: "milk",
        MarkLockLayerName: "stamps_cover1",
        MarkLayerName: "stamps",
        PickupsLayerName: "pickup",
        ConveyorLayerName: "conveyor",
        ScrollLayerName: "scroll",

        // node names
        ChainNodeName: "chains",
        MysteryNodeName: "mystery_piece_holder",
        SnakeNodeName: "snake_1",

        // AdMob names
        AdMobHome: "home",
        AdMobGameOver: "gameover",
        AdMobNextLevel: "next_level",
        AdMobTopBanner: "top_banner",
        AdMobRewarded: "rewarded",

        // score units
        ScoreUnits: {
            obstacle: 20,
            normal: 60,
            gold: 1020,
            jewel_box: 10000,
            remain_move: 5000,
            hbonus_area: 120,
            vbonus_area: 120,
            xbonus_area: 200,
            squarebomb_area: 140,
            bomb_area: 200,
            lamp_area: 200,
            mark: 1000,
            relic: 10000,
        },
        Score1: 10000,

        NearByDirects: [[-1, 0], [0, -1], [1, 0], [0, 1]],
        // way directions
        WayAvailableDir: {
            "way_start_bottom": ["bottom"],
            "way_start_top": ["top"],
            "way_start_left": ["left"],
            "way_start_right": ["right"],
            "way_right_bottom": ["right", "bottom"],
            "way_left_right": ["left", "right"],
            "way_left_bottom": ["left", "bottom"],
            "way_top_bottom": ["top", "bottom"],
            "way_right_top": ["right", "top"],
            "way_left_top": ["left", "top"]
        },
        WayDirValue: { // [col, row]
            bottom: {col:0, row:1},
            top: {col:0, row:-1},
            left: {col:-1, row:0},
            right: {col:1, row:0}
        },

        OfferingBaseAffectFigures: ["fig3", "fig4", "fig9"],

        InvertDirs: {
            bottom: "top",
            top: "bottom",
            left: "right",
            right: "left"
        },

        FoxAnimationTimes: {
            ready: 0.1,
            jump: 0.5,
            end: 0.1,
            cry: 1.5
        },

        MysteryConst: {
            crushX: -23,
            crushY: -155,
            piece1X: -6,
            piece1Y: -88,
            piece2X: -48,
            piece2Y: -50,
        },

        AvailableMoves: [
            [[0, 1], [1, 2], [0, 2], [1, 2]],
            [[0, 1], [-1, 2], [0, 2], [-1, 2]],
            [[0, -1], [1, -2], [0, -2], [1, -2]],
            [[0, -1], [-1, -2], [0, -2], [-1, -2]],
            [[1, 0], [2, 1], [2, 0], [2, 1]],
            [[1, 0], [2, -1], [2, 0], [2, -1]],
            [[-1, 0], [-2, 1], [-2, 0], [-2, 1]],
            [[-1, 0], [-2, -1], [-2, 0], [-2, -1]],
            [[1, 1], [1, -1], [1, 0], [0, 0]],
            [[-1, 1], [-1, -1], [-1, 0], [0, 0]],
            [[1, 1], [-1, 1], [0, 1], [0, 0]],
            [[1, -1], [-1, -1], [0, -1], [0, 0]],
            [[0, 1], [0, -2], [0, -1], [0, -2]],
            [[0, -1], [0, 2], [0, 1], [0, 2]],
            [[1, 0], [-2, 0], [-1, 0], [-2, 0]],
            [[-1, 0], [2, 0], [1, 0], [2, 0]],
            // [[0, -1], [1, 1], [0, 1], [1, 1]],
            // [[0, -1], [-1, 1], [0, 1], [-1, 1]]
        ],

        ConveyorDirections: {
            "mover_1": {
                out: [1, 0],
                in: [0, 1]
            },
            "mover_1_ccw": {
                in: [1, 0],
                out: [0, 1]
            },
            "mover_2": {
                in: [-1, 0],
                out: [1, 0]
            },
            "mover_2_ccw": {
                out: [-1, 0],
                in: [1, 0]
            },
            "mover_3": {
                out: [0, 1],
                in: [-1, 0]
            },
            "mover_3_ccw": {
                in: [0, 1],
                out: [-1, 0]
            },
            "mover_4": {
                in: [0, -1],
                out: [0, 1]
            },
            "mover_4_ccw": {
                out: [0, -1],
                in: [0, 1]
            },
            "mover_5": {
                in: [0, -1],
                out: [-1, 0]
            },
            "mover_5_ccw": {
                out: [0, -1],
                in: [-1, 0]
            },
            "mover_6": {
                in: [1, 0],
                out: [0, -1]
            },
            "mover_6_ccw": {
                out: [1, 0],
                in: [0, -1]
            },
        },

        GroundMap:{
            "000 011 000": "ground_01",
            "001 011 000": "ground_01",
            "001 011 001": "ground_01",
            "000 011 001": "ground_01",
            "100 011 000": "ground_01",
            "101 011 000": "ground_01",
            "101 011 001": "ground_01",
            "100 011 001": "ground_01",
            "000 011 100": "ground_01",
            "001 011 100": "ground_01",
            "001 011 101": "ground_01",
            "000 011 101": "ground_01",
            "100 011 100": "ground_01",
            "101 011 100": "ground_01",
            "101 011 101": "ground_01",
            "100 011 101": "ground_01",

            "000 111 111": "ground_02",
            "001 111 111": "ground_02",
            "101 111 111": "ground_02",
            "100 111 111": "ground_02",

            "000 111 010": "ground_03",
            "100 111 010": "ground_03",
            "001 111 010": "ground_03",
            "101 111 010": "ground_03",

            "000 110 000": "ground_04",
            "100 110 000": "ground_04",
            "000 110 100": "ground_04",
            "100 110 100": "ground_04",
            "001 110 000": "ground_04",
            "101 110 000": "ground_04",
            "001 110 100": "ground_04",
            "101 110 100": "ground_04",
            "000 110 001": "ground_04",
            "100 110 001": "ground_04",
            "000 110 101": "ground_04",
            "100 110 101": "ground_04",
            "001 110 001": "ground_04",
            "101 110 001": "ground_04",
            "001 110 101": "ground_04",
            "101 110 101": "ground_04",

            "010 010 010": "ground_05",
            "110 010 010": "ground_05",
            "111 010 010": "ground_05",
            "011 010 010": "ground_05",
            "110 010 110": "ground_05",
            "111 010 110": "ground_05",
            "011 010 110": "ground_05",
            "010 010 110": "ground_05",
            "110 010 111": "ground_05",
            "111 010 111": "ground_05",
            "011 010 111": "ground_05",
            "010 010 111": "ground_05",
            "110 010 011": "ground_05",
            "111 010 011": "ground_05",
            "011 010 011": "ground_05",
            "010 010 011": "ground_05",

            "000 011 011": "ground_06",
            "000 011 111": "ground_06",
            "001 011 011": "ground_06",
            "001 011 111": "ground_06",
            "100 011 011": "ground_06",
            "100 011 111": "ground_06",
            "101 011 011": "ground_06",
            "101 011 111": "ground_06",

            "000 110 110": "ground_07",
            "100 110 110": "ground_07",
            "100 110 111": "ground_07",
            "000 110 111": "ground_07",
            "001 110 110": "ground_07",
            "101 110 110": "ground_07",
            "101 110 111": "ground_07",
            "001 110 111": "ground_07",

            "010 111 111": "ground_08",

            "011 111 111": "ground_09",

            "011 011 011": "ground_10",
            "111 011 011": "ground_10",
            "111 011 111": "ground_10",
            "011 011 111": "ground_10",

            "110 110 110": "ground_11",
            "111 110 110": "ground_11",
            "111 110 111": "ground_11",
            "110 110 111": "ground_11",

            "111 010 000": "ground_12",
            "110 010 000": "ground_12",
            "011 010 000": "ground_12",
            "010 010 000": "ground_12",
            "111 010 100": "ground_12",
            "110 010 100": "ground_12",
            "011 010 100": "ground_12",
            "010 010 100": "ground_12",
            "111 010 101": "ground_12",
            "110 010 101": "ground_12",
            "011 010 101": "ground_12",
            "010 010 101": "ground_12",
            "111 010 001": "ground_12",
            "110 010 001": "ground_12",
            "011 010 001": "ground_12",
            "010 010 001": "ground_12",

            "111 111 000": "ground_13",
            "111 111 100": "ground_13",
            "111 111 101": "ground_13",
            "111 111 001": "ground_13",

            "110 110 000": "ground_14",
            "111 110 000": "ground_14",
            "110 110 100": "ground_14",
            "111 110 100": "ground_14",
            "110 110 001": "ground_14",
            "111 110 001": "ground_14",
            "110 110 101": "ground_14",
            "111 110 101": "ground_14",

            "011 011 000": "ground_15",
            "111 011 000": "ground_15",
            "111 011 001": "ground_15",
            "011 011 001": "ground_15",
            "011 011 100": "ground_15",
            "111 011 100": "ground_15",
            "111 011 101": "ground_15",
            "011 011 101": "ground_15",

            "000 111 000": "ground_16",
            "100 111 000": "ground_16",
            "101 111 000": "ground_16",
            "001 111 000": "ground_16",
            "000 111 100": "ground_16",
            "100 111 100": "ground_16",
            "101 111 100": "ground_16",
            "001 111 100": "ground_16",
            "000 111 101": "ground_16",
            "100 111 101": "ground_16",
            "101 111 101": "ground_16",
            "001 111 101": "ground_16",
            "000 111 001": "ground_16",
            "100 111 001": "ground_16",
            "101 111 001": "ground_16",
            "001 111 001": "ground_16",

            "000 010 010": "ground_17",
            "000 010 110": "ground_17",
            "000 010 111": "ground_17",
            "000 010 011": "ground_17",
            "100 010 010": "ground_17",
            "100 010 110": "ground_17",
            "100 010 111": "ground_17",
            "100 010 011": "ground_17",
            "001 010 010": "ground_17",
            "001 010 110": "ground_17",
            "001 010 111": "ground_17",
            "001 010 011": "ground_17",
            "101 010 010": "ground_17",
            "101 010 110": "ground_17",
            "101 010 111": "ground_17",
            "101 010 011": "ground_17",

            "110 111 111": "ground_18",

            "000 010 000": "ground_19",
            "100 010 000": "ground_19",
            "001 010 000": "ground_19",
            "101 010 000": "ground_19",
            "000 010 001": "ground_19",
            "100 010 001": "ground_19",
            "001 010 001": "ground_19",
            "101 010 001": "ground_19",
            "000 010 101": "ground_19",
            "100 010 101": "ground_19",
            "001 010 101": "ground_19",
            "101 010 101": "ground_19",
            "000 010 100": "ground_19",
            "100 010 100": "ground_19",
            "001 010 100": "ground_19",
            "101 010 100": "ground_19",

            "111 111 111": "ground_20",

            "111 011 010": "ground_21",
            "011 011 010": "ground_21",
            "111 011 110": "ground_21",
            "011 011 110": "ground_21",

            "110 011 010": "ground_22",
            "010 011 010": "ground_22",
            "110 011 110": "ground_22",
            "010 011 110": "ground_22",

            "000 011 010": "ground_23",
            "001 011 010": "ground_23",
            "000 011 110": "ground_23",
            "001 011 110": "ground_23",
            "100 011 010": "ground_23",
            "101 011 010": "ground_23",
            "100 011 110": "ground_23",
            "101 011 110": "ground_23",

            "010 011 000": "ground_24",
            "110 011 000": "ground_24",
            "010 011 001": "ground_24",
            "110 011 001": "ground_24",
            "010 011 100": "ground_24",
            "110 011 100": "ground_24",
            "010 011 101": "ground_24",
            "110 011 101": "ground_24",

            "110 011 011": "ground_25",
            "110 011 111": "ground_25",
            "010 011 011": "ground_25",
            "010 011 111": "ground_25",

            "110 111 000": "ground_26",
            "110 111 100": "ground_26",
            "110 111 101": "ground_26",
            "110 111 001": "ground_26",

            "010 110 111": "ground_27",
            "010 110 110": "ground_27",
            "011 110 111": "ground_27",
            "011 110 110": "ground_27",

            "000 111 011": "ground_28",
            "100 111 011": "ground_28",
            "101 111 011": "ground_28",
            "001 111 011": "ground_28",

            "011 111 000": "ground_29",
            "011 111 100": "ground_29",
            "011 111 101": "ground_29",
            "011 111 001": "ground_29",

            "110 110 010": "ground_30",
            "110 110 011": "ground_30",
            "111 110 010": "ground_30",
            "111 110 011": "ground_30",

            "000 111 110": "ground_31",
            "100 111 110": "ground_31",
            "101 111 110": "ground_31",
            "001 111 110": "ground_31",

            "111 111 110": "ground_32",

            "111 111 011": "ground_33",

            "010 110 000": "ground_34",
            "011 110 000": "ground_34",
            "010 110 100": "ground_34",
            "011 110 100": "ground_34",
            "010 110 001": "ground_34",
            "011 110 001": "ground_34",
            "010 110 101": "ground_34",
            "011 110 101": "ground_34",

            "000 110 010": "ground_35",
            "100 110 010": "ground_35",
            "000 110 011": "ground_35",
            "100 110 011": "ground_35",
            "001 110 010": "ground_35",
            "101 110 010": "ground_35",
            "001 110 011": "ground_35",
            "101 110 011": "ground_35",

            "010 111 000": "ground_36",
            "010 111 100": "ground_36",
            "010 111 001": "ground_36",
            "010 111 101": "ground_36",

            "010 110 010": "ground_37",
            "011 110 010": "ground_37",
            "010 110 011": "ground_37",
            "011 110 011": "ground_37",

            "110 111 110": "ground_38",
            "111 111 010": "ground_39",
            "011 111 011": "ground_40",
            "011 111 110": "ground_41",
            "110 111 011": "ground_42",
            "011 111 010": "ground_43",
            "010 111 011": "ground_44",
            "010 111 110": "ground_45",
            "110 111 010": "ground_46",
            "010 111 010": "ground_43",
        }
    },
});
