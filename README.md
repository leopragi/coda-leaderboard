# Leaderboard Coda Global

#### Deployment
https://coda-backend.herokuapp.com/
#### Demo
https://youtu.be/7Xwa2EbGflA

#### setup

```shell
# pick a place where the files will live
git clone https://github.com/leopragi/coda-leaderboard.git
cd coda-leaderboard
npm install
cd client
npm install
cd ..
npm run start:dev
```
 
Eg: MONGODB_URI="mongodb+srv://leopragi:1a3_L3g3nD++@cluster0.szyc5.mongodb.net/coda?retryWrites=true&w=majority" npm run start:dev

#### env
MONGODB_URI=<mongodb_url> and NODE_ENV

Note: Database should be `coda` and collection should be `lead_board`