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
  },nil,nil,nil,"")

  if eror != nil{
	panic("contaner creat err"+eror.Error())
  }
return res.ID

}

func DeleteContaner(){

}