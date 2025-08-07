var play_song = 'initial';
var lamhaa_progress_timer = setInterval(function() {
    lamhaa_progress();
}, 25);
var prev_progress_status = '';
var prev_url_status = '';

function lamhaa_progress() {
    var progress = document.getElementsByTagName('yt-page-navigation-progress');
    if (progress.length > 0) {
        if (progress[0].hidden == false) {
            if (prev_progress_status != 'show') {
                prev_progress_status = 'show';
                Lamhaa.show_progress('show', 'no_url');
            }
        } else {
            if (prev_progress_status != 'hide' || prev_url_status != location.href) {
                prev_progress_status = 'hide';
                prev_url_status = location.href;
                var page_url = location.href;
                Lamhaa.show_progress('hide', page_url);
                if (play_song != 'initial' && play_song != page_url) {
                    Lamhaa.show_player(play_song);
                    play_song = 'initial';
                }
            }
        }
    } else {
        if (prev_progress_status != 'show') {
            prev_progress_status = 'show';
            Lamhaa.show_progress('show', 'no_url');
        }
    }
}

function open_menu(pos) {
    var big_menu = document.getElementsByTagName('tp-yt-app-drawer');
    if (big_menu.length > 0) {
        var small_menu = big_menu[0].getElementsByTagName('ytmusic-guide-entry-renderer');
        small_menu[pos].click();
    }
}

function scroll_to_end() {
    window.scrollTo(0, document.body.scrollHeight);
}

function go_to_back(type) {
    Lamhaa.show_msg('back');
    play_song = type;
    history.back();
    if (type == 'initial') {
        Lamhaa.remove_history_main();
    }
}

function open_search_status(search_view) {
    var search_box = document.getElementsByTagName('ytmusic-search-box');
    if (search_view == true) {
        if (search_box[0].opened == false) {
            search_box[0].getElementsByClassName('search-button')[0].click();
        }
    } else {
        if (search_box[0].opened == true) {
            search_box[0].getElementsByClassName('search-button')[0].click();
        }
    }
}
var open_status = 'hide';
var auto_com_timer = setInterval(function() {
    auto_com_shower();
}, 250);

function auto_com_shower() {
    var search_box = document.getElementsByTagName('ytmusic-search-box');
    if (search_box.length > 0) {
        if (search_box[0].opened == true) {
            if (open_status == 'hide') {
                open_status = 'show';
                Lamhaa.show_auto_com('show');
            }
        } else {
            if (open_status == 'show') {
                open_status = 'hide';
                Lamhaa.show_auto_com('hide');
            }
        }
    }
}
var search_data_timer = setInterval(function() {
    search_data_shower();
}, 250);

function search_data_shower() {
    var search_box = document.getElementById('suggestion-list');
    if (search_box != null) {
        clearInterval(search_data_timer);
        var observer = new MutationObserver(() => {
            Lamhaa.show_search_data(search_box.innerHTML);
        });
        observer.observe(search_box, {
            subtree: true,
            childList: true
        });
    }
}

function search_lamhaa(query) {
    Lamhaa.show_msg(query);
    var search_box = document.getElementsByTagName('ytmusic-search-box');
    if (search_box.length > 0 && search_box[0].getElementsByTagName('input').length > 0) {
        var event = new Event('input', {
            'bubbles': true,
            'cancelable': true
        });
        search_box[0].getElementsByTagName('input')[0].value = query;
        search_box[0].getElementsByTagName('input')[0].dispatchEvent(event);
    }
}

function full_search(type, pos, query) {
    var search_box = document.getElementsByTagName('ytmusic-search-box');
    if (search_box.length > 0 && search_box[0].getElementsByTagName('input').length > 0) {
        if (type == 'text') {
            Lamhaa.show_msg(search_box[0].getElementsByTagName('ytmusic-search-suggestion')[pos].innerText);
            search_box[0].getElementsByTagName('ytmusic-search-suggestion')[pos].click();
        } else if (type == 'full_song') {
            var full_songs = search_box[0].getElementsByTagName('ytmusic-responsive-list-item-renderer');
            full_songs[pos].getElementsByTagName('a')[0].click();
        } else {
            var kbEvent = new KeyboardEvent('keypress', {
                bubbles: true,
                cancelable: true,
                key: 'Enter',
            });
            search_box[0].getElementsByTagName('input')[0].value = query;
            search_box[0].click();
            search_box[0].dispatchEvent(kbEvent);
        }
    }
}

function remove_history(pos) {
    var search_box = document.getElementsByTagName('ytmusic-search-box');
    var text_lists = search_box[0].getElementsByTagName('ytmusic-search-suggestion');
    text_lists[pos].getElementsByTagName('yt-icon-button')[0].click()
}

function closer(url) {
    go_to_back(url);
}

