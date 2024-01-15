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