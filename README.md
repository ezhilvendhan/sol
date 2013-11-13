Solutions to Code Challenges.

1. unit-testing-and-refactoring.js : Solution to https://github.com/spotify/jsconfeu-2013/tree/master/unit-testing-and-refactoring

2. Communication between tabs.js : Solution to https://github.com/spotify/jsconfeu-2013/tree/master/communication-between-tabs
   
   Usage
   -----
   a) Import this file to your html;
   b) open the html in 2 or more tabs
   c) From console, use tc.send("SOME DATA", 1) to send message to tab 2
   d) Methods:
      sendAll - Broadcast Message to all open tabs; @params(msg)

      send - Send message to a single tab. Use tc#getId() to get ID of any tab;
              @params(msg, tabId1, tabId2...)

      receive -  gets sent msg @param()

      reset - resets the localstorage; @param()

      clear - clears Tab related data from the localstorage; @param()

      getId - returns the current tab's id; @param()
