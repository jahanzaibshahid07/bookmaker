// listen for form submission
document.getElementById('myForm').addEventListener('submit',saveBookmark);

// save bookmark
function saveBookmark(e) {
	
	// get from values
	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;
	

	if(!validationForm(siteName,siteUrl))
	{
		return false;
	}

	// object
	var bookmark = {
		name: siteName,
		url: siteUrl 
	}

	/*
	//local storage test
	localStorage.setItem('test', 'hello world');
	console.log(localStorage.getItem('test'));
	localStorage.removeItem('test');
	console.log(localStorage.getItem('test'));
	*/
	
	// save the bookmark in the local storage 
	//test if bookmark is available
	if(localStorage.getItem('bookmarks') === null){ 
		
		//initial array
		var bookmarks = [];

		// add to array
		bookmarks.push(bookmark); // add object value in the array

		// set to localstorage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks)); // localStorage has key and value and convert JSON array into string 
	}
	else // if their is already bookmark in the local storage
	{
		// get bookmark from localstorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks')); // convert string into JSON
		// Add bookmark to array
		bookmarks.push(bookmark);
		//re-set back to local storage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
	}

	//clear form

	document.getElementById('myForm').reset();

	// Re-fetch bookmarks
	fetchBookmark();


	// prevent form from submiting
	e.preventDefault();
}

// delete bookmark

var deleteBookmark = function(url)
{
	// get bookmark from localstorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	// loop through bookmark
	for(var i = 0; i < bookmarks.length; i++)
	{
		if(bookmarks[i].url === url)
		{
			//remove from array 
			bookmarks.splice(i,1);
		}
	}

	//re-set back to local storage
	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

	// Re-fetch bookmarks
	fetchBookmark();
};


// fetchBookmark
var fetchBookmark = function()
{
	// get bookmark from localstorage
	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	//we want to access bookmarkresult id to modify
	var bookmarksResults = document.getElementById('bookmarksResults');

	// build output 
	bookmarksResults.innerHTML = '';

	for(var i = 0; i < bookmarks.length; i++)
	{
		var name = bookmarks[i].name;
		var url = bookmarks[i].url;

		bookmarksResults.innerHTML += '<div class="well">'+
										'<h3>'+name+
										' <a class ="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
										' <a onclick="deleteBookmark(\''+url+'\')" class ="btn btn-danger" href="#">Delete</a> ' +
										'</h3>'+
										'</div>';
	}	

};


// validaton form
var validationForm = function(siteName,siteUrl)
{
	// apply validation for empty
	if(!siteName || !siteUrl)
	{
		alert('please fill in the form');
		return false;
	}
	
	// apply validation for url
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!siteUrl.match(regex))
	{
		alert('Please use a valid URL');
		return false;
	}

	return true;
};