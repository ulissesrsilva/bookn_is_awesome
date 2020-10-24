const { exception } = require('console');
const fs = require('fs');
const PLACE_DATA = './assets/beautyShopSchedule.json'

/**
 * @function isJson()
 * @description This function is responsible to look if the file name if a json, just for proper error handling
 * @param {String} name string for validation
 * @returns {Boolean} true or false, if is json file
 */
function isJson(name) {
    const filename = name && name.includes(".json")
    if (!filename) console.log(`${name} is not a valid .json file. The system is using default file instead.`)
    return filename
}

/**
 * @function findArgFile()
 * @description This function is responsible to look if a file was inputed by the user. If not, uses the beautyShopSchedule.json example
 * @param {Array} arguments array of terminal arguments, more precisely process.argv
 * @returns {Object} variable with place data
 */
function findArgFile(arguments) {
    return new Promise((resolve) => {
        //fileName contains the location of json file
        let fileName;

        if (arguments) {
            //the find implementation below checks if the "input=" flag was provided
            const argInput = arguments.find((item) => {
                return item.includes("input=")
            })

            //line 31 checks if the inputed arg is really a json file
            const isJsonFile = argInput ? isJson(argInput.split("=")[1]) : false

            //if isJson then uses the file, if not uses the PLACE_DATA constant
            fileName = isJsonFile ? argInput.split("=")[1] : PLACE_DATA
        } else fileName = PLACE_DATA

        return resolve(fileName)
    })
}

module.exports.findArgFile = findArgFile