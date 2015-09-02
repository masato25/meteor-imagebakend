Meteor.startup(function () {
  UploadServer.init({
    tmpDir:  process.env.PWD + '/.uploads/tmp',
    uploadDir: process.env.PWD + '/public/images',
    checkCreateDirectories: true,
    imageTypes: /.(gif|jpe?g|png)$/i,
    getDirectory: function(fileInfo, formData){
      if(formData && formData.directoryName != null)
      {
        return formData.directoryName
      }
      return ""
    },
    getFileName: function(fileInfo, formData){
      if(formData && formData.prefix != null)
      {
        return formData.prefix + '_' + fileInfo.name
      }
      return fileInfo.name
    },
    finished: function(fileInfo, formFields){
      var maxpos = 0;
      var itmp = Images.find({}, {sort: {position: -1,limit: 1}}).fetch()
      if(itmp.length > 0){
        maxpos = itmp[0].position + 1
      }
      Images.insert({
        name: fileInfo.name,
        createdAt: new Date(),
        images_name: fileInfo.name,
        position: maxpos
      })
    },
    cacheTime: 100,
    mimeTypes: {
        "xml": "application/xml",
        "vcf": "text/x-vcard"
    }
  })
})
Meteor.methods({
  'deleteFile': function(_id){
    var img = Images.findOne(_id)
    var upload = Uploads.find({name: img.name},{limit: 1}).fetch()[0]
    if(img == null || upload == null){
      throw new Meteor.Error(404, 'Upload not found'); // maybe some other code
    }
    UploadServer.delete(upload.path)
    Images.remove(_id)
    Uploads.remove({name: upload.name})
  }
})
