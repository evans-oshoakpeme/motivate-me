const input = document.getElementById("name");
let myName;
const openButton = document.getElementById("alertButton");
const popup = document.getElementById("customAlert");
const closeButton = document.getElementById("closeAlert");
const alertMessage =document.getElementById("alertMessage");

input.addEventListener("input", function(event) {
  myName = event.target.value;
});

openButton.addEventListener("click", async function () {
  openButton.disabled = true; // Disable the button to prevent multiple clicks
  openButton.textContent = "Generating..."; // Change button text to indicate loading

  try {
    const response = await fetch("/api/quote");
    const data = await response.json();
    if (data.quote && myName) {
      alertMessage.textContent = myName + ", " + data.quote;
    } else if (!myName) {
      alertMessage.textContent = "Input your name to generate a quote";
    }else {
      alertMessage.textContent = "Sorry, we couldn't generate a quote at this time. Please try again later.";
    }
  } catch (error) {
    console.error("Error fetching quote:", error);
    alertMessage.textContent = "Sorry, we couldn't connect to the server. Please try again later.";
  }finally {
    openButton.disabled = false;
    openButton.textContent = "Motivate Me"; // Reset button text
  }

  popup.showModal();
});

closeButton.onclick = function() {
  popup.close();
};

popup.onclick =function(event) {
  if(event.target === popup) {
    popup.close();
  }
};

const copyButton = document.getElementById("copyQuote");
copyButton.addEventListener("click", function() {
  const textToCopy = alertMessage.textContent;
  
  try {
    navigator.clipboard.writeText(textToCopy);
    setTimeout(() => {
      alert("Quote copied to clipboard!");
    }, 1000);
  } catch (error) {
    console.error("Error copying text to clipboard:", error);
  }

});