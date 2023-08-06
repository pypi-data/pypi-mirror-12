// these functions will be executed on the content_consumption collection
// to produce a reduced collection to reports about sites consumers.

// This is here 'cause is pretty shit to write js code inside a """big"""
// python string.

// Please, do not mess with the // map ... and // end ... comments, they
// are used in the regexes to get this js code. Thanks.

// map function
mapf = function(){
  // date is a date time only with yyyy-mm-dd, no HH:MM:SS, or better said,
  // 00:00:00 for everybody!
  var date = ISODate(this.inclusion_date.toISOString().split('T')[0]);
  var consumer = this.consumer;
  emit({'site': this.origin, 'date': date}, consumer);
}
// end map function

// reduce function
reducef = function(key, values){
  var reduced = [];

  values.forEach(function(value){
    if(reduced.indexOf(value.toString()) < 0){
      reduced.push(value.toString());
    }
  });

  return reduced.length;
}
// end reduce function

// finalize function
finalizef = function(key, value){
  if(typeof(value) == 'object'){
    return 1;
  }
  else{
    return value;
  }
}
// end finalize function