function radio_play_search() {
    var card_header = document.getElementsByTagName('ytmusic-card-shelf-renderer');
    if (card_header.length > 0) {
        var buttons = document.getElementsByTagName('ytmusic-card-shelf-renderer')[0].getElementsByTagName('button');
        if (buttons.length > 0) {
            for (var rs = 0; rs < buttons.length; rs++) {
                if (buttons[rs].innerText.toLowerCase().indexOf('radio') != -1) {
                    buttons[rs].click();
                }
            }
        }
    }
}

function shuffle_play_search() {
    var card_header = document.getElementsByTagName('ytmusic-card-shelf-renderer');
    if (card_header.length > 0) {
        var buttons = document.getElementsByTagName('ytmusic-card-shelf-renderer')[0].getElementsByTagName('button');
        if (buttons.length > 0) {
            for (var rs = 0; rs < buttons.length; rs++) {
                if (buttons[rs].innerText.toLowerCase().indexOf('shuffle') != -1) {
                    buttons[rs].click();
                }
            }
        }
    }
}

function play_play_search() {
    var card_header = document.getElementsByTagName('ytmusic-card-shelf-renderer');
    if (card_header.length > 0) {
        var buttons = document.getElementsByTagName('ytmusic-card-shelf-renderer')[0].getElementsByTagName('button');
        if (buttons.length > 0) {
            for (var rs = 0; rs < buttons.length; rs++) {
                if (buttons[rs].innerText.toLowerCase().indexOf('play') != -1) {
                    buttons[rs].click();
                }
            }
        }
    }
}

function lamhaa_clicker(container, container_position, data_type, data_position, type) {
    var browse_page = document.getElementsByTagName('ytmusic-browse-response');
    if (type == 'search') {
        browse_page = document.getElementsByTagName('ytmusic-search-page');
    }
    if (browse_page.length > 0) {
        var section = browse_page[0].getElementsByTagName(container);
        if (section.length > container_position) {
            if (data_type.indexOf('button') == -1 && data_type.indexOf('chip') == -1) {
                section[container_position].getElementsByTagName(data_type)[data_position].getElementsByTagName('a')[0].click();
            } else {
                section[container_position].getElementsByTagName(data_type)[data_position].click();
            }
        } else {
            Lamhaa.show_snack_from_web('Failed to Play :(');
        }
    } else {
        Lamhaa.show_snack_from_web('Failed to Play :(');
    }
}

function lamhaa_more_clicker(container, container_position, type) {
    var browse_page = document.getElementsByTagName('ytmusic-browse-response');
    if (type == 'search' || type == 'top_search') {
        browse_page = document.getElementsByTagName('ytmusic-search-page');
    }
    if (browse_page.length > 0) {
        var section = browse_page[0].getElementsByTagName(container);
        if (section.length > container_position) {
            if (type != 'search' || type == 'top_search') {
                section[container_position].getElementsByTagName('a')[0].click();
            } else {
                var urls_all = section[container_position].getElementsByTagName('a');
                for (var url_count = 0; url_count < urls_all.length; url_count++) {
                    if (urls_all[url_count].href.indexOf('/search') != -1) {
                        urls_all[url_count].click();
                    }
                }
            }
        } else {
            Lamhaa.show_snack_from_web('Failed to Play :(');
        }
    } else {
        Lamhaa.show_snack_from_web('Failed to Play :(');
    }
}

function shuffle_play_artist() {
    document.getElementById('header').getElementsByTagName('button')[0].click();
}

function radio_play_artist() {
    document.getElementById('header').getElementsByTagName('button')[1].click();
}

function radio_play_playlist() {
    buttons_shower('radio');
}

function shuffle_play_playlist() {
    buttons_shower('shuffle');
}

function play_play_playlist() {
    buttons_shower('play');
}

function buttons_shower(mode) {
    var buttons = document.getElementById('header');
    if (buttons != null && buttons.getElementsByTagName('button').length > 0) {
        buttons = buttons.getElementsByTagName('button');
        for (var s = 0; s < buttons.length; s++) {
            if (buttons[s].ariaLabel != null && buttons[s].innerText.toLowerCase().indexOf('shuffle') != -1) {
                if (mode == 'shuffle') {
                    buttons[s].click();
                }
            }
            if (buttons[s].ariaLabel != null && buttons[s].innerText.toLowerCase().indexOf('radio') != -1) {
                if (mode == 'radio') {
                    buttons[s].click();
                }
            }
            if (buttons[s].ariaLabel != null && buttons[s].innerText.toLowerCase().indexOf('play') != -1) {
                if (mode == 'play') {
                    buttons[s].click();
                }
            }
            if (buttons[s].ariaLabel != null && buttons[s].ariaLabel.toLowerCase().indexOf('action menu') != -1) {
                buttons[s].click();
                setTimeout(function() {
                    show_buttons(buttons[s], mode);
                }, 520);
            }
        }
    }
}

