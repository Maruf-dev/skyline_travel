import type { Destination, BlogPost, Deal, Testimonial, TeamMember } from "../types";

export const DESTINATIONS: Destination[] = [
  {
    id: 1, city: "Dubai", country: "UAE",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&auto=format&fit=crop",
    imgLarge: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&auto=format&fit=crop",
    price: "$320", tag: "Hot",
    description: "A futuristic metropolis rising from the Arabian desert, where record-breaking skyscrapers meet ancient gold souks and wind-swept dunes.",
    highlights: ["Burj Khalifa", "Desert safari", "Dubai Mall", "Marina cruise"],
  },
  {
    id: 2, city: "Istanbul", country: "Turkey",
    img: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&auto=format&fit=crop",
    imgLarge: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1600&auto=format&fit=crop",
    price: "$210", tag: "Popular",
    description: "Where two continents meet, ancient empires layered upon each other in a city of minarets, bazaars, and Bosphorus sunsets.",
    highlights: ["Hagia Sophia", "Grand Bazaar", "Bosphorus cruise", "Topkapi Palace"],
  },
  {
    id: 3, city: "Paris", country: "France",
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop",
    imgLarge: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1600&auto=format&fit=crop",
    price: "$480", tag: "",
    description: "The city of light and romance — an open-air museum of art, fashion, and cuisine where every street feels like a film set.",
    highlights: ["Eiffel Tower", "Louvre", "Montmartre", "Seine cruise"],
  },
  {
    id: 4, city: "Bali", country: "Indonesia",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop",
    imgLarge: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&auto=format&fit=crop",
    price: "$390", tag: "Trending",
    description: "Volcanic peaks, terraced rice fields, and serene temples on Indonesia's most beloved island, where Hindu spirituality meets surf culture.",
    highlights: ["Ubud rice terraces", "Tanah Lot", "Mount Batur", "Seminyak beach"],
  },
  {
    id: 5, city: "Tokyo", country: "Japan",
    img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&auto=format&fit=crop",
    imgLarge: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600&auto=format&fit=crop",
    price: "$650", tag: "",
    description: "Neon-lit streets, ancient shrines, and the world's most refined food culture in one electric city that feels both centuries old and decades ahead.",
    highlights: ["Shibuya crossing", "Senso-ji", "Tsukiji market", "Shinjuku nightlife"],
  },
  {
    id: 6, city: "Maldives", country: "Maldives",
    img: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&auto=format&fit=crop",
    imgLarge: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1600&auto=format&fit=crop",
    price: "$890", tag: "Luxury",
    description: "Postcard-perfect overwater villas, glass-clear lagoons, and some of the world's best diving across 1,200 coral islands.",
    highlights: ["Overwater villas", "Manta ray diving", "Sandbank picnics", "Spa retreats"],
  },
  {
    id: 7, city: "Barcelona", country: "Spain",
    img: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=600&auto=format&fit=crop",
    imgLarge: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=1600&auto=format&fit=crop",
    price: "$430", tag: "",
    description: "Gaudí's surreal masterpieces, Mediterranean beaches, and a tapas culture that turns every meal into a celebration.",
    highlights: ["Sagrada Família", "Park Güell", "Gothic Quarter", "La Rambla"],
  },
  {
    id: 8, city: "Santorini", country: "Greece",
    img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&auto=format&fit=crop",
    imgLarge: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=1600&auto=format&fit=crop",
    price: "$520", tag: "New",
    description: "Whitewashed cliffs and blue-domed churches above the deepest blue water you've ever seen — the most photographed sunset on earth.",
    highlights: ["Oia sunset", "Caldera views", "Wine tasting", "Red Beach"],
  },
  {
    id: 9, city: "Samarkand", country: "Uzbekistan",
    img: "https://images.unsplash.com/photo-1604916851289-390e0da91e39?w=600&auto=format&fit=crop",
    imgLarge: "https://images.unsplash.com/photo-1604916851289-390e0da91e39?w=1600&auto=format&fit=crop",
    price: "$80", tag: "Popular",
    description: "An ancient Silk Road jewel of turquoise tilework, towering madrasas, and Tamerlane's tomb — a living museum of Islamic architecture.",
    highlights: ["Registan Square", "Gur-e Amir", "Bibi-Khanym Mosque", "Shah-i-Zinda"],
  },
  {
    id: 10, city: "Moscow", country: "Russia",
    img: "https://images.unsplash.com/photo-1520106212299-d99c443e4568?w=600&auto=format&fit=crop",
    imgLarge: "https://images.unsplash.com/photo-1520106212299-d99c443e4568?w=1600&auto=format&fit=crop",
    price: "$140", tag: "",
    description: "Red Square, the Kremlin, and centuries of imperial history wrapped in golden domes, ballet, and underground palace metro stations.",
    highlights: ["Red Square", "Kremlin", "Bolshoi Theatre", "Metro tour"],
  },
  {
    id: 11, city: "Singapore", country: "Singapore",
    img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&auto=format&fit=crop",
    imgLarge: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=1600&auto=format&fit=crop",
    price: "$580", tag: "Trending",
    description: "A garden city where cutting-edge skyscrapers tower over hawker stalls, rainforest canopies, and one of the world's busiest harbours.",
    highlights: ["Gardens by the Bay", "Marina Bay Sands", "Hawker centres", "Sentosa Island"],
  },
  {
    id: 12, city: "Kyoto", country: "Japan",
    img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&auto=format&fit=crop",
    imgLarge: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1600&auto=format&fit=crop",
    price: "$600", tag: "New",
    description: "1,600 temples, geisha districts, and bamboo groves — Japan's most poetic city, where every season is a different painting.",
    highlights: ["Fushimi Inari", "Arashiyama bamboo", "Kinkaku-ji", "Gion district"],
  },
];

