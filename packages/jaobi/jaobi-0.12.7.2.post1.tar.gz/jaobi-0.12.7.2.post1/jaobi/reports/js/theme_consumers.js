// these functions will be executed on the content_consumption collection
// to produce a reduced collection to reports about themes consumers.

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
  this.themes.forEach(function(theme){
    emit({'theme': theme, 'date': date}, consumer.toString());
  });
}
// end map function

// reduce function
reducef = function(key, values){
  var reduced = [];
  var to_sum = []

  values.forEach(function(value){
    if(reduced.indexOf(value) < 0){
      reduced.push(value);
      to_sum.push(1)
    }
  });

  return Array.sum(to_sum);
}
// end reduce function

// finalize function
finalizef = function(key, value){
  if(typeof(value) != 'number'){
    return 1;
  }
  else{
    return value;
  }
}
// end finalize function
