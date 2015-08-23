#pragma strict

import System.Collections.Generic;
import System.Linq;
import UnityEngine.UI;

var fields = new Dictionary.<String, Text>();
var parentListBox : ListBox;

function Awake () {
  var texts = GetComponentsInChildren(Text);
  if (texts.length > 0) {
    for (var text in texts) {
      var fieldName = text.transform.name.ToLower();
      fields[fieldName] = text;
    }
  }
}

function Get(key : String) : String {
  key = key.ToLower();
  return fields.ContainsKey(key) ? fields[key].text : null;
}

function GetAll() : Dictionary.<String, String> {
  var retval = new Dictionary.<String, String>();
  for (var pair in fields) {
    retval[pair.Key.ToLower()] = pair.Value.text;
  }
  return retval;
}

function Set(key : String, value) {
  key = key.ToLower();
  var strVal = value.ToString();
  if (fields.ContainsKey(key)) {
    fields[key].text = strVal;
  }
}

public function SetParentListBox(lbox : ListBox) {
  parentListBox = lbox;
}

public function Select() {
  parentListBox.SetSelectedItem(gameObject);
  GetComponent(Image).fillCenter = true;
  Debug.Log('Selected!~');
}

// Called by parent list box when selection changes
public function Deselect() {
  GetComponent(Image).fillCenter = false;
}