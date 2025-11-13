import Link from 'next/link';

export default function Home() {
    return (
        <div className="min-h-screen bg-blue-700 relative overflow-hidden">
            {/* Header avec trophées et monnaies */}
            <header className="absolute top-0 right-0 p-8">
                <div className="flex flex-col items-end gap-4">
                    {/* Affichage des monnaies */}
                    <div className="flex items-center gap-3">
                        {/* Pièces */}
                        <div className="flex items-center gap-2 bg-yellow-400/90 backdrop-blur-sm text-gray-900 font-bold py-2 px-4 rounded-lg shadow-lg">
                            <span className="text-2xl">🪙</span>
                            <span className="text-lg">100</span>
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

                    <div className="flex gap-4 justify-center mt-12">
                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all transform hover:scale-110 text-xl">
                            🎯 Commencer
                        </button>
                        <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all transform hover:scale-110 text-xl">
                            📚 Règles
                        </button>
                    </div>
                </div>
            </main>

            {/* Étoiles décoratives */}
            <div className="absolute top-10 left-1/4 text-4xl animate-spin-slow">⭐</div>
            <div className="absolute top-20 right-1/4 text-3xl animate-spin-slow">✨</div>
            <div className="absolute bottom-20 left-1/3 text-5xl animate-spin-slow">🌟</div>
            <div className="absolute bottom-32 right-1/3 text-4xl animate-spin-slow">💫</div>
        </div>
    );
}
