import React, { useState, useRef, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { Sparkles, Wand2, Star, Download, Circle, Loader2, Feather, Instagram, Linkedin, Twitter, FileText, LayoutDashboard, Copy, Lightbulb, Palette, Type, Blend, Copyright, Volume2, Facebook, Reddit, Send, Image, Wallet, TrendingUp, TrendingDown, RefreshCw, ShoppingCart, Tag, Edit, Trash2, X, PlusCircle, Building, Globe, ChevronDown, Banknote, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, onAuthStateChanged, signInWithCustomToken } from "firebase/auth";
import { getFirestore, collection, addDoc, onSnapshot, doc, updateDoc, deleteDoc, query } from "firebase/firestore";

// --- Firebase Configuration ---
// This configuration is a placeholder. In a real application,
// these values would be securely managed.
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// --- Firebase Initialization ---
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

// Main App Component
const App = () => {
    // State for navigation and custom modal messages
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [message, setMessage] = useState('');
    const [isMessageVisible, setIsMessageVisible] = useState(false);
    
    // Lifted state for balances to share between DeFiWallet and ExchangeHub
    const [balances, setBalances] = useState({
        'UAI': 1500.00,
        'BTC': 0.15,
        'ETH': 2.50,
        'BNB': 5.00,
        'SOL': 25.00,
        'ADA': 500.00,
    });

    // --- Message Box Functions ---
    const showMessage = (msg) => {
        setMessage(msg);
        setIsMessageVisible(true);
    };

    const closeMessage = () => {
        setIsMessageVisible(false);
    };

    // --- Main UI Structure ---
    return (
        <div className="min-h-screen bg-neutral-900 text-neutral-50 font-sans flex flex-col sm:flex-row">
            {/* Sidebar Navigation */}
            <aside className="w-full sm:w-64 bg-neutral-800 p-4 sm:p-6 shadow-lg sm:min-h-screen flex flex-row sm:flex-col items-center justify-center sm:justify-start gap-4 sm:gap-6 border-b sm:border-r border-neutral-700">
                <h1 className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2 sm:mb-8 text-center hidden sm:block">
                    UkaseAI Studio
                </h1>
                <h1 className="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 sm:hidden">
                    UAS
                </h1>
                <button
                    onClick={() => setCurrentPage('dashboard')}
                    className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors duration-200 ${currentPage === 'dashboard' ? 'bg-purple-600 text-white shadow-lg' : 'text-neutral-300 hover:bg-neutral-700'}`}
                >
                    <LayoutDashboard size={20} /> <span className="hidden sm:block">Dashboard</span>
                </button>
                <button
                    onClick={() => setCurrentPage('logo')}
                    className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors duration-200 ${currentPage === 'logo' ? 'bg-purple-600 text-white shadow-lg' : 'text-neutral-300 hover:bg-neutral-700'}`}
                >
                    <Star size={20} /> <span className="hidden sm:block">Logo Creator</span>
                </button>
                <button
                    onClick={() => setCurrentPage('imageArt')}
                    className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors duration-200 ${currentPage === 'imageArt' ? 'bg-purple-600 text-white shadow-lg' : 'text-neutral-300 hover:bg-neutral-700'}`}
                >
                    <Image size={20} /> <span className="hidden sm:block">Image Art</span>
                </button>
                <button
                    onClick={() => setCurrentPage('social')}
                    className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors duration-200 ${currentPage === 'social' ? 'bg-purple-600 text-white shadow-lg' : 'text-neutral-300 hover:bg-neutral-700'}`}
                >
                    <Feather size={20} /> <span className="hidden sm:block">Social Media</span>
                </button>
                <button
                    onClick={() => setCurrentPage('seo')}
                    className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors duration-200 ${currentPage === 'seo' ? 'bg-purple-600 text-white shadow-lg' : 'text-neutral-300 hover:bg-neutral-700'}`}
                >
                    <FileText size={20} /> <span className="hidden sm:block">SEO Content</span>
                </button>
                <button
                    onClick={() => setCurrentPage('defiWallet')}
                    className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors duration-200 ${currentPage === 'defiWallet' ? 'bg-purple-600 text-white shadow-lg' : 'text-neutral-300 hover:bg-neutral-700'}`}
                >
                    <Wallet size={20} /> <span className="hidden sm:block">My DeFi Wallet</span>
                </button>
                {/* ## NEW Exchange Hub Button ## */}
                <button
                    onClick={() => setCurrentPage('exchangeHub')}
                    className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors duration-200 ${currentPage === 'exchangeHub' ? 'bg-purple-600 text-white shadow-lg' : 'text-neutral-300 hover:bg-neutral-700'}`}
                >
                    <ShoppingCart size={20} /> <span className="hidden sm:block">Exchange Hub</span>
                </button>
            </aside>

            {/* Main Content Area */}
            <main className="flex-grow p-4 sm:p-8 overflow-y-auto">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPage}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {currentPage === 'dashboard' && <Dashboard />}
                        {currentPage === 'logo' && <LogoCreator showMessage={showMessage} />}
                        {currentPage === 'imageArt' && <ImageArt showMessage={showMessage} />}
                        {currentPage === 'social' && <SocialMediaGenerator showMessage={showMessage} />}
                        {currentPage === 'seo' && <SEOContentGenerator showMessage={showMessage} />}
                        {currentPage === 'defiWallet' && <DeFiWallet showMessage={showMessage} balances={balances} setBalances={setBalances} />}
                        {/* ## NEW Exchange Hub Page Rendering ## */}
                        {currentPage === 'exchangeHub' && <ExchangeHub showMessage={showMessage} cryptoOptions={Object.keys(balances)} />}
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Custom Modal Message Box */}
            {isMessageVisible && (
                <div className="fixed inset-0 bg-neutral-900/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-neutral-800 rounded-xl p-6 sm:p-8 shadow-2xl max-w-sm w-full border border-neutral-700">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-neutral-50">UkaseAI</h3>
                            <button onClick={closeMessage} className="text-neutral-400 hover:text-neutral-200 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-neutral-300 mb-6">{message}</p>
                        <button onClick={closeMessage} className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition-colors">
                            Got it
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Dashboard Component
const Dashboard = () => (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center">
        <div className="p-8 sm:p-16 rounded-3xl bg-neutral-800 shadow-xl border border-neutral-700">
            <h2 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-4">
                Welcome to UkaseAI
            </h2>
            <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto">
                Your all-in-one AI-powered platform for company branding, social media marketing, and SEO content creation.
            </p>
            <p className="mt-6 text-neutral-400">
                Use the sidebar to get started.
            </p>
        </div>
    </div>
);

// Logo Creator Component
const LogoCreator = ({ showMessage }) => {
    // State for logo creation
    const [businessPrompt, setBusinessPrompt] = useState('');
    const [suggestedNames, setSuggestedNames] = useState(null);
    const [selectedBrandName, setSelectedBrandName] = useState('');
    const [logoConcepts, setLogoConcepts] = useState(null);
    const [selectedConcept, setSelectedConcept] = useState(null);
    const [generatedImageUrl, setGeneratedImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isGeneratingName, setIsGeneratingName] = useState(false);
    const [isGeneratingConcepts, setIsGeneratingConcepts] = useState(false);
    const [isGeneratingLogo, setIsGeneratingLogo] = useState(false);
    const [isBlending, setIsBlending] = useState(false);
    // New state for premium features
    const [isPremium, setIsPremium] = useState(true); // Simulates premium status
    const [nameColor, setNameColor] = useState('#22d3ee'); // Initial color for name
    const [taglineColor, setTaglineColor] = useState('#a3a3a3'); // Initial color for tagline
    const [nameFontWeight, setNameFontWeight] = useState('font-bold'); // Tailwind class for font weight
    const [taglineFontWeight, setTaglineFontWeight] = useState('font-normal'); // Tailwind class for font weight
    const [nameFontFamily, setNameFontFamily] = useState('sans-serif'); // New state for name font family
    const [taglineFontFamily, setTaglineFontFamily] = useState('sans-serif'); // New state for tagline font family
    const [blendedImageUrl, setBlendedImageUrl] = useState('');

    const logoContainerRef = useRef(null);

    const isAnyLoading = isLoading || isGeneratingName || isGeneratingConcepts || isGeneratingLogo || isBlending;

    // A function to copy text to the clipboard
    const copyToClipboard = (text, message) => {
        if (text) {
            // Using a temporary textarea to handle copy command
            const textarea = document.createElement('textarea');
textarea.value = text;
            textarea.style.position = 'fixed'; // Avoid scrolling to bottom
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                showMessage(message);
            } catch (err) {
                console.error('Failed to copy text: ', err);
                showMessage('Failed to copy text. Please try again.');
            }
            document.body.removeChild(textarea);
        }
    };

    const handleSelectName = (name) => {
        setSelectedBrandName(name);
        setBusinessPrompt(name); // Use the brand name as the new prompt
        setSuggestedNames(null); // Hide the name suggestions
        setLogoConcepts(null);
        setGeneratedImageUrl('');
        setBlendedImageUrl('');
        showMessage(`You've selected "${name}". Now, generate branding concepts for it!`);
    };

    // Step 1: Suggest brand names based on the business prompt.
    const suggestBrandName = async () => {
        if (!businessPrompt) {
            showMessage('Please enter a business idea to get brand name suggestions.');
            return;
        }
        setIsLoading(true);
        setIsGeneratingName(true);
        setSuggestedNames(null);
        setLogoConcepts(null);
        setGeneratedImageUrl('');
        setBlendedImageUrl('');
        showMessage('Finding creative brand names...');

        try {
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

            const promptText = `
                Act as a branding expert. Generate 5 creative, professional brand name ideas for a business described as: "${businessPrompt}".
                The names should be short, memorable, and modern.
                Format your response as a JSON array of strings.
            `;

            const chatHistory = [{ role: "user", parts: [{ text: promptText }] }];
            const payload = {
                contents: chatHistory,
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        "type": "ARRAY",
                        "items": { "type": "STRING" }
                    }
                }
            };
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`API call failed with status: ${response.status}`);
            }

            const result = await response.json();
            const jsonText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
            const parsedJson = JSON.parse(jsonText);
            setSuggestedNames(parsedJson);
            showMessage('Brand names generated! Select one to continue.');

        } catch (err) {
            console.error('Error in suggestBrandName:', err);
            showMessage('An error occurred while generating brand names.');
        } finally {
            setIsLoading(false);
            setIsGeneratingName(false);
        }
    };


    // Step 2: Generate logo concepts and slogans.
    const generateConcepts = async () => {
        if (!businessPrompt) {
            showMessage('Please enter your business idea or select a brand name to get started.');
            return;
        }

        setIsLoading(true);
        setIsGeneratingConcepts(true);
        setLogoConcepts(null);
        setSuggestedNames(null);
        setGeneratedImageUrl('');
        setBlendedImageUrl('');
        showMessage('Generating branding concepts...');

        try {
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

            // Adjust prompt to include the selected brand name if it exists.
            const promptText = `
                Act as a professional branding expert. I need a logo and slogan for a business based on this description: "${businessPrompt}".
                ${selectedBrandName ? `The brand name is "${selectedBrandName}". Ensure the slogans and logo concepts are deeply integrated with this name.` : ''}
                Please generate 3 different, creative options. For each option, provide:
                1. A brief, evocative logo description.
                2. A catchy, memorable slogan.
                
                Format your response as a JSON array of objects. Each object should have a "logoDescription" and a "slogan" key.
            `;

            const chatHistory = [{ role: "user", parts: [{ text: promptText }] }];
            const payload = {
                contents: chatHistory,
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        "type": "ARRAY",
                        "items": {
                            "type": "OBJECT",
                            "properties": {
                                "logoDescription": { "type": "STRING" },
                                "slogan": { "type": "STRING" }
                            },
                            "propertyOrdering": ["logoDescription", "slogan"]
                        }
                    }
                }
            };
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`API call failed with status: ${response.status}`);
            }

            const result = await response.json();
            const jsonText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
            const parsedJson = JSON.parse(jsonText);
            setLogoConcepts(parsedJson);
            showMessage('Branding concepts generated! Please select a logo to create.');

        } catch (err) {
            console.error('Error in generateConcepts:', err);
            showMessage('An error occurred while generating concepts.');
        } finally {
            setIsLoading(false);
            setIsGeneratingConcepts(false);
        }
    };

    // Step 3: Generate the image based on the selected logo description.
    const generateLogoImage = async (concept) => {
        setIsLoading(true);
        setIsGeneratingLogo(true);
        setSelectedConcept(concept);
        setGeneratedImageUrl('');
        setBlendedImageUrl('');
        showMessage('Creating your unique logo...');

        try {
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;
            
            const prompt = `a high-quality, professional, minimalistic vector art icon. The icon should be a visual representation of this concept: "${concept.logoDescription}". EXCLUDE ALL TEXT, WORDS, AND LETTERS from the image. The style should be simple and clean.`;

            const payload = {
                instances: { prompt: prompt },
                parameters: { "sampleCount": 1 }
            };

            let response;
            let retries = 0;
            const maxRetries = 5;
            let delay = 1000;

            while (retries < maxRetries) {
                try {
                    response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });

                    if (response.status === 429) {
                        retries++;
                        await new Promise(res => setTimeout(res, delay));
                        delay *= 2;
                        continue;
                    }
                    
                    if (!response.ok) {
                        throw new Error(`API call failed with status: ${response.status}`);
                    }

                    const result = await response.json();
                    const base64Data = result?.predictions?.[0]?.bytesBase64Encoded;

                    if (base64Data) {
                        const newImageUrl = `data:image/png;base64,${base64Data}`;
                        setGeneratedImageUrl(newImageUrl);
                        showMessage('Logo created successfully!');
                        break;
                    } else {
                        throw new Error('Unexpected API response structure or missing image data.');
                    }
                } catch (err) {
                    console.error("Error generating logo image:", err);
                    retries++;
                    await new Promise(res => setTimeout(res, delay));
                    delay *= 2;
                }
            }
            if (!generatedImageUrl) {
                showMessage('Failed to generate logo image after multiple retries.');
            }
        } catch (err) {
            console.error('Error in generateLogoImage:', err);
            showMessage('An error occurred while generating the logo.');
        } finally {
            setIsLoading(false);
            setIsGeneratingLogo(false);
        }
    };

    // New: Blend the logo with the name and tagline using a canvas
    const blendLogo = () => {
        if (!generatedImageUrl || !selectedBrandName || !selectedConcept?.slogan) {
            showMessage('Please generate a logo, name, and tagline first.');
            return;
        }

        setIsBlending(true);
        showMessage('Blending logo with text...');

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.crossOrigin = "Anonymous"; // Required for canvas to avoid tainting
        image.src = generatedImageUrl;

        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;

            // Draw the original image
            ctx.drawImage(image, 0, 0);

            // Set up text properties
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Draw brand name
            const brandName = selectedBrandName;
            const nameFontSize = image.height * 0.08;
            ctx.font = `${nameFontWeight === 'font-bold' ? 'bold' : 'normal'} ${nameFontSize}px ${nameFontFamily}`;
            ctx.fillStyle = nameColor;
            ctx.fillText(brandName, canvas.width / 2, canvas.height * 0.7);

            // Draw tagline
            const tagline = selectedConcept.slogan;
            const taglineFontSize = image.height * 0.04;
            ctx.font = `${taglineFontWeight === 'font-bold' ? 'bold' : 'normal'} ${taglineFontSize}px ${taglineFontFamily}`;
            ctx.fillStyle = taglineColor;
            ctx.fillText(tagline, canvas.width / 2, canvas.height * 0.8);

            const newBlendedImage = canvas.toDataURL('image/png');
            setBlendedImageUrl(newBlendedImage);
            setIsBlending(false);
            showMessage('Logo and text blended successfully!');
        };

        image.onerror = () => {
            console.error("Error loading image for blending.");
            showMessage('Could not blend logo. Image failed to load.');
            setIsBlending(false);
        };
    };

    // Function to handle the image download
    const handleDownload = () => {
        let downloadUrl = blendedImageUrl || generatedImageUrl;
        let filename = `${selectedBrandName || 'UkaseAI_logo'}`;

        if (!isPremium && generatedImageUrl && !blendedImageUrl) {
            // Non-premium, no blend, so download the watermarked version
            const watermarkDiv = document.getElementById('watermark-content');
            if (watermarkDiv) {
                const svgContent = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
                        <style>
                            .watermark-text {
                                font-family: sans-serif;
                                font-size: 20px;
                                font-weight: bold;
                                fill: url(#grad);
                                text-anchor: middle;
                                dominant-baseline: central;
                                opacity: 0.1;
                            }
                            .watermark-text-side {
                                font-family: sans-serif;
                                font-size: 14px;
                                font-weight: bold;
                                fill: url(#grad);
                                text-anchor: start;
                                dominant-baseline: central;
                                opacity: 0.2;
                            }
                        </style>
                        <defs>
                            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
                                <stop offset="100%" style="stop-color:rgb(0,0,255);stop-opacity:1" />
                            </linearGradient>
                        </defs>
                        <text x="50%" y="50%" class="watermark-text">© Created By UkaseAI</text>
                        <text x="5%" y="50%" class="watermark-text-side">© Created By UkaseAI</text>
                    </svg>
                `;

                const svgBase64 = btoa(svgContent);
                const imageUrl = generatedImageUrl;

                const tempCanvas = document.createElement('canvas');
                const tempCtx = tempCanvas.getContext('2d');
                const img = new Image();
                img.crossOrigin = 'Anonymous';
                img.src = imageUrl;

                img.onload = () => {
                    tempCanvas.width = img.width;
                    tempCanvas.height = img.height;
                    tempCtx.drawImage(img, 0, 0);

                    const svgImage = new Image();
                    svgImage.src = `data:image/svg+xml;base64,${svgBase64}`;
                    svgImage.onload = () => {
                        tempCtx.drawImage(svgImage, 0, 0, tempCanvas.width, tempCanvas.height);
                        const watermarkedUrl = tempCanvas.toDataURL('image/png');
                        const link = document.createElement('a');
                        link.href = watermarkedUrl;
                        link.download = `${filename}_watermarked.png`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        showMessage('Downloading watermarked logo...');
                    };
                };
                return;
            }
        }
        
        // Default download for premium users or blended images
        if (downloadUrl) {
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = `${filename}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showMessage('Downloading your logo...');
        }
    };


    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-neutral-50 mb-4">Logo & Slogan Creator</h2>
            <div className="w-full bg-neutral-800 p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <div className="relative flex-grow w-full">
                        <Star className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                            type="text"
                            value={businessPrompt}
                            onChange={(e) => {
                                setBusinessPrompt(e.target.value);
                                if (selectedBrandName) {
                                    setSelectedBrandName(''); // Clear selected brand name if user types
                                }
                            }}
                            placeholder="e.g., 'A sustainable coffee brand for young professionals'"
                            className="w-full pl-12 pr-4 py-3 text-neutral-200 bg-neutral-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition-colors duration-300 placeholder-neutral-400"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <button
                            onClick={suggestBrandName}
                            disabled={isAnyLoading}
                            className="w-full px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 transform active:scale-95 disabled:from-neutral-500 disabled:to-neutral-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isGeneratingName ? (
                                <>
                                    <Loader2 className="animate-spin" />
                                    Suggesting...
                                </>
                            ) : (
                                <>
                                    <Lightbulb />
                                    Suggest Brand Name
                                </>
                            )}
                        </button>
                        <button
                            onClick={generateConcepts}
                            disabled={isAnyLoading}
                            className="w-full px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform active:scale-95 disabled:from-neutral-500 disabled:to-neutral-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isGeneratingConcepts ? (
                                <>
                                    <Loader2 className="animate-spin" />
                                    Analyzing...
                                </>
                            ) : (
                                <>
                                    <Wand2 />
                                    Generate Branding Concepts
                                </>
                            )}
                        </button>
                    </div>
                </div>
                 {/* Premium Toggle for demo purposes */}
                <div className="flex items-center justify-center gap-2 text-neutral-300">
                    <input
                        type="checkbox"
                        id="premium-toggle"
                        checked={isPremium}
                        onChange={(e) => setIsPremium(e.target.checked)}
                        className="h-4 w-4 rounded border-neutral-600 text-purple-600 focus:ring-purple-500"
                    />
                    <label htmlFor="premium-toggle" className="text-sm">Simulate Premium Subscriber</label>
                </div>

                {/* Main Content Area for Logo Creator */}
                <div className="w-full rounded-2xl border-4 border-dashed border-neutral-700 relative overflow-hidden flex flex-col items-center justify-center">
                    <AnimatePresence mode="wait">
                        {isAnyLoading && (
                            <motion.div
                                key="loader"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900/80 backdrop-blur-sm"
                            >
                                <Loader2 className="h-16 w-16 text-purple-500 animate-spin" />
                                <p className="mt-4 text-neutral-300">
                                    {isGeneratingName && 'Generating creative brand names...'}
                                    {isGeneratingConcepts && 'Summoning creative ideas...'}
                                    {isGeneratingLogo && 'Creating your logo...'}
                                    {isBlending && 'Blending logo with text...'}
                                </p>
                            </motion.div>
                        )}

                        {!isAnyLoading && !suggestedNames && !logoConcepts && !generatedImageUrl && (
                            <motion.div 
                                key="initial"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center text-neutral-500 p-8 flex flex-col items-center min-h-[400px] justify-center"
                            >
                                <Star className="w-16 h-16 mb-4" />
                                <p>Enter a business idea above to generate a logo and slogan.</p>
                            </motion.div>
                        )}

                        {!isAnyLoading && suggestedNames && (
                            <motion.div
                                key="names"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="p-6 sm:p-8 w-full"
                            >
                                <h2 className="text-2xl font-bold text-neutral-50 mb-4 text-center">Brand Name Suggestions</h2>
                                <p className="text-neutral-400 text-center mb-6">Choose a name to generate branding concepts for it, or copy your favorite.</p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {suggestedNames.map((name, index) => (
                                        <div
                                            key={index}
                                            className="relative bg-neutral-700 p-6 rounded-xl shadow-lg border border-neutral-600 transition-all duration-300 transform hover:scale-[1.02] text-center group"
                                        >
                                            <button
                                                onClick={() => handleSelectName(name)}
                                                className="absolute inset-0 z-10"
                                                title={`Select ${name}`}
                                            >
                                                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                                                    {name}
                                                </h3>
                                            </button>
                                            <button
                                                onClick={() => copyToClipboard(name, `Copied "${name}" to clipboard!`)}
                                                className="absolute top-2 right-2 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:text-neutral-200"
                                                title="Copy brand name"
                                            >
                                                <Copy size={20} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {!isAnyLoading && logoConcepts && !generatedImageUrl && (
                            <motion.div 
                                key="concepts"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="p-6 sm:p-8 w-full"
                            >
                                <h2 className="text-2xl font-bold text-neutral-50 mb-4 text-center">Branding Concepts for {selectedBrandName || businessPrompt}</h2>
                                <p className="text-neutral-400 text-center mb-6">Choose an idea to generate your logo.</p>
                                <div className="flex flex-col gap-4">
                                    {logoConcepts.map((concept, index) => (
                                        <div
                                            key={index}
                                            className="bg-neutral-700 p-6 rounded-xl shadow-lg border border-neutral-600 transition-all duration-300 transform hover:scale-[1.02] relative group"
                                        >
                                            <h3 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{concept.slogan}</h3>
                                            <p className="text-neutral-300 my-2">{concept.logoDescription}</p>
                                            <button
                                                onClick={() => generateLogoImage(concept)}
                                                className="mt-3 w-full px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors duration-300 transform active:scale-95 flex items-center justify-center gap-2"
                                            >
                                                <Circle size={16} /> Create this Logo
                                            </button>
                                            <button
                                                onClick={() => copyToClipboard(`${concept.slogan}\n${concept.logoDescription}`, 'Concept copied to clipboard!')}
                                                className="absolute top-4 right-4 text-neutral-400 opacity-0 group-hover:opacity-100 transition-opacity z-20 hover:text-neutral-200"
                                                title="Copy concept"
                                            >
                                                <Copy size={20} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {!isAnyLoading && generatedImageUrl && (
                            <motion.div 
                                key="logo"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="flex flex-col p-6 sm:p-8 w-full"
                            >
                                <h2 className="text-2xl font-bold text-neutral-50 mb-4 text-center">Your Logo</h2>
                                <div className="relative w-full max-w-[300px] aspect-square bg-neutral-700 rounded-xl flex items-center justify-center overflow-hidden border border-neutral-600 p-4 mx-auto" ref={logoContainerRef}>
                                    <img
                                        src={blendedImageUrl || generatedImageUrl}
                                        alt="Generated logo"
                                        className="w-full h-full object-contain"
                                        style={{ fontFamily: `${nameFontFamily}, ${taglineFontFamily}`}}
                                    />
                                    {/* Watermark for non-premium users */}
                                    {!isPremium && (
                                        <div id="watermark-content" className="absolute inset-0 flex items-center justify-center text-center">
                                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 text-[10vw] sm:text-[5vw] lg:text-[4vw] font-extrabold text-neutral-600 select-none">
                                                UkaseAI
                                            </div>
                                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -rotate-45 text-[8vw] sm:text-[4vw] lg:text-[3vw] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 opacity-20 select-none">
                                                © Created By UkaseAI
                                            </div>
                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 transform -rotate-90 text-sm sm:text-base font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500 opacity-40 select-none">
                                                © Created By UkaseAI
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <h3 className={`text-3xl font-bold mt-4 text-center ${nameFontWeight}`} style={{ color: nameColor, fontFamily: nameFontFamily }}>{selectedBrandName}</h3>
                                <p className={`mt-2 text-center italic ${taglineFontWeight}`} style={{ color: taglineColor, fontFamily: taglineFontFamily }}>
                                    {selectedConcept.slogan}
                                </p>
                                
                                {/* Premium Editing Options */}
                                {isPremium && (
                                    <div className="mt-8 p-4 bg-neutral-700 rounded-xl shadow-inner flex flex-col gap-4">
                                        <h4 className="text-xl font-bold text-neutral-50">Premium Editing Tools</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {/* Name Color Picker */}
                                            <div className="flex items-center gap-2 bg-neutral-600 p-2 rounded-lg">
                                                <Palette size={20} className="text-neutral-300" />
                                                <label className="text-neutral-300 text-sm">Name Color</label>
                                                <input type="color" value={nameColor} onChange={(e) => setNameColor(e.target.value)} className="w-8 h-8 rounded-full cursor-pointer" />
                                            </div>
                                            {/* Tagline Color Picker */}
                                            <div className="flex items-center gap-2 bg-neutral-600 p-2 rounded-lg">
                                                <Palette size={20} className="text-neutral-300" />
                                                <label className="text-neutral-300 text-sm">Tagline Color</label>
                                                <input type="color" value={taglineColor} onChange={(e) => setTaglineColor(e.target.value)} className="w-8 h-8 rounded-full cursor-pointer" />
                                            </div>
                                            {/* Name Style */}
                                            <div className="flex items-center gap-2 bg-neutral-600 p-2 rounded-lg">
                                                <Type size={20} className="text-neutral-300" />
                                                <label className="text-neutral-300 text-sm">Name Style</label>
                                                <select value={nameFontWeight} onChange={(e) => setNameFontWeight(e.target.value)} className="bg-neutral-800 text-white text-sm p-1 rounded-md flex-grow">
                                                    <option value="font-bold">Bold</option>
                                                    <option value="font-semibold">Semi-Bold</option>
                                                    <option value="font-normal">Normal</option>
                                                </select>
                                            </div>
                                            {/* Tagline Style */}
                                            <div className="flex items-center gap-2 bg-neutral-600 p-2 rounded-lg">
                                                <Type size={20} className="text-neutral-300" />
                                                <label className="text-neutral-300 text-sm">Tagline Style</label>
                                                <select value={taglineFontWeight} onChange={(e) => setTaglineFontWeight(e.target.value)} className="bg-neutral-800 text-white text-sm p-1 rounded-md flex-grow">
                                                    <option value="font-normal">Normal</option>
                                                    <option value="font-semibold">Semi-Bold</option>
                                                    <option value="font-bold">Bold</option>
                                                </select>
                                            </div>
                                             {/* Name Font */}
                                            <div className="flex items-center gap-2 bg-neutral-600 p-2 rounded-lg">
                                                <Type size={20} className="text-neutral-300" />
                                                <label className="text-neutral-300 text-sm">Name Font</label>
                                                <select value={nameFontFamily} onChange={(e) => setNameFontFamily(e.target.value)} className="bg-neutral-800 text-white text-sm p-1 rounded-md flex-grow">
                                                    <option value="sans-serif">Sans-serif</option>
                                                    <option value="serif">Serif</option>
                                                    <option value="monospace">Monospace</option>
                                                    <option value="cursive">Cursive</option>
                                                </select>
                                            </div>
                                            {/* Tagline Font */}
                                            <div className="flex items-center gap-2 bg-neutral-600 p-2 rounded-lg">
                                                <Type size={20} className="text-neutral-300" />
                                                <label className="text-neutral-300 text-sm">Tagline Font</label>
                                                <select value={taglineFontFamily} onChange={(e) => setTaglineFontFamily(e.target.value)} className="bg-neutral-800 text-white text-sm p-1 rounded-md flex-grow">
                                                    <option value="sans-serif">Sans-serif</option>
                                                    <option value="serif">Serif</option>
                                                    <option value="monospace">Monospace</option>
                                                    <option value="cursive">Cursive</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                                    {isPremium && (
                                        <button
                                            onClick={blendLogo}
                                            disabled={isAnyLoading}
                                            className="px-6 py-2 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 transform active:scale-95 flex items-center gap-2 justify-center"
                                        >
                                            {isBlending ? <Loader2 className="animate-spin" /> : <Blend size={20} />}
                                            {blendedImageUrl ? 'Re-blend Logo' : 'Blend with Logo'}
                                        </button>
                                    )}
                                    <button
                                        onClick={handleDownload}
                                        disabled={isAnyLoading}
                                        className="px-6 py-2 bg-purple-600 text-white font-bold rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-300 transform active:scale-95 flex items-center gap-2 justify-center"
                                    >
                                        <Download size={20} />
                                        Download Logo
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

// New Image Art Component
const ImageArt = ({ showMessage }) => {
    const [prompt, setPrompt] = useState('');
    const [generatedImageUrl, setGeneratedImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sourceContent, setSourceContent] = useState('');
    const [isSuggestingPrompt, setIsSuggestingPrompt] = useState(false);

    const generateImage = async () => {
        if (!prompt) {
            showMessage('Please enter a prompt to generate an image.');
            return;
        }

        setIsLoading(true);
        setGeneratedImageUrl('');
        showMessage('Creating your image masterpiece...');

        try {
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;

            const payload = {
                instances: { prompt: prompt },
                parameters: { "sampleCount": 1 }
            };

            let response;
            let retries = 0;
            const maxRetries = 5;
            let delay = 1000;

            while (retries < maxRetries) {
                try {
                    response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    });

                    if (response.status === 429) {
                        retries++;
                        await new Promise(res => setTimeout(res, delay));
                        delay *= 2;
                        continue;
                    }
                    
                    if (!response.ok) {
                        throw new Error(`API call failed with status: ${response.status}`);
                    }

                    const result = await response.json();
                    const base64Data = result?.predictions?.[0]?.bytesBase64Encoded;

                    if (base64Data) {
                        const newImageUrl = `data:image/png;base64,${base64Data}`;
                        setGeneratedImageUrl(newImageUrl);
                        showMessage('Image created successfully!');
                        break;
                    } else {
                        throw new Error('Unexpected API response structure or missing image data.');
                    }
                } catch (err) {
                    console.error("Error generating image:", err);
                    retries++;
                    await new Promise(res => setTimeout(res, delay));
                    delay *= 2;
                }
            }
            if (!generatedImageUrl) {
                showMessage('Failed to generate image after multiple retries.');
            }
        } catch (err) {
            console.error('Error in generateImage:', err);
            showMessage('An error occurred while generating the image.');
        } finally {
            setIsLoading(false);
        }
    };

    const suggestPrompt = async () => {
        if (!sourceContent) {
            showMessage('Please provide some content to get a prompt suggestion.');
            return;
        }

        setIsSuggestingPrompt(true);
        showMessage('Generating a creative image prompt...');

        try {
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

            const promptText = `
                Act as a creative director. Generate a detailed, vivid, and visually descriptive image generation prompt based on the following text: "${sourceContent}". 
                The prompt should be suitable for a generative AI model and should focus on a single, compelling visual.
                Example: "A minimalist, abstract line art depiction of a single coffee bean, with a soft golden glow emanating from within, against a dark, textured background."
                Return only the prompt text itself, without any introductory phrases or explanations.
            `;

            const chatHistory = [{ role: "user", parts: [{ text: promptText }] }];
            const payload = { contents: chatHistory };

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
                setPrompt(text.trim().replace(/^"/, '').replace(/"$/, '')); // Clean up potential quotes
                showMessage('Prompt suggestion generated!');
            } else {
                throw new Error('API returned an unexpected response.');
            }
        } catch (err) {
            console.error('Error suggesting prompt:', err);
            showMessage('An error occurred while suggesting the prompt.');
        } finally {
            setIsSuggestingPrompt(false);
        }
    };

    const handleDownload = () => {
        if (generatedImageUrl) {
            const link = document.createElement('a');
            link.href = generatedImageUrl;
            link.download = 'UkaseAI_Image.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showMessage('Downloading your image...');
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-neutral-50 mb-4">Image Art</h2>
            <div className="w-full bg-neutral-800 p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <div className="relative flex-grow w-full">
                        <Wand2 className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                            type="text"
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="e.g., 'A futuristic cyberpunk city with neon lights and flying cars, digital painting'"
                            className="w-full pl-12 pr-4 py-3 text-neutral-200 bg-neutral-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition-colors duration-300 placeholder-neutral-400"
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <input
                            type="text"
                            value={sourceContent}
                            onChange={(e) => setSourceContent(e.target.value)}
                            placeholder="Enter keywords or content for a prompt suggestion"
                            className="w-full p-3 text-neutral-200 bg-neutral-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors duration-300 placeholder-neutral-400"
                        />
                         <button
                            onClick={suggestPrompt}
                            disabled={isSuggestingPrompt || isLoading}
                            className="w-full sm:w-1/2 lg:w-1/3 flex-shrink-0 px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 transform active:scale-95 disabled:from-neutral-500 disabled:to-neutral-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSuggestingPrompt ? (
                                <>
                                    <Loader2 className="animate-spin" />
                                    Suggesting...
                                </>
                            ) : (
                                <>
                                    <Lightbulb />
                                    Suggest Prompt
                                </>
                            )}
                        </button>
                    </div>
                    <button
                        onClick={generateImage}
                        disabled={isLoading || isSuggestingPrompt}
                        className="w-full px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform active:scale-95 disabled:from-neutral-500 disabled:to-neutral-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin" />
                                Generating...
                            </>
                        ) : (
                            <>
                                <Sparkles />
                                Generate Image
                            </>
                        )}
                    </button>
                </div>
                 <div className="w-full rounded-2xl border-4 border-dashed border-neutral-700 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {(isLoading || isSuggestingPrompt) && (
                            <motion.div
                                key="loader"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900/80 backdrop-blur-sm"
                            >
                                <Loader2 className="h-16 w-16 text-purple-500 animate-spin" />
                                <p className="mt-4 text-neutral-300">
                                    {isLoading ? 'Generating your image...' : 'Suggesting a prompt...'}
                                </p>
                            </motion.div>
                        )}
                        {!isLoading && !generatedImageUrl && !isSuggestingPrompt && (
                            <motion.div 
                                key="initial"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="text-center text-neutral-500 p-8 flex flex-col items-center justify-center"
                            >
                                <Image className="w-16 h-16 mb-4" />
                                <p>Generate an image to go with your content.</p>
                            </motion.div>
                        )}
                        {generatedImageUrl && (
                            <motion.img
                                key="image"
                                src={generatedImageUrl}
                                alt="Generated image art"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5 }}
                                className="w-full h-full object-contain"
                            />
                        )}
                    </AnimatePresence>
                </div>
                {generatedImageUrl && (
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={handleDownload}
                            className="px-6 py-2 bg-purple-600 text-white font-bold rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-300 transform active:scale-95 flex items-center gap-2 justify-center"
                        >
                            <Download size={20} />
                            Download Image
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// Social Media Generator Component
const SocialMediaGenerator = ({ showMessage }) => {
    const [topic, setTopic] = useState('');
    const [platform, setPlatform] = useState('Instagram');
    const [generatedCopy, setGeneratedCopy] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false); // New state for TTS loading

    const generateSocialCopy = async () => {
        if (!topic) {
            showMessage('Please enter a topic or brand to generate social media copy.');
            return;
        }

        setIsLoading(true);
        setGeneratedCopy('');
        showMessage(`Generating ${platform} post...`);

        try {
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            const platformDetails = {
                'Instagram': 'a catchy, visual-first caption with relevant hashtags (#)',
                'Twitter': 'a short, punchy, and engaging tweet with hashtags (#)',
                'LinkedIn': 'a professional and informative post focused on industry insights',
                'Facebook': 'an engaging post with a clear hook, designed for a community, with relevant emojis',
                'Reddit': 'a thought-provoking, concise post with a question to drive discussion',
                'Telegram': 'a short, direct message with a clear call-to-action, suitable for a broadcast channel or group'
            };

            const promptText = `
                Generate ${platformDetails[platform]} for a social media post about this topic: "${topic}".
                Do not include a title or any other text besides the post content itself.
                The tone should be appropriate for the platform.
            `;
            const chatHistory = [{ role: "user", parts: [{ text: promptText }] }];
            const payload = { contents: chatHistory };
            
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
                setGeneratedCopy(text.trim());
                showMessage('Social media copy generated successfully!');
            } else {
                throw new Error('API returned an unexpected response.');
            }
        } catch (err) {
            console.error('Error generating social media copy:', err);
            showMessage('An error occurred while generating the post.');
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = (text, message) => {
        if (text) {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                showMessage(message);
            } catch (err) {
                console.error('Failed to copy text: ', err);
                showMessage('Failed to copy text. Please try again.');
            }
            document.body.removeChild(textarea);
        }
    };

    // New TTS function
    const speakText = async () => {
        if (!generatedCopy) {
            showMessage('Please generate content first to use text-to-speech.');
            return;
        }

        setIsSpeaking(true);
        showMessage('Converting text to audio...');

        const pcmToWav = (pcmData, sampleRate) => {
            const numChannels = 1;
            const bytesPerSample = 2;
            const blockAlign = numChannels * bytesPerSample;
            const byteRate = sampleRate * blockAlign;
            
            const wavData = new ArrayBuffer(44 + pcmData.byteLength);
            const view = new DataView(wavData);
            let offset = 0;

            // RIFF header
            const writeString = (str) => {
                for (let i = 0; i < str.length; i++) {
                    view.setUint8(offset + i, str.charCodeAt(i));
                }
                offset += str.length;
            };
            writeString('RIFF');
            view.setUint32(offset, 36 + pcmData.byteLength, true); // File size - 8
            offset += 4;
            writeString('WAVE');
            
            // FMT sub-chunk
            writeString('fmt ');
            view.setUint32(offset, 16, true); // Sub-chunk size
            offset += 4;
            view.setUint16(offset, 1, true); // Audio format (1 = PCM)
            offset += 2;
            view.setUint16(offset, numChannels, true);
            offset += 2;
            view.setUint32(offset, sampleRate, true);
            offset += 4;
            view.setUint32(offset, byteRate, true);
            offset += 4;
            view.setUint16(offset, blockAlign, true);
            offset += 2;
            view.setUint16(offset, bytesPerSample * 8, true); // Bits per sample
            offset += 2;
            
            // DATA sub-chunk
            writeString('data');
            view.setUint32(offset, pcmData.byteLength, true);
            offset += 4;
            
            const pcm16 = new Int16Array(pcmData);
            for (let i = 0; i < pcm16.length; i++) {
                view.setInt16(offset, pcm16[i], true);
                offset += 2;
            }
            
            return new Blob([wavData], { type: 'audio/wav' });
        };
        
        const base64ToArrayBuffer = (base64) => {
            const binaryString = atob(base64);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            return bytes.buffer;
        };

        try {
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;

            const payload = {
                contents: [{
                    parts: [{ text: generatedCopy }]
                }],
                generationConfig: {
                    responseModalities: ["AUDIO"],
                    speechConfig: {
                        voiceConfig: {
                            prebuiltVoiceConfig: { voiceName: "Kore" }
                        }
                    }
                }
            };

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            const part = result?.candidates?.[0]?.content?.parts?.[0];
            const audioData = part?.inlineData?.data;
            const mimeType = part?.inlineData?.mimeType;

            if (audioData && mimeType && mimeType.startsWith("audio/")) {
                const sampleRate = 16000; // Gemini TTS model default sample rate
                const pcmData = base64ToArrayBuffer(audioData);
                const wavBlob = pcmToWav(pcmData, sampleRate);
                const audioUrl = URL.createObjectURL(wavBlob);
                const audio = new Audio(audioUrl);
                audio.play();
                audio.onended = () => {
                    setIsSpeaking(false);
                    URL.revokeObjectURL(audioUrl);
                };
            } else {
                throw new Error('API returned unexpected audio data.');
            }
        } catch (err) {
            console.error('Error with TTS:', err);
            showMessage('An error occurred while generating audio.');
        } finally {
            setIsSpeaking(false);
        }
    };


    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-neutral-50 mb-4">Social Media Marketing</h2>
            <div className="bg-neutral-800 p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="platform-select" className="text-neutral-300 mb-2">Select Platform</label>
                        <select
                            id="platform-select"
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                            className="bg-neutral-700 text-neutral-200 p-3 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition-colors duration-300"
                        >
                            <option value="Instagram">Instagram</option>
                            <option value="Twitter">Twitter</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="Facebook">Facebook</option>
                            <option value="Reddit">Reddit</option>
                            <option value="Telegram">Telegram</option>
                        </select>
                    </div>
                    <div className="sm:col-span-2 flex flex-col">
                        <label htmlFor="social-topic" className="text-neutral-300 mb-2">Topic / Business Idea</label>
                        <input
                            type="text"
                            id="social-topic"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="e.g., 'New features for a productivity app'"
                            className="w-full p-3 text-neutral-200 bg-neutral-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition-colors duration-300 placeholder-neutral-400"
                        />
                    </div>
                </div>

                <button
                    onClick={generateSocialCopy}
                    disabled={isLoading}
                    className="w-full px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform active:scale-95 disabled:from-neutral-500 disabled:to-neutral-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="animate-spin" />
                            Generating...
                        </>
                    ) : (
                        <>
                            <Wand2 />
                            Generate Post
                        </>
                    )}
                </button>

                {generatedCopy && (
                    <div className="w-full bg-neutral-700 p-6 rounded-xl shadow-inner relative mt-4">
                        <h3 className="text-lg font-bold text-neutral-50 mb-2">Generated {platform} Post:</h3>
                        <p className="text-neutral-300 whitespace-pre-wrap">{generatedCopy}</p>
                        <div className="mt-4 flex items-center gap-4">
                            <button
                                onClick={() => copyToClipboard(generatedCopy, 'Post copied to clipboard!')}
                                className="px-4 py-2 bg-neutral-600 rounded-full text-white hover:bg-neutral-500 transition-colors flex items-center gap-2"
                                title="Copy to clipboard"
                            >
                                <Copy size={16} /> Copy
                            </button>
                            <button
                                onClick={speakText}
                                disabled={isSpeaking}
                                className="px-4 py-2 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-colors flex items-center gap-2"
                                title="Listen to content"
                            >
                                {isSpeaking ? <Loader2 className="animate-spin" size={16} /> : <Volume2 size={16} />}
                                {isSpeaking ? 'Speaking...' : 'Listen ✨'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// SEO Content Generator Component
const SEOContentGenerator = ({ showMessage }) => {
    const [topic, setTopic] = useState('');
    const [keywords, setKeywords] = useState('');
    const [generatedContent, setGeneratedContent] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isGeneratingOutline, setIsGeneratingOutline] = useState(false);
    const [isGeneratingArticle, setIsGeneratingArticle] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false); // New state for TTS loading

    const generateOutline = async () => {
        if (!topic) {
            showMessage('Please provide a topic to generate an outline.');
            return;
        }

        setIsGeneratingOutline(true);
        setGeneratedContent('');
        showMessage('Generating a blog post outline...');

        try {
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            const promptText = `
                Create a detailed, SEO-optimized blog post outline for the topic: "${topic}".
                Use the following keywords: ${keywords}.
                The outline should include an introduction, 3-4 main sections with sub-headings, and a conclusion.
                Use bold for all section titles, and emojis where appropriate to make them more visually appealing.
                Do not use Markdown headers like '##' or '###'.
                Provide only the markdown-formatted outline.
            `;
            const chatHistory = [{ role: "user", parts: [{ text: promptText }] }];
            const payload = { contents: chatHistory };
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
                setGeneratedContent(text.trim());
                showMessage('Outline generated successfully!');
            } else {
                throw new Error('API returned an unexpected response.');
            }
        } catch (err) {
            console.error('Error generating outline:', err);
            showMessage('An error occurred while generating the outline.');
        } finally {
            setIsGeneratingOutline(false);
        }
    };

    const generateFullArticle = async () => {
        if (!topic) {
            showMessage('Please provide a topic to generate a full article.');
            return;
        }
        
        setIsGeneratingArticle(true);
        setGeneratedContent('');
        showMessage('Generating a full blog post...');

        try {
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            const promptText = `
                Write a comprehensive, SEO-optimized blog post for the topic: "${topic}".
                Incorporate these keywords naturally: ${keywords}.
                The article should be well-structured, informative, and engaging.
                Use bold for all section titles, and emojis where appropriate to make them more visually appealing.
                Do not use Markdown headers like '##' or '###'.
                Provide only the markdown-formatted article content, without a title.
            `;
            const chatHistory = [{ role: "user", parts: [{ text: promptText }] }];
            const payload = { contents: chatHistory };
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            const text = result?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
                setGeneratedContent(text.trim());
                showMessage('Full article generated successfully!');
            } else {
                throw new Error('API returned an unexpected response.');
            }
        } catch (err) {
            console.error('Error generating article:', err);
            showMessage('An error occurred while generating the article.');
        } finally {
            setIsGeneratingArticle(false);
        }
    };

    const copyToClipboard = (text, message) => {
        if (text) {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                showMessage(message);
            } catch (err) {
                console.error('Failed to copy text: ', err);
                showMessage('Failed to copy text. Please try again.');
            }
            document.body.removeChild(textarea);
        }
    };

    // New TTS function
    const speakText = async () => {
        if (!generatedContent) {
            showMessage('Please generate content first to use text-to-speech.');
            return;
        }

        setIsSpeaking(true);
        showMessage('Converting text to audio...');

        const pcmToWav = (pcmData, sampleRate) => {
            const numChannels = 1;
            const bytesPerSample = 2;
            const blockAlign = numChannels * bytesPerSample;
            const byteRate = sampleRate * blockAlign;
            
            const wavData = new ArrayBuffer(44 + pcmData.byteLength);
            const view = new DataView(wavData);
            let offset = 0;

            // RIFF header
            const writeString = (str) => {
                for (let i = 0; i < str.length; i++) {
                    view.setUint8(offset + i, str.charCodeAt(i));
                }
                offset += str.length;
            };
            writeString('RIFF');
            view.setUint32(offset, 36 + pcmData.byteLength, true); // File size - 8
            offset += 4;
            writeString('WAVE');
            
            // FMT sub-chunk
            writeString('fmt ');
            view.setUint32(offset, 16, true); // Sub-chunk size
            offset += 4;
            view.setUint16(offset, 1, true); // Audio format (1 = PCM)
            offset += 2;
            view.setUint16(offset, numChannels, true);
            offset += 2;
            view.setUint32(offset, sampleRate, true);
            offset += 4;
            view.setUint32(offset, byteRate, true);
            offset += 4;
            view.setUint16(offset, blockAlign, true);
            offset += 2;
            view.setUint16(offset, bytesPerSample * 8, true); // Bits per sample
            offset += 2;
            
            // DATA sub-chunk
            writeString('data');
            view.setUint32(offset, pcmData.byteLength, true);
            offset += 4;
            
            const pcm16 = new Int16Array(pcmData);
            for (let i = 0; i < pcm16.length; i++) {
                view.setInt16(offset, pcm16[i], true);
                offset += 2;
            }
            
            return new Blob([wavData], { type: 'audio/wav' });
        };
        
        const base64ToArrayBuffer = (base64) => {
            const binaryString = atob(base64);
            const len = binaryString.length;
            const bytes = new Uint8Array(len);
            for (let i = 0; i < len; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            return bytes.buffer;
        };

        try {
            const apiKey = "";
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${apiKey}`;

            const payload = {
                contents: [{
                    parts: [{ text: generatedContent }]
                }],
                generationConfig: {
                    responseModalities: ["AUDIO"],
                    speechConfig: {
                        voiceConfig: {
                            prebuiltVoiceConfig: { voiceName: "Kore" }
                        }
                    }
                }
            };

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            const part = result?.candidates?.[0]?.content?.parts?.[0];
            const audioData = part?.inlineData?.data;
            const mimeType = part?.inlineData?.mimeType;

            if (audioData && mimeType && mimeType.startsWith("audio/")) {
                const sampleRate = 16000; // Gemini TTS model default sample rate
                const pcmData = base64ToArrayBuffer(audioData);
                const wavBlob = pcmToWav(pcmData, sampleRate);
                const audioUrl = URL.createObjectURL(wavBlob);
                const audio = new Audio(audioUrl);
                audio.play();
                audio.onended = () => {
                    setIsSpeaking(false);
                    URL.revokeObjectURL(audioUrl);
                };
            } else {
                throw new Error('API returned unexpected audio data.');
            }
        } catch (err) {
            console.error('Error with TTS:', err);
            showMessage('An error occurred while generating audio.');
        } finally {
            setIsSpeaking(false);
        }
    };
    
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-neutral-50 mb-4">SEO Content Solutions</h2>
            <div className="bg-neutral-800 p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col gap-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label htmlFor="seo-topic" className="text-neutral-300 mb-2">Blog Topic</label>
                        <input
                            type="text"
                            id="seo-topic"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            placeholder="e.g., 'The future of remote work'"
                            className="w-full p-3 text-neutral-200 bg-neutral-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition-colors duration-300 placeholder-neutral-400"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="seo-keywords" className="text-neutral-300 mb-2">Keywords (comma-separated)</label>
                        <input
                            type="text"
                            id="seo-keywords"
                            value={keywords}
                            onChange={(e) => setKeywords(e.target.value)}
                            placeholder="e.g., 'remote work trends, future of work'"
                            className="w-full p-3 text-neutral-200 bg-neutral-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:outline-none transition-colors duration-300 placeholder-neutral-400"
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={generateOutline}
                        disabled={isLoading}
                        className="flex-grow px-8 py-3 bg-purple-600 text-white font-bold rounded-xl shadow-lg hover:bg-purple-700 transition-all duration-300 transform active:scale-95 disabled:bg-neutral-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isGeneratingOutline ? (
                            <>
                                <Loader2 className="animate-spin" />
                                Outlining...
                            </>
                        ) : (
                            <>
                                <Wand2 />
                                Generate Outline
                            </>
                        )}
                    </button>
                    <button
                        onClick={generateFullArticle}
                        disabled={isLoading}
                        className="flex-grow px-8 py-3 bg-pink-600 text-white font-bold rounded-xl shadow-lg hover:bg-pink-700 transition-all duration-300 transform active:scale-95 disabled:bg-neutral-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isGeneratingArticle ? (
                            <>
                                <Loader2 className="animate-spin" />
                                Writing...
                            </>
                        ) : (
                            <>
                                <Wand2 />
                                Generate Full Article
                            </>
                        )}
                    </button>
                </div>

                {generatedContent && (
                    <div className="w-full bg-neutral-700 p-6 rounded-xl shadow-inner relative mt-4">
                        <h3 className="text-lg font-bold text-neutral-50 mb-2">Generated Content:</h3>
                        <div className="text-neutral-300 prose prose-invert max-w-none">
                            <pre className="whitespace-pre-wrap">{generatedContent}</pre>
                        </div>
                        <div className="mt-4 flex items-center gap-4">
                            <button
                                onClick={() => copyToClipboard(generatedContent, 'Content copied to clipboard!')}
                                className="px-4 py-2 bg-neutral-600 rounded-full text-white hover:bg-neutral-500 transition-colors flex items-center gap-2"
                                title="Copy to clipboard"
                            >
                                <Copy size={16} /> Copy
                            </button>
                            <button
                                onClick={speakText}
                                disabled={isSpeaking}
                                className="px-4 py-2 bg-purple-600 rounded-full text-white hover:bg-purple-700 transition-colors flex items-center gap-2"
                                title="Listen to content"
                            >
                                {isSpeaking ? <Loader2 className="animate-spin" size={16} /> : <Volume2 size={16} />}
                                {isSpeaking ? 'Speaking...' : 'Listen ✨'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// DeFi Wallet Component (Original version, without Exchange Hub)
const DeFiWallet = ({ showMessage, balances, setBalances }) => {
    const [transactionType, setTransactionType] = useState('Buy'); // 'Buy', 'Sell', 'Transfer'
    const [selectedToken, setSelectedToken] = useState('UAI');
    const [amount, setAmount] = useState('');
    const [destinationAddress, setDestinationAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [transactionHistory, setTransactionHistory] = useState([
        { id: 1, type: 'Buy', token: 'UAI', amount: 500, status: 'Success', date: '2024-05-18' },
        { id: 2, type: 'Transfer', token: 'ETH', amount: 0.5, status: 'Success', date: '2024-05-17' },
    ]);
    
    // New state for wallet connection
    const [isConnectDropdownOpen, setIsConnectDropdownOpen] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState('Not Connected');
    const connectButtonRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (connectButtonRef.current && !connectButtonRef.current.contains(event.target)) {
                setIsConnectDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleConnect = (walletType) => {
        setIsConnectDropdownOpen(false);
        setConnectionStatus(`Connecting to ${walletType}...`);
        // Simulate connection
        setTimeout(() => {
            setConnectionStatus(`Connected: ${walletType}`);
            showMessage(`Successfully connected to ${walletType}.`);
        }, 1000);
    };

    const handleTransaction = () => {
        if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
            showMessage('Please enter a valid amount.');
            return;
        }

        const numericAmount = parseFloat(amount);
        const currentBalance = balances[selectedToken];

        if (transactionType === 'Sell' || transactionType === 'Transfer') {
            if (numericAmount > currentBalance) {
                showMessage(`Insufficient funds. Your ${selectedToken} balance is ${currentBalance}.`);
                return;
            }
            if (transactionType === 'Transfer' && !destinationAddress) {
                showMessage('Please enter a valid destination address.');
                return;
            }
        }

        setIsLoading(true);

        // Simulate network delay
        setTimeout(() => {
            let newBalances = { ...balances };
            let newStatus = 'Success';
            let newTransaction;

            if (transactionType === 'Buy') {
                newBalances[selectedToken] = (newBalances[selectedToken] || 0) + numericAmount;
                newTransaction = { id: Date.now(), type: 'Buy', token: selectedToken, amount: numericAmount, status: newStatus, date: new Date().toISOString().split('T')[0] };
            } else if (transactionType === 'Sell') {
                newBalances[selectedToken] = Math.max(0, newBalances[selectedToken] - numericAmount);
                newTransaction = { id: Date.now(), type: 'Sell', token: selectedToken, amount: numericAmount, status: newStatus, date: new Date().toISOString().split('T')[0] };
            } else if (transactionType === 'Transfer') {
                newBalances[selectedToken] = Math.max(0, newBalances[selectedToken] - numericAmount);
                newTransaction = { id: Date.now(), type: 'Transfer', token: selectedToken, amount: numericAmount, status: newStatus, date: new Date().toISOString().split('T')[0], to: destinationAddress };
            }

            setBalances(newBalances);
            setTransactionHistory([newTransaction, ...transactionHistory]);
            setIsLoading(false);
            setAmount('');
            setDestinationAddress('');
            showMessage(`Transaction successful: ${transactionType} ${numericAmount} ${selectedToken}.`);
        }, 1500);
    };

    const TokenIcon = ({ token }) => {
        const icons = {
            'UAI': <Sparkles className="text-purple-400" />,
            'BTC': <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11.767 19.089l-1.071-.926a4.4 4.4 0 0 1-1.073-3.411V10a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h3.429M12 2v4a2 2 0 0 1-2 2H4m10 14v-4a2 2 0 0 0 2-2h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-3.429M12 22h8a2 2 0 0 0 2-2v-4m-12-8H4m0 0V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8" /></svg>,
            'ETH': <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l-8 10h16l-8 10zM4 12l8-10M4 12l8 10M20 12l-8-10M20 12l-8 10" /></svg>,
            'BNB': <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l4.5 13.5L12 22l-4.5-6.5L12 2zM12 2l-4.5 13.5M12 2l4.5 13.5M4.5 15.5l7.5-13.5M4.5 15.5l7.5 6.5M19.5 15.5l-7.5-6.5M19.5 15.5l-7.5 6.5" /></svg>,
            'SOL': <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l-8 10h16l-8 10z" /><path d="M4 12l8-10M4 12l8 10M20 12l-8-10M20 12l-8 10" /></svg>,
            'ADA': <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l-8 10h16l-8 10zM4 12l8-10M20 12l-8-10M4 12l8 10M20 12l-8 10" /></svg>,
        };
        return icons[token] || <Circle className="text-neutral-400" />;
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-start">
                <h2 className="text-3xl font-bold text-neutral-50 mb-4">My DeFi Wallet</h2>
                {/* ## NEW Connect Wallet Button and Dropdown ## */}
                <div className="relative" ref={connectButtonRef}>
                    <button
                        onClick={() => setIsConnectDropdownOpen(!isConnectDropdownOpen)}
                        className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors duration-200 ${connectionStatus !== 'Not Connected' ? 'bg-green-600 text-white' : 'bg-purple-600 text-white hover:bg-purple-700'}`}
                    >
                        <span>{connectionStatus !== 'Not Connected' ? 'Connected' : 'Connect'}</span>
                        <ChevronDown size={16} />
                    </button>
                    <AnimatePresence>
                        {isConnectDropdownOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute right-0 mt-2 w-48 bg-neutral-700 rounded-lg shadow-xl z-10 overflow-hidden"
                            >
                                <a onClick={() => handleConnect('WalletConnect')} className="flex items-center gap-3 px-4 py-3 text-sm text-neutral-200 hover:bg-neutral-600 cursor-pointer">
                                    <Image size={16} /> WalletConnect
                                </a>
                                <a onClick={() => handleConnect('MetaMask')} className="flex items-center gap-3 px-4 py-3 text-sm text-neutral-200 hover:bg-neutral-600 cursor-pointer">
                                    <Image size={16} /> MetaMask
                                </a>
                                <a onClick={() => handleConnect('Trust Wallet')} className="flex items-center gap-3 px-4 py-3 text-sm text-neutral-200 hover:bg-neutral-600 cursor-pointer">
                                    <Image size={16} /> Trust Wallet
                                </a>
                                <a onClick={() => handleConnect('Bank/Card')} className="flex items-center gap-3 px-4 py-3 text-sm text-neutral-200 hover:bg-neutral-600 cursor-pointer">
                                    <CreditCard size={16} /> Bank/Card
                                </a>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="bg-neutral-800 p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col gap-6">
                 <p className="text-neutral-400">
                    Welcome to the **UkaseAI DeFi Wallet**. **$UAI** is the native token of this platform.
                </p>
                <p className="text-sm text-neutral-500 -mt-4">Status: <span className={connectionStatus !== 'Not Connected' ? 'text-green-400' : 'text-red-400'}>{connectionStatus}</span></p>

                {/* Token Balances Section */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {Object.keys(balances).map(token => (
                        <div key={token} className="bg-neutral-700 p-4 rounded-xl shadow-md flex flex-col items-center justify-center text-center">
                            <div className="mb-2">
                                <TokenIcon token={token} />
                            </div>
                            <h3 className="text-lg font-bold text-neutral-50">{token}</h3>
                            <p className="text-neutral-300 text-xl font-semibold mt-1">{balances[token].toFixed(2)}</p>
                        </div>
                    ))}
                </div>

                {/* Transaction Options */}
                <div className="flex justify-center gap-4 mt-4">
                    <button
                        onClick={() => setTransactionType('Buy')}
                        className={`px-6 py-3 rounded-xl font-bold transition-colors duration-200 flex items-center gap-2 ${transactionType === 'Buy' ? 'bg-green-600 text-white' : 'bg-neutral-700 text-neutral-300 hover:bg-green-600 hover:text-white'}`}
                    >
                        <TrendingUp size={20} /> Buy
                    </button>
                    <button
                        onClick={() => setTransactionType('Sell')}
                        className={`px-6 py-3 rounded-xl font-bold transition-colors duration-200 flex items-center gap-2 ${transactionType === 'Sell' ? 'bg-red-600 text-white' : 'bg-neutral-700 text-neutral-300 hover:bg-red-600 hover:text-white'}`}
                    >
                        <TrendingDown size={20} /> Sell
                    </button>
                    <button
                        onClick={() => setTransactionType('Transfer')}
                        className={`px-6 py-3 rounded-xl font-bold transition-colors duration-200 flex items-center gap-2 ${transactionType === 'Transfer' ? 'bg-blue-600 text-white' : 'bg-neutral-700 text-neutral-300 hover:bg-blue-600 hover:text-white'}`}
                    >
                        <Send size={20} /> Transfer
                    </button>
                </div>

                {/* Transaction Form */}
                <div className="bg-neutral-700 p-6 rounded-xl shadow-inner mt-4">
                    <h3 className="text-xl font-bold text-neutral-50 mb-4">{transactionType} Tokens</h3>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <label className="text-neutral-300 min-w-[100px]">Token</label>
                            <select
                                value={selectedToken}
                                onChange={(e) => setSelectedToken(e.target.value)}
                                className="flex-grow p-3 bg-neutral-800 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-colors"
                            >
                                {Object.keys(balances).map(token => (
                                    <option key={token} value={token}>{token}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-neutral-300 min-w-[100px]">Amount</label>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                                className="flex-grow p-3 bg-neutral-800 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-colors"
                            />
                        </div>
                        {transactionType === 'Transfer' && (
                            <div className="flex flex-col gap-2">
                                <label className="text-neutral-300">Recipient Address</label>
                                <input
                                    type="text"
                                    value={destinationAddress}
                                    onChange={(e) => setDestinationAddress(e.target.value)}
                                    placeholder="0x..."
                                    className="w-full p-3 bg-neutral-800 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none transition-colors"
                                />
                            </div>
                        )}
                        <button
                            onClick={handleTransaction}
                            disabled={isLoading}
                            className={`w-full px-8 py-3 rounded-xl font-bold shadow-lg transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 ${
                                transactionType === 'Buy' ? 'bg-green-600 hover:bg-green-700' :
                                transactionType === 'Sell' ? 'bg-red-600 hover:bg-red-700' :
                                'bg-blue-600 hover:bg-blue-700'
                            } text-white disabled:bg-neutral-500 disabled:cursor-not-allowed`}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    {transactionType === 'Buy' && <TrendingUp size={20} />}
                                    {transactionType === 'Sell' && <TrendingDown size={20} />}
                                    {transactionType === 'Transfer' && <Send size={20} />}
                                    {transactionType} {selectedToken}
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Transaction History */}
                <div className="bg-neutral-700 p-6 rounded-xl shadow-inner mt-4">
                    <h3 className="text-xl font-bold text-neutral-50 mb-4">Recent Transactions</h3>
                    <div className="space-y-4">
                        {transactionHistory.map(tx => (
                            <div key={tx.id} className="flex justify-between items-center bg-neutral-800 p-4 rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-full ${tx.type === 'Buy' ? 'bg-green-600' : tx.type === 'Sell' ? 'bg-red-600' : 'bg-blue-600'}`}>
                                        {tx.type === 'Buy' && <TrendingUp size={16} />}
                                        {tx.type === 'Sell' && <TrendingDown size={16} />}
                                        {tx.type === 'Transfer' && <Send size={16} />}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-neutral-50 font-semibold">{tx.type} {tx.amount.toFixed(2)} {tx.token}</span>
                                        <span className="text-neutral-400 text-sm">{tx.date}</span>
                                    </div>
                                </div>
                                <span className={`text-sm font-semibold ${tx.status === 'Success' ? 'text-green-400' : 'text-red-400'}`}>
                                    {tx.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- NEW Exchange Hub Component (as a standalone page) ---
const ExchangeHub = ({ showMessage, cryptoOptions }) => {
    const [userId, setUserId] = useState(null);
    const [listings, setListings] = useState([]);
    const [view, setView] = useState('explorer'); // 'explorer' or 'create'
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form State
    const [productName, setProductName] = useState('');
    const [productType, setProductType] = useState('Physical'); // Physical or Digital
    const [condition, setCondition] = useState('New'); // New or Used
    const [description, setDescription] = useState('');
    const [priceType, setPriceType] = useState('Fixed'); // Fixed, Bid, Barter
    const [paymentMethod, setPaymentMethod] = useState('UAI'); // UAI, Fiat, Crypto
    const [currency, setCurrency] = useState('UAI'); // e.g., UAI, USD, BTC
    const [price, setPrice] = useState('');
    const [barterItem, setBarterItem] = useState('');
    const [productImage, setProductImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    // Editing State
    const [isEditing, setIsEditing] = useState(false);
    const [currentListing, setCurrentListing] = useState(null);

    const fiatOptions = ['USD', 'EUR', 'GBP', 'JPY', 'CAD'];

    // Firebase Auth Listener
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                try {
                    if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                        await signInWithCustomToken(auth, __initial_auth_token);
                    } else {
                        await signInAnonymously(auth);
                    }
                } catch (error) {
                    console.error("Error signing in:", error);
                    showMessage("Authentication failed. Please refresh.");
                }
            }
        });
        return () => unsubscribe();
    }, []);

    // Firestore Real-time Listener
    useEffect(() => {
        if (!userId) return;
        setLoading(true);
        const listingsCollection = collection(db, 'artifacts', appId, 'public', 'data', 'exchangeListings');
        const q = query(listingsCollection);

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const listingsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setListings(listingsData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching listings:", error);
            showMessage("Could not fetch marketplace listings.");
            setLoading(false);
        });

        return () => unsubscribe();
    }, [userId]);
    
    // Reset currency when payment method changes
    useEffect(() => {
        if (paymentMethod === 'UAI') setCurrency('UAI');
        if (paymentMethod === 'Fiat') setCurrency(fiatOptions[0]);
        if (paymentMethod === 'Crypto') setCurrency(cryptoOptions[0]);
    }, [paymentMethod]);


    // Image compression function
    const compressImage = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = document.createElement('img');
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const MAX_WIDTH = 800;
                    const scaleSize = MAX_WIDTH / img.width;
                    canvas.width = MAX_WIDTH;
                    canvas.height = img.height * scaleSize;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    resolve(canvas.toDataURL('image/jpeg', 0.7)); // Compress to 70% quality JPEG
                };
            };
            reader.onerror = error => reject(error);
        });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                showMessage("File is too large. Please select an image under 5MB.");
                return;
            }
            try {
                const compressedImage = await compressImage(file);
                setProductImage(compressedImage);
                setImagePreview(compressedImage);
            } catch (error) {
                console.error("Error compressing image:", error);
                showMessage("Failed to process image.");
            }
        }
    };

    const resetForm = () => {
        setProductName('');
        setProductType('Physical');
        setCondition('New');
        setDescription('');
        setPriceType('Fixed');
        setPaymentMethod('UAI');
        setCurrency('UAI');
        setPrice('');
        setBarterItem('');
        setProductImage(null);
        setImagePreview('');
        setIsEditing(false);
        setCurrentListing(null);
        setView('explorer');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!productName || !description || !userId) {
            showMessage("Please fill in all required fields.");
            return;
        }
        setIsSubmitting(true);

        const listingData = {
            userId,
            name: productName,
            type: productType,
            condition: productType === 'Physical' ? condition : null,
            description,
            priceType,
            paymentMethod: priceType !== 'Barter' ? paymentMethod : null,
            currency: priceType !== 'Barter' ? currency : null,
            price: priceType !== 'Barter' ? Number(price) : null,
            barterItem: priceType === 'Barter' ? barterItem : null,
            imageUrl: productImage,
            createdAt: new Date().toISOString(),
        };

        try {
            const listingsCollection = collection(db, 'artifacts', appId, 'public', 'data', 'exchangeListings');
            if (isEditing) {
                const listingDoc = doc(db, 'artifacts', appId, 'public', 'data', 'exchangeListings', currentListing.id);
                await updateDoc(listingDoc, listingData);
                showMessage("Listing updated successfully!");
            } else {
                await addDoc(listingsCollection, listingData);
                showMessage("Listing created successfully!");
            }
            resetForm();
        } catch (error) {
            console.error("Error submitting listing:", error);
            showMessage("Failed to submit listing. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (listing) => {
        setIsEditing(true);
        setCurrentListing(listing);
        setProductName(listing.name);
        setProductType(listing.type);
        setCondition(listing.condition || 'New');
        setDescription(listing.description);
        setPriceType(listing.priceType);
        setPaymentMethod(listing.paymentMethod || 'UAI');
        setCurrency(listing.currency || 'UAI');
        setPrice(listing.price || '');
        setBarterItem(listing.barterItem || '');
        setProductImage(listing.imageUrl);
        setImagePreview(listing.imageUrl);
        setView('create');
    };

    const handleDelete = async (listingId) => {
        // A custom modal would be better than window.confirm, but for simplicity:
        if (confirm("Are you sure you want to delete this listing?")) {
            try {
                const listingDoc = doc(db, 'artifacts', appId, 'public', 'data', 'exchangeListings', listingId);
                await deleteDoc(listingDoc);
                showMessage("Listing deleted successfully.");
            } catch (error) {
                console.error("Error deleting listing:", error);
                showMessage("Failed to delete listing.");
            }
        }
    };
    
    const renderPrice = (listing) => {
        switch (listing.priceType) {
            case 'Fixed':
                return <p className="text-xl font-bold text-purple-400">{listing.price} {listing.currency}</p>;
            case 'Bid':
                return <p className="text-xl font-bold text-cyan-400">Starts at {listing.price} {listing.currency}</p>;
            case 'Barter':
                return <p className="text-md text-green-400">Wants: {listing.barterItem}</p>;
            default:
                return null;
        }
    };

    // Form JSX
    const CreateEditForm = (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-neutral-50">{isEditing ? 'Edit Listing' : 'Create a New Listing'}</h3>
                <button onClick={resetForm} className="text-neutral-400 hover:text-white"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
                 {/* Product Image Upload */}
                <div className="text-center">
                    <label htmlFor="productImage" className="block text-sm font-medium text-neutral-300 mb-2">Product Image</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-600 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Product Preview" className="mx-auto h-48 w-auto rounded-md" />
                            ) : (
                                <Image className="mx-auto h-12 w-12 text-neutral-500" />
                            )}
                            <div className="flex text-sm text-neutral-400 justify-center">
                                <label htmlFor="productImage" className="relative cursor-pointer bg-neutral-700 rounded-md font-medium text-purple-400 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500 p-1">
                                    <span>Upload a file</span>
                                    <input id="productImage" name="productImage" type="file" className="sr-only" accept="image/*" onChange={handleImageChange} />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-neutral-500">PNG, JPG, GIF up to 5MB</p>
                        </div>
                    </div>
                </div>

                {/* Product Name */}
                <input type="text" placeholder="Product Name" value={productName} onChange={(e) => setProductName(e.target.value)} required className="w-full p-3 bg-neutral-800 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                
                {/* Product Type & Condition */}
                <div className="flex gap-4">
                    <select value={productType} onChange={(e) => setProductType(e.target.value)} className="w-full p-3 bg-neutral-800 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none">
                        <option value="Physical">Physical Product</option>
                        <option value="Digital">Digital Product</option>
                    </select>
                    {productType === 'Physical' && (
                        <select value={condition} onChange={(e) => setCondition(e.target.value)} className="w-full p-3 bg-neutral-800 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none">
                            <option value="New">New</option>
                            <option value="Used">Used</option>
                        </select>
                    )}
                </div>

                {/* Description */}
                <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required rows="4" className="w-full p-3 bg-neutral-800 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                
                {/* Price Type and Dynamic Fields */}
                <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">Transaction Type</label>
                    <select value={priceType} onChange={(e) => setPriceType(e.target.value)} className="w-full p-3 bg-neutral-800 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none">
                        <option value="Fixed">Fixed Price</option>
                        <option value="Bid">Auction (Starting Bid)</option>
                        <option value="Barter">Barter / Trade</option>
                    </select>
                </div>
                
                <AnimatePresence>
                {priceType !== 'Barter' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">Payment Method</label>
                            <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="w-full p-3 bg-neutral-800 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none">
                                <option value="UAI">UAI Token</option>
                                <option value="Fiat">Fiat Currency</option>
                                <option value="Crypto">Other Crypto</option>
                            </select>
                        </div>
                        <div className="flex gap-4">
                            {paymentMethod !== 'UAI' && (
                                <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="w-1/2 p-3 bg-neutral-800 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none">
                                    {paymentMethod === 'Fiat' && fiatOptions.map(c => <option key={c} value={c}>{c}</option>)}
                                    {paymentMethod === 'Crypto' && cryptoOptions.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            )}
                            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full p-3 bg-neutral-800 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                        </div>
                    </motion.div>
                )}
                {priceType === 'Barter' && (
                    <motion.input initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} type="text" placeholder="What do you want to trade for?" value={barterItem} onChange={(e) => setBarterItem(e.target.value)} required className="w-full p-3 bg-neutral-800 rounded-lg text-white focus:ring-2 focus:ring-purple-500 focus:outline-none" />
                )}
                </AnimatePresence>

                <button type="submit" disabled={isSubmitting} className="w-full px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform active:scale-95 disabled:from-neutral-500 disabled:to-neutral-500 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {isSubmitting ? <Loader2 className="animate-spin" /> : (isEditing ? 'Update Listing' : 'Create Listing')}
                </button>
            </form>
        </motion.div>
    );

    // Explorer JSX
    const ExplorerView = (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h3 className="text-2xl font-bold text-neutral-50">Marketplace Explorer</h3>
                <button onClick={() => setView('create')} className="w-full sm:w-auto px-6 py-2 bg-purple-600 text-white font-bold rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-300 transform active:scale-95 flex items-center gap-2 justify-center">
                    <PlusCircle size={20} /> List an Item
                </button>
            </div>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-12 w-12 text-purple-500 animate-spin" />
                </div>
            ) : listings.length === 0 ? (
                <div className="text-center text-neutral-500 py-16">
                    <ShoppingCart size={48} className="mx-auto mb-4" />
                    <p>The marketplace is empty. Be the first to list an item!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {listings.map(listing => (
                        <div key={listing.id} className="bg-neutral-700 rounded-xl shadow-lg overflow-hidden flex flex-col group">
                            <div className="relative">
                                <img src={listing.imageUrl || 'https://placehold.co/600x400/171717/404040?text=No+Image'} alt={listing.name} className="w-full h-48 object-cover" />
                                {userId === listing.userId && (
                                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={() => handleEdit(listing)} className="p-2 bg-blue-600/80 rounded-full text-white hover:bg-blue-500"><Edit size={16} /></button>
                                        <button onClick={() => handleDelete(listing.id)} className="p-2 bg-red-600/80 rounded-full text-white hover:bg-red-500"><Trash2 size={16} /></button>
                                    </div>
                                )}
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="text-lg font-bold text-neutral-50">{listing.name}</h4>
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${listing.type === 'Physical' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-green-500/20 text-green-400'}`}>{listing.type}</span>
                                </div>
                                <p className="text-neutral-400 text-sm mb-4 flex-grow">{listing.description}</p>
                                {listing.type === 'Physical' && <p className="text-xs text-neutral-500 mb-2">Condition: {listing.condition}</p>}
                                <div className="mt-auto pt-4 border-t border-neutral-600">
                                    {renderPrice(listing)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </motion.div>
    );

    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-neutral-50 mb-4 flex items-center gap-3">
                <ShoppingCart className="text-purple-400" />
                Exchange Hub
            </h2>
            <div className="bg-neutral-800 p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col gap-6">
                <div className="bg-neutral-900/50 p-3 rounded-lg text-center">
                    <p className="text-sm text-neutral-400">Your User ID (for collaboration): <strong className="text-neutral-200 font-mono">{userId || 'Loading...'}</strong></p>
                </div>
                <AnimatePresence mode="wait">
                    {view === 'explorer' ? ExplorerView : CreateEditForm}
                </AnimatePresence>
            </div>
        </div>
    );
};


export default App;
