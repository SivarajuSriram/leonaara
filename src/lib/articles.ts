export interface Block {
  type: "p" | "h" | "quote" | "caption" | "list" | "image";
  text?: string;
  items?: string[];
  attribution?: string;
  src?: string;
  alt?: string;
}

export interface Article {
  slug: string;
  date: string;
  title: string;
  img: string;
  body: Block[];
  moreReading?: { text: string; href: string }[];
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const raw: { date: string; title: string; img: string; body: Block[]; moreReading?: { text: string; href: string }[] }[] = [
  {
    date: "March 13, 2025",
    title: "The Results Are In: Leonaara Camp Survey Highlights",
    img: "/media/2025/03/Blog-Image-Survey-Results-576x576.jpg",
    body: [
      { type: "p", text: "Good morning, Leonaara Campers." },
      { type: "p", text: "With spring just around the corner, our community continues to grow—you are now **350+ strong!**" },
      {
        type: "p",
        text: "**Many of you took the time to complete our survey**, and we want to send a huge thank you your way. Your insights help shape what we're building. If you haven't filled it out yet, there is a **shortened 10 question, 2-minute version** to make it even easier to share your thoughts. Find it at the end of this email.",
      },
      {
        type: "p",
        text: "**A quick reminder:** Once our sales phase goes live, our capacity will only allow us to accept a handful of early buyers. By filling out the survey, you help us understand who's ready to take the plunge, making sure early adopters get priority.",
      },
      { type: "p", text: "But enough about that—let's dive into the results." },
      { type: "h", text: "What Leonaara Campers Had to Say" },
      {
        type: "quote",
        text: "We're very excited about this project. As a couple, we've begun to imagine the possibilities of our new home, our new daily life, our new environment. And for giving us the opportunity to dream further, thank you.",
        attribution: "PB",
      },
      {
        type: "quote",
        text: "I grew up exploring in the woods. Now I am stuck in a city. I love hospitality and design. My dream is to create places where people can escape to and be refreshed.",
        attribution: "CD",
      },
      {
        type: "quote",
        text: "We're a couple living in Toronto and we love spending time in the Laurentians. Our dream is to build an energy-efficient, high quality second home/vacation rental that could potentially become our primary residence if our lifestyle changes.",
        attribution: "RM",
      },
      { type: "h", text: "1. Demographic Landscape" },
      {
        type: "p",
        text: "A large portion of respondents fall in the **35-44 age range**, confirming that Millennials are leading the charge. The strongest motivation? **A desire for a simpler lifestyle.** Architectural design and sustainability also ranked high, showing that aesthetics and values go hand in hand for many of you.",
      },
      { type: "image", src: "/media/2025/03/Survey-Anwers-Diagrams-fixed-576x260.png", alt: "How old are you?" },
      { type: "caption", text: "“HOW OLD ARE YOU?”" },
      { type: "image", src: "/media/2025/03/Survey-Anwers-Diagrams-02-576x260.jpg", alt: "What motivated you to join the waitlist?" },
      { type: "caption", text: "“WHAT MOTIVATED YOU TO JOIN THE WAITLIST?”" },
      { type: "h", text: "2. Who's Moving In? All kinds of folks." },
      {
        type: "p",
        text: "Most of you are **couples looking for a secondary residence**, but we also saw a strong interest from families with kids, which was great to see. Another interesting trend? Many of you are thinking about **renting out your Leonaara home**, either as a short-term rental or an additional income.",
      },
      { type: "image", src: "/media/2025/03/Survey-Anwers-Diagrams-04-576x239.jpg", alt: "Who will be the primary occupants of your Leonaara home?" },
      { type: "caption", text: "“WHO WILL BE THE PRIMARY OCCUPANTS OF YOUR LEONAARA HOME?”" },
      { type: "image", src: "/media/2025/03/Survey-Anwers-Diagrams-03-576x215.jpg", alt: "How do you plan to use your Leonaara home?" },
      { type: "caption", text: "“HOW DO YOU PLAN TO USE YOUR LEONAARA HOME?”" },
      { type: "h", text: "3. What Matters Most? Design & Energy Efficiency" },
      {
        type: "p",
        text: "No surprise here—**affordability** is the number one priority, especially given today's housing market. That said, many of you also placed a big emphasis on **energy efficiency, design and eco-friendly materials**, which aligns perfectly with our core mission.",
      },
      {
        type: "p",
        text: "One concern that stood out? **Unclear construction processes.** We hear you loud and clear. Making the process as **seamless and transparent** as possible is a big focus for us.",
      },
      { type: "image", src: "/media/2025/03/Survey-Anwers-Diagrams-09-576x363.jpg", alt: "What features are most important to you in a Leonaara home?" },
      { type: "caption", text: "“WHAT FEATURES ARE MOST IMPORTANT TO YOU IN A LEONAARA HOME?”" },
      { type: "image", src: "/media/2025/03/Survey-Anwers-Diagrams-10-576x335.jpg", alt: "What are your main concerns about buying and/or building a new home?" },
      { type: "caption", text: "“WHAT ARE YOUR MAIN CONCERNS ABOUT BUYING AND/OR BUILDING A NEW HOME?”" },
      { type: "h", text: "4. Where You Stand on Off-Grid & Sustainability." },
      {
        type: "p",
        text: "Going fully off-grid isn't for everyone, but we were intrigued to see that **the majority of you are interested in partially going off-grid**. That tells us there's a demand for a balance—self-sufficiency without total isolation. We'll be thinking about how to incorporate that flexibility into our offerings.",
      },
      { type: "image", src: "/media/2025/03/Survey-Anwers-Diagrams-01-576x156.jpg", alt: "How important is sustainability in your decision to purchase a modular cabin?" },
      { type: "caption", text: "“HOW IMPORTANT IS SUSTAINABILITY IN YOUR DECISION TO PURCHASE A MODULAR CABIN?”" },
      { type: "image", src: "/media/2025/03/Survey-Anwers-Diagrams-06-576x118.jpg", alt: "Do you currently own land where you intend to place a Leonaara home?" },
      { type: "caption", text: "“DO YOU CURRENTLY OWN LAND WHERE YOU INTEND TO PLACE A LEONAARA HOME?”" },
      { type: "image", src: "/media/2025/03/Survey-Anwers-Diagrams-05-576x118.jpg", alt: "Are you interested in off-grid living capabilities?" },
      { type: "caption", text: "“ARE YOU INTERESTED IN OFF-GRID LIVING CAPABILITIES?”" },
      { type: "h", text: "5. The Big One: Budget Considerations" },
      {
        type: "p",
        text: "The majority of respondents fall in the $250K-$300K range, which wasn't a surprise, but still good to confirm. While we project that Leonaara I and Leonaara I+ will fall within the 300K-400K range, it's great to understand where you're at as we look to design future models.",
      },
      { type: "image", src: "/media/2025/03/Survey-Anwers-Diagrams-07-576x260.jpg", alt: "What is your budget?" },
      { type: "caption", text: "“WHAT IS YOUR BUDGET?”" },
      { type: "p", text: "In the end, our goal remains to **delivering a high-quality, well-designed, and sustainable home at a price that makes sense.**" },
      { type: "p", text: "Thank you again to everyone who shared their thoughts. If you haven't filled out the survey yet, now's your chance—our Leonaara Camp will really help shape the future of Leonaara." },
      { type: "p", text: "**Take the Survey here !**" },
      { type: "p", text: "Cheerio." },
      { type: "p", text: "—The Leonaara Team 🚀" },
    ],
  },
  {
    date: "February 20, 2025",
    title: "Snowed in: Lessons from Japan, Iceland & Antarctica",
    img: "/media/2024/10/BASELETTER_IMG06-576x576.jpg",
    body: [
      {
        type: "p",
        text: "Last week, Montreal was buried under **more than 70 cm of snow**. Not to be outdone, some parts of Japan saw well **over 1 meter in just 12 hours**. All this snow is a reminder that buildings should adapt to their environment, not just endure it.",
      },
      {
        type: "p",
        text: "It got us thinking about the different ways architecture around the world has evolved with its – sometimes extreme – surroundings. From **mountain villages in Japan** to **research stations in Antarctica**, here's how the world's most extreme snow-ready structures perform under pressure.",
      },
      { type: "h", text: "1. Japan's Gassho-Zukuri houses: Steep roofs & breathable materials" },
      { type: "image", src: "/media/2025/02/Snow-and-Shirakawa-go_enhanced-576x383.png", alt: "Shirakawa-go, Japan" },
      { type: "caption", text: "IMAGE: SHIRAKAWA-GO TOURIST INFORMATION" },
      {
        type: "p",
        text: "In the snowy mountains of Shirakawa-go, Japan, traditional **Gassho-Zukuri** farmhouses feature steeply pitched thatched roofs designed to shed heavy snow and prevent collapse.",
      },
      {
        type: "p",
        text: "These homes use **thick wooden beams and natural straw**, allowing them to breathe while retaining warmth. The result is naturally **insulated, mold-resistant, and high-performing** homes that have lasted centuries.",
      },
      { type: "h", text: "2. Iceland's modern arctic design: Compact shapes & turf roofs" },
      { type: "image", src: "/media/2025/02/p0d662w7.jpg-copy-576x324.jpg", alt: "Iceland turf house" },
      { type: "caption", text: "IMAGE: KELLY CHENG TRAVEL PHOTOGRAPHY/GETTY IMAGES" },
      {
        type: "p",
        text: "Iceland's turf houses were designed for survival. Called torfbæir, these cleverly designed homes made it possible to inhabit one of Europe's **most challenging landscapes.**",
      },
      {
        type: "p",
        text: "Their compact shape minimized heat loss, while thick turf roofs provided **natural insulation** and protection from the elements. Made from **local materials**, these homes blended into the landscape while staying warm in winter and cool in summer.",
      },
      { type: "h", text: "3. Antarctica's Halley VI Research Station: Super-insulated panels" },
      { type: "image", src: "/media/2025/02/Making-a-Home-in-Anartica-02-576x324.jpg", alt: "Halley VI Research Station, Antarctica" },
      { type: "caption", text: "IMAGE: JAMES MORRIS" },
      {
        type: "p",
        text: "If we're going to talk about extreme environments, we may as well go all the way. At the **Halley VI Research Station** in Antarctica, insulation is survival.",
      },
      {
        type: "p",
        text: "Built with **modular insulated panels**, it is engineered to withstand -50°C temperatures while resisting extreme wind and ice movement. The compact, aerodynamic form keeps heat trapped inside, proving that **high-performance panels are the future of cold-weather construction**.",
      },
      { type: "p", text: "The kicker: the Halley VI station's legs are even outfitted with skis for a mobile workstation. It is hard to be more adaptable than that." },
      { type: "h", text: "How This Applies to Leonaara" },
      { type: "p", text: "While we aren't about to put our cabins on skis (yet), our homes are precisely designed to respond to their environment—however extreme they may be." },
      { type: "p", text: "At Leonaara, we apply the same principles:" },
      {
        type: "list",
        items: [
          "✔️ **High-performance, natural insulation** (wood fiber + hemp) for warmth and breathability.",
          "✔️ **Compact, efficient design** to reduce energy waste.",
          "✔️ **Modular, adaptable construction** that stands up to tough climates.",
        ],
      },
      { type: "p", text: "**P.S.** Want to learn more about how our homes handle hard winters? Let's chat." },
      { type: "p", text: "As always, thank you for reading and see you next time!" },
    ],
  },
  {
    date: "February 7, 2025",
    title: "Welcome to Leonaara Camp",
    img: "/media/2025/02/Title-2-576x550.jpg",
    body: [
      { type: "p", text: "Well, 2025 is off to an *interesting* start, isn't it?" },
      { type: "p", text: "Over here at Leonaara, we know one thing to be true: We are stronger together." },
      { type: "p", text: "We're in the early days of Leonaara, setting the foundation for something new. But we don't want to do it alone—**we want to build Leonaara with you.**" },
      {
        type: "p",
        text: "At the foot of the world's tallest mountains, you'll usually find a base camp – where climbers gather before the ascent. It's a place to plan, prepare, and connect before heading into unknown terrain. That's exactly what we're building here.",
      },
      { type: "h", text: "From the Ground Up" },
      {
        type: "p",
        text: "We created Leonaara to redefine how we build and live—not as a one-time shift, but as an ongoing evolution toward greater flexibility, sustainability, and alignment with your lifestyle.",
      },
      { type: "p", text: "We have the opportunity to shape a new generation of living, together." },
      { type: "p", text: "That's why we'd love to hear from you, our **community**." },
      {
        type: "p",
        text: "That's where **Leonaara Camp** comes in—not just as a name, but as a space for a community of people who believe in better ways of living, building, and designing. People who want to be part of something from the ground up.",
      },
      { type: "p", text: "Send us a message and let us know:" },
      {
        type: "list",
        items: [
          "**👉 What does your dream project look like?**",
          "**👉 What's one thing that frustrates you about homes today?**",
          "**👉 What would you love to see out of Leonaara, moving forward?**",
        ],
      },
      { type: "p", text: "We will reply to every single response." },
      { type: "p", text: "And since you're here, you might want to know a little more about the people behind Leonaara…" },
      { type: "h", text: "Meet Julien (me, the guy in writing this 👋)" },
      {
        type: "p",
        text: "I've spent my career obsessed with how we live, work, and build. As an architect, I believe the future of living should be simple, adaptable, and free from unnecessary waste.",
      },
      { type: "p", text: "That's why I founded Leonaara—to offer an easy solution for a better way to live." },
      {
        type: "p",
        text: "Outside of Leonaara, I run as much as I can—it clears my mind and fuels ideas. I love to cook, barely drink but love learning about wine, and always need a creative outlet, from sketching to graphic design. The rest of my time? With my partner, B, and our kids, S and L.",
      },
      { type: "p", text: "I believe in doing more with less. In living with intention. And in building things that actually make sense for the way we live today." },
      { type: "p", text: "**Don't be a stranger! Send us a message and tell us your story.**" },
      { type: "p", text: "Let's build something amazing together." },
      { type: "p", text: "— Julien" },
      { type: "p", text: "P.S. If you're not already hanging out with us on Instagram, come say hey: @leonaara 🪓" },
      { type: "p", text: "As always, thank you for reading and see you next time!" },
    ],
  },
  {
    date: "November 22, 2024",
    title: "Pro Series: Fab Structures",
    img: "/media/2024/11/Pro-Series-01-Title-Fab-576x446.jpg",
    body: [
      {
        type: "p",
        text: "This series focuses on the partners that help Leonaara drive its mission forward. In this interview, we sit down with Fab Structures, our prefabrication partner who shares our passion for innovation and sustainability in construction. Together, we're reimagining how homes are designed and built, combining efficiency, affordability, and quality. Discover how our collaboration is driving change in the industry.",
      },
      { type: "p", text: "Here are our **5 questions** with Fab Structures:" },
      { type: "h", text: "1. Describe Fab Structures in three words." },
      { type: "p", text: "Built for life." },
      { type: "h", text: "2. Tell us a bit about the story behind Fab Structures." },
      {
        type: "p",
        text: "We are two brothers who grew up playing with wooden toys and Lego, sparking a passion for building and creating. We started working in the trades, tackling projects for family and friends. Before long, we noticed how poorly built the houses we were renovating were, which inspired us to start our own business with a mission to build better.",
      },
      {
        type: "p",
        text: "Over the past decade, we've invested in research and development rooted in building science and Passivhaus principles. In 2021, we acquired a manufacturing plant in Ripon, Quebec, integrating prefabrication skills and industry expertise to become a fully vertically integrated design, manufacturing, and building company.",
      },
      { type: "image", src: "/media/2024/11/b75df0fb-d359-4d5b-3260-5b3f853ddb4f-576x386.png", alt: "Two brothers: Ben & Jake Chicoine" },
      { type: "caption", text: "TWO BROTHERS: BEN & JAKE CHICOINE" },
      { type: "h", text: "3. In what ways do you feel Fab Structures and Leonaara align in terms of vision and goals?" },
      {
        type: "p",
        text: "Beyond our shared start-up mentality, both Leonaara and Fab focus on improving efficiency and affordability without compromising quality. This mindset led to our collaboration, where we substituted an insulation product with hemp insulation for the first time. We were able to meet performance needs while also pushing for higher sustainability standards. Fortunately, the hemp product was both affordable and recently CCMC-approved.",
      },
      { type: "image", src: "/media/2024/11/P1000958-Small-576x324.jpg", alt: "The Fab team assemble a Leonaara wall panel" },
      { type: "caption", text: "THE FAB TEAM ASSEMBLE A LEONAARA WALL PANEL" },
      { type: "h", text: "4. What is the biggest thing holding back the construction industry?" },
      { type: "p", text: "In Canada, there are three main factors:" },
      {
        type: "list",
        items: [
          "A. Short-term mindset: Construction culture doesn't prioritize long-term durability. Mortgages are typically 30 years, unlike Europe where they can span up to 150 years. Canadians move homes every 5 years on average, making it less appealing to invest in materials that last.",
          "B. Regulatory challenges: Complex municipal, provincial, and federal regulations slow timelines and increase costs. This problem isn't confined to urban areas; rural regions also face unnecessary regulatory barriers, even amid a housing crisis.",
          "C. Skill gaps: Canada lacks robust training and apprenticeship programs. In Europe, carpentry is a respected trade with strong educational foundations. Graduates of carpentry programs often have a deep understanding of construction, from on-site work to legislation. This kind of expertise is missing in Canada, leading to inefficiencies and limited adoption of innovations.",
        ],
      },
      { type: "h", text: "5. In your view, what impact do our combined efforts have on pushing the industry towards sustainability?" },
      {
        type: "p",
        text: "Our combined focus on design for manufacturing is transformative. By “productizing” builds, we can reduce waste, lower costs, and normalize higher-quality materials like hemp insulation and advanced membranes. Leonaara excels at designing for scalability, optimizing prefabrication, and promoting sustainable materials—setting a benchmark for others to follow.",
      },
      { type: "image", src: "/media/2024/11/P1000938-Small-576x324.jpg", alt: "The Leonaara I+ roof panels, ready to go" },
      { type: "caption", text: "THE LEONAARA I+ ROOF PANELS, READY TO GO" },
      { type: "h", text: "Bonus: We've noticed a solid music selection playing in the shop. What does your go-to work playlist look like?" },
      { type: "p", text: "You can usually hear some Bob Marley, the Rolling Stones, Willy William or Coldplay all the way to some Backstreet boys, Britney Spears and Limp Bizkit. Its eclectic…" },
      { type: "p", text: "You can find our more about how Fab is changing the construction industry here: fabstructures.ca" },
      { type: "p", text: "As always, thank you for reading and see you next time!" },
    ],
  },
  {
    date: "October 17, 2024",
    title: "Redefining the Cottage: A More Flexible Approach",
    img: "/media/2024/10/20240122_HeroShot_B-copy-576x835.jpg",
    body: [
      {
        type: "p",
        text: "The cottage has evolved. Some Leonaara homes will serve as a secondary residence—the modern cottage for today's generation of homebuyers. But the ‘cottage' has the potential to be so much more. Its very notion needs to be redefined.",
      },
      { type: "p", text: "That's why we're creating a simpler and more accessible alternative by building it better and faster, and by future-proofing it with our Leonaara Ecosystem." },
      { type: "p", text: "Here are **6 ways** Leonaara is redefining the cottage:" },
      { type: "image", src: "/media/2024/11/Themes-01-576x576.jpg", alt: "An alternate path to home ownership" },
      { type: "image", src: "/media/2024/11/Themes-02-576x576.jpg", alt: "Simpler space, simpler pace" },
      { type: "h", text: "1. An Alternate Path to Home Ownership" },
      {
        type: "p",
        text: "Given the choice between a city condo and a piece of land, where you can live, grow, and build something meaningful for the future, the latter often seems more appealing. Owning land today means more than just having a place to build a house—it's about creating a space for well-being, connection, and legacy.",
      },
      { type: "h", text: "2. Simpler Space, Simpler Pace" },
      {
        type: "p",
        text: "The days of the mega-cottage are behind us. They simply do not reflect today's realities and plus, bigger the space sometimes means bigger the headaches. An easy to manage home means more time to do what you love most, especially if that's doing as little as possible.",
      },
      { type: "image", src: "/media/2024/11/Themes-03-576x576.jpg", alt: "Evolve with your home" },
      { type: "image", src: "/media/2024/11/Themes-04-576x576.jpg", alt: "Sustainability without compromise" },
      { type: "h", text: "3. Evolve With Your Home" },
      {
        type: "p",
        text: "At Leonaara, our homes are designed to grow with you. Need a personal studio, a space for guests, or room for a future greenhouse? Our designs allow you to expand your home as your dreams – and your budget – evolve.",
      },
      { type: "h", text: "4. Sustainability Without Compromise" },
      {
        type: "p",
        text: "It's no secret that we need to change the way we build to meet today's carbon realities. Our homes are built with sustainability at their core, using natural materials like wood fiber and hemp insulation. This not only reduces environmental impact, but creates a healthier living space that works in harmony with the land.",
      },
      { type: "image", src: "/media/2024/11/Themes-05-576x576.jpg", alt: "A key part of your wellness" },
      { type: "image", src: "/media/2024/11/Themes-06-576x576.jpg", alt: "Build around a community" },
      { type: "h", text: "5. A Key Part of Your Wellness" },
      {
        type: "p",
        text: "What if simply being in your home was just as much a wellness ritual as say yoga and mediation are? Whether it's a garden, sauna, or an outdoor living space, your land becomes a personal sandbox, a blank canvas to design a lifestyle in tune with nature.",
      },
      { type: "h", text: "6. Build Around a Community" },
      {
        type: "p",
        text: "At Leonaara, we're more than just homebuilders—we're fostering a community grounded in shared values of sustainability and simple living. Whether you're building your own space or joining others in sustainable neighborhoods, you're part of a movement that prioritizes your own health and that of this planet's with a shared vision for a better future.",
      },
      { type: "p", text: "As always, thank you for reading and see you next time!" },
    ],
  },
  {
    date: "September 6, 2024",
    title: "Design Series: Architecture 201",
    img: "/media/2024/10/be20a23e68ad19c63622355c79beea04-576x576.jpg",
    body: [
      { type: "p", text: "Welcome back to our Design Series where we will take a closer look at the various elements that make up our homes." },
      { type: "p", text: "Last time, we looked at the big architectural ideas that shape our cabins. This week we look a little closer at what makes up the functional block." },
      { type: "p", text: "Let's dive in." },
      { type: "image", src: "/media/2024/09/201B-04-576x430.jpg", alt: "The functional block in the Leonaara I" },
      { type: "caption", text: "THE FUNCTIONAL BLOCK IN THE LEONAARA I" },
      {
        type: "p",
        text: "At the core of every Leonaara home, is its compact functional block – a cube that holds all of the home's important functional elements: the kitchen, the mezzanine bedroom, the bathroom and the mechanical room. By efficiently grouping these together, we can maximize the rest of the open living space for you while also simplifying the construction.",
      },
      { type: "h", text: "Central heating and cooling" },
      {
        type: "p",
        text: "The functional block powers the home through its small but mighty mechanical room. With a little bit of magic from our mechanical engineers, we were able to design a compact and efficient central air system for cooling and heating – all hidden within the walls. The result is a high-efficiency system which maximizes air quality, thermal comfort and wellbeing.",
      },
      { type: "image", src: "/media/2024/09/201B-03-576x430.jpg", alt: "Efficient air flow" },
      { type: "caption", text: "EFFICIENT AIR FLOW" },
      { type: "h", text: "Kitchen" },
      {
        type: "p",
        text: "At the heart of each home is the kitchen. Designed with simplicity and efficiency in mind, our kitchens use high quality wood panelling throughout. It features the basics as well as a hidden door to the bathroom, a sliding ladder and an elevated library or storage area.",
      },
      { type: "image", src: "/media/2024/10/73f8fbeb995f32d5d628ea460ae7fef0-576x360.jpg", alt: "Kitchen layout diagram" },
      { type: "caption", text: "1: ACCESS TO SLEEPING AREA · 2: ACCESS TO BATHROOM · 3: FRIDGE · 4: STOVE AND OVEN · 5: POSSIBILITY OF DISHWASHER" },
      { type: "h", text: "Sleeping area" },
      {
        type: "p",
        text: "Tucked away above the functional block is the mezzanine bedroom. It features room for a king size bed, custom integrated storage into the floor and a skylight for star gazing at night. By integrating it into our functional block, we can optimize the home while also giving you a bird's eye view of the space below.",
      },
      { type: "image", src: "/media/2024/09/201B-02-576x430.jpg", alt: "Sleeping area diagram" },
      { type: "caption", text: "1: KING SIZE BED · 2: INTEGRATED STORAGE · 3: SKYLIGHT" },
      { type: "h", text: "Hidden bathroom" },
      {
        type: "p",
        text: "Last, but certainly not least, is the bathroom. It was important it feel spacious as well, even with the size constraints. With its large opening window and generous shower lined with durable porcelain tile, comfort is key. It's a multi-purpose space that continues to work towards maximum efficiency while meeting individual needs.",
      },
      { type: "image", src: "/media/2024/09/201B-01-copy-576x430.jpg", alt: "Bathroom layout diagram" },
      { type: "caption", text: "1: LARGE OPENING WINDOW · 2: WASH/DRYER · 3: SHOWER · 4: MECHANICAL ROOM" },
      { type: "p", text: "All in all, these are the elements that make up the core of our home design: the functional block. Catch the next Leonaara Letter as we continue to explore the many aspects of the Leonaara Ecosystem." },
      { type: "p", text: "As always, thank you for reading and see you next time!" },
    ],
  },
  {
    date: "August 15, 2024",
    title: "Design Series – Architecture 101",
    img: "/media/2024/10/be20a23e68ad19c63622355c79beea04-576x576.jpg",
    body: [
      {
        type: "p",
        text: "Welcome to our Design Series where we will take a closer look at the various elements that make up our designs. It will explore how these elements affect the performance and comfort of our homes. We will look at the broad concepts that shape them as well the smaller details that have a biggest impact.",
      },
      { type: "p", text: "Let's dive in." },
      {
        type: "p",
        text: "We have put thousands of hours into designing our home models, inspiring ourselves from what has worked in Japan and Scandinavia for ages and infusing it with a little Americana and Quebec chalet culture.",
      },
      {
        type: "p",
        text: "Our homes were designed around ideas of robust simplicity and compactness – trimming away the excess to be left with the simplest expression of the home. This is what drives the Leonaara mission, to do less, better.",
      },
      { type: "image", src: "/media/2024/08/04-Diagram-A-1-576x559.jpg", alt: "The functional block" },
      { type: "image", src: "/media/2024/08/04-Diagram-B-1-576x559.jpg", alt: "The living space" },
      { type: "caption", text: "A. THE FUNCTIONAL BLOCK · B. THE LIVING SPACE" },
      { type: "h", text: "Leonaara Design" },
      {
        type: "p",
        text: "The LEONAARA I has two main elements: the functional block (red) and the living space (beige). By condensing all the functional elements (kitchen, bathroom, bedroom and mechanical room) into one block, we can leave the rest of the space uninterrupted for open living. Our LEONAARA I+ model follows the same logic on a slightly larger scale.",
      },
      { type: "image", src: "/media/2024/08/04-Diagram-C-1-576x559.jpg", alt: "Square footage" },
      { type: "image", src: "/media/2024/08/04-Diagram-D-1-576x559.jpg", alt: "Cubic footage" },
      { type: "caption", text: "C. SQUARE FOOTAGE · D. CUBIC FOOTAGE" },
      { type: "h", text: "Square Footage vs Cubic Footage" },
      {
        type: "p",
        text: "Being more compact means it is important to maximize the feeling of space. This is the main reason for our cathedral ceilings. We believe ceiling height has a bigger impact on a space than floor area, and gives you a true feeling of spaciousness.",
      },
      { type: "image", src: "/media/2024/08/04-Diagram-E-1-576x559.jpg", alt: "Views & sunlight" },
      { type: "image", src: "/media/2024/11/Architecture-Diagrams-06-576x559.jpg", alt: "Natural ventilation" },
      { type: "caption", text: "E. VIEWS & SUNLIGHT · F. NATURAL VENTILATION" },
      { type: "h", text: "Window Functionality" },
      {
        type: "p",
        text: "The window size and positioning are the result of countless design iterations for optimal performance and visibility. The main windows are larger, and maximize the surrounding views in order to bring the outside in. The smaller ones ensure sunlight is coming in from both sides. They let the breeze in and the hot air out by creating a natural ventilation flow. The result is bigger views, better light and increased passive performance.",
      },
      { type: "p", text: "In short, these are the main elements that drive the architectural design. As always, thanks for reading!" },
    ],
  },
  {
    date: "July 11, 2024",
    title: "From Conventional to Sustainable: Natural Materials and Your Health",
    img: "/media/2024/10/BASELETTER_IMG04-576x576.jpg",
    body: [
      {
        type: "p",
        text: "You wouldn't want to wear a thick, plastic raincoat and go for a run – it locks in moisture, isn't breathable, and leaves you a sweaty mess. Similarly, your living space should breathe well to keep you comfortable and feeling good. Natural materials, which have evolved alongside us, naturally possess these capabilities.",
      },
      {
        type: "p",
        text: "We've become reliant on petrochemicals in nearly every industry, construction included. We've been led to believe they're the best and only way forward. Yet, just as plastics have proven harmful to us and our environment, we now understand the need to rethink building materials for our wellbeing. It has become too serious a health and environmental issue to ignore, as recent research has uncovered. Turns out, we can do better by returning to basics.",
      },
      { type: "image", src: "/media/2024/10/BASELETTER_IMG05-576x576.jpg", alt: "Double cavity system with natural or biogenic insulation materials" },
      { type: "caption", text: "NOTRE SYSTÈME À DOUBLE CAVITÉ AVEC DES MATÉRIAUX D'ISOLATION NATURELS OU BIOGÈNES" },
      {
        type: "p",
        text: "This is why Leonaara emphasizes high-performance design using almost exclusively natural or biogenic materials, resulting in a carbon-neutral assembly – a new generation of prefabrication. But what does carbon neutrality really mean, and why should your home be built this way?",
      },
      { type: "h", text: "What is Carbon Neutrality?" },
      {
        type: "p",
        text: "Carbon neutrality means that the total carbon cost of the materials we use, like wood fiber, cellulose, and hemp insulation, absorb more carbon dioxide from the atmosphere than they emit during production. These materials, having once been plants or trees, act like “carbon sinks,” storing carbon and helping to reduce greenhouse gases.",
      },
      { type: "h", text: "Typical vs Natural or Biogenic Insulation" },
      {
        type: "p",
        text: "Traditional insulators like fiberglass and foam may seem effective on paper but often fall short in practice. Their lightweight nature leads to poor thermal mass and inertia, causing rapid temperature changes and they can degrade over time, allowing water infiltration. Natural or biogenic materials like wood fiber and hemp have high thermal mass, absorb and slowly release heat, and maintain integrity longer. This provides superior temperature stability, energy efficiency, and moisture resistance – ideal for sustainable living spaces.",
      },
      { type: "h", text: "Performance & Your Health" },
      {
        type: "p",
        text: "Natural, non-toxic materials create a healthier indoor environment – it's that simple. They are breathable, regulate humidity, and don't release harmful chemicals, supporting your well-being just like a healthy diet. They also offer excellent thermal and acoustic performance, keeping your home comfortable year-round and reducing noise. This results in a quieter home, lower energy bills, and a reduced carbon footprint.",
      },
    ],
    moreReading: [
      {
        text: "Biogenic Building Materials: Beneficial for Climate, Health, and the Economy",
        href: "https://buildingclean.org/blog/2023-04/biogenic-building-materials-beneficial-climate-health-and-economy",
      },
      {
        text: "New Analysis: Building Material Pollution Harms Communities",
        href: "https://www.nrdc.org/bio/veena-singla/new-analysis-building-material-pollution-harms-communities",
      },
      {
        text: "Chemical and Environmental Justice Impacts in the Life Cycle of Building Insulation (The picture on the cover says it all…)",
        href: "https://informed.habitablefuture.org/resources/research/18-case-study-on-isocyanates-in-spray-polyurethane-foam",
      },
    ],
  },
  {
    date: "June 25, 2024",
    title: "Go Big On A Smaller Home",
    img: "/media/2024/02/NM_01-9.jpg",
    body: [
      { type: "p", text: "One of our mottos is “Do less, better.” For us, it comes down to doing a lot with a little. It is the reason why our homes are compact by design." },
      { type: "p", text: "Beyond aligning with our own values, reducing the size of your home also has tangible benefits to you as a homeowner. Here are **4 reasons** to go big on a smaller home." },
      { type: "h", text: "1. Reduced Footprint, Bigger Impact:" },
      {
        type: "p",
        text: "A smaller footprint means less materials used and a lower carbon footprint. It also means a home that has less impact on the land around it, one that can integrate itself better into its environment. On top of that, it also means we can build it faster.",
      },
      { type: "h", text: "2. Spend Less:" },
      {
        type: "p",
        text: "Smaller homes are less expensive to heat and cool. This, coupled with an efficient shell like ours makes for even more efficiency. They also cost less to maintain, with reduced expenses for repairs, utilities, and property taxes.",
      },
      { type: "image", src: "/media/2024/06/Base_Clean_005_NM_v05-copy-576x486.jpg", alt: "More time to do less" },
      { type: "caption", text: "MORE TIME TO DO LESS" },
      { type: "h", text: "3. Simplified Lifestyle:" },
      {
        type: "p",
        text: "Simple place, simpler pace. Reducing distractions can help us connect to what really matters. With less underused space comes less to worry about and more time to spend on our well-being, like connecting with the outdoors and your surroundings.",
      },
      { type: "h", text: "4. More Efficient Systems:" },
      {
        type: "p",
        text: "For us at Leonaara, giving ourselves a size limit forced us to be efficient with our home layouts. We've focused on smarter storage, a more compact and efficient mechanical system for cooling, heating and air filtration, as well as greater attention given to material choices. With an emphasis on quality over size, we've been able to obsess over every detail of our homes.",
      },
      {
        type: "p",
        text: "Speaking of materials, we talk about using natural, climate-resilient ones like hemp and wood fiber insulation in our walls – but what does that mean for you? Catch it in the next Leonaara Letter to find out.",
      },
    ],
  },
  {
    date: "May 17, 2024",
    title: "Leonaara's Origin",
    img: "/media/2024/10/BASELETTER_IMG02-576x576.jpg",
    body: [
      { type: "p", text: "The first sketches of our signature model, the Leonaara I, date all the way back to 2017!" },
      {
        type: "p",
        text: "At the time, we began with a simple question: what does the next generation of homes look like for today's generation of home buyers? A second question quickly came to mind: how could we challenge outdated building conventions, while providing an adaptable, future-proofed living solution?",
      },
      { type: "image", src: "/media/2024/05/a5987f60-5e91-c1cf-e1a8-ec9f6994d30c-576x384.jpg", alt: "Early sketches from Leonaara I layouts, 2017" },
      { type: "caption", text: "SOME EARLY SKETCHES FROM LEONAARA I LAYOUTS FROM 2017." },
      {
        type: "p",
        text: "First, our proposition needed to align with our values: sustainability, efficiency, and purpose-built design. The world needed a solution that responded to the actual needs of the consumer – and it still does.",
      },
      {
        type: "p",
        text: "Early on, we started dreaming of an entire product line to address these issues, but we had to start small and build our way up. That's when the Leonaara I series was designed – the dream cabin in the woods coupled with turnkey sustainability. Infusing it with an innovative prefab approach, climate-resilient materials and local artisanship, would enable us to drive more impact and create an original offering.",
      },
      {
        type: "p",
        text: "Our vision of a larger product line eventually turned into the Leonaara Ecosystem: a sustainability toolkit of sorts, with building blocks to pick and chose from to assemble your dream project on land of your own. It's what we're building towards everyday.",
      },
      {
        type: "p",
        text: "The final thing we needed was a name. It didn't take long to land on Leonaara. Simple and to the point, it reminded us of the importance of building a strong foundation, of having a refuge to keep you safe, of getting back to basics.",
      },
    ],
  },
];

export const articles: Article[] = raw.map((a) => ({ ...a, slug: slugify(a.title) }));

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
