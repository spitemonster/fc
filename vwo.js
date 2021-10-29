// if there is no reference to fc_executed, create one and set it to false
if (!window.fc_executed) {
  window.fc_executed = false;
}

/**
 * wait until the dom is ready to be run and then run passed function
 * @param  {function} fn function to be run when page is ready
 */
function domReady(fn) {
  window.addEventListener('DOMContentLoaded', fn);

  if (document.readyState == 'complete' || document.readyState == 'interactive') {
    fn();
  }
}

/**
 * create lightbox using default template
 * @param  {string} id id attribute to be attached to new lightbox
 * @param  {HTMLstring} innerHTML inner HTML content of new lightbox
 */
function makeLightbox(id, innerHTML) {
  let lb = document.createElement('div');
  lb.id = id;
  lb.classList.add('fc-hide');
  lb.innerHTML = innerHTML;
  document.body.append(lb);
}

/**
 * await an async element being loaded into the page and then run passed function with returned element as parameter
 * @param  {string} sel CSS selector of target element
 * @param  {function} fn function to be run on target element
 */
function awaitThenModifyElement(sel, fn) {
  let el = document.querySelector(sel);

  if (el) {
    return fn(el);
  } else {
    let interval = setInterval(() => {
      el = document.querySelector(sel);
      
      if (el) {
        clearInterval(interval);
        fn(el);
      }
    }, 64)
  }
}

/**
 * immediately queires DOM for single selector and runs passed function on found element. optionally logs on el not found.
 * @param  {string} sel CSS selector of target element
 * @param  {function} fn function to be run on target element
 * @param  {bool} log should log on el not found?
 */
function selectAndModifyElement(sel, fn, log) {
  let el = document.querySelector(sel);

  if (el) {
    fn(el);
  } else if (log) {
    console.log(`Selector: ${sel} not found`);
  }
}

/**
 * immediately queires DOM for selector(s) and runs passed function on all selected elements. optionally logs on el not found.
 * @param  {string} sel CSS selector of target element(s)
 * @param  {function} fn function to be run on each returned element
 * @param  {bool} log should log on el not found?
 */
function selectAndModifyAll(sel, fn, log) {
  let el = document.querySelectorAll(sel);

  if (el) {
    fn(el);
  } else if (log) {
    console.log(`Selector: ${sel} not found`);
  }
}

function main() {
  if (window.fc_executed) {
    return;
  }

  // set this to true to prevent the same code from running multiple times on the same page
  window.fc_executed = true;

  console.log('fc executed');

  // set up functionality to dynamically hide full story and quality matters links
  window.addEventListener('click', (e) => {
    let t = e.target;
    if (t.classList.contains('fc-fs') && !window.fc_fs) {
      let fsBtns = document.querySelectorAll('.fc-fs');

      // we prevent any fs buttons from being created after this has been run
      window.fc_fs = true;

      fsBtns.forEach((s) => {
        if (s != t) {
          s.parentElement.classList.add('fc-hide');
        }
      })
    }

    if (t.classList.contains('fc-qm') && !window.fc_qm) {
      
      let qmBtns = document.querySelectorAll('.fc-qm');

      // we prevent any qm buttons from being created after this has been run
      window.fc_qm = true;

      qmBtns.forEach((m) => {
        if (m != t) {
          m.parentElement.classList.add('fc-hide');
        }
      })
    }

  })
  
}

domReady(main);

vwo_$.getScript( "https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.js" , function ( data, textStatus, jqxhr ) {
 $.fancybox.defaults.touch = false; 
 $.fancybox.defaults.autoFocus = false;
});

vwo_$('head').append('<link rel="stylesheet" class="external-css-link" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.7/jquery.fancybox.min.css">');
