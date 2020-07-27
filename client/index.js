const app = require("express")();
app.get("/", (req, res) => {
	res.sendFile("C:/Users/benit/OneDrive/Desktop/DaxEmote/client/views/index.html")
})
app.get("/panel", (req, res) => {
	res.sendFile("C:/Users/benit/OneDrive/Desktop/DaxEmote/client/views/panel.html")
})
app.listen(3001);