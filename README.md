Solutions to Code Challenges.

1. unit-testing-and-refactoring.js : Solution to https://github.com/spotify/jsconfeu-2013/tree/master/unit-testing-and-refactoring

2. comm-between-tabs.js : Solution to https://github.com/spotify/jsconfeu-2013/tree/master/communication-between-tabs
   Usage:
   * Import this file to your html;
   * open the html in 2 or more tabs
   * From console, use tc.send("SOME DATA", 1) to send message to tab 2

   * Methods:

      1 sendAll - Broadcast Message to all open tabs; @params(msg)

      2 send - Send message to a single tab. Use tc#getId() to get ID of any tab;
              @params(msg, tabId1, tabId2...)

      3 receive -  gets sent msg @param()

      4 reset - resets the localstorage; @param()

      5 clear - clears Tab related data from the localstorage; @param()

      6 getId - returns the current tab's id; @param()
