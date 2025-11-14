'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PersoPage() {
    const [magicienDebloque, setMagicienDebloque] = useState(false);
    const router = useRouter();

    // Charger l'état depuis localStorage au démarrage
    useEffect(() => {
        const debloque = localStorage.getItem('magicienDebloque');
        if (debloque === 'true') {
            setMagicienDebloque(true);
        }
    }, []);

    // Fonction pour débloquer le magicien et rediriger
    const debloquerMagicien = () => {
        setMagicienDebloque(true);
        localStorage.setItem('magicienDebloque', 'true');
        // Rediriger vers la page des stats
        router.push('/perso/nouveau');
    };


    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 p-8 relative overflow-hidden">
            {/* Bouton retour */}
            <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all mb-8 relative z-10"
            >
                <span>←</span>
                <span>Retour</span>
            </Link>

            {/* Contenu central - Personnage */}
            <main className="flex items-center justify-center min-h-screen">
                <div className="text-center space-y-8 max-w-2xl px-8">
                    <div className="space-y-6">
                    </div>

                    {/* Grille de personnages */}
                    <div className="flex gap-8 justify-center">
                        {/* Magicien */}
                        <div className="relative">
                            <Link href="/perso/nouveau">
                                <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl cursor-pointer transform hover:scale-110 transition-all duration-300 hover:rotate-3">
                                    <div className="text-center">
                                        <div className="text-2xl animate-bounce">🧙‍♂️</div>
                                        <div className="text-white text-xs font-bold mt-1">Le magicien</div>
                                    </div>
                                </div>
                            </Link>
                            
                            {/* Bouton Récupérer */}
                            {!magicienDebloque && (
                                <button 
                                    onClick={debloquerMagicien}
                                    className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-1 px-3 rounded-lg shadow-lg transition-all hover:scale-105"
                                >
                                    📦 Récupérer
                                </button>
                            )}
                        </div>

                        {/* Attaquant - Verrouillé */}
                        <div className="w-24 h-24 bg-gradient-to-br from-gray-600 to-gray-800 rounded-3xl flex items-center justify-center shadow-2xl opacity-60 relative">
                            <div className="text-center">
                                <div className="text-2xl">👨</div>
                                <div className="text-white text-xs font-bold mt-1">Attaquant</div>
                                {/* Cadenas avec chaînes */}
                                <div className="absolute -top-1 -right-1 text-lg">🔒</div>
                                <div className="absolute -top-1 -left-1 text-sm">⛓️</div>
                                <div className="absolute -bottom-1 -right-1 text-sm">⛓️</div>
                                <div className="absolute -bottom-1 -left-1 text-sm">⛓️</div>
                                <div className="absolute top-1/2 -left-2 text-sm transform -rotate-45">⛓️</div>
                                <div className="absolute top-1/2 -right-2 text-sm transform rotate-45">⛓️</div>
                                <div className="absolute top-0 left-0 w-full h-full border-2 border-red-500 rounded-3xl opacity-50"></div>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white text-xs py-1 rounded-b-3xl text-center">
                                40 trophées
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Éléments décoratifs */}
            <div className="absolute top-16 right-1/4 text-4xl animate-spin-slow">⭐</div>
            <div className="absolute bottom-20 left-1/4 text-5xl animate-spin-slow">🌟</div>
            <div className="absolute top-1/3 left-16 text-3xl animate-spin-slow">✨</div>
            <div className="absolute bottom-1/3 right-16 text-4xl animate-spin-slow">💫</div>
        </div>
    );
}