var utils=require("../../utils/news.js");

Page({
  data:{
    id:'',
    title:''
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
        id:options.id,
        name:options.name,
    })
  },
  onReady:function(){
    // 页面渲染完成
    var self=this;
    wx.setNavigationBarTitle({
      title:this.data.name,
      success: function(res) {
        // success
      }
    })

    wx.showToast({
    title:'努力加载中...',
    icon:'loading',
    duration:2000
    })

    console.log(this)
    wx.request({
      url: 'http://news-at.zhihu.com/api/4/theme/'+this.data.id,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(r){
        // success
        wx.hideToast();
        r.data.background=utils.format(r.data.background);
        r.data.stories=utils.formatArr(r.data.stories);
        self.setData({
            data:r.data
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onShow:function(){
    // 页面显示
    
  },
  onHide:function(){
    // 页面隐藏
    
  },
  onUnload:function(){
    // 页面关闭
    
  }
})