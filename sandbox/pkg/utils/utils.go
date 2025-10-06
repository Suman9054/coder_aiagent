package utils

const (
    ImageCoderUbuntu = "coderaiagentreactubuntu"
    ImageNode        = "node:20"
    ImageBun         = "oven/bun"
    ImageNginx       = "nginx:alpine"
    // Add other images as needed
)

func FindPort(image string) string {
	switch image {
	case ImageCoderUbuntu:
		return "80" 
	case ImageNode:
		return "3000" 
	case ImageBun:
		return "5173" 
	case ImageNginx:
		return "80"
	default:
		return "80" 
	}
}