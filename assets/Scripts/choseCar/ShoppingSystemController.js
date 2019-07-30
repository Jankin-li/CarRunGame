cc.Class({
    extends: cc.Component,

    properties: {
        coinLabel: cc.Label,
        conformPanel: cc.Node,//确认购买的面板
        shoppingSelect: cc.Button,//底部的购买按钮
        shoppingSelectLabel: cc.Label,//按钮的名称
    },

    //too do 完成买车的逻辑  传入参数(玩家所拥有的金钱,车辆价值)
    buyCar() {

    },

    //判断当前车辆是否被购买 
    thisCarIsBuy(carCost, carIndex) {
        this.shoppingSelect.node.off(cc.Node.EventType.TOUCH_END);//先停止所有触摸的点击事件
        //遍历已经购买的车辆索引数组
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === carIndex) {
                this.conformPanel = false;//如果已经购买就不显示
                this.shoppingSelectLabel.string = '选 择';//按钮变更为选择按钮
                //当点击选择按钮时存储当前选择的车辆数据
                this.shoppingSelect.node.on(cc.Node.EventType.TOUCH_END, () => {
                    localStorage.setItem('SelectedCar', carIndex);//存入本地数据选择的车辆的索引
                    cc.director.loadScene('manueScene');//返回主页面
                    return;
                });
            }
        }
        if (arr[i] != carIndex) {
            this.shoppingSelectLabel.string = '选 择';//按钮变更为购买按钮
            //当点击购买按钮时弹出购买确认框
            this.shoppingSelect.node.on(cc.Node.EventType.TOUCH_END, () => {
                this.toVerify(carCost, carIndex);
            });

        }
    },

    //确认是否购买以及是否能够购买
    toVerify(carCost, carIndex) {

        //判断金钱是否足够
        if (this.coinGot > carCost) {
            this.coinGot -= carCost;//Too do
            localStorage.setItem('Money', this.coinGot);//将购买车辆后金币余额存入本地数据中
            this.arr.push(carIndex);
            let str2 = arr.join('');
            localStorage.setItem('gotCars', str2)
        }
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

        this.coinGot = localStorage.getItem('Money');//获取存在本地文件夹中玩家获得的钱

        this.str = cc.sys.localStorage.getItem('gotCars');//获取当前已经购买的汽车索引对象
        //已经购买的汽车的索引
        this.arr = str.split('');//数组
    },

    // update (dt) {},
});
