let dataControl = require('/cocosStudy/CarGame/assets/Scripts/dataController');

cc.Class({
    extends: cc.Component,

    properties: {
        coinLabel: cc.Label,//当前玩家金钱数量
        conformPanel: cc.Node,//确认购买的面板
        conformButton: cc.Button,//确认按钮
        cancelButton: cc.Button,//取消按钮
        carsNameLabel: cc.Label,//确认面板上的赛车的名字Lab
        carCostLabel: cc.Label,//确认面板上的车子的金钱Lab
        filedFame: cc.Node,//购买失败的面板
        succedFame: cc.Node,//购买成功的面板

        shoppingSelect: cc.Button,//底部的购买按钮
        shoppingSelectLabel: cc.Label,//按钮的名称
    },
    //选择按钮
    theButtonChangeToSelect(carIndex) {
        this.data = dataControl.readTheDataFromFile();//跨脚本调用读取方法
        this.coinLabel.string = this.data.coin;
        this.shoppingSelectLabel.string = '选 择';//按钮变更为选择按钮
        //当点击选择按钮时存储当前选择的车辆数据
        this.shoppingSelect.node.on(cc.Node.EventType.TOUCH_END, () => {
            ///数据存储用外部脚本
            dataControl.storgeTheChoose(carIndex);
            cc.director.loadScene('manueScene');//返回主页面
        });
    },
    //判断当前车辆是否被购买 
    thisCarIsBuy(carIndex, carCost, carName) {

        this.shoppingSelect.node.off(cc.Node.EventType.TOUCH_END);//先停止所有触摸的点击事件
        //遍历已经购买的车辆索引数组
        for (let i = 0; i < this.data.arrgot.length; i++) {
            if (this.data.arrgot[i] == carIndex) {
                this.theButtonChangeToSelect(carIndex);
                return;
            }
            if (this.data.arrgot[i] != carIndex) {
                this.shoppingSelectLabel.string = '购 买';//按钮变更为购买按钮
                //当点击购买按钮时弹出购买确认框
                this.shoppingSelect.node.on(cc.Node.EventType.TOUCH_END, () => {
                    this.toVerify(carIndex, carCost, carName);
                });
            }
        }
    },

    //确认是否购买以及是否能够购买
    toVerify(carIndex, carCost, carName) {
        //弹出确认框 注册点击事件
        this.conformPanel.active = true;
        //更新面板显示的数据
        this.carCostLabel.string = '是否花费' + carCost;
        this.carsNameLabel.string = '购买' + carName + '赛车';
        //确认按钮注册
        this.conformButton.node.on(cc.Node.EventType.TOUCH_END, () => {
            this.toBuyCar(carCost, carIndex);//调用购买逻辑
        });
        //取消按钮注册
        this.cancelButton.node.on(cc.Node.EventType.TOUCH_END, () => {
            this.conformPanel.active = false;//关闭面板
        });
    },
    //完成买车的逻辑  传入参数(玩家所拥有的金钱,车辆价值
    toBuyCar(carCost, carIndex) {
        //判断金钱是否足够
        if (this.data.coin >= carCost) {
            cc.log(this.data.coin);
            this.data.coin -= carCost;//Too do

            //加入脚本调用 存储数据
            dataControl.storgeTheDataOfPlay(this.data.coin, carIndex);
            this.succedFame.active = true;//开启购买成功的面板
            this.theButtonChangeToSelect(carIndex);
        } else {//too do金钱不足时
            this.filedFame.active = true;//开启弹窗
        }
    },

    closeTheFame2() {
        this.succedFame.active = false;
        this.conformPanel.active = false;//关闭面板
    },
    closeTheFame() {
        this.filedFame.active = false;//关闭弹窗
        this.conformPanel.active = false;//关闭面板
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //监听器监听数据变化事件 用于变化购买按钮
        cc.director.on('toBuyCar', this.thisCarIsBuy, this);
    },

    start() {
        // cc.sys.localStorage.clear();
        this.succedFame.active = false;
        this.filedFame.active = false;
        this.conformPanel.active = false;
        this.data = dataControl.readTheDataFromFile();
    },
});
