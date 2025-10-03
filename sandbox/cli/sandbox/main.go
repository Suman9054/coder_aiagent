package main

import (
	"log"

	"github.com/Suman9054/sandbox/pkg/api"
	"github.com/gofiber/contrib/websocket"
	"github.com/gofiber/fiber/v2"
)

func main() {
	app := fiber.New()


	app.Get("/",func (c *fiber.Ctx) error {
		return c.JSON(fiber.Map{
			"mesage":"how are you",
			"status":"200",
		})
	})
   
	app.Post("/api/create",api.Create)
	app.Post("/api/delet",api.Delete)
	app.Use("/ws", func(c *fiber.Ctx) error {
		if websocket.IsWebSocketUpgrade(c) {
			c.Locals("allowed", true)
			log.Println("websocket conction reqist",c.BaseURL())
			return c.Next()
		}
		return fiber.ErrUpgradeRequired
	})

	app.Get("/ws/:Id",websocket.New(api.Handelcontaner))

	app.Listen("127.0.0.1:8080")
}