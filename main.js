/**
 * NUCLEUS INTERNATIONAL SCHOOLS
 * Main Client-Side Controller
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. Sticky Header Scroll Effect
  // =========================================================================
  const mainHeader = document.getElementById('mainHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      mainHeader.classList.add('scrolled');
    } else {
      mainHeader.classList.remove('scrolled');
    }
  });

  // =========================================================================
  // 2. Mobile Off-Canvas Menu
  // =========================================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const closeOffcanvasBtn = document.getElementById('closeOffcanvasBtn');
  const offcanvasMenu = document.getElementById('offcanvasMenu');
  const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

  function toggleMobileMenu(open) {
    if (open) {
      offcanvasMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      offcanvasMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  mobileMenuBtn?.addEventListener('click', () => toggleMobileMenu(true));
  closeOffcanvasBtn?.addEventListener('click', () => toggleMobileMenu(false));
  mobileNavItems.forEach(item => {
    item.addEventListener('click', () => toggleMobileMenu(false));
  });

  // =========================================================================
  // 3. Language Switcher (EN / አማ)
  // =========================================================================
  const langToggleBtn = document.getElementById('langToggleBtn');
  const currentLangLabel = document.getElementById('currentLangLabel');
  let currentLang = 'EN';

  langToggleBtn?.addEventListener('click', () => {
    if (currentLang === 'EN') {
      currentLang = 'AM';
      currentLangLabel.textContent = 'አማ / EN';
      // Subtle alert or badge toggle
      showToast('ቋንቋ ወደ አማርኛ ተቀይሯል (Amharic view enabled)');
    } else {
      currentLang = 'EN';
      currentLangLabel.textContent = 'EN / አማ';
      showToast('Switched to English View');
    }
  });

  // =========================================================================
  // 4. "School Experience" Tabbed Switcher (ICS Style)
  // =========================================================================
  const expTabBtns = document.querySelectorAll('.exp-tab-btn');
  const expPanels = document.querySelectorAll('.exp-panel');

  expTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      // Update button active state
      expTabBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update panel visibility
      expPanels.forEach(panel => {
        panel.classList.remove('active');
      });
      const activePanel = document.getElementById(`panel-${targetTab}`);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });

  // =========================================================================
  // 5. Cambridge Pathway Age-to-Grade Matrix
  // =========================================================================
  const pathwayStagesData = {
    'early-years': {
      badge: 'Stage 1: Early Years',
      title: 'Early Years Foundation (Ages 2–5)',
      desc: 'A nurturing, play-based immersion where sensory exploration, early phonics, numeracy, and emotional security lay the bedrock for lifelong curiosity.',
      highlights: [
        '🌟 Reggio Emilia & Montessori-inspired sensory exploration stations',
        '🗣️ Dual-language immersion & phonemic awareness in English and Amharic',
        '🧩 Fine and gross motor skills agility with daily outdoor nature play'
      ],
      subjects: [
        'Early Literacy & Phonics',
        'Number Sense & Math Play',
        'Physical Movement',
        'Sensory Exploration',
        'Music & Rhythm',
        'Emotional Socialization'
      ]
    },
    'primary': {
      badge: 'Stage 2: Cambridge Primary',
      title: 'Cambridge Primary Stage (Grades 1–5 • Ages 5–11)',
      desc: 'A structured, inquiry-driven curriculum developing deep conceptual understanding in Mathematics, Science, English, and Global Perspectives.',
      highlights: [
        '🔬 Hands-on weekly experiments in biology, physics, and ecology',
        '📐 Singapore-style concrete-pictorial-abstract mathematics rigor',
        '🤖 Weekly Robotics, Coding, and LEGO Engineering labs',
        '🌱 On-campus agriculture, horticulture, and animal care responsibility'
      ],
      subjects: [
        'Cambridge English',
        'Cambridge Mathematics',
        'Cambridge Science',
        'Global Perspectives',
        'Robotics & AI',
        'French as Second Language',
        'Physical Education & Taekwondo',
        'Visual & Performing Arts'
      ]
    },
    'lower-secondary': {
      badge: 'Stage 3: Lower Secondary',
      title: 'Cambridge Lower Secondary (Grades 6–8 • Ages 11–14)',
      desc: 'Preparing young adolescents for global academic excellence with rigorous preparation towards the internationally assessed Cambridge Checkpoint.',
      highlights: [
        '🏆 External Cambridge Checkpoint examinations validated by Cambridge UK',
        '💡 Complex STEM projects: Arduino microcontrollers and Python programming',
        '🌍 Critical thinking, Model UN debates, and scientific research methodologies',
        '🤝 Leadership development, team athletics, and service learning'
      ],
      subjects: [
        'Advanced Mathematics (Algebra & Geometry)',
        'Biology, Chemistry & Physics',
        'English First Language',
        'Global Perspectives & Social Research',
        'Computer Science & Python',
        'Ethio-Jazz & Classical Music',
        'Athletics & Competitive Sports'
      ]
    }
  };

  const stageBtns = document.querySelectorAll('.stage-btn');
  const dynStageBadge = document.getElementById('dynStageBadge');
  const dynStageTitle = document.getElementById('dynStageTitle');
  const dynStageDesc = document.getElementById('dynStageDesc');
  const dynStageHighlights = document.getElementById('dynStageHighlights');
  const dynStageSubjects = document.getElementById('dynStageSubjects');

  stageBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const stageKey = btn.getAttribute('data-stage');
      const data = pathwayStagesData[stageKey];
      if (!data) return;

      stageBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (dynStageBadge) dynStageBadge.textContent = data.badge;
      if (dynStageTitle) dynStageTitle.textContent = data.title;
      if (dynStageDesc) dynStageDesc.textContent = data.desc;

      if (dynStageHighlights) {
        dynStageHighlights.innerHTML = data.highlights
          .map(item => `<div class="stage-highlights-item">${item}</div>`)
          .join('');
      }

      if (dynStageSubjects) {
        dynStageSubjects.innerHTML = data.subjects
          .map(sub => `<span class="subject-tag">${sub}</span>`)
          .join('');
      }
    });
  });

  // =========================================================================
  // 6. Campus Facilities Carousel Slider
  // =========================================================================
  const facilitiesTrack = document.getElementById('facilitiesTrack');
  const prevFacilityBtn = document.getElementById('prevFacilityBtn');
  const nextFacilityBtn = document.getElementById('nextFacilityBtn');
  const dotsContainer = document.getElementById('facilityDots');

  let currentFacilityIndex = 0;
  const facilityCards = document.querySelectorAll('.facility-card');
  const totalFacilityCards = facilityCards.length;

  function updateFacilitiesSlider() {
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth <= 1024 && window.innerWidth >= 640;
    
    let visibleCount = 3;
    if (isMobile) visibleCount = 1;
    else if (isTablet) visibleCount = 2;

    const maxIndex = Math.max(0, totalFacilityCards - visibleCount);
    if (currentFacilityIndex > maxIndex) currentFacilityIndex = maxIndex;
    if (currentFacilityIndex < 0) currentFacilityIndex = 0;

    const firstCard = facilityCards[0];
    if (firstCard && facilitiesTrack) {
      const cardWidth = firstCard.offsetWidth;
      const trackStyle = window.getComputedStyle(facilitiesTrack);
      const gap = parseFloat(trackStyle.gap) || 20;
      const offsetPx = currentFacilityIndex * (cardWidth + gap);
      facilitiesTrack.style.transform = `translateX(-${offsetPx}px)`;
    }

    // Update dots
    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      const dotCount = maxIndex + 1;
      for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('span');
        dot.className = `carousel-dot ${i === currentFacilityIndex ? 'active' : ''}`;
        dot.setAttribute('role', 'button');
        dot.setAttribute('aria-label', `Go to facility slide ${i + 1}`);
        dot.addEventListener('click', () => {
          currentFacilityIndex = i;
          updateFacilitiesSlider();
        });
        dotsContainer.appendChild(dot);
      }
    }

    if (prevFacilityBtn) {
      prevFacilityBtn.style.opacity = currentFacilityIndex === 0 ? '0.4' : '1';
      prevFacilityBtn.style.cursor = currentFacilityIndex === 0 ? 'default' : 'pointer';
    }
    if (nextFacilityBtn) {
      nextFacilityBtn.style.opacity = currentFacilityIndex >= maxIndex ? '0.4' : '1';
      nextFacilityBtn.style.cursor = currentFacilityIndex >= maxIndex ? 'default' : 'pointer';
    }
  }

  prevFacilityBtn?.addEventListener('click', () => {
    if (currentFacilityIndex > 0) {
      currentFacilityIndex--;
      updateFacilitiesSlider();
    }
  });

  nextFacilityBtn?.addEventListener('click', () => {
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth <= 1024 && window.innerWidth >= 640;
    let visibleCount = 3;
    if (isMobile) visibleCount = 1;
    else if (isTablet) visibleCount = 2;
    const maxIndex = Math.max(0, totalFacilityCards - visibleCount);

    if (currentFacilityIndex < maxIndex) {
      currentFacilityIndex++;
      updateFacilitiesSlider();
    }
  });

  window.addEventListener('resize', updateFacilitiesSlider);
  updateFacilitiesSlider();

  // =========================================================================
  // 7. "A Day at Nucleus" Daily Timeline Switcher
  // =========================================================================
  const timelineStepsData = [
    {
      timeClock: '08:00 AM – 08:30 AM',
      title: 'Safe Arrival & Welcoming Morning Circle',
      desc: 'Students are personally welcomed by name at the security gates. A calm, structured morning routine begins with homeroom check-in, setting positive intentions and daily goals.',
      img: 'https://nucleusinternationalschoolsystem.com/api/media/file/gallery-campus.webp'
    },
    {
      timeClock: '09:00 AM – 12:30 PM',
      title: 'Inquiry-Led Cambridge Academic Blocks',
      desc: 'High-focus morning periods dedicated to Mathematics, English literacy, Science experiments, and bilingual language instruction in small collaborative groupings.',
      img: 'https://nucleusinternationalschoolsystem.com/api/media/file/gallery-classroom.webp'
    },
    {
      timeClock: '12:30 PM – 01:30 PM',
      title: 'Chef-Prepared Organic Lunch & Free Play',
      desc: 'Students gather in the dining hall for fresh, balanced meals cooked on campus. Supervised social free play on the natural grass courts follows.',
      img: 'https://nucleusinternationalschoolsystem.com/images/stock/globe-1.webp'
    },
    {
      timeClock: '01:30 PM – 02:45 PM',
      title: 'Robotics, AI Labs & Living Farm Stewardship',
      desc: 'Hands-on discovery: students assemble LEGO robotics, write code in the computer lab, and care for vegetables and animals in the campus green spaces.',
      img: 'https://nucleusinternationalschoolsystem.com/api/media/file/gallery-stem.webp'
    },
    {
      timeClock: '03:00 PM – 03:30 PM',
      title: 'Music, Martial Arts & Athletic Movement',
      desc: 'Taekwondo discipline, choir, instrumental practice, and team agility training ensuring well-rounded physical and emotional vitality.',
      img: 'https://nucleusinternationalschoolsystem.com/images/newsletter/summer-camp-2026/week5-taekwondo-group-pattern.webp'
    },
    {
      timeClock: '03:30 PM – 04:45 PM',
      title: 'Supervised Safe Departure & Extended Care',
      desc: 'Controlled dismissal with dedicated security verification. School bus departures for Sarbet, Mekanisa, Old Airport, and Bole, with after-school clubs running for registered students.',
      img: 'https://nucleusinternationalschoolsystem.com/api/media/file/gallery-sports.webp'
    }
  ];

  const timelineStepBtns = document.querySelectorAll('.timeline-step-btn');
  const dynTimeClock = document.getElementById('dynTimeClock');
  const dynTimeTitle = document.getElementById('dynTimeTitle');
  const dynTimeDesc = document.getElementById('dynTimeDesc');
  const dynTimeImg = document.getElementById('dynTimeImg');

  timelineStepBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.getAttribute('data-time-idx'), 10);
      const data = timelineStepsData[idx];
      if (!data) return;

      timelineStepBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (dynTimeClock) dynTimeClock.textContent = data.timeClock;
      if (dynTimeTitle) dynTimeTitle.textContent = data.title;
      if (dynTimeDesc) dynTimeDesc.textContent = data.desc;
      if (dynTimeImg) dynTimeImg.src = data.img;
    });
  });

  // =========================================================================
  // 8. Multi-Campus Explorer Tabs
  // =========================================================================
  const campusTabBtns = document.querySelectorAll('.campus-tab-btn');
  const campusPanels = document.querySelectorAll('.campus-content-panel');

  campusTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetCampus = btn.getAttribute('data-campus');
      campusTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      campusPanels.forEach(p => p.classList.remove('active'));
      const activePanel = document.getElementById(`campus-${targetCampus}`);
      if (activePanel) {
        activePanel.classList.add('active');
      }
    });
  });

  // =========================================================================
  // 9. Interactive Tuition & Fee Transparency Estimator
  // =========================================================================
  const gradeOptionBtns = document.querySelectorAll('.grade-option-btn');
  const addonMeals = document.getElementById('addonMeals');
  const addonTransport = document.getElementById('addonTransport');
  const addonRobotics = document.getElementById('addonRobotics');

  const summaryGradeName = document.getElementById('summaryGradeName');
  const summaryMealVal = document.getElementById('summaryMealVal');
  const summaryTransportVal = document.getElementById('summaryTransportVal');
  const summaryClubVal = document.getElementById('summaryClubVal');
  const summaryTotalLabel = document.getElementById('summaryTotalLabel');

  const gradeNames = {
    'early': 'Early Years (Pre-K to KG)',
    'primary-lower': 'Lower Primary (Grades 1–3)',
    'primary-upper': 'Upper Primary (Grades 4–5)',
    'secondary': 'Lower Secondary (Grades 6–8)'
  };

  let selectedGrade = 'early';

  function updateEstimator() {
    if (summaryGradeName) {
      summaryGradeName.textContent = `${gradeNames[selectedGrade]} Cambridge Tuition`;
    }
    if (summaryMealVal) {
      summaryMealVal.textContent = addonMeals?.checked ? 'Included' : 'Opted Out';
      summaryMealVal.style.color = addonMeals?.checked ? '#10b981' : '#94a3b8';
    }
    if (summaryTransportVal) {
      summaryTransportVal.textContent = addonTransport?.checked ? 'Selected' : 'None';
      summaryTransportVal.style.color = addonTransport?.checked ? '#10b981' : '#94a3b8';
    }
    if (summaryClubVal) {
      summaryClubVal.textContent = addonRobotics?.checked ? 'Selected' : 'None';
      summaryClubVal.style.color = addonRobotics?.checked ? '#10b981' : '#94a3b8';
    }
    if (summaryTotalLabel) {
      const addOnsCount = (addonMeals?.checked ? 1 : 0) + (addonTransport?.checked ? 1 : 0) + (addonRobotics?.checked ? 1 : 0);
      if (addOnsCount === 3) {
        summaryTotalLabel.textContent = 'All-Inclusive Full Package';
      } else if (addOnsCount >= 1) {
        summaryTotalLabel.textContent = 'Standard Customized Plan';
      } else {
        summaryTotalLabel.textContent = 'Tuition-Only Plan';
      }
    }
  }

  gradeOptionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      gradeOptionBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedGrade = btn.getAttribute('data-grade-val');
      updateEstimator();
    });
  });

  addonMeals?.addEventListener('change', updateEstimator);
  addonTransport?.addEventListener('change', updateEstimator);
  addonRobotics?.addEventListener('change', updateEstimator);
  updateEstimator();

  // =========================================================================
  // 10. FAQ Accordion Logic
  // =========================================================================
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    trigger?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close other items
      faqItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // =========================================================================
  // 11. Modals (Tour Booking & Brand Video)
  // =========================================================================
  const tourModalBackdrop = document.getElementById('tourModalBackdrop');
  const closeTourModalBtn = document.getElementById('closeTourModalBtn');
  const openTourModalBtn = document.getElementById('openTourModalBtn');
  const heroBookTourBtn = document.getElementById('heroBookTourBtn');
  const mobileBookTourBtn = document.getElementById('mobileBookTourBtn');

  const videoModalBackdrop = document.getElementById('videoModalBackdrop');
  const openVideoModalBtn = document.getElementById('openVideoModalBtn');
  const closeVideoModalBtn = document.getElementById('closeVideoModalBtn');
  const brandVideoPlayer = document.getElementById('brandVideoPlayer');

  window.openTourModal = function() {
    if (tourModalBackdrop) {
      tourModalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  function closeTourModal() {
    if (tourModalBackdrop) {
      tourModalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  function openVideoModal() {
    if (videoModalBackdrop) {
      videoModalBackdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
      brandVideoPlayer?.play();
    }
  }

  function closeVideoModal() {
    if (videoModalBackdrop) {
      videoModalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
      brandVideoPlayer?.pause();
    }
  }

  openTourModalBtn?.addEventListener('click', window.openTourModal);
  heroBookTourBtn?.addEventListener('click', window.openTourModal);
  mobileBookTourBtn?.addEventListener('click', window.openTourModal);
  closeTourModalBtn?.addEventListener('click', closeTourModal);
  tourModalBackdrop?.addEventListener('click', (e) => {
    if (e.target === tourModalBackdrop) closeTourModal();
  });

  openVideoModalBtn?.addEventListener('click', openVideoModal);
  closeVideoModalBtn?.addEventListener('click', closeVideoModal);
  videoModalBackdrop?.addEventListener('click', (e) => {
    if (e.target === videoModalBackdrop) closeVideoModal();
  });

  // Handle Tour Form Submission
  window.handleTourSubmit = function(e) {
    e.preventDefault();
    closeTourModal();
    showToast('🎉 Tour Request Confirmed! Our admissions coordinator will contact you shortly.');
  };

  // Toast Notification Helper
  function showToast(message) {
    let toast = document.getElementById('nucleusToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'nucleusToast';
      toast.style.position = 'fixed';
      toast.style.bottom = '2rem';
      toast.style.left = '50%';
      toast.style.transform = 'translateX(-50%) translateY(100px)';
      toast.style.background = '#0e053b';
      toast.style.color = '#ffffff';
      toast.style.padding = '0.9rem 1.8rem';
      toast.style.borderRadius = '9999px';
      toast.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
      toast.style.zIndex = '999';
      toast.style.fontSize = '0.92rem';
      toast.style.fontWeight = '600';
      toast.style.border = '1px solid #f59e0b';
      toast.style.transition = 'transform 0.35s ease, opacity 0.35s ease';
      toast.style.opacity = '0';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(100px)';
    }, 4500);
  }

});
