// https://docs.google.com/spreadsheets/d/1zqqN_IZtpfGRRq9bQpi_SZVUp4MCjHy9VX4ttRCPMqQ/pubhtml
console.log('main.js up and running!')

// let's build the spreadsheet URL
var spreadsheetURL = "https://spreadsheets.google.com/feeds/list/"
spreadsheetURL += "1zqqN_IZtpfGRRq9bQpi_SZVUp4MCjHy9VX4ttRCPMqQ" // public key
spreadsheetURL += "/1/" // sheet number
spreadsheetURL += "public/values?alt=json" // this is JSON

console.log(spreadsheetURL)

var spreadhseetRows	// declare this variable outside of $.getJSON function so that it will be accessible anywhere
var allActivities = []
var filteredActivities = []
var filtersToCheck = 
{
	time: '',
	feeling: '',
	weather: ''
}

// use jQuery to get JSON file from a certain URL
// once we get that file do something
$.getJSON(spreadsheetURL, function(result){
	// console.log(result)

	spreadsheetRows = result.feed.entry
	// console.log(spreadsheetRows)
	$.each(spreadsheetRows, function(index, row)
	{		
 		var activity = 
		{
			name: row.gsx$activities.$t,
			time: 
			{
				lessthan5minutes : row.gsx$lessthan5minutes.$t,
				lessthan15minutes : row.gsx$lessthan15minutes.$t,
				lessthan30minutes : row.gsx$lessthan30minutes.$t,
				morethan30minutes : row.gsx$morethan30minutes.$t
				
			},
			feeling:
			{
				lazy : row.gsx$ifeellazy.$t,
				active : row.gsx$ifeelactive.$t,
				bored : row.gsx$ijustfeelbored.$t,
				dontknow : row.gsx$idontknow.$t
			},
			weather:
			{
				sunny : row.gsx$sunny.$t,
				mild : row.gsx$mild.$t,
				raining : row.gsx$raining.$t,
				snowing : row.gsx$snowing.$t
			},
			//score: 0
		}

		allActivities.push(activity)

			// 		// var rating = rating.gsx$ifeellazy.$t // grab the activity rating for feeling lazy
			   //var rating = rating.gsx$ifeellazy.$t
			// 		// console.log(activity + " would like to have a pet " + rating)
			   //console.log(activity, "gets a rating of" ,rating)
			// 		// var sentence = activity + " would like to have a pet " + rating
			// 		// var li = "<li>" + sentence + "</li>"
			// 		// $("ul#likes").append(li)


	})


	console.log(allActivities)

	// $("#loading").fadeOut()
})


// jQuery to hide page 1 and show page 2
$("#start").click(function(){
  $("#firstpage").hide();
  $("#secondpage").show();
});

// $('#lessthan5minutes').click(checkAnswer)
// $('#lessthan15minutes').click(checkAnswer)
// $('#lessthan30minutes').click(checkAnswer)

function checkAnswer(whichPage, whichFilter)
{
	// see which options are checked
	var checkedInputs = $('#time input:checked')
	var filtersToCheck = []
	// loop through checked inputs to populate filtersToCheck
	checkedInputs.each(function(index, input)
	{
		// console.log(input.value)
		filtersToCheck.push(input.value)
	})
	console.log(filtersToCheck)

	if (filtersToCheck.length == 0) // if there are no filtersToCheck
	{
		filteredActivities = allActivities // all activities are eligible
	}	
	else

		// loop through the activities to populate the filteredActivities array
		$.each(allActivities, function(index, activity)
		{
			// console.log(activity)

			// flag, we assume it's true until proven false
			var matchesAllFilters = true

			// loop through the filtersToCheck
			// to see if the activity matches all of them
			$.each(filtersToCheck, function(index, filter)
			{
				// console.log(filter)
				var time = time[filter] // yes or no
				console.log('Can you ' + activity.name + ' for ' + filter + '? ' + timeContains)

				if (timeContains == 'yes') 
				{
					// we filter it out
					matchesAllFilters = false
				}
				else
				{
					// do nothing		
				}
			})

			// after the loop
			// if the activity still matches all filters
			// we add it to the filteredActivities
			if (matchesAllFilters == true)
			{
				// we "keep" the activity
				filteredActivities.push(activity)
			}	
		})

		console.log(filteredActivities)

		// do we still have activities, ie is filteredActivities empty?



	}	 



// display the results
function displayResults()
{

}

// jQuery to hide page 2 and show page 3
$("#buttontwo").click(function(){
  $("#secondpage").hide();
  $("#thirdpage").show();
  checkAnswer('#secondpage', 'time')
});

// jQuery to hide page 3 and show page 4
$("#buttonthree").click(function(){
  $("#thirdpage").hide();
  $("#fourthpage").show();
  checkAnswer('#thirdpage', 'feeling')
});

// jQuery to hide page 4 and show result page
$("#buttonfour").click(function(){
  $("#fourthpage").hide();
  $("#result").show();
  checkAnswer('#fourthpage', 'weather')
  filterActivities();
});

// jQuery to hide result page and show page 2
$("#fromthestart").click(function(){
  $("#result").hide();
  $("#secondpage").show();
});

//jQuery to show buttonthree on click of input button
$("#lessthan5minutes").click(function(){
 $("#buttontwo").show();
});
$("#lessthan15minutes").click(function(){
 $("#buttontwo").show();
});
$("#lessthan30minutes").click(function(){
 $("#buttontwo").show();
});
$("#morethan30minutes").click(function(){
 $("#buttontwo").show();
});

//jQuery to show buttonthree on click of input button
$("#ijustfeelbored").click(function(){
 $("#buttonthree").show();
});
$("#idontknowhowifeel").click(function(){
 $("#buttonthree").show();
});
$("#ifeellazy").click(function(){
 $("#buttonthree").show();
});
$("#ifeelactive").click(function(){
 $("#buttonthree").show();
});

//jQuery to show buttonfour on click of input button
$("#raining").click(function(){
 $("#buttonfour").show();
});
$("#sunny").click(function(){
 $("#buttonfour").show();
});
$("#mild").click(function(){
 $("#buttonfour").show();
});
$("#snowing").click(function(){
 $("#buttonfour").show();
});

//jQuery to highlight button on click
//http://stackoverflow.com/questions/14032125/html-button-on-click-property-changed
$(document).ready(function(){
   $('.beforeClick').click(function(){
       $('.beforeClick').css('background-color',"#3366FF");
       $('.beforeClick').css('color',"#FFFFFF");
       $(this).removeClass('selected')

        $(this).css('background-color',"#FFFFFF");
        $(this).css('color',"#3366FF");
        $(this).addClass('selected')

   });
});

