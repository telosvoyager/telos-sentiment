/**
 * Sentiment Token implementation.
 *
 * @author Craig Branscom
 * @author John Hauge
 * @contract sentiment
 */

#include "../include/sentiment.hpp"

sentiment::sentiment(name self, name code, datastream<const char*> ds) : contract(self, code, ds) {}

sentiment::~sentiment() {}

//======================== activity actions ========================

void sentiment::like(name from, name to) {
  //authenticate
  require_auth(from);

  check(is_account(to), "recipient account doesn't exist");

  //get profiles table
  profiles_table profiles(get_self(), from.value);
  // find like profile
  auto profItr = profiles.find(LIKE_SYM.code().raw());

  time_point_sec last_refresh = eosio::current_time_point();

  if (profItr == profiles.end()) {
    // eosio::print("new profile");
    profiles.emplace(from, [&](auto& row) {

      row.account_name = from;
      row.balance = asset(LIKE_TOKENS_PER_TIMEFRAME - 1, LIKE_SYM);
      row.last_refresh = last_refresh;
    });
  }
  else {
    // eosio::print("existing profile");
    auto& prof = profiles.get(LIKE_SYM.code().raw(), "no profile");

    //validate
    check(from == prof.account_name, "only profile owner is authorized to like content");
    check(prof.balance.symbol == LIKE_SYM, "wrong token");

    int64_t curTime = last_refresh.sec_since_epoch();
    int64_t timeElapsed = curTime - prof.last_refresh.sec_since_epoch();
    int64_t rounds = 0;
    int64_t moreTokens = 0;

    if ( timeElapsed > LIKE_TIMEFRAME ) {
      rounds = timeElapsed / LIKE_TIMEFRAME;
      moreTokens = LIKE_TOKENS_PER_TIMEFRAME * rounds;
    }
    else {
      check(prof.balance > asset(0, LIKE_SYM), "insufficient like balance");
    }

    //charge 1 like from balance
    profiles.modify(prof, same_payer, [&](auto& row) {
      if ( timeElapsed > LIKE_TIMEFRAME ) {
        row.balance += asset(moreTokens, LIKE_SYM);
        row.last_refresh = last_refresh;
      }

      row.balance -= asset(1, LIKE_SYM);
    });
  }
}

void sentiment::dislike(name from, name to) {
  //authenticate
  require_auth(from);

  check(is_account(to), "recipient account doesn't exist");

  //get profiles table
  profiles_table profiles(get_self(), from.value);
  // find dislike profile
  auto profItr = profiles.find(DISLIKE_SYM.code().raw());

  time_point_sec last_refresh = eosio::current_time_point();

  if (profItr == profiles.end()) {
    // eosio::print("new profile");
    profiles.emplace(from, [&](auto& row) {

      row.account_name = from;
      row.balance = asset(DISLIKE_TOKENS_PER_TIMEFRAME - 1, DISLIKE_SYM);
      row.last_refresh = last_refresh;
    });
  }
  else {
    // eosio::print("existing profile");
    auto& prof = profiles.get(DISLIKE_SYM.code().raw(), "no profile");
    //validate
    check(from == prof.account_name, "only profile owner is authorized to like content");
    check(prof.balance.symbol == DISLIKE_SYM, "wrong token");

    int64_t curTime = last_refresh.sec_since_epoch();
    int64_t timeElapsed = curTime - prof.last_refresh.sec_since_epoch();
    int64_t rounds = 0;
    int64_t moreTokens = 0;

    if ( timeElapsed > DISLIKE_TIMEFRAME ) {
      rounds = timeElapsed / DISLIKE_TIMEFRAME;
      moreTokens = DISLIKE_TOKENS_PER_TIMEFRAME * rounds;
    }
    else {
      check(prof.balance > asset(0, DISLIKE_SYM), "insufficient like balance");
    }

    //charge 1 dislike from balance
    profiles.modify(prof, same_payer, [&](auto& row) {
      if ( timeElapsed > DISLIKE_TIMEFRAME ) {
        row.balance += asset(moreTokens, DISLIKE_SYM);
        row.last_refresh = last_refresh;
      }

      row.balance -= asset(1, DISLIKE_SYM);
    });
  }
}

