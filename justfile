set dotenv-load := true

get_data theme:
    #!/bin/bash
    curl "https://api.unsplash.com/photos/random?count=100&orientation=portrait&query={{theme}}" \
        --header "Authorization: Client-ID evI57W4Xz6AaEJmRaysFJoumPO9lBVLgXo3NxHQcmuA" | \
        jq '[.[] | {alt: .alt_description, url: .urls.small, author: .user.username}]' > data.json
