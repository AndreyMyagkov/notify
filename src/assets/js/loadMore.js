export default function loadMore (res, count=3) {
    const messages = [];

    if (res.length > count) {
        for (let i = 0; i < count; i++) {
            // main - false to main - true
            res[i].main=true
            messages.push(res[i])
        }
        return messages;
    } else {
        for (let i = 0; i <res.length; i++ ) {
            res[i].main=true
            messages.push(res[i])
        }
        return messages;
    }

}