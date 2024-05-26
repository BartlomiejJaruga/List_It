**Zainstaluj:**

java 21 https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html

node v20.12.1 https://nodejs.org/en/blog/release/v20.12.1

pgadmin4 https://www.pgadmin.org/download/pgadmin-4-windows/

postgres https://www.postgresql.org/download/

**Pgadmin4**

włącz pgadmin4 i utwórz bazę List_It

**Kolejka komend:**

winget install Chocolatey.Chocolatey

choco install maven  //cmd with admin priviliges

choco install make

cd .\List_It\backend\list_it\

mvn install

w pliku List_It\backend\list_it\src\main\resources\application.properties

zmień na własne hasło i login w pgadmin

spring.datasource.username=postgres

spring.datasource.password=postgres


kliknij prawy przycisk myszy na plik ShopApplication i kliknij Run 'ShopApplication'


**Frontend**

Uzywając komendy 

cd ..

przejdź do List_It a następnie do aplikacji użytkownika, administratora lub pracownika w następujący sposób:

cd aplikacja_uzytkownika 

npm install

npm install react-router-dom

yarn add react-router-dom

**błąd**

jeśli pojawił się u ciebie błąd związny z yarn

npm install --global yarn

npm install bootstrap react-bootstrap

yarn add bootstrap react-bootstrap

npm install @mui/material @emotion/react @emotion/styled

npm start

jeśli pojawił się u ciebie błąd związany z yarn zainstaluj go po przez komendę

npm install --global yarn
