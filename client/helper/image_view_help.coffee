Template.image_view.helpers specificFormData: ->
    imgobj = {
      id: @_id,
      other: @other,
      hard: 'Lolcats'
    }
    console.log imgobj
    return imgobj

Template.image_view.onRendered ->
  console.log "拖曳上傳"
  $('.jqDropZone.fade').text("拖曳上傳")
