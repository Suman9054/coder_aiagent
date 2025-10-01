package schema

import (
	"time"
)

type Sandbox_shema struct {
	
	Id        uint `gorm:"primaryKey"`
	UserId    string
	Template  string
	ContanerId string
	State		string
	CreatedAT time.Time
	DeletedAt time.Time `gorm:"index"`
}