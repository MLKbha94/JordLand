/* =========================================================
   ⚙️ JoLand v2 - Main JavaScript
   Author: Mohammad Louay
   ========================================================= */


/* =========================================================
   🚀 [01] - Smooth Scroll for "ابدأ رحلتك"
   ========================================================= */
const ctaButton = document.querySelector('.cta');
if (ctaButton) {
  ctaButton.addEventListener('click', () => {
    const contactSection = document.querySelector('.contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}


/* =========================================================
   💬 [02] - WhatsApp Floating Button
   ========================================================= */
// إنشاء زر واتساب ثابت أسفل الصفحة
const whatsappBtn = document.createElement('div');
whatsappBtn.innerHTML = "💬";
whatsappBtn.classList.add('whatsapp-btn');
document.body.appendChild(whatsappBtn);

// عند النقر → فتح رابط واتساب
whatsappBtn.addEventListener('click', () => {
  window.open("https://wa.me/4912345678900", "_blank"); // 🔧 عدّل الرقم هنا
});


/* =========================================================
   🎛️ [03] - Universities Tabs
   ========================================================= */
// تحكم بعرض بطاقات الجامعات (مستقبلاً يمكن تفعيل الفلترة)
const tabs = document.querySelectorAll('.tab');
const uniCards = document.querySelectorAll('.uni-card');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    // يمكن إضافة فلترة لاحقًا حسب الفئة
  });
});


/* =========================================================
   ✨ [04] - Scroll Reveal Animation
   ========================================================= */
// لإظهار العناصر أثناء التمرير تدريجيًا
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


/* =========================================================
   💚 [05] - WhatsApp Button Styling (Dynamic CSS)
   ========================================================= */
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


/* =========================================================
   📰 [06] - News Section (Load from JSON)
   ========================================================= */
async function loadNews() {
  const container = document.getElementById('news-container');
  try {
    const response = await fetch('./data/news.json');
    const news = await response.json();

    container.innerHTML = '';

    news.forEach(item => {
      const div = document.createElement('div');
      div.classList.add('news-item');
      div.innerHTML = `
        <h3>${item.title}</h3>
        <p>${item.content}</p>
        <small>${item.date}</small>
        <hr>
      `;
      container.appendChild(div);
    });
  } catch (error) {
    container.innerHTML = '<p>⚠️ حدث خطأ أثناء تحميل الأخبار.</p>';
  }
}
window.addEventListener('DOMContentLoaded', loadNews);


/* =========================================================
   📬 [07] - Contact Form Handler
   ========================================================= */
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = '⏳ جارٍ الإرسال...';

    try {
      const formData = new FormData(form);
      const res = await fetch(form.action, {
        method: 'POST',
        body: formData
      });

      const result = await res.text();
      if (result.trim() === "success") {
        status.textContent = '✅ تم إرسال الرسالة بنجاح!';
        form.reset();
      } else {
        status.textContent = '⚠️ حدث خطأ أثناء الإرسال.';
      }
    } catch (error) {
      status.textContent = '❌ فشل الاتصال بالخادم.';
    }
  });
}
