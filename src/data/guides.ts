export interface GuideSection {
  title: string
  body: string
  bullets?: string[]
}

export interface GuideFaqItem {
  question: string
  answer: string
}

export interface GuideContentItem {
  slug: string
  title: string
  seoTitle: string
  seoDescription: string
  heroTitle: string
  heroSubtitle: string
  intro: string
  sections: GuideSection[]
  faq: GuideFaqItem[]
  relatedExperiences: string[]
  relatedPackages: string[]
  relatedGuides: string[]
  keywords?: string[]
  marketIntent?: "brazil" | "latin-america" | "usa" | "europe" | "global"
}

export const guides: GuideContentItem[] = [
  {
    slug: "things-to-do-in-marajo",
    title: "Things to do in Marajo",
    seoTitle: "Things to Do in Maraj? Island: Experiences, Culture and Nature Guide",
    seoDescription: "Discover the best things to do in Maraj? Island, from beaches and buffalo culture to wildlife, curated experiences, and practical trip planning.",
    heroTitle: "Things to do in Maraj? Island",
    heroSubtitle: "A premium discovery guide to Marajo's most iconic landscapes, cultural experiences, and booking-ready travel ideas.",
    intro: "Marajo combines beaches, buffalo culture, mangroves, food traditions, and a slower travel rhythm. The best trips balance scenery, culture, and realistic logistics.",
    sections: [
      { title: "Top experiences", body: "First-time visitors usually start with Praia do Pesqueiro, buffalo and cheese experiences, mangrove routes, and horseback outings.", bullets: ["Beach sunsets in Soure", "Buffalo and cheese circuits", "Mangrove and bird routes", "Horseback experiences"] },
      { title: "Logistics that matter", body: "Most visitors arrive via Belem and choose Soure or Salvaterra as a base. A good plan reduces transfer friction and sequences experiences in advance." },
      { title: "Best season guidance", body: "Seasonality changes comfort, landscape mood, and trip pacing. Shoulder-season planning often creates the best balance." },
      { title: "Why culture matters", body: "Marajo is stronger as a cultural destination than many travelers expect, with ranch life, ceramics, food, and local rhythm shaping the trip." },
    ],
    faq: [
      { question: "What is Marajo best known for?", answer: "Marajo is best known for buffalo culture, beaches, mangroves, regional food, and a distinctive island identity connected to the Amazon estuary." },
      { question: "How many days should I spend in Marajo?", answer: "Four to six days usually creates the best first-trip balance between logistics, core experiences, and slower destination discovery." },
    ],
    relatedExperiences: ["pesqueiro", "bufalos-queijaria", "manguezais-salvaterra"],
    relatedPackages: ["marajo-essencial", "marajo-slow"],
    relatedGuides: ["marajo-island-travel-guide", "how-to-visit-marajo-island", "best-time-to-visit-marajo"],
    keywords: ["things to do in marajo", "marajo island attractions", "marajo experiences"],
    marketIntent: "global",
  },
  {
    slug: "how-to-visit-marajo-island",
    title: "How to visit Maraj? Island",
    seoTitle: "How to Visit Maraj? Island: Routes, Logistics and Trip Planning",
    seoDescription: "Learn how to visit Maraj? Island with practical logistics, destination bases, seasonal guidance, and curated planning tips for international and Brazilian travelers.",
    heroTitle: "How to visit Maraj? Island",
    heroSubtitle: "A practical guide to reaching Marajo, choosing the right base, and turning logistics into a smoother premium journey.",
    intro: "Marajo is easier when planned as a destination trip rather than a last-minute transfer. Define the gateway, choose a base, and pre-select the right experiences.",
    sections: [
      { title: "Gateway strategy", body: "Belem is the main access point for most travelers. From there, visitors organize the river crossing and continue to the island's tourism bases." },
      { title: "Choosing a base", body: "Soure suits classic first-time itineraries and beach visuals, while Salvaterra works well for calmer nature-led stays.", bullets: ["Soure for iconic first trips", "Salvaterra for softer nature routes", "Split stays only with careful planning"] },
      { title: "Season and comfort", body: "Weather and river dynamics influence transfers, outdoor planning, and the feel of the trip, so timing should be part of the itinerary design." },
      { title: "Planning with culture", body: "Trips feel richer when visitors go beyond transport and include buffalo culture, food, and local storytelling." },
    ],
    faq: [
      { question: "What is the easiest way to visit Maraj? Island?", answer: "The easiest route is to use Belem as the main gateway, choose Soure or Salvaterra as your base, and book core experiences before arrival." },
      { question: "Should I book experiences in advance?", answer: "Yes. Pre-booking helps align timing, local support, and smoother on-island logistics." },
    ],
    relatedExperiences: ["pesqueiro", "manguezais-salvaterra"],
    relatedPackages: ["marajo-essencial"],
    relatedGuides: ["things-to-do-in-marajo", "marajo-island-travel-guide", "amazon-island-destinations"],
    keywords: ["how to visit marajo island", "marajo logistics", "belem to marajo"],
    marketIntent: "global",
  },
  {
    slug: "best-time-to-visit-marajo",
    title: "Best time to visit Marajo",
    seoTitle: "Best Time to Visit Maraj? Island: Seasons, Weather and Travel Planning",
    seoDescription: "Understand the best time to visit Maraj? Island for beaches, wildlife, logistics, buffalo culture, and premium destination planning.",
    heroTitle: "Best time to visit Maraj? Island",
    heroSubtitle: "Seasonality shapes landscapes, logistics, atmosphere, and the overall rhythm of a Marajo trip.",
    intro: "There is no single perfect season for every traveler. Some prioritize simpler logistics, while others want greener scenery, stronger wildlife energy, or dramatic skies.",
    sections: [
      { title: "Seasonality and style", body: "Drier periods often support easier movement and open-air comfort, while wetter moments intensify scenery and river atmosphere." },
      { title: "What changes for logistics", body: "Transport timing, road comfort, and activity sequencing can all shift with the season." },
      { title: "Experience timing", body: "Beach routes, horseback outings, cultural visits, and mangrove exploration all feel different depending on weather rhythm.", bullets: ["Beach days reward weather-aware timing", "Nature routes depend on seasonal conditions", "Longer itineraries gain resilience with realistic scheduling"] },
      { title: "Culture stays relevant", body: "Buffalo heritage, local gastronomy, and ceramics matter year-round, so Marajo is not only a weather-led destination." },
    ],
    faq: [
      { question: "Is there a dry season better for first-time travelers?", answer: "For many first-time visitors, drier periods feel easier because transport and outdoor planning are usually more predictable." },
      { question: "Can I still enjoy Marajo in wetter periods?", answer: "Yes. Wetter periods often create richer scenery and a stronger river atmosphere, especially for landscape-focused travelers." },
    ],
    relatedExperiences: ["pesqueiro", "manguezais-salvaterra", "cavalgada-praia"],
    relatedPackages: ["marajo-slow"],
    relatedGuides: ["how-to-visit-marajo-island", "marajo-wildlife-and-nature", "things-to-do-in-marajo"],
    keywords: ["best time to visit marajo", "marajo weather", "when to go to marajo"],
    marketIntent: "global",
  },
  {
    slug: "marajo-buffalo-culture",
    title: "Marajo buffalo culture",
    seoTitle: "Marajo Buffalo Culture: Traditions, Farms, Food and Travel Experiences",
    seoDescription: "Explore Marajo's buffalo culture through farms, food traditions, local identity, and curated travel experiences that connect visitors with the island's heritage.",
    heroTitle: "Understanding Marajo through buffalo culture",
    heroSubtitle: "Buffalo life is part of Marajo's visual identity, food culture, ranch traditions, and travel memory.",
    intro: "For many visitors, buffalo culture is the strongest gateway into Marajo's identity, shaping imagery, gastronomy, and the stories travelers carry home.",
    sections: [
      { title: "Why it matters", body: "Buffaloes help define Marajo's imagery and local narrative, linking the destination to ranch life, dairy production, and regional symbolism." },
      { title: "How travelers experience it", body: "The best buffalo-related experiences combine farm context, cheese production, and guided explanation instead of isolated photo stops." },
      { title: "Season and logistics", body: "Buffalo-linked activities work best when integrated into a broader itinerary that respects travel timing and local conditions." },
      { title: "Food and identity", body: "Buffalo culture also lives in cheese traditions, hospitality, and culinary storytelling, making it a strong conversion theme." },
    ],
    faq: [
      { question: "Why are buffaloes so important in Marajo?", answer: "They are central to Marajo's identity because they shape local imagery, ranch life, food traditions, and several of the island's best-known travel experiences." },
      { question: "Can travelers visit places connected to buffalo culture?", answer: "Yes. Curated farm and cheese experiences are one of the best ways to understand Marajo beyond its beaches." },
    ],
    relatedExperiences: ["bufalos-queijaria", "cavalgada-praia"],
    relatedPackages: ["marajo-essencial", "marajo-slow"],
    relatedGuides: ["things-to-do-in-marajo", "marajo-horseback-experience", "marajo-island-travel-guide"],
    keywords: ["marajo buffalo culture", "marajo buffalo experience", "marajo cheese"],
    marketIntent: "global",
  },
  {
    slug: "marajo-island-travel-guide",
    title: "Maraj? Island travel guide",
    seoTitle: "Maraj? Island Travel Guide: Where to Go, What to Do and How to Plan",
    seoDescription: "A complete Maraj? Island travel guide covering destinations, experiences, seasonality, culture, logistics, and booking-ready travel planning.",
    heroTitle: "Maraj? Island travel guide",
    heroSubtitle: "A strategic planning guide connecting destinations, experiences, timing, and next-step booking options.",
    intro: "Marajo rewards travelers who think in terms of destination design rather than isolated attractions. Landscapes, culture, and logistics work best when planned together.",
    sections: [
      { title: "Where to base your trip", body: "Soure is the most natural base for many first-time travelers, while Salvaterra suits slower and more nature-led stays." },
      { title: "What to prioritize", body: "A first itinerary usually works well with one iconic beach route, one cultural or buffalo experience, and one nature outing." },
      { title: "Timing and pacing", body: "Seasonal timing influences transfer comfort, outdoor planning, and the emotional tone of the trip." },
      { title: "Cultural depth", body: "Marajo stands out through the overlap of nature and culture: ceramics, buffalo life, food, rivers, beaches, and a slower tempo." },
    ],
    faq: [
      { question: "Is Marajo worth visiting for international travelers?", answer: "Yes. Marajo offers a rare mix of Amazonian nature, island landscapes, buffalo culture, and curated experiences." },
      { question: "What should a first itinerary include?", answer: "A strong first itinerary includes one iconic beach experience, one cultural or buffalo-focused activity, one nature route, and a well-chosen base." },
    ],
    relatedExperiences: ["pesqueiro", "bufalos-queijaria", "manguezais-salvaterra"],
    relatedPackages: ["marajo-essencial", "marajo-slow"],
    relatedGuides: ["things-to-do-in-marajo", "how-to-visit-marajo-island", "best-time-to-visit-marajo"],
    keywords: ["marajo island travel guide", "visit marajo", "marajo itinerary"],
    marketIntent: "global",
  },
  {
    slug: "marajo-wildlife-and-nature",
    title: "Marajo wildlife and nature",
    seoTitle: "Marajo Wildlife and Nature: Mangroves, Birds and Island Landscapes",
    seoDescription: "Explore Marajo's wildlife and nature through mangroves, birds, river scenery, open landscapes, and curated experiences designed for discovery travelers.",
    heroTitle: "Marajo wildlife and nature guide",
    heroSubtitle: "For travelers drawn by landscapes, birds, river ecology, and slow exploration, Marajo offers a distinctive Amazonian island expression.",
    intro: "Nature in Marajo is wide, open, and layered. Visitors find mangroves, rivers, shorelines, fields, and habitats that feel both Amazonian and coastal.",
    sections: [
      { title: "What makes nature distinctive", body: "Marajo combines river-island dynamics with broad horizons and coastal influence, creating a different natural experience from rainforest expectations alone." },
      { title: "Observation opportunities", body: "Birdwatching, mangrove routes, and quieter boat outings are among the strongest options for travelers who prefer calm discovery." },
      { title: "Seasonal planning", body: "Water rhythms, weather comfort, and visibility shape the best timing for nature-led trips." },
      { title: "Nature with local context", body: "The most rewarding experiences combine scenery with local interpretation and a slower travel rhythm." },
    ],
    faq: [
      { question: "Is Marajo good for wildlife and birdwatching?", answer: "Yes. Marajo's mangroves, river systems, and preserved habitats make it a strong destination for birdlife and scenic nature observation." },
      { question: "Is Marajo mainly a beach or nature destination?", answer: "It is both. Marajo is strongest when travelers understand that beaches, rivers, mangroves, and cultural landscapes work together." },
    ],
    relatedExperiences: ["manguezais-salvaterra", "pesqueiro"],
    relatedPackages: ["marajo-slow"],
    relatedGuides: ["best-time-to-visit-marajo", "amazon-island-destinations", "marajo-island-travel-guide"],
    keywords: ["marajo wildlife", "marajo nature", "mangroves marajo"],
    marketIntent: "global",
  },
  {
    slug: "amazon-island-destinations",
    title: "Amazon island destinations",
    seoTitle: "Amazon Island Destinations: Why Marajo Stands Out for Global Travelers",
    seoDescription: "Compare Amazon island destinations and discover why Marajo stands out for beaches, buffalo culture, nature, logistics, and premium curated travel experiences.",
    heroTitle: "Amazon island destinations and why Marajo stands out",
    heroSubtitle: "A destination positioning guide for travelers comparing Marajo with broader Amazon and island travel ideas.",
    intro: "Marajo offers river-island geography, beaches, buffalo culture, and strong destination identity in a format that can be curated for both discovery and booking-ready travelers.",
    sections: [
      { title: "What makes Marajo distinctive", body: "Marajo combines open landscapes, strong symbolism, local culture, and clear identity in a way that is immediately legible to international audiences." },
      { title: "Logistics edge", body: "Marajo can be framed as an accessible extension from Belem, which gives it a practical advantage over less structured remote travel ideas." },
      { title: "Season and positioning", body: "The destination works year-round when positioned around the right traveler promise: scenic discovery, culture, curated nature, or premium planning support." },
      { title: "Culture as differentiation", body: "Buffalo heritage, ceramics, food, and local storytelling give Marajo stronger memorability than nature-only narratives." },
    ],
    faq: [
      { question: "Why is Marajo different from other Amazon destinations?", answer: "Marajo blends island geography, beaches, buffalo culture, nature observation, and strong regional identity in a way that feels different from rainforest-only destinations." },
      { question: "Is Marajo suitable for first-time Amazon travelers?", answer: "Yes. It works especially well for travelers who want Amazon-linked discovery with a more curated, destination-based itinerary." },
    ],
    relatedExperiences: ["pesqueiro", "bufalos-queijaria"],
    relatedPackages: ["marajo-essencial"],
    relatedGuides: ["marajo-island-travel-guide", "how-to-visit-marajo-island", "things-to-do-in-marajo"],
    keywords: ["amazon island destinations", "marajo island brazil", "amazon travel marajo"],
    marketIntent: "global",
  },
  {
    slug: "marajo-horseback-experience",
    title: "Marajo horseback experience",
    seoTitle: "Marajo Horseback Experience: Scenic Riding, Beaches and Travel Planning",
    seoDescription: "Plan a Marajo horseback experience with guidance on scenic riding, beach landscapes, seasonality, culture, and curated booking pathways.",
    heroTitle: "Marajo horseback experience guide",
    heroSubtitle: "A guide to one of Marajo's most cinematic and culturally rooted travel experiences.",
    intro: "Horseback riding in Marajo is less about adrenaline and more about immersion. It connects travelers with open scenery, ranch identity, and a slower way of seeing the island.",
    sections: [
      { title: "Why it is special", body: "Riding through open landscapes and beach settings gives travelers a cinematic perspective on the island." },
      { title: "How to plan it", body: "The experience works best when booked with local guidance, realistic timing, and a route matched to the visitor's comfort level." },
      { title: "Best timing", body: "Weather, light, and ground conditions shape the experience, so sunset-oriented plans should stay flexible." },
      { title: "Cultural connection", body: "Horseback experiences are strongest when understood as part of the island's ranch, buffalo, and landscape culture." },
    ],
    faq: [
      { question: "Is horseback riding in Marajo suitable for beginners?", answer: "Many curated horseback experiences can be adapted for beginners when the route and pace are selected with local guidance." },
      { question: "What makes the experience different?", answer: "Its appeal comes from the combination of open scenery, beach landscapes, ranch identity, and Marajo's strong sense of place." },
    ],
    relatedExperiences: ["cavalgada-praia", "pesqueiro"],
    relatedPackages: ["marajo-essencial"],
    relatedGuides: ["marajo-buffalo-culture", "things-to-do-in-marajo", "best-time-to-visit-marajo"],
    keywords: ["marajo horseback experience", "horseback riding marajo", "marajo beach riding"],
    marketIntent: "global",
  },
  {
    slug: "marajo-birdwatching-guide",
    title: "Marajo birdwatching guide",
    seoTitle: "Marajo Birdwatching Guide: Best Habitats, Seasons and Scenic Routes",
    seoDescription: "Discover birdwatching in Maraj? Island with the best habitats, seasonal timing, mangrove routes, and curated planning tips for nature-focused travelers.",
    heroTitle: "Marajo birdwatching guide",
    heroSubtitle: "A premium nature guide for travelers who want wetlands, mangroves, and calm observation routes.",
    intro: "Marajo is one of those destinations where birdwatching fits naturally into a broader scenic trip. Travelers benefit most from knowing which habitats and times of day to prioritize.",
    sections: [
      { title: "Where birdwatching works best", body: "Mangroves, wetlands, river margins, and open grazing landscapes create strong observation zones across the island.", bullets: ["Mangrove channels around Salvaterra", "Wetland and field edges", "Sunrise and late-afternoon observation windows"] },
      { title: "How to plan a better outing", body: "The best birdwatching experiences in Marajo are paced rather than rushed, with local guidance and space for observation." },
      { title: "Best season guidance", body: "Seasonality changes access comfort, habitat appearance, and the visual atmosphere of the trip, so timing should match the traveler's priorities." },
      { title: "Adding destination depth", body: "Birdwatching becomes more memorable when paired with beaches, food, buffalo culture, and a well-chosen base." },
    ],
    faq: [
      { question: "Is Marajo a good destination for birdwatching?", answer: "Yes. Marajo offers mangroves, wetlands, and broad scenic habitats that support rewarding bird observation." },
      { question: "Do I need a specialist expedition to enjoy birdwatching in Marajo?", answer: "Not necessarily. Many travelers enjoy birdwatching best through calm boat routes and local nature guidance." },
    ],
    relatedExperiences: ["manguezais-salvaterra", "pesqueiro"],
    relatedPackages: ["marajo-slow"],
    relatedGuides: ["marajo-wildlife-guide", "marajo-wildlife-and-nature", "best-time-to-visit-marajo"],
    keywords: ["marajo birdwatching", "birdwatching marajo island", "marajo birds"],
    marketIntent: "global",
  },
  {
    slug: "marajo-fishing-experience",
    title: "Marajo fishing experience",
    seoTitle: "Marajo Fishing Experience: Rivers, Local Rhythm and Travel Planning",
    seoDescription: "Explore the Marajo fishing experience through rivers, traditional rhythms, local guidance, and travel planning that blends nature with culture.",
    heroTitle: "Marajo fishing experience guide",
    heroSubtitle: "A guide for travelers curious about river culture, local fishing traditions, and scenic slow-travel experiences in Marajo.",
    intro: "Fishing in Marajo is most interesting as part of a wider river world. It works well as an entry point into waterways, local rhythms, and community life.",
    sections: [
      { title: "What kind of fishing experience Marajo offers", body: "Marajo is stronger as a scenic and cultural fishing theme than as a trophy-sport destination. Its value is atmosphere, interpretation, and place." },
      { title: "Best settings", body: "Calmer waterways, estuarine channels, and local boat routes are often the most rewarding environments.", bullets: ["River and channel landscapes", "Local guidance for safety and interpretation", "Trips that pair fishing themes with food and nature"] },
      { title: "Season and logistics", body: "Water conditions and weather shape comfort, route design, and the overall feel of the day, so planning matters." },
      { title: "Why this theme matters", body: "Fishing helps explain Marajo as a living river-island territory and connects naturally to food, transport, and local livelihoods." },
    ],
    faq: [
      { question: "Is fishing in Marajo mainly a sport activity or a cultural experience?", answer: "It is often strongest as a cultural and scenic river experience rather than a purely sport-driven activity." },
      { question: "Can fishing-themed travel fit a broader Marajo itinerary?", answer: "Yes. It pairs well with mangrove routes, food discovery, and slower multi-day itineraries." },
    ],
    relatedExperiences: ["manguezais-salvaterra", "pesqueiro"],
    relatedPackages: ["marajo-slow"],
    relatedGuides: ["marajo-mangroves-and-rivers", "marajo-food-guide", "how-to-visit-marajo-island"],
    keywords: ["marajo fishing experience", "fishing in marajo", "marajo river travel"],
    marketIntent: "latin-america",
  },
  {
    slug: "marajo-buffalo-farm-experience",
    title: "Marajo buffalo farm experience",
    seoTitle: "Marajo Buffalo Farm Experience: Ranch Life, Cheese and Local Identity",
    seoDescription: "Plan a Marajo buffalo farm experience with insights into ranch life, dairy traditions, cheese tasting, and curated cultural travel on the island.",
    heroTitle: "Marajo buffalo farm experience",
    heroSubtitle: "A guide for travelers who want to understand the island through working landscapes, local food, and one of Marajo's most symbolic experiences.",
    intro: "A buffalo farm visit is one of the clearest ways to turn Marajo from a beautiful destination into a memorable cultural journey.",
    sections: [
      { title: "Why farm experiences matter", body: "They reveal buffalo heritage as a working cultural system tied to land, food, and regional storytelling." },
      { title: "What visitors can expect", body: "The strongest visits combine guided explanation, dairy or cheese interpretation, and a calm sense of place.", bullets: ["Farm environments with local interpretation", "Cheese and dairy storytelling", "Routes that combine well with Soure sightseeing"] },
      { title: "Seasonality and design", body: "Farm visits work across much of the year, but access comfort improves when they are integrated into a wider itinerary." },
      { title: "Why it converts well", body: "For many travelers, buffalo farm experiences become the emotional anchor of a Marajo trip and support interest in packages." },
    ],
    faq: [
      { question: "What makes a buffalo farm experience in Marajo special?", answer: "Its value comes from the overlap of ranch life, local food, cheese traditions, and the symbolic role buffalo culture plays in the island's identity." },
      { question: "Can a buffalo farm visit be combined with other experiences?", answer: "Yes. It pairs especially well with Soure-based beaches, horseback experiences, and broader island itineraries." },
    ],
    relatedExperiences: ["bufalos-queijaria", "cavalgada-praia"],
    relatedPackages: ["marajo-essencial", "marajo-slow"],
    relatedGuides: ["marajo-buffalo-culture", "marajo-food-guide", "marajo-horseback-experience"],
    keywords: ["marajo buffalo farm", "buffalo farm experience marajo", "marajo cheese farm"],
    marketIntent: "global",
  },
  {
    slug: "marajo-beaches-guide",
    title: "Marajo beaches guide",
    seoTitle: "Marajo Beaches Guide: Best Beaches, Scenic Stops and Travel Tips",
    seoDescription: "Discover the best beaches in Maraj? Island, from iconic scenery to relaxed coastal stops, with travel tips, seasonality, and trip-planning guidance.",
    heroTitle: "Marajo beaches guide",
    heroSubtitle: "A premium beach-planning guide for travelers looking for scenery, atmosphere, and stronger destination understanding.",
    intro: "Marajo's beaches feel more atmospheric and more connected to local life than conventional resort-style coastlines. They work best as part of a broader island journey.",
    sections: [
      { title: "How Marajo beaches differ", body: "The strongest appeal lies in wide horizons, strong sunsets, local rhythm, and the coexistence of coastal scenery with buffalo culture." },
      { title: "What to prioritize first", body: "Praia do Pesqueiro is the natural starting point for many visitors thanks to its visuals and recognition.", bullets: ["Use Soure as a practical base", "Pair beach time with culture or food", "Keep sunset plans weather-aware"] },
      { title: "Best season guidance", body: "Travelers who want easier beach planning should watch weather rhythm and transfer comfort, especially on multi-experience trips." },
      { title: "Why beaches are only part of the story", body: "Marajo becomes more memorable when beach scenery is combined with buffalo culture, food, and nature routes." },
    ],
    faq: [
      { question: "What is the most famous beach in Marajo?", answer: "Praia do Pesqueiro is one of the best-known and most visually iconic beach experiences in Marajo." },
      { question: "Is Marajo good for beach lovers?", answer: "Yes, especially for travelers who want beaches with stronger local identity and slower, more layered travel." },
    ],
    relatedExperiences: ["pesqueiro", "cavalgada-praia"],
    relatedPackages: ["marajo-essencial"],
    relatedGuides: ["things-to-do-in-marajo", "best-time-to-visit-marajo", "marajo-horseback-experience"],
    keywords: ["marajo beaches", "best beaches in marajo", "praia do pesqueiro"],
    marketIntent: "global",
  },
  {
    slug: "marajo-mangroves-and-rivers",
    title: "Marajo mangroves and rivers",
    seoTitle: "Marajo Mangroves and Rivers: Scenic Waterways, Nature and Local Rhythm",
    seoDescription: "Explore Marajo's mangroves and rivers through scenic boat routes, wildlife observation, seasonal planning, and destination-led travel insight.",
    heroTitle: "Marajo mangroves and rivers guide",
    heroSubtitle: "A scenic discovery guide for travelers interested in waterways, estuarine landscapes, and the slower natural rhythm of Marajo.",
    intro: "Mangroves and rivers are central to understanding Marajo. They shape movement, ecology, local livelihoods, and the overall atmosphere of the island.",
    sections: [
      { title: "Why waterways define the destination", body: "Marajo is not simply an island with beaches. It is a river and estuary territory whose identity depends on channels, margins, and mangroves." },
      { title: "Best experiences", body: "Boat routes and calm guided explorations are often the most rewarding ways to understand these landscapes.", bullets: ["Mangrove routes with bird observation", "Waterway experiences linked to Salvaterra", "Trips with time for photography and stillness"] },
      { title: "Seasonality and comfort", body: "Water levels, weather, and visibility shape the feeling of each route, so strong itineraries treat the season as part of the destination character." },
      { title: "How rivers connect culture and nature", body: "The river world of Marajo links directly to food, transport, work, and storytelling, making it a powerful bridge between scenery and cultural depth." },
    ],
    faq: [
      { question: "Are mangrove routes one of the best nature experiences in Marajo?", answer: "Yes. Mangrove routes are among the strongest ways to experience Marajo's wildlife, scenery, and river-connected identity." },
      { question: "Do rivers and mangroves matter for first-time visitors?", answer: "Absolutely. They help explain what makes Marajo different from standard beach destinations." },
    ],
    relatedExperiences: ["manguezais-salvaterra", "pesqueiro"],
    relatedPackages: ["marajo-slow"],
    relatedGuides: ["marajo-wildlife-and-nature", "marajo-birdwatching-guide", "how-to-visit-marajo-island"],
    keywords: ["marajo mangroves", "marajo rivers", "salvaterra mangroves"],
    marketIntent: "global",
  },
  {
    slug: "marajo-wildlife-guide",
    title: "Marajo wildlife guide",
    seoTitle: "Marajo Wildlife Guide: Birds, Wetlands, Mangroves and Nature Travel",
    seoDescription: "Plan wildlife travel in Marajo with guidance on habitats, observation routes, seasonal timing, and curated nature experiences.",
    heroTitle: "Marajo wildlife guide",
    heroSubtitle: "A travel-planning guide for visitors who want to experience Marajo through wildlife, landscapes, and calm observation routes.",
    intro: "Wildlife in Marajo is best approached with a destination mindset. The island's habitats are accessible enough for broad discovery travelers, but rich enough to reward careful planning.",
    sections: [
      { title: "What wildlife travelers can expect", body: "Birdlife is often the most visible starting point, but wetlands, mangroves, waterways, and open natural systems create a wider wildlife experience." },
      { title: "Where wildlife travel works best", body: "Observation becomes stronger when travelers choose the right base and avoid overloading the itinerary." },
      { title: "Best season for wildlife", body: "Seasonal conditions shape route design, observation comfort, and the emotional tone of a wildlife-focused trip." },
      { title: "Why wildlife matters for SEO", body: "Wildlife content helps position Marajo as a layered Amazonian travel destination with broader international appeal." },
    ],
    faq: [
      { question: "What makes wildlife travel in Marajo different?", answer: "Marajo combines mangroves, wetlands, river landscapes, and open scenery, creating a softer and more varied wildlife experience than rainforest-only imagery suggests." },
      { question: "Can wildlife travel fit a general vacation itinerary?", answer: "Yes. Wildlife observation can be integrated with beach stops, cultural experiences, and slower package-based itineraries." },
    ],
    relatedExperiences: ["manguezais-salvaterra", "pesqueiro"],
    relatedPackages: ["marajo-slow"],
    relatedGuides: ["marajo-birdwatching-guide", "marajo-wildlife-and-nature", "marajo-mangroves-and-rivers"],
    keywords: ["marajo wildlife guide", "wildlife in marajo", "marajo nature travel"],
    marketIntent: "global",
  },
  {
    slug: "marajo-food-guide",
    title: "Marajo food guide",
    seoTitle: "Marajo Food Guide: Regional Flavors, Buffalo Cheese and Island Identity",
    seoDescription: "Discover what to eat in Marajo through buffalo cheese, regional flavors, river culture, and food experiences that reveal the island's identity.",
    heroTitle: "Marajo food guide",
    heroSubtitle: "A destination guide for travelers who understand that food is one of the fastest ways to connect with place and culture.",
    intro: "Food in Marajo is not just a practical detail between tours. It is one of the destination's strongest cultural signals, connecting buffalo heritage, river life, and local hospitality.",
    sections: [
      { title: "What defines Marajo's food identity", body: "The island's culinary identity is shaped by buffalo dairy traditions, regional ingredients, and the overlap of inland and water-connected food culture." },
      { title: "What travelers should look for", body: "Visitors who want more than surface-level dining should prioritize cheese, local kitchens, and dishes linked to territory.", bullets: ["Buffalo cheese and dairy storytelling", "Meals connected to river and island life", "Food stops integrated with cultural visits"] },
      { title: "How food fits itinerary design", body: "The strongest itineraries treat food as a daily narrative thread rather than a separate attraction." },
      { title: "Why gastronomy matters", body: "Food gives Marajo memorable specificity and helps international travelers understand the island as a lived place rather than a scenic detour." },
    ],
    faq: [
      { question: "What food is Marajo best known for?", answer: "Marajo is especially known for buffalo cheese and regional flavors that reflect the island's ranch, river, and local cultural traditions." },
      { question: "Is Marajo good for food-motivated travelers?", answer: "Yes. Travelers interested in food, local identity, and regional storytelling often find Marajo especially rewarding." },
    ],
    relatedExperiences: ["bufalos-queijaria", "pesqueiro"],
    relatedPackages: ["marajo-essencial", "marajo-slow"],
    relatedGuides: ["marajo-buffalo-culture", "marajo-buffalo-farm-experience", "marajo-local-culture"],
    keywords: ["marajo food guide", "what to eat in marajo", "marajo cheese"],
    marketIntent: "global",
  },
  {
    slug: "marajo-local-culture",
    title: "Marajo local culture",
    seoTitle: "Marajo Local Culture: Identity, Daily Life and Cultural Travel Insight",
    seoDescription: "Understand Marajo's local culture through buffalo heritage, daily life, craft traditions, food, and destination-led travel insight.",
    heroTitle: "Marajo local culture guide",
    heroSubtitle: "A cultural discovery guide for travelers who want to move beyond sightseeing and understand how Marajo feels as a lived destination.",
    intro: "Local culture is one of the strongest reasons Marajo stays with travelers after the trip ends. The island's identity is visible in movement, food, craft, ranch life, and daily rhythm.",
    sections: [
      { title: "What local culture means", body: "Culture here appears in food habits, buffalo symbolism, artisan work, community rhythm, and the practical relationship between land and water." },
      { title: "How travelers can experience it", body: "The best cultural experiences come through guided visits, local conversations, food, and itineraries that leave time for observation." },
      { title: "Where culture meets planning", body: "Cultural depth works best when paired with beaches, nature routes, and logistics that are not overpacked." },
      { title: "Why it supports authority", body: "Culture-centered content helps international audiences understand that Marajo is not interchangeable with other island or beach destinations." },
    ],
    faq: [
      { question: "What is most distinctive about local culture in Marajo?", answer: "Its distinctiveness comes from the mix of buffalo heritage, island and river life, craft traditions, local food, and a slower daily rhythm." },
      { question: "Can cultural travel be combined with nature and beaches?", answer: "Yes. Marajo is strongest when travelers experience culture alongside beaches, nature, and practical itinerary planning." },
    ],
    relatedExperiences: ["bufalos-queijaria", "pesqueiro"],
    relatedPackages: ["marajo-essencial", "marajo-slow"],
    relatedGuides: ["marajo-food-guide", "marajo-traditions-and-crafts", "marajo-buffalo-culture"],
    keywords: ["marajo local culture", "culture in marajo", "marajo traditions"],
    marketIntent: "global",
  },
  {
    slug: "marajo-traditions-and-crafts",
    title: "Marajo traditions and crafts",
    seoTitle: "Marajo Traditions and Crafts: Ceramics, Heritage and Cultural Discovery",
    seoDescription: "Explore Marajo traditions and crafts through ceramics, artisan identity, local heritage, and cultural travel experiences on the island.",
    heroTitle: "Marajo traditions and crafts guide",
    heroSubtitle: "A cultural heritage guide for travelers interested in ceramics, artisan work, and the traditions that give Marajo a strong sense of place.",
    intro: "Craft and tradition help travelers read Marajo as more than a scenic destination. They reveal cultural continuity and give visitors a more tactile understanding of the island's identity.",
    sections: [
      { title: "Why traditions matter", body: "Traditions give Marajo durability in the travel imagination and create continuity between history, daily life, and what visitors can still encounter." },
      { title: "Crafts and artisan expression", body: "Ceramics and handmade traditions are among the clearest expressions of Marajo's cultural individuality." },
      { title: "How to include culture in a short trip", body: "Even shorter itineraries benefit from one well-curated cultural stop paired with food or buffalo-related experiences." },
      { title: "Why this content supports SEO", body: "Traditions and crafts differentiate Marajo from beach-only or nature-only competitors and answer why the island is worth visiting." },
    ],
    faq: [
      { question: "Is Marajo known for traditional crafts?", answer: "Yes. Marajo is strongly associated with ceramics and artisan traditions that help express the island's heritage." },
      { question: "Are cultural craft stops worth including in a first trip?", answer: "Yes. Even a short cultural stop can add depth and place to the itinerary." },
    ],
    relatedExperiences: ["bufalos-queijaria", "pesqueiro"],
    relatedPackages: ["marajo-essencial"],
    relatedGuides: ["marajo-local-culture", "marajo-food-guide", "marajo-island-travel-guide"],
    keywords: ["marajo crafts", "marajo ceramics", "marajo traditions"],
    marketIntent: "europe",
  },
  {
    slug: "how-many-days-in-marajo",
    title: "How many days in Marajo",
    seoTitle: "How Many Days in Marajo: Ideal Trip Length for First-Time Visitors",
    seoDescription: "Find out how many days to spend in Marajo based on travel style, logistics, beaches, culture, nature, and booking-ready itinerary planning.",
    heroTitle: "How many days in Marajo is enough?",
    heroSubtitle: "A planning guide for travelers deciding how long to stay on the island and how to match trip length with the experiences they care about most.",
    intro: "Trip length shapes the quality of a Marajo experience more than many visitors expect. The right number of days depends on whether the traveler wants a quick highlight trip or a more layered destination journey.",
    sections: [
      { title: "Short stays versus fuller itineraries", body: "A short stay can deliver one iconic beach route and one cultural anchor, but travelers who want beaches, nature, food, and smoother logistics usually benefit from more time.", bullets: ["2 to 3 days for highlights", "4 to 6 days for stronger first trips", "Longer stays for slower pacing and nature depth"] },
      { title: "What affects the ideal trip length", body: "Transfer time, seasonal conditions, desired pace, and the number of guided experiences all influence how many days feel worthwhile." },
      { title: "Recommended duration", body: "For many international and first-time Brazilian travelers, four to six days provides the best balance of logistics, discovery, and value." },
      { title: "Why longer stays help", body: "Marajo becomes more rewarding when visitors have time to combine iconic visuals with local culture, slower meals, and nature routes." },
    ],
    faq: [
      { question: "How many days are ideal for a first trip to Marajo?", answer: "Four to six days is often the sweet spot because it gives enough time for logistics, one strong base, and a balanced mix of culture, beaches, and nature." },
      { question: "Can Marajo be visited in only two days?", answer: "Yes, but it will feel more like a highlights trip. Travelers who want the destination's full value usually benefit from staying longer." },
    ],
    relatedExperiences: ["pesqueiro", "bufalos-queijaria", "manguezais-salvaterra"],
    relatedPackages: ["marajo-essencial", "marajo-slow"],
    relatedGuides: ["marajo-itinerary-guide", "how-to-visit-marajo-island", "is-marajo-worth-visiting"],
    keywords: ["how many days in marajo", "marajo trip length", "how long to stay in marajo"],
    marketIntent: "global",
  },
  {
    slug: "marajo-itinerary-guide",
    title: "Marajo itinerary guide",
    seoTitle: "Marajo Itinerary Guide: How to Structure a Better Island Trip",
    seoDescription: "Build a better Marajo itinerary with route ideas, trip pacing, destination bases, experiences, and conversion-ready planning support.",
    heroTitle: "Marajo itinerary guide",
    heroSubtitle: "A practical guide for travelers who want to organize Marajo by flow, not guesswork.",
    intro: "A good Marajo itinerary is less about stacking attractions and more about sequencing the island intelligently. The destination works best when transfers, pacing, and signature experiences are aligned.",
    sections: [
      { title: "Start with the right base", body: "Most first itineraries work best when built around one main base, usually Soure or Salvaterra, instead of fragmented movement." },
      { title: "A simple structure that works", body: "One beach-led experience, one buffalo or cultural anchor, one nature route, and one flexibility window often creates a satisfying first itinerary.", bullets: ["Beach scenery and sunset day", "Buffalo or cultural day", "Mangrove or wildlife day", "Flexible food or concierge day"] },
      { title: "How seasonality changes design", body: "Weather and transfer conditions should inform pacing and booking order so the itinerary stays realistic." },
      { title: "Why itinerary content converts", body: "Travelers who can clearly imagine how their days will work are more likely to move from inspiration into booking." },
    ],
    faq: [
      { question: "What should a first Marajo itinerary include?", answer: "A strong first itinerary usually includes one iconic beach experience, one buffalo or cultural experience, one nature route, and enough flexibility for local pacing." },
      { question: "Is it better to stay in one base or split the trip?", answer: "For many travelers, one main base is the smoother option. Split stays can work, but they need stronger logistical planning." },
    ],
    relatedExperiences: ["pesqueiro", "bufalos-queijaria", "manguezais-salvaterra"],
    relatedPackages: ["marajo-essencial", "marajo-slow"],
    relatedGuides: ["how-many-days-in-marajo", "how-to-visit-marajo-island", "marajo-island-travel-guide"],
    keywords: ["marajo itinerary", "marajo itinerary guide", "marajo travel plan"],
    marketIntent: "global",
  },
  {
    slug: "is-marajo-worth-visiting",
    title: "Is Marajo worth visiting",
    seoTitle: "Is Marajo Worth Visiting? Why the Island Stands Out for Global Travelers",
    seoDescription: "Find out whether Marajo is worth visiting and why the island stands out for culture, beaches, nature, and curated Amazon-linked travel.",
    heroTitle: "Is Marajo worth visiting?",
    heroSubtitle: "A decision-stage guide for travelers weighing whether Marajo deserves a place in their Brazil or Amazon itinerary.",
    intro: "The real question is not whether Marajo is beautiful, but whether it offers enough uniqueness to justify the journey. For many travelers, the answer is yes.",
    sections: [
      { title: "Why Marajo is different", body: "Few destinations combine beaches, buffalo culture, river life, wetlands, artisan identity, and a strong sense of local tempo in one coherent island setting." },
      { title: "Who gets the most value", body: "Marajo is especially rewarding for travelers interested in destination character, slower discovery, cultural texture, and curated experiences." },
      { title: "What to know before deciding", body: "The island works best for visitors open to a more intentional travel rhythm. Logistics require planning, but the payoff is strong differentiation." },
      { title: "How to turn interest into a plan", body: "The next step is to pair destination interest with realistic itinerary design, trip length, and booking-ready experiences or packages." },
    ],
    faq: [
      { question: "Is Marajo worth visiting for international travelers?", answer: "Yes. Marajo offers a combination of nature, island scenery, buffalo culture, and regional identity that feels unusually distinctive in Brazil." },
      { question: "What type of traveler will enjoy Marajo most?", answer: "Travelers who value authenticity, slower pacing, cultural depth, and curated discovery often get the most from a Marajo trip." },
    ],
    relatedExperiences: ["pesqueiro", "bufalos-queijaria"],
    relatedPackages: ["marajo-essencial", "marajo-slow"],
    relatedGuides: ["marajo-island-travel-guide", "amazon-island-destinations", "how-many-days-in-marajo"],
    keywords: ["is marajo worth visiting", "why visit marajo", "marajo island worth it"],
    marketIntent: "global",
  },
]

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug)
}

