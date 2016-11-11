function getHeadlines() {
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
}

function getSummary() {
  var xhr2 = new XMLHttpRequest();
  xhr2.open('GET', "http://news-summary-api.herokuapp.com/aylien?apiRequestUrl=https://api.aylien.com/api/v1/summarize?url=https://www.theguardian.com/film/2016/nov/11/robert-redford-says-he-will-retire-from-acting-after-two-more-films", true);
  xhr2.send();

  xhr2.onreadystatechange = showSummary;

  function showSummary(e) {
    if(xhr2.readyState == 4 && xhr2.status == 200) {
      var response = JSON.parse(xhr2.responseText);
      var array = response.sentences.join(" ");
      document.getElementById('summary').innerHTML = array;
    }
  }
}

getHeadlines();
getSummary();
