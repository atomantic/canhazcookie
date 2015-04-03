var _           = require('lodash-node');
var conf        = require('./conf');
var connect     = require('connect');
var Cookies     = require('cookies');
var vhost       = require('vhost');

var app = connect();
var acom = connect();
var bcom = connect();
var ccom = connect();

app
  .use(vhost('a.com', acom))
  .use(vhost('b.com', bcom))
  .use(vhost('c.com', ccom));

var routeHandler = function(name, req, res){
  var cookies = new Cookies(req, res);
  cookies.set('token_'+name, name);
  cookies.set('token_'+name+'_domain', name+'_domain', { domain: name+'.com' });
  res.write('host: ' + req.headers.host + '\n');
  res.write('token_'+name+': ' + cookies.get('token_'+name) + '\n');
  res.write('token_'+name+'_domain: ' + cookies.get('token_'+name+'_domain') + '\n');
  res.end('\n');
};

acom.use(_.partial(routeHandler, 'a'));
bcom.use(_.partial(routeHandler, 'b'));
ccom.use(_.partial(routeHandler, 'c'));

app.listen(conf.port, function() {
  console.log('running', conf);
});

