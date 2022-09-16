# VU-Conflict

## Background
When planning out workshops last Spring, I sometimes made very poor decisions in terms of when workshops were scheduled (LaTeX workshop happened at the same time as Math Club meeting, Data science workshop happened during Investiture). In an effort to find ways to improve this scheduling, I found myself facing a couple problems that made planning events a frustrating experience:

1. [AnchorLink](https://anchorlink.vanderbilt.edu/events) only allows you to view events 20 at a time, and has an [unintuitive way to search by date range](assets/anchorlinkdates.png)
2. The [EMSCampus](https://emscampus.app.vanderbilt.edu/VirtualEMS/BrowseForSpace.aspx) (Book Room) UI is poor in performance. Loading anything from the next day to new locations takes a considerable amount of time and can be very frustrating when you are looking for one specific time frame
3. Organizations put their events in some places and not others. For instance, engineering events are rarely on AnchorLink but almost always be on EMSCampus in FGH, while you will find Greek life events all over AnchorLink but no "room" associated to them. Neither of these have sporting events, either. As such, one is required to check all of these websites when planning an event.

Thus, I wanted to create something that would:

1. Have a way to query all of these disjoint event calendars at once
2. Eliminate the need for the significant overhead caused by utilizing the above services' frontends
3. Make scheduling events a pleasant experience that is rewarded by higher event attendance when planners know what time conflicts will arise in advance

## Solution

A user types into a slack channel that supports this Slack bot. They enter a command formatted as follows (a start date, start time, and end time):
```
/vu-conflict <yyyy-mm-DD> <HH:MM> <HH:MM>
```

 This request is parsed and validated to ensure inputs are as specified above. If not, an error is returned.

<p align="center">
 <image src="assets/badinput.png" alt="Bad Input" />
 <p align="center"><b>Figure 1</b>: Sample error response</p>
</p>
If the request is valid, the Worker will make 3 concurrent requests and accumulate the responses to:

* AnchorLink for school-wide events
* EMSCampus, particularly targeting FGH and ESB for engineering events
* Vanderbilt's "Featured events" page (scraped with Cheerio.js) for sporting events and events deemed important by Vanderbilt

Upon completion, the Worker parses the data and formats it in a string for user consumption

<p align="center">
 <image src="assets/sampleresponse.png" alt="Sample response" />
 <p align="center"><b>Figure 2</b>: Sample successful response</p>
</p>

Various playful CX features are also included, a couple of examples are pictured below:
<p align="center">
 <image src="assets/whattheduck.png" alt="What the duck" />
 <p align="center"><b>Figure 3</b>: Sample large response</p>
</p>
<p align="center">
 <image src="assets/sleeptime.png" alt="Sample response" />
 <p align="center"><b>Figure 4</b>: Sample night-time hour response</p>
</p>

## Up next
* Secure the bot w/ [security considerations](https://api.slack.com/authentication/best-practices)
* Seperate classes from "engineering" to a section containing major classes as a whole that could affect our audience (i.e. CHEM 1501, MATH 1301, ECON 1500)
* Keep monitoring school calendars to develop better method of determining what's important or not
* Support for differing inputs (i.e. 4:30PM, 4:30pm, 08/06/2002)
* Verbose option that displays all events
* Extend use to all of VH by migrating to VH Slack channel! (either as a bot user or in **#admin** channel)
* If this is seen as useful to other clubs, a possible front-end