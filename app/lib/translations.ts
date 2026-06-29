export type Lang = "en" | "ne";

export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      contact: "Contact",
    },
    footer: {
      tagline:
        "Building direct sourcing relationships with Nepali producers and cooperatives. First lots arriving after July 2026.",
      navigate: "Navigate",
      contactHeading: "Contact",
      disclaimer:
        "All cup scores and lot details on this site are currently supplier-reported. Mewa Valley Coffee is arranging independent UK cupping, and no commercial lot claims are final until samples have been verified.",
      rights: "All rights reserved.",
    },
    hero: {
      tagline: "Premium high-altitude Nepali coffee for UK and European roasters.",
      body: "Mewa Valley Coffee connects roasters with carefully sourced green Arabica from Nepal, working directly with producers across Gulmi, Solukhumbu, Ilam and the surrounding hill districts to build transparent, lasting relationships. We are currently sourcing washed, natural and honey-processed samples for independent UK cupping.",
    },
    home: {
      gulmiHeading: "Gulmi 2026 Samples in Progress",
      gulmiBody:
        "We are currently in discussion with an established coffee cooperative in Gulmi District, Lumbini Province, Nepal. Supplier-reported information indicates Arabica coffee grown at 1,100+ masl (metres above sea level), washed and natural processing, moisture below 11%, and cup scores in the 81–85 range.",
      gulmiNote:
        "All supplier information is subject to sample verification, lot confirmation and independent UK cupping before any commercial offer is made.",
      exploreHeading: "Explore",
      pages: [
        { href: "/about", label: "About Us", desc: "Our story and where we're sourcing from." },
        { href: "/contact", label: "Contact", desc: "Roaster enquiry form." },
      ],
    },
    about: {
      eyebrow: "Who We Are",
      title: "About Us",
      aboutBody1:
        "The coffee we're sourcing is grown in the foothills of the Himalayas, home to the tallest mountains in the world. Nepal's climate is well suited to high-quality beans: cool, dry winters and warm monsoon summers that bring the reliable rainfall cherry development depends on.",
      aboutBody2:
        "Nepal has a youthful, enthusiastic and fast-growing coffee culture that remains largely unknown in Europe. We want to bring that community, and the premium product at the centre of it, to Britain.",
      sourcingBody1:
        "We're in active conversations with several suppliers of varying readiness, from established exporters to newer producers. These span coffee-growing districts across Koshi and Lumbini provinces, including Gulmi, Bhojpur, Ilam and Solukhumbu.",
      hillAlt: "Hills near Mewa Valley Coffee's sourcing districts in Nepal",
      mapAlt: "Map of Mewa Valley Coffee's sourcing districts in Nepal",
      sourcingBody2:
        "Between them, our suppliers offer a wide range of processing methods, including washed, natural and yellow honey. They grow predominantly Arabica, with some Robusta at lower altitude in parts of Koshi Province.",
      sourcingBody3:
        "Across our current sourcing, growing altitudes run from roughly 800 to 1,600 masl (metres above sea level). Higher altitude slows cherry development, concentrating sugars and producing denser beans.",
      sourcingBody4:
        "We're looking to partner with local roasters who are as excited about Nepalese coffee as we are.",
    },
    contact: {
      title: "Contact",
      subtitle:
        "Are you a roaster, importer or coffee buyer interested in evaluating Nepali green coffee? We'd love to hear from you.",
      whatNext1: "We aim to respond within 2 working days.",
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
      about: "हाम्रो बारेमा",
      contact: "सम्पर्क",
    },
    footer: {
      tagline:
        "नेपाली उत्पादक र सहकारीहरूसँग प्रत्यक्ष स्रोत सम्बन्ध निर्माण गर्दै। पहिलो लटहरू जुलाई २०२६ पछि आउने छन्।",
      navigate: "नेभिगेसन",
      contactHeading: "सम्पर्क",
      disclaimer:
        "यस साइटमा रहेका सबै कप स्कोर र लट विवरण हाल सप्लायरद्वारा रिपोर्ट गरिएका हुन्। मेवा भ्याली कफीले स्वतन्त्र यूके कपिङको व्यवस्था गर्दैछ, र नमूनाहरू प्रमाणित नभएसम्म कुनै पनि व्यावसायिक लट दाबी अन्तिम मानिने छैन।",
      rights: "सर्वाधिकार सुरक्षित।",
    },
    hero: {
      tagline: "यूके र युरोपका रोस्टरहरूका लागि उच्च गुणस्तरीय, उच्च-उचाइको नेपाली कफी।",
      body: "मेवा भ्याली कफीले रोस्टरहरूलाई नेपालबाट होसियारीपूर्वक स्रोत गरिएको हरियो अराबिकासँग जोड्छ, गुल्मी, सोलुखुम्बु, इलाम र वरपरका पहाडी जिल्लाहरूका उत्पादकहरूसँग प्रत्यक्ष काम गरी पारदर्शी र दिगो सम्बन्ध निर्माण गर्दै। हामी हाल स्वतन्त्र यूके कपिङका लागि धोएको, प्राकृतिक र हनी-प्रशोधित नमूना स्रोत गर्दैछौं।",
    },
    home: {
      gulmiHeading: "गुल्मी २०२६ नमूना तयारी क्रममा",
      gulmiBody:
        "हामी हाल नेपालको लुम्बिनी प्रदेश, गुल्मी जिल्लाको एक स्थापित कफी सहकारीसँग छलफलमा छौं। सप्लायरले रिपोर्ट गरेको जानकारी अनुसार अराबिका कफी समुद्री सतहभन्दा १,१०० मिटर माथि उत्पादन हुन्छ, धोएको र प्राकृतिक प्रशोधन विधि प्रयोग गरिन्छ, चिस्यान ११% भन्दा कम छ, र कप स्कोर ८१–८५ को दायरामा छ।",
      gulmiNote:
        "कुनै पनि व्यावसायिक प्रस्ताव गर्नु अघि सबै सप्लायर जानकारी नमूना प्रमाणीकरण, लट पुष्टि, र स्वतन्त्र यूके कपिङको अधीनमा रहन्छ।",
      exploreHeading: "अन्वेषण गर्नुहोस्",
      pages: [
        { href: "/about", label: "हाम्रो बारेमा", desc: "हाम्रो कथा र हामी कहाँबाट स्रोत गर्छौं।" },
        { href: "/contact", label: "सम्पर्क", desc: "रोस्टर सोधपुछ फारम।" },
      ],
    },
    about: {
      eyebrow: "हामी को हौं",
      title: "हाम्रो बारेमा",
      aboutBody1:
        "हामीले स्रोत गर्ने कफी हिमालयको फेदीमा उत्पादन हुन्छ, जहाँ विश्वका सबैभन्दा अग्ला हिमालहरू छन्। नेपालको मौसम उच्च गुणस्तरका दानाका लागि उपयुक्त छ: चिसो सुख्खा हिउँद र न्यानो मनसुन गर्मी, जसले चेरी विकासका लागि आवश्यक भरपर्दो वर्षा ल्याउँछ।",
      aboutBody2:
        "नेपालमा युवा, उत्साही र छिटो बढ्दो कफी संस्कृति छ जो युरोपमा अझै धेरै अज्ञात छ। हामी त्यो समुदाय, र त्यसको केन्द्रमा रहेको प्रिमियम उत्पादन, बेलायतमा ल्याउन चाहन्छौं।",
      sourcingBody1:
        "हामी विभिन्न तयारी अवस्थाका धेरै सप्लायरहरूसँग सक्रिय कुराकानी गर्दैछौं, स्थापित निर्यातकर्तादेखि नयाँ उत्पादकसम्म। यी कोशी र लुम्बिनी प्रदेशका कफी उत्पादन जिल्लाहरूमा फैलिएका छन्, जसमा गुल्मी, भोजपुर, इलाम र सोलुखुम्बु समावेश छन्।",
      hillAlt: "नेपालमा मेवा भ्याली कफीका स्रोत जिल्लाहरू नजिकका पहाडहरू",
      mapAlt: "नेपालमा मेवा भ्याली कफीका स्रोत जिल्लाहरूको नक्सा",
      sourcingBody2:
        "हाम्रा सप्लायरहरूले सामूहिक रूपमा धोएको, प्राकृतिक र यलो हनी सहित विभिन्न प्रशोधन विधि प्रदान गर्छन्। उनीहरू प्रमुख रूपमा अराबिका उत्पादन गर्छन्, कोशी प्रदेशका केही भागमा कम उचाइमा केही रोबुस्टा पनि।",
      sourcingBody3:
        "हाम्रो हालको स्रोतमा, उत्पादन उचाइ लगभग ८०० देखि १,६०० मिटर (समुद्री सतहभन्दा माथि) सम्म फरक पर्छ। बढी उचाइले चेरी विकास ढिलो गराउँछ, चिनी सघन बनाउँछ र बढी घना दाना उत्पादन गर्छ।",
      sourcingBody4:
        "हामी नेपाली कफीप्रति हामीजस्तै उत्साहित स्थानीय रोस्टरहरूसँग साझेदारी गर्न खोज्दैछौं।",
    },
    contact: {
      title: "सम्पर्क",
      subtitle:
        "तपाईं नेपाली हरियो कफी मूल्याङ्कन गर्न चासो राख्ने रोस्टर, आयातकर्ता वा कफी खरिदकर्ता हुनुहुन्छ? हामी तपाईंबाट सुन्न पाउँदा खुसी हुनेछौं।",
      whatNext1: "हामी २ कार्य दिनभित्र जवाफ दिने लक्ष्य राख्छौं।",
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
