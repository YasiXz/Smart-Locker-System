
       //navigation bar funtions 
function openTab(evt, tabName) {
    
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("active");
    }

    // Remove the 'active' class from all tab links
    tablinks = document.getElementsByClassName("nav-tabs")[0].getElementsByTagName("a");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active");
    }

    // Show the current tab and add 'active' class to the clicked tab link
    document.getElementById(tabName).style.display = "block";
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}
//telegram msg funtion

// document.getElementById('sendButton').addEventListener('click', function() {
//     var message = document.getElementById('message').value;
//     var encodedMessage = encodeURIComponent(message);
//     var telegramUsername = "RupzXz"; 
//     var telegramLink = "https://t.me/" + telegramUsername + "?text=" + encodedMessage;
//     window.open(telegramLink, '_blank');
// });
