function getAni(type){
    var ani=wx.createAnimation({
      duration: 400,
      timingFunction: 'ease-out', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
      delay: 0
    });
    if(type==='slidein'){
        ani.translate3d(-400,0,0).step();
    }else if(type==='slideout'){
        ani.translate3d(0,0,0).step();        
    }
    return ani.export()
}

module.exports.getAni=getAni;
// module.exports={
//     getAni:getAni
// }