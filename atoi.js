function atoi(str) {
    const ignore = ' ';
    const signs = '-+';
    let sign;
    const numbers = '0123456789'
    let thisNumber = '';
    let lowest = -(2**31);
    let highest = (2**31) - 1

    console.log("Input string:  ", str)
    for (let i = 0; i < str.length; i++) {
        //console.log("thisNumber:  ", thisNumber)
        if (thisNumber === '' && ignore.includes(str[i])) { continue }
        else if (sign === undefined && signs.includes(str[i])) {
            sign = str[i]
            continue;
        } else if (numbers.includes(str[i])) {
            thisNumber += str[i];
            continue;
        } else { break }
    }
    if (sign && sign == '-' && thisNumber) {
        number = parseInt(thisNumber) * -1;
        //console.log("thisNumber: ", thisNumber, " number: ", number)
        if (number < lowest) { return lowest };
        if (number > highest) { return highest };
        return number;
    } else if (thisNumber) {
        number = parseInt(thisNumber);
        //console.log("thisNumber: ", thisNumber, " number: ", number)
        if (number < lowest) { return lowest };
        if (number > highest) { return highest };
        return number;
    }
    return 0;

}

console.log(atoi("words and 987"), " ==> 0 : no characters were read" );
console.log(atoi("4193 with words"), " ==> 4193");
console.log(atoi("    -42"), " ==> -42");
console.log(atoi("42"), " ==> 42")
console.log(atoi("-91283472332"), " ==> -2147483648")
