const ObjectActionHandler = require("./ObjectActionHandler")
const updaters = require("./updaters")
const effects = require("./effects")
const actionHandler = new ObjectActionHandler(
  updaters,
  effects,
)

module.export = [actionHandler];
