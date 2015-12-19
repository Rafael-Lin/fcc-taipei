'use strict';

(function () {
    var submitBtn = document.querySelector('#submitBtn');
    var postsList = document.querySelector('#postsList');
    var textInputBox = document.querySelector('#inputText');
    var apiUrl = 'https://fcc-taipei-beltayn.c9.io/api/posts';

    submitBtn.addEventListener('click', function() {
        ajaxRequest('POST', apiUrl, function() {
            ajaxRequest('GET', apiUrl, updatePosts);
        });
    });

    
    
    function ready (fn) {
        console.log(fn);
        if (typeof fn !== 'function') {
            //console.log("Doc Ready - callback is not a function.");
            //postsList.innerHTML = "Doc Ready - callback is not a function.";
            return;
        }
        
        if (document.readyState === 'complete') {
            console.log("Doc Ready");
            return fn();
        }
        document.addEventListener('DOMContentLoaded', fn, false);
    }
    
    function ajaxRequest (method, url, callback) {
        var xmlhttp = new XMLHttpRequest();
        
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState === 4 && xmlhttp.status === 200){
                callback(xmlhttp.response);
            }
        };
        
        xmlhttp.open(method, url, true);
        
        if (method == 'POST') {
            var data = {};
            data.message = textInputBox.value;
            xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xmlhttp.send(JSON.stringify(textInputBox.value));
        } else {
        xmlhttp.send();
        }
    }
    
    function updatePosts(data) {
        var postsData = JSON.parse(data);
        
        //fix this shit. Make pretty.
        var messageOpen = "<blockquote class='text-center well'><div align='left'><i class='fa fa-align-left fa-quote-left'></i></div><p>";
        var messageClose = "</p><div align='right'><i class='fa fa-quote-right'></i></div></blockquote>";
        postsList.innerHTML = "";
        for (var i = 0; i < postsData.length; i++){
            postsList.innerHTML += messageOpen + postsData[i]["body"] + messageClose;
        }//this is so ugly, please don't hate me for this.
    }

    ready(ajaxRequest('GET', apiUrl, updatePosts));
    
})();