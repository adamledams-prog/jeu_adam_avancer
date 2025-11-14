'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import './clouds.css';

export default function TropheesPage() {
    const [nombreTrophees, setNombreTrophees] = useState(1);

    // Charger le nombre de trophées depuis localStorage avec actualisation
    useEffect(() => {
        const updateTrophees = () => {
            const savedTrophees = localStorage.getItem('playerTrophees');
            if (savedTrophees) {
                setNombreTrophees(parseInt(savedTrophees));
            }
        };

        // Charger au démarrage
        updateTrophees();

        // Vérifier périodiquement pour les changements
        const interval = setInterval(updateTrophees, 500);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const trophees = [
        { id: 1, nom: "Premier pas", description: "Commencer l'aventure", icon: "🥉", obtenu: true, slug: "premier-pas" },
        { id: 2, nom: "Explorateur", description: "Collecter 1000 trophées", icon: "🗺️", obtenu: nombreTrophees >= 1000, slug: "explorateur" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-700 to-purple-800 p-8 relative overflow-hidden">
            {/* Mini nuages animés en arrière-plan */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="cloud cloud-1">☁️</div>
                <div className="cloud cloud-2">☁️</div>
                <div className="cloud cloud-3">☁️</div>
                <div className="cloud cloud-4">☁️</div>
                <div className="cloud cloud-5">☁️</div>
                <div className="cloud cloud-6">☁️</div>
            </div>

            {/* Bouton retour */}
            <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all mb-8 relative z-10"
            >
                <span>←</span>
                <span>Retour</span>
            </Link>

            {/* Titre */}
            <div className="text-center mb-12 relative z-10">
                <h1 className="text-6xl font-bold text-white mb-4">
                    🏆 Mes Trophées 🏆
                </h1>
                <p className="text-xl text-white/80">
                    {trophees.filter(t => t.obtenu).length} / {trophees.length} trophées obtenus
                </p>
                <p className="text-lg text-yellow-300 mt-2">
                    🏆 Vous avez {nombreTrophees} trophées collectés !
                </p>
            </div>



            {/* Grille de trophées */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto relative z-10">
                {trophees.map((trophee) => (
                    trophee.obtenu ? (
                        <Link 
                            key={trophee.id}
                            href={`/trophees/${trophee.slug}`}
                            className={`block p-6 rounded-xl shadow-2xl transition-all transform hover:scale-105 cursor-pointer ${trophee.obtenu
                                    ? 'bg-gradient-to-br from-yellow-400 to-orange-500 trophy-obtained'
                                    : 'bg-gray-600/50 grayscale opacity-60'
                                }`}
                        >
                            <div className="text-center">
                                <div className="text-6xl mb-4">{trophee.icon}</div>
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {trophee.nom}
                                </h3>
                                <p className="text-white/90">
                                    {trophee.description}
                                </p>
                                {trophee.obtenu && (
                                    <div className="mt-4 text-green-900 font-bold">
                                        ✓ Obtenu !
                                    </div>
                                )}
                                {!trophee.obtenu && (
                                    <div className="mt-4 text-gray-300 font-bold">
                                        🔒 Verrouillé
                                    </div>
                                )}
                            </div>
                        </Link>
                    ) : (
                        <div
                            key={trophee.id}
                            className={`p-6 rounded-xl shadow-2xl transition-all transform ${trophee.obtenu
                                    ? 'bg-gradient-to-br from-yellow-400 to-orange-500 trophy-obtained'
                                    : 'bg-gray-600/50 grayscale opacity-60'
                                }`}
                        >
                            <div className="text-center">
                                <div className="text-6xl mb-4">{trophee.icon}</div>
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {trophee.nom}
                                </h3>
                                <p className="text-white/90">
                                    {trophee.description}
                                </p>
                                {trophee.obtenu && (
                                    <div className="mt-4 text-green-900 font-bold">
                                        ✓ Obtenu !
                                    </div>
                                )}
                                {!trophee.obtenu && (
                                    <div className="mt-4 text-gray-300 font-bold">
                                        🔒 Verrouillé
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                ))}
            </div>
        </div>
    );
}
