//index.js
//get application instance
const app = getApp()


Page({
  data: {
    apis: app.globalData.apis[app.globalData.activeApi]?.content[app.globalData.activeApiSelected].content,
    activeApi: app.globalData.activeApi,
    dropdownClicked: false,
    activeApiSelected: app.globalData.activeApiSelected,
    inputs: {}
  },
  onInput: function(event){
    this.setData({
      inputs: {...this.data.inputs, [event.currentTarget.dataset.name]: {
        ...this.data.inputs[event.currentTarget.dataset.name], ["" + event.currentTarget.dataset.i]: event.detail.value 
      }}
    })
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
  home: function(event){
    app.globalData.activeApi = event.currentTarget.dataset.api
    wx.reLaunch({
      url: "../index/index"
    })
  },
  dropDownKey: function (event) {
    this.setData({ dropDownKey: event.currentTarget.dataset.key })
    this.setData({ dropdownClicked: !this.data.dropdownClicked })
  },
  setModal: function(event){
    this.setData({isModal: true, implementation: event.currentTarget.dataset.implementation})
  },
  clear: function(){
    this.setData({isModal: false, implementation: ""})
  },
  setDisplay: function (event) {
    this.setData({ responseItem: { [event.currentTarget.dataset.item.name]: app.globalData.apis[app.globalData.activeApi]?.content[app.globalData.activeApiSelected].content[event.currentTarget.dataset.i].demoFunction(...Object.values(this.data.inputs[event.currentTarget.dataset.item.name] ?? {})) } })
  },
  onLoad: function () {
    this.setData({ activeApi: app.globalData.activeApi })
    this.setData({ activeApiSelected: app.globalData.activeApiSelected })
    this.setData({ apis: app.globalData.apis[app.globalData.activeApi]?.content[app.globalData.activeApiSelected].content })
    this.setData({ globalApis: app.globalData.apis })
  },
},
)
