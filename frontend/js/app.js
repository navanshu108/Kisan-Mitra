// ==========================================
// CONFIG & INITIALIZATION
// ==========================================
const API_URL = '/api';

const LOCAL_DB = [
    {
        "id": "PM-KISAN",
        "type": "government",
        "name": "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
        "shortDescription": "Direct income support for all landholding farmers.",
        "benefit": "₹6,000 per year",
        "eligibility": "All landholding farmers' families in India.",
        "documents": [
            "Aadhaar Card",
            "Bank Account Details",
            "Land Holding Papers"
        ],
        "applicationProcess": "Apply online via PM-KISAN portal.",
        "stateId": "all",
        "cropIds": [
            "all"
        ],
        "officialSourceName": "Ministry of Agriculture & Farmers Welfare",
        "officialWebsite": "https://pmkisan.gov.in/",
        "applicationUrl": "https://pmkisan.gov.in/RegistrationFormNew.aspx",
        "lastVerified": "04/10/2026",
        "category": "credit"
    },
    {
        "id": "PMFBY",
        "type": "government",
        "name": "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        "shortDescription": "Comprehensive crop insurance against natural calamities.",
        "benefit": "Crop Insurance Cover",
        "eligibility": "All farmers growing notified crops in a notified area.",
        "documents": [
            "Aadhaar Card",
            "Land Records",
            "Sowing Certificate",
            "Bank Passbook"
        ],
        "applicationProcess": "Apply via PMFBY portal.",
        "stateId": "all",
        "cropIds": [
            "wheat",
            "paddy",
            "cotton",
            "soybean",
            "maize",
            "gram",
            "mustard",
            "pulses",
            "sugarcane",
            "onion",
            "grapes",
            "potato"
        ],
        "officialSourceName": "Ministry of Agriculture & Farmers Welfare",
        "officialWebsite": "https://pmfby.gov.in/",
        "applicationUrl": "https://pmfby.gov.in/farmerRegistrationForm",
        "lastVerified": "04/10/2026",
        "category": "insurance"
    },
    {
        "id": "FERT-SUB",
        "type": "government",
        "name": "Nutrient Based Subsidy (NBS) Scheme",
        "shortDescription": "Subsidized fertilizers (P&K) for enhanced soil health and yield.",
        "benefit": "Subsidized prices on DAP, MOP, and complex fertilizers",
        "eligibility": "All registered farmers requiring P&K fertilizers.",
        "documents": [
            "Aadhaar",
            "Kisan Credit Card"
        ],
        "applicationProcess": "Purchase at subsidized rates using Aadhaar.",
        "stateId": "all",
        "cropIds": [
            "all"
        ],
        "officialSourceName": "Department of Fertilizers",
        "officialWebsite": "https://www.fert.nic.in/",
        "applicationUrl": null,
        "lastVerified": "04/10/2026",
        "category": "fertilizer"
    },
    {
        "id": "PRIV-FERT",
        "type": "private",
        "name": "IFFCO Organic Fertilizer Initiative",
        "shortDescription": "Indicative support program providing discounts on bio-fertilizers.",
        "benefit": "Discount on bulk organic fertilizer orders",
        "eligibility": "Farmers converting to organic farming.",
        "documents": [
            "Aadhaar",
            "Farm Registration"
        ],
        "applicationProcess": "Register online or visit local company depot.",
        "stateId": "maharashtra",
        "cropIds": [
            "sugarcane",
            "cotton",
            "grapes"
        ],
        "officialSourceName": "Indian Farmers Fertiliser Cooperative (IFFCO)",
        "officialWebsite": "https://www.iffco.in/",
        "applicationUrl": "https://www.iffcobazar.in/",
        "lastVerified": "04/10/2026",
        "category": "fertilizer"
    },
    {
        "id": "GOV-PEST",
        "type": "government",
        "name": "Sub-Mission on Plant Protection (SMPP)",
        "shortDescription": "Support for Integrated Pest Management (IPM) and biopesticides.",
        "benefit": "Subsidy on approved bio-pesticides and IPM kits",
        "eligibility": "Farmers adopting IPM practices.",
        "documents": [
            "Aadhaar",
            "Land Records"
        ],
        "applicationProcess": "Apply through State Agriculture Department.",
        "stateId": "all",
        "cropIds": [
            "cotton",
            "soybean",
            "rice",
            "wheat",
            "maize"
        ],
        "officialSourceName": "Department of Agriculture & Farmers Welfare",
        "officialWebsite": "https://agricoop.nic.in/",
        "applicationUrl": null,
        "lastVerified": "04/10/2026",
        "category": "crop_protection"
    },
    {
        "id": "PRIV-TRACTOR",
        "type": "private",
        "name": "Mahindra AgriTech Equipment Financing",
        "shortDescription": "Indicative financing program for tractors and heavy agricultural equipment.",
        "benefit": "Potential financing at subvented rates",
        "eligibility": "Farmers with more than 3 acres of land. Subject to credit approval.",
        "documents": [
            "Aadhaar",
            "Land Records",
            "Bank Statement"
        ],
        "applicationProcess": "Submit request online.",
        "stateId": "all",
        "cropIds": [
            "wheat",
            "soybean",
            "sugarcane",
            "cotton",
            "rice",
            "maize"
        ],
        "landConstraints": ">3",
        "officialSourceName": "Mahindra Finance",
        "officialWebsite": "https://www.mahindrafinance.com/",
        "applicationUrl": "https://www.mahindrafinance.com/tractor-loan",
        "lastVerified": "04/10/2026",
        "category": "machinery"
    },
    {
        "id": "MP-MKSY",
        "type": "government",
        "name": "Mukhyamantri Kisan Kalyan Yojana",
        "shortDescription": "Additional financial assistance for farmers in Madhya Pradesh.",
        "benefit": "₹4,000 per year",
        "eligibility": "Must be a beneficiary of PM-KISAN.",
        "documents": [
            "PM-KISAN ID",
            "Aadhaar Card",
            "MP Domicile Certificate"
        ],
        "applicationProcess": "Automatic for PM-KISAN beneficiaries in MP.",
        "stateId": "madhya_pradesh",
        "cropIds": [
            "all"
        ],
        "officialSourceName": "Government of Madhya Pradesh",
        "officialWebsite": "https://saara.mp.gov.in/",
        "applicationUrl": "https://saara.mp.gov.in/",
        "lastVerified": "04/10/2026",
        "category": "credit"
    }
];

