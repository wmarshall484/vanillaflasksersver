$(document).ready(function(){
    console.log("document is ready");

    $('#inference').click(async function(){
	console.log('button was clicked');

	const cylinders = parseFloat($('#cylinders').val());
	const horsepower = parseFloat($('#horsepower').val());
	const weight = parseFloat($('#weight').val());

	data = {
	    cylinders,
	    horsepower,
	    weight
	};

	const response = await $.ajax('/inference',{
	    data: JSON.stringify(data),
	    method: "post",
	    contentType: "application/json"
	});
	console.log(response);
	$('#mpg').val(response.prediction);
    });
    $('#scatter-button').click(async function(){
	console.log("scatter button clicked");
	const response = await $.ajax('/plot');
	console.log(response);
	const mpg = response.map(a=>a[0]);
	const weight = response.map(a=>a[1]);

	const trace = [{
	    x:weight,
	    y:mpg,
	    mode:'markers',
	    type:'scatter'
	}];
	const layout = {
	    xaxis: {
		title:'Weight'
	    },
	    yaxis: {
		title:"mpg"
	    },
	    title: "weight vs mpg",
	    width: 700,
	    height: 300
	};
	Plotly.plot($('#graph1')[0], trace, layout);
    });

    
    $('#hist-button').click(async function(){
	console.log("hist button clicked");
	const response = await $.ajax('/hist');
	console.log(response);
	const mpg = response.map(a=>a[0]);
	const weight = response.map(a=>a[1]);

	const trace = [{
	    x:weight,
	    y:mpg,
	    mode:'markers',
	    type:'histogram'
	}];
	const layout = {
	    xaxis: {
		title:'Weight'
	    },
	    yaxis: {
		title:"mpg"
	    },
	    title: "weight vs mpg",
	    width: 700,
	    height: 300
	};
	Plotly.plot($('#graph2')[0], trace, layout);
    });
});

