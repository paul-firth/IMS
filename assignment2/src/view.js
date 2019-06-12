import $ from "jquery"; 
import thumbs from "./template/thumbnails.handlebars";
import name from "./template/name.handlebars"
import posts from "./template/posts.handlebars";
import phrase from "./template/phrase.handlebars"


export function display(photosArr){
    let data = {photos: photosArr};
    let template = thumbs(data);
    $("#container").html(template);               // Alter the container div with the code from result
}


export function namefunc(nameObj){
    let namedata = {name: nameObj};
    let nameTemplate = name(namedata);
    $("#left").html(nameTemplate);
}


export function displayPosts(postsArr){
    let postdata = {post: postsArr};
    let template = posts(postdata);
    $("#container").html("");
    $("#container").html(template);               // Alter the container div with the code from result
}

export function keyPhrase(keyphrase){
    let phrasedata = {phrase: keyphrase};
    let phrasetemplate = phrase(phrasedata);
    console.log(keyphrase);
    $("#container").html("");
    $("#container").html(phrasetemplate);               // Alter the container div with the code from result
}

export function loadpage(){
    $('#center').html("Facebook Text Analyser and Photo Album Thingamabob");
    $('#container').html(`<p><strong>Welcome to my Facebook Text Analyser and Photo Album Thingamabob.</strong> </p><p>
    The purpose of this app is to return photos related to the most common key phrase found in a user's past 25 Facebook posts. <br> 
    This app makes use of Facebook’s Graph API to retrieve a user's recent posts' this information is then used to create a JSON object formatted for use in  Microsoft’s Azure cognitive Services API specifically the Key phrases part of their Text analytics API
    The Text analytics returns another JSON object containing the Key phrases from each post that are extracted and placed into an array. This array is then filtered to find the most common reoccurring 
    phrase from the posts. This phrase is then sent to Flickr's search API to return an array of 10 photo's that have tag's containing the key phrase</p>
    <p>The only API that requires user authentication is the Facebook’s Graph API which requires access to the user's name and post's.</p><p>To use this App simply login with the Facebook login 
    button on at the top right of your screen. After this a button will appear for you to trigger the fetching of post's from your Facebook time line, another button will appear and is used to send 
    the new JSON object containing post data to the Azure Text analytics API the returned JSON file will then be processed and the most common phrase returned and a final button will 
    appear to send the search request to flicker's API after which you will be presented with 10 images.</p><p> The original method was to have these function's to run automatically automatically without the need for button's but 
    I had some trouble properly implementing this within the time allowed so I comprimised and used buttons to process the infomation.</p>
    <p>Facebook Test user accounts for this are wesmrqgkei_1557282548@tfbnw.net and iyanvrtgng_1557282546@tfbnw.net both use the password "notapassword".</p>`);
    $('footer').html(`<span id="author">By Paul Firth</span>`);
}