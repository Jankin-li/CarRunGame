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

    theButtonChangeToSelect(carIndex) {
        // this.conformPanel.active = false;//如果已经购买就不显示
        this.coinLabel.string = coinGot;
        this.shoppingSelectLabel.string = '选 择';//按钮变更为选择按钮
        //当点击选择按钮时存储当前选择的车辆数据
        this.shoppingSelect.node.on(cc.Node.EventType.TOUCH_END, () => {
            localStorage.setItem('SelectedCar', carIndex);//存入本地数据选择的车辆的索引
            cc.director.loadScene('manueScene');//返回主页面
        });
    },
    //判断当前车辆是否被购买 
    thisCarIsBuy(carIndex, carCost, carName) {
        this.readTheDataFromFile();
        this.shoppingSelect.node.off(cc.Node.EventType.TOUCH_END);//先停止所有触摸的点击事件
        //遍历已经购买的车辆索引数组
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == carIndex) {
                this.theButtonChangeToSelect(carIndex);
                return;
            }
            if (arr[i] != carIndex) {
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
    //too do 完成买车的逻辑  传入参数(玩家所拥有的金钱,车辆价值
    toBuyCar(carCost, carIndex) {
        //判断金钱是否足够
        if (coinGot >= carCost) {
            cc.log(coinGot);
            coinGot -= carCost;//Too do
            localStorage.setItem('Money', coinGot);//将购买车辆后金币余额存入本地数据中
            arr.push(carIndex);//将已经购买的车弹入数组中保存
            let str2 = arr.join('');//数组转换成字符串方便存入本地文件中
            localStorage.setItem('gotCars', str2);//将购买信息存入本地文件方便后面使用
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
        cc.sys.localStorage.clear();
        this.succedFame.active = false;
        this.filedFame.active = false;
        this.conformPanel.active = false;
        this.readTheDataFromFile();
    },

    readTheDataFromFile() {
        coinGot = parseInt(localStorage.getItem('Money'));//获取存在本地文件夹中玩家获得的钱
        if (isNaN(coinGot) == true || coinGot == null) {
            coinGot = 30000;
        }
        var str = '';
        str = cc.sys.localStorage.getItem('gotCars');//获取当前已经购买的汽车索引对象

        if (isNaN(str) == true || str == null) {
            str = '0';
        }
        var dataStr = str.split("");
        //已经购买的汽车的索引
        arr = dataStr.map(function (data) {
            return +data;
        });
        this.coinLabel.string = coinGot;
    },
    // update (dt) {},

});

var arr = [];
var coinGot;