function show_buttons(buttons, mode) {
    var container = document.getElementsByTagName('ytmusic-menu-navigation-item-renderer');
    if (container.length > 0) {
        for (var s = 0; s < container.length; s++) {
            if (container[s].innerText.toLowerCase().indexOf('shuffle play') != -1) {
                if (mode == 'shuffle') {
                    container[s].getElementsByTagName('a')[0].click();
                }
            }
            if (container[s].innerText.toLowerCase().indexOf('start radio') != -1) {
                if (mode == 'radio') {
                    container[s].getElementsByTagName('a')[0].click();
                }
            }
        }
    } else {}
}
var data_holder;
var data_json;
var refresh_count;
var loaded_count;
var next_count;
var refresh_timeout;

function get_data(data_type, data_counts, load_more) {
    if (load_more == true) {
        scroll_to_end();
    }
    refresh_count = 0;
    loaded_count = 0;
    next_count = 0;
    if (load_more == false) {
        Lamhaa.update_data_count(0, 0);
        Lamhaa.update_data_count(1, 0);
        Lamhaa.update_data_count(2, 0);
        Lamhaa.update_data_count(3, 0);
        Lamhaa.update_data_count(4, 0);
        Lamhaa.update_data_count(5, 0);
        Lamhaa.update_data_count(6, 0);
    }
    if (refresh_timeout != null) {
        clearTimeout(refresh_timeout);
    }
    get_lamhaa_json_data(data_type, data_counts, load_more);
}

var copyrighted_songs = ["k4yXQkG2s1E","UCFFbwnve3yF62-tVXkTyHqg"];

