# Trade Battles

## Description

Trade Battles is an exhilarating game that will put your inner stock trader to the test. Create battles with your friends and
figure out who is the best trader. Each of the contestants will start out with $100,000 USD that they will be able to use throughout
the battle to buy and sell real-time stocks. The battle duration will be set by the battle creator and at the end of the battle the person
with the most profit will be the winner.

## Tech stack

### Front-end

<div>
  <img src="https://cdn.worldvectorlogo.com/logos/typescript.svg" alt="typescript" width="60" />
  <img src="https://cdn.worldvectorlogo.com/logos/react-native-1.svg" alt="react-native" width="80"/>
</div>

### Back-end

<div>
  <img src="https://cdn.worldvectorlogo.com/logos/logo-javascript.svg" alt="javascript" width="60" />
  <img src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" alt="node" width="55"/>
  <img src="https://cdn.worldvectorlogo.com/logos/postgresql.svg" alt="postgres" width="60" />
  <img src="https://cdn.worldvectorlogo.com/logos/express-109.svg" alt="express" width="100"/>
</div
>

## Demo <img src="https://cdn.worldvectorlogo.com/logos/youtube-3.svg" alt="express" width="15"/>

I made a youtube video where I do a brief walkthrough of the app:

- https://www.youtube.com/watch?v=Mu79HIkxhPE

Here are some screenshots of the app as well 😃.

<div>
  <img src="./TradeBattles/assets/READMEImages/trade-battles-hero-image.png" alt="trade-battles-battle" width="800"/>
</div>

## APIs Used

### IEX Cloud

- IEX Cloud is a company that aims to level the trading playing field for long-term investors with real-time data of the markets.
- Trade battles relies heavily on this API and you can get a free API key on this link https://iexcloud.io/

### Polygon.io

- Polygon.io handles the heavy lifting of fetching accurate, reliable and real-time financial data for developers to use on their applications.
- Trade battles makes use of Polygon.io through a free API key that can be created on this link https://polygon.io/

### How to use the API keys

- These keys should be added to ./server/models/config.js

## IOS Requirements

- Installations

  - Xcode

- Files

  - [GoogleService-info.plist](https://support.google.com/firebase/answer/7015592?hl=en#ios&zippy=%2Cin-this-article)

- Configurations

  - Signing & Capabilities
    - Team (must be trusted or changed for build to run)
  - Info
    - URL Types
      - Identifier (set to Bundle Identifier found in General)
      - URL Schemes (set to value of REVERSED_CLIENT_ID found in GoogleService-info file)
      - Role (Editor)

<!--
## Dependencies

## Intended Audience

## People involved

## Screenshots of the app

## How to run a local copy of this app

For the app to work it needs two api keys that are inside /server/models/config

The first one you can get from https://iexcloud.io
The second one from https://polygon.io

For the database you will need 3 tables: users, battles and transactions.

users:

user_id: text PRIMARY KEY
first_name: text
last_name: text
battles: text[]
transactions: text[]
photo: text
email: text
current_gain_loss: jsonb
watchlist: text[]

battle columns:

battle_id: text PRIMARY KEY
battle_members: text[]
start_date_timestamp: text
end_date_timestamp: text
battle_name: text

transactions:

transaction_id: text PRIMARY KEY
battle_id: text
user_id: text
action: text
symbol: text
price: numeric
quantity: numeric
transaction_timestamp: text -->
