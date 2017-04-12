$(document).ready( function() {
    "use strict";

  window.addEventListener("message", function(evt) {
    if(evt.data.messageType === "LOAD") {
      curLevel = evt.data.gameState.level;
      score = evt.data.gameState.score;
      gameEnded = false;
      loadLevel(levels[curLevel]);
      reset();
    } else if (evt.data.messageType === "ERROR") {
      alert(evt.data.info);
    }
  });
    var msg = {
      "messageType": "SETTING",
      "options": {
        "width" : 1150,
        "height" : 680
      }
    };
    parent.postMessage(msg, "*");

    // Sends this game's state to the service.
    // The format of the game state is decided
    // by the game
    $("#save").click( function () {
      var msg = {
        "messageType": "SAVE",
        "gameState": {
          "level": curLevel,
          "score": score
        }
      };
      parent.postMessage(msg, "*");
    });
});
