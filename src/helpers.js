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

export function getDataByLocale( locales, locale ) {
  return locales.find((item) => {
    return item.value === locale;
  });
}

export function setCookie(name,value,days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

export function getCookie(name) {
  let nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i=0;i < ca.length;i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

export function eraseCookie(name) {   
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}