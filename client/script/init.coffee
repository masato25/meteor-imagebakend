Meteor.startup () ->
  Uploader.uploadUrl = Meteor.absoluteUrl "upload" #/ Cordova needs absolute URL
  Uploader.finished = (index, fileInfo, templateContext) ->
    Uploads.insert fileInfo
  Uploader.localisation = {
    browse: "瀏覽",
    cancelled: "已取消",
    remove: "移除",
    upload: "上傳",
    done: "完成",
    cancel: "取消"
  }
