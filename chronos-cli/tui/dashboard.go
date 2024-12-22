package tui

import (
	// "fmt"
	"os"
	"strings"

	"golang.org/x/term"

	tea "github.com/charmbracelet/bubbletea"
)

const (
	modeDashboard   = 0
	modeTimeTable   = 1
	modeStudentsList    = 2
	modeClassRep = 3
	modeFullTimeTable = 4
)

func CenterString(s string) string {
	terminalWidth, _, _ := term.GetSize(int(os.Stdout.Fd()))

	longestLine := 0
	for _, line := range strings.Split(s, "\n") {
		if len(line) > longestLine {
			longestLine = len(line)
		}
	}

	padding := (terminalWidth - longestLine) / 2
	if padding < 0 {
		padding = 0
	}

	// Add spaces to center each line string
	centeredString := ""
	for _, line := range strings.Split(s, "\n") {
		centeredString += strings.Repeat(" ", padding) + line + "\n"
	}

	return centeredString
}

type dashboardMain struct {
	mode int
}

func InitialDashboardModel() dashboardMain {
	return dashboardMain{
		mode: modeDashboard,
	}
}

func (db dashboardMain) Init() tea.Cmd {
	return nil
}

func (db dashboardMain) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.KeyMsg:
		switch db.mode {
		case modeDashboard:
			switch msg.String() {
			case "t":
				db.mode = modeTimeTable
				return InitialTuiModel(modeTimeTable), nil

			case "s":
				db.mode = modeStudentsList
				return InitialTuiModel(modeStudentsList), nil

			case "c":
				db.mode = modeClassRep
				return InitialTuiModel(modeClassRep), nil

			case "q":
				return db, tea.Quit
			}
		}
	}
	return db, nil
}

func (db dashboardMain) View() string {

	chronosASCII := `
 _______           _______  _______  _        _______  _______ 
(  ____ \|\     /|(  ____ )(  ___  )( (    /|(  ___  )(  ____ \
| (    \/| )   ( || (    )|| (   ) ||  \  ( || (   ) || (    \/
| |      | (___) || (____)|| |   | ||   \ | || |   | || (_____ 
| |      |  ___  ||     __)| |   | || (\ \) || |   | |(_____  )
| |      | (   ) || (\ (   | |   | || | \   || |   | |      ) |
| (____/\| )   ( || ) \ \__| (___) || )  \  || (___) |/\____) |
(_______/|/     \||/   \__/(_______)|/    )_)(_______)\_______)`

	centeredASCII := CenterString(chronosASCII)

	var s string
	switch db.mode {
	case modeDashboard:
		s += centeredASCII
		s += "\n\n\n\n\n"
		instructions := "Create/View Timetable \t\tt\nCreate/View Students List \t\ts\nChange Class Representatives\t\tc\nQuit \t\t\t\tq"

		s += CenterString(instructions)
	}
	return s
}

// func main() {
// 	p := tea.NewProgram(InitialDashboardModel(), tea.WithAltScreen())
// 	if _, err := p.Run(); err != nil {
// 		fmt.Printf("Error starting program: %v", err)
// 	}
// }
