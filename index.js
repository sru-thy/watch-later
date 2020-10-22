var fs = require('fs');
var { authorize } = require('./auth');
var { addItems } = require('./function');
const cron = require('node-cron');

task = () => {
  // Load client secrets from a local file.
  fs.readFile('client_secret.json', (err, content) => {
    if (err) {
      console.log('Error loading client secret file: ' + err);
      return;
    }
    // Authorize a client with the loaded credentials, then call the YouTube API.
    authorize(JSON.parse(content), addItems);
  });

}

cron.schedule("0 0 0 * * *", () => {
  task(); //runs every midnight
  console.log('again');
})
