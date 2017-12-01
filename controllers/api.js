var users = [
    {
        id: 1,
        name: 'xiaoming',
        age: 20,
        jobs: 'engineer'
    },
    {
        id: 2,
        name: 'xiaogong',
        age: 28,
        jobs: 'teacher'
    }
];

var get_users = async (ctx, next) => {
    ctx.response.type = 'application/json';
    ctx.response.body = users;
}

var id = users.length;

var add_user = async (ctx, next) => {
    id++;
    let u = {
        id: id,
        name: ctx.request.body.name,
        age: ctx.request.body.age,
        jobs: ctx.request.body.jobs
    };
    users.push(u);
    ctx.response.type = 'application/json';
    ctx.response.body = {
        success: 1,
        data: u
    };
}

var del_user = async (ctx, next) => {
    let delId = ctx.request.body.id;
    users = users.filter( item => {
        if(item.id != delId){
            return item;
        }
    });
    ctx.response.type = 'application/json';
    ctx.response.body = {
        success: 1,
        data: true
    };
}

module.exports = {
    'GET /api/get-users-list': get_users,
    'POST /api/add-user': add_user,
    'POST /api/del-user': del_user
}