cc.Class({
    extends: cc.Component,

    properties: {
        runningcamera: cc.Camera,
        runAllow: true,
        step: 150,
        accelerateSpeed: 5,//加速度
        isAccelerate: false,
        isProtected: false,//盾牌保护车子的状态

        accelerateEffect: [cc.Node],//加速特效
        isProtectedEffct: cc.Node,//盾牌特效

        _stoppedTheCar: false,
        speed: {
            type: cc.Integer,
            set(value) {
                this._speed = value;
            },
            get() {
                return this._speed;
            }
        },
        _speed: 5,
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
        this.isProtectedEffct.active = false;
        this.accelerateEffect[0].active = false;
    },

    update() {
        this.isRunAllow();
    },

    accelerateTheCar() {
        this.speed += this.accelerateSpeed;
    },

    isRunAllow() {
        if (this.runAllow) {
            //无其他状态时正常跑
            this.carRun();
            this._stoppedTheCar = false;
        } else if (this._stoppedTheCar) {
            //当前车辆没有护盾时撞上护栏停下车辆
            this.carStop();
            this._stoppedTheCar = true;
        }

        if (this.isProtected) {
            this.isProtectedEffct.active = true;
        }else{
            this.isProtectedEffct.active = false;
        }
        if (this.isAccelerate) {
            //当车辆吃到加速道具时 加速
            this.accelerateTheCar();
            this.accelerateEffect[0].active = true;
            this.isAccelerate = false;
        }
        else{
            
        }
    },

    //撞到路障时停止车辆
    carStop() {
        this.speed = 0;
    },

    carRun() {
        this.node.y += this.speed;
        this.runningcamera.node.y += this.speed;
    },

    //左右转向
    carTurnLeft() {
        if (this.node.x - this.step > -300) {
            cc.tween(this.node).stop();
            cc.tween(this.node)
                .to(0.2, { rotation: -15, x: this.node.x - this.step })
                .to(0.1, { rotation: 0 })
                .start();//利用链式缓动来让车换车道更加平缓
        }

    },

    carTurnRight() {
        if (this.node.x + this.step < 300) {
            cc.tween(this.node).stop();
            cc.tween(this.node)
                .to(0.1, { rotation: 15, x: this.node.x + this.step })
                .to(0.1, { rotation: 0 })
                .start();//利用链式缓动来让车换车道更加平缓
        }
    }
});
