import System.Collections.Generic;
import System.Linq;

public var ContentPanel : GameObject;
public var ListItemPrefab : GameObject;

private var lastIdx = 0;
private var items = new Dictionary.<String, GameObject>();
private var selectedItem : GameObject = null;

public function AddItem(fields : Dictionary.<String, String>) { AddItem(fields, ''); }
public function AddItem(fields : Dictionary.<String, String>, key : String) {
  if (key == '') key = (lastIdx++).ToString();
  key = key.ToLower();
  var listItem = Instantiate(ListItemPrefab) as GameObject;
  listItem.transform.SetParent(ContentPanel.transform, false);
  items[key] = listItem;

  var item = listItem.GetComponent(ListItem);
  item.SetParentListBox(this);

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
    if (i < keys.Count) {
      AddItem(row, keys[i++]);
    } else {
      AddItem(row);
    }
  }
}

public function GetItem(key : String) : ListItem {
  key = key.ToLower();
  return items.ContainsKey(key) ? items[key].gameObject.GetComponent(ListItem) : null;
}
public function GetItem(key : int) : ListItem {
  var gameobj = ContentPanel.transform.GetChild(key);
  return gameobj ? gameobj.GetComponent(ListItem) : null;
}

public function GetSelectedItem() : ListItem {
  return selectedItem ? selectedItem.GetComponent(ListItem) : null;
}

public function SetSelectedItem(obj : GameObject) {
  if (selectedItem) {
    selectedItem.GetComponent(ListItem).Deselect();
  }
  selectedItem = obj;
}

public function RemoveItem(key : String) {
  key = key.ToLower();
  var item = GetItem(key);
Debug.Log('removing key ' + key + ' for item ' + item);
items.Keys.Select(function(n) { return n.ToString(); }).ToList().ForEach(function(n) {
  Debug.Log('key: ' + n);
});

  if (item) {
item.Set('quantity', '0');
Debug.Log('removing name ' + item.Get('name') + ' (key ' + key + ')');
    items.Remove(key);
    if (selectedItem == item.gameObject) selectedItem = null;
    Destroy(item.gameObject);
  }
}
public function RemoveItem(key : int) {
  var item = GetItem(key);
  if (item) {
    items.Remove(item.Get('name'));
    if (selectedItem == item.gameObject) selectedItem = null;
    Destroy(item.gameObject);
  }
}

public function Count() : int {
  return items.Keys.Count;
}