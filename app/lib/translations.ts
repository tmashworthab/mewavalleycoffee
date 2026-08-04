export type Lang = "en" | "ne";

export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      contact: "Contact",
      menu: "Menu",
      close: "Close",
    },
    footer: {
      tagline:
        "Green coffee from the hill districts of eastern Nepal. First lots arriving after July 2026.",
      navigate: "Navigate",
      contactHeading: "Contact",
      disclaimer:
        "Cup scores and lot details on this site are reported by producers and have not yet been independently verified. We are arranging UK cupping. Nothing here is a commercial offer until samples have been scored in Britain.",
      rights: "All rights reserved.",
    },

    /* ---------- Homepage narrative ---------- */
    hero: {
      eyebrow: "Eastern Nepal",
      headline: "Coffee grows here.",
      sub: "Almost no one in Europe has tasted it.",
      scroll: "Scroll",
      alt: "Cloud moving across a forested ridge in the hill districts of eastern Nepal, a dirt road cut into the slope",
    },

    premise: {
      eyebrow: "The origin",
      title: "A coffee country you have never been offered",
      body1:
        "Nepal is known for mountains, not coffee. Yet on the ridges below the Himalaya — between roughly 800 and 1,600 metres — smallholders have been growing coffee for three decades. Cool dry winters slow the cherry. Monsoon rain arrives when the tree needs it. The fruit takes its time.",
      body2:
        "The country produces a few hundred tonnes a year. Most of it never leaves Asia. There is no Nepali coffee aisle, no established trade route into Britain, and no reason you would have come across it — which is precisely why we went looking.",
      statAltitude: "800–1,600 m",
      statAltitudeLabel: "Growing altitude",
      statDistricts: "Koshi & Lumbini",
      statDistrictsLabel: "Provinces we source from",
      statHarvest: "From July 2026",
      statHarvestLabel: "First lots to the UK",
    },

    journey: {
      eyebrow: "The journey",
      title: "We went to the hills and asked",
      body1:
        "Reaching a producer in eastern Nepal takes a flight, a bus, and then a road that is mostly suggestion. Landslides close it in the monsoon. The last stretch is walked.",
      body2:
        "We made that trip — through Gulmi, Bhojpur, Ilam and Solukhumbu — to see the trees, taste what comes off them, and sit with the people who tend them. Not a sourcing trip arranged by an exporter. We turned up, and we kept turning up.",
      pullquote:
        "You cannot judge a coffee from a spreadsheet. You have to stand in the row and look at the tree.",
      captionRoad:
        "The public bus is often the only way up. In monsoon, landslides can close the road for days.",
      altRoad:
        "A brightly painted bus on a narrow hillside road, dwarfed by dense green forest in eastern Nepal",
      altValley:
        "Two forested ridges converging into a deep valley, cloud gathering in the gap",
    },

    growers: {
      eyebrow: "The growers",
      title: "Farms of a hectare, sometimes less",
      body1:
        "Most of the coffee here is grown by families, on plots measured in hundreds of trees rather than hectares. Coffee sits alongside cardamom, citrus and whatever else the slope will hold. It is one income among several, which makes what a buyer pays matter enormously.",
      body2:
        "We deal with the cooperatives and producers directly. We know which washing station handled which lot, whose trees it came from, and what altitude it grew at. When something is uncertain, we say so.",
      altFarmhouse:
        "A tin-roofed farmhouse in the Nepali hills with dahlias flowering in the foreground and cloud descending the mountainside behind",
    },

    coffee: {
      eyebrow: "The coffee",
      title: "What is actually in the bag",
      body1:
        "Predominantly Arabica, with some Robusta at lower altitude in parts of Koshi. Washed, natural and yellow honey processing, depending on the producer and what the weather allowed that season.",
      body2:
        "Producer-reported cup scores currently sit in the 81–85 band, with moisture below 11%. Those are their numbers, not ours — and we treat them as a starting point rather than a claim.",
      altCherry:
        "A single ripe red coffee cherry on the branch, surrounded by wet green leaves after rain",
      specVarietal: "Varietal",
      specVarietalValue: "Arabica, some Robusta",
      specProcess: "Processing",
      specProcessValue: "Washed · Natural · Yellow honey",
      specMoisture: "Moisture",
      specMoistureValue: "Below 11%",
      specScore: "Cup score",
      specScoreValue: "81–85, producer-reported",
    },

    map: {
      eyebrow: "Where it comes from",
      title: "Four districts, two provinces",
      body: "Gulmi and the Lumbini hills to the west; Bhojpur, Ilam and Solukhumbu in Koshi to the east. Different altitudes, different processing traditions, genuinely different cups.",
      alt: "Map of Nepal showing Mewa Valley Coffee's sourcing districts across Koshi and Lumbini provinces",
    },

    verify: {
      eyebrow: "Before we sell you anything",
      title: "Nothing is confirmed until it is cupped in Britain",
      body1:
        "Every figure on this site came from a producer. We have not yet put these lots in front of an independent UK cupping table, and until we do, we are not going to tell you they are specialty grade.",
      body2:
        "Samples are being arranged now. When they are scored, we will publish what comes back — including the lots that do not make the cut.",
      pointOneTitle: "Traceable",
      pointOneBody: "Named cooperative, district and altitude for every lot.",
      pointTwoTitle: "Unverified, and labelled as such",
      pointTwoBody: "Producer figures are marked as producer figures.",
      pointThreeTitle: "Published either way",
      pointThreeBody: "UK cupping results go up whatever they say.",
    },

    cta: {
      eyebrow: "Roasters",
      title: "Come and taste it before anyone else has",
      body: "We are looking for a small number of UK and European roasters to evaluate the first samples. If Nepal sounds like a gap in your offering, we would like to hear from you.",
      button: "Start a conversation",
    },

    /* ---------- About ---------- */
    about: {
      eyebrow: "Who we are",
      title: "About us",
      aboutBody1:
        "The coffee we source grows in the foothills of the Himalaya. Nepal's climate suits it: cool dry winters, warm monsoon summers, and reliable rain at the point in the year the cherry needs it most.",
      aboutBody2:
        "There is a young, fast-moving coffee culture in Nepal that Europe knows nothing about. We want to bring that community — and what it grows — to Britain.",
      sourcingBody1:
        "We are in active conversation with several producers at different stages of readiness, from established exporters to farms shipping their first commercial lots. They span the hill districts of Koshi and Lumbini: Gulmi, Bhojpur, Ilam and Solukhumbu.",
      hillAlt: "Hills near Mewa Valley Coffee's sourcing districts in Nepal",
      mapAlt: "Map of Mewa Valley Coffee's sourcing districts in Nepal",
      sourcingBody2:
        "Between them our producers work across washed, natural and yellow honey processing. Predominantly Arabica, with some Robusta at lower altitude in parts of Koshi Province.",
      sourcingBody3:
        "Growing altitudes run from roughly 800 to 1,600 metres. Higher up, the cherry ripens slowly — sugars concentrate and the bean comes out denser.",
      sourcingBody4:
        "We are looking to work with roasters who find that as interesting as we do.",
    },

    /* ---------- Contact ---------- */
    contact: {
      title: "Contact",
      subtitle:
        "Are you a roaster, importer or coffee buyer interested in evaluating Nepali green coffee? We'd love to hear from you.",
      whatNext1: "We aim to respond within 2 working days.",
      directHeading: "Direct",
      thankYouHeading: "Thank you",
      thankYouBody:
        "We have received your message and will aim to respond within 2 working days.",
      labels: {
        name: "Name",
        business: "Business",
        email: "Email",
        message: "Message",
      },
      placeholders: {
        name: "Your full name",
        business: "Company or roastery name",
        email: "you@example.com",
        message: "Type your message here",
      },
      required: "Required",
      submit: "Send enquiry",
      sending: "Sending…",
      sendError:
        "Something went wrong sending your message. Please try again, or email us directly at info@mewavalley.com.",
    },
  },

  ne: {
    nav: {
      home: "गृहपृष्ठ",
      about: "हाम्रो बारेमा",
      contact: "सम्पर्क",
      menu: "मेनु",
      close: "बन्द",
    },
    footer: {
      tagline:
        "पूर्वी नेपालका पहाडी जिल्लाहरूबाट हरियो कफी। पहिलो लटहरू जुलाई २०२६ पछि आउने छन्।",
      navigate: "नेभिगेसन",
      contactHeading: "सम्पर्क",
      disclaimer:
        "यस साइटमा रहेका कप स्कोर र लट विवरण उत्पादकहरूले उपलब्ध गराएका हुन् र अझै स्वतन्त्र रूपमा प्रमाणित भइसकेका छैनन्। हामी यूकेमा कपिङको व्यवस्था गर्दैछौं। बेलायतमा नमूना स्कोर नगरेसम्म यहाँ केही पनि व्यावसायिक प्रस्ताव होइन।",
      rights: "सर्वाधिकार सुरक्षित।",
    },

    hero: {
      eyebrow: "पूर्वी नेपाल",
      headline: "यहाँ कफी फल्छ।",
      sub: "युरोपमा यो लगभग कसैले चाखेको छैन।",
      scroll: "स्क्रोल",
      alt: "पूर्वी नेपालका पहाडी जिल्लामा वन ढाकिएको डाँडामाथि बादल, भिरालोमा काटिएको धुले बाटो",
    },

    premise: {
      eyebrow: "उत्पत्ति",
      title: "एउटा कफी देश जुन तपाईंलाई कहिल्यै प्रस्ताव गरिएको छैन",
      body1:
        "नेपाल हिमालका लागि चिनिन्छ, कफीका लागि होइन। तर हिमालमुनिका डाँडाहरूमा — लगभग ८०० देखि १,६०० मिटरबीच — साना किसानहरूले तीन दशकदेखि कफी उत्पादन गर्दै आएका छन्। चिसो सुख्खा हिउँदले चेरीलाई ढिलो पकाउँछ। रूखलाई चाहिने बेला मनसुनको वर्षा आइपुग्छ। फल आफ्नै गतिमा पाक्छ।",
      body2:
        "देशले वर्षमा केही सय टन मात्र उत्पादन गर्छ। अधिकांश एसिया बाहिर जाँदैन। नेपाली कफीको छुट्टै बजार छैन, बेलायतसम्मको स्थापित व्यापार मार्ग छैन, र तपाईंले यो भेट्नुपर्ने कुनै कारण थिएन — र त्यसैले हामी खोज्न गयौं।",
      statAltitude: "८००–१,६०० मि",
      statAltitudeLabel: "उत्पादन उचाइ",
      statDistricts: "कोशी र लुम्बिनी",
      statDistrictsLabel: "हामी स्रोत गर्ने प्रदेश",
      statHarvest: "जुलाई २०२६ देखि",
      statHarvestLabel: "यूकेमा पहिलो लट",
    },

    journey: {
      eyebrow: "यात्रा",
      title: "हामी पहाड गयौं र सोध्यौं",
      body1:
        "पूर्वी नेपालको कुनै उत्पादकसम्म पुग्न एउटा उडान, एउटा बस, अनि बाटो भन्न मिल्ने–नमिल्ने एउटा बाटो चाहिन्छ। मनसुनमा पहिरोले बन्द गरिदिन्छ। अन्तिम खण्ड हिँडेरै पार गर्नुपर्छ।",
      body2:
        "हामीले त्यो यात्रा गर्‍यौं — गुल्मी, भोजपुर, इलाम र सोलुखुम्बु हुँदै — रूख हेर्न, त्यसबाट आउने कफी चाख्न, र त्यसको हेरचाह गर्ने मानिसहरूसँग बस्न। निर्यातकर्ताले मिलाइदिएको स्रोत भ्रमण होइन। हामी आफैं पुग्यौं, र पुगिरह्यौं।",
      pullquote:
        "स्प्रेडसिटबाट कफीको मूल्याङ्कन गर्न सकिँदैन। हरफमै उभिएर रूख हेर्नुपर्छ।",
      captionRoad:
        "माथि जाने एउटै उपाय प्रायः सार्वजनिक बस हुन्छ। मनसुनमा पहिरोले बाटो दिनौंसम्म बन्द गर्न सक्छ।",
      altRoad:
        "पूर्वी नेपालको साँघुरो पहाडी बाटोमा रङ्गीचङ्गी बस, वरिपरि घना हरियो वन",
      altValley: "दुई वन ढाकिएका डाँडा गहिरो उपत्यकामा मिल्दै, बीचमा बादल",
    },

    growers: {
      eyebrow: "उत्पादकहरू",
      title: "एक हेक्टर, कहिलेकाहीं त्यसभन्दा पनि कम",
      body1:
        "यहाँको अधिकांश कफी परिवारहरूले उत्पादन गर्छन्, हेक्टरभन्दा पनि सयौं रूखमा नापिने जग्गामा। कफीसँगै अलैंची, सुन्तला र भिरालोले धान्ने अरू बाली पनि हुन्छन्। यो धेरै आम्दानीमध्ये एउटा हो, जसले खरिदकर्ताले तिर्ने रकमलाई अत्यन्तै महत्त्वपूर्ण बनाउँछ।",
      body2:
        "हामी सहकारी र उत्पादकहरूसँग प्रत्यक्ष कारोबार गर्छौं। कुन वासिङ स्टेसनले कुन लट प्रशोधन गर्‍यो, कसका रूखबाट आयो, र कति उचाइमा फल्यो — हामीलाई थाहा हुन्छ। अनिश्चित कुरा भए, हामी भन्छौं।",
      altFarmhouse:
        "नेपाली पहाडमा जस्ताको छाना भएको घर, अगाडि डेलिया फूल र पछाडि डाँडाबाट झर्दै गरेको बादल",
    },

    coffee: {
      eyebrow: "कफी",
      title: "बोरामा वास्तवमा के छ",
      body1:
        "प्रमुख रूपमा अराबिका, कोशीका केही भागमा कम उचाइमा केही रोबुस्टा। उत्पादक र त्यस सिजनको मौसमअनुसार धोएको, प्राकृतिक र यलो हनी प्रशोधन।",
      body2:
        "उत्पादकले बताएको कप स्कोर हाल ८१–८५ को दायरामा छ, चिस्यान ११% भन्दा कम। ती उनीहरूका अंक हुन्, हाम्रा होइनन् — र हामी तिनलाई दाबी होइन, सुरुवात बिन्दु मान्छौं।",
      altCherry: "हाँगामा एउटा पाकेको रातो कफी चेरी, वरिपरि वर्षापछिका भिजेका हरिया पात",
      specVarietal: "प्रजाति",
      specVarietalValue: "अराबिका, केही रोबुस्टा",
      specProcess: "प्रशोधन",
      specProcessValue: "धोएको · प्राकृतिक · यलो हनी",
      specMoisture: "चिस्यान",
      specMoistureValue: "११% भन्दा कम",
      specScore: "कप स्कोर",
      specScoreValue: "८१–८५, उत्पादकद्वारा रिपोर्ट",
    },

    map: {
      eyebrow: "कहाँबाट आउँछ",
      title: "चार जिल्ला, दुई प्रदेश",
      body: "पश्चिममा गुल्मी र लुम्बिनीका पहाड; पूर्वमा कोशीका भोजपुर, इलाम र सोलुखुम्बु। फरक उचाइ, फरक प्रशोधन परम्परा, साँच्चै फरक कप।",
      alt: "कोशी र लुम्बिनी प्रदेशभरि मेवा भ्याली कफीका स्रोत जिल्लाहरू देखाउने नेपालको नक्सा",
    },

    verify: {
      eyebrow: "तपाईंलाई केही बेच्नुअघि",
      title: "बेलायतमा कपिङ नगरेसम्म केही पनि पक्का हुँदैन",
      body1:
        "यस साइटका हरेक अंक उत्पादकबाट आएका हुन्। हामीले यी लटहरू अझै स्वतन्त्र यूके कपिङ टेबलमा राखेका छैनौं, र नराखेसम्म हामी तिनलाई स्पेशल्टी ग्रेड भन्ने छैनौं।",
      body2:
        "नमूनाहरूको व्यवस्था भइरहेको छ। स्कोर आएपछि हामी नतिजा प्रकाशित गर्नेछौं — नपुग्ने लटहरू पनि सहित।",
      pointOneTitle: "पत्ता लगाउन सकिने",
      pointOneBody: "हरेक लटको सहकारी, जिल्ला र उचाइ नाम सहित।",
      pointTwoTitle: "अप्रमाणित, र त्यसै भनिएको",
      pointTwoBody: "उत्पादकका अंकलाई उत्पादकका अंक भनेरै चिनाइएको छ।",
      pointThreeTitle: "जे भए पनि प्रकाशित",
      pointThreeBody: "यूके कपिङका नतिजा जस्तोसुकै भए पनि सार्वजनिक हुन्छन्।",
    },

    cta: {
      eyebrow: "रोस्टरहरू",
      title: "अरू कसैले चाख्नुअघि आएर चाख्नुहोस्",
      body: "पहिलो नमूनाहरू मूल्याङ्कन गर्न हामी यूके र युरोपका थोरै संख्याका रोस्टर खोज्दैछौं। नेपाल तपाईंको सूचीमा नभएको ठाउँ हो भन्ने लाग्छ भने, हामी तपाईंबाट सुन्न चाहन्छौं।",
      button: "कुराकानी सुरु गर्नुहोस्",
    },

    about: {
      eyebrow: "हामी को हौं",
      title: "हाम्रो बारेमा",
      aboutBody1:
        "हामीले स्रोत गर्ने कफी हिमालको फेदीमा फल्छ। नेपालको हावापानी यसका लागि उपयुक्त छ: चिसो सुख्खा हिउँद, न्यानो मनसुन गर्मी, र वर्षको जुन बेला चेरीलाई सबैभन्दा बढी चाहिन्छ त्यही बेला भरपर्दो वर्षा।",
      aboutBody2:
        "नेपालमा एउटा युवा, छिटो बढ्दो कफी संस्कृति छ जसबारे युरोपलाई केही थाहा छैन। हामी त्यो समुदाय — र त्यसले उत्पादन गर्ने कुरा — बेलायतमा ल्याउन चाहन्छौं।",
      sourcingBody1:
        "हामी विभिन्न तयारी अवस्थाका धेरै उत्पादकसँग सक्रिय कुराकानीमा छौं, स्थापित निर्यातकर्तादेखि पहिलो व्यावसायिक लट पठाउँदै गरेका फार्मसम्म। यी कोशी र लुम्बिनीका पहाडी जिल्लाहरूमा फैलिएका छन्: गुल्मी, भोजपुर, इलाम र सोलुखुम्बु।",
      hillAlt: "नेपालमा मेवा भ्याली कफीका स्रोत जिल्लाहरू नजिकका पहाडहरू",
      mapAlt: "नेपालमा मेवा भ्याली कफीका स्रोत जिल्लाहरूको नक्सा",
      sourcingBody2:
        "हाम्रा उत्पादकहरू सामूहिक रूपमा धोएको, प्राकृतिक र यलो हनी प्रशोधनमा काम गर्छन्। प्रमुख रूपमा अराबिका, कोशी प्रदेशका केही भागमा कम उचाइमा केही रोबुस्टा।",
      sourcingBody3:
        "उत्पादन उचाइ लगभग ८०० देखि १,६०० मिटरसम्म फैलिएको छ। माथि, चेरी बिस्तारै पाक्छ — चिनी सघन हुन्छ र दाना बढी घना निस्कन्छ।",
      sourcingBody4:
        "हामी यसलाई हामीजत्तिकै रोचक ठान्ने रोस्टरहरूसँग काम गर्न खोज्दैछौं।",
    },

    contact: {
      title: "सम्पर्क",
      subtitle:
        "तपाईं नेपाली हरियो कफी मूल्याङ्कन गर्न चासो राख्ने रोस्टर, आयातकर्ता वा कफी खरिदकर्ता हुनुहुन्छ? हामी तपाईंबाट सुन्न पाउँदा खुसी हुनेछौं।",
      whatNext1: "हामी २ कार्य दिनभित्र जवाफ दिने लक्ष्य राख्छौं।",
      directHeading: "प्रत्यक्ष",
      thankYouHeading: "धन्यवाद",
      thankYouBody:
        "हामीले तपाईंको सन्देश प्राप्त गरेका छौं र २ कार्य दिनभित्र जवाफ दिने प्रयास गर्नेछौं।",
      labels: {
        name: "नाम",
        business: "व्यवसाय",
        email: "इमेल",
        message: "सन्देश",
      },
      placeholders: {
        name: "तपाईंको पूरा नाम",
        business: "कम्पनी वा रोस्टरी नाम",
        email: "you@example.com",
        message: "यहाँ आफ्नो सन्देश लेख्नुहोस्",
      },
      required: "आवश्यक",
      submit: "सोधपुछ पठाउनुहोस्",
      sending: "पठाउँदै…",
      sendError:
        "तपाईंको सन्देश पठाउँदा समस्या भयो। कृपया फेरि प्रयास गर्नुहोस्, वा हामीलाई सिधै info@mewavalley.com मा इमेल गर्नुहोस्।",
    },
  },
};
