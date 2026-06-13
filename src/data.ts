import { Recipe, Category, UserProfile } from './types';

export const INITIAL_CATEGORIES: Category[] = [
  { id: 'kahvalti', name: 'Kahvaltı', iconName: 'Egg', color: 'bg-amber-100 text-amber-600', iconColor: 'text-amber-600' },
  { id: 'aksam', name: 'Akşam Yemeği', iconName: 'Utensils', color: 'bg-emerald-100 text-emerald-600', iconColor: 'text-emerald-600' },
  { id: 'tatli', name: 'Tatlılar', iconName: 'Cake', color: 'bg-rose-100 text-rose-500', iconColor: 'text-rose-500' },
  { id: 'atistirmalik', name: 'Atıştırmalık', iconName: 'Cookie', color: 'bg-orange-100 text-orange-600', iconColor: 'text-orange-600' },
  { id: 'icecek', name: 'İçecekler', iconName: 'Coffee', color: 'bg-blue-100 text-blue-500', iconColor: 'text-blue-500' }
];

export const CURRENT_USER: UserProfile = {
  name: "Şef Arda Yılmaz",
  email: "chef@mutfak.com",
  bio: "Geleneksel Türk mutfağını modern tekniklerle yorumlamayı seven bir yemek tutkunu. Her tarif bir hikaye anlatır.",
  avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=400",
  recipesCount: 42,
  followersCount: "12.8k",
  followingCount: 215,
  isFollowing: false
};

