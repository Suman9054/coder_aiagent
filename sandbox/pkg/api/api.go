package api

import (
	"context"
	"fmt"
	"io"
	"log"
	"sync"

	"github.com/Suman9054/sandbox/pkg/db/crud"
	"github.com/Suman9054/sandbox/pkg/db/schema"
	"github.com/Suman9054/sandbox/pkg/docker"
	measg "github.com/Suman9054/sandbox/pkg/mesag"

	"github.com/Suman9054/sandbox/pkg/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

type wsWriter struct {
	conn *websocket.Conn
}

func (w *wsWriter) Write(p []byte) (int, error) {
	err := w.conn.WriteMessage(websocket.TextMessage, p)
	return len(p), err
}


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
	go func() {
		defer wg.Done()
		db:=crud.Db()
		var sandbox schema.Sandbox_shema
		result := db.Where("id = ?", data.Id).First(&sandbox)
		if result.Error != nil {
			return
		}
		docker.DeleteContaner(sandbox.ContanerId)
	}()
	wg.Add(1)
	go crud.DeletSandbox(data.Id,&wg)
	go func() {
		wg.Wait()
	}()
	return c.Status(200).JSON(fiber.Map{
		"message":"done",
	})
}

func Handelcontaner(c *websocket.Conn){
     workspaseId:= c.Params("Id");
     log.Println("Connecting to container:",workspaseId);
      
	 var wg sync.WaitGroup
     
	 ctx:=context.Background()
     
	 defer c.Close()

	  cli,err:= client.NewClientWithOpts(client.FromEnv,client.WithAPIVersionNegotiation())
     
      if err != nil{
        panic("err"+err.Error())
      }
 
     defer cli.Close()
    
	 
		eror:=cli.ContainerStart(ctx,workspaseId,container.StartOptions{})
	   if eror != nil {
		log.Panic("contaner start err"+eror.Error())
	   }

	 execIDResp, err := cli.ContainerExecCreate(ctx, workspaseId,container.ExecOptions{
		 Cmd:         []string{"/bin/bash"},
	     AttachStdin:  true,
	     AttachStdout: true,
	     AttachStderr: true,
	     Tty:          true,
		 Env:          []string{"PS1=$ ", "TERM=dumb"},
		 
	 })
     if err != nil {
	 log.Println("Exec create error:", err)
	  return
     }

    
	 res,eror:= cli.ContainerExecAttach(ctx,execIDResp.ID,container.ExecStartOptions{
      Tty: true,
	 })

	 
	 if eror != nil {
		log.Panic("contaner attach err"+ eror.Error())
	 }

	 defer res.Close()
	 

	 wg.Go(func() {
		_,erour:=io.Copy(&wsWriter{c},res.Reader)
		if erour != nil {
			log.Panic("socket err"+erour.Error())
			return
		}

	 })
	wg.Go(func() {
	for {
		_, msg, err := c.ReadMessage()
		if err != nil {
			log.Println("WebSocket read error:", err)
			return
		}
		log.Println("mesag", string(msg))
	    cmd,eror:= measg.PrasedMesage(string(msg))

		if eror != nil {
			c.WriteMessage(websocket.TextMessage,[]byte("err :"+eror.Error()))
		}
		log.Println("comand", cmd)
		
		_, erour := res.Conn.Write([]byte(cmd + "\n")) 
		if erour != nil {
			log.Println("Write to shell error:", erour)  
			return
		}
	}
})

	wg.Wait()

	
}

