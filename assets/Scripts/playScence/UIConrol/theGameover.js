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
        cc.director.once('winTheGame', this.gameWin, this)//游戏胜利,
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

    gameWin(winR) {
        if (winR) {
            this.theGameOverPanel.active = true;
            this.theSuccessPanel.active = true;
            this.scheduleOnce(() => {
                cc.game.pause();
            }, 0.001);
        }
    },
    // update (dt) {},
});
