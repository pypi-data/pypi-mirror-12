// these functions will be executed on the content_consumption collection
// to produce a reduced collection to reports about themes and sites
// consumption.

// This is here 'cause is pretty shit to write js code inside a """big"""
// python string.

// Please, do not mess with the // map ... and // end ... comments, they
// are used in the regexes to get this js code. Thanks.

// map function
mapf = function(){
  // date is a date time only with yyyy-mm-dd, no HH:MM:SS, or better said,
  // 00:00:00 for everybody!
  var date = ISODate(this.inclusion_date.toISOString().split('T')[0]);
  var origin = this.origin;

  if(!this.themes){
    emit({'theme': null, site: origin, 'date': date}, 1)
  }
  else{
    this.themes.forEach(function(theme){
      emit({'theme': theme, 'site': origin, 'date': date}, 1);
    });
  }
}
// end map function

// reduce function
reducef = function(key, values){
  return Array.sum(values);
}
// end reduce function
