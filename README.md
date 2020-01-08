# Sentiment Tokens

This is an early build of the sentiment token project for the Telos Blockchain Network. Included is the contract and a Postgres Dmux implementation with an API for pulling a given account's sentiment scores.

Remaining ToDo's include:
- Converting the sentiment query into a window View
...

## Build Instructions

### Contract
`cd contracts`

#### Build
`./build.sh sentiment`

#### Deploy
`./deploy.sh sentiment local`

### Postgres

### Postgres BigInt Extension
https://github.com/craigbranscom/pg-biguint

### Demux Server
```
cd ./demux-server
yarn install
yarn start
```

### REST Api Server
```
cd ./rest-server
yarn install
yarn start
```

#### Endpoints
`Token Balance`
```
GET
/balance/[account_name]/[token_symbol]
ie. /balance/telosvoyager/like
ie. /balance/telosvoyager/dislike
ie. /balance/telosvoyager/trust
ie. /balance/telosvoyager/distrust

Response:
{"balance":0}
```

`Telos Chess`
```
GET
/teloschess/[account_name]
ie. /balance/telosvoyager

Response:
{"total":"0","win":"0","loss":"0","draw":"0"}
```





## Token Behaviors

### Three Initial Sentiment Tokens
The Sentiment Project will launch with three tokens: Like, Trust & Respect. Each sentiment token will comprise both its positive value and its equel and opposite negative value. giving these tokens a range from good to bad by which sentiment can be assigned to another account. 
 
### Like
Described as a balanced ternary system, Like (along with their corresponding Don't-Like) tokens behave similar to their namesake metric in popular social platforms, with the added ability to assign a Don't-Like token to an account as easily as a Like. These are the only options for assigning a Like/Don't-Like.

### Trust
Trust tokens add the ability to assign a range of potential "trust" to a recipient. Trust can be awarded anywhere from 1 to 5 positive trust sentiment to 1 to 5 negative trust. Therefore a trust score awarded to a recipient will have one of eleven potential options (including the neutral zero) aggregate trust scores for any given account. A way to illustrate the significance of the trust scale could be 1 is akin to trusting someone to water your plants to 5 is trusting someone to babysit your children for the weekend.

# Examples

## Contract Actions

### sentiment
#### send like
`cleos push action sentimenttls like '{"from":"alice","to":"bob"}' -p alice`
#### send dislike
`cleos push action sentimenttls dislike '{"from":"alice","to":"bob"}' -p alice`
#### send trust
`cleos push action sentimenttls trust '{"from":"alice","to":"bob","points":4}' -p alice`
#### send distrust
`cleos push action sentimenttls distrust '{"from":"alice","to":"bob","points":2}' -p alice`

#### token balances
`cleos get table sentimenttls alice profiles`

### telos chess
#### win/loss
`cleos push action sentimenttls teloschess '{"player1":"bob","player2":"alice","winner":"alice","tx_hash":"2a546fd89a5c261c5aea887a1dcc4d56a1a04895689c139a1cce223ab3564356"}' -p telos.chess`
#### draw
`cleos push action sentimenttls teloschess '{"player1":"bob","player2":"alice","winner":"","tx_hash":"e7eeba417c64dd27d07502b27c448880683b070747366a2ddef62e29f3f32881"}' -p telos.chess`
