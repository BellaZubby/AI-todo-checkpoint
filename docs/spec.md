# Project Specification: AI To-Do List App

## Overview

The AI To-Do List App is a browser-based application designed to help users manage daily tasks efficiently. It provides a clean, user-friendly interface and essential features for task management, including persistent storage and theme toggling.

## Features

- Add new tasks
- Edit existing tasks
- Delete tasks
- Mark tasks as completed or not completed
- Filter tasks by status: all, not completed, completed
- Toggle between light and dark modes
- Persist tasks in browser local storage

## Functional Requirements

1. **Task Management**

   - Users can add a new task by entering text and submitting the form.
   - Users can edit the text of an existing task inline.
   - Users can delete a task from the list.
   - Users can mark a task as completed (checkbox) or not completed.

2. **Filtering**

   - Users can filter the task list to show all, only active, or only completed tasks.

3. **Theme Toggle**

   - Users can switch between light and dark modes using a toggle button.
   - The current theme is applied instantly to the UI.

4. **Persistence**
   - All tasks and their completion status are saved in the browser’s local storage.
   - Tasks persist after page reloads or browser restarts.

## Technical Details

- Built with vanilla JavaScript, HTML, and CSS.
- No external libraries or frameworks required.
- Responsive design for usability on different devices.
- All logic is handled client-side; no backend required.

## File Structure

- `index.html`: Main HTML structure
- `style.css`: App styling, including dark/light mode
- `script.js`: Application logic (task management, filtering, theme toggle, persistence)

## Usage Scenarios

- Personal daily task management
- Learning resource for beginner web developers

## Non-Functional Requirements

- Fast and responsive UI
- Accessible and easy to use
- Works in all modern browsers
