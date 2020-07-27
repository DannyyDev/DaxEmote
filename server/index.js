const express = require("express");
const app = express();
const cors = require("cors");
const passport = require("passport");
const DiscordStrategy = require("passport-discord").Strategy;
const Discord = require("discord.js");
const client = new Discord.Client();
const configData = require("./modules/configuration/configData.json");
const userDataObject = {};
const prefix = configData.prefix;
 
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
passport.use(new DiscordStrategy({
    clientID: configData.clientID,
    clientSecret: configData.clientSecret,
    callbackURL: configData.callbackURL,
    scope: configData.scopes
}, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
        return done(null, profile);
    });
}));

app.get('/auth/discord/login', passport.authenticate('discord', { scope: configData.scopes }), function(req, res) {});
app.get('/callback', passport.authenticate('discord', {
    failureRedirect: 'http://localhost:3001/401'
}), function(req, res) {
    res.redirect('http://localhost:3001/panel');
    userDataObject[req.id] = {
    	uid: req.user.id,
    	tag: req.user.tag,
    	guilds: req.user.guilds
    }
});

app.get("/", function(req, res){
res.sendStatus(200)
});

app.get("/users/:userID", function(req, res){

});

app.get("/sessions", function(req, res){
if (!userDataObject[req.id]) return res.json({userData: null, success: false});
else {
res.json({userData: userDataObject[req.id], success: true})
};
});

app.listen(configData.port, () => console.log("Listening on port 3000"));
client.login(configData.token)