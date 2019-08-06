cc.Class({
    extends: cc.Component,

    properties: {
        pausePanel: cc.Node,
        timerLabel: cc.Label,
        CoinLabel: cc.Label,
    },

    pauseTheGame() {
        this.pausePanel.active = true;
        this.anim.play();
        let dateResume = new Date();
        this.pausetime = dateResume.getTime();
        cc.director.pause()
    },

    resumeTheGame() {
        cc.director.resume();
        let dateResume = new Date();
        this.resumeTime = dateResume.getTime() - this.pausetime;
        this.anim.stop();
        this.pausePanel.active = false;
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.anim = this.pausePanel.getComponentInChildren(cc.Animation);
        this.pausePanel.active = false;
        //获取开始时间,用于计时器
        let DateStart = new Date();
        this.startTime = DateStart.getTime();
        this.resumeTime = 0;
    },

    update(dt) {
        this.setTheTimer();
    },

    setTheTimer() {
        let nowDate = new Date();
        let lateTime = nowDate.getTime() - this.startTime - this.resumeTime;//过去了的时间
        this.timerLabel.string = ((lateTime / 10000).toFixed(2)).replace(/\./, "\'");
    },
});
