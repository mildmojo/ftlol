#pragma strict

public var SolutionsListBox : GameObject;
public var ProblemsListBox : GameObject;
public var ListItemPrefab : GameObject;

@System.NonSerialized
public var Instance : GameManager;

function Start () {
  if (!Instance) Instance = this;
  GameData.Load('solutions');
  GameData.Load('problems');
  BuildList('solutions', SolutionsListBox);
  BuildList('problems', ProblemsListBox);
}

function Update () {

}

public function DoGame() {
  Application.LoadLevel('Game');
}

public function DoTitle() {
  Application.LoadLevel('Title');
}

private function BuildList(file, listbox : GameObject) {
  var rows = GameData.GetRows(file);
  for (var row : Dictionary.<String, String> in rows) {
    var listItem = Instantiate(ListItemPrefab) as GameObject;
    listItem.transform.SetParent(listbox.transform.GetChild(0), false);
    var item = listItem.GetComponent(ListItem);

    item.fields['description'].text = row['name'];
    item.fields['quantity'].text = '500';
  }
}