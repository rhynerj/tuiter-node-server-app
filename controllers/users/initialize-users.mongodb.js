/* global use, db */
// MongoDB Playground
use('tuiter-su2-23');
db.users.drop();

db.users.insertMany([
    {'_id': 1, 'username': 'alice', 'password': 'pwa'},
    {'_id': 2, 'username': 'bob', 'password': 'pwb'},
    {'_id': 3, 'username': 'charlie', 'password': 'pwc'},
]);