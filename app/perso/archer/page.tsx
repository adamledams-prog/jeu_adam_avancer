import Link from 'next/link';

export default function AttaquantPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-green-600 via-teal-600 to-blue-600 p-8 relative overflow-hidden">
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
                    {/* Attaquant à gauche */}
                    <div className="text-center space-y-8">
                        <div className="space-y-6">
                        </div>

                        {/* Carré avec tête */}
                        <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl mx-auto">
                            <div className="text-center">
                                {/* Tête du personnage */}
                                <div className="text-2xl animate-bounce">👨</div>
                                <div className="text-white text-xs font-bold mt-1">Attaquant</div>
                            </div>
                        </div>
                    </div>

                    {/* Statistiques à droite */}
                    <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl shadow-2xl">
                        <h3 className="text-2xl font-bold text-white mb-6 text-center">
                            📊 Statistiques
                        </h3>
                        
                        <div className="space-y-4">
                            {/* PV */}
                            <div className="flex items-center justify-between gap-6">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">❤️</span>
                                    <span className="text-white font-bold">PV</span>
                                </div>
                                <div className="text-red-300 font-bold text-xl">2500</div>
                            </div>
                            
                            {/* Dégâts */}
                            <div className="flex items-center justify-between gap-6">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">⚔️</span>
                                    <span className="text-white font-bold">Dégâts</span>
                                </div>
                                <div className="text-yellow-300 font-bold text-xl">1000</div>
                            </div>
                            
                            {/* Portée */}
                            <div className="flex items-center justify-between gap-6">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl">🎯</span>
                                    <span className="text-white font-bold">Portée</span>
                                </div>
                                <div className="text-green-300 font-bold text-xl">Petite</div>
                            </div>
                        </div>
                        
                        {/* Barre de PV */}
                        <div className="mt-6">
                            <div className="text-white text-sm mb-2">Points de Vie</div>
                            <div className="w-full bg-gray-600 rounded-full h-3">
                                <div className="bg-gradient-to-r from-green-400 to-red-500 h-3 rounded-full w-full"></div>
                            </div>
                            <div className="text-white text-xs mt-1 text-center">2500 / 2500</div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Éléments décoratifs */}
            <div className="absolute top-10 left-1/4 text-4xl animate-spin-slow">🌟</div>
            <div className="absolute top-20 right-1/4 text-3xl animate-spin-slow">✨</div>
            <div className="absolute bottom-20 left-1/3 text-5xl animate-spin-slow">💫</div>
            <div className="absolute bottom-32 right-1/3 text-4xl animate-spin-slow">⭐</div>
            <div className="absolute top-1/2 left-8 text-3xl animate-spin-slow">🏹</div>
            <div className="absolute top-1/2 right-8 text-3xl animate-spin-slow">🎯</div>
        </div>
    );
}