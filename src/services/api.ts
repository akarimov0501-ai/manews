import { Article, Category } from "../types";

// Default pre-populated high-quality AI news for Uzbek language
const DEFAULT_CATEGORIES: Category[] = [
  { id: 1, name: "LLM", slug: "llm" },
  { id: 2, name: "Computer Vision", slug: "computer-vision" },
  { id: 3, name: "AI Tools", slug: "ai-tools" },
  { id: 4, name: "Biznes", slug: "biznes" },
];

const DEFAULT_ARTICLES: Article[] = [
  {
    id: 1,
    title: "GPT-5 modelining ilk natijalari: LLM texnologiyalarida yangi davr boshlanmoqda",
    slug: "gpt-5-modelining-ilk-natijalari",
    excerpt: "Yaqinda e'lon qilingan test natijalariga ko'ra, GPT-5 murakkab mantiqiy fikrlash va ko'p bosqichli rejalashtirishda misli ko'rilmagan ko'rsatkichlarni namoyish etdi.",
    content: `# GPT-5 modelining ilk natijalari: LLM texnologiyalarida yangi davr boshlanmoqda

Sun'iy intellekt olami navbatdagi katta texnologik sakrash arafasida turibdi. Ko'p oylik muhokamalardan so'ng, eng yangi yirik til modeli (LLM) — **GPT-5** ning dastlabki benchmark va sinov natijalari ma'lum bo'ldi. Ushbu natijalar sun'iy intellektning nafaqat matn yaratish, balki inson kabi tizimli fikrlash qobiliyatida ham katta o'sish borligini ko'rsatmoqda.

## Asosiy Ko'rsatkichlar va Yutuqlar

Yangi model avvalgi avlodlardan bir necha fundamental jihatlari bilan ajralib turadi:

1. **Ko'p Bosqichli Rejalashtirish (Multi-step Reasoning):** GPT-5 bitta so'rov doirasida 20 dan ortiq mantiqiy bosqichlarni rejalashtirish va xatolarini o'zi to'g'rilash (self-correction) qobiliyatiga ega.
2. **Kengaytirilgan Kontekst Oynasi (Context Window):** Model bir vaqtning o'zida **2 million tokengacha** bo'lgan axborot hajmini qabul qila oladi. Bu degani, bir nechta kitob yoki butun boshli kod omborini (repository) bitta so'rovda tahlil qilish mumkin.
3. **Kamroq Gallyutsinatsiyalar (Lower Hallucination Rate):** Faktologik aniqlik darajasi **96.8%** gacha oshgan, bu ilmiy va tibbiy tadqiqotlar uchun juda muhimdir.

### Benchmark Natijalari Solishtirmasi

| Imtihon / Benchmark | GPT-4o (%) | GPT-5 (%) | Inson o'rtacha (%) |
|---------------------|------------|-----------|--------------------|
| MMLU (Mavzular tahlili) | 88.7 | **94.2** | 89.8 |
| MATH (Murakkab matematika) | 76.4 | **91.5** | 60.0 |
| HumanEval (Dasturlash) | 90.2 | **97.1** | 92.0 |
| GPQA (Ilmiy savollar) | 53.6 | **78.4** | 65.0 |

\`\`\`python
# GPT-5 yordamida agentlik dastur kodidan namuna
from google.genai import ai_agent

def run_research():
    agent = ai_agent.create(
        model="gpt-5-preview",
        goal="Tadbirkorlar uchun oziq-ovqat yetkazib berish bozorini tahlil qil va hisobot tayyorla"
    )
    # Agent mustaqil ravishda veb-qidiruv o'tkazadi va ma'lumotlarni tuzilmaga soladi
    report = agent.execute()
    return report
\`\`\`

## Biznes va Jamiyatga Ta'siri

GPT-5 shunchaki chatbot emas, balki **to'liq mustaqil ishlovchi raqamli xodim (AI Agent)** sifatida namoyon bo'lmoqda. U murakkab moliyaviy hisobotlarni tuzishi, kompaniyaning huquqiy hujjatlarini tekshirishi va hatto yangi dasturiy mahsulotlarni arxitekturadan tortib to to'liq backendgacha mustaqil ravishda yoza olishi mumkin.

Ekspertlarning fikricha, joriy yilda AI agentlar texnologiyasi an'anaviy SaaS dasturlari o'rnini egallay boshlaydi. Buning natijasida korxonalarda operatsion xarajatlar **50% dan 70% gacha** tejanishi kutilmoqda.

## Xulosa

GPT-5 bizni **Sun'iy Umumiy Intellekt (AGI)** sari yana bir qadam yaqinlashtirdi. Kelgusi oylarda ushbu model barcha foydalanuvchilar va dasturchilar uchun API orqali taqdim etilishi rejalashtirilgan. Texnologiyadan to'g'ri foydalanish va uning xavfsizligini ta'minlash esa insoniyat oldidagi eng katta vazifa bo'lib qoladi.
`,
    coverImageUrl: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200&auto=format&fit=crop",
    publishedAt: "2026-07-19T14:30:00.000Z",
    readingTime: "5 daqiqa",
    category: { name: "LLM", slug: "llm" },
    author: {
      name: "Anvar Karimov",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop",
    },
  },
  {
    id: 2,
    title: "DeepSeek R1: Ochiq kodli fikrlovchi model va uning raqobatdagi ustunligi",
    slug: "deepseek-r1-ochiq-kodli-fikrlash",
    excerpt: "DeepSeek kompaniyasi o'zining yangi R1 ochiq kodli til modelini taqdim etdi. U murakkab mantiqiy zanjirlarni inson kabi ketma-ket tushuntirib bera oladi.",
    content: `# DeepSeek R1: Ochiq kodli fikrlovchi model va uning raqobatdagi ustunligi

Sun'iy intellekt sanoatida ochiq manbali (open-source) dasturlarning o'rni beqiyosdir. Yaqinda **DeepSeek** jamoasi tomonidan taqdim etilgan **R1** modeli bu yo'nalishda haqiqiy inqilob qildi. Ushbu model murakkab fikrlash, matematika va kodlash sohasida yopiq tijoriy modellardan qolishmaydigan natijalarni juda arzon narxda taqdim etadi.

## "Fikrlar oqimi" (Chain of Thought) nima?

DeepSeek R1 ning eng asosiy xususiyati — bu foydalanuvchi savoliga javob berishdan oldin o'zining ichki **fikrlash jarayonini (Reasoning process)** batafsil ko'rsatib berishidir.

Model javob yozish jarayonida:
* Muammoni qismlarga ajratadi.
* O'zining taxminlarini tekshiradi.
* Xatolarini aniqlab, darhol tuzatadi.
* Yakuniy eng to'g'ri va optimallashtirilgan yechimni taklif qiladi.

Bu jarayon foydalanuvchiga sun'iy intellektning fikrlash zanjirini tushunishga va javoblarning asoslanganligiga ishonch hosil qilishga yordam beradi.

## Texnik Tavsiflar va O'rganish Metodologiyasi

DeepSeek R1 modeli **Reinforcement Learning (RL)** yordamida o'qitilgan. An'anaviy modellardan farqli ravishda, unga oldindan yozib berilgan tayyor javoblar emas, balki qoidalar va maqsadlar berilgan. Model o'z-o'ziga qarshi millionlab marta o'ynab, eng mukammal fikrlash strategiyalarini ishlab chiqqan.

### Tejamkorlik va Ochiqlik

Litsenziyaga ko'ra, R1 to'liq ochiq kodli bo'lib, har qanday dasturchi yoki kompaniya uni o'z serverlariga yuklab olib, mutlaqo bepul ishlatishi yoki o'z ehtiyojlariga moslashtirishi mumkin. Uning ishlash samaradorligi shunchalik yuqoriki, u xarajatlarni an'anaviy serverlarga nisbatan **10 barobargacha kamaytiradi**.
`,
    coverImageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
    publishedAt: "2026-07-18T09:15:00.000Z",
    readingTime: "4 daqiqa",
    category: { name: "LLM", slug: "llm" },
    author: {
      name: "Dilshodbek Ismoilov",
      avatarUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=150&auto=format&fit=crop",
    },
  },
  {
    id: 3,
    title: "YOLOv11: Real-vaqtdagi ob'ektlarni aniqlashda misli ko'rilmagan tezlik",
    slug: "yolov11-real-vaqtdagi-tasvirlar",
    excerpt: "Computer Vision sohasida yetakchi bo'lgan YOLO algoritmining 11-versiyasi chiqdi. U endi kam resursli mobil qurilmalarda ham soniyasiga 120 kadrni qayta ishlay oladi.",
    content: `# YOLOv11: Real-vaqtdagi ob'ektlarni aniqlashda misli ko'rilmagan tezlik

Kompyuter ko'rishi (Computer Vision) sohasidagi eng mashhur va keng tarqalgan ob'ektlarni aniqlash algoritmi bo'lgan **YOLO (You Only Look Once)** o'zining navbatdagi 11-versiyasini rasman e'lon qildi. Ushbu reliz sanoatda xavfsizlik kameralari, dronlar, avtopilot tizimlari va tibbiy diagnostika qurilmalari uchun yangi imkoniyatlar ochadi.

## YOLOv11 ning Muhim Yangiliklari

1. **Gibrid Arxitektura:** Diqqat mexanizmlari (Attention Mechanisms) va CNN tarmoqlarining uyg'unlashishi hisobiga juda kichik va qisman yopilib qolgan ob'ektlarni ham xatosiz topadi.
2. **Ekstremal Tezlik:** Jetson Nano yoki zamonaviy smartfonlarda hech qanday kechikishlarsiz (sub-10ms) real vaqt rejimida ishlaydi.
3. **Multitasking (Ko'p Vazifalilik):** Bitta modelning o'zi bir vaqtda:
   * Ob'ektlarni aniqlash (Object Detection)
   * Tasvirlarni segmentatsiya qilish (Instance Segmentation)
   * Odam skeleti nuqtalarini topish (Pose Estimation)
   * Tasvir klassifikatsiyasini amalga oshiradi.

## Amaliy Kod namunasi

YOLOv11 yordamida ob'ektlarni aniqlash nihoyatda oson va bor-yo'g'i bir necha qator kod talab qiladi:

\`\`\`python
from ultralytics import YOLO

# YOLOv11 modelini yuklab olish
model = YOLO("yolov11n.pt")

# Rasm yoki videoda ob'ektlarni aniqlash
results = model.predict(source="camera.mp4", show=True, conf=0.5)

for result in results:
    boxes = result.boxes
    print(f"Aniqlangan ob'ektlar soni: {len(boxes)}")
\`\`\`

## Sanoatda Qo'llanilishi

* **Aqlli Shahar va Yo'l Harakati:** Chorrahalarda avtomobillar oqimini tartibga solish va qoidabuzarliklarni avtomatik qayd etish.
* **Tibbiyot:** Rentgen va MRT tasvirlarida o'simtalarni va mikroskopik o'zgarishlarni soniyalar ichida aniqlash.
* **Chakana Savdo (Retail):** Do'konlarda kassasiz to'lov tizimlari va xaridorlar xatti-harakatini tahlil qilish uchun robot-kameralar.
`,
    coverImageUrl: "https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=800&auto=format&fit=crop",
    publishedAt: "2026-07-15T11:00:00.000Z",
    readingTime: "3 daqiqa",
    category: { name: "Computer Vision", slug: "computer-vision" },
    author: {
      name: "Sardor Rahmonov",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    },
  },
  {
    id: 4,
    title: "Cursor va v0: AI yordamida dasturlashda dasturchilar unumdorligini 10 barobar oshirish",
    slug: "cursor-va-v0-dasturlash-asboblari",
    excerpt: "AI kod assistentlari tez sur'atda rivojlanmoqda. Cursor muharriri va v0 UI generatori dasturchilarning kundalik ish uslubini butunlay o'zgartirib yubordi.",
    content: `# Cursor va v0: AI yordamida dasturlashda dasturchilar unumdorligini 10 barobar oshirish

So'nggi yillarda sun'iy intellekt dasturiy ta'minot yaratish jarayonini tezlashtiruvchi eng kuchli vositaga aylandi. Ayniqsa, ikki yirik vosita — **Cursor (AI Code Editor)** va **v0 (Vercel tomonidan yaratilgan UI generatori)** dasturchilar orasida juda mashhur bo'ldi. Ushbu vositalar yordamida g'oyadan tayyor mahsulotgacha bo'lgan vaqt bir necha haftadan bir necha soatgacha qisqardi.

## Cursor nima va u nega VS Code o'rnini egallaoqda?

Cursor — bu VS Code asosida yaratilgan, ammo AI imkoniyatlari chuqur integratsiya qilingan kod muharriridir. Uning eng muhim afzalliklari:

* **Composer (Ctrl+I):** Butun loyiha bo'ylab bir vaqtning o'zida bir nechta fayllarni tahrirlash yoki yangi funksionallikni to'liq yozish imkonini beradi.
* **Context Awareness:** Muharrir loyihangizdagi barcha fayllarni tushunadi. Siz unga: *"@App.tsx ichidagi state va unga bog'liq API chaqiruvini optimallashtir"* deb buyruq bersangiz, u loyihani tushungan holda eng to'g'ri kodni taklif qiladi.
* **Inline Edit:** Kod yozayotganda Ctrl+K tugmalari orqali istalgan qatorni joyida o'zgartirish oson.

## v0 bilan bir zumda Frontend yaratish

**v0.dev** — bu Vercel kompaniyasining mahsuloti bo'lib, u oddiy matnli tavsif (prompt) asosida to'liq va mukammal React, Tailwind CSS va Shadcn UI komponentlarini yaratib beradi.

Masalan:
> *"Menga qora rangdagi, neonli AI Yangiliklari sayti uchun qidiruv va filtrli bento-grid kartochkalari bo'lgan sahifa yaratib ber"*

v0 sizga bir necha soniya ichida tayyor, interaktiv va responsive UI kodini taqdim etadi. Siz ushbu kodni to'g'ridan-to'g'ri loyihangizga nusxalab qo'shishingiz mumkin.

## Xulosa

AI yordamida dasturlash dasturchilar ishini kamaytirmaydi, balki ularni ijodiy va arxitekturaviy masalalarga ko'proq e'tibor qaratishga undaydi. Bugungi kunda ushbu vositalarni o'rganish va amaliyotga joriy qilish har bir dasturchi uchun zaruratga aylanib ulgurdi.
`,
    coverImageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
    publishedAt: "2026-07-10T16:45:00.000Z",
    readingTime: "4 daqiqa",
    category: { name: "AI Tools", slug: "ai-tools" },
    author: {
      name: "Jasur Alimov",
      avatarUrl: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?q=80&w=150&auto=format&fit=crop",
    },
  },
  {
    id: 5,
    title: "AI Agentlar biznesda: Kompaniyalarda xarajatlarni 60% gacha kamaytirish imkoniyati",
    slug: "ai-agentlar-korxonalarda-strategiya",
    excerpt: "Ko'plab yetakchi korxonalar oddiy chatbotlardan voz kechib, ma'lum vazifalarni mustaqil bajaruvchi AI Agentlar tizimiga o'tishni boshladilar.",
    content: `# AI Agentlar biznesda: Kompaniyalarda xarajatlarni 60% gacha kamaytirish imkoniyati

Mijozlarni qo'llab-quvvatlash, hujjatlar bilan ishlash va ma'lumotlarni qayta ishlash — har qanday biznesning eng ko'p resurs talab qiladigan operatsiyalaridir. Sun'iy intellektning yangi avlodi, ya'ni **AI Agentlar** ushbu operatsiyalarni butunlay avtomatlashtirishga qodir.

## Chatbot va AI Agent o'rtasidagi farq nima?

Ko'pchilik hanuzgacha ularni bitta narsa deb hisoblaydi, ammo farqi juda katta:

* **Chatbotlar:** Faqat oldindan belgilangan savol-javob ssenariylari yoki berilgan matn doirasida javob qaytaradi. Ular mustaqil qaror qabul qilolmaydi.
* **AI Agentlar:** Oldiga qo'yilgan umumiy maqsadni tushunadi, reja tuzadi, tashqi vositalar (API, CRM, Excel, E-mail) bilan ishlaydi va maqsadga erishguncha mustaqil harakat qiladi.

## Haqiqiy Case Study (Amaliy Misol)

Yirik logistika kompaniyasi o'z mijozlarining yuklarni kuzatish va hisob-faktura olish so'rovlarini qayta ishlash uchun AI Agent tizimini joriy qildi.

Tizim ishlash tartibi:
1. Mijozdan kelgan xatni tahlil qilish (Natural Language Understanding).
2. Ichki ombor bazasidan (ERP) yuk holatini tekshirish.
3. Agar to'lov kechikkan bo'lsa, avtomatik hisob-faktura generatsiya qilish.
4. Mijozga batafsil ma'lumot va PDF hisob-fakturani e-mail orqali jo'natish.

Natijada kompaniya mijozlarga javob berish vaqtini **45 daqiqadan 12 soniyaga** tushirdi va bu yo'nalishdagi xarajatlarni **64% ga** qisqartirdi.

## AI Agentlarni joriy etish uchun nimalar kerak?

Biznesingizda AI agentlardan foydalanish uchun quyidagi bosqichlarni amalga oshirish zarur:
* **Vazifani aniq belgilash:** Qaysi takrorlanuvchi jarayonlarni avtomatlashtirish mumkinligini aniqlash.
* **Ma'lumotlar bazasini tayyorlash:** AI to'g'ri foydalanishi uchun qo'llanma va hujjatlarni raqamlashtirish.
* **Xavfsizlik qoidalari:** Agentning vakolatlari va ruxsatnomalarini (guardrails) qat'iy cheklash.
`,
    coverImageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    publishedAt: "2026-07-05T08:20:00.000Z",
    readingTime: "5 daqiqa",
    category: { name: "Biznes", slug: "biznes" },
    author: {
      name: "Madina Malikova",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    },
  },
  {
    id: 6,
    title: "Sora 2 va video generatsiya texnologiyasining kinoindustriyadagi inqilobi",
    slug: "sora-2-video-generatsiya-kelajagi",
    excerpt: "Sora 2 platformasi matn asosida 4K sifatli, mukammal fizikaga va kamera harakatlariga ega bo'lgan 2 daqiqalik videolarni soniyalar ichida yaratmoqda.",
    content: `# Sora 2 va video generatsiya texnologiyasining kinoindustriyadagi inqilobi

Generativ AI vizual san'at va video yaratish yo'nalishini misli ko'rilmagan tezlikda o'zgartirmoqda. OpenAI o'zining video yaratish modeli — **Sora 2** ning yopiq sinov bosqichini boshladi. Ushbu model rejissyorlar, 3D rassomlar va marketologlar uchun mutlaqo yangi ijodiy ufqlarni ochib bermoqda.

## Sora 2 ning Asosiy Yutuqlari

Sora loyihasining birinchi versiyasi juda ta'sirli bo'lsa-da, ba'zida fizik qonunlarni buzardi (masalan, ob'ektlar havoda erib ketardi yoki noto'g'ri tomonga harakatlanardi). Yangi versiyada quyidagi muammolar hal qilingan:

* **Mukammal Fizika Simulyatori:** Suvning to'lqinlanishi, shishaning sinishi va kiyimlarning shamolda hilpirashi real fizika qonuniyatlariga to'liq mos keladi.
* **Kamera Nazorati:** Rejissyorlar videoning kamera harakatini (Dolly, Pan, Tilt, Zoom) matn orqali to'g'ridan-to'g'ri boshqarishi mumkin.
* **Uzoqroq Xronometraj:** Endi bitta prompt yordamida **2 daqiqagacha** bo'lgan, sahnalari mantiqan bir-biriga bog'langan va barqaror qahramonlarga ega videolarni yaratish mumkin.

## Kino va Reklama Sanoatiga Ta'siri

Katta byudjetli filmlar yoki kichik reklama roliklari yaratishda eng ko'p mablag' joy tanlash (location scouting), qimmatbaho kameralar va post-production (3D grafika) jarayonlariga sarflanadi. Sora 2 ushbu jarayonlarni kompyuter qarshisida o'tirib hal qilish imkonini beradi.

Albatta, bu aktyorlar va operatorlar o'rnini to'liq egallaydi degani emas. Aksincha, u ijodkorlarga o'z g'oyalarini juda tez va minimal xarajat bilan vizualizatsiya qilish (storyboarding) imkonini beradi.
`,
    coverImageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop",
    publishedAt: "2026-07-01T10:00:00.000Z",
    readingTime: "3 daqiqa",
    category: { name: "Computer Vision", slug: "computer-vision" },
    author: {
      name: "Sardor Rahmonov",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    },
  }
];

