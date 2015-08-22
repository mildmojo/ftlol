#pragma strict

import System.Collections.Generic;
import System.Linq;
import UnityEngine.UI;

var fields = new Dictionary.<String, Text>();
var printed = false;

function Start () {
  var texts = GetComponentsInChildren(Text);
  if (texts.length > 0) {
    for (var text in texts) {
      fields[text.transform.name] = text;
    }
  }
}

function Update () {
  if (!printed) {
    printed = true;
    for (var pair in fields) {
      Debug.Log(pair.Key + " - " + pair.Value.text);
    }
  }
}