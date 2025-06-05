const REDIRECT_URI = 'https://bernardarikuoko.com.ng/api/auth/callback';

const getZohoTokens = async () => {
  try {
    // Step 1: Get authorization code
    // Visit this URL in browser:
    // https://accounts.zoho.com/oauth/v2/auth?scope=ZohoMail.messages.CREATE&client_id=1000.VN4CYRXHFE9PUXXQ68KRNTL47DIFSS&response_type=code&access_type=offline&redirect_uri=https://bernardarikuoko.com.ng/api/auth/callback

    // Step 2: Exchange code for tokens
    const response = await fetch(`${process.env.ZOHO_ACCOUNTS_URL}/oauth/v2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code: process.env.ZOHO_CODE, // Replace with code from Step 1
        client_id: process.env.ZOHO_CLIENT_ID,
        client_secret: process.env.ZOHO_CLIENT_SECRET,
        grant_type: 'authorization_code',
        redirect_uri: REDIRECT_URI
      })
    });

    const data = await response.json();
    console.log('Access Token:', data.access_token);
    console.log('Refresh Token:', data.refresh_token);
    
    return data;
  } catch (error) {
    console.error('Error getting tokens:', error);
    return null;
  }
};

export { getZohoTokens };
