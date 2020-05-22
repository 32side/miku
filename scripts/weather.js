'use strict';
const http = require('http');
const { Client } = require('pg');
var client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'openweathermap_spot',
  password: 'postgres',
  port: 5432
});
client.connect();

// 「〇〇の天気」と聞かれるとその地点の現在の天気を教えてくれる
module.exports = (robot) => {
  robot.hear(/(.*)+(の)+(天気|てんき)/, (msg) => {
    var text = msg.message.text.split(/の/);
    /* param @res.rows[0][0]{id} 
     *       @res.rows[0][1]{name}
     *       @res.rows[0][2]{number}
     *       @res.rows[0][3]{country}
    */
    // ランダムの天気を聞かれたとき
    if (text[0] == "ランダム" || text[0] == "らんだむ") {
      var num = Math.floor(Math.random() * 408) + 1;
      const randomSpot = {
        text: `SELECT * FROM spots WHERE id=${num}`,
        rowMode: 'array'
      }
      client.query(randomSpot, (err, res) => {
        res.fields.map(f => f);
        let spotNumber = res.rows[0][2];
        let spotNameAndCountry = "";
        if (res.rows[0][3] == "") {
          spotNameAndCountry = res.rows[0][1] + res.rows[0][3];
        } else {
          spotNameAndCountry = res.rows[0][1] + "(" + res.rows[0][3] + ")";
        }
        nowWeather(msg, spotNameAndCountry, spotNumber);
      })
    } else {
      const query = {
        text: `SELECT * FROM spots WHERE name=\'${text[0]}\'`,
        rowMode: 'array'
      }
      client.query(query, (err, res) => {
        if (res.rows[0] != null) {
          res.fields.map(f => f);
          let spotNumber = res.rows[0][2];
          let spotNameAndCountry = "";
          if (res.rows[0][3] == "") {
            spotNameAndCountry = res.rows[0][1] + res.rows[0][3];
          } else {
            spotNameAndCountry = res.rows[0][1] + "(" + res.rows[0][3] + "";
          }
          nowWeather(msg, spotNameAndCountry, spotNumber);
        }
      })
    }
  })
};

  // 天気を聞かれたとき {OpenWeatherMapにアクセスしてgetする}
  // 日本の47都道府県に対応
  // たまにバグる
  const owmMainURL = "http://api.openweathermap.org/data/2.5/weather?id="
  const owmSubURL = "&units=metric&APPID=a4df54e25ef09d49de858e19a90a5130";
  function nowWeather(msg, city, cityID) { // s{都道府県名}
  http.get(owmMainURL + cityID + owmSubURL, (res) => {
    var body = '';
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      body += chunk;
      res = JSON.parse(body);
      let weatherDescription = res.weather[0].description;
      let weather = getTranslation(weatherDescription);
      let temp = res.main.temp;
      let lot = Math.random();
      if (lot < 0.96) {   // バグる確率
        console.log("[" + new Date() + "]:" + city + " の今の天気は " + weather + " で、気温は " + temp + " ℃だよ。");
        msg.send(city + " の今の天気は " + weather + " で、気温は " + temp + " ℃だよ。");
      } else {
        const bugWeather = [  // バグった時の空模様
          'かわいいお日様がでている',
          'どんよりどんどん雷雲',
          '飴ちゃんが降っている',
          '雷神様のお怒り模様',
          'ホワイトアウト',
          'バイオハザード',
          'キンピカお日さま晴れ模様',
          'ラーメンが降っている',
          'おにぎりがテカっている',
          'ラッパが鳴っている'
        ];
        let bugWeatherSend = bugWeather[Math.floor(Math.random() * bugWeather.length)];

        // バグった時の気温
        let tempLot = Math.random();
        let bugTemp = 0;
        if (tempLot > 0.833) {
          bugTemp = Math.floor(tempLot * tempLot * 10000) / 100;
        } else if (tempLot > 0.666) {
          bugTemp = Math.floor(tempLot * tempLot * 100000) / 100;
        } else if (tempLot > 0.5) {
          bugTemp = Math.floor(tempLot * tempLot * 1000000) / 100;
        } else if (tempLot > 0.333) {
          bugTemp = Math.floor(tempLot * tempLot * 10000) / 100 * -1;
        } else if (tempLot > 0.166) {
          bugTemp = Math.floor(tempLot * tempLot * 100000) / 100 * -1;
        } else {
          bugTemp = Math.floor(tempLot * tempLot * 1000000) / 100 * -1;
        }
        console.log("[" + new Date() + "]:" + city + " の今の天気は " + bugWeatherSend + " で、気温は " + bugTemp + " ℃だよ。");
        msg.send(city + " の今の天気は " + bugWeatherSend + " で、気温は " + bugTemp + " ℃だよ。");
      }
    });
    }).on('error', (e) => {
    return e.message;
    })
  }
  // OpenWeatherMap の JSON より .weather.description で天気の具合を抜粋して翻訳
  // 値が該当しない場合はそのまま返す
  function getTranslation(arg) {
    switch (arg) {
      case 'thunderstorm with light rain':
        return '小雨で雷雨';
        break;
      case 'thunderstorm with rain':
        return '雷雨';
        break;
      case 'thunderstorm with heavy rain':
        return '大雨で雷雨';
        break;
      case 'light thunderstorm':
        return '弱い雷雨';
        break;
      case 'thunderstorm':
        return '雷雨';
        break;
      case 'heavy thunderstorm':
        return '激しい雷雨';
        break;
      case 'ragged thunderstorm':
        return '不規則な雷雨';
        break;
      case 'thunderstorm with light drizzle':
        return '弱い霧雨と雷雨';
        break;
      case 'thunderstorm with drizzle':
        return '霧雨と雷雨';
        break;
      case 'thunderstorm with heavy drizzle':
        return '激しい霧雨と雷雨';
        break;
      case 'light intensity drizzle':
        return '弱い霧雨';
        break;
      case 'drizzle':
        return '霧雨';
         break;
      case 'heavy intensity drizzle':
        return '濃い霧雨';
        break;
      case 'light intensity drizzle rain':
        return '弱い霧雨と雨';
        break;
      case 'drizzle rain':
        return '霧雨と雨';
        break;
      case 'heavy intensity drizzle rain':
        return '濃い霧雨と雨';
        break;
      case 'shower rain and drizzle':
        return 'にわか雨と霧雨';
        break;
      case 'heavy shower rain and drizzle':
        return '激しいにわか雨と霧雨';
        break;
      case 'shower drizzle':
        return 'にわか雨';
        break;
      case 'light rain':
        return '小雨';
        break;
      case 'moderate rain':
        return '雨';
        break;
      case 'heavy intensity rain':
        return '大雨';
        break;
      case 'very heavy rain':
        return '激しい大雨';
        break;
      case 'extreme rain':
        return 'とても激しい大雨';
        break;
      case 'freezing rain':
        return '氷雨';
        break;
      case 'light intensity shower rain':
        return '小雨のにわか雨';
        break;
      case 'shower rain':
        return 'にわか雨';
        break;
      case 'heavy intensity shower rain':
        return '大雨のにわか雨';
        break;
      case 'ragged shower rain':
        return '不規則なにわか雨';
        break;
      case 'light snow':
        return '小雪';
        break;
      case 'snow':
        return '雪';
        break;
      case 'heavy snow':
        return '大雪';
        break;
      case 'sleet':
        return 'みぞれ';
        break;
      case 'light shower sleet':
        return '軽いにわかみぞれ';
        break;
      case 'shower sleet':
        return 'にわかみぞれ';
        break;
      case 'light rain and snow':
        return '小雨と雪';
        break;
      case 'rain and snow':
        return '雨と雪';
        break;
      case 'light shower snow':
        return 'にわか小雪';
        break;
      case 'shower snow':
        return 'にわか雪';
        break;
      case 'heavy shower snow':
        return 'にわか大雪';
        break;
      case 'mist':
        return '霞';
        break;
      case 'smoke':
        return '霧';
        break;
      case 'haze':
        return '靄';
        break;
      case 'sand/ dust whirls':
        return '砂/ほこり';
        break;
      case 'fog':
        return '煙霧';
        break;
      case 'sand':
        return '砂ぼこり';
        break;
      case 'dust':
        return '塵が舞う';
        break;
      case 'volcanic ash':
        return '火山灰';
        break;
      case 'squalls':
        return '突風';
        break;
      case 'tornado':
        return '強風';
        break;
      case 'clear sky':
        return '快晴';
        break;
      case 'overcast clouds':
        return 'どんよりした雲り';
        break;
      case 'broken clouds':
        return '曇り';
        break;
      case 'scattered clouds':
        return '軽い曇り';
        break;
      case 'few clouds':
        return '晴れて多少雲がかかっている';
        break;
      default:
        return arg;
    }
  }