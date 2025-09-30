package crud

import (
	"context"
	"os"
	"path/filepath"
	"sync"
	"time"
     "github.com/glebarez/sqlite"
	"github.com/Suman9054/sandbox/pkg/db/schema"
	"github.com/Suman9054/sandbox/pkg/types"
	"gorm.io/gorm"
)

func Db() *gorm.DB {

	 dbPath := "./pkg/db/sql/index.db"

	 os.MkdirAll(filepath.Dir(dbPath),os.ModePerm)

	db,err:= gorm.Open(sqlite.Open(dbPath),&gorm.Config{}); 
	if err != nil{
		panic("err: " + err.Error())
	}
  db.AutoMigrate(&schema.Sandbox_shema{})
	return db
}

func CreateSandbox(c *types.Create_data, wg *sync.WaitGroup, ch chan<- uint) {
	defer wg.Done()

	db := Db()
	ctx := context.Background()

	sandbox := schema.Sandbox_shema{
		UserId:     c.User_id,
		Template:   c.Image,
		ContanerId: c.ContanerId,
		CreatedAT:  time.Now(),
	}

	result := db.WithContext(ctx).Create(&sandbox)

	if result.Error != nil {
		panic("failed to create sandbox: " + result.Error.Error())
	}

	ch <- sandbox.Id
}

func DeletSandbox(){
	
}