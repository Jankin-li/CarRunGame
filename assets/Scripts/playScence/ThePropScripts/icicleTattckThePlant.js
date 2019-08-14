cc.Class({
    extends: cc.Component,

    properties: {
        _theProgress: cc.v2(0, 0),
        theIceDropSpeed: 3,
    },

    // LIFE-CYCLE CALLBACKS:

    onCollisionEnter: function (other, self) {
        if (other.node.name == 'plant') {
            other.node.destroy();
        }
    },
    onLoad() {
        cc.director.on('moveTheIce', (valueY, x) => {
            this._theProgress = cc.v2(x, valueY);
        }, this);
    },
    onDestroy() {
        cc.director.targetOff(this);
    },
    start() {
    },
    // // //控制冰锥朝向地球
    // lookAtObj(target) {
    //     let comVec = cc.v2(0, 1);    // 竖直向上的方向向量
    //     let subvv = this.node.position.sub(target);
    //     let radian = subvv.signAngle(comVec);    // 求弧度
    //     let degree = cc.misc.radiansToDegrees(radian);    // 转换成角度
    //     return degree;
    // },
    update(dt) {
        this.node.y -= this.theIceDropSpeed;
    },
});
