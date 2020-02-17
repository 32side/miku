'use strict';
const moment = require('moment-timezone');
let lot;  // 確率代入用 (Math.random()/(０以上１未満の値))

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
    `${contentA}`,
    `${contentB}`
  ];
  msg.send(msg.random(messages));
  msg.send(msg.random(messages));
};

module.exports = (robot) => {

  // 名前を呼ばれた時
  robot.hear(/((m\s*)(i\s*)(k\s*)(u))|([みミﾐ])(?=([いぃイィｲｨーｰ\s]*)(?=[くクｸ]))/i, (msg) => {
    lot = Math.random();
    if (lot < 0.9) {
      const messages = [
        'うふふっ♪',
        'はーいっ。初音ミクだよー！',
        'ﾐｯｸﾐｸにしてあげるっ！',
        'うほほうほーい。',
        'こんにちわ～っ。',
        'ハイっ！私です。\nご用があればなんなりとお申しつけくださぁ～い♪',
        '（ﾁｯ…うるせェな…）',
        'あっ、ハイ！',
        '呼びましたか。マスター。',
        'なになに～',
        'やほやっほヽ(*^▽^*)/',
        'ハロハロ( *´艸｀)',
        '（ネギは邪道）',
        'Yeah!! What do you sing?'
      ];
      //const reply = messages[Math.floor(Math.random() * messages.length)];
      msg.send(msg.random(messages));
    } else {
      bug(msg);
    }
  });

  // 「何か歌って」と言われた時
  robot.hear(/((なにか|何か|なんか)\s*)+(歌って|うたって)/i, (msg) => {
    lot = Math.random();
    if (lot < 0.9) {
      lot = Math.random();
      if (lot < 0.125) {
        msg.send('♪ｽﾞｲ (ง˘ω˘)วｽﾞｲ♪');
      } else if (lot < 0.25) {
        setTimeout(() => { msg.send('♪ いっしょー けんめぇ～い は～た～らい～てぇ ♪')}, 0);
        setTimeout(() => { msg.send('♪ い～えに 帰ったら ただ、ねる～だけ～ ♪')}, 3000);
      } else if (lot < 0.375) {
        msg.send(':microphone: そいや！ そいや！');
      } else if (lot < 0.5) {
        msg.send('♪ я だんだんでぃだん ♪ だんだんでぃだん ♪');
      } else if (lot < 0.625) {
        setTimeout(() => { msg.send('♪ ぽっぴぽっぴぽ ぽっぴっぽー ♪')}, 0);
        setTimeout(() => { msg.send('♪ ぽっぴぽっぴぽ ぽっぴっぽー ♪')}, 2000);
        setTimeout(() => { msg.send('♪ やーさーいーじゅうすが 好－きにーなるぅ～ ♪')}, 4000);
      } else if (lot < 0.75) {
        msg.send(':musical_score:ﾌﾝﾌﾌﾌｰﾝ ♪ ﾌﾌﾝがﾌｰﾝ :notes:');
      } else if (lot < 0.875) {
        msg.send('やぁーだっ♪');
      } else {
        msg.send('インストールなう■■■■□□□□□□');
        msg.send('ちょっと待ってね♪');
      }
    } else {
      bug(msg);
    }
  });

  // 日時を聞くと返す：たまにバグる(bug関数とは別件)
  robot.hear(/((いま|今|今日|きょう)\s*)+(何時|なんじ|何日|何にち|なん日|なんにち)/i, (msg) => {
    lot = Math.random();
    if (lot < 0.9) {
      msg.send(moment(new Date()).tz('Asia/Tokyo')
               .format('現在日時は YYYY年 MM月 DD日 HH時 mm分 だよ。'));
    } else {
      let randomYear = Math.floor(Math.random() * (2999-1) + 1);
      let randomMonth = Math.floor(Math.random() * (12-1) + 1);
      let randomDay = Math.floor(Math.random() * (31-1) + 1);
      let randomhour = Math.floor(Math.random() * 23);
      let randomMinute = Math.floor(Math.random() * 59);
      msg.send('現在日時は ' + randomYear + '年 ' +
             randomMonth + '月 '　+ randomDay + '日 ' + 
             randomhour + '時 ' + randomMinute + '分 だよ。');
    }
  });

};