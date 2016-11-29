var utils=require("../../utils/news.js");


Page({
  data:{
    long:[],
    short:[]
  },
  onLoad:function(op){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
        id:op.id
    })
  },
  onReady:function(){
    // 页面渲染完成
    var self=this;
    wx.request({
      url: 'http://news-at.zhihu.com/api/4/story/'+this.data.id+'/long-comments',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(r){
        // success
            self.setData({
                long:utils.formatArr(r.data.comments)
            })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })

    wx.request({
      url: 'http://news-at.zhihu.com/api/4/story/'+this.data.id+'/short-comments',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(r){
        // success
            console.log(r)
            self.setData({
                short:utils.formatArr(r.data.comments)
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