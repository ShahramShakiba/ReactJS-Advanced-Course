import NewsletterSignup from '../components/NewsletterSignup';
import PageContent from '../components/PageContent';

export default function NewsletterPage() {
  return (
    <PageContent title="Join Our Awesome Newsletter!">
      <NewsletterSignup />
    </PageContent>
  );
}

export async function action({ request }) {
  const data = await request.formData();
  const email = data.get('email');

  // send to backend newsletter server ...
  console.log(email);
  return { message: 'Signup Successful!' };
}
