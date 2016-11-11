var urlArray = [];
var thumbArray = [];

function getHeadlines() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', "http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/search?show-fields=thumbnail&order-by=newest&api-key=test", true);
  xhr.send();

  xhr.onreadystatechange = listHeadlines;

  function listHeadlines(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      console.log(response);
      var array = response.response.results;

      var headlinesListView = new HeadlinesListView(array);
      document.getElementById('headlines').innerHTML = headlinesListView.getHTML();

      for( var i = 0; i < array.length; i++) {
        urlArray.push(array[i].webUrl);
        thumbArray.push(array[i].fields.thumbnail);
      }
      console.log(urlArray);
      console.log(thumbArray);
      return urlArray;
    }
  }
}

changeSummary();

function changeSummary() {
  window.addEventListener("hashchange", showSummaryOnPage);
}

function getURL() {
  return urlArray[getNumberFromURL()];
}

function getNumberFromURL() {
  return window.location.hash.split("#summary/")[1];
}

function showSummaryOnPage() {
  getSummary(getURL());
}

function getSummary(url) {
  var xhr2 = new XMLHttpRequest();
  xhr2.open('GET', "http://news-summary-api.herokuapp.com/aylien?apiRequestUrl=https://api.aylien.com/api/v1/summarize?url=" + url, true);
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
