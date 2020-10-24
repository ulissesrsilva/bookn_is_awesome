const findFile = require("./src/findFile");
const fileReader = require("./src/readFile");
const slotsManager = require("./src/slotsManager");

async function main() {
    try {
        //This function looks for a input file with the place data
        const placeData = await findFile.findArgFile(process.argv)

        //This function reads the file
        const place = await fileReader.readFile(placeData)

        console.log("#                                                                #");
        console.log("#                                                                #");
        console.log(`            BOOKN.ME: ${place.name}                             `);
        console.log("#                                                                #");
        console.log("#                                                                #");

        //This function returns available slots to book
        const freeSlots = await slotsManager.getFreeSlots(place)

        console.log(`PERIOD: ${place.period} minutes`)
        console.log(`AVAILABLE SLOTS: ${freeSlots.toString().replace(/,/g, " | ")}`)


    } catch (err) {
        console.error(err)
    }
}

main()