function get_lamhaa_json_data(data_type, data_counts, load_more) {
    data_holder = document.getElementsByTagName('ytmusic-browse-response');
    if (data_type == 'search') {
        data_holder = document.getElementsByTagName('ytmusic-search-page');
    }
    if (data_holder.length > 0) {
        data_json = {
            header: {},
            contents: [],
            next: false
        };
        if (load_more == false) {
            if (data_type == 'home' || data_type == 'search' || data_type == 'library') {
                var header_content = data_holder[0].getElementsByTagName("ytmusic-chip-cloud-renderer");
                if (header_content.length > 0) {
                    var header = header_content[0].getElementsByTagName("ytmusic-chip-cloud-chip-renderer");
                    if (header.length > 0) {
                        data_json.header.categories = [];
                        for (var ss = 0; ss < header.length; ss++) {
                            var button_text = header[ss].innerText;
                            if (button_text.length == 0) {
                                button_text = header[ss].getElementsByTagName('a').length > 0 ? header[ss].getElementsByTagName('a')[0].title : '';
                            }
                            var selected = header[ss].hasAttribute("is-selected");
                            var header_home = {
                                title: button_text,
                                count: ss + 1,
                                selected: selected
                            };
                            data_json.header.categories.push(header_home);
                        }
                    }
                }
            } else if (data_type == 'artist') {
                var contents = document.getElementById("header");
                if (contents != null) {
                    var title = contents.getElementsByClassName("title").length > 0 ? contents.getElementsByClassName("title")[0].innerText : "Lamhaa Artist";
                    var about = contents.getElementsByClassName("description").length > 0 ? contents.getElementsByClassName("description")[0].textContent : "Music that Connects to Heart \uD83D\uDC99";
                    var photo = 'no_photo';
                    if (contents.getElementsByTagName("img").length > 0) {
                        if (contents.getElementsByTagName("img")[0].src.includes("http")) {
                            photo = contents.getElementsByTagName("img")[0].src;
                        }
                    }
                    var buttons = contents.getElementsByTagName("button");
                    var radio_artist = false;
                    var shuffle_artist = false;
                    if (buttons.length > 0) {
                        for (var s = 0; s < buttons.length; s++) {
                            if (buttons[s].innerText.toLowerCase().includes("radio")) {
                                radio_artist = true;
                            } else if (buttons[s].innerText.toLowerCase().includes("shuffle")) {
                                shuffle_artist = true;
                            }
                        }
                    }
                    var artist_header = {
                        title: title,
                        about: about,
                        photo: photo,
                        radio: radio_artist,
                        shuffle: shuffle_artist
                    };
                    data_json.header = artist_header;
                }
            } else if (data_type == 'playlist') {
                var contents = document.getElementById("header");
                if (contents != null) {
                    var title = contents.getElementsByClassName("title").length > 0 ? contents.getElementsByClassName("title")[0].innerText : "Lamhaa Playlist";
                    var about = contents.getElementsByClassName("description").length > 0 ? contents.getElementsByClassName("description")[0].innerText : '';
                    var desc = contents.getElementsByClassName("subtitle").length > 0 ? contents.getElementsByClassName("subtitle")[0].innerText : "";
                    var desc1 = contents.getElementsByClassName("second-subtitle").length > 0 ? contents.getElementsByClassName("second-subtitle")[0].innerText : "";
                    var photo = 'no_photo';
                    if (contents.getElementsByTagName("img").length > 0) {
                        if (contents.getElementsByTagName("img")[0].src.includes("http")) {
                            photo = contents.getElementsByTagName("img")[0].src;
                        }
                    }
                    var buttons = contents.getElementsByTagName("button");
                    var radio_artist = false;
                    var shuffle_artist = false;
                    var play_artist = false;
                    if (buttons.length > 0) {
                        for (var s = 0; s < buttons.length; s++) {
                            if (buttons[s].innerText.toLowerCase().includes("radio")) {
                                radio_artist = true;
                            } else if (buttons[s].innerText.toLowerCase().includes("shuffle")) {
                                shuffle_artist = true;
                            } else if (buttons[s].innerText.toLowerCase().includes("play")) {
                                play_artist = true;
                            }
                        }
                    }
                    var type = "browse";
                    if (location.href.includes("/playlist")) {
                        type = "playlist";
                    }
                    var playlist_header = {
                        title: title,
                        about: about,
                        photo: photo,
                        desc: desc,
                        desc1: desc1,
                        radio: radio_artist,
                        shuffle: shuffle_artist,
                        play: play_artist,
                        type: type
                    };
                    data_json.header = playlist_header;
                }
            }
            if (data_type == 'search') {
                data_json.header.top_content = [];
                var header_content = data_holder[0].getElementsByTagName("ytmusic-card-shelf-renderer");
                if (header_content.length > 0) {
                    var header = header_content[0].getElementsByClassName("main-card-container");
                    if (header.length > 0) {
                        var title_header = header[0].getElementsByClassName("title").length > 0 ? header[0].getElementsByClassName("title")[0].innerText : "Lamhaa";
                        var photo_header = header[0].getElementsByTagName("img")[0].src;
                        var desc_header = header[0].getElementsByClassName("subtitle").length > 0 ? header[0].getElementsByClassName("subtitle")[0].innerText : "Music that Connects to Heart \uD83D\uDC99";
                        var url_header = header[0].getElementsByTagName("a").length > 0 ? header[0].getElementsByTagName("a")[0].href : "no_data";
                        var play_header = false;
                        var shuffle_header = false;
                        var radio_header = false;
                        var buttons_header = header[0].getElementsByTagName("button");
                        for (var rs = 0; rs < buttons_header.length; rs++) {
                            var button_text = buttons_header[rs].innerText.toLowerCase();
                            if (button_text.includes("play")) {
                                play_header = true;
                            } else if (button_text.includes("shuffle")) {
                                shuffle_header = true;
                            } else if (button_text.includes("radio")) {
                                radio_header = true;
                            }
                        }

                        var video_id = url_header;
                        if(video_id.indexOf("?v=") != -1 || video_id.indexOf("&v=") != -1) {
                          if(video_id.indexOf("?v=") != -1) {
                            video_id = video_id.split("?v=")[1];
                            if(video_id.indexOf("&") != -1) {
                              video_id = video_id.split("&")[0];
                            }
                          } else if(video_id.indexOf("&v=") != -1) {
                            video_id = video_id.split("&v=")[1];
                            if(video_id.indexOf("&") != -1) {
                              video_id = video_id.split("&")[0];
                            }
                          }
                        }

                        var channel_id = "no_id";
                        var urls_header = header[0].getElementsByTagName("a");
                        for (var rs = 0; rs < urls_header.length; rs++) {
                            if (urls_header[rs].href.includes("/channel/")) {
                                channel_id = urls_header[rs].href.split("/channel/")[1];
                                if (channel_id.indexOf("?") != -1) {
                                    channel_id = channel_id.split("?")[0];
                                }
                            }
                        }
                                        
                        if(title_header.toLowerCase().indexOf("zee music company") == -1 && desc_header.toLowerCase().indexOf("zee music company") == -1 ){
                            if(!copyrighted_songs.includes(video_id) && !copyrighted_songs.includes(channel_id) && url_header.indexOf("/podcast/") == -1) {
                                var search_header = {
                                    title: title_header,
                                    photo: photo_header,
                                    desc: desc_header,
                                    url: url_header,
                                    play: play_header,
                                    shuffle: shuffle_header,
                                    radio: radio_header
                                };
                                data_json.header.top_content.push(search_header);
                            }
                        }
                    }
                }
            }
        }
        var card_data_holder = data_holder[0].getElementsByTagName('ytmusic-card-shelf-renderer');
        if (card_data_holder.length > 0) {
            for (var rs = 0; rs < card_data_holder.length; rs++) {
                var rows = card_data_holder[rs].getElementsByTagName('ytmusic-responsive-list-item-renderer');
                var grids = card_data_holder[rs].getElementsByTagName('ytmusic-two-row-item-renderer');
                if (next_count > 0 && (rows.length > data_counts[4] || grids.length > data_counts[5])) {
                    data_json.contents.push({
                        content: {
                            type: 'ytmusic-card-shelf-renderer',
                            contents: get_contents_json(card_data_holder, rs, data_type, ((rows.length > data_counts[4]) ? data_counts[4] : data_counts[5]), 'ytmusic-card-shelf-renderer')
                        }
                    });
                    loaded_count += 1;
                    next_count = 0;
                }
                for (var ss = 0; ss < card_data_holder[rs].children.length; ss++) {
                    if (card_data_holder[rs].children[ss] != null && card_data_holder[rs].children[ss].id == 'continuations') {
                        if (card_data_holder[rs].children[ss].innerHTML.length > 0) {
                            data_json.next = true;
                            next_count += 1;
                        }
                    }
                }
            }
        }
        if (card_data_holder.length > data_counts[6]) {
            Lamhaa.update_data_count(6, card_data_holder.length);
            data_json.contents.push({
                content: {
                    type: 'ytmusic-card-shelf-renderer',
                    contents: get_contents_json(card_data_holder, data_counts[6], data_type, 0, 'ytmusic-card-shelf-renderer')
                }
            });
            loaded_count += 1;
        }
        var playlist_data_holder = data_holder[0].getElementsByTagName('ytmusic-playlist-shelf-renderer');
        if (playlist_data_holder.length > 0) {
            for (var rs = 0; rs < playlist_data_holder.length; rs++) {
                var rows = playlist_data_holder[rs].getElementsByTagName('ytmusic-responsive-list-item-renderer');
                var grids = playlist_data_holder[rs].getElementsByTagName('ytmusic-two-row-item-renderer');
                if (next_count > 0 && (rows.length > data_counts[4] || grids.length > data_counts[5])) {
                    data_json.contents.push({
                        content: {
                            type: 'ytmusic-playlist-shelf-renderer',
                            contents: get_contents_json(playlist_data_holder, rs, data_type, ((rows.length > data_counts[4]) ? data_counts[4] : data_counts[5]), 'ytmusic-playlist-shelf-renderer')
                        }
                    });
                    loaded_count += 1;
                    next_count = 0;
                }
                for (var ss = 0; ss < playlist_data_holder[rs].children.length; ss++) {
                    if (playlist_data_holder[rs].children[ss] != null && playlist_data_holder[rs].children[ss].id == 'continuations') {
                        if (playlist_data_holder[rs].children[ss].innerHTML.length > 0) {
                            data_json.next = true;
                            next_count += 1;
                        }
                    }
                }
            }
        }
        if (playlist_data_holder.length > data_counts[3]) {
            Lamhaa.update_data_count(3, playlist_data_holder.length);
            data_json.contents.push({
                content: {
                    type: 'ytmusic-playlist-shelf-renderer',
                    contents: get_contents_json(playlist_data_holder, data_counts[3], data_type, 0, 'ytmusic-playlist-shelf-renderer')
                }
            });
            loaded_count += 1;
        }
        var shelf_data_holder = data_holder[0].getElementsByTagName('ytmusic-shelf-renderer');
        if (shelf_data_holder.length > 0) {
            for (var rs = 0; rs < shelf_data_holder.length; rs++) {
                var rows = shelf_data_holder[rs].getElementsByTagName('ytmusic-responsive-list-item-renderer');
                var grids = shelf_data_holder[rs].getElementsByTagName('ytmusic-two-row-item-renderer');
                if (next_count > 0 && (rows.length > data_counts[4] || grids.length > data_counts[5])) {
                    data_json.contents.push({
                        content: {
                            type: 'ytmusic-shelf-renderer',
                            contents: get_contents_json(shelf_data_holder, rs, data_type, ((rows.length > data_counts[4]) ? data_counts[4] : data_counts[5]), 'ytmusic-shelf-renderer')
                        }
                    });
                    loaded_count += 1;
                    next_count = 0;
                }
                for (var ss = 0; ss < shelf_data_holder[rs].children.length; ss++) {
                    if (shelf_data_holder[rs].children[ss] != null && shelf_data_holder[rs].children[ss].id == 'continuations') {
                        if (shelf_data_holder[rs].children[ss].innerHTML.length > 0) {
                            data_json.next = true;
                            next_count += 1;
                        }
                    }
                }
            }
        }
        if (shelf_data_holder.length > data_counts[2]) {
            Lamhaa.update_data_count(2, shelf_data_holder.length);
            data_json.contents.push({
                content: {
                    type: 'ytmusic-shelf-renderer',
                    contents: get_contents_json(shelf_data_holder, data_counts[2], data_type, 0, 'ytmusic-shelf-renderer')
                }
            });
            loaded_count += 1;
        }
        var grid_data_holder = data_holder[0].getElementsByTagName('ytmusic-grid-renderer');
        if (grid_data_holder.length > 0) {
            for (var rs = 0; rs < grid_data_holder.length; rs++) {
                var rows = grid_data_holder[rs].getElementsByTagName('ytmusic-responsive-list-item-renderer');
                var grids = grid_data_holder[rs].getElementsByTagName('ytmusic-two-row-item-renderer');
                if (next_count > 0 && (rows.length > data_counts[4] || grids.length > data_counts[5])) {
                    data_json.contents.push({
                        content: {
                            type: 'ytmusic-grid-renderer',
                            contents: get_contents_json(grid_data_holder, rs, data_type, ((rows.length > data_counts[4]) ? data_counts[4] : data_counts[5]), 'ytmusic-grid-renderer')
                        }
                    });
                    loaded_count += 1;
                    next_count = 0;
                }
                for (var ss = 0; ss < grid_data_holder[rs].children.length; ss++) {
                    if (grid_data_holder[rs].children[ss] != null && grid_data_holder[rs].children[ss].id == 'continuations') {
                        if (grid_data_holder[rs].children[ss].innerHTML.length > 0) {
                            data_json.next = true;
                            next_count += 1;
                        }
                    }
                }
            }
        }
        if (grid_data_holder.length > data_counts[1]) {
            Lamhaa.update_data_count(1, grid_data_holder.length);
            data_json.contents.push({
                content: {
                    type: 'ytmusic-grid-renderer',
                    contents: get_contents_json(grid_data_holder, data_counts[1], data_type, 0, 'ytmusic-grid-renderer')
                }
            });
            loaded_count += 1;
        }
        var carousel_data_holder = data_holder[0].getElementsByTagName('ytmusic-carousel-shelf-renderer');
        if (carousel_data_holder.length > data_counts[0]) {
            Lamhaa.update_data_count(0, carousel_data_holder.length);
            data_json.contents.push({
                content: {
                    type: 'ytmusic-carousel-shelf-renderer',
                    contents: get_contents_json(carousel_data_holder, data_counts[0], data_type, 0, 'ytmusic-carousel-shelf-renderer')
                }
            });
            loaded_count += 1;
        }
        var continue_holder = data_holder[0].getElementsByTagName('ytmusic-section-list-renderer');
        if (continue_holder.length > 0) {
            for (var ss = 0; ss < continue_holder[0].children.length; ss++) {
                if (continue_holder[0].children[ss].getAttribute('id') != null && continue_holder[0].children[ss].id == 'continuations') {
                    if (continue_holder[0].children[ss].innerHTML.length > 0) {
                        data_json.next = true;
                    }
                }
            }
        }
        if (load_more == false || loaded_count > 0 || refresh_count > 4) {
            if ((load_more == false && (data_json.contents.length > 0 || (data_json.header.categories != null && data_json.header.categories.length > 0) || (data_json.header.title != null && data_json.header.title.length > 0))) || (load_more == true)) {
                Lamhaa.send_json(JSON.stringify(data_json), location.href, load_more);
            } else {
                Lamhaa.show_error();
            }
        } else if (refresh_count <= 4) {
            refresh_count += 1;
            if (refresh_timeout != null) {
                clearTimeout(refresh_timeout);
            }
            refresh_timeout = setTimeout(function() {
                get_lamhaa_json_data(data_type, data_counts, load_more);
            }, 1000);
        }
    } else {
        Lamhaa.show_error();
    }
}

