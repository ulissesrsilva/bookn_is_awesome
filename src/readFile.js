const fs = require('fs');

/**
 * @function readFile()
 * @description This function is responsible to read the json file
 * @param {String} fileName full path of the file to read
 * @returns {Object} variable with place data
 */
function readFile(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, (error, data) => {
            if (error) {
                console.error(`* ERROR 404: ${fileName} file was not found *`);
                reject()
            } else {
                try {
                    const dataJson = JSON.parse(data);
                    resolve(dataJson)
                } catch (error) {
                    console.error(`* ERROR 500: Check ${fileName} json formatting *`);
                    reject()
                }
            }
        });
    })
}

module.exports.readFile = readFile