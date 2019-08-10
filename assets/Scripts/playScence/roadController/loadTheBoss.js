
cc.Class({
    extends: cc.Component,

    properties: {
        theSpacialProp: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    theRadomLoadTheProp() {
        this.theProp = cc.instantiate(this.theSpacialProp);
        this.theProp.parent = this.node;
        this.theProp.zIndex = 2;
        let radomIdex = Math.floor(Math.random() * 1000 % (this.arr.length));
        this.theProp.position = this.arr[radomIdex];
    },
    onCollisionEnter: function (other, self) {
        if (other.node.name == 'plant') {
            this.theRadomLoadTheProp();
            this.theProp.parent = this.node.parent;
        }
    },
    start() {

    },
    onLoad() {
        this.arr = [cc.v2(-240, this.node.height / 2),
        cc.v2(-80, this.node.height / 2),
        cc.v2(80, this.node.height / 2),
        cc.v2(240, this.node.height / 2)];
    },

    // update (dt) {},
});
