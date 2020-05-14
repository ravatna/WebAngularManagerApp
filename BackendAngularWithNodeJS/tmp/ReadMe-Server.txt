SET DEBUG=express:* & npm start

#Server Port: 9000

Endpoint: http://192.168.0.42:9000

[APIs]
#Feeds
Method: GET   
URL : http://192.168.0.42:9000/Feeds
Ex:
{
  "code": 200,
  "message": "Response OK!",
  "type": "OK",
  "data": [
    {
      "Id": 1,
      "Name": "feeds 1",
      "IconUrl": "http://192.168.0.42:9000/images/feeds/feed1.png",
      "FullImage": "http://192.168.0.42:9000/images/feeds/FullSize.png"
    }
  ],
  "debug": [
    {
      
    },
    {
      "FeedsCount": 6
    }
  ]
}


#Storys
Method: GET   
URL : http://192.168.0.42:9000/Storys
Ex:
{
  "code": 200,
  "message": "Response OK!",
  "type": "OK",
  "data": [
    {
      "Id": 1,
      "Name": "storys 1",
      "IconUrl": "http://192.168.0.42:9000/images/storys/story1.png",
      "FullImage": "http://192.168.0.42:9000/images/storys/FullSize.png",
      "lastPost": "2020-04-2 10:02:55"
    }
  ],
  "debug": [
    {
      "StorysCount": 6
    }
  ]
}


#Get All User from Mockup
Method: GET 
URL: http://localhost:9000/UserInfoAll
Ex:
{
  "code": 200,
  "message": "Response OK!",
  "type": "OK",
  "data": [
    {
      "No": 1,
      "AccountId": "1000",
      "AccountName": "Jump Cheng",
      "ProfileImg": "http://localhost:9000/images/account.png",
      "FollowBy": [
        "Adams Baker"
      ]
    }
    }
  ],
  "debug": [
    
  ]
}