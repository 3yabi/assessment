'use script';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/**
 * 指定した要素の子供を全て消去する
 * @param {*} element 
 */

function removeAllChildren(element) {
    while (element.firstChild) { // 何かタグがある限りループ
            element.removeChild(element.firstChild)
        }
    }

/**
 * 指定した要素に診断結果用のタグを設定する
 * @param {HTMLElement} element HTMLの要素 
 */


function appendAssessmentResult(element, result) {
//result-area に h3 タグで'診断結果'という文字を表示
const h3 = document.createElement("h3"); // h3 タグを作る
h3.innerText = "診断結果" // h3タグに'診断結果'の文字列を設定
element.appendChild(h3); // result-area に h3 変数を設定

// result-area に p タグで"診断結果"という文字を表示
const p = document.createElement("p");
p.innerText = result;
element.appendChild(p);
}

userNameInput.onkeydown = event => {
 if (event.key === 'Enter')
 assessmentButton.onclick()
 };

assessmentButton.onclick = () => {
    let userName = userNameInput.value;
    if(!userName) {
        // 名前の入力がなかったので処理を中断
    return;
    }

    // 診断結果の表示
    removeAllChildren(resultDivided);
    const result = assessment(userName);
    appendAssessmentResult(resultDivided, assessment(userName));

　　// aタグを作って属性を設定する
　　removeAllChildren(tweetDivided);
    const a = document.createElement('a');
    const href = 'https://twitter.com/intent/tweet?button_hashtag='
    +encodeURIComponent('あなたのいいところ')
    +'&ref_src=twsrc%5Etfw';
    a.setAttribute('href', href);
    a.setAttribute('class', 'twitter-hashtag-button');
    a.setAttribute('data-text', 'result');
    a.innerText = 'tweet #あなたのいいところ';

    //aタグをHTMLとして追加する
    tweetDivided.appendChild(a);

    //scriptタグを作る
    const script = document.createElement('script');
    script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    tweetDivided.appendChild(script);
}
/**
 * 診断処理を実行して、指定した要素に結果を表示する。
 * @param {HTML element} element HTMLの要素 
 */


const answers = [
'{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは声です。{userName}の特徴的な声はみんなを引きつけ、心に残ります。',
'{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
'{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
'{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
'{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
'{userName}のいいところは用心深さです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
'{userName}のいいところは見た目です。{userName}の特徴的な声はみんなを引きつけ、心に残ります。',
'{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人が居ます。',
'{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
'{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます',
'{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています',
'{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります',
'{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
'{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
'{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName){
    var userNameNumber = 0;
    // すべての文字を足し算する
    for (let i = 0; i < userName.length; i++) {
        // userName(文字列)を数値に変換(感じだと5桁)
        userNameNumber += userName.charCodeAt(i);
    }
    var userNameNumber = userName.charCodeAt(0);
    // 診断結果の範囲(0~15) に変換
    var answerNumber = userNameNumber % answers.length;
    // 診断結果
    var result = answers[answerNumber];
    return result.replace(/\{userName\}/g, userName);
    //診断結果
}


