let dataControl = require('/cocosStudy/CarGame/assets/Scripts/dataController');
let datareader = dataControl.readTheDataFromFile();
cc.Class({
    extends: cc.Component,

    properties: {
        pausePanel: cc.Node,//暂停面板
        timerLabel: cc.Label,//计时器时间显示
        coinLabel: cc.Label,//玩家已经拥有的金钱数量
        theItemOfPlayer: cc.Node,
        theLengthOfRoad: cc.Node,
        _indexOfTheItem: 0,
    },

    pauseTheGame() {
        this.pausePanel.active = true;
        this.pausePanel.on(cc.Node.EventType.TOUCH_START, () => {
            this.startTime = new Date().getTime();
            // restartTimer();
            this.pausePanel.active = false;
            // this.isBack = true;
            cc.game.resume();
        })
        // pauseTimer();
        this.scheduleOnce(() => {
            cc.game.pause();
        }, 0.001);
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.on('speedOfProgressBar', (value) => {
            this._indexOfTheItem = value * this.theLengthOfRoad.width;
        });//注册底部进度条的速度控制监听
        cc.director.on('coinGet', (value) => {
            this.coinLabel.string = value;
        })
    },
    start() {
        this.playingTime = 0;
        this.pausePanel.active = false;
        this.coinLabel.string = datareader.coin;
        //获取开始时间,用于计时器
        // timerControl.startTimer();
        this.startTime = new Date().getTime();
        this._speedOfTheItem = 0.5;
    },

    update(dt) {
        this.setTheTimer();
        this.theItemOfPlayer.x = this._indexOfTheItem;
    },

    setTheTimer() {
        let nowDate = new Date();
        let f = nowDate.getTime();
        // if(this.isBack){
        //     this.duringTime = f
        // }
        this.playingTime += f - this.startTime;
        this.startTime = new Date().getTime();
        // let ml = Math.floor((this.playingTime % 1000) / 100);
        let sc = Math.floor((this.playingTime / 1000) % 60);
        let mi = Math.floor((this.playingTime / 1000 / 60) % 60);
        let info = mi + "\'" + sc;
        this.timerLabel.string = info;
    },

    distanceExchange(nowPos) {

    }
});

