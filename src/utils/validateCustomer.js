function isEmail(email) {
    let arr = email.split("@");
    //console.log(arr);
    if (arr.length !== 2 || arr[0].length < 1) {
        return false;
    }
    let arr2 = arr[1].split(".");
    if (arr2.length !== 2) {
        return false;
    } else if (arr2[0] !== "gmail" || arr2[1] !== "com") {
        return false;
    }
    return true;
}
function checkDob(dob) {
    let arr = dob.split("/");

    if (arr.length !== 3) {
        return false;
    }

    if (isNaN(arr[0]) || isNaN(arr[1]) || isNaN(arr[2])) {
        return false;
    }
    arr[0] = parseInt(arr[0]);
    arr[1] = parseInt(arr[1]);
    arr[2] = parseInt(arr[2]);
    console.log(arr);

    if (arr[0] < 1 || arr[0] > 31) { 
        return false;
    }
    if (arr[1] < 1 || arr[1] > 12) {
        return false;
    }
    let date = new Date();
    if (arr[2] > date.getFullYear() || arr[2] < 1920) {
        return false;
    } else if (arr[2] === date.getFullYear() && arr[1] > date.getMonth() + 1) {
        return false;
    } else if (arr[2] === date.getFullYear() && arr[1] === date.getMonth() + 1 && arr[0] > date.getDate()) {
        return false;
    }
    if (arr[1] === 1 || arr[1] === 3 || arr[1] === 5 || arr[1] === 7 || arr[1] === 8 || arr[1] === 10 || arr[1] === 12) {
        if (arr[0] > 31) {
            return false;
        }
    }
    if (arr[1] === 4 || arr[1] === 6 || arr[1] === 9 || arr[1] === 11) {
        if (arr[0] > 30) {
            return false;
        }
    }
    if (arr[1] === 2) {
        if (arr[2] % 4 === 0 || arr[2] % 400 === 0) {
            if (arr[0] > 29) {
                return false;
            }
        } else if (arr[0] > 28) {
            return false;
        }
    }
    
    return true;
}
export {
    isEmail,
    checkDob
}