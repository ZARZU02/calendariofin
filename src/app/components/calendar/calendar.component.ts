import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Agrega esta línea

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule], // Agrega CommonModule a la lista de imports
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent {
  currentDate: Date = new Date();
  selectedDate: Date | null = null;
  public calendar: Date[][] = [];

  getCalendar(): Date[][] {
    const startDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const endDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0);
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const week: Date[] = [];
      for (let i = 0; i < 7 && currentDate <= endDate; i++) {
        week.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }
      this.calendar.push(week);
    }

    return this.calendar;
  }

  selectDate(day: Date): void {
    this.selectedDate = day;
  }

 

  getCalendarDays(year: number, month: number): { day: number | null, inMonth: boolean }[] {
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    
    let days: { day: number | null, inMonth: boolean }[] = [];

    // Fill in the days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        days.push({ day: null, inMonth: false });
    }

    // Fill in the days of the month with numbers 1 to 31
    for (let i = 1; i <= lastDay; i++) {
        days.push({ day: i, inMonth: true });
    }

    // Ensure there are always 31 elements in the array
    while (days.length < 31) {
        days.push({ day: null, inMonth: false });
    }

    // Trim the array to exactly 31 elements
    days = days.slice(0, 31);

    return days;
  

}

currentMonth: number = 0;
  currentYear: number = new Date().getFullYear();

  months: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  changeMonth(offset: number) {
    this.currentMonth += offset;

    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }

    console.log('Nuevo mes:', this.months[this.currentMonth], 'Año:', this.currentYear);
  }
 
  
}