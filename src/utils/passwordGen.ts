export const passwordGen = (len: number, str: String): string => {
    let pass = '';

    for (let index = 0; index <= len; index++) {
        let position = Math.ceil(Math.random() * str.length);
        pass += str.charAt(position);

    }
    return pass.substring(0, len);

}