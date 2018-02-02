let linebot = require('linebot');
let ct = require('common-tags');
let moment = require('moment');
let schedule = require('node-schedule');
const config = require("./config.json");
// let http = require('http');

let bot = linebot({
	channelId: config.lineChannelId,
	channelSecret: config.lineChannelSecret,
	channelAccessToken: config.lineChannelAccessToken
});

let normal = false;

bot.on('join', event => {
	event.reply('全體通通有，樓上集合！');
})

bot.on('message', event => {
	let sender = event.source.userId;
	if (event.message.type != "text")
		return;
	let m = event.message.text;

	if (m.startsWith("!")) {
		console.log(`CMD: ${m} from ${sender}`)
		const cmd = m.split(' -');
		switch (cmd[0]) {
			case '!help':
				event.reply(ct.stripIndent `
				學長模擬器 v1.180202.01
				================================
				!help 					顯示指令清單
				!cheng 					激勵語錄
				!call -t hh mm ss		鬧鈴功能
				`);
				break;
			case '!cheng':
				event.reply('我們要打一個團體戰！');
				break;
			case '!ping':
				event.reply('你的連線很正常。');
				break;
			case '!boss':
				if (normal) {
					event.reply('恢復一般模式。')
				} else {
					event.reply('進入老闆模式。')
				}
				normal = !normal;
				break;
			case '!call':
				if (cmd[1] == undefined) {
					event.reply('語法錯誤！語法 !call -t hh mm ss');
					return;
				}
				let t = cmd[1].split(' ');
				let date = moment().set({
					'hour': t[1],
					'minute': t[2],
					'second': t[3]
				});
				schedule.scheduleJob(date.toDate(), () => {
					event.reply(`現在時間 ${(moment().format("YYYY/MM/DD HH:mm:ss"))}，鬧鐘時間到！全體樓上集合！！！`);
				});
				break;
		}
	} else {
		console.log(`MSG: ${m} from ${sender}`)
		if (m.includes('開會') && !normal) {
			const rep = [
				'我有很常叫你們開會嗎？舉個例子！！！',
				'樓上集合！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！',
				'我也不想耽誤你們的時間！',
				'這不是開會！這是教育訓練！'
			]
			event.reply(rep[(Math.floor(Math.random() * rep.length))]);
		}
		if ((m.includes('尾牙') || m.includes('年終')) && !normal) {
			const rep = [
				'你們都跟我算得很精我知道！但是你們為公司付出多少？',
				'最近天氣還不錯？',
				'我平常這麼用心訓練你們！給你們上課還給你們錢！',
				'不要只想著你從公司要多少，要想想你能為公司奉獻多少！',
				'馬雲剛開始創業前幾年都領不到年終的！',
				'你的人生有比錢更重要的事！',
				'把眼界放寬，你會得到更多！',
				'我在幫你翻轉未來！'
			]
			event.reply(rep[(Math.floor(Math.random() * rep.length))]);
		}
		if (m.includes('幾點')) {
			event.reply('現在時間是' + (moment().format("YYYY/MM/DD HH:mm:ss")) + '，你們這麼沒有時間觀念，以後怎麼當主管！');
		}
		if (m.includes('減肥') && !normal) {
			event.reply('你才減肥！你全家都減肥！');
		}
		if (m.includes('吃什麼') && !normal) {
			event.reply('你問我我問誰？');
		}
		if (m.includes('加班') && !normal) {
			event.reply('加班？母湯喔~~~');
		}
		if (m.includes('好累') && !normal) {
			event.reply('這樣就喊累？我們可是史上最強加班公司');
		}
	}

})


// bot.on('message', function(event) {
// 	event.reply(event.message.text).then(function(data) {

// 		// success
// 	}).catch(function(error) {
// 		// error
// 	});
// });

bot.listen('/', 80, () => {
	console.log("SYS: 學長模擬器已啟動。")
});