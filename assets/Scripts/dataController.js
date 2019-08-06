//金币存储 选择数据存储( speed index)
let chooseData = [{}];
let coinData = 0;
//存储选择数据
function storgeTheChoose(carIndex) {
    localStorage.setItem('SelectedCar', carIndex);//存入本地数据选择的车辆的索引
}
//存储购买的车和剩下的金钱
function storgeTheDataOfPlay(coin, carIndex) {
    localStorage.setItem('Money', coin);//将购买车辆后金币余额存入本地数据中
    arr.push(carIndex);//将已经购买的车弹入数组中保存
    arr = arr.join('');//数组转换成字符串方便存入本地文件中
    ///存储数据
    localStorage.setItem('gotCars', arr);//将购买信息存入本地文件方便后面使用
}

//读取选择的行星的数据
function readTheChoose() {
    //从本地文件数据中读取 以Selected为关键字的数据
    let theIndexOfchoose = parseInt(localStorage.getItem('Selected'));
    if (!theIndexOfchoose) {
        theIndexOfchoose = 0;//保险处理
    }
    return theIndexOfchoose;
};
//读取存储的金钱和已经购买的车
function readTheDataFromFile() {
    coinGot = parseInt(localStorage.getItem('Money'));//获取存在本地文件夹中玩家获得的钱
    if (isNaN(coinGot) == true || coinGot == null) {
        coinGot = 30000;
    }
    let str = '';
    str = cc.sys.localStorage.getItem('gotCars');//获取当前已经购买的汽车索引对象

    if (isNaN(str) == true || str == null) {
        str = '0';
    }
    var dataStr = str.split("");
    //已经购买的汽车的索引
    arr = dataStr.map(function (data) {
        return +data;
    });
    //返回获取到的金币 和 已购买的车辆
    return { coin: coinGot, arrgot: arr };
};

let arr = [];
let coinGot = 0;

///导出方法
export { readTheDataFromFile, readTheChoose, storgeTheChoose, storgeTheDataOfPlay };
