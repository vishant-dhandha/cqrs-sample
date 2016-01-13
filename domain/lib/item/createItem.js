var http = require('http');
function fetchURL(url, done) {
    var body = '';
    http.get(url, function(res){
        res.on('data', function(chunk){
            body += chunk.toString();
        });

        res.on('end', function(chunk){
            done(null, body);
        });
    }).on('error', function(e){
            done(e);
        });
}
var append = function(data,callback){
    fetchURL('http://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA', function(err,res){
        data.info1 = res
        callback(null)
    });
}
module.exports = require('cqrs-domain').defineCommand({
  name: 'createItem'
}, function (data, aggregate) {
    append(data,function(err,res){
        aggregate.apply('itemCreated', data);
    })
});