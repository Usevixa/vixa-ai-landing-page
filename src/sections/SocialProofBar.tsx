// §6.3 — single centered line, both numbers count up on entry (M6).
export default function SocialProofBar() {
  return (
    <section className="section-pad gutter" aria-label="Usage">
      <p className="content-col text-title text-center font-display font-medium">
        Trusted by{' '}
        <span className="text-vx-lime">
          <span data-counter="9760">9760</span>+
        </span>{' '}
        users across <span className="text-vx-lime" data-counter="19">19</span> countries.
      </p>
    </section>
  );
}
