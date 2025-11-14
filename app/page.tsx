'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
    const [pieces, setPieces] = useState(100);
    const [trophees, setTrophees] = useState(1);
    const [enCombat, setEnCombat] = useState(false);
    const [messageCombat, setMessageCombat] = useState('');

    // Charger les pièces et trophées depuis localStorage
    useEffect(() => {
        // Charger les pièces (ne pas forcer à 100)
        const savedPieces = localStorage.getItem('playerPieces');
        if (savedPieces) {
            setPieces(parseInt(savedPieces));
        } else {
            // Seulement initialiser si pas encore défini
            localStorage.setItem('playerPieces', '100');
            setPieces(100);
        }

        // Charger les trophées
        const savedTrophees = localStorage.getItem('playerTrophees');
        if (savedTrophees) {
            setTrophees(parseInt(savedTrophees));
        } else {
            localStorage.setItem('playerTrophees', '1');
            setTrophees(1);
        }

        // Vérifier périodiquement pour les changements
        const interval = setInterval(() => {
            const nouvelles = parseInt(localStorage.getItem('playerPieces') || '100');
            const nouveauxTrophees = parseInt(localStorage.getItem('playerTrophees') || '1');
            setPieces(nouvelles);
            setTrophees(nouveauxTrophees);
        }, 500);

        return () => {
            clearInterval(interval);
        };
    }, []);

    // Fonction de combat contre l'IA
    const lancerCombat = () => {
        setEnCombat(true);
        setMessageCombat('⚔️ Combat en cours...');

        // Simulation du combat avec un délai
        setTimeout(() => {
            const victoire = Math.random() > 0.3; // 70% de chance de gagner
            
            if (victoire) {
                const nouveauxTrophees = trophees + 5;
                setTrophees(nouveauxTrophees);
                localStorage.setItem('playerTrophees', nouveauxTrophees.toString());
                setMessageCombat('🎉 Victoire ! +5 trophées !');
            } else {
                setMessageCombat('💀 Défaite... Réessayez !');
            }

            // Cacher le message après 3 secondes
            setTimeout(() => {
                setEnCombat(false);
                setMessageCombat('');
            }, 3000);
        }, 2000);
    };
    return (
        <div className="min-h-screen bg-blue-700 relative overflow-hidden">
            {/* Header avec trophées et monnaies */}
            <header className="absolute top-0 right-0 p-8">
                <div className="flex flex-col items-end gap-4">
                    {/* Affichage des monnaies */}
                    <div className="flex items-center gap-3">
                        {/* Trophées */}
                        <div className="flex items-center gap-2 bg-orange-500/90 backdrop-blur-sm text-white font-bold py-2 px-4 rounded-lg shadow-lg">
                            <span className="text-2xl">🏆</span>
                            <span className="text-lg">{trophees}</span>
                        </div>

                        {/* Pièces */}
                        <div className="flex items-center gap-2 bg-yellow-400/90 backdrop-blur-sm text-gray-900 font-bold py-2 px-4 rounded-lg shadow-lg" id="pieces-counter">
                            <span className="text-2xl">🪙</span>
                            <span className="text-lg">{pieces}</span>
                        </div>
                        
                        {/* Gemmes */}
                        <div className="flex items-center gap-2 bg-purple-500/90 backdrop-blur-sm text-white font-bold py-2 px-4 rounded-lg shadow-lg">
                            <span className="text-2xl">💎</span>
                            <span className="text-lg">0</span>
                        </div>
                    </div>

                    {/* Navigation buttons */}
                    <div className="flex flex-col gap-3">
                        {/* Bouton Trophées */}
                        <Link
                            href="/trophees"
                            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105"
                        >
                            <span className="text-2xl">🏆</span>
                            <span>Trophées</span>
                        </Link>

                        {/* Bouton Perso */}
                        <Link
                            href="/perso"
                            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all transform hover:scale-105"
                        >
                            <span className="text-2xl">👤</span>
                            <span>Perso</span>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Personnage à gauche */}
            <div className="absolute left-8 top-1/2 -translate-y-1/2">
                <Link href="/avatar" className="block group cursor-pointer">
                    <div className="w-48 h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce group-hover:scale-110 transition-transform">
                        <span className="text-8xl">😎</span>
                    </div>
                    <div className="mt-4 text-center">
                        <p className="text-white font-bold text-xl bg-black/30 px-4 py-2 rounded-lg group-hover:bg-black/50 transition-colors">
                            Avatar
                        </p>
                    </div>
                </Link>
            </div>

            {/* Contenu central - Bienvenue */}
            <main className="flex items-center justify-center min-h-screen">
                <div className="text-center space-y-8 max-w-2xl px-8">
                    <div className="space-y-4">
                        <h2 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-500 to-purple-600 drop-shadow-2xl">
                            ZINE STAR
                        </h2>
                    </div>

                    <p className="text-2xl text-white/90 font-medium">
                        ⭐ L&apos;aventure commence ici ! ⭐
                    </p>
                </div>
            </main>

            {/* Boutons en bas à droite */}
            <div className="absolute bottom-8 right-8 flex flex-col gap-4">
                {/* Bouton Combat rapide */}
                <button 
                    onClick={lancerCombat}
                    disabled={enCombat}
                    className={`font-bold py-3 px-6 rounded-xl shadow-lg transition-all transform ${
                        enCombat 
                            ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                            : 'bg-orange-500 hover:bg-orange-600 text-white hover:scale-110'
                    }`}
                >
                    {enCombat ? '⚔️ Combat...' : '⚡ Combat rapide'}
                </button>

                {/* Bouton Map de combat */}
                <Link
                    href="/combat"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all transform hover:scale-110 text-xl text-center"
                >
                    🗺️ Carte de Combat
                </Link>
            </div>

            {/* Message de combat */}
            {messageCombat && (
                <div className="absolute bottom-24 right-8">
                    <div className="bg-black/80 backdrop-blur-sm text-white font-bold py-3 px-6 rounded-lg shadow-2xl animate-bounce">
                        {messageCombat}
                    </div>
                </div>
            )}

            {/* Étoiles décoratives */}
            <div className="absolute top-10 left-1/4 text-4xl animate-spin-slow">⭐</div>
            <div className="absolute top-20 right-1/4 text-3xl animate-spin-slow">✨</div>
            <div className="absolute bottom-20 left-1/3 text-5xl animate-spin-slow">🌟</div>
            <div className="absolute bottom-32 right-1/3 text-4xl animate-spin-slow">💫</div>
        </div>
    );
}
