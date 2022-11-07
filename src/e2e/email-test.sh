curl --location --request POST 'https://us-central1-coding-test-platform.cloudfunctions.net/api/email' \
--header 'Content-Type: application/json' \
--data-raw '{
    "data": {
        "email": "janeshk98@gmail.com",
        "_id": "6093ca74bb551c1e20f14fbf",
        "googleId": "uXcPnrejsKa7anBCN59crjD70C12",
        "attemptedTest": false,
        "expiryDate": "2069-12-31T00:00:00.000+00:00"
    }
}'