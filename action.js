/**
 * Create and add items to playlist
 *
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */

const { google } = require('googleapis');
var service = google.youtube('v3');

const addItems = (auth) => {
  service.playlists.insert({
    auth: auth,
    part: 'snippet,status',
    resource: {
      snippet: {
      title: 'Test Playlist',
      description: 'A private playlist created with the YouTube API'
      },
      status: {
          privacyStatus: 'private'
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
    // var channels = response.data.items;
    // if (channels.length == 0) {
    //   console.log('No channel found.');
    // } else {
    //   console.log('This channel\'s ID is %s. Its title is \'%s\', and ' +
    //     'it has %s views.',
    //     channels[0].id,
    //     channels[0].snippet.title,
    //     channels[0].statistics.viewCount);
    // }
  });
}

module.exports = { addItems };