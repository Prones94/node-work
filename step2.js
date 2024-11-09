const axios = require('axios')
const fs = require('fs')
const process = require('process')

function cat(path){
  fs.readFile(path, 'utf-8', (err,data) => {
    if (err) {
      console.error(`Error reading ${path}: ${err}`)
      process.exit(1)
    } else {
      console.log(data);
    }
  })
}

async function webCat(url){
  try {
    const response = await axios.get(url)
    console.log(response.data);
  } catch(err){
    console.error(`Error fetching ${url}: ${err}`)
    process.exit(1)
  }
}

let path = process.argv[2]

if (path.slice(0,4) === 'http') {
  webCat(path)
} else {
  cat(path)
}