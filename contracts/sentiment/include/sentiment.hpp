/**
 * Sentiment Token interface.
 *
 * @author Craig Branscom
 * @author John Hauge
 * @contract sentiment
 */

#pragma once
#include <eosio/eosio.hpp>
#include <eosio/permission.hpp>
#include <eosio/asset.hpp>
#include <eosio/action.hpp>
#include <eosio/transaction.hpp>
#include <eosio/ignore.hpp>

using namespace std;
using namespace eosio;

class [[eosio::contract("sentiment")]] sentiment : public contract {

public:

  sentiment(name self, name code, datastream<const char*> ds);

  ~sentiment();

  const name CONTRACT_ACCOUNT = "sentimenttkn"_n; //TODO: replace with actual contract account
  const symbol LIKE_SYM = symbol("LIKE", 0);
  const symbol DISLIKE_SYM = symbol("DISLIKE", 0);
  const symbol TRUST_SYM = symbol("TRUST", 0);
  const symbol DISTRUST_SYM = symbol("DTRUST", 0);

  const int64_t LIKE_TIMEFRAME = 60 * 60 * 24; // 1 day
  const int64_t LIKE_TOKENS_PER_TIMEFRAME = 10; // 10 LIKE tokens per timeframe

  const int64_t DISLIKE_TIMEFRAME = 60 * 60 * 24; // 1 day
  const int64_t DISLIKE_TOKENS_PER_TIMEFRAME = 10; // 10 DISLIKE tokens per timeframe

  const int64_t TRUST_TIMEFRAME = 60 * 60 * 24; // 1 day
  const int64_t TRUST_TOKENS_PER_TIMEFRAME = 10; // 10 TRUST tokens per timeframe

  const int64_t DISTRUST_TIMEFRAME = 60 * 60 * 24; // 1 day
  const int64_t DISTRUST_TOKENS_PER_TIMEFRAME = 10; // 10 DTRUST tokens per timeframe


  //======================== tables ========================

  //@scope account_name.value
  //@ram
  TABLE profile {
    name account_name;

    asset balance;
    time_point_sec last_refresh;

    uint64_t primary_key() const { return balance.symbol.code().raw(); }
    EOSLIB_SERIALIZE(profile, (account_name)
      (balance)(last_refresh)
    )
  };

  typedef multi_index<name("profiles"), profile> profiles_table;


  //======================== activity actions ========================

  //assigns a like token to an account
  ACTION like(name from, name to);

  //assigns a dislike token to an account
  ACTION dislike(name from, name to);

  //assigns a trust token to an account
  ACTION trust(name from, name to, uint32_t points);

  //assigns a distrust token to an account
  ACTION distrust(name from, name to, uint32_t points);

  //======================== telos.chess actions =====================
  //assign a telos.chess win/loss/draw token to an account
  ACTION teloschess(name player1, name player2, name winner, checksum256 tx_hash);

  //======================== admin actions ========================

  //========== functions ==========

  //========== reactions ==========

  //========== migration actions ==========

};
