var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.visibility = "visible";
  x[n].style.opacity = "1";
  // x[n].style.height = "auto";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").style.visibility = "hidden";

    // document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
    document.getElementById("nextBtn").style.visibility = "visible";
  }
  // push the buttons by -150px value to bottom when tab index is '7'
  if (n == 7 || n == 4) {
    document.querySelector('.state-buttons').style.bottom = "-100px";
  } else {
    document.querySelector('.state-buttons').style.bottom = "0px";
  }
  // ... and run a function that displays the correct step indicator:
  // fixStepIndicator(n)
}


function nextPrev(n) {
  var x = document.getElementsByClassName("tab");
  // Hide the current tab:
  x[currentTab].style.visibility = "hidden";
  x[currentTab].style.opacity = "0";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("regForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}
