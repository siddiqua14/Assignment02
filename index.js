const locationBtn = document.getElementById('location-btn');
const locationDisplay = document.getElementById('location-display');
const navModalOverlay = document.getElementById('nav-modal-overlay');
const closeBtn = document.getElementById('close-btn');
const regionSelectContainer = document.getElementById('region-select-container');
const currencyInput = document.getElementById('currency-input');
const saveBtn = document.getElementById('save-btn');
const navbar = document.querySelector('.navbar');

// List of regions with corresponding currencies
const regionsWithCurrencies = {
    'United States': 'USD',
    'Canada': 'CAD',
    'United Kingdom': 'GBP',
    'France': 'EUR',
    'Germany': 'EUR',
    'Portugal': 'EUR'
};

// Create and populate the select element for regions
const regionSelect = document.createElement('select');
regionSelect.id = 'region-select';
Object.keys(regionsWithCurrencies).forEach(region => {
    const option = document.createElement('option');
    option.value = region;
    option.textContent = region;
    regionSelect.appendChild(option);
});
regionSelectContainer.appendChild(regionSelect);

// Event listener for region selection to update currency
regionSelect.addEventListener('change', () => {
    const selectedRegion = regionSelect.value;
    locationDisplay.textContent = selectedRegion;
    currencyInput.value = regionsWithCurrencies[selectedRegion];
});

// Event listener to show the modal and add dimming effect to the navbar
locationBtn.addEventListener('click', () => {
    navModalOverlay.style.display = 'flex';
    navbar.classList.add('dimmed'); // Add dimmed class to navbar
});

// Event listener to close the modal and show the navbar
closeBtn.addEventListener('click', () => {
    navModalOverlay.style.display = 'none';
    navbar.style.opacity = '1';
    navbar.style.visibility = 'visible';
});

navModalOverlay.addEventListener('click', (event) => {
    if (event.target === navModalOverlay) {
        navModalOverlay.style.display = 'none';
        navbar.style.opacity = '1';
        navbar.style.visibility = 'visible';
    }
});

saveBtn.addEventListener('click', () => {
    navModalOverlay.style.display = 'none';
    navbar.style.opacity = '1';
    navbar.style.visibility = 'visible';
});

//share

document.addEventListener('DOMContentLoaded', () => {
    const shareBtn = document.querySelector('.share-btn');
    const modal = document.getElementById('shareModal');
    const customCloseBtn = document.querySelector('.custom-close-btn');
    const copyBtn = document.querySelector('.copy-btn');
    const linkText = document.querySelector('.link-text');
    const shareOptions = document.querySelectorAll('.share-option');

    // Open modal
    shareBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });

    // Close modal function
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Close modal when close button is clicked
    customCloseBtn.addEventListener('click', closeModal);

    // Close modal when clicking outside the modal content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Copy link functionality
    copyBtn.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(linkText.textContent);
            copyBtn.textContent = 'Copied!';
            copyBtn.classList.add('copied');
            setTimeout(() => {
                copyBtn.textContent = 'Copy link';
                copyBtn.classList.remove('copied');
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    });

    // Share option clicks
    shareOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.preventDefault();
            const platform = option.dataset.platform;
            const url = encodeURIComponent(linkText.textContent);
            const title = encodeURIComponent('Check out this amazing vacation home!');

            let shareUrl;
            switch (platform) {
                case 'facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                    break;
                case 'whatsapp':
                    shareUrl = `https://wa.me/?text=${encodeURIComponent(title)}%20${encodeURIComponent(url)}`;
                    break;
                case 'messenger':
                    shareUrl = `https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=YOUR_APP_ID`;
                    break;
                case 'x': // This is for Twitter (formerly known as X)
                    shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
                    break;
                case 'messages':
                    shareUrl = `sms:?&body=${encodeURIComponent(title)}%20${encodeURIComponent(url)}`;
                    break;
                default:
                    return;
            }

            if (shareUrl) {
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
});
//save
class SaveButton {
    constructor(propertyId) {
        this.propertyId = propertyId;
        this.button = document.querySelector('.save');
        this.saveText = this.button.querySelector('.desktop-only'); // Target the 'Save' text element
        this.setupEventListeners();
        this.loadSavedState();
    }

