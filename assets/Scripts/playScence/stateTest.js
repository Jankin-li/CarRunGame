var StateMachine = require('/cocosStudy/CarGame/node_modules/javascript-state-machine');
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start() {

    },

    // update (dt) {},
});

var fsm = new StateMachine({
    init: 'normal',
    transitions: [
        { name: 'protect', from: '*', to: 'protected' },//减速,停止,正常,和加速状态跳转到被保护 加速状态跳转到被保护状态只限于在被保护状态下吃到加速道具
        { name: 'protect', from: ['protected','accelerated'], to: 'protectedAndaccelerated' },//加速状态吃到保护道具,保护状态吃到加速道具
        { name: 'accelerate', from: ['normal', 'decelerated'], to: 'accelerated' },//减速和正常状态跳转到加速
        { name: 'decelerate', from: 'normal', to: 'decelerated' },//正常状态跳转到
        { name: 'stop', from: ['normal', 'accelerated', 'decelerated'], to: 'stopped' },
        { name: 'backnormal', from: '*', to: 'normal' }
    ],
    methods: {
        onProtect: function () { console.log('I melted') },
        onAccelerate: function () { console.log('I froze') },
        onDecelerate: function () { console.log('I vaporized') },
        onStop: function () { console.log('I condensed') },
        onBacknormal: function () { console.log('I back') }
    }
});