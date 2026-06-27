export type Lang = "en" | "ne";

export const translations = {
  en: {
    nav: {
      home: "Home",
      forRoasters: "For Roasters",
      origin: "Origin",
      contact: "Contact",
    },
    footer: {
      tagline:
        "Building direct sourcing relationships with Nepali producers and cooperatives. First lots arriving after July 2026.",
      navigate: "Navigate",
      contactHeading: "Contact",
      disclaimer:
        "Mewa Valley Coffee is currently preparing supplier-reported Gulmi 2026 coffee information for independent UK cupping. No commercial lot claims are final until samples have been verified.",
      rights: "All rights reserved.",
    },
    hero: {
      tagline: "Premium high-altitude Nepali coffee for UK and European roasters.",
      body: "Mewa Valley Coffee connects roasters with carefully sourced green Arabica from Nepal, working directly with producers across Gulmi, Solukhumbu, Ilam and the surrounding hill districts to build transparent, lasting relationships. We are currently sourcing washed, natural and honey-processed samples for independent UK cupping.",
      forRoasters: "For Roasters",
      registerInterest: "Register Interest",
    },
    home: {
      gulmiHeading: "Gulmi 2026 Samples in Progress",
      gulmiBody:
        "We are currently in discussion with an established coffee cooperative in Gulmi District, Lumbini Province, Nepal. Supplier-reported information indicates Arabica coffee grown at 1,100+ masl (metres above sea level), washed and natural processing, moisture below 11%, and cup scores in the 81–85 range.",
      gulmiNote:
        "All supplier information is subject to sample verification, lot confirmation and independent UK cupping before any commercial offer is made.",
      exploreHeading: "Explore",
      pages: [
        { href: "/for-roasters", label: "For Roasters", desc: "What we offer, who we are, and why Nepal." },
        { href: "/origin", label: "Origin", desc: "The geography and growing conditions of Nepal's coffee hills." },
        { href: "/contact", label: "Contact", desc: "Roaster enquiry form." },
      ],
    },
    forRoasters: {
      eyebrow: "Buyers",
      title: "For Roasters",
      subtitle:
        "Mewa Valley Coffee is preparing documented Nepali green coffee samples for UK and European roasters. Our focus is on traceability, clear lot information and honest quality verification before any commercial launch.",
      whereHeading: "Where we are now",
      whereBody1:
        "We are currently speaking with an established coffee cooperative in Gulmi District, Lumbini Province, Nepal. Supplier-reported information indicates Arabica coffee grown at 1,100+ masl, washed and natural processing, moisture below 11%, and cup scores in the 81–85 range.",
      whereBody2:
        "We are treating these details as supplier-reported until samples are independently cupped in the UK. Our July 2026 sourcing visit will focus on verifying lot information, documenting processing and storage, confirming export terms, and arranging properly labelled green coffee samples for roasters.",
      supplierHeading: "Current Gulmi Supplier Information",
      supplierBannerNote: "All information below is supplier-reported · Independent UK cupping pending",
      supplierTable: [
        { field: "Origin", info: "Gulmi District, Lumbini Province, Nepal" },
        { field: "Municipality", info: "Resunga Municipality" },
        { field: "Altitude", info: "1,100+ masl" },
        { field: "Species", info: "Arabica" },
        { field: "Variety", info: "Local Gulmi Arabica, verification pending" },
        { field: "Processes", info: "Washed and natural" },
        { field: "Harvest", info: "January–March 2026" },
        { field: "Moisture", info: "Supplier-reported below 11%" },
        { field: "Cup score", info: "Supplier-reported 81–85 points" },
        { field: "Available volume", info: "Approximately 5,000–6,000kg" },
        { field: "Sample sizes", info: "300g, 1kg or 5kg green samples" },
        { field: "Export history", info: "Exporting since 1999" },
        { field: "Export markets", info: "Reported exports to France and Japan" },
        { field: "UK cupping", info: "Pending" },
      ],
      expectHeading: "What roasters can expect",
      expectIntro: "For each confirmed sample, we aim to provide:",
      expectItems: [
        "Producer or cooperative details",
        "District and growing area",
        "Altitude in masl",
        "Variety information, where known",
        "Processing method",
        "Harvest period",
        "Moisture content",
        "Available volume",
        "Export documentation status",
        "Sample size availability",
        "Cupping feedback",
        "Photos and traceability notes, where permission is granted",
      ],
      volumesHeading: "Volumes",
      volumesBody:
        "The current Gulmi supplier has reported approximately 5,000–6,000kg available across washed and natural coffees. For the UK market, we expect to begin with small sample-led pilot lots, likely 50–300kg, depending on cupping results and roaster interest.",
      pricingHeading: "Pricing",
      pricingBody:
        "Indicative pricing is available for qualified roaster and importer enquiries. Final pricing will depend on process, lot quality, volume, export terms and independent cupping results.",
      ctaEyebrow: "Interested?",
      ctaHeading: "Interested in cupping Nepali green coffee samples?",
      ctaButton: "Register Interest",
    },
    origin: {
      eyebrow: "The Terroir",
      title: "Origin",
      subtitle: "Nepal is an emerging specialty coffee origin with genuine potential. Here are the facts.",
      facts: [
        {
          label: "Country",
          value: "Nepal",
          note: "Landlocked country in South Asia, bordered by India and China (Tibet).",
        },
        {
          label: "Our focus",
          value: "Gulmi District",
          note: "Our current supplier conversations are focused on Arabica coffee from Resunga Municipality, Gulmi District, Lumbini Province.",
        },
        {
          label: "Altitude",
          value: "1,100+ masl",
          note: "Altitude varies by district and farm. Our current Gulmi supplier lead reports coffee grown at 1,100+ masl (metres above sea level). High altitude slows cherry development, concentrating sugars and producing denser beans.",
        },
        {
          label: "Variety",
          value: "Arabica",
          note: "Local Gulmi Arabica variety, verification pending. Nepal has no Robusta production at altitude.",
        },
        {
          label: "Harvest",
          value: "Jan – Mar (Gulmi)",
          note: "Harvest varies by district, altitude and producer. Our current Gulmi supplier information indicates a January–March 2026 harvest.",
        },
        {
          label: "Processing",
          value: "Washed & Natural",
          note: "Both methods are available from our current Gulmi supplier. Washed lots tend to produce cleaner, brighter cups. Naturals show more fruit character.",
        },
        {
          label: "Climate",
          value: "Subtropical Highland",
          note: "Cool dry winters, warm monsoon summers. The monsoon brings reliable rainfall critical to cherry development.",
        },
        {
          label: "Status",
          value: "Emerging Origin",
          note: "Nepal has been producing coffee commercially since the 1980s but remains largely unknown outside specialty circles. Export documentation is available from established cooperatives.",
        },
      ],
      noteHeading: "A note on the origin",
      noteBody1:
        "Gulmi District is one of Nepal's recognised coffee-growing areas. Our current supplier conversations are focused on Arabica coffee from Resunga Municipality, grown at 1,100+ masl and processed as washed and natural lots.",
      noteBody2:
        "Nepal's coffee industry is small and fragmented. Many growers are smallholders with less than a hectare under production. This makes traceability challenging but also means that direct relationships with producers or cooperatives are genuinely possible.",
      noteBody3:
        "During our July 2026 sourcing visit, we aim to document farm and cooperative details, processing methods, storage conditions, sample quality and export readiness.",
    },
    contact: {
      eyebrow: "Get in Touch",
      title: "Contact",
      subtitle:
        "Are you a roaster, importer or coffee buyer interested in evaluating Nepali green coffee? Register your interest and we will contact you when properly labelled Gulmi 2026 samples are available for UK cupping.",
      whatNextHeading: "What happens next",
      whatNext1: "We aim to respond within 2 working days.",
      whatNext2:
        "If you are a roaster interested in samples, we will add you to our list and contact you when lots are confirmed after our July 2026 sourcing trip.",
      whatNext3: "If you have questions about the origin or our sourcing approach, we are happy to talk through the details.",
      directHeading: "Direct",
      thankYouHeading: "Thank you",
      thankYouBody: "We have received your message and will aim to respond within 2 working days.",
      labels: {
        name: "Name *",
        business: "Business *",
        role: "Role *",
        email: "Email *",
        areYouA: "Are you a... *",
        interestedIn: "Are you interested in... *",
        comments: "Comments",
      },
      placeholders: {
        name: "Your full name",
        business: "Company or roastery name",
        role: "e.g. Head of Sourcing",
        email: "you@example.com",
        comments: "Any questions, context about your business, volumes you have in mind...",
      },
      selectOne: "Select one",
      typeOptions: [
        { value: "roaster", label: "Roaster" },
        { value: "importer", label: "Importer" },
        { value: "cafe", label: "Café" },
        { value: "consumer", label: "Consumer" },
        { value: "other", label: "Other" },
      ],
      interestOptions: [
        { value: "gulmi-2026", label: "Gulmi 2026 samples" },
        { value: "green-samples", label: "Green samples for cupping" },
        { value: "roaster-enquiry", label: "Roaster enquiry" },
        { value: "importer-enquiry", label: "Importer enquiry" },
        { value: "private-label", label: "Private label / contract roasting" },
        { value: "future-roasted", label: "Future roasted coffee" },
        { value: "general", label: "General information" },
      ],
      submit: "Send Enquiry",
    },
  },
  ne: {
    nav: {
      home: "गृहपृष्ठ",
      forRoasters: "रोस्टरहरूका लागि",
      origin: "उत्पत्ति",
      contact: "सम्पर्क",
    },
    footer: {
      tagline:
        "नेपाली उत्पादक र सहकारीहरूसँग प्रत्यक्ष स्रोत सम्बन्ध निर्माण गर्दै। पहिलो लटहरू जुलाई २०२६ पछि आउने छन्।",
      navigate: "नेभिगेसन",
      contactHeading: "सम्पर्क",
      disclaimer:
        "मेवा भ्याली कफीले हाल गुल्मी २०२६ कफी सम्बन्धी सप्लायरले रिपोर्ट गरेको जानकारी स्वतन्त्र यूके कपिङका लागि तयार गर्दै छ। नमूनाहरू प्रमाणित नभएसम्म कुनै पनि व्यावसायिक लट दाबी अन्तिम मानिने छैन।",
      rights: "सर्वाधिकार सुरक्षित।",
    },
    hero: {
      tagline: "यूके र युरोपका रोस्टरहरूका लागि उच्च गुणस्तरीय, उच्च-उचाइको नेपाली कफी।",
      body: "मेवा भ्याली कफीले रोस्टरहरूलाई नेपालबाट होसियारीपूर्वक स्रोत गरिएको हरियो अराबिकासँग जोड्छ, गुल्मी, सोलुखुम्बु, इलाम र वरपरका पहाडी जिल्लाहरूका उत्पादकहरूसँग प्रत्यक्ष काम गरी पारदर्शी र दिगो सम्बन्ध निर्माण गर्दै। हामी हाल स्वतन्त्र यूके कपिङका लागि धोएको, प्राकृतिक र हनी-प्रशोधित नमूना स्रोत गर्दैछौं।",
      forRoasters: "रोस्टरहरूका लागि",
      registerInterest: "चासो दर्ता गर्नुहोस्",
    },
    home: {
      gulmiHeading: "गुल्मी २०२६ नमूना तयारी क्रममा",
      gulmiBody:
        "हामी हाल नेपालको लुम्बिनी प्रदेश, गुल्मी जिल्लाको एक स्थापित कफी सहकारीसँग छलफलमा छौं। सप्लायरले रिपोर्ट गरेको जानकारी अनुसार अराबिका कफी समुद्री सतहभन्दा १,१०० मिटर माथि उत्पादन हुन्छ, धोएको र प्राकृतिक प्रशोधन विधि प्रयोग गरिन्छ, चिस्यान ११% भन्दा कम छ, र कप स्कोर ८१–८५ को दायरामा छ।",
      gulmiNote:
        "कुनै पनि व्यावसायिक प्रस्ताव गर्नु अघि सबै सप्लायर जानकारी नमूना प्रमाणीकरण, लट पुष्टि, र स्वतन्त्र यूके कपिङको अधीनमा रहन्छ।",
      exploreHeading: "अन्वेषण गर्नुहोस्",
      pages: [
        { href: "/for-roasters", label: "रोस्टरहरूका लागि", desc: "हामी के प्रदान गर्छौं, हामी को हौं, र किन नेपाल।" },
        { href: "/origin", label: "उत्पत्ति", desc: "नेपालका कफी पहाडहरूको भूगोल र उत्पादन अवस्था।" },
        { href: "/contact", label: "सम्पर्क", desc: "रोस्टर सोधपुछ फारम।" },
      ],
    },
    forRoasters: {
      eyebrow: "खरिदकर्ता",
      title: "रोस्टरहरूका लागि",
      subtitle:
        "मेवा भ्याली कफीले यूके र युरोपका रोस्टरहरूका लागि दस्तावेजीकरण गरिएको नेपाली हरियो कफी नमूना तयार गर्दैछ। हाम्रो ध्यान ट्रेसेबिलिटी, स्पष्ट लट जानकारी, र कुनै पनि व्यावसायिक सुरुवात अघि इमानदार गुणस्तर प्रमाणीकरणमा छ।",
      whereHeading: "हामी अहिले कहाँ छौं",
      whereBody1:
        "हामी हाल नेपालको लुम्बिनी प्रदेश, गुल्मी जिल्लाको एक स्थापित कफी सहकारीसँग कुराकानी गर्दैछौं। सप्लायरले रिपोर्ट गरेको जानकारी अनुसार अराबिका कफी समुद्री सतहभन्दा १,१०० मिटर माथि उत्पादन हुन्छ, धोएको र प्राकृतिक प्रशोधन विधि प्रयोग गरिन्छ, चिस्यान ११% भन्दा कम छ, र कप स्कोर ८१–८५ को दायरामा छ।",
      whereBody2:
        "नमूनाहरू यूकेमा स्वतन्त्र रूपमा कपिङ नभएसम्म हामी यी विवरणहरूलाई सप्लायरद्वारा रिपोर्ट गरिएको मानिरहेका छौं। हाम्रो जुलाई २०२६ स्रोत भ्रमणले लट जानकारी प्रमाणीकरण, प्रशोधन र भण्डारण दस्तावेजीकरण, निर्यात सर्तहरू पुष्टि, र रोस्टरहरूका लागि उचित लेबल भएको हरियो कफी नमूना व्यवस्थापनमा केन्द्रित हुनेछ।",
      supplierHeading: "हालको गुल्मी सप्लायर जानकारी",
      supplierBannerNote: "तलको सबै जानकारी सप्लायरद्वारा रिपोर्ट गरिएको हो · स्वतन्त्र यूके कपिङ हुन बाँकी छ",
      supplierTable: [
        { field: "उत्पत्ति", info: "गुल्मी जिल्ला, लुम्बिनी प्रदेश, नेपाल" },
        { field: "नगरपालिका", info: "रेसुङ्गा नगरपालिका" },
        { field: "उचाइ", info: "समुद्री सतहभन्दा १,१००+ मिटर" },
        { field: "प्रजाति", info: "अराबिका" },
        { field: "जात", info: "स्थानीय गुल्मी अराबिका, प्रमाणीकरण बाँकी" },
        { field: "प्रशोधन विधि", info: "धोएको र प्राकृतिक" },
        { field: "फसल", info: "जनवरी–मार्च २०२६" },
        { field: "चिस्यान", info: "सप्लायरद्वारा रिपोर्ट गरिएको ११% भन्दा कम" },
        { field: "कप स्कोर", info: "सप्लायरद्वारा रिपोर्ट गरिएको ८१–८५ अंक" },
        { field: "उपलब्ध परिमाण", info: "लगभग ५,०००–६,००० किलोग्राम" },
        { field: "नमूना साइज", info: "३०० ग्राम, १ केजी वा ५ केजी हरियो नमूना" },
        { field: "निर्यात इतिहास", info: "सन् १९९९ देखि निर्यात गर्दै" },
        { field: "निर्यात बजार", info: "फ्रान्स र जापानमा निर्यात गरिएको रिपोर्ट" },
        { field: "यूके कपिङ", info: "बाँकी" },
      ],
      expectHeading: "रोस्टरहरूले के अपेक्षा गर्न सक्छन्",
      expectIntro: "प्रत्येक पुष्टि भएको नमूनाका लागि, हामी निम्न प्रदान गर्ने लक्ष्य राख्छौं:",
      expectItems: [
        "उत्पादक वा सहकारी विवरण",
        "जिल्ला र उत्पादन क्षेत्र",
        "समुद्री सतहभन्दा उचाइ (मिटरमा)",
        "थाहा भएसम्म जातको जानकारी",
        "प्रशोधन विधि",
        "फसल अवधि",
        "चिस्यानको मात्रा",
        "उपलब्ध परिमाण",
        "निर्यात कागजात स्थिति",
        "नमूना साइज उपलब्धता",
        "कपिङ प्रतिक्रिया",
        "अनुमति दिएको खण्डमा फोटो र ट्रेसेबिलिटी नोटहरू",
      ],
      volumesHeading: "परिमाण",
      volumesBody:
        "हालको गुल्मी सप्लायरले धोएको र प्राकृतिक कफी गरी लगभग ५,०००–६,००० किलोग्राम उपलब्ध रहेको रिपोर्ट गरेको छ। यूके बजारका लागि, हामी कपिङ परिणाम र रोस्टरको चासोमा निर्भर रहेर सानो नमूना-नेतृत्व पायलट लट, सम्भवतः ५०–३०० किलोग्रामबाट सुरु गर्ने आशा गर्छौं।",
      pricingHeading: "मूल्य",
      pricingBody:
        "योग्य रोस्टर र आयातकर्ताको सोधपुछका लागि सांकेतिक मूल्य उपलब्ध छ। अन्तिम मूल्य प्रशोधन विधि, लट गुणस्तर, परिमाण, निर्यात सर्त, र स्वतन्त्र कपिङ परिणाममा निर्भर हुनेछ।",
      ctaEyebrow: "चासो छ?",
      ctaHeading: "नेपाली हरियो कफी नमूना कपिङ गर्न चासो छ?",
      ctaButton: "चासो दर्ता गर्नुहोस्",
    },
    origin: {
      eyebrow: "टेरोयर",
      title: "उत्पत्ति",
      subtitle: "नेपाल साँच्चै सम्भावना भएको उदीयमान स्पेशल्टी कफी उत्पत्ति स्थल हो। यहाँ तथ्यहरू छन्।",
      facts: [
        {
          label: "देश",
          value: "नेपाल",
          note: "दक्षिण एशियाको भूपरिवेष्ठित देश, भारत र चीन (तिब्बत) सँग सीमा जोडिएको।",
        },
        {
          label: "हाम्रो केन्द्रबिन्दु",
          value: "गुल्मी जिल्ला",
          note: "हाम्रा हालका सप्लायर वार्ता लुम्बिनी प्रदेशको गुल्मी जिल्ला, रेसुङ्गा नगरपालिकाको अराबिका कफीमा केन्द्रित छन्।",
        },
        {
          label: "उचाइ",
          value: "समुद्री सतहभन्दा १,१००+ मिटर",
          note: "उचाइ जिल्ला र खेतअनुसार फरक हुन्छ। हाम्रो हालको गुल्मी सप्लायर लीडले समुद्री सतहभन्दा १,१००+ मिटर उचाइमा कफी उत्पादन भएको रिपोर्ट गर्छ। उच्च उचाइले चेरी विकास ढिलो गराउँछ, चिनी सघन बनाउँछ र बढी घना दाना उत्पादन गर्छ।",
        },
        {
          label: "जात",
          value: "अराबिका",
          note: "स्थानीय गुल्मी अराबिका जात, प्रमाणीकरण बाँकी। नेपालमा उचाइमा रोबुस्टा उत्पादन हुँदैन।",
        },
        {
          label: "फसल",
          value: "जनवरी – मार्च (गुल्मी)",
          note: "फसल जिल्ला, उचाइ, र उत्पादकअनुसार फरक हुन्छ। हाम्रो हालको गुल्मी सप्लायर जानकारीले जनवरी–मार्च २०२६ फसल देखाउँछ।",
        },
        {
          label: "प्रशोधन",
          value: "धोएको र प्राकृतिक",
          note: "हाम्रो हालको गुल्मी सप्लायरबाट दुवै विधि उपलब्ध छन्। धोएको लटले सफा, उज्यालो कप उत्पादन गर्ने झुकाव राख्छ। प्राकृतिकले बढी फलको स्वाद देखाउँछ।",
        },
        {
          label: "मौसम",
          value: "उपोष्णकटिबन्धीय उच्च भूमि",
          note: "चिसो सुख्खा हिउँद, न्यानो मनसुन गर्मी। मनसुनले चेरी विकासका लागि महत्त्वपूर्ण भरपर्दो वर्षा ल्याउँछ।",
        },
        {
          label: "स्थिति",
          value: "उदीयमान उत्पत्ति स्थल",
          note: "नेपालले १९८० को दशकदेखि व्यावसायिक रूपमा कफी उत्पादन गरिरहेको छ तर स्पेशल्टी सर्कलबाहेक अझै धेरै अज्ञात छ। स्थापित सहकारीहरूबाट निर्यात कागजात उपलब्ध छ।",
        },
      ],
      noteHeading: "उत्पत्तिको बारेमा एक नोट",
      noteBody1:
        "गुल्मी जिल्ला नेपालका मान्यता प्राप्त कफी उत्पादन क्षेत्रहरू मध्ये एक हो। हाम्रा हालका सप्लायर वार्ताहरू रेसुङ्गा नगरपालिकाको अराबिका कफीमा केन्द्रित छन्, जो समुद्री सतहभन्दा १,१००+ मिटरमा उत्पादन हुन्छ र धोएको र प्राकृतिक लटको रूपमा प्रशोधन गरिन्छ।",
      noteBody2:
        "नेपालको कफी उद्योग सानो र विखण्डित छ। धेरै उत्पादकहरू एक हेक्टरभन्दा कम जमिनमा उत्पादन गर्ने साना किसान हुन्। यसले ट्रेसेबिलिटीलाई चुनौतीपूर्ण बनाउँछ तर यसको अर्थ उत्पादक वा सहकारीहरूसँग प्रत्यक्ष सम्बन्ध साँच्चै सम्भव छ भन्ने पनि हो।",
      noteBody3:
        "हाम्रो जुलाई २०२६ स्रोत भ्रमणको क्रममा, हामी खेत र सहकारी विवरण, प्रशोधन विधि, भण्डारण अवस्था, नमूना गुणस्तर, र निर्यात तयारी दस्तावेजीकरण गर्ने लक्ष्य राख्छौं।",
    },
    contact: {
      eyebrow: "सम्पर्कमा रहनुहोस्",
      title: "सम्पर्क",
      subtitle:
        "तपाईं नेपाली हरियो कफी मूल्याङ्कन गर्न चासो राख्ने रोस्टर, आयातकर्ता वा कफी खरिदकर्ता हुनुहुन्छ? आफ्नो चासो दर्ता गर्नुहोस् र उचित लेबल भएको गुल्मी २०२६ नमूना यूके कपिङका लागि उपलब्ध हुँदा हामी तपाईंलाई सम्पर्क गर्नेछौं।",
      whatNextHeading: "अब के हुन्छ",
      whatNext1: "हामी २ कार्य दिनभित्र जवाफ दिने लक्ष्य राख्छौं।",
      whatNext2:
        "तपाईं नमूनामा चासो राख्ने रोस्टर हुनुहुन्छ भने, हामी तपाईंलाई हाम्रो सूचीमा थप्नेछौं र हाम्रो जुलाई २०२६ स्रोत भ्रमणपछि लट पुष्टि भएपछि सम्पर्क गर्नेछौं।",
      whatNext3: "उत्पत्ति वा हाम्रो स्रोत दृष्टिकोणको बारेमा प्रश्न भएमा, हामी विवरणहरू छलफल गर्न खुसी छौं।",
      directHeading: "प्रत्यक्ष",
      thankYouHeading: "धन्यवाद",
      thankYouBody: "हामीले तपाईंको सन्देश प्राप्त गरेका छौं र २ कार्य दिनभित्र जवाफ दिने प्रयास गर्नेछौं।",
      labels: {
        name: "नाम *",
        business: "व्यवसाय *",
        role: "पद *",
        email: "इमेल *",
        areYouA: "तपाईं... हुनुहुन्छ? *",
        interestedIn: "तपाईं... मा चासो राख्नुहुन्छ? *",
        comments: "टिप्पणी",
      },
      placeholders: {
        name: "तपाईंको पूरा नाम",
        business: "कम्पनी वा रोस्टरी नाम",
        role: "जस्तै: सोर्सिङ प्रमुख",
        email: "you@example.com",
        comments: "कुनै प्रश्न, तपाईंको व्यवसायको बारेमा सन्दर्भ, मनमा रहेको परिमाण...",
      },
      selectOne: "एक चयन गर्नुहोस्",
      typeOptions: [
        { value: "roaster", label: "रोस्टर" },
        { value: "importer", label: "आयातकर्ता" },
        { value: "cafe", label: "क्याफे" },
        { value: "consumer", label: "उपभोक्ता" },
        { value: "other", label: "अन्य" },
      ],
      interestOptions: [
        { value: "gulmi-2026", label: "गुल्मी २०२६ नमूना" },
        { value: "green-samples", label: "कपिङका लागि हरियो नमूना" },
        { value: "roaster-enquiry", label: "रोस्टर सोधपुछ" },
        { value: "importer-enquiry", label: "आयातकर्ता सोधपुछ" },
        { value: "private-label", label: "प्राइवेट लेबल / सम्झौता रोस्टिङ" },
        { value: "future-roasted", label: "भविष्यको रोस्ट गरिएको कफी" },
        { value: "general", label: "सामान्य जानकारी" },
      ],
      submit: "सोधपुछ पठाउनुहोस्",
    },
  },
};
