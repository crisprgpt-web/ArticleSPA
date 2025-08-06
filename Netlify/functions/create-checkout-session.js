const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const { tier } = JSON.parse(event.body || '{}');
  const prices = {
    starter: 'price_abc123',
    personal: 'price_def456',
    business: 'price_ghi789',
    enterprise: 'price_xyz999'
  };

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price: prices[tier],
        quantity: 1
      }],
      success_url: 'https://yourdomain.netlify.app/success.html',
      cancel_url: 'https://yourdomain.netlify.app/cancel.html'
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ sessionId: session.id })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
