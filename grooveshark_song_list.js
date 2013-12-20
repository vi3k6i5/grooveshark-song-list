(function () {
    var u = {}, 
        songs = [], 
        scrolled = 0, 
        songList = [], 
        checkCount = 0, 
        previousSongCount = 0,
        scrollPos = 0,
    addToSongs = function(title, artist, album){
    	var id = title + artist + album;
        if(!u[id]){
        	var song = {"title": title,
        				"artist": artist,
        				"album": album}
        	songs.push(song);
        	u[id] = 1;
        }
    },

    displaySongs = function() {
    	for (var i = 0; i < songs.length; i++) {
    	    var obj = songs[i];
    	    songList.push(JSON.stringify(songs[i]));
    	}
    	console.log('{"Songs":[' + songList + ']}');
    };

    scrollPos = $("#page-wrapper").scrollTop();//copy page scrolltop in the beginning
    $("#page-wrapper").scrollTop(0);//move page to top in the beginning

    $("#page-wrapper").scroll(function(){
    	$(".title-container").each(function () {
            var title = $(this).children("span").text();
            var artist = $(this).parent().children(".meta-inner").children(".artist").text();
            var album = $(this).parent().children(".meta-inner").children(".artist").text();
            addToSongs(title, artist, album);
        });
    });    

    _scrolldelay = setInterval( function() {
    	scrolled = scrolled + 300;
    	$("#page-wrapper").scrollTop(scrolled);

        if(songs.length > previousSongCount) {
            previousSongCount = songs.length;
            checkCount = 0;
        }
        else if(songs.length === previousSongCount && checkCount < 3) {
            checkCount++;
        }
        else if(checkCount >= 3){
            clearInterval(_scrolldelay);
            $("#page-wrapper").scrollTop(scrollPos);
            displaySongs();
        }
    },1000);

}());
