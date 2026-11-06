document.addEventListener('DOMContentLoaded', () => {
    
    // --- MOBILE NAVIGATION ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileToggle.textContent = '☰';
        });
    });

    // --- SCROLL REVEAL ANIMATIONS ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });
    
    revealElements.forEach(el => revealObserver.observe(el));

    // --- OPTIMIZED PARALLAX EFFECT ---
    const parallaxElements = document.querySelectorAll('.parallax');
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                parallaxElements.forEach(el => {
                    const speed = el.getAttribute('data-speed');
                    el.style.transform = `translate3d(-50%, calc(-50% + ${scrolled * speed}px), 0)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });

    // --- UNIVERSAL MEDIA MODAL SYSTEM ---
    const mediaModal = document.getElementById('media-modal');
    const videoWrapper = document.getElementById('video-wrapper');
    const audioWrapper = document.getElementById('audio-wrapper');
    const modalVideo = document.getElementById('modal-video');
    const modalAudio = document.getElementById('modal-audio');
    const modalBackdrop = document.querySelector('.modal-backdrop');

    function playMedia(type, src) {
        // Reset
        mediaModal.classList.remove('active');
        videoWrapper.style.display = 'none';
        audioWrapper.style.display = 'none';
        modalVideo.src = "";
        modalAudio.src = "";
        modalVideo.pause();
        modalAudio.pause();

        setTimeout(() => {
            if (type === 'video') {
                videoWrapper.style.display = 'flex';
                modalVideo.src = src;
                mediaModal.classList.add('active');
                modalVideo.play().catch(e => {
                    console.log("Autoplay blocked:", e);
                    showRoast("Browser blocked the video. Trust issues.");
                });
            } else if (type === 'audio') {
                audioWrapper.style.display = 'block';
                modalAudio.src = src;
                mediaModal.classList.add('active');
                modalAudio.play().catch(e => {
                    console.log("Autoplay blocked:", e);
                    showRoast("Browser blocked the audio. Embarrassing.");
                });
            }
        }, 50);
    }

    function closeMedia() {
        mediaModal.classList.remove('active');
        setTimeout(() => {
            modalVideo.pause();
            modalVideo.currentTime = 0;
            modalVideo.src = "";
            modalAudio.pause();
            modalAudio.currentTime = 0;
            modalAudio.src = "";
        }, 300);
    }

    modalBackdrop.addEventListener('click', closeMedia);

    modalVideo.addEventListener('ended', () => {
        closeMedia();
        showRoast("Video over. Did that help your ego? No.");
    });

    // --- ATTACH MEDIA TRIGGERS ---
    const triggers = document.querySelectorAll('.hidden-trigger');
    
    triggers.forEach(el => {
        el.addEventListener('click', function(e) {
            const src = this.getAttribute('data-media');
            const type = this.getAttribute('data-type');
            
            if (this.tagName === 'A' && this.getAttribute('href').startsWith('mailto:')) return;

            playMedia(type, src);
        });
    });

    // --- EXPLORE BUTTON ---
    document.getElementById('explore-btn').addEventListener('click', () => {
        showRoast("You want to explore my world? It's mostly just me staring at a screen.");
    });

    // --- ROAST TOAST SYSTEM ---
    const roasts = [
        "Did you really click that? I'm disappointed.",
        "Your time management skills are showing.",
        "I'm not a bug, I'm a feature. You though? Debatable.",
        "I'm currently buffering my patience.",
        "Error 404: Talent not found on your end.",
        "Are you lost? The exit is right there.",
        "I wrote this website just to insult you. You're welcome.",
        "You clicked a button. The dopamine hit was temporary.",
        "My code works, I have no idea why.",
        "I hope you're wearing a helmet. The stupidity might be contagious."
    ];

    let toastTimeout;
    const toast = document.getElementById('roast-toast');

    function showRoast(customMessage = null) {
        const msg = customMessage || roasts[Math.floor(Math.random() * roasts.length)];
        toast.textContent = msg;
        toast.classList.add('show');
        
        if (navigator.vibrate) navigator.vibrate(50);
        
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }

    document.querySelectorAll('.stat-box:not(.hidden-trigger), .email-btn').forEach(el => {
        el.addEventListener('click', () => {
            setTimeout(() => showRoast(), 100);
        });
    });
});