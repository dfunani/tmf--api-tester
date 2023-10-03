//index.js
//get application instance
const app = getApp()


Page({
  data: {
    apis: app.globalData.apis[app.globalData.activeApi]?.content,
    activeApi: app.globalData.activeApi,
    dropdownClicked: false
  },
  openApis: function(event){
    app.globalData.activeApiSelected = event.currentTarget.dataset.api
    this.setData({dropdownClicked: !this.data.dropdownClicked})
    wx.navigateTo({
      url: "../apis/index"
    })
  },
  clearDropDown: function(){
    this.setData({dropdownClicked: !this.data.dropdownClicked})
  },
  openKey: function(event){
    app.globalData.activeApiSelected = event.currentTarget.dataset.api
    this.setData({dropdownClicked: !this.data.dropdownClicked})
    wx.navigateTo({
      url: "../apis/index"
    })
  },
  home: function(event){
    app.globalData.activeApi = event.currentTarget.dataset.api
    wx.reLaunch({
      url: "../index/index"
    })
  },
  dropDownKey: function(event){
    this.setData({dropDownKey: event.currentTarget.dataset.key})
    this.setData({dropdownClicked: !this.data.dropdownClicked})
  },
  onLoad: function () {
    this.setData({activeApi: app.globalData.activeApi})
    this.setData({apis: app.globalData.apis[app.globalData.activeApi]?.content})
    this.setData({globalApis: app.globalData.apis})
  },
},
)
