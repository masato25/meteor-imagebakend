Router.route('/', function () {
  this.render('uploadmyimage');
});
Router.route('/api', function () {
  this.response.setHeader('Content-Type', 'application/json');
  this.response.write( EJSON.stringify( Images.find({}).fetch() ) );
});

JsonRoutes.add("get", "/api", function (req, res, next) {
  var js = Images.find({},{sort: {position: 1}}).fetch()
  js = _.map(js, function(j){ return [j["position"],j["name"]]; });
  JsonRoutes.sendResult(res, 200, js);
});
