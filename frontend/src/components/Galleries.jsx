import React from 'react';

const foodImages = [
    "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&q=80&w=800",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBGZD4b3yGO1XnNiyT51WOIVYfbDz29YMQEjB_S3V46j3_UaGtVsC7mBNsVre_vWF3j_rHCpeNSbkKkjOZWEU51b7PTVjX2KdEbW-PI4pcjnOj93SBVX7L7_ffJ2Y7GiyR2xoaN84O8RVyZ9Lat392ZBo3G6_fwRtBgDqoh2xWIQQMSL-BUy3HQwZuvokjMJb5d3nXm2b6kAZ84B05Sq3NIrxKoKNWtUEE9oPyF-2MO9PZUsdUehID5AlFkBeYZ3vZ9b4IKj5sOjrsX",
    "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBTNz7HSo0yi3tt2SuY5-VT3oYpbnH68TThu1rFMQBzWYKY9oBNctT1wOOdHdX0GixT4uFCKJAPhiZ4T9quPqjdA-LhFm65BnVeZykXwMP8DJZoksxG_jKO5_dSq9nl_dUHSKv9mSpgsOA1cGUn6egqedKKudTkgETaElteQfrOH4ekvDsfe1wAplmrB8FFpyOBhIOX87ZILiqroRM7DESEBLh_ZmBa6s779a6Dj5cSwDgiyT3myHcJv9JttWaLVStDF16wX3LbqGiW",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCTZ1jur2c8-tqwYtq92GyBU3SwoBHSis3BUCKxl-UFhNhhur1lQ8NyTuEtRpYmpusNS6cRaAxA77G36PjtuuAdyYAluCV6hckXACKzTcfa1eKlXnXo6qZJB4Dthr8XGbvOb4NCX2lyO-6Oae6_E-bH5a8FX5Ea8-ZRlwvftaVF3Q1Ftl6H95IDuVqT2kqPAXWrs7W9_sGUvU2JVQS2BESI2HbPi2XHTQi25mpZdNiYbw4WASQSpikhWnfT5HmvyLhu90GOgSpD5Zg4",
    "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&q=80&w=800"
];

const drinkImages = [
    "https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop"
];

const Galleries = () => {
    return (
        <section className="py-20 bg-background-light">
            <div className="max-w-[1200px] mx-auto px-4">

                {/* Food Gallery */}
                <div className="mb-20">
                    <div className="text-center mb-10">
                        <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">Our Food</h2>
                        <div className="w-16 h-px bg-accent mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                        {foodImages.map((src, idx) => (
                            <div key={idx} className={`overflow-hidden rounded-xl bg-primary/5 ${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                                <img
                                    src={src}
                                    alt={`Food showcase ${idx + 1}`}
                                    className="w-full h-full object-cover aspect-square hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Drinks Gallery */}
                <div>
                    <div className="text-center mb-10">
                        <h2 className="text-4xl md:text-5xl font-serif text-primary mb-4">Our Bar</h2>
                        <div className="w-16 h-px bg-accent mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                        {drinkImages.map((src, idx) => (
                            <div key={idx} className="overflow-hidden rounded-xl bg-primary/5">
                                <img
                                    src={src}
                                    alt={`Drinks showcase ${idx + 1}`}
                                    className="w-full h-full object-cover aspect-[4/5] hover:scale-105 transition-transform duration-700"
                                />
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Galleries;
