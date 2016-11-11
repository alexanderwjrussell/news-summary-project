var xhr = new XMLHttpRequest();
xhr.open('GET', "http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/search?order-by=newest&api-key=test?show-fields=body", true);
xhr.send();

xhr.onreadystatechange = listHeadlines;

function listHeadlines(e) {
  if (xhr.readyState == 4 && xhr.status == 200) {
    var response = JSON.parse(xhr.responseText);
    console.log(response);
    var array = response.response.results;

    var headlinesListView = new HeadlinesListView(array);
    document.getElementById('headlines').innerHTML = headlinesListView.getHTML();
  }
}
