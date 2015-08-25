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

private var problemDeck : ShuffleDeck;

private var lastProblemScore = '';
private var shipLife : int;
private var tripLength : int;
private var startYear : int;
private var currentYear : int;
private var stops = new List.<int>();

private var PENALTY_YEARS = 35;

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
  shipLife = 482;
  tripLength = 435;
  startYear = 2415;
  currentYear = 2415;

  stops.Clear();
  for (var i = 0; i < 5; i++) {
    stops.Add(Mathf.Round(Random.Range(startYear, startYear + tripLength)));
  }
  stops.Sort();
}

function Update () {
  if (Input.GetKeyDown(KeyCode.Escape)) {
    DoQuit();
  }

  if (Input.GetKeyDown(KeyCode.N)) {
    DoScore();
  }

  if (Input.GetKeyDown(KeyCode.M)) {
    var listener = Camera.main.GetComponent(AudioListener);
    listener.volume = 1 - listener.volume;
  }
}

public function DoReset() {
  Reset();
  ScreenFader.Instance.FadeOut(0, function(){});
  NextProblem();
}

public function DoQuit() {
  Application.Quit();
}

public function DoGame() {
  Application.LoadLevel('Game');
}

public function DoTitle() {
  Application.LoadLevel('Title');
}

public function DoScore() {
  DisableUI();
  ComputeProblemScore();
  ShowProblemResult(function() {
    if (stops.Count == 0) {
      currentYear = startYear + tripLength;
      ProblemCRT.ShowSuccess(currentYear, tripLength, shipLife);
      EnableUI();
    } else {
      NextProblem();
    }
  });
}

public function NextProblem() {
  ScreenFader.Instance.FadeOut(0.5, function() {
    var nextProblem = problemDeck.Draw();
    ProblemCRT.SetItem(nextProblem);
    StrategyListBox.GetComponent(ListBox).Clear();
    OutcomeCRT.SetProblem(nextProblem);
    stops.RemoveAt(0);
    currentYear = stops.Count > 0 ? stops.First() : startYear + tripLength;
    ProblemCRT.Reset(currentYear);

    ScreenFader.Instance.FadeIn(0.5, function(){});
    EnableUI();
  });
}

private function BuildList(file, listbox : GameObject) {
  var rows = GameData.GetRows(file);

  var listboxComponent = listbox.GetComponent(ListBox);
  var keys = rows.Select(function(r) { return r['name'] || ''; }).ToList();
  listboxComponent.AddItems(rows, keys);
}

function DisableUI() {
  Scrim.blocksRaycasts = true;
}

function EnableUI() {
  Scrim.blocksRaycasts = false;
}

function ComputeProblemScore() {
  var score = OutcomeCRT.GetOutcomeScore();
  if (score < 1.0) shipLife -= PENALTY_YEARS * Mathf.Clamp(1/(score+0.1), 0.0, 1.0);
  if (score > 0.99) {
    lastProblemScore = 'A+';
  } else if (score > 0.9) {
    lastProblemScore = 'A';
  } else if (score > 0.8) {
    lastProblemScore = 'B';
  } else if (score > 0.7) {
    lastProblemScore = 'C';
  } else if (score > 0.6) {
    lastProblemScore = 'D';
  } else {
    lastProblemScore = 'F!';
  }
}

function ShowProblemResult(func : System.Action) {

  ProblemCRT.ShowResult(lastProblemScore, currentYear, shipLife, startYear, tripLength);
  yield new WaitForSeconds(10);
  func();
}