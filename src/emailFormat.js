export const mailToCompany = ({
  firstName,
  lastName,
  email,
  phone,
  city,
  textContent
}) => {
  return {
    to: email,
    from: 'eclosion@email.eclosion.com',
    subject: `Demandes d'informations - ${firstName} ${lastName}`,
    html: `
      <h2>Information client</h2>
      <ul>
        <li>Prénom: ${firstName}</li>
        <li>Nom: ${lastName}</li>
        <li>Email: ${email}</li>
        <li>Téléphone: ${phone}</li>
        <li>Ville: ${city}</li>
      </ul>
      <h2>Contenu du mail</h2>
      <p>${textContent}</p>
      `
  };
};

export const mailToCustomer = ({ firstName, lastName, email }) => {
  return {
    to: email,
    from: 'eclosion@email.eclosion.com',
    subject: 'Confirmation reception du mail',
    html: `
      <p>Bonjour ${firstName} ${lastName},</p>
      </br>
      <p>Noux avons bien reçu votre mail et nous reviendrons vers vous le plus rapidement possible.</p>
      </br>
      <p>Cordialement,</p>
      <p>Eclosion</p>
    `
  };
};