package docker

import (
	"context"
	

	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
)

 
func CreateContaner(Image string)string{

  cli,err:= client.NewClientWithOpts(client.FromEnv,client.WithAPIVersionNegotiation())
  ctx:= context.Background()
  
  if err != nil{
    panic("err"+err.Error())
  }
  defer cli.Close()
  res,eror:=cli.ContainerCreate(ctx,&container.Config{
	Image: Image ,
  Cmd: []string{"/bin/bash"},
  Tty: true,
  },nil,nil,nil,"")

  if eror != nil{
	panic("contaner creat err"+eror.Error())
  }
 return res.ID

}

func DeleteContaner(ContanerId string){

  
  cli,err:= client.NewClientWithOpts(client.FromEnv,client.WithAPIVersionNegotiation())
  ctx:= context.Background()
  if err != nil{
    panic("err"+err.Error())
  }
 
  defer cli.Close()

  erro:= cli.ContainerRemove(ctx,ContanerId,container.RemoveOptions{})

  if erro !=nil{
    panic("err"+erro.Error())
  }
   

}