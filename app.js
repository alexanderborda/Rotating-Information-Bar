// Variables
let settings = {
  "global": {
    "internal_clock": 1000,
      "stats_clock": 60000
  },
"stats": {
    "refresh_rate": 5 // Seconds
  }
};
let state = {
"stats": {
    "followers": {
        "enabled": false,
          "count": 0,
          "icon": "heart"
      },
      "subs": {
        "enabled": false,
          "count": 0,
          "icon": "heart"
      },
      "viewers": {
        "enabled": false,
          "count": 0,
          "icon": "heart"
      }
  },
  "latest": {
    "follower": {
        "enabled": false,
          "name": "",
          "icon": "person",
          "empty": ""
      },
      "subscriber": {
        "enabled": false,
          "name": "",
          "amount": 0,
          "icon": "person",
          "empty": ""
      },
      "donation": {
        "enabled": false,
          "name": "",
          "amount": 0,
          "icon": "person",
          "empty": ""
      },
      "cheer": {
        "enabled": false,
          "name": "",
          "amount": 0,
          "icon": "person",
          "empty": ""
      },
       // Socials 'twitch', 'youtube', 'tiktok', 'instagram', 'twitter', 'facebook', 'discord'
      "twitch": {
        "enabled": false,
          "name": "",
          "amount": 0,
          "icon": "person",
          "empty": ""
      },
      "youtube": {
        "enabled": false,
          "name": "",
          "amount": 0,
          "icon": "person",
          "empty": ""
      },
      "tiktok": {
        "enabled": false,
          "name": "",
          "amount": 0,
          "icon": "person",
          "empty": ""
      },
      "instagram": {
        "enabled": false,
          "name": "",
          "amount": 0,
          "icon": "person",
          "empty": ""
      },
      "twitter": {
        "enabled": false,
          "name": "",
          "amount": 0,
          "icon": "person",
          "empty": ""
      },
      "facebook": {
        "enabled": false,
          "name": "",
          "amount": 0,
          "icon": "person",
          "empty": ""
      },
      "discord": {
        "enabled": false,
          "name": "",
          "amount": 0,
          "icon": "person",
          "empty": ""
      }
  },
  "train": {
    "type": "follower-latest",
      "duration": 30, // Seconds
      "width": 0,
      "count": 0
  }
};
let channelName = '';
let stats_keys;
let stats_pos = 0;
let stats_width = 0;
let latest_keys;
let latest_pos = 0;
let currency = '';
// Start everything!
function start() {
  // Generate stats_keys variable
  stats_keys = Object.keys(state.stats);
  latest_keys = Object.keys(state.latest);

  // Setup train
  $('.train').html(state.train.count);
  $('.train-bar').width(state.train.width + "%");

  // Start Train Clock
  setInterval(function() {
    // Calculate minus width
     state.train.width -= settings.global.internal_clock / (state.train.duration * 1000) * 100
  
    // Update bar
      if (state.train.width < 0) {
        state.train.width = 0;
          state.train.count = 0;
          $('.train').html(state.train.count);
      }
      $('.train-bar').width(state.train.width + "%");
  }, settings.global.internal_clock);

  // Live Viewers/Followers Refresh
  if (state.stats.viewers) {
    setInterval(function() {
          // Viewers
          fetch(`https://decapi.me/twitch/viewercount/${channelName}`).then(response => response.text()).then(data => {
              if (!data.includes('offline')) {
                state.stats.viewers.count = data;
              } else {
                state.stats.viewers.count = 0;
              }
          });
      }, settings.global.stats_clock);	
  }

  // Start refresh clock
  setInterval(function() {
      // Stats
      // fadeOut current
      $('.stats-container').fadeOut(function() {
        // Update to new text and fadeIn
          $('.stats-container').html('<span class="text">' + state.stats[stats_keys[stats_pos]].count + ' <i class="fas fa-' + state.stats[stats_keys[stats_pos]].icon + '"></i></span>')
        $('.stats-container').width('initial');
          // Calculate width
          if (stats_width < $('.stats-container').width()) {
            stats_width = $('.stats-container').width();
          } else {
            $('.stats-container').width(stats_width);
          }
          $('.stats-container').fadeIn();
      
        stats_pos++;
          if (stats_pos == stats_keys.length) {
              stats_pos = 0;
          }
      });
    
      // Latest
      // Variables
      let latestObject = state.latest[latest_keys[latest_pos]];
      let latestType = latest_keys[latest_pos];
    
      // fadeOut Current
      $('.latest-container').fadeOut(function() {
        // Genereate html
          let text = "";
          text += "<span class='text'>";
          
          // Check if empty
          if (latestObject.name == "") {
            text += latestObject.empty + " <i class='fas fa-" + latestObject.icon + "'></i>";
          } else {
              // Check type
              switch (latestType) {
                  case 'follower':
                      text += latestObject.name + " <i class='fas fa-" + latestObject.icon + "'></i>";
                  break;
                  case 'subscriber':
                      text += latestObject.name + " <span class='accent'>" + latestObject.amount + " " + ((latestObject.amount > 1) ? "Months" : "Month") + "</span> <i class='fas fa-" + latestObject.icon + "'></i>";
                  break;
                  case 'donation':
                      text += latestObject.name + " <span class='accent'>" + currency + latestObject.amount.toFixed(2) + "</span> <i class='fas fa-" + latestObject.icon + "'></i>";
                  break;
                  case 'cheer':
                      text += latestObject.name + " <span class='accent'>" + latestObject.amount + " " + ((latestObject.amount > 1) ? "Bits" : "Bit") + "</span> <i class='fas fa-" + latestObject.icon + "'></i>";
                  break;
                  // Socials 'twitch', 'youtube', 'tiktok', 'instagram', 'twitter', 'facebook', 'discord'
                  case 'twitch':
                      text += "<i class='fa-brands fa-" + latestObject.icon + "'></i>" + latestObject.name;
                  break;
                  case 'youtube':
                      text += "<i class='fa-brands fa-" + latestObject.icon + "'></i>" + latestObject.name;
                  break;
                  case 'tiktok':
                      text += "<i class='fa-brands fa-" + latestObject.icon + "'></i>" + latestObject.name;
                  break;
                  case 'instagram':
                      text += "<i class='fa-brands fa-" + latestObject.icon + "'></i>" + latestObject.name;
                  break;
                  case 'twitter':
                      text += "<i class='fa-brands fa-" + latestObject.icon + "'></i>" + latestObject.name;
                  break;
                  case 'facebook':
                      text += "<i class='fa-brands fa-" + latestObject.icon + "'></i>" + latestObject.name;
                  break;
                  case 'discord':
                      text += "<i class='fa-brands fa-" + latestObject.icon + "'></i>" + latestObject.name;
                  break;
              }
          }
        
          text += "</span>";
        
          // Update
          $('.latest-container').html(text);
          // Fade in
          $('.latest-container').fadeIn();
      
        latest_pos++;
          if (latest_pos == latest_keys.length) {
              latest_pos = 0;
          }
      });
  }, settings.stats.refresh_rate * 1000);
}

