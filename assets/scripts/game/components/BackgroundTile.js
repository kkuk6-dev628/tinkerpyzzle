cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {

    },

    setBorder: function (borderArray, zOrder) {
        zOrder && this.node.setLocalZOrder(zOrder);
        for(let i = 0; i < 4; i++){
            let border = this.node.getChildByName(`border_${i}`);
            border.active = borderArray[i];
        }
    }
    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
