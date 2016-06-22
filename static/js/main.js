function getCookie(name) {
    var cookieValue = null;

    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }

    return cookieValue;
}

$(document).on('ready', function(){

    var socket = io.connect("localhost", {port: 8002});

    socket.on('message', function(message) {
        var message_json = jQuery.parseJSON(message);

        $('.count').each(function() {
            $this = $(this);
            $this.html("");
            var count_value = $this.data("count");
            
            console.log("cv", count_value);

            count_value = count_value + 1;
            $this.append($("<strong>").text(count_value));
            $this.data("count", count_value);
            console.log("updated cv", count_value);
        });

        $('.count').show();

        var f = document.createDocumentFragment();

        var l = document.createElement('li');
        $(l).attr('class', 'unread');

        $(l).append($("<h3>").text(message_json.actor));
        // $(l).append($("<h3>").text("  "));
        $(l).append($("<h4>").text(message_json.verb));
        $(l).append($("<h4>").text("your"));
        $(l).append($("<h4>").text(message_json.action_object));
        $(l).append($("<p>").text(message_json.timestamp));

        f.appendChild(l);
        $('.notifications-items').prepend(f);

    });

 	$('#arrow').hide();
	$(document).on('click','.notify', function(event){
        // alert("clicked");
        event.stopPropagation();
        $this = $(this);
        $this.addClass('active-bell');
        openNav();
    });

    $(document).on('click','.active-bell', function(event){
        $this = $(this);
        $this.removeClass('active-bell');
        closeNav();
    });

	$(document).not(document.querySelectorAll(".notification-container, .notify")).on('click', function(event){
        console.log("outside notification container clicked");
        $(document).find('.active-bell').removeClass('active-bell');
        closeNav();
        // make_read();
    });

    $('.notification-container').click(function(event){
    	event.stopPropagation();
    });

});

function openNav() {
	$('#count').hide();
	$('#arrow').show();
    document.getElementById("myNav").style.height = "50%";
    $('.count').each(function() {
        $this = $(this);
        $this.html("");
        var count_value = $this.data("count");
        
        console.log("cv in openNav", count_value);

        count_value = 0;
        $this.append($("<strong>").text(count_value));
        $this.data("count", count_value);
        console.log("updated cv in openNav", count_value);
    });
}

function closeNav() {
	document.getElementById("myNav").style.height = "0%";
	setTimeout(
		function(){
    		$('#arrow').hide();
            $('.unread').each(function() {
                $this = $(this);
                $this.removeClass('unread').addClass('read');
            });
		}, 350);
}

function make_read(){
    jQuery('.unread').each(function() {
            $this = $(this);
            $this.removeClass('unread').addClass('read');
        });
}