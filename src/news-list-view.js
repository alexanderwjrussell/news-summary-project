(function(exports) {
  function HeadlinesListView(list){
    this.list = list;
  }

  HeadlinesListView.prototype.getHTML = function () {
    var arrayLength = this.list.length;
    if(arrayLength === 0) {
      var htmlOutput = "";
    } else {
      var htmlOutput = "<ul>";
      for (var i = 0; i < arrayLength; i++) {
        htmlOutput += "<li><div>" + this.list[i].webTitle + "</div></li>";
      }
    htmlOutput += "</ul>";
    }
    return htmlOutput;
  };

  exports.HeadlinesListView = HeadlinesListView;
  
})(this);
