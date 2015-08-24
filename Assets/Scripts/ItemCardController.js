import UnityEngine.UI;

public var IconImage : Image;
public var NameText : Text;
public var DescriptionText : Text;

function Start() {
  DeselectedItem();
}

function SetItem(fields : Dictionary.<String, String>) {
  // Set icon.
  var imageFile = fields['image_path'];
  var sprite = Resources.Load(imageFile, Sprite);
  IconImage.enabled = true;
  IconImage.sprite = sprite;

  // Set title with underline.
  NameText.text = fields['name'] + "\n";
  for (var i = fields['name'].Length; i > 0; i--) {
    NameText.text += '=';
  }

  // Set description.
  DescriptionText.text = fields['description'];
}

// Receiver for BroadcastMessage from ListBox
public function SelectedItem(data : Dictionary.<String, String>) {
  SetItem(data);
}

// Receiver for BroadcastMessage from ListBox
public function DeselectedItem() {
  // Clear out display contents.
  IconImage.enabled = false;
  IconImage.sprite = null;
  NameText.text = '';
  DescriptionText.text = '';
}