async function setLanguage(lang) {
    try {
        const response = await fetch(`./lang/${lang}.json`);
        const data = await response.json();

        document.querySelectorAll('[data-lang]').forEach(el => {
            const key = el.getAttribute('data-lang');
            if (data[key]) el.textContent = data[key];
        });

        // حفظ اللغة المختارة
        localStorage.setItem('language', lang);

        // تغيير الاتجاه حسب اللغة
        document.body.dir = (lang === 'ar') ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
    } catch (error) {
        console.error("خطأ أثناء تحميل اللغة:", error);
    }
}

// تحميل اللغة المحفوظة عند فتح الصفحة
window.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('language') || 'ar';
    setLanguage(savedLang);
});
