cc.Class({
    extends: cc.Component,

    properties: {
        roadPrefab: {
            type: cc.Prefab,
            default: [],
        },

    },

    onCollisionEnter: function (other, self) {
        cc.log("The Car Enter The Road!");
        if (other.node.name == 'plant') {
            let move = other.node.getComponent('moving');
            if (move._runLength < 6) {
                this.generateNomalRoad();
                move._runLength += 1;
            }
            else {
                this.generateChangeToNextRoad();
            }
        }
    },

    onCollisionExit: function (other, self) {
        console.log('on collision exit');
        if (other.node.name == 'plant') {
            let callBack = cc.callFunc(() => {
                this.node.destroy();
            });
            let lateTime = cc.delayTime(3);
            let actionSq = cc.sequence(lateTime, callBack);
            this.node.runAction(actionSq);
        }
    },
    // LIFE-CYCLE CALLBACKS:

    generateNomalRoad() {
        let indexOfRoad = Math.floor(Math.random() * 1000 % (this.roadPrefab.length));
        if (indexOfRoad == this.roadPrefab.length) {
            this.generateNomalRoad();
            return;
        }
        let theRoad = cc.instantiate(this.roadPrefab[indexOfRoad]);
        theRoad.parent = this.node.parent;
        let generatePos = cc.v2(this.node.x, this.node.y + this.node.height);
        theRoad.position = generatePos;
    },

    generateChangeToNextRoad() {
        let theRoad = cc.instantiate(this.roadPrefab[this.roadPrefab.length - 1]);
        theRoad.parent = this.node.parent;
        let generatePos = cc.v2(this.node.x, this.node.y + this.node.height);
        theRoad.position = generatePos;
    },
    // generateLandscape(theRoad, treeLength, nowIndex) {
    //     let indexOfTree = Math.floor(Math.random() * 100 % this.landscapePrefabs.length);
    //     let heightOfTree = this._getRandom(0, 540);
    //     let theLandscape = cc.instantiate(this.landscapePrefabs[indexOfTree]);
    //     theLandscape.parent = theRoad;
    //     if (this._getRandom(0, 1) == 1) {
    //         heightOfTree = -heightOfTree;
    //     }
    //     var generatePosOfTheLandscape = cc.v2(theRoad.width / 2, heightOfTree);//
    //     if (indexOfTree != 0) {
    //         var generatePosOfTheLandscape = cc.v2(-theRoad.width / 2, heightOfTree);//
    //     }
    //     theLandscape.position = generatePosOfTheLandscape;
    //     if (nowIndex > treeLength) {
    //         return;
    //     }
    //     return this.generateLandscape(theRoad, treeLength, nowIndex + 1);
    // },

    _getRandom(min, max) {  //参数min为随机数最小值 max为随机数最大值 得到的随机数范围为[min,max]
        return Math.floor(Math.random() * (max + 1 - min) + min);
    },
    start() {
    },
    onLoad() {
    },
    onDestroy() {
        cc.log('I\'m destroy!')
    }
    // update (dt) {},
});
