const oneSecond = () => 1000;
const getCurrentTime = () => new Date();
const clear = () => console.clear();
const log = (message) => console.log(message);
const compose = (...fsn) => (args) => fsn.reduce((composed, fn) => fn(composed), args);
//takes a date obj and returns a obj forclock time that contains h, minutes and seconds
const serializeClockTime = date => ({
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
})
//Takes the clockTime obj and returns where hours are converted to civilian time.
//for ex 13;00 becomes 1 o'clock
const civilianHours = clockTime => ({
    ...clockTime,
    hours: (clockTime.hours > 12)? clockTime.hours - 12: clockTime.hours
})
//Appends AM or PM
const appendAMPM = clockTime => ({
    ...clockTime,
    ampm: (clockTime.hours > 12) ? 'PM': 'AM'
})
//Takes a target function and returns a function that will snd the time mto the target. 
const display = target => time => target(time)
//Takes a template string and uses it to return clock time formatted based upon the cretiria from mthe string.
//As ex;, the template is  "hh:mm:ss tt". From there the function ill replace the placeholder with hours, minutes, seconds and time of the day
const formatClock = format => time => 
    format.replace('hh', time.hours)
    .replace('mm', time.minutes)
    .replace('ss', time.seconds)
    .replace('tt', time.ampm)

//Takes an obj's key as an arg and prepends a zero to the value stored under that objects key.
//It takes in a key to a specific field and prepends values with a zero if the value is less than 10
const prependZero = key => clockTime => ({
    ...clockTime,
    [key]:(clockTime[key] < 10) ? "0"+clockTime[key] : clockTime[key]
})

// A single function that will take clocktime as an arg and transform it into civilian time by using both civilian hours
const convertToCivilianTime = clockTime => compose(appendAMPM, civilianHours)(clockTime)

//Will take civilian clock time and make sure the hours, minutes, and seconds display double digits by prepending 0 where needed
const doubleDigits = civilianTime => compose(prependZero("hours"), prependZero("minutes"), prependZero("seconds"))(civilianTime)

//Starts the clock by setting an interval that will invoke a callback every second.
// The callback is composed using all the functions above. 
//Every second the console is cleared , current time obtained , converted, civiliniazed, formatted and displayed
const startTicking = () => setInterval(
    compose(
        clear,
        getCurrentTime,
        serializeClockTime,
        convertToCivilianTime,
        doubleDigits,
        formatClock("hh:mm:ss tt"),
        display(log)), 
    oneSecond())


    startTicking()