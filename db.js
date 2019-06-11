module.exports = {
    execute: execute
  };
  
  var pg = require('pg');
  var url = require('url');
  var params = url.parse(process.env.DATABASE_URL || "postgres://asdf:asdf@asdf.com:1111/asdf");
  var auth = params.auth.split(':');
  
  var config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true,
    max: process.env.PG_CON_MAX || 2,
    idleTimeoutMillis: process.env.PG_IDLE_TIMEOUT || 1000
  };
  
  var pool = new pg.Pool(config);
  
  function execute(query) {
    return new Promise(function(resolve, reject) {
      pool.connect(function(err, client, done) {
  
        if (err || !client) {
          return reject(err);
        }
  
        client.query(
          query,
          function(err, result) {
            done();
  
            if (err || !result.rows) {
              reject(err);
              return;
            }
  
            resolve(result.rows);
          }
        );
      });
    });
  }
  