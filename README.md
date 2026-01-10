# Plan

**Plan** is a creative, high-contrast monthly planner designed to turn your busy schedule into a focused "Command Center." It features a sleek Gunmetal & Coral aesthetic, drag-and-drop task management, and built-in productivity tools.

## Features

*   **Command Center UI:** A bold, dark-mode interface (`#253034` & `#ff8154`) that feels modern and editorial.
*   **Kanban / Bento Grid:** Organize your life into "Units" (Academic, Portfolio, Life). Drag and drop them to prioritize.
*   **Interactive Tasks:** Add, check off, or delete tasks. Watch your progress rings fill up instantly.
*   **Calendar Mode:** Switch to a grid view to see upcoming deadlines and events with countdown tickers.
*   **Pomodoro Focus:** A built-in, customizable timer to keep you in the flow.
*   **Oblique Strategies:** Random creative prompts to unblock your thinking.
*   **Local Persistence:** All your data is saved automatically to your browser's Local Storage. No login required.

## Tech Stack

*   **Framework:** [Next.js 15](https://nextjs.org/) (React)
*   **Styling:** Tailwind CSS
*   **Icons:** [Phosphor Icons](https://phosphoricons.com/)
*   **Drag & Drop:** `@hello-pangea/dnd`
*   **Date Logic:** `date-fns`
*   **Confetti:** `canvas-confetti` (for that extra pop!)

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/plan.git
    cd plan
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    # or npm install
    ```

3.  **Run the development server:**
    ```bash
    pnpm dev
    ```

4.  **Open your browser:**
    Navigate to `http://localhost:3000`.

## Usage

*   **Add Tasks:** Click `+ ADD TASK` on any Unit card.
*   **Edit Titles:** Hover over a Unit title and click the pencil icon to rename it.
*   **Prioritize:** Drag Unit cards to reorder them based on importance.
*   **Calendar:** Switch to the Calendar view (top right) to add deadlines.
*   **Focus:** Click "Start" on the timer widget. Click the clock icon to set a custom duration.

## License

MIT