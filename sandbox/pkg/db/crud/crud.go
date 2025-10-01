package crud

import (
	"context"
	
	"os"
	"path/filepath"
	"sync"
	"time"

	"github.com/Suman9054/sandbox/pkg/db/schema"
	"github.com/Suman9054/sandbox/pkg/types"
	"github.com/glebarez/sqlite"
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

func CreateSandbox(c *types.Create_data,  ch chan<- uint) {
	

	db := Db()
	ctx := context.Background()

	sandbox := schema.Sandbox_shema{
		UserId:     c.User_id,
		Template:   c.Image,
		State: "running",
		ContanerId: c.ContanerId,
		CreatedAT:  time.Now(),
	}

	result := db.WithContext(ctx).Create(&sandbox)

	if result.Error != nil {
		panic("failed to create sandbox: " + result.Error.Error())
	}

	ch <- sandbox.Id
}

func DeletSandbox(Id uint ,wg *sync.WaitGroup){
	defer wg.Done()
	ctx:= context.Background()
    db:=Db()
	_, err := gorm.G[schema.Sandbox_shema](db).Where("Id = ?",Id).Delete(ctx)

	if err != nil {
		panic("err"+err.Error())
	}
	
	
	
}

func StopSandbox(Id uint){
	
	ctx:= context.Background()
	db:= Db()
    
	_,err := gorm.G[schema.Sandbox_shema](db).Where("Id = ?",Id).Update(ctx,"State","stop")

	if err != nil {
		panic("err"+err.Error())
	}
 
}

func RestartSandbox(Id uint,wg *sync.WaitGroup){
  defer wg.Done()
  db:=Db()
  ctx:= context.Background()
  _,err := gorm.G[schema.Sandbox_shema](db).Where("Id = ?",Id).Update(ctx,"State","runing")

  if err != nil {
	panic("err"+err.Error())
  }
}

