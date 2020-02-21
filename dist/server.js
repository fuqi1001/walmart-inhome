"use strict";

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = process.env.PORT || 8090;
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.get('/api/hello', function (req, res) {
  res.send({
    ok: 1,
    message: 'Hello from server'
  });
});
app.listen(port, function () {
  return console.log("Server Started, Listening on port ".concat(port));
});