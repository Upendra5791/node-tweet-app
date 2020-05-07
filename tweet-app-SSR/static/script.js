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

const searchForm = document.getElementById("searchForm");
if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
       e.preventDefault();
       const searchTerm = document.getElementById("search-input").value,
       redirectURL = `/tweet-list?term=${searchTerm}`;
       if (searchTerm.length != 0) {
           window.location = redirectURL;
       }
    })
}