// Local state initialization helper
function initDatabase() {
  const storedArticles = localStorage.getItem("local_articles");
  const storedCategories = localStorage.getItem("local_categories");

  if (!storedArticles) {
    localStorage.setItem("local_articles", JSON.stringify(DEFAULT_ARTICLES));
  }
  if (!storedCategories) {
    localStorage.setItem("local_categories", JSON.stringify(DEFAULT_CATEGORIES));
  }
}

// Ensure database has elements
initDatabase();

// Load Articles
export async function getArticles(
  categorySlug?: string,
  searchQuery?: string,
  includeArchived = false
): Promise<{ data: Article[]; error: string | null }> {
  initDatabase();
  
  // Minor synthetic delay for clean skeleton loading effect
  await new Promise((resolve) => setTimeout(resolve, 300));

  try {
    const raw = localStorage.getItem("local_articles") || "[]";
    let articles: Article[] = JSON.parse(raw);

    // Apply archiving filter
    if (!includeArchived) {
      articles = articles.filter((article) => article.isArchived !== true);
    }

    // Apply category filtering
    if (categorySlug && categorySlug !== "all") {
      articles = articles.filter(
        (article) => article.category && article.category.slug === categorySlug
      );
    }

    // Apply search filter
    if (searchQuery && searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      articles = articles.filter(
        (article) =>
          article.title.toLowerCase().includes(q) ||
          article.excerpt.toLowerCase().includes(q) ||
          article.content.toLowerCase().includes(q)
      );
    }

    // Sort by published date descending (latest first)
    articles.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return { data: articles, error: null };
  } catch (err: any) {
    return { data: [], error: "Ma'lumotlarni o'qishda xatolik yuz berdi" };
  }
}

