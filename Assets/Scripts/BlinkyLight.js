@Range(0,10)
public var MinOff : float;
@Range(0,10)
public var MaxOff : float;
@Range(0,10)
public var MinOn : float;
@Range(0,10)
public var MaxOn : float;

private var imageComp : Image;

function Start() {
  imageComp = GetComponent(Image);
  Blink();
}

function Blink() {
  while (true) {
    var timeOff = Random.Range(MinOff, MaxOff);
    var timeOn = Random.Range(MinOn, MaxOn);
    yield new WaitForSeconds(timeOff);
    Toggle();
    yield new WaitForSeconds(timeOn);
    Toggle();
  }
}

function Toggle() {
  imageComp.enabled = !imageComp.enabled;
}