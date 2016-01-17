var math = require('mathjs');

exports.generateInternalThreadHelix = function(dMaj, dMin, dTool, pitch, depth,
  widthOfCut, centerX, centerY, holeTopZ, clearanceZ, precision) {

  var rMaj = dMaj/2;
  var rMin = dMin/2;
  var rTool = dTool/2;

  var startX = centerX;
  var startY = centerY + rMin - rTool;
  var startZ = holeTopZ + clearanceZ;

  var actualDepth = depth + clearanceZ + (pitch / 2);
  var arcCount = Math.floor(actualDepth / pitch);
  var arcRem = (actualDepth / pitch) % 1;
  var rDiff = rMaj - rMin;
  var passes = Math.ceil(rDiff / widthOfCut);
  var wocRem = (rDiff / widthOfCut) % 1;

  var gcode = [];

  // Move to starting position
  gcode.push('(Threadmill - dMaj: ' + dMaj + ', dMin: ' + dMin + ', pitch: ' + pitch + ')');
  gcode.push('G0 Z' + startZ);
  gcode.push('G0 X' + centerX + ' Y' + centerY);

  // Width passes
  for (var w = 1; w <= passes; w++) {

    // Figure out x/y offset for pass based on width of cut (WOC)
    var rDelta = widthOfCut * w;
    var y = startY + rDelta;

    // On the last pass go based on dMaj
    if (w == passes) y = centerY + rMaj - rTool;

    var x = startX;
    var offsetY = centerY - y;
    var displayX = math.round(x, precision);
    var displayY = math.round(y, precision);
    var displayOffsetY = math.round(offsetY, precision);

    // Begin cut
    gcode.push('(Cut pass #' + w + ')');
    gcode.push('G1 X' + displayX + ' Y' + displayY);

    // Pitch (depth) passes
    for (var p = 1; p <= arcCount; p++) {
      var zDelta = pitch * p;
      var displayZ = math.round(startZ - zDelta, precision);

      gcode.push('G3 X' + displayX + ' Y' + displayY + ' Z' + displayZ + ' I' +
        centerX + ' J' + displayOffsetY);
    }

    // The last arc needs to be calculated as a partial arc (not 360 deg)
    if (arcRem > 0) {
      var lastThreadStartZ = startZ - (pitch * arcCount);
      var lastThreadEndZ = startZ - actualDepth;
      var zDelta = pitch * (arcCount + 1);
      var angleRad = (2 * Math.PI) * arcRem;
      var quarterAngle = (Math.PI / 2);

      // The cos/sin math returns the x/y point relative to the arc starting
      // at r,0.  However this arc is starting at 0,r, so 90deg needs to be
      // added to the math to rotate to the right result.
      var x = centerX - rTool + (rMaj * Math.cos(angleRad + quarterAngle));
      var y = centerY - rTool + (rMaj * Math.sin(angleRad + quarterAngle));
      var z = startZ - actualDepth;

      var displayX = math.round(x, precision);
      var displayY = math.round(y, precision);
      var displayZ = math.round(z, precision);

      gcode.push('G3 X' + displayX + ' Y' + displayY + ' Z' + displayZ + ' I' +
        centerX + ' J' + displayOffsetY);
    }

    // Move back to the top
    gcode.push('(return to top/center)');
    gcode.push('G0 X' + centerX + ' Y' + centerY);
    gcode.push('G0 Z' + startZ);
  }

  return gcode.join('\n');
};
