set dotenv-load := true

get_data theme:
    #!/bin/bash
    curl "https://api.unsplash.com/photos/random?count=100&orientation=portrait&query={{theme}}" \
        --header "Authorization: Client-ID $ACCESS_KEY" | \
        jq '[.[] | {alt: .alt_description, url: .urls.small, author: .user.username}]' > data.json
