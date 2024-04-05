const url = 'http://localhost:3000/users/740277871666266143';

fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok. Status: ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    // Başarılı bir şekilde veri alındı, kullanıcıya bilgi ver
    const userData = data.data.discord_user;
    console.log('Kullanıcı verisi:', userData);
  })
  .catch(error => {
    // Hata durumunda kullanıcıya bilgi ver
    console.error('Hata oluştu:', error.message);
  });
