const NUM_PARAMETERS = 3;

function allIntegers(numTexts: string[]) {
    return numTexts.every(num => !isNaN(parseInt(num, 10)));
}

function validateDate(dateText: string) {
    const date = dateText.split('-');
    if(date[0].length != 4 || date[1].length != 2|| date[2].length != 2 || !allIntegers(date)) throw Error(`Bad date input ${dateText}. This should be in YYYY-mm-dd form.`);
}

function validateTime(timeText: string) {
    const time = timeText.split('%3A');
    if(time[0].length != 2 || time[1].length != 2|| !allIntegers(time)) throw Error(`Bad time input ${timeText.replace("%3A", ":")}. This should be in HH:mm form.`);
}

function validateTimeOrder(startTime: string, endTime: string) {
    const splitStartTime = startTime.split('%3A');
    const splitEndTime = endTime.split('%3A');

    if(splitStartTime[0] > splitEndTime[0] || (splitStartTime[0] === splitEndTime[0] && splitStartTime[1] > splitEndTime[1])) {
        throw Error(`Start time and end time are in the wrong order`)
    }

}

function validateInput(text: string[]) {
    if(text.length !== 3) throw Error(`Missing parameter (expected ${NUM_PARAMETERS}, found ${text.length})`);
    validateDate(text[0]);
    validateTime(text[1]);
    validateTime(text[2]);
    validateTimeOrder(text[1], text[2]);
}

// Decode and validate URL-encoded input and get "text" parameter which contains Slack parameters
export default function parseForInput(text: string) {
    const split_text = text.split("&");
    for (let i = 0; i < split_text.length; ++i) {
        const val = split_text[i].split("=");
        if (val[0] === "text") {
            const result = val[1].split("+");
            validateInput(result);
            return result;
        }
    }
    throw Error("Could not retrieve input");
}