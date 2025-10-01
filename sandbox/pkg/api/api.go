package api

import (
	"fmt"
	"sync"

	"github.com/Suman9054/sandbox/pkg/db/crud"
	"github.com/Suman9054/sandbox/pkg/docker"
	"github.com/Suman9054/sandbox/pkg/types"
	"github.com/gofiber/fiber/v2"
)



func Create(c *fiber.Ctx) error{
   var data types.Create_data
   ch:= make(chan uint);
   cm:= make(chan string);
   var wg sync.WaitGroup
   
   if err:= c.BodyParser(&data);err != nil{
	return c.Status(400).JSON(fiber.Map{
		"error":err.Error(),
	})
   }
   if data.Image == "" || data.User_id == "" {
	return c.Status(400).JSON(fiber.Map{
		"error":"emty fidels",
	})
   }
   wg.Add(1)
   go func(){
     defer wg.Done()
	 contanerId:=docker.CreateContaner(data.Image);
	 cm<-contanerId;
   }()
  contanerId:= <-cm ;
  data.ContanerId= contanerId;
  wg.Add(1)
  go func() {
	defer wg.Done()
	 crud.CreateSandbox(&data,ch)
  }()
  id:=<-ch;

  go func() {
	wg.Wait()
	close(cm);
	close(ch);
  }()
   fmt.Print("id is ",id)

	return c.JSON(fiber.Map{
		"message": "Created successfully",
		"sandBoxId":id,
		"contnerId":contanerId,
	})
	
}


func Delete( c *fiber.Ctx)error{
	var data types.Delete
	var wg sync.WaitGroup
	if err:= c.BodyParser(&data);err != nil{
		return c.Status(400).JSON(fiber.Map{
			"err":err.Error(),
		})
	}
	wg.Add(1)
	go crud.DeletSandbox(data.Id,&wg)
	go func() {
		wg.Wait()
	}()
	return c.Status(200).JSON(fiber.Map{
		"message":"done",
	})
}

