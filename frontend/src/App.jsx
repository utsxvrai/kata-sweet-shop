function App() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-maroon text-cream py-6 shadow-lg">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-center">
            Welcome to Sweet Shop
          </h1>
          <p className="text-center mt-2 text-cream/90">
            Traditional flavors, modern design
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-saffron">
            <h2 className="text-2xl font-bold text-maroon mb-3">
              Saffron Delights
            </h2>
            <p className="text-gray-700 mb-4">
              Experience the rich, warm flavors of traditional Indian sweets.
            </p>
            <button className="bg-saffron hover:bg-saffron/90 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
              Explore
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-gold">
            <h2 className="text-2xl font-bold text-maroon mb-3">
              Golden Specials
            </h2>
            <p className="text-gray-700 mb-4">
              Handcrafted with love, inspired by centuries of tradition.
            </p>
            <button className="bg-gold hover:bg-gold/90 text-white font-semibold py-2 px-6 rounded-lg transition-colors">
              Discover
            </button>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-maroon/10 p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-maroon mb-2">
              Color Palette
            </h3>
            <div className="flex gap-4 mt-4 justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-cream border-2 border-gray-300 rounded-lg shadow"></div>
                <p className="text-sm mt-2 font-medium">Cream</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-saffron rounded-lg shadow"></div>
                <p className="text-sm mt-2 font-medium">Saffron</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-maroon rounded-lg shadow"></div>
                <p className="text-sm mt-2 font-medium">Maroon</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gold rounded-lg shadow"></div>
                <p className="text-sm mt-2 font-medium">Gold</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