    setupEventListeners() {
        this.button.addEventListener('click', () => this.toggleSave());
    }

    loadSavedState() {
        const savedState = localStorage.getItem(`property-save-${this.propertyId}`);
        if (savedState === 'true') {
            this.button.classList.add('active');
            this.saveText.textContent = 'Saved'; // Change the text to "Saved" if already saved
        } else {
            this.saveText.textContent = 'Save'; // Ensure it's "Save" if not saved
        }
    }

    toggleSave() {
        this.button.classList.toggle('active');

        // Save state to localStorage
        const isActive = this.button.classList.contains('active');
        localStorage.setItem(`property-save-${this.propertyId}`, isActive);

        // Update the text content
        if (isActive) {
            this.saveText.textContent = 'Saved'; // Change text to "Saved"
        } else {
            this.saveText.textContent = 'Save'; // Change text back to "Save"
        }

        // Optional: Animate the button
        if (isActive) {
            this.button.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.button.style.transform = 'scale(1)';
            }, 200);
        }
    }
}

// Initialize the SaveButton with a unique property ID
const saveButton = new SaveButton('unique-property-id');


// Gallery-related code
document.addEventListener('DOMContentLoaded', () => {
    const images = [
        { url: './img/hotel.jpg', title: 'Beautiful lakefront view with private deck' },
        { url: './img/hotel1.png', title: 'Cozy cottage exterior with charming red door' },
        { url: './img/hotel2.png', title: 'Spacious living room with panoramic views' },
        { url: './img/hotel3.png', title: 'Spacious living room with panoramic views' },
        { url: './img/hotel5.jpeg', title: 'Master bedroom with ensuite' }
    ];

    let currentImageIndex = 0;
    const modal = document.getElementById('gallery-modal');
    const modalImg = document.getElementById('modal-img');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const imageTitle = document.querySelector('.image-title');
    const imageCount = document.querySelector('.image-count');
    const morePhotos = document.querySelectorAll('.more-photos');

    // Update modal image, title, and count
    function updateModalImage() {
        const image = images[currentImageIndex];
        modalImg.src = image.url;
        modalImg.alt = image.title;
        imageTitle.textContent = image.title;
        imageCount.textContent = `${currentImageIndex + 1}/${images.length}`;

        // Hide or show navigation buttons based on the current image index
        prevBtn.style.display = currentImageIndex === 0 ? 'none' : 'block';
        nextBtn.style.display = currentImageIndex === images.length - 1 ? 'none' : 'block';
    }

    // Open modal when 'See more' (desktop-more) is clicked
    morePhotos.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            currentImageIndex = 0;
            updateModalImage();
            modal.style.display = 'block';
        });
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Navigation: Prev and Next buttons
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentImageIndex > 0) {
            currentImageIndex--;
            updateModalImage();
        }
    });

    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentImageIndex < images.length - 1) {
            currentImageIndex++;
            updateModalImage();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'block') {
            if (e.key === 'ArrowLeft') {
                if (currentImageIndex > 0) {
                    currentImageIndex--;
                    updateModalImage();
                }
            } else if (e.key === 'ArrowRight') {
                if (currentImageIndex < images.length - 1) {
                    currentImageIndex++;
                    updateModalImage();
                }
            } else if (e.key === 'Escape') {
                modal.style.display = 'none';
            }
        }
    });

    // Initialize the first image on page load
    updateModalImage();
});


