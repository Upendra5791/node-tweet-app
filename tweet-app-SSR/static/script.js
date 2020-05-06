/* if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}; */

let button = document.getElementById("notifications");
button.addEventListener('click', function(e) {
    Notification.requestPermission().then(function(result) {
        if(result === 'granted') {
            var options = {
                body: 'This is a sample notification',
                icon: 'images/twit.jpg'
            }
            var notif = new Notification('Tweet App', options);
        }
    });
});

const searchBtn = document.getElementById("search-btn");
if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
        const searchTerm = document.getElementById("search-input").value,
        rederictURL = `/tweet-list?term=${searchTerm}`;
        if (searchTerm.length != 0) {
            window.location = rederictURL;
        }
    })
}