export const DEALS: Deal[] = [
  { from: "Tashkent", to: "Dubai",    date: "Jun 15–22", price: "$285", save: "30%", airline: "Air Arabia",         img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&auto=format&fit=crop" },
  { from: "Tashkent", to: "Istanbul", date: "Jul 1–10",  price: "$195", save: "25%", airline: "Turkish Airlines",   img: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=500&auto=format&fit=crop" },
  { from: "Tashkent", to: "Moscow",   date: "May 20–27", price: "$140", save: "20%", airline: "Uzbekistan Airways", img: "https://images.unsplash.com/photo-1520106212299-d99c443e4568?w=500&auto=format&fit=crop" },
];

export const BLOGS: BlogPost[] = [
  {
    id: "1", cat: "Guide", title: "Top 10 Things to Do in Dubai in 2025",
    date: "Apr 2, 2025", read: "6 min",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&auto=format&fit=crop",
    imgLarge: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&auto=format&fit=crop",
    excerpt: "From the Burj Khalifa to the ancient Gold Souk, Dubai offers experiences unlike anywhere else on earth.",
    body: [
      "Dubai is a city of extremes. Where else can you ski indoors in the morning, wander a 200-year-old gold souk in the afternoon, and dine 124 floors above the desert at sunset? In 2025, the city has only doubled down on what makes it remarkable.",
      "Start at the top: the Burj Khalifa observation deck remains an essential first stop. Book At The Top SKY at Level 148 for the smallest crowds and the best photos. From there, drop down to Dubai Mall for the aquarium and the dancing fountain show — yes, it's touristy, and yes, you should still see it.",
      "But the real Dubai isn't in the malls. Take an abra across Dubai Creek for ten cents, lose yourself in the spice and gold souks, then book a desert safari for the dunes, falconry, and a night under stars that feel impossibly close.",
    ],
  },
  {
    id: "2", cat: "Tips", title: "How to Travel Cheap from Uzbekistan to Europe",
    date: "Mar 18, 2025", read: "8 min",
    img: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&auto=format&fit=crop",
    imgLarge: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=1600&auto=format&fit=crop",
    excerpt: "Budget travel from Central Asia is possible if you know when to book and which airlines to choose.",
    body: [
      "Flights from Tashkent to European capitals can range from $200 to $1,200 for the same route in the same week. The difference isn't luck — it's strategy. Here's how locals actually fly Europe on a budget.",
      "First rule: book Tuesday or Wednesday departures, eight to ten weeks out. Turkish Airlines and Pegasus consistently undercut direct competitors via Istanbul connections, often by 40%. Second rule: be flexible on the destination city. Flying into Milan or Vienna instead of Rome or Paris can halve the fare for a one-hour onward train.",
      "Finally, don't ignore the loyalty programs. Even if you fly twice a year, status-matching from a hotel program into Star Alliance Silver gets you free checked bags and seat selection — that's $80 saved per round trip, every trip.",
    ],
  },
  {
    id: "3", cat: "Story", title: "A Week in Bali: Temples, Rice Fields & Sunsets",
    date: "Mar 5, 2025", read: "5 min",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop",
    imgLarge: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1600&auto=format&fit=crop",
    excerpt: "Seven magical days exploring Ubud, Seminyak, and the volcanic highlands of this island paradise.",
    body: [
      "I landed in Denpasar at 4 AM, exhausted and skeptical. By 4 PM I was eating mie goreng on a wooden stool in Ubud while a temple procession wound past, gamelan players in golden robes, women balancing impossible offerings on their heads. I never recovered.",
      "Bali doesn't feel like other islands. It's not just the rice terraces of Tegalalang or the cliff temples of Uluwatu — it's that every corner of daily life is woven through with ritual. There are flower offerings on dashboards, on doorsteps, on the sidewalk. The whole island runs on a rhythm older than any of us.",
      "If you go: skip Kuta. Spend three days in Ubud for the culture, two in Sidemen for the silence, and finish in Seminyak only if you really want the beach clubs. A week is enough to fall in love. It's not enough to leave.",
    ],
  },
  {
    id: "4", cat: "Guide", title: "Istanbul in 3 Days: The Ultimate Itinerary",
    date: "Feb 22, 2025", read: "7 min",
    img: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&auto=format&fit=crop",
    imgLarge: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1600&auto=format&fit=crop",
    excerpt: "Two continents, one city — everything you need to see, eat, and experience in magical Istanbul.",
    body: [
      "Three days in Istanbul is enough to scratch the surface. Done right, it's enough to leave addicted. Here's how to spend each day so you actually see the city, not just the postcards.",
      "Day one: Sultanahmet. Hagia Sophia at opening, then the Blue Mosque, Topkapi Palace, and the Basilica Cistern. End at the Grand Bazaar — not to buy, but to wander. Day two: cross to Beyoğlu. Walk Istiklal, ride the historic tram, watch the Bosphorus from a Karaköy fish restaurant. Day three: take a ferry to the Asian side. Kadıköy is where Istanbulites actually eat.",
      "One non-negotiable: do not skip the Bosphorus cruise. The 90-minute version at sunset is the single best $15 you'll spend in this city.",
    ],
  },
  {
    id: "5", cat: "Tips", title: "Best Time to Visit the Maldives",
    date: "Feb 10, 2025", read: "4 min",
    img: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=600&auto=format&fit=crop",
    imgLarge: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1600&auto=format&fit=crop",
    excerpt: "The Maldives is stunning year-round, but timing your visit makes all the difference for weather and crowds.",
    body: [
      "The Maldives has two seasons: dry (Nov–Apr) and wet (May–Oct). Most travel guides will tell you to visit in the dry season. Most travel guides are oversimplifying.",
      "Yes, December through March is peak weather. It's also peak prices and peak crowds — the same overwater villa can cost three times what it does in May. The shoulder months (April, October, early November) offer 80% of the sunshine at half the price, and the diving is often better thanks to richer plankton bringing in manta rays and whale sharks.",
      "If you must pick one window: late April. The monsoon hasn't fully arrived, the high-season crowds have left, and the resorts compete hard for bookings. You'll get the trip you imagined — and pay considerably less for it.",
    ],
  },
  {
    id: "6", cat: "Story", title: "Solo Travel in Japan: A Personal Journey",
    date: "Jan 28, 2025", read: "10 min",
    img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&auto=format&fit=crop",
    imgLarge: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1600&auto=format&fit=crop",
    excerpt: "Japan changed my perspective on travel. 14 days alone across Tokyo, Kyoto, and beyond.",
    body: [
      "I almost didn't go. Solo travel in a country where I didn't speak the language felt reckless, especially after years of group trips. Two weeks later, I was back home rebooking my next visit.",
      "Japan rewards the solo traveler in ways no other country quite does. Public transport is so good you don't need a guide. Restaurants have counter seating designed for one. The famously polite culture means you're never bothered, never hustled, never made to feel out of place.",
      "I started in Tokyo's organized chaos, took the shinkansen to Kyoto for the temples, detoured to Hakone for the onsen, and ended in Osaka for the food. Fourteen days. Hundreds of kilometers. Not a single moment I felt unsafe. I'd recommend it to anyone — especially the version of you that's hesitating.",
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  { name: "Aziz Karimov",   loc: "Tashkent", trip: "Dubai",    stars: 5, text: "Skyline found me a flight $120 cheaper than anything else. Booking took 3 minutes. Absolutely brilliant!", avatar: "https://i.pravatar.cc/80?img=51" },
  { name: "Maria Petrova",  loc: "Moscow",   trip: "Bali",     stars: 5, text: "Incredible service. The team helped me plan my entire Bali trip — hotels, tours, everything. My new go-to.", avatar: "https://i.pravatar.cc/80?img=44" },
  { name: "James Williams", loc: "London",   trip: "Istanbul", stars: 5, text: "Fast, reliable, and always the best prices. Skyline Travel is how I book every single trip now.", avatar: "https://i.pravatar.cc/80?img=33" },
];

export const POPULAR_TAGS: string[] = ["Dubai", "Istanbul", "Bali", "Maldives", "Kyoto"];

export const BLOG_CATEGORIES: string[] = ["All", "Guide", "Tips", "Story"];

export const TEAM_MEMBERS: TeamMember[] = [
  { name: "Dilnoza Yusupova", role: "CEO & Founder",       img: "https://i.pravatar.cc/150?img=47" },
  { name: "Bekzod Mirzayev", role: "Head of Operations",   img: "https://i.pravatar.cc/150?img=52" },
  { name: "Anastasia Kova",  role: "Lead Travel Designer", img: "https://i.pravatar.cc/150?img=44" },
  { name: "Sherzod Alimov",  role: "Tech & Product",       img: "https://i.pravatar.cc/150?img=53" },
];
