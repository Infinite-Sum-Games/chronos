package tui

import (
	// "fmt"
	"os"

	"github.com/IAmRiteshKoushik/chronos/chronos-cli/components"

	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
	"golang.org/x/term"
)

type tuiModel struct {
	tuiMode int
	sModel  tea.Model
}

func InitialTuiModel(mode int) tuiModel {
	return tuiModel{
		tuiMode: mode,
		sModel:  components.InitialSubjectModel([]string{}),
	}
}

func (tuim tuiModel) Init() tea.Cmd {
	return nil
}

func (tuim tuiModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	switch msg := msg.(type) {
	case tea.KeyMsg:
		switch tuim.tuiMode {
		case modeTimeTable:
			switch sm := tuim.sModel.(type) {
			case components.SubjectsModel:
				updatedModel, cmd := sm.Update(msg)
				tuim.sModel = updatedModel
				switch msg.String() {
				case "t": // Switch to full-screen timetable view
					if len(sm.Subjectcode) == 0 {
						return tuim, nil
					}
					tuim.sModel = components.InitialTimetableModel(sm)
					tuim.tuiMode = modeFullTimeTable
					return tuim, nil
				case "left":
					tuim.tuiMode = modeStudentsList
					return tuim, nil
				case "right":
					tuim.tuiMode = modeClassRep
					return tuim, nil
				case "q":
					return tuim, tea.Quit
				}
				return tuim, cmd
			}

		case modeFullTimeTable: // Handle full-screen timetable view
			switch sm := tuim.sModel.(type) {
			case components.TimetableModel:
				updatedModel, cmd := sm.Update(msg)
				tuim.sModel = updatedModel
				switch msg.String() {
				case "esc": // Go back to the main TUI
					tuim.sModel = components.InitialSubjectModel(tuim.sModel.(components.TimetableModel).CourseCodes)
					tuim.tuiMode = modeTimeTable
					return tuim, nil
				case "q":
					return tuim, tea.Quit
				}
				return tuim, cmd
			}

		case modeStudentsList:
			// Handle logic for students list mode
			switch msg.String() {
			case "left":
				tuim.tuiMode = modeClassRep
				return tuim, nil
			case "right":
				tuim.tuiMode = modeTimeTable
				return tuim, nil
			case "q":
				return tuim, tea.Quit
			}

		case modeClassRep:
			// Handle logic for class representative mode
			switch msg.String() {
			case "left":
				tuim.tuiMode = modeTimeTable
				return tuim, nil
			case "right":
				tuim.tuiMode = modeStudentsList
				return tuim, nil
			case "q":
				return tuim, tea.Quit
			}
		}
	}
	return tuim, nil
}

func (tuim tuiModel) View() string {
	switch tuim.tuiMode {
	case modeTimeTable, modeStudentsList, modeClassRep:
		return renderMainScreen(tuim)

	case modeFullTimeTable: // Render the timetable in full-screen mode
		if timetable, ok := tuim.sModel.(components.TimetableModel); ok {
			return timetable.View()
		}
	}
	return "Invalid state"
}

func renderMainScreen(tuim tuiModel) string {
	width, height, _ := term.GetSize(int(os.Stdout.Fd()))
	width = width - 6
	height = height - 2
	leftWidth := width / 4
	centerWidth := width / 2
	rightWidth := width / 4
	var s string

	leftLayout := lipgloss.NewStyle().
		BorderStyle(lipgloss.RoundedBorder()).
		Width(leftWidth).Height(height).
		Align(lipgloss.Center)

	centerLayout := lipgloss.NewStyle().
		BorderStyle(lipgloss.RoundedBorder()).
		Width(centerWidth).Height(height).
		Align(lipgloss.Center)

	rightLayout := lipgloss.NewStyle().
		BorderStyle(lipgloss.RoundedBorder()).
		Width(rightWidth).Height(height).
		Align(lipgloss.Center)

	rightSelectedLayout := rightLayout.BorderForeground(lipgloss.Color("5"))
	centerSelectedLayout := centerLayout.BorderForeground(lipgloss.Color("5"))
	leftSelectedLayout := leftLayout.BorderForeground(lipgloss.Color("5"))

	switch tuim.tuiMode {
	case modeTimeTable:
		centerString := "Student List"
		leftString := "Change CR"
		rightString := tuim.sModel.View()
		s = lipgloss.JoinHorizontal(lipgloss.Center, leftLayout.Render(leftString), centerLayout.Render(centerString), rightSelectedLayout.Render(rightString))

	case modeStudentsList:
		centerString := "Student List"
		leftString := "Change CR"
		rightString := tuim.sModel.View()
		s = lipgloss.JoinHorizontal(lipgloss.Center, leftLayout.Render(leftString), centerSelectedLayout.Render(centerString), rightLayout.Render(rightString))

	case modeClassRep:
		centerString := "Student List"
		leftString := "Change CR"
		rightString := tuim.sModel.View()
		s = lipgloss.JoinHorizontal(lipgloss.Center, leftSelectedLayout.Render(leftString), centerLayout.Render(centerString), rightLayout.Render(rightString))
	}
	return s
}
