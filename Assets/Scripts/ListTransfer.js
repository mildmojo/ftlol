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
  var selectedName = selectedItem.GetName();
  var destItem = destListBox.GetItem(selectedName);
  var qty = Mathf.Min(Quantity, parseInt(selectedItem.Get('quantity')));
  var itemData = selectedItem.GetAll();

  if (destItem == null) {
    // Doesn't exist in target box, add it and set quantity.
    destListBox.AddItem(itemData, selectedName);
    destListBox.GetItem(selectedName).Set('quantity', qty);
  } else {
    // Does exist in target box, add transfer quantity.
    destItem.Set('quantity', parseInt(destItem.Get('quantity')) + qty);
  }

  if (qty >= parseInt(selectedItem.Get('quantity'))) {
    // If quantity transferred exhausts source, remove from the source list.
    sourceListBox.RemoveItem(selectedName);
  } else {
    // Otherwise, just decrement source by quantity transferred.
    selectedItem.Set('quantity', parseInt(selectedItem.Get('quantity')) - qty);
  }
}