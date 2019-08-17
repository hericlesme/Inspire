const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
	    const fs = require("fs");

	    const random = (min, max) => Math.floor(Math.random() * max + min);
	    
	    fs.readFile("./quotes_pt-br.json", "utf8", async (err, data) => {
		          if (err) throw err;
		          obj = JSON.parse(data);
		          let randint = random(0, obj.length);
		          console.log(randint);
		          res.send(obj[randint].text);
		        });
	    
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

