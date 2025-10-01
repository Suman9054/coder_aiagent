package main

import (
	"github.com/Suman9054/sandbox/pkg/api"
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

	app.Listen("127.0.0.1:8080")
}