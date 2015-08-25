import UnityEngine.UI;

public var StrategyListBox : ListBox;
public var SliderList : List.<Slider>;
public var StatusOK : GameObject;

private var problemData : Dictionary.<String, String> = null;
private var attrNames = new List.<String>(['Red', 'Green', 'Blue', 'Yellow']);
private var sliders = new Dictionary.<String, Slider>();
private var currentScore : float;

function Start() {
  for (var slider in SliderList) {
    sliders[slider.transform.name.ToLower()] = slider;
  }
  Reset();
}

function Reset() {
  currentScore = 0;
}

function SetProblem(fields : Dictionary.<String, String>) {
  problemData = fields;
}

// Receiver for BroadcastMessage from ListBox
function QuantityChanged() {
  if (problemData) RecalcOutcome();
}

function RecalcOutcome() {
  var strategyData = StrategyListBox.GetAllData();
  var stratTotals = new Dictionary.<String, int>();
  // var stratStatus = new Dictionary.<String, float>();
  var isSuccessful = false;
  currentScore = 0;

  for (var attr in attrNames) {
    attr = attr.ToLower();
    if (!stratTotals.ContainsKey(attr)) stratTotals[attr] = 0;
    for (var item in strategyData) {
// var keys = item.Keys.Select(function(n) { return n.ToString(); }).ToArray();
// Debug.Log('recalc, keys: ' + String.Join(', ', keys));
// Debug.Log('Looking up ' + attr);
// Debug.Log('item[attr]: ' + item[attr]);
// Debug.Log('item["quantity"]: ' + item['quantity']);
      stratTotals[attr] += parseInt(item[attr]) * parseInt(item['quantity']);
    }

    var attrPct = parseFloat(stratTotals[attr]) / parseFloat(problemData[attr]);
// var keys = sliders.Keys.Select(function(n) { return n.ToString(); }).ToArray();
// Debug.Log('recalc, slider keys: ' + String.Join(', ', keys));
    var slider = sliders[attr];
    // stratStatus[attr] = attrPct;
// Debug.Log(attr + ' (' + stratTotals[attr] + '): ' + attrPct * slider.maxValue);
//     var initialValue = slider.value;
//     var tween = LeanTween.value(slider.gameObject, initialValue, attrPct * slider.maxValue, 0.5);
//     tween.setOnUpdate( function( val:float ){
// if (val > 0) Debug.Log(attr + ' tweening');
//       slider.value = val;
// if (val > 0) Debug.Log(attr + ' actual value: ' + slider.value);
      slider.value = attrPct * slider.maxValue;

      if (attrPct >= 1.0) isSuccessful = true;
      currentScore = Mathf.Max(attrPct, currentScore);
    // });
  }

  StatusOK.SetActive(isSuccessful);
}

function GetOutcomeScore() {
  return currentScore;
}
