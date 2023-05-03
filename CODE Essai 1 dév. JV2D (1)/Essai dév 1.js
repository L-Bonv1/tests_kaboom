//Charger kaboom (https://3000.kaboomjs.com/)
kaboom({
	width: 600,
	height: 600,
	background: [0, 0, 0],
});

// Charger la feuille de sprite et l'ajouter
loadSpriteAtlas("./dungeon.png", "./dungeon.json");

// Charger les sprites individuellement
loadSprite("Ecran accueil", "./Ecran accueil.png");
loadSprite("Transition", "./Transition 1.png");
loadSprite("Niveau 1", "./Niveau 1.png")
loadSprite("Pixel Pest", "./Pixel Pest.png")

//Charger les fichiers audio
loadSound("Ecran accueil", "./Ecran accueil.mp3")
loadSound("Musique Transition 1", "./Transition 1.mp3")

//Début du jeu + écran d'accueil
scene("home", () => { 
	add([
		sprite("Ecran accueil"),
		pos(width() / 1.7, height() / 2),
		anchor("center"),
	]);
	
	add([
		text("Appuyez sur espace", 10),
		pos(width() / 2, height() / 3),
		anchor("center"),
	]);
	add([
		text("pour voyager dans le temps", 10),
		pos(width() / 2, height() / 2),
		anchor("center"),
	]);
	
	onKeyPress("space", () => {
		go("transition");
	});
});

//Transition 1
scene("transition", () => {
	play("Musique Transition 1", {
		loop: true
	});
	
	add([
		sprite("Transition"),
		scale(2),
		pos(width() / 2, height() / 2),
		anchor("center"),
	]);
	
	add([
		text("Bienvenue à Lausanne.", 10),
		pos(width() / 2, height() / 5),
		anchor("center"),
	]);
	add([
		text("Une vieille pancarte est", 10),
		pos(width() / 2, height() / 2.5),
		anchor("center"),
	]);
	add([
		text("plantée là...", 10),
		pos(width() / 2, height() / 2.2),
		anchor("center"),
	]);
	add([
		text("-An du seigneur 1348-", 10),
		pos(width() / 2, height() / 1.8),
		anchor("center"),
	]);
	add([
		text("Entrez en ville avec Enter", 10),
		pos(width() / 2, height() / 1.3),
		anchor("center"),
	]);

	onKeyPress("enter", () => {
		go("Niveau 1");
	});
});

//NIVEAU 1 (interraction 1v1)
	//Ajout murs infranchissables
	const level = addLevel([
  "xxxxxxxxxxxxxxxxx",
  "x               x",
  "x               x",
  "x               x",
  "x               x",
  "x               x",
  "xxxxxxxxxxxxxxxxx",
], {
  tileWidth: 16,
  tileHeight: 16,
  "=": [sprite("wall"), area(), body({ isStatic: true })],
});

scene("Niveau 1", () => {
  add([
    sprite("Niveau 1"),
    pos(width() / 2, height() / 2),
    anchor("center"),
  ]);

  const player = add([
    sprite("hero"),
    pos(450, 300),
    scale(2),
    area({ width: 2, height: 2 }),
    body(),
  ]);

  const Ogre = add([
    sprite("Ogre"),
    pos(250, 120),
    scale(2),
    area({ width: 2, height: 2 }),
    body({ isStatic: true }),
  ]);
	
	// Vitesse de déplacement du joueur
	  const SPEED = 140;
	// Fonction de déplacement du joueur
	  function movePlayer(dir) {
		player.move(dir.scale(SPEED));
	  }
	// Déplacement du joueur avec les touches directionnelles
	  onKeyDown("left", () => {
		movePlayer(vec2(-1, 0));
	  });
	
	  onKeyDown("right", () => {
		movePlayer(vec2(1, 0));
	  });
	
	  onKeyDown("up", () => {
		movePlayer(vec2(0, -1));
	  });
	
	  onKeyDown("down", () => {
		movePlayer(vec2(0, 1));
	  });
	
	});

	//Dialogue et question à choix multiple entre Player et Ogre lorsqu'ils entrent en collision
	function checkCollision(sprite1, sprite2) {
		// Vérifie si les deux sprites se touchent
		if (sprite1.x < sprite2.x + sprite2.width &&
		  sprite1.x + sprite1.width > sprite2.x &&
		  sprite1.y < sprite2.y + sprite2.height &&
		  sprite1.y + sprite1.height > sprite2.y) {
		  
		  // Affiche les trois lignes de paroles de l'ogre
		  console.log("Ogre : Mais... qui es-tu ? Que fais-tu dehors ? C'est dangereux !");
		  console.log("Ogre : ... Je ne suis pas sûr de comprendre... tu viens de l'an du Seigneur 2050 ?");
		  console.log("Ogre : Peu importe pour l'instant! Peux-tu m'aider grâce aux connaissances de ton monde ?");
		  
		  // Pose une question à choix multiple à Player
		  console.log("Ogre : Sais-tu comment se protéger de l'épidémie de peste qui ravage Lausanne ?");
		  console.log("a) En retirant l'excès de bile noire par des saignées");
		  console.log("b) En confinant la population et en se lavant régulièrement les mains");
		  
		  // Attend la réponse de Player
		  let response = prompt("Réponds avec 'a' ou 'b'");
		  
		  // Vérifie la réponse de Player et passage au niveau 2 si bonne réponse
		  if (response === "a") {
			console.log("Ogre : C'est déjà ce que nous faisons, mais les gens continuent de mourir...");
		  } else if (response === "b") {
			console.log("Ogre : Ton idée m'a l'air bonne... Suis-moi !");
			nextLevel(); // appelle la fonction nextLevel() pour passer au niveau suivant	
		} else {
			console.log("Ogre : Je ne suis pas sûr de comprendre...");
		  }
		}
	  }
	
//NIVEAU 2 (interraction 1vFamille)
function nextLevel() {
	console.log("Passer au niveau suivant...");
	const level = addLevel([
		"xxxxxxxxxxxxxxxxx",
		"x               x",
		"x               x",
		"x               x",
		"x               x",
		"x               x",
		"xxxxxxxxxxxxxxxxx",
	  ], {
		tileWidth: 16,
		tileHeight: 16,
		"=": [sprite("wall"), area(), body({ isStatic: true })],
	  });	
	  // code pour afficher le niveau suivant
	  go("Niveau 2");  }

	// Démarrez le jeu sur l'écran d'accueil
	go("home");