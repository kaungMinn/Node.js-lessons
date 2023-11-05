const path = require("path");
const fs = require("fs");
const { process_params } = require("express/lib/router");

const readFile = () => {
  fs.readFile(
    path.join(__dirname, "files", "text.txt"),
    "utf8",
    (error, data) => {
      console.log(data);
      if (error) {
        console.error(error);
      }
    }
  );
};

const writeFile = () => {
  fs.writeFile(
    path.join(__dirname, "files", "reply.txt"),
    "Nice to meet you",
    (err) => {
      if (err) throw err;
      console.log("Write complete");
    }
  );
};

const appendFile = () => {
  fs.appendFile(
    path.join(__dirname, "file", "haha.txt"),
    "\n\nHello world",
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
};

appendFile();

process.on("uncaughtException", (err) => {
  console.error(`Error tat ny tl lay: ${err}`);
  process.exit(1);
});

// console.log(process.uptime());
