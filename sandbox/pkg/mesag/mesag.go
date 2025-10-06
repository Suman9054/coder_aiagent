package measg

import (
	"errors"
	"regexp"
)

func PrasedMesage(mes string) (string, error) {
	var comnad string

	switch {
	case regexp.MustCompile(`<exe>([\s\S]*?)</exe>`).MatchString(mes):
		matches := regexp.MustCompile(`<exe>([\s\S]*?)</exe>`).FindStringSubmatch(mes)
		if len(matches) > 1 {
			comnad = matches[1]
		}

	case regexp.MustCompile(`<makef path="([\s\S]*?)"/>`).MatchString(mes):
		matchmfs := regexp.MustCompile(`<makef path="([\s\S]*?)"/>`).FindStringSubmatch(mes)
		if len(matchmfs) > 1 {
			comnad = "mkdir -p $(dirname " + matchmfs[1] + ") && touch " + matchmfs[1]
		}

	case regexp.MustCompile(`<writf path="([\s\S]*?)"/>([\s\S]*?)</writf>`).MatchString(mes):
		matchef := regexp.MustCompile(`<writf path="([\s\S]*?)"/>([\s\S]*?)</writf>`).FindStringSubmatch(mes)
		if len(matchef) > 2 {
			comnad = "mkdir -p $(dirname " + matchef[1] + ") && cat > " + matchef[1] + " << 'EOF'\n" + matchef[2] + "\nEOF"
		}

	case regexp.MustCompile(`<stop/>`).MatchString(mes):
		
		comnad = "kill -2 $(jobs -p)"
	
	case regexp.MustCompile(`<runs/>`).MatchString(mes):
		comnad = `bun run build && nginx -g "daemon off;"`
	case regexp.MustCompile(`<exe>bun run dev</exe>`).MatchString(mes):
		return "",errors.New("unsupported comand")	

	default:
		return "", errors.New("unsupported format")
	}

	return comnad, nil
}
