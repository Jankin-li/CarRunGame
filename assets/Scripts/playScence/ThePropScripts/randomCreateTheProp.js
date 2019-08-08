import { readTheDataFromFile } from "../../dataController";

/*
    该脚本挂载在道路上 this.node 为道路
    通过计算道路的间距和边距来控制生成坐标的数组 
    计算公式为 startposX = -(this.node.width - 边距*2)/2 
              startposY = -(this.node.height- 底边距)/2 
*/
const inteX = 45;//侧边距
let posArr = [];//用来保存所有位置

cc.Class({
    extends: cc.Component,
    properties: {
        //生成的道具组  //火星专有为陨落火星 木星专有为陨石带 水星专有为冰锥
        thePropPrefabs: {
            type: cc.Prefab,
            default: [],
        },
    },
    creatAprop() {
        let propIndex = Math.floor(Math.random() * 1000 % (this.thePropPrefabs.length));
        let prop = cc.instantiate(this.thePropPrefabs[propIndex]);
        prop.parent = this.node;
        let posIndex = this._getRandom(0, posArr.length);//取一个随机索引 该索引代表一个位置      
        let posProp = posArr[posIndex];//通过随机索引来获取位置 
        posArr.splice(posIndex, 1);//将坐标移出去
        posArr.sort();
        prop.position = posProp;//定位  
    },

    countPos(col, row) {
        let x = this._startPosX + 160 * col;//在哪一列
        let y = this._startPosY + (1000 / 10) * row;//在哪一行
        return cc.v2(x, y);
    },

    instThePosArr() {
        for (let n = 0; n < 4; n++) {
            for (let m = 0; m < 5; m++) {
                var pos = this.countPos(n, m);
                posArr.push(pos);
            }
        }
    },

    countTheStart() {
        this._startPosX = -240;
        this._startPosY = -256;
        this.instThePosArr();
    },
    onLoad() {
        this.countTheStart();
    },
    start() {
        for (let i = 0; i < 5; i++) {
            this.creatAprop();
        }
    },
    _getRandom(min, max) {  //参数min为随机数最小值 max为随机数最大值 得到的随机数范围为[min,max]
        return Math.floor(Math.random() * (max + 1 - min) + min);
    },
});
