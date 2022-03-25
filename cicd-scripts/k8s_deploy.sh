#!/usr/bin/env bash

set -xe

function k8s_deploy() {
    region="${1}"
    env="${2}"
    cluster="${3}"
    REGISTRY="${REGISTRY_ACCOUNT_ID}.dkr.ecr.${region}.amazonaws.com/${STACK_NAME}/${PROJECT_NAME}"
    echo "deploy ${PROJECT_NAME} to ${region} in ${cluster}"

    # swtich cluster
    kubectl config use-context "${cluster}"
    
    # deploy operator
    IMG="${REGISTRY}:${DOCKER_TAG_COMMIT}"
    sed "s@IMG@${IMG}@g; s@NAME@${NAME}@g" "k8s/${env}/btc-crd.yaml" | kubectl apply -f -
}

STACK_NAME='k8s'
PROJECT_NAME=$1

REGISTRY_ACCOUNT_ID="419909608512"
BRANCH_NAME="$(echo "${GIT_BRANCH}" |sed 's/origin\///')"
export PATH="/usr/local/bin/:${PATH}"

case "${BRANCH_NAME}" in
    'develop')
        ENVS='syd-dev'
        REGIONS='ap-southeast-2'
        CLUSTER="${SYD_DEV_CLUSTER}"
        ;;
    'preview')
        ENVS='pdx-preview'
        REGIONS='us-west-2'
        CLUSTER="${PDX_PREVIEW_CLUSTER}"
        ;;
    'master')
        ENVS='fra-prod'
        REGIONS='eu-central-1'
        CLUSTER="${FRA_PROD_CLUSTER}"
        REGISTRY_ACCOUNT_ID='914713914886'
        ;;
esac

case "${PROJECT_NAME}" in
    'redbulladmin')
        NAME='redbull-admin'
        ;;
esac

COMMIT_ID="$(git rev-parse HEAD)"
DOCKER_TAG_COMMIT="${COMMIT_ID}"
DOCKER_TAG_BRANCH="$(echo "${BRANCH_NAME,,}" |sed 's|/||')"
DOCKER_IMAGE="${DOCKER_TAG_BRANCH}-${COMMIT_ID}"

if [ -n "${ENVS}" ]; then
    for region in ${REGIONS//,/ }; do
        k8s_deploy "${region}" "${ENVS}" "${CLUSTER}"
    done
fi
