
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var ejs = require('ejs');
var fs = require('fs');

var app = express();

// all environments
app.set('port', process.env.PORT || 2000);
app.set('views', path.join(__dirname, 'views'));

//app.set('view engine', 'jade');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/docs', function(req, res){
  res.render('docs/index', { title: 'nojs docs' });
})

fs.readFile('./public/src/docs/config.json', function(err, data){
    if(err) {
        throw err;
    }
    var page = JSON.parse(data),
        i, m, j, q;
    for( i in page ){
        m = page[i].data;
        
        for( j=0; j<m.length; j++ ){
            q = m[j];
            if( !q.link ){
                continue;
            }
            !function(q,i){
                app.get('/docs/'+i+'/'+q, function(req, res){
                    res.render('docs/'+i+'/'+q);
                });
            }(q.link,i);
        }        
    }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});