const USTA_TEMPLATES = {
  seramik: {
    id: "seramik",
    name: "Murat Usta",
    surname: "Yılmaz",
    title: "Seramik & Fayans Uzmanı",
    slogan: "Milimetrik İşçilik, Kusursuz Zeminler",
    phone: "0532 123 45 67",
    whatsapp: "905321234567",
    email: "murat.usta@ustam.com",
    experience: "14",
    projects: "380+",
    rating: "4.9",
    about: "14 yılı aşkın süredir banyo, mutfak, teras ve zeminlerinizde seramik, fayans, granit ve mermer kaplama işlerini titizlikle yapıyorum. 'Önce kalite ve milimetrik doğruluk' prensibiyle, her projeyi kendi evim gibi özenle işliyorum. Lazer hizalama teknolojisi ve birinci sınıf yapıştırıcı malzemeler kullanarak uzun ömürlü ve estetik alanlar yaratıyorum.",
    themeColor: "#0284c7", // Sky blue/ocean blue for tiling
    services: [
      {
        title: "Banyo & Mutfak Yenileme",
        description: "Eski seramiklerin kırılması, sıva ve şap hazırlığı, su yalıtımı uygulaması ve modern fayans kaplama işleri anahtar teslim yapılır.",
        icon: "fa-bath"
      },
      {
        title: "Granit & Büyük Ebat Seramik",
        description: "60x120, 80x80 ve daha büyük ebatlardaki granit ve porselen seramiklerin profesyonel ekipmanlarla, derzsiz veya derz dolgulu montajı.",
        icon: "fa-th-large"
      },
      {
        title: "Tezgah Arası Fayans",
        description: "Mutfak tezgah arkası için şık metro fayans, mozaik veya özel tasarım seramiklerin hassas kesim ve hatasız işçilikle döşenmesi.",
        icon: "fa-columns"
      },
      {
        title: "Teras & Balkon Kaplama",
        description: "Açık alanlarda hava koşullarına dayanıklı, çift bileşenli su yalıtımı uygulaması ile donmaya karşı dayanıklı seramik döşeme.",
        icon: "fa-sun"
      }
    ],
    beforeAfter: {
      title: "Banyo Yenileme Projesi",
      description: "20 yıllık eski banyonun tamamen sökülerek su yalıtımlı modern granit kaplamaya dönüştürülmesi çalışmamız.",
      before: "assets/seramik-before.jpg",
      after: "assets/seramik-after.jpg",
      beforeLabel: "Eski & Harabe Hali",
      afterLabel: "Murat Usta Dokunuşu"
    },
    gallery: [
      { title: "Lüks Banyo Duvar Kaplama", category: "Banyo", image: "assets/seramik-g1.jpg" },
      { title: "Mutfak Tezgah Arası Metro Seramik", category: "Mutfak", image: "assets/seramik-g2.jpg" },
      { title: "Geniş Salon Granit Zemin", category: "Zemin", image: "assets/seramik-g3.jpg" },
      { title: "Teras Islak Zemin & Yalıtım", category: "Dış Mekan", image: "assets/seramik-g4.jpg" },
      { title: "Modern Derz Uygulaması", category: "Detaylar", image: "assets/seramik-g5.jpg" },
      { title: "Havuz İçi Mozaik Döşeme", category: "Dış Mekan", image: "assets/seramik-g6.jpg" }
    ],
    pricing: {
      unitName: "Metrekare (m²)",
      basePrice: 350,
      options: [
        { name: "Standart Fayans Döşeme (İşçilik)", price: 350 },
        { name: "Büyük Ebat Granit (60x120 ve üzeri)", price: 500 },
        { name: "Su Yalıtımı Uygulaması (Çift Kat)", price: 150 },
        { name: "Eski Seramik Kırma & Moloz Taşıma", price: 200 }
      ]
    },
    testimonials: [
      { name: "Kadir Şen", location: "Kadıköy, İstanbul", comment: "Banyomuzun seramik döşemesi için Murat Usta ile çalıştık. İşçiliği inanılmaz temiz, çizgiler milimetrik oturdu. Söz verdiği günde işi teslim etti.", rating: 5, date: "2 ay önce" },
      { name: "Zeynep Demir", location: "Ataşehir, İstanbul", comment: "Mutfak tezgah arası için getirdiğimiz zorlu mozaikleri hatasız döşedi. Çok saygılı ve temiz çalışan bir usta, kesinlikle tavsiye ederim.", rating: 5, date: "3 hafta önce" },
      { name: "Ahmet Koz", location: "Kartal, İstanbul", comment: "Terasımızın zemin kaplamasını yaptı. Yağmurlarda sızdırma problemi sıfıra indi, su akarı çok güzel ayarlanmış. Eline sağlık usta.", rating: 4, date: "5 ay önce" }
    ]
  },

  insaat: {
    id: "insaat",
    name: "Hasan Usta",
    surname: "Karaca",
    title: "Kalıp, Duvar & Kaba İnşaat Ustası",
    slogan: "Geleceğe Sağlam Yapılar, Güvenli Temeller",
    phone: "0543 987 65 43",
    whatsapp: "905439876543",
    email: "hasan.usta@ustam.com",
    experience: "22",
    projects: "620+",
    rating: "4.8",
    about: "22 yıllık şantiye ve yapı tecrübemle; temel betonundan çatıya, tuğla duvardan betonarme kalıba kadar tüm kaba inşaat ve tadilat işlerinizi deprem yönetmeliğine ve projesine tam uyumlu şekilde yapıyorum. Demir bağlama, kalıp çakma ve gazbeton/tuğla örme işlerinde uzman kadromla hizmetinizdeyim.",
    themeColor: "#d97706", // Amber/construction gold for building
    services: [
      {
        title: "Kaba İnşaat & Betonarme",
        description: "Temel, kolon, kiriş ve tabliye betonu için kalıp kurulumu, demir donatı döşenmesi ve beton döküm işleri.",
        icon: "fa-tools"
      },
      {
        title: "Tuğla & Ytong (Gazbeton) Duvar",
        description: "İç ve dış bölme duvarların projeye uygun, terazisinde, ısı ve ses yalıtım standartlarına dikkat edilerek örülmesi.",
        icon: "fa-border-all"
      },
      {
        title: "Bahçe Duvarı & Taş Duvar",
        description: "Mülkünüzün etrafına estetik ve dayanıklı hazır beton duvar, briket duvar veya dekoratif doğal taş duvar yapımı.",
        icon: "fa-hammer"
      },
      {
        title: "Ev Genişletme & Tadilat",
        description: "Mevcut yapıların yıkım-kırım işleri, beton delme-kesme ve yeni oda/balkon ilavelerinin kaba inşaat işleri.",
        icon: "fa-home"
      }
    ],
    beforeAfter: {
      title: "Bahçe Duvarı & Çevre Düzenleme",
      description: "Toprak kayması riski olan eğimli arazinin düzeltilerek taş duvar ve betonarme istinat duvarı ile güvenli hale getirilmesi.",
      before: "assets/insaat-before.jpg",
      after: "assets/insaat-after.jpg",
      beforeLabel: "Toprak Kayması Riski",
      afterLabel: "Bitmiş Taş İstinat Duvarı"
    },
    gallery: [
      { title: "Villa Kaba İnşaat Kalıbı", category: "Kalıp", image: "assets/insaat-g1.jpg" },
      { title: "Ytong Duvar Örme İşçiliği", category: "Duvar", image: "assets/insaat-g2.jpg" },
      { title: "Doğal Taş Bahçe Duvarı", category: "Taş Duvar", image: "assets/insaat-g3.jpg" },
      { title: "Betonarme Kolon Demiri Bağlama", category: "Demir", image: "assets/insaat-g4.jpg" },
      { title: "Subasman Betonu Dökümü", category: "Beton", image: "assets/insaat-g5.jpg" },
      { title: "Kagir Ev Restorasyonu", category: "Tadilat", image: "assets/insaat-g6.jpg" }
    ],
    pricing: {
      unitName: "Metreküp (m³) veya m²",
      basePrice: 600,
      options: [
        { name: "Tuğla Duvar Örme (m² - İşçilik)", price: 250 },
        { name: "Ytong (Gazbeton) Duvar Örme (m² - İşçilik)", price: 280 },
        { name: "Betonarme Kalıp & Demir İşçiliği (m²)", price: 750 },
        { name: "Taş Duvar Yapımı (m³ - Malzeme Dahil Değil)", price: 1200 }
      ]
    },
    testimonials: [
      { name: "Mustafa Kaya", location: "Beykoz, İstanbul", comment: "Müstakil evimizin çevre taş duvarını Hasan Usta'ya yaptırdık. Çok sağlam oldu, görsel olarak da harika duruyor. İşinin ehli bir insan.", rating: 5, date: "6 ay önce" },
      { name: "Caner Yıldız", location: "Şile, İstanbul", comment: "Şantiyemizdeki 3 katlı villanın kaba inşaat kalıp ve duvar işlerini sıfır hata ile tamamladı. Projeyi tam okuyan nadir ustalardan biri.", rating: 5, date: "1 yıl önce" },
      { name: "Mehmet Topal", location: "Pendik, İstanbul", comment: "Bina girişindeki kırılan istinat duvarının yerine betonarme perde duvar yaptı. Hızlı aksiyon aldı, temiz çalıştı.", rating: 4, date: "4 ay önce" }
    ]
  },

  boya: {
    id: "boya",
    name: "Sinan Usta",
    surname: "Öztürk",
    title: "Boya, Alçı & Dekorasyon Ustası",
    slogan: "Duvarlarınızda Sanat, Evinizde Yeni Bir Soluk",
    phone: "0535 555 12 34",
    whatsapp: "905355551234",
    email: "sinan.usta@ustam.com",
    experience: "10",
    projects: "420+",
    rating: "5.0",
    about: "10 yıldır iç ve dış mekan boya badana, alçı sıva, alçıpan asma tavan, kartonpiyer ve duvar kağıdı uygulamaları yapıyorum. Evinizi kirletmeden, eşyalarınızı özenle paketleyerek çalışır; pürüzsüz zeminler ve dalgasız boya işçiliği teslim ederim. Kaliteli boya markaları ve profesyonel astarlama teknikleri vazgeçilmezimdir.",
    themeColor: "#10b981", // Emerald green for painting/fresh decoration
    services: [
      {
        title: "İç Mekan Boya Badana",
        description: "Renk danışmanlığı, çatlak ve kabarma tamirleri, zımparalama, 1 kat astar ve 2 kat silinebilir lüks boya uygulaması.",
        icon: "fa-paint-roller"
      },
      {
        title: "Alçı Sıva & Kartonpiyer",
        description: "Dalgalı duvarların pürüzsüz hale getirilmesi için saten alçı uygulaması ve modern kartonpiyer/stropiyer montajı.",
        icon: "fa-fill-drip"
      },
      {
        title: "Alçıpan Tavan & LED Işıklık",
        description: "Salon ve koridorlar için modern alçıpan asma tavan yapımı, gizli LED ışık havuzları ve spot deliklerinin açılması.",
        icon: "fa-lightbulb"
      },
      {
        title: "Duvar Kağıdı Uygulaması",
        description: "Desen takipli ithal veya yerli duvar kağıtlarının, kabarma veya açma yapmayacak şekilde özel yapıştırıcı ile kaplanması.",
        icon: "fa-scroll"
      }
    ],
    beforeAfter: {
      title: "Salon Duvar Yenileme & Boya",
      description: "Rutubetten zarar görmüş, çatlaklarla dolu eski salon duvarının alçı sıva ile pürüzsüzleştirilip modern antrasit rengine boyanması.",
      before: "assets/boya-before.jpg",
      after: "assets/boya-after.jpg",
      beforeLabel: "Rutubetli & Çatlak Duvar",
      afterLabel: "Saten Alçı & İtalyan Boya"
    },
    gallery: [
      { title: "Modern Salon Gizli Işık Tavan", category: "Alçıpan", image: "assets/boya-g1.jpg" },
      { title: "Pürüzsüz İskandinav Yeşili Duvar", category: "Boya", image: "assets/boya-g2.jpg" },
      { title: "Geometrik Duvar Boyama Tasarımı", category: "Dekorasyon", image: "assets/boya-g3.jpg" },
      { title: "Yatak Odası Duvar Kağıdı", category: "Duvar Kağıdı", image: "assets/boya-g4.jpg" },
      { title: "Temiz Çalışma - Eşya Koruma", category: "Hizmet Süreci", image: "assets/boya-g5.jpg" },
      { title: "Dış Cephe Silikonlu Boya", category: "Dış Cephe", image: "assets/boya-g6.jpg" }
    ],
    pricing: {
      unitName: "Oda Sayısı veya m²",
      basePrice: 4000,
      options: [
        { name: "2+1 Daire Boya Badana (İşçilik)", price: 8000 },
        { name: "3+1 Daire Boya Badana (İşçilik)", price: 10000 },
        { name: "Komple Saten Alçı Çekilmesi (m²)", price: 120 },
        { name: "Alçıpan Asma Tavan (Metretül)", price: 350 }
      ]
    },
    testimonials: [
      { name: "Elif Bulut", location: "Beşiktaş, İstanbul", comment: "Evimizi boyattık ve tek bir damla boya lekesi bile kalmadı. Eşyaları kendi evlerindeki gibi sardılar. Sinan Usta ve ekibine çok teşekkür ederiz.", rating: 5, date: "1 hafta önce" },
      { name: "Murat Can", location: "Maltepe, İstanbul", comment: "Salona yaptırdığımız asma tavan ve spot aydınlatma harika oldu. Tam zamanında gelip temiz bir şekilde teslim ettiler.", rating: 5, date: "2 ay önce" },
      { name: "Sevgi Kurt", location: "Üsküdar, İstanbul", comment: "Duvar kağıdı uygulaması yaptırdık. Ek yerleri asla belli olmuyor, çok profesyonelce bir işçilik.", rating: 5, date: "3 ay önce" }
    ]
  },

  elektrik: {
    id: "elektrik",
    name: "Fatih Usta",
    surname: "Arslan",
    title: "Sertifikalı Elektrik Teknisyeni",
    slogan: "Güvenli Enerji, Akıllı Çözümler",
    phone: "0536 777 88 99",
    whatsapp: "905367778899",
    email: "fatih.usta@ustam.com",
    experience: "12",
    projects: "510+",
    rating: "4.9",
    about: "12 yıllık deneyime sahip, MEB ve Mesleki Yeterlilik belgeli elektrik ustasıyım. Ev ve iş yerlerinizin komple elektrik tesisatı yenileme, sigorta kutusu arıza/değişim, internet hattı çekimi, avize montajı ve akıllı ev sistemleri kurulumlarını TSE standartlarına uygun ve güvenli bir şekilde gerçekleştiriyorum.",
    themeColor: "#ef4444", // Red/energy amber for electrical
    services: [
      {
        title: "Komple Tesisat Yenileme",
        description: "Eski binaların tehlike arz eden kablolarının sökülmesi, halojensiz yanmaz kablolarla sıfırdan tesisat çekimi.",
        icon: "fa-bolt"
      },
      {
        title: "Pano & Sigorta Değişimi",
        description: "Atan sigortaların tespiti, kaçak akım rölesi montajı, elektrik panolarının modern ve güvenli şalterlerle yenilenmesi.",
        icon: "fa-hard-hat"
      },
      {
        title: "İnternet & Data Altyapısı",
        description: "Cat6 kablolama ile odalara internet prizi çekilmesi, modem kurulumu, telefon hattı ve fiber kablo arıza tamirleri.",
        icon: "fa-wifi"
      },
      {
        title: "Aydınlatma & Avize Montajı",
        description: "Her türlü avize, LED şerit, bahçe aydınlatması, aplik ve bina içi sensörlü lamba montaj işleri.",
        icon: "fa-lightbulb"
      }
    ],
    beforeAfter: {
      title: "Sigorta Panosu Yenileme",
      description: "Karışık, korumasız ve yangın riski taşıyan eski sigorta kutusunun sökülerek Siemens sigortalar ve Kaçak Akım Rölesi ile modernize edilmesi.",
      before: "assets/elektrik-before.jpg",
      after: "assets/elektrik-after.jpg",
      beforeLabel: "Eski Yangın Riski",
      afterLabel: "Kaçak Akım Korumalı Yeni Pano"
    },
    gallery: [
      { title: "Düzenli Sigorta Kutusu Montajı", category: "Pano", image: "assets/elektrik-g1.jpg" },
      { title: "Gizli LED ve Spot Aydınlatma", category: "Aydınlatma", image: "assets/elektrik-g2.jpg" },
      { title: "Sıva Altı Kablo Kanalı Açma", category: "Tesisat", image: "assets/elektrik-g3.jpg" },
      { title: "Akıllı Ev Akıllı Priz Montajı", category: "Akıllı Ev", image: "assets/elektrik-g4.jpg" },
      { title: "Cat6 Kablo Çekim ve Testi", category: "İnternet", image: "assets/elektrik-g5.jpg" },
      { title: "Bahçe Duvarı Aydınlatma Projesi", category: "Aydınlatma", image: "assets/elektrik-g6.jpg" }
    ],
    pricing: {
      unitName: "Adet veya Nokta Sayısı",
      basePrice: 150,
      options: [
        { name: "Priz / Anahtar Nokta Değişimi (Adet)", price: 100 },
        { name: "Avize Montajı (Adet)", price: 250 },
        { name: "Kaçak Akım Rölesi Dahil Pano Yenileme", price: 1500 },
        { name: "Komple Daire Elektrik Kablolama (m² başı)", price: 180 }
      ]
    },
    testimonials: [
      { name: "Turgut Alp", location: "Sarıyer, İstanbul", comment: "Evdeki sürekli atan sigorta sorununu yarım saatte çözdü. Kaçak akım rölesi takarak tesisatı güvenli hale getirdi. Çok profesyonel.", rating: 5, date: "1 ay önce" },
      { name: "Nihal Şahin", location: "Kartal, İstanbul", comment: "Yeni taşındığımız evin tüm avizelerini taktı, internet kablosunu duvardan geçirdi. Çok temiz ve pratik çalıştı, fiyatları da makul.", rating: 5, date: "2 hafta önce" },
      { name: "Bünyamin Ak", location: "Ümraniye, İstanbul", comment: "İş yerimizin data kablolamasını yaptı. Hız testlerini beraber yaptık, hepsi sorunsuz çalışıyor. Eline sağlık.", rating: 4, date: "4 ay önce" }
    ]
  },

  tesisat: {
    id: "tesisat",
    name: "Yusuf Usta",
    surname: "Güneş",
    title: "Sıhhi Tesisat & Isıtma Uzmanı",
    slogan: "Sızıntısız Çözümler, Konforlu Yaşam Alanları",
    phone: "0537 444 33 22",
    whatsapp: "905374443322",
    email: "yusuf.usta@ustam.com",
    experience: "16",
    projects: "470+",
    rating: "4.8",
    about: "16 yıllık tesisat tecrübemle; temiz su ve pis su tesisatı yenileme, termal kamera ile kırmadan su kaçağı tespiti, petek temizliği, kombi montajı ve vitrifiye (klozet, lavabo, batarya) montajı yapıyorum. En yeni teknolojik cihazlar ve kaliteli PPRC borularla sorunlarınıza kesin ve garantili çözümler sunuyorum.",
    themeColor: "#0d9488", // Teal/water color for plumbing
    services: [
      {
        title: "Su Kaçağı Tespiti & Tamir",
        description: "Akustik dinleme cihazları ve termal kameralar kullanarak evinizi boş yere kırmadan, noktasal kaçak tespiti ve tamiri.",
        icon: "fa-search-location"
      },
      {
        title: "Temiz & Pis Su Tesisatı",
        description: "Daire içi plastik boruların (PPRC) yenilenmesi, pimaş borularının eğim ayarları ve tıkanıklık açma hizmetleri.",
        icon: "fa-tint"
      },
      {
        title: "Klozet & Batarya Montajı",
        description: "Gömme rezervuar montajı, asma klozet, lavabo, evye bataryaları ve duş sistemlerinin sızdırmaz montajı.",
        icon: "fa-wrench"
      },
      {
        title: "Petek Temizliği & Kombi",
        description: "Özel kimyasallar ve makine ile petek yıkama, radyatör vanalarının değişimi ve kombi tesisatı bağlantıları.",
        icon: "fa-fire"
      }
    ],
    beforeAfter: {
      title: "Banyo Tesisatı Yenileme",
      description: "Eski demir boruların paslanıp çürümesi sonucu oluşan sızıntıların önlenmesi amacıyla komple PPRC plastik borularla yenilenmesi.",
      before: "assets/tesisat-before.jpg",
      after: "assets/tesisat-after.jpg",
      beforeLabel: "Paslı Demir Borular",
      afterLabel: "Modern PPRC Sızdırmaz Borular"
    },
    gallery: [
      { title: "Termal Kamera ile Kaçak Tespiti", category: "Kaçak Tespiti", image: "assets/tesisat-g1.jpg" },
      { title: "PPRC Kollektör Grubu Montajı", category: "Tesisat", image: "assets/tesisat-g2.jpg" },
      { title: "Gömme Rezervuar Kurulumu", category: "Vitrifiye", image: "assets/tesisat-g3.jpg" },
      { title: "Makine ile Petek Temizleme", category: "Isıtma", image: "assets/tesisat-g4.jpg" },
      { title: "Duş Bataryası ve Sızdırmazlık", category: "Vitrifiye", image: "assets/tesisat-g5.jpg" },
      { title: "Kanalizasyon Borusu Yenileme", category: "Pimaş", image: "assets/tesisat-g6.jpg" }
    ],
    pricing: {
      unitName: "Hizmet Bedeli",
      basePrice: 300,
      options: [
        { name: "Batarya / Musluk Değişimi (Adet)", price: 300 },
        { name: "Klozet Montajı (Rezervuar Dahil)", price: 800 },
        { name: "Kırmadan Termal Kameralı Kaçak Tespiti", price: 1200 },
        { name: "Makine ile Kombi Petek Temizliği", price: 1500 }
      ]
    },
    testimonials: [
      { name: "Hakan Yurt", location: "Bakırköy, İstanbul", comment: "Alt komşuya sızan suyun yerini termal kamera ile nokta atışı buldu ve sadece tek bir fayans kırarak tamiratı yaptı. Çok memnun kaldık.", rating: 5, date: "2 hafta önce" },
      { name: "Merve Koç", location: "Tuzla, İstanbul", comment: "Mutfak ve banyo bataryalarımızı değiştirdi. Çok temiz çalıştı, contaları çift kat sarıp sızdırmazlığı garantiledi. Güvenilir usta.", rating: 5, date: "1 ay önce" },
      { name: "Süleyman Aksu", location: "Üsküdar, İstanbul", comment: "Petek temizliği yaptırdık, evdeki ısınma kalitesi gözle görülür şekilde arttı. Eline koluna sağlık usta.", rating: 5, date: "3 ay önce" }
    ]
  }
};
