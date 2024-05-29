# Potrzebne Technologie i aplikacje:

[Java v21](https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html)

[NodeJS v20.12.1](https://nodejs.org/en/blog/release/v20.12.1)

[Postgresql](https://www.postgresql.org/download/)

[pgAdmin 4](https://www.pgadmin.org/download/pgadmin-4-windows/)

# Kolejność działań:

1. pgAdmin 4

    - włącz pgAdmin 4 i utwórz bazę List_It

    - w pliku List_It\backend\list_it\src\main\resources\application.properties zmień na własne hasło i login w pgadmin

```
spring.datasource.username=[Nazwa_użytkownika]

spring.datasource.password=[Hasło]
```

2. cmd (uruchomione jako administrator)

```
winget install Chocolatey.Chocolatey

choco install maven

cd [path\to\project]\List_It\backend\list_it\

mvn clean

mvn install

mvn spring-boot:run
```

# Uruchamianie aplikacji:

**Przy użyciu cmd lub terminala w dowolnym Idle (np. Visual Studio Code):**

1. Przejdź do List_It a następnie do aplikacji użytkownika, administratora lub pracownika w następujący sposób:

```
cd aplikacja_uzytkownika 
```

2. Wykonaj następujące polecenia:
```
npm install

npm install react-router-dom

yarn add react-router-dom

npm install bootstrap react-bootstrap

yarn add bootstrap react-bootstrap

npm install @mui/material @emotion/react @emotion/styled

npm start
```
3. Wejdź w link `localhost:xxxx` (x - cyfry portu)

# Błędy:

- Jeśli pojawił się u ciebie błąd związany z yarn zainstaluj go po przez komendę
```
npm install --global yarn
```
