const moment = require('moment');

/**
 * @function periodConvert()
 * @description This function is responsible to convert the period minutes in hours
 * @param {string} period period string in minutes
 * @returns {Object}
 */
function periodConvert(period) {
    const hours = (period / 60);
    const floorHours = Math.floor(hours);
    const minutes = (hours - floorHours) * 60;
    const roundMinutes = Math.round(minutes);
    return {
        hours: floorHours,
        minutes: roundMinutes
    }
}

/**
 * @function canAddSlot()
 * @description This function is responsible to check if a specific date with a period is not bigger than the endDate
 * @param {Moment Object} checkDate Moment object that represents the date to check
 * @param {Moment Object} endDate Moment object that represents the end date
 * @param {Object} period period object that contais the hour and minutes periods
 * @returns {Boolean}
 */
function canAddSlot(checkDate, endDate, period) {
    checkDate.add(period.hours, 'hours')
    checkDate.add(period.minutes, 'minutes')
    return checkDate <= endDate
}

/**
 * @function isBookableSlot()
 * @description This function is responsible to check if a slot is available or if there is a existing service
 * @param {Moment Object} checkDate Moment object that represents the date to check
 * @param {Object} period period object that contais the hour and minutes periods
  * @param {Array} existingServices Array containing the existing services
 * @returns {Boolean}
 */
function isBookableSlot(checkDate, period, existingServices) {
    const startDate = moment(checkDate, ["HH:mm "])
    checkDate.add(period.hours, 'hours')
    checkDate.add(period.minutes, 'minutes')
    if (existingServices) {

        const isBookable = existingServices.find((item) => {
            start = moment(item.start, ["HH:mm "])
            end = moment(item.end, ["HH:mm "])

            return startDate >= start && checkDate <= end
        })

        return !isBookable
    }
    return true
}

/**
 * @function getFreeSlots()
 * @description This function is responsible check if there is a free slot
 * @param {Object} place full object with place data
 * @returns {Object} 
 */
function getFreeSlots(place) {
    return new Promise((resolve, reject) => {

        if (place.workingHours && place.workingHours.start && place.workingHours.end && place.period) {
            let startDate = moment(place.workingHours.start, ["HH:mm "])
            const endDate = moment(place.workingHours.end, ["HH:mm "])
            const period = periodConvert(place.period)
            const existingServices = place.existingServices

            let workingHours = []
            while (startDate < endDate) {
                //While our end date object is bigger than our working "start date"
                //we push to the array the hours + period informed
                /* IMPORTANT NOTE: Some periods can be bigger than the end date, for example:
                * Period of 45min, that closes at 20h and opens at 09h
                * If we only break into 45min slots, we are going to have the last slot at 19h30 and that cannot happen
                * beacuse 19h30 + 45min = 20h15, and thats after the place close.
                * So we`re also checking if the last available hour is not bigger than the end time
                * in the canAddSlot function.
                */
                if (canAddSlot(startDate.clone(), endDate, period)
                    && isBookableSlot(startDate.clone(), period, existingServices)) {
                    workingHours.push(startDate.format('HH:mm'))
                }
                startDate.add(period.hours, 'hours')
                startDate.add(period.minutes, 'minutes')
            }

            resolve(workingHours)
        } else reject("* ERROR 500: No working hours was informed")

    })
}

module.exports = { getFreeSlots }