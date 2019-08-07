let dataControl = require('/cocosStudy/CarGame/assets/Scripts/dataController');
cc.Class({
    extends: cc.Component,

    properties: {
        theItmes: {
            type: cc.SpriteFrame,
            default: [],
        },
        _index: 0,
        indexOfPlants: {
            type: cc.Integer,
            set(value) {
                this._index = value;
                let sprite = this.node.getComponent(cc.Sprite);
                sprite.spriteFrame = this.theItmes[this._index];
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
