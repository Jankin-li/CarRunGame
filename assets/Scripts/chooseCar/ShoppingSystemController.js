let dataControl = require('/cocosStudy/CarGame/assets/Scripts/dataController');
let plantIndex = 0;
let plantCost = 0;
let plantName = "";
cc.Class({
    extends: cc.Component,

    properties: {
        coinLabel: cc.Label,//当前玩家金钱数量
        unlockButton: cc.Node,//解锁按钮
        buyThePus: cc.Button,
        selectButton: cc.Button,//确认按钮
        falseLabeOfBuy: cc.Label,
        conformPanel: cc.Node,//确认面板
        conformButton: cc.Button,//确认按钮
        cancelButton: cc.Button,//取消按钮
        conformSp: {
            type: cc.SpriteFrame,
            default: [],
        },//切换确认图标  0号为已经选择 1号为未选择
    },

    //判断当前车辆是否被购买 
    thisCarIsBuy(carIndex, carCost, carName) {
        plantIndex = carIndex;
        plantCost = carCost;
        plantName = carName;
        this.data = dataControl.readTheDataFromFile();//跨脚本调用读取方法
        this.coinLabel.string = this.data.coin;//更新当前金币数量
        this.buyThePus.node.off(cc.Node.EventType.TOUCH_END);//先停止所有触摸的点击事件
        //遍历已经购买的推进器数组
        for (let i = 0; i < this.data.arrgot.length; i++) {
            if (this.data.arrgot[i] == plantIndex) {
                //如果当前页面的推进器已经被购买
                this.theButtonChangeToSelect(plantIndex);
                return;
            }
            if (this.data.arrgot[i] != plantIndex) {
                this.unlockButton.active = true;
                this.buyThePus.node.active = true;
                //当点击解锁按钮时弹出购买确认框
                this.buyThePus.node.on(cc.Node.EventType.TOUCH_END, () => {
                    this.toVerify();
                });
            }
        }
    },

    //选择按钮 相应处理
    theButtonChangeToSelect() {
        this.unlockButton.active = false;//隐藏解锁按钮
        this.buyThePus.node.active = false;
        let selectedData = dataControl.readTheChoose();
        if (plantIndex != selectedData) {
            let spritee = this.selectButton.node.getComponent(cc.Sprite);
            spritee.spriteFrame = this.conformSp[1];//确认图标变为未选择
        }
        else {
            let spritee = this.selectButton.node.getComponent(cc.Sprite);
            spritee.spriteFrame = this.conformSp[0];//确认图标变为已选择
        }
        //当点击选择按钮时存储当前选择的车辆数据
        this.selectButton.node.on(cc.Node.EventType.TOUCH_END, () => {
            ///数据存储用外部脚本
            dataControl.storgeTheChoose(plantIndex);
            cc.director.loadScene('manueScene');//返回主页面
        });
    },
    //确认是否购买以及是否能够购买
    toVerify() {
        //弹出确认框 注册点击事件
        this.conformPanel.active = true;
        //确认按钮注册
        this.conformButton.node.on(cc.Node.EventType.TOUCH_END, () => {
            this.toBuyCar();//调用购买逻辑
        });
        //取消按钮注册
        this.cancelButton.node.on(cc.Node.EventType.TOUCH_END, () => {
            this.conformPanel.active = false;//关闭面板
        });
    },
    //完成买车的逻辑  传入参数(玩家所拥有的金钱,车辆价值
    toBuyCar() {
        //判断金钱是否足够
        if (this.data.coin >= plantCost) {
            //金钱足够的情况下
            let coinChanged = this.data.coin - plantCost;//减去金币
            //加入脚本调用 存储数据
            dataControl.storgeTheDataOfPlay(coinChanged, plantIndex);
            // this.succedFame.active = true;//开启购买成功的面板
            this.theButtonChangeToSelect();
            this.closeTheFame('Purchase success!', cc.Color.YELLOW, 0);
        } else {//金钱不足时 金钱不足的弹框
            this.closeTheFame('Your money is not enough!', cc.Color.RED, 1);
        }
    },
    closeTheFame(FOrT, colos, suc) {
        this.falseLabeOfBuy.node.active = true;
        this.falseLabeOfBuy.node.color = colos;
        this.falseLabeOfBuy.getComponent(cc.Animation).play();
        this.falseLabeOfBuy.string = FOrT;
        if (suc == 0) {
            this.falseLabeOfBuy.scheduleOnce(() => {
                this.falseLabeOfBuy.node.active = false;
                this.conformPanel.active = false;//关闭购买界面
            }, 1)
        }
    },

    backToMenu() {
        cc.director.loadScene('manueScene');
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        //监听器监听数据变化事件 用于变化购买按钮
        cc.director.on('toBuyCar', this.thisCarIsBuy, this);
    },
    onDestroy() {
        cc.director.targetOff(this);
    },
    start() {
        // cc.sys.localStorage.clear();
        this.falseLabeOfBuy.node.active = false;
        this.buyThePus.active = false;
        this.conformPanel.active = false;
        this.data = dataControl.readTheDataFromFile();
    },
});
