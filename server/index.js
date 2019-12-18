const express = require("express");
const cors = require("cors");
const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const AmazonStrategy = require("passport-amazon").Strategy;
const GithubStrategy = require("passport-github").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const InstagramStrategy = require("passport-instagram").Strategy;
const SpotifyStrategy = require("passport-spotify").Strategy;
const TwitchStrategy = require("passport-twitch.js").Strategy;
const keys = require("../config");
const chalk = require("chalk");

// this is in place of the database
let user = {};

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((user, cb) => {
  cb(null, user);
});

// set up server

const app = express();
app.use(cors());
app.use(passport.initialize());

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: keys.FACEBOOK.clientID,
      clientSecret: keys.FACEBOOK.clientSecret,
      callbackUrl: "/auth/facebook/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(chalk.blue(JSON.stringify(profile)));
      user = { ...profile };
      return cb(null, profile);
    }
  )
);

app.get("/auth/facebook", passport.authenticate("facebook"));
app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", (req, res) => {
    res.redirect("/profile");
  })
);

// Amazon Strategy
passport.use(
  new AmazonStrategy(
    {
      clientID: keys.AMAZON.clientID,
      clientSecret: keys.AMAZON.clientSecret,
      callbackUrl: "/auth/amazon/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(chalk.blue(JSON.stringify(profile)));
      user = { ...profile };
      return cb(null, profile);
    }
  )
);

app.get(
  "/auth/amazon",
  passport.authenticate("amazon", {
    scope: ["profile"]
  })
);
app.get(
  "/auth/amazon/callback",
  passport.authenticate("amazon", (req, res) => {
    res.redirect("/profile");
  })
);

// Github Strategy
passport.use(
  new GithubStrategy(
    {
      clientID: keys.GITHUB.clientID,
      clientSecret: keys.GITHUB.clientSecret,
      callbackUrl: "/auth/github/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(chalk.blue(JSON.stringify(profile)));
      user = { ...profile };
      return cb(null, profile);
    }
  )
);

app.get("/auth/github", passport.authenticate("github"));
app.get(
  "/auth/github/callback",
  passport.authenticate("github", (req, res) => {
    res.redirect("/profile");
  })
);

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.GOOGLE.clientID,
      clientSecret: keys.GOOGLE.clientSecret,
      callbackUrl: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(chalk.blue(JSON.stringify(profile)));
      user = { ...profile };
      return cb(null, profile);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);
app.get(
  "/auth/google/callback",
  passport.authenticate("google", (req, res) => {
    res.redirect("/profile");
  })
);

// Instagram Strategy
passport.use(
  new InstagramStrategy(
    {
      clientID: keys.INSTAGRAM.clientID,
      clientSecret: keys.INSTAGRAM.clientSecret,
      callbackUrl: "/auth/instagram/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(chalk.blue(JSON.stringify(profile)));
      user = { ...profile };
      return cb(null, profile);
    }
  )
);

app.get("/auth/instagram", passport.authenticate("instagram"));
app.get(
  "/auth/instagram/callback",
  passport.authenticate("instagram", (req, res) => {
    res.redirect("/profile");
  })
);

// Spotify Strategy
passport.use(
  new SpotifyStrategy(
    {
      clientID: keys.SPOTIFY.clientID,
      clientSecret: keys.SPOTIFY.clientSecret,
      callbackUrl: "/auth/spotify/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(chalk.blue(JSON.stringify(profile)));
      user = { ...profile };
      return cb(null, profile);
    }
  )
);

app.get("/auth/spotify", passport.authenticate("spotify"));
app.get(
  "/auth/spotify/callback",
  passport.authenticate("spotify", (req, res) => {
    res.redirect("/profile");
  })
);

// Twitch Strategy
passport.use(
  new TwitchStrategy(
    {
      clientID: keys.TWITCH.clientID,
      clientSecret: keys.TWITCH.clientSecret,
      callbackUrl: "/auth/spotify/callback"
    },
    (accessToken, refreshToken, profile, cb) => {
      console.log(chalk.blue(JSON.stringify(profile)));
      user = { ...profile };
      return cb(null, profile);
    }
  )
);

app.get("/auth/twitch", passport.authenticate("twitch"));
app.get(
  "/auth/twitch/callback",
  passport.authenticate("twitch", (req, res) => {
    res.redirect("/profile");
  })
);

app.get("/user", (req, res) => {
  console.log("Getting user data");
  res.send(user);
});

app.get("/auth/logout", (req, res) => {
  console.log("logging out");
  user = {};
  res.redirect("/");
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log("🌷🌷🌷 Server is running on localhost:5000 🌷🌷🌷");
});
