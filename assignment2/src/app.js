import $ from "jquery";
import styles from "./css/style.css";
import {display} from "./view.js"; 
import {namefunc} from "./view.js";
import {displayPosts} from "./view.js";
import {keyPhrase} from "./view.js";
import {loadpage} from "./view.js";
import * as flickr from "./flickr.js";
import * as facebook from "./facebook.js";
import * as azure from "./azure.js";
let res;
let results;
var jsonObj = {documents : []};


$(document).ready(function(){
    flickr.getInteresting(flickrReady);
    $('#modal-close').click(function(){                     //creates a click function for eack modal-close
        $('#modal-container').css('display', 'none');       //sets #modal-container display to none
        $('#modal-content').attr('src', '');                //remove the model-content img on close so it doesnt show up when another picture is selected
        $('#modal-caption').html($(this).attr(''));         //Remove the html from modal-caption div when its close
    });
    loadpage();
    facebook.bootstrap();
});

window.loggedout = function(){
    loadpage();
}

window.loggedin = function(){
    res = facebook.getPosts();
    createPostJSON(res);
    $("#btn").css({'display': 'block', 'visibility': 'visible'});
}


function postReady(data){
    displayPosts(data);
}

function createPostJSON(data){;
    for (let i = 0; i < data.length; i++) {  
        let postObj = {languge: 'en', id: i, text: data[i].post};
        jsonObj.documents.push(postObj);
    }
    console.log("creatPostJSON");
    console.log(jsonObj);
    displayPosts(data);
}


$("#btn").click(function(){
    azure.textAnalyse(jsonObj);
    $("#btn").css({'display': 'none', 'visibility': 'hidden'});
    $("#next").css({'display': 'block', 'visibility': 'visible'});
});

$("#next").click(function(){
    results = azure.reply();
    console.log(results);
    $("#next").css({'display': 'none', 'visibility': 'hidden'});
    $("#pic").css({'display': 'block', 'visibility': 'visible'});
    keyPhrase(results);
});

$("#pic").click(function(){
    flickr.search_Register(results);
    $("#pic").css({'display': 'none', 'visibility': 'hidden'});
});

        
function registerModal(){
    $('figure').each(function(index){
        $(this).click(function(){                                       //a click function for each figure 
            $('#modal-container').css('display', 'block');              //displays the #modal-container div
            $('#modal-content').attr('src', $(this).attr('data-full'));     //sets the src atttribute on the img tag to the largest img size 
            $('#modal-caption').html($(this).attr('caption'));     //sets the html atttribute on the modal-caption div to the photos caption 
        });
    });
}

function flickrReady(data){
    display(data);
    registerModal();
}
