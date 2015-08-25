import System.Collections.Generic;
import System.Linq;
import UnityEngine.UI;

public var NextPanel : GameObject;
public var TargetText : Text;
public var CPS : float;
public var StartDelay : float;
public var EndDelay : float;

private var textContents : String;
private var cGroup : CanvasGroup;

function OnEnable() {
  textContents = TargetText.text;
  TargetText.text = '';
  cGroup = GetComponent(CanvasGroup);
  StartTyping();
}

function StartTyping() {
  yield new WaitForSeconds(StartDelay);

  for (var i = 0; i < textContents.Length; i++) {
    TargetText.text += textContents[i];
    yield new WaitForSeconds(1/CPS);
  }

  yield new WaitForSeconds(EndDelay);

  LeanTween.value(gameObject, 1.0, 0.0, 0.25)
    .setOnUpdate(function(val:float) {
      cGroup.alpha = val;
    }).setOnComplete(function() {
      if (NextPanel) NextPanel.SetActive(true);
      cGroup.alpha = 1.0;
      gameObject.SetActive(false);
    });
}