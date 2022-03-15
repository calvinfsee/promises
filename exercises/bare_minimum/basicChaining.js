/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * (2) then, sends a request to the GitHub API for the user's profile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

const fs = require('fs');
const Promise = require('bluebird');
const { getGitHubProfileAsync } = require('./promisification.js');
const readFile = Promise.promisify(fs.readFile);
const writeFile = Promise.promisify(fs.writeFile);


const fetchProfileAndWriteToFile = (readFilePath, writeFilePath)=> {
  return readFile(readFilePath)
    .then(file => file.toString().split('\n')[0])
    .then(username => getGitHubProfileAsync(username))
    .then(profile => writeFile(writeFilePath, JSON.stringify(profile)))
    .catch(error => console.error(error));
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
