// check if there is local storage color option
let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color_option")
  );

  // remove active class from all Colors list item
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");

    // add active class on element with data color === local storage item
    if (element.dataset.color === mainColors) {
      // add active class
      element.classList.add("active");
    }
  });
}

// random background option
let backgroundOption = true;

// Variable To Control The Interval
let backgroundInterval;

// check if there is local storage random background item
let backgroundLocalItem = localStorage.getItem("background-option");

// check if random background local storage is not empty
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
  } else {
    backgroundOption = false;
  }

  // remove active class from all spans
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });

  if (backgroundLocalItem === "true") {
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

// toggle open class on settings-box
document.querySelector(".toogle-seetings .fa-gear").onclick = function () {
  this.classList.toggle("spin");

  document.querySelector(".settings-box").classList.toggle("open");
};

// SWITCH COLORS
const colorsLi = document.querySelectorAll(".colors-list li");

// LOOP ON ALL LIST ITEMS
colorsLi.forEach((li) => {
  // CLICK ON EVERY LIST ITEMS
  li.addEventListener("click", (e) => {
    console.log(e.target.dataset.color);

    // SET COLOR ON ROOT
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );

    // set color on local storge
    localStorage.setItem("color_option", e.target.dataset.color);

    handleActive(e);
  });
});

// SWITCH BACKGROUND RANDOM OPTION
const randomBackEl = document.querySelectorAll(".random-backgrounds span");

// LOOP ON ALL Spans
randomBackEl.forEach((span) => {
  // CLICK ON EVERY SPAN
  span.addEventListener("click", (e) => {
    console.log(e.target.dataset.color);

    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImags();
      localStorage.setItem("background-option", true);
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background-option", false);
    }
  });
});

// Select landing page element
let landingPage = document.querySelector(".landing-page");

// Get array of images
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Function To Randomize Images
function randomizeImags() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // get random number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      // Change bacjground image url
      landingPage.style.backgroundImage =
        'url("imgs/' + imgsArray[randomNumber] + '")';
    }, 10000);
  }
}

randomizeImags();

// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // skills offset top
  let skillsOffsetTop = ourSkills.offsetTop;

  // Skills Outer Height
  let skillsOuterHeight = ourSkills.offsetHeight;

  // Window Height
  let windowHeight = this.innerHeight;

  // Window ScrollTop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }

  console.log(skillsOffsetTop);
};

// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((image) => {
  image.addEventListener("click", (e) => {
    // Create Overlay Element
    let overLay = document.createElement("div");

    // Add Class To Overlay
    overLay.className = "popup-overlay";

    // Append Overlay To The Body
    document.body.appendChild(overLay);

    // Create The Popup Box
    let popupBox = document.createElement("div");

    // Add Class To The Popup Box
    popupBox.className = "popup-box";

    if (image.alt !== null) {
      // Create Heading
      let imgHeading = document.createElement("h3");

      // Create Text For Heading
      let imgText = document.createTextNode(image.alt);

      // Append The Text To The Heading
      imgHeading.appendChild(imgText);

      // Append The Heading To The Popup Box
      popupBox.appendChild(imgHeading);
    }

    // Create The Image
    let popupImage = document.createElement("img");

    // Set Image Source
    popupImage.src = image.src;

    // Add Image To Popup Box
    popupBox.appendChild(popupImage);

    // Append The Popup Box To Body
    document.body.appendChild(popupBox);

    // Create The Close Span
    let closeButton = document.createElement("span");

    // Create The CloseButton Text
    let closeButtonText = document.createTextNode("X");

    // Append Text To Close Button
    closeButton.appendChild(closeButtonText);

    // Add Class To Close Button
    closeButton.className = "close-button";

    // Add CloseButton To The Popup Box
    popupBox.appendChild(closeButton);
  });
});

// Close Popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    // Remove The Current Popup
    e.target.parentNode.remove();

    // Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Select All Bullets
const allBullets = document.querySelectorAll(".nav-bullets .bullet");

allBullets.forEach((bullet) => {
  bullet.addEventListener("click", (e) => {
    document.querySelector(e.target.dataset.section).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Handle Active State
function handleActive(ev) {
  // remove active class from all spans
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });

  // add active class on target
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets-option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets-option", "none");
    }

    handleActive(e);
  });
});

// Reset Button
document.querySelector(".reset-options").onclick = function () {
  localStorage.clear();
  // localStorage.removeItem("bullets-option");
  // localStorage.removeItem("color-option");
  // localStorage.removeItem("background-option");

  // Reload Window
  window.location.reload();
};

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  // Stop Propagation
  e.stopPropagation();

  // Toggle Class "menu-active" On Button
  this.classList.toggle("menu-active");

  // Toggle Class "open" On Links
  tLinks.classList.toggle("open");
};

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    // Check If Menu Is Open
    if (tLinks.classList.contains("open")) {
      // Toggle Class "menu-active" On Button
      toggleBtn.classList.toggle("menu-active");

      // Toggle Class "open" On Links
      tLinks.classList.toggle("open");
    }
  }
});

// Stop Propagation On Menu
tLinks.onclick = function (e) {
  e.stopPropagation();
};
