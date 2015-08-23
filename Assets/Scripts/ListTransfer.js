import System.Collections.Generic;
import System.Linq;

public var SourceList : GameObject;
public var DestinationList : GameObject;
public var Quantity : int;

private var sourceListBox : ListBox;
private var destListBox : ListBox;

function Awake() {
  sourceListBox = SourceList.GetComponent(ListBox);
  destListBox = DestinationList.GetComponent(ListBox);
}

function DoTransfer() {
  var selectedItem = sourceListBox.GetSelectedItem();
  if (!selectedItem) return;
  var selectedName = selectedItem.Get('name');
  var destItem = destListBox.GetItem(selectedName);
  var qty = Mathf.Min(Quantity, parseInt(selectedItem.Get('quantity')));
  var itemData = selectedItem.GetAll();

  if (destItem == null) {
    destListBox.AddItem(selectedItem.GetAll(), selectedName);
    destListBox.GetItem(selectedName).Set('quantity', qty);
  } else {
    destItem.Set('quantity', parseInt(destItem.Get('quantity')) + qty);
  }

  if (qty >= parseInt(selectedItem.Get('quantity'))) {
    sourceListBox.RemoveItem(selectedName);
  } else {
    selectedItem.Set('quantity', parseInt(selectedItem.Get('quantity')) - qty);
  }
}