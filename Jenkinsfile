pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                // Get code from branch to test
                // This git command is using the Jenkins plugin. "git" here acts like "git checkout"
                git branch: 'codeApes-tests', url: 'https://github.com/david-fisher/320-S22-Track2.git'
                
                //An example of how maven can be used. Default example. Has nothing to do with our repo setup yet
                //sh "mvn -Dmaven.test.failure.ignore=true clean package"

            }
            
            
            //READ FOR BELOW: More default stuff. Not sure if needed yet
            //post {
                // If Maven was able to run the tests, even if some of the test
                // failed, record the test results and archive the jar file.
            //    success {
            //        junit '**/target/surefire-reports/TEST-*.xml'
            //        archiveArtifacts 'target/*.jar'
            //    }
            //}
        }
    }
}
