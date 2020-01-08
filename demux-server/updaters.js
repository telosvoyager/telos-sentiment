// const { Serialize } = require('eosjs');

async function updateLikeData(db, payload, blockInfo, context) {
  console.log(payload)

  // const fromAccountBuffer = new Serialize.SerialBuffer({
  //   array: null,
  //   textEncoder: new TextEncoder(),
  //   textDecoder: new TextDecoder()
  // });
  // fromAccountBuffer.pushName(payload.data.from)
  // const toAccountBuffer = new Serialize.SerialBuffer({
  //   array: null,
  //   textEncoder: new TextEncoder(),
  //   textDecoder: new TextDecoder()
  // });
  // toAccountBuffer.pushName(payload.data.to)
  // const fromAccountBigInt = fromAccountBuffer.getUint64AsNumber();
  // const toAccountBigInt = toAccountBuffer.getUint64AsNumber();
  //
  // db.sentiment_events.insert({
  //   sent_id: 1,
  //   sender: fromAccountBigInt,
  //   recipient: toAccountBigInt,
  //   amount: 1
  // })

  db.sentiment_events.insert({
    sent_id: 1,
    sender: payload.data.from,
    recipient: payload.data.to,
    amount: 1
  })
}

async function updateDislikeData(db, payload, blockInfo, context) {
  console.log(payload)

  // const fromAccountBuffer = new Serialize.SerialBuffer({
  //   array: null,
  //   textEncoder: new TextEncoder(),
  //   textDecoder: new TextDecoder()
  // });
  // fromAccountBuffer.pushName(payload.data.from)
  // const toAccountBuffer = new Serialize.SerialBuffer({
  //   array: null,
  //   textEncoder: new TextEncoder(),
  //   textDecoder: new TextDecoder()
  // });
  // toAccountBuffer.pushName(payload.data.to)
  // const fromAccountBigInt = fromAccountBuffer.getUint64AsNumber();
  // const toAccountBigInt = toAccountBuffer.getUint64AsNumber();
  //
  // db.sentiment_events.insert({
  //   sent_id: 2,
  //   sender: fromAccountBigInt,
  //   recipient: toAccountBigInt,
  //   amount: 1
  // })

  db.sentiment_events.insert({
    sent_id: 2,
    sender: payload.data.from,
    recipient: payload.data.to,
    amount: 1
  })


}

async function updateTrustData(db, payload, blockInfo, context) {
  console.log(payload)

  // const fromAccountBuffer = new Serialize.SerialBuffer({
  //   array: null,
  //   textEncoder: new TextEncoder(),
  //   textDecoder: new TextDecoder()
  // });
  // fromAccountBuffer.pushName(payload.data.from)
  // const toAccountBuffer = new Serialize.SerialBuffer({
  //   array: null,
  //   textEncoder: new TextEncoder(),
  //   textDecoder: new TextDecoder()
  // });
  // toAccountBuffer.pushName(payload.data.to)
  // const fromAccountBigInt = fromAccountBuffer.getUint64AsNumber();
  // const toAccountBigInt = toAccountBuffer.getUint64AsNumber();
  //
  // db.sentiment_events.insert({
  //   sent_id: 3,
  //   sender: fromAccountBigInt,
  //   recipient: toAccountBigInt,
  //   amount: payload.data.points
  // })

  db.sentiment_events.insert({
    sent_id: 3,
    sender: payload.data.from,
    recipient: payload.data.to,
    amount: payload.data.points
  })

}

async function updateDistrustData(db, payload, blockInfo, context) {
  console.log(payload)

  // const fromAccountBuffer = new Serialize.SerialBuffer({
  //   array: null,
  //   textEncoder: new TextEncoder(),
  //   textDecoder: new TextDecoder()
  // });
  // fromAccountBuffer.pushName(payload.data.from)
  // const toAccountBuffer = new Serialize.SerialBuffer({
  //   array: null,
  //   textEncoder: new TextEncoder(),
  //   textDecoder: new TextDecoder()
  // });
  // toAccountBuffer.pushName(payload.data.to)
  // const fromAccountBigInt = fromAccountBuffer.getUint64AsNumber();
  // const toAccountBigInt = toAccountBuffer.getUint64AsNumber();
  //
  // db.sentiment_events.insert({
  //   sent_id: 4,
  //   sender: fromAccountBigInt,
  //   recipient: toAccountBigInt,
  //   amount: payload.data.points
  // })

  db.sentiment_events.insert({
    sent_id: 4,
    sender: payload.data.from,
    recipient: payload.data.to,
    amount: payload.data.points
  })

}

async function updateTelosChessData(db, payload, blockInfo, context) {
  console.log(payload)
  // console.log(blockInfo)

  db.telos_chess.insert({
    player1: payload.data.player1,
    player2: payload.data.player2,
    winner: payload.data.winner || null,
    tx_hash: payload.data.tx_hash,
  })

}

const updaters = [
  {
    actionType: "sentimenttls::like",
    apply: updateLikeData,
  },
  {
    actionType: "sentimenttls::dislike",
    apply: updateDislikeData,
  },
  {
    actionType: "sentimenttls::trust",
    apply: updateTrustData,
  },
  {
    actionType: "sentimenttls::distrust",
    apply: updateDistrustData,
  },
  {
    actionType: "sentimenttls::teloschess",
    apply: updateTelosChessData,
  },
]




module.exports = updaters
