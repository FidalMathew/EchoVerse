import { Link } from 'react-router-dom';

const Categories = () => {

    // "FamilyDynamics",  "HealthChallenges","PersonalGrowth","Relationships","MentalHealth","ParentingExperiences",WorkplaceIssues","FinancialStruggles", "SocialIssues", "Others"
    const categories = [
        { name: 'Family Dynamics', slug: 'FamilyDynamics' },
        { name: 'Health Challenges', slug: 'HealthChallenges' },
        { name: 'Personal Growth', slug: 'PersonalGrowth' },
        { name: 'Relationships', slug: 'Relationships' },
        { name: 'Mental Health', slug: 'MentalHealth' },
        { name: 'Parenting Experiences', slug: 'ParentingExperiences' },
        { name: 'Workplace Issues', slug: 'WorkplaceIssues' },
        { name: 'Financial Struggles', slug: 'FinancialStruggles' },
        { name: 'Social Issues', slug: 'SocialIssues' },
        { name: 'Others', slug: 'Others' },
        { name: 'Reset', slug: 'Reset' },
    ];

    const addQuery = (slug) => {
        // Add query to the URL
        if (slug === 'Reset') return window.location.href = window.location.origin;

        const url = new URL(window.location.href);
        url.searchParams.set('category', slug);
        window.location.href = url;
    }


    const urlParams = new URLSearchParams(window.location.search);
    const cat = urlParams.get('category');


    return (
        <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
            <h3 className="text-xl mb-8 font-semibold border-b pb-4">Categories</h3>
            {categories.map((category, index) => (
                <Link key={index}>
                    {console.log(category.slug, cat, category.slug === cat)}
                    <span onClick={() => addQuery(category.slug)}
                        className={`cursor-pointer block ${(index === categories.length - 1) ? 'border-b-0' : 'border-b'} 
                            ${(category.slug === cat) ? 'text-pink-600' : 'text-gray-600'}
                            pb-3 mb-3`

                        }>{category.name}</span>
                </Link>
            ))}
        </div>
    );
};

export default Categories;