const stateCropMap = {
    "andhra_pradesh": ["rice", "cotton", "sugarcane", "maize", "pulses"],
    "madhya_pradesh": ["wheat", "soybean", "gram", "maize", "rice", "cotton", "mustard", "pulses"],
    "maharashtra": ["cotton", "soybean", "sugarcane", "onion", "wheat", "maize", "rice", "pulses", "grapes"],
    "punjab": ["wheat", "rice", "maize", "cotton", "sugarcane", "potato", "mustard"],
    "uttar_pradesh": ["wheat", "rice", "sugarcane", "potato", "mustard"]
};

const localizedNames = {
    en: { states: {"andhra_pradesh": "Andhra Pradesh", "madhya_pradesh": "Madhya Pradesh", "maharashtra": "Maharashtra", "punjab": "Punjab", "uttar_pradesh": "Uttar Pradesh"}, crops: {"wheat": "Wheat", "soybean": "Soybean", "gram": "Gram", "maize": "Maize", "rice": "Rice", "cotton": "Cotton", "mustard": "Mustard", "pulses": "Pulses", "sugarcane": "Sugarcane", "onion": "Onion", "grapes": "Grapes", "potato": "Potato"} },
    hi: { states: {"andhra_pradesh": "आंध्र प्रदेश", "madhya_pradesh": "मध्य प्रदेश", "maharashtra": "महाराष्ट्र", "punjab": "पंजाब", "uttar_pradesh": "उत्तर प्रदेश"}, crops: {"wheat": "गेहूँ", "soybean": "सोयाबीन", "gram": "चना", "maize": "मक्का", "rice": "चावल", "cotton": "कपास", "mustard": "सरसों", "pulses": "दालें", "sugarcane": "गन्ना", "onion": "प्याज", "grapes": "अंगूर", "potato": "आलू"} },
    mr: { states: {"andhra_pradesh": "आंध्र प्रदेश", "madhya_pradesh": "मध्य प्रदेश", "maharashtra": "महाराष्ट्र", "punjab": "पंजाब", "uttar_pradesh": "उत्तर प्रदेश"}, crops: {"wheat": "गहू", "soybean": "सोयाबीन", "gram": "हरभरा", "maize": "मका", "rice": "तांदूळ", "cotton": "कापूस", "mustard": "मोहरी", "pulses": "डाळी", "sugarcane": "ऊस", "onion": "कांदा", "grapes": "द्राक्षे", "potato": "बटाटा"} }
};

const languages = [
    { code: 'en', name: 'English', native: 'English' }, { code: 'hi', name: 'Hindi', native: 'हिन्दी' }, { code: 'mr', name: 'Marathi', native: 'मराठी' }
];

function t(key) {
    const langDict = translations[state.language] || translations['en'];
    return langDict[key] || translations['en'][key] || key;
}

function getLocalizedStateName(id) { const dict = localizedNames[state.language] || localizedNames['en']; return dict.states[id] || id; }
function getLocalizedCropName(id) { const dict = localizedNames[state.language] || localizedNames['en']; return dict.crops[id] || id; }

