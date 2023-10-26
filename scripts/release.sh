if [ $# -eq 0 ]; then
    echo "Error: Please provide tag name for the release"
    exit 1
fi

tag=$1

gh release create "$tag"

npm-publish 