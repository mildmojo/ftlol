#pragma strict

import System.Collections.Generic;
import System.Linq;
import UnityEngine.UI;

var fields = new Dictionary.<String, Text>();
var itemData = new Dictionary.<String, String>();
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

function GetName() : String {
  return fields['name'].text.ToLower().Replace(' ', '_');
}

function GetAll() : Dictionary.<String, String> {
  return itemData;
}

function Set(key : String, value) {
  key = key.ToLower();
  var strVal = value.ToString();
  if (fields.ContainsKey(key)) {
    fields[key].text = strVal;
  }
  itemData[key] = strVal;
}

public function SetParentListBox(lbox : ListBox) {
  parentListBox = lbox;
}

public function Select() {
  parentListBox.SetSelectedItem(gameObject);
  GetComponent(Image).fillCenter = true;
  // Debug.Log('Selected!~');
}

// Called by parent list box when selection changes
public function Deselect() {
  GetComponent(Image).fillCenter = false;
}