//booking card 
document.addEventListener('DOMContentLoaded', () => {
    const travelersToggle = document.getElementById('travelersToggle');
    const travelersContent = document.getElementById('travelersContent');
    const doneBtn = document.querySelector('.done-btn');
    const decrementBtns = document.querySelectorAll('.traveler-btn.decrement');
    const incrementBtns = document.querySelectorAll('.traveler-btn.increment');
    const travelersInput = document.querySelector('.travelers-input input');
    const totalSection = document.querySelector('.total-section');
    const bookNowBtn = document.querySelector('.book-now-btn');
    const chargeNotice = document.querySelector('.charge-notice');
    //date
    const startDate = document.getElementById('start-date');
    const endDate = document.getElementById('end-date');

    // Set min date for start date (today)
    const today = new Date().toISOString().split('T')[0];
    startDate.min = today;

    // Update end date min value when start date changes
    startDate.addEventListener('change', function () {
        endDate.min = this.value;

        // If end date is before new start date, update it
        if (endDate.value && endDate.value < this.value) {
            endDate.value = this.value;
        }
    });

    // Display selected date in a shorter format
    function formatDate(date) {
        const options = { month: 'short', day: 'numeric' };
        return new Date(date).toLocaleDateString('en-US', options);
    }

    [startDate, endDate].forEach(input => {
        input.addEventListener('change', function () {
            if (this.value) {
                const formattedDate = formatDate(this.value);
                this.setAttribute('data-formatted', formattedDate);
            }
        });
    });

    // Toggle travelers content
    travelersToggle.addEventListener('click', () => {
        travelersContent.classList.toggle('active');
        totalSection.style.display = travelersContent.classList.contains('active') ? 'none' : 'block';
        bookNowBtn.style.display = travelersContent.classList.contains('active') ? 'none' : 'block';
        chargeNotice.style.display = travelersContent.classList.contains('active') ? 'none' : 'block';
    });

    // Handle increment/decrement
    function updateCount(type, increment) {
        const countElement = document.querySelector(`.traveler-count.${type}`);
        let count = parseInt(countElement.textContent);

        if (increment) {
            count++;
        } else if (type === 'adults' && count > 1) {
            count--;
        } else if (type === 'children' && count > 0) {
            count--;
        }

        countElement.textContent = count;

        // Update total travelers
        const adultsCount = parseInt(document.querySelector('.traveler-count.adults').textContent);
        const childrenCount = parseInt(document.querySelector('.traveler-count.children').textContent);
        travelersInput.value = `${adultsCount + childrenCount} travelers`;

        // Handle disabled state for children decrement button
        const childrenDecrementBtn = document.querySelector('.traveler-btn.decrement[data-type="children"]');
        childrenDecrementBtn.classList.toggle('disabled', childrenCount === 0);

        // Save to localStorage
        saveToLocalStorage(type, count);
    }

    incrementBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            updateCount(btn.dataset.type, true);
        });
    });

    decrementBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (!btn.classList.contains('disabled')) {
                updateCount(btn.dataset.type, false);
            }
        });
    });

    // Close section on done
    doneBtn.addEventListener('click', () => {
        travelersContent.classList.remove('active');
        travelersContent.classList.remove('active');
        totalSection.style.display = 'block';
        bookNowBtn.style.display = 'block';
        chargeNotice.style.display = 'block';
    });

    // Save to localStorage
    function saveToLocalStorage(type, count) {
        localStorage.setItem(`travelers_${type}`, count);
    }

    // Load from localStorage on page load
    function loadFromLocalStorage() {
        const adultsCount = localStorage.getItem('travelers_adults') || 2;
        const childrenCount = localStorage.getItem('travelers_children') || 0;

        document.querySelector('.traveler-count.adults').textContent = adultsCount;
        document.querySelector('.traveler-count.children').textContent = childrenCount;
        travelersInput.value = `${parseInt(adultsCount) + parseInt(childrenCount)} travelers`;

        // Set initial disabled state for children decrement button
        const childrenDecrementBtn = document.querySelector('.traveler-btn.decrement[data-type="children"]');
        childrenDecrementBtn.classList.toggle('disabled', parseInt(childrenCount) === 0);
    }

    // Load saved values on page load
    loadFromLocalStorage();
});