// ==========================================
// UTILS
// ==========================================
function isValidExternalUrl(url) {
    if (!url) return false;
    try {
        const parsed = new URL(url);
        return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch (_) {
        return false;
    }
}

// ==========================================
// APPLICATION STATE
// ==========================================
const state = {
    language: localStorage.getItem('km_lang') || 'en',
    currentView: 'home',
    schemeFilter: 'all',
    farmer: { stateId: '', cropId: '', landArea: '' },
    schemes: [],
    selectedScheme: null,
    isSpeaking: false
};

const FILTER_CONFIG = [
    { id: 'all', key: 'filterAll' },
    { id: 'government', key: 'filterGov' },
    { id: 'private', key: 'filterPriv' },
    { id: 'fertilizer', key: 'catFertilizer' },
    { id: 'crop_protection', key: 'catCropProtection' },
    { id: 'seeds', key: 'catSeeds' },
    { id: 'irrigation', key: 'catIrrigation' },
    { id: 'machinery', key: 'catMachinery' },
    { id: 'insurance', key: 'catInsurance' },
    { id: 'credit', key: 'catCredit' }
];

// ==========================================
// TRANSLATIONS
// ==========================================
const translations = {
    en: {
        navTitle: "Kisan Mitra AI", heroBadge: "AI-assisted • Farmer-first", heroTitle: "Government schemes,<br><span class='text-brand-600'>explained for your farm.</span>", heroSub: "Find relevant agricultural schemes in a language you understand.",
        labelStateText: "Select State", displayStateEmpty: "Select your state", searchState: "Search state...", errorState: "Please select your state.",
        labelCropText: "Select Crop", displayCropEmpty: "First select your state", displayCropReady: "Select your crop", searchCrop: "Search crop...", errorCrop: "Please select your crop.", noCrops: "No crops available",
        labelLandText: "Land Area", labelAcres: "Acres", errorLand: "Please enter a valid land area.", btnFind: "Find Schemes", 
        textBack: "Back to profile", textBackRes: "Back to schemes", resultsTitle: "Schemes & Resources", resultsSub: "Based on your farm profile.",
        reasonHeading: "Why this matches", reasonState: "Available in your state", reasonCrop: "Relevant to your crop", reasonLand: "Land size compatible", viewDetails: "View Scheme", applyHeading: "How to Apply", verifyText: "Verify Source", aiExplHeading: "AI Explanation", btnListen: "Listen", stopListen: "Stop", disclaimer: "AI helps you understand. Official sources remain the authority.", privateDisclaimer: "Private Opportunity. Verify terms directly with the provider.",
        filterAll: "All", filterGov: "Government", filterPriv: "Private", catFertilizer: "Fertilizer Support", catCropProtection: "Crop Protection", catSeeds: "Seeds", catIrrigation: "Irrigation", catMachinery: "Farm Machinery", catInsurance: "Crop Insurance", catCredit: "Agricultural Credit",
        pestSafetyTitle: "Safety Notice", pestSafetyText: "Always follow the product label and guidance from authorized agricultural professionals.",
        offWeb: "Official Website", applyNow: "Apply Now", offSource: "Official Source", lastVer: "Last Verified", visitOffWeb: "Visit Official Website",
        mmTitle: "Understand a Document", mmUploadText: "Upload Document", btnAnalyze: "Analyze Document", mmResTitle: "AI Analysis", mmDisclaimer: "AI-generated simulation.", offlineTitle: "Simulation Mode:", offlineText: "Running perfectly with local mock data.", emptyResults: "No schemes currently match your selected profile and category. Try another category.", countSuffix: "schemes match your profile"
    },
    hi: {
        navTitle: "किसान मित्र AI", heroBadge: "AI-सहायक • किसान-प्रथम", heroTitle: "सरकारी योजनाएं,<br><span class='text-brand-600'>आपके खेत के लिए सरल भाषा में।</span>", heroSub: "अपनी भाषा में प्रासंगिक कृषि योजनाएं खोजें।",
        labelStateText: "राज्य चुनें", displayStateEmpty: "अपना राज्य चुनें", searchState: "राज्य खोजें...", errorState: "कृपया अपना राज्य चुनें।",
        labelCropText: "फसल चुनें", displayCropEmpty: "पहले अपना राज्य चुनें", displayCropReady: "अपनी फसल चुनें", searchCrop: "फसल खोजें...", errorCrop: "कृपया अपनी फसल चुनें।", noCrops: "कोई फसल उपलब्ध नहीं",
        labelLandText: "भूमि क्षेत्र", labelAcres: "एकड़", errorLand: "कृपया एक वैध भूमि क्षेत्र दर्ज करें।", btnFind: "योजनाएं खोजें", 
        textBack: "प्रोफ़ाइल पर वापस", textBackRes: "योजनाओं पर वापस", resultsTitle: "योजनाएं और संसाधन", resultsSub: "आपकी प्रोफ़ाइल के आधार पर।",
        reasonHeading: "यह क्यों मैच करता है", reasonState: "आपके राज्य में उपलब्ध", reasonCrop: "आपकी फसल के लिए प्रासंगिक", reasonLand: "भूमि आकार संगत", viewDetails: "योजना देखें", applyHeading: "आवेदन कैसे करें", verifyText: "स्रोत सत्यापित करें", aiExplHeading: "AI स्पष्टीकरण", btnListen: "सुनें", stopListen: "रोकें", disclaimer: "AI आपको समझने में मदद करता है। आधिकारिक स्रोत ही प्रमाण है।", privateDisclaimer: "निजी अवसर। सीधे प्रदाता के साथ शर्तों की पुष्टि करें।",
        filterAll: "सभी", filterGov: "सरकारी", filterPriv: "निजी", catFertilizer: "उर्वरक सहायता", catCropProtection: "फसल सुरक्षा", catSeeds: "बीज", catIrrigation: "सिंचाई", catMachinery: "कृषि मशीनरी", catInsurance: "फसल बीमा", catCredit: "कृषि ऋण",
        pestSafetyTitle: "सुरक्षा सूचना", pestSafetyText: "हमेशा उत्पाद लेबल और अधिकृत कृषि पेशेवरों के मार्गदर्शन का पालन करें।",
        offWeb: "आधिकारिक वेबसाइट", applyNow: "अभी आवेदन करें", offSource: "आधिकारिक स्रोत", lastVer: "अंतिम सत्यापन", visitOffWeb: "आधिकारिक वेबसाइट देखें",
        mmTitle: "दस्तावेज़ समझें", mmUploadText: "दस्तावेज़ अपलोड करें", btnAnalyze: "विश्लेषण करें", mmResTitle: "AI विश्लेषण", mmDisclaimer: "AI-जनित सिमुलेशन।", offlineTitle: "सिमुलेशन मोड:", offlineText: "स्थानीय डेटा के साथ चल रहा है।", emptyResults: "वर्तमान में आपकी चयनित प्रोफ़ाइल और श्रेणी से कोई योजना मेल नहीं खाती। दूसरी श्रेणी आज़माएँ।", countSuffix: "योजनाएं आपकी प्रोफ़ाइल से मेल खाती हैं"
    },
    mr: {
        navTitle: "किसान मित्र AI", heroBadge: "AI-सहायक • किसान-प्रथम", heroTitle: "सरकारी योजनाएं,<br><span class='text-brand-600'>तुमच्या शेतासाठी सोप्या भाषेत।</span>", heroSub: "तुमच्या भाषेत संबंधित कृषी योजना शोधा.",
        labelStateText: "राज्य निवडा", displayStateEmpty: "तुमचे राज्य निवडा", searchState: "राज्य शोधा...", errorState: "कृपया तुमचे राज्य निवडा.",
        labelCropText: "पीक निवडा", displayCropEmpty: "प्रथम तुमचे राज्य निवडा", displayCropReady: "तुमचे पीक निवडा", searchCrop: "पीक शोधा...", errorCrop: "कृपया तुमचे पीक निवडा.", noCrops: "कोणतेही पीक उपलब्ध नाही",
        labelLandText: "जमीन क्षेत्र", labelAcres: "एकर", errorLand: "कृपया वैध जमीन क्षेत्र प्रविष्ट करा.", btnFind: "योजना शोधा", 
        textBack: "प्रोफाइलवर परत", textBackRes: "योजनांवर परत", resultsTitle: "योजना आणि संसाधने", resultsSub: "तुमच्या प्रोफाइलवर आधारित.",
        reasonHeading: "हे का जुळते", reasonState: "तुमच्या राज्यात उपलब्ध", reasonCrop: "तुमच्या पिकासाठी संबंधित", reasonLand: "जमिनीचा आकार सुसंगत", viewDetails: "योजना पहा", applyHeading: "अर्ज कसा करावा", verifyText: "स्रोत सत्यापित करा", aiExplHeading: "AI स्पष्टीकरण", btnListen: "ऐका", stopListen: "थांबवा", disclaimer: "AI तुम्हाला समजण्यास मदत करते. अधिकृत स्रोत हाच प्रमाण आहे.", privateDisclaimer: "खाजगी संधी. अटींची थेट प्रदात्याशी पुष्टी करा.",
        filterAll: "सर्व", filterGov: "सरकारी", filterPriv: "खाजगी", catFertilizer: "खत सहाय्य", catCropProtection: "पीक संरक्षण", catSeeds: "बियाणे", catIrrigation: "सिंचन", catMachinery: "कृषी यंत्रसामग्री", catInsurance: "पीक विमा", catCredit: "कृषी पत",
        pestSafetyTitle: "सुरक्षा सूचना", pestSafetyText: "नेहमी उत्पादनाचे लेबल आणि अधिकृत कृषी व्यावसायिकांच्या मार्गदर्शनाचे पालन करा.",
        offWeb: "अधिकृत वेबसाइट", applyNow: "आता अर्ज करा", offSource: "अधिकृत स्रोत", lastVer: "शेवटचे सत्यापन", visitOffWeb: "अधिकृत वेबसाइटला भेट द्या",
        mmTitle: "दस्तऐवज समजून घ्या", mmUploadText: "दस्तऐवज अपलोड करा", btnAnalyze: "विश्लेषण करा", mmResTitle: "AI विश्लेषण", mmDisclaimer: "AI-व्युत्पन्न सिम्युलेशन.", offlineTitle: "सिम्युलेशन मोड:", offlineText: "स्थानिक डेटासह चालत आहे.", emptyResults: "सध्या तुमच्या निवडलेल्या प्रोफाइल आणि श्रेणीशी कोणतीही योजना जुळत नाही. दुसरी श्रेणी वापरून पहा.", countSuffix: "योजना तुमच्या प्रोफाइलशी जुळतात"
    }
};

// ==========================================
// DOM ELEMENTS
// ==========================================
const DOM = {
    views: { home: document.getElementById('view-home'), results: document.getElementById('view-results'), detail: document.getElementById('view-detail') },
    form: { el: document.getElementById('scheme-form'), land: document.getElementById('land'), btn: document.getElementById('btn-submit'), spinner: document.getElementById('loading-spinner') },
    lang: { modal: document.getElementById('lang-modal'), grid: document.getElementById('language-grid'), display: document.getElementById('current-lang-display') },
    dropdowns: {
        stateBtn: document.getElementById('btn-dropdown-state'), stateMenu: document.getElementById('dropdown-state'), stateSearch: document.getElementById('search-state'), stateList: document.getElementById('list-state'), stateDisplay: document.getElementById('display-state'), stateErr: document.getElementById('error-state'),
        cropBtn: document.getElementById('btn-dropdown-crop'), cropMenu: document.getElementById('dropdown-crop'), cropSearch: document.getElementById('search-crop'), cropList: document.getElementById('list-crop'), cropDisplay: document.getElementById('display-crop'), cropErr: document.getElementById('error-crop')
    },
    detailContent: document.getElementById('detail-content'),
    filters: document.getElementById('category-filters')
};

// ==========================================
// UI INTERACTION LOGIC
// ==========================================
let openDropdown = null;
function closeAllDropdowns() {
    DOM.dropdowns.stateMenu.classList.remove('show');
    DOM.dropdowns.cropMenu.classList.remove('show');
    DOM.dropdowns.stateBtn.classList.remove('ring-2', 'ring-brand-500');
    DOM.dropdowns.cropBtn.classList.remove('ring-2', 'ring-brand-500');
    openDropdown = null;
}

document.addEventListener('click', (e) => {
    if (!DOM.dropdowns.stateBtn.contains(e.target) && !DOM.dropdowns.stateMenu.contains(e.target) &&
        !DOM.dropdowns.cropBtn.contains(e.target) && !DOM.dropdowns.cropMenu.contains(e.target)) closeAllDropdowns();
});

function setupDropdown(btnEl, menuEl, searchEl, type) {
    btnEl.addEventListener('click', () => {
        if (btnEl.disabled) return;
        const isOpen = menuEl.classList.contains('show');
        closeAllDropdowns();
        if (!isOpen) {
            menuEl.classList.add('show'); btnEl.classList.add('ring-2', 'ring-brand-500'); searchEl.value = '';
            populateList(type); searchEl.focus(); openDropdown = type;
        }
    });
    searchEl.addEventListener('input', (e) => populateList(type, e.target.value));
}

function populateList(type, filterQuery = '') {
    const listEl = type === 'state' ? DOM.dropdowns.stateList : DOM.dropdowns.cropList;
    listEl.innerHTML = '';
    
    let items = [];
    if (type === 'state') items = Object.keys(stateCropMap).map(id => ({ id, name: getLocalizedStateName(id) }));
    else {
        if (!state.farmer.stateId) { listEl.innerHTML = `<li class="px-4 py-3 text-sm text-gray-500 italic">${t('noCrops')}</li>`; return; }
        items = stateCropMap[state.farmer.stateId].map(id => ({ id, name: getLocalizedCropName(id) }));
    }

    items.sort((a, b) => a.name.localeCompare(b.name));
    if (filterQuery) items = items.filter(i => i.name.toLowerCase().includes(filterQuery.toLowerCase()));

    if (items.length === 0) { listEl.innerHTML = `<li class="px-4 py-3 text-sm text-gray-500 italic">No matches</li>`; return; }

    items.forEach(item => {
        const li = document.createElement('li');
        li.className = "px-4 py-2.5 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-700 cursor-pointer";
        if ((type === 'state' && state.farmer.stateId === item.id) || (type === 'crop' && state.farmer.cropId === item.id)) li.classList.add('bg-brand-50', 'text-brand-700', 'font-bold');
        li.innerText = item.name;
        li.addEventListener('click', () => { handleSelection(type, item.id); closeAllDropdowns(); });
        listEl.appendChild(li);
    });
}

function handleSelection(type, id) {
    if (type === 'state') {
        if (state.farmer.stateId !== id) {
            state.farmer.stateId = id; state.farmer.cropId = ''; DOM.dropdowns.stateErr.classList.add('hidden');
            updateDropdownDisplays();
        }
    } else {
        state.farmer.cropId = id; DOM.dropdowns.cropErr.classList.add('hidden'); updateDropdownDisplays();
    }
}

function updateDropdownDisplays() {
    if (state.farmer.stateId) {
        DOM.dropdowns.stateDisplay.innerText = getLocalizedStateName(state.farmer.stateId);
        DOM.dropdowns.stateDisplay.classList.replace('text-gray-500', 'text-gray-900');
        DOM.dropdowns.cropBtn.disabled = false; DOM.dropdowns.cropBtn.classList.remove('opacity-60', 'cursor-not-allowed');
    } else {
        DOM.dropdowns.stateDisplay.innerText = t('displayStateEmpty'); DOM.dropdowns.stateDisplay.classList.replace('text-gray-900', 'text-gray-500');
        DOM.dropdowns.cropBtn.disabled = true; DOM.dropdowns.cropBtn.classList.add('opacity-60', 'cursor-not-allowed');
    }

    if (state.farmer.cropId) {
        DOM.dropdowns.cropDisplay.innerText = getLocalizedCropName(state.farmer.cropId);
        DOM.dropdowns.cropDisplay.classList.replace('text-gray-500', 'text-gray-900');
    } else {
        DOM.dropdowns.cropDisplay.innerText = state.farmer.stateId ? t('displayCropReady') : t('displayCropEmpty');
        DOM.dropdowns.cropDisplay.classList.replace('text-gray-900', 'text-gray-500');
    }
}

setupDropdown(DOM.dropdowns.stateBtn, DOM.dropdowns.stateMenu, DOM.dropdowns.stateSearch, 'state');
setupDropdown(DOM.dropdowns.cropBtn, DOM.dropdowns.cropMenu, DOM.dropdowns.cropSearch, 'crop');

function switchView(viewName) {
    Object.values(DOM.views).forEach(el => el.classList.add('hidden-step'));
    DOM.views[viewName].classList.remove('hidden-step');
    state.currentView = viewName;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
function goHome() { switchView('home'); }
function goBackToResults() { window.speechSynthesis.cancel(); state.isSpeaking = false; switchView('results'); }

// ==========================================
// TABS & FILTERS
// ==========================================
function renderFilters() {
    DOM.filters.innerHTML = '';
    FILTER_CONFIG.forEach(f => {
        const btn = document.createElement('button');
        const isActive = state.schemeFilter === f.id;
        btn.className = `px-4 py-2 text-sm font-semibold rounded-full border transition-colors whitespace-nowrap shrink-0 ${isActive ? 'bg-brand-600 text-white border-brand-600 shadow-sm' : 'bg-white text-gray-600 border-gray-200 hover:border-brand-300 hover:text-brand-600'}`;
        btn.innerText = t(f.key);
        btn.onclick = () => { state.schemeFilter = f.id; renderFilters(); renderSchemes(); };
        DOM.filters.appendChild(btn);
    });
}

// ==========================================
// CORE DATA GENERATION & API
// ==========================================
DOM.form.el.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (!state.farmer.stateId) { DOM.dropdowns.stateErr.classList.remove('hidden'); return; }
    if (!state.farmer.cropId) { DOM.dropdowns.cropErr.classList.remove('hidden'); return; }
    const landVal = parseFloat(DOM.form.land.value);
    if (!landVal || landVal <= 0) { document.getElementById('error-land').classList.remove('hidden'); return; }
    document.getElementById('error-land').classList.add('hidden');
    state.farmer.landArea = landVal;
    
    DOM.form.spinner.classList.remove('hidden'); DOM.form.btn.classList.add('opacity-50');

    try {
        const res = await fetch(`${API_URL}/schemes`, {
            method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ stateId: state.farmer.stateId, cropId: state.farmer.cropId, landArea: state.farmer.landArea, language: state.language, stateName: getLocalizedStateName(state.farmer.stateId), cropName: getLocalizedCropName(state.farmer.cropId) })
        });
        if(!res.ok) throw new Error("Offline");
        const data = await res.json();
        
        if(data.ai_offline) document.getElementById('offline-banner').classList.remove('hidden');
        else document.getElementById('offline-banner').classList.add('hidden');
        
        state.schemes = data.schemes;
    } catch(err) {
        document.getElementById('offline-banner').classList.remove('hidden');
        state.schemes = simulateMatching();
    } finally {
        DOM.form.spinner.classList.add('hidden'); DOM.form.btn.classList.remove('opacity-50');
        state.schemeFilter = 'all';
        renderFilters();
        renderSchemes();
        switchView('results');
    }
});

