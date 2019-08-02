cc.Class({
    extends: cc.Component,

    properties: {
        pausePanel: cc.Node,
        timerLabel: cc.Label,
    },

    pauseTheGame() {
        this.pausePanel.active = true;
        this.anim.play();
        cc.director.pause()
    },

    resumeTheGame() {
        cc.director.resume();
        this.pausePanel.active = false;
        this.anim.stop();
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {
        this.anim = this.pausePanel.getComponentInChildren(cc.Animation);
        this.pausePanel.active = false;
        //获取开始时间,用于计时器
        this.DateStart = new Date();
        this.startTime = this.DateStart.getTime();
    },

    update(dt) {
        this.setTheTimer();
    },

    setTheTimer() {
        let nowDate = new Date();
        let lateTime = nowDate.getTime() - this.startTime;//过去了的时间
        this.timerLabel.string = ((lateTime / 10000).toFixed(2)).replace(/\./,"\'");
    },
});
