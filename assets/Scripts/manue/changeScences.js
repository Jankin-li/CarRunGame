cc.Class({
    extends: cc.Component,

    properties: {
    },

    // onLoad () {},

    toTheChoseScense(){
        cc.director.loadScene('ChooseCar');
    },  
    toStratGame(){
        cc.director.loadScene('playScenes');
    },

    start () {

    },

    // update (dt) {},
});
