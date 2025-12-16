function App() {
  return (
    <div className="min-h-screen flex flex-col bg-cream">
      {/* Navbar */}
      <nav className="bg-maroon text-cream shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">
                <span className="text-gold">Kata</span> Sweet Shop
              </h1>
            </div>
            {/* Optional: Add navigation links here later */}
            <div className="hidden md:flex space-x-8">
              {/* Navigation items will go here */}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Content will be added here */}
          <div className="text-center py-20">
            <h2 className="text-4xl font-bold text-maroon mb-4">
              Welcome to Kata Sweet Shop
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Experience the authentic taste of traditional Indian sweets, crafted with love and the finest ingredients.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-maroon text-cream py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-cream/90">
            Authentic Indian Sweets Since 1995
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App

