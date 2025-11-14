'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function NouveauPersoPage() {
    const [pv, setPv] = useState(2000);
    const [degats, setDegats] = useState(500);
    const [pieces, setPieces] = useState(100);
    const [pouvoirAchete, setPouvoirAchete] = useState(false);

    // Charger les stats depuis localStorage
    useEffect(() => {
        // Réinitialiser les stats par défaut au début
        const savedPouvoir = localStorage.getItem('magicienPouvoir1');
        
        if (savedPouvoir === 'true') {
            // Si le pouvoir est déjà acheté, charger les stats améliorées
            const savedPv = localStorage.getItem('magicienPv');
            const savedDegats = localStorage.getItem('magicienDegats');
            
            if (savedPv) setPv(parseInt(savedPv));
            if (savedDegats) setDegats(parseInt(savedDegats));
            setPouvoirAchete(true);
        } else {
            // Sinon, utiliser les stats de base
            setPv(2000);
            setDegats(500);
            setPouvoirAchete(false);
        }
        
        // Gérer les pièces
        const savedPieces = localStorage.getItem('playerPieces');
        if (savedPieces) {
            setPieces(parseInt(savedPieces));
        } else {
            // Seulement initialiser si pas encore défini
            localStorage.setItem('playerPieces', '100');
            setPieces(100);
        }

        // Vérifier périodiquement pour les changements de pièces
        const interval = setInterval(() => {
            const currentPieces = parseInt(localStorage.getItem('playerPieces') || '100');
            setPieces(currentPieces);
        }, 500);

        return () => {
            clearInterval(interval);
        };
    }, []);

    // Fonction pour acheter le pouvoir 1
    const acheterPouvoir1 = () => {
        console.log('Clic sur acheter pouvoir 1');
        console.log('Pièces:', pieces, 'Pouvoir acheté:', pouvoirAchete);
        
        if (pieces >= 30 && !pouvoirAchete) {
            console.log('Achat en cours...');
            const nouveauxPv = 2100;
            const nouveauxDegats = 550;
            const nouvellesPieces = pieces - 30;

            setPv(nouveauxPv);
            setDegats(nouveauxDegats);
            setPieces(nouvellesPieces);
            setPouvoirAchete(true);

            // Sauvegarder dans localStorage
            localStorage.setItem('magicienPv', nouveauxPv.toString());
            localStorage.setItem('magicienDegats', nouveauxDegats.toString());
            localStorage.setItem('playerPieces', nouvellesPieces.toString());
            localStorage.setItem('magicienPouvoir1', 'true');
            
            console.log('Achat terminé !');
        } else {
            console.log('Conditions non remplies pour l\'achat');
        }
    };

    // Fonction pour réinitialiser l'amélioration (pour tester)
    const reinitialiserAmelioration = () => {
        setPv(2000);
        setDegats(500);
        setPieces(100);
        setPouvoirAchete(false);
        
        // Nettoyer localStorage
        localStorage.removeItem('magicienPv');
        localStorage.removeItem('magicienDegats');
        localStorage.removeItem('magicienPouvoir1');
        localStorage.setItem('playerPieces', '100');
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-600 via-blue-600 to-purple-600 p-8 relative overflow-hidden">
            {/* Bouton retour */}
            <Link
                href="/perso"
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all mb-8 relative z-10"
            >
                <span>←</span>
                <span>Retour aux persos</span>
            </Link>

            {/* Contenu central - Personnage */}
            <main className="flex items-center justify-center min-h-screen">
                <div className="flex items-center gap-12 max-w-6xl px-8">
                    {/* Bouton Pouvoir 1 à gauche */}
                    <div className="text-center">
                        <button 
                            onClick={acheterPouvoir1}
                            disabled={pouvoirAchete}
                            className={`font-bold py-4 px-6 rounded-xl shadow-lg transition-all transform ${
                                pouvoirAchete 
                                    ? 'bg-green-600 text-white cursor-not-allowed' 
                                    : pieces >= 30 
                                        ? 'bg-purple-500 hover:bg-purple-600 text-white hover:scale-110 cursor-pointer' 
                                        : 'bg-red-500 text-white hover:scale-110 cursor-pointer'
                            }`}
                        >
                            {pouvoirAchete ? '✅ Acheté' : '⚡ Pouvoir 1'}
                            <div className="text-xs mt-1">
                                {pouvoirAchete ? 'Débloqué' : pieces >= 30 ? `30 🪙 (${pieces})` : `Besoin de ${30 - pieces} pièces`}
                            </div>
                        </button>
                    </div>

                    {/* Magicien au centre */}
                    <div className="text-center space-y-8">
                        <div className="space-y-6">
                        </div>

                        {/* Carré avec tête */}
                        <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl mx-auto">
                            <div className="text-center">
                                {/* Tête du personnage */}
                                <div className="text-2xl animate-bounce">🧙‍♂️</div>
                                <div className="text-white text-xs font-bold mt-1">Le magicien</div>
                            </div>
                        </div>
                    </div>

                    {/* Statistiques à droite */}
                    <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl shadow-2xl">
                        <h3 className="text-2xl font-bold text-white mb-6 text-center">
                            📊 Statistiques
                        </h3>
                        
                        <div className="space-y-4">
                            {/* Pièces */}
                            <div className="flex items-center justify-between gap-6">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">🪙</span>
                                    <span className="text-white font-bold">Pièces</span>
                                </div>
                                <div className="text-yellow-300 font-bold text-xl">{pieces}</div>
                            </div>
                            
                            {/* PV */}
                            <div className="flex items-center justify-between gap-6">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">❤️</span>
                                    <span className="text-white font-bold">PV</span>
                                </div>
                                <div className={`font-bold text-xl ${
                                    pouvoirAchete ? 'text-green-300' : 'text-red-300'
                                }`}>{pv}</div>
                            </div>
                            
                            {/* Dégâts */}
                            <div className="flex items-center justify-between gap-6">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">⚔️</span>
                                    <span className="text-white font-bold">Dégâts</span>
                                </div>
                                <div className={`font-bold text-xl ${
                                    pouvoirAchete ? 'text-green-300' : 'text-yellow-300'
                                }`}>{degats}</div>
                            </div>
                            
                            {/* Portée */}
                            <div className="flex items-center justify-between gap-6">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">🎯</span>
                                    <span className="text-white font-bold">Portée</span>
                                </div>
                                <div className="text-green-300 font-bold text-xl">Longue</div>
                            </div>
                        </div>
                        
                        {/* Barre de PV */}
                        <div className="mt-6">
                            <div className="text-white text-sm mb-2">Points de Vie</div>
                            <div className="w-full bg-gray-600 rounded-full h-3">
                                <div className="bg-gradient-to-r from-green-400 to-red-500 h-3 rounded-full w-full"></div>
                            </div>
                            <div className="text-white text-xs mt-1 text-center">{pv} / {pv}</div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Bouton de réinitialisation pour test */}
            <div className="absolute bottom-8 right-8">
                <button 
                    onClick={reinitialiserAmelioration}
                    className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-2 px-4 rounded-lg shadow-lg transition-all transform hover:scale-105"
                >
                    🔄 Reset (test)
                </button>
            </div>

            {/* Éléments décoratifs */}
            <div className="absolute top-10 left-1/4 text-4xl animate-spin-slow">🌟</div>
            <div className="absolute top-20 right-1/4 text-3xl animate-spin-slow">✨</div>
            <div className="absolute bottom-20 left-1/3 text-5xl animate-spin-slow">💫</div>
            <div className="absolute bottom-32 right-1/3 text-4xl animate-spin-slow">⭐</div>
            <div className="absolute top-1/2 left-8 text-3xl animate-spin-slow">🔥</div>
            <div className="absolute top-1/2 right-8 text-3xl animate-spin-slow">⚡</div>
        </div>
    );
}