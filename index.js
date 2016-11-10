
var urlArray = [];

function getHeadlines() {

  var xhr = new XMLHttpRequest();
  xhr.open('GET', "http://news-summary-api.herokuapp.com/guardian?apiRequestUrl=http://content.guardianapis.com/search?section=politics&order-by=newest?show-fields=body", true);
  xhr.send();

  xhr.onreadystatechange = listHeadlines;

  function listHeadlines(e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var response = JSON.parse(xhr.responseText);
      console.log(response);
      var array = response.response.results;

      var headlinesListView = new HeadlinesListView(array);
      document.getElementById("content").innerHTML = headlinesListView.getHTML();

      for( var i = 0; i < array.length; i++) {
        urlArray.push(array[i].webUrl);
      }
      console.log(urlArray);
      return urlArray;
    }
  }
}

changeSummary();

function changeSummary() {
  window.addEventListener("hashchange", showSummaryOnPage);
};

function getURL() {
  return urlArray[getNumberFromURL()];
}

function getNumberFromURL() {
  return window.location.hash.split("#summary/")[1];
};

function showSummaryOnPage() {
  getSummary(getURL());
}


function getSummary(url) {

  var xhrsummary = new XMLHttpRequest();
  xhrsummary.open('GET', "http://news-summary-api.herokuapp.com/aylien?apiRequestUrl=https://api.aylien.com/api/v1/summarize?url=" + url, true);
  xhrsummary.send();

  xhrsummary.onreadystatechange = summarizeHeadline;

  function summarizeHeadline(e) {
    if (xhrsummary.readyState == 4 && xhrsummary.status == 200) {
      var response = JSON.parse(xhrsummary.responseText);
      var summary = response.sentences.join(' ');
      document.getElementById("summary").innerHTML = summary;
    }
  }
}

getHeadlines();
