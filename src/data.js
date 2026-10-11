export const files = [
  {
    id: 'graphics',
    label: 'Case 01',
    title: 'Graphic Design',
    blurb: 'Carousels, posters and campaigns.',
    rot: -1.6, // card tilt in degrees
    works: [
      {
        title: 'Kora & Co. Brand Identity Campaign',
        tag: 'Campaign',
        year: '2025',
        role: 'Brand Identity Design',
        tools: 'Canva',
        description: 'Kora & Co. needed a brand identity that felt warm and playful and stayed consistent everywhere. I designed the logo in two versions (text and icon), a brand guide covering colour, typography and overall aesthetic, and templates for Instagram posts and product showcases. ',
        slides: [
          '/images/graphics/campaign-1/01.webp',
          '/images/graphics/campaign-1/02.webp',
          '/images/graphics/campaign-1/03.webp',
          '/images/graphics/campaign-1/04.webp',
          '/images/graphics/campaign-1/05.webp',
          '/images/graphics/campaign-1/06.webp',
        ],
      },
      {
        title: 'Logo Designs',
        tag: 'Logo design',
        year: '2026',
        role: 'Logo and brand mark design',        // fallback when a slide has no role
        tools: 'Affinity',                          // fallback when a slide has no tools
        description: 'A selection of logo work.',   // fallback when a slide has no description
        cover: '/images/graphics/logos/cover.webp', // optional. Leave this line out to use the first logo
        slides: [
          {
            src: '/images/graphics/logos/01.webp',
            title: 'Logo for Bold Agency',
            description: 'This is a bold, geometric logo for a creative agency, with a simple colour palette and a strong visual identity.',
            role: 'Logo design',
            tools: 'Affinity',
            year: '2026',
          },
          {
            src: '/images/graphics/logos/02.webp',
            title: 'Logo for Cloth World',
            description: 'This is a hand-drawn logo for a clothing brand, with a simple colour palette and a playful illustration.',
            role: 'Logo and brand colours',
            tools: 'Affinity',
            year: '2025',
          },
          {
            src: '/images/graphics/logos/03.webp',
            title: 'Logo for Davinci Illustrators',
            description: 'This is a simply defined, artful illutration for Davinci Illustrators, a printing and design company.',
            role: 'Logo design',
            tools: 'Affinity',
            year: '2025',
          },
          {
            src: '/images/graphics/logos/04.webp',
            title: 'Logo for D Photography',
            description: 'A minimalist logo for a photography business.',
            role: 'Logo design',
            tools: 'Affinity',
            year: '2025',
          },
        ],
      },
      {
        title: 'Holix Magazine Issue Designs',
        tag: 'Carousel',
        year: '2026',
        role: 'Concept, layout and illustration',
        tools: 'Canva',
        description:
          'I designed the visual layout and shaped the visual strategy for Holix magazine. These pages are drawn from several editions.',
        slides: [
          '/images/graphics/carousel-a/01.webp',
          '/images/graphics/carousel-a/02.webp',
          '/images/graphics/carousel-a/03.webp',
          '/images/graphics/carousel-a/04.webp',
        ],
      },
      {
        title: 'Carousel series: The Noire Space.',
        tag: 'Carousel',
        year: '2026',
        role: 'Art direction and layout',
        tools: 'Canva',
        description: 'Noire Space asked for a serious but artful social post that matched their earlier templates without losing its message. I took their copy and designed it to sit naturally alongside the existing pages.',
        slides: [
          '/images/graphics/carousel-b/01.webp',
          '/images/graphics/carousel-b/02.webp',
          '/images/graphics/carousel-b/03.webp',
          '/images/graphics/carousel-b/04.webp',
          '/images/graphics/carousel-b/05.webp',
          '/images/graphics/carousel-b/06.webp',
        ],
      },

      {
        title: 'Design Templates',
        tag: 'Posters',
        year: '2025-2026',
        role: 'Design',
        tools: 'Affinity, Canva',
        description: 'A collection of design templates that can be easily adapted or remodelled for different purposes.',
        cover: '/images/graphics/templates/cover.webp',
        slides: ['/images/graphics/templates/01.webp', '/images/graphics/templates/02.webp'],
       
      },
    ],
  },

  {
    id: 'ui',
    label: 'Case 02',
    title: 'UI/UX Design',
    blurb: 'Wireframes, flows and interfaces.',
    rot: 1.2,
    works: [
      {
        title: 'FOIA Practical Guide Site',
        tag: 'Website',
        year: '2026',
        role: 'Design and build in Framer',        // fallback if a slide has no role
        tools: 'Framer',                             // fallback if a slide has no tools
        description: 'An online guide to the Freedom of Information Act 2011, reached by scanning a QR code on a pocket guide.', // fallback
        link: 'https://foiacds.framer.website/', // the live site. The "View live" button appears when this is set
        cover: '/images/ui/foia-guide/cover.webp',  // grid tile image: your strongest mobile screen

        slides: [

          {
            src: '/images/ui/foia-guide/01.webp',
            title: 'Desktop landing',
            description: 'A breif welcome page with content buttons to help viewers navigate the guide. The page is designed to be clear and credible, with a simple layout and a colour palette that reflects the Act\'s official nature.',
            role: 'Layout and mobile design',
            tools: 'Framer',
            year: '2026',
          },
          {
            src: '/images/ui/foia-guide/02.webp',
            title: 'Mobile-First Landing',
            description: 'A mobile-first approach to presenting the Freedom of Information Act 2011 guide, ensuring a seamless experience on smaller screens.',
            role: 'Content structure and layout',
            tools: 'Framer',
            year: '2026',
          },

          {
            src: '/images/ui/foia-guide/03.webp',
            title: 'Call to action',
            description: 'A clear call to action for users to fill an interest form to receive updates and participate in an online virtual panel discussion.',
            role: 'Interaction design',
            tools: 'Framer',
            year: '2026',
          },
        ],
      },
      {
        title: 'Ownlet',
        tag: 'UI design',
        year: '2026',
        role: 'UI/UX design',                         // fallback if a slide has no role
        tools: 'Figma',                                // fallback if a slide has no tools
        description: 'A property listing platform for Abuja where owners list directly and renters browse verified listings, with no agents in between.', // fallback
        link: '',                                      // leave '' to hide the "View live" button
        cover: '/images/ui/ownlet/cover.webp',         // grid tile image: your overview board or the landing page

        slides: [
          {
            src: '/images/ui/ownlet/01.webp',
            title: 'Landing page',
            description: 'The page leads with the product\'s promise: homes from verified owners, no agents, no scams. A search bar and a row of trust figures sit right under the headline, so a renter understands the offer before they scroll.',
            role: 'Landing page design',
            tools: 'Figma',
            year: '2026',
          },
          {
            src: '/images/ui/ownlet/02.webp',
            title: 'Browsing and property detail',
            description: 'Renters open a listing to see the full picture: a large photo gallery, price, location, amenities, a map and similar homes. The owner\'s verified badge and contact buttons sit beside the details, so trust is part of the decision.',
            role: 'Listing and detail page design',
            tools: 'Figma',
            year: '2026',
          },

          {
            src: '/images/ui/ownlet/03.webp',
            title: 'Landlord sign-up',
            description: 'The sign-up screen opens with what landlords get: list your property, reach verified renters, no middlemen. The form beside it is short, so starting takes only a moment.',
            role: 'Sign-up screen design',
            tools: 'Figma',
            year: '2026',
          },
          {
            src: '/images/ui/ownlet/04.webp',
            title: 'Listing a property',
            description: 'Landlords list a property through a stepped form: basic information, then photos, then an amenities checklist. Splitting a long task into steps keeps it from feeling long.',
            role: 'Form and flow design',
            tools: 'Figma',
            year: '2026',
          },

        ],
      },
    ],
  },

  {
    id: 'frontend',
    label: 'Case 03',
    title: 'Front-end',
    blurb: 'Interfaces I designed and built in code.',
    rot: -0.8,
    works: [
      {
        title: 'Raising Achievers Academy',
        tag: 'Web app',
        year: '2026',
        role: 'Design and front-end build',        // fallback if a slide has no role
        tools: 'Next.js, Supabase, Vercel',          // fallback if a slide has no tools
        description: 'A User-friendly school website suitable for non-technical users', // fallback
        link: 'https://raising-achievers.vercel.app/',                                    // paste the live URL, or leave '' to hide the button
        cover: '/images/frontend/raa/cover.webp',    // grid tile image: your most polished screen (homepage or admissions landing)

        slides: [
          {
            src: '/images/frontend/raa/01.webp',
            title: 'The problem and the users',
            description: 'An easy to use platform for the admin to take applications for students, store their information, and upload their results. And for parents with limited technical knowledge to be able to apply for their children and view their results.',
            role: 'Design and front-end build',
            tools: 'Next.js, Supabase, Vercel',
            year: '2026',
          },
          {
            src: '/images/frontend/raa/02.webp',
            title: 'Admissions flow',
            description: 'A simple admissions form that simplifies application for parents and streamlines review for admins.',
            role: 'Flow design and build',
            tools: 'Next.js, Supabase',
            year: '2026',
          },
          {
            src: '/images/frontend/raa/03.webp',
            title: 'Parent dashboard',
            description: 'A dashboard for parents to view their children\'s results and download their report cards.',
            role: 'Parent login and results view',
            tools: 'Next.js, Supabase auth',
            year: '2026',
          },
        ],
      },

      {
        title: 'Typing Speed Test',
        tag: 'Web app',
        year: '2026',
        role: 'Design and build',
        tools: 'HTML, CSS, JavaScript',
        description: 'A simple and engaging typing speed test application.',
        slides: ['/images/frontend/typing/01.webp', '/images/frontend/typing/02.webp', '/images/frontend/typing/03.webp'],
        link: 'https://pretty-ginger.github.io/Typing-speed-test/',
      },
    ],
  },
];

export const skills = [
  {
    area: 'Graphic design',
    skills: ['Brand identity', 'Carousel and social design', 'Posters and campaigns', 'Typography'],
    tools: ['Canva', 'Affinity'],
  },
  {
    area: 'UI/UX design',
    skills: ['Wireframing', 'User flows', 'Prototyping', 'Responsive layouts'],
    tools: ['Figma'],
  },
  {
    area: 'Front-end',
    skills: ['HTML, CSS, JavaScript', 'Motion with GSAP', 'Design systems in code'],
    tools: ['Vite', 'GSAP', 'Framer'],
  },
];