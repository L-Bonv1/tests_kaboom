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
loadSprite("Niveau 1", "assets/Niveau 1.png");
loadSprite("Pixel Pest", "assets/Pixel Pest.png");
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
		go("Niveau 1");
	});
});

//NIVEAU 1 (interraction 1v1)
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

	//Dialogue et question à choix multiple entre Player et Ogre lorsqu'ils entrent en collision
	function checkCollision(player, ogre) {
		// Vérifie si les deux sprites se touchent
		if (player.x < ogre.x + ogre.width &&
		  player.x + player.width > ogre.x &&
		  player.y < ogre.y + ogre.height &&
		  player.y + player.height > ogre.y) {
		 
		  // Affiche les trois lignes de paroles de l'ogre
		  console.log("Ogre : Mais... qui es-tu ? Quel est cet accoutrement ?");
		  console.log("Ogre : ... Je ne suis pas sûr de comprendre... tu viens de l'an du Seigneur 2050 ?");
		  console.log("Ogre : Peu importe pour l'instant! Peux-tu m'aider grâce aux connaissances de ton monde ?");
		  
		  // Pose une question à choix multiple à Player
		  console.log("Ogre : Sais-tu comment se protéger de l'épidémie de peste qui ravage Lausanne ?");
		  console.log("a) En retirant le mal du corps des victimes par des saignées");
		  console.log("b) En gardant ses distances avec la population et en se lavant régulièrement les mains avec de l'alcool");
		  
		  // Attend la réponse de Player
		  let response = prompt("Réponds avec 'a' ou 'b'");
		  
		  // Vérifie la réponse de Player et passage au niveau 2 si bonne réponse
		  if (response === "a") {
			console.log("Ogre : C'est déjà ce que nous faisons, mais les gens continuent de mourir...");
		  } else if (response === "b") {
			console.log("Ogre : Ton idée m'a l'air bonne... Vas parler à cette femme et son enfant, ton savoir pourrait l'intéresser !");
			nextLevel(); // appelle la fonction nextLevel() pour passer au niveau suivant	
		} else {
			console.log("Ogre : Je ne suis pas sûr de comprendre...");
		  }
		}
	  }

	// Démarrez le jeu sur l'écran d'accueil
	go("home");