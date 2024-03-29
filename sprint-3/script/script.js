
// Function that appends HTML for an array of Comment Objects
function printComments() {
    allComments.forEach(displayComment);
};

// Function that removes all displayed comments and clears the allComments array
function clearComments() {
    let commentTop = document.getElementById('commentTop');
    let main = document.querySelector('main');

    for (let i = 0; i < allComments.length; i++) {
        toRemove = commentTop.nextElementSibling;
        main.removeChild(toRemove);
    }
    allComments = [];
}

// Function that creates a comment Object and adds it to the Comment Object Array
function makeComment (name1, comment1, timestamp1, id1, likes1) {

    let newComment = {
        name: name1,
        id: id1,
        likes: likes1,
        comment: comment1,
        timestamp: timestamp1,
    }
    return newComment;
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
    postDate.innerHTML = dateConvert(commentObject.timestamp);

    let postBody = document.createElement('h4');
    postBody.innerHTML = commentObject.comment;
    
    let deleteButton = document.createElement('h5')
    deleteButton.innerHTML = 'delete'
    deleteButton.classList.add('main__comments--delete')
    deleteButton.setAttribute('id', commentObject.id)

    let container = document.createElement('div');
    container.classList.add('main__comments--body');
    container.appendChild(postName);
    container.appendChild(postDate);
    container.appendChild(postBody);
    container.appendChild(deleteButton);

    

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

    let time = Date.now();
    let timeUnit = '';
    let timeNumber = 0;

    time = Math.round(time / 1000);
    commentTime = Math.round(commentTime / 1000);

    if ((time - commentTime) < 0) {
        return('Just now')
    }
    else if ((time - commentTime) < 60) {
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

// Gets all the comments in the API, stores them in the allComments array, and posts them to the page
function getAPIComments() {
    axios.get(commentURL).then(response => {
        response.data.forEach(function (comment) {
            allComments.unshift(makeComment(comment.name, comment.comment, comment.timestamp, comment.id, comment.likes));   
        })
        printComments();
        prepareDelete();
    }).catch(error => {
        alert('An error occurred when loading comments')
    });
}



// sends a comment to the API, clears the current comments, and updates the allComments array
function postComment (comment) {

    axios.post(commentURL, comment)
    .then(function (response) {

        clearComments();

        getAPIComments();
    })

    
}

// Deletes comment when delete button is pressed
function prepareDelete() {
    deleteButtons = document.querySelectorAll(".main__comments--delete");

    deleteButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            deleteComment(event.target.id)
        })
    })

}
// Removes the comment from the API, clears the displayed comments, and gets the remaining comments
function deleteComment (id) {
    let deleteURL = 'https://project-1-api.herokuapp.com/comments/' + id + api_key;
    axios.delete(deleteURL).then(response => {

        clearComments();

        getAPIComments();
    })
    
}

const api_key = '?api_key=21df5013-1198-4f21-8162-6676ccbfaffc'
const commentURL = 'https://project-1-api.herokuapp.com/comments?api_key=21df5013-1198-4f21-8162-6676ccbfaffc'
let deleteButtons = []; 

// Array of Comment Ojects
let allComments = [];

// print existing Object Array comments
getAPIComments();


//Waits for the form to be submitted, then posts the comment
const commentForm = document.getElementById('commentForm');
document.getElementById('commentForm').addEventListener('submit', function (event) {

    // Submitted Data is stored in variables in the correct format
    event.preventDefault();

    let newComment = {
        name: event.target.fullName.value,
        comment: event.target.comment.value,

    }

    // Submitted Comment is Sent to the API, Comment section is updated
    postComment(newComment);

    // Form text boxes are emptied
    let textBoxes = document.querySelectorAll('.main__comments--input');

    for (let i = 0; i < textBoxes.length; i++) {
        textBoxes[i].value = '';
    }
});











