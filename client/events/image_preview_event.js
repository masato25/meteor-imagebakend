Template.image_preview.events({
  'click .glyphicon.glyphicon-arrow-up': function(){
    try{
      var next_node = Images.find({ 'position': { $gt: parseInt(this.position)} }, {sort: {position: 1},limit: 1}).fetch()
      if(next_node.length == 0){
        alert("你無法執行這個操作")
        return null
      }else{
        next_node = next_node[0]
      }
      Images.update({ _id: this._id}, { $set: {position: next_node.position} })
      Images.update({ _id: next_node._id}, { $set: {position: this.position} })
    }catch(err){
      console.log(err)
    }
  },
  'click .glyphicon.glyphicon-arrow-down': function(){
    try{
      var pre_node = Images.find({ 'position': { $lt: parseInt(this.position)} }, {sort: {position: -1},limit: 1}).fetch()
      if(pre_node.length == 0){
        alert("你無法執行這個操作")
        return null
      }else{
        pre_node = pre_node[0]
      }
      Images.update({ _id: this._id}, { $set: {position: pre_node.position} })
      Images.update({ _id: pre_node._id}, { $set: {position: this.position} })
    }catch(err){
      console.log(err)
    }
  },
  'click .deletefs': function(event){
    event.preventDefault();
    var mensaje = confirm('確定刪除?');
    if(mensaje === true){
      console.log(this.images_name)
      var filename = this.images_name
      Meteor.call('deleteFile', this._id)
      console.log("Remove success");
    }
  }
})
