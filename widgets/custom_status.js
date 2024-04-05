// widget1 modülü
async function render(client, discordID, theme) {
  
  try {
      const user = await client.users.fetch(discordID);
      // Kullanıcının bulunduğu sunucuyu al
      const guild = client.guilds.cache.get('961743048268742668'); // 'YOUR_GUILD_ID' kısmını kendi sunucu ID'nizle değiştirin

      let custom_status;
      if (guild) {
          // Kullanıcının sunucudaki varlığını al
          const member = await guild.members.fetch({ user, force: true });

          // Tüm etkinlikleri kontrol et
          const activities = member.presence?.activities || [];
          console.log(activities);

          // VSC etkinliğini çekme
          custom_status = activities.find(activity => activity.name === 'Custom Status');
          console.log(custom_status);
      }

      // Etkinlik bulunamazsa
      if (!custom_status) {
          console.log('Etkinlik Bulunamadı.');
          return `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <style>
                  #status {
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
                    width:330px;
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

                  <div id="status">           
                     <div class="cornerText">ROCKSAI</div>
                      <p class="not-found">The status is currently inactive.</p>
                  </div>
                  <script>
                  // SetInterval ekleyerek belirli aralıklarla bir işlem yapabilirsiniz
                  setInterval(function() {
                      // Bu kısıma, belirli aralıklarla çalışmasını istediğiniz JavaScript kodlarını ekleyebilirsiniz
                      console.log('Interval çalıştı!');
                  }, 1000); // Örneğin, her 1000 milisaniyede bir (1 saniye) çalışacak şekilde ayarlanmıştır
              </script>
                  </body>
              </html>
          `;
      }
      let imgTag = '';

      if (custom_status.emoji && custom_status.emoji.name) {
          if (custom_status.emoji.id === null) {
              imgTag = `${custom_status.emoji.name}`;
          } else {
              imgTag = `<img src="${custom_status.emoji.url}" width="24" height="24" alt="Şarkı Kapak Resmi">`;
          }
      } else if (custom_status.emoji && custom_status.emoji.url) {
          imgTag = `<img src="${custom_status.emoji.url}" width="24" height="24" alt="Şarkı Kapak Resmi">`;
      } else {
          imgTag = '';
      }
      
      

        // Geçen süre hesaplamalarını yap
        const startTime = custom_status.timestamps.start;
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
            <body>
            <div id="spotify">
          <div class="cornerText">ROCKSAI</div>
          <div class="svg">
        ${imgTag}
          </div>
          <div class="textContainer">
          <div class="subText">${custom_status.state}</div>
      
          </div>
          <script>
          // SetInterval ekleyerek belirli aralıklarla bir işlem yapabilirsiniz
          setInterval(function() {
              // Bu kısıma, belirli aralıklarla çalışmasını istediğiniz JavaScript kodlarını ekleyebilirsiniz
              console.log('Interval çalıştı!');
          }, 1000); // Örneğin, her 1000 milisaniyede bir (1 saniye) çalışacak şekilde ayarlanmıştır
      </script>
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
                #status {
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
                  width:330px;
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
     
                <div id="status">  
                     <div class="cornerText">ROCKSAI</div>
                    <p class="not-found"The status is currently inactive.</p>
                </div>
                <script>
                // SetInterval ekleyerek belirli aralıklarla bir işlem yapabilirsiniz
                setInterval(function() {
                    // Bu kısıma, belirli aralıklarla çalışmasını istediğiniz JavaScript kodlarını ekleyebilirsiniz
                    console.log('Interval çalıştı!');
                }, 1000); // Örneğin, her 1000 milisaniyede bir (1 saniye) çalışacak şekilde ayarlanmıştır
            </script>
            </body>
            </html>
        `;
    }
}

module.exports = {
    render
};
