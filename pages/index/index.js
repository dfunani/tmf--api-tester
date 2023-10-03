//index.js
//get application instance
const { defaultIcon } = require('../../utils/icon');
const app = getApp()


Page({
  data: {
    apis: app.globalData.apis,
    dropdownClicked: false
  },
  dropDownKey: function(event){
    this.setData({dropDownKey: event.currentTarget.dataset.key})
this.setData({dropdownClicked: !this.data.dropdownClicked})
  },
  openKey: function(event){
    app.globalData.activeApiSelected = event.currentTarget.dataset.api
    app.globalData.activeApi = this.data.dropDownKey
    this.setData({dropdownClicked: !this.data.dropdownClicked})
    wx.navigateTo({
      url: "../apis/index"
    })
  },
  clearDropDown: function(){
    this.setData({dropdownClicked: !this.data.dropdownClicked})
  },
  openApis: function(event){
    app.globalData.activeApi = event.currentTarget.dataset.api
    this.setData({dropdownClicked: !this.data.dropdownClicked})
    wx.navigateTo({
      url: "../groups/index"
    })
  },
  home: function(event){
    app.globalData.activeApi = event.currentTarget.dataset.api
    wx.reLaunch({
      url: "../index/index"
    })
  },
  onLoad: function () {
    this.setData({ apis: app.globalData.apis, globalApis: app.globalData.apis})
    
  },
},
)