// On widget load, setup settings/state etc
window.addEventListener('onWidgetLoad', function(obj) {
  console.log('ON WIDGET LOAD')
  console.log(obj)
// Variables
  let fieldData = obj.detail.fieldData;
  currency = obj.detail.currency.symbol;

  if (channelName == '') {
    channelName = obj.detail.channel.username;
  }
  state.train.duration = fieldData.train_length;
  state.train.type = fieldData.train_type;
  
  // Update settings
  settings.stats.refresh_rate = fieldData.stats_refresh_rate;

  // Stats
  if (fieldData.stats_toggle_followers == "true") {
    state.stats.followers.enabled = true;
      state.stats.followers.icon = fieldData.followers_icon;
      // Followers
      state.stats.followers.count= obj.detail.session.data["follower-total"].count;
  } else {
    delete state.stats.followers;
  }
  if (fieldData.stats_toggle_subs == "true") {
    state.stats.subs.enabled = true;
      state.stats.subs.icon = fieldData.subs_icon;
      state.stats.subs.count = obj.detail.session.data["subscriber-total"].count;
  } else {
    delete state.stats.subs;
  }
  if (fieldData.stats_toggle_viewers == "true") {
    state.stats.viewers.enabled = true;
      state.stats.viewers.icon = fieldData.viewers_icon;
      // Update live viewers
      fetch(`https://decapi.me/twitch/viewercount/${channelName}`).then(response => response.text()).then(data => {
          if (!data.includes('offline')) {
            state.stats.viewers.count = data;
          } else {
              state.stats.viewers.count = 0;
          }
      });
  } else {
    delete state.stats.viewers;
  }
  
  // Latest
  if (fieldData.latest_toggle_follower == "true") {
    state.latest.follower.empty = fieldData.latest_follower_empty;
      state.latest.follower.enabled = true;
      state.latest.follower.icon = fieldData.followers_icon;
      
      if (obj.detail.session.data["follower-latest"].name != "") {
        state.latest.follower.name = obj.detail.session.data["follower-latest"].name;
      }
  } else {
    delete state.latest.follower;
  }
  if (fieldData.latest_toggle_donation == "true") {
    state.latest.donation.empty = fieldData.latest_donation_empty;
      state.latest.donation.enabled = true;
      state.latest.donation.icon = fieldData.donation_icon;
    
      if (obj.detail.session.data["tip-latest"].name != "") {
        state.latest.donation.name = obj.detail.session.data["tip-latest"].name;
          state.latest.donation.amount = obj.detail.session.data["tip-latest"].amount;
      }
  } else {
    delete state.latest.donation;
  }
  if (fieldData.latest_toggle_cheer == "true") {
    state.latest.cheer.empty = fieldData.latest_cheer_empty;
      state.latest.cheer.enabled = true;
      state.latest.cheer.icon = fieldData.cheer_icon;
    
      if (obj.detail.session.data["cheer-latest"].name != "") {
        state.latest.cheer.name = obj.detail.session.data["cheer-latest"].name;
          state.latest.cheer.amount = obj.detail.session.data["cheer-latest"].amount;
      }
  } else {
    delete state.latest.cheer;
  }
  if (fieldData.latest_toggle_subscriber == "true") {
    state.latest.subscriber.empty = fieldData.latest_subscriber_empty;
      state.latest.subscriber.enabled = true;
      state.latest.subscriber.icon = fieldData.subs_icon;
    
      if (obj.detail.session.data["subscriber-latest"].name != "") {
        state.latest.subscriber.name = obj.detail.session.data["subscriber-latest"].name;
          state.latest.subscriber.amount = obj.detail.session.data["subscriber-latest"].amount;
      }
  } else {
    delete state.latest.subscriber;
  }
  // Socials 'twitch', 'youtube', 'tiktok', 'instagram', 'twitter', 'facebook', 'discord'
    if (fieldData.latest_toggle_twitch == "true") {
    state.latest.twitch.empty = fieldData.latest_twitch_empty;
      state.latest.twitch.enabled = true;
      state.latest.twitch.icon = fieldData.twitch_icon;
  } else {
    delete state.latest.twitch;
  }
  if (fieldData.latest_toggle_youtube == "true") {
    state.latest.youtube.empty = fieldData.latest_youtube_empty;
      state.latest.youtube.enabled = true;
      state.latest.youtube.icon = fieldData.youtube_icon;
  } else {
    delete state.latest.youtube;
  }
  if (fieldData.latest_toggle_tiktok == "true") {
    state.latest.tiktok.empty = fieldData.latest_tiktok_empty;
      state.latest.tiktok.enabled = true;
      state.latest.tiktok.icon = fieldData.tiktok_icon;
  } else {
    delete state.latest.tiktok;
  }
  if (fieldData.latest_toggle_instagram == "true") {
    state.latest.instagram.empty = fieldData.latest_instagram_empty;
      state.latest.instagram.enabled = true;
      state.latest.instagram.icon = fieldData.instagram_icon;
  } else {
    delete state.latest.instagram;
  }
  if (fieldData.latest_toggle_twitter == "true") {
    state.latest.twitter.empty = fieldData.latest_twitter_empty;
      state.latest.twitter.enabled = true;
      state.latest.twitter.icon = fieldData.twitter_icon;
  } else {
    delete state.latest.twitter;
  }
  if (fieldData.latest_toggle_facebook == "true") {
    state.latest.facebook.empty = fieldData.latest_facebook_empty;
      state.latest.facebook.enabled = true;
      state.latest.facebook.icon = fieldData.facebook_icon;
  } else {
    delete state.latest.facebook;
  }
  if (fieldData.latest_toggle_discord == "true") {
    state.latest.discord.empty = fieldData.latest_discord_empty;
      state.latest.discord.enabled = true;
      state.latest.discord.icon = fieldData.discord_icon;
  } else {
    delete state.latest.discord;
  }
  // Start Everything!
  start();
});

