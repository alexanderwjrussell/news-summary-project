var xhr = new XMLHttpRequest();
xhr.open('GET', "http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/search?order-by=newest&api-key=test?show-fields=body", true);
xhr.send();

xhr.onreadystatechange = processRequest;

function processRequest(e) {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var response = JSON.parse(xhr.responseText);
    console.log(response);
  }
}
