import React from 'react';


function Home() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
            <header className="w-full bg-blue-600 text-white py-4">
                <h1 className="text-3xl font-bold text-center">Facultad de Clases</h1>
            </header>
            <main className="flex flex-col items-center mt-8">
                <section className="bg-white shadow-md rounded-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Bienvenido a la Plataforma de Clases</h2>
                    <p className="text-gray-700 mb-4">
                        Aquí puedes dar y recibir clases de diferentes materias. Únete a nuestra comunidad y empieza a aprender y enseñar hoy mismo.
                    </p>
                    <div className="flex justify-around mt-4">
                        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                            Dar Clase
                        </button>
                        <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                            Recibir Clase
                        </button>
                    </div>
                </section>
            </main>
            <footer className="w-full bg-gray-800 text-white py-4 mt-auto">
                <p className="text-center">&copy; 2023 Universidad de Montevideo. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
};

export default Home;