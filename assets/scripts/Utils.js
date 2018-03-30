cc.Class({
    extends: cc.Component,

    statics: {
        makeEnum: function makeEnum(enumObject) {
            let all = [];
            for (let key in enumObject) {
                all.push(enumObject[key]);
            }
            enumObject.all = all;
        }
    },

    properties: {},

    addClickEvent: function (node, target, component, handler) {
        var eventHandler = new cc.Component.EventHandler();

        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;

        var clickEvents = node.getComponent(cc.Button).clickEvents;

        clickEvents.push(eventHandler);
    },

    addSlideEvent: function (node, target, component, handler) {
        var eventHandler = new cc.Component.EventHandler();

        eventHandler.target = target;
        eventHandler.component = component;
        eventHandler.handler = handler;

        var slideEvents = node.getComponent(cc.Slider).slideEvents;

        slideEvents.push(eventHandler);
    }
});
