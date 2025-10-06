package docker

import (
	"context"
	"fmt"
	"time"

	"github.com/Suman9054/sandbox/pkg/utils"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/network"
	"github.com/docker/docker/client"
)

 
func CreateContainer(ctx context.Context, image string) (string, string, error) {
    cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
    if err != nil {
        return "", "", fmt.Errorf("failed to create docker client: %w", err)
    }
    defer cli.Close()

    port := utils.FindPort(image)
    containerName := fmt.Sprintf("sandbox-%s", generateRandomID()) // Unique name

    // Create unique Traefik router name
    routerName := fmt.Sprintf("sandbox-%s", containerName)
    
    res, err := cli.ContainerCreate(ctx, &container.Config{
        Image: image,
        Cmd:   []string{"/bin/bash"},
        Tty:   true,
        Labels: map[string]string{
        "traefik.enable": "true",
        "traefik.http.routers." + routerName + ".rule": fmt.Sprintf("Host(`%s.localhost`) ", containerName),
        //"traefik.http.routers." + routerName + ".middlewares": routerName + "-stripprefix",  
        //"traefik.http.middlewares." + routerName + "-stripprefix.stripprefix.prefixes": fmt.Sprintf("/%s", containerName),
        "traefik.http.services." + routerName + ".loadbalancer.server.port": port,
            
        },
    },nil, &network.NetworkingConfig{
        EndpointsConfig: map[string]*network.EndpointSettings{
            "sandbox_sandboxnetwork": {},
        },
    }, nil, containerName)

    if err != nil {
        return "","", fmt.Errorf("failed to create container: %w", err)
    }

    
    

    return res.ID, containerName, nil
}

// Helper function to generate unique IDs
func generateRandomID() string {
    return fmt.Sprintf("%d", time.Now().UnixNano())
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