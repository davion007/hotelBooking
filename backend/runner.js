const num = [101, 
  102, 
  103, 
  104, 
  105, 
  106, 
  107,
  108, 
  201, 
  202, 
  203,
  204,
  205, 
  206, 
  207,
  208,
  209,
  210, 
  211, 
  212, 
  301,
  302, 
  303, 
  304, 
  305, 
  306, 
  307, 
  308, 
  309, 
  310,
  311,
  312
]

  const str = `INSERT INTO public."RoomImage" (r_no, image_url) VALUES `
  const run = ()=> {
    for(let i= 0; i<num.length; i++) {
        console.log(`${str} (${num[i]}, 'roomimage/${i}');`)
    }
  }

  const run2=()=> {
    const cno = [12008, 12036, 12037, 12090, 12098, 12128, 12146, 12147, 12175, 12186, 12193, 12194, 12205, 12218, 12284, 12298, 12401, 12404, 12425, 12433, 12454, 12473, 12489, 12528, 12538, 12563, 12570, 12573, 12576, 12596, 12669, 12684, 12717, 12718, 12723, 12745, 12752, 12790, 12801, 12818, 12874, 12908, 12920, 12931, 12932, 12953]
    for(let i = 0 ; i<cno.length; i++) {
        console.log(`INSERT INTO public."UserPassword" (c_no, password) VALUES (${cno[i]}, '12345');`)
    }
}

  run2();

  const run3 = () => {
    const viewFacilities = [
        "Panoramic Vista Lounge",
        "Skyline Observation Deck",
        "Mountain Majesty Retreat",
        "Riverside Serenity Spa",
        "City Lights Dining Room",
        "Garden Oasis Terrace",
        "Valley View Suites",
        "Lakeside Zen Pool",
        "Aerial Adventure Fitness Center",
        "Safari Sunset Balconies",
        "Oceanfront Bliss Lounge",
        "Sunset Horizon Bar",
        "Forest Haven Spa",
        "Tropical Paradise Dining Pavilion",
        "Harbor View Terrace",
        "Countryside Tranquility Suites",
        "Desert Mirage Pool",
        "Starlit Stargazing Deck",
        "Island Oasis Kids Club",
        "Aurora Borealis Ballroom"
      ];

      const run = ()=> {
        const random
        for(let i= 0; i<num.length; i++) {
            console.log(`${str} (${num[i]}, 'roomimage/${i}');`)
        }
    }
  }