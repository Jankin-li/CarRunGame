let dataControl = require('/cocosStudy/CarGame/assets/Scripts/dataController');
let datareader = dataControl.readTheDataFromFile();
let playerCoin = datareader.coin;
cc.Class({
    extends: cc.Component,

    properties: {
        pausePanel: cc.Node,//暂停面板
        countinueButton: cc.Button,
        backMenuButton: cc.Button,
        timerLabel: cc.Label,//计时器时间显示
        coinLabel: cc.Label,//玩家已经拥有的金钱数量
        theItemOfPlayer: cc.Node,//底部游戏进度条玩家头像
        theLengthOfRoad: cc.Node,//底部进度条长度

        //游戏结算
        theGameOverPanel: cc.Node,
        thefailedPanel: cc.Node,
        theSuccessPanel: cc.Node,
        _indexOfTheItem: 0,
    },

    pauseTheGame() {
        this.pausePanel.active = true;
        this.scheduleOnce(() => {
            cc.game.pause();
        }, 0.001);
    },
    backMenu2() {
        cc.game.resume();
        cc.director.loadScene('manueScene');
    },
    resumeTheGame() {
        this.startTime = new Date().getTime();
        this.pausePanel.active = false;
        cc.game.resume();
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        cc.director.on('speedOfProgressBar', (value) => {
            this._indexOfTheItem = value * this.theLengthOfRoad.width;
        });//注册底部进度条的速度控制监听

        cc.director.on('coinGetOne', (value) => {//金币增加事件
            this.node.runAction(cc.sequence(cc.delayTime(2.4), cc.callFunc(() => {
                playerCoin += value;//吃到金币时加钱
                this.coinLabel.string = playerCoin;
            })))
        });
        cc.director.on('GameOver', this.gameOver, this);//游戏失败
        // cc.diretror.on("win", this.gameWin, this)//游戏胜利
    },
    gameOver(failed) {
        if (failed) {
            this.theGameOverPanel.active = true;
            this.thefailedPanel.active = true;
            this.scheduleOnce(() => {
                cc.game.pause();
            }, 1);
        }
    },
    gameWin(winR) {
        if (winR) {
            this.theGameOverPanel.active = true;
            this.theSuccessPanel.active = true;
            this.scheduleOnce(() => {
                cc.game.pause();
            }, 0.001);
        }
    },
    allPanelFalse() {
        this.theGameOverPanel.active = false;
        this.thefailedPanel.active = false;
        this.theSuccessPanel.active = false;
    },
    backMenu() {
        cc.director.loadScene('manueScene');
    },
    restartGame() {
        cc.director.loadScene('playScenes');
    },
    start() {
        this.playingTime = 0;
        this.pausePanel.active = false;
        this.coinLabel.string = playerCoin;
        //获取开始时间,用于计时器
        this.startTime = new Date().getTime();
        this._speedOfTheItem = 0.5;
        this.allPanelFalse();
    },

    update(dt) {
        this.setTheTimer();
        this.theItemOfPlayer.x = this._indexOfTheItem;
    },

    setTheTimer() {
        let nowDate = new Date();
        let f = nowDate.getTime();
        this.playingTime += f - this.startTime;
        this.startTime = new Date().getTime();
        let theTime = 8 * 60 * 1000 - this.playingTime;//8分钟倒计时
        // let ml = Math.floor((this.playingTime % 1000) / 100);//毫秒
        let sc = Math.floor((theTime / 1000) % 60);//秒
        let mi = Math.floor((theTime / 1000 / 60) % 60);//分钟
        let info = mi + "\'" + sc;
        this.timerLabel.string = info;
    },
});

