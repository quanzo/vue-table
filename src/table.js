module.exports = {
    Table: function (name = "Table") {
        const TBL = require('./table.vue');
        return Object.assign(TBL.default, { "name": name });
    },
    TestSlave: function (name = "slave-test") {
        const ST = require('./slave-test.js');
        return Object.assign(ST.default, { "name": name });
    }
};