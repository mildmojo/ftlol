import System.Collections.Generic;
import System.Linq;

public var ContentPanel : GameObject;
public var ListItemPrefab : GameObject;

// Objects which will get a .BroadcastMessage('SelectedItem', dict) on item selected.
public var BroadcastListeners : List.<GameObject>;

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
    if (field.Key != null && field.Key != '') {
Debug.Log('adding ' + field.Key + " - " + field.Value);
      item.Set(field.Key, field.Value);
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

public function GetItemData(key : String) {
  var item = GetItem(key);
  return item ? item.GetAll() : null;
}

public function GetAllData() {
  var retval = new List.<Dictionary.<String, String> >();
  for (var item in items) {
    var itemData = item.Value.GetAll();
    retval.Add(itemData);
  }
  return retval;
}

public function GetSelectedItem() : ListItem {
  return selectedItem ? selectedItem.GetComponent(ListItem) : null;
}

public function SetSelectedItem(obj : GameObject) {
  if (selectedItem) {
    selectedItem.GetComponent(ListItem).Deselect();
  }
  selectedItem = obj;
  BroadcastSelect();
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
Debug.Log('removing name ' + item.GetName() + ' (key ' + key + ')');
    items.Remove(key);
    if (selectedItem == item.gameObject) {
      selectedItem = null;
      BroadcastDeselect();
    }
    Destroy(item.gameObject);
  }
}
public function RemoveItem(key : int) {
  var item = GetItem(key);
  if (item) {
    items.Remove(item.GetName());
    if (selectedItem == item.gameObject) selectedItem = null;
    Destroy(item.gameObject);
  }
}

public function Count() : int {
  return items.Keys.Count;
}

// If subscribed to another ListBox, deselect when other ListBox item is selected.
public function SelectedItem() {
  if (selectedItem) {
    selectedItem.SendMessage('Deselect');
    selectedItem = null;
  }
}

function BroadcastSelect() {
  var listItem = selectedItem.GetComponent(ListItem);
  var key = listItem.GetName();
Debug.Log('Getting data for item ' + key);
  var data = listItem.GetAll();

  for (var obj in BroadcastListeners) {
    obj.BroadcastMessage('SelectedItem', data, SendMessageOptions.DontRequireReceiver);
  }
}

function BroadcastDeselect() {
  for (var obj in BroadcastListeners) {
    obj.BroadcastMessage('DeselectedItem', null, SendMessageOptions.DontRequireReceiver);
  }
}