export const sendEmail = async (formData) => {
  try {
    const response = await fetch('https://api.zoho.com/mail/3/messages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.ZOHO_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fromAddress: 'contact@bernardarikuoko.com.ng',
        toAddress: 'contact@bernardarikuoko.com.ng',
        subject: `Portfolio Contact: ${formData.subject}`,
        content: `
          Name: ${formData.name}
          Email: ${formData.email}
          Message: ${formData.message}
        `
      })
    });
    
    return response.ok;
  } catch (error) {
    console.error('Email send error:', error);
    return false;
  }
};
