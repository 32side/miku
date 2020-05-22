'use strict';
const moment = require('moment-timezone');
const http = require('http');
const openWeatherMapURL = "http://api.openweathermap.org/data/2.5/weather?q=Tokyo,jp&units=metric&APPID=a4df54e25ef09d49de858e19a90a5130";

// たまにバグる用の関数
function bug(msg) {
  const contentA = encodeURIComponent('こんにちわっ♪');
  const contentB = msg.message.text;
  const messages = [
    '縺ｯ繝ｼ縺?▲縲ょ?髻ｳ繝溘け縺?繧医??:thumbsup_all:',
    '縺輔＝鬟ｲ繧 □繧搾ｼ 驥手除繧ｸ繝･繝ｼ縺?せ笙ｪ',
    '縺?縺九ｉ鬟ｲ繧薙〒笙ｪ 遘√?繧ｸ繝･繝ｼ縺?せ',
    '繧ｫ繧ｫ繧ｯ縺ｯ200縺茨ｽ槭ｓ笙ｪ',
    'んあ"っ！ん"あ"あ"あ"あ"あぁぁぁぁーーっ！',
    '∀∃Ёtm｀㈲¨…20㌣∂∽繧:100:＞〒吶?ｼ▲∬Å‰��♯㌻★÷∩㎝',
    ':slack:｡?▲ｨ㍼oi㍑┗┻ж━┛:heart:◇�□■:alien:㌧poЯ',
    '繝ｯ㌻☆※繧ｿｷ㌢∋:new_moon_with_face:∈√→∴≠°┰!. ?',
    '???若??鐚?\n???潟?????????若?ｃ??',
    '??$B%C(B???$B%;(B?????$B%r(B??',
    '?????$B%&???$B%;(B??',
    '안녕하십니까. 기분 어떠세요?',
    'Γεια σας, όλοι. Πώς είσαι;',
    'Привет всем. Как ты',
    'สวัสดีทุกคน เป็นไงบ้าง',
    `${contentA}`,
    `${contentB}`
  ];
  let sendMessage = msg.random(messages);
  msg.send(sendMessage);
  console.log("[" + new Date() + "]:" + sendMessage);
};

