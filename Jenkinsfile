pipeline {
    agent any

    stages {
        stage('Hello') {
            steps {
                echo 'Hello World'
            }
        }
        stage('Build') {
            setps {
                git "https://github.com/david-fisher/320-S22-Track2.git"
                sh "ls"
            }
        }
    }
}
