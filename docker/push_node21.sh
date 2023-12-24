set -e

NODE_VERSIONS=("21" "21.5" "21.5.0")
NODE_IMAGE_SUFFIXES=('alpine' 'alpine3.18' 'alpine3.19' 'bookworm' 'bookworm-slim' 'bullseye' 'bullseye-slim' 'slim');
IMOGEN_VERSIONS=('0.3.0')

for imogen_version in ${IMOGEN_VERSIONS[@]}; do
    for node_version in ${NODE_VERSIONS[@]}; do
        for node_image_suffix in ${NODE_IMAGE_SUFFIXES[@]}; do
            # Push Docker Image
            IMAGE="lanternfly/imogen:$imogen_version-node$node_version-$node_image_suffix"
            docker push $IMAGE
        done
    done
done