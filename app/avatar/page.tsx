import Link from 'next/link';

export default function AvatarPage() {
    // Nombre de trophées actuels (à synchroniser avec le système de trophées)
    const tropheesActuels = 1;
    
    // Liste des avatars avec leurs exigences
    const avatars = [
        { emoji: "😎", nom: "Cool", requis: 0, obtenu: true },
        { emoji: "🤖", nom: "Robot", requis: 10, obtenu: tropheesActuels >= 10 },
        { emoji: "👾", nom: "Alien", requis: 50, obtenu: tropheesActuels >= 50 },
        { emoji: "🦸", nom: "Héros", requis: 100, obtenu: tropheesActuels >= 100 },
        { emoji: "🧙", nom: "Mage", requis: 200, obtenu: tropheesActuels >= 200 },
        { emoji: "🦄", nom: "Licorne", requis: 300, obtenu: tropheesActuels >= 300 },
        { emoji: "🥷", nom: "Ninja", requis: 450, obtenu: tropheesActuels >= 450 },
        { emoji: "🐉", nom: "Dragon", requis: 600, obtenu: tropheesActuels >= 600 },
    ];

    return (
        <div className="min-h-screen bg-red-600 relative overflow-hidden">
            {/* Bouton retour */}
            <Link
                href="/"
                className="absolute top-8 left-8 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all"
            >
                <span>←</span>
                <span>Retour</span>
            </Link>

            {/* Contenu central - Avatar */}
            <main className="flex items-center justify-center min-h-screen">
                <div className="text-center space-y-8 max-w-2xl px-8">
                    <div className="space-y-6">
                        <h1 className="text-6xl font-bold text-white drop-shadow-2xl">
                            🔥 Customisation Avatar 🔥
                        </h1>
                        
                        {/* Compteur de trophées */}
                        <div className="bg-white/20 backdrop-blur-lg p-4 rounded-xl max-w-md mx-auto">
                            <div className="text-white text-lg font-bold mb-2">
                                🏆 Trophées : {tropheesActuels}
                            </div>
                            <div className="text-white/80 text-sm">
                                Prochains avatars à débloquer : Robot (10), Alien (50)
                            </div>
                        </div>
                        
                        {/* Avatar actuel */}
                        <div className="w-64 h-64 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl mx-auto animate-pulse">
                            <span className="text-9xl">😎</span>
                        </div>

                        <p className="text-xl text-white/90 font-medium">
                            Personnalise ton apparence dans Zine Star !
                        </p>
                    </div>

                    {/* Options d'avatar */}
                    <div className="grid grid-cols-4 gap-4 mt-12">
                        {avatars.map((avatar, index) => (
                            <div 
                                key={index}
                                className={`p-4 rounded-xl transition-all cursor-pointer transform hover:scale-110 ${
                                    avatar.obtenu 
                                        ? 'bg-white/20 backdrop-blur-sm hover:bg-white/30' 
                                        : 'bg-gray-600/50 opacity-60 cursor-not-allowed'
                                }`}
                            >
                                <div className="text-5xl mb-2">{avatar.emoji}</div>
                                <div className="text-white text-sm mb-1">{avatar.nom}</div>
                                {avatar.obtenu ? (
                                    <div className="text-green-300 text-xs">✓ Débloqué</div>
                                ) : (
                                    <div className="text-red-300 text-xs">
                                        🔒 {avatar.requis} trophées
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-4 justify-center mt-8">
                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all transform hover:scale-110">
                            ✅ Sauvegarder
                        </button>
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-all transform hover:scale-110">
                            🎲 Aléatoire
                        </button>
                    </div>
                </div>
            </main>

            {/* Éléments décoratifs */}
            <div className="absolute top-16 right-1/4 text-4xl animate-spin-slow">🔥</div>
            <div className="absolute bottom-20 left-1/4 text-5xl animate-spin-slow">✨</div>
            <div className="absolute top-1/3 left-16 text-3xl animate-spin-slow">💫</div>
            <div className="absolute bottom-1/3 right-16 text-4xl animate-spin-slow">⭐</div>
        </div>
    );
}