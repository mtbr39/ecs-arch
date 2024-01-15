export function generateRandomName() {
    // アルファベットの文字列
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';

    // ランダムな文字列を生成する関数
    const generateRandomString = (length: number) => {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        }
        return result;
    };

    // ランダムなアルファベットの文字列を生成
    const randomAlphabet = generateRandomString(Math.floor(Math.random() * 3) + 1);

    // ランダムな数字を生成
    const randomNumber = Math.floor(Math.random() * 100);

    // 識別名を組み立てて返す
    const randomName = randomAlphabet + randomNumber.toString();
    return randomName;
}

export function generateRandomJapaneseLastName() {
    // const kanjiCharacters = "田中山本鈴木佐藤齋藤伊藤加藤高橋吉田斎藤清水井上小林林山口松本渡辺鈴木佐々木木村中村";
    const kanjiCharacters = "田中山本鈴木佐藤齋伊加高吉斎清水井上小辺松渡鈴佐々木村中";
    
    let length;
    const randomProbability = Math.random();
    if (randomProbability < 0.10) {
        length = 1; // 15%の確率で1文字
    } else if (randomProbability < 0.20) {
        length = 3; // 15%の確率で3文字
    } else {
        length = 2; // 70%の確率で2文字
    }

    let lastName = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * kanjiCharacters.length);
        lastName += kanjiCharacters.charAt(randomIndex);
    }

    return lastName;
}