/**
 * Create and add items to playlist
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */

const { google } = require('googleapis');
var service = google.youtube('v3');

const addItems = (auth) => {
  service.playlistItems.insert({
    auth: auth,
    part: 'id,snippet',
    resource: {
      snippet: {
        playlistId: 'PLFAuwC0o5nudCYkiM91HmHuAbD8R6M9qi',
        position: 0,
        resourceId:{
          kind: 'youtube#video',
          videoId: 'ub82Xb1C8os'
        }
      }
    }
  }, function (err, response) {
    if (err) {
      console.log('The API returned an error: ' + err);
      return;
    }
    else{
      console.log('API executed succesfully');
    }
  });
}

module.exports = { addItems };