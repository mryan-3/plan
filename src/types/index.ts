export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Unit {
  id: string;
  title: string;
  type: "academic" | "portfolio" | "life";
  tasks: SubTask[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: "deadline" | "event";
}
