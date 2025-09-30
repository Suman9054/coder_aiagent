package api

import (
	"fmt"
	"sync"

	"github.com/Suman9054/sandbox/pkg/db/crud"
	"github.com/Suman9054/sandbox/pkg/types"
	"github.com/gofiber/fiber/v2"
)



func Create(c *fiber.Ctx) error{
   var data types.Create_data
   ch:= make(chan uint);
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
   wg.Add(1);
   go crud.CreateSandbox(&data,&wg,ch);

   go func (){
    wg.Wait();
	close(ch);
   }()

   id := <-ch
   fmt.Print("id is ",id)

	return c.JSON(fiber.Map{
		"message": "Created successfully",
		"sandBoxId":id,
	})
	
}