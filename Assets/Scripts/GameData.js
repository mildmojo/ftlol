import System.Collections.Generic;
import System.Linq;

// Static class for storing game data loaded from disk.
//
// Retrieval:
//   var problems = GameData.Files['problems'];
//   var firstItemName = problems[0]['Name'];

class GameData {
  public static var Files = new Dictionary.<String, List.<Dictionary.<String, String> > >();

  public static function Load(file : String) {
    var csv = Resources.Load(file) as TextAsset;
    var grid = CSVReader.SplitCsvGrid(csv.text);
    var colNames = new Array();
    file = file.ToLower();

    Files[file] = new List.<Dictionary.<String, String> >();

    // Each row
    for (var i = 0; i < grid.GetLength(0); i++) {
      var row = new Dictionary.<String, String>();

      // Each column
      // NOTE: grid.GetLength(1) MINUS ONE because it crashed if I indexed the
      //   last column. No idea why.
      for (var j = 0; j < grid.GetLength(1) ; j++) {
        if (i == 0 && grid[i, j] != null) {
          // First row is column names
          var name = grid[i, j];
          var lowerName = name.ToLower().Replace(' ', '_');
          colNames.push(lowerName);
        } else if (j < colNames.length) {
          row[colNames[j]] = grid[i, j];
        }
      }

      if (i > 0 && row[colNames[0]] != null && row[colNames[0]] != '') {
// var keys = String.Join(', ', row.Keys.Select(function(n) { return n.ToString(); }).ToArray());
// Debug.Log('PUSHING row with keys ' + keys);
        Files[file].Add(row);
      }
    }
  }

  public static function GetRows(file) {
    return Files[file];
  }


}