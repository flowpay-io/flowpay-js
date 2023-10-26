# check prerequisities
commands=("jq" "gh")
for command in "${commands[@]}"
do
    if ! command -v "$command" &> /dev/null
    then
        echo "$command is not installed."
        exit 1
    fi
done

# get the current package version 
version=$(jq -r '.version' package.json)

# create a tag and release for the current version in Github
gh release create "$version"

# publish current version to npmjs.com
npm publish
