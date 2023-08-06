// these functions will be executed on the content_consumption collection
// to produce a reduced collection to reports content consumption

// This is here 'cause is pretty shit to write js code inside a """big"""
// python string.

// Please, do not mess with the // ... function ... and // end ... comments, they
// are used in the regexes to get this js code. Thanks.

// map function
mapf = function(){
  // date is a date time only with yyyy-mm-dd, no HH:MM:SS, or better said,
  // 00:00:00 for everybody!
  var date = ISODate(this.inclusion_date.toISOString().split('T')[0]);
  emit({'content': this.content, 'date': date}, 1);
}
// end map function

// reduce function
reducef = function(key, values){
  return Array.sum(values);
}
// end reduce function
