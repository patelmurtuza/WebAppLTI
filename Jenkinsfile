pipeline {
    agent any
    stages {
        stage('Deploy to development') { 
            steps {
                sh 'echo "Add build steps here"'
                step([$class: 'AWSCodeDeployPublisher', applicationName: 'Jenkins', awsAccessKey: 'AKIA5JJN2Z2EL43ZEBBC', awsSecretKey: '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', credentials: 'awsAccessKey', deploymentConfig: 'CodeDeployDefault.AllAtOnce', deploymentGroupAppspec: false, deploymentGroupName: 'development', deploymentMethod: 'deploy', excludes: '', iamRoleArn: '', includes: '**', pollingFreqSec: 15, pollingTimeoutSec: 300, proxyHost: '', proxyPort: 0, region: 'ap-south-1', s3bucket: 's3appbucketforjenkins', s3prefix: '', subdirectory: '', versionFileName: '', waitForCompletion: true])
            }
        }
        stage('Deploy to production') {
            input{
              message 'Do you want to proceed ??'
            }
            steps {
                sh 'echo "Add build steps here"'
                step([$class: 'AWSCodeDeployPublisher', applicationName: 'Jenkins', awsAccessKey: 'AKIA5JJN2Z2EL43ZEBBC', awsSecretKey: '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', credentials: 'awsAccessKey', deploymentConfig: 'CodeDeployDefault.AllAtOnce', deploymentGroupAppspec: false, deploymentGroupName: 'production', deploymentMethod: 'deploy', excludes: '', iamRoleArn: '', includes: '**', pollingFreqSec: 15, pollingTimeoutSec: 300, proxyHost: '', proxyPort: 0, region: 'ap-south-1', s3bucket: 's3appbucketforjenkins', s3prefix: '', subdirectory: '', versionFileName: '', waitForCompletion: true])
            }
        }
        stage("Commit changes back to production repo"){
            steps{
                sh 'git checkout --track origin/dev'
                sh 'git checkout --track origin/master'
                sh 'git merge dev'
                withCredentials([usernamePassword(credentialsId: '3abcc784-22bb-4e05-b6a8-b230ae6fbbf9', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                    sh('git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/vineetb95/TryAtJenkins' )
                }
            }
        }
    }
    post {
    // Clean after build
        always {
            cleanWs()
        }
    }
}
