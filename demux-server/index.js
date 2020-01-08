const config = require("../config")
const massive = require("massive")
// const { massive } = require("demux-postgres")

const { BaseActionWatcher } = require("demux")
const { MassiveActionHandler } = require("demux-postgres")
const { NodeosActionReader } = require("demux-eos") // Or any other compatible Action Reader

try {
  console.log('watcher started')

  // See https://eosio.github.io/demux-js/ for info on Handler Versions, Updaters, and Effects
  // const handlerVersions = require("./handlerVersions") // Import your handler versions
  const updaters = require("./updaters")
  const effects = require("./effects")

  const handlerVersions = [
    {
      versionName: 'v1',
      deferUntilIrreversible: true,
      updaters: updaters,
      effects: effects
    },
  ]

  // See "Migrations" section above
  const migrationSequences = require("./migrationSequences")

  // See https://massivejs.org/docs/connecting for info on massive configuration

  massive(config.db).then((db) => {
    // console.log('db', db)
    const actionReader = new NodeosActionReader(config.demux)
    const actionHandler = new MassiveActionHandler(
      handlerVersions,
      db,
      db.schema,
      migrationSequences
    )
    const actionWatcher = new BaseActionWatcher(actionReader, actionHandler, 500)
    actionWatcher.watch()
  })
}
catch (e) {
  console.log(e);
}
