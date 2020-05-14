node {
    stage('SCM Checkout'){
        git credentialsId: 'GIT_CREDENTIALS', url:  'https://github.com/Steven8519/client.git', branch: 'master'
    }


    stage('Build Docker Image'){
        sh 'docker build -t steven8519/client .'
    }

    stage('Push Docker Image') {
        withCredentials([string(credentialsId: 'Docker_Hub_ID', variable: 'Docker_Hub_ID')]) {
          sh "docker login -u steven8519 -p ${Docker_Hub_ID}"
        }
        sh 'docker push steven8519/client'
    }

    stage("Deploy app") {
        sh 'kubectl apply -f deployment.yaml --validate=false'
    }
}