// On session update
window.addEventListener('onSessionUpdate', function(obj) {
  console.log('ON SESSION UPDATE')
  console.log(obj)

  // Stats - Subs
  if (state.stats.subs) {
    state.stats.subs.count = obj.detail.session["subscriber-total"].count;
  }

  // Latest - Donation
  if (state.latest.donation) {
    state.latest.donation.name = obj.detail.session["tip-latest"].name;
      state.latest.donation.amount = obj.detail.session["tip-latest"].amount;
  }

  // Latest - Cheer
  if (state.latest.cheer) {
    state.latest.cheer.name = obj.detail.session["cheer-latest"].name;
      state.latest.cheer.amount = obj.detail.session["cheer-latest"].amount;
  }

  // Latest - Subscriber
  if (state.latest.subscriber) {
    state.latest.subscriber.name = obj.detail.session["subscriber-latest"].name;
      state.latest.subscriber.amount = obj.detail.session["subscriber-latest"].amount;
  }

  // Latest - Follower
  if (state.latest.follower) {
    state.latest.follower.name = obj.detail.session["follower-latest"].name;
  }

  // Follower Count
  if (state.stats.followers){
      state.stats.followers.count=obj.detail.session["follower-total"].count;
  }
   // Socials - Tiktok
  //if (state.latest.tiktok) {
   // state.latest.tiktok.name = obj.detail.session["tiktok-socials"].name;
  //}
  //if (state.latest.discord) {
  //  state.latest.discord.name = obj.detail.session["discord-socials"].name;
 // }
});

// On new event received
window.addEventListener('onEventReceived', function(obj) {
if (obj.detail.listener == state.train.type) {
    state.train.width = 100;
      state.train.count++;
      $('.train').html(state.train.count);
  }
});