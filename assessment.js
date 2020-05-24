'use strict';   //厳格モードを使う

//htmlで設定したIDを使用して要素の取得をおこなう
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

/* 
    ブロックコメント・・・Shift+Alt+a
 */
function removeAllChildren(element)
{
    console.log('resultDividedエリアの子要素の数：' + resultDivided.childElementCount);
    while(element.firstChild)
    {
        element.removeChild(element.firstChild);
    }
}

//ボタンを押した時に反応する
//無名関数で記述
//assessmentButton.onclick = function()  //トラディショナルな記載方法
assessmentButton.onclick = () =>    //アロー関数での記載方法
{
    const userName = userNameInput.value;
    console.log('ボタン押下');


    //診断結果表示
    //最初にresultDividedの中身をクリアする     

    // while(resultDivided.firstChild) //firstChildが存在する場合（存在しない場合はnullが返ってくる
    // {
    //     resultDivided.removeChild(resultDivided.firstChild);
    //     console.log('resultDividedエリアの子要素の数：' + resultDivided.childElementCount);
    // }
    //上の内容を関数にした
    removeAllChildren(resultDivided);

    if(userName.length === 0) return;
    console.log(userNameInput.value);

    const header = document.createElement('h3');    //headerという'h3'要素を作って
    header.innerText = '結果';                      //内部のテキストを記述して
    resultDivided.appendChild(header);              //resultDivided要素に追加する。

    const paragragh = document.createElement('p');
    const result = assessment(userName);            //ここでresultの文字列を取得
    paragragh.innerText = result;
    resultDivided.appendChild(paragragh);

    //ツイート表示
    //最初に中身クリア
    removeAllChildren(tweetDivided);
    const anchor = document.createElement('a');
    // const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag=あなたのいいところ&ref_src=twsrc%5Etfw';
    const hrefValue = 'https://twitter.com/intent/tweet?button_hashtag='
                      + encodeURIComponent('あなたのいいところ') 
                      + '&ref_src=twsrc%5Etfw';   //全角文字はURIエンコード

    anchor.setAttribute('href', hrefValue);
    anchor.className = 'twitter-hashtag-button';
    // anchor.setAttribute('data-text', '診断結果の文章');
    anchor.setAttribute('data-text', result);
    anchor.innerText = 'Tweet #あなたのいいところ';
    tweetDivided.appendChild(anchor);

    // //widgets.jsの設定
    twttr.widgets.load();
    // const script = document.createElement('script');
    // script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
    // // script.setAttribute = 'Tweet #あなたのいいところ';
    // tweetDivided.appendChild(script);

};

//user-name領域でEnterキーが押されたときにも onclick関数を呼び出す
userNameInput.onkeydown = (event) =>{
    console.log('Keyが押されました。key = '+event.key);

    if(event.key === 'Enter')
    {
        assessmentButton.onclick();
    }
};

//結果の文字列の配列
//{userName}はreplaceにて置き換える
const answers = [
    '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
    '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
    '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
    '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
    '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
    '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
    '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
    '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
    '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
    '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
    '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
    '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
    '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
    '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
    '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
    '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。'
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName)
{
    // userNameの文字コードを足し合わせる
    let sumOfCharCode=0;    //letとconstは{}}の中だけで使用できる・・・勝手に書換えられないので安全
    console.log(userName);
    for(let i=0; i<userName.length; i++)
    {
        sumOfCharCode =+ userName.charCodeAt(i);
        console.log(sumOfCharCode);
    }
    //回答パターンの１６（=answers.length）で割ったあまりを求める
    const index = sumOfCharCode % answers.length;   //letとconstは{}}の中だけで使用できる・・・勝手に書換えられないので安全
    console.log('index = ' + index);
    
    //const result = answers[index];
    //{userNama}を正規表現で置き換える
    /*
        /abc/　 スラッシュ"/"で囲むと正規表現を意味する。/abc/は"abc"を探すということ。
        \{      特殊文字はバックスラッシュで表す。"{"や"}"を正規表現で表す"\{", "\}"とする
    */
    let result = answers[index];
    result = result.replace(/\{userName\}/g, userName);
    // "replace()
    //"{userName}"を正規表現で探し、replaceしている。"g"はグローバルマッチ（大文字小文字を区別）のフラグ。
    //区別しない時は"i"（=ignore）のフラグ。
    return result;
}

// console.log(assessment('太郎'));
// console.log(assessment('一郎太'));
// console.log(assessment('太郎'));


// テストコード
//第一引数：正しい時にtrueとなるテスト式、第二引数：エラー時に出したいメッセージ
console.assert(
    assessment('太郎') === '太郎のいいところはその全てです。ありのままの太郎自身がいいところなのです。',
    '診断結果の文言の特定の部分を名前に置き換える処理が正しくありません。'
);
console.assert(
    assessment('太郎') === assessment('太郎') ,
    '診断結果が一致しません。'
);

