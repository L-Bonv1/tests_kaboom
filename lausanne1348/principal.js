//Charger kaboom (https://3000.kaboomjs.com/)
kaboom({
	width: 800,
	height: 800,
	background: [0, 0, 0],
});

// Charger la feuille de sprite et l'ajouter
loadSpriteAtlas("assets/dungeon.png", "assets/dungeon.json");

// Charger les sprites individuellement
loadSprite("Ecran accueil", "assets/Ecran accueil.png");
loadSprite("Transition", "assets/Transition 1.png");
loadSprite("Level 1", "assets/Level 1.png");
loadSprite("Docteur", "assets/Docteur.png");
loadSprite("Lampadaire 1", "assets/Lampadaire 1.png");
loadSprite("Lampadaire 2", "assets/Lampadaire 2.png");
loadSprite("Fontaine", "assets/Fontaine.png");
loadSprite("Arbre", "assets/Arbre.png");
loadSprite("Toit1", "assets/Toit1.png");
loadSprite("Maison1", "assets/Maison1.png");
loadSprite("Maison2", "assets/Maison2.png");
loadSprite("BordD", "assets/BordD.png");
loadSprite("BordB", "assets/BordB.png");
loadSprite("BordG", "assets/BordG.png");
loadSprite("BordH", "assets/BordH.png");
loadSprite("Pavés1", "assets/Pavés1.png");
loadSprite("Pavés2", "assets/Pavés2.png");
loadSprite("Moine Peste", "assets/Moine Peste.png");
loadSprite("Mère Enfant Peste", "assets/Mère Enfant Peste.png")

//Charger les fichiers audio
loadSound("Musique Transition 1", "assets/Transition 1.mp3")

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
		text("Bienvenue à Lausanne", 10),
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
		go("Level 1");
	});
});

//Level 1 (interraction 1v1)
scene("Level 1", () => {
  add([
    sprite("Level 1"),
    pos(width() / 2, height() / 2),
    anchor("center"),
  ]);
  const player = add([
    sprite("hero"),
    pos(582, 478),
    scale(2),
    area({ width: 2, height: 2 }),
    body(),
  ]);
  const Docteur = add([
    sprite("Docteur"),
    pos(430, 410),
    scale(2.5),
    area({ width: 2, height: 2 }),
    body({ isStatic: true }),
  ]);
  const Moine = add([
    sprite("Moine Peste"),
    pos(200, 500),
    scale(2.8),
    area({ width: 2, height: 2 }),
    body({ isStatic: true }),
  ]);
  const Mère = add([
    sprite("Mère Enfant Peste"),
    pos(500, 200),
    scale(2.9),
    area({ width: 2, height: 2 }),
    body({ isStatic: true }),
  ]);
  const Lampadaire = add([
    sprite("Lampadaire 1"),
    pos(525, 300),
    scale(0.9),
    area({ width: 2, height: 2 }),
  ]);
  const Lampadaire2 = add([
    sprite("Lampadaire 2"),
    pos(377, 450),
    scale(0.9),
    area({ width: 2, height: 2 }),
  ]);
  const Fontaine = add([
    sprite("Fontaine"),
    pos(545, 538),
    scale(0.9),
    area({ width: 2, height: 2 }),
    body({ isStatic: true }),
  ]);
  const Arbre = add([
    sprite("Arbre"),
    pos(310, 600),
    scale(1),
    area({ width: 2, height: 2 }),
  ]);
  const Toit1 = add([
    sprite("Toit1"),
    pos(160, 595),
    scale(1),
    area({ width: 2, height: 2 }),
	body({ isStatic: true }),
  ]);
  const Maison1 = add([
    sprite("Maison1"),
    pos(160, 105),
    scale(0.9),
    area({ width: 2, height: 2 }),
	body({ isStatic: true }),
  ]);
  const Maison2 = add([
    sprite("Maison2"),
    pos(400, 105),
    scale(0.9),
    area({ width: 2, height: 2 }),
	body({ isStatic: true }),
  ]);
  const BordD = add([
    sprite("BordD"),
    pos(630, 105),
    scale(0.9),
    area({ width: 2, height: 2 }),
	body({ isStatic: true }),
  ]);
  const BordB = add([
    sprite("BordB"),
    pos(155, 690),
    scale(0.9),
    area({ width: 2, height: 2 }),
	body({ isStatic: true }),
  ]);
  const BordG = add([
    sprite("BordG"),
    pos(145, 100),
    scale(0.9),
    area({ width: 2, height: 2 }),
	body({ isStatic: true }),
  ]);
  const BordH = add([
    sprite("BordH"),
    pos(155, 70),
    scale(0.9),
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

	//Dialogue et question à choix multiple entre Player et Docteur lorsqu'ils entrent en collision
	onCollide("Docteur", "player", () => {
			
	// Vérifie si les deux sprites se touchent
		if (player.x < Docteur.x + Docteur.width &&
		  player.x + player.width > Docteur.x &&
		  player.y < Docteur.y + Docteur.height &&
		  player.y + player.height > Docteur.y) {
		 
		  // Affiche les trois lignes de paroles de l'Docteur
		  console.log("Docteur : Mais... qui es-tu ? Quel est cet accoutrement ?");
		  console.log("Docteur : ... Je ne suis pas sûr de comprendre... tu viens de l'an du Seigneur 2050 ?");
		  console.log("Docteur : Peu importe pour l'instant! Peux-tu m'aider grâce aux connaissances de ton monde ?");
		  
		  // Pose une question à choix multiple à Player
		  console.log("Docteur : Sais-tu comment se protéger de l'épidémie de peste qui ravage Lausanne ?");
		  console.log("a) En retirant le mal du corps des victimes par des saignées");
		  console.log("b) En gardant ses distances avec la population et en se lavant régulièrement les mains avec de l'alcool");
		  
		  // Attend la réponse de Player
		  let response = prompt("Réponds avec 'a' ou 'b'");
		  
		  // Vérifie la réponse de Player et passage au niveau 2 si bonne réponse
		  if (response === "a") {
			console.log("Docteur : C'est déjà ce que nous faisons, mais les gens continuent de mourir...");
		  } else if (response === "b") {
			console.log("Docteur : Ton idée m'a l'air bonne... Vas parler à cette femme et son enfant, ton savoir pourrait l'intéresser !");
			nextLevel(); // appelle la fonction nextLevel() pour passer au niveau suivant	
		} else {
			console.log("Docteur : Je ne suis pas sûr de comprendre...");
		  }
		}
	  })

	// Démarrez le jeu sur l'écran d'accueil
	go("home");