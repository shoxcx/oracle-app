const lcu = require('./electron_app/lcu.cjs');

async function test() {
    await lcu.connect();
    const friends = await lcu.getFriends();
    if (friends) {
        if (friends.length > 0) {
            console.log(JSON.stringify(friends[0], null, 2));
        }
    }
    process.exit(0);
}
test();
