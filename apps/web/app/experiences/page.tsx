import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Card from '../../components/Card';
import styles from './page.module.css';

const weeklyEvents = [
    {
        day: "Monday",
        events: [
            {
                title: "Family Movie Night",
                description: "Outdoor cinema experience for families under the stars.",
                location: "Garden Terrace",
                category: "Family",
                image: "/events/monday-movie.jpg"
            }
        ]
    },
    {
        day: "Tuesday",
        events: [
            {
                title: "Wine Tasting Dinner",
                description: "Exclusive wine tasting with our certified sommelier and our worderful dinner experience.",
                location: "Sky Lounge",
                category: "Lifestyle",
                image: "/events/tuesday-wine.jpg"
            }
        ]
    },
    {
        day: "Wednesday",
        events: [
            {
                title: "Live Jazz Evening",
                description: "Smooth live jazz with signature cocktails.",
                location: "Ocean Breeze Café",
                category: "Music",
                image: "/events/wednesday-jazz.jpg"
            }
        ]
    },
    {
        day: "Thursday",
        events: [
            {
                title: "Chef’s Special Night",
                description: "Limited gourmet menu curated by our executive chef.",
                location: "Aura Gourmet",
                category: "Dining",
                image: "/events/thursday-chef.jpg"
            }
        ]
    },
    {
        day: "Friday",
        events: [
            {
                title: "Mediterranean Night",
                description: "A themed dining experience inspired by Mediterranean flavors.",
                location: "Aura Gourmet",
                category: "Dining",
                image: "/events/friday-mediterranean.jpg"
            }
        ]
    },
    {
        day: "Saturday",
        events: [
            {
                title: "Foam Pool Party",
                description: "High-energy pool party with DJ and foam effects.",
                location: "Main Pool",
                category: "Party",
                image: "/events/saturday-foam.jpg"
            }
        ]
    },
    {
        day: "Sunday",
        events: [
            {
                title: "Luxury Brunch Experience",
                description: "Premium brunch buffet with live acoustic music.",
                location: "Ocean Breeze Café",
                category: "Lifestyle",
                image: "/events/sunday-brunch.jpg"
            }
        ]
    }
];

export default function EventsPage() {
    return (
        <div>
            <Navbar />
            <main className={`${styles.pageContainer} container`}>
                <h1 className={styles.heading}>Weekly Experiences</h1>
                <p className={styles.subheading}>
                    Discover everything happening at Nexus Hotel throughout the week.
                </p>

                {weeklyEvents.map((dayBlock) => (
                    <section key={dayBlock.day} className={styles.daySection}>
                        <h2 className={styles.dayTitle}>{dayBlock.day}</h2>

                        <div className={styles.grid}>
                            {dayBlock.events.map((event, index) => (
                                <Card
                                    key={index}
                                    title={event.title}
                                    description={event.description}
                                    image={event.image}
                                >
                                    <div className={styles.meta}>
                                        <span>📍 {event.location}</span>
                                    </div>
                                    <span className={styles.badge}>
                                        {event.category}
                                    </span>
                                </Card>
                            ))}
                        </div>
                    </section>
                ))}
            </main>
            <Footer />
        </div>
    );
}
