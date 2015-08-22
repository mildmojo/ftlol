#pragma strict

@System.NonSerialized
public var Instance : GameManager;

function Start () {
  if (!Instance) Instance = this;
  GameData.Load('problems');
  GameData.Load('solutions');
}

function Update () {

}

public function DoGame() {
  Application.LoadLevel('Game');
}

public function DoTitle() {
  Application.LoadLevel('Title');
}

