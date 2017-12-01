const Koa = require('koa');
const bodyParse = require('koa-bodyparser');
const app = new Koa();

const staticFiles = require('./static-files');
const controller = require('./controller');

app.use(bodyParse());
app.use(staticFiles('/static/', __dirname + '/static'));
app.use(controller());

app.listen(3000);
console.log(`server listening at http://localhost:3000`);