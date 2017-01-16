(function() {
	//window.onload = Exercise.init();
	
	function Employee(age,weight,salary){
		this.age = age;
		this.weight = weight;
		this.salary = salary;
	}
	Employee.prototype = Object.create(Exercise);
	
	window.onload = Employee.prototype.init();	
})();