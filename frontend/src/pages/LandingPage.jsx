import { Link } from 'react-router-dom';

const CULTURE_POINTS = [
  { icon: 'Innovation', symbol: '✦', title: 'Innovation', description: 'Work on cutting-edge projects that push boundaries and shape the future of technology.' },
  { icon: 'Career growth', symbol: '↗', title: 'Career Growth', description: 'Clear career paths, mentorship programs, and continuous learning opportunities for every team member.' },
  { icon: 'Great culture', symbol: '◎', title: 'Great Culture', description: 'A diverse, inclusive workplace where collaboration and creativity thrive every day.' },
  { icon: 'Global impact', symbol: '◌', title: 'Global Impact', description: "Your work reaches millions of users worldwide, making a real difference in people's lives." },
];

/** Render culture messaging and calls to express interest.
 *
 * Returns:
 *   The public HireHub landing page.
 */
export default function LandingPage() {
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-content">
          <p className="hero-kicker">A place to do meaningful work</p>
          <h1 id="hero-title">Build Your Future With Us</h1>
          <p>Join a team that values innovation, collaboration, and growth. We&apos;re looking for talented people like you.</p>
          <Link className="button button-hero" to="/apply">Express Your Interest</Link>
        </div>
      </section>

      <section className="culture-section" aria-labelledby="culture-title">
        <div className="content-width">
          <p className="section-label">The HireHub experience</p>
          <h2 id="culture-title">Why Join Us?</h2>
          <div className="culture-grid">
            {CULTURE_POINTS.map((point) => (
              <article className="culture-card" key={point.title}>
                <span aria-hidden="true" className="culture-icon">{point.symbol}</span>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bottom-cta" aria-labelledby="next-step-title">
        <h2 id="next-step-title">Ready to take the next step?</h2>
        <Link className="button button-hero" to="/apply">Apply Now</Link>
      </section>
    </>
  );
}
