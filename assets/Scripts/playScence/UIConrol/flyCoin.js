
cc.Class({
    extends: cc.Component,

    properties: {
        theFlyCoin: cc.Prefab,
        UIcoin: cc.Node,
        runningCa: cc.Node,
    },

    instantiateTheFlyCoin(pos) {
        let flycoin = cc.instantiate(this.theFlyCoin);
        let cameraPos = this.runningCa.getComponent(cc.Camera).getWorldToCameraPoint(pos);
        let startPos = this.node.convertToNodeSpaceAR(cameraPos);
        flycoin.parent = this.node;
        flycoin.position = startPos;
        let endPos = cc.v2(99, 572);
        let moveTo = cc.moveTo(2, endPos);
        flycoin.runAction(cc.sequence(moveTo, cc.delayTime(1), cc.callFunc(() => {
            flycoin.destroy();
        })));
    },
    start() {
        cc.director.on('coinGetOne', (value, pos) => {
            this.instantiateTheFlyCoin(pos);
        }, this);
    },
    onDestroy() {
        cc.director.targetOff(this);
    }
});