function simulateMatching() {
    let matched = [];
    for (const s of LOCAL_DB) {
        let stMatch = s.stateId === "all" || s.stateId === state.farmer.stateId;
        let crMatch = s.cropIds.includes("all") || s.cropIds.includes(state.farmer.cropId);
        let landMatch = true;
        if(s.landConstraints && s.landConstraints.startsWith(">") && state.farmer.landArea <= parseFloat(s.landConstraints.substring(1))) landMatch = false;

        if(stMatch && crMatch && landMatch) {
            let copy = {...s};
            
            let catReason = `Addresses ${t(FILTER_CONFIG.find(c => c.id === s.category)?.key || s.category)}`;
            if (s.category === 'fertilizer') catReason = "Provides fertilizer/nutrient-related support";
            if (s.category === 'crop_protection') catReason = "Addresses crop-protection needs";
            
            copy.match_reasons = [
                s.stateId === "all" ? "Available nationwide" : `Available in ${getLocalizedStateName(state.farmer.stateId)}`,
                s.cropIds.includes("all") ? "Applies to all crops" : `Relevant to ${getLocalizedCropName(state.farmer.cropId)}`,
                `Land size compatible (${state.farmer.landArea} acres)`,
                catReason
            ];
            matched.push(copy);
        }
    }
    return matched;
}

