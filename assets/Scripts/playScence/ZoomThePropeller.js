let dataControl = require('/cocosStudy/CarGame/assets/Scripts/dataController');
cc.Class({
    extends: cc.Component,

    properties: {
        theItmes: {
            type: cc.Prefab,
            default: [],
        },
        _index: 0,
        indexOfPlants: {
            type: cc.Integer,
            set(value) {
                if (value < 0) {
                    return;
                }
                this._index = value % this.theItmes.length;
                let thePropeller = cc.instantiate(this.theItmes[this._index]);
                thePropeller.parent = this.node;
                thePropeller.position = cc.v2(0, -this.node.height);
            },
            get() {
                return this._index;
            },
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() { },

    start() {
        this.indexOfPlants = dataControl.readTheChoose();
    },

    // update (dt) {},
});
