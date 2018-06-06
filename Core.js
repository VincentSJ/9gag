//------------------------------------------------//
// Functions
function DOM(el) { // Convert each mutation to array of elements
    var oPosts = el.getElementsByTagName('article');
    var aPosts = Array.from(oPosts);
    return aPosts;
  }

function getVideoLinks(post) { // Get link for VIDEO and GIFs
  var sources = post.getElementsByTagName('source');
  var links = [];
  for ( var i = 0; i < sources.length; i++ ) {
    links.push(sources[i].getAttribute('src'))
  }
  return links[1]; // We need only mp4's link
}


function getImageLink(post) { // Get link for IMG
  var link = post.getElementsByTagName('img')[0].getAttribute('src');
  return link;
}

function addLink(post, src) { // Adding input with direct link
  var btn = document.createElement('input');
  btn.setAttribute('onclick', 'this.select()');
  btn.setAttribute('readonly', true);
  btn.value = src;
  post.getElementsByTagName('header')[0].appendChild(btn);
}

function checkType(post) { // Checking type of post: img/video/dif
  if (post.getElementsByTagName('video').length != 0) {   
    addLink(post, getVideoLinks(post));
  } else if (post.getElementsByTagName('picture').lenght != 0) {
    addLink(post, getImageLink(post));
  }
}

// Initialising first array of elements
var oPosts = document.getElementsByTagName('article');
var aPosts = Array.from(oPosts);

// First init on strat
aPosts.filter(checkType);

//------------------------------------------------//
// Per mutation init

var observer = new MutationObserver(function(mutations) {
	mutations.forEach(function(mutation) {
		DOM(mutations[0].addedNodes[0]).filter(checkType)
	});    
});

var observerConfig = {
	attributes: false, 
	childList: true, 
	characterData: false 
};

var targetNode = document.getElementById('list-view-2');
observer.observe(targetNode, observerConfig);