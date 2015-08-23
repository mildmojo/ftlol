#pragma strict

import System.Collections.Generic;
import System.Linq;

public var SolutionsListBox : GameObject;
public var StrategyListBox : GameObject;
public var ListItemPrefab : GameObject;

@System.NonSerialized
public var Instance : GameManager;

function Start () {
  if (!Instance) Instance = this;
  GameData.Load('solutions');
  GameData.Load('problems');
  BuildList('solutions', SolutionsListBox);
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

  var listboxComponent = listbox.GetComponent(ListBox);
  var keys = rows.Select(function(r) { return r['name'] || ''; }).ToList();
  listboxComponent.AddItems(rows, keys);
}