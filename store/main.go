package main

import (
	"context"
	"log"
	"log/slog"
	"net/http"
	"os"
	"time"
)

func main() {


	router:= http.NewServeMux()

	
	
	server:= http.Server{
		Addr: ":8000",
        Handler: router,
	}

	slog.Info("server started on localhost:8000")

	done:= make(chan os.Signal, 1)

	go func(){
        err:= server.ListenAndServe()
		if err != nil {
			log.Fatal("server error", "error", err)
		}
	}()

	<- done

	slog.Info("shutting down server")

	ctx,canel:= context.WithTimeout(context.Background(),5*time.Second)
	defer canel()
	if err:= server.Shutdown(ctx); err != nil {
		slog.Error("server shutdown failed", "error", err)
	}
	slog.Info("server exited properly")
}


