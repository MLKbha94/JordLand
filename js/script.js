/* ============================================
   JoLand v2 
   ============================================ */

// ===== Smooth scroll for "ابدأ رحلتك"  =====
document.querySelector('.cta').addEventListener('click', () => {
  const contactSection = document.querySelector('.contact');
  contactSection.scrollIntoView({ behavior: 'smooth' });
});

// ===== WhatsApp  =====
const whatsappBtn = document.createElement('div');
whatsappBtn.innerHTML = "💬";
whatsappBtn.classList.add('whatsapp-btn');
document.body.appendChild(whatsappBtn);

// Click → open WhatsApp
whatsappBtn.addEventListener('click', () => {
  window.open("https://wa.me/4912345678900", "_blank"); // TODO: Replace with your WhatsApp number
});

// ===== Tabs for Universities Section =====
const tabs = document.querySelectorAll('.tab');
const uniCards = document.querySelectorAll('.uni-card');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // deactivate all tabs
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // NOTE: here you can later filter the universities dynamically
    // for now, it’s just a visual tab switch
  });
});

// ===== Simple scroll reveal effect =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// ===== WhatsApp Button Styling =====
const style = document.createElement('style');
style.innerHTML = `
.whatsapp-btn {
  position: fixed;
  bottom: 25px;
  right: 25px;
  background: #25D366;
  color: white;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 28px;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0,0,0,0.3);
  transition: 0.3s;
  z-index: 999;
}
.whatsapp-btn:hover {
  transform: scale(1.1);
  background: #1ebe5d;
}
section {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
section.visible {
  opacity: 1;
  transform: translateY(0);
}
`;
document.head.appendChild(style);
