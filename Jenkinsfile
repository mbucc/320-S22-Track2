pipeline {
    agent any

    stages {
        stage('Download') {
            steps {
                // Get code from branch to test
                // This git command is using the Jenkins plugin. "git" here acts like "git checkout"
                git branch: 'main', url: 'https://github.com/david-fisher/320-S22-Track2.git'
            }
        }
        stage('npm Setup') {
            steps{
                dir("front-end"){
                    sh 'npm install'
                } 
            }
            
        }
        
        stage('SyntaxCheck') {
            steps{
                dir("front-end") {
                    script {
                        try {
                            sh 'npm run lint'
                        }
                        catch(exc) {
                            error("It appears not all esLint rules have been met.")
                        }
                        // finally {
                        //     step([$class: 'ArtifactArchiver', artifacts: 'app/build/reports/staticAnalysis/lint/', fingerprint: true])
                        // }
                    }
                }
            }
        }
        
        stage('Build'){
          steps{
            dir("front-end") {
              script{
                sh 'npm run build'
                sh 'npm run start'
              }
            }
          }
        }

        stage('Cypress'){
          steps{
            dir("front-end") {
              script{
                try{
                  sh 'npx cypress run'
                }
                catch(exc){
                  error("Cypress test failed!")
                }
                
              }
            }
          }
        }
}
