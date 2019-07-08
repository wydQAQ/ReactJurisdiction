const proxy = require('http-proxy-middleware');
module.exports = function(app) {
app.use(proxy('/api', { target: 'http://192.168.1.130:8888/' }));
app.use(proxy('/per', { target: 'http://192.168.1.130:8888/' }))
};