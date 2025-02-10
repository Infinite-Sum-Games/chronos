package main

import (
	"fmt"

	"github.com/IAmRiteshKoushik/chronos/chronos-cli/tui"
	tea "github.com/charmbracelet/bubbletea"
)

func main() {
	p := tea.NewProgram(tui.InitialDashboardModel(), tea.WithAltScreen())
	if _, err := p.Run(); err != nil {
		fmt.Printf("Error starting program: %v", err)
	}
}
