
cc.Class({
    extends: cc.Component,

    properties: {
        theSpacialProp: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    theRadomLoadTheProp() {
        let theProp = cc.instantiate(this.theSpacialProp);
        theProp.parent = this.node;
        theProp.zIndex = 2;
        let radomIdex = Math.floor(Math.random() * 1000 % (this.arr.length));
        theProp.position = this.arr[radomIdex];
    },

    onLoad() {
        this.arr = [cc.v2(-240, this.node.height / 2),
        cc.v2(-80, this.node.height / 2),
        cc.v2(80, this.node.height / 2),
        cc.v2(240, this.node.height / 2)];
        let radom = Math.floor(Math.random() * 1000 % 10);
        if (radom < 5) {
            this.theRadomLoadTheProp();
        }
    },

    // update (dt) {},
});
