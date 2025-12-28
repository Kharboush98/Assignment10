var tabs = document.querySelectorAll(".tab");
var sections = document.querySelectorAll("section");

var themeBtn = document.getElementById("theme-toggle-button");
const html = document.documentElement;

var scrollBtn = document.getElementById("scroll-to-top");

var settingsToggle = document.getElementById("settings-toggle");
var settingsSidebar = document.getElementById("settings-sidebar");
var closeBtn = document.getElementById("close-settings");

var fontButtons = document.querySelectorAll(".font-option");
var colorButtons = document.querySelectorAll(".color-option");

var filterButtons = document.querySelectorAll(".portfolio-filter");
var portfolioItems = document.querySelectorAll(".portfolio-item");


var carousel = document.getElementById("testimonials-carousel");
var cards = document.querySelectorAll(".testimonial-card");
var nextBtn = document.getElementById("next-testimonial");
var prevBtn = document.getElementById("prev-testimonial");

//--------------------- Navbar Tabs
tabs[0].className += " active";
let currentSection = 'hero-section';

window.addEventListener("scroll" , ()=> {
    sections.forEach(element => {
        if(window.scrollY >= element.offsetTop - 100){
            currentSection = element.id;
        }
    });

    tabs.forEach(navElement => {
        if(navElement.href.includes(currentSection))
        {
            document.querySelector('.active').classList.remove('active');
            navElement.classList.add('active');
        }
    });

    // if (window.scrollY > 300) {
    //     scrollBtn.classList.remove("invisible");
    //     scrollBtn.classList.add("opacity-100");
    // } else {
    //     scrollBtn.classList.add("invisible");
    //     scrollBtn.classList.remove("opacity-100");
    // }
})


//--------------------- Page Theme
themeBtn.addEventListener("click", () => {
    html.classList.toggle("dark");
});


//---------------------- Top of the buttton
window.addEventListener("scroll", () => {
    //Make the button appear when its not the main section
    if (window.scrollY > 300) {
        scrollBtn.classList.remove("invisible");
        scrollBtn.classList.add("opacity-100");
    } else {
        scrollBtn.classList.add("invisible");
        scrollBtn.classList.remove("opacity-100");
    }
});

// Scroll when clicked
scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});


//---------------------- settings
let isOpen;

function OpenSettings(value)
{
    if(isOpen === null)
    {
        isOpen = false
    } else {
        isOpen = value;
    }

    settingsSidebar.classList.toggle("translate-x-full", !isOpen);
    settingsToggle.classList.toggle("translate-x-full", isOpen);
}

settingsToggle.addEventListener("click", () => OpenSettings(true));
closeBtn.addEventListener("click", () => OpenSettings(false));

//fonts
fontButtons[1].classList.add("active");

fontButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const selectedFont = btn.dataset.font; 
        document.body.style.fontFamily = selectedFont;

        fontButtons.forEach(allBtns => {
            allBtns.classList.remove("active");
        });

        btn.classList.add("active");
    });
});

//Colors
let selectedColor;

selectedColor = colorButtons[0].dataset.color;
setColor(selectedColor);

colorButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        selectedColor = btn.dataset.color;

        setColor(selectedColor);
    });
});

function setColor(selectedColor)
{
    document.documentElement.style.setProperty('--color-primary', selectedColor);
    document.documentElement.style.setProperty('--color-secondary', selectedColor);
    document.documentElement.style.setProperty('--color-accent', selectedColor);
}

//------------------ portfolio
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
    const filter = button.dataset.filter;

    filterButtons.forEach(btn => {
      btn.classList.remove("active");
    });
    button.classList.add("active");

    
    filterButtons.forEach(btn => {
      btn.classList.remove("active");

      //add basic btns class attributes
      btn.classList.add("bg-white", "text-slate-600", "dark:bg-slate-800", "dark:text-slate-300", "border", "border-slate-300", "dark:border-slate-700");
      //remove Higlited btns class attributes
      btn.classList.remove("bg-linear-to-r", "from-primary", "to-secondary", "text-white");
    });

    button.classList.add("active");
    button.classList.remove("bg-white", "text-slate-600", "dark:bg-slate-800", "dark:text-slate-300", "border", "border-slate-300", "dark:border-slate-700");
    button.classList.add("bg-linear-to-r", "from-primary", "to-secondary", "text-white");

    // fade out all
    portfolioItems.forEach(item => {
        item.style.opacity = "0";
        item.style.transform = "scale(0.5)";
    });

    // Only show correct Items
    setTimeout(() => {
        portfolioItems.forEach(item => {
            if (filter === "all" || item.dataset.category === filter) {
                // item.classList.add("block");
                item.style.display = "block";
                
                item.style.opacity = "1";
                item.style.transform = "scale(1)";
            } 
            else {
                item.style.display = "none";
            }
        });

    }, 300);
  });
});


// ---------------- CAROUSEL
let currentIndex = 0;
const visibleCards = 3;

function updateCarousel() {
    const cardWidth = cards[0].offsetWidth;
    carousel.style.transform = `translateX(${currentIndex * cardWidth}px)`;
}

nextBtn.addEventListener("click", () => {
    currentIndex++;
    if (currentIndex > cards.length - visibleCards) {
        currentIndex = 0; // go to the start
    }
    updateCarousel();
});

prevBtn.addEventListener("click", () => {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = 3; //go back to the end
    }
    updateCarousel();
});