var Spotify = Spotify || {};

Spotify.Entity = (function spotifyEntity() {
  var appFn = RegExp.prototype.test.bind(/^spotify:app:[a-zA-Z0-9]*/),
      trackFn = RegExp.prototype.test.bind(/^spotify:track:[a-zA-Z0-9]*/),
      playlistFn = RegExp.prototype.test.bind(/^spotify:playlist:[a-zA-Z0-9]*/);

  var execPredicate = function execPredicate() {
    var predicates = Array.prototype.slice.call(arguments);
    return function() {
      var result = false,
          args = Array.prototype.slice.call(arguments);
      predicates.every(function predicatesEvery(item) {
        result = item.apply(item, args);
        return (result === false);
      });
      return result;
    }
  }

  return {
    isApp: appFn,
    isTrack: trackFn,
    isPlaylist: playlistFn,
    isEntity: execPredicate(appFn, trackFn, playlistFn),
    process: function process(entitiesArray, callback, async) {
      if(Array.isArray(entitiesArray) && typeof callback === 'function') {
        entitiesArray.forEach(
          (function(item) {
            if(this.isEntity(item) === true) {
              if(async) setTimeout(callback, 1, item);
              else callback(item);
            }
          }).bind(this)
        );
      }
    }
  }
})();

// Example of unit test FW(you can change it and use a custom unit testing FW)
var myUnitTesting = {
  _passed: 0,
  _failed: 0,
  _result: ['Results: '],
  _testNum: 0,
  assert: function(statement, id) {
    this._testNum++;
    id = id || ('Test ['+this._testNum+']');
    if (statement) {
      this._passed++;
      this._result.push('  PASSED: '+ id);
    } else {
      this._failed++;
      this._result.push('> FAILED: '+ id);
    }
  },
  showResults: function() {
    console.log(this._passed + ' tests passed, ' + this._failed + ' failed');
    console.log(this._result.join('\n'));
  }
};

(function() {

  myUnitTesting.assert(Spotify.Entity.isApp('spotify:app:bluenote'), 'isApp [spotify:app:bluenote]');
  myUnitTesting.assert(Spotify.Entity.isTrack('spotify:track:asdf555'), 'isTrack[spotify:track:asdf555]');
  myUnitTesting.assert(Spotify.Entity.isPlaylist('spotify:playlist:asdf555'), 'isPlaylist[spotify:playlist:asdf555]');
  myUnitTesting.assert(Spotify.Entity.isEntity('spotify:app:bluenote'), 'isEntity[spotify:app:bluenote]');

  myUnitTesting.assert(Spotify.Entity.isApp(null) === false, 'isApp(null)');
  myUnitTesting.assert(Spotify.Entity.isTrack(undefined) === false, 'isTrack(undefined)');
  myUnitTesting.assert(Spotify.Entity.isPlaylist('') === false, 'isPlaylist()');
  myUnitTesting.assert(Spotify.Entity.isEntity('  ') === false, 'isEntity(  )');

  // Spotify.Entity.process
  var counter = 0;
  Spotify.Entity.process(['spotify:app:test1', 'spotify:undefined:asdf55'], function(params) {
    counter++;
  });
  myUnitTesting.assert(counter === 1, "Spotify.Entity.process(['spotify:app:test1', 'spotify:undefined:asdf55'], fn)");

  Spotify.Entity.process([], function(params) {
    myUnitTesting.assert(false, "Spotify.Entity.process([])");
  });

  Spotify.Entity.process(null, function(params) {
    myUnitTesting.assert(false, "Spotify.Entity.process(null)");
  });

  // Show results
  myUnitTesting.showResults();

})();