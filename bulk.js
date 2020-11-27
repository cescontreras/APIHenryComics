const categories = [
  {
      "name":"Crime",
      "description":"Series con un abordamiento oscuro de la sociedad."
  },
  {
      "name":"Superheroes",
      "description":"Seguí a tus personajes favoritos a combatir el crimen."
  },
  {
      "name":"Drama",
      "description":"Historias que te emociorán hasta los huesos."
  },
  {
      "name":"Acción",
      "description":"Sentí toda la adrenalina que envuelven a estas historias."
  },
  {
      "name":"Horror",
      "description":"Historias tenebrosas y perturbadoras, no aptas para todos."
  },
  {
      "name":"Comedia",
      "description":"Diversión asegurada."
  },
  {
      "name":"Aventura",
      "description":"Acompaña a tus personajes, a una maravillosa y atrapante aventura"
  }
]

const products = [
  {
      "categoria": "crime, superheroes",
      "collection": "max",
      "serie": "jessica jones",
      "name": "Alias (2001-2003) #1".toLowerCase(),
      "price":125,
      "stock":20,
      "year": 2001,
      "author": "brian michael bendis",
      "description": "Meet Jessica Jones, a former costumed super hero who, in fact, stunk at it. With powers unremarkable in comparison to the great icons of Marvel, Jessica never found her niche. But once she hung up her cape, she was surprised at how quickly she fell out of the spandex loop. Sure, she may hang out with some of the Avengers socially, but she`s not welcome in Avengers Mansion. And she feels the rejection. She's self-destructive, drinks too much, and has a huge inferiority complex. And did we mention that she's now a Private Investigator who specializes in cases of the super human variety? So if you're thirsty for the film noir feel and complex characterization, grab a stool at the bar!"
  },
  {
      "categoria": "superheroes",
      "collection": "marvel",
      "serie": "angela",
      "name": "Angela: Queen of Hel - Journey To The Funderworld".toLowerCase(),
      "price":125,
      "stock":20,
      "year": 2016,
      "author": "marguerite bennett",
      "description": "Hel hath a new fury! She was stolen from Asgard, exiled from Heven and robbed of her greatest companion — now Angela plunges into the blackest depths to save Sera. But once there, the lost princess will claim a throne of her own. To rescue her beloved, Angela must conquer this domain and rewrite laws as old as death! All hail Angela, the new Queen of Hel?! Not if the old one, Hela, has anything to say about it! And they aren't the only monarchs in the mix — an ancient evil known as the Faustian Queen plans to reimagine the world into a fable of her own making! Perhaps the new Thor could lend a hand — and a hammer — to this underworld uprising! Follow the Guardian Angel as she falls all the way to Hel! Collecting"
  },
  {
      "categoria": "superheroes",
      "collection": "marvel",
      "serie": "pet avengers",
      "name": "Lockjaw and the Pet Avengers".toLowerCase(),
      "price":200,
      "stock":20,
      "year": 2015,
      "author": "hris eliopolus",
      "description": "And there came a day, a day unlike any other, when Earth's mightiest heroes were unaware of a threat greater than all of them could handle. And on that day, a teleporting puppy scoured the world to assemble a team of animals to fight the foes no single beast could withstand! Strap on your collar and hop onboard the adventures of Lockjaw, Lockheed, Redwing, Hairball and an all-new Frog Thor!"
  },
  {
      "categoria": "gore,superheroes, drama",
      "collection": "dynamite",
      "serie": "the boys",
      "name": "The Boys Omnibus Vol. 1".toLowerCase(),
      "price":150,
      "stock":20,
      "year": 2019,
      "author": "garth ennis",
      "description": "All-new printing collecting the first 14 issues of the critically acclaimed series, now heading to live-action on Amazon Prime! This is going to hurt! In a world where costumed heroes soar through the sky and masked vigilantes prowl the night, someone's got to make sure the 'supes' don't get out of line. And someone will! Billy Butcher, Wee Hughie, Mother's Milk, The Frenchman, and The Female are The Boys: A CIA-backed team of very dangerous people, each one dedicated to the struggle against the most dangerous force on Earth - superpower! Some superheroes have to be watched. Some have to be controlled. And some of them - sometimes - need to be taken out of the picture. That's when you call in The Boys! After the opening story arc introducing Hughie to the team (issues 1-6), Dark avenger Tek-Knight and his ex-partner Swingwing are in trouble (issues 7-14). Big trouble. One has lost control of his terrifyingly overactive sex-drive, and the other might just be a murderer. It's up to Hughie and Butcher to work out which is which, in Get Some. Then, in Glorious Five-Year Plan, The Boys travel to Russia - where their corporate opponents are working with the mob, in a super-conspiracy that threatens to spiral lethally out of control. Good thing our heroes have Love Sausage on their side. Featuring some ever-so-slight tweaks the creators have meticulously restored, The Boys Omniobus Volume 1 also features bonus art materials, the script to issue #1 by Garth Ennis, a complete cover gallery, and more!"
  },
  {
      "categoria": "action, superheroes",
      "collection": "dark hose",
      "serie": "umbrella academy",
      "name": "Umbrella Academy Vol. 1: Apocalypse Suite".toLowerCase(),
      "price":150,
      "stock":20,
      "year": 2008,
      "author": "gerard way",
      "description": "In an inexplicable worldwide event, forty-three extraordinary children were spontaneously born by women who'd previously shown no signs of pregnancy. Millionaire inventor Reginald Hargreeves adopted seven of the children; when asked why, his only explanation was, To save the world."
  },
  {
      "categoria": "horror, zombies, gore",
      "collection":"skybound",
      "serie": "the walking dead",
      "name": "The Walking Dead #1".toLowerCase(),
      "price":250,
      "stock":20,
      "year": 2009,
      "author": "robert kirkman",
      "description": "Rick Grimes, Sheriff of a small town in Kentucky awakes in a hospital. Comatose after being shot while on duty, Rick finds the world abandoned of all things living and is faced with walking undead, who attack him on sight. He returns home to find his family, son Carl and wife Lori, gone. He meets his new neighbor, who points him towards Atlanta. After retrieving supplies from the abandoned Police Station, Rick sets off to Atlanta to search for his family."
  },
  {
      "categoria": "accion, aventura,superheroes",
      "collection": "idw publishing",
      "serie": "tortuninjas",
      "name": "Teenage Mutant Ninja Turtles #1".toLowerCase(),
      "price":200,
      "stock":20,
      "year": 2011,
      "author":"kevin b. eastman",
      "description": "They're BACK! This summer, the original heroes in a half-shell make a triumphant return to comics! Leonardo, Donatello, Michelangelo, and Raphael reunite to bring their ninja aptitude and teenage attitude to IDW Publishing in this all-new, action-packed series. Featuring a cast of familiar characters-Master Splinter, April O'Neill, Casey Jones, and more-and true to the spirit of the original comics created by Kevin Eastman and Peter Laird, the TEENAGE MUTANT NINJA TURTLES are bigger and badder than ever, and ready to rock old and new fans alike!"
  },
  {
      "categoria": "crime,pulp,superheroes",
      "collection": "dc",
      "serie": "batman",
      "name": "Batman Black & White: A Black and White World".toLowerCase(),
      "price":300,
      "stock":20,
      "year": 2010,
      "author": "neil gaiman",
      "description": "Acclaimed author Neil Gaiman (THE SANDMAN, American Gods) and eye-popping artist Simon Bisley (LOBO) deliver a make-believe story spotlighting the struggle between Batman and The Joker - only this time, they're re-cast as actors starring in a film-like, comic book production!"
  },
  {
      "categoria": "superheroes",
      "collection": "valiant",
      "serie": "bloodshot",
      "name":"Harbinger Wars #1".toLowerCase(),
      "price":150,
      "stock":20,
      "year": 2013,
      "author":"joshua dysart",
      "description":"HARBINGER WARS, Valiant's first family crossover event, begins here! A decades-old secret is about to put BLOODSHOT and HARBINGER on an inescapable collision course -- and, soon, the most powerful forces in the Valiant Universe will be drawn into a battle without sides, without rules, and without mercy."
  },
  {
      "categoria": "comedia, superheroes",
      "collection": "dc",
      "serie": "teen titans",
      "name": "Tiny Titans #1".toLowerCase(),
      "price":200,
      "stock":20,
      "year": 2008,
      "author": "franco aureliani",
      "description": "Sidekick Elemantary; Dog's Best Friend; Speedy Quiz Awwww yeah Titans! In this exciting first issue, see what life is like at Sidekick Elementary and meet the new staff! Follow the madness that ensues when Beast Boy gets a puppy friend! Witness what happens when the girls meet a pink stranger with a melted ice cream cone! Find out what makes Cassie such a trendsetter!"
  },
  {
      "categoria": "superheroes",
      "collection": "dc",
      "serie": "justice league",
      "name": "Injustice: Gods Among Us: Year Two (2014) #1".toLowerCase(),
      "price":300,
      "stock":20,
      "year": 2014,
      "author": "tom taylor",
      "description": "As the series returns, the Black Canary is still dealing with the death of Green Arrow. And Superman issues a threat."
  },
  {
      "categoria":"superheroes",
      "collection": "marver",
      "serie": "capitan america",
      "name": "Secret Empire #1".toLowerCase(),
      "price":300,
      "stock":20,
      "year": 2017,
      "author": "nick spencer",
      "description": "As Hydra puts their plans into action, Nick Spencer and Andrea Sorrentino bring you the opening salvo in a story that will rock the Marvel Universe and leave fans' jaws on the floor!"
  },
  {
      "categoria":"horror, ciencia ficcion, sobrenatural",
      "collection":"idw publishing",
      "serie": "x-files",
      "name": "The X-Files: Origins #1: Chapter One".toLowerCase(),
      "price":125,
      "stock":20,
      "year": 2016,
      "author":"jodie houser",
      "description":"Before the FBI, before the X-Files, they were just two teenagers in search of the truth. On Martha's Vineyard, a young Fox Mulder investigates something strange happening on the island, while in San Diego, 13-year-old Dana Scully looks into the shocking murder of her teacher. Two kids, two mysteries, one conspiracy that threatens the future of humanity."
  },
  {
      "categoria":"accion, aventura, fantasia, pulp",
      "collection":"dynamite",
      "serie": "red sonja",
      "price":125,
      "stock":20,
      "name": "Red Sonja: She-Devil With a Sword #0".toLowerCase(),
      "year": 2005,
      "author":"mike carey",
      "description":"Dynamite Entertainment launches with the crimson haired warrior goddess, Red Sonja!"
  },    
  {
      "categoria":"accion, aventura, militar, superheroes",
      "collection": "valiant",
      "serie": "bloodshot",
      "name": "Bloodshot #1".toLowerCase(),
      "price":150,
      "stock":20,
      "year": 2012,
      "author": "duane swierczynski",
      "description": "Your name is Angelo Mortalli. Your brother is trapped behind enemy lines and on the verge of-- no. That's not right. Your name is Raymond Garrison. You've retired from the dangers of the field, but a desperate plea from your oldest friend plunges you into a vicious firefight that-- no. That's not right, either. You are Bloodshot. You are the shade of gray that freedom requires. The perfect confluence of military necessity and cutting-edge technology. A walking WikiLeaks that is a reservoir of dirty secrets that could set the world on fire. And you've just been captured."
  },
  {
      "categoria": "superheroes",
      "collection": "marvel",
      "serie": "guardianes de la galaxia",
      "name": "Guardians Of The Galaxy #1".toLowerCase(),
      "price":300,
      "stock":20,
      "year": 2017,
      "author": "brian michael bendis",
      "description": "Star-Lord, Drax, Gamora, Rocket Raccoon and Groot head back to the stars just in time for their new ongoing series! That is, if they survive a run-in with the new Nova Corps!"
  }
]

module.exports={categories,products} 