// Load Article by Slug
export async function getArticleBySlug(
  slug: string
): Promise<{ data: Article | null; error: string | null }> {
  initDatabase();
  await new Promise((resolve) => setTimeout(resolve, 150));

  try {
    const raw = localStorage.getItem("local_articles") || "[]";
    const articles: Article[] = JSON.parse(raw);
    const found = articles.find((a) => a.slug === slug);
    return { data: found || null, error: null };
  } catch (err) {
    return { data: null, error: "Maqolani yuklashda xatolik yuz berdi" };
  }
}

// Fetch Categories
export async function getCategories(): Promise<{ data: Category[]; error: string | null }> {
  initDatabase();
  try {
    const raw = localStorage.getItem("local_categories") || "[]";
    const categories: Category[] = JSON.parse(raw);
    return { data: categories, error: null };
  } catch (err) {
    return { data: DEFAULT_CATEGORIES, error: null };
  }
}

// Related articles helper
export async function getRelatedArticles(
  currentArticle: Article,
  limit = 3
): Promise<Article[]> {
  initDatabase();
  try {
    const raw = localStorage.getItem("local_articles") || "[]";
    const articles: Article[] = JSON.parse(raw);
    const category = currentArticle.category?.slug;

    const filtered = articles.filter(
      (article) =>
        article.id !== currentArticle.id &&
        (!category || (article.category && article.category.slug === category))
    );

    return filtered.slice(0, limit);
  } catch (err) {
    return [];
  }
}