function get_contents_json(all_data_holder, start_pos, data_type, internal, content_type) {
    var full_contents = [];
    for (var rs = start_pos; rs < all_data_holder.length; rs++) {
        var data_type_home = "ytmusic-responsive-list-item-renderer";
        var lists = all_data_holder[rs].getElementsByTagName("ytmusic-responsive-list-item-renderer");
        if (lists.length == 0) {
            data_type_home = "ytmusic-two-row-item-renderer";
            lists = all_data_holder[rs].getElementsByTagName("ytmusic-two-row-item-renderer");
        }
        if (lists.length == 0) {
            data_type_home = "ytmusic-navigation-button-renderer";
            lists = all_data_holder[rs].getElementsByTagName("ytmusic-navigation-button-renderer");
        }
        var rows = all_data_holder[rs].getElementsByTagName('ytmusic-responsive-list-item-renderer');
        var grids = all_data_holder[rs].getElementsByTagName('ytmusic-two-row-item-renderer');
        Lamhaa.update_data_count(4, rows.length);
        Lamhaa.update_data_count(5, grids.length);
        if (lists.length > 0) {
            var heading = '';
            if (content_type != 'ytmusic-grid-renderer' && content_type != 'ytmusic-shelf-renderer' && content_type != 'ytmusic-card-shelf-renderer') {
                heading = (all_data_holder[rs].getElementsByClassName("title").length > 0) ? all_data_holder[rs].getElementsByClassName("title")[0].innerText : "Picked by us";
            } else if (content_type == 'ytmusic-shelf-renderer' || content_type == 'ytmusic-card-shelf-renderer') {
                heading = (all_data_holder[rs].getElementsByTagName("h2").length > 0) ? all_data_holder[rs].getElementsByTagName("h2")[0].innerText : "Picked by us";
            } else {
                heading = (all_data_holder[rs].getElementsByTagName("ytmusic-grid-header-renderer").length > 0) ? all_data_holder[rs].getElementsByTagName("ytmusic-grid-header-renderer")[0].innerText : "Picked by us";
            }
            var small_heading = (all_data_holder[rs].getElementsByClassName("strapline").length > 0) ? all_data_holder[rs].getElementsByClassName("strapline")[0].innerText : "Lamhaa";
            if (internal > 0) {
                heading = (internal + 1) + ' to ' + lists.length;
                small_heading = 'More';
            }
            var more = "hide";
            var buttons = all_data_holder[rs].getElementsByTagName("button");
            for (var i = 0; i < buttons.length; i++) {
                if (buttons[i].innerText.toLowerCase().includes("show all") || buttons[i].innerText.toLowerCase().includes("more")) {
                    if (all_data_holder[rs].getElementsByTagName("a").length > 0) {
                        if (data_type == "search") {
                            for (var url_count = 0; url_count < all_data_holder[rs].getElementsByTagName("a").length; url_count++) {
                                var more_url = all_data_holder[rs].getElementsByTagName("a")[url_count].href;
                                if (more_url.includes("/search")) {
                                    more = more_url;
                                }
                            }
                        } else {
                            var more_url = all_data_holder[rs].getElementsByTagName("a")[0].href;
                            if (more_url.includes("/listen_again") || more_url.includes("/mixed_for_you") || more_url.includes("/channel") || more_url.includes("/charts") || more_url.includes("/new_releases/videos") || more_url.includes("/new_releases/albums") || more_url.includes("/new_releases") || more_url.includes("/moods") || more_url.includes("/browse") || more_url.includes("/playlist")) {
                                more = more_url;
                            }
                        }
                    }
                }
            }
            if (internal > 0) {
                more = 'hide';
            }
            var buttons_type = "";
            if (all_data_holder[rs].hasAttribute("grid-type")) {
                buttons_type = all_data_holder[rs].getAttribute("grid-type");
            }
            full_contents.push({
                header: {
                    type: data_type_home,
                    title: heading,
                    top_title: small_heading,
                    more: more,
                    buttons_type: buttons_type,
                    position: rs
                },
                contents: []
            });
            for (var data_count = internal; data_count < lists.length; data_count++) {
                var title_data;
                var desc_data = "";
                var type = "";
                if (data_type_home == "ytmusic-two-row-item-renderer" && lists[data_count].getElementsByTagName("ytmusic-custom-index-column-renderer").length > 0) {
                    title_data = lists[data_count].getElementsByClassName("title-column").length > 0 ? lists[data_count].getElementsByClassName("title-column")[0].getElementsByClassName("title")[0].innerText : lists[data_count].getElementsByClassName("title-group")[0].getElementsByClassName("title")[0].innerText;
                    desc_data = lists[data_count].getElementsByClassName("secondary-flex-columns").length > 0 ? lists[data_count].getElementsByClassName("secondary-flex-columns")[0].innerText : lists[data_count].getElementsByClassName("substring-group")[0].innerText;
                } else if (data_type_home.includes("button")) {
                    title_data = lists[data_count].innerText;
                    type = lists[data_count].getAttribute("style") != null ? lists[data_count].getAttribute("style") : '';
                } else {
                    title_data = lists[data_count].getElementsByClassName("title-column").length > 0 ? lists[data_count].getElementsByClassName("title-column")[0].innerText : lists[data_count].getElementsByClassName("title-group")[0].innerText;
                    desc_data = lists[data_count].getElementsByClassName("secondary-flex-columns").length > 0 ? lists[data_count].getElementsByClassName("secondary-flex-columns")[0].innerText : lists[data_count].getElementsByClassName("substring-group")[0].innerText;
                }
                var url_data = lists[data_count].getElementsByTagName("a").length > 0 ? lists[data_count].getElementsByTagName("a")[0].href : 'no_url';
                var ar_home = lists[data_count].getAttribute("aspect-ratio");
                if (ar_home == null) {
                    ar_home = "SQUARE";
                }
                var trending_type = "";
                if (lists[data_count].hasAttribute("has-custom-index-column")) {
                    trending_type = "trending";
                }
                var trending_count = lists[data_count].getElementsByTagName('ytmusic-custom-index-column-renderer');
                if (trending_count.length > 0) {
                    trending_type = 'trending';
                }
 
                var video_id = url_data;
                if(video_id.indexOf("?v=") != -1 || video_id.indexOf("&v=") != -1) {
                    if(video_id.indexOf("?v=") != -1) {
                        video_id = video_id.split("?v=")[1];
                        if(video_id.indexOf("&") != -1) {
                            video_id = video_id.split("&")[0];
                        }
                    } else if(video_id.indexOf("&v=") != -1) {
                        video_id = video_id.split("&v=")[1];
                        if(video_id.indexOf("&") != -1) {
                            video_id = video_id.split("&")[0];
                        }
                    }
                }

                var channel_id = "no_id";
                var urls_data = lists[data_count].getElementsByTagName("a");
                for (var ra = 0; ra < urls_data.length; ra++) {
                    if (urls_data[ra].href.indexOf("/channel/") != -1) {
                        channel_id = urls_data[ra].href.split("/channel/")[1];
                        if (channel_id.indexOf("?") != -1) {
                            channel_id = channel_id.split("?")[0];
                        }
                    }
                }

                if(title_data.toLowerCase().indexOf("zee music company") == -1 && desc_data.toLowerCase().indexOf("zee music company") == -1 ){
                    if(!copyrighted_songs.includes(video_id) && !copyrighted_songs.includes(channel_id)  && url_data.indexOf("/podcast/") == -1) {
                        var data_home = {
                            title: title_data,
                            desc: desc_data,
                            type: type,
                            aspect_ratio: ar_home,
                            count: data_count + 1,
                            trending_type: trending_type,
                            url: url_data
                        };
                        full_contents[(full_contents.length) - 1].contents.push(data_home);
                    }
                }
            }
        }
    }
    return full_contents;
}
var playlist_timer;
var playlist_shown = false;

