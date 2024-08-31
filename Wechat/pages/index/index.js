// pages/effi/effi.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths:'',
    path:"../../images/2.JPG",
    resultdata:'',
    result_time:'',
    detect_status:'',
    info: {
      licensePicUrls: [],
    },
    imgShow:false
  },

//绑定前端页面按钮
  detectimg:function(){
    var that=this
    wx.chooseImage({
      success (res) {
        const tempFilePaths = res.tempFilePaths
        wx.showToast({
          title: '选择成功，请稍等',
          duration:1500   
        })
        console.log(tempFilePaths[0])
        wx.uploadFile({
        //你的后端api地址
          url: 'http://192.168.108.206:8090/uploader',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          //成功的话返回后端传回的api结果
          success:function(res){
            const result = JSON.parse(res.data)
            console.log(result)
            console.log(result.newslist[0].output_url)
            console.log(result.newslist[2].detect_time)
            console.log(typeof(result.newslist[1].result_arg))
            that.setData({
              //"info.licensePicUrls":tempFilePaths,
              resultdata:result.newslist[1].result_arg,
              path:result.newslist[0].output_url,
              result_time:result.newslist[2].detect_time,
              detect_status:result.msg,
              
              imgShow:true,
              
            })

            //失败前端页面显示错误提示
          },
          fail: function (res) {
            wx.showModal({
              title: '提示',
              content: '抱歉，服务器暂未开通服务',
              success: function (res) {
                if (res.confirm) {//这里是点击了确定以后
                  console.log('用户点击确定')
                } else {//这里是点击了取消以后
                  console.log('用户点击取消')
                }
              }
            })
            console.log('取消',res.errMsg);
          }
        })
      }
    })
  },
})