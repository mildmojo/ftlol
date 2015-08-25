import UnityEngine.UI;

public var ProblemCard : GameObject;
public var IntroCard : GameObject;
public var IntroText : Text;
public var OutroCard : GameObject;
public var OutroText : Text;

public var RestartButton : GameObject;

public var IconImage : Image;
public var NameText : Text;
public var DescriptionText : Text;

function Reset(year) {
  OutroCard.SetActive(false);
  ProblemCard.SetActive(false);
  IntroText.text = "YEAR: " + year.ToString() + "\n\nDISENGAGING AUTOPILOT...";
  IntroCard.SetActive(true);
  RestartButton.SetActive(false);
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

function ShowResult(lastProblemScore, currentYear, shipLife, startYear, tripLength) {
  OutroText.text = currentYear.ToString();
  OutroText.text += "\n\nPROBLEM SOLVED: " + lastProblemScore;
  OutroText.text += "\n\nETA: " + (startYear + tripLength) + " (" + (shipLife - tripLength).ToString() + " YEARS OF SHIP LIFE POST ARRIVAL)";
  OutroText.text += "\n\nENGAGING AUTOPILOT...";
  ProblemCard.SetActive(false);
  OutroCard.SetActive(true);
}

function ShowSuccess(currentYear, tripLength, shipLife) {
  var extraLife = shipLife - tripLength;
  if (extraLife < 0) {
    var deathYear = currentYear + extraLife;
    OutroText.text = deathYear.ToString();
    OutroText.text += "\n\nYOU DIDN'T MAKE IT";
    OutroText.text += "\n\nALL SOULS LOST";
    OutroText.text += "\n\nRESTART?";
    // Everyone died in `currentYear + extraLife`. You lost.
  } else {
    // You made it to the Ryan system with `extraLife` years to spare.
    OutroText.text = currentYear.ToString();
    OutroText.text += "\n\nYOU MADE IT TO THE RYAN SYSTEM WITH " + extraLife.ToString() + " YEARS TO SPARE";
    OutroText.text += "\n\nYOU MONSTER";
    OutroText.text += "\n\nRESTART?";
  }
  ProblemCard.SetActive(false);
  OutroCard.SetActive(true);
  RestartButton.SetActive(true);
}