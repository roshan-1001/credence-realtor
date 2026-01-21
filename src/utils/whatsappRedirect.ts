/**
 * Utility function to redirect form submissions to WhatsApp
 * @param phoneNumber - WhatsApp number (with country code)
 * @param formData - Object containing form field values
 * @returns WhatsApp URL
 */
export const redirectToWhatsApp = (phoneNumber: string, formData: Record<string, any>): string => {
  // Format the message from form data
  let message = 'Hello! I have a query:\n\n';
  
  Object.entries(formData).forEach(([key, value]) => {
    if (value && value !== '') {
      // Capitalize the key and format it nicely
      const formattedKey = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim();
      message += `*${formattedKey}:* ${value}\n`;
    }
  });

  // Encode the message for URL
  const encodedMessage = encodeURIComponent(message);
  
  // Create WhatsApp URL
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  
  return whatsappUrl;
};

/**
 * Open WhatsApp with pre-filled message in a new tab
 */
export const openWhatsApp = (phoneNumber: string, formData: Record<string, any>): void => {
  const url = redirectToWhatsApp(phoneNumber, formData);
  window.open(url, '_blank');
};
