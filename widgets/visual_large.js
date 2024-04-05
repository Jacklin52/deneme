// widget1 modülü
async function render(client, discordID, theme) {
  
  try {
      const user = await client.users.fetch(discordID);
      // Kullanıcının bulunduğu sunucuyu al
      const guild = client.guilds.cache.get('961743048268742668'); // 'YOUR_GUILD_ID' kısmını kendi sunucu ID'nizle değiştirin

      let vscActivity;
      if (guild) {
          // Kullanıcının sunucudaki varlığını al
          const member = await guild.members.fetch({ user, force: true });

          // Tüm etkinlikleri kontrol et
          const activities = member.presence?.activities || [];
          console.log(activities);

          // VSC etkinliğini çekme
          vscActivity = activities.find(activity => activity.name === 'Visual Studio Code');
          console.log(vscActivity);
      }

      // Etkinlik bulunamazsa
      if (!vscActivity) {
          console.log('Etkinlik Bulunamadı.');
          return `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <style>
                  #vsc {
                    border: 1px solid #ddd;
                    padding: 16px;
                    border-radius: 8px;
                    margin-top: 20px;
                    display: flex;
                    align-items: flex-start;
                    justify-content: flex-start;
                    flex-direction: row;
                    position: relative;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Örnek bir yazı tipi */
                    width: 450px;
                    background-color: ${theme === 'dark' ? '#08080a' : '#ededed'}; /* Temaya göre arka plan rengi */
                    color: ${theme === 'dark' ? '#fff' : '#000'}; /* Temaya göre metin rengi */
                }

                      .not-found {
                          font-size: 18px;
                          font-weight: 500;
                          color: ${theme === 'dark' ? '#bebebe' : '#777'};
                      }
                      .cornerText {
                        position: absolute;
                        bottom: 3px; /* Sağ alt köşe */
                        right: 5px;
                        color: ${theme === 'dark' ? '#bebebe' : '#777'};
                        font-weight: 200;
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        font-size: 12px;
                        height: auto;
                    }
                  </style>
              </head>
              
              <body>
         
                  <div id="vsc">    
                   <div class="cornerText">ROCKSAI</div>
                      <p class="not-found">Currently not working in Visual Studio Code 💻.</p>
                  </div>
              </body>
              </html>
          `;
      }


        // Geçen süre hesaplamalarını yap
        const startTime = vscActivity.timestamps.start;
        const currentTime = new Date().getTime();
        const elapsedTime = currentTime - startTime;
        const elapsedSeconds = Math.floor(elapsedTime / 1000);
        const hours = Math.floor(elapsedSeconds / 3600);
        const minutes = Math.floor((elapsedSeconds % 3600) / 60);
        const seconds = elapsedSeconds % 60;
        const displayHours = hours !== 0 ? `${hours}:` : '';
        // Tema stiline göre CSS sınıflarını belirle
        const themeClass = theme === 'dark' ? 'dark-theme' : 'light-theme';

        // Örnek olarak bir HTML şablonu döndürme
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                #vsc {
                  border: 1px solid #ddd;
                  padding: 16px;
                  border-radius: 8px;
                  margin-top: 20px;
                  display: flex;
                  align-items: flex-start;
                  justify-content: flex-start;
                  flex-direction: row;
                  position: relative;
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Örnek bir yazı tipi */
                  width: 450px;
                  background-color: ${theme === 'dark' ? '#08080a' : '#ededed'}; /* Temaya göre arka plan rengi */
                  color: ${theme === 'dark' ? '#fff' : '#000'}; /* Temaya göre metin rengi */
              }
                
                .imgss img {
                  max-width: 50px; /* Resmi konteynırın genişliğine sığacak şekilde ayarla */
                  height: auto; /* Oranları koru */
                  background-color:  ${theme === 'dark' ? '#0f0f0f' : '#000'};
                  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Örnek bir yazı tipi */
                }
                
                .imgss {
                  max-width: 120px;
                  height: 50px; /* İstediğiniz bir yükseklik */
                  padding: 28px; /* İstediğiniz bir iç boşluk */
                  border-radius: 8px; /* Kenarları ovalleştiren stil */
                  margin-right: 20px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  background-color: ${theme === 'dark' ? '#0f0f0f' : '#0f0f0f'}; /* Temaya göre arka plan rengi */
              
                }
                
                  .textContainer {
                    margin-top:5px;
                    display: flex;
                    flex-direction: column;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Örnek bir yazı tipi */
                  }
                
                  .largeText {
                    font-size: 22px; /* Daha büyük font boyutu */
                    font-weight: 500; /* Daha kalın yazı tipi */
                    color:  ${theme === 'dark' ? '#e0dfdf' : '#202020'};
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Örnek bir yazı tipi */
                  }
                
                  .subText {
                    color: ${theme === 'dark' ? '#e0dfdf' : '#202020'};
                    font-weight: 400;
                    font-size: 14px;
                    opacity: 0.7;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Örnek bir yazı tipi */
                    margin-bottom: 1px;
                  }
                
                  .cornerText {
                    position: absolute;
                    top: 0;
                    right: 0;
                    padding: 4px 8px;
                    color: #777;
                    font-weight: 200; /* Normal yazı tipi */
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Örnek bir yazı tipi */
                    font-size: 12px;
                  }
                </style>
            </head>
            
            <body>
            <div id="vsc">
            <div class="cornerText">ROCKSAI</div>
            <div class="imgss"> 
              <img src="https://cdn.discordapp.com/app-assets/${vscActivity.applicationId}/${vscActivity.assets.largeImage}.png" alt="Şarkı Kapak Resmi">
            </div>
            <div class="textContainer">
              <div class="subText">${vscActivity.details}</div>
              <div class="largeText">Visual Studio Code</div>
              <div class="subText">${vscActivity.state}</div>
              <div class="subText" id="elapsedTime">${displayHours}${minutes}:${seconds} elapsed</div>
            </div>
            </div>
            </body>
            </html>
        `;

    } catch (error) {
        console.error('Veri çekme hatası:', error);
        console.log('Etkinlik Bulunamadı.'); // Loga Etkinlik Bulunamadı mesajını ekle
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                #vsc {
                  border: 1px solid #ddd;
                  padding: 16px;
                  border-radius: 8px;
                  margin-top: 20px;
                  display: flex;
                  align-items: flex-start;
                  justify-content: flex-start;
                  flex-direction: row;
                  position: relative;
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Örnek bir yazı tipi */
                  width: 450px;
                  background-color: ${theme === 'dark' ? '#08080a' : '#ededed'}; /* Temaya göre arka plan rengi */
                  color: ${theme === 'dark' ? '#fff' : '#000'}; /* Temaya göre metin rengi */
              }
                    .not-found {
                        font-size: 18px;
                        font-weight: 500;
                    }
                    .cornerText {
                      position: absolute;
                      bottom: 3px; /* Sağ alt köşe */
                      right: 5px;
                      color: ${theme === 'dark' ? '#bebebe' : '#777'};
                      font-weight: 200;
                      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                      font-size: 12px;
                      height: auto;
                  }
                </style>
            </head>
            
            <body>
   
                <div id="vsc">     
                    <div class="cornerText">ROCKSAI</div>
                    <p class="not-found">Currently not working in Visual Studio Code 💻.</p>
                </div>
            </body>
            </html>
        `;
    }
}

module.exports = {
    render
};
