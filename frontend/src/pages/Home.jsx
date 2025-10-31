import React, { useEffect, useState } from 'react'
import api from '../api/api.js';
import ExperienceCard from '../components/ExperienceCard.jsx';
import Navbar from '../components/Navbar.jsx';
import Layout from '../components/Layout.jsx';
const Home = ({searchQuery}) => {

    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        const fetchExperiences = async () => {

            try {

                const res = await api.get("/experiences");

                setExperiences(res.data);
                setFiltered(res.data);
                setLoading(false);

            } catch (error) {
                console.error("Error fetching experiences:", error);
                setLoading(false);
            }
        }
        fetchExperiences();
    }, []);

    
    useEffect(() => {
        if (!searchQuery) {
            setFiltered(experiences);
        } else {
            const results = experiences.filter((exp) =>
                exp.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFiltered(results);
        }
    }, [searchQuery, experiences]);

    if (loading) {
        return <div className='flex items-center justify-center'>Loading...</div>
    }



    return (

        <div className='pt-5 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-[124px] pb-'>
            {filtered.length === 0 ? (
                <div className="text-center text-gray-500 text-sm sm:text-base">No experiences found.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
                    {filtered.map((e) => (
                        <ExperienceCard key={e._id} experience={e} />
                    ))}
                </div>
            )}
        </div>

    )
}

export default Home
