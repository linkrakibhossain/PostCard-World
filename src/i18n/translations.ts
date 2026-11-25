import { Language } from '../types/postcard';

export interface TranslationSchema {
  brand: {
    name: string;
    tagline: string;
    subTagline: string;
  };
  nav: {
    home: string;
    postcards: string;
    quotes: string;
    gallery: string;
    categories: string;
    favorites: string;
    createPostcard: string;
    menuOpen: string;
    menuClose: string;
  };
  hero: {
    kicker: string;
    headline: string;
    subheadline: string;
    primaryCta: string;
    secondaryCta: string;
    previewCaption: string;
    sampleRecipient: string;
    sampleQuote: string;
    sampleSender: string;
  };
  search: {
    placeholder: string;
    resultsTitle: string;
    noResults: string;
    clear: string;
    postcardsMatch: string;
    quotesMatch: string;
    galleryMatch: string;
    categoriesMatch: string;
  };
  home: {
    chooseCategory: string;
    viewAllCategories: string;
    popularSection: string;
    newSection: string;
    romanticSection: string;
    rainySection: string;
    letterSection: string;
    exploreAll: string;
  };
  cards: {
    useTemplate: string;
    useQuote: string;
    viewArtwork: string;
    downloadArtwork: string;
    addFavorite: string;
    removeFavorite: string;
    copyQuote: string;
    copied: string;
    nonEditableNote: string;
  };
  postcardsPage: {
    title: string;
    subtitle: string;
    allCategories: string;
    showingCount: string;
    emptyState: string;
  };
  quotesPage: {
    title: string;
    subtitle: string;
    allCategories: string;
    showingCount: string;
    emptyState: string;
  };
  galleryPage: {
    title: string;
    subtitle: string;
    allCategories: string;
    viewOnlyNotice: string;
    showingCount: string;
    emptyState: string;
    closeModal: string;
  };
  categoriesPage: {
    title: string;
    subtitle: string;
    backToCategories: string;
    templatesLabel: string;
    quotesLabel: string;
    galleryLabel: string;
    postcardsHeading: string;
    quotesHeading: string;
    galleryHeading: string;
  };
  favoritesPage: {
    title: string;
    subtitle: string;
    tabPostcards: string;
    tabQuotes: string;
    tabGallery: string;
    emptyPostcards: string;
    emptyQuotes: string;
    emptyGallery: string;
    browsePostcards: string;
    browseQuotes: string;
    browseGallery: string;
  };
  generator: {
    pageTitle: string;
    pageSubtitle: string;
    step1Title: string;
    step2Title: string;
    surpriseMe: string;
    ownTextHeading: string;
    ownTextPlaceholder: string;
    applyOwnText: string;
    fieldsHeading: string;
    recipientLabel: string;
    recipientDefault: string;
    mainTextLabel: string;
    senderLabel: string;
    senderDefault: string;
    dateLabel: string;
    datePlaceholder: string;
    customizeHeading: string;
    fontFamily: string;
    fontSize: string;
    bold: string;
    italic: string;
    alignment: string;
    alignLeft: string;
    alignCenter: string;
    alignRight: string;
    letterSpacing: string;
    lineHeight: string;
    textColor: string;
    textPosition: string;
    posTop: string;
    posCenter: string;
    posBottom: string;
    resetTextStyle: string;
    vintageEffectsHeading: string;
    exportSizeHeading: string;
    exportFormatHeading: string;
    downloadHdBtn: string;
    livePreviewLabel: string;
    allTemplatesOption: string;
    allQuotesOption: string;
  };
  fonts: {
    'elegant-bengali': string;
    handwritten: string;
    'vintage-serif': string;
    typewriter: string;
    classic: string;
    calligraphy: string;
    'old-newspaper': string;
  };
  effects: {
    original: string;
    sepia: string;
    'old-paper': string;
    faded: string;
    bw: string;
    'film-grain': string;
    dust: string;
    scratch: string;
    'coffee-stain': string;
    'warm-vintage': string;
  };
  exportSizes: {
    postcard: string;
    'ig-square': string;
    'ig-story': string;
    'fb-post': string;
    'wa-status': string;
  };
  downloadGate: {
    title: string;
    description: string;
    visitSponsorBtn: string;
    sponsorOpenedNote: string;
    preparingText: string;
    lockedBtn: string;
    readyBadge: string;
    downloadNowBtn: string;
    downloadingText: string;
    cancelBtn: string;
    stepNote: string;
  };
  footer: {
    tagline: string;
    linksTitle: string;
    legalTitle: string;
    privacy: string;
    terms: string;
    contact: string;
    copyright: string;
    privacyBody: string;
    termsBody: string;
    contactBody: string;
    close: string;
  };
}

