/* if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}; */

let button = document.getElementById("notifications");
button.addEventListener('click', function(e) {
    Notification.requestPermission().then(function(result) {
        if(result === 'granted') {
            var options = {
                body: 'This is a sample notification',
                icon: 'twit.jpg'
            }
            var notif = new Notification('Tweet App', options);
        }
    });
});