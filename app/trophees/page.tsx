import Link from 'next/link';

export default function TropheesPage() {
    const trophees = [
        { id: 1, nom: "Premier pas", description: "Commencer l'aventure", icon: "🥉", obtenu: true },
        { id: 2, nom: "Explorateur", description: "Visiter 5 niveaux", icon: "🗺️", obtenu: true },
        { id: 3, nom: "Champion", description: "Gagner 10 parties", icon: "🥇", obtenu: false },
        { id: 4, nom: "Maître", description: "Score parfait", icon: "👑", obtenu: false },
        { id: 5, nom: "Légende", description: "100% complétion", icon: "⭐", obtenu: false },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-700 to-purple-800 p-8">
            {/* Bouton retour */}
            <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all mb-8"
            >
                <span>←</span>
                <span>Retour</span>
            </Link>

            {/* Titre */}
            <div className="text-center mb-12">
                <h1 className="text-6xl font-bold text-white mb-4">
                    🏆 Mes Trophées 🏆
                </h1>
                <p className="text-xl text-white/80">
                    {trophees.filter(t => t.obtenu).length} / {trophees.length} trophées obtenus
                </p>
            </div>

            {/* Grille de trophées */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {trophees.map((trophee) => (
                    <div
                        key={trophee.id}
                        className={`p-6 rounded-xl shadow-2xl transition-all transform hover:scale-105 ${trophee.obtenu
                                ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
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
                ))}
            </div>
        </div>
    );
}
