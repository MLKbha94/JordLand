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
   📰 [06] - Multi-Source News Feed (DW + BBC + Al Jazeera)
   ========================================================= */
async function loadNews() {
  const newsContainer = document.getElementById("news-container");
  newsContainer.innerHTML = "<p>⏳ جاري جلب الأخبار الرسمية...</p>";

  const sources = [
    { name: "DW", url: "https://rss.dw.com/rdf/rss-ar-news" },
    { name: "BBC", url: "https://feeds.bbci.co.uk/arabic/rss.xml" },
    { name: "AlJazeera", url: "https://www.aljazeera.net/aljazeerarss/arabaynet" }
  ];

  const proxy = "https://corsproxy.io/?"; // يعمل محلياً
  let allNews = [];

  try {
    for (const source of sources) {
      const response = await fetch(proxy + encodeURIComponent(source.url));
      const xmlText = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(xmlText, "application/xml");
      const items = xml.querySelectorAll("item");

      items.forEach((item) => {
        const title = item.querySelector("title")?.textContent || "بدون عنوان";
        const link = item.querySelector("link")?.textContent || "#";
        const dateText = item.querySelector("pubDate")?.textContent || "";
        const date = new Date(dateText);
        const desc = item.querySelector("description")?.textContent || "";

        allNews.push({
          source: source.name,
          title,
          link,
          date,
          desc
        });
      });
    }

    // ترتيب الأخبار حسب التاريخ الأحدث
    allNews.sort((a, b) => b.date - a.date);

    // عرض أول 3 أخبار فقط (الأحدث أولاً)
    newsContainer.innerHTML = "";
    allNews.slice(0, 3).forEach((item) => {

      const card = document.createElement("div");
      card.className = "news-card";
      card.innerHTML = `
        <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
        <p>${item.desc.replace(/<[^>]*>?/gm, "").slice(0, 160)}...</p>
        <div class="news-meta">
          <small>${new Date(item.date).toLocaleDateString("ar-EG")}</small>
          <span class="source">${item.source}</span>
        </div>
        <hr>
      `;
      newsContainer.appendChild(card);
    });

  } catch (err) {
    console.error("❌ خطأ أثناء تحميل الأخبار:", err);
    newsContainer.innerHTML = `<p style="color:#d4af37;">⚠️ تعذر تحميل الأخبار من المصادر الرسمية.</p>`;
  }
}

document.addEventListener("DOMContentLoaded", loadNews);

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


/* =========================================================
   🌦️ [08] - Live Weather + Clock (Germany, Multi-City)
   ========================================================= */
const cities = {
  berlin: { name: "برلين", lat: 52.52, lon: 13.41 },
  dusseldorf: { name: "دوسلدورف", lat: 51.23, lon: 6.77 },
  munich: { name: "ميونخ", lat: 48.14, lon: 11.58 }
};

let clockInterval; // حتى ما تتكرر الساعة كل مرة

async function loadWeather(cityKey = "berlin") {
  const weatherDiv = document.getElementById("weather");
  const timeDiv = document.getElementById("time");
  const city = cities[cityKey];

  // 🔁 أوقف أي مؤقت سابق قبل البدء بمؤقت جديد
  if (clockInterval) clearInterval(clockInterval);

  // 🕒 تحديث الساعة كل ثانية
  clockInterval = setInterval(() => {
    const now = new Date();
    const options = { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Europe/Berlin" };
    timeDiv.textContent = now.toLocaleTimeString("ar-EG", options);
  }, 1000);

  try {
    // 🌦️ جلب بيانات الطقس
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current_weather=true`;
    const response = await fetch(url);
    const data = await response.json();

    const weather = data.current_weather;
    if (!weather) throw new Error("لا توجد بيانات طقس");

    const temp = Math.round(weather.temperature);
    const desc = getWeatherDescription(weather.weathercode);

    weatherDiv.textContent = `الجو في ${city.name}: ${temp}°C - ${desc}`;
  } catch (error) {
    console.warn("⚠️ تعذر جلب حالة الطقس:", error);
    weatherDiv.textContent = `تعذر جلب الطقس في ${city.name}.`;
  }
}

function getWeatherDescription(code) {
  const map = {
    0: "سماء صافية ☀️",
    1: "غائم جزئيًا 🌤️",
    2: "غائم ⛅",
    3: "غيوم كثيفة ☁️",
    45: "ضباب 🌫️",
    51: "رذاذ خفيف 🌦️",
    61: "أمطار 🌧️",
    71: "ثلوج ❄️",
    95: "عواصف ⛈️"
  };
  return map[code] || "الجو غير معروف 🤔";
}

// 🚀 تشغيل الميزة عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
  loadWeather(); // افتراضيًا برلين

  const selector = document.getElementById("city-selector");
  if (selector) {
    selector.addEventListener("change", (e) => loadWeather(e.target.value));
  }
});
