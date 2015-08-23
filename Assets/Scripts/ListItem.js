#pragma strict

import System.Collections.Generic;
import System.Linq;
import UnityEngine.UI;

var fields = new Dictionary.<String, Text>();

function Awake () {
  var texts = GetComponentsInChildren(Text);
  if (texts.length > 0) {
    for (var text in texts) {
      var fieldName = text.transform.name.ToLower();
      fields[fieldName] = text;
    }
  }
}
