#!/busybox/sh

set -xe

function kaniko_build() {
    env="${1}"
    REGISTRY_ACCOUNT_ID="419909608512"
    case "${env}" in
        'fra-prod')
            REGISTRY_ACCOUNT_ID='914713914886'
            REGION=eu-central-1
            ;;
        'syd-dev')
            REGION=ap-southeast-2
            ;;
        'pdx-preview')
            REGION=us-west-2
            ;;
        'syd-prod')
            REGION=ap-southeast-2
            ;;
    esac

    REGISTRY="${REGISTRY_ACCOUNT_ID}.dkr.ecr.${REGION}.amazonaws.com/${STACK_NAME}/${PROJECT_NAME}"
    echo "publishing image to ${REGISTRY}"

    /kaniko/executor --context `pwd` --dockerfile="${DOCKER_FILE}" --destination "${REGISTRY}:${GIT_COMMIT}" --destination "${REGISTRY}:${BRANCE_TAG_NAME}" --build-arg BUILD_SCRIPT=$BUILD --snapshotMode=redo --cache=false
}

if [ -z "$1" ]; then
    echo "Project name must be specified"
    exit 1
fi

STACK_NAME='k8s'
PROJECT_NAME="$1"

case "${PROJECT_NAME}" in
    'redbulladmin')
        DOCKER_FILE=Dockerfile-admin
        ;;
esac

case "${BRANCH_NAME}" in
    'develop')
        ENVS='syd-dev'
        BUILD=build
        ;;
    'preview')
        ENVS='pdx-preview'
        BUILD=build:uat
        ;;
    'master')
        ENVS='fra-prod'
        BUILD=build:prod
        ;;
esac

if [ -n "${ENVS}" ]; then
    for env in ${ENVS//,/ }; do
        kaniko_build "${env}"
    done
fi