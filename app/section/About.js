
export default function About() {
    return (
        <div className="px-6 py-8 max-w-3xl mx-auto text-gray-800 break-words min-h-screen">
            <h2 className="text-3xl font-bold mb-4">About me</h2>
            <p className="text-lg mb-6">
                I am a dedicated MERN stack developer who enjoys collaborating closely
                with teams to create seamless and efficient applications. Every day, I
                work with modern web technologies to build user-centric software that
                brings ideas to life.
            </p>

            <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-2">Technical</h3>
                <p>
                    You can find me actively working with technologies like React,
                    Node.js, Express, MongoDB, <wbr />
                    and Tailwind CSS. <wbr />I also enjoy exploring Rust, <wbr />
                    and I am capable of working with Python,
                    <wbr /> C++,
                    <wbr /> and Java when needed.
                </p>
            </div>

            <div>
                <h3 className="text-2xl font-semibold mb-2">Personal</h3>
                <p>
                    I am from Pernambut, India, <wbr />
                    and take pride in continuous learning
                    <wbr /> and adaptability. <wbr />
                    Fluent in multiple languages including Urdu, English, Tamil, and
                    intermediate in Hindi, I strive to connect with people and embrace
                    different cultures.
                </p>
                <p className="mt-4 italic">
                    Ready to build something great together!
                </p>
            </div>
        </div>
    );
}