void sentiment::trust(name from, name to, uint32_t points) {
  //authenticate
  require_auth(from);

  check(is_account(to), "recipient account doesn't exist");
  check((points >= 1) && (points <= 5), "Points - 1 to 5");
  //
  //get profiles table
  profiles_table profiles(get_self(), from.value);
  // find dislike profile
  auto profItr = profiles.find(TRUST_SYM.code().raw());

  time_point_sec last_refresh = eosio::current_time_point();

  if (profItr == profiles.end()) {
    // eosio::print("new profile");
    profiles.emplace(from, [&](auto& row) {

      row.account_name = from;
      row.balance = asset(TRUST_TOKENS_PER_TIMEFRAME - 1, TRUST_SYM);
      row.last_refresh = last_refresh;
    });
  }
  else {
    // eosio::print("existing profile");
    auto& prof = profiles.get(TRUST_SYM.code().raw(), "no profile");

    //validate
    check(from == prof.account_name, "only profile owner is authorized to like content");
    check(prof.balance.symbol == TRUST_SYM, "wrong token");

    int64_t curTime = last_refresh.sec_since_epoch();
    int64_t timeElapsed = curTime - prof.last_refresh.sec_since_epoch();
    int64_t rounds = 0;
    int64_t moreTokens = 0;

    if ( timeElapsed > TRUST_TIMEFRAME ) {
      rounds = timeElapsed / TRUST_TIMEFRAME;
      moreTokens = TRUST_TOKENS_PER_TIMEFRAME * rounds;
    }
    else {
      check(prof.balance > asset(0, TRUST_SYM), "insufficient like balance");
    }

    //charge 1 dislike from balance
    profiles.modify(prof, same_payer, [&](auto& row) {
      if ( timeElapsed > TRUST_TIMEFRAME ) {
        row.balance += asset(moreTokens, TRUST_SYM);
        row.last_refresh = last_refresh;
      }

      row.balance -= asset(1, TRUST_SYM);
    });
  }
}

void sentiment::distrust(name from, name to, uint32_t points) {
  //authenticate
  require_auth(from);

  check(is_account(to), "recipient account doesn't exist");
  check((points >= 1) && (points <= 5), "Points - 1 to 5");
  //
  //get profiles table
  profiles_table profiles(get_self(), from.value);
  // find dislike profile
  auto profItr = profiles.find(DISTRUST_SYM.code().raw());

  time_point_sec last_refresh = eosio::current_time_point();

  if (profItr == profiles.end()) {
    // eosio::print("new profile");
    profiles.emplace(from, [&](auto& row) {

      row.account_name = from;
      row.balance = asset(DISTRUST_TOKENS_PER_TIMEFRAME - 1, DISTRUST_SYM);
      row.last_refresh = last_refresh;
    });
  }
  else {
    // eosio::print("existing profile");
    auto& prof = profiles.get(DISTRUST_SYM.code().raw(), "no profile");

    //validate
    check(from == prof.account_name, "only profile owner is authorized to like content");
    check(prof.balance.symbol == DISTRUST_SYM, "wrong token");

    int64_t curTime = last_refresh.sec_since_epoch();
    int64_t timeElapsed = curTime - prof.last_refresh.sec_since_epoch();
    int64_t rounds = 0;
    int64_t moreTokens = 0;

    if ( timeElapsed > DISTRUST_TIMEFRAME ) {
      rounds = timeElapsed / DISTRUST_TIMEFRAME;
      moreTokens = DISTRUST_TOKENS_PER_TIMEFRAME * rounds;
    }
    else {
      check(prof.balance > asset(0, DISTRUST_SYM), "insufficient like balance");
    }

    //charge 1 dislike from balance
    profiles.modify(prof, same_payer, [&](auto& row) {

      if ( timeElapsed > DISTRUST_TIMEFRAME ) {
        row.balance += asset(moreTokens, DISTRUST_SYM);
        row.last_refresh = last_refresh;
      }

      row.balance -= asset(1, DISTRUST_SYM);
    });
  }
}

//======================== telos.chess actions =====================

void sentiment::teloschess(name player1, name player2, name winner, const checksum256 tx_hash) {
  //authenticate
  require_auth("telos.chess"_n);



  check(is_account(player1), "player1's account doesn't exist");
  check(is_account(player2), "player2's account doesn't exist");

  if (!!winner) {
    check(is_account(winner), "winner's account doesn't exist");

    eosio::print((winner != player1) && (winner != player2));
    check(((winner == player1) || (winner == player2)), "only player1 or player2 can be winner");
  }






}

//======================== admin actions ========================



//========== functions ==========



//========== reactions ==========



//========== migration actions ==========



//========== dispatcher ==========

extern "C" {
  void apply(uint64_t receiver, uint64_t code, uint64_t action) {

    if (code == receiver)
    {
      switch (action)
      {
        EOSIO_DISPATCH_HELPER(sentiment,
          (like)(dislike)//activity
          (trust)(distrust)//activity
          (teloschess)//activity
        );
      }
    }
  }
}
