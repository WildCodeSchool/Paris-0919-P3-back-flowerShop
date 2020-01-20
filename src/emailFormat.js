export const mailToCompany = ({
  firstName,
  lastName,
  email,
  phone,
  city,
  textContent,
  subject
}) => {
  return {
    to: email,
    from: 'eclosion@email.eclosion.com',
    subject: `${subject} - ${firstName} ${lastName}`,
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
    subject: 'Confirmation de la reception du mail',
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

export const orderToCompany = ({
  firstName,
  lastName,
  email,
  phone,
  address,
  city,
  products,
  textContent
}) => {
  const productsToString = products
    .map(
      product =>
        ` <tr>
            <td>${product.name}</td>
            <td>${product.size}</td>
          </tr>`
    )
    .join('');
  return {
    to: email,
    from: 'eclosion@email.eclosion.com',
    subject: `Nouvelle Commande - ${firstName} ${lastName}`,
    html: `
      <h2>Information client</h2>
      <ul>
        <li>Prénom: ${firstName}</li>
        <li>Nom: ${lastName}</li>
        <li>Email: ${email}</li>
        <li>Téléphone: ${phone}</li>
        <li>Adresse: ${address}</li>
        <li>Ville: ${city}</li>
      </ul>
      </br>
      <h2>Contenu de la commande</h2>
      <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Taille</th>
            </tr>
          </thead>
          <tbody>
            ${productsToString}
          </tbody>
      </table>
      </br>
      <h2>Renseignements supplémentaires</h2>
      <p>${textContent}</p>
      `
  };
};

export const orderToCustomer = ({
  firstName,
  lastName,
  email,
  address,
  city,
  products
}) => {
  const productsToString = products
    .map(
      product =>
        ` <tr>
            <td>${product.name}</td>
            <td>${product.size}</td>
          </tr>`
    )
    .join('');
  return {
    to: email,
    from: 'eclosion@email.eclosion.com',
    subject: 'Confirmation de la reception du mail',
    html: `
      <p>Bonjour ${firstName} ${lastName},</p>
      </br>
      <p>Nous vous remercions pour votre commande et pour la confiance accordée à Eclosion.</p>
      </br>
      <h2>Récapitulatif de la commande</h2>
      <h3>Addresse de livraison</h3>
      <ul>
        <li>${firstName} ${lastName}</li>
        <li>${address}</li>
        <li>${city}</li>
      </ul>
      </br>
      <h3>Produits commandés</h3>
      <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Taille</th>
            </tr>
          </thead>
          <tbody>
            ${productsToString}
          </tbody>
      </table>
      </br>
      <p>Cordialement,</p>
      <p>Eclosion</p>
    `
  };
};
