const axios = require('axios')
const fs = require('fs')
const process = require('process')

function handleOutput(content, outpath=null){
  if (outpath){
    fs.writeFile(outPath, content, 'utf-8', (err) => {
      if (err) {
        console.error(`Couldn't write ${outPath}: ${err}`)
        process.exit(1)
      }
    })
  } else {
    console.log(content)
  }
}

function cat(path, out){
  fs.readFile(path, 'utf-8', (err,data) => {
    if (err) {
      console.error(`Error reading ${path}: ${err}`)
      process.exit(1)
    } else {
      handleOutput(data, out)
    }
  })
}

async function webCat(url, out){
  try {
    const response = await axios.get(url)
    handleOutput(response.data, out);
  } catch(err){
    console.error(`Error fetching ${url}:${err}`)
    process.exit(1)
  }
}

let path
let out

if (process.argv[2] === '--out') {
  out = process.argv[3]
  path = process.argv[4]
} else {
  path = process.argv[2]
}

if (path.slice(0,4) === 'http'){
  webCat(path, out)
} else {
  cat(path, out)
}