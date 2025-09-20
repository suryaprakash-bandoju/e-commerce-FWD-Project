const products = [
    {
        id: 1,
        name: "OnePlus Smart LED TV",
        price: 42999,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=800&h=600&auto=format&fit=crop",
        description: "55-inch 4K Ultra HD Smart LED TV with HDR and built-in OxygenPlay for seamless streaming.",
        features: [
            "4K Ultra HD Resolution",
            "Dolby Vision & Atmos",
            "Android TV with OxygenPlay",
            "Multiple HDMI Ports"
        ],
        tags: ["new", "bestseller"],
        rating: 4.7
    },
    {
        id: 2,
        name: "Banarasi Silk Saree",
        price: 8999,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1610030181087-540018728eff?q=80&w=800&h=600&auto=format&fit=crop",
        description: "Authentic handwoven Banarasi silk saree with intricate zari work and rich traditional design.",
        features: [
            "Pure Silk Material",
            "Handwoven by Artisans",
            "Gold Zari Work",
            "Blouse Piece Included"
        ],
        tags: ["handmade", "bestseller"],
        rating: 4.9
    },
    {
        id: 3,
        name: "Sheesham Wood Coffee Table",
        price: 15999,
        category: "home",
        image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?q=80&w=800&h=600&auto=format&fit=crop",
        description: "Handcrafted Sheesham wood coffee table with traditional Indian carvings and modern design.",
        features: [
            "Solid Sheesham Wood",
            "Traditional Hand Carving",
            "Spacious Storage Drawer",
            "Antique Brass Finish Hardware"
        ],
        tags: ["handmade", "eco"],
        rating: 4.5
    },
    {
        id: 4,
        name: "boAt Rockerz Wireless Headphones",
        price: 2499,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=800&h=600&auto=format&fit=crop",
        description: "Premium wireless headphones with noise cancellation and 20-hour battery life.",
        features: [
            "Active Noise Cancellation",
            "20-Hour Playback",
            "Bluetooth 5.0",
            "Fast Charging"
        ]
    },
    {
        id: 5,
        name: "The White Tiger Novel",
        price: 399,
        category: "books",
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&h=600&auto=format&fit=crop",
        description: "Award-winning novel by Aravind Adiga that explores India's class struggle through a compelling narrative.",
        features: [
            "Man Booker Prize Winner",
            "Hardcover Edition",
            "Bestseller in India",
            "Now a Major Netflix Film"
        ]
    },
    {
        id: 6,
        name: "Titan Raga Watch",
        price: 7899,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&h=600&auto=format&fit=crop",
        description: "Elegant designer watch for women with gold-plated finish and premium build quality.",
        features: [
            "Quartz Movement",
            "Sapphire Crystal Glass",
            "Water Resistant",
            "Gold-Plated Chain Strap"
        ]
    },
    {
        id: 7,
        name: "Amazon Echo with Alexa (Hindi & English)",
        price: 4499,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=800&h=600&auto=format&fit=crop",
        description: "Smart speaker with Alexa voice control in both Hindi and English with premium sound quality.",
        features: [
            "Bilingual Voice Control",
            "360° Dolby Audio",
            "Smart Home Controls",
            "Indian Music Streaming Support"
        ]
    },
    {
        id: 8,
        name: "Brass Decorative Lamp",
        price: 1299,
        category: "home",
        image: "https://images.unsplash.com/photo-1621819809518-64cbfd587722?q=80&w=800&h=600&auto=format&fit=crop",
        description: "Traditional Indian brass decorative lamp with intricate design, perfect for festive decor.",
        features: [
            "Handcrafted Brass",
            "Traditional Design",
            "LED Compatible",
            "Perfect for Diwali Decor"
        ]
    },
    {
        id: 9,
        name: "Fabindia Cotton Kurta",
        price: 1499,
        category: "fashion",
        image: "https://images.unsplash.com/photo-1623113562048-6bef64de3ef7?q=80&w=800&h=600&auto=format&fit=crop",
        description: "Elegant cotton kurta with traditional block prints and comfortable fit for everyday wear.",
        features: [
            "100% Cotton Material",
            "Hand Block Printed",
            "Sustainable Production",
            "Breathable Fabric"
        ]
    },
    {
        id: 10,
        name: "Himalaya Herbal Face Wash",
        price: 249,
        category: "home",
        image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?q=80&w=800&h=600&auto=format&fit=crop",
        description: "Natural neem face wash made with Ayurvedic herbs for daily skin cleansing and care.",
        features: [
            "Natural Ingredients",
            "Ayurvedic Formula",
            "No Harmful Chemicals",
            "Suitable for All Skin Types"
        ]
    },
    {
        id: 11,
        name: "Samsung Galaxy S22 Ultra",
        price: 92999,
        category: "electronics",
        image: "https://images.unsplash.com/photo-1646157465407-0c4c11d36764?q=80&w=800&h=600&auto=format&fit=crop",
        description: "Premium flagship smartphone with 108MP camera and powerful Exynos processor.",
        features: [
            "108MP Camera System",
            "Dynamic AMOLED Display",
            "S-Pen Support",
            "5000mAh Battery"
        ]
    },
    {
        id: 12,
        name: "Masala Box Set",
        price: 899,
        category: "home",
        image: "https://images.unsplash.com/photo-1596397249129-c7a8f8718753?q=80&w=800&h=600&auto=format&fit=crop",
        description: "Traditional stainless steel spice box with 7 compartments for storing Indian spices.",
        features: [
            "Food-Grade Stainless Steel",
            "7 Separate Compartments",
            "Airtight Lids",
            "Traditional Design"
        ]
    },
    {
        id: 13,
        name: "Amul Dark Chocolate",
        price: 149,
        category: "home",
        image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?q=80&w=800&h=600&auto=format&fit=crop",
        description: "Premium dark chocolate made with the finest cocoa beans and pure ingredients.",
        features: [
            "55% Cocoa Content",
            "No Artificial Flavors",
            "Made in Gujarat",
            "Rich Taste"
        ]
    },
    {
        id: 14,
        name: "Madhubani Painting",
        price: 3999,
        category: "home",
        image: "https://images.unsplash.com/photo-1582201942930-53fea460eeeb?q=80&w=800&h=600&auto=format&fit=crop",
        description: "Authentic Madhubani folk art painting from Bihar, handcrafted by skilled artisans.",
        features: [
            "Traditional Folk Art",
            "Natural Colors",
            "Handpainted",
            "Certificate of Authenticity"
        ]
    },
    {
        id: 15,
        name: "Yoga Mat",
        price: 899,
        category: "home",
        image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?q=80&w=800&h=600&auto=format&fit=crop",
        description: "Eco-friendly yoga mat made from natural rubber with excellent grip and comfort.",
        features: [
            "Eco-friendly Material",
            "Anti-slip Surface",
            "6mm Thickness",
            "Easy to Clean"
        ]
    },
    {
        id: 16,
        name: "Bhagavad Gita",
        price: 499,
        category: "books",
        image: "https://images.unsplash.com/photo-1631016800696-5ea8801b3c2a?q=80&w=800&h=600&auto=format&fit=crop",
        description: "Beautifully bound edition of the Bhagavad Gita with original Sanskrit text and English translation.",
        features: [
            "Hardcover Edition",
            "Sanskrit with Translation",
            "Detailed Commentary",
            "Gold-embossed Cover"
        ]
    }
];
