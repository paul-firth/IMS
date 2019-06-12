import $ from "jquery";
const APP_ID = "2409776152600091";
let posts = [];
let post_cb;
let postObj;

export function bootstrap() {
    $.ajaxSetup({ cache: true});
    $.getScript('https://connect.facebook.net/en_us/sdk.js', function(){
        FB.init({
            appId: APP_ID,
            version: 'v2.7',
            xfbml:1
        });
        FB.getLoginStatus(updateStatusCallback);
    });
}

function updateStatusCallback(response) {
    console.log(response);
    if (response.status === 'connected') {
        console.log('logged in');
    }
    else {
        console.log('Not logged in')
    }
}

export function getFB(){
    console.log("getFB");                               //try async and awaits for function

    return(posts);
}

export function getPosts(){
    FB.api('/me?fields=posts', function(response){
            for (let i = 0; i < response.posts.data.length; i++) {           // Loop itterating the number of times indicated by nnumber of posts 
                let postObj = {post: response.posts.data[i].message};        // creats the photoObj object containg ID and title
                    posts.push(postObj);
            }
        });
    return (posts);
}
