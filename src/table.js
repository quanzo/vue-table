module.exports = {
    Table: function (name = "Table") {
        const TBL = require('./table.vue');
        return Object.assign(TBL.default, { "name": name });
    }
};