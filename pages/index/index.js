var utils=require("../../utils/news.js");
var $=require("../../utils/animation.js");
var date=new Date();
var flag=true;

Page({
  data:{
    tops:[],
    news:[],
    active:false,
    ani:{},
    fade:{}
  },
  change:function(){

  },
  tapbutton:function(){
    if(!this.data.active){
        this.setData({
          ani:$.getAni('slideout'),
          active:true
        })
    }else{
        this.setData({
          ani:$.getAni('slidein'),
          active:false
        })
    }
 
  },
  action:function(e){
      this.setData({
          ani:$.getAni('slidein'),
          active:false
      })

      var id=e.currentTarget.dataset.id;
      var title=e.currentTarget.dataset.title;

      wx.showActionSheet({
          itemList:['分享','阅读'],
          success:function(e){
            if(e.tapIndex===0){
              wx.showModal({
                title:'分享吗?',
                content:'...',         
                success:function(res){
                    if(res.confirm){
                      console.log(1)
                    }
                }
              })
            }else if(e.tapIndex===1){
              wx.navigateTo({
                url:'/pages/show/show?id='+id+'&title='+title
              })
            }
          },
          fail: function() {
            // fail
            // flag=true;
          },
          complete: function() {
            // complete
            flag=true;
          }
      })
  },
  onReachBottom:function(){
    var s=utils.formatDate(date);
    console.log(s)

    var url= 'http://news.at.zhihu.com/api/4/news/before/'+s;
    var self=this;
    
    if(flag){
      flag=false;
      wx.request({
          url:url,
          data: {},
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function(r){
            // success
            // flag=true;
            date=utils.before(date);
            var n=self.data.news.concat(utils.formatArr(r.data.stories));
            self.setData({
              news:n
            })
          },
          fail: function() {
            // fail
            // flag=true;
          },
          complete: function() {
            // complete
            flag=true;
          }
      })
    }
    
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    
  },

  onReady:function(){
    //页面加载
    var self=this;
    wx.request({
      url: 'http://news-at.zhihu.com/api/4/start-image/1080*1776',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(r){
        // success
       
        var fadeout=wx.createAnimation({
          duration: 800,
          timingFunction: 'ease', // "linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
          delay:2000
        })

        fadeout.opacity(0).scale(0,0).step()
        self.setData({
          startImage:utils.format(r.data.img)
        })
        setTimeout(function(){
            self.setData({
              fade:fadeout.export()
            })
        },100)
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    wx.request({
      url: 'http://news-at.zhihu.com/api/4/themes',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(r){
        // success
        self.setData({
          themes:r.data.others
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    wx.showToast({
        title:'努力加载中...',
        icon:'loading',
        duration:3000,
        success:function(){
          //success
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
    })

    // 页面渲染完成
    wx.request({
      url: 'http://news-at.zhihu.com/api/4/news/latest',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(r){
        // success
        var t=r.data.top_stories;
        var n=r.data.stories;
        
        self.setData({
          tops:utils.formatArr(t),
          news:utils.formatArr(n)
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
        wx.hideToast();
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