let data = {};

window.onload = function () {
	load_data();
	init();
	generateCards();
}

function load_data(){
	const profile = localStorage.getItem('mirishita_producer_profile');
	if (profile) {
		data = JSON.parse(profile);
	} else {
		data = {};
	}
	

}
function getData(id, element){
	if (!data[id]) return '';
	if (!data[id][element]) return '';
	return data[id][element];
}
function save(id){
	hide(`${id}_input`);
	data[id] = {
		text: document.getElementById(`${id}_text`).value,
		twitter: document.getElementById(`${id}_twitter`).value,
		youtube: document.getElementById(`${id}_youtube`).value,
		img: document.getElementById(`${id}_img`).value,
	};
	console.log(data);
	localStorage.setItem('mirishita_producer_profile', JSON.stringify(data));
	generateCard(id);

}
function hide(id){
	document.getElementById(id).style.display = 'none';
}
//https://www-creators.com/archives/4463
function getParam(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function youtube_img(url){
    if (url.indexOf('www.youtube.com') > -1){
        const v = getParam('v', url);
        return (v ? `http://img.youtube.com/vi/${v}/mqdefault.jpg` : null);
    }
    if (url.indexOf('youtu.be') > -1){
        const match = url.match(/youtu\.be\/([^?]*)/)
        //https://youtu.be/SbDazb8934I?t=112
        return (match[1] ? `http://img.youtube.com/vi/${match[1]}/mqdefault.jpg` : null);
    }
    return '';

}

function generateCard(id){
	let html = '';
	const text = getData(id,'text');
	if (text){
		html += `<p style="font-weight:bold; font-size: large;">${text}</p>`;
	}
	const img = getData(id, 'img');
	if (img){
		html += `
		<p><img src="${img}" style="width: 100%"></p>
		`;
	}
	const twitter = getData(id,'twitter');
	if (twitter){
		html += `
<blockquote class="twitter-tweet">
	<a href="${twitter}">#ミリシタ4コマ 公式ツイート</a>
</blockquote>`;
	}
	const youtube = getData(id, 'youtube');
	if (youtube){
		html += `
<p><a target="_blank" href="${youtube}"><img src="${youtube_img(youtube)}" style="width: 100%;"></a></p>
		`;
	}

	document.getElementById(`${id}_display`).innerHTML = html;
	if (twitter) twttr.widgets.load();
}
function generateCards(){
	for (const key in data){
		generateCard(key);
	}
}
function edit(id){
	show(`${id}_input`);
}
function show(id){
	document.getElementById(id).style.display = 'block';
}
function init(){
	let content = '';
	for (const item of items){

		//参考資料リンクの生成
		let ref_html = '';
		const ref_link = item.ref_link;
		if (ref_link){
			ref_html += `
<div>
	参考：<a target="_blank" href="${ref_link}">${item.ref_title}</a>
</div>
			`;
		}

		content += `
<div class="item col col-12 col-sm-6 col-lg-4 bg-light border border-secondary">
	<h2 class="h5">
		${item.question}
		<span
			style="font-size: small; cursor: pointer;"
			onclick="edit('${item.id}')"
			>
			🖊️
		</span>
	</h2>
	<div id="${item.id}_display" class="q_display"></div>
	<div id="${item.id}_input" class="q_input" style="display:none;">
		<div class="input-group mb-1">
			<span class="input-group-text">テキスト</span>
			<input type="text" class="form-control" id="${item.id}_text" value="${getData(item.id, 'text')}">
		</div>
		<div class="input-group mb-1">
			<span class="input-group-text">画像URL</span>
			<input type="text" class="form-control" id="${item.id}_img" value="${getData(item.id, 'img')}">
		</div>
		<div class="input-group mb-1">
			<span class="input-group-text">Twitter</span>
			<input type="text" class="form-control" id="${item.id}_twitter" value="${getData(item.id, 'twitter')}">
		</div>
		<div class="input-group mb-1">
			<span class="input-group-text">Youtube</span>
			<input type="text" class="form-control" id="${item.id}_youtube" value="${getData(item.id, 'youtube')}">
		</div>
		${ref_html}
		<div class="" style="text-align: right; ">
			<span
				style="font-size: large; cursor: pointer;"
				onclick="save('${item.id}');"
				title="Save"
				>
				✅
			</span>
		</div>
	</div>
</div>
		`;
	}
	const html = `
<div class="container">
	<div class="row">
		${content}
	</div>

</div>
`;
	document.getElementById('contents').innerHTML = html;
}
const raw_data = `q1	プロデューサーネーム		
q2	現在のPLv(プロデューサーレベル)は？		
q3	現在のLP(ライブポイント)は？		
q4	あなたのプレイスタイルは？		
q5	もっとも多く設定している音符スピードは？		
q6	4周年の"4thスペシャルトレーニング"はどのくらい達成した？		
q7	カードをマスターランク5にしているカードの数は？		
q8	いちばんお気に入りのミニゲームは？	公式ツイート	https://twitter.com/search?q=from%3Aimasml_theater%20%E3%83%9F%E3%83%8B%E3%82%B2%E3%83%BC%E3%83%A0
q9	いちばん好きな楽曲は？	Youtube	https://www.youtube.com/results?search_query=%E3%80%8C%E3%82%A2%E3%82%A4%E3%83%89%E3%83%AB%E3%83%9E%E3%82%B9%E3%82%BF%E3%83%BC+%E3%83%9F%E3%83%AA%E3%82%AA%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%96%EF%BC%81+%E3%82%B7%E3%82%A2%E3%82%BF%E3%83%BC%E3%83%87%E3%82%A4%E3%82%BA%E3%80%8D%E3%82%B2%E3%83%BC%E3%83%A0%E5%86%85%E6%A5%BD%E6%9B%B2
q10	いちばんプレイ回数が多い楽曲は？	Youtube	https://www.youtube.com/results?search_query=%E3%80%8C%E3%82%A2%E3%82%A4%E3%83%89%E3%83%AB%E3%83%9E%E3%82%B9%E3%82%BF%E3%83%BC+%E3%83%9F%E3%83%AA%E3%82%AA%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%96%EF%BC%81+%E3%82%B7%E3%82%A2%E3%82%BF%E3%83%BC%E3%83%87%E3%82%A4%E3%82%BA%E3%80%8D%E3%82%B2%E3%83%BC%E3%83%A0%E5%86%85%E6%A5%BD%E6%9B%B2
q11	プレイ感覚が気持ちいい楽曲は？	Youtube	https://www.youtube.com/results?search_query=%E3%80%8C%E3%82%A2%E3%82%A4%E3%83%89%E3%83%AB%E3%83%9E%E3%82%B9%E3%82%BF%E3%83%BC+%E3%83%9F%E3%83%AA%E3%82%AA%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%96%EF%BC%81+%E3%82%B7%E3%82%A2%E3%82%BF%E3%83%BC%E3%83%87%E3%82%A4%E3%82%BA%E3%80%8D%E3%82%B2%E3%83%BC%E3%83%A0%E5%86%85%E6%A5%BD%E6%9B%B2
q12	お気に入りのMVは？	Youtube	https://www.youtube.com/results?search_query=%E3%80%8C%E3%82%A2%E3%82%A4%E3%83%89%E3%83%AB%E3%83%9E%E3%82%B9%E3%82%BF%E3%83%BC+%E3%83%9F%E3%83%AA%E3%82%AA%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%96%EF%BC%81+%E3%82%B7%E3%82%A2%E3%82%BF%E3%83%BC%E3%83%87%E3%82%A4%E3%82%BA%E3%80%8D%E3%82%B2%E3%83%BC%E3%83%A0%E5%86%85%E6%A5%BD%E6%9B%B2
q13	苦戦している楽曲は？	Youtube	https://www.youtube.com/results?search_query=%E3%80%8C%E3%82%A2%E3%82%A4%E3%83%89%E3%83%AB%E3%83%9E%E3%82%B9%E3%82%BF%E3%83%BC+%E3%83%9F%E3%83%AA%E3%82%AA%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%96%EF%BC%81+%E3%82%B7%E3%82%A2%E3%82%BF%E3%83%BC%E3%83%87%E3%82%A4%E3%82%BA%E3%80%8D%E3%82%B2%E3%83%BC%E3%83%A0%E5%86%85%E6%A5%BD%E6%9B%B2
q14	今後「ミリシタ」に実装してほしい楽曲は？	Youtube	https://www.youtube.com/results?search_query=%E3%80%8C%E3%82%A2%E3%82%A4%E3%83%89%E3%83%AB%E3%83%9E%E3%82%B9%E3%82%BF%E3%83%BC+%E3%83%9F%E3%83%AA%E3%82%AA%E3%83%B3%E3%83%A9%E3%82%A4%E3%83%96%EF%BC%81+%E3%82%B7%E3%82%A2%E3%82%BF%E3%83%BC%E3%83%87%E3%82%A4%E3%82%BA%E3%80%8D%E3%82%B2%E3%83%BC%E3%83%A0%E5%86%85%E6%A5%BD%E6%9B%B2
q15	あなたの担当アイドルは？	ミリシタ宣材資料メーカー	https://millionlive-promotion.idolmaster-official.jp/
q16	担当アイドルへのメッセージ		
q17	お気に入りのユニットは？		
q18	"セレブ"なアイドルと言えば？	アイドル紹介	https://millionlive.idolmaster.jp/theaterdays/#idol
q19	"女子力が高い"アイドルと言えば？	アイドル紹介	https://millionlive.idolmaster.jp/theaterdays/#idol
q20	"カッコいい"アイドルと言えば？	アイドル紹介	https://millionlive.idolmaster.jp/theaterdays/#idol
q21	いちばん好きな専用衣装は？	ミリシタ衣装検索（β）	https://submeganep.github.io/costume/
q22	いちばん好きな衣装は？	ミリシタ衣装検索（β）	https://submeganep.github.io/costume/
q23	お気に入りのメインコミュは？	公式ツイート	https://twitter.com/search?q=from%3Aimasml_theater%20%E3%83%A1%E3%82%A4%E3%83%B3%E3%82%B3%E3%83%9F%E3%83%A5&src=typed_query&f=live
q24	お気に入りのアイドルコミュは？		
q25	お気に入りのイベントコミュは？	公式ツイート	https://twitter.com/search?q=from%3Aimasml_theater%20%E3%82%A4%E3%83%99%E3%83%B3%E3%83%88%E9%99%90%E5%AE%9A%E3%82%AB%E3%83%BC%E3%83%89&src=typed_query&f=live
q26	いちばん好きな楽曲ジャケットは？	公式ツイート	https://twitter.com/search?q=from%3Aimasml_theater%20%E6%A5%BD%E6%9B%B2&src=typed_query&f=live
q27	いちばん好きなセカンドヘア―は？	公式ツイート	https://twitter.com/search?q=from%3Aimasml_theater%20%E3%82%BB%E3%82%AB%E3%83%B3%E3%83%89%E3%83%98%E3%82%A2%E3%82%B9%E3%82%BF%E3%82%A4%E3%83%AB%E3%82%AC%E3%82%B7%E3%83%A3
q28	いちばん好きなオフショットは？	ミリシタDB	https://imas.gamedbs.jp/mlth/
q29	いちばん好きな4コマは？	ミリシタ4コマビューア	https://tankarup.github.io/ML-4koma-viewer/4koma.html
q30	お気に入りのホワイトボードイラストは？	ミリシタDB	https://imas.gamedbs.jp/mlth/
q31	今後「ミリシタ」に望むことは？		

`;
const lines = raw_data.split('\n');
let items = [];
for (const line of lines){
	const texts = line.split('\t');
	if (texts.length < 2) continue;
	items.push({
		id: texts[0],
		question: texts[1],
		ref_title: texts[2],
		ref_link: texts[3],
	})
}
/*
const items = [
	{
		id: 'q1',
		question: 'お気に入りのMVは？',
	},
	{
		id: 'q2',
		question: 'いちばん好きな4コマは？',
		additional: '<a href="test.html">hoge</a>',
	}
];
*/
