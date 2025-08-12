// Thumbnail change
document.querySelectorAll('.thumb-btn').forEach(button => {
    button.addEventListener('click', function () {
        document.getElementById('beforeImage').src = this.dataset.before;
        document.getElementById('afterImage').src = this.dataset.after;
        // document.querySelector('.info-text').textContent = this.dataset.text;
    });
});

// Before/After slider drag
const afterImage = document.getElementById('afterImage');
const handle = document.getElementById('sliderHandle');
const container = document.querySelector('.before-after-container');

let isDragging = false;

function updateSlider(x) {
    const rect = container.getBoundingClientRect();
    let offsetX = x - rect.left;
    offsetX = Math.max(0, Math.min(offsetX, rect.width));
    const percent = (offsetX / rect.width) * 100;

    afterImage.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
    handle.style.left = `${percent}%`;
};

handle.addEventListener('mousedown', () => isDragging = true);
window.addEventListener('mouseup', () => isDragging = false);
window.addEventListener('mousemove', e => {
    if (isDragging) updateSlider(e.clientX);
});

handle.addEventListener('touchstart', () => isDragging = true);
window.addEventListener('touchend', () => isDragging = false);
window.addEventListener('touchmove', e => {
    if (isDragging) updateSlider(e.touches[0].clientX);
});

// Thumbnail carousel scroll
const thumbWrapper = document.querySelector('.thumbnails');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let scrollPosition = 0;
const scrollAmount = 160; // kayma miktarı
const wrapperWidth = document.querySelector('.thumb-wrapper').offsetWidth;
const totalWidth = thumbWrapper.scrollWidth;

// Başlangıçta kontrol et
checkButtons();

nextBtn.addEventListener('click', () => {
    if (Math.abs(scrollPosition) + wrapperWidth < totalWidth) {
        scrollPosition -= scrollAmount;
        if (Math.abs(scrollPosition) + wrapperWidth > totalWidth) {
            scrollPosition = -(totalWidth - wrapperWidth);
        }
        thumbWrapper.style.transform = `translateX(${scrollPosition}px)`;
        checkButtons();
    }
});

prevBtn.addEventListener('click', () => {
    if (scrollPosition < 0) {
        scrollPosition += scrollAmount;
        if (scrollPosition > 0) scrollPosition = 0;
        thumbWrapper.style.transform = `translateX(${scrollPosition}px)`;
        checkButtons();
    }
});

function checkButtons() {
    // Sol başta mıyız?
    if (scrollPosition >= 0) {
        prevBtn.disabled = true;
    } else {
        prevBtn.disabled = false;
    }

    // Sağda son resimde miyiz?
    if (Math.abs(scrollPosition) + wrapperWidth >= totalWidth) {
        nextBtn.disabled = true;
    } else {
        nextBtn.disabled = false;
    }
}