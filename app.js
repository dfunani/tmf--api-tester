const { qapmMiniSdkStart } = require("new.qapm.js");

function qapmInit() {
  // 此处这些配置请参考 QAPM 接入文档进行修改
  const QAPM_INIT_OPTION = {
    qapm_base_url: "https://ten.sngapm.qq.com", // (必填)请将本域名添加到小程序域名白名单
    app_key: 'b1fa4a05-354', // (必填)填写从qapm的web上获取的app_key
    version: "1.0.1", // (必填)填写小程序的版本号
    user_id: 'smithdeng123', // (必填)用户的id,需要开发者自己设置
  }

  try {
    qapmMiniSdkStart(QAPM_INIT_OPTION);
  } catch (e) {
    console.log("qapm mini sdk error", e);
  }
}

//app.js
App({
  onLaunch: function () {
    qapmInit();
    // show localstorage
    let logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // login
    wx.login({
      success: res => {
        // get custom login info res
      }
    })
    // get user settings
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // Already authorized, you can directly call getUserInfo to get the avatar nickname without popping up
          wx.getUserInfo({
            success: res => {
              // get custom user info res
              this.globalData.userInfo = res.userInfo;
            }
          })
        }
      }
    })
  },
  globalData: {
    activeApi: "",
    activeApiSelected: "",
    "apis": {
      "Basics": {
        "description": "Basic Apis For Interacting with Weixin",
        "content": {
          "System": {
            "content": [
              {
                "name": "env",
                "description": "Environmental variables",
                "action": true,
                "args": ["key", "value"],
                "display": true,
                "implementation": `// Set Environment Variable
                wx.env[key] = value
                // Get Environment variables
                console.log(wx.env)
                // Specific key
                console.log(wx.env.key)`,
                demoFunction(key, value) {
                  wx.env[key] = value
                  return JSON.stringify(wx.env, null, 4)
                }
              },

              {
                "name": "base64ToArrayBuffer",
                "description": "Converters: Base64 to ArrayBuffer",
                "action": true,
                "args": ["base64"],
                "implementation": `// Create a base 64 string
                const base64 = btoa('CxYh')
                // Convert to buffer
                const arrayBuffer = wx.base64ToArrayBuffer(base64)`,
                "display": true,
                demoFunction(base64) {
                  return wx.base64ToArrayBuffer(btoa(base64)).toString()
                }
              },

              {
                "name": "arrayBufferToBase64",
                "description": "Converters: ArrayBuffer to Base64",
                "action": true,
                "args": ["arraySize"],
                "implementation": `// CReate a Buffer
                const arrayBuffer = new Uint8Array([11, 22, 33])
                // Convert Buffer
                const base64 = wx.arrayBufferToBase64(arrayBuffer)`,
                "display": true,
                demoFunction(arraySize) {
                  const arrayBuffer = new ArrayBuffer(arraySize)
                  return wx.arrayBufferToBase64(arrayBuffer)
                }
              },

              {
                "name": "getSystemInfoSync",
                "description": "Get system information synchronously",
                "action": true,
                "args": [],
                "implementation": `try {
                  const res = wx.getSystemInfoSync()
                  console.log(res.model)
                  console.log(res.pixelRatio)
                  console.log(res.windowWidth)
                  console.log(res.windowHeight)
                  console.log(res.language)
                  console.log(res.version)
                  console.log(res.platform)
                } catch (e) {
                  // Do something when catch error
                }`,
                "display": true,
                demoFunction() {
                  try {
                    const res = wx.getSystemInfoSync()
                    return JSON.stringify(res, null, 2)
                  } catch (e) {
                    // Do something when catch error

                  }
                }
              },

              {
                "name": "getSystemInfoAsync",
                "description": "Get system information asynchronously",
                "action": false,
                "args": [],
                "implementation": `try {
                  wx.getSystemInfo({
                  success (res) {
                    console.log(res.model)
                    console.log(res.pixelRatio)
                    console.log(res.windowWidth)
                    console.log(res.windowHeight)
                    console.log(res.language)
                    console.log(res.version)
                    console.log(res.platform)
                  }
                })
                } catch (e) {
                  // Do something when catch error
                }`,
                "display": true,
              },

              {
                "name": "getSystemInfo",
                "description": "Get system information",
                "action": false,
                "args": [],
                "implementation": `try {
                  wx.getSystemInfo({
                  success (res) {
                    console.log(res.model)
                    console.log(res.pixelRatio)
                    console.log(res.windowWidth)
                    console.log(res.windowHeight)
                    console.log(res.language)
                    console.log(res.version)
                    console.log(res.platform)
                  }
                })
                } catch (e) {
                  // Do something when catch error
                }`,
                "display": true,
              }
            ],
            "description": "Apis focused at interacting with system components",
          },
          "Mini Program": {
            "content": [
              {
                "name": "getLaunchOptionsSync",
                "description": "Gets the parameters for startup of the Mini Programs. and App.onLaunch",
                "action": true,
                "args": [],
                "implementation": null,
                "display": true,
                demoFunction() {
                  return JSON.stringify(wx.getLaunchOptionsSync(), null, 4)
                }
              },
              {
                "name": "getEnterOptionsSync",
                "description": "Gets the parameters of this Mini Program when it starts. If the current is a cold start, the return value is identical to the App.onLaunch",
                "action": true,
                "args": [],
                "implementation": null,
                "display": true,
                demoFunction() {
                  return JSON.stringify(wx.getEnterOptionsSync(), null, 4)
                }
              },
            ],
            "description": "Apis focused at interacting with the underlying Micro Program or Application",
          },
        }
      },
      "Navigation": {
        "content": {
          "Routing": {
            "content": [
              {
                "name": "switchTab",
                "description": "Jump to tabBar Page, and close all other non - tabBar page",
                "action": true,
                "args": [],
                "implementation": `// app.json
                {
                  "tabBar": {
                    "list": [{
                      "pagePath": "index",
                      "text": "Home page"
                    },{
                      "pagePath": "other",
                      "text": "Other."
                    }]
                  }
                }

                // page.js
                wx.switchTab({
                  url: '/index'
                })
                `,
                "display": true,
                demoFunction() {
                  wx.switchTab({
                    url: '../index/index'
                  })
                }
              },
              {
                "name": "reLaunch",
                "description": "Close all pages and open to a page in the app",
                "action": true,
                "args": [],
                "implementation": `wx.reLaunch({
                url: 'testid=1'
                })
                // test
                Page({
                  onLoad (option) {
                    console.log(option.query)
                  }
                })`,
                "display": true,
                demoFunction() {
                  wx.reLaunch({
                    url: '../apis/index'
                  })
                }
              },
              {
                "name": "navigateBack",
                "description": "Closes the current page to return to the previous page or multiple levels.",
                "action": true,
                "args": [],
                "implementation": `// Note: Call navigateTo When jump, 
                  // the page that calls  this method is added to the stack,
                  // and redirectTo Method does not. See example code below

                  // This is page A.
                  wx.navigateTo({
                    url: 'Bid=1'
                  })

                  // This is page B.
                  wx.navigateTo({
                    url: 'Cid=1'
                  })

                  // On page C NavigateBack will return to page A
                  wx.navigateBack({
                    delta: 2
                  })`,
                "display": true,
                demoFunction() {
                  wx.navigateBack({
                    delta: 1,
                  })
                }
              },
            ],
            "description": "Apis focused at Routing and Switch between pages/views",
          },
          "Jumping": {
            "content": [
              {
                "name": "navigateToMiniProgram",
                "description": "Open another Mini Program",
                "action": false,
                "args": [],
                "implementation": `wx.navigateToMiniProgram({
                  appId: '',
                  path: 'page/index/indexid=123',
                  extraData: {
                    foo: 'bar'
                  },
                  envVersion: 'develop',
                  success(res) {
                    // Open success
                  }
                  })`,
                "display": true,
              },
              {
                "name": "navigateBackMiniProgram",
                "description": "OGo back to the previous Mini Program. Only the current Mini Program is opened by other Mini Program can be called successfully",
                "action": false,
                "args": [],
                "implementation": `wx.navigateBackMiniProgram({
                  extraData: {
                    foo: 'bar'
                  },
                  success(res) {
                    // Open success
                  }
                  })`,
                "display": true,
              },
              {
                "name": "exitMiniProgram",
                "description": "Exit the current Mini Program. Click behavior is required for the call to succeed.",
                "action": false,
                "args": [],
                "implementation": `wx.exitMiniProgram({
                  success(res) {
                    // Open success
                  }
                  })`,
                "display": true,
              },
            ],
            "description": "Apis focused at jumping from one Mini App to another.",
          },
          "Forwarding": {
            "content": [
              {
                "name": "updateShareMenu",
                "description": "Update Forwarding Properties and the Share Context Menu",
                "action": false,
                "args": [],
                "implementation": `wx.updateShareMenu({
                withShareTicket: true,
                success () { }
                })
                `,
                "display": true,
              },
              {
                "name": "showShareMenu",
                "description": "Display the Share Context Menu on the current page",
                "action": false,
                "args": [],
                "implementation": `wx.showShareMenu({
                withShareTicket: true,
                menus: ['shareAppMessage', 'shareTimeline']
                })
                `,
                "display": true,
              },
              {
                "name": "showShareImageMenu",
                "description": "Open the pop-up window to share pictures, you can send pictures to friends, collection or download",
                "action": false,
                "args": [],
                "implementation": `wx.downloadFile({
                url: 'https://res.wx.qq.com/wxdoc/dist/assets/img/demo.ef5c5bef.jpg',
                success: (res) => {
                  wx.showShareImageMenu({
                    path: res.tempFilePath
                    })
                  }
                })
                `,
                "display": true,
              },
              {
                "name": "shareVideoMessage",
                "description": "Forward video to chat",
                "action": false,
                "args": [],
                "implementation": `// callback Writing method
                wx.downloadFile({
                  url: URL, // Download url
                  success (res) {
                    // Repost after download
                    wx.shareVideoMessage({
                      videoPath: res.tempFilePath,
                      success() {},
                      fail: console.error,
                    })
                  },
                  fail: console.error,
                })

                // async await Writing method
                const { tempFilePath } = await wx.downloadFile({
                  url: URL, // Download url
                })
                // Repost after download
                await wx.shareVideoMessage({
                  videoPath: res.tempFilePath,
                })`,
                "display": true,
              },
              {
                "name": "shareFileMessage",
                "description": "Forward file to chat",
                "action": false,
                "args": [],
                "implementation": `// callback Writing method
                wx.downloadFile({
                  url: URL, // Download url
                  success (res) {
                    // Repost after download
                    wx.shareFileMessage({
                      filePath: res.tempFilePath,
                      success() {},
                      fail: console.error,
                    })
                  },
                  fail: console.error,
                })

                // async await Writing method
                const { tempFilePath } = await wx.downloadFile({
                  url: URL, // Download url
                })
                // Repost after download
                await wx.shareFileMessage({
                  filePath: res.tempFilePath,
                })
              `,
                "display": true,
              },
              {
                "name": "hideShareMenu",
                "description": "Hide the forward or Share Context Menu for the current page",
                "action": false,
                "args": [],
                "implementation": `wx.hideShareMenu({
                menus: ['shareAppMessage', 'shareTimeline']
                })
                `,
                "display": true,
              },
            ],
            "description": "Apis focused at Forwarding or SHaring content to and from a Mini App.",
          }
        },
        "description": "Apis focused at Redirecting, Routing, Jumping, Sharing and Switch between pages, views and mini apps",
      },
      "Interfaces": {
        "content": {
          "Interactive": {
            "content": [
              {
                "name": "showToast",
                "description": "Display Message Prompt Box",
                "action": true,
                "args": ["title", "duration"],
                "implementation": `wx.showToast({
                title: "Success"?
                icon: 'success',
                duration: 2000
                })
                `,
                "display": true,
                demoFunction(title, duration) {
                  wx.showToast({
                    title: title,
                    icon: 'success',
                    duration: parseInt(duration)
                  })

                }
              },
              {
                "name": "showModal",
                "description": "Display modal dialog box",
                "action": true,
                "args": ["title", "content"],
                "implementation": `wx.showModal({
                title: "Hint"?
                content: 'This is a modal pop-up. '
                success (res) {
                  if (res.confirm) {
                    console.log("User clicks OK.")
                  } else if (res.cancel) {
                    console.log('User clicks to cancel '-)
                  }
                }
                })
                `,
                "display": true,
                demoFunction(title, content) {
                  wx.showModal({
                    title: title,
                    content: content,
                  })
                }
              },
              {
                "name": "showLoading",
                "description": "Display loading Cue box - Loader.",
                "action": true,
                "args": ["title"],
                "implementation": `wx.showLoading({
                title: 'Loading ',
                })

                setTimeout(function () {
                  wx.hideLoading()
                }, 2000)
                `,
                "display": true,
                demoFunction(title) {
                  wx.showLoading({
                    title: title,
                  })

                  setTimeout(function () {
                    wx.hideLoading()
                  }, 2000)

                }
              },
              {
                "name": "showActionSheet",
                "description": "Display Action Menu",
                "action": true,
                "args": [],
                "implementation": `wx.showActionSheet({
                itemList: ['A', 'B', 'C'],
                success (res) {
                  console.log(res.tapIndex)
                },
                fail (res) {
                  console.log(res.errMsg)
                }
                })
                `,
                "display": true,
                demoFunction() {
                  wx.showActionSheet({
                    itemList: ['Action 1', 'Action 2', 'Action 3'],
                    success(res) {
                      console.log(res.tapIndex)
                    },
                    fail(res) {
                      console.log(res.errMsg)
                    }
                  })
                }
              },
            ],
            "description": "Visual Alerts and Pop-Ups",
          },
          "Navigation Bar": {
            "content": [
              {
                "name": "showNavigationBarLoading",
                "description": "Show navigation bar loading animation on current page",
                "action": true,
                "args": [],
                "implementation": null,
                "display": true,
                demoFunction(title, duration) {
                  wx.showNavigationBarLoading(
                  )
                  setTimeout(() => { wx.hideNavigationBarLoading() }, 2000)
                }
              },
              {
                "name": "setNavigationBarTitle",
                "description": "Dynamically set the title of the current page",
                "action": true,
                "args": ["title"],
                "implementation": `
                wx.setNavigationBarTitle({
                title: "Current page"
                })
                `,
                "display": true,
                demoFunction(title) {
                  wx.setNavigationBarTitle({
                    title: title
                  })
                }
              },
              {
                "name": "setNavigationBarColor",
                "description": "Dynamically Set the page navigation bar color",
                "action": true,
                "args": ["backColor"],
                "implementation": `
                wx.setNavigationBarColor({
                  frontColor: '#ffffff',
                  backgroundColor: '#ff0000',
                  animation: {
                    duration: 400,
                    timingFunc: 'easeIn'
                  }
                  })
                  `,
                "display": true,
                demoFunction(backColor) {
                  wx.setNavigationBarColor({
                    frontColor: "#ffffff",
                    backgroundColor: backColor,
                    animation: {
                      duration: 400,
                      timingFunc: 'easeIn'
                    }
                  })
                }
              },
            ],
            "description": "Apis targeting the Navigation Bar for the current page",
          },
          "Background": {
            "content": [
              {
                "name": "setBackgroundTextStyle",
                "description": "Dynamically set drop-down background font, loading Style of Graph",
                "action": true,
                "args": [],
                "implementation": `
                wx.setBackgroundTextStyle({
                    textStyle: 'light' // options light or dark
                  })
                `,
                "display": true,
                demoFunction() {
                  wx.setBackgroundTextStyle({
                    textStyle: 'dark' // Drop Down Background Font, Loading The style of the diagram is dark
                  })
                }
              },
              {
                "name": "setBackgroundColor",
                "description": "Dynamically set the background color of the window",
                "action": true,
                "args": [],
                "implementation": `
                wx.setBackgroundColor({
                backgroundColor: '#ffffff', // The background color of the window is white
                })

                wx.setBackgroundColor({
                backgroundColorTop: '#ffffff', // The background color of the top window is   white
                backgroundColorBottom: '#ffffff', // The background color of the bottom window is white
                })
                `,
                "display": true,
                demoFunction() {
                  wx.setBackgroundColor({
                    backgroundColor: '#0061a2', // The background color of the window is white
                  })

                  wx.setBackgroundColor({
                    backgroundColorTop: '#0061a2', // The background color of the top window is white
                    backgroundColorBottom: '#0061a2', // The background color of the bottom window is white
                  })
                }
              }
            ],
            "description": "Apis targeting the Background Components for the current page",
          },
        },
        "description": "Apis focused on enhancing user interactions with the Mini App's interfaces or Application Views",
      },
      "Network": {
        "content": {
          "Requests": {
            "content": [
              {
                "name": "request",
                "description": "Initiate HTTPS Network request",
                "action": true,
                "args": [],
                "implementation": `wx.request({
                url: 'example.php', //Just an example, not a real interface address
                data: {
                  x: '',
                  and: ''
                },
                header: {
                  'content-type': 'application/json' // Default values
                },
                success (res) {
                  console.log(res.data)
                }
                })
                `,
                "display": true,
                demoFunction() {
                  wx.request({
                    url: 'https://devstrapi.thedigitalacademy.co.za/api/micro-apps/1046', //Just an example, not a real interface address
                    complete(res) {
                      wx.showModal({ title: "Results", content: JSON.stringify(res.data) })

                    }
                  })
                }
              },
            ],
            "description": "APIs targeting requests to external resources using HTTP/s",
          },
        },
        "description": "Apis focused on enhancing user interactions with the Mini App's interfaces or Application Views",
      },
      "Data Cache": {
        "content": {
          "Storage": {
            "content": [
              {
                "name": "setStorage",
                "description": "To store data in the local cache key In. Will overwrite the original key The corresponding content. Data is always available unless the user actively deletes it or the system cleans it for storage reasons. single key The maximum length of data allowed to be stored is 1 MB, all data storage capped at 10MB。",
                "action": true,
                "args": ["key", "data"],
                "implementation": `wx.setStorage({
                key:"key",
                data:"value"
                })`,
                "display": true,
                demoFunction(key, data) {
                  wx.setStorage({
                    key: key,
                    data: data,
                    complete() {
                      wx.showModal({ title: "Storage", content: wx.getStorageSync(key) ?? "No Data for the key: " + key })
                    }
                  })
                }
              },
              {
                "name": "getStorage",
                "description": "Gets the specified object asynchronously from the local cache key",
                "action": true,
                "args": ["key"],
                "implementation": `wx.getStorage({
                key: 'key',
                success (res) {
                  console.log(res.data)
                }
                })`,
                "display": true,
                demoFunction(key) {
                  return wx.getStorageSync(key) ?? "No Data for the key: " + key
                }
              },
              {
                "name": "removeStorage",
                "description": "Removes the specified item from the local cache key.",
                "action": true,
                "args": ["key"],
                "implementation": `wx.getStorage({
                key: 'key',
                success (res) {
                  console.log(res.data)
                }
                })`,
                "display": true,
                demoFunction(key) {
                  wx.removeStorage({
                    key: key,
                    success(res) {
                      wx.showModal({title: "Result", content: key + " Removed"})
                    },
                    fail() {
                      wx.showModal({title: "Result", content: key + " Isn't a valid key"})
                    }
                  })
                }
              },
            ],
            "description": "APIs targeting local storage",
          },
        },
        "description": "Apis focused on enhancing user interactions with the Mini App's interfaces or Application Views",
      },
    }

  }
})