// Generate an elegant Slug from Title (handles Cyrillic/Uzbek chars easily)
export function generateSlug(text: string): string {
  const mapping: { [key: string]: string } = {
    "o'": "o", "g'": "g", "sh": "sh", "ch": "ch", "oʻ": "o", "gʻ": "g",
    "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "е": "e", "ё": "yo",
    "ж": "j", "з": "z", "и": "i", "й": "y", "к": "k", "л": "l", "м": "m",
    "н": "n", "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u",
    "ф": "f", "х": "h", "ц": "ts", "ч": "ch", "ш": "sh", "щ": "sch",
    "ъ": "", "ы": "y", "ь": "", "э": "e", "ю": "yu", "я": "ya"
  };

  let clean = text.toLowerCase();
  for (const key in mapping) {
    clean = clean.replace(new RegExp(key, "g"), mapping[key]);
  }

  return clean
    .replace(/[^a-z0-9\s-]/g, "") // remove non-alphanumeric except spaces/dashes
    .trim()
    .replace(/\s+/g, "-")         // replace spaces with single dashes
    .replace(/-+/g, "-");         // replace multiple dashes with single
}

// Save or Update Article
export async function saveArticle(articleInput: Partial<Article>): Promise<{ success: boolean; data?: Article; error?: string }> {
  initDatabase();
  try {
    const raw = localStorage.getItem("local_articles") || "[]";
    const articles: Article[] = JSON.parse(raw);

    // Compute reading time
    const contentText = articleInput.content || "";
    const wordCount = contentText.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 200));
    const readingTime = `${minutes} daqiqa`;

    // Excerpt generation if empty
    let excerpt = articleInput.excerpt || "";
    if (!excerpt && contentText) {
      // Remove markdown chars briefly
      const cleanText = contentText
        .replace(/[#*`_\[\]]/g, "")
        .substring(0, 160)
        .trim();
      excerpt = cleanText + (contentText.length > 160 ? "..." : "");
    }

    // Default author object
    const defaultAuthor = {
      name: "Tahririyat",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop"
    };

    if (articleInput.id) {
      // EDIT EXISTING
      const idx = articles.findIndex((a) => a.id === articleInput.id);
      if (idx === -1) {
        return { success: false, error: "Maqola topilmadi" };
      }

      const existing = articles[idx];
      const updated: Article = {
        ...existing,
        title: articleInput.title || existing.title,
        slug: articleInput.title ? generateSlug(articleInput.title) : existing.slug,
        content: contentText || existing.content,
        excerpt: excerpt || existing.excerpt,
        coverImageUrl: articleInput.coverImageUrl || existing.coverImageUrl,
        category: articleInput.category !== undefined ? articleInput.category : existing.category,
        readingTime,
        author: articleInput.author || existing.author || defaultAuthor,
        isArchived: articleInput.isArchived !== undefined ? articleInput.isArchived : existing.isArchived,
      };

      articles[idx] = updated;
      localStorage.setItem("local_articles", JSON.stringify(articles));
      return { success: true, data: updated };
    } else {
      // CREATE NEW
      if (!articleInput.title || !articleInput.content) {
        return { success: false, error: "Sarlavha va maqola matni talab qilinadi" };
      }

      const maxId = articles.reduce((max, a) => (a.id > max ? a.id : max), 0);
      const newArticle: Article = {
        id: maxId + 1,
        title: articleInput.title,
        slug: generateSlug(articleInput.title),
        content: contentText,
        excerpt: excerpt,
        coverImageUrl: articleInput.coverImageUrl || "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=800&auto=format&fit=crop",
        publishedAt: new Date().toISOString(),
        readingTime,
        category: articleInput.category || null,
        author: articleInput.author || defaultAuthor,
        isArchived: articleInput.isArchived || false,
      };

      // Add as first element or push
      articles.unshift(newArticle);
      localStorage.setItem("local_articles", JSON.stringify(articles));
      return { success: true, data: newArticle };
    }
  } catch (err: any) {
    return { success: false, error: err.message || "Xatolik yuz berdi" };
  }
}

