// Disable this GameObject in web builds (WebGL or Webplayer).

function Awake() {
  #if UNITY_WEBGL || UNITY_WEBPLAYER
    gameObject.SetActive(false);
  #endif
}

function OnEnable() {
  #if UNITY_WEBGL || UNITY_WEBPLAYER
    gameObject.SetActive(false);
  #endif
}