import System.Collections.Generic;
import System.Linq;

public var ContentPanel : GameObject;
public var ListItemPrefab : GameObject;

private var lastIdx = 0;
private var items = new Dictionary.<String, GameObject>();

public function AddItem(fields : Dictionary.<String, String>) { AddItem(fields, ''); }
public function AddItem(fields : Dictionary.<String, String>, key) {
  if (key == '') key = (lastIdx++).ToString();
  var listItem = Instantiate(ListItemPrefab) as GameObject;
  listItem.transform.SetParent(ContentPanel.transform, false);
  items[key] = listItem;

  var item = listItem.GetComponent(ListItem);

  // Copy fields to list item
  for (var field in fields) {
    if (item.fields.ContainsKey(field.Key)) {
      item.fields[field.Key].text = field.Value;
    }
  }
}

public function AddItems(rows : List.<Dictionary.<String, String> >) { AddItems(rows, new List.<String>()); }
public function AddItems(rows : List.<Dictionary.<String, String> >, keys : List.<String>) {
  var i = 0;
  for (var row in rows) {
    if (i < keys.Count - 1) {
      AddItem(row, keys[i++]);
    } else {
      AddItem(row);
    }
  }
}

public function GetItem(key : String) : ListItem {
  var gameobject = items[key];
  return gameobject ? gameobject.GetComponent(ListItem) : null;
}
public function GetItem(key : int) : ListItem {
  var gameobject = transform.GetChild(key);
  return gameobject ? gameobject.GetComponent(ListItem) : null;
}

public function RemoveItem(key : String) {
  var gameobject = GetItem(key);
  if (gameobject) {
    DestroyImmediate(gameObject);
  }
}
public function RemoveItem(key : int) {
  var gameobject = GetItem(key);
  if (gameobject) {
    DestroyImmediate(gameObject);
  }
}

public function Count() : int {
  return items.Keys.Count;
}