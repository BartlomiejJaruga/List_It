@echo off

echo Czyszczenie projektu Mavena...
call mvn clean

echo Instalacja zależności i uruchomienie aplikacji Spring Boot...
call mvn install
call mvn spring-boot:run
exit