function new_playlist() {
    var big_menu = document.getElementsByTagName('tp-yt-app-drawer');
    if (big_menu.length > 0) {
        var small_menu = big_menu[0].getElementsByTagName('button');
        for (var rs = 0; rs < small_menu.length; rs++) {
            if (small_menu[rs].textContent.toLowerCase().includes('new playlist')) {
                small_menu[rs].click();
                if (playlist_timer != null) {
                    clearInterval(playlist_timer);
                }
                playlist_timer = setInterval(function() {
                    show_playlist();
                }, 250);
            }
        }
    }
}
var np_dialog;

function show_playlist() {
    var playlist_dialog = document.getElementsByTagName('ytmusic-dialog');
    if (playlist_dialog.length > 0) {
        for (var rs = 0; rs < playlist_dialog.length; rs++) {
            var pd_header = playlist_dialog[rs].getElementsByTagName('h2');
            if (pd_header.length > 0 && pd_header[0].innerText.toLowerCase().includes('new playlist')) {
                np_dialog = playlist_dialog[rs];
                if (playlist_dialog[rs].getAttribute('aria-hidden') != null) {
                    if (playlist_dialog[rs].getAttribute('aria-hidden') == 'true') {
                        if (playlist_shown == true) {
                            playlist_shown = false;
                            Lamhaa.playlist_dialog(false);
                        }
                    } else {
                        if (playlist_shown == false) {
                            playlist_shown = true;
                            Lamhaa.playlist_dialog(true);
                        }
                    }
                } else {
                    if (playlist_shown == false) {
                        playlist_shown = true;
                        Lamhaa.playlist_dialog(true);
                    }
                }
            }
        }
    }
}

