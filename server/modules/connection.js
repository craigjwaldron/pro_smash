// connection.js
var connectionString = 'postgres://localhost:5432/pro_smash_users';

if(process.env.DATABASE_URL != undefined) {
    connectionString = process.env.DATABASE_URL + 'ssl';
} else {
    connectionString = 'postgres://localhost:5432/pro_smash_users';
}

module.exports = connectionString;
