/**
 * Create and add items to playlist
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */

const { google } = require('googleapis');
const service = google.youtube('v3');
const { scrape } = require('./scrape')

const addItems = async (auth) => {
  video_id = await scrape();
  request = service.playlistItems.insert({
    auth: auth,
    part: 'id,snippet',
    resource: {
      snippet: {
        playlistId: 'PLFAuwC0o5nudCYkiM91HmHuAbD8R6M9qi',
        position: 0,
        resourceId: {
          kind: 'youtube#video',
          videoId: `${video_id[0]}`
        }
      }
    }
  }, function (err, response) {
    if (err) {
      console.log('The API returned an error: ' + err.message);
      return;
    }
    else {
      console.log('API executed succesfully');
    }
  }); 
}

module.exports = { addItems };