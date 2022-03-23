# 320-S22-Track2
## Geting Started

### 1. Download the code
 The first step is to clone the repository

```bash
git clone https://github.com/david-fisher/320-S22-Track2.git
```
 After the repository is cloned switch to the `cafebabe_dev` branch

```bash
git checkout cafebabe_dev
```

### 2. Get spring boot to run on your machine
 In order to get code run, follow steps 
 1. In  `320-S22-Track2/backend.server/src/main/resource` open the templates folder
 2. In the templates folder there is `applicationTemplate.properties`
 4. In this file enter your username and password for the Code apes database
 3. Rename this file to `application.properties` 
 4. Then move this file from `320-S22-Track2/backend.server/src/main/resource/templates` to `320-S22-Track2/backend.server/src/main/resource`
 5. Navigate to `320-S22-Track2/backend.server/src/main/java/com/clog/Clog`
 6. Then open the MainController.java file 
 7. Running this file will get the springboot server running no your local machine

<h2>Use these URL's to ensure yout spring boot it running </h2>

http://localhost:8080/clog/logDetail?id=crm_server_000001 

http://localhost:8080/clog/logEvents?businessDomain=All&eaiDomain=All&startTime=2022-01-22%2012:55:03.680000&endTime=2021-01-22%2012:45:03.480000&businessSubDomain=All&process=All&priorities=high,medium,low&categories=ReportSituation&severities=error,info&application=All

If these webpages contain information in the form `[{"global_instance_id":"accounting_server_000006",.....`
Your spring boot is running correctly

Possible issues:
If you get a port 8080 is in use change the value of server.port in the application.properties file
