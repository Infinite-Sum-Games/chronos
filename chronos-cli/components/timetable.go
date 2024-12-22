package components

import (
	"fmt"
	"os"

	"golang.org/x/term"

	textinput "github.com/charmbracelet/bubbles/textinput"
	tea "github.com/charmbracelet/bubbletea"
	"github.com/charmbracelet/lipgloss"
)

var (
	days      = []string{"Monday", "Tueday", "Wednesday", "Thursday", "Friday"}
	timeSlots = []string{"Slot 01 - 08:50-09:40", "Slot 02 - 09:40-10:30", "Slot 03 - 10:45-11:35",
		"Slot 04 - 11:35-12:25", "Slot 05 - 12:25-01:15", "Slot 06 - 02:05-02:55", "Slot 07 - 02:55-03:45",
		"Slot 08 - 03:45-04:35", "Slot 09 - 04:35-05:25", "Slot 10 - 05:25-06:15"}
	cellWidth  = 10
	cellHeight = 1
)

type TimetableModel struct {
	timetable   [][]string
	rowCursor   int
	textinput   textinput.Model
	editing     bool
	CourseCodes []string
	day         int
}

func InitialTimetableModel(sm SubjectsModel) TimetableModel {
	timeTable := make([][]string, len(days))
	for i := range timeTable {
		timeTable[i] = make([]string, len(timeSlots))
	}

	ti := textinput.New()
	ti.Placeholder = "Enter the subject code"
	ti.Focus()

	return TimetableModel{
		timetable:   timeTable,
		textinput:   ti,
		CourseCodes: sm.Subjectcode,
	}
}

func (tm TimetableModel) Init() tea.Cmd {
	return nil
}

func (tm TimetableModel) Update(msg tea.Msg) (tea.Model, tea.Cmd) {
	var cmd tea.Cmd

	switch msg := msg.(type) {
	case tea.KeyMsg:
		switch tm.editing {
		case false: // Normal navigation mode
			switch msg.String() {
			case "left":
				if tm.day > 0 {
					tm.day--
				}
			case "right":
				if tm.day < len(days)-1 {
					tm.day++
				}
			case "up":
				if tm.rowCursor > 0 {
					tm.rowCursor--
				}
			case "down":
				if tm.rowCursor < len(timeSlots)-1 {
					tm.rowCursor++
				}
			case "enter": // Enter edit mode
				tm.editing = true
				tm.textinput.SetValue(tm.timetable[tm.day][tm.rowCursor])
				tm.textinput.Focus()
			}

		case true: // Editing mode
			tm.textinput, cmd = tm.textinput.Update(msg)
			switch msg.String() {
			case "enter": // Save the entered period name
				tm.timetable[tm.day][tm.rowCursor] = tm.textinput.Value()
				tm.textinput.Reset()
				tm.editing = false
			case "esc": // Cancel editing
				tm.textinput.Reset()
				tm.editing = false
			}
		}
	}

	return tm, cmd
}

func (tm TimetableModel) View() string {

	// Terminal dimensions
	width, height, err := term.GetSize(int(os.Stdout.Fd()))
	if err != nil {
		panic(err)
	}
	width = width - 6 // Padding for aesthetic
	layoutWidth := width / 3
	layoutHeight := height - 6

	// Style for the day header
	dayBoxStyle := lipgloss.NewStyle().
		BorderStyle(lipgloss.NormalBorder()).
		Width(layoutWidth).
		Height(1).
		Align(lipgloss.Center).
		AlignVertical(lipgloss.Center).
		Bold(true).
		Foreground(lipgloss.Color("12"))

	// Style for time slot descriptions
	slotsTimingStyle := lipgloss.NewStyle().
		BorderStyle(lipgloss.HiddenBorder()).
		Bold(true).
		AlignVertical(lipgloss.Center).
		AlignHorizontal(lipgloss.Left).
		Width(layoutWidth).
		Height(1)

	// Style for timetable entries
	periodsStyle := lipgloss.NewStyle().
		BorderStyle(lipgloss.ThickBorder()).
		BorderForeground(lipgloss.Color("15")).
		Width(layoutWidth).
		Height(1).
		AlignVertical(lipgloss.Center).
		AlignHorizontal(lipgloss.Center)

	// Highlight for the selected period
	selectedPeriodStyle := periodsStyle.
		BorderForeground(lipgloss.Color("10"))

	// Style for the CourseCodes list
	courseCodeStyle := lipgloss.NewStyle().
		BorderStyle(lipgloss.HiddenBorder()).
		Padding(1).
		Margin(1).
		Width(layoutWidth).
		Height(layoutHeight).
		Align(lipgloss.Left)

	// Render the current day as a header
	day := days[tm.day]
	daysLayout := dayBoxStyle.Render(day)

	// Render the time slots and associated periods
	var slotRows []string
	for i, slot := range timeSlots {
		// Render the slot timing
		slotTiming := slotsTimingStyle.Render(slot)

		// Render the corresponding timetable entry for the current day
		var periodEntry string
		if tm.editing && tm.rowCursor == i { // Render textinput when editing
			periodEntry = selectedPeriodStyle.Render(tm.textinput.View())
		} else {
			period := tm.timetable[tm.day][i]
			if period == "" {
				period = "Free" // Default text for empty slots
			}

			// Highlight the currently selected row
			if tm.rowCursor == i {
				periodEntry = selectedPeriodStyle.Render(period)
			} else {
				periodEntry = periodsStyle.Render(period)
			}
		}

		// Combine the slot timing and period entry into a single row
		slotRows = append(slotRows, lipgloss.JoinHorizontal(lipgloss.Center, slotTiming, periodEntry))
	}

	// Join all rows for the slots
	slotsLayout := lipgloss.JoinVertical(lipgloss.Left, slotRows...)

	// Render the CourseCodes in a single box
	var courseCodeLines []string
	for i, code := range tm.CourseCodes {
		courseCodeLines = append(courseCodeLines, lipgloss.NewStyle().Bold(true).Render(fmt.Sprintf("%d. %s", i+1, code)))
	}
	courseCodeText := lipgloss.JoinVertical(lipgloss.Left, courseCodeLines...)
	courseCodesLayout := courseCodeStyle.Render(courseCodeText)

	// Combine the day header, slots, and CourseCodes into the final layout
	mainLayout := lipgloss.JoinHorizontal(
		lipgloss.Top,
		lipgloss.JoinVertical(lipgloss.Center, daysLayout, slotsLayout), // Timetable
		courseCodesLayout, // CourseCodes in one box
	)

	// Add navigation and editing instructions
	if tm.editing {
		mainLayout += "\n\n" + lipgloss.NewStyle().Foreground(lipgloss.Color("8")).Render(
			"Press ENTER to save or ESC to cancel.",
		)
	} else {
		mainLayout += "\n\n" + lipgloss.NewStyle().Foreground(lipgloss.Color("8")).Render(
			"Use LEFT/RIGHT to switch days, UP/DOWN to navigate slots. Press ENTER to edit.",
		)
	}

	return mainLayout
}
