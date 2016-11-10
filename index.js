var xhr = new XMLHttpRequest();
xhr.open('GET', "http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/politics/blog/2014/feb/17/alex-salmond-speech-first-minister-scottish-independence-eu-currency-live?show-fields=body", true);
xhr.send();

xhr.onreadystatechange = processRequest;

function processRequest (e) {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var response = JSON.parse(xhr.responseText);
    console.log(response.content.webTitle);
  }
}
