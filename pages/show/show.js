Page({
  data:{
      title:'',
      id:''
  },
  onLoad:function(e){
    // 页面初始化 options为页面跳转所带来的参数
    
    this.setData({
        title:e.title,
        id:e.id,  
    })
  },
  onReady:function(){
    // 页面渲染完成
      var self=this;
      wx.request({
        url: 'http://news-at.zhihu.com/api/4/story-extra/'+this.data.id,
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(r){
          // success
          self.setData({
              zan:r.data.popularity
          })
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
      })
      wx.setNavigationBarTitle({
        title:this.data.title
      })
      wx.showToast({
        title:'努力加载中...',
        icon:'loading',
        duration:1000
      })
      
      wx.request({
        url: 'http://news-at.zhihu.com/api/4/news/'+this.data.id,
        data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(r){
          // success
          wx.hideToast();
          var c=r.data.body.replace(/<div[^>]+>|<\/div>|<h2[^>]+>|<\/h2>|/g,'');

          self.setData({
              content:c
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