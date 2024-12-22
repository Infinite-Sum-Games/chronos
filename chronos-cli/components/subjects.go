package components

import (
	"fmt"
	"strconv"

	textinput "github.com/charmbracelet/bubbles/textinput"
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
)

const (
	list   = 0
	add    = 1
	delete = 2
)

type SubjectsModel struct {
	Subjectcode []string
	textinput   textinput.Model
	mode        int
}

func InitialSubjectModel(courses []string) SubjectsModel {
	ti := textinput.New()
	ti.Focus()
	return SubjectsModel{
		textinput:   ti,
		mode:        list,
		Subjectcode: courses,
	}
}

func (sm SubjectsModel) Init() tea.Cmd {
	return nil
}

func (sm SubjectsModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	var cmd tea.Cmd
	switch msg := msg.(type) {
	case tea.KeyMsg:
		switch sm.mode {
		case list:
			switch msg.String() {
			case "a":
				sm.mode = add
				sm.textinput.Reset()
				sm.textinput.Placeholder = "Enter the new course code"
				sm.textinput.Focus()
				return sm, nil

			case "d":
				sm.mode = delete
				sm.textinput.Reset()
				sm.textinput.Placeholder = "Enter the course code serial number"
				sm.textinput.Focus()
				return sm, nil

			case "t":
				if sm.Subjectcode == nil || len(sm.Subjectcode) == 0 {
					sm.textinput.SetValue("No course codes entered")

				} else {
					return InitialTimetableModel(sm), nil
				}

			case "q":
				return sm, tea.Quit
			}

		case add:
			sm.textinput, cmd = sm.textinput.Update(msg)
			switch msg.String() {
			case "enter":
				for _, c := range sm.Subjectcode {
					if c == sm.textinput.Value() {
						sm.textinput.Reset()
						sm.textinput.Placeholder = "Course code already exists! Try again."
						return sm, cmd
					}
				}
				if sm.textinput.Value() != "" {
					sm.Subjectcode = append(sm.Subjectcode, sm.textinput.Value())
				}
				sm.textinput.Reset()
				sm.mode = list
				return sm, cmd

			case "esc":
				sm.textinput.Reset()
				sm.mode = list
				return sm, nil
			}

		case delete:
			sm.textinput, cmd = sm.textinput.Update(msg)
			switch msg.String() {
			case "enter":
				n, err := strconv.Atoi(sm.textinput.Value())
				if err == nil && n > 0 && n <= len(sm.Subjectcode) {
					sm.Subjectcode = append(sm.Subjectcode[:n-1], sm.Subjectcode[n:]...)
					sm.textinput.Reset()
					sm.mode = list
				} else {
					sm.textinput.SetValue("")
					sm.textinput.Placeholder = "Invalid course code serial number! Try again."
				}
				return sm, cmd

			case "esc":
				sm.textinput.Reset()
				sm.mode = list
				return sm, cmd
			}
		}
	}
	return sm, cmd
}

func (sm SubjectsModel) View() string {
	var s string

	heading := lipgloss.NewStyle().Underline(true)

	switch sm.mode {
	case list:
		title := heading.Render("Time Table")
		s += title + "\n\n\n"
		if len(sm.Subjectcode) == 0 {
			s += "No course codes entered\n\nPress 'a' to add a course code\nPress 'q' to quit."
		} else {
			s += "Course codes entered:\n\n"
			for i, c := range sm.Subjectcode {
				I := strconv.Itoa(i + 1)
				s += fmt.Sprintf("%s)%s\n", I, c)
			}
			s += "\nPress 'a' to add a course code\nPress 'd' to delete the course\nPress 't' to create timetable\nPress 'q' to quit."
		}

	case add:
		s += sm.textinput.View()
		s += "\nPress ENTER to save course code or ESC to cancel.\n"

	case delete:
		if len(sm.Subjectcode) > 0 {
			s += "Enter the course code serial number to be deleted"
			s += sm.textinput.View()
			s += "\nPress ENTER to delete the course code or ESC to cancel.\n"
		} else {
			s += "No course code to delete.\nPress ESC to go back."
		}
	}
	return s
}

// func main() {
// 	p := tea.NewProgram(InitialSubjectModel(), tea.WithAltScreen())
// 	if _, err := p.Run(); err != nil {
// 		fmt.Printf("Error starting program: %v", err)
// 	}
// }