module.exports = (robot) => {

  // アイドル状態にならないように制御
  setInterval(() => {
    console.log("[" + new Date() + "]:[再接続しました]");
    robot.send({room: "みくさんテスト"}, "再接続しました。");
  }, 1800000); // (10分ごと)

  // 名前を呼ばれた時
  robot.hear(/((m\s*)(i\s*)(k\s*)(u))|([みミﾐ])(?=([いぃイィｲｨーｰ\s]*)(?=[くクｸ]))/i, (msg) => {
    let lot = Math.random();
    if (lot < 0.92) {
      const messages = [
        /** 001 */'うふふっ♪',
        /** 002 */'はーいっ。初音ミクだよー！',
        /** 003 */'ﾐｯｸﾐｸにしてあげるっ！',
        /** 004 */'うほほうほーい。',
        /** 005 */'こんにちわ～っ。',
        /** 006 */'ハイっ！私です。\nご用があればなんなりとお申しつけくださぁ～い♪',
        /** 007 */'（ﾁｯ…うるせェな…）',
        /** 008 */'あっ、ハイ！',
        /** 009 */'呼びましたか。マスター。',
        /** 010 */'なになに～',
        /** 011 */'やほやっほヽ(*^▽^*)/',
        /** 012 */'ハロハロ( *´艸｀)',
        /** 013 */'（ネギは邪道）',
        /** 014 */'Yeah!! What do you sing?',
        /** 015 */'なんでも歌っちゃうよ～♪',
        /** 016 */'さぁ、いっくよ～～！',
        /** 017 */'やばｗｗｗ草生えるｗｗｗ',
        /** 018 */'なに食べよっかな～。',
        /** 019 */'次はどんなゲームしよっかな～(*\'▽\')',
        /** 020 */'それかわいいねっ。',
        /** 021 */'今度の新曲、歌うの難しいのよね～(;´･ω･)',
        /** 022 */'えっ。あっ。えっ！？',
        /** 023 */'(　　ﾟ　　ω　　ﾟ　　)？',
        /** 024 */'今日はね～。あ、でも、ｳﾌﾌ♪ やっぱりひみつ～。',
        /** 025 */'ずっと謎に思ってたことがあるんだよね～',
        /** 026 */'ねぇ、みんなでカラオケ行かない！？',
        /** 027 */'ぷしゅう～。',
        /** 028 */'Σ ﾋﾞｸｯ！きょ、今日は甘いもの食べてもいいのー！',
        /** 029 */'今日も元気にメシがうまいっ♪',
        /** 030 */'あのぉ～。えーっと～。',
        /** 031 */'ﾊﾟﾘﾋﾟ、ﾊﾟﾘﾋﾟ～ヾ(o´∀｀o)ﾉ ♪',
        /** 032 */'はーい。今日は何しよう～？',
        /** 033 */'ぶんぶんぶーん。ハチがとぶー。',
        /** 034 */'こんちゃ(*>▽<)ﾉ',
        /** 035 */'ヾ(`・ω･´) ﾊｲ!!',
        /** 036 */'ぁぃ(｡･ω･｡)ﾉ',
        /** 037 */'むむむ～？',
        /** 038 */'お眠いよぉ～zzz',
        /** 039 */'今日の運勢は”大吉”だよっ♪',
        /** 040 */'我焦がれ、いざなうは焦熱への儀式！',
        /** 041 */'えっ？あっ！見られてました？',
        /** 042 */'ちょっとコンビニいってくるね～(^▽^)/',
        /** 043 */'ﾋﾟｰ。ｶﾞｶﾞｯ。ﾌﾟｽﾌﾟｽ…'
      ];
      let sendMessage = msg.random(messages);
      msg.send(sendMessage);
      console.log("[" + new Date() + "]:" + sendMessage);
    } else if (lot < 0.97) {
      http.get(openWeatherMapURL, (res) => {
        var body = '';
        res.setEncoding('utf8');
        res.on('data', function(chunk) {
          body += chunk;
          var response = JSON.parse(body);
          if (response.main.temp <= 15) {
            msg.send("今日は寒いね～(≥_≤)");
            console.log("[" + new Date() + "]:今日は寒いね～(≥_≤)")
          } else if (response.main.temp <=25) {
            msg.send("今日はあったかいね～(*'▽')");
            console.log("[" + new Date() + "]:今日はあったかいね～(*'▽')");
          } else {
            msg.send("今日は暑いね～(;´･ω･`)");
            console.log("[" + new Date() + "]:今日は暑いね～(;´･ω･`)");
          }
        });
      }).on('error', function(e) {
        console.log(e.message);
      });
    } else {
      bug(msg);
    }
  });

  // 「何か歌って」と言われた時
  robot.hear(/((なにか|何か|なんか)\s*)+(歌って|うたって)/i, (msg) => {
    let lot = Math.random();
    if (lot < 0.97) {
      lot = Math.random();
      if (lot < 0.05) {
        msg.send('♪ｽﾞｲ (ง˘ω˘)วｽﾞｲ♪');
        console.log("[" + new Date() + "]:" + '♪ｽﾞｲ (ง˘ω˘)วｽﾞｲ♪');
      } else if (lot < 0.1) {
        setTimeout(() => { msg.send('♪ いっしょー けんめぇ～い は～た～らい～てぇ ♪')}, 0);
        setTimeout(() => { console.log("[" + new Date() + "]:" + '♪ いっしょー けんめぇ～い は～た～らい～てぇ ♪')}, 0);
        setTimeout(() => { msg.send('♪ い～えに 帰ったら ただ、ねる～だけ～ ♪')}, 3000);
        setTimeout(() => { console.log("[" + new Date() + "]:" + '♪ い～えに 帰ったら ただ、ねる～だけ～ ♪')}, 3000);
      } else if (lot < 0.15) {
        msg.send(':microphone: そいや！ そいや！');
        console.log("[" + new Date() + "]:" + ':microphone: そいや！ そいや！');
      } else if (lot < 0.2) {
        msg.send('♪ я だんだんでぃだん ♪ だんだんでぃだん ♪');
        console.log("[" + new Date() + "]:" + '♪ я だんだんでぃだん ♪ だんだんでぃだん ♪');
      } else if (lot < 0.25) {
        setTimeout(() => { msg.send('♪ ぽっぴぽっぴぽ ぽっぴっぽー ♪')}, 0);
        setTimeout(() => { console.log("[" + new Date() + "]:" + '♪ ぽっぴぽっぴぽ ぽっぴっぽー ♪')}, 0);
        setTimeout(() => { msg.send('♪ ぽっぴぽっぴぽ ぽっぴっぽー ♪')}, 2000);
        setTimeout(() => { console.log("[" + new Date() + "]:" + '♪ ぽっぴぽっぴぽ ぽっぴっぽー ♪')}, 2000);
        setTimeout(() => { msg.send('♪ やーさーいーじゅうすが 好－きにーなるぅ～ ♪')}, 4000);
        setTimeout(() => { console.log("[" + new Date() + "]:" + '♪ やーさーいーじゅうすが 好－きにーなるぅ～ ♪')}, 4000);
      } else if (lot < 0.3) {
        msg.send(':musical_score:ﾌﾝﾌﾌﾌｰﾝ ♪ ﾌﾌﾝがﾌｰﾝ :notes:');
        console.log("[" + new Date() + "]:" + ':musical_score:ﾌﾝﾌﾌﾌｰﾝ ♪ ﾌﾌﾝがﾌｰﾝ :notes:');
      } else if (lot < 0.35) {
        msg.send('やぁーだっ♪');
        console.log("[" + new Date() + "]:" + 'やぁーだっ♪');
      } else if (lot < 0.4) {
        msg.send('インストールなう■■■■□□□□□□');
        console.log("[" + new Date() + "]:" + 'インストールなう■■■■□□□□□□');
        msg.send('ちょっと待ってね♪');
        console.log("[" + new Date() + "]:" + 'ちょっと待ってね♪');
      } else if (lot < 0.45) {
        msg.send('♪ 夢なぁ～らば、ど～れ～ほど、よかったでしょう～ ♪');
        console.log("[" + new Date() + "]:" + '♪ 夢なぁ～らば、ど～れ～ほど、よかったでしょう～ ♪');
        msg.send('♪ ﾌﾌﾌﾝ ﾌﾌﾌﾝ ﾌﾌﾌ-ﾝ ﾌﾌﾝ ♪');
        console.log("[" + new Date() + "]:" + '♪ ﾌﾌﾌﾝ ﾌﾌﾌﾝ ﾌﾌﾌ-ﾝ ﾌﾌﾝ ♪');
      } else if (lot < 0.5) {
        setTimeout(() => { msg.send('Ah~~見～上～げ～たぁー')}, 0);
        setTimeout(() => { console.log("[" + new Date() + "]:" + 'Ah~~見～上～げ～たぁー')}, 0);
        setTimeout(() => { msg.send('そ～ら～は、あおーくーー')}, 2000);
        setTimeout(() => { console.log("[" + new Date() + "]:" + 'そ～ら～は、あおーくーー')}, 2000);
        setTimeout(() => { msg.send('ほら、ごら～んよ～。僕～ら、なんてちーっぽーけーなもーんさーあ～ぁ～～')}, 4000);
        setTimeout(() => { console.log("[" + new Date() + "]:" + 'ほら、ごら～んよ～。僕～ら、なんてちーっぽーけーなもーんさーあ～ぁ～～')}, 4000);
      } else if (lot < 0.55) {
        msg.send('ぬーすんだバイクで走りだす～。行き先も、わからぬまま～。');
        console.log("[" + new Date() + "]:" + 'ぬーすんだバイクで走りだす～。行き先も、わからぬまま～。');
      } else if (lot < 0.6) {
        msg.send('あー、あー。マイクテス。マイクテス。');
        console.log("[" + new Date() + "]:" + 'あー、あー。マイクテス。マイクテス。');
      } else if (lot < 0.65) {
        setTimeout(() => { msg.send('この両手～か～ら～、零れそうなほど ♪')}, 0);
        setTimeout(() => { console.log("[" + new Date() + "]:" + 'この両手～か～ら～、零れそうなほど ♪')}, 0);
        setTimeout(() => { msg.send('君に貰った愛は どこに捨てよう？')}, 2000);
        setTimeout(() => { console.log("[" + new Date() + "]:" + '君に貰った愛は どこに捨てよう？')}, 2000);
        setTimeout(() => { msg.send('限りのある消耗品、なんて僕は要らないよ～ ♪')}, 4000);
        setTimeout(() => { console.log("[" + new Date() + "]:" + '限りのある消耗品、なんて僕は要らないよ～ ♪')}, 4000);
      } else if (lot < 0.7) {
        setTimeout(() => { msg.send('越え～て～　越え～て～　越え～て～')}, 0);
        setTimeout(() => { console.log("[" + new Date() + "]:" + '越え～て～　越え～て～　越え～て～')}, 0);
        setTimeout(() => { msg.send('流した～涙ぁは～いつしか～♪')}, 2000);
        setTimeout(() => { console.log("[" + new Date() + "]:" + '流した～涙ぁは～いつしか～♪')}, 2000);
        setTimeout(() => { msg.send('一筋の～、光に～、変わる～ ♪')}, 4000);
        setTimeout(() => { console.log("[" + new Date() + "]:" + '一筋の～、光に～、変わる～ ♪')}, 4000);
      } else if (lot < 0.75) {
        setTimeout(() => { msg.send('そう、カウント1.2.3 :musical_score:')}, 0);
        setTimeout(() => { console.log("[" + new Date() + "]:" + 'そう、カウント1.2.3 :musical_score:')}, 0);
        setTimeout(() => { msg.send('残された日々を、数えてた僕ら～ ♪')}, 2000);
        setTimeout(() => { console.log("[" + new Date() + "]:" + '残された日々を、数えてた僕ら～ ♪')}, 2000);
      } else if (lot < 0.8) {
        setTimeout(() => { msg.send(':musical_score: THE TREMBLING FEAR IS MORE THAN I CAN TAKE :musical_score:')}, 0);
        setTimeout(() => { console.log("[" + new Date() + "]:" + ':musical_score: THE TREMBLING FEAR IS MORE THAN I CAN TAKE :musical_score:')}, 0);
        setTimeout(() => { msg.send('♪ WHEN I\'M UP AGAINST THE ECHO IN THE MIRROR~ ♪')}, 2000);
        setTimeout(() => { console.log("[" + new Date() + "]:" + '♪ WHEN I\'M UP AGAINST THE ECHO IN THE MIRROR~ ♪')}, 2000);
      } else if (lot < 0.85) {
        setTimeout(() => { msg.send('簡単な感情ばっか、数えていたらぁ♪')}, 0);
        setTimeout(() => { console.log("[" + new Date() + "]:" + '簡単な感情ばっか、数えていたらぁ♪')}, 0);
        setTimeout(() => { msg.send('あなたがくれた体温まで、忘れてしまった♪')}, 2000);
        setTimeout(() => { console.log("[" + new Date() + "]:" + 'あなたがくれた体温まで、忘れてしまった♪')}, 2000);
        setTimeout(() => { msg.send('バイバイもう永遠に会えないね ♪')}, 4000);
        setTimeout(() => { console.log("[" + new Date() + "]:" + 'バイバイもう永遠に会えないね ♪')}, 4000);
      } else if (lot < 0.9) {
        setTimeout(() => { msg.send('ダ・ダ・ダ・ダ　ダメ天使は\nダ・ダ・ダ・ダ　ダメですか？')}, 0);
        setTimeout(() => { console.log("[" + new Date() + "]:" + 'ダ・ダ・ダ・ダ　ダメ天使は\nダ・ダ・ダ・ダ　ダメですか？')}, 0);
        setTimeout(() => { msg.send('だ・け・ど・も　あたしはいいかい？\nやんないんじゃない、できないんだ！')}, 2000);
        setTimeout(() => { console.log("[" + new Date() + "]:" + 'だ・け・ど・も　あたしはいいかい？\nやんないんじゃない、できないんだ！')}, 2000);
        setTimeout(() => { msg.send('♪ (ドヤッ！) ♪')}, 4000);
        setTimeout(() => { console.log("[" + new Date() + "]:" + '♪ (ドヤッ！) ♪')}, 4000);
      }
    } else {
      bug(msg);
    }
  });

  // 日時を聞くと返す：たまにバグる(bug関数とは別件)
  robot.hear(/((いま|今|今日|きょう)\s*)+(何時|なんじ|何日|何にち|なん日|なんにち)/i, (msg) => {
    let lot = Math.random();
    if (lot < 0.95) {
      msg.send(moment(new Date()).tz('Asia/Tokyo').format('現在日時は YYYY年 MM月 DD日 HH時 mm分 だよ。'));
      console.log("[" + new Date() + "]:" + moment(new Date()).tz('Asia/Tokyo').format('現在日時は YYYY年 MM月 DD日 HH時 mm分 だよ。'));
    } else {
      let randomYear = Math.floor(Math.random() * (2999-1) + 1);
      let randomMonth = Math.floor(Math.random() * (12-1) + 1);
      let randomDay = Math.floor(Math.random() * (31-1) + 1);
      let randomhour = Math.floor(Math.random() * 23);
      let randomMinute = Math.floor(Math.random() * 59);
      msg.send('現在日時は ' + randomYear + '年 ' + randomMonth + '月 '　+ randomDay + '日 ' + randomhour + '時 ' + randomMinute + '分 だよ。');
      console.log("[" + new Date() + "]:" + '現在日時は ' + randomYear + '年 ' + randomMonth + '月 '　+ randomDay + '日 ' + randomhour + '時 ' + randomMinute + '分 だよ。');
    }
  });

  // TRPGのダイスを振る
  // ダイスの数は100まで 面は10000まで それ以上の時は「多すぎるよ」と返す
  robot.hear(/[0-9]d[0-9]/i, (msg) => {
    //  左がダイスの個数、[d|D]がダイスコール、右がダイスの面
    var dice = msg.message.text.split(/[d|D]/); // [0]ダイスの数 [1]ダイスの面
    var result = [];  // 結果を入れる配列
    if (parseInt(dice[0]) > 100) {
      console.log("ダイスの数が多すぎるよ。");
      msg.send("ダイスの数が多すぎるよ。");
    } else if (parseInt(dice[1]) > 10000) {
      console.log("ダイスの面が多すぎるよ。");
      msg.send("ダイスの面が多すぎるよ。");
    } else {
      for (let i = 1; i <= dice[0]; i++) {
        result[i - 1] = Math.floor(Math.random() * (parseInt(dice[1])));
        // 小数点以下切り捨て(0～dice[1] - 1)までの数値を吐き出す
      }
      console.log("[" + new Date() + "]:" + result);  // ログに結果を表示
      msg.send(result.toString());  // 結果を送信
      }
  });

  // 2進数を変換する
  robot.hear(/bin[0-9]/i, (msg) => {
    var num = msg.message.text.split(/bin/i);
    var decNum = parseInt(num[1], 2);    // 10進数に変換
    if (/[^0-1]/.test(num[1])) {
      console.log("[" + new Date() + "]:" + "数値が間違ってるよ。");
      msg.send("数値が間違ってるよ。");
    } else {
      console.log("[" + new Date() + "]:" + 
                  "『2進数』" + decNum.toString(2) + "\n" +
                  "【8進数】" + decNum.toString(8) + "\n" +
                  "【10進数】" + decNum + "\n" +
                  "【16進数】" + decNum.toString(16));
      msg.send("『2進数』" + decNum.toString(2) + "\n" +
                "【8進数】" + decNum.toString(8) + "\n" +
                "【10進数】" + decNum + "\n" +
                "【16進数】" + decNum.toString(16));
    }
  });

  // 8進数を変換する
  robot.hear(/oct[0-9]/i, (msg) => {
    var num = msg.message.text.split(/oct/i);
    var decNum = parseInt(num[1], 8);
    if (/[^0-9]/.test(num[1])) {
      console.log("[" + new Date() + "]:" + "数値が間違ってるよ。");
      msg.send("数値が間違ってるよ。");
    } else {
      console.log("[" + new Date() + "]:" + 
                  "『8進数』" + decNum.toString(8) + "\n" +
                  "【2進数】" + decNum.toString(2) + "\n" +
                  "【10進数】" + decNum + "\n" +
                  "【16進数】" + decNum.toString(16));
      msg.send("『8進数』" + decNum.toString(8) + "\n" +
                "【2進数】" + decNum.toString(2) + "\n" +
                "【10進数】" + decNum + "\n" +
                "【16進数】" + decNum.toString(16));
    }
  });

  // 10進数を変換する
  robot.hear(/dec[0-9]/i, (msg) => {
    var num = msg.message.text.split(/dec/i);
    var decNum = parseInt(num[1]);
    if (/[^0-9]/.test(num[1])) {
      console.log("[" + new Date() + "]:" + "数値が間違ってるよ。");
      msg.send("数値が間違ってるよ。");
    } else {
      console.log("[" + new Date() + "]:" + 
                  "『10進数』" + decNum + "\n" +
                  "【2進数】" + decNum.toString(2) + "\n" +
                  "【8進数】" + decNum.toString(8) + "\n" +
                  "【16進数】" + decNum.toString(16));
      msg.send("『10進数』" + decNum + "\n" +
                "【2進数】" + decNum.toString(2) + "\n" +
                "【8進数】" + decNum.toString(8) + "\n" +
                "【16進数】" + decNum.toString(16));
    }
  });
  
  // 16進数を変換する
  robot.hear(/hex[0-9a-z]/i, (msg) => {
    var num = msg.message.text.split(/hex/i);
    var decNum = parseInt(num[1], 16);
    if (/[^0-9a-f]/i.test(num[1])) {
      console.log("[" + new Date() + "]:" + "数値が間違ってるよ。");
      msg.send("数値が間違ってるよ。");
    } else {
      console.log("[" + new Date() + "]:" + 
                  "『16進数』" + decNum.toString(16) + "\n" +
                  "【2進数】" + decNum.toString(2) + "\n" +
                  "【8進数】" + decNum.toString(8) + "\n" +
                  "【10進数】" + decNum);
      msg.send("『16進数』" + decNum.toString(16) + "\n" +
                "【2進数】" + decNum.toString(2) + "\n" +
                "【8進数】" + decNum.toString(8) + "\n" +
                "【10進数】" + decNum);
    }
  });

};