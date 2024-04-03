export default function NewsletterSignup() {
  return (
    <form method="post" className="newsletter">
      <input
        type="email"
        placeholder="Sign up for Newsletter..."
        aria-label="Sign up for Newsletter"
      />

      <button> Sign up </button>
    </form>
  );
}
