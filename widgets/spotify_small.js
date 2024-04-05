// widget1 modülü
async function render(client, discordID, theme) {
  
  try {
      const user = await client.users.fetch(discordID);
      // Kullanıcının bulunduğu sunucuyu al
      const guild = client.guilds.cache.get('961743048268742668'); // 'YOUR_GUILD_ID' kısmını kendi sunucu ID'nizle değiştirin

      let spotify_small;
      if (guild) {
          const member = await guild.members.fetch({ user, force: true });
          const activities = member.presence?.activities || [];
          console.log(activities);
          spotify_small = activities.find(activity => activity.name === 'Spotify');
          console.log(spotify_small);
      }

      // Etkinlik bulunamazsa
      if (!spotify_small) {
          console.log('Etkinlik Bulunamadı.');
          return `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <style>
                  #spotify {
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
                      width:300px;
                      background-color: ${theme === 'dark' ? '#08080a' : '#ededed'}; /* Temaya göre arka plan rengi */
                      color: ${theme === 'dark' ? '#fff' : '#000'}; /* Temaya göre metin rengi */   
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
                      .not-found {
                          font-size: 18px;
                          font-weight: 500;
                          color: ${theme === 'dark' ? '#bebebe' : '#777'};
                      }
                  </style>
              </head>
              
              <body>

                  <div id="spotify">    
                            <div class="cornerText">ROCKSAI</div>
                      <p class="not-found">Not currently on Spotify.</p>
                  </div>
              </body>
              </html>
          `;
      }


        // Geçen süre hesaplamalarını yap
        const startTime = spotify_small.timestamps.start;
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
                #spotify {
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
                  width:300px;
                  background-color: ${theme === 'dark' ? '#08080a' : '#ededed'}; /* Temaya göre arka plan rengi */
                          
                }
              
              .svg svg {
              
                height: auto; /* Oranları koru */
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Örnek bir yazı tipi */
              }
              
              .svg {
                margin-right: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              
                .textContainer {
              margin-top: 1px;
                  display: flex;
                  flex-direction: column;
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Örnek bir yazı tipi */
                }
              
                .subText {
                font-weight: 700;
                font-size: 15px;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Örnek bir yazı tipi */
                display: flex;
                align-items: center;
                justify-content: center;
                color: ${theme === 'dark' ? '#e6e6e6' : ' #000'};
                  
                }   
                .cornerText {
                  position: absolute;
                  top: 40px;
                  right: 5px;
                  color: ${theme === 'dark' ? '#bebebe' : ' #777'};
                  font-weight: 200; /* Normal yazı tipi */
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Örnek bir yazı tipi */
                  font-size: 12px;
                }
                </style>
            </head>
            <div id="spotify">
            <div class="cornerText">ROCKSAI</div>
            <div class="svg">
            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" style="fill: ${theme === 'dark' ? '#ededed' : 'evenodd'};" fill-rule="evenodd" clip-rule="evenodd"><path d="M19.098 10.638c-3.868-2.297-10.248-2.508-13.941-1.387-.593.18-1.22-.155-1.399-.748-.18-.593.154-1.22.748-1.4 4.239-1.287 11.285-1.038 15.738 1.605.533.317.708 1.005.392 1.538-.316.533-1.005.709-1.538.392zm-.126 3.403c-.272.44-.847.578-1.287.308-3.225-1.982-8.142-2.557-11.958-1.399-.494.15-1.017-.129-1.167-.623-.149-.495.13-1.016.624-1.167 4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm-1.469 3.267c-.215.354-.676.465-1.028.249-2.818-1.722-6.365-2.111-10.542-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.595 11.655 1.338.353.215.464.676.248 1.028zm-5.503-17.308c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12z"/></svg>
         </div>
            <div class="textContainer">
              <div class="subText">${spotify_small.details}</div>
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
                #spotify {
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
                  width:300px;
                  background-color: ${theme === 'dark' ? '#08080a' : '#ededed'}; /* Temaya göre arka plan rengi */
                  color: ${theme === 'dark' ? '#fff' : '#000'}; /* Temaya göre metin rengi */     
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
                    .not-found {
                        font-size: 18px;
                        font-weight: 500;
                        color: ${theme === 'dark' ? '#bebebe' : '#777'};
                    }
                </style>
            </head>
            
            <body>
        
                <div id="spotify">   
                 <div class="cornerText">ROCKSAI</div>
                    <p class="not-found">Not currently on Spotify.</p>
                </div>
            </body>
            </html>
        `;
    }
}

module.exports = {
    render
};
