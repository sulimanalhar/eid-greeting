const splash = document.getElementById('splash-screen');
const loadingText = document.getElementById('loading-text');
const mainContent = document.getElementById('main-content');
const expandBtn = document.getElementById('expand-btn');
const codeMessage = document.getElementById('code-message');
const typingSound = document.getElementById('typing-sound');
const jokeBtn = document.getElementById('joke-btn');
const jokeMessage = document.getElementById('joke-message');
const sheepIcon = document.getElementById('sheep');
const sheepSound = document.getElementById('sheep-sound');
const laughSound = document.getElementById('laugh-sound');
const meatSmell = document.getElementById('meat-smell');

const name = "JOAN"; // غيّر هذا إلى اسم من تريد التهنئة به

// نصوص التحميل المتتالية
const loadingSteps = [
  `جاري تحميل تجربة عيد الأضحى لـ ${name}... 🌙🐑💻`,
  'جاري تهيئة وحدات الفرح والبركة...',
  'عيد الأضحى في طريقه للتحميل...'
];

let currentStep = 0;

function showLoadingStep() {
  if (currentStep < loadingSteps.length) {
    loadingText.textContent = loadingSteps[currentStep];
    currentStep++;
    setTimeout(showLoadingStep, 2500);
  } else {
    // إخفاء واجهة البداية واظهار الصفحة الرئيسية مع تأثير fade-in
    splash.classList.add('hidden');
    mainContent.classList.remove('hidden');
    mainContent.classList.add('fade-in');
  }
}

// عند تحميل الصفحة
window.onload = () => {
  showLoadingStep();
}

// رسالة العيد البرمجية (نص كامل)
const eidMessage = `// EidMessage.cpp

if (myHeart.thinksOf(you)) {
    auto message = "كنت ناوي أكتب تهنئة بسيطة...";
    message += "\\nلكن الكود كتب نفسه 🤖❤️";
    message += "\\nكل سطر يذكّرني إنك أهم مكتبة (Library) في حياتي،";
    message += "\\nوإن مشروع أيامي ما يشتغل إلا بوجودك.";
    message += "\\nعيد أضحى سعيد، يا من جعلتِ الداتا تُزهِر بمعنى.";
    message += "\\nأتمنى لكِ أيامًا نظيفة مثل Log بلا Errors ✨🐑";
    cout << message;
}`;

// تأثير الكتابة التدريجي
function typeMessage(element, message, sound, delay = 28, onComplete) {
  element.textContent = '';
  let i = 0;
  function typeChar() {
    if (i < message.length) {
      element.textContent += message[i];
      if (sound && message[i] !== '\n' && message[i] !== ' ') {
        sound.currentTime = 0;
        sound.play().catch(()=>{});
      }
      i++;
      setTimeout(typeChar, delay);
    } else if (onComplete) {
      onComplete();
    }
  }
  typeChar();
}

// زر توسيع الرسالة
expandBtn.addEventListener('click', () => {
  if (codeMessage.classList.contains('hidden')) {
    codeMessage.classList.remove('hidden');
    codeMessage.textContent = '';
    typeMessage(
      codeMessage,
      eidMessage,
      typingSound,
      22,
      () => {
        // إضافة توقيع بعد انتهاء الكتابة
        const signature = document.createElement('span');
        signature.className = 'signature-line';
        signature.textContent ='(❁´◡`❁)قلبي ';
        codeMessage.appendChild(document.createElement('br'));
        codeMessage.appendChild(signature);
      }
    );
    expandBtn.textContent = 'Click to Collapse ❌';
  } else {
    codeMessage.classList.add('hidden');
    expandBtn.textContent = 'Click to Expand 🌟 // رسالة العيد الخاصة';
  }
});

// تأثير صوتي عند المرور على الخروف
sheepIcon.addEventListener('mouseenter', () => {
  sheepSound.currentTime = 0;
  sheepSound.play().catch(()=>{});
});

// زر مزحة العيد
jokeBtn.addEventListener('click', () => {
  const jokes = [
    "ريّحة اللحم وصلت عند الجيران! 🥩💨",
    "الخروف يقول: بععع... لا تنسوا تعطوني عيدية! 🐑💸",
    "الكبش ينتظر صورته معكم على السناب! 😂",
    "عيد بدون كبش... زي كود بدون ;",
    "سليمان الحربي يقول: لا تنسى توزع اللحمة بالتساوي! 😁"
  ];
  const joke = jokes[Math.floor(Math.random() * jokes.length)];
  jokeMessage.textContent = joke;
  jokeMessage.classList.remove('hidden');
  laughSound.currentTime = 0;
  laughSound.play().catch(()=>{});
  meatSmell.classList.remove('hidden');
  setTimeout(() => {
    meatSmell.classList.add('hidden');
  }, 3500);
});
