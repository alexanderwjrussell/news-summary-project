
function getHeadlines() {

  var urlArray = [];
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
      getURL(urlArray);
    }
  }
}

function getURL(urlArray) {
  getSummary(url);
}

function getSummary(url) {

  var xhrsummary = new XMLHttpRequest();
  xhrsummary.open('GET', "http://news-summary-api.herokuapp.com/aylien?apiRequestUrl=https://api.aylien.com/api/v1/summarize?url=" + url, true);
  xhrsummary.send();

  xhrsummary.onreadystatechange = summarizeHeadline;

  function summarizeHeadline(e) {
    if (xhrsummary.readyState == 4 && xhrsummary.status == 200) {
      var response = JSON.parse(xhrsummary.responseText);
      summaryArray.push(response.text);
    }
  }
  console.log(summaryArray);
  return summaryArray;
}

getHeadlines();
