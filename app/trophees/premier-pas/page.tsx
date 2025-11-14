'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import '../clouds.css';

export default function PremierPasPage() {
    const [tropheesActuels, setTropheesActuels] = useState(1);

    // Charger le nombre de trophées depuis localStorage
    useEffect(() => {
        const updateTrophees = () => {
            const savedTrophees = localStorage.getItem('playerTrophees');
            if (savedTrophees) {
                setTropheesActuels(parseInt(savedTrophees));
            }
        };

        updateTrophees();
        const interval = setInterval(updateTrophees, 500);

        return () => {
            clearInterval(interval);
        };
    }, []);
    
    // Pièces de départ
    const piecesDeDepart = 100;
    
    const recompenses = [
        { id: 1, nom: "Pièces d'or", description: "100 pièces", icon: "🪙", obtenu: false, requis: 10, valeur: 100 },
        { id: 2, nom: "Gemmes rares", description: "5 gemmes", icon: "💎", obtenu: false, requis: 20, valeur: 5 },
        { id: 3, nom: "Pièces d'or", description: "150 pièces", icon: "🪙", obtenu: false, requis: 30, valeur: 150 },
        { id: 4, nom: "Personnage Attaquant", description: "Débloque l'Attaquant", icon: "👨", obtenu: false, requis: 40, valeur: "Attaquant" },
        { id: 5, nom: "Pièces d'or", description: "200 pièces", icon: "🪙", obtenu: false, requis: 50, valeur: 200 },
    ];

    // Calculer quelles récompenses sont débloquées
    const recompensesAvecStatut = recompenses.map(recompense => ({
        ...recompense,
        obtenu: tropheesActuels >= recompense.requis
    }));

    const recompensesObtenues = recompensesAvecStatut.filter(r => r.obtenu);

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
                href="/trophees"
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all mb-8 relative z-10"
            >
                <span>←</span>
                <span>Retour aux trophées</span>
            </Link>



            {/* En-tête du trophée */}
            <div className="text-center mb-12 relative z-10">
                <div className="text-8xl mb-6 trophy-obtained inline-block p-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500">
                    🥉
                </div>
                <h1 className="text-5xl font-bold text-white mb-4">
                    Premier pas
                </h1>
                
                {/* Compteur de progression des trophées */}
                <div className="max-w-md mx-auto">
                    <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl">
                        <h3 className="text-xl font-bold text-white mb-4">📈 Progression des trophées</h3>
                        <div className="text-4xl font-bold text-yellow-300 mb-2">{tropheesActuels} / 1000</div>
                        <div className="w-full bg-gray-600 rounded-full h-4 mb-4">
                            <div 
                                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full transition-all duration-300"
                                style={{ width: `${(tropheesActuels / 1000) * 100}%` }}
                            ></div>
                        </div>
                        <p className="text-white/80 text-sm">
                            Prochaine récompense dans {10 - tropheesActuels} trophées
                        </p>
                    </div>
                </div>
            </div>

            {/* Statistiques */}
            <div className="max-w-4xl mx-auto mb-12 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl text-center">
                        <div className="text-3xl font-bold text-yellow-300 mb-2">{recompensesObtenues.length}</div>
                        <div className="text-white">Récompenses débloquées</div>
                    </div>
                    <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl text-center">
                        <div className="text-3xl font-bold text-yellow-300 mb-2">{piecesDeDepart}</div>
                        <div className="text-white">Pièces actuelles</div>
                    </div>
                </div>
            </div>



            {/* Titre des récompenses */}
            <div className="text-center mb-8 relative z-10">
                <h2 className="text-4xl font-bold text-white mb-4">
                    🎁 Récompenses obtenues
                </h2>
                <p className="text-lg text-white/80">
                    Voici tous les objets que vous avez reçus en débloquant ce trophée
                </p>
            </div>

            {/* Ligne de récompenses */}
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="flex items-center justify-center gap-4 overflow-x-auto pb-6">
                    {recompensesAvecStatut.map((recompense, index) => (
                        <div key={recompense.id} className="flex items-center">
                            {/* Carte de récompense */}
                            <div className={`p-6 rounded-xl shadow-2xl min-w-[200px] transform hover:scale-105 transition-all ${
                                recompense.obtenu 
                                    ? 'bg-gradient-to-br from-yellow-400 to-orange-500 trophy-obtained' 
                                    : 'bg-gray-600/50 grayscale opacity-60'
                            }`}>
                                <div className="text-center">
                                    <div className="text-5xl mb-3">{recompense.icon}</div>
                                    <h3 className="text-lg font-bold text-white mb-2">
                                        {recompense.nom}
                                    </h3>
                                    <p className="text-white/90 text-sm mb-3">
                                        {recompense.description}
                                    </p>
                                    <div className={`px-3 py-1 rounded-full text-sm font-bold mb-2 ${
                                        recompense.obtenu ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                                    }`}>
                                        {recompense.obtenu ? '✓ Débloqué' : '🔒 Verrouillé'}
                                    </div>
                                    <div className="text-xs text-white/70">
                                        Requis: {recompense.requis} trophées
                                    </div>
                                </div>
                            </div>
                            
                            {/* Flèche de connexion (sauf pour le dernier élément) */}
                            {index < recompensesAvecStatut.length - 1 && (
                                <div className="text-3xl text-white/50 mx-2">
                                    →
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Message d'encouragement */}
            <div className="text-center mt-12 relative z-10">
                <div className="bg-white/20 backdrop-blur-lg p-8 rounded-xl max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold text-white mb-4">
                        🌟 Collectez plus de trophées !
                    </h3>
                    <p className="text-white/90 text-lg mb-6">
                        Chaque palier de 10 trophées débloque une nouvelle récompense. Actuellement vous avez {tropheesActuels} trophée(s).
                    </p>
                    <div className="text-white/80 space-y-2">
                        <p><strong>Prochaines récompenses :</strong></p>
                        <p>• 10 trophées → 100 pièces d'or 🪙</p>
                        <p>• 20 trophées → 5 gemmes rares 💎</p>
                        <p>• 30 trophées → 150 pièces d'or 🪙</p>
                        <p>• 40 trophées → Personnage Attaquant 👨</p>
                        <p><strong>Prochain objectif :</strong> Collecter 1000 trophées pour débloquer "Explorateur" 🗺️</p>
                    </div>
                </div>
            </div>
        </div>
    );
}