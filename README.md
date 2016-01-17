# threadmill.js

A javascript module to generate threadmilling G-Code for single profile threadmill
cutters.

This projects is still in it's infancy.

### Example

```
var threadmill = require('./index.js');

// Generate threadmilling for a 10-32, 1/4" depth, internal thread w/ 0.01 width of cut
console.log(threadmill.generateInternalThreadHelix(0.19, 0.1517, 0.135, 0.031250, 0.25, 0.01, 0, 0, 0, 0.05, 6));

// output:
(Threadmill - dMaj: 0.19, dMin: 0.1517, pitch: 0.03125)
G0 Z0.05
G0 X0 Y0
(Cut pass #1)
G1 X0 Y0.01835
G3 X0 Y0.01835 Z0.01875 I0 J-0.01835
G3 X0 Y0.01835 Z-0.0125 I0 J-0.01835
G3 X0 Y0.01835 Z-0.04375 I0 J-0.01835
G3 X0 Y0.01835 Z-0.075 I0 J-0.01835
G3 X0 Y0.01835 Z-0.10625 I0 J-0.01835
G3 X0 Y0.01835 Z-0.1375 I0 J-0.01835
G3 X0 Y0.01835 Z-0.16875 I0 J-0.01835
G3 X0 Y0.01835 Z-0.2 I0 J-0.01835
G3 X0 Y0.01835 Z-0.23125 I0 J-0.01835
G3 X0 Y0.01835 Z-0.2625 I0 J-0.01835
G3 X-0.12334 Y0.009357 Z-0.265625 I0 J-0.01835
(return to top/center)
G0 X0 Y0
G0 Z0.05
(Cut pass #2)
G1 X0 Y0.0275
G3 X0 Y0.0275 Z0.01875 I0 J-0.0275
G3 X0 Y0.0275 Z-0.0125 I0 J-0.0275
G3 X0 Y0.0275 Z-0.04375 I0 J-0.0275
G3 X0 Y0.0275 Z-0.075 I0 J-0.0275
G3 X0 Y0.0275 Z-0.10625 I0 J-0.0275
G3 X0 Y0.0275 Z-0.1375 I0 J-0.0275
G3 X0 Y0.0275 Z-0.16875 I0 J-0.0275
G3 X0 Y0.0275 Z-0.2 I0 J-0.0275
G3 X0 Y0.0275 Z-0.23125 I0 J-0.0275
G3 X0 Y0.0275 Z-0.2625 I0 J-0.0275
G3 X-0.12334 Y0.009357 Z-0.265625 I0 J-0.0275
(return to top/center)
G0 X0 Y0
G0 Z0.05
```
