var _           = require('lodash-node');
var conf        = require('./conf');
var connect     = require('connect');
var Cookies     = require('cookies');
var vhost       = require('vhost');

var app = connect();
var acom = connect();
var bcom = connect();
var sso = connect();

app
  .use(vhost('a.com', acom))
  .use(vhost('b.com', bcom))
  .use(vhost('sso.com', sso));

var routeHandler = function(name, req, res){
  var cookies = new Cookies(req, res);
  cookies.set('token_'+name, name);
  cookies.set('token_'+name+'_domain', name+'_domain', { domain: name+'.com' });
  res.write('<html>');
  res.write('iframe: <iframe id="ssoIframe" src="http://sso.com:1337" width="300" height="100"></iframe><br>');
  res.write('user action: <a href=\'javascript:sso=window.open("http://sso.com:1337", "sso", "width=300, height=100, menubar=0, status=0, titlebar=0, toolbar=0, location=0");setTimeout(function(){sso.close();document.getElementById("ssoIframe").src="http://sso.com:1337";},500)\'>login</a><br>');
  res.write('host: ' + req.headers.host + '<br>');
  res.write('token_'+name+': ' + cookies.get('token_'+name) + '<br>');
  res.write('token_'+name+'_domain: ' + cookies.get('token_'+name+'_domain') + '<br>');
  res.write('</html>');
  res.end('\n');
};

acom.use(_.partial(routeHandler, 'a'));
bcom.use(_.partial(routeHandler, 'b'));
sso.use(function(req, res){
  var cookies = new Cookies(req, res);
  var name = 'sso';
  cookies.set('token_'+name, name);
  cookies.set('token_'+name+'_domain', name+'_domain', { domain: name+'.com' });
  res.write('<html>');
  res.write('host: ' + req.headers.host + '<br>');
  res.write('token_'+name+': ' + cookies.get('token_'+name) + '<br>');
  res.write('token_'+name+'_domain: ' + cookies.get('token_'+name+'_domain') + '<br>');
  res.write('</html>');
  res.end('\n');
});

app.listen(conf.port, function() {
  console.log('running', conf);
});

