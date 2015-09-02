Template.image_preview.helpers({
  myFormData: function() {
    return { directoryName: 'images', prefix: this._id, _id: this._id }
  },
  imgs: function(){
    return Images.find({},{sort: {position: -1, createdAt: -1}})
  },
  title: "已上傳圖片:",
  addfunction: function(){
    console.log("addfun")
    $(document).magnificPopup({
      delegate: '#parent-container .image-popup-vertical-fit',
      type: 'image'
    })
  }
});
