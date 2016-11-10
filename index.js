
function getHeadlines() {

  var newscontent = "";
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

      newscontent = array[0].webUrl;
      getSummary(newscontent);
    }
  }


}

function getSummary(newscontent) {
  var xhrsummary = new XMLHttpRequest();
  xhrsummary.open('GET', "http://news-summary-api.herokuapp.com/aylien?apiRequestUrl=https://api.aylien.com/api/v1/summarize?url=" + newscontent, true);
  xhrsummary.send();

  xhrsummary.onreadystatechange = summarizeHeadline;

  function summarizeHeadline(e) {
    if (xhrsummary.readyState == 4 && xhrsummary.status == 200) {
      var response = JSON.parse(xhrsummary.responseText);
      document.getElementById("summary").innerHTML = response.text;
      console.log(response);
    }
  }
}

getHeadlines();
