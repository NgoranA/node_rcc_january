const { readFile } = require("node:fs")

readFile(__filename, (err, data) => {
  if (err) return
  console.log("A")
})
