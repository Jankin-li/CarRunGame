let totalLength = 1280 * 6 * 4;//地图总长度
let thisBili = 0;

let turnStartPosx = 0;
let turnEndPosx = 0;

cc.Class({
    extends: cc.Component,

    properties: {
        runningcamera: cc.Camera,
        step: 150,
        _isHaveAccelerate: false,
        _isAccelerate: false,//加速
        _isDecelerate: false,//减速
        _isProtect: false,//保护
        _isStop: false,//停止
        _runLength: 0,//每一个阶段已经行驶的长度
        isProtectedEffct: cc.Node,//盾牌特效

        accelerateSpeed: 5,//加速度
        decelerateSpeed: 4,//减速度

        theLaterTimeOfProtect: 4,//保护持续时间
        theLaterTimeOfAccelerate: 4,//加速持续时间
        //运行时的速度
        _runingSpeed: 5,
        //车子本身的速度
        _baseSpeed: 5,
    },

    onLoad() {
        //开启碰撞监听
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.step = (720 - 96) / 4;
        turnStartPosx = this.node.x;
    },

    start() {
        this.node.zIndex = 10;
        this.isProtectedEffct.active = false;
        this._runingSpeed = this._baseSpeed;
    },
    //初始化飞行速度
    initTheplantSpeed() {

    },
    update() {
        this.isRun();
    },

    onDestroy() {
        cc.director.emit('GameOver', true);
    },

    sendTheSpeedOfTheProgressBar() {
        cc.director.emit('speedOfProgressBar', thisBili);
        cc.director.emit('moveTheIce', this.node.y, this.node.x);
    },
    /*
     赛车总共有 '正常' '加速' '停止' '被保护' '被减速' 五种状态
     第一优先级 '被保护' 状态针为 _isProtect
     第二优先级 '停止'  状态针为 _isStop
     第三优先级 '加速'  状态针为 _isAccelerat 不可无视停止
     第四优先级 '被减速' 状态针为 _isDecelerat
    */
    //车子运行时的控制
    //Buff 加速 保护
    //返回正常状态的回调函数
    actimeCallback() {
        if (!this._isStop) {//未停止状态下回到正常速度
            this.carBackToNormal();//回归正常状态
        }
        let fireEf = 0;
        cc.director.emit('accelerate', fireEf);//改变尾焰特效
        this._isAccelerate = false;//还原状态
    },
    protimeCallback() {
        this._isProtect = false;
        this.isProtectedEffct.active = false;
    },
    //加速
    toAccelerate() {
        if (!this._isStop) {//停止状态和已经有加速状态无法进入加速
            if (!this._isAccelerate) {
                this._isAccelerate = true;
                this._runingSpeed += this.accelerateSpeed;
                let fireEf = 1;
                cc.director.emit('accelerate', fireEf);//改变尾焰特效
            }
            this.unschedule(this.actimeCallback);//刷新计时器
            //加速时间结束返回正常状态
            this.scheduleOnce(this.actimeCallback, this.theLaterTimeOfProtect);
        }
    },

    //保护
    toProtect() {
        this._isProtect = true;
        this.isProtectedEffct.active = true;
        this.unschedule(this.protimeCallback);//刷新计时器
        //时间结束返回正常状态
        this.scheduleOnce(this.protimeCallback, this.theLaterTimeOfAccelerate);
    },
    //Debuff 减速 停止
    //减速
    toDecelerate() {
        if (!this._isAccelerate && !this._isProtect && !this._isDecelerate && !this._isStop) {//非加速和保护,停止状态下可以被减速
            this._runingSpeed = this.decelerateSpeed;
            this._isDecelerate = true;
        }
    },

    //停止
    toStop() {
        if (!this._isProtect) {//非保护状态下进入停止状态
            this._isStop = true;
            this._runingSpeed = 0;
        }
    },
    //车子正常行驶
    isRun() {
        this.node.y += this._runingSpeed;
        thisBili = this.node.y / totalLength;
        if (this.node.y > 0) {
            this.runningcamera.node.y += this._runingSpeed;
        }
        this.sendTheSpeedOfTheProgressBar();
    },
    //恢复正常速度
    carBackToNormal() {
        this._runingSpeed = this._baseSpeed;
    },
    //plantControl
    //左右转向
    carTurnLeft() {
        turnEndPosx = turnStartPosx - this.step;
        if (turnEndPosx > -300) {
            // cc.tween(this.node).stop();
            cc.tween(this.node)
                .to(0.2, { rotation: -15, x: turnEndPosx })
                .to(0.1, { rotation: 0 })
                .start();//利用链式缓动来让车换车道更加平缓
            turnStartPosx = turnEndPosx;
        }
    },
    carTurnRight() {
        turnEndPosx = turnStartPosx + this.step;
        if (turnEndPosx < 300) {
            // cc.tween(this.node).stop();
            cc.tween(this.node)
                .to(0.2, { rotation: 15, x: turnEndPosx })
                .to(0.1, { rotation: 0 })
                .start();//利用链式缓动来让车换车道更加平缓
            turnStartPosx = turnEndPosx;
        }
    }
});
