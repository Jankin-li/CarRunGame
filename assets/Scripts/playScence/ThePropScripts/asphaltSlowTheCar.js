cc.Class({
    extends: cc.Component,

    properties: {
        durtinTime: 1,
    },
    onCollisionEnter: function (other, self) {
        if (other.node.name == "car") {
            let move = other.node.getComponent('moving');
            move._isDecelerated = true;
        }
    },
    onCollisionExit(other, self) {
        if (other.node.name == "car") {
            let move = other.node.getComponent('moving');
            move._isDecelerated = false;
        }
    },
    // onLoad () {},

    start() {

    },

    // update (dt) {},
});
