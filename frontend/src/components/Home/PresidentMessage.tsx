const PresidentMessage = () => {

    return ( 
        <section
            id="president-message"
            className="min-h-screen bg-white px-6 py-20 flex flex-col items-center"
        > 
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center"> 
            <div className="flex justify-center"> 
                <img
                    src="/president.png"
                    alt="President, Taguig City University"
                    className="rounded-xl shadow-lg w-full max-w-sm object-cover"
                /> 
            </div>
            <div>
            <div className="flex items-center gap-2 mb-6">
                <img className="w-15 h-15" src="/logo.png" alt="" />
                <h2 className="text-red-700 font-bold text-xl">
                Transforming Excellence Into Purpose
                </h2>
            </div>

            <div className="space-y-5 text-gray-700 text-base leading-relaxed">
                <p>
                At <strong>Taguig City University</strong>, we believe that true excellence goes
                beyond personal achievement. Excellence without purpose fades, but when guided
                with the right values, it becomes a force for lasting positive change.
                </p>

                <p>
                We nurture not only bright minds but also compassionate leaders who know that
                being “the best” is not just for oneself but about being the best for others.
                Education at TCU is a journey where skills, knowledge, and character come together
                transforming academic success into meaningful contributions that uplift communities
                and inspire progress.
                </p>
            </div>

            <div className="mt-8">
                <h3 className="text-red-700 font-semibold text-lg">
                DR. RAYMUNDO P. ARCEGA, CESE
                </h3>
                <p className="text-red-600 text-sm">President, Taguig City University</p>
            </div>
            </div>
        </div>
        </section>
    );
};

export default PresidentMessage;