export const INITIAL_RECIPES: Recipe[] = [
  {
    id: 'lasagna',
    title: 'Ev Yapımı Lazanya',
    description: 'Klasik İtalyan usulü, bol beşamel soslu ve taptaze Akdeniz yeşillikleriyle nefis kıymalı lazanya.',
    category: 'aksam',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800',
    duration: 50,
    difficulty: 'Orta',
    servings: 6,
    ingredients: [
      '12 adet Lazanya Yaprağı',
      '500g Dana Kıyma',
      '1 adet Kuru Soğan',
      '2 diş Sarımsak',
      '2 adet Havuç',
      '2 yemek kaşığı Domates Salçası',
      '400g Rende Domates',
      '4 yemek kaşığı Un',
      '4 yemek kaşığı Tereyağı',
      '3 su bardağı Süt',
      '1 su bardağı Rendelenmiş Kaşar Peyniri',
      'Tuz, Karabiber, Muskat Rendesi'
    ],
    instructions: [
      'Bolognese Sosu: Tavada soğan, sarımsak ve rendelenmiş havucu soteleyin. Kıymayı ekleyip kavurun. Salçayı, domatesleri, tuz ve karabiberi ekleyip 20 dk pişirin.',
      'Beşamel Sosu: Sos tenceresinde tereyağını eritin, unu ekleyip kokusu çıkana kadar kavurun. Soğuk sütü azar azar ekleyip çırpın. Kaynayınca tuz, karabiber ve muskat ekleyip ocaktan alın.',
      'Fırın Kabını Hazırlama: Dikdörtgen borcam tabanına ince bir kat beşamel sos sürün. Üzerine lazanya yapraklarını dizin.',
      'Katları Çıkma: Yaprakların üzerine bolognese sos, beşamel sos ve rendelenmiş kaşar dökün. Bu işlemi 4 kat boyunca tekrarlayın. En üst kata sadece beşamel ve bol kaşar dökün.',
      'Fırınlama: Önceden ısıtılmış 180 derece fırında üzeri kızarana kadar yaklaşık 30-35 dakika pişirin. Dilimlemeden önce 15 dakika dinlendirin.'
    ],
    isFavorite: false,
    authorName: 'Şef Arda Yılmaz',
    authorAvatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=200',
    rating: 4.9,
    tags: ['İtalyan', 'Doyurucu', 'Günün Tarifi'],
    dateAdded: '2026-06-13'
  },
  {
    id: '1',
    title: 'Kremalı Mantarlı Makarna',
    description: 'Klasik İtalyan usulü enfes kremalı ve mantarlı tagliatelle makarna.',
    category: 'aksam',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&q=80&w=800',
    duration: 30,
    difficulty: 'Kolay',
    servings: 4,
    ingredients: [
      '500g Tagliatelle Makarna',
      '300g İstiridye Mantarı',
      '200ml Sıvı Krema',
      '2 diş Sarımsak',
      '2 yemek kaşığı Tereyağı',
      'Taze Maydanoz',
      'Tuz ve Karabiber'
    ],
    instructions: [
      'Makarnayı Haşlayın: Bol tuzlu suda makarnaları "al dente" kıvamında haşlayın. Süzmeden önce bir bardak makarna suyu ayırın.',
      'Mantarları Soteleyin: Tereyağını tavada eritip doğranmış mantarları ve sarımsağı ekleyin. Mantarlar suyunu çekip kızarana kadar soteleyin.',
      'Sosla Birleştirin: Kremayı, tuzu ve karabiberi ekleyip hafifçe kaynatın. Ayırdığınız makarna suyunu ekleyerek kıvamı ayarlayın.',
      'Servis Edin: Makarnaları sosa ekleyip iyice harmanlayın. Üzerine ince kıyılmış maydanoz serperek sıcak servis edin.'
    ],
    isFavorite: true,
    authorName: 'Şef Ahmet Yılmaz',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    rating: 4.8,
    tags: ['Vejetaryen', 'Pratik', 'Favori'],
    dateAdded: '2026-06-10'
  },
  {
    id: '2',
    title: 'Ev Yapımı Burger',
    description: 'Ev yapımı sulu dana köftesi, erimiş cheddar peyniri ve karamelize soğan sosu ile.',
    category: 'aksam',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    duration: 25,
    difficulty: 'Orta',
    servings: 2,
    ingredients: [
      '400g Dana Kıyma (%20 yağlı)',
      '2 adet Burger Ekmeği',
      '2 dilim Cheddar Peyniri',
      '1 adet Kuru Soğan',
      'Domates ve Marul',
      'Karamelize Soğan Sosu',
      'Tuz ve Karabiber'
    ],
    instructions: [
      'Köfteyi Hazırlayın: Kıymaya sadece tuz ve karabiber ekleyip yoğurmadan iki büyük köfte şekli verin. Ortalarına hafifçe bastırın.',
      'Ekmekleri Isıtın: Burger ekmeklerini ortadan ikiye bölüp tavada iç kısımlarını hafifçe tereyağı ile kızartın.',
      'Köfteleri Pişirin: Kızgın döküm tavada köftelerin her iki yüzünü de 3\'er dakika pişirin. Pişmeye yakın cheddar dilimlerini üzerlerine koyun, eriyene kadar kapatın.',
      'Birleştirme: Ekmek tabanına sos sürün, üzerine marul, köfte (üzerinde cheddar ile), domates dilimi ve üst ekmeği koyarak servis yapın.'
    ],
    isFavorite: true,
    authorName: 'Şef Volkan Kaya',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 4.9,
    tags: ['Doyurucu', 'Et', 'Klasik'],
    dateAdded: '2026-06-12'
  },
  {
    id: '3',
    title: 'Taze Meyveli Tart',
    description: 'Çıtır tart hamuru üzerinde kremsi pastacı kreması ve taze çilek, kivi meyveleri.',
    category: 'tatli',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=800',
    duration: 50,
    difficulty: 'Zor',
    servings: 8,
    ingredients: [
      '250g Un',
      '125g Soğuk Tereyağı',
      '1 adet Yumurta',
      '50g Pudra Şekeri',
      '300ml Pastacı Kreması',
      'Mevsim Meyveleri (Çilek, Kivi, Yaban Mersini)',
      'Tuz'
    ],
    instructions: [
      'Tart Hamurunu Yapın: Un, pudra şekeri, biraz tuz ve küp soğuk tereyağını kum kıvamına gelene kadar karıştırın. Yumurtayı ekleyip hamuru toparlayın. Streçleyip dolapta 30 dk dinlendirin.',
      'Tartı Pişirin: Hamuru açıp tart kalıbına yerleştirin. Çatalla delikler açıp üzerine yağlı kağıt ve ağırlık (nohut gibi) koyun. 180 derece fırında 20 dk fırınlayın, sonra ağırlığı alıp 10 dk daha pişirin.',
      'Kremayı Hazırlayın: Pastacı kremasını pürüzsüz olana kadar çırpın ve soğuyan tart tabanına yayın.',
      'Süsleyin: Üzerine taze dilimlenmiş çilek, kivi ve yaban mersini dizip parlatıcı jöle sürerek servis edin.'
    ],
    isFavorite: false,
    authorName: 'Şef Arda Yılmaz',
    authorAvatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=200',
    rating: 4.7,
    tags: ['Tatlı', 'Şık', 'Meyveli'],
    dateAdded: '2026-06-08'
  },
  {
    id: '4',
    title: 'Mercimek Köftesi',
    description: 'Tam kıvamında, taze baharatlar ve yeşilliklerle bezenmiş geleneksel lezzet.',
    category: 'atistirmalik',
    image: 'https://images.unsplash.com/photo-1547058881-aa0edd92aab3?auto=format&fit=crop&q=80&w=800',
    duration: 40,
    difficulty: 'Kolay',
    servings: 6,
    ingredients: [
      '1 su bardağı Kırmızı Mercimek',
      '1.5 su bardağı İnce Bulgur',
      '1 adet Kuru Soğan',
      '1 yemek kaşığı Biber Salçası',
      '1 yemek kaşığı Domates Salçası',
      '1 çay bardağı Zeytinyağı',
      'Taze Soğan ve Maydanoz',
      'Limon, Limon Suyu, Tuz, Pul Biber, Kimyon',
      'Yıkamak için Marul Yaprakları'
    ],
    instructions: [
      'Mercimeği Haşlayın: Yıkanmış mercimeği 3 su bardağı su ile yumuşayana kadar haşlayın. Suyunu çekmeye yakın bulguru ekleyip karıştırın ve tencerenin kapağını kapatıp 15 dk dinlendirin.',
      'Sosu Hazırlayın: Tavada zeytinyağında ince doğranmış soğanı kavurun. Salçaları ekleyip kokusu çıkana kadar kavurmaya devam edin.',
      'Yoğurun: Dinlenen mercimekli bulgura sıcak salçalı sosu ekleyip iyice yoğurun.',
      'Yeşillikleri Ekleyin: İnce kıyılmış taze soğan, maydanoz, tuz, pul biber, kimyon ve limon suyunu ekleyip hafifçe karıştırın. Avucunuzla şekil verip marul yaprakları üzerinde servis yapın.'
    ],
    isFavorite: false,
    authorName: 'Şef Arda Yılmaz',
    authorAvatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=200',
    rating: 4.6,
    tags: ['Geleneksel', 'Vegan', 'Pratik'],
    dateAdded: '2026-06-05'
  },
  {
    id: '5',
    title: 'Kuzu Tandır',
    description: 'Döküm tencerede fırınlanmış, lime lime dökülen geleneksel lezzet.',
    category: 'aksam',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    duration: 45,
    difficulty: 'Zor',
    servings: 4,
    ingredients: [
      '1.5 kg Kuzu Kol',
      '4 diş Sarımsak',
      '1 yemek kaşığı Tereyağı',
      '2 dal Taze Biberiye',
      'Tuz, Karabiber, Kekik',
      'Zeytinyağı (marinesi için)'
    ],
    instructions: [
      'Etleri Marine Edin: Kuzu etine sarımsak, tuz, karabiber, kekik ve zeytinyağı ile her yerine gelecek şekilde masaj yapın.',
      'Mühürleyin: Kızgın bir döküm tencerede etin her tarafını yüksek ateşte mühürleyin.',
      'Fırınlama: Pişirme kağıdına sarıp fırın poşetine koyun veya döküm tencerenin kapağını kapatıp 150 derece fırında yaklaşık 3 saat yavaşça pişirin.',
      'Servis: Lif lif ayrılan eti tane pilav eşliğinde sıcak servis yapın.'
    ],
    isFavorite: false,
    authorName: 'Şef Arda Yılmaz',
    authorAvatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=200',
    rating: 4.9,
    tags: ['Zengin', 'Yavaş Pişmiş', 'Et],'],
    dateAdded: '2026-06-04'
  },
  {
    id: '6',
    title: 'Zeytinyağlı Enginar',
    description: 'Ege esintili, taze garnitürle doldurulmuş şifa deposu zeytinyağlı yemek.',
    category: 'aksam',
    image: 'https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&q=80&w=800',
    duration: 20,
    difficulty: 'Kolay',
    servings: 4,
    ingredients: [
      '4 adet Temizlenmiş Enginar',
      '1 adet Kuru Soğan',
      '1 adet Patates (küp doğranmış)',
      '1 adet Havuç (küp doğranmış)',
      '1 su bardağı Bezelye',
      '1 çay bardağı Zeytinyağı',
      '1 adet Limon',
      'Taze Dereotu',
      'Biraz Şeker'
    ],
    instructions: [
      'Garnitürü Hazırlayın: Havuç ve patatesleri zeytinyağında hafifçe soteleyin, ardından bezelyeyi ekleyin.',
      'Enginarları Dizin: Yayvan bir tencereye enginar çanaklarını dizin. Üzerlerine hazırladığınız garnitürü paylaştırın.',
      'Suyu Ekleyin: Limon suyu, zeytinyağı, biraz tuz, şeker ve 1 çay bardağı su ekleyerek tencerenin kapağını kapatın.',
      'Pişirme ve Servis: Kısık ateşte enginarlar yumuşayana kadar (20-25 dk) pişirin. Soğuduktan sonra üzerine ince kıyılmış dereotu serperek servis yapın.'
    ],
    isFavorite: false,
    authorName: 'Şef Arda Yılmaz',
    authorAvatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=200',
    rating: 4.5,
    tags: ['Hafif', 'Sağlıklı', 'Ege'],
    dateAdded: '2026-06-03'
  },
  // Saved specific mockups
  {
    id: 's1',
    title: 'Avokadolu Nohut Salatası',
    description: 'Zengin proteinli haşlanmış nohut, kremamsı avokado kupları ve narenciye sosu.',
    category: 'atistirmalik',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    duration: 25,
    difficulty: 'Kolay',
    servings: 2,
    ingredients: [
      '1 su bardağı Haşlanmış Nohut',
      '1 adet Olgun Avokado',
      '1 adet Salatalık',
      '10 adet Çeri Domates',
      'Limon Suyu ve Sızma Zeytinyağı',
      'Tuz, Kimyon, Kuru Nane'
    ],
    instructions: [
      'Salata Malzemelerini Doğrayın: Avokadoyu küp küp doğrayın. Çeri domatesleri ikiye bölün. Salatalıkları dilimleyin.',
      'Karıştırın: Haşlanmış nohutları büyük bir salata kasesine alın, doğranmış sebzeleri ekleyin.',
      'Soslama: Zeytinyağı, sıkılmış taze limon suyu, tuz, kimyon ve kuru naneyi ekleyip hafifçe harmanlayarak servis edin.'
    ],
    isFavorite: true,
    authorName: 'Şef Pelin Yeşil',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    rating: 4.7,
    tags: ['VEGAN', 'PRATİK'],
    dateAdded: '2026-06-01'
  },
  {
    id: 's2',
    title: 'Gökkuşağı Sebze Kasesi',
    description: 'Fırınlanmış tatlı patates, kinoa, taze kara lahana ve avokadolu besleyici kase.',
    category: 'aksam',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=800',
    duration: 15,
    difficulty: 'Kolay',
    servings: 1,
    ingredients: [
      '1/2 su bardağı Kinoa',
      '1/2 Tatlı Patates',
      '3-4 yaprak Kale (Kara Lahana)',
      '1/2 Avokado',
      'Tahin Sosu (tahin, limon, ılık su)'
    ],
    instructions: [
      'Kinoayı Haşlayın: Kinoayı 1 su bardağı su ile haşlayıp süzün.',
      'Sebzeleri Pişirin: Tatlı patatesi dilimleyip fırında yumuşayana kadar pişirin. Kara lahana yapraklarını buharda hafif soteleyin.',
      'Tahin Sosu Hazırlayışı: Tahin, limon suyu, tuz ve ılık suyu pürüzsüz kıvam alana dek çırpın.',
      'Kaseyi Birleştirin: Kinoayı tabağa yayın. Üzerine patates, lahana, avokado dilimlerini dizip sosu gezdirin.'
    ],
    isFavorite: true,
    authorName: 'Şef Sinan Bulut',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    rating: 4.8,
    tags: ['HAFİF', 'DİYET'],
    dateAdded: '2026-05-30'
  },
  {
    id: 's3',
    title: 'Klasik Domates Soslu Makarna',
    description: 'Sarımsak, taze fesleğen ve yavaş pişmiş İtalyan pomodoro domates sosu ile spagetti.',
    category: 'aksam',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800',
    duration: 45,
    difficulty: 'Kolay',
    servings: 3,
    ingredients: [
      '300g Spagetti Makarna',
      '500g Roma Domatesi (püre yapılmış)',
      '3 diş Sarımsak',
      '1 yemek kaşığı Domates Salçası',
      'Taze Fesleğen Yaprakları',
      'Sızma Zeytinyağı',
      'Tuz ve Karabiber'
    ],
    instructions: [
      'Sarımsakları Kavurun: Geniş bir tencerede zeytinyağında ezilmiş sarımsakları kokusu çıkana kadar soteleyin.',
      'Sosun Kaynatılması: Domates püresini, makarnanın haşlama suyundan yarım kepçe ekleyerek sos yapın. Salça ve fesleğeni ilave edin. Kısık ateşte 20-30 dakika kıvam alana kadar pişirin.',
      'Makarna ve Birleşim: Makarnayı haşladıktan sonra süzün ve domates sosu ile bir araya getirip 2 dakika ocakta sosu çektirin. Üzerine taze fesleğen ve parmesan ile servis yapın.'
    ],
    isFavorite: true,
    authorName: 'Şef Arda Yılmaz',
    authorAvatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=200',
    rating: 4.7,
    tags: ['DOYURUCU'],
    dateAdded: '2026-05-28'
  },
  {
    id: 's4',
    title: 'Bal Kabaklı Yulaf Pankek',
    description: 'Yulaf unu, bal kabağı püresi ve sonbahar baharatları ile yapılan glütensiz hafif kahvaltılık pankek.',
    category: 'kahvalti',
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=800',
    duration: 20,
    difficulty: 'Kolay',
    servings: 2,
    ingredients: [
      '1 su bardağı Yulaf Unu',
      '1/2 su bardağı Bal Kabağı Püresi',
      '1 adet Yumurta',
      '1/2 su bardağı Badem Sütü',
      '1 yemek kaşığı Akçaağaç Şurubu veya Bal',
      '1 çay kaşığı Kabartma Tozu',
      'Tarçın, Muskat Rendesi'
    ],
    instructions: [
      'Karışımı Hazırlayın: Yumurtayı çırpın. Bal kabağı püresi, süt ve şurubu ekleyip homojen bir kıvama getirin.',
      'Kuru Malzemeler: Yulaf unu, kabartma tozu, tarçın ve muskatı miksere koyup ıslak malzemelerle pürüzsüzleşene kadar birleştirin.',
      'Kızartma: Tavayı yağlayıp harçtan bir kepçe dökün. Üzeri göz göz olana kadar (~2 dk) pişirip diğer tarafını da 1.5 dk pişirin.',
      'Servis: Üzerine ceviz, muz dilimleri ve bal gezdirerek sıcak kahvaltı edin.'
    ],
    isFavorite: true,
    authorName: 'Şef Arda Yılmaz',
    authorAvatar: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=200',
    rating: 4.6,
    tags: ['KAHVALTI'],
    dateAdded: '2026-05-25'
  },
  {
    id: 'icecek-1',
    title: 'Naneli Ev Yapımı Limonata',
    description: 'Sıcak yaz günlerinde içinizi ferahlatacak, taze nane yaprakları ve limon kabuğu aromalı klasik ev yapımı limonata.',
    category: 'icecek',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800',
    duration: 15,
    difficulty: 'Kolay',
    servings: 4,
    ingredients: [
      '5 adet Limon',
      '1 su bardağı Toz Şeker',
      '1 demet Taze Nane',
      '5 su bardağı Soğuk Su',
      'Yarım su bardağı Buz'
    ],
    instructions: [
      'Limonları Hazırlayın: 4 adet limonun kabuklarını rendenin ince tarafıyla rendeleyin. Limonların sularını sıkın.',
      'Şekerle Yoğurun: Rendelenmiş limon kabuklarını, toz şekeri ve taze nane yapraklarının yarısını geniş bir kaba alıp ellerinizle şeker eriyip limon yağı çıkana kadar iyice yoğurun.',
      'Sıvıları Ekleyin: Karışıma sıktığınız limon suyunu ve soğuk suyu ekleyip karıştırın. Şeker tamamen eriyene kadar karıştırmaya devam edin.',
      'Süzün ve Servis Edin: Limonatayı ince bir süzgeç yardımıyla sürahiye aktarın. Kalan taze nane yaprakları ve bol buz ekleyerek soğuk servis yapın.'
    ],
    isFavorite: false,
    authorName: 'Şef Volkan Kaya',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 4.8,
    tags: ['Ferahlatıcı', 'Pratik', 'Soğuk'],
    dateAdded: '2026-06-13'
  },
  {
    id: 'icecek-2',
    title: 'Çilekli Hibiskus Soğuk Çay',
    description: 'Hibiskus çiçeğinin mayhoş lezzeti ile taze çileklerin eşsiz uyumu, hafif tatlandırılmış şık bir soğuk çay şöleni.',
    category: 'icecek',
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&q=80&w=800',
    duration: 20,
    difficulty: 'Kolay',
    servings: 4,
    ingredients: [
      '2 yemek kaşığı Kurutulmuş Hibiskus Çiçeği',
      '10 adet Taze Çilek',
      '3 yemek kaşığı Bal veya Akçaağaç Şurubu',
      '4 su bardağı Kaynar Su',
      '1/2 adet Limon dilimleri',
      'Bol Buz Küpü'
    ],
    instructions: [
      'Demleme Aşaması: Hibiskusları demliğe alın ve üzerine kaynar suyu ilave edin. Yaklaşık 10 dakika demlenmeye bırakıp ardından süzerek oda sıcaklığına gelmesini bekleyin.',
      'Çilek Püresi: Çilekleri temizleyin. Bal ile birlikte mutfak robotundan geçirerek pürüzsüz bir püre kıvamına getirin.',
      'Birleştirme: Demlenen ve soğuyan hibiskus çayına çilek püresini ve limon dilimlerini ekleyip iyice karıştırın.',
      'Servis: Bardaklara bolca buz doldurun, soğuk çay karışımını bardaklara dökün. Üzerini taze çilek dilimleriyle süsleyerek servis edin.'
    ],
    isFavorite: false,
    authorName: 'Şef Pelin Yeşil',
    authorAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    rating: 4.9,
    tags: ['Gurme', 'Yazlık', 'Sağlıklı'],
    dateAdded: '2026-06-13'
  }
];

export const PROFILE_POPULAR_IMAGES = [
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=400', // Lezzet Tabağı 1 (Gourmet Plate)
  'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400', // Pizza
  'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=400', // Chocolate cake
  'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=400', // Veggie salad
  'https://images.unsplash.com/photo-1582515073490-39981397c445?auto=format&fit=crop&q=80&w=400'  // Asparagus / Carrots
];
