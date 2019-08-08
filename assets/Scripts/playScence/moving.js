let totalLength = 1280 * 6 * 4;
let thisBili = 0;
cc.Class({
    extends: cc.Component,

    properties: {
        runningcamera: cc.Camera,
        step: 150,
        _isAccelerated: false,//加速状态
        _isProtected: false,//盾牌保护车子的状态
        _isStoped: false,//车子是否被停下
        _isDecelerated: false,//被减速度
        _isNormal: true,//正常状态
        _isHaveBuffe: false,
        _runLength: 0,//每一个阶段已经行驶的长度
        isProtectedEffct: cc.Node,//盾牌特效

        accelerateSpeed: 4,//加速度
        decelerateSpeed: 4,//减速度

        theLaterTimeOfAccelerate: 4,//加速持续时间
        theLaterTimeOfDecelerate: 1, //减速持续时间
        //运行时的速度
        runingSpeed: {
            type: cc.Integer,
            default: 5,
        },
        //车子本身的速度
        baseSpeed: 5,
        runingSpeedBack: 0,
    },

    onLoad() {
        //开启碰撞监听
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true;
        //获取动画 转向动画
        this.anim = this.node.getComponent(cc.Animation);
        this.step = (720 - 96) / 4;
    },

    start() {
        this.node.zIndex = 10;
        // this.isProtectedEffct.active = false;
        // this.accelerateEffect[0].active = false;
        this.runingSpeed = this.baseSpeed;
        this.runingSpeedBack = this.runingSpeed;
    },

    update() {
        this.isRunStatus();
        // this.thEffectOfCar();
        this.carRun();
    },

    sendTheSpeedOfTheProgressBar() {
        cc.director.emit('speedOfProgressBar', thisBili);
    },

    /*
     赛车总共有 '正常' '加速' '停止' '被保护' '被减速' 五种状态
     第一优先级 '被保护' 状态针为 _isProtected
     第二优先级 '停止'  状态针为 _isStoped
     第三优先级 '加速'  状态针为 _isAccelerated 不可无视停止
     第四优先级 '被减速' 状态针为 _isDecelerated
     第五优先级 '正常' 状态针为 _isNormal
    */

    //车子运行时的控制
    isRunStatus() {
        if (!this._isNormal) {
            //如果赛车不在被保护状态下撞到栅栏 赛车停止移动 停止后不再调用停止方法
            if (!this._isStoped) {
                this.carStop();
                this.runingSpeedBack = this.runingSpeed;
                this.sendTheSpeedOfTheProgressBar();
            }
        } else if (this._isDecelerated && !this._isProtected) {
            //如果赛车在正常状态下被减速 调用减速方法
            this.decelerateTheCar();
            this.runingSpeedBack = this.runingSpeed;
            this.sendTheSpeedOfTheProgressBar();
        } else if (this._isAccelerated) {
            //如果赛车开启加速状态 调用加速方法
            this.accelerateTheCar();
        } else if (this._isNormal) {
            //无其他状态后恢复正常速度 
            this.runingSpeed = this.baseSpeed;
            this.runingSpeedBack = this.runingSpeed;
            this.sendTheSpeedOfTheProgressBar();
        }
    },

    thEffectOfCar() {
        //对于赛车的特效处理
        //盾牌特效
        if (this._isProtected) {
            this.isProtectedEffct.active = true;
        } else {
            this.isProtectedEffct.active = false;
        }
        //加速特效
        if (this._isAccelerated && !this._isStoped) {
            //当车辆吃到加速道具且没有停住时 加速 出现尾焰
            // this.accelerateEffect[0].active = true;
        } else {
            // this.accelerateEffect[0].active = false;
        }
    },
    //减速
    decelerateTheCar() {
        if (!this._isHaveBuffe) {
            this.runingSpeed -= this.decelerateSpeed;
            this.carBackToNormal(this.theLaterTimeOfDecelerate);
        }
    },
    
    //加速
    accelerateTheCar() {
        if (!this._isHaveBuffe) {
            this.runingSpeed += this.accelerateSpeed;
            this._isHaveBuffe = true;
        }
        this.carBackToNormal(this.theLaterTimeOfAccelerate);
        let backTheNomal = cc.callFunc(() => {
            this._isAccelerated = false;
            this._isHaveBuffe = false;
        })
        let backTheNomalSqAction = cc.sequence(cc.delayTime(this.theLaterTimeOfAccelerate), backTheNomal);
        this.node.runAction(backTheNomalSqAction);
    },
    //停止
    carStop() {
        this.runingSpeed = 0;
    },
    //车子正常行驶
    carRun() {
        this.node.y += this.runingSpeed;
        thisBili = this.node.y / totalLength;
        if (this.node.y > 0) {
            this.runningcamera.node.y += this.runingSpeed;

        }
    },

    //恢复正常速度
    carBackToNormal(laterTime) {
        let backTheNomal = cc.callFunc(() => {
            this.runingSpeed = this.baseSpeed;
        })
        let backTheNomalSqAction = cc.sequence(cc.delayTime(laterTime), backTheNomal);
        this.node.runAction(backTheNomalSqAction);
    },

    //左右转向
    carTurnLeft() {
        if (this.node.x - this.step > -300) {
            // cc.tween(this.node).stop();
            cc.tween(this.node)
                .to(0.2, { rotation: -15, x: this.node.x - this.step })
                .to(0.1, { rotation: 0 })
                .start();//利用链式缓动来让车换车道更加平缓
        }

    },
    carTurnRight() {
        if (this.node.x + this.step < 300) {
            // cc.tween(this.node).stop();
            cc.tween(this.node)
                .to(0.2, { rotation: 15, x: this.node.x + this.step })
                .to(0.1, { rotation: 0 })
                .start();//利用链式缓动来让车换车道更加平缓
        }
    }
});

