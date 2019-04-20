// Three Given Comment Objects (with dates converted to Milliseconds since Epoch)
let comment1 = {
    name: 'Micheal Lyons',
    body: 'They BLEW the ROOF off at their last show, once everyone started figuring out they were going. This is still simply the greatest opening of a concert I have EVER witnessed.',
    date: 1545120000000
};

let comment2 = {
    name: 'Gary Wong',
    body: 'Every time I see him shred I feel so motivated to get off my couch and hop on my board.He’s so talented! I wish I can ride like him one day so I can really enjoy myself!',
    date: 1544601600000
};

let comment3 = {
    name: 'Theodore Duncan',
    body: 'How can someone be so good!!! You can tell he lives for this and lovesto do it every day. Everytime I see him I feel instantly happy! He’s definitely my favorite ever!',
    date: 1542268800000
}

// Array of Comment Ojects
let allComments = [comment1, comment2, comment3];


// Function that appends HTML for an array of Comment Objects
function printComments() {
    for (let i = 0; i < allComments.length; i++) {
        displayComment(allComments[i]);
    }
};

// Function that removes all displayed comments
function clearComments() {
    let commentTop = document.getElementById('commentTop');
    let main = document.querySelector('main');

    for (let i = 0; i < allComments.length; i++) {
        toRemove = commentTop.nextElementSibling;
        main.removeChild(toRemove);
    }
}

// Function that creates a comment Object and adds it to the Comment Object Array
function addComment (name1, body1, date1, commentArray) {

    let newComment = {
        name: name1,
        body: body1,
        date: date1,
    }
    commentArray.unshift(newComment);
};

// Function that appends appropriate HTML using data from a Comment Object
function displayComment(commentObject) {

    let profilePic = document.createElement('div');
    profilePic.classList.add('main__profilepic--gray');

    let postName = document.createElement('h3');
    postName.innerHTML = commentObject.name;

    let postDate = document.createElement('h5');
    postDate.classList.add('main__comments--date');
    // Date converted to easily-read Format
    postDate.innerHTML = dateConvert(commentObject.date);

    let postBody = document.createElement('h4');
    postBody.innerHTML = commentObject.body;

    let container = document.createElement('div');
    container.classList.add('main__comments--body');
    container.appendChild(postName);
    container.appendChild(postDate);
    container.appendChild(postBody)

    let divider = document.createElement('div');
    divider.classList.add('main__divider');

    let fullComment = document.createElement('div');
    fullComment.classList.add('main__comments')
    fullComment.appendChild(profilePic);
    fullComment.appendChild(container);
    fullComment.appendChild(divider)

    let main = document.querySelector('main');
    main.appendChild(fullComment);
}

// Converts a date from Milliseconds since Epoch to Easily-read Format
function dateConvert(commentTime) {

    let date = new Date();
    let time = date.getTime();

    time = Math.round(time / 1000);
    commentTime = Math.round(commentTime / 1000);

    let timeUnit = '';
    let timeNumber = 0;

    if ((time - commentTime) < 60) {
        timeUnit = 'seconds';
        timeNumber = time - commentTime;
    }
    else if ((time - commentTime) < 3600) {
        timeUnit = 'minutes';
        timeNumber = Math.round((time - commentTime)/60);
    }
    else if ((time - commentTime) < 86400) {
        timeUnit = 'hours';
        timeNumber = Math.round((time - commentTime) / 3600);
    }
    else if ((time - commentTime) < 604800) {
        timeUnit = 'days';
        timeNumber = Math.round((time - commentTime) / 86400);
    }
    else if ((time - commentTime) < 2628000) {
        timeUnit = 'weeks';
        timeNumber = Math.round((time - commentTime) / 604800);
    }
    else if ((time - commentTime) < 31536000) {
        timeUnit = 'months';
        timeNumber = Math.round((time - commentTime) / 2628000);
    }
    else {
        timeUnit = 'years';
        timeNumber = Math.round((time - commentTime) / 31536000);
    }

    if (timeNumber == 1){
        timeUnit = timeUnit.substring(0, timeUnit.length - 1);
    }
    
    return(timeNumber + ' ' + timeUnit + ' ago');
}

// print existing Object Array comments
printComments();

// Event when Comment Form is submitted.  
const commentForm = document.getElementById('commentForm');
document.getElementById('commentForm').addEventListener('submit', function (event) {    
    
    // Submitted Data is stored in variables in the correct format
    event.preventDefault();

    let name1 = event.target.fullName.value;

    let body1 = event.target.comment.value;

    // Old code for old date format

    // let date = new Date();
    // console.log(date);
    // let day = date.getDate();
    // let month = date.getMonth() + 1;
    // let year = date.getFullYear();
    // let date1 = month + '/' + day + '/' + year;


    let date = new Date();
    let date1 = date.getTime();

    // All previous comments are cleared
    clearComments();

    // Submitted Comment is placed into a Comment Object at the front of the Comment Object Array
    addComment(name1, body1, date1, allComments);

    // Comment Object Array is appended as HTML
    printComments();

    // Form text boxes are emptied
    let textBoxes = document.querySelectorAll('.main__comments--input');

    for (let i = 0; i < textBoxes.length; i++) {
        textBoxes[i].value = '';  
    }  
});




