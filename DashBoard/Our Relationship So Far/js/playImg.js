var btn = document.getElementById("heartTxt");
btn.style.opacity = 0;
var btnVal = 0;
var flag = 0;
var t = 0;
var showImageInterval, imgInterval, buttonInterval;

// The following variables are assumed to be defined in the HTML file
// var imageArray, txtArray, imageIndex;

// Ensure they exist before proceeding
if (typeof imageArray === "undefined" || typeof txtArray === "undefined" || typeof imageIndex === "undefined") {
    console.error("Error: imageArray, txtArray, or imageIndex is not defined in HTML.");
}

// Preload images and store them
var preloadedImages = [];

function preloadImages() {
    for (let i = 0; i < imageArray.length; i++) {
        let img = new Image();
        img.src = imageArray[i];

        // Store preloaded images for fast access
        preloadedImages[i] = img;
    }
}

// Preload images once the page loads
preloadImages();

function showImage() {
    if (preloadedImages[imageIndex]) {
		myTxt.innerHTML = txtArray[imageIndex];
        myImage.setAttribute("src", preloadedImages[imageIndex].src);
    }

    imageIndex = (imageIndex + 1) % imageArray.length; // Loop back to the start
}

function play() {
    if (t === 0) {  // Only run the first time the button is clicked
        myImage.setAttribute("src", "");
        myTxt.innerHTML = "";
        imageIndex = 0;
        clearInterval(showImageInterval);

        showImageInterval = setInterval(showImage, 7500); // Start the image loop
        t = 1;  // Prevents multiple clicks from resetting it
    }

    flag = 1 - flag;
    document.getElementById("typeDiv").style.opacity = flag;
    document.getElementById("imgTxt").style.opacity = 1 - flag;
}

function preshowImage() {
    document.getElementById("imgTxt").style.opacity = 0;
    if (preloadedImages[imageIndex]) {
        myImage.setAttribute("src", preloadedImages[imageIndex].src);
        myTxt.innerHTML = txtArray[imageIndex];
    }
    imageIndex = (imageIndex + 1) % imageArray.length;
}

function buttonFadeIn() {
    if (btnVal < 1) {
        btnVal += 0.025;
        btn.style.opacity = btnVal;
    } else {
        clearInterval(buttonInterval);
        if (ok === 3) {
            ok += 1;
        }
    }
}

function event() {
    showImageInterval = setInterval(preshowImage, 100);

    imgInterval = setInterval(function () {
        if (ok === 3) {
            setTimeout(function () {
                buttonInterval = setInterval(buttonFadeIn, 50);
            }, 1500);
            clearInterval(imgInterval);
        }
    }, 50);
}

// Run event function when the page loads
event();
