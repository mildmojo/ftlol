import System.Collections.Generic;
import System.Linq;

class GameData {
  private static var files = new Dictionary.<String, String[,]>();

  public static function Load(file) {
    var csv = Resources.Load(file) as TextAsset;
    files[file] = CSVReader.SplitCsvGrid(csv.text);
  }
}