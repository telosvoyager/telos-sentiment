const express = require('express');
const request = require('request')
const config = require('../../config');
const { Pool } = require('pg')
// const { Serialize } = require('eosjs');


const pool = new Pool(config.db)

const router = new express.Router();


router.get('/balance/:account_name/:token_sym', async (req, res) => {
  // console.log('/balance/:token_sym/:account_name')

  const client = await pool.connect()
  try {

    if (!req.params.token_sym) {
      throw new Error('Missing token symbol');
    }
    if (!req.params.account_name) {
      throw new Error('Missing account name');
    }

    console.log('req.params.token_sym', req.params.token_sym)
    let result = await client.query('SELECT sent_id FROM sentiment_types WHERE sent_name = $1::text', [req.params.token_sym.toLowerCase()]);

    if (!result.rows.length) {
      throw new Error('Token Symbol does not exist');
    }

    const token_sym_id = result.rows[0].sent_id;

    // const fromAccountBuffer = new Serialize.SerialBuffer({
    //   array: null,
    //   textEncoder: new TextEncoder(),
    //   textDecoder: new TextDecoder()
    // });
    // fromAccountBuffer.pushName(req.params.account_name)
    // const fromAccountBigInt = fromAccountBuffer.getUint64AsNumber();

    result = await client.query(
      [
        'SELECT ',
          'se.recipient, ',
          'SUM(amount) AS ', req.params.token_sym.toUpperCase(), ' ',
        'FROM sentiment_events AS se ',
          'JOIN sentiment_types AS st ON se.sent_id = st.sent_id ',
        // 'WHERE se.recipient = $1::bigint ',
        'WHERE se.recipient = $1 ',
          'AND se.sent_id = $2 ',
        'GROUP BY 1'

      ].join(''),
      // [fromAccountBigInt, token_sym_id]
      [req.params.account_name, token_sym_id]
    );

    let balance = ( ! result || !result.rows || !result.rows.length ) ? 0 : result.rows[0][req.params.token_sym.toLowerCase()];

    res.status(200).json({balance})


  }
  catch (e) {
    console.log(e);
    res.status(417).json({message: e.message})
  }
  finally {
    client.release()
  }


});

router.get('/teloschess/:account_name', async (req, res) => {
  console.log('teloschess')
  const client = await pool.connect()
  try {
    if (!req.params.account_name) {
      throw new Error('Missing account name');
    }

    let newData = {
      total: 0,
      win: 0,
      loss: 0,
      draw: 0
    }

    let result = await client.query(
      [
        'SELECT ',
          'COUNT(*) AS c ',
        'FROM telos_chess ',
        'WHERE ( player1 = $1 or player2 = $1 ) ',
      ].join(''),
      [req.params.account_name]
    );
    newData.total = ( ! result || !result.rows || !result.rows.length ) ? 0 : result.rows[0]['c'];

    result = await client.query(
      [
        'SELECT ',
          'COUNT(*) AS c ',
        'FROM telos_chess ',
        'WHERE ( player1 = $1 or player2 = $1 ) ',
          'AND winner = $1'
      ].join(''),
      [req.params.account_name]
    );

    newData.win = ( ! result || !result.rows || !result.rows.length ) ? 0 : result.rows[0]['c'];

    result = await client.query(
      [
        'SELECT ',
          'COUNT(*) AS c ',
        'FROM telos_chess ',
        'WHERE ( player1 = $1 or player2 = $1 ) ',
          'AND winner != $1'
      ].join(''),
      [req.params.account_name]
    );

    newData.loss = ( ! result || !result.rows || !result.rows.length ) ? 0 : result.rows[0]['c'];

    result = await client.query(
      [
        'SELECT ',
          'COUNT(*) AS c ',
        'FROM telos_chess ',
        'WHERE ( player1 = $1 or player2 = $1 ) ',
          'AND winner ISNULL'
      ].join(''),
      [req.params.account_name]
    );

    newData.draw = ( ! result || !result.rows || !result.rows.length ) ? 0 : result.rows[0]['c'];


    res.status(200).json(newData)


  }
  catch (e) {
    console.log(e);
    res.status(417).json({message: e.message})
  }
  finally {
    client.release()
  }


});



module.exports = router;
