var dropBox = document.getElementById('dropbox');
var allowed = ["jpeg", "png"];
var thumbSize = 150;

function processImage(files) {
  // Check number of files
  if (files.length) {
    document.getElementById('dropplace').innerHTML = 'Processing'
  }
  for (var i = 0; i < files.length; i++) {
    var file = files[i];
    var found = false;
      // Check allowed extenions
      allowed.forEach(function(extension) {
        if (file.type.match('image/' + extension)) {
          found = true;
        }
      })
    // If found not allowed then return information
    if (!found) {
      document.getElementById('dropplace').innerHTML = file.name + ' is not an image.';
      return;
    }
    // else read image
    var reader = new FileReader();
    reader.onloadend = onReaderLoadEnd;
    reader.readAsDataURL(file);
  }
}
function onReaderLoadEnd(event) {
  // get img path
  var imgPath = event.target.result;
  var myCan = document.createElement('canvas');
  var img = new Image();
  img.src = imgPath;

  img.onload = function () {
    // get img size
    myCan.id = "TempCanvas";;
    myCan.width = thumbSize;
    myCan.height = thumbSize;

    if (myCan.getContext) {
      // get img url
      var cntxt = myCan.getContext("2d");
      cntxt.drawImage(img, 0, 0, myCan.width, myCan.height);
      var dataURL = myCan.toDataURL();

      if (dataURL != null || dataURL != undefined) {
        // we have data so set attributes
        var a = document.createElement('a');
        a.href = imgPath;
        a.target = '_blank';
        var nImg = document.createElement('img');
        nImg.src = dataURL;
        a.appendChild(nImg);
        document.body.appendChild(a);
        document.getElementById('dropplace').innerHTML = 'Finsh!';
      }
      else {
        document.getElementById('dropplace').innerHTML = 'Unable to get data';
      }
    }
  }
}

var dropListener = {
  handleEvent: function(event){
    if (event.type === 'dragenter') { this.onDragEnter(event); }
    if (event.type === 'dragexit') { this.onDragExit(event); }
    if (event.type === 'dragover') { this.onDragOver(event); }
    if (event.type === 'drop') { this.onDragDrop(event); }
  },
  onDragEnter: function(event){
    event.preventDefault();
    event.stopPropagation();
  },
  onDragExit: function(event){
    event.preventDefault();
    event.stopPropagation();
  },
  onDragOver: function(event){
    event.preventDefault();
    event.stopPropagation();
  },
  onDragDrop: function(event){
    event.preventDefault();
    event.stopPropagation();
    // on drop read files
    processImage(event.dataTransfer.files);
  },
};

var events = ["dragenter", "dragexit", "dragover", "drop"];
// set listeners for drag and drop
for (var i=0; i < events.length; i++) {
  (function () {
    dropBox.addEventListener(events[i], dropListener, false);
  }())
}
