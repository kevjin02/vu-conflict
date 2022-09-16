import { Event } from "../requests/request";


const scoreMessages = [
    [1000, "You might have worse scheduling skills than HackGT :face_vomiting:"],
    [500, "What the :duck:"],
    [110, "Ouch, you might want to find another time :face_with_head_bandage:"],
    [40, "Here's something to consider :thinking_face:"],
    [10, "Looking good :eyes:"],
    [0,"It's show time :man_dancing::man_dancing::man_dancing:"]
];


interface EventsLengthProps {
    numFeaturedEvents: number,
    numAnchorLinkEvents: number, 
    numEngineeringEvents: number
}

// Generates a "score" based on the importance of events and uses it for playful CX
const calculateScore = (props: EventsLengthProps) => {
    let finalScoreMessage = "Exception in thread \"vanderbilt\" vandy.lang.EventOverflowError \n\"Princeton Review ranked our dining too high yet again (expected 30th, found 6th)\"\n\t\tat vandy.io.Everywhere(Room.fgh:134)\n";
    const score = props.numFeaturedEvents * 10 + props.numAnchorLinkEvents * 2 + props.numEngineeringEvents * 10;

    scoreMessages.forEach((scoreMessage) => {
        if(scoreMessage[0] >= score) finalScoreMessage = scoreMessage[1].toString()
    }) 
    return finalScoreMessage;
}

// Formatted heading for response text
const generateHeader = (props: EventsLengthProps) => {
    return `*${calculateScore(props)}, ${props.numFeaturedEvents+props.numAnchorLinkEvents+props.numEngineeringEvents} events found!*\n`
}

// Create subheading for each event type and rows for each event
const formatEventResults = (events: Event[], eventName: string, emojis: string)  => {
    let res = ""
    if(events.length) {
        res += `\n${emojis} *${events.length}* ${eventName} event${events.length > 1 ? "s" : ""} found:\n`
        events.forEach((event: any) => {
            res += ((event.Name.length > 89) ? event.Name.slice(0, 87) + "..." : event.Name.padEnd(90)) + `_${event.DateRange}_\n`;
        });
    }
    return res;
}


export function formatResults(featuredEvents: Event[], anchorLinkEvents: Event[], engineeringEvents: Event[]) {
    let res = generateHeader({
        numFeaturedEvents: featuredEvents.length,
        numAnchorLinkEvents: anchorLinkEvents.length, 
        numEngineeringEvents: engineeringEvents.length
    });
    res += formatEventResults(engineeringEvents, "relevant engineering", ":biohazard_sign::building_construction:");
    res += formatEventResults(featuredEvents, "school-wide", ":loudspeaker::school:");
    res += formatEventResults(anchorLinkEvents, "other school-wide", ":anchor::link:");
    return res;
}


// Add warning for sleep hours 
export function formatWarning(startTime: string, endTime: string) {
    return (parseInt(startTime.split(":")[0], 10) < 6 || parseInt(endTime.split(":")[0], 10) > 20) ? "*:yawning_face: Give your attendees some time to sleep >:(*\n\n" : "";
}
