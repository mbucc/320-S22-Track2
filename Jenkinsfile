pipeline {
    agent any
    options {
        ansiColor('xterm')
    }
    
    stages {
        stage('Download') {
            steps {
                // Get code from branch to test
                // This git command is using the Jenkins plugin. "git" here acts like "git checkout"
                git branch: 'main', url: 'https://github.com/david-fisher/320-S22-Track2.git'
            }
        }
        
        // Install and close server if was open
        stage('npm Setup') {
            steps{
                script{
                    try{
                        sh 'killall node'
                    }
                    catch(exe){
                        echo "Nothing to kill"
                    }
                    dir("front-end"){
                        script{
                            sh 'npm install'
                        }
                        
                    } 
                }
            }
            
        }
        
        //Check esLint compliance
        stage('SyntaxCheck') {
            steps{
                dir("front-end") {
                    script {
                        try {
                            sh 'npm run lint'
                        }
                        catch(exc) {
                            error("It appears not all esLint rules have been met.") //Fail Jenkins build
                        }
                        // Don't actually know what this is supposed to do, found online:
                        // finally {
                        //     step([$class: 'ArtifactArchiver', artifacts: 'app/build/reports/staticAnalysis/lint/', fingerprint: true])
                        // }
                    }
                }
            }
        }
        
        stage('Build'){ //Build the project so Cypress tests run faster
          steps{
            dir("front-end") {
              script{
                try{
                    sh 'npm run build'
                }
                catch(exe){
                    error("Building failed!")
                }
              }
            }
          }
        }
        
        stage('Cypress Tests'){ //Currenly running with dev. Eventually will use npm start
          steps{
            dir("front-end") {
              script{
                try{
                    sh 'npm run dev & npx cypress run --config video=false -b chrome'
                    sh 'killall node' //Cleanup so server doesn't run forever
                }
                catch(exe){
                    sh 'killall node' //Cleanup so server doesn't run forever
                    error("Cypress test failed!")
                }
              }
            }
          }
        }
        
        
    }
}
