import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Share Rides, Save Money, Reduce Carbon Footprint</h1>
              <p className="text-xl mb-8">Find the perfect ride or share your journey with others heading in the same direction.</p>
              <div className="flex flex-col sm:flex-row gap-4">
      
          
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-blue-400 bg-opacity-30 rounded-xl h-80 flex items-center justify-center">
                <span className="text-2xl font-light">Ride Sharing Illustration</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How RoveTogether Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Search for a Ride</h3>
              <p className="text-gray-600">Enter your starting point, destination and travel date to find available rides.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Book Your Seat</h3>
              <p className="text-gray-600">Choose the best ride for you and book your seat with just a few clicks.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Enjoy Your Journey</h3>
              <p className="text-gray-600">Meet your driver at the pickup point and enjoy a comfortable, affordable ride.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};


export default HomePage;