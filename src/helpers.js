export function compareTitles( a, b ) {
  if ( a.title < b.title ){
    return -1;
  }
  if ( a.title > b.title ){
    return 1;
  }
  return 0;
}

export function convertDate( date ) {
  if(!date) {
    return null;
  }
  return new Date(date).toLocaleString('uk-UA', {day:'numeric', month:'long', year:'numeric', weekday:'long', hour:'2-digit', minute:'2-digit', second: '2-digit'});
}