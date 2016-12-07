/*$(function() {
	$.ajax({
		type:"GET",
		url:"http://owexpress.nl/index.html",
		dataType:"html",
		success:function(data) {
			var out = "";
			$(data).find("your selectors").each(function(loop, item){
				out += $(item).html();
			});
			data = out;
			alert(data);
			$("body").html(data);
		},
		error:function() {
			alert("Error");
		}
	})
});*/

$('#test-content').load('ajax/test.html #container');