// Delete Article
export async function deleteArticle(id: number): Promise<{ success: boolean; error?: string }> {
  initDatabase();
  try {
    const raw = localStorage.getItem("local_articles") || "[]";
    let articles: Article[] = JSON.parse(raw);
    const initialLen = articles.length;
    articles = articles.filter((a) => a.id !== id);

    if (articles.length === initialLen) {
      return { success: false, error: "O'chiriladigan maqola topilmadi" };
    }

    localStorage.setItem("local_articles", JSON.stringify(articles));
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Xatolik yuz berdi" };
  }
}

// Save or Update Category
export async function saveCategory(categoryInput: Partial<Category>): Promise<{ success: boolean; data?: Category; error?: string }> {
  initDatabase();
  try {
    const raw = localStorage.getItem("local_categories") || "[]";
    const categories: Category[] = JSON.parse(raw);

    if (!categoryInput.name) {
      return { success: false, error: "Turkum nomi talab qilinadi" };
    }

    const generatedSlug = generateSlug(categoryInput.name);

    if (categoryInput.id) {
      // EDIT EXISTING
      const idx = categories.findIndex((c) => c.id === categoryInput.id);
      if (idx === -1) {
        return { success: false, error: "Turkum topilmadi" };
      }

      const existing = categories[idx];
      const updated: Category = {
        ...existing,
        name: categoryInput.name,
        slug: generatedSlug,
      };

      // Update in stored category list
      categories[idx] = updated;
      localStorage.setItem("local_categories", JSON.stringify(categories));

      // Also update all articles with this category to reflect name changes
      const articlesRaw = localStorage.getItem("local_articles") || "[]";
      const articles: Article[] = JSON.parse(articlesRaw);
      let updatedArticlesCount = 0;
      const updatedArticles = articles.map((article) => {
        if (article.category && article.category.slug === existing.slug) {
          updatedArticlesCount++;
          return {
            ...article,
            category: { name: updated.name, slug: updated.slug },
          };
        }
        return article;
      });
      if (updatedArticlesCount > 0) {
        localStorage.setItem("local_articles", JSON.stringify(updatedArticles));
      }

      return { success: true, data: updated };
    } else {
      // CREATE NEW
      // Check if duplicate slug exists
      if (categories.some((c) => c.slug === generatedSlug)) {
        return { success: false, error: "Ushbu turkum allaqachon mavjud" };
      }

      const maxId = categories.reduce((max, c) => (c.id > max ? c.id : max), 0);
      const newCategory: Category = {
        id: maxId + 1,
        name: categoryInput.name,
        slug: generatedSlug,
      };

      categories.push(newCategory);
      localStorage.setItem("local_categories", JSON.stringify(categories));
      return { success: true, data: newCategory };
    }
  } catch (err: any) {
    return { success: false, error: err.message || "Xatolik yuz berdi" };
  }
}

