#pragma strict

import System.Collections.Generic;
import System.Linq;

public var SolutionsListBox : GameObject;
public var StrategyListBox : GameObject;

public var ProblemCRT : ProblemController;
public var OutcomeCRT : OutcomeController;

public var Scrim : CanvasGroup;

@System.NonSerialized
public var Instance : GameManager;

var problemDeck : ShuffleDeck;

function Start () {
  if (!Instance) Instance = this;
  GameData.Load('solutions');
  GameData.Load('problems');
  problemDeck = new ShuffleDeck(GameData.GetRows('problems'));
  Reset();
  ScreenFader.Instance.FadeOut(0, function(){});
  NextProblem();
}

function Reset() {
  BuildList('solutions', SolutionsListBox);
}

function Update () {
  if (Input.GetKeyDown(KeyCode.Escape)) {
    Application.Quit();
  }
}

public function DoGame() {
  Application.LoadLevel('Game');
}

public function DoTitle() {
  Application.LoadLevel('Title');
}

public function NextProblem() {
  // DisableUI();
  // ComputeProblemScore();
  // ShowProblemResult();
  ScreenFader.Instance.FadeOut(0.5, function() {
    var nextProblem = problemDeck.Draw();
    ProblemCRT.SetItem(nextProblem);
    StrategyListBox.GetComponent(ListBox).Clear();
    OutcomeCRT.SetProblem(nextProblem);
    ScreenFader.Instance.FadeIn(0.5, function(){});
  });
}

private function BuildList(file, listbox : GameObject) {
  var rows = GameData.GetRows(file);

  var listboxComponent = listbox.GetComponent(ListBox);
  var keys = rows.Select(function(r) { return r['name'] || ''; }).ToList();
  listboxComponent.AddItems(rows, keys);
}