function create_playlist(title, desc) {
    if (np_dialog != null) {
        var title_container = np_dialog.getElementsByTagName('tp-yt-paper-input');
        for (var rs = 0; rs < title_container.length; rs++) {
            if (title_container[rs].textContent.toLowerCase().includes('title')) {
                var event = new Event('input', {
                    'bubbles': true,
                    'cancelable': true
                });
                title_container[rs].getElementsByTagName('input')[0].value = title;
                title_container[rs].getElementsByTagName('tp-yt-iron-input')[0].dispatchEvent(event);
            }
        }
        var desc_container = np_dialog.getElementsByTagName('tp-yt-paper-textarea');
        for (var rs = 0; rs < desc_container.length; rs++) {
            if (desc_container[rs].textContent.toLowerCase().includes('description')) {
                var event = new Event('input', {
                    'bubbles': true,
                    'cancelable': true
                });
                desc_container[rs].getElementsByTagName('textarea')[0].value = desc;
                desc_container[rs].getElementsByTagName('tp-yt-iron-autogrow-textarea')[0].dispatchEvent(event);
            }
        }
        var click_container = np_dialog.getElementsByTagName('button');
        for (var rs = 0; rs < click_container.length; rs++) {
            if (click_container[rs].textContent.toLowerCase().includes('create')) {
                click_container[rs].click();
            }
        }
    }
}

function view_history() {
    var history_link = document.getElementById("history-link");
    if (history_link != null) {
        history_link.click();
    }
}
