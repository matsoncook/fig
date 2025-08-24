#export DEPLOY_DIR=/home/ubuntu/greycube5/src/main/webapp
export DEPLOY_DIR=/var/www/html

export SUDO=sudo

${SUDO} mkdir ${DEPLOY_DIR}/fig1

#${SUDO} cp fig.html ${DEPLOY_DIR}/fig1
${SUDO} cp fig.html ${DEPLOY_DIR}/fig1/index.html


${SUDO} mkdir ${DEPLOY_DIR}/fig1/dist
${SUDO} cp dist/fig_bundle.js ${DEPLOY_DIR}/fig1/dist

${SUDO} mkdir ${DEPLOY_DIR}/fig1/images

${SUDO} cp -r images/* ${DEPLOY_DIR}/fig1/images