export async function POST(request: Request) {
  const { email, city, country, country_name } = await request.json();

  try {
    const response = await fetch(
      'https://post2sheets-waitlist-gamesw-app.arashk-knj.workers.dev', 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          city,
          country,
          country_name,
        }),
      }
    );

    if (response.ok) {
      return new Response(JSON.stringify({ message: 'Email submitted successfully!' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      const errorData = await response.text();
      return new Response(JSON.stringify({ message: 'Failed to submit email', error: errorData }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Submission error:', error);
    return new Response(JSON.stringify({ message: 'Internal server error', error: String(error) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
