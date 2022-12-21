const isUsername = (username) => {
    let arr = username.split(" ");
    if (arr.length > 1) {
        return false;
    }
    for(let i = 0; i < username.length; i++) {
        let charCode = username.charCodeAt(i);
        if (charCode < 48 || (charCode >59 && charCode < 65) || (charCode > 90 && charCode < 97) || charCode > 122) {
            return false;
        }
        return true;
    }
}

export {
    isUsername
}