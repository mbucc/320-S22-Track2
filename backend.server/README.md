# 320-S22-Track2
## Geting Started

### 1. Download the code
 The first step is to clone the repository

```bash
git clone https://github.com/david-fisher/320-S22-Track2.git
```
### 2. Install Maven
Use this link to auto install Maven to your maching </br>
https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.8.4/apache-maven-3.8.4-bin.zip

### 3. Make sure you have the right JDk
This project uses Java 11 </br>
Use this link to install the correct JDK </br>
https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html

### 4. Get spring boot to run on your machine
 In order to get code run, follow steps 
 1. In  `320-S22-Track2/backend.server/src/main/resource` open the templates folder
 2. In the templates folder there is `applicationTemplate.properties`
 4. In this file enter your username and password for the Code apes database
 3. Rename this file to `application.properties` 
 4. Then move this file from `320-S22-Track2/backend.server/src/main/resource/templates` to `320-S22-Track2/backend.server/src/main/resource`
 5. Navigate to `320-S22-Track2/backend.server/src/main/java/com/clog/Clog`
 6. Then open the `MainController.java` file 
 7. Running this file will get the springboot server running no your local machine

### 5. To run from the command line
Navigate to  `320-S22-Track2/backend.server`</br>
Use this comman to download the dependencies
```bash
mvn dependency:resolve
```
Use this command to run the server

```bash
mvn spring-boot:run
```
This command will download all depdencies, then build and deploy the server

<h2>Use these URL's to ensure yout spring boot it running </h2>

http://localhost:8080/clog/logDetail?id=crm_server_000001 

http://localhost:8080/clog/logEvents?businessDomain=All&eaiDomain=All&startTime=2022-01-22%2012:55:03.680000&endTime=2021-01-22%2012:45:03.480000&businessSubDomain=All&process=All&priorities=high,medium,low&categories=ReportSituation&severities=error,info&application=All

If these webpages contain information in the form `[{"global_instance_id":"accounting_server_000006",.....`
Your spring boot is running correctly

Possible issues:
If you get a port 8080 is in use change the value of server.port in the application.properties file

## API Documentation

https://docs.google.com/document/d/1YjxN6EU7HJrZut07Qz17Tm2g8T__OFQ6Nicekf79mHY/edit?usp=sharing