// ==========================================
// RENDERERS
// ==========================================
function renderSchemes() {
    const container = document.getElementById('results-container');
    container.innerHTML = '';
    
    let filtered = state.schemes;
    if (state.schemeFilter === 'government' || state.schemeFilter === 'private') {
        filtered = state.schemes.filter(s => s.type === state.schemeFilter);
    } else if (state.schemeFilter !== 'all') {
        filtered = state.schemes.filter(s => s.category === state.schemeFilter);
    }
    
    document.getElementById('results-count').innerText = `${filtered.length} ${t('countSuffix')}`;
    
    if(filtered.length === 0) {
        container.innerHTML = `<div class="col-span-2 text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm"><i data-lucide="search-x" class="w-12 h-12 text-gray-300 mx-auto mb-3"></i><h3 class="text-lg font-bold text-gray-900">${t('emptyResults')}</h3></div>`;
        if (window.lucide) lucide.createIcons(); return;
    }

    filtered.forEach(s => {
        const isPriv = s.type === 'private';
        const displayCat = t(FILTER_CONFIG.find(c => c.id === s.category)?.key || s.category);
        const hasWeb = isValidExternalUrl(s.officialWebsite);
        const hasApp = isValidExternalUrl(s.applicationUrl);
        
        const div = document.createElement('div');
        div.className = `bg-white p-6 rounded-2xl border shadow-soft hover:shadow-md transition group flex flex-col h-full ${isPriv ? 'border-purple-200' : 'border-gray-200'}`;
        
        div.innerHTML = `
            <div class="flex justify-between items-start mb-3 cursor-pointer" onclick="state.selectedScheme = state.schemes.find(x => x.id === '${s.id}'); switchView('detail'); renderSchemeDetails(state.selectedScheme);">
                <div class="flex gap-2">
                    ${isPriv ? `<span class="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 border-purple-200 px-2.5 py-1 rounded-md border">Private</span>` : `<span class="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 border-brand-200 px-2.5 py-1 rounded-md border">Government</span>`}
                    <span class="text-xs font-semibold tracking-wider text-gray-600 bg-gray-100 border-gray-200 px-2.5 py-1 rounded-md border">${displayCat}</span>
                </div>
            </div>
            
            <div class="cursor-pointer" onclick="state.selectedScheme = state.schemes.find(x => x.id === '${s.id}'); switchView('detail'); renderSchemeDetails(state.selectedScheme);">
                <h3 class="text-xl font-extrabold text-gray-900 mb-2 leading-tight">${s.name}</h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">${s.shortDescription || s.benefit}</p>
                <div class="mb-4">
                    <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5"><i data-lucide="check-square" class="w-3.5 h-3.5"></i> ${t('reasonHeading')}</p>
                    <ul class="space-y-1.5">
                        <li class="flex items-start gap-2 text-sm text-gray-700"><i data-lucide="check-circle-2" class="w-4 h-4 text-green-500 shrink-0 mt-0.5"></i> ${s.match_reasons[0]}</li>
                        <li class="flex items-start gap-2 text-sm text-gray-700"><i data-lucide="check-circle-2" class="w-4 h-4 text-green-500 shrink-0 mt-0.5"></i> ${s.match_reasons[3] || s.match_reasons[1]}</li>
                    </ul>
                </div>
            </div>
            
            <div class="mt-auto pt-4 border-t border-gray-100">
                <div class="mb-4 bg-gray-50 p-3 rounded-lg border border-gray-100 flex items-center gap-3">
                    <div class="bg-white p-1.5 rounded-full shadow-sm shrink-0 border border-gray-200"><i data-lucide="building-2" class="w-4 h-4 ${isPriv ? 'text-purple-600' : 'text-blue-600'}"></i></div>
                    <div>
                        <p class="text-[10px] uppercase font-bold text-gray-400 leading-none mb-0.5">${t('offSource')}</p>
                        <p class="text-xs font-semibold text-gray-800 leading-tight">${s.officialSourceName || (isPriv ? 'Private Provider' : 'Government Authority')}</p>
                    </div>
                </div>
                
                <div class="flex flex-col sm:flex-row gap-2">
                    ${hasWeb ? `<a href="${s.officialWebsite}" target="_blank" rel="noopener noreferrer" aria-label="Visit official website" class="flex-1 text-center py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-800 font-semibold text-sm rounded-xl transition-colors border border-gray-200 flex items-center justify-center gap-1.5"><i data-lucide="external-link" class="w-4 h-4"></i> ${t('offWeb')}</a>` : ''}
                    ${hasApp ? `<a href="${s.applicationUrl}" target="_blank" rel="noopener noreferrer" aria-label="Apply now" class="flex-1 text-center py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5">${t('applyNow')} <i data-lucide="arrow-right" class="w-4 h-4"></i></a>` : ''}
                    ${!hasWeb && !hasApp ? `<button class="w-full text-center py-2.5 bg-gray-50 text-gray-400 font-semibold text-sm rounded-xl cursor-not-allowed border border-gray-200">Website Unavailable</button>` : ''}
                </div>
                ${s.lastVerified ? `<p class="text-center text-[10px] text-gray-400 mt-3 font-medium">${t('lastVer')}: ${s.lastVerified}</p>` : ''}
            </div>
        `;
        container.appendChild(div);
    });
    if (window.lucide) lucide.createIcons();
}

