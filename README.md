# Potrzebne Technologie i aplikacje:

[Java v21](https://www.oracle.com/java/technologies/javase/jdk21-archive-downloads.html) &nbsp;&nbsp; //dodać do PATH

[NodeJS v20.12.1](https://nodejs.org/en/blog/release/v20.12.1) &nbsp;&nbsp; //dodać do PATH

[Postgresql](https://www.postgresql.org/download/)

[pgAdmin 4](https://www.pgadmin.org/download/pgadmin-4-windows/)

<br>

# Kolejność działań:

1. pgAdmin 4

    - włącz pgAdmin 4 i utwórz bazę `List_It`

    - w pliku `List_It\backend\list_it\src\main\resources\application.properties` zmień na własne hasło i login utworzone podczas instalacji pgAdmin (użytkownik postgres) 

```
spring.datasource.username=postgres

spring.datasource.password=[hasło]
```

<br>

2. cmd (uruchomione jako administrator)

```
winget install Chocolatey.Chocolatey
```

> [!IMPORTANT]
> Teraz zrestartuj cmd

```
choco install maven -y
```

<br>

# Uruchamianie aplikacji:

## Włączenie Back-endu:

1. Przejdź do folderu [path\to\project]\List_It\backend\list_it\

2. Uruchom plik `launch_backend.bat`

> [!IMPORTANT]
> Po uruchomieniu pliku `launch_backend.bat` w konsoli wykonają się kolejne polecenia. Gdy już nic więcej nie będzie sie wykonywało back-end jest gotowy i możemy przejść do włączenia front-endu (pozostaw tą konsole włączoną).

<br>

## Włączenie Front-endu:

**Przy użyciu eksplolatora plików:**

1. Przejdź do List_It, a następnie do folderu aplikacji użytkownika, administratora lub pracownika

2. Uruchom plik `launch_app.bat`

3. Wejdź w link `http://localhost:xxxx/` (x - cyfry portu)

<br>

**Przy użyciu cmd lub terminala w dowolnym Idle (np. Visual Studio Code):**

1. Przejdź do List_It a następnie do folderu aplikacji użytkownika, administratora lub pracownika w następujący sposób:

```
cd aplikacja_pracownika
```

2. Wykonaj następujące polecenie:
```
launch_app.bat
```

3. Wejdź w link `http://localhost:xxxx/` (x - cyfry portu)

<br>

# Błędy:

- Jeśli pojawił się błąd związany z ***Java*** (np. *JDK wasn't found*) to upewnij się, że folder w którym zainstalowana została ***Java*** jest dodany do PATH (folder /bin)
- Jeśli pojawił się błąd związany z poleceniem `npm` to upewnij się, że folder w którym zainstowany jest ***Node.js*** jest dodany do PATH (folder /bin)
- Jeśli po kliknięciu przycisku 'Log in' na stronie logowania nic się nie dzieje to znaczy, że baza jest wyłączona albo back-end jest wyłączony. Upewnij się, że po włączeniu back-endu konsola pozostała otwarta oraz że pgAdmin jest włączony.
