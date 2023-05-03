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

//Niveau 1 (interraction 1v1)
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
  width: 16,
  height: 16,
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
    sprite("ogre"),
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

	//Dialogue entre Player et Ogre lorsqu'ils entrent en collision
	player.collides("ogre", () => {
		add([
		  text("Ogre: Hey toi, qui es-tu ?", 10),
		  pos(width() / 2, height() / 3),
		  origin("center"),
		]);
	
		add([
		  text("Joueur: Je suis un aventurier !", 10),
		  pos(width() / 2, height() / 2),
		  origin("center"),
		]);
	  });
	
	// Démarrez le jeu sur l'écran d'accueil
	go("home");