export const translations: Record<Language, TranslationSchema> = {
  bn: {
    brand: {
      name: 'PostCard World',
      tagline: 'পুরনো দিনের অনুভূতি, আজকের ভালোবাসার জন্য।',
      subTagline: 'ভিন্টেজ প্রেমের পোস্টকার্ড সংগ্রহশালা',
    },
    nav: {
      home: 'হোম',
      postcards: 'পোস্টকার্ড',
      quotes: 'উক্তি',
      gallery: 'Vintage Gallery',
      categories: 'ক্যাটাগরি',
      favorites: 'আমার পছন্দ',
      createPostcard: '✨ পোস্টকার্ড তৈরি করুন',
      menuOpen: 'মেনু খুলুন',
      menuClose: 'মেনু বন্ধ করুন',
    },
    hero: {
      kicker: 'আর্কাইভাল ভিন্টেজ এডিশন',
      headline: 'পুরনো দিনের অনুভূতি, আজকের ভালোবাসার জন্য।',
      subheadline:
        'আপনার প্রিয় মানুষটির জন্য তৈরি করুন একটি সুন্দর Vintage Postcard। প্রাক-নকশাকৃত কার্ড বেছে নিন, হৃদয়ছোঁয়া বাংলা উক্তি বা নিজের লেখা বসান এবং মুহূর্তেই HD ডাউনলোড করুন।',
      primaryCta: '✨ পোস্টকার্ড তৈরি করুন',
      secondaryCta: '🖼️ Vintage Gallery দেখুন',
      previewCaption: 'নমুনা ভিন্টেজ পোস্টকার্ড · ৩x HD প্রিন্ট মান',
      sampleRecipient: 'প্রিয়তমা',
      sampleQuote: 'তোমার কথা মনে পড়লে পুরনো দিনের চিঠিগুলোও যেন কথা বলে।',
      sampleSender: 'ইতি, তোমার চিরদিনের',
    },
    search: {
      placeholder: 'উক্তি বা পোস্টকার্ড খুঁজুন...',
      resultsTitle: 'অনুসন্ধানের ফলাফল',
      noResults: 'কোনো মিল খুঁজে পাওয়া যায়নি। অন্য কোনো শব্দ যেমন "বৃষ্টি", "চিঠি", বা "ভালোবাসা" দিয়ে খুঁজুন।',
      clear: 'মুছে ফেলুন',
      postcardsMatch: 'পোস্টকার্ড টেমপ্লেট',
      quotesMatch: 'প্রেমের উক্তি',
      galleryMatch: 'Vintage Gallery',
      categoriesMatch: 'ক্যাটাগরি',
    },
    home: {
      chooseCategory: 'ক্যাটাগরি বেছে নিন',
      viewAllCategories: 'সব ক্যাটাগরি দেখুন',
      popularSection: '🔥 জনপ্রিয় পোস্টকার্ড',
      newSection: '✨ নতুন পোস্টকার্ড',
      romanticSection: '❤️ Romantic Collection',
      rainySection: '🌧️ Rainy Love Collection',
      letterSection: '💌 Vintage Letter Collection',
      exploreAll: 'সবগুলো দেখুন',
    },
    cards: {
      useTemplate: 'ব্যবহার করুন',
      useQuote: 'ব্যবহার করুন',
      viewArtwork: 'দেখুন',
      downloadArtwork: 'ডাউনলোড',
      addFavorite: 'পছন্দে যোগ করুন',
      removeFavorite: 'পছন্দ থেকে সরান',
      copyQuote: 'কপি করুন',
      copied: 'কপি হয়েছে',
      nonEditableNote: 'প্রস্তুতকৃত ভিন্টেজ আর্টওয়ার্ক',
    },
    postcardsPage: {
      title: 'ভিন্টেজ পোস্টকার্ড লাইব্রেরি',
      subtitle: 'পুরনো চিঠির খাম, বর্ষার জানলা, জ্যোৎস্না রাত কিংবা রেলস্টেশনের স্মৃতি—পছন্দের কার্ড বেছে নিয়ে সাজিয়ে নিন।',
      allCategories: 'সব ক্যাটাগরি',
      showingCount: 'টি পোস্টকার্ড প্রদর্শিত হচ্ছে',
      emptyState: 'এই ক্যাটাগরিতে কোনো পোস্টকার্ড পাওয়া যায়নি।',
    },
    quotesPage: {
      title: 'বাংলা ও ইংরেজি প্রেমের উক্তি',
      subtitle: 'হৃদয়ছোঁয়া কবিতা, বিরহ, ভালোবাসা এবং পুরনো দিনের স্মৃতির উক্তি। এক ক্লিকেই পোস্টকার্ডে ব্যবহার করুন।',
      allCategories: 'সব ক্যাটাগরি',
      showingCount: 'টি উক্তি',
      emptyState: 'কোনো উক্তি পাওয়া যায়নি।',
    },
    galleryPage: {
      title: '🖼️ Vintage Quote Gallery',
      subtitle: 'পূর্ব-নকশাকৃত সম্পূর্ণ ভিন্টেজ পোস্টকার্ড সংগ্রহ। সরাসরি প্রিভিউ দেখুন এবং উচ্চমানের HD সংস্করণ ডাউনলোড করুন।',
      allCategories: 'সব ক্যাটাগরি',
      viewOnlyNotice: 'এই গ্যালারির প্রতিটি আর্টওয়ার্ক আগে থেকেই সম্পূর্ণ ডিজাইন করা (সম্পাদনাযোগ্য নয়)।',
      showingCount: 'টি আর্টওয়ার্ক',
      emptyState: 'এই ক্যাটাগরিতে কোনো গ্যালারি আর্টওয়ার্ক নেই।',
      closeModal: 'বন্ধ করুন',
    },
    categoriesPage: {
      title: 'সকল আর্কাইভ ক্যাটাগরি',
      subtitle: 'অনুভূতি, আবহ ও উপলক্ষ অনুযায়ী সাজানো ভিন্টেজ পোস্টকার্ড এবং উক্তির সংগ্রহ।',
      backToCategories: '← সব ক্যাটাগরিতে ফিরুন',
      templatesLabel: 'পোস্টকার্ড',
      quotesLabel: 'উক্তি',
      galleryLabel: 'গ্যালারি',
      postcardsHeading: 'এই ক্যাটাগরির পোস্টকার্ড',
      quotesHeading: 'এই ক্যাটাগরির উক্তি',
      galleryHeading: 'এই ক্যাটাগরির গ্যালারি আর্টওয়ার্ক',
    },
    favoritesPage: {
      title: '♡ আমার পছন্দ',
      subtitle: 'আপনার সংরক্ষিত পছন্দের পোস্টকার্ড, উক্তি ও গ্যালারি আর্টওয়ার্ক (কোনো লগইন প্রয়োজন নেই)।',
      tabPostcards: 'পোস্টকার্ড',
      tabQuotes: 'উক্তি',
      tabGallery: 'গ্যালারি',
      emptyPostcards: 'এখনো কোনো পোস্টকার্ড পছন্দে যোগ করা হয়নি।',
      emptyQuotes: 'এখনো কোনো উক্তি পছন্দে যোগ করা হয়নি।',
      emptyGallery: 'এখনো কোনো গ্যালারি ছবি পছন্দে যোগ করা হয়নি।',
      browsePostcards: 'পোস্টকার্ড দেখুন',
      browseQuotes: 'উক্তি দেখুন',
      browseGallery: 'গ্যালারি দেখুন',
    },
    generator: {
      pageTitle: '💌 Vintage Postcard Generator',
      pageSubtitle: 'পছন্দের কার্ড ও উক্তি নির্বাচন করুন, নিজের মতো সাজিয়ে নিন এবং HD কোয়ালিটিতে ডাউনলোড করুন।',
      step1Title: '১. পোস্টকার্ড নির্বাচন করুন',
      step2Title: '২. উক্তি নির্বাচন করুন',
      surpriseMe: '🎲 Surprise Me',
      ownTextHeading: '✍️ অথবা নিজের লেখা লিখুন',
      ownTextPlaceholder: 'এখানে আপনার নিজের লেখা লিখুন...',
      applyOwnText: 'লেখাটি ব্যবহার করুন',
      fieldsHeading: '৩. প্রাপক ও প্রেরকের তথ্য',
      recipientLabel: 'প্রাপক',
      recipientDefault: 'প্রিয়তমা',
      mainTextLabel: 'মূল লেখা',
      senderLabel: 'প্রেরক',
      senderDefault: 'ইতি, তোমার...',
      dateLabel: 'তারিখ (ঐচ্ছিক)',
      datePlaceholder: 'যেমন: ২৫ নভেম্বর, ২০২৬',
      customizeHeading: '৪. অক্ষর ও বিন্যাস সাজান',
      fontFamily: 'ফন্ট শৈলী',
      fontSize: 'ফন্টের আকার',
      bold: 'বোল্ড',
      italic: 'ইটালিক',
      alignment: 'অ্যালাইনমেন্ট',
      alignLeft: 'বাম',
      alignCenter: 'মাঝ',
      alignRight: 'ডান',
      letterSpacing: 'অক্ষরের ফাঁক',
      lineHeight: 'লাইনের উচ্চতা',
      textColor: 'লেখার রঙ',
      textPosition: 'লেখার অবস্থান',
      posTop: 'উপরে',
      posCenter: 'মাঝখানে',
      posBottom: 'নিচে',
      resetTextStyle: 'Reset Text Style',
      vintageEffectsHeading: '৫. ভিন্টেজ এফেক্ট',
      exportSizeHeading: '৬. ছবির মাপ (Ratio)',
      exportFormatHeading: 'ফাইল ফরম্যাট',
      downloadHdBtn: '⬇️ HD পোস্টকার্ড ডাউনলোড করুন',
      livePreviewLabel: 'লাইভ পোস্টকার্ড প্রিভিউ',
      allTemplatesOption: 'সব ডিজাইন',
      allQuotesOption: 'সব উক্তি',
    },
    fonts: {
      'elegant-bengali': 'এলিগ্যান্ট বাংলা (Noto Serif)',
      handwritten: 'হাতের লেখা (Galada)',
      'vintage-serif': 'ভিন্টেজ সেরিফ (Tiro Bangla)',
      typewriter: 'টাইপরাইটার (Courier)',
      classic: 'ক্লাসিক আর্কাইভ (Cormorant)',
      calligraphy: 'ক্যালিগ্রাফি (Atma)',
      'old-newspaper': 'পুরনো সংবাদপত্র (Editorial)',
    },
    effects: {
      original: 'Original',
      sepia: 'Sepia',
      'old-paper': 'Old Paper',
      faded: 'Faded',
      bw: 'Black & White',
      'film-grain': 'Film Grain',
      dust: 'Dust',
      scratch: 'Scratch',
      'coffee-stain': 'Coffee Stain',
      'warm-vintage': 'Warm Vintage',
    },
    exportSizes: {
      postcard: 'Postcard (3:2)',
      'ig-square': 'Instagram Square (1:1)',
      'ig-story': 'Instagram Story (9:16)',
      'fb-post': 'Facebook Post (1.91:1)',
      'wa-status': 'WhatsApp Status (9:16)',
    },
    downloadGate: {
      title: '💌 আপনার পোস্টকার্ড প্রস্তুত',
      description: 'ডাউনলোড চালু করার আগে Sponsor Page দেখুন।',
      visitSponsorBtn: '👁️ Sponsor দেখুন',
      sponsorOpenedNote: 'নতুন ট্যাবে Sponsor Page খোলা হয়েছে। অনুগ্রহ করে অপেক্ষা করুন...',
      preparingText: 'Download প্রস্তুত হচ্ছে...',
      lockedBtn: '🔒 Download Locked',
      readyBadge: '✅ Download Ready',
      downloadNowBtn: '⬇️ DOWNLOAD NOW',
      downloadingText: 'HD ফাইল তৈরি হচ্ছে...',
      cancelBtn: 'বাতিল করুন',
      stepNote: 'Sponsor বাটনে ক্লিক করার পর ৮ সেকেন্ড কাউন্টডাউন শুরু হবে।',
    },
    footer: {
      tagline: 'পুরনো দিনের অনুভূতি, আজকের ভালোবাসার জন্য।',
      linksTitle: 'দ্রুত লিংক',
      legalTitle: 'তথ্য ও নীতিমালা',
      privacy: 'Privacy Policy',
      terms: 'Terms',
      contact: 'Contact',
      copyright: '© ২০২৬ PostCard World. সর্বস্বত্ব সংরক্ষিত।',
      privacyBody:
        'PostCard World আপনার কোনো ব্যক্তিগত ছবি বা বার্তা সার্ভারে সংরক্ষণ করে না। আপনার লেখা এবং পছন্দের তালিকা (Favorites) শুধুমাত্র আপনার ব্রাউজারের localStorage-এ সুরক্ষিত থাকে। ডাউনলোডের সময় সম্পূর্ণ প্রক্রিয়া আপনার ডিভাইসেই সম্পন্ন হয়।',
      termsBody:
        'এই ওয়েবসাইটের সকল পোস্টকার্ড ডিজাইন ও উক্তি ব্যক্তিগত উপহার ও সামাজিক মাধ্যমে শুভেচ্ছা জানানোর জন্য বিনামূল্যে ব্যবহারযোগ্য। বাণিজ্যিক পুনর্বিক্রয় অনুমোদিত নয়।',
      contactBody:
        'যেকোনো পরামর্শ, নতুন উক্তি সংযোজন অথবা কপিরাইট সংক্রান্ত তথ্যের জন্য যোগাযোগ করুন: hello@postcardworld.archive',
      close: 'বন্ধ করুন',
    },
  },
  en: {
    brand: {
      name: 'PostCard World',
      tagline: "The feeling of old days, for today's love.",
      subTagline: 'Vintage Love Postcard Archive',
    },
    nav: {
      home: 'Home',
      postcards: 'Postcards',
      quotes: 'Quotes',
      gallery: 'Vintage Gallery',
      categories: 'Categories',
      favorites: 'Favorites',
      createPostcard: '✨ Create Postcard',
      menuOpen: 'Open menu',
      menuClose: 'Close menu',
    },
    hero: {
      kicker: 'ARCHIVAL VINTAGE EDITION',
      headline: "The feeling of old days, for today's love.",
      subheadline:
        'Craft a timeless Vintage Postcard for the person you love. Select an archival card design, pair it with romantic Bangla or English words, and download in crisp HD.',
      primaryCta: '✨ Create Postcard',
      secondaryCta: '🖼️ View Vintage Gallery',
      previewCaption: 'Sample Vintage Postcard · 3x HD Print Quality',
      sampleRecipient: 'Dearest',
      sampleQuote: 'When memories of you return, even old letters begin to speak.',
      sampleSender: 'Yours forever,',
    },
    search: {
      placeholder: 'Search quotes or postcards...',
      resultsTitle: 'Search Results',
      noResults: 'No matching items found. Try searching "rain", "letter", "বৃষ্টি", or "love".',
      clear: 'Clear',
      postcardsMatch: 'Postcard Templates',
      quotesMatch: 'Romantic Quotes',
      galleryMatch: 'Vintage Gallery',
      categoriesMatch: 'Categories',
    },
    home: {
      chooseCategory: 'Choose a Category',
      viewAllCategories: 'View all categories',
      popularSection: '🔥 Popular Postcards',
      newSection: '✨ New Postcards',
      romanticSection: '❤️ Romantic Collection',
      rainySection: '🌧️ Rainy Love Collection',
      letterSection: '💌 Vintage Letter Collection',
      exploreAll: 'Explore all',
    },
    cards: {
      useTemplate: 'Use Template',
      useQuote: 'Use Quote',
      viewArtwork: 'View',
      downloadArtwork: 'Download',
      addFavorite: 'Add to Favorites',
      removeFavorite: 'Remove Favorite',
      copyQuote: 'Copy',
      copied: 'Copied',
      nonEditableNote: 'Curated Pre-Made Vintage Artwork',
    },
    postcardsPage: {
      title: 'Vintage Postcards Library',
      subtitle: 'Old wax-sealed envelopes, monsoon windows, moonlit platforms, and quiet cafés—pick a card to customize.',
      allCategories: 'All Categories',
      showingCount: 'postcards shown',
      emptyState: 'No postcards found in this category.',
    },
    quotesPage: {
      title: 'Romantic Quotes Archive',
      subtitle: 'Timeless Bengali & English lines on love, longing, rain, and cherished memories. Use any quote in one click.',
      allCategories: 'All Categories',
      showingCount: 'quotes',
      emptyState: 'No quotes found.',
    },
    galleryPage: {
      title: '🖼️ Vintage Quote Gallery',
      subtitle: 'Pre-designed archival postcards with curated typography already set. View full preview and download in HD.',
      allCategories: 'All Categories',
      viewOnlyNotice: 'Gallery artworks are pre-composed archival editions (view and download only).',
      showingCount: 'artworks',
      emptyState: 'No gallery artworks in this category.',
      closeModal: 'Close',
    },
    categoriesPage: {
      title: 'Archive Categories',
      subtitle: 'Browse vintage postcards, romantic quotes, and gallery pieces organized by mood and occasion.',
      backToCategories: '← Back to all categories',
      templatesLabel: 'Postcards',
      quotesLabel: 'Quotes',
      galleryLabel: 'Gallery',
      postcardsHeading: 'Postcards in this Category',
      quotesHeading: 'Quotes in this Category',
      galleryHeading: 'Gallery Artworks in this Category',
    },
    favoritesPage: {
      title: '♡ My Favorites',
      subtitle: 'Your saved postcards, quotes, and gallery prints stored locally on your device—no login required.',
      tabPostcards: 'Postcards',
      tabQuotes: 'Quotes',
      tabGallery: 'Gallery',
      emptyPostcards: 'You have not saved any postcards yet.',
      emptyQuotes: 'You have not saved any quotes yet.',
      emptyGallery: 'You have not saved any gallery prints yet.',
      browsePostcards: 'Browse Postcards',
      browseQuotes: 'Browse Quotes',
      browseGallery: 'Browse Gallery',
    },
    generator: {
      pageTitle: '💌 Vintage Postcard Generator',
      pageSubtitle: 'Choose a vintage template, pick or write your message, fine-tune typography, and export in HD.',
      step1Title: '1. Select Postcard',
      step2Title: '2. Select Quote',
      surpriseMe: '🎲 Surprise Me',
      ownTextHeading: '✍️ Or Write Your Own',
      ownTextPlaceholder: 'Write your own message here...',
      applyOwnText: 'Use This Text',
      fieldsHeading: '3. Letter Details',
      recipientLabel: 'Recipient',
      recipientDefault: 'Dearest',
      mainTextLabel: 'Main Message',
      senderLabel: 'Sender',
      senderDefault: 'Yours forever,',
      dateLabel: 'Date (Optional)',
      datePlaceholder: 'e.g. November 25, 2026',
      customizeHeading: '4. Typography & Layout',
      fontFamily: 'Font Family',
      fontSize: 'Font Size',
      bold: 'Bold',
      italic: 'Italic',
      alignment: 'Alignment',
      alignLeft: 'Left',
      alignCenter: 'Center',
      alignRight: 'Right',
      letterSpacing: 'Letter Spacing',
      lineHeight: 'Line Height',
      textColor: 'Text Color',
      textPosition: 'Text Position',
      posTop: 'Top',
      posCenter: 'Center',
      posBottom: 'Bottom',
      resetTextStyle: 'Reset Text Style',
      vintageEffectsHeading: '5. Vintage Effects',
      exportSizeHeading: '6. Export Size (Ratio)',
      exportFormatHeading: 'Format',
      downloadHdBtn: '⬇️ Download HD Postcard',
      livePreviewLabel: 'Live Postcard Preview',
      allTemplatesOption: 'All Designs',
      allQuotesOption: 'All Quotes',
    },
    fonts: {
      'elegant-bengali': 'Elegant Bengali (Noto Serif)',
      handwritten: 'Handwritten (Galada)',
      'vintage-serif': 'Vintage Serif (Tiro Bangla)',
      typewriter: 'Typewriter (Courier)',
      classic: 'Classic Archive (Cormorant)',
      calligraphy: 'Calligraphy (Atma)',
      'old-newspaper': 'Old Newspaper (Editorial)',
    },
    effects: {
      original: 'Original',
      sepia: 'Sepia',
      'old-paper': 'Old Paper',
      faded: 'Faded',
      bw: 'Black & White',
      'film-grain': 'Film Grain',
      dust: 'Dust',
      scratch: 'Scratch',
      'coffee-stain': 'Coffee Stain',
      'warm-vintage': 'Warm Vintage',
    },
    exportSizes: {
      postcard: 'Postcard (3:2)',
      'ig-square': 'Instagram Square (1:1)',
      'ig-story': 'Instagram Story (9:16)',
      'fb-post': 'Facebook Post (1.91:1)',
      'wa-status': 'WhatsApp Status (9:16)',
    },
    downloadGate: {
      title: '💌 Your Postcard Is Ready',
      description: 'Visit the Sponsor Page before starting your download.',
      visitSponsorBtn: '👁️ Visit Sponsor',
      sponsorOpenedNote: 'Sponsor Page opened in a new tab. Please wait for the timer...',
      preparingText: 'Preparing Download...',
      lockedBtn: '🔒 Download Locked',
      readyBadge: '✅ Download Ready',
      downloadNowBtn: '⬇️ DOWNLOAD NOW',
      downloadingText: 'Rendering HD Image...',
      cancelBtn: 'Cancel',
      stepNote: 'An 8-second countdown begins as soon as you click Visit Sponsor.',
    },
    footer: {
      tagline: "The feeling of old days, for today's love.",
      linksTitle: 'Navigation',
      legalTitle: 'Information',
      privacy: 'Privacy Policy',
      terms: 'Terms',
      contact: 'Contact',
      copyright: '© 2026 PostCard World. All rights reserved.',
      privacyBody:
        'PostCard World never uploads your personal messages or photos to any server. Your text and Favorites are stored solely in your browser localStorage, and HD image rendering occurs 100% locally on your device.',
      termsBody:
        'All postcard templates, romantic quotes, and vintage gallery artworks are free for personal gifting and social sharing. Commercial redistribution is not permitted.',
      contactBody:
        'For feedback, quote submissions, or inquiries, please reach out to: hello@postcardworld.archive',
      close: 'Close',
    },
  },
};
