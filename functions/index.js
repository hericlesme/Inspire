/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.quote = (req, res) => {

const { Storage } = require("@google-cloud/storage");

const storage = new Storage();

const random = (min, max) => Math.floor(Math.random() * max + min);
var archivo = storage
  .bucket("inspire-bucket")
  .file("quotes_pt-br.json")
  .createReadStream();
console.log("Concat Data");
var buf = "";
archivo
  .on("data", function(d) {
    buf += d;
  })
  .on("end", function() {
    console.log(buf);
    console.log("End");
    let file = JSON.parse(buf);
      res.status(200).send(file[random(0, file.length)].text);	
});
};
