import Link from 'next/link';

export default function PersoPage() {
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

                    {/* Carré avec tête cliquable */}
                    <Link href="/perso/nouveau">
                        <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl mx-auto cursor-pointer transform hover:scale-110 transition-all duration-300 hover:rotate-3">
                            <div className="text-center">
                                {/* Tête du personnage */}
                                <div className="text-2xl animate-bounce">🧙‍♂️</div>
                                <div className="text-white text-xs font-bold mt-1">Le magicien</div>
                            </div>
                        </div>
                    </Link>
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