// Delete Category
export async function deleteCategory(id: number): Promise<{ success: boolean; error?: string }> {
  initDatabase();
  try {
    const rawCat = localStorage.getItem("local_categories") || "[]";
    let categories: Category[] = JSON.parse(rawCat);
    const toDelete = categories.find((c) => c.id === id);

    if (!toDelete) {
      return { success: false, error: "O'chiriladigan turkum topilmadi" };
    }

    categories = categories.filter((c) => c.id !== id);
    localStorage.setItem("local_categories", JSON.stringify(categories));

    // Nullify or dissociate category for articles belonging to this deleted category
    const articlesRaw = localStorage.getItem("local_articles") || "[]";
    const articles: Article[] = JSON.parse(articlesRaw);
    const updatedArticles = articles.map((article) => {
      if (article.category && article.category.slug === toDelete.slug) {
        return { ...article, category: null };
      }
      return article;
    });
    localStorage.setItem("local_articles", JSON.stringify(updatedArticles));

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message || "Xatolik yuz berdi" };
  }
}

// Reset Local Database back to high-quality defaults
export function resetToDefaults(): void {
  localStorage.setItem("local_articles", JSON.stringify(DEFAULT_ARTICLES));
  localStorage.setItem("local_categories", JSON.stringify(DEFAULT_CATEGORIES));
}
