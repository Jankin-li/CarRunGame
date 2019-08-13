let dataControl = require('/cocosStudy/CarGame/assets/Scripts/dataController');
cc.Class({
    extends: cc.Component,

    properties: {
        //游戏结算
        theGameOverPanel: cc.Node,
        thefailedPanel: cc.Node,
        theSuccessPanel: cc.Node,
        GotCoin: cc.Label,
        GotTime: cc.Label,
    },

    onLoad() {
        cc.director.once('GameOver', this.gameOver, this);//游戏失败
        cc.director.once('winTheGame2', this.gameWin, this)//游戏胜利,
    },
    start() {
        this.theGameOverPanel.active = false;
    },
    gameOver(failed) {
        if (failed) {
            this.theGameOverPanel.active = true;
            this.theSuccessPanel.active = false;
            this.scheduleOnce(() => {
                cc.game.pause();
            }, 1);
        }
    },

    gameWin(winR, coin, time) {
        if (winR) {
            this.theGameOverPanel.active = true;
            this.thefailedPanel.active = false;
            dataControl.storgeTheCoin(coin);
            this.GotCoin.string = coin;
            time = 8 * 60 * 1000 - time;//用时
            let sc = Math.floor((time / 1000) % 60);//秒
            let mi = Math.floor((time / 1000 / 60) % 60);//分钟
            let info = mi + "\'" + sc;
            this.GotTime.string = info;
            this.scheduleOnce(() => {
                cc.game.pause();
            }, 0.01);
        }
    },
    onDestroy() {
        cc.director.targetOff(this);
    },
    // update (dt) {},
});
