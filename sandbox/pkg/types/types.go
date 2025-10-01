package types


type Create_data struct{
   Image string `json:"image"` 
   User_id string `json:"user_id"`
   ContanerId string
}

type Delete struct{
   Id uint `json:"Id"`
}