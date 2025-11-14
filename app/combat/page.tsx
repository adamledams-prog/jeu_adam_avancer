'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';

interface Position {
    x: number;
    y: number;
}

interface Velocity {
    x: number;
    y: number;
}

interface Projectile {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    damage: number;
    isPlayerProjectile: boolean;
    emoji: string;
    speed: number;
    lifetime: number;
}

interface Enemy {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    type: string;
    emoji: string;
    hp: number;
    maxHp: number;
    damage: number;
    alive: boolean;
    lastShot: number;
    shootCooldown: number;
    movePattern: 'chase' | 'circle' | 'random';
    speed: number;
    attackRange: number;
}

interface Obstacle {
    x: number;
    y: number;
    width: number;
    height: number;
    type: 'wall' | 'bush';
}

const ARENA_WIDTH = 800;
const ARENA_HEIGHT = 600;
const PLAYER_SIZE = 20;
const ENEMY_SIZE = 20;
const PROJECTILE_SIZE = 8;

export default function BrawlCombatPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameLoopRef = useRef<number>();
    const keysRef = useRef<Set<string>>(new Set());
    const mouseRef = useRef<Position>({ x: 0, y: 0 });
    const lastShotRef = useRef<number>(0);

    // État du jeu
    const [gameState, setGameState] = useState<'menu' | 'playing' | 'paused' | 'gameOver' | 'victory'>('menu');
    const [playerPos, setPlayerPos] = useState<Position>({ x: 60, y: ARENA_HEIGHT - 60 });
    const [playerHp, setPlayerHp] = useState(3000);
    const [playerMaxHp] = useState(3000);
    const [projectiles, setProjectiles] = useState<Projectile[]>([]);
    const [enemies, setEnemies] = useState<Enemy[]>([]);
    const [score, setScore] = useState(0);
    const [wave, setWave] = useState(1);
    const [trophees, setTrophees] = useState(1);
    const [timeLeft, setTimeLeft] = useState(20);
    const [gameStartTime, setGameStartTime] = useState<number>(0);
    const [isAttacking, setIsAttacking] = useState(false);
    const [lastAttackTime, setLastAttackTime] = useState(0);

    // Obstacles de l'arène - Beaucoup de petits murs
    const obstacles: Obstacle[] = [
        // Murs périphériques
        { x: 0, y: 0, width: ARENA_WIDTH, height: 20, type: 'wall' },
        { x: 0, y: ARENA_HEIGHT - 20, width: ARENA_WIDTH, height: 20, type: 'wall' },
        { x: 0, y: 0, width: 20, height: ARENA_HEIGHT, type: 'wall' },
        { x: ARENA_WIDTH - 20, y: 0, width: 20, height: ARENA_HEIGHT, type: 'wall' },
        
        // Beaucoup de petits murs dispersés (30x30 ou 40x20)
        { x: 150, y: 80, width: 30, height: 30, type: 'wall' },
        { x: 250, y: 120, width: 40, height: 20, type: 'wall' },
        { x: 350, y: 90, width: 30, height: 30, type: 'wall' },
        { x: 450, y: 110, width: 40, height: 20, type: 'wall' },
        { x: 550, y: 85, width: 30, height: 30, type: 'wall' },
        { x: 650, y: 115, width: 40, height: 20, type: 'wall' },
        
        { x: 100, y: 180, width: 30, height: 30, type: 'wall' },
        { x: 200, y: 210, width: 40, height: 20, type: 'wall' },
        { x: 320, y: 190, width: 30, height: 30, type: 'wall' },
        { x: 420, y: 220, width: 40, height: 20, type: 'wall' },
        { x: 520, y: 185, width: 30, height: 30, type: 'wall' },
        { x: 620, y: 205, width: 40, height: 20, type: 'wall' },
        { x: 700, y: 180, width: 30, height: 30, type: 'wall' },
        
        { x: 80, y: 280, width: 40, height: 20, type: 'wall' },
        { x: 180, y: 310, width: 30, height: 30, type: 'wall' },
        { x: 280, y: 290, width: 40, height: 20, type: 'wall' },
        { x: 380, y: 320, width: 30, height: 30, type: 'wall' },
        { x: 480, y: 285, width: 40, height: 20, type: 'wall' },
        { x: 580, y: 315, width: 30, height: 30, type: 'wall' },
        { x: 680, y: 295, width: 40, height: 20, type: 'wall' },
        
        { x: 120, y: 380, width: 30, height: 30, type: 'wall' },
        { x: 220, y: 410, width: 40, height: 20, type: 'wall' },
        { x: 340, y: 390, width: 30, height: 30, type: 'wall' },
        { x: 440, y: 420, width: 40, height: 20, type: 'wall' },
        { x: 540, y: 385, width: 30, height: 30, type: 'wall' },
        { x: 640, y: 405, width: 40, height: 20, type: 'wall' },
        
        { x: 160, y: 480, width: 40, height: 20, type: 'wall' },
        { x: 280, y: 510, width: 30, height: 30, type: 'wall' },
        { x: 400, y: 490, width: 40, height: 20, type: 'wall' },
        { x: 520, y: 520, width: 30, height: 30, type: 'wall' },
        { x: 640, y: 485, width: 40, height: 20, type: 'wall' },
    ];

    // Charger les trophées
    useEffect(() => {
        const savedTrophees = localStorage.getItem('playerTrophees');
        if (savedTrophees) {
            setTrophees(parseInt(savedTrophees));
        }
    }, []);

    // Démarrer une nouvelle vague
    const startWave = useCallback((waveNumber: number) => {
        const enemyCount = Math.min(3 + waveNumber, 6); // Moins d'ennemis
        const newEnemies: Enemy[] = [];

        for (let i = 0; i < enemyCount; i++) {
            const enemyTypes = [
                // Aliens au corps à corps - 3 coups pour les tuer (400 HP / 3 coups de 150 = 2 coups + 1 coup final)
                { type: 'Alien', emoji: '👽', hp: 400, damage: 300, speed: 1.8, cooldown: 0, pattern: 'chase' as const, range: 25 }, // Range de 25 = contact physique
            ];

            const enemyType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
            
            // Position dans les coins opposés au joueur (éviter coin bas gauche)
            let x, y;
            const corners = [
                { x: ARENA_WIDTH - 80, y: 50 },        // Coin haut droite
                { x: 50, y: 50 },                      // Coin haut gauche
                { x: ARENA_WIDTH - 80, y: ARENA_HEIGHT - 80 }, // Coin bas droite
                // On évite le coin bas gauche où spawn le joueur
            ];
            
            // Choisir un coin aléatoire parmi les 3 disponibles
            const cornerIndex = Math.floor(Math.random() * corners.length);
            const selectedCorner = corners[cornerIndex];
            
            // Ajouter un peu de variation autour du coin (+/- 30 pixels)
            x = selectedCorner.x + (Math.random() - 0.5) * 60;
            y = selectedCorner.y + (Math.random() - 0.5) * 60;
            
            // S'assurer qu'on reste dans les limites
            x = Math.max(50, Math.min(ARENA_WIDTH - 50, x));
            y = Math.max(50, Math.min(ARENA_HEIGHT - 50, y));

            newEnemies.push({
                id: i,
                x,
                y,
                vx: 0,
                vy: 0,
                type: enemyType.type,
                emoji: enemyType.emoji,
                hp: enemyType.hp + (waveNumber - 1) * 200,
                maxHp: enemyType.hp + (waveNumber - 1) * 200,
                damage: enemyType.damage + (waveNumber - 1) * 50,
                alive: true,
                lastShot: 0,
                shootCooldown: enemyType.cooldown,
                movePattern: enemyType.pattern,
                speed: enemyType.speed,
                attackRange: enemyType.range
            });
        }

        setEnemies(newEnemies);
    }, []);

    // Vérifier les collisions
    const checkCollision = useCallback((pos: Position, size: number) => {
        for (const obstacle of obstacles) {
            if (pos.x < obstacle.x + obstacle.width &&
                pos.x + size > obstacle.x &&
                pos.y < obstacle.y + obstacle.height &&
                pos.y + size > obstacle.y) {
                return true;
            }
        }
        return false;
    }, []);

    // Calculer la distance entre deux points
    const distance = (pos1: Position, pos2: Position) => {
        return Math.sqrt((pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2);
    };

    // Normaliser un vecteur
    const normalize = (vx: number, vy: number) => {
        const magnitude = Math.sqrt(vx * vx + vy * vy);
        if (magnitude === 0) return { x: 0, y: 0 };
        return { x: vx / magnitude, y: vy / magnitude };
    };

    // Tirer un projectile
    const shoot = useCallback((from: Position, to: Position, isPlayer: boolean) => {
        const angle = Math.atan2(to.y - from.y, to.x - from.x);
        const speed = 8;
        
        const newProjectile: Projectile = {
            id: Date.now() + Math.random(),
            x: from.x + PLAYER_SIZE / 2,
            y: from.y + PLAYER_SIZE / 2,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            damage: isPlayer ? 400 : 200,
            isPlayerProjectile: isPlayer,
            emoji: isPlayer ? '⚡' : '💥',
            speed,
            lifetime: 120 // frames
        };

        setProjectiles(prev => [...prev, newProjectile]);
    }, []);

    // Boucle de jeu principale
    const gameLoop = useCallback(() => {
        if (gameState !== 'playing') return;

        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        // Effacer le canvas
        ctx.clearRect(0, 0, ARENA_WIDTH, ARENA_HEIGHT);

        // Fond d'arène
        const gradient = ctx.createRadialGradient(ARENA_WIDTH/2, ARENA_HEIGHT/2, 0, ARENA_WIDTH/2, ARENA_HEIGHT/2, ARENA_WIDTH/2);
        gradient.addColorStop(0, '#2d5a87');
        gradient.addColorStop(1, '#1a365d');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, ARENA_WIDTH, ARENA_HEIGHT);

        // Dessiner les obstacles
        obstacles.forEach(obstacle => {
            ctx.fillStyle = obstacle.type === 'wall' ? '#4a5568' : '#38a169';
            ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            
            if (obstacle.type === 'wall') {
                ctx.strokeStyle = '#2d3748';
                ctx.lineWidth = 2;
                ctx.strokeRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
            }
        });

        // Mouvement du joueur
        let newPlayerPos = { ...playerPos };
        const playerSpeed = 3;

        if (keysRef.current.has('z') || keysRef.current.has('w') || keysRef.current.has('ArrowUp')) newPlayerPos.y -= playerSpeed;
        if (keysRef.current.has('s') || keysRef.current.has('ArrowDown')) newPlayerPos.y += playerSpeed;
        if (keysRef.current.has('q') || keysRef.current.has('a') || keysRef.current.has('ArrowLeft')) newPlayerPos.x -= playerSpeed;
        if (keysRef.current.has('d') || keysRef.current.has('ArrowRight')) newPlayerPos.x += playerSpeed;

        // Limites et collisions pour le joueur
        newPlayerPos.x = Math.max(20, Math.min(ARENA_WIDTH - PLAYER_SIZE - 20, newPlayerPos.x));
        newPlayerPos.y = Math.max(20, Math.min(ARENA_HEIGHT - PLAYER_SIZE - 20, newPlayerPos.y));

        if (!checkCollision(newPlayerPos, PLAYER_SIZE)) {
            setPlayerPos(newPlayerPos);
        }

        // Dessiner le joueur avec effet d'attaque
        ctx.font = '24px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        // Effet d'attaque
        if (isAttacking) {
            ctx.strokeStyle = '#ff6b6b';
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(newPlayerPos.x + PLAYER_SIZE/2, newPlayerPos.y + PLAYER_SIZE/2, 50, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        ctx.fillText(isAttacking ? '🗡️' : '🤠', newPlayerPos.x + PLAYER_SIZE/2, newPlayerPos.y + PLAYER_SIZE/2);

        // Barre de vie du joueur
        const hpBarWidth = 40;
        const hpBarHeight = 6;
        ctx.fillStyle = '#e53e3e';
        ctx.fillRect(newPlayerPos.x, newPlayerPos.y - 15, hpBarWidth * (playerHp / playerMaxHp), hpBarHeight);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.strokeRect(newPlayerPos.x, newPlayerPos.y - 15, hpBarWidth, hpBarHeight);

        // Mettre à jour et dessiner les ennemis
        setEnemies(prev => prev.map(enemy => {
            if (!enemy.alive) return enemy;

            const distToPlayer = distance(enemy, newPlayerPos);
            let newX = enemy.x;
            let newY = enemy.y;

            // IA des ennemis - correction du bug de collision
            if (enemy.movePattern === 'chase') {
                const direction = normalize(newPlayerPos.x - enemy.x, newPlayerPos.y - enemy.y);
                const tentativeX = enemy.x + direction.x * enemy.speed;
                const tentativeY = enemy.y + direction.y * enemy.speed;
                
                // Vérifier les collisions séparément pour X et Y
                const canMoveX = !checkCollision({ x: tentativeX, y: enemy.y }, ENEMY_SIZE) && 
                                tentativeX >= 20 && tentativeX <= ARENA_WIDTH - ENEMY_SIZE - 20;
                const canMoveY = !checkCollision({ x: enemy.x, y: tentativeY }, ENEMY_SIZE) && 
                                tentativeY >= 20 && tentativeY <= ARENA_HEIGHT - ENEMY_SIZE - 20;
                
                // Bouger dans les directions possibles
                if (canMoveX) {
                    newX = tentativeX;
                }
                if (canMoveY) {
                    newY = tentativeY;
                }
                
                // Si bloqué, essayer de contourner l'obstacle
                if (!canMoveX && !canMoveY) {
                    // Essayer de bouger perpendiculairement
                    const perpX = enemy.x + (-direction.y) * enemy.speed;
                    const perpY = enemy.y + direction.x * enemy.speed;
                    if (!checkCollision({ x: perpX, y: perpY }, ENEMY_SIZE) && 
                        perpX >= 20 && perpX <= ARENA_WIDTH - ENEMY_SIZE - 20 &&
                        perpY >= 20 && perpY <= ARENA_HEIGHT - ENEMY_SIZE - 20) {
                        newX = perpX;
                        newY = perpY;
                    }
                }
            }

            // Mettre à jour la position finale
            enemy.x = newX;
            enemy.y = newY;

            // Combat au corps à corps - dégâts si l'alien touche le joueur
            if (distToPlayer < enemy.attackRange) {
                const now = Date.now();
                if (now - enemy.lastShot > 1000) { // Cooldown de 1 seconde entre les attaques
                    setPlayerHp(prev => Math.max(0, prev - enemy.damage));
                    enemy.lastShot = now;
                }
            }

            return enemy;
        }));

        // Dessiner les ennemis
        enemies.forEach(enemy => {
            if (!enemy.alive) return;

            ctx.font = '20px Arial';
            ctx.fillText(enemy.emoji, enemy.x + ENEMY_SIZE/2, enemy.y + ENEMY_SIZE/2);

            // Barre de vie de l'ennemi
            const hpBarWidth = 30;
            const hpBarHeight = 4;
            ctx.fillStyle = '#e53e3e';
            ctx.fillRect(enemy.x, enemy.y - 10, hpBarWidth * (enemy.hp / enemy.maxHp), hpBarHeight);
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 1;
            ctx.strokeRect(enemy.x, enemy.y - 10, hpBarWidth, hpBarHeight);
        });

        // Mettre à jour et dessiner les projectiles
        setProjectiles(prev => {
            const updatedProjectiles = prev.map(proj => ({
                ...proj,
                x: proj.x + proj.vx,
                y: proj.y + proj.vy,
                lifetime: proj.lifetime - 1
            })).filter(proj => {
                // Retirer les projectiles expirés ou hors limites
                if (proj.lifetime <= 0 || 
                    proj.x < 0 || proj.x > ARENA_WIDTH || 
                    proj.y < 0 || proj.y > ARENA_HEIGHT) {
                    return false;
                }

                // Vérifier les collisions avec les obstacles
                if (checkCollision({ x: proj.x, y: proj.y }, PROJECTILE_SIZE)) {
                    return false;
                }

                return true;
            });

            // Dessiner les projectiles
            updatedProjectiles.forEach(proj => {
                ctx.font = '12px Arial';
                ctx.fillText(proj.emoji, proj.x, proj.y);
            });

            return updatedProjectiles;
        });

        // Attaque du joueur avec la touche A
        if (keysRef.current.has('a') && !isAttacking) {
            const now = Date.now();
            if (now - lastAttackTime > 500) { // Cooldown de 0.5 seconde
                setIsAttacking(true);
                setLastAttackTime(now);
                
                // Chercher les ennemis dans un rayon d'attaque
                setEnemies(prev => prev.map(enemy => {
                    if (!enemy.alive) return enemy;
                    
                    const distToEnemy = distance(newPlayerPos, { x: enemy.x, y: enemy.y });
                    if (distToEnemy < 50) { // Portée d'attaque de 50 pixels
                        const newHp = Math.max(0, enemy.hp - 150); // 150 dégâts par coup
                        
                        if (newHp <= 0) {
                            setScore(s => s + 100);
                            return { ...enemy, alive: false, hp: 0 };
                        }
                        
                        return { ...enemy, hp: newHp };
                    }
                    return enemy;
                }));
                
                // Arrêter l'animation d'attaque après 200ms
                setTimeout(() => setIsAttacking(false), 200);
            }
        }

        // Plus de tir automatique - combat au corps à corps uniquement

        // Plus de nouvelles vagues - un seul round de survie

        // Gestion du timer
        const currentTime = Date.now();
        const elapsedSeconds = Math.floor((currentTime - gameStartTime) / 1000);
        const newTimeLeft = Math.max(0, 20 - elapsedSeconds);
        setTimeLeft(newTimeLeft);
        
        // Vérifier si le joueur a gagné (survécu 20 secondes)
        if (newTimeLeft <= 0 && gameState === 'playing') {
            setGameState('victory');
            // Bonus de victoire
            const victoryBonus = 500;
            setScore(prev => prev + victoryBonus);
            const newTrophees = trophees + Math.floor((score + victoryBonus) / 50) + 10; // Bonus de trophées pour la victoire
            setTrophees(newTrophees);
            localStorage.setItem('playerTrophees', newTrophees.toString());
            return;
        }
        
        // Vérifier si le joueur est mort
        if (playerHp <= 0) {
            setGameState('gameOver');
            // Sauvegarder les trophées gagnés
            const newTrophees = trophees + Math.floor(score / 100);
            setTrophees(newTrophees);
            localStorage.setItem('playerTrophees', newTrophees.toString());
        }

        gameLoopRef.current = requestAnimationFrame(gameLoop);
    }, [gameState, playerPos, playerHp, enemies, projectiles, shoot, checkCollision, startWave, wave, score, trophees, playerMaxHp]);

    // Démarrer le jeu
    useEffect(() => {
        if (gameState === 'playing' && !gameLoopRef.current) {
            gameLoopRef.current = requestAnimationFrame(gameLoop);
        }
        return () => {
            if (gameLoopRef.current) {
                cancelAnimationFrame(gameLoopRef.current);
                gameLoopRef.current = undefined;
            }
        };
    }, [gameState, gameLoop]);

    // Gestion des événements clavier
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ajouter la touche telle quelle pour les flèches, en minuscules pour les lettres
            if (e.key.startsWith('Arrow')) {
                keysRef.current.add(e.key);
            } else {
                keysRef.current.add(e.key.toLowerCase());
            }
            
            if (e.key === ' ') {
                e.preventDefault();
                if (gameState === 'playing') {
                    setGameState('paused');
                } else if (gameState === 'paused') {
                    setGameState('playing');
                }
            }
            
            // Empêcher le défilement de la page avec les flèches
            if (e.key.startsWith('Arrow')) {
                e.preventDefault();
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            // Retirer la touche de la même manière qu'elle a été ajoutée
            if (e.key.startsWith('Arrow')) {
                keysRef.current.delete(e.key);
            } else {
                keysRef.current.delete(e.key.toLowerCase());
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [gameState]);

    // Gestion de la souris
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };

        const handleMouseDown = () => {
            keysRef.current.add('mouse');
        };

        const handleMouseUp = () => {
            keysRef.current.delete('mouse');
        };

        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mouseup', handleMouseUp);

        return () => {
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    // Démarrer le jeu
    const startGame = () => {
        setGameState('playing');
        // Position de spawn sûre (coin bas gauche de l'arène, loin des obstacles)
        setPlayerPos({ x: 60, y: ARENA_HEIGHT - 60 });
        setPlayerHp(playerMaxHp);
        setProjectiles([]);
        setScore(0);
        setWave(1);
        setTimeLeft(20);
        setGameStartTime(Date.now());
        startWave(1);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center p-4">
            {/* Bouton retour */}
            <Link
                href="/"
                className="absolute top-4 left-4 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all z-10"
            >
                <span>←</span>
                <span>Retour</span>
            </Link>

            {/* HUD */}
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white p-4 rounded-lg z-10">
                <div className="flex items-center gap-4 text-sm">
                    <div>🏆 {trophees}</div>
                    <div className={`⏰ ${timeLeft <= 5 ? 'text-red-400 font-bold animate-pulse' : 'text-yellow-400'}`}>⏰ {timeLeft}s</div>
                    <div>🎯 Score: {score}</div>
                    <div>❤️ {playerHp}/{playerMaxHp}</div>
                </div>
            </div>

            {/* Menu principal */}
            {gameState === 'menu' && (
                <div className="text-center">
                    <h1 className="text-6xl font-bold text-white mb-4">⚔️ BRAWL COMBAT ⚔️</h1>
                    <p className="text-xl text-white/80 mb-4">Combat en temps réel style Brawl Stars !</p>
                    <p className="text-lg text-yellow-300 mb-4 font-bold">🎯 OBJECTIF: Survivez 20 secondes pour gagner!</p>
                    <p className="text-sm text-blue-300 mb-8">🏃 Les ennemis spawnent dans les coins opposés</p>
                    <button
                        onClick={startGame}
                        className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-xl text-2xl transition-all transform hover:scale-105"
                    >
                        🚀 COMMENCER
                    </button>
                    <div className="mt-8 text-white/60 text-sm">
                        <p>🎮 ZQSD/WASD ou ↑←↓→ pour bouger</p>
                        <p>⚔️ A pour attaquer au corps à corps</p>
                        <p>⏸️ Espace pour pause</p>
                        <p>🎯 3 coups pour éliminer un alien</p>
                    </div>
                </div>
            )}

            {/* Jeu en pause */}
            {gameState === 'paused' && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                    <div className="bg-gray-900 text-white p-8 rounded-xl text-center">
                        <h2 className="text-3xl font-bold mb-4">⏸️ PAUSE</h2>
                        <p className="mb-6">Appuyez sur Espace pour continuer</p>
                        <button
                            onClick={() => setGameState('playing')}
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg mr-4"
                        >
                            ▶️ Continuer
                        </button>
                        <button
                            onClick={() => setGameState('menu')}
                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg"
                        >
                            🏠 Menu
                        </button>
                    </div>
                </div>
            )}

            {/* Victoire */}
            {gameState === 'victory' && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                    <div className="bg-gradient-to-br from-yellow-900 to-orange-900 text-white p-8 rounded-xl text-center max-w-md border-4 border-yellow-400">
                        <h2 className="text-5xl font-bold mb-4 text-yellow-300">🎉 VICTOIRE! 🎉</h2>
                        <div className="mb-6">
                            <p className="text-2xl mb-2 text-yellow-200">Vous avez survécu!</p>
                            <p className="text-xl mb-2">Score final: {score}</p>
                            <p className="text-lg mb-2">Temps survécu: 20 secondes</p>
                            <p className="text-yellow-400 font-bold">🏆 +{Math.floor(score / 50) + 10} trophées gagnés!</p>
                            <p className="text-green-400">💰 Bonus de victoire: +500 points!</p>
                        </div>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={startGame}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg"
                            >
                                🔄 Rejouer
                            </button>
                            <button
                                onClick={() => setGameState('menu')}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
                            >
                                🏠 Menu
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Game Over */}
            {gameState === 'gameOver' && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
                    <div className="bg-gray-900 text-white p-8 rounded-xl text-center max-w-md">
                        <h2 className="text-4xl font-bold mb-4">💀 GAME OVER</h2>
                        <div className="mb-6">
                            <p className="text-xl mb-2">Score final: {score}</p>
                            <p className="text-lg mb-2">Temps survécu: {20 - timeLeft} secondes</p>
                            <p className="text-yellow-400">🏆 +{Math.floor(score / 100)} trophées gagnés!</p>
                        </div>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={startGame}
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg"
                            >
                                🔄 Rejouer
                            </button>
                            <button
                                onClick={() => setGameState('menu')}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
                            >
                                🏠 Menu
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Canvas de jeu */}
            <canvas
                ref={canvasRef}
                width={ARENA_WIDTH}
                height={ARENA_HEIGHT}
                className={`border-4 border-white/20 rounded-lg ${gameState === 'playing' ? 'cursor-crosshair' : 'cursor-default'}`}
                style={{ 
                    maxWidth: '100%', 
                    maxHeight: '70vh', 
                    objectFit: 'contain',
                    backgroundColor: '#1a202c'
                }}
            />

            {/* Instructions */}
            {gameState === 'playing' && (
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm text-white p-2 rounded-lg text-xs">
                    <div>🎮 ZQSD/WASD/↑←↓→: Bouger | ⚔️ A: Attaquer | ⏸️ Espace: Pause | 🎯 3 coups = 1 kill</div>
                </div>
            )}
        </div>
    );
}