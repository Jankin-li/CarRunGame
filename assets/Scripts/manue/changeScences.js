cc.Class({
    extends: cc.Component,

    properties: {
    },

    // onLoad () {},

    toTheChoseScense(){
        cc.director.loadScene('ChoseCar');
    },  
    toStratGame(){
        cc.director.loadScene('playScenes');
    },

    start () {

    },

    // update (dt) {},
});