export function getGuidesBySlugs(slugs: string[]) {
  return slugs.map((slug) => getGuideBySlug(slug)).filter(Boolean)
}

export function getGuideSlugsForExperience(experienceSlug: string) {
  const mapping: Record<string, string[]> = {
    pesqueiro: ["things-to-do-in-marajo", "marajo-beaches-guide", "best-time-to-visit-marajo", "marajo-island-travel-guide"],
    "bufalos-queijaria": ["marajo-buffalo-culture", "marajo-buffalo-farm-experience", "marajo-food-guide", "marajo-island-travel-guide"],
    "manguezais-salvaterra": ["marajo-wildlife-and-nature", "marajo-mangroves-and-rivers", "marajo-birdwatching-guide", "how-to-visit-marajo-island"],
    "cavalgada-praia": ["marajo-horseback-experience", "marajo-buffalo-culture", "marajo-beaches-guide", "best-time-to-visit-marajo"],
  }

  return mapping[experienceSlug] ?? ["marajo-island-travel-guide", "things-to-do-in-marajo"]
}

export function getGuideSlugsForDestination(destinationSlug: string) {
  const mapping: Record<string, string[]> = {
    soure: ["things-to-do-in-marajo", "marajo-beaches-guide", "marajo-buffalo-culture", "marajo-island-travel-guide"],
    salvaterra: ["marajo-wildlife-and-nature", "marajo-mangroves-and-rivers", "marajo-birdwatching-guide", "how-to-visit-marajo-island"],
    pesqueiro: ["marajo-beaches-guide", "best-time-to-visit-marajo", "marajo-horseback-experience", "things-to-do-in-marajo"],
  }

  return mapping[destinationSlug] ?? ["marajo-island-travel-guide", "things-to-do-in-marajo"]
}
