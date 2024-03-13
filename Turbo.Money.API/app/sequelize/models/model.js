module.exports = (db) => {
    require('./model.user')(db);
    require('./model.bank')(db);
    require('./model.budget')(db);
}