function renderSchemeDetails(s) {
    let explId = `ai-expl-${s.id}`;
    const isPriv = s.type === 'private';
    const displayCat = t(FILTER_CONFIG.find(c => c.id === s.category)?.key || s.category);
    const hasWeb = isValidExternalUrl(s.officialWebsite);
    const hasApp = isValidExternalUrl(s.applicationUrl);
    
    let safetyNoticeHtml = '';
    if (s.category === 'crop_protection') {
        safetyNoticeHtml = `
            <div class="bg-yellow-50 border border-yellow-200 p-4 rounded-xl mb-6 flex gap-3 items-start shadow-sm">
                <i data-lucide="triangle-alert" class="w-5 h-5 text-yellow-600 shrink-0 mt-0.5"></i>
                <div>
                    <h4 class="font-bold text-yellow-800 text-sm mb-0.5">${t('pestSafetyTitle')}</h4>
                    <p class="text-sm text-yellow-800">${t('pestSafetyText')}</p>
                </div>
            </div>
        `;
    }

    DOM.detailContent.innerHTML = `
        <div class="bg-gradient-to-br ${isPriv ? 'from-purple-800 to-purple-900' : 'from-brand-800 to-brand-900'} p-8 sm:p-10 text-white relative">
            <div class="flex flex-wrap gap-2 mb-4">
                <span class="bg-white/20 border border-white/30 text-white text-xs font-bold uppercase px-3 py-1 rounded-full inline-block">${isPriv ? 'Private Opportunity' : 'Government Scheme'}</span>
                <span class="bg-black/20 border border-black/10 text-white text-xs font-bold uppercase px-3 py-1 rounded-full inline-block">${displayCat}</span>
            </div>
            <h2 class="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">${s.name}</h2>
            <div class="flex items-center gap-2 font-medium text-lg"><i data-lucide="wallet" class="w-5 h-5"></i> ${s.benefit}</div>
        </div>
        <div class="p-6 sm:p-8">
            
            <!-- OFFICIAL SOURCE SECTION -->
            <div class="bg-gray-50 border border-gray-200 rounded-2xl p-6 sm:p-8 mb-8 shadow-sm">
                <div class="flex items-center gap-2 text-gray-500 text-xs font-bold uppercase tracking-wider mb-4"><i data-lucide="shield-check" class="w-4 h-4 text-green-600"></i> ${t('offSource')}</div>
                <h3 class="text-lg font-bold text-gray-900 mb-6">${s.officialSourceName || (isPriv ? 'Private Provider' : 'Government Authority')}</h3>
                
                <div class="flex flex-col sm:flex-row gap-3">
                    ${hasWeb ? `<a href="${s.officialWebsite}" target="_blank" rel="noopener noreferrer" aria-label="Visit official website" class="flex-1 text-center py-3.5 bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm rounded-xl transition-colors border border-gray-300 flex items-center justify-center gap-2 shadow-sm"><i data-lucide="external-link" class="w-4 h-4 text-gray-500"></i> ${t('visitOffWeb')}</a>` : ''}
                    ${hasApp ? `<a href="${s.applicationUrl}" target="_blank" rel="noopener noreferrer" aria-label="Apply now" class="flex-1 text-center py-3.5 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm rounded-xl transition-colors shadow-sm flex items-center justify-center gap-2">${t('applyNow')} <i data-lucide="arrow-right" class="w-4 h-4 text-brand-200"></i></a>` : ''}
                    ${!hasWeb && !hasApp ? `<div class="w-full text-center py-3.5 bg-gray-100 text-gray-400 font-semibold text-sm rounded-xl border border-gray-200">Website Unavailable</div>` : ''}
                </div>
                ${s.lastVerified ? `<p class="text-xs text-gray-400 mt-4 flex items-center gap-1.5"><i data-lucide="clock" class="w-3.5 h-3.5"></i> ${t('lastVer')}: ${s.lastVerified}</p>` : ''}
            </div>

            ${safetyNoticeHtml}

            <div class="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 sm:p-8 mb-8 relative overflow-hidden">
                <div class="flex justify-between items-center mb-4">
                    <div class="flex items-center gap-2 text-indigo-800 font-bold"><i data-lucide="bot" class="w-5 h-5"></i> ${t('aiExplHeading')}</div>
                    <button onclick="toggleSpeech('${explId}')" id="btn-speak-${explId}" class="flex items-center gap-2 bg-white text-indigo-700 border border-indigo-200 px-4 py-2 rounded-xl text-sm transition hover:bg-indigo-100"><i data-lucide="volume-2" class="w-4 h-4"></i> <span id="text-speak-${explId}">${t('btnListen')}</span></button>
                </div>
                <div id="${explId}" class="prose prose-sm text-indigo-900"><div class="animate-pulse h-4 bg-indigo-200 rounded w-3/4 mb-2"></div><div class="animate-pulse h-4 bg-indigo-200 rounded w-1/2"></div></div>
            </div>

            <div class="grid sm:grid-cols-2 gap-8 mb-8">
                <div>
                    <h3 class="font-bold text-gray-900 mb-3 flex items-center gap-2"><i data-lucide="target" class="w-5 h-5 text-gray-500"></i> ${t('reasonHeading')}</h3>
                    <ul class="space-y-2 bg-gray-50 p-4 rounded-xl text-sm border border-gray-100">
                        ${s.match_reasons.map(r => `<li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 text-brand-500 mt-0.5 shrink-0"></i> ${r}</li>`).join('')}
                    </ul>
                </div>
                <div>
                    <h3 class="font-bold text-gray-900 mb-3 flex items-center gap-2"><i data-lucide="file-text" class="w-5 h-5 text-gray-500"></i> Required Documents</h3>
                    <ul class="space-y-2 bg-white border border-gray-200 p-4 rounded-xl text-sm text-gray-700 shadow-sm">
                        ${(s.documents || []).map(d => `<li class="flex gap-2"><i data-lucide="dot" class="w-4 h-4 text-gray-400 mt-0.5"></i> ${d}</li>`).join('')}
                    </ul>
                </div>
            </div>

            <div class="bg-gray-50 rounded-2xl p-6 border border-gray-200 shadow-sm mb-6">
                <h3 class="font-bold text-gray-900 mb-2">${t('applyHeading')}</h3>
                <p class="text-sm text-gray-700">${s.applicationProcess}</p>
            </div>
            
            <div class="bg-earth-50 p-4 rounded-xl text-xs text-gray-600 flex items-start gap-3 border border-earth-100">
                <i data-lucide="shield-alert" class="w-5 h-5 ${isPriv ? 'text-purple-600' : 'text-earth-600'} shrink-0"></i>
                <p class="pt-0.5">${isPriv ? t('privateDisclaimer') : t('disclaimer')}</p>
            </div>
        </div>
    `;
    if (window.lucide) lucide.createIcons();
    fetchExplanation(s, explId);
}

let currentExplanationText = "";
async function fetchExplanation(scheme, divId) {
    try {
        const res = await fetch(`${API_URL}/explain`, { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ scheme_id: scheme.id, language: state.language }) });
        if(!res.ok) throw new Error("Offline");
        const data = await res.json();
        document.getElementById(divId).innerHTML = data.explanation.replace(/\n/g, '<br>');
        currentExplanationText = data.explanation;
    } catch(err) {
        setTimeout(() => {
            const txt = scheme.type === 'private' ? "This is an indicative private agricultural opportunity. Please verify all terms and eligibility directly with the corporate provider." : "This scheme provides support to eligible farmers based on their state and crop profile. Please ensure you meet all listed criteria and have the required documents.";
            document.getElementById(divId).innerHTML = txt;
            currentExplanationText = txt;
        }, 800);
    }
}

function toggleSpeech(explId) {
    if(!currentExplanationText) return;
    const btnText = document.getElementById(`text-speak-${explId}`);
    if(state.isSpeaking) { window.speechSynthesis.cancel(); state.isSpeaking = false; if(btnText) btnText.innerText = t('btnListen'); return; }
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentExplanationText.replace(/<br>/g, ' '));
    const langMap = { 'en': 'en-IN', 'hi': 'hi-IN', 'mr': 'mr-IN' };
    utterance.lang = langMap[state.language] || 'en-IN';
    utterance.onend = () => { state.isSpeaking = false; if(btnText) btnText.innerText = t('btnListen'); };
    state.isSpeaking = true; if(btnText) btnText.innerText = t('stopListen');
    window.speechSynthesis.speak(utterance);
}

// ==========================================
// MULTILINGUAL UPDATE EXTENSION
// ==========================================
function applyTranslations() {
    // Nav & Hero
    document.getElementById('nav-title').innerHTML = t('navTitle');
    document.getElementById('hero-badge').innerHTML = t('heroBadge');
    document.getElementById('hero-title').innerHTML = t('heroTitle');
    document.getElementById('hero-subtitle').innerHTML = t('heroSub');
    document.getElementById('label-state-text').innerHTML = t('labelStateText');
    document.getElementById('label-crop-text').innerHTML = t('labelCropText');
    document.getElementById('label-land-text').innerHTML = t('labelLandText');
    document.getElementById('label-acres').innerHTML = t('labelAcres');
    DOM.dropdowns.stateSearch.placeholder = t('searchState'); DOM.dropdowns.cropSearch.placeholder = t('searchCrop');
    DOM.dropdowns.stateErr.innerText = t('errorState'); DOM.dropdowns.cropErr.innerText = t('errorCrop'); document.getElementById('error-land').innerText = t('errorLand');
    document.getElementById('btn-find').innerHTML = t('btnFind');
    
    // Results Top
    document.getElementById('text-back').innerHTML = t('textBack');
    document.getElementById('text-back-res').innerHTML = t('textBackRes');
    document.getElementById('hub-title').innerHTML = t('resultsTitle');
    document.getElementById('hub-subtitle').innerHTML = t('resultsSub');
    
    // Modals mm
    document.getElementById('mm-title').innerHTML = t('mmTitle'); document.getElementById('mm-upload-text').innerHTML = t('mmUploadText');
    document.getElementById('btn-analyze-text').innerHTML = t('btnAnalyze'); document.getElementById('mm-res-title').innerHTML = t('mmResTitle');
    document.getElementById('mm-res-disclaimer').innerHTML = t('mmDisclaimer'); document.getElementById('offline-title').innerHTML = t('offlineTitle');
    document.getElementById('offline-text').innerHTML = t('offlineText');

    updateDropdownDisplays();
    if(openDropdown) populateList(openDropdown, document.getElementById(`search-${openDropdown}`).value);

    // Re-renders to apply text inside generated html
    if (state.currentView === 'results') {
        renderFilters();
        renderSchemes();
    }
    if (state.currentView === 'detail' && state.selectedScheme) renderSchemeDetails(state.selectedScheme);
    
    if (window.lucide) lucide.createIcons();
}

function initLanguage() {
    DOM.lang.grid.innerHTML = languages.map(l => `
        <button onclick="setLanguage('${l.code}')" class="flex flex-col items-start p-3 rounded-xl border ${state.language === l.code ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-gray-200 bg-white hover:bg-gray-50 text-gray-700'} transition text-left">
            <span class="font-bold">${l.native}</span><span class="text-xs opacity-70">${l.name}</span>
        </button>`).join('');
    DOM.lang.display.innerText = (languages.find(l => l.code === state.language) || languages[0]).native;
    document.documentElement.lang = state.language;
    applyTranslations();
}

function toggleLangModal() { DOM.lang.modal.classList.toggle('hidden'); DOM.lang.modal.classList.toggle('flex'); }

function setLanguage(code) {
    state.language = code; localStorage.setItem('km_lang', code);
    initLanguage(); toggleLangModal();
    if(state.isSpeaking) { window.speechSynthesis.cancel(); state.isSpeaking = false; }
}

function fillDemoData() {
    handleSelection('state', 'madhya_pradesh');
    handleSelection('crop', 'wheat');
    DOM.form.land.value = "5";
    DOM.form.btn.classList.add('ring-4', 'ring-brand-300', 'scale-[1.02]');
    setTimeout(() => { DOM.form.btn.classList.remove('ring-4', 'ring-brand-300', 'scale-[1.02]'); }, 500);
}

// Init
initLanguage();
