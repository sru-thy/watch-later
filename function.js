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
  if (video_id) { //UnhandledPromiseRejection warning :O
    index = video_id.length - 1;
    addall(index);
  }
  function addall(index) {
    service.playlistItems.insert({
      auth: auth,
      part: 'snippet',
      resource: {
        snippet: {
          playlistId: 'WL',
          position: 0,
          resourceId: {
            kind: 'youtube#video',
            videoId: video_id[index]
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
        setTimeout(function () {
          index--;
          if (index >= 0)
            addall(index); //Good ol'
        }, 3000); 
      }
    });
  }
}

module.exports = { addItems };